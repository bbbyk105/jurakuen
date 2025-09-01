"use client";
import React from "react";
import { motion } from "framer-motion";
import { Leaf, Award, Heart, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import { BlobDecor } from "./Helpers";
import { Link } from "@/i18n/routing";

const About = () => {
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

        {/* Button centered */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 bg-matcha-dark text-white px-10 py-4 rounded-full overflow-hidden transition-all hover:bg-matcha-medium"
            >
              <span className="font-medium relative z-10">View details</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-matcha-medium to-matcha-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
