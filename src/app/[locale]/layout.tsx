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

export const metadata: Metadata = {
  title: "聚楽苑 - 富士市初の有機JAS認証取得茶園",
  description:
    "聚楽苑は、静岡県富士市で初めて有機JAS認証を取得した有機茶園。富士市初の有機抹茶生産者として、No.1の信頼と実績を誇ります。農薬や化学肥料を使わず育てた茶葉から、体にも環境にもやさしい有機茶をお届けします。",
  keywords: [
    "聚楽苑",
    "富士市 有機抹茶",
    "静岡 有機抹茶",
    "有機JAS 認証 抹茶",
    "富士山麓 茶園",
    "富士ブランド 抹茶",
    "無農薬 茶園 静岡",
    "オーガニック 抹茶 通販",
    "抹茶 ギフト 富士",
    "有機抹茶 お土産",
    "Jurakuen",
  ],
  authors: [{ name: "聚楽苑" }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.jurakuen.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "聚楽苑 - 富士市初の有機JAS認証取得茶園",
    description:
      "聚楽苑は、静岡県富士市で初めて有機JAS認証を取得した有機茶園。富士市初の有機抹茶生産者として、No.1の信頼と実績を誇ります。農薬や化学肥料を使わず育てた茶葉から、体にも環境にもやさしい有機茶をお届けします。",
    url: "https://www.jurakuen.com",
    siteName: "聚楽苑",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/images/logos/logo_horizontal.png",
        width: 1200,
        height: 630,
        alt: "聚楽苑 - 富士市初の有機JAS認証取得茶園",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "聚楽苑 - 富士市初の有機JAS認証取得茶園",
    description:
      "聚楽苑は、静岡県富士市で初めて有機JAS認証を取得した有機茶園。富士市初の有機抹茶生産者として、No.1の信頼と実績を誇ります。",
    images: ["/images/logos/logo_horizontal.png"],
  },

  // JSON-LD構造化データを追加
  other: {
    "application/ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://www.jurakuen.com/#organization",
        name: "聚楽苑",
        alternateName: "Jurakuen",
        url: "https://www.jurakuen.com",
        logo: "https://www.jurakuen.com/images/logos/logo_horizontal.png",
        image: "https://www.jurakuen.com/images/logos/logo_horizontal.png",
        description:
          "静岡県富士市で初めて有機JAS認証を取得した有機茶園。富士市初の有機抹茶生産者として、No.1の信頼と実績を誇ります。",
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
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "10:00",
            closes: "18:00",
          },
        ],
        sameAs: ["https://www.instagram.com/jurakuenfuji/"],
        areaServed: {
          "@type": "Country",
          name: "日本",
        },
        makesOffer: {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "有機抹茶",
            description: "富士市初の有機JAS認証を取得した有機抹茶",
          },
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://www.jurakuen.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "聚楽苑 有機抹茶",
        brand: {
          "@type": "Brand",
          name: "聚楽苑",
          logo: "https://www.jurakuen.com/images/logos/logo_horizontal.png",
        },
        description:
          "富士市初の有機JAS認証を取得した有機抹茶。農薬や化学肥料を使わず育てた茶葉から作られた、体にも環境にもやさしい有機茶です。",
        manufacturer: {
          "@type": "Organization",
          name: "聚楽苑",
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
        category: "有機茶",
        offers: {
          "@type": "AggregateOffer",
          availability: "https://schema.org/InStock",
          priceCurrency: "JPY",
          seller: {
            "@type": "Organization",
            name: "聚楽苑",
          },
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.jurakuen.com/#website",
        url: "https://www.jurakuen.com",
        name: "聚楽苑",
        description: "静岡県富士市で初めて有機JAS認証を取得した有機茶園",
        publisher: {
          "@id": "https://www.jurakuen.com/#organization",
        },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate:
                "https://www.jurakuen.com/search?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        ],
        inLanguage: "ja-JP",
      },
    ]),
  },
};

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
