"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { BackgroundHerring } from "./Helpers";
import { useTranslations, useLocale } from "next-intl";

const Products = () => {
  const tProducts = useTranslations("products");
  const locale = useLocale();

  const productCards = [
    {
      title: tProducts("items.premium_suirin"),
      img: "/images/products/chiyo.webp",
      href: "/products/1",
      badge: locale === "ja" ? "人気No.1" : "Best Seller",
      desc:
        locale === "ja"
          ? "厳選された一番茶のみを使用した最高級茶"
          : "Premium tea using only carefully selected first flush leaves",
    },
    {
      title: tProducts("items.popular_matcha"),
      img: "/images/products/ichiyu.webp",
      href: "/products/2",
      badge: locale === "ja" ? "おすすめ" : "Recommended",
      desc:
        locale === "ja"
          ? "日常使いに最適な、バランスの取れた味わい"
          : "Perfect for daily use with well-balanced flavor",
    },
    {
      title: tProducts("items.matcha_cleansing"),
      img: "/images/products/boucha.webp",
      href: "/products/3",
      badge: locale === "ja" ? "新商品" : "New",
      desc:
        locale === "ja"
          ? "香ばしい風味が特徴の有機棒茶"
          : "Organic twig tea with distinctive roasted aroma",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="products">
      <BackgroundHerring />
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm tracking-[0.3em] text-gray-500 mb-4">
              PRODUCTS
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6">
              {locale === "ja" ? "商品のご紹介" : "Our Products"}
            </h2>
            <div className="w-16 h-px bg-gray-400 mx-auto mb-8" />
            <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
              {tProducts("description")}
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {productCards.map((p, i) => (
            <motion.article
              key={p.href}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group"
            >
              <Link href={p.href} className="block">
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-500">
                  {p.badge && (
                    <span className="absolute top-4 left-4 z-10 bg-kin-gold text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      {p.badge}
                    </span>
                  )}
                  <div className="relative h-72 bg-gradient-to-b from-gray-50 to-gray-100">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-matcha-dark transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {p.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-matcha-dark group-hover:text-matcha-light transition-colors">
                        {tProducts("viewMore")}
                      </span>
                      <ArrowRight className="w-4 h-4 text-matcha-dark group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center space-y-4"
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-3 bg-matcha-dark text-white px-10 py-4 rounded-full overflow-hidden transition-all hover:bg-matcha-medium"
          >
            <span className="font-medium relative z-10">
              {tProducts("viewAll")}
            </span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-matcha-medium to-matcha-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
          <p className="text-sm text-gray-600">
            <Link
              href="/matcha"
              className="text-green-700 hover:text-green-800 hover:underline font-medium"
            >
              {tProducts("matchaLink")}
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
