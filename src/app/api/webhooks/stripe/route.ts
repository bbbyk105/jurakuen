import { NextRequest, NextResponse } from "next/server";

import { handleStripeWebhook } from "@/lib/stripe-webhook";

/** Next.js Route Handler 設定 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "home";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const rawBody = await req.text();
  const result = await handleStripeWebhook(rawBody, signature);
  return NextResponse.json(result.body, { status: result.status });
}
