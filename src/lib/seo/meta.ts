import type { Metadata } from "next";
import { getSiteUrl } from "./site-url";

/**
 * フルパス（例: /ja, /ja/about）から canonical 絶対URLを生成
 */
export function buildCanonical(path: string): string {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export interface PageMetaOptions {
  title: string;
  description: string;
  /** 例: /ja, /ja/products, /ja/products/1 */
  canonicalPath: string;
  locale: string;
  /** オプション: OG image パス */
  image?: string;
  /** 追加の metadata フィールド（keywords 等） */
  keywords?: string[];
}

/**
 * ページ別メタデータを組み立て。canonical を必ず含める
 */
export function buildPageMeta({
  title,
  description,
  canonicalPath,
  locale,
  image = "/images/logos/logo_horizontal.png",
  keywords,
}: PageMetaOptions): Metadata {
  const siteUrl = getSiteUrl();
  const canonical = buildCanonical(canonicalPath);
  const isJa = locale === "ja";

  const pathWithoutLocale = canonicalPath.replace(/^\/(ja|en)\b/, "") || "/";
  return {
    title,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: {
      canonical,
      languages: {
        ja: `/ja${pathWithoutLocale}`,
        en: `/en${pathWithoutLocale}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: isJa ? "聚楽苑" : "Jurakuen",
      locale: isJa ? "ja_JP" : "en_US",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
