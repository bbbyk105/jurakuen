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
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("aboutPage");

  const safetyReasons = [
    { key: "organic", Icon: FaSeedling },
    { key: "water", Icon: FaWater },
    { key: "certification", Icon: FaCertificate },
  ];

  const faqItems = [
    { key: "organicJas" },
    { key: "taste" },
    { key: "enjoyment" },
  ];

  return (
    <main className="bg-white">
      {/* ──────────── LONG STORY ──────────── */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 lg:px-0 grid lg:grid-cols-2 gap-12 items-start">
          {/* photo */}
          <div className="relative h-64 sm:h-96 lg:h-full order-last lg:order-first">
            <Image
              src="/images/fuji.webp"
              alt={t("story.title")}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          {/* narrative */}
          <article className="space-y-6 text-gray-700 text-sm leading-relaxed">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
              {t("story.title")}
            </h2>
            <p>{t("story.paragraph1")}</p>
            <p>{t("story.paragraph2")}</p>
            <p>{t("story.paragraph3")}</p>
            <p>{t("story.paragraph4")}</p>
            <p>{t("story.paragraph5")}</p>
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
                {t("producer.title")}
              </h3>
              <blockquote className="text-gray-700 text-sm leading-relaxed space-y-4">
                <p>「{t("producer.quote1")}」</p>
                <p>「{t("producer.quote2")}」</p>
                <p>「{t("producer.quote3")}」</p>
              </blockquote>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {t("producer.signature")}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {t("producer.name")}
                </p>
              </div>
            </div>
            {/* 生産者の写真 */}
            <div className="relative h-80 lg:h-96">
              <Image
                src="/images/producer.webp"
                alt={t("producer.name")}
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
              {t("teaField.title")}
            </h3>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              {t("teaField.description")}
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
              {t("teaField.caption")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-matcha-light/5">
        <div className="max-w-5xl mx-auto px-4 lg:px-0 text-center space-y-10">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900">
            {t("safety.title")}
          </h2>

          {/* ① 横並び用のグリッド／フレックス */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {safetyReasons.map(({ key, Icon }, i) => (
              /* ② 幅指定を外し、中央寄せのみに */
              <div key={i} className="flex flex-col items-center gap-3">
                <Icon className="w-8 h-8 text-matcha-dark" />
                <p className="text-sm leading-relaxed max-w-[12rem] mx-auto">
                  {t(`safety.reasons.${key}`)}
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
            {t("faq.title")}
          </h2>
          <Accordion type="single" collapsible>
            {faqItems.map(({ key }, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>
                  {t(`faq.items.${key}.question`)}
                </AccordionTrigger>
                <AccordionContent>
                  {t(`faq.items.${key}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section className="py-24 text-center">
        <h2 className="text-xl md:text-2xl font-light mb-6">
          {t("cta.title")}
        </h2>
        <Link href="/products">
          <Button variant="default" className="px-8 py-4 text-sm group">
            {t("cta.buttonText")}
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
