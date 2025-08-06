"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const StoryProducer = () => {
  const tAboutPage = useTranslations("aboutPage");

  return (
    <>
      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-0 grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-64 sm:h-96 lg:h-full order-last lg:order-first"
          >
            <Image
              src="/images/fuji.webp"
              alt={tAboutPage("story.title")}
              fill
              className="object-cover rounded-lg"
            />
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-gray-700 text-sm leading-relaxed"
          >
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
              {tAboutPage("story.title")}
            </h2>
            {[1, 2, 3, 4, 5].map((p) => (
              <p key={p}>{tAboutPage(`story.paragraph${p}`)}</p>
            ))}
          </motion.article>
        </div>
      </section>

      {/* Producer */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 lg:px-0 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-xl md:text-2xl font-light text-gray-900">
              {tAboutPage("producer.title")}
            </h3>
            <blockquote className="text-gray-700 text-sm leading-relaxed space-y-4">
              {[1, 2, 3].map((q) => (
                <p key={q}>「{tAboutPage(`producer.quote${q}`)}」</p>
              ))}
            </blockquote>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                {tAboutPage("producer.signature")}
              </p>
              <p className="text-sm font-medium text-gray-900">
                {tAboutPage("producer.name")}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-80 lg:h-96"
          >
            <Image
              src="/images/producer.webp"
              alt={tAboutPage("producer.name")}
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default StoryProducer;
