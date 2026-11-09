import { clerkMiddleware } from "@clerk/nextjs/server";

// 今回はAI生成APIルート側 (app/api/chat/route.ts) で個別に権限チェックする方針のため、
// ここではページ全体を保護しない (auth.protect()は呼ばない)。
// Route Handler内で auth() / getCurrentUserId() を使えるようにするために必要。
export default clerkMiddleware();

// 静的ファイル（音声・動画・PDF など）は middleware を通さない。止まる授業は1本で数十個の mp3 を読むため、
// 通すと関数の実行（Fluid Active CPU）がふくらむ（2026-11-08 に Hobby の上限を超えて停止した）
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mp3|mp4|m4a|wav|ogg|webm|pdf|txt|xml)).*)",
    "/(api|trpc)(.*)",
  ],
};
