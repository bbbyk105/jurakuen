/** How long a send claim blocks other workers before it can be taken over. */
export const CLAIM_TTL_MS = 2 * 60 * 1000;

export const CUSTOMER_RECEIPT_FLAG = "customer_receipt_email";
export const SHOP_NOTIFICATION_FLAG = "shop_notification_email";

const SENDING_RE = /^sending:(\d+):([0-9a-fA-F-]+):(\d+)$/;
const FAILED_RE = /^failed:(\d+)$/;

export type ClaimAction =
  | { type: "already_sent" }
  | { type: "in_progress" }
  | { type: "claim"; attempt: number };

/**
 * Decide whether a PaymentIntent metadata flag means the email was sent,
 * is being sent by another worker, or can be claimed.
 * Attempt numbers are deterministic so concurrent callers share one Stripe
 * idempotency key and only one of them can write the claim.
 */
export function decideClaim(raw: string | undefined, now: number): ClaimAction {
  if (raw === "sent") return { type: "already_sent" };

  const failed = raw ? FAILED_RE.exec(raw) : null;
  if (failed) {
    return { type: "claim", attempt: Number(failed[1]) + 1 };
  }

  const sending = raw ? SENDING_RE.exec(raw) : null;
  if (sending) {
    const startedAt = Number(sending[1]);
    const attempt = Number(sending[3]);
    if (now - startedAt < CLAIM_TTL_MS) return { type: "in_progress" };
    return { type: "claim", attempt: attempt + 1 };
  }

  return { type: "claim", attempt: 1 };
}

export function claimValue(now: number, token: string, attempt: number): string {
  return `sending:${now}:${token}:${attempt}`;
}

export function failedValue(attempt: number): string {
  return `failed:${attempt}`;
}

export function claimIdempotencyKey(
  flag: string,
  paymentIntentId: string,
  attempt: number,
): string {
  return `order-email:${flag}:${paymentIntentId}:${attempt}`;
}

export function sentIdempotencyKey(flag: string, paymentIntentId: string): string {
  return `order-email-sent:${flag}:${paymentIntentId}`;
}
