// src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { products as enProducts } from "@/data/locales/en";
import { products as jaProducts } from "@/data/locales/ja";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

type Item = { id: number; quantity: number };

function findProduct(id: number, locale: "ja" | "en") {
  const products = locale === "ja" ? jaProducts : enProducts;
  const product = products.find((x) => x.id === id);
  if (!product) {
    throw new Error(`商品ID ${id} が見つかりません`);
  }
  return product;
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

    const origin = req.nextUrl.origin;
    const locale = inferLocaleFromReferer(req);
    const currency = locale === "ja" ? "jpy" : "usd";

    // 各商品のline_itemsを構築（price_dataで通貨を動的に設定）
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const item of items) {
      try {
        const product = findProduct(item.id, locale);
        if (product.availableForPurchase === false) {
          return NextResponse.json(
            {
              error:
                locale === "ja"
                  ? "この商品は季節限定のため、現在ご購入いただけません。"
                  : "This seasonal item is currently sold out and unavailable for purchase.",
              productId: item.id,
            },
            { status: 400 },
          );
        }
        // JPYは税込（小数なし）、USDはセント単位
        const unitAmount =
          currency === "jpy"
            ? Math.round(product.price * 1.1)
            : Math.round(product.price * 100);
        line_items.push({
          price_data: {
            currency,
            product_data: {
              name: product.name,
              images: product.image?.url
                ? [`${origin}${product.image.url}`]
                : [],
            },
            unit_amount: unitAmount,
          },
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
          { status: 400 },
        );
      }
    }

    // 送料オプション（英語＝アメリカ向け$15、日本語＝日本向け¥600）
    const isUS = locale === "en";
    const shippingOptions: Stripe.Checkout.SessionCreateParams.ShippingOption[] =
      [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: isUS ? 1500 : 660, // $15 (cents) or ¥660（税込）
              currency,
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
      locale: locale === "ja" ? "ja" : "en",
      line_items,
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: isUS ? ["US"] : ["JP"],
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
              ? "お問い合わせがございましたら、メールまでご連絡ください。"
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
        { status: 400 },
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
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const sessionId = new URL(req.url).searchParams.get("session_id");
    if (!sessionId) {
      return NextResponse.json(
        { error: "session_id パラメータが必要です" },
        { status: 400 },
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
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("セッション取得エラー:", error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        {
          error: `Stripeセッション取得エラー: ${error.message}`,
          stripeErrorType: error.type,
        },
        { status: 400 },
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
