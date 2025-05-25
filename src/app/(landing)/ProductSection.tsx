import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Image from "next/image";
import { Button } from "../components/ui/button";

const ProductSection = () => {
  return (
    <>
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl text-matcha-dark mb-6 font-light">
              無農薬抹茶「かがやき」
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              21日間の覆下栽培と石臼挽きによる伝統製法で生まれる、輝く緑とまろやかな甘味
            </p>
          </div>

          {/* 製法の4ステップ */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                step: "01",
                title: "覆下栽培",
                desc: "21日間日光を遮り旨味を凝縮",
              },
              {
                step: "02",
                title: "手摘み収穫",
                desc: "一芽一芽丁寧に選別して収穫",
              },
              {
                step: "03",
                title: "蒸し・乾燥",
                desc: "伝統の蒸し製法で茶葉を加工",
              },
              {
                step: "04",
                title: "石臼挽き",
                desc: "ゆっくりと挽いて粒子を整える",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-shadow duration-300"
                data-aos="fade-right"
              >
                <CardHeader>
                  <div className="text-3xl text-matcha-light font-bold mb-2">
                    {item.step}
                  </div>
                  <CardTitle className="text-matcha-dark">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 使用例 */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "薄茶",
                desc: "伝統的な茶道での楽しみ方",
                image: "/api/placeholder/300/200",
              },
              {
                title: "抹茶ラテ",
                desc: "現代的なカフェスタイル",
                image: "/api/placeholder/300/200",
              },
              {
                title: "和スイーツ",
                desc: "お菓子作りの贅沢な素材",
                image: "/api/placeholder/300/200",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
                data-aos="zoom-in"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-matcha-dark">
                    {item.title}
                  </CardTitle>
                  <p className="text-gray-600">{item.desc}</p>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12" data-aos="fade-up">
            <p className="text-matcha-dark text-lg mb-6">
              品質こそ価値 - 価格はお問い合わせください
            </p>
            <Button className="bg-matcha-light hover:bg-matcha-dark text-white px-8 py-3 rounded-full text-lg">
              お問い合わせ
            </Button>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default ProductSection;
