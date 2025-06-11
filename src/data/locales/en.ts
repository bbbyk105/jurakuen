// src/data/locales/en.ts
import { Product, HeroData } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "Suirin — Ceremonial Grade 20 g",
    description:
      "Our highest‑grade matcha, stone‑milled from pesticide‑free tea leaves grown at the foot of Mt. Fuji.",
    price: 50, // AUD
    originalPrice: null,
    category: "Ceremonial Matcha",
    image: {
      url: "/images/maccha.jpg",
      alt: "Suirin Ceremonial Matcha",
      width: 400,
      height: 400,
    },
    details: {
      brewery: "Jurakuen",
      region: "Fuji, Shizuoka Prefecture",
      taste: "Smooth umami with an elegant sweetness and long finish",
      temperature: "70‑80 ℃",
      weight: "20 g",
    },
    stock: 50,
    stripeProductId: "prod_matcha_suirin_en",
    stripePriceId: "price_matcha_suirin_aud",
    colorClass: "from-green-700 to-green-800",
  },
  {
    id: 2,
    name: "Kagayaki 30 g",
    description: "The first matcha in Fuji City to earn official designation.",
    price: 35,
    originalPrice: 40,
    category: "Matcha",
    image: {
      url: "/images/cha.jpg",
      alt: "Kagayaki Matcha 30 g",
      width: 400,
      height: 400,
    },
    details: {
      brewery: "Jurakuen",
      region: "Shizuoka Prefecture",
      taste: "Well‑balanced mild bitterness and sweetness",
      temperature: "70‑80 ℃",
      weight: "30 g",
    },
    stock: 75,
    stripeProductId: "prod_matcha_kagayaki_en",
    stripePriceId: "price_matcha_kagayaki_aud",
    colorClass: "from-green-600 to-green-700",
  },
  {
    id: 3,
    name: "Matcha Latte Blend 100 g",
    description: "A blend formulated to pair perfectly with milk.",
    price: 28,
    originalPrice: null,
    category: "Matcha Blend",
    image: {
      url: "/images/cha2.jpg",
      alt: "Matcha Latte Blend",
      width: 400,
      height: 400,
    },
    details: {
      brewery: "Jurakuen",
      region: "Shizuoka Prefecture",
      taste: "Rich umami with a creamy finish",
      temperature: "80‑85 ℃",
      weight: "100 g",
    },
    stock: 100,
    stripeProductId: "prod_matcha_latte_en",
    stripePriceId: "price_matcha_latte_aud",
    colorClass: "from-emerald-500 to-emerald-600",
  },
];

export const heroData: HeroData = {
  title: [
    "At the sacred foot of Mt. Fuji,",
    "refined over three centuries,",
    "matcha perfected.",
  ],
  subtitle: "Premium Matcha",
  productName: "Suirin — Ceremonial Grade",
  heroImage: "/images/hero-matcha-bowl.webp",
};

export const categories = [
  "All",
  "Ceremonial Matcha",
  "Matcha",
  "Matcha Blend",
];

export const sortOptions = [
  "Recommended",
  "Price: Low to High",
  "Price: High to Low",
  "Newest",
];
