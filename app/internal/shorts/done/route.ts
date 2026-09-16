import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { upsertShortsVideo } from "@/lib/social/shorts";

// レンダリング完了の通知 (GitHub Actions → サーバー)。shorts_videos に記録する。
//   POST /internal/shorts/done  (Bearer CRON_SECRET)  body: { slug, title, description, duration_sec, speaker, video_url, source }
export const dynamic = "force-dynamic";

function isCron(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret) && req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function POST(req: Request) {
  if (!isAdminToken(req) && !isCron(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body.slug !== "string" || typeof body.video_url !== "string") {
    return NextResponse.json({ error: "slug と video_url は必須です" }, { status: 400 });
  }
  try {
    await upsertShortsVideo({
      slug: body.slug,
      title: String(body.title ?? body.slug),
      description: String(body.description ?? ""),
      duration_sec: typeof body.duration_sec === "number" ? body.duration_sec : null,
      speaker: typeof body.speaker === "string" ? body.speaker : null,
      video_url: body.video_url,
      status: "rendered",
      source: typeof body.source === "string" ? body.source : null,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 502 });
  }
}
