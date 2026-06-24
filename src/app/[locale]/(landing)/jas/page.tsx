"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

// ブランドパレット（聚楽苑）
const MATCHA = "#2e4b3a"; // 抹茶ダーク
const GOLD = "#bfa75a"; // 金
const WASHI = "#f6f3e9"; // 和紙ベージュ

// 控えめなフェードアップ（サイト全体のトーンに合わせる）
const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

// 欧文の小見出し（Cormorant）
const Eyebrow = ({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
}) => (
  <span
    className="font-cormorant text-xs sm:text-sm tracking-[0.35em] uppercase"
    style={{ color: tone === "light" ? "rgba(255,255,255,0.7)" : GOLD }}
  >
    {children}
  </span>
);

// 細い金の罫
const Rule = ({ className = "" }: { className?: string }) => (
  <span
    className={`block h-px ${className}`}
    style={{ backgroundColor: GOLD }}
  />
);

export default function JASPage() {
  const t = useTranslations("jas");

  const certificationFeatures = [
    { titleKey: "features.safety.title", descriptionKey: "features.safety.description", number: "01" },
    { titleKey: "features.environment.title", descriptionKey: "features.environment.description", number: "02" },
    { titleKey: "features.health.title", descriptionKey: "features.health.description", number: "03" },
    { titleKey: "features.sustainability.title", descriptionKey: "features.sustainability.description", number: "04" },
  ];

  const certificationStandards = [
    { titleKey: "standards.noChemicals.title", descriptionKey: "standards.noChemicals.description", number: "壱" },
    { titleKey: "standards.organicFertilizer.title", descriptionKey: "standards.organicFertilizer.description", number: "弐" },
    { titleKey: "standards.soilManagement.title", descriptionKey: "standards.soilManagement.description", number: "参" },
  ];

  const benefits = [
    { titleKey: "benefits.taste.title", descriptionKey: "benefits.taste.description" },
    { titleKey: "benefits.nutrition.title", descriptionKey: "benefits.nutrition.description" },
    { titleKey: "benefits.safety.title", descriptionKey: "benefits.safety.description" },
  ];

  // 有機JASマーク
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
    <div className="min-h-screen" style={{ backgroundColor: WASHI }}>
      {/* ===== ヒーロー ===== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/field2.webp"
            alt="有機栽培茶園"
            fill
            className="object-cover"
            priority
          />
          {/* 茶墨色のオーバーレイ（純黒は使わない） */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#14241b]/75 via-[#14241b]/40 to-[#14241b]/80" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow tone="light">{t("hero.subtitle")}</Eyebrow>

            <h1 className="font-noto-serif text-3xl sm:text-4xl md:text-6xl font-light mt-6 mb-8 leading-[1.4] tracking-[0.06em] whitespace-pre-line">
              {t("hero.title")}
            </h1>

            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "64px" }}
              transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
              className="block h-px bg-white/50 mx-auto mb-8"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="font-noto-serif text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto leading-loose text-white/85 whitespace-pre-line"
            >
              {t("hero.description")}
            </motion.p>
          </motion.div>
        </div>

        {/* スクロール */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
        >
          <span className="font-cormorant text-[0.7rem] tracking-[0.4em] text-white/70 mb-3">
            {t("hero.scroll")}
          </span>
          <motion.span
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.7, 0.3, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="block w-px h-12 bg-white/60 origin-top"
          />
        </motion.div>

        {/* 波（和紙地へ繋ぐ） */}
        <div className="absolute bottom-0 left-0 w-full h-16 sm:h-20 z-10 pointer-events-none" style={{ color: WASHI }}>
          <svg className="w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
            <path d="M0,40 Q150,10 300,40 T600,40 T900,40 T1200,40 L1200,100 L0,100 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* ===== 有機JAS認証とは ===== */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <motion.div {...fade} className="lg:col-span-6">
              <div className="relative">
                <Eyebrow>{t("about.subtitle")}</Eyebrow>
                <h2
                  className="font-noto-serif text-3xl md:text-4xl font-light mt-5 mb-8 tracking-wide"
                  style={{ color: MATCHA }}
                >
                  {t("about.title")}
                </h2>
                <Rule className="w-12 mb-8" />
                <p className="font-noto-serif text-sm md:text-base text-gray-700 leading-[2.1] whitespace-pre-line">
                  {t("about.description")}
                </p>
                <div className="mt-10">
                  <JASMark className="w-20 h-12" />
                </div>
              </div>
            </motion.div>

            <motion.div {...fade} transition={{ ...fade.transition, delay: 0.15 }} className="lg:col-span-6">
              <div className="relative aspect-4/5 sm:aspect-3/2 lg:aspect-4/5 overflow-hidden">
                <Image src="/images/jas-field.webp" alt="畑のjasマーク" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14241b]/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-cormorant text-xs tracking-[0.25em] uppercase opacity-80 mb-2">
                    {t("about.imageCaption")}
                  </p>
                  <p className="font-noto-serif text-base md:text-lg font-light leading-relaxed">
                    {t("about.imageCaptionDetail")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== JASマーク（深い抹茶色の帯） ===== */}
      <section className="py-20 md:py-28" style={{ backgroundColor: MATCHA }}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...fade} className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="shrink-0 bg-white px-8 py-7 rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
              <JASMark className="w-36 h-22 sm:w-40 sm:h-24" />
            </div>
            <div className="text-center md:text-left">
              <Eyebrow tone="light">Certified Mark</Eyebrow>
              <h3 className="font-noto-serif text-2xl md:text-3xl font-light mt-4 mb-6 text-white leading-relaxed">
                {t("jasMark.title")}
              </h3>
              <Rule className="w-12 mx-auto md:mx-0 mb-6" />
              <p className="font-noto-serif text-sm md:text-base text-white/85 leading-loose mb-4">
                {t("jasMark.description1")}
              </p>
              <p className="font-noto-serif text-xs md:text-sm text-white/65 leading-[1.9]">
                {t("jasMark.description2")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 4つの特徴 ===== */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fade} className="text-center mb-16 md:mb-20">
            <Eyebrow>Features</Eyebrow>
            <h2
              className="font-noto-serif text-3xl md:text-4xl font-light mt-5 mb-6 tracking-wide"
              style={{ color: MATCHA }}
            >
              {t("features.title")}
            </h2>
            <Rule className="w-12 mx-auto mb-6" />
            <p className="font-noto-serif text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-loose">
              {t("features.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
            {certificationFeatures.map((feature, index) => (
              <motion.div
                key={index}
                {...fade}
                transition={{ ...fade.transition, delay: index * 0.08 }}
                className="border-t pt-7"
                style={{ borderColor: "rgba(46,75,58,0.15)" }}
              >
                <div className="flex items-baseline gap-5">
                  <span
                    className="font-cormorant text-4xl md:text-5xl font-light leading-none"
                    style={{ color: GOLD }}
                  >
                    {feature.number}
                  </span>
                  <div>
                    <h3
                      className="font-noto-serif text-lg md:text-xl font-medium mb-3 tracking-wide"
                      style={{ color: MATCHA }}
                    >
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-sm text-gray-600 leading-[1.95]">
                      {t(feature.descriptionKey)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 厳格な認証基準 ===== */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#efe9da" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fade} className="text-center mb-16 md:mb-20">
            <Eyebrow>Standards</Eyebrow>
            <h2
              className="font-noto-serif text-3xl md:text-4xl font-light mt-5 mb-6 tracking-wide"
              style={{ color: MATCHA }}
            >
              {t("standards.title")}
            </h2>
            <Rule className="w-12 mx-auto mb-6" />
            <p className="font-noto-serif text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-loose">
              {t("standards.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              {certificationStandards.map((standard, index) => (
                <motion.div
                  key={index}
                  {...fade}
                  transition={{ ...fade.transition, delay: index * 0.08 }}
                  className="flex gap-6 py-7 border-b"
                  style={{ borderColor: "rgba(46,75,58,0.15)" }}
                >
                  <span
                    className="font-noto-serif text-2xl md:text-3xl font-light leading-none shrink-0 w-8"
                    style={{ color: GOLD }}
                  >
                    {standard.number}
                  </span>
                  <div>
                    <h3
                      className="font-noto-serif text-lg md:text-xl font-medium mb-3 tracking-wide"
                      style={{ color: MATCHA }}
                    >
                      {t(standard.titleKey)}
                    </h3>
                    <p className="text-sm md:text-base text-gray-700 leading-[1.95]">
                      {t(standard.descriptionKey)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div {...fade} transition={{ ...fade.transition, delay: 0.15 }} className="space-y-6">
              <div className="relative h-56 md:h-72 overflow-hidden">
                <Image src="/images/field.webp" alt="有機栽培の茶畑管理" fill className="object-cover" />
              </div>
              <div className="relative h-56 md:h-72 overflow-hidden">
                <Image src="/images/cha.webp" alt="有機茶葉の加工" fill className="object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 有機茶の魅力 ===== */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fade} className="text-center mb-16 md:mb-20">
            <Eyebrow>Benefits</Eyebrow>
            <h2
              className="font-noto-serif text-3xl md:text-4xl font-light mt-5 mb-6 tracking-wide"
              style={{ color: MATCHA }}
            >
              {t("benefits.title")}
            </h2>
            <Rule className="w-12 mx-auto mb-6" />
            <p className="font-noto-serif text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-loose">
              {t("benefits.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                {...fade}
                transition={{ ...fade.transition, delay: index * 0.1 }}
                className="text-center px-2"
              >
                <Rule className="w-10 mx-auto mb-7" />
                <h3
                  className="font-noto-serif text-xl md:text-2xl font-light mb-5 tracking-wide"
                  style={{ color: MATCHA }}
                >
                  {t(benefit.titleKey)}
                </h3>
                <p className="text-sm md:text-base text-gray-700 leading-loose">
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
