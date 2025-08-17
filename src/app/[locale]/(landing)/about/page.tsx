"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";

// ✅ 単一コンポーネントに統合（ヒーロー + 製造工程）
export default function TeaProduction() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<HTMLElement[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 茶葉の種類別データ
  const teaTypes = [
    {
      id: "matcha",
      name: "抹茶",
      subtitle: "MATCHA",
      description:
        "覆下栽培で育てられた茶葉を石臼で挽いた、日本の伝統的な粉末茶",
      color: "from-green-800 to-green-600",
      processes: [
        {
          step: 1,
          title: "栽培",
          subtitle: "お茶の生命を育む第一歩",
          description:
            "一杯のお茶ができるまでに、茶樹を植えてから収穫するまで約5年の歳月がかかります。",
          detail:
            "春の新茶を迎えるために、前年から土づくりや、茶葉の管理を丁寧に行い、やっと収穫が出来るようになります。霧島の豊かな自然環境の中で丁寧に育てられ、高品質な茶葉を実らせるために、茶樹を健康な状態に保ちます。",
          image: "/images/tezumi.webp",
        },
        {
          step: 2,
          title: "収穫",
          subtitle: "最高品質の一芯二葉を手摘みで",
          description:
            "抹茶用の茶葉は収穫前20日間、覆いをかけて日光を遮り、旨味を凝縮させます。",
          detail:
            "覆下栽培により、茶葉のアミノ酸が増加し、渋味成分のタンニンが抑制されます。この特別な栽培方法により、抹茶特有の甘味と旨味が生まれ、鮮やかな緑色を実現します。",
          image: "/images/cover.webp",
        },
        {
          step: 3,
          title: "蒸し工程",
          subtitle: "酵素の働きを止めて緑色を保つ",
          description:
            "収穫した茶葉を蒸気で蒸し、酵素の働きを止めて緑茶の特徴である緑色を保ちます。",
          detail:
            "蒸し時間は20〜30秒と短時間で行われ、茶葉の細胞を傷つけずに酵素活動を停止させます。この工程により、茶葉の鮮やかな緑色と新鮮な香りが保たれます。",
          image: "/images/mushi.webp",
        },
        {
          step: 4,
          title: "乾燥",
          subtitle: "てん茶へと加工",
          description: "蒸した茶葉を特殊な炉で乾燥させ、てん茶を作ります。",
          detail:
            "茶葉を揉まずに、そのまま乾燥させることで、葉の形を保ったてん茶が完成します。この工程で茶葉の水分含有率を3〜4%まで下げ、長期保存を可能にします。",
          image: "/images/kannsou.jpg",
        },
        {
          step: 5,
          title: "石臼挽き",
          subtitle: "伝統の石臼で極細粉末に",
          description:
            "てん茶を石臼で丁寧に挽き、なめらかな抹茶粉末に仕上げます。",
          detail:
            "石臼での挽き作業は1時間に約40gという驚くほどゆっくりとしたペースで行われます。この慎重さが抹茶の粒子の細かさと、風味の保持を実現しています。",
          image: "/images/usu.jpg",
        },
      ],
    },
    {
      id: "hojicha",
      name: "棒茶",
      subtitle: "HOJICHA",
      description: "茶葉の茎部分を焙煎した、香ばしい香りが特徴の日本茶",
      color: "from-amber-800 to-amber-600",
      processes: [
        {
          step: 1,
          title: "茎の選別",
          subtitle: "上質な茎部分のみを厳選",
          description:
            "煎茶の製造過程で取り除かれた茎部分を丁寧に選別し、棒茶の原料とします。",
          detail:
            "茎部分にはテアニンなどの旨味成分が豊富に含まれており、カフェインが少ないのが特徴です。太さや色合いを確認しながら、品質の良い茎のみを選別します。",
          image: "/images/stem-selection.jpg",
        },
        {
          step: 2,
          title: "焙煎",
          subtitle: "高温で香ばしさを引き出す",
          description:
            "200度前後の高温で茎を焙煎し、特有の香ばしい香りと茶色の色合いを作り出します。",
          detail:
            "焙煎により、茶葉に含まれるクロロフィルが分解され、特有の茶褐色になります。同時に、香ばしい香気成分が生成され、棒茶独特の風味が生まれます。",
          image: "/images/roasting.jpg",
        },
        {
          step: 3,
          title: "冷却",
          subtitle: "急速冷却で香りを閉じ込める",
          description:
            "焙煎後、すぐに冷却して香りを閉じ込め、品質を安定させます。",
          detail:
            "焙煎直後の急速冷却により、香気成分の揮発を防ぎ、焙煎による香ばしさを茶葉に定着させます。この工程が棒茶の品質を決定する重要なポイントです。",
          image: "/images/cooling.jpg",
        },
        {
          step: 4,
          title: "仕上げ",
          subtitle: "最終調整で完成",
          description:
            "サイズを揃え、最終的な品質チェックを行い、棒茶として完成させます。",
          detail:
            "異物の除去や粒度の調整を行い、均一な品質の棒茶に仕上げます。水分含有率や香気をチェックし、最高品質の棒茶として出荷されます。",
          image: "/images/finishing.jpg",
        },
      ],
    },
    {
      id: "sencha",
      name: "煎茶",
      subtitle: "SENCHA",
      description:
        "日本で最も親しまれている緑茶で、爽やかな香りと程よい渋味が特徴",
      color: "from-emerald-800 to-emerald-600",
      processes: [
        {
          step: 1,
          title: "栽培",
          subtitle: "露地栽培で自然の恵みを",
          description:
            "直射日光の下で栽培し、茶葉本来の力強い味わいを育みます。",
          detail:
            "煎茶用の茶葉は覆いをかけずに露地で栽培されるため、カテキンやカフェインが豊富に含まれます。適度な渋味と爽快感のある味わいが特徴です。",
          image: "/images/sencha-cultivation.jpg",
        },
        {
          step: 2,
          title: "収穫",
          subtitle: "機械摘みで効率よく",
          description: "新芽が伸びた頃に機械で効率的に収穫し、鮮度を保ちます。",
          detail:
            "一番茶は4月下旬から5月上旬、二番茶は6月下旬から7月上旬に収穫されます。機械摘みにより、短時間で大量の茶葉を新鮮な状態で収穫できます。",
          image: "/images/sencha-harvest.jpg",
        },
        {
          step: 3,
          title: "蒸し工程",
          subtitle: "深蒸しで濃厚な味わいに",
          description:
            "通常より長く蒸すことで、茶葉の細胞を破り、濃厚な味わいを引き出します。",
          detail:
            "深蒸し煎茶は60〜120秒蒸すことで、茶葉が細かくなり、短時間で濃い緑色の茶が抽出されます。まろやかで渋味の少ない味わいが特徴です。",
          image: "/images/sencha-steaming.jpg",
        },
        {
          step: 4,
          title: "揉み工程",
          subtitle: "形を整えて旨味を凝縮",
          description:
            "茶葉を揉みながら乾燥させ、針のような細長い形に整えます。",
          detail:
            "粗揉、揉捻、中揉、精揉の4段階で茶葉を揉み、水分を除去しながら煎茶特有の細長い形に整えます。この工程で茶葉の組織が破れ、旨味成分が抽出されやすくなります。",
          image: "/images/sencha-rolling.jpg",
        },
        {
          step: 5,
          title: "火入れ",
          subtitle: "最終仕上げで香りを決定",
          description: "適度な火入れを行い、煎茶の香りと保存性を高めます。",
          detail:
            "火入れにより余分な水分を除去し、茶葉の香りを引き立てます。火加減により『火香』と呼ばれる独特の香りが生まれ、煎茶の個性が決まります。",
          image: "/images/sencha-firing.jpg",
        },
      ],
    },
  ];

  // 可視領域でセクションのインデックスを更新（必要に応じて利用可能）
  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(index);
        },
        { threshold: 0.3 }
      );
      observer.observe(ref);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* ===== ヒーローセクション（動画背景） ===== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 背景動画 */}
        <div className="absolute inset-0 z-0 bg-black/70">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/tea-field-workers.jpg"
            className="w-full h-full object-cover"
          >
            <source src="/videos/tea.mp4" type="video/mp4" />
          </video>

          {/* オーバーレイ */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* コンテンツ */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-sm tracking-widest uppercase mb-4 opacity-90">
              TEA PRODUCTION PROCESS
            </p>
            <h1 className="text-xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
              一杯のお茶ができるまでに
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="h-px bg-white mx-auto mb-8"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed opacity-90"
            >
              聚楽苑が丹精込めて作る三種類のお茶。
              <br />
              それぞれの製法には、百年の歴史と職人の技が息づいています。
            </motion.p>
          </motion.div>
        </div>

        {/* スクロールインジケーター */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center space-y-2 cursor-pointer hover:opacity-80 transition-opacity">
            <span className="text-xs tracking-wider opacity-70 text-white">
              SCROLL
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-8 bg-white opacity-70"
            />
          </div>
        </motion.div>
      </section>

      {/* ===== 製造工程セクション ===== */}
      <div className="bg-white">
        {teaTypes.map((tea, teaIndex) => (
          <section key={tea.id} className="min-h-screen py-20">
            {/* セクションヘッダー */}
            <div className="max-w-7xl mx-auto px-4 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                  {tea.name}の製造工程
                </h2>
                <div className="w-24 h-px bg-gray-300 mx-auto mb-6" />
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {tea.description}
                </p>
              </motion.div>
            </div>

            {/* 製造工程カード群 */}
            <div className="max-w-7xl mx-auto px-4">
              {tea.processes.map((process, processIndex) => (
                <article
                  key={process.step}
                  ref={(el) => {
                    if (el)
                      sectionRefs.current[teaIndex * 10 + processIndex] = el;
                  }}
                  className="mb-32 last:mb-0"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* 画像 */}
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: processIndex % 2 === 0 ? -50 : 50,
                      }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                      className={`${
                        processIndex % 2 === 0 ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={process.image}
                          alt={process.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                      </div>
                    </motion.div>

                    {/* テキスト */}
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: processIndex % 2 === 0 ? 50 : -50,
                      }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      viewport={{ once: true }}
                      className={`${
                        processIndex % 2 === 0 ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <div className="space-y-6">
                        <div>
                          <p className="text-sm text-gray-500 font-medium tracking-wider uppercase mb-2">
                            {process.subtitle}
                          </p>
                          <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                            {process.step}. {process.title}
                          </h3>
                          <div className="w-16 h-px bg-gray-300 mb-6" />
                        </div>

                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                          {process.description}
                        </p>

                        <p className="text-gray-600 leading-relaxed">
                          {process.detail}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </article>
              ))}
            </div>

            {/* セクション区切り線 */}
            {teaIndex < teaTypes.length - 1 && (
              <div className="max-w-7xl mx-auto px-4 mt-20">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                />
              </div>
            )}
          </section>
        ))}

        {/* 最終セクション - まとめ */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8">
                伝統と革新が織りなす
                <br />
                一杯のお茶
              </h2>
              <div className="w-24 h-px bg-gray-300 mx-auto mb-8" />
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                それぞれ異なる製法から生まれる抹茶、棒茶、煎茶。
                <br />
                一杯一杯に込められた職人の技と自然の恵みを
                <br />
                心ゆくまでお楽しみください。
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
