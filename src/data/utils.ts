// src/data/utils.ts - 修正版（USD対応）
import { Product } from "./types";

// ロケール別データのインポート
import * as jaData from "./locales/ja";
import * as enData from "./locales/en";

// ロケール別データマップ
const dataByLocale = {
  ja: jaData,
  en: enData,
} as const;

// ロケール対応のデータ取得関数
export const getProducts = (locale: string = "ja"): Product[] => {
  const data =
    dataByLocale[locale as keyof typeof dataByLocale] || dataByLocale.ja;
  return data.products;
};

export const getHeroData = (locale: string = "ja") => {
  const data =
    dataByLocale[locale as keyof typeof dataByLocale] || dataByLocale.ja;
  return data.heroData;
};

export const getCategories = (locale: string = "ja"): string[] => {
  const data =
    dataByLocale[locale as keyof typeof dataByLocale] || dataByLocale.ja;
  return data.categories;
};

export const getSortOptions = (locale: string = "ja"): string[] => {
  const data =
    dataByLocale[locale as keyof typeof dataByLocale] || dataByLocale.ja;
  return data.sortOptions;
};

// 価格フォーマット（USD表示）
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

// 重量付き価格フォーマット（お茶用）
export const formatPriceWithWeight = (product: Product): string => {
  const weight = product.details.weight || "20g";
  return `${weight} $${product.price.toFixed(2)}`;
};

// ボリューム付き価格フォーマット（エラー修正のため追加）
export const formatPriceWithVolume = (product: Product): string => {
  // weightをvolumeとして扱う場合
  return formatPriceWithWeight(product);
};

// 商品詳細の取得（お茶用国際化対応）
export const getProductDetails = (
  product: Product,
  locale: string = "ja"
): { label: string; value: string }[] => {
  const details = [];

  // ラベルの翻訳マップ（お茶用）
  const labels = {
    ja: {
      weight: "内容量",
      origin: "産地",
      harvestSeason: "収穫期",
    },
    en: {
      weight: "Net Weight",
      origin: "Origin",
      harvestSeason: "Harvest Season",
    },
  };

  const labelMap = labels[locale as keyof typeof labels] || labels.ja;

  if (product.details.weight) {
    details.push({
      label: labelMap.weight,
      value: product.details.weight,
    });
  }
  if (product.details.origin) {
    details.push({
      label: labelMap.origin,
      value: product.details.origin,
    });
  }
  if (product.details.harvestSeason) {
    details.push({
      label: labelMap.harvestSeason,
      value: product.details.harvestSeason,
    });
  }

  return details;
};

// 商品IDで検索（国際化対応）
export const getProductById = (
  id: number,
  locale: string = "ja"
): Product | undefined => {
  const products = getProducts(locale);
  return products.find((product) => product.id === id);
};

// カテゴリ別商品取得（国際化対応）
export const getProductsByCategory = (
  category: string,
  locale: string = "ja"
): Product[] => {
  const products = getProducts(locale);
  const categories = getCategories(locale);
  const allCategory = categories[0]; // "すべて" or "All"

  if (category === allCategory) return products;
  return products.filter((product) => product.category === category);
};

// 商品ソート（国際化対応）
export const sortProducts = (
  products: Product[],
  sortBy: string,
  locale: string = "ja"
): Product[] => {
  const sorted = [...products];
  const sortOptions = getSortOptions(locale);
  const [recommended, priceLowToHigh, priceHighToLow, newest] = sortOptions;

  switch (sortBy) {
    case priceLowToHigh:
      return sorted.sort((a, b) => a.price - b.price);
    case priceHighToLow:
      return sorted.sort((a, b) => b.price - a.price);
    case newest:
      return sorted.sort((a, b) => b.id - a.id);
    case recommended:
    default:
      return sorted.sort((a, b) => a.id - b.id);
  }
};
