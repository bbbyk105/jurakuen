"use client";
import React from "react";
import { FaSeedling, FaWater, FaCertificate } from "react-icons/fa";
import { useTranslations } from "next-intl";

const Safety = () => {
  const tAboutPage = useTranslations("aboutPage");
  const items = [
    { key: "organic", Icon: FaSeedling },
    { key: "water", Icon: FaWater },
    { key: "certification", Icon: FaCertificate },
  ];

  return (
    <section className="py-24 bg-matcha-light/10">
      <div className="max-w-5xl mx-auto px-4 lg:px-0 text-center space-y-10">
        <h2 className="text-2xl md:text-3xl font-light text-gray-900">
          {tAboutPage("safety.title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {items.map(({ key, Icon }, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <Icon className="w-8 h-8 text-matcha-dark" />
              <p className="text-sm leading-relaxed max-w-[12rem] mx-auto">
                {tAboutPage(`safety.reasons.${key}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Safety;
