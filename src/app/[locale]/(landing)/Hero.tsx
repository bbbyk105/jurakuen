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
  const [currentSlide, setCurrentSlide] = useState(0);
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
      image: "/images/hero2.webp",
      alt: t("slides.0.alt"),
    },
    {
      id: 2,
      image: "/images/hero1.webp",
      alt: t("slides.1.alt"),
    },
  ];

  // サブタイトルの存在確認
  const hasSubtitle = () => {
    try {
      t("subtitle");
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#f6f5f0]">
      {/* ------------------------------ 背景スライダー ------------------------------ */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop
          speed={2000}
          className="w-full h-full"
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  quality={95}
                  priority={slide.id === 1}
                />
                {/* オーバーレイ調整 - 108matcha風 */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ------------------------------ メインコンテンツ ------------------------------ */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center px-4">
          {/* メインタイトル - 108matcha風縦書き */}
          <div className={`${locale === "ja" ? "flex justify-center" : ""}`}>
            <h1
              className={`
                font-serif text-white
                ${
                  locale === "ja"
                    ? "text-4xl md:text-6xl font-noto-serif writing-mode-vertical-rl tracking-[0.25em]"
                    : "text-3xl md:text-5xl font-cormorant tracking-widest"
                }
                drop-shadow-strong whitespace-pre-line
                transition-all duration-1000 delay-500
                ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }
              `}
            >
              {t("catchphrase")}
            </h1>
          </div>

          {/* サブタイトル - "おいしいお茶のお福分け"風 */}
          {hasSubtitle() && (
            <div className={`mt-8 ${locale === "ja" ? "" : "mt-6"}`}>
              <p
                className={`
                  text-white/95 font-light drop-shadow-lg
                  ${
                    locale === "ja"
                      ? "text-base md:text-lg font-noto-serif tracking-[0.2em]"
                      : "text-lg md:text-xl font-cormorant italic"
                  }
                  transition-all duration-1000 delay-700
                  ${isLoaded ? "opacity-100" : "opacity-0"}
                `}
              >
                {t("subtitle")}
              </p>

              {/* 装飾ライン */}
              <div
                className="mt-4 w-24 h-px bg-white/40 mx-auto transition-all duration-1000 delay-900"
                style={{
                  width: isLoaded ? "6rem" : "0",
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------ スクロールインジケーター（シンプル版） ------------------------------ */}
      <div
        className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-1000 delay-1500 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center text-white/70">
          <p className="text-xs font-light tracking-[0.4em] mb-3 font-cormorant">
            SCROLL
          </p>
          <div className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </div>

      {/* ------------------------------ スライドインジケーター（右側） ------------------------------ */}
      <div
        className={`hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 z-20 flex-col space-y-3 transition-all duration-1000 delay-1000 ${
          isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
        }`}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group relative w-2 h-8 focus:outline-none"
          >
            <div
              className={`absolute inset-0 bg-white/30 transition-all duration-500 ${
                currentSlide === index ? "bg-white/80" : "hover:bg-white/50"
              }`}
            />
          </button>
        ))}
      </div>

      {/* ------------------------------ 和風パターン（波模様） ------------------------------ */}
      <div className="absolute bottom-0 left-0 w-full h-20 z-10 pointer-events-none">
        <svg
          className="w-full h-full text-white/5"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 Q150,10 300,40 T600,40 T900,40 T1200,40 L1200,100 L0,100 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* ------------------------------ Styles ------------------------------ */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap");

        .font-noto-serif {
          font-family: "Noto Serif JP", serif;
        }
        .font-cormorant {
          font-family: "Cormorant Garamond", serif;
        }

        .writing-mode-vertical-rl {
          writing-mode: vertical-rl;
          text-orientation: upright;
        }

        .drop-shadow-strong {
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5))
            drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .drop-shadow-lg {
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));
        }

        /* モバイル端末では横書き */
        @media (max-width: 768px) {
          .writing-mode-vertical-rl {
            writing-mode: horizontal-tb;
            text-orientation: mixed;
          }
        }
      `}</style>
    </div>
  );
}
