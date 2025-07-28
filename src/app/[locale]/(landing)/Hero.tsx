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
      image: "/images/hero1.webp",
      alt: t("slides.0.alt"),
    },
    {
      id: 2,
      image: "/images/hero2.webp",
      alt: t("slides.1.alt"),
    },
  ];

  // サブタイトルの存在確認（オプショナル）
  const hasSubtitle = () => {
    try {
      t("subtitle");
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-stone-50">
      {/* ------------------------------ 背景スライダー ------------------------------ */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
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
                {/* 和風グラデーションオーバーレイ */}
                <div className="absolute inset-0 bg-gradient-to-b from-stone-900/20 via-transparent to-stone-900/40" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ------------------------------ キャッチコピー ------------------------------ */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none">
        <div
          className={`text-center ${
            locale === "ja" ? "writing-container" : ""
          }`}
        >
          <h1
            className={`
              font-serif tracking-widest leading-loose text-white
              ${
                locale === "ja"
                  ? "text-3xl md:text-5xl font-noto-serif writing-mode-vertical"
                  : "text-2xl md:text-4xl font-cormorant"
              }
              drop-shadow-tea whitespace-pre-line
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

          {/* サブテキスト（必要に応じて） */}
          {hasSubtitle() && (
            <p
              className={`
              mt-6 text-white/80 font-light
              ${
                locale === "ja"
                  ? "text-sm md:text-base font-noto-serif"
                  : "text-base md:text-lg font-cormorant italic"
              }
              transition-all duration-1000 delay-700
              ${isLoaded ? "opacity-100" : "opacity-0"}
            `}
            >
              {t("subtitle")}
            </p>
          )}
        </div>
      </div>

      {/* ------------------------------ Animated Scroll Indicator ------------------------------ */}
      <div
        className={`absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-1000 delay-1500 ${
          isLoaded ? "translate-y-0 opacity-60" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center text-white/80">
          {/* 縦線のアニメーション */}
          <div className="relative w-px h-12 md:h-16 bg-white/20 overflow-hidden mb-3">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/60 to-transparent animate-scroll-line" />
          </div>
          <p className="text-xs font-light tracking-[0.3em] font-cormorant">
            SCROLL
          </p>
          <div className="mt-2 w-4 h-4 border border-white/40 rounded-full animate-bounce-slow" />
        </div>
      </div>

      {/* ------------------------------ Slide Progress Indicator with Animation ------------------------------ */}
      <div
        className={`hidden md:block absolute bottom-1/2 right-12 transform translate-y-1/2 z-20 transition-all duration-1000 delay-1800 ${
          isLoaded ? "translate-x-0 opacity-50" : "translate-x-8 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          {slides.map((_, index) => (
            <div key={index} className="relative">
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center transition-all duration-500">
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    currentSlide === index
                      ? "bg-white/80 scale-100"
                      : "bg-white/30 scale-75"
                  }`}
                />
              </div>
              {/* プログレスリング */}
              {currentSlide === index && (
                <svg className="absolute inset-0 w-8 h-8 -rotate-90">
                  <circle
                    cx="16"
                    cy="16"
                    r="15"
                    stroke="rgba(255,255,255,0.6)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="94.2"
                    strokeDashoffset="0"
                    className="animate-progress-ring"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------ 和風の装飾パターン ------------------------------ */}
      <div className="absolute bottom-0 left-0 w-full h-24 z-10 pointer-events-none">
        <svg
          className="w-full h-full text-white/10"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 Q300,20 600,50 T1200,50 L1200,100 L0,100 Z"
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

        .writing-mode-vertical {
          writing-mode: vertical-rl;
          text-orientation: upright;
          letter-spacing: 0.15em;
        }

        .drop-shadow-tea {
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))
            drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2));
        }

        /* スクロールラインアニメーション */
        @keyframes scroll-line {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .animate-scroll-line {
          animation: scroll-line 2s ease-in-out infinite;
        }

        /* ゆっくりとしたバウンス */
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        /* プログレスリングアニメーション */
        @keyframes progress-ring {
          0% {
            stroke-dashoffset: 94.2;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .animate-progress-ring {
          animation: progress-ring 6s linear;
        }

        /* モバイル端末では常に横書き */
        @media (max-width: 768px) {
          .writing-mode-vertical {
            writing-mode: horizontal-tb;
            text-orientation: mixed;
            text-align: center;
            letter-spacing: 0.08em;
          }

          .writing-container {
            max-width: 90%;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}
