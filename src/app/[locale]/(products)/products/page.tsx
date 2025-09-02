// src/app/[locale]/(products)/products/page.tsx – スマホ画面でもカートマーク表示対応
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { ShoppingCart, Check, Plus, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

// UI ライブラリ
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// アプリケーションロジック
import { Product } from "@/data/types";
import { useCart } from "@/store/cart";
import {
  getCategories,
  formatPrice,
  getProductDetails,
  getProductsByCategory,
  getSortOptions,
  sortProducts,
} from "@/data/utils";
import { Link } from "@/i18n/routing";

/* ------------------------------------------------------
 *  UI — Product Card
 * ---------------------------------------------------- */
interface ProductCardProps {
  product: Product;
  locale: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, locale }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => {
      setIsAdding(false);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    }, 400);
  };

  return (
    <Card
      className="group bg-transparent border-none shadow-none cursor-pointer"
      onClick={() => router.push(`/${locale}/products/${product.id}`)}
    >
      <CardContent className="p-0">
        {/* Image - 1.3倍拡大対応 */}
        <div className="relative aspect-square bg-[#eeedeb] overflow-hidden">
          <Image
            src={product.image.url}
            alt={product.image.alt}
            fill
            className="object-contain scale-[1.3] transition-transform duration-300 group-hover:scale-[1.35]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority
          />

          {/* Add‑to‑Cart (hover で表示) */}
          <Button
            size="icon"
            onClick={handleAddToCart}
            disabled={isAdding}
            className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {isAdding ? (
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : justAdded ? (
              <Check className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Details */}
        <div className="pt-3">
          <h3 className="text-xs sm:text-sm font-normal text-gray-900 leading-snug line-clamp-2">
            {product.name}
          </h3>

          {/* Optionally show up to 2 spec lines */}
          <div className="mt-1 space-y-0.5 text-[10px] text-gray-500">
            {getProductDetails(product, locale)
              .slice(0, 2)
              .map((d, i) => (
                <p key={i}>
                  {d.label}: {d.value}
                </p>
              ))}
          </div>

          <p className="mt-2 text-sm font-medium text-gray-900">
            {formatPrice(product.price)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

/* ------------------------------------------------------
 *  UI — Page Layout
 * ---------------------------------------------------- */
const ProductPage = () => {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("productList");
  const { getTotalQuantity } = useCart();

  // state
  const categories = getCategories(locale);
  const sortOptions = getSortOptions(locale);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [sortBy, setSortBy] = useState(sortOptions[0]);

  // data
  const filtered = getProductsByCategory(selectedCategory, locale);
  const products = sortProducts(filtered, sortBy, locale);

  const totalQuantity = getTotalQuantity();

  return (
    <main className="bg-white min-h-screen mt-16">
      {/* Header */}
      <header className="max-w-screen-xl mx-auto px-6 pt-12 pb-8">
        <h1 className="text-lg sm:text-xl font-medium tracking-wide text-gray-900">
          {locale === "en" ? "All Products" : "すべての製品"}
        </h1>
        <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
          {locale === "en" ? "Explore our collection" : "All Products"}
        </p>
      </header>
      <hr className="border-gray-200" />

      {/* Filter / Sort */}
      <section className="max-w-screen-xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant="ghost"
              onClick={() => setSelectedCategory(cat)}
              className={
                selectedCategory === cat
                  ? "underline underline-offset-4"
                  : "text-gray-600 hover:text-gray-900"
              }
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-1 text-gray-600 mt-1 sm:mt-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-transparent pr-4 pl-1 py-1 text-gray-800 focus:outline-none"
          >
            {sortOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>
      <hr className="border-gray-200" />

      {/* Item count */}
      <div className="max-w-screen-xl mx-auto px-6 py-4 text-xs text-gray-600">
        {t("itemsCount", { count: products.length })}
      </div>

      {/* Grid */}
      <section className="max-w-screen-xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} locale={locale} />
          ))}
        </div>

        {/* Empty */}
        {products.length === 0 && (
          <div className="text-center py-16 text-gray-500 text-sm">
            {t("noProductsFound")}
          </div>
        )}
      </section>

      {/* Floating Cart Button - スマホでも常に表示 */}
      <Link href={"/cart"}>
        <Button className="fixed bottom-6 right-6 rounded-full w-12 h-12 bg-black text-white hover:opacity-90 shadow-lg transition-all duration-200 hover:scale-105">
          <span className="sr-only">
            {locale === "en" ? "View Cart" : "カートを見る"}
          </span>
          <ShoppingCart className="w-5 h-5" />

          {/* カート数量バッジ - 数量がある場合のみ表示 */}
          {totalQuantity > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-5 h-5 px-1 text-[10px] font-medium bg-red-600 text-white rounded-full">
              {totalQuantity > 99 ? "99+" : totalQuantity}
            </span>
          )}
        </Button>
      </Link>
    </main>
  );
};

export default ProductPage;
