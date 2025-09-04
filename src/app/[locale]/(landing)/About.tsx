"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

const About = () => {
  const locale = useLocale();

  return (
    <div className="bg-white border-b" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* メインコンテンツセクション */}
        <div className="py-16 sm:py-20 lg:py-24">
          {/* ヘッダー */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <span className="text-sm font-medium text-gray-500 tracking-widest uppercase">
                CONCEPT
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-8 tracking-tight leading-tight">
              {locale === "ja" ? (
                <>
                  おいしいお茶の
                  <br />
                  お福分け
                </>
              ) : (
                <>
                  Sharing the Blessings
                  <br />
                  of Fine Tea
                </>
              )}
            </h2>

            <div className="max-w-3xl mx-auto">
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {locale === "ja" ? (
                  <>
                    お茶は美味しいだけでなく、茶葉に含まれる豊富な栄養素から身体や心に様々な良い効果が期待されています。
                    <br className="hidden sm:block" />
                    聚楽苑は無農薬茶を通して、おいしい福をたくさんの人に届けます。
                  </>
                ) : (
                  <>
                    Tea is not only delicious but also rich in nutrients that
                    provide various benefits for body and mind.
                    <br className="hidden sm:block" />
                    Jurakuen delivers these delicious blessings through our
                    organic tea.
                  </>
                )}
              </p>
            </div>
          </div>

          {/* CTAセクション */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 text-gray-900 font-medium text-lg border-b-2 border-gray-200 pb-2 hover:border-green-600 transition-colors duration-300"
              >
                <span>{locale === "ja" ? "詳しく見る" : "Learn More"}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
