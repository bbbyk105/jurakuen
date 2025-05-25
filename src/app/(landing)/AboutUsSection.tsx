import React from "react";

const AboutUsSection = () => {
  return (
    <>
      <div className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl text-matcha-dark mb-6 font-light">
            About Us - 聚楽苑
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            富士市境に根ざす自園・自製・自販の小規模茶園として、代々受け継がれてきた茶づくりの心を大切にしています。
            有機JAS認証・完全無農薬栽培へのこだわりは、お客様の健康と地球環境への想いから生まれました。
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-8" data-aos="fade-right">
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-matcha-light rounded-full"></div>
            <div className="h-px bg-kin-gold flex-1"></div>
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md">
              <h3 className="text-matcha-dark font-semibold mb-2">
                1955年 創業
              </h3>
              <p className="text-gray-600">
                富士山麓の恵まれた土地で茶園を開始
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-matcha-light rounded-full"></div>
            <div className="h-px bg-kin-gold flex-1"></div>
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md">
              <h3 className="text-matcha-dark font-semibold mb-2">
                1985年 有機栽培転換
              </h3>
              <p className="text-gray-600">完全無農薬栽培への挑戦を開始</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-matcha-light rounded-full"></div>
            <div className="h-px bg-kin-gold flex-1"></div>
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md">
              <h3 className="text-matcha-dark font-semibold mb-2">
                2010年 有機JAS認証取得
              </h3>
              <p className="text-gray-600">
                品質と安全性の証明として認証を取得
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsSection;
