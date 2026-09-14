import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { isXConfigured } from "@/lib/social/x";
import { isThreadsConfigured } from "@/lib/social/threads";
import { getSetting, listRecentPosts } from "@/lib/social/store";

// 投稿エージェント用: どのチャネルが使えるか、直近の投稿ログ。
//   GET /internal/social/status?token=...
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isAdminToken(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const [posts, refreshedAt] = await Promise.all([
    listRecentPosts(30).catch((e: Error) => ({ error: e.message })),
    getSetting("threads_token_refreshed_at").catch(() => null),
  ]);
  return NextResponse.json(
    {
      generatedAt: new Date().toISOString(),
      channels: { x: isXConfigured(), threads: isThreadsConfigured() },
      threadsTokenRefreshedAt: refreshedAt,
      recentPosts: posts,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
