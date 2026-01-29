import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { buildPageMeta } from "@/lib/seo/meta";
import { getSiteUrl } from "@/lib/seo/site-url";
import { getProductById } from "@/data/utils";
import type { Product } from "@/data/types";

function buildProductJsonLd(product: Product, locale: string, path: string) {
  const siteUrl = getSiteUrl();
  const isJa = locale === "ja";
  const imageUrl = product.image.url.startsWith("http")
    ? product.image.url
    : `${siteUrl}${product.image.url}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteUrl}${path}#product`,
    name: product.name,
    description:
      product.description.length > 200
        ? product.description.slice(0, 197) + "..."
        : product.description,
    image: imageUrl,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: isJa ? "聚楽苑" : "Jurakuen",
      logo: `${siteUrl}/images/logos/logo_horizontal.png`,
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}${path}`,
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: isJa ? "聚楽苑" : "Jurakuen",
      },
    },
    ...(product.details.origin && {
      productionLocation: product.details.origin,
    }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isJa ? "ホーム" : "Home",
        item: `${siteUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isJa ? "商品一覧" : "Products",
        item: `${siteUrl}/${locale}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${siteUrl}${path}`,
      },
    ],
  };

  return [productSchema, breadcrumbSchema];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const path = `/${locale}/products/${slug}`;
  const productId = parseInt(slug, 10);
  const product = getProductById(productId, locale);
  const isJa = locale === "ja";

  if (!product) {
    return buildPageMeta({
      title: isJa
        ? "商品が見つかりません | 聚楽苑"
        : "Product Not Found | Jurakuen",
      description: isJa
        ? "指定の商品は見つかりませんでした。"
        : "The requested product was not found.",
      canonicalPath: path,
      locale,
    });
  }

  const siteUrl = getSiteUrl();
  const imageUrl = product.image.url.startsWith("http")
    ? product.image.url
    : `${siteUrl}${product.image.url}`;

  const baseMeta = buildPageMeta({
    title: `${product.name} | ${isJa ? "聚楽苑" : "Jurakuen"}`,
    description:
      product.description.length > 160
        ? product.description.slice(0, 157) + "..."
        : product.description,
    canonicalPath: path,
    locale,
    image: product.image.url.startsWith("http")
      ? product.image.url
      : `${siteUrl}${product.image.url}`,
  });

  const jsonLd = buildProductJsonLd(product, locale, path);

  return {
    ...baseMeta,
    openGraph: {
      ...baseMeta.openGraph,
      images: [
        { url: imageUrl, width: 400, height: 400, alt: product.image.alt },
      ],
    },
    other: {
      ...baseMeta.other,
      "application/ld+json": JSON.stringify(jsonLd),
    },
  };
}

export default function ProductSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
