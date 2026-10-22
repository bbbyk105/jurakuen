import { randomUUID } from "node:crypto";
import nodemailer, { type Transporter } from "nodemailer";
import type Stripe from "stripe";

import { getStripe } from "../stripe-client";
import {
  claimIdempotencyKey,
  claimValue,
  CUSTOMER_RECEIPT_FLAG,
  decideClaim,
  failedValue,
  sentIdempotencyKey,
  SHOP_NOTIFICATION_FLAG,
} from "./claim";
import {
  buildFulfillmentEmail,
  buildReceiptEmail,
  customerEmailOf,
  receiptNumberFor,
} from "./templates";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class OrderEmailInProgressError extends Error {
  readonly flag: string;

  constructor(flag: string) {
    super(`order email delivery is already in progress (${flag})`);
    this.name = "OrderEmailInProgressError";
    this.flag = flag;
  }
}

export type EmailSendResult = "sent" | "already_sent" | "skipped_no_email";

export type DeliveryResult = {
  paymentStatus: string;
  skipped?: "not_paid";
  customerReceipt?: EmailSendResult;
  shopNotification?: EmailSendResult;
};

export type ReceiptStatus = {
  paymentStatus: string;
  customerReceipt: "not_paid" | "no_email" | "sent" | "in_progress" | "pending";
  receiptNumber: string | null;
};

type OutgoingMail = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

export type OrderEmailDeps = {
  retrieveSession: (id: string) => Promise<Stripe.Checkout.Session>;
  retrievePaymentIntent: (id: string) => Promise<Stripe.PaymentIntent>;
  updatePaymentIntent: (
    id: string,
    params: Stripe.PaymentIntentUpdateParams,
    options?: Stripe.RequestOptions,
  ) => Promise<Stripe.PaymentIntent>;
  sendMail: (mail: OutgoingMail) => Promise<{ messageId?: string }>;
  shopRecipient: () => string;
  fromAddress: () => string;
  now?: () => number;
  sleep?: (ms: number) => Promise<void>;
};

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!transporter) {
    const port = Number.parseInt(process.env.SMTP_PORT || "587", 10);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number.isFinite(port) ? port : 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  return transporter;
}

/** Shop inbox. FULFILLMENT_EMAIL overrides the published shop address. */
export function shopRecipient(): string {
  const configured = process.env.FULFILLMENT_EMAIL?.trim();
  const address = configured || "jurakuenfuji@gmail.com";
  if (!EMAIL_RE.test(address)) {
    throw new Error("FULFILLMENT_EMAIL is not a valid email address");
  }
  return address;
}

/**
 * Same sender for the customer receipt and the shop notification.
 * The receipt path previously fell back to noreply@yourstore.com, while the
 * shop path fell back to a different address and could be rejected.
 */
export function fromAddress(): string {
  const address = (process.env.FROM_EMAIL || "noreply@yourstore.com").trim();
  if (!EMAIL_RE.test(address)) {
    throw new Error("FROM_EMAIL is not a valid email address");
  }
  return address;
}

function defaultDeps(): OrderEmailDeps {
  return {
    retrieveSession: (id) =>
      getStripe().checkout.sessions.retrieve(id, {
        expand: ["line_items.data.price.product", "payment_intent"],
      }),
    retrievePaymentIntent: (id) => getStripe().paymentIntents.retrieve(id),
    updatePaymentIntent: (id, params, options) =>
      getStripe().paymentIntents.update(id, params, options),
    sendMail: (mail) => getTransporter().sendMail(mail),
    shopRecipient,
    fromAddress,
    now: () => Date.now(),
    sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  };
}

function paymentIntentId(session: Stripe.Checkout.Session): string | null {
  if (!session.payment_intent) return null;
  return typeof session.payment_intent === "string"
    ? session.payment_intent
    : session.payment_intent.id;
}

export function isIdempotencyConflict(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const typed = err as { type?: string; name?: string };
  return typed.type === "idempotency_error" || typed.name === "StripeIdempotencyError";
}

function errorSummary(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

function resolveDeps(deps?: OrderEmailDeps): OrderEmailDeps {
  return deps ?? defaultDeps();
}

async function sendFlag(
  deps: OrderEmailDeps,
  session: Stripe.Checkout.Session,
  paymentIntent: string,
  flag: string,
  build: () => { to: string; subject: string; html: string } | null,
): Promise<EmailSendResult> {
  const mail = build();
  if (!mail) return "skipped_no_email";

  const now = deps.now?.() ?? Date.now();
  const current = await deps.retrievePaymentIntent(paymentIntent);
  const decision = decideClaim(current.metadata?.[flag], now);
  if (decision.type === "already_sent") return "already_sent";
  if (decision.type === "in_progress") throw new OrderEmailInProgressError(flag);

  const value = claimValue(now, randomUUID(), decision.attempt);
  try {
    await deps.updatePaymentIntent(
      paymentIntent,
      { metadata: { [flag]: value } },
      { idempotencyKey: claimIdempotencyKey(flag, paymentIntent, decision.attempt) },
    );
  } catch (err) {
    if (isIdempotencyConflict(err)) throw new OrderEmailInProgressError(flag);
    throw err;
  }

  const confirmed = await deps.retrievePaymentIntent(paymentIntent);
  if (confirmed.metadata?.[flag] !== value) {
    throw new OrderEmailInProgressError(flag);
  }

  try {
    await deps.sendMail({
      from: deps.fromAddress(),
      to: mail.to,
      subject: mail.subject,
      html: mail.html,
    });
  } catch (err) {
    try {
      await deps.updatePaymentIntent(paymentIntent, {
        metadata: { [flag]: failedValue(decision.attempt) },
      });
    } catch (markErr) {
      console.error("[order-email] could not record send failure", {
        sessionId: session.id,
        flag,
        error: errorSummary(markErr),
      });
    }
    console.error("[order-email] send failed", {
      sessionId: session.id,
      flag,
      error: errorSummary(err),
    });
    throw err;
  }

  await deps.updatePaymentIntent(
    paymentIntent,
    { metadata: { [flag]: "sent" } },
    { idempotencyKey: sentIdempotencyKey(flag, paymentIntent) },
  );
  console.info("[order-email] sent", {
    sessionId: session.id,
    flag,
    to: mail.to,
  });
  return "sent";
}

async function deliverOnce(
  sessionId: string,
  deps: OrderEmailDeps,
  which: { shop: boolean; customer: boolean },
): Promise<DeliveryResult> {
  const session = await deps.retrieveSession(sessionId);
  const paymentStatus = session.payment_status || "unpaid";
  if (paymentStatus !== "paid") {
    console.info("[order-email] skip unpaid session", {
      sessionId,
      paymentStatus,
    });
    return { paymentStatus, skipped: "not_paid" };
  }

  const piId = paymentIntentId(session);
  if (!piId) {
    throw new Error(`paid session ${sessionId} has no payment_intent`);
  }

  const result: DeliveryResult = { paymentStatus };
  const errors: unknown[] = [];

  if (which.shop) {
    try {
      result.shopNotification = await sendFlag(
        deps,
        session,
        piId,
        SHOP_NOTIFICATION_FLAG,
        () => {
          const built = buildFulfillmentEmail(session);
          return {
            to: deps.shopRecipient(),
            subject: built.subject,
            html: built.html,
          };
        },
      );
    } catch (err) {
      errors.push(err);
    }
  }

  if (which.customer) {
    try {
      result.customerReceipt = await sendFlag(
        deps,
        session,
        piId,
        CUSTOMER_RECEIPT_FLAG,
        () => {
          const email = customerEmailOf(session);
          if (!email) return null;
          const built = buildReceiptEmail(session, email);
          return { to: email, subject: built.subject, html: built.html };
        },
      );
    } catch (err) {
      errors.push(err);
    }
  }

  if (errors.length > 0) {
    const real = errors.find((err) => !(err instanceof OrderEmailInProgressError));
    throw real ?? errors[0];
  }

  return result;
}

async function deliverWithWait(
  sessionId: string,
  which: { shop: boolean; customer: boolean },
  waitMs: number,
  deps?: OrderEmailDeps,
): Promise<DeliveryResult> {
  const resolved = resolveDeps(deps);
  const deadline = Date.now() + waitMs;
  for (;;) {
    try {
      return await deliverOnce(sessionId, resolved, which);
    } catch (err) {
      if (!(err instanceof OrderEmailInProgressError) || Date.now() >= deadline) {
        throw err;
      }
      await (resolved.sleep ?? ((ms) => new Promise((resolve) => setTimeout(resolve, ms))))(400);
    }
  }
}

/** Shop notification and customer receipt. Used by the Stripe webhook. */
export function deliverPaidOrderEmails(
  sessionId: string,
  options?: { waitMs?: number },
  deps?: OrderEmailDeps,
): Promise<DeliveryResult> {
  return deliverWithWait(
    sessionId,
    { shop: true, customer: true },
    options?.waitMs ?? 0,
    deps,
  );
}

/** Customer receipt only. Used by the success-page fallback. */
export function deliverCustomerReceipt(
  sessionId: string,
  options?: { waitMs?: number },
  deps?: OrderEmailDeps,
): Promise<DeliveryResult> {
  return deliverWithWait(
    sessionId,
    { shop: false, customer: true },
    options?.waitMs ?? 0,
    deps,
  );
}

export async function getCustomerReceiptStatus(
  sessionId: string,
  deps?: OrderEmailDeps,
): Promise<ReceiptStatus> {
  const resolved = resolveDeps(deps);
  const session = await resolved.retrieveSession(sessionId);
  const paymentStatus = session.payment_status || "unpaid";
  const receiptNumber = receiptNumberFor(session.id);
  if (paymentStatus !== "paid") {
    return { paymentStatus, customerReceipt: "not_paid", receiptNumber: null };
  }
  if (!customerEmailOf(session)) {
    return { paymentStatus, customerReceipt: "no_email", receiptNumber: null };
  }
  const piId = paymentIntentId(session);
  if (!piId) {
    return { paymentStatus, customerReceipt: "pending", receiptNumber };
  }
  const pi = await resolved.retrievePaymentIntent(piId);
  const decision = decideClaim(
    pi.metadata?.[CUSTOMER_RECEIPT_FLAG],
    resolved.now?.() ?? Date.now(),
  );
  if (decision.type === "already_sent") {
    return { paymentStatus, customerReceipt: "sent", receiptNumber };
  }
  if (decision.type === "in_progress") {
    return { paymentStatus, customerReceipt: "in_progress", receiptNumber };
  }
  return { paymentStatus, customerReceipt: "pending", receiptNumber };
}
