// src/app/[locale]/layout.tsx - SEO強化版

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { Noto_Serif_JP } from "next/font/google";
import { CartProvider } from "../../store/cart";
import { getSiteUrl, buildCanonical } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import {
  getSiteName,
  TELEPHONE_DISPLAY,
  getPostalAddressSchema,
  GEO,
  OPENING_HOURS_DISPLAY,
  OPENING_HOURS_SPECIFICATION,
  SAME_AS,
  HAS_MAP,
} from "@/lib/site-info";
import "../globals.css";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

const inter = Noto_Serif_JP({ subsets: ["latin"] });

// 言語ごとのメタデータ
const getLocalizedMetadata = (locale: string) => {
  const isJapanese = locale === "ja";

  return {
    title: isJapanese
      ? "聚楽苑 | 富士市の有機抹茶・お茶専門店（有機JAS認証茶園）"
      : "Jurakuen | Organic Matcha & Green Tea from Fuji City, Japan",
    description: isJapanese
      ? "静岡県富士市で初めて有機JAS認証を取得した茶園・聚楽苑。富士市の有機抹茶・お茶専門店として、農薬不使用・無化学肥料で育てた安心安全なお茶を販売しています。富士山の湧水と豊かな土壌で育った有機茶を、富士市から全国へお届けします。"
      : "Jurakuen is the first organic JAS certified tea farm in Fuji City, Shizuoka. We deliver organic tea (green tea & matcha) grown without pesticides or chemical fertilizers in the rich nature at the foot of Mt. Fuji. As Fuji City's first organic matcha producer, we provide safe and reliable Japanese tea.",
    openGraph: {
      title: isJapanese
        ? "聚楽苑 | 富士市の有機抹茶・お茶専門店（有機JAS認証茶園）"
        : "Jurakuen | Organic Matcha & Green Tea from Fuji City, Japan",
      description: isJapanese
        ? "静岡県富士市で初めて有機JAS認証を取得した茶園・聚楽苑。富士市の有機抹茶・お茶専門店として、農薬不使用で育てた安心安全なお茶を販売しています。富士山の湧水で育った有機茶を富士市から全国へお届けします。"
        : "Jurakuen is the first organic JAS certified tea farm in Fuji City, Shizuoka. We deliver organic tea (green tea & matcha) grown without pesticides in the rich nature at the foot of Mt. Fuji.",
      locale: isJapanese ? "ja_JP" : "en_US",
    },
    twitter: {
      title: isJapanese
        ? "聚楽苑 - 富士市の有機抹茶・緑茶専門店"
        : "Jurakuen - Fuji City Organic Tea Shop",
      description: isJapanese
        ? "富士市初の有機JAS認証取得茶園。農薬不使用の有機抹茶・緑茶を富士市から全国へお届けします。"
        : "Fuji City's first organic JAS certified tea farm. We deliver organic matcha and green tea nationwide.",
    },
  };
};

// サイト全体の構造化データ（LocalBusiness + WebSite）。
// ページ固有の Product / BreadcrumbList は各ページ側で出力する。
const buildSiteJsonLd = (locale: string) => {
  const siteUrl = getSiteUrl();

  return [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#organization`,
      name: getSiteName(locale),
      alternateName: locale === "ja" ? "Jurakuen" : "聚楽苑",
      url: siteUrl,
      logo: `${siteUrl}/images/logos/logo_horizontal.png`,
      image: `${siteUrl}/images/logos/logo_horizontal.png`,
      description:
        locale === "ja"
          ? "静岡県富士市で初めて有機JAS認証を取得した茶園。富士市の有機抹茶・お茶専門店として、農薬不使用で育てた安心安全なお茶を販売しています。富士山麓の豊かな自然の中で育まれた有機茶を、富士市から全国へお届けします。"
          : "The first organic JAS certified tea farm in Fuji City, Shizuoka. We deliver organic tea (green tea & matcha) grown without pesticides or chemical fertilizers.",
      telephone: TELEPHONE_DISPLAY,
      address: getPostalAddressSchema(locale),
      geo: {
        "@type": "GeoCoordinates",
        latitude: GEO.latitude,
        longitude: GEO.longitude,
      },
      openingHours: OPENING_HOURS_DISPLAY,
      openingHoursSpecification: OPENING_HOURS_SPECIFICATION,
      sameAs: [...SAME_AS],
      areaServed: [
        {
          "@type": "City",
          name: locale === "ja" ? "富士市" : "Fuji City",
        },
        {
          "@type": "State",
          name: locale === "ja" ? "静岡県" : "Shizuoka Prefecture",
        },
        {
          "@type": "Country",
          name: locale === "ja" ? "日本" : "Japan",
        },
      ],
      priceRange: "$$",
      paymentAccepted: "Cash, Credit Card",
      currenciesAccepted: "JPY",
      additionalType: [
        "https://schema.org/Store",
        "https://schema.org/OnlineStore",
      ],
      hasMap: HAS_MAP,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name:
        locale === "ja"
          ? "聚楽苑 - 富士市の有機抹茶・緑茶専門店"
          : "Jurakuen - Fuji City Organic Tea Shop",
      description:
        locale === "ja"
          ? "静岡県富士市で初めて有機JAS認証を取得した茶園。富士市の有機抹茶・緑茶専門店。"
          : "First organic JAS certified tea farm in Fuji City, Shizuoka",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: locale === "ja" ? "ja-JP" : "en-US",
    },
  ];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localizedMeta = getLocalizedMetadata(locale);
  const siteUrl = getSiteUrl();

  return {
    title: localizedMeta.title,
    description: localizedMeta.description,
    authors: [{ name: "聚楽苑 (Jurakuen)" }],
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(getSiteUrl()),
    alternates: {
      canonical: buildCanonical(`/${locale}`),
      languages: {
        ja: `${siteUrl}/ja`,
        en: `${siteUrl}/en`,
        "x-default": `${siteUrl}/ja`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "KnrFCiFH56kO_Wmqx_op32xyVVRg1fdYwmlI1F9cj5k",
    },
    openGraph: {
      title: localizedMeta.openGraph.title,
      description: localizedMeta.openGraph.description,
      url: `${siteUrl}/${locale}`,
      siteName: locale === "ja" ? "聚楽苑" : "Jurakuen",
      locale: localizedMeta.openGraph.locale,
      type: "website",
      images: [
        {
          url: `${siteUrl}/images/logos/logo_horizontal.png`,
          width: 1200,
          height: 630,
          alt:
            locale === "ja"
              ? "聚楽苑 - 富士市の有機抹茶・お茶専門店"
              : "Jurakuen - Fuji City Organic Tea Shop",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: localizedMeta.twitter.title,
      description: localizedMeta.twitter.description,
      images: [`${siteUrl}/images/logos/logo_horizontal.png`],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // 未対応ロケール（/fr 等）はデフォルト言語の重複コンテンツにせず404を返す
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <JsonLd data={buildSiteJsonLd(locale)} />
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
