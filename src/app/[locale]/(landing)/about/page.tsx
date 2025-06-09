import React from "react";
import {
  FaSeedling,
  FaWater,
  FaCertificate,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "有機JASって何？",
    a: "農薬・化学肥料を使用せず、厳格な基準を満たした農産物にのみ付与される日本の有機認証です。『かがやき』は富士市で初めて抹茶としてこの認証を取得しました。",
  },
  {
    q: "どんな味わい？",
    a: "程よい苦味と芳醇な香り、そしてまろやかな甘み。鮮やかな緑色とすっきりした後味が特長です。",
  },
  {
    q: "どうやって楽しむ？",
    a: "お薄として点てるのはもちろん、抹茶ラテやスイーツへのアレンジにも最適です。",
  },
];

const AboutPage = () => {
  return (
    <main className="bg-white">
      {/* ──────────── LONG STORY ──────────── */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 lg:px-0 grid lg:grid-cols-2 gap-12 items-start">
          {/* photo */}
          <div className="relative h-64 sm:h-96 lg:h-full order-last lg:order-first">
            <video
              src="/videos/tea.mp4"
              autoPlay
              muted
              playsInline
              loop
              className="object-cover rounded-2xl"
            />
          </div>

          {/* narrative */}
          <article className="space-y-6 text-gray-700 text-sm leading-relaxed">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
              聚楽苑の物語
            </h2>
            <p>
              静岡県富士市境地区——岳南電車の終着駅から少し歩くと、
              霊峰富士を背景に広がる小さな茶畑に辿り着きます。ここが創業百年を
              迎えようとする家族経営のお茶屋〈聚楽苑〉。三代にわたり守られてきた
              茶園は今、<strong>完全無農薬・無化学肥料</strong>
              という新たな挑戦に踏み出しています。
            </p>
            <p>
              追い求めたのは「身体にも環境にも優しい一服」。
              化学肥料の代わりに自家製堆肥をすき込み、雑草はすべて手作業で抜き取る——
              膨大な手間を惜しまぬ姿勢が〈富士抹茶 かがやき〉を生みました。
            </p>
            <p>
              碾茶に適した若葉だけを選び、<strong>21日間の覆下栽培</strong>
              で旨味を凝縮。
              蒸し・乾燥を経た茶葉は、老舗・名光茶業の石臼でゆっくりと挽かれ、
              鮮烈な緑とまろやかな甘みをたたえた抹茶へと昇華します。
            </p>
            <p>
              春、新芽が萌える茶畑をそよぐ風。鳥のさえずり、遠くに望む富士山——
              その風景ごと味わってほしいから、聚楽苑では希望者に
              茶摘みや石臼挽き体験を開くことも。静かな里山で味わう挽きたての抹茶は、
              薫り高く格別です。
            </p>
            <p>
              海外からの訪問客も年々増加しています。富士市や観光団体の多言語情報発信に支えられ、
              現地を訪ねる前から母国語でストーリーを知ることが可能に。
              オンラインでも世界へ向けて販売を拡大し、日本茶の魅力を静かに発信し続けています。
            </p>
          </article>
        </div>
      </section>

      <section className="py-24 bg-matcha-light/5">
        <div className="max-w-5xl mx-auto px-4 lg:px-0 text-center space-y-10">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900">
            安心・安全の３つの理由
          </h2>

          {/* ① 横並び用のグリッド／フレックス */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { label: "農薬・化学肥料不使用で栽培", Icon: FaSeedling },
              { label: "富士山麓の清らかな湧き水", Icon: FaWater },
              { label: "有機JAS & 富士ブランド認定", Icon: FaCertificate },
            ].map(({ label, Icon }, i) => (
              /* ② 幅指定を外し、中央寄せのみに */
              <div key={i} className="flex flex-col items-center gap-3">
                <Icon className="w-8 h-8 text-matcha-dark" />
                <p className="text-sm leading-relaxed max-w-[12rem] mx-auto">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── FAQ ─────────────── */}
      <section className="py-24 bg-matcha-light/5">
        <div className="max-w-4xl mx-auto px-4 lg:px-0">
          <h2 className="text-center text-2xl md:text-3xl font-light text-gray-900 mb-8">
            FAQ
          </h2>
          <Accordion type="single" collapsible>
            {faqs.map(({ q, a }, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section className="py-24 text-center">
        <h2 className="text-xl md:text-2xl font-light mb-6">
          オンラインで味わう
        </h2>
        <Link href="/products">
          <Button variant="default" className="px-8 py-4 text-sm group">
            ショップを見る
            <FaArrowRight
              size={16}
              className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Button>
        </Link>
      </section>
    </main>
  );
};

export default AboutPage;
