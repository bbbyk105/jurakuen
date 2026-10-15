import assert from "node:assert/strict";
import test from "node:test";
import Stripe from "stripe";

import { handleStripeWebhook, type WebhookDeps } from "./stripe-webhook";

const SECRET = "whsec_test_secret";
const stripe = new Stripe("sk_test_123", { apiVersion: "2025-08-27.basil" });

function signedEvent(type: string, sessionId = "cs_test_abcdefgh"): {
  payload: string;
  signature: string;
} {
  const payload = JSON.stringify({
    id: "evt_test",
    object: "event",
    type,
    api_version: "2025-08-27.basil",
    created: 1_700_000_000,
    data: {
      object: {
        id: sessionId,
        object: "checkout.session",
        payment_status: "paid",
      },
    },
    livemode: false,
    pending_webhooks: 1,
    request: { id: null, idempotency_key: null },
  });
  const signature = stripe.webhooks.generateTestHeaderString({
    payload,
    secret: SECRET,
  });
  return { payload, signature };
}

function deps(overrides?: Partial<WebhookDeps>): WebhookDeps & {
  calls: string[];
} {
  const calls: string[] = [];
  return {
    calls,
    webhookSecret: () => SECRET,
    constructEvent: (rawBody, signature, secret) =>
      stripe.webhooks.constructEvent(rawBody, signature, secret),
    deliver: async (sessionId) => {
      calls.push(sessionId);
      return { shopNotification: "sent", customerReceipt: "sent" };
    },
    ...overrides,
  };
}

test("checkout.session.completed waits for both order emails", async () => {
  const { payload, signature } = signedEvent("checkout.session.completed");
  let release: () => void = () => {};
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  let started = false;
  const harness = deps({
    deliver: async (sessionId) => {
      started = true;
      await gate;
      harness.calls.push(sessionId);
      return { ok: true };
    },
  });

  let settled = false;
  const pending = handleStripeWebhook(payload, signature, harness).then((result) => {
    settled = true;
    return result;
  });

  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(started, true);
  assert.equal(settled, false);

  release();
  const result = await pending;
  assert.equal(result.status, 200);
  assert.deepEqual(harness.calls, ["cs_test_abcdefgh"]);
});

test("async payment success uses the same delivery path", async () => {
  const { payload, signature } = signedEvent("checkout.session.async_payment_succeeded", "cs_async");
  const harness = deps();
  const result = await handleStripeWebhook(payload, signature, harness);
  assert.equal(result.status, 200);
  assert.deepEqual(harness.calls, ["cs_async"]);
});

test("other event types are acknowledged and do not send mail", async () => {
  const { payload, signature } = signedEvent("payment_intent.succeeded");
  const harness = deps();
  const result = await handleStripeWebhook(payload, signature, harness);
  assert.equal(result.status, 200);
  assert.deepEqual(harness.calls, []);
});

test("delivery failure asks Stripe to retry", async () => {
  const { payload, signature } = signedEvent("checkout.session.completed");
  const harness = deps({
    deliver: async () => {
      throw new Error("smtp down");
    },
  });
  const result = await handleStripeWebhook(payload, signature, harness);
  assert.equal(result.status, 500);
  assert.equal(result.body.error, "Webhook handler error");
});

test("a missing signature is rejected", async () => {
  const result = await handleStripeWebhook("{}", null, deps());
  assert.equal(result.status, 400);
});

test("an invalid signature is rejected", async () => {
  const { payload } = signedEvent("checkout.session.completed");
  const result = await handleStripeWebhook(payload, "t=1,v1=deadbeef", deps());
  assert.equal(result.status, 400);
  assert.equal(result.body.error, "Invalid signature");
});

test("a missing webhook secret fails closed", async () => {
  const { payload, signature } = signedEvent("checkout.session.completed");
  const harness = deps({ webhookSecret: () => "" });
  const result = await handleStripeWebhook(payload, signature, harness);
  assert.equal(result.status, 500);
  assert.deepEqual(harness.calls, []);
});
