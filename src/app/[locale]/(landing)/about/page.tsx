"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function TeaProduction() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // next-intlを使用して翻訳データを取得
  const t = useTranslations("teaProduction");

  // 画像パスの設定（各茶葉タイプのプロセス画像）
  const imageMap = {
    matcha: {
      cultivation: "/images/tezumi.webp",
      harvest: "/images/cover.webp",
      steaming: "/images/steam.jpg",
      drying: "/images/kannsou.jpg",
      grinding: "/images/usu.webp",
    },
    sencha: {
      cultivation: "/images/chaba.webp",
      harvest: "/images/tsumi.jpg",
      steaming: "/images/burn.webp",
      rolling: "/images/mochizuki.webp",
      firing: "/images/kizami.jpg",
    },
  };

  // カラーテーマの設定
  const colorThemes = {
    matcha: "from-green-800 to-green-600",
    sencha: "from-emerald-800 to-emerald-600",
  };

  // 茶葉データの配列を作成
  const teaTypesArray = [
    {
      id: "matcha" as const,
      color: colorThemes.matcha,
      images: imageMap.matcha,
    },
    {
      id: "sencha" as const,
      color: colorThemes.sencha,
      images: imageMap.sencha,
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* ===== メインヒーローセクション（動画背景） ===== */}
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
              {t("mainHero.subtitle")}
            </p>
            <h1 className="text-xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight whitespace-pre-line">
              {t("mainHero.title")}
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
              className="text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed opacity-90 whitespace-pre-line"
            >
              {t("mainHero.description")}
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
              {t("mainHero.scroll")}
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
        {teaTypesArray.map((tea, teaIndex) => (
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
                  {t(`teaTypes.${tea.id}.sectionTitle`)}
                </h2>
                <div className="w-24 h-px bg-gray-300 mx-auto mb-6" />
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {t(`teaTypes.${tea.id}.description`)}
                </p>
              </motion.div>
            </div>

            {/* 製造工程カード群 */}
            <div className="max-w-7xl mx-auto px-4">
              {t
                .raw(`teaTypes.${tea.id}.processOrder`)
                .map((processKey: string, processIndex: number) => (
                  <article key={processKey} className="mb-32 last:mb-0">
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
                            src={
                              tea.images[processKey as keyof typeof tea.images]
                            }
                            alt={t(
                              `teaTypes.${tea.id}.processes.${processKey}.title`
                            )}
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
                              {t(
                                `teaTypes.${tea.id}.processes.${processKey}.subtitle`
                              )}
                            </p>
                            <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                              {t.raw(
                                `teaTypes.${tea.id}.processes.${processKey}.step`
                              )}
                              .{" "}
                              {t(
                                `teaTypes.${tea.id}.processes.${processKey}.title`
                              )}
                            </h3>
                            <div className="w-16 h-px bg-gray-300 mb-6" />
                          </div>

                          <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            {t(
                              `teaTypes.${tea.id}.processes.${processKey}.description`
                            )}
                          </p>

                          <p className="text-gray-600 leading-relaxed">
                            {t(
                              `teaTypes.${tea.id}.processes.${processKey}.detail`
                            )}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </article>
                ))}
            </div>

            {/* セクション区切り線 */}
            {teaIndex < teaTypesArray.length - 1 && (
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
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 whitespace-pre-line">
                {t("conclusion.title")}
              </h2>
              <div className="w-24 h-px bg-gray-300 mx-auto mb-8" />
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
                {t("conclusion.description")}
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
