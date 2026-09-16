import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { hasRenderedVideo, loadShortsQueue } from "@/lib/social/shorts";

// 承認済み投稿の [shorts] ブロックを台本 JSON で返す (GitHub Actions のレンダラーが読む)。
//   GET /internal/shorts/queue?date=YYYY-MM-DD   (token または Bearer CRON_SECRET)
//   生成済み (shorts_videos に slug がある) ものは rendered: true が付く。
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function isCron(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret) && req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!isAdminToken(req) && !isCron(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const date = new URL(req.url).searchParams.get("date") ?? undefined;
  try {
    const { docs, scripts } = await loadShortsQueue(date);
    const withState = [];
    for (const s of scripts) withState.push({ ...s, rendered: await hasRenderedVideo(s.slug) });
    return NextResponse.json({ ok: true, docs, scripts: withState }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 502 });
  }
}
