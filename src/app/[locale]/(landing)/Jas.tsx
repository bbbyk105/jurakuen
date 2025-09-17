// components/sections/JASNavigationSection.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function JASNavigationSection() {
  const t = useTranslations("jasNavigation");

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-gradient-to-b from-gray-50 via-white to-green-50/20 relative overflow-hidden">
      {/* Background decorations with professional patterns */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* Subtle decorative elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-green-100/30 to-emerald-50/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-tl from-green-50/40 to-emerald-100/30 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header - モバイル最適化 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24"
        >
          {/* Official certification badge - モバイル向けサイズ調整 */}
          <div className="inline-flex items-center justify-center mb-6 sm:mb-8 md:mb-10">
            <div className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4">
              <div className="flex items-center">
                <div className="relative w-8 h-5 sm:w-10 sm:h-6 md:w-12 md:h-7 mr-2 sm:mr-3 md:mr-4">
                  <Image
                    src="/images/jas.webp"
                    alt={t("certification.title")}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="text-xs sm:text-sm md:text-base text-green-700 font-bold tracking-wide sm:tracking-widest uppercase">
                  {t("badge")}
                </span>
              </div>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-3 sm:mb-4 md:mb-6 tracking-tight px-2">
            {t("title")}
          </h2>
          <div className="w-12 sm:w-16 h-px bg-gray-400 mx-auto mb-4 sm:mb-6 md:mb-8" />

          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl sm:max-w-3xl mx-auto whitespace-pre-line px-4 sm:px-2">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Main content - モバイル向けスタック配置 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left: JAS mark and certification info card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white border border-gray-100 sm:border-2 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
              {/* Header section - モバイル向けサイズ調整 */}
              <div className="flex items-center mb-4 sm:mb-6 md:mb-8">
                <div className="relative w-14 h-8 sm:w-16 sm:h-10 md:w-20 md:h-12 lg:w-24 lg:h-14 mr-3 sm:mr-4 md:mr-6 p-1 sm:p-2 bg-green-50 rounded-lg sm:rounded-xl border border-green-100">
                  <Image
                    src="/images/jas.webp"
                    alt={t("certification.title")}
                    fill
                    className="object-contain p-0.5 sm:p-1"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 tracking-tight leading-tight">
                    {t("certification.title")}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-green-600 font-semibold tracking-wide uppercase">
                    {t("certification.subtitle")}
                  </p>
                </div>
              </div>

              {/* Description - モバイル向けフォントサイズ調整 */}
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8">
                {t("certification.description")}
              </p>

              {/* Trust indicators - モバイル向けレイアウト調整 */}
              <div className="mt-auto pt-4 sm:pt-6 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-2" />
                    <span className="font-medium text-center sm:text-left">
                      {t("trustIndicators.maffApproved")}
                    </span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-gray-300" />
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-2" />
                    <span className="font-medium text-center sm:text-left">
                      {t("trustIndicators.continuousAudit")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Stylish CTA area - モバイル向け調整 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center h-full"
          >
            <div className="space-y-6 sm:space-y-8">
              {/* Main CTA button - モバイル向けサイズ調整 */}
              <div className="text-center space-y-4 sm:space-y-6">
                <Link
                  href="/jas"
                  className="group inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 w-full sm:w-auto max-w-sm"
                  aria-label={t("cta.ariaLabel")}
                >
                  <span className="mr-2">{t("cta.button")}</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1 flex-shrink-0"
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

              {/* Secondary information - モバイル向け調整 */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50/50 border border-green-100 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h4 className="text-sm sm:text-base font-bold text-green-800 mb-3 sm:mb-4 text-center">
                  {t("secondaryInfo.title")}
                </h4>
                <div className="grid grid-cols-1 gap-2 sm:gap-3 text-xs sm:text-sm text-green-700">
                  <div className="flex items-start sm:items-center">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 sm:mt-0 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="leading-relaxed">
                      {t("secondaryInfo.inspection")}
                    </span>
                  </div>
                  <div className="flex items-start sm:items-center">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 sm:mt-0 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="leading-relaxed">
                      {t("secondaryInfo.qualityAssurance")}
                    </span>
                  </div>
                  <div className="flex items-start sm:items-center">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 sm:mt-0 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="leading-relaxed">
                      {t("secondaryInfo.traceability")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
