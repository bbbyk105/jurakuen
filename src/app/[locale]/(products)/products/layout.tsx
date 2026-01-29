import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { buildPageMeta } from "@/lib/seo/meta";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const path = `/${locale}/products`;
  const isJa = locale === "ja";
  return buildPageMeta({
    title: isJa
      ? "商品一覧 | 聚楽苑 - 富士市の有機抹茶・煎茶・棒茶・粉茶"
      : "All Products | Jurakuen - Organic Matcha, Sencha & More",
    description: isJa
      ? "聚楽苑の有機茶の商品一覧。富士市産の有機抹茶・煎茶・棒茶・粉茶・焙じ茶など、農薬不使用で育てたお茶を販売しています。"
      : "Browse Jurakuen's organic tea. Fuji City organic matcha, sencha, kukicha, konacha, hojicha and more. All pesticide-free.",
    canonicalPath: path,
    locale,
  });
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
