// 構造化データを <script type="application/ld+json"> として出力する。
// metadata.other 経由だと <meta> タグになり Google に認識されないため必ずこちらを使う。
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // "</script>" によるタグ閉じ注入を防ぐ
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
