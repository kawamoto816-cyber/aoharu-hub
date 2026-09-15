import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Instagram 用カード画像 (/internal/social/card) が実行時に読むフォントをサーバーレス関数に含める
  outputFileTracingIncludes: {
    "/internal/social/card": ["./lib/fonts/**"],
  },
};

export default nextConfig;
