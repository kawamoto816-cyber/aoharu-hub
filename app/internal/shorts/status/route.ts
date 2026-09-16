import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { listShortsVideos } from "@/lib/social/shorts";

// 生成済みショート動画の一覧。GET /internal/shorts/status?token=...
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isAdminToken(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  try {
    return NextResponse.json({ videos: await listShortsVideos(30) }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 502 });
  }
}
