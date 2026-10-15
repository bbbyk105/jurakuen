import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import {
  deliverCustomerReceipt,
  getCustomerReceiptStatus,
  OrderEmailInProgressError,
} from "@/lib/order-email/deliver";
import { receiptNumberFor } from "@/lib/order-email/templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

function sessionIdFrom(req: NextRequest): string | null {
  return req.nextUrl.searchParams.get("session_id");
}

export async function GET(req: NextRequest) {
  const sessionId = sessionIdFrom(req);
  if (!sessionId) {
    return NextResponse.json({ error: "session_id が必要です" }, { status: 400 });
  }

  try {
    const status = await getCustomerReceiptStatus(sessionId);
    return NextResponse.json(status);
  } catch (error: unknown) {
    console.error("[send-receipt] status failed", errorSummary(error));
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: `Stripe API エラー: ${error.message}`, stripeErrorType: error.type },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: "領収書の状態を確認できませんでした" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { sessionId?: string } | null;
    const sessionId = body?.sessionId;
    if (!sessionId) {
      return NextResponse.json({ error: "session_id が必要です" }, { status: 400 });
    }

    const result = await deliverCustomerReceipt(sessionId, { waitMs: 8000 });
    if (result.skipped === "not_paid") {
      return NextResponse.json({ error: "決済が完了していません" }, { status: 400 });
    }
    if (result.customerReceipt === "skipped_no_email") {
      return NextResponse.json(
        { error: "顧客のメールアドレスが見つかりません" },
        { status: 400 },
      );
    }

    const alreadySent = result.customerReceipt === "already_sent";
    return NextResponse.json({
      success: true,
      alreadySent,
      message: alreadySent ? "領収書はすでに送信済みです" : "領収書をメールで送信しました",
      receipt_number: receiptNumberFor(sessionId),
    });
  } catch (error: unknown) {
    if (error instanceof OrderEmailInProgressError) {
      return NextResponse.json(
        { error: "領収書を送信中です。しばらくしてからもう一度お試しください。" },
        { status: 409 },
      );
    }
    console.error("[send-receipt] send failed", errorSummary(error));
    return stripeAwareError(error);
  }
}

function errorSummary(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function stripeAwareError(error: unknown) {
  if (error instanceof Stripe.errors.StripeError) {
    return NextResponse.json(
      { error: `Stripe API エラー: ${error.message}`, stripeErrorType: error.type },
      { status: 400 },
    );
  }
  const message = error instanceof Error ? error.message : "領収書メールの送信に失敗しました";
  return NextResponse.json({ error: message }, { status: 500 });
}
