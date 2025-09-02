// src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { products as enProducts } from "@/data/locales/en";
import { products as jaProducts } from "@/data/locales/ja";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

type Item = { id: number; quantity: number };

async function findAndValidatePriceId(id: number): Promise<string> {
  // 商品データからPrice IDを取得
  const product =
    enProducts.find((x) => x.id === id) ?? jaProducts.find((x) => x.id === id);

  if (!product) {
    throw new Error(`商品ID ${id} が見つかりません`);
  }

  if (!product.stripePriceId) {
    throw new Error(
      `商品 "${product.name}" (ID: ${id}) のStripe Price IDが設定されていません。` +
        `商品データファイルでstripePriceIdを確認してください。`
    );
  }

  // Stripeで実際にPrice IDが存在するかチェック
  try {
    await stripe.prices.retrieve(product.stripePriceId);
    return product.stripePriceId;
  } catch (stripeError) {
    if (stripeError instanceof Stripe.errors.StripeError) {
      throw new Error(
        `Stripe Price ID "${product.stripePriceId}" が存在しません。` +
          `Stripeダッシュボードで価格を作成するか、商品データの stripePriceId を正しい値に更新してください。` +
          `商品: "${product.name}" (ID: ${id})`
      );
    }
    throw stripeError;
  }
}

function inferLocaleFromReferer(req: NextRequest): "ja" | "en" {
  try {
    const ref = req.headers.get("referer") || "";
    const u = new URL(ref);
    const seg = u.pathname.split("/").filter(Boolean)[0];
    return seg === "ja" || seg === "en" ? (seg as "ja" | "en") : "ja";
  } catch {
    return "ja";
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { items?: Item[] } | null;
    const items = body?.items ?? [];

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "カートが空です" }, { status: 400 });
    }

    // 各商品のPrice IDを検証
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const item of items) {
      try {
        const priceId = await findAndValidatePriceId(item.id);
        line_items.push({
          price: priceId,
          quantity: item.quantity > 0 ? item.quantity : 1,
        });
      } catch (validationError) {
        console.error(`商品ID ${item.id} の検証エラー:`, validationError);

        return NextResponse.json(
          {
            error:
              validationError instanceof Error
                ? validationError.message
                : `商品ID ${item.id} の設定に問題があります`,
            productId: item.id,
            action: "商品データまたはStripe設定を確認してください",
          },
          { status: 400 }
        );
      }
    }

    const origin = req.nextUrl.origin;
    const locale = inferLocaleFromReferer(req);

    // 送料オプションの設定（3.5ドル固定）
    const shippingOptions: Stripe.Checkout.SessionCreateParams.ShippingOption[] =
      [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 350, // 3.5ドル = 350セント
              currency: "usd",
            },
            display_name: locale === "ja" ? "標準配送" : "Standard Shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 3,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
      ];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "JP", "GB", "DE", "FR", "AU"], // 配送可能国を設定
      },
      shipping_options: shippingOptions,
      // 領収書の自動送信を有効化
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description:
            locale === "ja"
              ? "ご購入ありがとうございます"
              : "Thank you for your purchase",
          footer:
            locale === "ja"
              ? "お問い合わせがございましたら、サポートまでご連絡ください。"
              : "If you have any questions, please contact our support team.",
          metadata: {
            locale,
            order_date: new Date().toISOString(),
          },
        },
      },
      // カスタム領収書設定
      payment_intent_data: {
        receipt_email: undefined, // チェックアウト時に入力されたメールアドレスを使用
        metadata: {
          locale,
          send_receipt: "true",
        },
      },
      success_url: `${origin}/${locale}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${locale}/cancel`,
      metadata: {
        locale,
        created_at: new Date().toISOString(),
        shipping_enabled: "true",
      },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error: unknown) {
    console.error("チェックアウトセッション作成エラー:", error);

    // Stripeエラーの詳細なハンドリング
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        {
          error: `Stripe API エラー: ${error.message}`,
          stripeErrorType: error.type,
          stripeErrorCode: error.code,
        },
        { status: 400 }
      );
    }

    const message =
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof (error as { message: unknown }).message === "string"
        ? (error as { message: string }).message
        : "チェックアウトセッションの作成に失敗しました";

    return NextResponse.json(
      {
        error: message,
        suggestion:
          "商品データのstripePriceId設定を確認するか、Stripeダッシュボードで価格を作成してください",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const sessionId = new URL(req.url).searchParams.get("session_id");
    if (!sessionId) {
      return NextResponse.json(
        { error: "session_id パラメータが必要です" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer_details", "line_items"],
    });

    return NextResponse.json(
      {
        session: {
          id: session.id,
          payment_status: session.payment_status,
          amount_total: session.amount_total,
          currency: session.currency,
          customer_details: {
            email: session.customer_details?.email ?? null,
            name: session.customer_details?.name ?? null,
          },
          metadata: session.metadata,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("セッション取得エラー:", error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        {
          error: `Stripeセッション取得エラー: ${error.message}`,
          stripeErrorType: error.type,
        },
        { status: 400 }
      );
    }

    const message =
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof (error as { message: unknown }).message === "string"
        ? (error as { message: string }).message
        : "セッション情報の取得に失敗しました";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
