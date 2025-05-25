import React from "react";

const Footer = () => {
  return (
    <footer className="bg-matcha-dark text-white py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h3
          className="text-2xl font-light mb-4"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          聚楽苑
        </h3>
        <p className="text-gray-300 mb-6">富士山麓から、有機抹茶の輝きを。</p>
        <div className="border-t border-gray-600 pt-6">
          <p className="text-gray-400 text-sm">
            © 2024 聚楽苑. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
