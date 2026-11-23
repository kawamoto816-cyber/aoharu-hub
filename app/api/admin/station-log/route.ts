import { NextResponse } from "next/server";
import { isAdminToken, isAdminUser } from "@/lib/metrics/admin-auth";
import { loadSummary, rangeOf } from "@/lib/station/log-store";

// 学習便の学習ログ（社内用）。日付と時刻（日本時間）で区切って、人ごとの学習量を返す。
//   GET /api/admin/station-log?date=2027-01-13&from=19:30&to=21:00            → JSON
//   GET /api/admin/station-log?date=2027-01-13&from=19:30&to=21:00&format=csv → CSV
// 認証: 社内ドメインのログインユーザー、または x-admin-token ヘッダー。
export const dynamic = "force-dynamic";

const cell = (v: string | number) => {
  const s = String(v);
  // 表計算ソフトで式として動かないよう、先頭が = + - @ のときは ' を付ける
  const safe = /^[=+\-@]/.test(s) ? `'${s}` : s;
  return /[",\n]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
};

export async function GET(req: Request) {
  const byToken = isAdminToken(req);
  const user = byToken ? { ok: true } : await isAdminUser();
  if (!byToken && !user.ok) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const params = new URL(req.url).searchParams;
  const range = rangeOf(params.get("date") ?? undefined, params.get("from") ?? undefined, params.get("to") ?? undefined);
  const rows = await loadSummary(range.fromIso, range.toIso);
  if (rows === null) return NextResponse.json({ error: "unavailable" }, { status: 503 });

  if (params.get("format") === "csv") {
    const head = ["ニックネーム", "学年", "解いた数", "正解した数", "単元模試の回数", "学びポイント", "単元", "ユーザーID"];
    const lines = [head.join(","), ...rows.map((r) => [r.nick, r.grade, r.solved, r.correct, r.moshi, r.points, r.units.join(" / "), r.user_id].map(cell).join(","))];
    return new NextResponse("﻿" + lines.join("\r\n"), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="gakushubin-${range.date}-${range.from.replace(":", "")}-${range.to.replace(":", "")}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  }
  return NextResponse.json({ range, rows }, { headers: { "Cache-Control": "no-store" } });
}
