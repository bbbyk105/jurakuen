// src/app/api/send-receipt/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

// NodeMailer設定
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "session_id が必要です" },
        { status: 400 }
      );
    }

    // セッション情報を取得
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer_details", "line_items.data.price.product"],
    });

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "決済が完了していません" },
        { status: 400 }
      );
    }

    const customerEmail = session.customer_details?.email;
    if (!customerEmail) {
      return NextResponse.json(
        { error: "顧客のメールアドレスが見つかりません" },
        { status: 400 }
      );
    }

    const locale = session.metadata?.locale || "ja";
    const isJapanese = locale === "ja";

    // 領収書データを準備
    const receiptNumber = `RCP-${session.id.slice(-8).toUpperCase()}`;
    const purchaseDate = new Date(session.created * 1000).toLocaleDateString(
      isJapanese ? "ja-JP" : "en-US"
    );

    const items = session.line_items?.data || [];
    const subtotal = session.amount_subtotal || 0;
    const shippingCost = 400;
    const tax = session.total_details?.amount_tax || 0;
    const total = session.amount_total || 0;

    // メール内容を作成
    const subject = isJapanese
      ? `【領収書】ご購入ありがとうございます - ${receiptNumber}`
      : `[Receipt] Thank you for your purchase - ${receiptNumber}`;

    const emailHtml = `
  <!DOCTYPE html>
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
        <!-- 販売者情報セクション -->
        <div class="seller-info">
          <h3>聚楽苑</h3>
          <div>〒417-0812</div>
          <div>静岡県 富士市堺 485-2</div>
          <div style="margin-top: 5px;">jurakuenfuji@gmail.com</div>
        </div>
        
        <!-- ヘッダー -->
        <div class="header">
          <div class="receipt-number">${isJapanese ? "領収書" : "Receipt"}</div>
          <div class="date">${receiptNumber}</div>
          <div class="date">${purchaseDate}</div>
        </div>
        
        <div class="content">
          <!-- お客様情報 -->
          <div class="section">
            <div class="section-title">${
              isJapanese ? "お客様情報" : "Customer Information"
            }</div>
            <div class="customer-info">
              <div class="info-row">
                <strong>${isJapanese ? "お名前" : "Name"}:</strong> 
                ${
                  session.customer_details?.name ||
                  (isJapanese ? "お客様" : "Customer")
                } 
                ${isJapanese ? "様" : ""}
              </div>
              <div class="info-row">
                <strong>${isJapanese ? "メールアドレス" : "Email"}:</strong> 
                ${customerEmail}
              </div>
              ${
                session.customer_details?.address
                  ? `
                <div class="info-row">
                  <strong>${isJapanese ? "ご住所" : "Address"}:</strong>
                </div>
                <div style="margin-left: 10px;">
                  ${
                    session.customer_details.address.postal_code
                      ? `〒${session.customer_details.address.postal_code}<br>`
                      : ""
                  }
                  ${
                    session.customer_details.address.state
                      ? `${session.customer_details.address.state}${
                          session.customer_details.address.city
                            ? session.customer_details.address.city
                            : ""
                        }<br>`
                      : ""
                  }
                  ${
                    session.customer_details.address.line1
                      ? `${session.customer_details.address.line1}<br>`
                      : ""
                  }
                  ${
                    session.customer_details.address.line2
                      ? `${session.customer_details.address.line2}`
                      : ""
                  }
                </div>
              `
                  : ""
              }
            </div>
          </div>

          <!-- ご購入商品 -->
          <div class="section">
            <div class="section-title">${
              isJapanese ? "ご購入商品" : "Items Purchased"
            }</div>
            ${items
              .map((item) => {
                const product = item.price?.product as Stripe.Product;
                const unitAmount = item.price?.unit_amount || 0;
                const totalAmount = unitAmount * (item.quantity || 1);
                return `
                <div class="item">
                  <div>
                    <strong>${
                      product?.name || (isJapanese ? "商品" : "Product")
                    }</strong><br>
                    <small>${isJapanese ? "数量" : "Quantity"}: ${
                  item.quantity || 1
                }</small>
                  </div>
                  <div style="text-align: right;">
                    <div>$${(unitAmount / 100).toFixed(2)} ${
                  isJapanese ? "× " : "x "
                }${item.quantity || 1}</div>
                    <strong>$${(totalAmount / 100).toFixed(2)}</strong>
                  </div>
                </div>
              `;
              })
              .join("")}
          </div>

          <!-- 合計金額 -->
          <div class="total-section">
            <div class="total-row">
              <span>${isJapanese ? "小計" : "Subtotal"}</span>
              <span>$${(subtotal / 100).toFixed(2)}</span>
            </div>
            <div class="total-row">
              <span>${isJapanese ? "送料" : "Shipping"}</span>
              <span>$${(shippingCost / 100).toFixed(2)}</span>
            </div>
            ${
              tax > 0
                ? `
            <div class="total-row">
              <span>${isJapanese ? "税金" : "Tax"}</span>
              <span>$${(tax / 100).toFixed(2)}</span>
            </div>`
                : ""
            }
            <div class="total-row total-final">
              <span>${isJapanese ? "合計" : "Total"}</span>
              <span>$${(total / 100).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <!-- フッター -->
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
  </html>
`;

    // メールを送信
    const emailResult = await transporter.sendMail({
      from: process.env.FROM_EMAIL || "noreply@yourstore.com",
      to: customerEmail,
      subject,
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      message: isJapanese
        ? "領収書をメールで送信しました"
        : "Receipt sent via email",
      messageId: emailResult.messageId,
      receipt_number: receiptNumber,
    });
  } catch (error: unknown) {
    console.error("領収書メール送信エラー:", error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        {
          error: `Stripe API エラー: ${error.message}`,
          stripeErrorType: error.type,
        },
        { status: 400 }
      );
    }

    const message =
      error instanceof Error
        ? error.message
        : "領収書メールの送信に失敗しました";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
