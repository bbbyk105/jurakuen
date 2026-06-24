// components/sections/JASNavigationSection.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

// ブランドパレット（聚楽苑）
const MATCHA = "#2e4b3a"; // 抹茶ダーク
const GOLD = "#bfa75a"; // 金
const WASHI = "#f6f3e9"; // 和紙ベージュ

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

export default function JASNavigationSection() {
  const t = useTranslations("jasNavigation");

  return (
    <section
      className="py-20 sm:py-24 md:py-28"
      style={{ backgroundColor: WASHI }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* 見出し */}
        <motion.div {...fade} className="text-center mb-14 md:mb-20">
          <span
            className="font-cormorant text-xs sm:text-sm tracking-[0.35em] uppercase"
            style={{ color: GOLD }}
          >
            {t("badge")}
          </span>
          <h2
            className="font-noto-serif text-2xl sm:text-3xl md:text-4xl font-light mt-5 mb-6 tracking-wide"
            style={{ color: MATCHA }}
          >
            {t("title")}
          </h2>
          <span
            className="block h-px w-12 mx-auto mb-6"
            style={{ backgroundColor: GOLD }}
          />
          <p className="font-noto-serif text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-loose whitespace-pre-line">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* 本文：画像 ＋ 認証情報 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* 左：認証マークの畑写真 */}
          <motion.div {...fade} className="lg:col-span-6">
            <div className="relative aspect-4/3 lg:aspect-4/5 overflow-hidden rounded-sm shadow-[0_18px_50px_rgba(20,36,27,0.18)]">
              <Image
                src="/images/jas-field.webp"
                alt={t("overlay.title")}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14241b]/80 via-[#14241b]/15 to-transparent" />

              {/* キャプション */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-noto-serif text-lg md:text-xl font-light leading-relaxed mb-1.5">
                  {t("overlay.title")}
                </p>
                <p className="font-noto-serif text-xs md:text-sm text-white/80 leading-relaxed">
                  {t("overlay.description")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* 右：認証情報 ＋ CTA */}
          <motion.div
            {...fade}
            transition={{ ...fade.transition, delay: 0.15 }}
            className="lg:col-span-6"
          >
            {/* 有機JASマーク */}
            <div className="relative w-20 h-12 mb-7">
              <Image
                src="/images/jas.webp"
                alt="有機JASマーク"
                fill
                className="object-contain object-left"
              />
            </div>

            <h3
              className="font-noto-serif text-xl md:text-2xl font-medium mb-5 tracking-wide"
              style={{ color: MATCHA }}
            >
              {t("certification.title")}
            </h3>
            <span
              className="block h-px w-12 mb-6"
              style={{ backgroundColor: GOLD }}
            />
            <p className="font-noto-serif text-sm md:text-base text-gray-700 leading-[2.1] mb-9">
              {t("certification.description")}
            </p>

            <Link
              href="/jas"
              aria-label={t("cta.ariaLabel")}
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-sm text-white text-sm md:text-base font-noto-serif tracking-wide shadow-[0_10px_30px_rgba(46,75,58,0.25)] transition-all duration-300 hover:shadow-[0_14px_38px_rgba(46,75,58,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ backgroundColor: MATCHA }}
            >
              <span>{t("cta.button")}</span>
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <p className="mt-5 text-xs sm:text-sm text-gray-500 leading-relaxed">
              {t("cta.description")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
