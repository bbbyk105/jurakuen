"use client";

import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";

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

export default function MatchaPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "ja";
  const isJa = locale === "ja";
  const faq = isJa ? FAQ_JA : FAQ_EN;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
          {isJa ? "富士市産 有機抹茶の通販" : "Organic Matcha from Fuji City"}
        </h1>
        <p className="text-gray-700 leading-relaxed mb-8">
          {isJa
            ? "静岡県富士市で初めて有機JAS認証を取得した聚楽苑では、農薬不使用・無化学肥料で育てた有機抹茶を全国へ通販でお届けしています。富士山の湧水と肥沃な土壌で育った茶葉を、丁寧に石臼で挽いた本格抹茶です。"
            : "Jurakuen is the first organic JAS certified tea farm in Fuji City, Shizuoka. We deliver pesticide-free organic matcha nationwide. Our matcha is stone-ground from tea leaves grown with Mt. Fuji spring water and rich soil."}
        </p>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {isJa ? "商品一覧" : "Our Matcha & Green Tea"}
          </h2>
          <p className="text-gray-600 mb-4">
            {isJa
              ? "有機抹茶をはじめ、煎茶・ほうじ茶など富士市産の有機茶を多数取り揃えています。"
              : "We offer organic matcha, sencha, hojicha and more from Fuji City."}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors"
          >
            {isJa ? "商品を見る" : "View Products"}
          </Link>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {isJa ? "有機JAS認証について" : "Organic JAS Certification"}
          </h2>
          <p className="text-gray-600 mb-4">
            {isJa
              ? "聚楽苑は第三者機関の審査を経て有機JAS認証を取得しています。栽培から加工まで、厳格な基準を満たしています。"
              : "Jurakuen holds organic JAS certification through third-party inspection. We meet strict standards from cultivation to processing."}
          </p>
          <Link
            href="/jas"
            className="text-green-700 font-medium hover:underline"
          >
            {isJa ? "有機JAS認証の詳細へ" : "Learn more about Organic JAS"}
          </Link>
        </section>

        <section className="border-t border-gray-200 pt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {isJa ? "よくある質問" : "FAQ"}
          </h2>
          <ul className="space-y-6">
            {faq.map((item, i) => (
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
          <Link href="/about" className="text-green-700 hover:underline">
            {isJa ? "製造工程" : "Production"}
          </Link>
          <Link href="/jas" className="text-green-700 hover:underline">
            {isJa ? "有機JAS認証" : "Organic JAS"}
          </Link>
        </nav>
      </article>
    </div>
  );
}
