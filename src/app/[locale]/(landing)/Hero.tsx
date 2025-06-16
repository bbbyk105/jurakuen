"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-fade";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const t = useTranslations("hero");
  const locale = useLocale();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // スライド用の画像データ
  const slides = [
    {
      id: 1,
      image: "/images/hero1.webp",
      alt: t("slides.0.alt"),
    },
    {
      id: 2,
      image: "/images/cha2.jpg",
      alt: t("slides.1.alt"),
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ------------------------------ 背景スライダー ------------------------------ */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop
          speed={1500}
          className="w-full h-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  quality={90}
                  priority={slide.id === 1}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ------------------------------ キャッチコピー ------------------------------ */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none">
        {/* 日本語: 縦書き / 英語: 横書き / SP: 横書き */}
        <h1
          className={`font-light tracking-wider leading-relaxed text-white text-2xl md:text-4xl drop-shadow-md whitespace-pre-line ${
            locale === "ja" ? "writing-mode-vertical" : "text-center"
          }`}
        >
          {t("catchphrase")}
        </h1>
      </div>

      {/* ------------------------------ Scroll Indicator ------------------------------ */}
      <div
        className={`absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-1000 delay-1500 ${
          isLoaded ? "translate-y-0 opacity-70" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center text-white animate-bounce">
          <div className="w-0.5 h-8 md:h-12 bg-gradient-to-b from-white to-transparent mb-2" />
          <p className="text-xs tracking-wider rotate-90 origin-center translate-y-3 md:translate-y-4">
            SCROLL
          </p>
        </div>
      </div>

      {/* ------------------------------ Slide Progress Indicator (Desktop) ------------------------------ */}
      <div
        className={`hidden md:block absolute bottom-20 right-8 z-20 transition-all duration-1000 delay-1800 ${
          isLoaded ? "translate-x-0 opacity-50" : "translate-x-8 opacity-0"
        }`}
      >
        <div className="flex flex-col space-y-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className="w-0.5 h-8 bg-white/30 rounded-full overflow-hidden"
            >
              <div
                className="w-full bg-white/80 rounded-full transition-all duration-[4000ms] ease-linear"
                style={{
                  animation: `slideProgress 16s infinite ${index * 4}s`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------ Styles ------------------------------ */}
      <style jsx>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          text-orientation: upright;
        }

        @keyframes slideProgress {
          0%,
          25% {
            transform: translateY(100%);
          }
          25%,
          100% {
            transform: translateY(0%);
          }
        }

        /* モバイル端末では常に横書き */
        @media (max-width: 768px) {
          .writing-mode-vertical {
            writing-mode: horizontal-tb;
            text-orientation: mixed;
            line-height: 1.6;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
