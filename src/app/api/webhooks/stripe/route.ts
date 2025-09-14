// src/app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

/** Next.js Route Handler 設定 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "home";

/** Stripe SDK を 2025-08-27.basil に固定 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

/** 環境変数 */
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const FULFILLMENT_EMAIL =
  process.env.FULFILLMENT_EMAIL || "jurakuenfuji@gmail.com";

/** SMTP */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: process.env.SMTP_SECURE === "true",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
});

/* ----------------------------- helpers ----------------------------- */
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
  const cur = (currency || "JPY").toUpperCase();
  const n = typeof amount === "number" ? amount : 0;
  const isJPY = cur === "JPY";
  return new Intl.NumberFormat(isJPY ? "ja-JP" : "en-US", {
    style: "currency",
    currency: cur,
    maximumFractionDigits: isJPY ? 0 : 2,
  }).format(isJPY ? n : n / 100); // 非0小数通貨は分解能が最小単位
}

/* --------------------------- core mailer --------------------------- */
async function sendFulfillmentEmail(sessionId: string) {
  // line_items を必ず展開（product 名称取得用）
  const full = (await stripe.checkout.sessions.retrieve(sessionId, {
    expand: [
      "line_items",
      "line_items.data.price.product",
      "payment_intent",
      "customer_details",
    ],
  })) as Stripe.Checkout.Session;

  const locale = (full.metadata?.locale as "ja" | "en") || "ja";
  const isJa = locale === "ja";
  const items = full.line_items?.data ?? [];
  const currency = full.currency?.toUpperCase();

  const subtotal = full.amount_subtotal ?? 0;
  const tax = full.total_details?.amount_tax ?? 0;
  const shippingAmount = full.total_details?.amount_shipping ?? 0;
  const total = full.amount_total ?? 0;

  const pi =
    typeof full.payment_intent === "string" ? null : full.payment_intent;
  const shipping = pi?.shipping || null;

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
        <td>
          <div class="product-name">${escapeHtml(name)}</div>
          ${
            sku
              ? `<div class="product-sku">SKU: ${escapeHtml(String(sku))}</div>`
              : ""
          }
        </td>
        <td>${qty}</td>
        <td>${fmtCurrency(unit, currency)}</td>
        <td>${fmtCurrency(lineTotal, currency)}</td>
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
      .header{background:#111827;color:#fff;padding:24px;font-weight:600;font-size:20px;text-align:center;}
      .section{padding:24px;border-bottom:1px solid #f3f4f6;}
      .section:last-child{border-bottom:none;}
      .title{font-weight:600;margin:0 0 16px 0;color:#374151;font-size:18px;padding-bottom:8px;border-bottom:2px solid #e5e7eb;}
      .info-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-bottom:12px;}
      .info-item{background:#f9fafb;padding:12px;border-radius:6px;border:1px solid #e5e7eb;}
      .info-label{font-size:12px;color:#6b7280;font-weight:600;margin-bottom:4px;}
      .info-value{font-weight:600;color:#111827;}
      .shipping-details{background:#f9fafb;padding:16px;border-radius:8px;border:1px solid #e5e7eb;}
      .shipping-name{font-weight:600;font-size:16px;margin-bottom:8px;color:#111827;}
      .shipping-address{line-height:1.5;color:#374151;}
      table{border-collapse:collapse;width:100%;background:white;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;}
      th{background:#f9fafb;padding:12px;text-align:left;font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb;}
      th:last-child,td:last-child{text-align:right;}
      td{padding:12px;border-bottom:1px solid #f3f4f6;}
      tr:last-child td{border-bottom:none;}
      .product-name{font-weight:600;color:#111827;}
      .product-sku{font-size:12px;color:#6b7280;margin-top:4px;}
      .total-section{margin-top:16px;background:#f9fafb;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;}
      .total-row{display:flex;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #e5e7eb;}
      .total-row:last-child{border-bottom:none;background:#111827;color:white;font-weight:700;}
      .footer-note{background:#f9fafb;padding:20px;text-align:center;color:#6b7280;font-size:14px;border-top:1px solid #e5e7eb;}
      .muted{color:#6b7280}
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header">${
        isJa ? "新規注文（出荷依頼）" : "New Order (Fulfillment Request)"
      }</div>

      <div class="section">
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">支払い状況</div>
            <div class="info-value">${full.payment_status}</div>
          </div>
          <div class="info-item">
            <div class="info-label">作成日</div>
            <div class="info-value">${new Date(
              (full.created || 0) * 1000
            ).toLocaleString(isJa ? "ja-JP" : "en-US", {
              timeZone: "Asia/Tokyo",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              timeZoneName: "short", // JST と表示
            })}</div>
          </div>
          ${
            full.payment_intent
              ? `<div class="info-item">
                  <div class="info-label">決済ID</div>
                  <div class="info-value">${
                    typeof full.payment_intent === "string"
                      ? full.payment_intent
                      : full.payment_intent.id
                  }</div>
                </div>`
              : ""
          }
        </div>
      </div>

      <div class="section">
        <h3 class="title">${isJa ? "配送先" : "Ship To"}</h3>
        <div class="shipping-details">
          <div class="shipping-name">${escapeHtml(shippingName)}</div>
          <div class="shipping-address">
            ${addrLines.map(escapeHtml).join("<br>")}
            ${
              shippingPhone
                ? `<div style="margin-top: 8px;">${
                    isJa ? "電話" : "Phone"
                  }: ${escapeHtml(shippingPhone)}</div>`
                : ""
            }
          </div>
        </div>
      </div>

      <div class="section">
        <h3 class="title">${isJa ? "購入明細" : "Items"}</h3>
        <table>
          <thead>
            <tr>
              <th>${isJa ? "商品" : "Item"}</th>
              <th>${isJa ? "数量" : "Qty"}</th>
              <th>${isJa ? "単価" : "Unit"}</th>
              <th>${isJa ? "小計" : "Line Total"}</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>

        <div class="total-section">
          <div class="total-row">
            <span>${isJa ? "小計" : "Subtotal"}</span>
            <span>${fmtCurrency(subtotal, currency)}</span>
          </div>
          <div class="total-row">
            <span>${isJa ? "送料" : "Shipping"}</span>
            <span>${fmtCurrency(shippingAmount, currency)}</span>
          </div>
          ${
            (tax || 0) > 0
              ? `<div class="total-row">
                  <span>${isJa ? "税金" : "Tax"}</span>
                  <span>${fmtCurrency(tax, currency)}</span>
                </div>`
              : ""
          }
          <div class="total-row">
            <span>${isJa ? "合計" : "Total"}</span>
            <span>${fmtCurrency(total, currency)}</span>
          </div>
        </div>
      </div>

      <div class="footer-note">
        <div>${
          isJa
            ? "本メールに基づき出荷手配をお願いします。"
            : "Please fulfill this order."
        }</div>
        <div style="margin-top: 8px; font-size: 12px;">
          ${
            isJa
              ? "（注）StripeのWebhookは重複配送されることがあります。同一Session IDの多重処理にご注意ください。"
              : "(Note) Stripe webhook events can be delivered more than once. Ensure idempotency."
          }
        </div>
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

/* --------------------------- webhook entry -------------------------- */
export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // 署名検証のため raw body を使用
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
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;
        // 重い処理は待たずに投げる（Stripeの再送対策）
        sendFulfillmentEmail(session.id).catch((e) =>
          console.error("mail err", e)
        );
        break;
      }
      default: {
        // 必要に応じて追加
        console.log("Unhandled event:", event.type);
      }
    }
    // できるだけ早く 200
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json(
      { error: "Webhook handler error" },
      { status: 500 }
    );
  }
}
