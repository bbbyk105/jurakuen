import type Stripe from "stripe";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function receiptNumberFor(sessionId: string): string {
  return `RCP-${sessionId.slice(-8).toUpperCase()}`;
}

export function emailLocale(session: Stripe.Checkout.Session): "ja" | "en" {
  return session.metadata?.locale === "en" ? "en" : "ja";
}

export function customerEmailOf(session: Stripe.Checkout.Session): string | null {
  return session.customer_details?.email || session.customer_email || null;
}

function fmtCurrency(amount: number | null | undefined, currency?: string | null): string {
  const cur = (currency || "jpy").toUpperCase();
  const n = typeof amount === "number" ? amount : 0;
  const isJPY = cur === "JPY";
  return new Intl.NumberFormat(isJPY ? "ja-JP" : "en-US", {
    style: "currency",
    currency: cur,
    maximumFractionDigits: isJPY ? 0 : 2,
    minimumFractionDigits: isJPY ? 0 : 2,
  }).format(isJPY ? n : n / 100);
}

function formatTokyo(unixSeconds: number, locale: "ja" | "en"): string {
  return new Date(unixSeconds * 1000).toLocaleString(locale === "ja" ? "ja-JP" : "en-US", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });
}

function productOf(item: Stripe.LineItem): Stripe.Product | null {
  const product = item.price?.product;
  if (!product || typeof product === "string") return null;
  if ("deleted" in product && product.deleted) return null;
  return product;
}

export function shippingTarget(session: Stripe.Checkout.Session): {
  name: string;
  phone?: string;
  address: Stripe.Address | null;
} {
  const collected = session.collected_information?.shipping_details ?? null;
  const paymentIntent =
    session.payment_intent && typeof session.payment_intent !== "string"
      ? session.payment_intent
      : null;
  const customer = session.customer_details;
  const phone = paymentIntent?.shipping?.phone || customer?.phone || undefined;

  return {
    name: collected?.name || paymentIntent?.shipping?.name || customer?.name || "(no name)",
    phone: phone || undefined,
    address: collected?.address || paymentIntent?.shipping?.address || customer?.address || null,
  };
}

function addressLines(addr: Stripe.Address | null | undefined): string[] {
  if (!addr) return ["(住所未取得)"];
  const lines = [
    [addr.postal_code, addr.state, addr.city].filter(Boolean).join(" "),
    [addr.line1, addr.line2].filter(Boolean).join(" "),
    addr.country,
  ].filter((line): line is string => Boolean(line));
  return lines.length > 0 ? lines : ["(住所未取得)"];
}

export function buildReceiptEmail(
  session: Stripe.Checkout.Session,
  customerEmail: string,
): { subject: string; html: string; receiptNumber: string } {
  const isJapanese = emailLocale(session) === "ja";
  const receiptNumber = receiptNumberFor(session.id);
  const purchaseDate = formatTokyo(session.created, isJapanese ? "ja" : "en");
  const items = session.line_items?.data ?? [];
  const subtotal = session.amount_subtotal || 0;
  const shippingCost =
    session.total_details?.amount_shipping ?? (isJapanese ? 660 : 1500);
  const tax = session.total_details?.amount_tax || 0;
  const total = session.amount_total || 0;
  const currency = session.currency || (isJapanese ? "jpy" : "usd");
  const name = session.customer_details?.name || (isJapanese ? "お客様" : "Customer");
  const address = session.customer_details?.address;

  const subject = isJapanese
    ? `【領収書】ご購入ありがとうございます - ${receiptNumber}`
    : `[Receipt] Thank you for your purchase - ${receiptNumber}`;

  const itemsHtml = items
    .map((item) => {
      const product = productOf(item);
      const unitAmount = item.price?.unit_amount || 0;
      const quantity = item.quantity || 1;
      const lineTotal = unitAmount * quantity;
      const productName = product?.name || (isJapanese ? "商品" : "Product");
      return `
                <div class="item">
                  <div>
                    <strong>${escapeHtml(productName)}</strong><br>
                    <small>${isJapanese ? "数量" : "Quantity"}: ${quantity}</small>
                  </div>
                  <div style="text-align: right;">
                    <div>${fmtCurrency(unitAmount, currency)} ${isJapanese ? "× " : "x "}${quantity}</div>
                    <strong>${fmtCurrency(lineTotal, currency)}</strong>
                  </div>
                </div>`;
    })
    .join("");

  const addressHtml = address
    ? `
                <div class="info-row">
                  <strong>${isJapanese ? "ご住所" : "Address"}:</strong>
                </div>
                <div style="margin-left: 10px;">
                  ${address.postal_code ? `〒${escapeHtml(address.postal_code)}<br>` : ""}
                  ${
                    address.state
                      ? `${escapeHtml(address.state)}${address.city ? escapeHtml(address.city) : ""}<br>`
                      : ""
                  }
                  ${address.line1 ? `${escapeHtml(address.line1)}<br>` : ""}
                  ${address.line2 ? escapeHtml(address.line2) : ""}
                </div>`
    : "";

  const html = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .header { background: #1f2937; color: white; padding: 30px; text-align: center; }
        .seller-info { background: #374151; color: white; padding: 20px; text-align: center; font-size: 14px; }
        .seller-info h3 { margin: 0 0 10px 0; font-size: 18px; }
        .content { padding: 30px; }
        .receipt-number { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        .date { opacity: 0.8; }
        .section { margin: 20px 0; }
        .section-title { font-weight: bold; margin-bottom: 10px; color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; }
        .customer-info { background: #f8fafc; padding: 15px; border-radius: 6px; margin-bottom: 20px; }
        .info-row { margin-bottom: 8px; }
        .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
        .item:last-child { border-bottom: none; }
        .total-section { background: #f9fafb; padding: 20px; border-radius: 6px; margin-top: 20px; }
        .total-row { display: flex; justify-content: space-between; padding: 5px 0; }
        .total-final { font-weight: bold; font-size: 18px; border-top: 2px solid #d1d5db; padding-top: 10px; margin-top: 10px; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="seller-info">
          <h3>聚楽苑</h3>
          <div>〒417-0812</div>
          <div>静岡県 富士市境 485-2</div>
          <div style="margin-top: 5px;">jurakuenfuji@gmail.com</div>
        </div>
        <div class="header">
          <div class="receipt-number">${isJapanese ? "領収書" : "Receipt"}</div>
          <div class="date">${escapeHtml(receiptNumber)}</div>
          <div class="date">${escapeHtml(purchaseDate)}</div>
        </div>
        <div class="content">
          <div class="section">
            <div class="section-title">${isJapanese ? "お客様情報" : "Customer Information"}</div>
            <div class="customer-info">
              <div class="info-row">
                <strong>${isJapanese ? "お名前" : "Name"}:</strong>
                ${escapeHtml(name)} ${isJapanese ? "様" : ""}
              </div>
              <div class="info-row">
                <strong>${isJapanese ? "メールアドレス" : "Email"}:</strong>
                ${escapeHtml(customerEmail)}
              </div>
              ${addressHtml}
            </div>
          </div>
          <div class="section">
            <div class="section-title">${isJapanese ? "ご購入商品" : "Items Purchased"}</div>
            ${itemsHtml}
          </div>
          <div class="total-section">
            <div class="total-row">
              <span>${isJapanese ? "小計" : "Subtotal"}</span>
              <span>${fmtCurrency(subtotal, currency)}</span>
            </div>
            <div class="total-row">
              <span>${isJapanese ? "送料" : "Shipping"}</span>
              <span>${fmtCurrency(shippingCost, currency)}</span>
            </div>
            ${
              tax > 0
                ? `<div class="total-row">
              <span>${isJapanese ? "税金" : "Tax"}</span>
              <span>${fmtCurrency(tax, currency)}</span>
            </div>`
                : ""
            }
            <div class="total-row total-final">
              <span>${isJapanese ? "合計" : "Total"}</span>
              <span>${fmtCurrency(total, currency)}</span>
            </div>
          </div>
        </div>
        <div class="footer">
          <p>${
            isJapanese
              ? "この度はご購入いただき、ありがとうございました。"
              : "Thank you for your purchase!"
          }</p>
          <p><small>${
            isJapanese
              ? "お問い合わせがございましたら、上記メールアドレスまでご連絡ください。"
              : "If you have any questions, please contact us at the email address above."
          }</small></p>
        </div>
      </div>
    </body>
  </html>`;

  return { subject, html, receiptNumber };
}

export function buildFulfillmentEmail(session: Stripe.Checkout.Session): {
  subject: string;
  html: string;
} {
  const isJa = emailLocale(session) === "ja";
  const items = session.line_items?.data ?? [];
  const currency = session.currency;
  const subtotal = session.amount_subtotal ?? 0;
  const tax = session.total_details?.amount_tax ?? 0;
  const shippingAmount = session.total_details?.amount_shipping ?? 0;
  const total = session.amount_total ?? 0;
  const ship = shippingTarget(session);
  const addrLines = addressLines(ship.address);
  const customerEmail = customerEmailOf(session);
  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id;

  const subject = isJa
    ? `【新規注文】出荷手配のお願い - ${session.id}`
    : `[New Order] Please Fulfill - ${session.id}`;

  const rows = items
    .map((li) => {
      const product = productOf(li);
      const name = product?.name || (isJa ? "商品" : "Product");
      const sku = product?.metadata?.sku || product?.metadata?.SKU || "";
      const qty = li.quantity || 1;
      const unit = li.price?.unit_amount || 0;
      const lineTotal = unit * qty;
      return `
      <tr>
        <td>
          <div class="product-name">${escapeHtml(name)}</div>
          ${sku ? `<div class="product-sku">SKU: ${escapeHtml(String(sku))}</div>` : ""}
        </td>
        <td>${qty}</td>
        <td>${fmtCurrency(unit, currency)}</td>
        <td>${fmtCurrency(lineTotal, currency)}</td>
      </tr>`;
    })
    .join("");

  const html = `<!doctype html>
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
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header">${isJa ? "新規注文（出荷依頼）" : "New Order (Fulfillment Request)"}</div>
      <div class="section">
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">${isJa ? "注文ID" : "Order ID"}</div>
            <div class="info-value">${escapeHtml(session.id)}</div>
          </div>
          <div class="info-item">
            <div class="info-label">${isJa ? "支払い状況" : "Payment"}</div>
            <div class="info-value">${escapeHtml(session.payment_status || "")}</div>
          </div>
          <div class="info-item">
            <div class="info-label">${isJa ? "お客様メール" : "Customer email"}</div>
            <div class="info-value">${escapeHtml(customerEmail || "(none)")}</div>
          </div>
          <div class="info-item">
            <div class="info-label">${isJa ? "作成日" : "Created"}</div>
            <div class="info-value">${escapeHtml(formatTokyo(session.created || 0, isJa ? "ja" : "en"))}</div>
          </div>
          ${
            paymentIntentId
              ? `<div class="info-item">
                  <div class="info-label">${isJa ? "決済ID" : "Payment ID"}</div>
                  <div class="info-value">${escapeHtml(paymentIntentId)}</div>
                </div>`
              : ""
          }
        </div>
      </div>
      <div class="section">
        <h3 class="title">${isJa ? "配送先" : "Ship To"}</h3>
        <div class="shipping-details">
          <div class="shipping-name">${escapeHtml(ship.name)}</div>
          <div class="shipping-address">
            ${addrLines.map((line) => escapeHtml(line)).join("<br>")}
            ${
              ship.phone
                ? `<div style="margin-top: 8px;">${isJa ? "電話" : "Phone"}: ${escapeHtml(ship.phone)}</div>`
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
            tax > 0
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
        <div>${isJa ? "本メールに基づき出荷手配をお願いします。" : "Please fulfill this order."}</div>
      </div>
    </div>
  </body></html>`;

  return { subject, html };
}
