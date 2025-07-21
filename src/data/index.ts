// src/data/index.ts
export * from "./types";

// 国際化対応のユーティリティ関数をエクスポート
export {
  getProducts,
  getHeroData,
  getCategories,
  getSortOptions,
  formatPrice,
  formatPriceWithWeight,
  formatPriceWithVolume, // 追加：これでエラーが解決
  getProductDetails,
  getProductById,
  getProductsByCategory,
  sortProducts,
} from "./utils";

// products のエクスポート - デフォルトは日本語
export { products } from "./locales/ja";
export { categories, sortOptions } from "./locales/ja";
export { heroData } from "./locales/ja";

// 後方互換性のため、既存のコードで使用されているエクスポートも追加
import { getProducts } from "./utils";

// ロケール指定なしで使用される場合のデフォルト
export const getDefaultProducts = () => getProducts("ja");
