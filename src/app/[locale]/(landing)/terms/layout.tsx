import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { buildPageMeta } from "@/lib/seo/meta";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const path = `/${locale}/terms`;
  const isJa = locale === "ja";
  return buildPageMeta({
    title: isJa ? "利用規約 | 聚楽苑" : "Terms of Service | Jurakuen",
    description: isJa
      ? "聚楽苑オンラインショップの利用規約。ご利用条件をご確認ください。"
      : "Terms of service for Jurakuen online shop. Please read the conditions of use.",
    canonicalPath: path,
    locale,
  });
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
