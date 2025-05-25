import React from "react";

const HeroSection = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/assets/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-matcha-dark bg-opacity-40"></div>
      <div className="relative z-10 h-full flex items-center justify-center text-white">
        <div className="text-center" data-aos="fade-up">
          <h1
            className="text-6xl md:text-8xl font-light mb-8 vertical-text md:writing-mode-horizontal leading-tight"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            富士山麓から、
            <br className="md:hidden" />
            有機抹茶の輝きを。
          </h1>
          <p className="text-xl md:text-2xl opacity-90">聚楽苑</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
