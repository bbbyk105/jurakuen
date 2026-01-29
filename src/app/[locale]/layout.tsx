// src/app/[locale]/layout.tsx - SEO強化版

import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Noto_Serif_JP } from "next/font/google";
import { CartProvider } from "../../store/cart";
import { getSiteUrl, buildCanonical } from "@/lib/seo";
import "../globals.css";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Noto_Serif_JP({ subsets: ["latin"] });

// 言語ごとのメタデータ
const getLocalizedMetadata = (locale: string) => {
  const isJapanese = locale === "ja";

  return {
    title: isJapanese
      ? "聚楽苑 - 富士市初の有機JAS認証取得茶園 | 富士市の有機抹茶・お茶専門店"
      : "Jurakuen - First Organic JAS Certified Tea Farm in Fuji City | Mt. Fuji Organic Tea & Matcha",
    description: isJapanese
      ? "静岡県富士市で初めて有機JAS認証を取得した茶園・聚楽苑。富士市の有機抹茶・お茶専門店として、農薬不使用・無化学肥料で育てた安心安全なお茶を販売しています。富士山の湧水と豊かな土壌で育った有機茶を、富士市から全国へお届けします。"
      : "Jurakuen is the first organic JAS certified tea farm in Fuji City, Shizuoka. We deliver organic tea (green tea & matcha) grown without pesticides or chemical fertilizers in the rich nature at the foot of Mt. Fuji. As Fuji City's first organic matcha producer, we provide safe and reliable Japanese tea.",
    keywords: isJapanese
      ? [
          // 富士市関連の最重要キーワード
          "富士市 抹茶",
          "富士市 お茶",
          "富士市 緑茶",
          "富士市 有機抹茶",
          "富士市 茶園",
          "富士市 お茶屋",
          "富士市 日本茶",
          "富士市 有機茶",
          // 地域 + 用途
          "富士市 抹茶 通販",
          "富士市 お茶 販売",
          "富士市 抹茶 オンライン",
          "富士市 お茶 ギフト",
          "富士市 抹茶 お土産",
          // ブランド名
          "聚楽苑",
          "聚楽苑 富士市",
          // 静岡県との組み合わせ
          "静岡県 富士市 抹茶",
          "静岡 富士 お茶",
          "静岡 富士市 茶園",
          // 認証・品質
          "有機JAS 抹茶 富士市",
          "無農薬 お茶 富士市",
          "有機栽培 茶 富士",
          // 富士山関連
          "富士山麓 茶園",
          "富士山 お茶",
          "富士山 抹茶",
          // 英語
          "Fuji City Matcha",
          "Fuji Organic Tea",
          "Jurakuen Fuji",
        ]
      : [
          "Jurakuen",
          "Fuji City Matcha",
          "Fuji City Organic Tea",
          "Fuji Organic Matcha",
          "Shizuoka Fuji Tea",
          "Mt.Fuji Green Tea",
          "Organic JAS Matcha Fuji",
          "Japanese Organic Tea Fuji",
          "Fuji Tea Farm",
          "Pesticide-free Tea Fuji City",
          "Fuji City Tea Shop",
          "Organic Green Tea Japan",
          "Matcha Gift Japan",
        ],
    openGraph: {
      title: isJapanese
        ? "聚楽苑 - 富士市初の有機JAS認証取得茶園 | 富士市の有機抹茶・緑茶専門店"
        : "Jurakuen - First Organic JAS Certified Tea Farm in Fuji City | Mt. Fuji Organic Tea & Matcha",
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
    keywords: localizedMeta.keywords,
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
      url: `${getSiteUrl()}/${locale}`,
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
              ? "聚楽苑 - 富士市の有機抹茶・お茶専門店"
              : "Jurakuen - Fuji City Organic Tea Shop",
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
          "@id": `${siteUrl}/#organization`,
          name: locale === "ja" ? "聚楽苑" : "Jurakuen",
          alternateName: locale === "ja" ? "Jurakuen" : "聚楽苑",
          url: siteUrl,
          logo: `${siteUrl}/images/logos/logo_horizontal.png`,
          image: `${siteUrl}/images/logos/logo_horizontal.png`,
          description:
            locale === "ja"
              ? "静岡県富士市で初めて有機JAS認証を取得した茶園。富士市の有機抹茶・お茶専門店として、農薬不使用で育てた安心安全なお茶を販売しています。富士山麓の豊かな自然の中で育まれた有機茶を、富士市から全国へお届けします。"
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
          priceRange: "$$",
          paymentAccepted: "Cash, Credit Card",
          currenciesAccepted: "JPY",
          // 富士市での検索に最適化
          additionalType: [
            "https://schema.org/Store",
            "https://schema.org/OnlineStore",
          ],
          hasMap: "https://maps.app.goo.gl/M4vN5pkKsyf4j5MH6",
          makesOffer: {
            "@type": "Offer",
            itemOffered: [
              {
                "@type": "Product",
                name:
                  locale === "ja"
                    ? "富士市 有機抹茶"
                    : "Fuji City Organic Matcha",
                description:
                  locale === "ja"
                    ? "富士市で初めて有機JAS認証を取得した有機抹茶。富士山の湧水で育った茶葉を使用。"
                    : "First organic JAS certified matcha in Fuji City. Made from tea leaves grown with Mt. Fuji spring water.",
                category: locale === "ja" ? "抹茶" : "Matcha",
                brand: {
                  "@type": "Brand",
                  name: "聚楽苑",
                },
                offers: {
                  "@type": "AggregateOffer",
                  availability: "https://schema.org/InStock",
                  priceCurrency: "JPY",
                  lowPrice: "700",
                  highPrice: "3000",
                },
              },
              {
                "@type": "Product",
                name:
                  locale === "ja"
                    ? "富士市産 有機緑茶"
                    : "Fuji City Organic Green Tea",
                description:
                  locale === "ja"
                    ? "富士市の有機栽培茶園で育てた緑茶。農薬不使用で安心安全。"
                    : "Organic green tea from Fuji City tea farm. Grown without pesticides.",
                category: locale === "ja" ? "緑茶" : "Green Tea",
                brand: {
                  "@type": "Brand",
                  name: "聚楽苑",
                },
                offers: {
                  "@type": "AggregateOffer",
                  availability: "https://schema.org/InStock",
                  priceCurrency: "JPY",
                  lowPrice: "600",
                  highPrice: "2000",
                },
              },
            ],
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "Product",
          name:
            locale === "ja"
              ? "富士市産 聚楽苑 有機抹茶"
              : "Jurakuen Fuji City Organic Matcha",
          brand: {
            "@type": "Brand",
            name: locale === "ja" ? "聚楽苑" : "Jurakuen",
            logo: `${siteUrl}/images/logos/logo_horizontal.png`,
          },
          description:
            locale === "ja"
              ? "富士市で初めて有機JAS認証を取得した有機抹茶。農薬や化学肥料を使わず、富士山の湧水で育てた茶葉から作られた、富士市を代表する有機茶です。"
              : "The first organic JAS certified matcha in Fuji City. Made from tea leaves grown with Mt. Fuji spring water without pesticides or chemical fertilizers.",
          manufacturer: {
            "@type": "Organization",
            name: locale === "ja" ? "聚楽苑" : "Jurakuen",
            logo: `${siteUrl}/images/logos/logo_horizontal.png`,
            address: {
              "@type": "PostalAddress",
              streetAddress: "境485-2",
              addressLocality: "富士市",
              addressRegion: "静岡県",
              postalCode: "417-0812",
              addressCountry: "JP",
            },
          },
          category: locale === "ja" ? "有機抹茶" : "Organic Matcha",
          productionLocation:
            locale === "ja" ? "静岡県富士市" : "Fuji City, Shizuoka",
          offers: {
            "@type": "AggregateOffer",
            availability: "https://schema.org/InStock",
            priceCurrency: "JPY",
            lowPrice: "700",
            highPrice: "3000",
            seller: {
              "@type": "Organization",
              name: locale === "ja" ? "聚楽苑" : "Jurakuen",
            },
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: "1",
          },
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
          potentialAction: {
            "@type": "SearchAction",
            target: `${siteUrl}/${locale}/products?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        },
        // FAQPage構造化データ（富士市関連のQ&A）
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name:
                locale === "ja"
                  ? "富士市で有機抹茶を買えるお店はありますか?"
                  : "Where can I buy organic matcha in Fuji City?",
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  locale === "ja"
                    ? "聚楽苑は富士市で初めて有機JAS認証を取得した茶園です。富士市境485-2にて、有機抹茶・有機緑茶を販売しています。オンラインショップでも購入可能です。"
                    : "Jurakuen is the first organic JAS certified tea farm in Fuji City. We sell organic matcha and green tea at 485-2 Sakai, Fuji City. Also available through our online shop.",
              },
            },
            {
              "@type": "Question",
              name:
                locale === "ja"
                  ? "富士市の聚楽苑のお茶は農薬不使用ですか?"
                  : "Is Jurakuen's tea in Fuji City pesticide-free?",
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  locale === "ja"
                    ? "はい、聚楽苑のお茶は完全に農薬不使用です。富士市で有機JAS認証を取得しており、化学肥料も使用していません。富士山の湧水と豊かな土壌で育てた安心安全なお茶です。"
                    : "Yes, Jurakuen's tea is completely pesticide-free. We have organic JAS certification in Fuji City and don't use chemical fertilizers. Our tea is grown safely with Mt. Fuji spring water and rich soil.",
              },
            },
          ],
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
  setRequestLocale(locale);
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
