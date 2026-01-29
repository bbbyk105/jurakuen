import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { buildPageMeta } from "@/lib/seo/meta";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const path = `/${locale}/jas`;
  const isJa = locale === "ja";
  return buildPageMeta({
    title: isJa
      ? "有機JAS認証について | 聚楽苑 - 富士市初の有機JAS茶園"
      : "Organic JAS Certification | Jurakuen - First in Fuji City",
    description: isJa
      ? "聚楽苑は富士市で初めて有機JAS認証を取得した茶園です。有機JASの基準と、農薬不使用・無化学肥料の取り組みをご説明します。"
      : "Jurakuen is the first organic JAS certified tea farm in Fuji City. Learn about organic JAS standards and our pesticide-free, no chemical fertilizer practices.",
    canonicalPath: path,
    locale,
  });
}

export default function JasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
