// src/app/[locale]/layout.tsx

import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Noto_Serif_JP } from "next/font/google";
import { CartProvider } from "../../store/cart";
import "../globals.css";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Noto_Serif_JP({ subsets: ["latin"] });

// 言語ごとのメタデータ
const getLocalizedMetadata = (locale: string) => {
  const isJapanese = locale === "ja";

  return {
    title: isJapanese
      ? "聚楽苑 - 富士市初の有機JAS認証取得茶園 | 富士山麓の有機茶・抹茶"
      : "Jurakuen - First Organic JAS Certified Tea Farm in Fuji City | Mt. Fuji Organic Tea & Matcha",
    description: isJapanese
      ? "聚楽苑は、静岡県富士市で初めて有機JAS認証を取得した茶園。富士山麓の豊かな自然の中で、農薬や化学肥料を使わず育てたお茶（緑茶・抹茶）をお届けします。富士市初の有機抹茶生産者として、安心・安全な日本茶をご提供しています。"
      : "Jurakuen is the first organic JAS certified tea farm in Fuji City, Shizuoka. We deliver organic tea (green tea & matcha) grown without pesticides or chemical fertilizers in the rich nature at the foot of Mt. Fuji. As Fuji City's first organic matcha producer, we provide safe and reliable Japanese tea.",
    keywords: isJapanese
      ? [
          "聚楽苑",
          // 地域 × 商品の組み合わせを強化
          "富士市 お茶",
          "富士市 茶園",
          "富士市 緑茶",
          "富士市 有機抹茶",
          "富士市 有機茶",
          "富士市 日本茶",
          "静岡 有機抹茶",
          "静岡 お茶",
          "静岡 茶園",
          "富士山麓 茶園",
          "富士山 お茶",
          // 認証・品質関連
          "有機JAS 認証 抹茶",
          "有機JAS お茶",
          "無農薬 茶園 静岡",
          "無農薬 お茶 富士市",
          "無農薬 緑茶",
          // 用途別
          "抹茶 ギフト 富士",
          "お茶 ギフト 静岡",
          "有機抹茶 お土産",
          "富士市 お土産 お茶",
          "静岡 お土産 茶",
          // 英語
          "Mt.Fuji Matcha",
          "Fuji Matcha",
          "Organic Tea Fuji",
          "Jurakuen",
        ]
      : [
          "Jurakuen",
          "Mt.Fuji Matcha",
          "Fuji City Organic Tea",
          "Fuji Organic Matcha",
          "Shizuoka Organic Tea",
          "Mt.Fuji Green Tea",
          "Organic JAS Matcha",
          "Japanese Organic Tea",
          "Fuji Tea Farm",
          "Pesticide-free Tea",
          "Organic Green Tea Japan",
          "Matcha Gift Japan",
          "Japanese Tea Souvenir",
        ],
    openGraph: {
      title: isJapanese
        ? "聚楽苑 - 富士市初の有機JAS認証取得茶園 | 富士山麓の有機茶・抹茶"
        : "Jurakuen - First Organic JAS Certified Tea Farm in Fuji City | Mt. Fuji Organic Tea & Matcha",
      description: isJapanese
        ? "聚楽苑は、静岡県富士市で初めて有機JAS認証を取得した茶園。富士山麓の豊かな自然の中で、農薬や化学肥料を使わず育てたお茶（緑茶・抹茶）をお届けします。富士市初の有機抹茶生産者として、安心・安全な日本茶をご提供しています。"
        : "Jurakuen is the first organic JAS certified tea farm in Fuji City, Shizuoka. We deliver organic tea (green tea & matcha) grown without pesticides or chemical fertilizers in the rich nature at the foot of Mt. Fuji.",
      locale: isJapanese ? "ja_JP" : "en_US",
    },
    twitter: {
      title: isJapanese
        ? "聚楽苑 - 富士市初の有機JAS認証取得茶園"
        : "Jurakuen - First Organic JAS Certified Tea Farm in Fuji City",
      description: isJapanese
        ? "聚楽苑は、静岡県富士市で初めて有機JAS認証を取得した茶園。富士市初の有機抹茶生産者として、安心・安全な日本茶をご提供しています。"
        : "Jurakuen is the first organic JAS certified tea farm in Fuji City. We provide safe and reliable Japanese organic tea and matcha.",
    },
  };
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localizedMeta = getLocalizedMetadata(locale);

  return {
    title: localizedMeta.title,
    description: localizedMeta.description,
    keywords: localizedMeta.keywords,
    authors: [{ name: "聚楽苑 (Jurakuen)" }],
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://www.jurakuen.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ja: "/ja",
        en: "/en",
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
      url: `https://www.jurakuen.com/${locale}`,
      siteName: locale === "ja" ? "聚楽苑" : "Jurakuen",
      locale: localizedMeta.openGraph.locale,
      type: "website",
      images: [
        {
          url: "/images/logos/logo_horizontal.png",
          width: 1200,
          height: 630,
          alt:
            locale === "ja"
              ? "聚楽苑 - 富士市初の有機JAS認証取得茶園"
              : "Jurakuen - First Organic JAS Certified Tea Farm in Fuji City",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: localizedMeta.twitter.title,
      description: localizedMeta.twitter.description,
      images: ["/images/logos/logo_horizontal.png"],
    },
    other: {
      "application/ld+json": JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://www.jurakuen.com/#organization",
          name: locale === "ja" ? "聚楽苑" : "Jurakuen",
          alternateName: locale === "ja" ? "Jurakuen" : "聚楽苑",
          url: "https://www.jurakuen.com",
          logo: "https://www.jurakuen.com/images/logos/logo_horizontal.png",
          image: "https://www.jurakuen.com/images/logos/logo_horizontal.png",
          description:
            locale === "ja"
              ? "静岡県富士市で初めて有機JAS認証を取得した茶園。富士山麓の豊かな自然の中で、農薬や化学肥料を使わず育てたお茶（緑茶・抹茶）をお届けします。"
              : "The first organic JAS certified tea farm in Fuji City, Shizuoka. We deliver organic tea (green tea & matcha) grown without pesticides or chemical fertilizers.",
          telephone: "0545-34-0614",
          address: {
            "@type": "PostalAddress",
            streetAddress: "境485-2",
            addressLocality: "富士市",
            addressRegion: "静岡県",
            postalCode: "417-0812",
            addressCountry: "JP",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: "35.1609",
            longitude: "138.6760",
          },
          openingHours: "Mo-Fr 10:00-18:00",
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
              ],
              opens: "10:00",
              closes: "18:00",
            },
          ],
          sameAs: ["https://www.instagram.com/jurakuenfuji/"],
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
          makesOffer: {
            "@type": "Offer",
            itemOffered: [
              {
                "@type": "Product",
                name: locale === "ja" ? "有機抹茶" : "Organic Matcha",
                description:
                  locale === "ja"
                    ? "富士市初の有機JAS認証を取得した有機抹茶"
                    : "First organic JAS certified matcha in Fuji City",
              },
              {
                "@type": "Product",
                name: locale === "ja" ? "有機緑茶" : "Organic Green Tea",
                description:
                  locale === "ja"
                    ? "無農薬・無化学肥料で育てた有機緑茶"
                    : "Organic green tea grown without pesticides",
              },
            ],
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "Product",
          name: locale === "ja" ? "聚楽苑 有機抹茶" : "Jurakuen Organic Matcha",
          brand: {
            "@type": "Brand",
            name: locale === "ja" ? "聚楽苑" : "Jurakuen",
            logo: "https://www.jurakuen.com/images/logos/logo_horizontal.png",
          },
          description:
            locale === "ja"
              ? "富士市初の有機JAS認証を取得した有機抹茶。農薬や化学肥料を使わず育てた茶葉から作られた、体にも環境にもやさしい有機茶です。"
              : "The first organic JAS certified matcha in Fuji City. Made from tea leaves grown without pesticides or chemical fertilizers, it's gentle on both body and environment.",
          manufacturer: {
            "@type": "Organization",
            name: locale === "ja" ? "聚楽苑" : "Jurakuen",
            logo: "https://www.jurakuen.com/images/logos/logo_horizontal.png",
            address: {
              "@type": "PostalAddress",
              streetAddress: "境485-2",
              addressLocality: "富士市",
              addressRegion: "静岡県",
              postalCode: "417-0812",
              addressCountry: "JP",
            },
          },
          category: locale === "ja" ? "有機茶" : "Organic Tea",
          offers: {
            "@type": "AggregateOffer",
            availability: "https://schema.org/InStock",
            priceCurrency: "JPY",
            seller: {
              "@type": "Organization",
              name: locale === "ja" ? "聚楽苑" : "Jurakuen",
            },
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://www.jurakuen.com/#website",
          url: "https://www.jurakuen.com",
          name: locale === "ja" ? "聚楽苑" : "Jurakuen",
          description:
            locale === "ja"
              ? "静岡県富士市で初めて有機JAS認証を取得した茶園"
              : "First organic JAS certified tea farm in Fuji City, Shizuoka",
          publisher: {
            "@id": "https://www.jurakuen.com/#organization",
          },
          inLanguage: locale === "ja" ? "ja-JP" : "en-US",
        },
      ]),
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

  // SSG対応
  setRequestLocale(locale);

  // 言語ファイルの読み込み
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
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
