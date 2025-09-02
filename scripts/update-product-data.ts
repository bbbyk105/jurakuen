// scripts/update-product-data.ts
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// .env.localを明示的に読み込み
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// 環境変数の存在チェック
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ STRIPE_SECRET_KEY環境変数が設定されていません");
  process.exit(1);
}

// スクリプト実行結果から得たStripe IDマッピング
const stripeIdMapping = {
  1: {
    stripeProductId: "prod_SylwKGVQ2s7T4v",
    stripePriceId: "price_1S2oOoGf5qkoGUYpj9mjS8qI",
  },
  2: {
    stripeProductId: "prod_SylwLY3mpJfF7I",
    stripePriceId: "price_1S2oOpGf5qkoGUYpwYbbSHyH",
  },
  3: {
    stripeProductId: "prod_Sylwk2bFPyktmJ",
    stripePriceId: "price_1S2oOqGf5qkoGUYp27YgzX8K",
  },
  4: {
    stripeProductId: "prod_SylwGgbjwpNhbq",
    stripePriceId: "price_1S2oOrGf5qkoGUYpVspbR33H",
  },
  5: {
    stripeProductId: "prod_SylwOuCDEg9GA2",
    stripePriceId: "price_1S2oOrGf5qkoGUYpe7YZ22UW",
  },
  6: {
    stripeProductId: "prod_Sylw34uKuLm0Vk",
    stripePriceId: "price_1S2oOsGf5qkoGUYpnc8Lers0",
  },
  7: {
    stripeProductId: "prod_Sylwzjrlg23w8U",
    stripePriceId: "price_1S2oOtGf5qkoGUYpdAs02zjs",
  },
  8: {
    stripeProductId: "prod_SylwsrNs4F5YlQ",
    stripePriceId: "price_1S2oOuGf5qkoGUYpn2bXLwtD",
  },
};

async function updateProductDataFiles() {
  console.log("🔄 商品データファイルの更新を開始します...\n");

  const filesToUpdate = ["src/data/locales/en.ts", "src/data/locales/ja.ts"];

  for (const filePath of filesToUpdate) {
    try {
      console.log(`📝 ${filePath} を更新中...`);

      // ファイルを読み込み
      let content = fs.readFileSync(filePath, "utf8");

      // 各商品IDに対してStripe IDを更新
      Object.entries(stripeIdMapping).forEach(([productId, stripeIds]) => {
        const id = parseInt(productId);

        // 古いstripeProductIdパターンを正しいIDに置換
        const oldProductIdPattern = new RegExp(
          `(\\s+id:\\s*${id}[\\s\\S]*?)stripeProductId:\\s*"[^"]*"`,
          "g"
        );
        content = content.replace(
          oldProductIdPattern,
          `$1stripeProductId: "${stripeIds.stripeProductId}"`
        );

        // 古いstripePriceIdパターンを正しいIDに置換
        const oldPriceIdPattern = new RegExp(
          `(\\s+id:\\s*${id}[\\s\\S]*?)stripePriceId:\\s*"[^"]*"`,
          "g"
        );
        content = content.replace(
          oldPriceIdPattern,
          `$1stripePriceId: "${stripeIds.stripePriceId}"`
        );
      });

      // ファイルに書き戻し
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`✅ ${filePath} の更新が完了しました`);
    } catch (error) {
      console.error(`❌ ${filePath} の更新に失敗:`, error);
    }
  }

  console.log("\n🎉 商品データファイルの更新が完了しました！");
  console.log("💡 チェックアウト機能が正常に動作するはずです。");
}

// より安全な手動更新用の情報出力
async function showUpdateInstructions() {
  console.log("📋 商品データファイル手動更新用の情報:\n");

  Object.entries(stripeIdMapping).forEach(([productId, stripeIds]) => {
    console.log(`商品ID ${productId}:`);
    console.log(`  stripeProductId: "${stripeIds.stripeProductId}"`);
    console.log(`  stripePriceId: "${stripeIds.stripePriceId}"`);
    console.log("");
  });
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--manual") || args.includes("-m")) {
    await showUpdateInstructions();
  } else {
    await updateProductDataFiles();
  }
}

if (require.main === module) {
  main();
}

export { updateProductDataFiles, showUpdateInstructions };
