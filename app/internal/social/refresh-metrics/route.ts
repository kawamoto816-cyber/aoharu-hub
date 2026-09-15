import { NextResponse } from "next/server";
import { isAdminToken, isAdminUser } from "@/lib/metrics/admin-auth";
import { refreshSocialMetrics } from "@/lib/social/metrics";

// 自社SNS投稿の反応を各APIから取り込む。
//   GET /internal/social/refresh-metrics?token=...   (定期タスク / Vercel Cron / 管理者ログイン)
export const dynamic = "force-dynamic";
export const maxDuration = 120;

function isCron(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret) && req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  const allowed = isAdminToken(req) || isCron(req) || (await isAdminUser()).ok;
  if (!allowed) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  try {
    const r = await refreshSocialMetrics();
    return NextResponse.json({ ok: true, ...r }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 502 });
  }
}
