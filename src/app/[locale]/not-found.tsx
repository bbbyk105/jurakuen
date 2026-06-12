import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";

// notFound() 呼び出し時に HTTP 404 とともに表示されるページ
export default async function NotFound() {
  const locale = await getLocale();
  const isJa = locale === "ja";

  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-sm text-gray-500 mb-2">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {isJa ? "ページが見つかりません" : "Page Not Found"}
        </h1>
        <p className="text-gray-600 mb-8">
          {isJa
            ? "お探しのページは移動または削除された可能性があります。"
            : "The page you are looking for may have been moved or deleted."}
        </p>
        <div className="flex items-center justify-center gap-4 text-sm">
          <Link href="/" className="underline underline-offset-4 hover:text-gray-900">
            {isJa ? "トップページへ" : "Go to Home"}
          </Link>
          <Link href="/products" className="underline underline-offset-4 hover:text-gray-900">
            {isJa ? "商品一覧へ" : "View Products"}
          </Link>
        </div>
      </div>
    </div>
  );
}
