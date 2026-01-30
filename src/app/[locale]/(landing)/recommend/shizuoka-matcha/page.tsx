"use client";

import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";

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

export default function ShizuokaMatchaPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "ja";
  const isJa = locale === "ja";

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
          {isJa
            ? "静岡・富士市のおすすめ抹茶｜有機JAS認証の聚楽苑"
            : "Recommended Matcha in Shizuoka | Jurakuen Organic JAS"}
        </h1>
        <p className="text-gray-700 leading-relaxed mb-8">
          {isJa
            ? "静岡県富士市で初めて有機JAS認証を取得した聚楽苑では、富士山の湧水と豊かな土壌で育てた有機抹茶・煎茶を栽培・販売しています。静岡でおすすめの有機抹茶を選ぶポイントと、聚楽苑の取り組みをご紹介します。"
            : "Jurakuen is the first organic JAS certified tea farm in Fuji City, Shizuoka. We grow and sell organic matcha and sencha with Mt. Fuji spring water and rich soil. Here we introduce how to choose recommended organic matcha in Shizuoka and our approach."}
        </p>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {isJa ? "有機抹茶を選ぶポイント" : "How to Choose Organic Matcha"}
          </h2>
          <p className="text-gray-600 mb-4">
            {isJa
              ? "有機JASマークは、農薬・化学肥料を使わずに栽培し、第三者機関の審査をクリアした証です。聚楽苑は年次監査を受けており、栽培から加工までの記録を保管しています。"
              : "The organic JAS mark indicates cultivation without pesticides or chemical fertilizers and third-party certification. Jurakuen undergoes annual audits and keeps records from cultivation to processing."}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {isJa ? "聚楽苑の有機抹茶" : "Jurakuen Organic Matcha"}
          </h2>
          <p className="text-gray-600 mb-4">
            {isJa
              ? "富士市境の茶園で、富士山の湧水と有機栽培で育てた茶葉を石臼で挽いた本格抹茶です。煎茶・ほうじ茶なども取り揃えています。"
              : "Our matcha is stone-ground from tea leaves grown with Mt. Fuji spring water and organic farming in Fuji City. We also offer sencha, hojicha and more."}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors"
          >
            {isJa ? "商品一覧を見る" : "View Products"}
          </Link>
        </section>

        <section className="border-t border-gray-200 pt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {isJa ? "よくある質問" : "FAQ"}
          </h2>
          <ul className="space-y-6">
            {FAQ_JA.map((item, i) => (
              <li key={i}>
                <h3 className="font-medium text-gray-900 mb-1">{item.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.a}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <nav className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap gap-4">
          <Link href="/products" className="text-green-700 hover:underline">
            {isJa ? "商品一覧" : "Products"}
          </Link>
          <Link href="/matcha" className="text-green-700 hover:underline">
            {isJa ? "有機抹茶通販" : "Organic Matcha"}
          </Link>
          <Link href="/jas" className="text-green-700 hover:underline">
            {isJa ? "有機JAS認証" : "Organic JAS"}
          </Link>
          <Link href="/about" className="text-green-700 hover:underline">
            {isJa ? "製造工程" : "Production"}
          </Link>
        </nav>
      </article>
    </div>
  );
}
