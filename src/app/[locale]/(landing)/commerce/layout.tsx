import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { buildPageMeta } from "@/lib/seo/meta";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const path = `/${locale}/commerce`;
  const isJa = locale === "ja";
  return buildPageMeta({
    title: isJa
      ? "特定商取引法に基づく表記 | 聚楽苑"
      : "Specified Commercial Transaction Act | Jurakuen",
    description: isJa
      ? "聚楽苑の特定商取引法に基づく表記。販売業者・代表者・所在地・支払方法・配送・返品について。"
      : "Jurakuen's specified commercial transaction notice. Seller, representative, address, payment, shipping and returns.",
    canonicalPath: path,
    locale,
  });
}

export default function CommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
