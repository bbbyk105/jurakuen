import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/routing";

/**
 * About – Manufacturing‑focused layout for 無農薬抹茶「かがやき」
 * ----------------------------------------------------------------
 * ・モバイルでは横スクロール（スナップ付き）
 * ・タブレット以上では 2 → 4 カラムに展開
 * ・"無農薬抹茶" ラベルをモバイルでは横書き、SM 以上で縦書きに切替
 */
const About = () => {
  const t = useTranslations("about");

  /** ──────────────  DATA  ────────────── */
  const steps = [
    {
      step: t("steps.0.step"),
      title: t("steps.0.title"),
      desc: t("steps.0.desc"),
      alt: t("steps.0.alt"),
      img: "/images/cover.webp",
    },
    {
      step: t("steps.1.step"),
      title: t("steps.1.title"),
      desc: t("steps.1.desc"),
      alt: t("steps.1.alt"),
      img: "/images/tezumi.webp",
    },
    {
      step: t("steps.2.step"),
      title: t("steps.2.title"),
      desc: t("steps.2.desc"),
      alt: t("steps.2.alt"),
      img: "/images/mushi.jpg",
    },
    {
      step: t("steps.3.step"),
      title: t("steps.3.title"),
      desc: t("steps.3.desc"),
      alt: t("steps.3.alt"),
      img: "/images/usu.jpg",
    },
  ];

  /** ─────────────────────────── VIEW ─────────────────────────── */
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* SECTION HEADER */}
      <header className="max-w-7xl mx-auto px-4 lg:px-8">
        <h2 className="text-base tracking-wide uppercase mb-4 text-gray-900">
          {t("sectionTitle")}
        </h2>
        <hr className="border-t border-gray-200" />
      </header>

      {/* HERO COPY – 製法キャッチ */}
      <div className="max-w-5xl mx-auto px-4 lg:px-0 mt-20 text-center space-y-6 relative">
        {/* ラベル – 常に横書き */}
        <p className="text-xs tracking-widest text-gray-500">{t("label")}</p>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-gray-900 whitespace-pre-line">
          {t("heroTitle")}
        </h3>
        <p className="max-w-2xl mx-auto text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {t("heroDescription")}
        </p>
      </div>

      {/* 4 STEP – モバイルは横スクロール */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-24">
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth lg:grid lg:grid-cols-4 lg:gap-10">
          {steps.map(({ step, title, desc, alt, img }, idx) => (
            <Card
              key={idx}
              className="min-w-[75%] sm:min-w-[60%] md:min-w-[45%] lg:min-w-0 shrink-0 snap-start overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-56">
                <Image
                  src={img}
                  alt={alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardHeader className="p-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold text-matcha-light">
                    {step}
                  </span>
                  <CardTitle className="text-lg text-matcha-dark">
                    {title}
                  </CardTitle>
                </div>
                <CardContent className="p-0 mt-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {desc}
                  </p>
                </CardContent>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-24 text-center">
        <Link href={"/about"}>
          <Button
            variant="outline"
            className="group border-gray-400 px-8 py-3 rounded text-sm font-normal"
          >
            {t("cta")}
            <ArrowRight
              size={16}
              className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Button>
        </Link>
      </div>

      {/* CSS for vertical writing */}
      <style jsx>{`
        .vertical-rl {
          writing-mode: vertical-rl;
          text-orientation: upright;
        }
      `}</style>
    </section>
  );
};

export default About;
