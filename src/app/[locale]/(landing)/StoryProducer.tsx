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
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-0 grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-64 md:h-80 lg:h-96 xl:h-full order-last md:order-first"
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
            className="space-y-4 md:space-y-5 lg:space-y-6 text-gray-700 text-sm md:text-base lg:text-sm leading-relaxed"
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-900 mb-3 md:mb-4 lg:mb-4">
              {tAboutPage("story.title")}
            </h2>
            {[1, 2, 3, 4, 5].map((p) => (
              <p key={p}>{tAboutPage(`story.paragraph${p}`)}</p>
            ))}
          </motion.article>
        </div>
      </section>

      {/* Producer */}
      <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-0 grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 md:space-y-5 lg:space-y-6"
          >
            <h3 className="text-lg md:text-xl lg:text-2xl font-light text-gray-900">
              {tAboutPage("producer.title")}
            </h3>
            <blockquote className="text-gray-700 text-sm md:text-base lg:text-sm leading-relaxed space-y-3 md:space-y-4">
              {[1, 2, 3].map((q) => (
                <p key={q}>「{tAboutPage(`producer.quote${q}`)}」</p>
              ))}
            </blockquote>
            <div className="text-right pt-3 md:pt-4 lg:pt-4 mt-2 md:mt-3 lg:mt-4">
              <p className="text-xs md:text-sm text-gray-600">
                {tAboutPage("producer.signature")}
              </p>
              <p className="text-sm md:text-base lg:text-sm font-medium text-gray-900">
                {tAboutPage("producer.name")}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-64 md:h-80 lg:h-96"
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
