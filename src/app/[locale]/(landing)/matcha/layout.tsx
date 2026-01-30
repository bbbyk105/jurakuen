import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { buildPageMeta } from "@/lib/seo/meta";

const FAQ_JA = [
  {
    q: "聚楽苑の抹茶は有機栽培ですか？",
    a: "はい。聚楽苑は富士市で初めて有機JAS認証を取得した茶園です。農薬・化学肥料を使わず、富士山の湧水と豊かな土壌で育てた茶葉のみを使用しています。",
  },
  {
    q: "抹茶の賞味期限はどのくらいですか？",
    a: "未開封で冷暗所保存の場合、製造から約1年です。開封後はお早めにお召し上がりください。",
  },
  {
    q: "通販の送料はかかりますか？",
    a: "日本国内は送料がかかります。詳しくは商品ページまたはカート画面でご確認ください。",
  },
];

const FAQ_EN = [
  {
    q: "Is Jurakuen matcha organic?",
    a: "Yes. Jurakuen is the first organic JAS certified tea farm in Fuji City. We use only tea leaves grown without pesticides or chemical fertilizers, with Mt. Fuji spring water.",
  },
  {
    q: "How long does matcha last?",
    a: "Unopened and stored in a cool, dark place, about 1 year from production. Once opened, please consume within a few months.",
  },
  {
    q: "Do you ship internationally?",
    a: "We ship to the US and Japan. Shipping costs apply. See the cart or product page for details.",
  },
];

function buildFaqJsonLd(locale: string) {
  const faq = locale === "ja" ? FAQ_JA : FAQ_EN;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const path = `/${locale}/matcha`;
  const isJa = locale === "ja";
  const base = buildPageMeta({
    title: isJa
      ? "有機抹茶通販 | 聚楽苑 - 富士市産・有機JAS認証の抹茶"
      : "Organic Matcha | Jurakuen - Fuji City Organic JAS Certified Matcha",
    description: isJa
      ? "富士市で初めて有機JAS認証を取得した聚楽苑の有機抹茶を通販で。農薬不使用・富士山の湧水で育った茶葉から作った本格抹茶を全国へお届けします。"
      : "Buy organic JAS certified matcha from Jurakuen, Fuji City. Pesticide-free matcha grown with Mt. Fuji spring water. Shipped worldwide.",
    canonicalPath: path,
    locale,
  });
  return {
    ...base,
    other: {
      "application/ld+json": JSON.stringify(buildFaqJsonLd(locale)),
    },
  };
}

export default function MatchaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
