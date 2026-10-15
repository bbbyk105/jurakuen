import assert from "node:assert/strict";
import test from "node:test";
import type Stripe from "stripe";

import { CLAIM_TTL_MS, CUSTOMER_RECEIPT_FLAG, SHOP_NOTIFICATION_FLAG } from "./claim";
import {
  deliverCustomerReceipt,
  deliverPaidOrderEmails,
  getCustomerReceiptStatus,
  type OrderEmailDeps,
} from "./deliver";

const SHOP = "shop@example.com";
const BUYER = "buyer@example.com";
const FROM = "noreply@example.com";

type SentMail = { from: string; to: string; subject: string; html: string };

function paidSession(overrides?: Record<string, unknown>): Stripe.Checkout.Session {
  return {
    id: "cs_test_abcdefgh",
    object: "checkout.session",
    payment_status: "paid",
    metadata: { locale: "ja" },
    currency: "jpy",
    created: 1_700_000_000,
    amount_subtotal: 2000,
    amount_total: 2660,
    customer_email: null,
    total_details: { amount_tax: 0, amount_shipping: 660, amount_discount: 0 },
    customer_details: {
      email: BUYER,
      name: "山田 <花子>",
      phone: "09000000000",
      address: {
        country: "JP",
        postal_code: "417-0812",
        state: "静岡県",
        city: "富士市",
        line1: "境485-2",
        line2: null,
      },
    },
    collected_information: {
      shipping_details: {
        name: "配送 太郎",
        address: {
          country: "JP",
          postal_code: "100-0001",
          state: "東京都",
          city: "千代田区",
          line1: "1-1",
          line2: null,
        },
      },
    },
    payment_intent: "pi_test",
    line_items: {
      object: "list",
      data: [
        {
          id: "li_1",
          object: "item",
          quantity: 2,
          price: {
            id: "price_1",
            object: "price",
            unit_amount: 1000,
            product: {
              id: "prod_1",
              object: "product",
              name: "抹茶 <特選>",
              metadata: { sku: "M-1" },
            },
          },
        },
      ],
      has_more: false,
      url: "/v1/checkout/sessions/cs_test/line_items",
    },
    ...overrides,
  } as unknown as Stripe.Checkout.Session;
}

function createHarness(options?: {
  session?: Stripe.Checkout.Session;
  metadata?: Record<string, string>;
  sendMail?: OrderEmailDeps["sendMail"];
  now?: () => number;
}) {
  const session = options?.session ?? paidSession();
  let metadata: Record<string, string> = { ...(options?.metadata ?? {}) };
  const idempotency = new Map<string, string>();
  const sent: SentMail[] = [];
  const updates: Array<{ key?: string; metadata: Record<string, string> }> = [];

  const deps: OrderEmailDeps = {
    retrieveSession: async () => session,
    retrievePaymentIntent: async (id) =>
      ({ id, metadata: { ...metadata } }) as Stripe.PaymentIntent,
    updatePaymentIntent: async (id, params, requestOptions) => {
      const patch = (params.metadata ?? {}) as Record<string, string>;
      const fingerprint = JSON.stringify(patch);
      const key = requestOptions?.idempotencyKey;
      if (key) {
        const previous = idempotency.get(key);
        if (previous && previous !== fingerprint) {
          const err = new Error("idempotency key reused with different parameters");
          (err as { type?: string }).type = "idempotency_error";
          throw err;
        }
        if (!previous) idempotency.set(key, fingerprint);
      }
      metadata = { ...metadata, ...patch };
      updates.push({ key, metadata: { ...patch } });
      return { id, metadata: { ...metadata } } as Stripe.PaymentIntent;
    },
    sendMail:
      options?.sendMail ??
      (async (mail) => {
        sent.push(mail);
        return { messageId: `m_${sent.length}` };
      }),
    shopRecipient: () => SHOP,
    fromAddress: () => FROM,
    now: options?.now ?? (() => 1_700_000_000_000),
    sleep: async () => {},
  };

  return {
    deps,
    sent,
    updates,
    metadata: () => metadata,
  };
}

async function waitFor(predicate: () => boolean): Promise<void> {
  for (let i = 0; i < 50; i += 1) {
    if (predicate()) return;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  throw new Error("timed out waiting for condition");
}

test("paid checkout sends the shop notification and the customer receipt once", async () => {
  const harness = createHarness();
  const first = await deliverPaidOrderEmails("cs_test_abcdefgh", undefined, harness.deps);
  const second = await deliverPaidOrderEmails("cs_test_abcdefgh", undefined, harness.deps);

  assert.equal(first.shopNotification, "sent");
  assert.equal(first.customerReceipt, "sent");
  assert.equal(second.shopNotification, "already_sent");
  assert.equal(second.customerReceipt, "already_sent");
  assert.equal(harness.sent.length, 2);
  assert.equal(harness.sent.filter((mail) => mail.to === SHOP).length, 1);
  assert.equal(harness.sent.filter((mail) => mail.to === BUYER).length, 1);
  assert.ok(harness.sent.every((mail) => mail.from === FROM));
  assert.equal(harness.metadata()[SHOP_NOTIFICATION_FLAG], "sent");
  assert.equal(harness.metadata()[CUSTOMER_RECEIPT_FLAG], "sent");

  const shopMail = harness.sent.find((mail) => mail.to === SHOP);
  assert.ok(shopMail);
  assert.match(shopMail.html, /配送 太郎/);
  assert.match(shopMail.html, /100-0001/);
  assert.match(shopMail.html, /buyer@example\.com/);
  assert.match(shopMail.html, /抹茶 &lt;特選&gt;/);
  assert.doesNotMatch(shopMail.html, /抹茶 <特選>/);

  const receipt = harness.sent.find((mail) => mail.to === BUYER);
  assert.ok(receipt);
  assert.match(receipt.html, /山田 &lt;花子&gt;/);
  assert.match(receipt.subject, /RCP-ABCDEFGH/);
});

test("webhook retries do not send a second copy after a successful delivery", async () => {
  const harness = createHarness();
  await deliverPaidOrderEmails("cs_test_abcdefgh", undefined, harness.deps);
  await deliverPaidOrderEmails("cs_test_abcdefgh", undefined, harness.deps);
  await deliverPaidOrderEmails("cs_test_abcdefgh", undefined, harness.deps);
  assert.equal(harness.sent.length, 2);
});

test("the success-page receipt path does not send the shop mail or a second receipt", async () => {
  const harness = createHarness();
  await deliverPaidOrderEmails("cs_test_abcdefgh", undefined, harness.deps);
  const fallback = await deliverCustomerReceipt("cs_test_abcdefgh", { waitMs: 0 }, harness.deps);
  assert.equal(fallback.customerReceipt, "already_sent");
  assert.equal(fallback.shopNotification, undefined);
  assert.equal(harness.sent.length, 2);
});

test("unpaid sessions do not send mail", async () => {
  const harness = createHarness({
    session: paidSession({ payment_status: "unpaid" }),
  });
  const result = await deliverPaidOrderEmails("cs_test_abcdefgh", undefined, harness.deps);
  assert.equal(result.skipped, "not_paid");
  assert.equal(harness.sent.length, 0);
  assert.equal(harness.updates.length, 0);
});

test("a missing customer email still notifies the shop", async () => {
  const harness = createHarness({
    session: paidSession({
      customer_email: null,
      customer_details: {
        email: null,
        name: "山田",
        phone: null,
        address: null,
      },
    }),
  });
  const result = await deliverPaidOrderEmails("cs_test_abcdefgh", undefined, harness.deps);
  assert.equal(result.shopNotification, "sent");
  assert.equal(result.customerReceipt, "skipped_no_email");
  assert.deepEqual(
    harness.sent.map((mail) => mail.to),
    [SHOP],
  );
});

test("a failed send can be retried, and a later success is not repeated", async () => {
  let shopAttempts = 0;
  const harness = createHarness({
    sendMail: async (mail) => {
      if (mail.to === SHOP && shopAttempts === 0) {
        shopAttempts += 1;
        throw new Error("smtp down");
      }
      harnessSent.push(mail);
      return { messageId: "ok" };
    },
  });
  const harnessSent = harness.sent;

  await assert.rejects(
    () => deliverPaidOrderEmails("cs_test_abcdefgh", undefined, harness.deps),
    /smtp down/,
  );
  assert.equal(harness.metadata()[SHOP_NOTIFICATION_FLAG], "failed:1");
  assert.equal(harness.metadata()[CUSTOMER_RECEIPT_FLAG], "sent");

  const retry = await deliverPaidOrderEmails("cs_test_abcdefgh", undefined, harness.deps);
  assert.equal(retry.shopNotification, "sent");
  assert.equal(retry.customerReceipt, "already_sent");
  assert.equal(harnessSent.filter((mail) => mail.to === SHOP).length, 1);
  assert.equal(harnessSent.filter((mail) => mail.to === BUYER).length, 1);
});

test("a stale claim is taken over instead of blocking forever", async () => {
  const startedAt = 1_000;
  const harness = createHarness({
    now: () => startedAt + CLAIM_TTL_MS + 5,
    metadata: {
      [SHOP_NOTIFICATION_FLAG]: `sending:${startedAt}:11111111-2222-4333-8444-555555555555:1`,
      [CUSTOMER_RECEIPT_FLAG]: "sent",
    },
  });
  const result = await deliverPaidOrderEmails("cs_test_abcdefgh", undefined, harness.deps);
  assert.equal(result.shopNotification, "sent");
  assert.equal(result.customerReceipt, "already_sent");
  assert.equal(harness.sent.length, 1);
  assert.equal(harness.metadata()[SHOP_NOTIFICATION_FLAG], "sent");
});

test("concurrent deliveries send each message once", async () => {
  let releaseShop: () => void = () => {};
  const shopGate = new Promise<void>((resolve) => {
    releaseShop = resolve;
  });
  let shopEntered = 0;
  const harness = createHarness({
    sendMail: async (mail) => {
      if (mail.to === SHOP) {
        shopEntered += 1;
        await shopGate;
      }
      harness.sent.push(mail);
      return { messageId: "ok" };
    },
  });

  const settledPromise = Promise.allSettled([
    deliverPaidOrderEmails("cs_test_abcdefgh", undefined, harness.deps),
    deliverPaidOrderEmails("cs_test_abcdefgh", undefined, harness.deps),
  ]);

  await waitFor(() => shopEntered === 1);
  await new Promise((resolve) => setTimeout(resolve, 30));
  assert.equal(shopEntered, 1);
  releaseShop();

  const settled = await settledPromise;
  assert.equal(settled.filter((item) => item.status === "fulfilled").length, 1);
  assert.equal(settled.filter((item) => item.status === "rejected").length, 1);
  assert.equal(harness.sent.filter((mail) => mail.to === SHOP).length, 1);
  assert.equal(harness.sent.filter((mail) => mail.to === BUYER).length, 1);
});

test("shop mail uses payment intent shipping when checkout did not collect it", async () => {
  const harness = createHarness({
    session: paidSession({
      collected_information: null,
      payment_intent: {
        id: "pi_test",
        object: "payment_intent",
        shipping: {
          name: "店舗配送",
          phone: "0545-34-0614",
          address: {
            line1: "境485-2",
            city: "富士市",
            state: "静岡県",
            postal_code: "417-0812",
            country: "JP",
          },
        },
      },
    }),
  });
  await deliverPaidOrderEmails("cs_test_abcdefgh", undefined, harness.deps);
  const shopMail = harness.sent.find((mail) => mail.to === SHOP);
  assert.ok(shopMail);
  assert.match(shopMail.html, /店舗配送/);
  assert.match(shopMail.html, /417-0812/);
  assert.match(shopMail.html, /0545-34-0614/);
});

test("receipt status reports sent without sending again", async () => {
  const harness = createHarness({
    metadata: { [CUSTOMER_RECEIPT_FLAG]: "sent" },
  });
  const status = await getCustomerReceiptStatus("cs_test_abcdefgh", harness.deps);
  assert.equal(status.customerReceipt, "sent");
  assert.equal(status.receiptNumber, "RCP-ABCDEFGH");
  assert.equal(harness.sent.length, 0);
});
