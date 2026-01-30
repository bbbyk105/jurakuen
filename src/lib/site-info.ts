/**
 * 聚楽苑 NAP（Name, Address, Phone）・営業時間・SNS を一元管理
 * JSON-LD / メタ / フッター等で同一ソースを参照する
 */
import { getSiteUrl } from "@/lib/seo/site-url";

export const SITE_NAME_JA = "聚楽苑";
export const SITE_NAME_EN = "Jurakuen";

export function getSiteName(locale: string): string {
  return locale === "ja" ? SITE_NAME_JA : SITE_NAME_EN;
}

/** 表示用サイトURL（末尾スラッシュなし） */
export function getSiteUrlForInfo(): string {
  return getSiteUrl();
}

/** 表示用電話番号 */
export const TELEPHONE_DISPLAY = "0545-34-0614";
/** E.164（国際番号） */
export const TELEPHONE_E164 = "+81545340614";

/** 住所（日本語） */
export const ADDRESS_JA = {
  streetAddress: "境485-2",
  addressLocality: "富士市",
  addressRegion: "静岡県",
  postalCode: "417-0812",
  addressCountry: "JP",
} as const;

/** 住所（英語） */
export const ADDRESS_EN = {
  streetAddress: "485-2 Sakai",
  addressLocality: "Fuji City",
  addressRegion: "Shizuoka Prefecture",
  postalCode: "417-0812",
  addressCountry: "JP",
} as const;

export function getAddress(locale: string) {
  return locale === "ja" ? ADDRESS_JA : ADDRESS_EN;
}

/** Schema.org PostalAddress 用 */
export function getPostalAddressSchema(locale: string) {
  const addr = getAddress(locale);
  return {
    "@type": "PostalAddress" as const,
    streetAddress: addr.streetAddress,
    addressLocality: addr.addressLocality,
    addressRegion: addr.addressRegion,
    postalCode: addr.postalCode,
    addressCountry: addr.addressCountry,
  };
}

/** 緯度・経度（富士市境） */
export const GEO = {
  latitude: "35.1609",
  longitude: "138.6760",
} as const;

/** 営業時間（短い表記） */
export const OPENING_HOURS_DISPLAY = "Mo-Fr 10:00-18:00";

/** Schema.org OpeningHoursSpecification 用 */
export const OPENING_HOURS_SPECIFICATION = [
  {
    "@type": "OpeningHoursSpecification" as const,
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ] as const,
    opens: "10:00",
    closes: "18:00",
  },
];

/** 同一SNS（Instagram等） */
export const SAME_AS = ["https://www.instagram.com/jurakuenfuji/"] as const;

/** Google Maps リンク */
export const HAS_MAP = "https://maps.app.goo.gl/M4vN5pkKsyf4j5MH6";
