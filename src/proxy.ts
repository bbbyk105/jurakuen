import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

type Locale = (typeof routing.locales)[number];

const CANONICAL_HOST = "www.jurakuen.com";
const intlMiddleware = createMiddleware(routing);

/**
 * 技術SEO: 正規URLへ 308 リダイレクト
 * - non-www → www
 * - trailing slash あり → なし（ルート "/" を除く）
 */
function normalizeUrl(request: NextRequest): NextResponse | null {
  const url = request.nextUrl.clone();
  const { pathname, search } = url;

  // non-www → www（本番ドメインのみ。localhost は対象外）
  if (url.hostname === "jurakuen.com") {
    url.host = CANONICAL_HOST;
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }

  // trailing slash 除去（/ja/ → /ja）。ルート "/" はそのまま
  if (pathname.length > 1 && pathname.endsWith("/")) {
    url.pathname = pathname.slice(0, -1);
    url.search = search;
    return NextResponse.redirect(url, 308);
  }

  return null;
}

export default function proxy(request: NextRequest) {
  const redirect = normalizeUrl(request);
  if (redirect) return redirect;

  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale && pathname === "/") {
    const savedLocale = request.cookies.get("preferred-locale")?.value;
    if (savedLocale && routing.locales.includes(savedLocale as Locale)) {
      return NextResponse.redirect(
        new URL(`/${savedLocale}`, request.url),
        308,
      );
    }
    return NextResponse.redirect(
      new URL(`/${routing.defaultLocale}`, request.url),
      308,
    );
  }

  const response = intlMiddleware(request);

  if (response && pathnameHasLocale) {
    const currentLocale = pathname.split("/")[1];
    if (routing.locales.includes(currentLocale as Locale)) {
      response.cookies.set("preferred-locale", currentLocale, {
        maxAge: 365 * 24 * 60 * 60,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }
  }

  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
