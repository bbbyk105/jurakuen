// src/app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const FULFILLMENT_EMAIL =
  process.env.FULFILLMENT_EMAIL || "jurakuenfuji@gmail.com";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
});

// ---------- helpers ----------
function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function addressToLines(addr?: Stripe.Address | null) {
  if (!addr) return ["(住所未取得)"];
  const lines = [
    [addr.postal_code, addr.state, addr.city].filter(Boolean).join(" "),
    [addr.line1, addr.line2].filter(Boolean).join(" "),
    addr.country,
  ].filter(Boolean) as string[];
  return lines;
}

function fmtCurrency(amount: number | null | undefined, currency?: string) {
  const cur = (currency || "USD").toUpperCase();
  const n = typeof amount === "number" ? amount : 0;
  const isJPY = cur === "JPY";
  return new Intl.NumberFormat(isJPY ? "ja-JP" : "en-US", {
    style: "currency",
    currency: cur,
    maximumFractionDigits: isJPY ? 0 : 2,
  }).format(isJPY ? n : n / 100); // Stripe金額は通常セント
}

// ---------- core mailer ----------
async function sendFulfillmentEmail(sessionId: string) {
  // shipping_details は使わず、payment_intent.shipping を展開して利用
  const full = (await stripe.checkout.sessions.retrieve(sessionId, {
    expand: [
      "line_items.data.price.product",
      "payment_intent",
      "customer_details",
    ],
  })) as Stripe.Checkout.Session;

  const locale = (full.metadata?.locale as "ja" | "en") || "ja";
  const isJa = locale === "ja";
  const items = full.line_items?.data ?? [];
  const currency = full.currency?.toUpperCase();

  // totals
  const subtotal = full.amount_subtotal ?? 0;
  const tax = full.total_details?.amount_tax ?? 0;
  const shippingAmount = full.total_details?.amount_shipping ?? 0;
  const total = full.amount_total ?? 0;

  // 配送先は PaymentIntent.shipping を参照（型：Stripe.Shipping | null）
  const pi =
    typeof full.payment_intent === "string" ? null : full.payment_intent;
  const shipping = pi?.shipping || null;

  // 顧客詳細でフォールバック
  const shippingName =
    shipping?.name ?? full.customer_details?.name ?? "(no name)";
  const shippingPhone =
    shipping?.phone ?? full.customer_details?.phone ?? undefined;
  const shippingAddress: Stripe.Address | null =
    shipping?.address ?? full.customer_details?.address ?? null;

  const addrLines = addressToLines(shippingAddress);

  const subject = isJa
    ? `【新規注文】出荷手配のお願い - ${full.id}`
    : `[New Order] Please Fulfill - ${full.id}`;

  const rows = items
    .map((li) => {
      const product = li.price?.product as Stripe.Product | null;
      const name = product?.name || (isJa ? "商品" : "Product");
      const sku =
        (product?.metadata && (product.metadata.sku || product.metadata.SKU)) ||
        "";
      const qty = li.quantity || 1;
      const unit = li.price?.unit_amount || 0;
      const lineTotal = unit * qty;
      return `
        <tr>
          <td style="padding:8px;border:1px solid #eee;">
            <div><strong>${escapeHtml(name)}</strong></div>
            ${
              sku
                ? `<div style="opacity:.7;">SKU: ${escapeHtml(
                    String(sku)
                  )}</div>`
                : ""
            }
          </td>
          <td style="padding:8px;border:1px solid #eee; text-align:right;">${qty}</td>
          <td style="padding:8px;border:1px solid #eee; text-align:right;">${fmtCurrency(
            unit,
            currency
          )}</td>
          <td style="padding:8px;border:1px solid #eee; text-align:right;">${fmtCurrency(
            lineTotal,
            currency
          )}</td>
        </tr>
      `;
    })
    .join("");

  const html = `
    <!doctype html>
    <html><head><meta charset="utf-8" />
      <style>
        body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background:#f6f7f9;margin:0;padding:24px;}
        .card{max-width:760px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 6px 16px rgba(0,0,0,.08)}
        .header{background:#111827;color:#fff;padding:20px 24px;font-weight:600}
        .section{padding:20px 24px}
        .title{font-weight:600;margin:0 0 8px}
        table{border-collapse:collapse;width:100%}
        .muted{color:#6b7280}
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">${
          isJa ? "新規注文（出荷依頼）" : "New Order (Fulfillment Request)"
        }</div>

        <div class="section">
          <p class="muted" style="margin:0 0 6px;">Checkout Session: ${
            full.id
          }</p>
          <p class="muted" style="margin:0 0 6px;">Payment Status: ${
            full.payment_status
          }</p>
          <p class="muted" style="margin:0 0 6px;">Created: ${new Date(
            (full.created || 0) * 1000
          ).toLocaleString(isJa ? "ja-JP" : "en-US")}</p>
          ${
            full.payment_intent
              ? `<p class="muted" style="margin:0 0 6px;">PaymentIntent: ${
                  typeof full.payment_intent === "string"
                    ? full.payment_intent
                    : full.payment_intent.id
                }</p>`
              : ""
          }
        </div>

        <div class="section">
          <h3 class="title">${isJa ? "配送先" : "Ship To"}</h3>
          <div><strong>${escapeHtml(shippingName)}</strong></div>
          <div>${addrLines.map(escapeHtml).join("<br>")}</div>
          ${
            shippingPhone
              ? `<div>${isJa ? "電話" : "Phone"}: ${escapeHtml(
                  shippingPhone
                )}</div>`
              : ""
          }
        </div>

        <div class="section">
          <h3 class="title">${isJa ? "購入明細" : "Items"}</h3>
          <table>
            <thead>
              <tr>
                <th style="text-align:left;padding:8px;border:1px solid #eee;">${
                  isJa ? "商品" : "Item"
                }</th>
                <th style="text-align:right;padding:8px;border:1px solid #eee;">${
                  isJa ? "数量" : "Qty"
                }</th>
                <th style="text-align:right;padding:8px;border:1px solid #eee;">${
                  isJa ? "単価" : "Unit"
                }</th>
                <th style="text-align:right;padding:8px;border:1px solid #eee;">${
                  isJa ? "小計" : "Line Total"
                }</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="padding:8px;border:1px solid #eee;text-align:right;">${
                  isJa ? "小計" : "Subtotal"
                }</td>
                <td style="padding:8px;border:1px solid #eee;text-align:right;">${fmtCurrency(
                  subtotal,
                  currency
                )}</td>
              </tr>
              <tr>
                <td colspan="3" style="padding:8px;border:1px solid #eee;text-align:right;">${
                  isJa ? "送料" : "Shipping"
                }</td>
                <td style="padding:8px;border:1px solid #eee;text-align:right;">${fmtCurrency(
                  shippingAmount,
                  currency
                )}</td>
              </tr>
              ${
                (tax || 0) > 0
                  ? `<tr>
                      <td colspan="3" style="padding:8px;border:1px solid #eee;text-align:right;">${
                        isJa ? "税金" : "Tax"
                      }</td>
                      <td style="padding:8px;border:1px solid #eee;text-align:right;">${fmtCurrency(
                        tax,
                        currency
                      )}</td>
                    </tr>`
                  : ""
              }
              <tr>
                <td colspan="3" style="padding:8px;border:1px solid #eee;text-align:right;font-weight:700;">${
                  isJa ? "合計" : "Total"
                }</td>
                <td style="padding:8px;border:1px solid #eee;text-align:right;font-weight:700;">${fmtCurrency(
                  total,
                  currency
                )}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div class="section muted" style="border-top:1px solid #eee;">
          <div>${
            isJa
              ? "本メールに基づき出荷手配をお願いします。"
              : "Please fulfill this order."
          }</div>
          <div>${
            isJa
              ? "（注）StripeのWebhookは重複配送されることがあります。同一Session IDの多重処理にご注意ください。"
              : "(Note) Stripe webhook events can be delivered more than once. Ensure idempotency."
          }</div>
        </div>
      </div>
    </body></html>
  `;

  await transporter.sendMail({
    from: process.env.FROM_EMAIL || "orders@yourstore.com",
    to: FULFILLMENT_EMAIL,
    subject,
    html,
  });
}

// ---------- webhook entrypoint ----------
export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ ok: true });

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await sendFulfillmentEmail(session.id);
        break;
      }
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;
        await sendFulfillmentEmail(session.id);
        break;
      }
      // 必要なら他イベント分岐も追加
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json(
      { error: "Webhook handler error" },
      { status: 500 }
    );
  }
}
