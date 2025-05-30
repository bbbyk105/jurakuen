"use client";
import React, { useEffect } from "react";
import HeroSection from "./(landing)/HeroSection";
import AboutUsSection from "./(landing)/AboutUsSection";
import ProductSection from "./(landing)/ProductSection";
import SustainabilitySection from "./(landing)/SustainabilitySection";
import Footer from "./(landing)/Footer";
import ContactSection from "./(landing)/ContactSection";
import InstagramSection from "./(landing)/InstagramSection";

// AOS初期化カスタムフック
const useAOS = () => {
  useEffect(() => {
    // シンプルなスクロールアニメーション実装
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    // data-aos属性を持つ要素を監視
    document.querySelectorAll("[data-aos]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};

const JurakuEnLanding = () => {
  useAOS();
  return (
    <div className="min-h-screen bg-washi-beige font-sans">
      <style jsx global>{`
        :root {
          --matcha-dark: #2e4b3a;
          --matcha-light: #8fbf6f;
          --washi-beige: #f6f3e9;
          --kin-gold: #bfa75a;
        }

        .bg-matcha-dark {
          background-color: var(--matcha-dark);
        }
        .bg-matcha-light {
          background-color: var(--matcha-light);
        }
        .bg-washi-beige {
          background-color: var(--washi-beige);
        }
        .bg-kin-gold {
          background-color: var(--kin-gold);
        }

        .text-matcha-dark {
          color: var(--matcha-dark);
        }
        .text-matcha-light {
          color: var(--matcha-light);
        }
        .text-kin-gold {
          color: var(--kin-gold);
        }

        .border-matcha-light {
          border-color: var(--matcha-light);
        }
        .border-kin-gold {
          border-color: var(--kin-gold);
        }

        .animate-in {
          animation: fadeInUp 0.8s ease-out-quart forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-right {
          animation: fadeRight 0.8s ease-out-quart forwards;
        }

        @keyframes fadeRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .zoom-in {
          animation: zoomIn 0.8s ease-out-quart forwards;
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>

      <HeroSection />
      <AboutUsSection />
      <ProductSection />
      <SustainabilitySection />
      <InstagramSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default JurakuEnLanding;
