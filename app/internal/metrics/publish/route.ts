import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { publishMetricsDoc } from "@/lib/metrics/publish";

// 指標レポートを Google ドキュメント「指標レポート YYYY-MM-DD」として承認キューフォルダに書き出す。
//   GET /internal/metrics/publish?token=...        (管理トークン)
//   GET /internal/metrics/publish  + Authorization: Bearer CRON_SECRET  (GitHub Actions / Vercel Cron)
// アナリスト・編集長の定期タスクは、このドキュメントを Google Drive から読む (ページ取得の許可待ちを避ける)。
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function isCron(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret) && req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!isAdminToken(req) && !isCron(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const daysParam = Number(new URL(req.url).searchParams.get("days") ?? "14");
  const days = Number.isFinite(daysParam) ? Math.min(Math.max(Math.round(daysParam), 1), 90) : 14;
  try {
    const result = await publishMetricsDoc(days);
    return NextResponse.json({ ok: true, ...result }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: message }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
