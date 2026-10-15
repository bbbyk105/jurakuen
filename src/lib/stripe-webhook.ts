import type Stripe from "stripe";

import { deliverPaidOrderEmails } from "./order-email/deliver";
import { getStripe } from "./stripe-client";

const HANDLED_EVENTS = new Set([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
]);

export type WebhookResult = {
  status: number;
  body: Record<string, unknown>;
};

export type WebhookDeps = {
  webhookSecret: () => string;
  constructEvent: (rawBody: string, signature: string, secret: string) => Stripe.Event;
  deliver: (sessionId: string) => Promise<unknown>;
};

function errorSummary(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

function defaultDeps(): WebhookDeps {
  return {
    webhookSecret: () => process.env.STRIPE_WEBHOOK_SECRET?.trim() ?? "",
    constructEvent: (rawBody, signature, secret) =>
      getStripe().webhooks.constructEvent(rawBody, signature, secret),
    deliver: (sessionId) => deliverPaidOrderEmails(sessionId),
  };
}

export async function handleStripeWebhook(
  rawBody: string,
  signature: string | null,
  deps: WebhookDeps = defaultDeps(),
): Promise<WebhookResult> {
  if (!signature) {
    console.error("[stripe-webhook] missing stripe-signature header");
    return { status: 400, body: { error: "Missing signature" } };
  }

  const secret = deps.webhookSecret();
  if (!secret) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET is not set");
    return { status: 500, body: { error: "Webhook secret is not configured" } };
  }

  let event: Stripe.Event;
  try {
    event = deps.constructEvent(rawBody, signature, secret);
  } catch (err) {
    console.error("[stripe-webhook] signature verification failed", {
      error: errorSummary(err),
    });
    return { status: 400, body: { error: "Invalid signature" } };
  }

  if (!HANDLED_EVENTS.has(event.type)) {
    console.info("[stripe-webhook] ignored event", {
      eventId: event.id,
      eventType: event.type,
    });
    return { status: 200, body: { received: true } };
  }

  const session = event.data.object as Stripe.Checkout.Session;
  try {
    const result = await deps.deliver(session.id);
    console.info("[stripe-webhook] order emails processed", {
      eventId: event.id,
      eventType: event.type,
      sessionId: session.id,
      result,
    });
    return { status: 200, body: { received: true } };
  } catch (err) {
    console.error("[stripe-webhook] order email delivery failed", {
      eventId: event.id,
      eventType: event.type,
      sessionId: session.id,
      error: errorSummary(err),
    });
    return { status: 500, body: { error: "Webhook handler error" } };
  }
}
