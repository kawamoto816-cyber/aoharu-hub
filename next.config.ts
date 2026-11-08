import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // public/audio（音声。数百MB）は CDN から配る静的ファイル。fs で public を読むコードがあると、トレースが音声まで関数に入れてしまい、
  // 関数が大きすぎて分割される（Hobby の上限 12 個を超えてデプロイが失敗する：2026-11-08）。関数には入れない。
  // public/media（/api/unizeb/grade が実行時に読む JSON）は入れたままにする
  outputFileTracingExcludes: {
    "/*": ["./public/audio/**/*"],
    "/**": ["./public/audio/**/*"],
  },
  // Instagram 用カード画像 (/internal/social/card) が実行時に読むフォントをサーバーレス関数に含める
  outputFileTracingIncludes: {
    "/internal/social/card": ["./lib/fonts/**"],
  },
};

export default nextConfig;
