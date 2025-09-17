"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function JASPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // next-intlを使用して翻訳データを取得
  const t = useTranslations("jas");

  const certificationFeatures = [
    {
      titleKey: "features.safety.title",
      descriptionKey: "features.safety.description",
      number: "01",
      accentColor: "border-green-500",
    },
    {
      titleKey: "features.environment.title",
      descriptionKey: "features.environment.description",
      number: "02",
      accentColor: "border-emerald-500",
    },
    {
      titleKey: "features.health.title",
      descriptionKey: "features.health.description",
      number: "03",
      accentColor: "border-red-500",
    },
    {
      titleKey: "features.sustainability.title",
      descriptionKey: "features.sustainability.description",
      number: "04",
      accentColor: "border-blue-500",
    },
  ];

  const certificationStandards = [
    {
      titleKey: "standards.noChemicals.title",
      descriptionKey: "standards.noChemicals.description",
    },
    {
      titleKey: "standards.organicFertilizer.title",
      descriptionKey: "standards.organicFertilizer.description",
    },
    {
      titleKey: "standards.soilManagement.title",
      descriptionKey: "standards.soilManagement.description",
    },
  ];

  const benefits = [
    {
      titleKey: "benefits.taste.title",
      descriptionKey: "benefits.taste.description",
      number: "A",
    },
    {
      titleKey: "benefits.nutrition.title",
      descriptionKey: "benefits.nutrition.description",
      number: "B",
    },
    {
      titleKey: "benefits.safety.title",
      descriptionKey: "benefits.safety.description",
      number: "C",
    },
  ];

  // JASマーク画像コンポーネント
  const JASMark = ({ className = "w-20 h-12", priority = false }) => (
    <div className={`relative ${className}`}>
      <Image
        src="/images/jas.webp"
        alt="有機JASマーク"
        fill
        className="object-contain"
        priority={priority}
      />
    </div>
  );

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* ===== メインヒーローセクション ===== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 背景画像 */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/chaba.webp"
            alt="有機栽培茶園"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        {/* コンテンツ */}
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="inline-block mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm tracking-widest uppercase text-green-300 font-medium">
                {t("hero.subtitle")}
              </p>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-light mb-6 sm:mb-8 leading-tight whitespace-pre-line tracking-tight">
              {t("hero.title")}
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="h-0.5 bg-gradient-to-r from-green-400 to-emerald-300 mx-auto mb-6 sm:mb-10 sm:w-[120px]"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="text-sm sm:text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed opacity-90 whitespace-pre-line px-2"
            >
              {t("hero.description")}
            </motion.p>
          </motion.div>
        </div>

        {/* スクロールインジケーター */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center space-y-2 sm:space-y-3 cursor-pointer hover:opacity-80 transition-opacity">
            <span className="text-xs tracking-wider opacity-70 text-white font-medium">
              {t("hero.scroll")}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-8 sm:h-12 bg-gradient-to-b from-white/70 to-transparent"
            />
          </div>
        </motion.div>
      </section>

      {/* ===== 有機JAS認証とは ===== */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 relative">
                {/* JASマーク（カード内） */}
                <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                  <JASMark className="w-12 h-7 sm:w-16 sm:h-10" />
                </div>

                <div className="mb-6 sm:mb-8 pr-16 sm:pr-20">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-3 sm:mb-4">
                    {t("about.title")}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-green-600 font-medium tracking-wide">
                    {t("about.subtitle")}
                  </p>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8 whitespace-pre-line">
                  {t("about.description")}
                </p>
                <div className="flex items-center">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-600 tracking-wide">
                    {t("about.verified")}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/jas-field.webp"
                  alt="畑のjasマーク"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 text-white">
                  <p className="text-xs sm:text-sm opacity-90 mb-1 sm:mb-2 tracking-wide">
                    {t("about.imageCaption")}
                  </p>
                  <p className="text-sm sm:text-lg md:text-xl font-light">
                    {t("about.imageCaptionDetail")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== JAS認証マーク説明セクション ===== */}
      <section className="py-12 sm:py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-green-100 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="flex-shrink-0">
                  <JASMark className="w-32 h-20 sm:w-40 sm:h-24" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-gray-900 mb-4 sm:mb-6">
                    {t("jasMark.title")}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                    {t("jasMark.description1")}
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {t("jasMark.description2")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 4つの特徴 ===== */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-6 sm:mb-8 tracking-tight">
              {t("features.title")}
            </h2>
            <div className="w-20 sm:w-24 md:w-32 h-0.5 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 mx-auto mb-6 sm:mb-8" />
            <p className="text-sm sm:text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
              {t("features.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {certificationFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-white border-2 border-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:shadow-xl hover:border-green-200 transition-all duration-300 relative">
                  {/* 各カードにも小さなJASマーク */}
                  <div className="absolute top-3 right-3 opacity-20">
                    <JASMark className="w-8 h-5" />
                  </div>

                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 border-4 ${feature.accentColor} rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-lg sm:text-2xl font-light text-gray-700">
                      {feature.number}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-3 sm:mb-4 tracking-wide">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {t(feature.descriptionKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 認証基準詳細 ===== */}
      <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-6 sm:mb-8 tracking-tight">
              {t("standards.title")}
            </h2>
            <div className="w-20 sm:w-24 md:w-32 h-0.5 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 mx-auto mb-6 sm:mb-8" />
            <p className="text-sm sm:text-base md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
              {t("standards.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 sm:space-y-8"
            >
              {certificationStandards.map((standard, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start space-x-4 sm:space-x-6">
                    <div className="flex-grow">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-light text-gray-900 mb-3 sm:mb-4 tracking-wide">
                        {t(standard.titleKey)}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                        {t(standard.descriptionKey)}
                      </p>
                    </div>
                    <div className="flex-shrink-0 opacity-30">
                      <JASMark className="w-12 h-7" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="relative h-48 sm:h-64 md:h-80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/cover.webp"
                  alt="有機栽培の茶畑管理"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="relative h-48 sm:h-64 md:h-80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/steam.jpg"
                  alt="有機茶葉の加工"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 有機茶の魅力 ===== */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-6 sm:mb-8 tracking-tight">
              {t("benefits.title")}
            </h2>
            <div className="w-20 sm:w-24 md:w-32 h-0.5 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 mx-auto mb-6 sm:mb-8" />
            <p className="text-sm sm:text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
              {t("benefits.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl text-center hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-xl sm:rounded-2xl mx-auto mb-6 sm:mb-8 shadow-sm">
                  <span className="text-2xl sm:text-3xl font-light text-green-600">
                    {benefit.number}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-light text-gray-900 mb-4 sm:mb-6 tracking-wide">
                  {t(benefit.titleKey)}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                  {t(benefit.descriptionKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
