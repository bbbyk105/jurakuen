import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { buildPageMeta } from "@/lib/seo/meta";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const path = `/${locale}/privacy`;
  const isJa = locale === "ja";
  return buildPageMeta({
    title: isJa ? "プライバシーポリシー | 聚楽苑" : "Privacy Policy | Jurakuen",
    description: isJa
      ? "聚楽苑のプライバシーポリシー。お客様の個人情報の取り扱いについて定めています。"
      : "Jurakuen's privacy policy. How we handle your personal information.",
    canonicalPath: path,
    locale,
  });
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
