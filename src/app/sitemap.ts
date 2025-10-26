import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.jurakuen.com";
  const locales = ["ja", "en"];

  // 各ページのパス定義
  const pages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/commerce", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    {
      path: "/payment/success",
      priority: 0.1,
      changeFrequency: "never" as const,
    },
    {
      path: "/payment/cancel",
      priority: 0.1,
      changeFrequency: "never" as const,
    },
    { path: "/cart", priority: 0.2, changeFrequency: "never" as const },
  ];

  // 各言語ごとにURLを生成
  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    pages.forEach((page) => {
      sitemapEntries.push({
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
    });
  });

  return sitemapEntries;
}
