// scripts/sync-stripe-catalog.ts
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import Stripe from "stripe";
import { pathToFileURL } from "url";

// ---- env (.env.local を明示的にロード) ----
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ STRIPE_SECRET_KEY が未設定です（.env.local を確認）");
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

// ---- CLI args ----
function parseArgs() {
  const args = process.argv.slice(2);
  const has = (k: string) => args.includes(k);
  return {
    archiveOld: has("--archive-old"),
    setDefault: has("--set-default"),
  };
}
const { archiveOld, setDefault } = parseArgs();

// ---- Paths ----
const root = process.cwd();
const enPath = path.join(root, "src/data/locales/en.ts");
const jaPath = path.join(root, "src/data/locales/ja.ts");

// ---- types ----
type LocalProduct = {
  id: number;
  name: string;
  description: string;
  price: number; // USD
  originalPrice: number | null;
  category: string;
  image: { url: string; alt: string; width: number; height: number };
  subImages?: { url: string; alt: string; width: number; height: number }[];
  details: Record<string, string | null | undefined>;
  stripeProductId?: string;
  stripePriceId?: string;
};
type LocaleModule = { products: LocalProduct[] };

// ---- load locales (tsx 実行前提) ----
async function loadLocales(): Promise<{ en: LocaleModule; ja: LocaleModule }> {
  const en = (await import(
    pathToFileURL(enPath).href
  )) as unknown as LocaleModule;
  const ja = (await import(
    pathToFileURL(jaPath).href
  )) as unknown as LocaleModule;
  return { en, ja };
}

// ---- helpers ----
const MAX_METADATA_VALUE = 500;
const trim500 = (s: string) =>
  s.length > MAX_METADATA_VALUE ? s.slice(0, MAX_METADATA_VALUE - 1) + "…" : s;

function pickImageUrl(p?: LocalProduct) {
  if (!p) return undefined;
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://your-domain.com"
      : "http://localhost:3000");
  return `${base}${p.image.url}`;
}

function eq(a?: string | null, b?: string | null) {
  return (a ?? "") === (b ?? "");
}

async function findProductByLocalId(
  localId: number
): Promise<Stripe.Product | null> {
  // Stripeのmetadata検索はfilter不可のため list→client-side filter
  const list = await stripe.products.list({ limit: 100, active: true });
  return (
    list.data.find((p) => p.metadata?.local_id === String(localId)) ?? null
  );
}

async function ensureProduct(
  id: number,
  jaP?: LocalProduct,
  enP?: LocalProduct
): Promise<Stripe.Product> {
  // 表示名・説明は日本語優先
  const nameJA = jaP?.name ?? enP?.name ?? `Item ${id}`;
  const descJA = jaP?.description ?? enP?.description ?? "";

  const candidateId = jaP?.stripeProductId || enP?.stripeProductId;
  let product: Stripe.Product | null = null;

  if (candidateId) {
    try {
      product = await stripe.products.retrieve(candidateId);
    } catch {
      product = null;
    }
  }
  if (!product) {
    product = await findProductByLocalId(id);
  }

  // metadata は500文字制限があるので長文は入れない（desc_enは入れない）
  const meta: Record<string, string> = {
    local_id: String(id),
    name_en: trim500(enP?.name ?? ""),
    category: trim500(jaP?.category ?? enP?.category ?? ""),
    origin: trim500(String(jaP?.details?.origin ?? enP?.details?.origin ?? "")),
    weight: trim500(String(jaP?.details?.weight ?? enP?.details?.weight ?? "")),
  };

  const img = pickImageUrl(jaP || enP);
  const images = img ? [img] : [];

  if (!product) {
    product = await stripe.products.create({
      name: nameJA,
      description: descJA, // 長文OK
      images,
      metadata: meta,
    });
    console.log(`✅ Product created: ${product.id} (id=${id})`);
  } else {
    const needsUpdate =
      !eq(product.name, nameJA) ||
      !eq(product.description, descJA) ||
      (img && product.images?.[0] !== img);

    if (needsUpdate) {
      product = await stripe.products.update(product.id, {
        name: nameJA,
        description: descJA,
        images,
        metadata: { ...(product.metadata || {}), ...meta },
      });
      console.log(`🔄 Product updated: ${product.id} (id=${id})`);
    } else {
      // metadata だけズレてる可能性に備えて軽く同期
      const mergedMeta: Record<string, string> = {
        ...(product.metadata || {}),
        ...meta,
      };
      const metaChanged = [
        "local_id",
        "name_en",
        "category",
        "origin",
        "weight",
      ].some((k) => (product!.metadata?.[k] ?? "") !== mergedMeta[k]);
      if (metaChanged) {
        await stripe.products.update(product.id, { metadata: mergedMeta });
        console.log(`🧾 Product metadata synced: ${product.id} (id=${id})`);
      } else {
        console.log(`= Product up-to-date: ${product.id} (id=${id})`);
      }
    }
  }

  return product;
}

async function ensurePrice(
  product: Stripe.Product,
  desiredAmountCents: number,
  currency = "usd",
  oldPriceId?: string
): Promise<{ price: Stripe.Price; replacedOld?: string }> {
  let oldPrice: Stripe.Price | null = null;

  if (oldPriceId) {
    try {
      oldPrice = await stripe.prices.retrieve(oldPriceId);
    } catch {
      oldPrice = null;
    }
  }

  if (!oldPrice) {
    // 同額・同通貨の有効Priceがあれば再利用
    const prices = await stripe.prices.list({
      product: product.id,
      active: true,
      limit: 100,
    });
    const match = prices.data.find(
      (p) => p.unit_amount === desiredAmountCents && p.currency === currency
    );
    if (match) return { price: match };
  } else if (
    oldPrice.unit_amount === desiredAmountCents &&
    oldPrice.currency === currency
  ) {
    return { price: oldPrice };
  }

  // 新価格作成
  const newPrice = await stripe.prices.create({
    product: product.id,
    unit_amount: desiredAmountCents,
    currency,
    metadata: { from_sync: "true" },
  });

  console.log(
    `💰 Price created: ${
      newPrice.id
    } -> ${desiredAmountCents} ${currency.toUpperCase()}`
  );
  return { price: newPrice, replacedOld: oldPrice?.id };
}

function replaceIdsInLocaleFile(
  filePath: string,
  idMap: Record<number, { productId: string; priceId: string }>
) {
  let content = fs.readFileSync(filePath, "utf8");

  for (const [idStr, { productId, priceId }] of Object.entries(idMap)) {
    const id = Number(idStr);

    // stripeProductId
    const prodRe = new RegExp(
      `(\\bid:\\s*${id}[\\s\\S]*?stripeProductId:\\s*")([^"]*)(")`,
      "g"
    );
    content = content.replace(
      prodRe,
      (_m, pre, _old, post) => `${pre}${productId}${post}`
    );

    // stripePriceId
    const priceRe = new RegExp(
      `(\\bid:\\s*${id}[\\s\\S]*?stripePriceId:\\s*")([^"]*)(")`,
      "g"
    );
    content = content.replace(
      priceRe,
      (_m, pre, _old, post) => `${pre}${priceId}${post}`
    );
  }

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`📝 wrote: ${filePath}`);
}

async function main() {
  console.log("🚀 Sync Stripe catalog (create/update) starting...\n");

  const { en, ja } = await loadLocales();
  const byId = new Map<number, { en?: LocalProduct; ja?: LocalProduct }>();

  for (const p of en.products)
    byId.set(p.id, { ...(byId.get(p.id) || {}), en: p });
  for (const p of ja.products)
    byId.set(p.id, { ...(byId.get(p.id) || {}), ja: p });

  const idMap: Record<number, { productId: string; priceId: string }> = {};

  for (const [id, pair] of byId.entries()) {
    const enP = pair.en;
    const jaP = pair.ja;
    if (!enP && !jaP) continue;

    const desiredUSD = (enP ?? jaP)!.price;
    const desiredCents = Math.round(desiredUSD * 100);

    // 1) Product upsert（日本語優先）
    const product = await ensureProduct(id, jaP, enP);

    // 2) Price 新規/再利用 + 旧Price退役オプション
    const oldPriceId = jaP?.stripePriceId || enP?.stripePriceId;
    const { price: newPrice, replacedOld } = await ensurePrice(
      product,
      desiredCents,
      "usd",
      oldPriceId
    );

    if (archiveOld && replacedOld && replacedOld !== newPrice.id) {
      try {
        await stripe.prices.update(replacedOld, { active: false });
        console.log(`📦 archived old price: ${replacedOld}`);
      } catch (e) {
        console.warn(
          `⚠️ failed to archive old price ${replacedOld}:`,
          (e as Error).message
        );
      }
    }

    // 3) default_price 差し替え（任意）
    if (setDefault && product.default_price !== newPrice.id) {
      await stripe.products.update(product.id, { default_price: newPrice.id });
      console.log(`⭐ default_price -> ${newPrice.id}`);
    }

    // 4) ローカル書き戻し
    idMap[id] = { productId: product.id, priceId: newPrice.id };
  }

  replaceIdsInLocaleFile(enPath, idMap);
  replaceIdsInLocaleFile(jaPath, idMap);

  console.log("\n🎉 Completed sync!");
}

main().catch((e) => {
  console.error("❌ failed:", e);
  process.exit(1);
});
