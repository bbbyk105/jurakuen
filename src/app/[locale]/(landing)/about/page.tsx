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
import Image from "next/image";

const faqs = [
  {
    q: "有機JASって何？",
    a: "農薬・化学肥料を使用せず、厳格な基準を満たした農産物にのみ付与される日本の有機認証です。",
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
            <Image
              src="/images/fuji.webp"
              alt="写真の説明"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
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
              膨大な手間を惜しまぬ姿勢が〈富士抹茶 かがやき〉を生みました。
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

      {/* ──────────── 生産者セクション ──────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 lg:px-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 生産者のコメント */}
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-light text-gray-900">
                生産者からのメッセージ
              </h3>
              <blockquote className="text-gray-700 text-sm leading-relaxed space-y-4">
                <p>
                  「化学肥料や農薬に頼らず、自然の力だけでお茶を育てる——
                  それは決して簡単な道ではありませんでした。」
                </p>
                <p>
                  「手作業での除草、自家製堆肥の管理、天候との向き合い方。
                  すべてを一から学び直しました。しかし、その先にあったのは
                  今まで味わったことのない、本当に純粋な抹茶の味わいでした。」
                </p>
                <p>
                  「私たちが生産しているお茶には、この挑戦で得た学びと喜びが込められています。
                  飲んでくださる皆様にも、その輝きを感じていただけたら幸いです。」
                </p>
              </blockquote>
              <div className="text-right">
                <p className="text-sm text-gray-600">聚楽苑</p>
                <p className="text-sm font-medium text-gray-900">望月</p>
              </div>
            </div>
            {/* 生産者の写真 */}
            <div className="relative h-80 lg:h-96">
              <Image
                src="/images/producer.webp"
                alt="聚楽苑生産者"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── 被せ茶動画セクション ──────────── */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 lg:px-0">
          <div className="text-center mb-12">
            <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-4">
              茶畑の様子
            </h3>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              青々と広がる茶畑の風景。緑に囲まれたこの場所で、茶葉が成長していく過程が感じられます。
              穏やかな風に揺れる茶葉の様子や、農作業の一幕をお楽しみください。
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
              >
                <source src="/videos/tea_field.mp4" type="video/mp4" />
                お使いのブラウザは動画の再生に対応していません。
              </video>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg pointer-events-none"></div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 italic">
              豊かな緑の茶畑が広がる風景、自然の恵みを感じてください。
            </p>
          </div>
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
