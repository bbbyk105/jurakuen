// src/data/locales/en.ts - English tea data (USD support)
import { Product, HeroData } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "Organic Premium Sencha - Chiyo no Tomo",
    description:
      "A completely pesticide-free organic premium sencha grown in the pristine waters and fertile soil at the foot of Mt. Fuji in Shizuoka Prefecture. Only the tender parts of new buds that have received plenty of sunlight are carefully hand-picked and finished using traditional medium-deep steaming methods. Light roasting creates an exquisite balance of the tea leaves' natural refreshing aroma, elegant sweetness, and pleasant astringency. With each sip, the fragrance of fresh greenery with morning dew spreads throughout your mouth, leaving a gentle sweetness in the aftertaste. This completely pesticide-free, organically grown safe tea supports a healthy daily lifestyle.",
    price: 10, // USD
    originalPrice: null,
    category: "Sencha",
    image: {
      url: "/images/products/chiyo.webp",
      alt: "Organic Premium Sencha - Chiyo no Tomo",
      width: 400,
      height: 400,
    },
    subImages: [
      {
        url: "/images/products/chiyo-b.webp",
        alt: "Organic Premium Sencha - Chiyo no Tomo tea leaves detail",
        width: 400,
        height: 400,
      },
    ],
    details: {
      weight: "100g",
      origin: "Fuji City, Shizuoka Prefecture",
      harvestSeason: "First flush",
    },
    stripeProductId: "prod_SylwKGVQ2s7T4v",
    stripePriceId: "price_1S2oOoGf5qkoGUYpj9mjS8qI",
    colorClass: "from-green-600 to-green-700",
  },
  {
    id: 2,
    name: "Organic Sencha - Ichie no Tomo",
    description:
      "A special organic sencha that is completely committed to pesticide-free cultivation. Mature leaves from the first flush are harvested at the optimal timing and carefully processed by skilled tea masters using medium-deep steaming methods. The fragrant roasted aroma created by strong roasting produces a deep aroma like freshly roasted grains, and when you taste it, rich umami and mellow sweetness spread throughout your mouth. With little astringency and an easy-to-drink taste for everyone, it's perfect as a meal companion or when you want to take a relaxing break. Enjoy the safety of completely pesticide-free cultivation and the deep flavor created by traditional manufacturing methods.",
    price: 6,
    originalPrice: null,
    category: "Sencha",
    image: {
      url: "/images/products/ichiyu.webp",
      alt: "Organic Sencha - Ichie no Tomo",
      width: 400,
      height: 400,
    },
    subImages: [
      {
        url: "/images/products/ichiyu-b.webp",
        alt: "Organic Sencha - Ichie no Tomo brewing scene",
        width: 400,
        height: 400,
      },
    ],
    details: {
      weight: "100g",
      origin: "Fuji City, Shizuoka Prefecture",
      harvestSeason: "First flush",
    },
    stripeProductId: "prod_SylwLY3mpJfF7I",
    stripePriceId: "price_1S2oOpGf5qkoGUYpwYbbSHyH",
    colorClass: "from-emerald-600 to-emerald-700",
  },
  {
    id: 3,
    name: "Organic Twig Tea (Boucha)",
    description:
      "A special twig tea made using only carefully selected stem parts from completely pesticide-free tea leaves. It features a refreshing aroma unique to stems and a clean, transparent taste. Moderate roasting adds subtle sweetness and fragrance to the fresh, refreshing flavor, creating an elegant taste that never gets boring. With lower caffeine content, it can be safely enjoyed by people of all ages, from small children to the elderly, during evening relaxation time. Enjoy the safety of completely pesticide-free cultivation and the unique taste that only twig tea can offer.",
    price: 6,
    originalPrice: null,
    category: "Twig Tea",
    image: {
      url: "/images/products/boucha.webp",
      alt: "Organic Twig Tea (Boucha)",
      width: 400,
      height: 400,
    },
    subImages: [
      {
        url: "/images/products/boucha-b.webp",
        alt: "Organic Twig Tea (Boucha) tea leaves",
        width: 400,
        height: 400,
      },
    ],
    details: {
      weight: "100g",
      origin: "Shizuoka Prefecture",
      harvestSeason: "First and second flush blend",
    },
    stripeProductId: "prod_Sylwk2bFPyktmJ",
    stripePriceId: "price_1S2oOqGf5qkoGUYp27YgzX8K",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 4,
    name: "Organic Powdered Tea (Konacha)",
    description:
      "Organic powdered tea carefully collected from the precious powder parts created during the production process of completely pesticide-free tea leaves. Because fine particles are extracted instantly, you can enjoy rich water color and deep umami with just a small amount - a very economical tea. The distinctive deep green color is proof that the tea leaves' nutrients are concentrated. When you taste it, the powerful tea umami, moderate astringency, and sweetness that follows create an exquisite harmony. Popular as 'agari' familiar in sushi restaurants, it's also perfect for cleansing the palate after meals. With completely pesticide-free assured quality, you can enjoy it abundantly every day.",
    price: 7,
    originalPrice: null,
    category: "Powdered Tea",
    image: {
      url: "/images/products/konacha.webp",
      alt: "Organic Powdered Tea (Konacha)",
      width: 400,
      height: 400,
    },
    subImages: [
      {
        url: "/images/products/konacha-b.webp",
        alt: "Organic Powdered Tea (Konacha) powder",
        width: 400,
        height: 400,
      },
    ],
    details: {
      weight: "150g",
      origin: "Shizuoka Prefecture",
      harvestSeason: "First and second flush blend",
    },
    stripeProductId: "prod_SylwGgbjwpNhbq",
    stripePriceId: "price_1S2oOrGf5qkoGUYpVspbR33H",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 5,
    name: "Roasted Tea (Hojicha) - Joraku",
    description:
      "Fragrant hojicha made by strongly roasting carefully selected bancha with craftsman's skill. The fragrant and mellow aroma created by carefully roasting tea leaves produces a deep sweetness reminiscent of roasted chestnuts. The beautiful amber-colored water and smooth, mellow taste have low caffeine content and are gentle on the stomach, making them safe for everyone from children to the elderly. Perfect for post-meal moments or relaxing bedtime, it's delicious whether served hot or cold. Enjoy the nostalgic yet new taste created by traditional roasting techniques.",
    price: 6,
    originalPrice: 6,
    category: "Roasted Tea",
    image: {
      url: "/images/products/hojicha.webp",
      alt: "Roasted Tea (Hojicha) - Joraku",
      width: 400,
      height: 400,
    },
    subImages: [
      {
        url: "/images/products/hojicha-b.webp",
        alt: "Roasted Tea (Hojicha) - Joraku roasted tea leaves",
        width: 400,
        height: 400,
      },
    ],
    details: {
      weight: "200g",
      origin: "Shizuoka Prefecture",
      harvestSeason: "First flush",
    },
    stripeProductId: "prod_SylwOuCDEg9GA2",
    stripePriceId: "price_1S2oOrGf5qkoGUYpe7YZ22UW",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 6,
    name: "Powdered Green Tea",
    description:
      "A convenient and nutritious powdered green tea made by processing high-quality sencha into fine powder using special technology. It dissolves instantly in water or hot water without producing tea dregs, allowing you to consume 100% of the tea leaves' nutrients - a revolutionary product. The vibrant green color, refreshing aroma, and mellow taste are not only perfect for drinking as is, but also excel as accents in confectionery and cooking. The possibilities are endless with ideas like matcha lattes, green tea ice cream, pancakes, and pasta sauce. Rich in catechins and vitamins to support health and beauty. With completely pesticide-free cultivation's assured quality, it's a new form of tea that accompanies modern lifestyles.",
    price: 7,
    originalPrice: 7,
    category: "Green Tea",
    image: {
      url: "/images/products/hunmatsu-ryokucha.webp",
      alt: "Powdered Green Tea",
      width: 400,
      height: 400,
    },
    subImages: [
      {
        url: "/images/products/hunmatsu-ryokucha-b.webp",
        alt: "Powdered Green Tea dissolution scene",
        width: 400,
        height: 400,
      },
    ],
    details: {
      weight: "50g",
      origin: "Shizuoka Prefecture",
      harvestSeason: "First and second flush blend",
    },
    stripeProductId: "prod_Sylw34uKuLm0Vk",
    stripePriceId: "price_1S2oOsGf5qkoGUYpnc8Lers0",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 7,
    name: "Powdered Green Tea - Stick Type",
    description:
      "Our popular powdered green tea in convenient 1g individual stick packaging. Simply add one packet to a 500ml plastic bottle of water and shake to create delicious green tea with a vibrant green color. Enjoy authentic green tea easily anytime, anywhere - during office break time, outdoor and sports scenes, or while traveling. It dissolves instantly in cold water and tastes great hot or cold, perfect for enjoyment regardless of season. Made with completely pesticide-free tea leaves with absolutely no preservatives or artificial colors. You can also properly consume nutrients like catechins and vitamin C, supporting the healthy lifestyle of busy modern people.",
    price: 10,
    originalPrice: 10,
    category: "Green Tea",
    image: {
      url: "/images/products/hunmatsu-stick.webp",
      alt: "Powdered Green Tea - Stick Type",
      width: 400,
      height: 400,
    },
    subImages: [
      {
        url: "/images/products/hunmatsu-stick-b.webp",
        alt: "Powdered Green Tea - Stick Type usage scene",
        width: 400,
        height: 400,
      },
    ],
    details: {
      weight: "1g × 20 sticks",
      origin: "Shizuoka Prefecture",
      harvestSeason: "First and second flush blend",
    },
    stripeProductId: "prod_Sylwzjrlg23w8U",
    stripePriceId: "price_1S2oOtGf5qkoGUYpdAs02zjs",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 8,
    name: "Fuji Matcha - Kagayaki",
    description:
      "Special organic JAS certified matcha cultivated under shade for a long period of 21 days in the blessed environment at the foot of Mt. Fuji. 'Kagayaki,' committed to being completely pesticide-free and carefully ground with stone mills, features a brilliant jade green color that lives up to its name. When you taste it, you first feel elegant and gentle sweetness, followed by deep richness and umami, with subtle bitterness that brings everything together at the end. The smooth texture and rich foam make it perfect for tea ceremony preparation. It also adds wonderful flavor to matcha lattes and Japanese and Western confectionery. As a Fuji Brand certified product, it's a masterpiece worthy of gifts for loved ones. Enjoy the safety of completely pesticide-free cultivation and the supreme taste nurtured by Mt. Fuji's blessings.",
    price: 7,
    originalPrice: 7,
    category: "Matcha",
    image: {
      url: "/images/products/kagayaki.webp",
      alt: "Fuji Matcha - Kagayaki",
      width: 400,
      height: 400,
    },
    subImages: [
      {
        url: "/images/products/kagayaki-b.webp",
        alt: "Fuji Matcha - Kagayaki tea ceremony scene",
        width: 400,
        height: 400,
      },
    ],
    details: {
      weight: "20g",
      origin: "Shizuoka Prefecture",
      harvestSeason: "First and second flush blend",
    },
    stripeProductId: "prod_SylwsrNs4F5YlQ",
    stripePriceId: "price_1S2oOuGf5qkoGUYpn2bXLwtD",
    colorClass: "from-green-500 to-green-600",
  },
];

export const heroData: HeroData = {
  title: [
    "At the foot of sacred Mt. Fuji,",
    "through three hundred years,",
    "refined matcha.",
  ],
  subtitle: "Premium Matcha",
  productName: "SUIRIN CEREMONIAL",
  heroImage: "/images/hero-matcha-bowl.webp",
};

export const categories = [
  "All",
  "Sencha",
  "Twig Tea",
  "Roasted Tea",
  "Green Tea",
  "Powdered Tea",
  "Matcha",
];

export const sortOptions = [
  "Recommended",
  "Price: Low to High",
  "Price: High to Low",
  "Newest",
];

// Currency settings
export const currency = {
  code: "USD",
  symbol: "$",
  locale: "en-US", // For USD display
};
