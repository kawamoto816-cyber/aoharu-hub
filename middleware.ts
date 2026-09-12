import { clerkMiddleware } from "@clerk/nextjs/server";

// 今回はAI生成APIルート側 (app/api/chat/route.ts) で個別に権限チェックする方針のため、
// ここではページ全体を保護しない (auth.protect()は呼ばない)。
// Route Handler内で auth() / getCurrentUserId() を使えるようにするために必要。
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
