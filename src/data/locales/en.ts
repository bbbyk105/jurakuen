// src/data/locales/en.ts - English Tea Data (USD)
import { Product, HeroData } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "Organic Premium Sencha - Chiyo no Tomo",
    description:
      "Made from tender new buds grown under sunlight, processed with medium-deep steaming. Lightly roasted to preserve the tea's natural aroma, sweetness, and astringency. Cultivated organically for safe and secure enjoyment.",
    price: 32, // USD
    originalPrice: null,
    category: "Sencha",
    image: {
      url: "/images/products/chiyo.webp",
      alt: "Organic Premium Sencha - Chiyo no Tomo",
      width: 400,
      height: 400,
    },
    details: {
      weight: "100g",
      origin: "Fuji City, Shizuoka Prefecture",
      harvestSeason: "First flush",
    },
    stripeProductId: "prod_organic_sencha_chiyo_us",
    stripePriceId: "price_organic_sencha_chiyo_usd",
    colorClass: "from-green-600 to-green-700",
  },
  {
    id: 2,
    name: "Organic Sencha - Ichie no Tomo",
    description:
      "Made from mature first flush leaves, processed with medium-deep steaming and strong roasting to create a fragrant aroma and sweet, easy-to-drink tea.",
    price: 50,
    originalPrice: null,
    category: "Sencha",
    image: {
      url: "/images/products/ichiyu.webp",
      alt: "Organic Sencha - Ichie no Tomo",
      width: 400,
      height: 400,
    },
    details: {
      weight: "20g",
      origin: "Fuji City, Shizuoka Prefecture",
      harvestSeason: "First flush",
    },
    stripeProductId: "prod_organic_sencha_ichie_us",
    stripePriceId: "price_organic_sencha_ichie_usd",
    colorClass: "from-emerald-600 to-emerald-700",
  },
  {
    id: 3,
    name: "Organic Twig Tea (Boucha)",
    description:
      "Made from carefully selected tea stems that are roasted to create the unique aroma and clean, refreshing taste characteristic of twig tea.",
    price: 25,
    originalPrice: 30,
    category: "Twig Tea",
    image: {
      url: "/images/products/boucha.webp",
      alt: "Organic Twig Tea",
      width: 400,
      height: 400,
    },
    details: {
      weight: "50g",
      origin: "Shizuoka Prefecture",
      harvestSeason: "First and second flush blend",
    },
    stripeProductId: "prod_organic_boucha_us",
    stripePriceId: "price_organic_boucha_usd",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 4,
    name: "Organic Powder Tea (Konacha)",
    description:
      "Made from carefully selected tea powder that is roasted to deliver rich color and umami flavor even in small quantities. An economical choice for tea lovers.",
    price: 25,
    originalPrice: 30,
    category: "Powder Tea",
    image: {
      url: "/images/products/konacha.webp",
      alt: "Organic Powder Tea",
      width: 400,
      height: 400,
    },
    details: {
      weight: "50g",
      origin: "Shizuoka Prefecture",
      harvestSeason: "First and second flush blend",
    },
    stripeProductId: "prod_organic_kocha_us",
    stripePriceId: "price_organic_kocha_usd",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 5,
    name: "Roasted Tea (Hojicha) - Joraku",
    description:
      "Made by strongly roasting bancha tea to create the characteristic fragrant aroma and sweet taste of hojicha. Suitable for children and elderly people due to its low caffeine content.",
    price: 25,
    originalPrice: 30,
    category: "Hojicha",
    image: {
      url: "/images/products/hojicha.webp",
      alt: "Roasted Tea - Joraku",
      width: 400,
      height: 400,
    },
    details: {
      weight: "50g",
      origin: "Shizuoka Prefecture",
      harvestSeason: "First and second flush blend",
    },
    stripeProductId: "prod_hojicha_jyoraku_us",
    stripePriceId: "price_hojicha_jyoraku_usd",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 6,
    name: "Powdered Green Tea",
    description:
      "Sencha processed into powder form that dissolves completely in hot or cold water without leaving tea leaves. Versatile for cooking, tea cocktails, and confectionery making.",
    price: 25,
    originalPrice: 30,
    category: "Green Tea",
    image: {
      url: "/images/products/hunmatsu-ryokucha.webp",
      alt: "Powdered Green Tea",
      width: 400,
      height: 400,
    },
    details: {
      weight: "50g",
      origin: "Shizuoka Prefecture",
      harvestSeason: "First and second flush blend",
    },
    stripeProductId: "prod_powdered_green_tea_us",
    stripePriceId: "price_powdered_green_tea_usd",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 7,
    name: "Powdered Green Tea - Stick Type",
    description:
      "Powdered green tea packaged in convenient 1g individual sticks. Use one stick per 500ml of water to create a beautiful green-colored tea.",
    price: 25,
    originalPrice: 30,
    category: "Green Tea",
    image: {
      url: "/images/products/hunmatsu-stick.webp",
      alt: "Powdered Green Tea Stick Type",
      width: 400,
      height: 400,
    },
    details: {
      weight: "50g",
      origin: "Shizuoka Prefecture",
      harvestSeason: "First and second flush blend",
    },
    stripeProductId: "prod_powdered_green_tea_stick_us",
    stripePriceId: "price_powdered_green_tea_stick_usd",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 8,
    name: "Fuji Matcha - Kagayaki",
    description:
      "Organic JAS certified matcha 'Kagayaki' grown under shade for 21 days at the foot of Mount Fuji. Features vibrant green color with gentle sweetness and umami. Perfect for lattes, Japanese and Western confections, and as gifts. Certified Fuji Brand product.",
    price: 25,
    originalPrice: 30,
    category: "Matcha",
    image: {
      url: "/images/products/kagayaki.webp",
      alt: "Fuji Matcha - Kagayaki",
      width: 400,
      height: 400,
    },
    details: {
      weight: "50g",
      origin: "Shizuoka Prefecture",
      harvestSeason: "First and second flush blend",
    },
    stripeProductId: "prod_powdered_green_tea_stick_us",
    stripePriceId: "price_powdered_green_tea_stick_usd",
    colorClass: "from-green-500 to-green-600",
  },
];

export const heroData: HeroData = {
  title: [
    "At the sacred foot of Mount Fuji,",
    "refined through",
    "three centuries of tradition.",
  ],
  subtitle: "Premium Matcha",
  productName: "SUIRIN – CEREMONIAL GRADE",
  heroImage: "/images/hero-matcha-bowl.webp",
};

export const categories = [
  "All",
  "Sencha",
  "Twig Tea",
  "Hojicha",
  "Green Tea",
  "Powder Tea",
  "Matcha",
];

export const sortOptions = [
  "Recommended",
  "Price: Low to High",
  "Price: High to Low",
  "Newest First",
];

// Currency settings
export const currency = {
  code: "USD",
  symbol: "$",
  locale: "en-US", // For USD display
};
