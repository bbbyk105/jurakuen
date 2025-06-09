import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

/**
 * About – Manufacturing‑focused layout for 無農薬抹茶「かがやき」
 * ----------------------------------------------------------------
 * ・製法（4 STEP）を主役に据え、カード+写真で強調
 * ・ヒーローコピーも “製法” を前面に出したキャッチに変更
 * ・既存テキストや工程データは保持（uses セクションは省略）
 * ・`.vertical-rl` ユーティリティはそのまま利用
 */
const About = () => {
  /** ──────────────  DATA  ────────────── */
  const steps = [
    {
      step: "01",
      title: "覆下栽培",
      desc: "21日間日光を遮り旨味を凝縮",
      img: "/images/hatake.jpg",
    },
    {
      step: "02",
      title: "手摘み収穫",
      desc: "一芽一芽丁寧に選別して収穫",
      img: "/images/tedumi.jpg",
    },
    {
      step: "03",
      title: "蒸し・乾燥",
      desc: "伝統の蒸し製法で茶葉を加工",
      img: "/images/mushi.jpg",
    },
    {
      step: "04",
      title: "石臼挽き",
      desc: "ゆっくりと挽いて粒子を整える",
      img: "/images/usu.jpg",
    },
  ];

  /** ─────────────────────────── VIEW ─────────────────────────── */
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* SECTION HEADER */}
      <header className="max-w-7xl mx-auto px-4 lg:px-8">
        <h2 className="text-base tracking-wide uppercase mb-4 text-gray-900">
          About
        </h2>
        <hr className="border-t border-gray-200" />
      </header>

      {/* HERO COPY – 製法キャッチ */}
      <div className="max-w-5xl mx-auto px-4 lg:px-0 mt-20 text-center space-y-6 relative">
        {/* 左端縦書きラベル */}
        <p className="vertical-rl absolute -left-6 top-0 text-xs tracking-widest text-gray-500 select-none">
          無農薬抹茶
        </p>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-gray-900 whitespace-pre-line">
          {`完全無農薬で栽培した最高峰の抹茶`}
        </h3>
        <p className="max-w-2xl mx-auto text-sm text-gray-700 leading-relaxed">
          21日間の覆下栽培から石臼挽きまで —
          富士山麓で磨き上げられるその工程こそが
          <br />
          鮮烈な緑、まろやかな甘味、そして安心安全を支えています。
        </p>
      </div>

      {/* 4 STEP GRID */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {steps.map(({ step, title, desc, img }, idx) => (
          <Card
            key={idx}
            className="overflow-hidden group hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-56">
              <Image
                src={img}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <CardHeader className="p-6">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold text-matcha-light">
                  {step}
                </span>
                <CardTitle className="text-lg text-matcha-dark">
                  {title}
                </CardTitle>
              </div>
              <CardContent className="p-0 mt-4">
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-24 text-center">
        <Button
          variant="outline"
          className="group border-gray-400 px-8 py-3 rounded text-sm font-normal"
        >
          もっと詳しく
          <ArrowRight
            size={16}
            className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Button>
      </div>
    </section>
  );
};

export default About;
