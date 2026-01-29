import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { buildPageMeta } from "@/lib/seo/meta";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const path = `/${locale}/about`;
  const isJa = locale === "ja";
  return buildPageMeta({
    title: isJa
      ? "お茶の製造工程 | 聚楽苑 - 富士市の有機抹茶・緑茶"
      : "Tea Production Process | Jurakuen - Fuji City Organic Tea",
    description: isJa
      ? "聚楽苑の有機抹茶・煎茶の製造工程をご紹介。栽培から収穫、蒸し・乾燥・碾茶・荒碾きまで、富士山麓で丁寧に作られるお茶の作り方。"
      : "How Jurakuen's organic matcha and sencha are made. From cultivation to harvest, steaming, drying and stone-grinding at the foot of Mt. Fuji.",
    canonicalPath: path,
    locale,
  });
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
