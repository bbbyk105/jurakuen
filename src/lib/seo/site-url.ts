/**
 * サイトのベースURLを一元管理
 * NEXT_PUBLIC_SITE_URL 未設定時は本番ドメインをフォールバック
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jurakuen.com";

export function getSiteUrl(): string {
  return SITE_URL.replace(/\/$/, "");
}

export { SITE_URL };
