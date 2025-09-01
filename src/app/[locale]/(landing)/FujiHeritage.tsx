"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const FujiHeritage = () => {
  const tAboutPage = useTranslations("aboutPage");

  return (
    <>
      {/* Sacred Mountain Heritage */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-0 grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 md:space-y-5 lg:space-y-6"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 leading-tight">
              {tAboutPage("heritage.title")}
            </h2>
            <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base lg:text-sm leading-relaxed">
              <p>{tAboutPage("heritage.paragraph1")}</p>
              <p>{tAboutPage("heritage.paragraph2")}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-64 md:h-80 lg:h-96"
          >
            <Image
              src="/images/fuji/fuji.webp"
              alt={tAboutPage("heritage.title")}
              fill
              className="object-cover rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Natural Elements */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16 lg:mb-20"
          >
            <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-900 mb-4 md:mb-6">
              {tAboutPage("elements.title")}
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {["water", "soil", "climate"].map((element, index) => (
              <motion.div
                key={element}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center space-y-3 md:space-y-4"
              >
                <div className="relative h-32 md:h-40 lg:h-48 mb-4">
                  <Image
                    src={`/images/fuji/${element}.webp`}
                    alt={tAboutPage(`elements.${element}.title`)}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h4 className="text-lg md:text-xl font-medium text-gray-900">
                  {tAboutPage(`elements.${element}.title`)}
                </h4>
                <p className="text-gray-700 text-sm md:text-base lg:text-sm leading-relaxed">
                  {tAboutPage(`elements.${element}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sacred Blessing with Logo */}
      <section className="py-16 md:py-20 lg:py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-0 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8"
          >
            <h3 className="text-xl md:text-2xl lg:text-3xl font-light leading-tight">
              {tAboutPage("blessing.title")}
            </h3>
            <blockquote className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-gray-200 italic">
              「{tAboutPage("blessing.quote")}」
            </blockquote>

            {/* Logo Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="py-8 md:py-12"
            >
              <div className="relative w-64 md:w-80 lg:w-96 h-20 md:h-24 lg:h-28 mx-auto">
                <Image
                  src="/images/logos/logo_horizontal.png"
                  alt="聚楽苑"
                  fill
                  className="object-contain filter brightness-0 invert"
                />
              </div>
            </motion.div>

            <div className="pt-4 md:pt-6">
              <div className="w-16 h-0.5 bg-white mx-auto opacity-60"></div>
            </div>
          </motion.div>
        </div>

        {/* Background Logo Watermark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.03 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-full h-full max-w-2xl">
            <Image
              src="/images/logos/logo_horizontal.png"
              alt=""
              fill
              className="object-contain filter brightness-0 invert"
            />
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default FujiHeritage;
