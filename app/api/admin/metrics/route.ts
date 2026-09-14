import { NextResponse } from "next/server";
import { buildMetricsReport } from "@/lib/metrics/sources";
import { isAdminToken, isAdminUser } from "@/lib/metrics/admin-auth";

// 管理用の集計API。/admin ダッシュボードと、アナリストエージェント (定期タスク) が読む。
//   GET /api/admin/metrics?days=14
// 認証: 社内ドメインのログインユーザー、または x-admin-token ヘッダー。
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: Request) {
  const byToken = isAdminToken(req);
  const user = byToken ? { ok: true, email: null } : await isAdminUser();
  if (!byToken && !user.ok) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const daysParam = Number(new URL(req.url).searchParams.get("days") ?? "14");
  const days = Number.isFinite(daysParam) ? Math.min(Math.max(Math.round(daysParam), 1), 90) : 14;

  const report = await buildMetricsReport(days);
  return NextResponse.json(report, { headers: { "Cache-Control": "no-store" } });
}
