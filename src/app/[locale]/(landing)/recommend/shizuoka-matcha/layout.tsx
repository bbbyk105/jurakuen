import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { buildPageMeta } from "@/lib/seo/meta";

const FAQ_JA = [
  {
    q: "静岡でおすすめの有機抹茶はありますか？",
    a: "聚楽苑は富士市で初めて有機JAS認証を取得した茶園です。富士山の湧水で育った有機抹茶・煎茶を、静岡県内はもちろん全国へお届けしています。",
  },
  {
    q: "有機JAS認証の抹茶の選び方は？",
    a: "有機JASマークの表示と、栽培・加工の履歴が明示されているものを選ぶと安心です。聚楽苑は第三者機関の年次監査を受けており、トレーサビリティにも対応しています。",
  },
  {
    q: "富士市の抹茶はどこで買えますか？",
    a: "聚楽苑のオンラインショップで通販できます。富士市境の茶園で栽培・加工した有機抹茶を、全国へお届けしています。",
  },
];

function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_JA.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const path = `/${locale}/recommend/shizuoka-matcha`;
  const isJa = locale === "ja";
  const base = buildPageMeta({
    title: isJa
      ? "静岡・富士市のおすすめ抹茶 | 有機JAS認証の聚楽苑"
      : "Recommended Matcha in Shizuoka | Jurakuen Organic JAS",
    description: isJa
      ? "静岡県富士市で初めて有機JAS認証を取得した聚楽苑。静岡でおすすめの有機抹茶の選び方と、富士山の湧水で育った本格抹茶をご紹介します。"
      : "Jurakuen is the first organic JAS certified tea farm in Fuji City, Shizuoka. We introduce how to choose organic matcha and our matcha grown with Mt. Fuji spring water.",
    canonicalPath: path,
    locale,
  });
  return {
    ...base,
    other: {
      "application/ld+json": JSON.stringify(buildFaqJsonLd()),
    },
  };
}

export default function ShizuokaMatchaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
