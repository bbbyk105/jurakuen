// src/data/locales/en.ts - English data for tea products (USD)
import { Product, HeroData } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "Organic Premium Sencha Chiyo-no-Tomo",
    description:
      "This completely pesticide-free organic premium sencha is cultivated in the pure waters and fertile soil at the foot of Mt. Fuji in Shizuoka. Only the tender, sun-bathed new buds are carefully hand-picked and processed using traditional medium-deep steaming methods. The light roasting preserves the tea's original refreshing aroma, elegant sweetness, and pleasant astringency in perfect harmony. Upon first sip, the fragrance of morning dew on fresh leaves fills your palate, leaving a gentle sweetness that lingers. This completely pesticide-free, organically grown tea supports your daily healthy lifestyle with absolute safety and peace of mind.",
    price: 32, // USD
    originalPrice: null,
    category: "Sencha",
    image: {
      url: "/images/products/chiyo.webp",
      alt: "Organic Premium Sencha Chiyo-no-Tomo",
      width: 400,
      height: 400,
    },
    details: {
      weight: "100g",
      origin: "Fuji City, Shizuoka",
      harvestSeason: "First Flush",
    },
    stripeProductId: "prod_organic_sencha_chiyo_us",
    stripePriceId: "price_organic_sencha_chiyo_usd",
    colorClass: "from-green-600 to-green-700",
  },
  {
    id: 2,
    name: "Organic Sencha Ichie-no-Tomo",
    description:
      "A special organic sencha crafted with unwavering commitment to completely pesticide-free cultivation. Mature first flush leaves are harvested at the optimal timing and carefully processed by master tea artisans using medium-deep steaming techniques. The stronger roasting creates an aromatic fire-scent reminiscent of freshly roasted grains, while the palate experiences rich umami and smooth sweetness. With minimal astringency, this easily enjoyable tea is perfect for accompanying meals or relaxing moments. Experience the safety of completely pesticide-free cultivation combined with the deep flavors created by traditional processing methods.",
    price: 50,
    originalPrice: null,
    category: "Sencha",
    image: {
      url: "/images/products/ichiyu.webp",
      alt: "Organic Sencha Ichie-no-Tomo",
      width: 400,
      height: 400,
    },
    details: {
      weight: "20g",
      origin: "Fuji City, Shizuoka",
      harvestSeason: "First Flush",
    },
    stripeProductId: "prod_organic_sencha_ichie_us",
    stripePriceId: "price_organic_sencha_ichie_usd",
    colorClass: "from-emerald-600 to-emerald-700",
  },
  {
    id: 3,
    name: "Organic Kukicha (Twig Tea)",
    description:
      "A special kukicha made exclusively from carefully selected stems of completely pesticide-free grown tea leaves. This tea features the characteristic refreshing aroma unique to stems and a clean, transparent flavor profile. Through moderate roasting, subtle sweetness and toastiness complement the fresh, green notes, creating an elegant taste that never grows tiresome. With naturally lower caffeine content, it's perfect for evening relaxation and safe for everyone from children to elderly. Enjoy the safety of completely pesticide-free cultivation alongside the distinctive flavors unique to stem tea.",
    price: 25,
    originalPrice: 30,
    category: "Kukicha",
    image: {
      url: "/images/products/boucha.webp",
      alt: "Organic Kukicha",
      width: 400,
      height: 400,
    },
    details: {
      weight: "50g",
      origin: "Shizuoka",
      harvestSeason: "First & Second Flush Blend",
    },
    stripeProductId: "prod_organic_boucha_us",
    stripePriceId: "price_organic_boucha_usd",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 4,
    name: "Organic Konacha (Powder Tea)",
    description:
      "This organic konacha is made from precious powder particles collected during the processing of completely pesticide-free tea leaves. The fine particles extract instantly, delivering rich color and deep umami even with small amounts - an exceptional value tea. The distinctive deep green color is proof of concentrated tea nutrients. On the palate, powerful tea umami combines with moderate astringency, followed by a sweetness that creates exquisite harmony. Popular as 'agari' at sushi restaurants, it's also perfect as a palate cleanser after meals. With completely pesticide-free quality assurance, enjoy this tea abundantly every day.",
    price: 25,
    originalPrice: 30,
    category: "Konacha",
    image: {
      url: "/images/products/konacha.webp",
      alt: "Organic Konacha",
      width: 400,
      height: 400,
    },
    details: {
      weight: "50g",
      origin: "Shizuoka",
      harvestSeason: "First & Second Flush Blend",
    },
    stripeProductId: "prod_organic_kocha_us",
    stripePriceId: "price_organic_kocha_usd",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 5,
    name: "Hojicha: Joraku",
    description:
      "A fragrant hojicha created by expertly roasting selected bancha leaves with stronger heat. The careful roasting process produces an aromatic, nutty fragrance reminiscent of roasted chestnuts with deep, sweet undertones. The beautiful amber-colored liquor offers a smooth, mellow taste that's gentle on the stomach with minimal caffeine, making it safe and enjoyable for everyone from children to seniors. Perfect for after-meal relaxation or bedtime comfort, it's delicious whether served hot or cold. Experience the nostalgic yet fresh flavors created by traditional roasting techniques.",
    price: 25,
    originalPrice: 30,
    category: "Hojicha",
    image: {
      url: "/images/products/hojicha.webp",
      alt: "Hojicha: Joraku",
      width: 400,
      height: 400,
    },
    details: {
      weight: "50g",
      origin: "Shizuoka",
      harvestSeason: "First & Second Flush Blend",
    },
    stripeProductId: "prod_hojicha_jyoraku_us",
    stripePriceId: "price_hojicha_jyoraku_usd",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 6,
    name: "Powdered Green Tea",
    description:
      "A convenient and nutritious powdered green tea made by processing high-quality sencha into ultra-fine powder using special techniques. Instantly dissolving in water or hot water without leaving any tea grounds, this revolutionary product allows you to consume 100% of the tea leaf's nutrients. The vibrant green color, refreshing aroma, and smooth flavor are perfect not just for drinking, but also as a versatile ingredient in confectionery and cooking. From matcha lattes to green tea ice cream, pancakes to pasta sauces - the possibilities are endless. Rich in catechins and vitamins for health and beauty support. With completely pesticide-free cultivation quality, this is a new form of tea that fits perfectly into modern lifestyles.",
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
      origin: "Shizuoka",
      harvestSeason: "First & Second Flush Blend",
    },
    stripeProductId: "prod_powdered_green_tea_us",
    stripePriceId: "price_powdered_green_tea_usd",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 7,
    name: "Powdered Green Tea Stick Type",
    description:
      "Our popular powdered green tea in convenient 1g individual stick packets. Simply add one packet to a 500ml bottle of water and shake for instant, vibrant green tea. Perfect for office breaks, outdoor activities, sports, or travel - enjoy authentic green tea anytime, anywhere. Dissolves instantly in cold water and tastes great hot, making it perfect year-round. Made from completely pesticide-free tea leaves with absolutely no preservatives or artificial colors. Rich in catechins and vitamin C, supporting the healthy lifestyle of busy modern people. Each stick is perfectly portioned for consistent flavor every time.",
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
      origin: "Shizuoka",
      harvestSeason: "First & Second Flush Blend",
    },
    stripeProductId: "prod_powdered_green_tea_stick_us",
    stripePriceId: "price_powdered_green_tea_stick_usd",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 8,
    name: "Fuji Matcha Kagayaki",
    description:
      "A special organic JAS certified matcha cultivated under shade for 21 days in the blessed environment at the foot of Mt. Fuji. 'Kagayaki,' meaning 'radiance,' lives up to its name with a brilliant jade green color achieved through completely pesticide-free cultivation and careful stone-grinding. On the palate, you first experience elegant, soft sweetness, followed by deep richness and umami, finishing with a subtle bitterness that brings everything together. The smooth texture and rich froth make it perfect for traditional tea ceremony. It also adds wonderful flavor to matcha lattes and Japanese or Western confections. As a certified Fuji Brand product, it makes an appropriate gift for special occasions. Savor the safety of completely pesticide-free cultivation and the supreme flavors nurtured by Mt. Fuji's blessings.",
    price: 25,
    originalPrice: 30,
    category: "Matcha",
    image: {
      url: "/images/products/kagayaki.webp",
      alt: "Fuji Matcha Kagayaki",
      width: 400,
      height: 400,
    },
    details: {
      weight: "50g",
      origin: "Shizuoka",
      harvestSeason: "First & Second Flush Blend",
    },
    stripeProductId: "prod_powdered_green_tea_stick_us",
    stripePriceId: "price_powdered_green_tea_stick_usd",
    colorClass: "from-green-500 to-green-600",
  },
];

export const heroData: HeroData = {
  title: [
    "At the sacred foot of Mt. Fuji,",
    "Three centuries of tradition",
    "Perfected in matcha.",
  ],
  subtitle: "Premium Matcha",
  productName: "SUIRIN – SUIRIN CEREMONIAL",
  heroImage: "/images/hero-matcha-bowl.webp",
};

export const categories = [
  "All",
  "Sencha",
  "Kukicha",
  "Hojicha",
  "Green Tea",
  "Konacha",
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
  locale: "en-US",
};
