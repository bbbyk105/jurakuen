// src/data/locales/ja.ts
import { Product, HeroData } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "翠輪 ― Ceremonial Grade 20 g",
    description: "富士山麓・農薬不使用茶葉を石臼で丁寧に挽いた最高級抹茶",
    price: 50, // AUD
    originalPrice: null,
    category: "高級抹茶",
    image: {
      url: "/images/maccha.jpg",
      alt: "翠輪（すいりん）",
      width: 400,
      height: 400,
    },
    details: {
      brewery: "聚楽苑",
      region: "静岡県富士市",
      taste: "まろやかな旨味と上品な甘み、深い余韻",
      temperature: "70-80 ℃",
      weight: "20 g",
    },
    stock: 50,
    stripeProductId: "prod_matcha_suirin_au",
    stripePriceId: "price_matcha_suirin_aud",
    colorClass: "from-green-700 to-green-800",
  },
  {
    id: 2,
    name: "かがやき 30 g",
    description: "富士市で初めて認定された抹茶",
    price: 35,
    originalPrice: 40,
    category: "抹茶",
    image: {
      url: "/images/cha.jpg",
      alt: "宵の抹茶 30 g",
      width: 400,
      height: 400,
    },
    details: {
      brewery: "聚楽苑",
      region: "静岡県",
      taste: "ほどよい渋みと甘みのバランス",
      temperature: "70-80 ℃",
      weight: "30 g",
    },
    stock: 75,
    stripeProductId: "prod_matcha_yoi_au",
    stripePriceId: "price_matcha_yoi_aud",
    colorClass: "from-green-600 to-green-700",
  },
  {
    id: 3,
    name: "抹茶ラテブレンド 100 g",
    description: "ミルクと相性抜群のブレンド抹茶",
    price: 28,
    originalPrice: null,
    category: "抹茶ブレンド",
    image: {
      url: "/images/cha2.jpg",
      alt: "抹茶ラテブレンド",
      width: 400,
      height: 400,
    },
    details: {
      brewery: "聚楽苑",
      region: "静岡県",
      taste: "コクのある旨味とクリーミーな後味",
      temperature: "80-85 ℃",
      weight: "100 g",
    },
    stock: 100,
    stripeProductId: "prod_matcha_latte_au",
    stripePriceId: "price_matcha_latte_aud",
    colorClass: "from-emerald-500 to-emerald-600",
  },
];

export const heroData: HeroData = {
  title: ["聖なる富士の麓で、", "三百年の時を経て", "磨かれた抹茶。"],
  subtitle: "高級抹茶",
  productName: "翠輪 – SUIRIN CEREMONIAL",
  heroImage: "/images/hero-matcha-bowl.webp",
};

export const categories = ["すべて", "高級抹茶", "抹茶", "抹茶ブレンド"];

export const sortOptions = [
  "おすすめ順",
  "価格の安い順",
  "価格の高い順",
  "新着順",
];
