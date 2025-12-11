// components/sections/JASNavigationSection.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function JASNavigationSection() {
  const t = useTranslations("jasNavigation");
  const infoItems = [
    t("secondaryInfo.inspection"),
    t("secondaryInfo.qualityAssurance"),
    t("secondaryInfo.traceability"),
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header - モバイル最適化 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-14 lg:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-3 sm:mb-4 md:mb-6 tracking-tight px-2">
            {t("title")}
          </h2>
          <div className="w-12 sm:w-16 h-px bg-gray-400 mx-auto mb-4 sm:mb-6 md:mb-8" />

          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl sm:max-w-3xl mx-auto whitespace-pre-line px-4 sm:px-2">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Main content - モバイル向けスタック配置 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start">
          {/* Left: JAS mark and certification info card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-9 shadow-sm h-full">
              {/* Header section - モバイル向けサイズ調整 */}
              <div className="mb-4 sm:mb-6 md:mb-7">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 tracking-tight leading-tight">
                  {t("certification.title")}
                </h3>
              </div>

              {/* Description - モバイル向けフォントサイズ調整 */}
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-5 sm:mb-7">
                {t("certification.description")}
              </p>
            </div>
          </motion.div>

          {/* Right: Stylish CTA area - モバイル向け調整 */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center h-full"
          >
            <div className="space-y-6 sm:space-y-7">
              {/* Main CTA button - モバイル向けサイズ調整 */}
              <div className="text-center space-y-4 sm:space-y-5">
                <Link
                  href="/jas"
                  className="group inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 bg-green-700 hover:bg-green-800 text-white font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 w-full sm:w-auto max-w-sm"
                  aria-label={t("cta.ariaLabel")}
                >
                  <span className="mr-2">{t("cta.button")}</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                <p className="text-xs sm:text-sm text-gray-600 max-w-xs mx-auto leading-relaxed px-2">
                  {t("cta.description")}
                </p>
              </div>

              {/* Secondary information - モダンなフッターカード */}
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-green-100/80 bg-linear-to-br from-emerald-50 via-white to-emerald-50/60 p-4 sm:p-6 shadow-[0_10px_30px_rgba(16,185,129,0.08)]">
                <h4 className="text-sm sm:text-base font-bold text-green-900 mb-2 sm:mb-3 text-center">
                  {t("secondaryInfo.title")}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 text-center mb-4">
                  運用・監査・記録をひとつながりで管理しています。
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {infoItems.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl bg-white/90 border border-white/70 shadow-[0_6px_20px_rgba(0,0,0,0.04)] backdrop-blur-sm px-3.5 py-3"
                    >
                      <span className="text-sm sm:text-base font-medium text-gray-900 leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
