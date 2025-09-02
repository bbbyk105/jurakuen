// scripts/create-stripe-products.ts
import dotenv from "dotenv";
import path from "path";

// .env.localを明示的に読み込み
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// 環境変数の存在チェック
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ STRIPE_SECRET_KEY環境変数が設定されていません");
  console.error("💡 .env.localファイルにStripe APIキーを設定してください");
  process.exit(1);
}

import Stripe from "stripe";
import { products as enProducts } from "@/data/locales/en";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

async function createStripeProducts() {
  console.log("🚀 Stripe商品・価格の作成を開始します...");

  for (const product of enProducts) {
    try {
      console.log(`\n📦 処理中: ${product.name}`);

      // 既存の商品をチェック
      let stripeProduct;
      try {
        if (product.stripeProductId) {
          stripeProduct = await stripe.products.retrieve(
            product.stripeProductId
          );
          console.log(`✅ 既存の商品が見つかりました: ${stripeProduct.id}`);
        }
      } catch {
        console.log("ℹ️ 既存の商品が見つからないため、新規作成します");
      }

      // 商品を作成（存在しない場合）
      if (!stripeProduct) {
        stripeProduct = await stripe.products.create({
          name: product.name,
          description: product.description,
          metadata: {
            local_id: product.id.toString(),
            category: product.category,
            weight: product.details.weight ?? "",
            origin: product.details.origin ?? "",
          },
          images: [
            `${process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com"}${
              product.image.url
            }`,
          ],
        });
        console.log(`✅ 商品を作成しました: ${stripeProduct.id}`);
      }

      // 価格をチェック・作成
      let stripePrice;
      try {
        if (product.stripePriceId) {
          stripePrice = await stripe.prices.retrieve(product.stripePriceId);
          console.log(`✅ 既存の価格が見つかりました: ${stripePrice.id}`);
        }
      } catch {
        console.log("ℹ️ 既存の価格が見つからないため、新規作成します");
      }

      if (!stripePrice) {
        stripePrice = await stripe.prices.create({
          unit_amount: product.price * 100, // USDの場合はセント単位
          currency: "usd",
          product: stripeProduct.id,
          metadata: {
            local_id: product.id.toString(),
            original_price: product.originalPrice
              ? (product.originalPrice * 100).toString()
              : null,
          },
        });
        console.log(`✅ 価格を作成しました: ${stripePrice.id}`);
      }

      // 更新が必要な情報を出力
      console.log(`📝 商品データの更新情報:`);
      console.log(`   stripeProductId: "${stripeProduct.id}"`);
      console.log(`   stripePriceId: "${stripePrice.id}"`);
    } catch (error) {
      console.error(`❌ ${product.name} の処理中にエラーが発生:`, error);
    }
  }

  console.log("\n🎉 処理が完了しました！");
  console.log("📋 上記の情報を使って商品データファイルを更新してください。");
}

// 実行用の関数
async function main() {
  try {
    await createStripeProducts();
  } catch (error) {
    console.error("❌ スクリプトの実行に失敗:", error);
    process.exit(1);
  }
}

// 直接実行する場合
if (require.main === module) {
  main();
}

export { createStripeProducts };
