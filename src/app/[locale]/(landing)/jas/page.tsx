"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Leaf,
  Shield,
  Heart,
  Globe,
  CheckCircle2,
  Award,
  Star,
} from "lucide-react";

export default function JASPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // next-intlを使用して翻訳データを取得
  const t = useTranslations("jas");

  const certificationFeatures = [
    {
      icon: Shield,
      titleKey: "features.safety.title",
      descriptionKey: "features.safety.description",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Leaf,
      titleKey: "features.environment.title",
      descriptionKey: "features.environment.description",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: Heart,
      titleKey: "features.health.title",
      descriptionKey: "features.health.description",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      icon: Globe,
      titleKey: "features.sustainability.title",
      descriptionKey: "features.sustainability.description",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ];

  const certificationStandards = [
    {
      titleKey: "standards.noChemicals.title",
      descriptionKey: "standards.noChemicals.description",
    },
    {
      titleKey: "standards.organicFertilizer.title",
      descriptionKey: "standards.organicFertilizer.description",
    },
    {
      titleKey: "standards.soilManagement.title",
      descriptionKey: "standards.soilManagement.description",
    },
    {
      titleKey: "standards.traceability.title",
      descriptionKey: "standards.traceability.description",
    },
  ];

  const benefits = [
    {
      titleKey: "benefits.taste.title",
      descriptionKey: "benefits.taste.description",
      icon: Star,
    },
    {
      titleKey: "benefits.nutrition.title",
      descriptionKey: "benefits.nutrition.description",
      icon: Heart,
    },
    {
      titleKey: "benefits.safety.title",
      descriptionKey: "benefits.safety.description",
      icon: Shield,
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* ===== メインヒーローセクション ===== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 背景画像 */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/chaba.webp"
            alt="有機栽培茶園"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* コンテンツ */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-green-400 mr-3" />
              <p className="text-sm tracking-widest uppercase mb-4 opacity-90">
                {t("hero.subtitle")}
              </p>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight whitespace-pre-line">
              {t("hero.title")}
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="h-px bg-white mx-auto mb-8"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed opacity-90 whitespace-pre-line"
            >
              {t("hero.description")}
            </motion.p>
          </motion.div>
        </div>

        {/* スクロールインジケーター */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center space-y-2 cursor-pointer hover:opacity-80 transition-opacity">
            <span className="text-xs tracking-wider opacity-70 text-white">
              {t("hero.scroll")}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-8 bg-white opacity-70"
            />
          </div>
        </motion.div>
      </section>

      {/* ===== 有機JAS認証とは ===== */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mr-4">
                    <Leaf className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-light text-gray-900">
                      {t("about.title")}
                    </h2>
                    <p className="text-green-600 font-medium">
                      {t("about.subtitle")}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
                  {t("about.description")}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                  {t("about.verified")}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/tezumi.webp"
                  alt="有機栽培茶葉の手摘み"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-sm opacity-90 mb-1">
                    {t("about.imageCaption")}
                  </p>
                  <p className="text-lg font-medium">
                    {t("about.imageCaptionDetail")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 4つの特徴 ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              {t("features.title")}
            </h2>
            <div className="w-24 h-px bg-gray-300 mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("features.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certificationFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div
                    className={`w-20 h-20 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow duration-300`}
                  >
                    <Icon className={`w-10 h-10 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(feature.descriptionKey)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 認証基準詳細 ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              {t("standards.title")}
            </h2>
            <div className="w-24 h-px bg-gray-300 mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("standards.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {certificationStandards.map((standard, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 mb-3">
                        {t(standard.titleKey)}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {t(standard.descriptionKey)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/cover.webp"
                  alt="有機栽培の茶畑管理"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/steam.jpg"
                  alt="有機茶葉の加工"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 有機茶の魅力 ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              {t("benefits.title")}
            </h2>
            <div className="w-24 h-px bg-gray-300 mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("benefits.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">
                    {t(benefit.titleKey)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(benefit.descriptionKey)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
