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

---

## 2025 SEO強化（DMC品質・月間3,000PV土台）

### 変更ファイル一覧と要点

| ファイル                                                          | 変更内容                                                                                                                                                                                    |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A: 技術SEO**                                                    |                                                                                                                                                                                             |
| `src/lib/seo/meta.ts`                                             | `alternates.languages` を絶対URLに変更（`ja`/`en` を `${siteUrl}/ja${pathWithoutLocale}` 形式に）。og:image を絶対URL化（`imageUrl`）。                                                     |
| `src/app/[locale]/layout.tsx`                                     | `alternates.languages` を絶対URL（`${siteUrl}/ja`, `${siteUrl}/en`）。og:url / og:image / twitter.images を絶対URLに統一。JSON-LD を site-info 参照に変更。WebSite の SearchAction を削除。 |
| `src/proxy.ts`                                                    | non-www → www（308）、trailing slash 除去（308）を追加。locale リダイレクトは従来どおり。Next.js 16 では proxy ファイルがミドルウェアとして読み込まれる。                                   |
| **B: 構造化・サイト情報**                                         |                                                                                                                                                                                             |
| `src/lib/site-info.ts`                                            | **新規**。NAP 一元管理（SITE*NAME_JA/EN, TELEPHONE_DISPLAY/E164, ADDRESS_JA/EN, getPostalAddressSchema, GEO, OPENING_HOURS*\*, SAME_AS, HAS_MAP）。                                         |
| `src/app/[locale]/layout.tsx`                                     | LocalBusiness / Product / manufacturer の住所・電話・営業時間・sameAs・hasMap を site-info 参照に変更。                                                                                     |
| `src/app/[locale]/(products)/products/[slug]/layout.tsx`          | Offer の priceCurrency をロケール別に（ja: JPY, en: USD）。price を ja 時は概算円換算。                                                                                                     |
| **C: 取るページ**                                                 |                                                                                                                                                                                             |
| `src/app/[locale]/(landing)/matcha/layout.tsx`                    | **新規**。有機抹茶通販用 title/description、FAQPage JSON-LD。                                                                                                                               |
| `src/app/[locale]/(landing)/matcha/page.tsx`                      | **新規**。H1・導入・商品/JAS 内部リンク・FAQ（2〜5問）。                                                                                                                                    |
| `src/app/[locale]/(landing)/recommend/shizuoka-matcha/layout.tsx` | **新規**。静岡抹茶おすすめ用 title/description、FAQPage JSON-LD。                                                                                                                           |
| `src/app/[locale]/(landing)/recommend/shizuoka-matcha/page.tsx`   | **新規**。H1・導入・選び方・内部リンク・FAQ。                                                                                                                                               |
| `src/app/sitemap.ts`                                              | `/matcha`、`/recommend/shizuoka-matcha` を staticPages に追加。                                                                                                                             |

### ローカル確認URL一覧

- `http://localhost:3000/ja` … canonical / hreflang / og:url 絶対URL
- `http://localhost:3000/ja/about` … 同上
- `http://localhost:3000/ja/matcha` … 新規ページ・FAQPage JSON-LD
- `http://localhost:3000/ja/recommend/shizuoka-matcha` … 新規ページ・FAQPage JSON-LD
- `http://localhost:3000/en/matcha` … 英語抹茶ページ
- `http://localhost:3000/sitemap.xml` … /ja/matcha, /en/matcha, /ja/recommend/shizuoka-matcha が含まれること
- 本番ドメインで `https://jurakuen.com/ja` → `https://www.jurakuen.com/ja` に 308 リダイレクトすること
- 本番で `https://www.jurakuen.com/ja/` → `https://www.jurakuen.com/ja` に 308 リダイレクトすること

### 検証チェックリスト

- [ ] **canonical** … 主要ページの view-source で `<link rel="canonical" href="https://www.jurakuen.com/...">`
- [ ] **hreflang** … `<link rel="alternate" hreflang="ja" href="https://www.jurakuen.com/ja/...">` および `hreflang="en"` が絶対URL
- [ ] **og:url / og:image** … `https://www.jurakuen.com` で始まる絶対URL
- [ ] **リダイレクト** … non-www → www（308）、trailing slash → なし（308）
- [ ] **JSON-LD** … 構造化データテストで LocalBusiness / Product / FAQPage エラーなし。NAP が site-info と一致
- [ ] **商品詳細 Offer** … ja は priceCurrency: JPY、en は USD
- [ ] **tsc** … `npx tsc --noEmit` 成功
- [ ] **lint** … `npx eslint src --max-warnings 0` 成功（`npm run lint` が環境により失敗する場合は eslint を直接実行）
