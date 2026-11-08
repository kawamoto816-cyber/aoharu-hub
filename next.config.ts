import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 画像の最適化（/_next/image）は使わず、public の画像をそのまま配る。Hobby プランの画像最適化の無料枠を使い切り、
  // 402（OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED）で図解の写真が表示されなくなったため（2026-11-08）。
  // 写真は public/media に webp で入れてあり、もともと軽い
  images: { unoptimized: true },
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
