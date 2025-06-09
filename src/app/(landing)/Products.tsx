"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

/**
 * TopicsSection – トピック一覧コンポーネント
 * -------------------------------------------
 * ・左カラムに見出し + 説明 + 全件ボタン
 * ・右カラムにカードを 1〜3 列グリッドで表示
 * ・Framer-motion でふわっとフェード & スライドイン
 * ・Tailwind CSS ユーティリティ
 * ・モバイルでは縦積み / LG 以上で横並び
 */

const topics = [
  {
    title: "最高級品種の翠輪",
    image: "/images/cha.jpg",
    href: "/topics/summer-set",
  },
  {
    title: "大人気のリーズナブルな抹茶「かがやき」再入荷",
    image: "/images/cha2.jpg",
    href: "/topics/uv-cream",
  },
  {
    title: "大人の艶肌をケアする抹茶クレンジングが登場",
    image: "/images/maccha.jpg",

    href: "/topics/cleansing",
  },
] as const;

const Products = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4 flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Left column – heading / description / CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-1/3"
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-wide mb-6 text-gray-900">
            Products
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8 max-w-sm">
            聚楽苑の新商品・限定商品の掲載情報はこちら。
          </p>

          <a
            href="/topics"
            className="inline-flex items-center gap-2 border border-gray-900 px-5 py-2 text-sm font-medium transition-colors hover:bg-gray-900 hover:text-white"
          >
            View All <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Right column – cards */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {topics.map((t, i) => (
              <motion.article
                key={t.href}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
                className="group"
              >
                <a
                  href={t.href}
                  className="block overflow-hidden rounded-lg relative h-80"
                >
                  <Image
                    src={t.image}
                    alt={t.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </a>

                <h3 className="mt-2 text-lg font-medium text-gray-900 leading-relaxed line-clamp-2">
                  {t.title}
                </h3>

                <a
                  href={t.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gray-900 hover:underline"
                >
                  View More <ArrowRight className="h-4 w-4" />
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
