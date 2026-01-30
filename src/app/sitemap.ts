import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site-url";
import { getProducts } from "@/data/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const locales = ["ja", "en"] as const;

  // インデックス対象の静的パス（cart / success / cancel は noindex のため除外）
  const staticPages: {
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly" | "yearly";
  }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/commerce", priority: 0.9, changeFrequency: "weekly" },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" },
    { path: "/matcha", priority: 0.9, changeFrequency: "weekly" },
    {
      path: "/recommend/shizuoka-matcha",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    { path: "/jas", priority: 0.8, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            ja: `${baseUrl}/ja${page.path}`,
            en: `${baseUrl}/en${page.path}`,
          },
        },
      });
    }

    // 商品詳細URLを商品データから追加
    const products = getProducts(locale);
    for (const product of products) {
      entries.push({
        url: `${baseUrl}/${locale}/products/${product.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates: {
          languages: {
            ja: `${baseUrl}/ja/products/${product.id}`,
            en: `${baseUrl}/en/products/${product.id}`,
          },
        },
      });
    }
  }

  return entries;
}
