// src/data/locales/ja.ts - お茶用日本語データ（USD対応）
import { Product, HeroData } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "有機上煎茶 千代の友",
    description:
      "静岡県富士山麓の清らかな水と肥沃な大地で育てられた、農薬不使用の有機上煎茶です。太陽の光をたっぷりと浴びた新芽のみるい（柔らかい）部分のみを丁寧に収穫し、伝統的な中深蒸し製法で仕上げました。浅めの火入れにより、茶葉本来の爽やかな香りと上品な甘み、心地よい渋みのバランスが絶妙に調和しています。一口含むと、まるで朝露を含んだ新緑の香りが口いっぱいに広がり、後味には優しい甘みが残ります。農薬不使用・有機栽培で育てられた安心安全なお茶は、毎日の健康的な生活をサポートします。",
    price: 10, // USD
    category: "煎茶",
    image: {
      url: "/images/products/chiyo.webp",
      alt: "有機上煎茶 千代の友",
      width: 400,
      height: 400,
    },
    subImages: [
      {
        url: "/images/products/chiyo-b.webp",
        alt: "有機上煎茶 千代の友 茶葉詳細",
        width: 400,
        height: 400,
      },
    ],
    details: {
      weight: "100g",
      origin: "静岡県富士市",
      harvestSeason: "一番茶",
    },
    stripeProductId: "prod_T1m7X5XfQN47sU",
    stripePriceId: "price_1S5iZhGWVrFqKZ5xrmOTA5kU",
    colorClass: "from-green-600 to-green-700",
  },
  {
    id: 2,
    name: "有機煎茶 一会の友",
    description:
      "農薬不使用栽培にこだわり抜いた、特別な有機煎茶です。一番茶の成熟した葉を最適なタイミングで刈り取り、熟練の茶師が中深蒸し製法で丁寧に加工しています。強めの火入れによって生まれる香ばしい火香は、まるで炒りたての穀物のような深い香りを醸し出し、口に含むと濃厚な旨みとまろやかな甘みが広がります。渋みが少なく、どなたでも飲みやすい味わいは、食事のお供にも、ホッと一息つきたい時にも最適です。農薬不使用の安全性と、伝統製法が生み出す深い味わいをお楽しみください。",
    price: 6,
    category: "煎茶",
    image: {
      url: "/images/products/ichiyu.webp",
      alt: "有機煎茶 一会の友",
      width: 400,
      height: 400,
    },
    subImages: [
      {
        url: "/images/products/ichiyu-b.webp",
        alt: "有機煎茶 一会の友 抽出シーン",
        width: 400,
        height: 400,
      },
    ],
    details: {
      weight: "100g",
      origin: "静岡県富士市",
      harvestSeason: "一番茶",
    },
    stripeProductId: "prod_T1m7bG0ZGf4ucV",
    stripePriceId: "price_1S5iZiGWVrFqKZ5xFED1C4eL",
    colorClass: "from-emerald-600 to-emerald-700",
  },
  {
    id: 3,
    name: "有機棒茶",
    description:
      "農薬不使用で育てた茶葉から、丁寧に選別された茎の部分だけを使用した特別な棒茶です。茎特有の清涼感のある香りと、すっきりとした透明感のある味わいが特徴です。適度な火入れにより、青々とした爽やかさの中に、ほのかな甘みと香ばしさが加わり、飲み飽きない上品な味わいに仕上がっています。小さなお子様からご年配の方まで、幅広い年代の方に安心してお楽しみいただけます。農薬不使用栽培の安全性と、茎茶ならではの独特な味わいをご堪能ください。",
    price: 6,
    category: "棒茶",
    image: {
      url: "/images/products/boucha.webp",
      alt: "有機棒茶",
      width: 400,
      height: 400,
    },
    subImages: [
      {
        url: "/images/products/boucha-b.webp",
        alt: "有機棒茶 茶葉",
        width: 400,
        height: 400,
      },
    ],
    details: {
      weight: "100g",
      origin: "静岡県",
      harvestSeason: "一番茶",
    },
    stripeProductId: "prod_T1m75Ujdjzi1uI",
    stripePriceId: "price_1S5iZjGWVrFqKZ5xJ3IXy3Rt",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 4,
    name: "有機粉茶",
    description:
      "農薬不使用栽培の茶葉を製造する過程で生まれる、貴重な粉の部分を丁寧に集めた有機粉茶です。細かい粒子が瞬時に抽出されるため、少量でも濃厚な水色（すいしょく）と深い旨味を楽しめる、大変お得なお茶です。独特の濃い緑色は、茶葉の栄養分がぎゅっと凝縮された証。口に含むと、力強い茶の旨味と適度な渋み、そして後から追いかけてくる甘みが絶妙なハーモニーを奏でます。お寿司屋さんでお馴染みの「あがり」としても人気で、食後の口直しにも最適です。農薬不使用の安心品質で、毎日たっぷりとお楽しみいただけます。",
    price: 7,
    category: "粉茶",
    image: {
      url: "/images/products/konacha.webp",
      alt: "有機粉茶",
      width: 400,
      height: 400,
    },
    subImages: [
      {
        url: "/images/products/konacha-b.webp",
        alt: "有機粉茶 粉末",
        width: 400,
        height: 400,
      },
    ],
    details: {
      weight: "150g",
      origin: "静岡県",
      harvestSeason: "一番茶",
    },
    stripeProductId: "prod_T1m8PmHgyqjkOB",
    stripePriceId: "price_1S5iZlGWVrFqKZ5xkdQvMT6n",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 5,
    name: "ほうじ茶：常楽",
    description:
      "厳選した番茶を、職人の技で強めに焙煎した香り高いほうじ茶です。茶葉を丁寧に炒ることで生まれる、香ばしく芳醇な香りは、まるで焼き栗のような深みのある甘さを感じさせます。琥珀色の美しい水色と、口当たりの良いまろやかな味わいは、カフェインが少なく胃にも優しいため、お子様からご年配の方まで安心してお飲みいただけます。食後のひとときや、寝る前のリラックスタイムに最適で、温めても冷やしても美味しくお召し上がりいただけます。伝統的な焙煎技術が生み出す、懐かしくも新しい味わいをお楽しみください。",
    price: 6,
    category: "ほうじ茶",
    image: {
      url: "/images/products/hojicha.webp",
      alt: "ほうじ茶：常楽",
      width: 400,
      height: 400,
    },
    subImages: [
      {
        url: "/images/products/hojicha-b.webp",
        alt: "ほうじ茶：常楽 焙煎茶葉",
        width: 400,
        height: 400,
      },
    ],
    details: {
      weight: "200g",
      origin: "静岡県",
      harvestSeason: "番茶",
    },
    stripeProductId: "prod_T1m8TpYi0G0oYm",
    stripePriceId: "price_1S5iZmGWVrFqKZ5xBepROqGt",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 6,
    name: "粉末緑茶",
    description:
      "上質な煎茶を特殊な技術で微粉末状に加工した、便利で栄養満点の粉末緑茶です。水やお湯に瞬時に溶け、茶がらが出ないため、茶葉の栄養を100％摂取できる画期的な商品です。鮮やかな緑色と爽やかな香り、そしてまろやかな味わいは、そのまま飲むだけでなく、お菓子作りやお料理のアクセントとしても大活躍。抹茶ラテ、緑茶アイス、パンケーキ、パスタソースなど、アイデア次第で無限の可能性が広がります。カテキンやビタミン類を豊富に含み、健康と美容をサポート。農薬不使用栽培の安心品質で、現代のライフスタイルに寄り添う新しいお茶の形です。",
    price: 7,
    category: "緑茶",
    image: {
      url: "/images/products/hunmatsu-ryokucha.webp",
      alt: "粉末緑茶",
      width: 400,
      height: 400,
    },
    subImages: [
      {
        url: "/images/products/hunmatsu-ryokucha-b.webp",
        alt: "粉末緑茶 溶解シーン",
        width: 400,
        height: 400,
      },
    ],
    details: {
      weight: "50g",
      origin: "静岡県",
      harvestSeason: "一番茶",
    },
    stripeProductId: "prod_T1m8g4xeY3iCGK",
    stripePriceId: "price_1S5iZoGWVrFqKZ5xUNt8aiLu",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 7,
    name: "粉末緑茶 スティックタイプ",
    description:
      "大人気の粉末緑茶を、使いやすい1gずつの個包装スティックタイプにしました。500mlのペットボトルの水に1包を入れて振るだけで、鮮やかな緑色の美味しい緑茶が完成します。オフィスでのブレイクタイム、アウトドアやスポーツシーン、旅行先など、いつでもどこでも手軽に本格的な緑茶を楽しめます。冷水でも瞬時に溶け、ホットでも美味しく、季節を問わずお楽しみいただけます。農薬不使用栽培の茶葉を使用し、保存料・着色料は一切不使用。カテキンやビタミンCなどの栄養素もしっかり摂取でき、忙しい現代人の健康的なライフスタイルをサポートします。",
    price: 10,
    category: "緑茶",
    image: {
      url: "/images/products/hunmatsu-stick.webp",
      alt: "粉末緑茶 スティックタイプ",
      width: 400,
      height: 400,
    },
    subImages: [
      {
        url: "/images/products/hunmatsu-stick-b.webp",
        alt: "粉末緑茶 スティックタイプ 使用シーン",
        width: 400,
        height: 400,
      },
    ],
    details: {
      weight: "1g × 20本",
      origin: "静岡県",
      harvestSeason: "一番茶",
    },
    stripeProductId: "prod_T1m83dYiYTV2Wz",
    stripePriceId: "price_1S5iZpGWVrFqKZ5xJOgS1AzK",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 8,
    name: "富士抹茶 かがやき",
    description:
      "富士山麓の恵まれた環境で、21日間もの長期間覆下栽培された特別な有機JAS認証抹茶です。農薬不使用にこだわり、丁寧に石臼で挽いた「かがやき」は、その名の通り輝くような鮮やかな翡翠色が特徴。口に含むと、まず感じるのは上品でやわらかな甘み、続いて深いコクと旨みが広がり、最後にほのかな苦みが全体を引き締めます。なめらかな舌触りと豊かな泡立ちは、茶道のお点前にも最適。また、抹茶ラテや和洋菓子作りにも素晴らしい風味を添えます。富士ブランド認定品として、大切な方への贈り物にもふさわしい逸品。農薬不使用の安全性と、富士山の恵みが育んだ極上の味わいをご堪能ください。",
    price: 7,
    category: "抹茶",
    image: {
      url: "/images/products/kagayaki.webp",
      alt: "富士抹茶 かがやき",
      width: 400,
      height: 400,
    },
    subImages: [
      {
        url: "/images/products/kagayaki-b.webp",
        alt: "富士抹茶 かがやき 茶道シーン",
        width: 400,
        height: 400,
      },
    ],
    details: {
      weight: "20g",
      origin: "静岡県",
      harvestSeason: "一番茶",
    },
    stripeProductId: "prod_T1m8L85lQt1q2s",
    stripePriceId: "price_1S5iZqGWVrFqKZ5xvCp7hsf4",
    colorClass: "from-green-500 to-green-600",
  },
  {
    id: 9,
    name: "test",
    description:
      "富士山麓の恵まれた環境で、21日間もの長期間覆下栽培された特別な有機JAS認証抹茶です。農薬不使用にこだわり、丁寧に石臼で挽いた「かがやき」は、その名の通り輝くような鮮やかな翡翠色が特徴。口に含むと、まず感じるのは上品でやわらかな甘み、続いて深いコクと旨みが広がり、最後にほのかな苦みが全体を引き締めます。なめらかな舌触りと豊かな泡立ちは、茶道のお点前にも最適。また、抹茶ラテや和洋菓子作りにも素晴らしい風味を添えます。富士ブランド認定品として、大切な方への贈り物にもふさわしい逸品。農薬不使用の安全性と、富士山の恵みが育んだ極上の味わいをご堪能ください。",
    price: 0.5,
    category: "抹茶",
    image: {
      url: "/images/products/kagayaki.webp",
      alt: "test",
      width: 400,
      height: 400,
    },
    subImages: [
      {
        url: "/images/products/kagayaki-b.webp",
        alt: "test 茶道シーン",
        width: 400,
        height: 400,
      },
    ],
    details: {
      weight: "20g",
      origin: "静岡県",
      harvestSeason: "一番茶",
    },
    stripeProductId: "prod_T1m8fZUFEE5ENR",
    stripePriceId: "price_1S5iZsGWVrFqKZ5xTO5Aiw4W",
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
