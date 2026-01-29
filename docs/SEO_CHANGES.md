# SEO 改善 変更サマリ

## 変更したファイル一覧と内容

### A. インデックス設計の修正

| ファイル                                        | 変更内容                                                                                                                                                                                    |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/sitemap.ts`                            | ① cart / success / cancel を pages から削除（noindex のため sitemap 除外） ② `/jas` を追加 ③ `getSiteUrl()` で baseUrl を一元化 ④ 商品データから `/{locale}/products/{id}` を動的追加（C1） |
| `src/app/[locale]/(payment)/cart/layout.tsx`    | **新規** noindex 用 layout：`robots: { index: false, follow: false }`                                                                                                                       |
| `src/app/[locale]/(payment)/success/layout.tsx` | **新規** 同上                                                                                                                                                                               |
| `src/app/[locale]/(payment)/cancel/layout.tsx`  | **新規** 同上                                                                                                                                                                               |

### B. canonical とページ別メタデータ

| ファイル                                                 | 変更内容                                                                                                                                   |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/lib/seo/site-url.ts`                                | **新規** `NEXT_PUBLIC_SITE_URL`（未設定時 `https://www.jurakuen.com`）と `getSiteUrl()`                                                    |
| `src/lib/seo/meta.ts`                                    | **新規** `buildCanonical(path)` / `buildPageMeta({ title, description, canonicalPath, locale, ... })`                                      |
| `src/lib/seo/index.ts`                                   | **新規** 上記の再エクスポート                                                                                                              |
| `src/app/[locale]/layout.tsx`                            | ① `getSiteUrl()`, `buildCanonical()` を利用 ② `metadataBase` と `alternates.canonical` を動的化 ③ JSON-LD 内の URL を `siteUrl` 変数で統一 |
| `src/app/[locale]/(landing)/about/layout.tsx`            | **新規** canonical `/{locale}/about`、製造工程用 title/description                                                                         |
| `src/app/[locale]/(landing)/commerce/layout.tsx`         | **新規** canonical `/{locale}/commerce`、特商法用 title/description                                                                        |
| `src/app/[locale]/(landing)/jas/layout.tsx`              | **新規** canonical `/{locale}/jas`、有機JAS用 title/description                                                                            |
| `src/app/[locale]/(landing)/privacy/layout.tsx`          | **新規** canonical `/{locale}/privacy`、プライバシーポリシー用 title/description                                                           |
| `src/app/[locale]/(landing)/terms/layout.tsx`            | **新規** canonical `/{locale}/terms`、利用規約用 title/description                                                                         |
| `src/app/[locale]/(products)/products/layout.tsx`        | **新規** canonical `/{locale}/products`、商品一覧用 title/description                                                                      |
| `src/app/[locale]/(products)/products/[slug]/layout.tsx` | **新規** canonical `/{locale}/products/[slug]`、商品名＋説明のメタ、Product JSON-LD ＋ BreadcrumbList（C2）                                |

### C. 商品ページの検索対応

- **C1** 商品詳細URL：`src/app/sitemap.ts` で `getProducts(locale)` をループし `/{locale}/products/{id}` を追加（上記表に含む）
- **C2** 商品詳細 JSON-LD：`products/[slug]/layout.tsx` の `generateMetadata` で `other["application/ld+json"]` に Product と BreadcrumbList を出力（上記表に含む）

### その他

| ファイル       | 変更内容                                                        |
| -------------- | --------------------------------------------------------------- |
| `.env.example` | **新規** `NEXT_PUBLIC_SITE_URL=https://www.jurakuen.com` を追加 |
| `.gitignore`   | `!.env.example` を追加（.env\* で除外されないように）           |

---

## ローカルで確認すべき URL

- **robots.txt**  
  `http://localhost:3000/robots.txt`
  - `Sitemap:` が本番ドメインのままの場合は、ローカルでは sitemap の絶対URLのみ確認用

- **sitemap**  
  `http://localhost:3000/sitemap.xml`
  - cart / success / cancel が含まれていないこと
  - `/{locale}`（ja/en）のトップ・about・commerce・products・jas・privacy・terms が含まれること
  - `/{locale}/products/1`, `/{locale}/products/2` … が含まれること

- **canonical 確認（主要ページ）**  
  各ページの `<link rel="canonical">` を開発者ツールで確認：
  - `http://localhost:3000/ja` → canonical が `https://www.jurakuen.com/ja`（または `NEXT_PUBLIC_SITE_URL` の値）
  - `http://localhost:3000/ja/about` → `.../ja/about`
  - `http://localhost:3000/ja/products` → `.../ja/products`
  - `http://localhost:3000/ja/products/1` → `.../ja/products/1`
  - `http://localhost:3000/ja/jas` → `.../ja/jas`
  - `http://localhost:3000/ja/privacy` → `.../ja/privacy`
  - `http://localhost:3000/ja/terms` → `.../ja/terms`

- **noindex 確認**
  - `http://localhost:3000/ja/cart`
  - `http://localhost:3000/ja/success`
  - `http://localhost:3000/ja/cancel`  
    の `<meta name="robots" content="noindex, nofollow">` を確認

- **商品詳細の JSON-LD**  
  `http://localhost:3000/ja/products/1` のソースで `application/ld+json` に Product と BreadcrumbList が含まれることを確認

---

## 環境変数

- **`.env.example`** に `NEXT_PUBLIC_SITE_URL` を追加済みです。
- 本番でドメインが異なる場合は、本番環境に `NEXT_PUBLIC_SITE_URL=https://www.jurakuen.com`（または実際のドメイン）を設定してください。
- 未設定時は `https://www.jurakuen.com` がフォールバックされます。
