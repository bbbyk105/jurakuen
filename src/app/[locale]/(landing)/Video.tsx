"use client";
import React from "react";
import { useTranslations } from "next-intl";

const Video = () => {
  const tAboutPage = useTranslations("aboutPage");

  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-4 lg:px-0 text-center">
        <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-4">
          {tAboutPage("teaField.title")}
        </h3>
        <p className="text-gray-600 text-sm max-w-2xl mx-auto mb-8">
          {tAboutPage("teaField.description")}
        </p>
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            loop
          >
            <source src="/videos/tea_field.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
        <p className="text-sm text-gray-600 italic mt-6">
          {tAboutPage("teaField.caption")}
        </p>
      </div>
    </section>
  );
};

export default Video;
