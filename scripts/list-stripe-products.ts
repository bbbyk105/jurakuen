// scripts/list-stripe-products.ts
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

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

async function listStripeProducts() {
  try {
    console.log("📋 Stripe商品・価格一覧を取得中...\n");

    // 全ての商品を取得
    const products = await stripe.products.list({
      limit: 100,
      active: true,
    });

    if (products.data.length === 0) {
      console.log("❌ Stripeに商品が登録されていません。");
      console.log(
        "💡 商品を作成するには 'npm run stripe:create-products' を実行してください。"
      );
      return;
    }

    console.log(`📦 ${products.data.length}個の商品が見つかりました:\n`);

    for (const product of products.data) {
      console.log(`🔹 商品: ${product.name}`);
      console.log(`   ID: ${product.id}`);
      console.log(`   説明: ${product.description?.substring(0, 100)}...`);

      // この商品の価格を取得
      const prices = await stripe.prices.list({
        product: product.id,
        active: true,
      });

      if (prices.data.length > 0) {
        console.log(`   💰 価格:`);
        prices.data.forEach((price) => {
          const amount = price.unit_amount ? price.unit_amount / 100 : 0;
          console.log(
            `      - ${price.id}: ${amount} ${price.currency.toUpperCase()}`
          );
        });
      } else {
        console.log(`   ⚠️ 価格が設定されていません`);
      }

      console.log(
        `   📊 メタデータ:`,
        JSON.stringify(product.metadata, null, 6)
      );
      console.log("");
    }

    // 商品データファイル用のサンプル出力
    console.log("🔧 商品データファイル更新用の参考情報:");
    console.log("=====================================");

    for (const product of products.data) {
      const prices = await stripe.prices.list({
        product: product.id,
        active: true,
        limit: 1,
      });

      const firstPrice = prices.data[0];
      if (firstPrice) {
        console.log(`// ${product.name}`);
        console.log(`stripeProductId: "${product.id}",`);
        console.log(`stripePriceId: "${firstPrice.id}",`);
        console.log("");
      }
    }
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);

    if (error instanceof Stripe.errors.StripeError) {
      console.error(`Stripeエラー: ${error.message}`);
      console.error(`エラータイプ: ${error.type}`);
    }
  }
}

async function main() {
  try {
    await listStripeProducts();
  } catch (error) {
    console.error("❌ スクリプトの実行に失敗:", error);
    process.exit(1);
  }
}

// 直接実行する場合
if (require.main === module) {
  main();
}

export { listStripeProducts };
