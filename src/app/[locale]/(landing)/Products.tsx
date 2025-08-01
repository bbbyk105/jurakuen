"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

/**
 * Products – 商品／トピック一覧セクション
 * -------------------------------------------
 * ・左カラム: 見出し / 説明 / 一覧リンク
 * ・右カラム: カード 1〜3 列グリッド (レスポンシブ)
 * ・Framer Motion でフェード & スライドイン
 * ・Tailwind CSS ユーティリティ
 */

const Products = () => {
  const t = useTranslations("products");

  const products = [
    {
      title: t("items.premium_suirin"),
      image: "/images/products/chiyo.webp",
      href: "/products/1",
    },
    {
      title: t("items.popular_matcha"),
      image: "/images/products/ichiyu.webp",
      href: "/products/2",
    },
    {
      title: t("items.matcha_cleansing"),
      image: "/images/products/boucha.webp",
      href: "/products/3",
    },
  ] as const;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4 flex flex-col gap-12 lg:flex-row lg:gap-20">
        {/* Left column – heading / description / CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-1/3"
        >
          <h2 className="mb-6 text-4xl font-light tracking-wide text-gray-900 md:text-5xl">
            Products
          </h2>
          <p className="mb-8 max-w-sm leading-relaxed text-gray-600">
            {t("description")}
          </p>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 border border-gray-900 px-5 py-2 text-sm font-medium transition-colors hover:bg-gray-900 hover:text-white"
          >
            {t("viewAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Right column – cards */}
        <div className="flex-1">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((topic, i) => (
              <motion.article
                key={topic.href}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
                className="group"
              >
                <Link
                  href={topic.href}
                  className="relative block h-80 overflow-hidden rounded-lg"
                >
                  <Image
                    src={topic.image}
                    alt={topic.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                <h3 className="mt-2 line-clamp-2 text-lg font-medium leading-relaxed text-gray-900">
                  {topic.title}
                </h3>

                <Link
                  href={topic.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gray-900 hover:underline"
                >
                  {t("viewMore")} <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
