// src/data/types.ts - お茶用型定義（修正版）
export interface Image {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // AUD (e.g., 50 = $50.00 AUD)
  originalPrice?: number | null;
  category: string;
  image: Image;
  subImages?: Image[]; // ← これが正しい型定義
  details: {
    weight?: string; // 内容量 (例: "20g", "100g")
    grade?: string; // 等級 (例: "特級", "一級")
    origin?: string; // 産地 (例: "静岡県富士市")
    producer?: string; // 生産者 (例: "聚楽苑")
    taste?: string; // 味わい
    brewingTemp?: string; // 適温 (例: "70-80°C")
    brewingTime?: string; // 抽出時間 (例: "2-3分")
    harvestSeason?: string; // 収穫期 (例: "一番茶", "二番茶")
  };
  stock?: number;
  stripeProductId?: string;
  stripePriceId?: string;
  colorClass?: string; // Tailwind用グラデーションクラス
}

export interface HeroData {
  title: string[];
  subtitle: string;
  productName: string;
  heroImage: string;
}
