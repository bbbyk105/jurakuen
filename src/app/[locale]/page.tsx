// ────────────────────────────────────────────────
// File: app/(landing)/page.tsx – Root layout with all sections
// ────────────────────────────────────────────────
"use client";

// Top‑level sections
import Hero from "./(landing)/Hero";
import About from "./(landing)/About";
import StoryProducer from "./(landing)/StoryProducer";
import Video from "./(landing)/Video";
import Safety from "./(landing)/Safety";
import FAQ from "./(landing)/FAQ";
import Products from "./(landing)/Products";
import Contact from "./(landing)/Contact";
import WaveDivider from "./(landing)/WaveDivider";
import FujiHeritage from "./(landing)/FujiHeritage";
import InstagramShowcase from "./(landing)/InstagramShowcase";

const JurakuEnLanding = () => (
  <div className="min-h-screen bg-washi-beige font-sans scroll-smooth">
    {/* Global palette & utility animations */}
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
      /* simple fade‑in util */
      .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
        opacity: 0;
      }
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(24px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}</style>

    {/* Content flow */}
    <Hero />
    <WaveDivider />

    <About />
    <WaveDivider />

    <Products />
    <WaveDivider />

    <FujiHeritage />

    <StoryProducer />
    <InstagramShowcase
      urls={[
        "https://www.instagram.com/p/DNiGDZCRFBE/",
        "https://www.instagram.com/p/DNiFe3yRC94/",
      ]}
    />
    <Video />
    <Safety />
    <FAQ />
    <WaveDivider />
    <Contact />

    {/* Footer */}
    <footer className="text-center py-12 text-xs text-gray-500 bg-white">
      © {new Date().getFullYear()} Jurakuen. All rights reserved.
    </footer>
  </div>
);

export default JurakuEnLanding;
