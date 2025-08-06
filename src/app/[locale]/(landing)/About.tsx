"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, Award, Heart } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { BlobDecor } from "./Helpers";

const About = () => {
  const tAbout = useTranslations("about");
  const locale = useLocale();

  const commitments = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: locale === "ja" ? "オーガニック茶葉" : "Organic Tea Leaves",
      desc:
        locale === "ja"
          ? "すべてのお茶にオーガニック茶葉を使用しています。"
          : "All our teas use certified organic tea leaves.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: locale === "ja" ? "安心・安全" : "Safe & Secure",
      desc:
        locale === "ja"
          ? "茶葉を丸ごと食すので、安心・安全を考えて生産が難しい希少なオーガニックにこだわります。"
          : "Since tea leaves are consumed whole, we insist on rare organic cultivation for safety and peace of mind.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: locale === "ja" ? "栽培へのこだわり" : "Cultivation Excellence",
      desc:
        locale === "ja"
          ? "周囲とは隔離された大自然の中で栽培をおこなうことで他の畑で使用された農薬等が風に吹かれて混じってしまうことを防いでいます。"
          : "Cultivation in isolated natural environments prevents contamination from pesticides used in neighboring fields.",
    },
  ];

  const manufSteps = [
    {
      step: tAbout("steps.0.step"),
      title: tAbout("steps.0.title"),
      desc: tAbout("steps.0.desc"),
      img: "/images/cover.webp",
    },
    {
      step: tAbout("steps.1.step"),
      title: tAbout("steps.1.title"),
      desc: tAbout("steps.1.desc"),
      img: "/images/tezumi.webp",
    },
    {
      step: tAbout("steps.2.step"),
      title: tAbout("steps.2.title"),
      desc: tAbout("steps.2.desc"),
      img: "/images/mushi.jpg",
    },
    {
      step: tAbout("steps.3.step"),
      title: tAbout("steps.3.title"),
      desc: tAbout("steps.3.desc"),
      img: "/images/usu.jpg",
    },
  ];

  return (
    <section className="py-24 bg-[#f6f5f0] relative overflow-hidden" id="about">
      <BlobDecor pos="top-0 right-0" />
      <BlobDecor pos="bottom-0 left-0" />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Concept */}
        <header className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] text-gray-500 mb-4">CONCEPT</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-8">
            {locale === "ja"
              ? "おいしいお茶のお福分け"
              : "Sharing the Blessings of Fine Tea"}
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
            {locale === "ja" ? (
              <>
                抹茶は美味しいだけでなく、茶葉に含まれる豊富な栄養素から
                <br className="hidden md:block" />
                身体や心に様々な良い効果が期待されています。
                <br className="hidden md:block" />
                聚楽苑は無農薬茶を通して、おいしい福をたくさんの人に届けます。
              </>
            ) : (
              <>
                Tea is not only delicious but also rich in nutrients that
                provide various benefits for body and mind.
                <br className="hidden md:block" />
                Jurakuen delivers these delicious blessings through our organic
                tea.
              </>
            )}
          </p>
        </header>

        {/* Commitments */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {commitments.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 h-full">
                <div className="text-green-600 mb-4 flex justify-center">
                  {c.icon}
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  {c.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Manufacturing Steps */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:overflow-visible md:snap-none">
          {manufSteps.map((s, i) => (
            <motion.div
              key={i}
              className="group flex-shrink-0 w-72 snap-start md:w-auto md:flex-shrink-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute top-4 left-4 text-white text-2xl font-bold drop-shadow-lg">
                    {s.step}
                  </span>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-3">
                    {s.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
