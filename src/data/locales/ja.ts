// src/data/locales/ja.ts - お茶用日本語データ（USD対応）
import { Product, HeroData } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "有機上煎茶 千代の友",
    description:
      "太陽の光を浴びた新芽のみるい（柔らかい）部分を刈り取り、中深蒸しで加工しています。浅めに火入れでお茶本来の香り・甘味・渋みがのこるお茶です。有機栽培で育てられた安心安全なお茶です。",
    price: 32, // USD
    originalPrice: null,
    category: "煎茶",
    image: {
      url: "/images/products/chiyo.webp",
      alt: "有機上煎茶 千代の友",
      width: 400,
      height: 400,
    },
    details: {
      weight: "100g",
      origin: "静岡県富士市",
      harvestSeason: "一番茶",
    },
    stripeProductId: "prod_organic_sencha_chiyo_us",
    stripePriceId: "price_organic_sencha_chiyo_usd",
    colorClass: "from-green-600 to-green-700",
  },
  {
    id: 2,
    name: "有機煎茶 一会の友",
    description:
      "一番茶の成熟した葉を刈り取り、中深蒸しで加工し、強めの火入れで火香をつけて、香ばしい香りと甘みが残る飲みやすいお茶です。",
    price: 50,
    originalPrice: null,
    category: "煎茶",
    image: {
      url: "/images/products/ichiyu.webp",
      alt: "有機煎茶 一会の友",
      width: 400,
      height: 400,
    },
    details: {
      weight: "20g",
      origin: "静岡県富士市",
      harvestSeason: "一番茶",
    },
    stripeProductId: "prod_organic_sencha_ichie_us",
    stripePriceId: "price_organic_sencha_ichie_usd",
    colorClass: "from-emerald-600 to-emerald-700",
  },
  {
    id: 3,
    name: "有機棒茶",
    description:
      "選別された茎の部分を火入れし、棒茶独特の香り、すっきりとした味の残るお茶です",
    price: 25,
    originalPrice: 30,
    category: "棒茶",
    image: {
      url: "/images/products/boucha.webp",
      alt: "有機棒茶",
      width: 400,
      height: 400,
    },
    details: {
      weight: "50g",
      origin: "静岡県",
      harvestSeason: "一番茶・二番茶ブレンド",
    },
    stripeProductId: "prod_organic_boucha_us",
    stripePriceId: "price_organic_boucha_usd",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 4,
    name: "有機粉茶",
    description:
      "選別された粉を火入れし、少量でも水色・旨味を感じるお得なお茶です",
    price: 25,
    originalPrice: 30,
    category: "粉茶",
    image: {
      url: "/images/products/konacha.webp",
      alt: "有機粉茶",
      width: 400,
      height: 400,
    },
    details: {
      weight: "50g",
      origin: "静岡県",
      harvestSeason: "一番茶・二番茶ブレンド",
    },
    stripeProductId: "prod_organic_kocha_us",
    stripePriceId: "price_organic_kocha_usd",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 5,
    name: "ほうじ茶：常楽",
    description:
      "番茶を強めに火入れし、炒る事で、ほうじ茶の香ばしい香りと甘さのあるお茶です。子供さんやお年寄りにも適しています。",
    price: 25,
    originalPrice: 30,
    category: "ほうじ茶",
    image: {
      url: "/images/products/hojicha.webp",
      alt: "ほうじ茶：常楽",
      width: 400,
      height: 400,
    },
    details: {
      weight: "50g",
      origin: "静岡県",
      harvestSeason: "一番茶・二番茶ブレンド",
    },
    stripeProductId: "prod_hojicha_jyoraku_us",
    stripePriceId: "price_hojicha_jyoraku_usd",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 6,
    name: "粉末緑茶",
    description:
      "煎茶を粉状に加工したもので、水・湯に溶け、茶がらが出ません。お菓子作り、お茶割り等とお料理にも利用できる用途の多いお茶です。",
    price: 25,
    originalPrice: 30,
    category: "緑茶",
    image: {
      url: "/images/products/hunmatsu-ryokucha.webp",
      alt: "粉末緑茶",
      width: 400,
      height: 400,
    },
    details: {
      weight: "50g",
      origin: "静岡県",
      harvestSeason: "一番茶・二番茶ブレンド",
    },
    stripeProductId: "prod_powdered_green_tea_us",
    stripePriceId: "price_powdered_green_tea_usd",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 7,
    name: "粉末緑茶 スティックタイプ",
    description:
      "粉末緑茶を1gずつのスティックタイプにしました。500mlの水に1包を目安に、水色の緑のきれいなお茶になります。",
    price: 25,
    originalPrice: 30,
    category: "緑茶",
    image: {
      url: "/images/products/hunmatsu-stick.webp",
      alt: "粉末緑茶 スティックタイプ",
      width: 400,
      height: 400,
    },
    details: {
      weight: "50g",
      origin: "静岡県",
      harvestSeason: "一番茶・二番茶ブレンド",
    },
    stripeProductId: "prod_powdered_green_tea_stick_us",
    stripePriceId: "price_powdered_green_tea_stick_usd",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 8,
    name: "富士抹茶 かがやき",
    description:
      "富士山麓で21日間覆下し育てた有機JAS認証抹茶「かがやき」。鮮やかな緑、やわらかな甘みと旨みが際立ち、ラテや和洋菓子、贈り物にも最適な富士ブランド認定品です。",
    price: 25,
    originalPrice: 30,
    category: "抹茶",
    image: {
      url: "/images/products/kagayaki.webp",
      alt: "富士抹茶 かがやき",
      width: 400,
      height: 400,
    },
    details: {
      weight: "50g",
      origin: "静岡県",
      harvestSeason: "一番茶・二番茶ブレンド",
    },
    stripeProductId: "prod_powdered_green_tea_stick_us",
    stripePriceId: "price_powdered_green_tea_stick_usd",
    colorClass: "from-green-500 to-green-600",
  },
];

export const heroData: HeroData = {
  title: ["聖なる富士の麓で、", "三百年の時を経て", "磨かれた抹茶。"],
  subtitle: "高級抹茶",
  productName: "翠輪 – SUIRIN CEREMONIAL",
  heroImage: "/images/hero-matcha-bowl.webp",
};

export const categories = [
  "すべて",
  "煎茶",
  "棒茶",
  "ほうじ茶",
  "緑茶",
  "粉茶",
  "抹茶",
];

export const sortOptions = [
  "おすすめ順",
  "価格の安い順",
  "価格の高い順",
  "新着順",
];

// 通貨設定
export const currency = {
  code: "USD",
  symbol: "$",
  locale: "en-US", // USD表示用
};
