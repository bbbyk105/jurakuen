import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// next-intlのプラグインを初期化
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // メタデータのストリーミングを止め、canonical・hreflang・title を常に <head> に出す。
  // 既定では Googlebot に <body> 側で返し、Search Console で canonical が「指定なし」扱いになっていた
  htmlLimitedBots: /.*/,
};

// next-intlプラグインを適用
export default withNextIntl(nextConfig);
