import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { runOutreach } from "@/lib/sales/outreach";

// 法人営業の「送信承認 YYYY-MM-DD」ドキュメントを読み、[email] を送信、[form] を手動対象として記録する (冪等)。
//   GET /internal/sales/run?token=...            直近5日以内に作られた承認分 (二重送信は90日ルールで防止)
//   GET /internal/sales/run?token=...&days=N     直近N日以内の承認分
//   GET /internal/sales/run?token=...&date=YYYY-MM-DD  その日付の名前の承認分だけ
//   GET /internal/sales/run?token=...&dry=1      送らずに対象を表示
//   Authorization: Bearer CRON_SECRET でも可 (GitHub Actions)
export const dynamic = "force-dynamic";
export const maxDuration = 120;

function isCron(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret) && req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!isAdminToken(req) && !isCron(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const p = new URL(req.url).searchParams;
  try {
    const result = await runOutreach({
      date: p.get("date") ?? undefined,
      days: p.get("days") ? Number(p.get("days")) || undefined : undefined,
      dry: p.get("dry") === "1" });
    const failed = result.results.filter((r) => r.status === "failed").length;
    return NextResponse.json(
      {
        ok: failed === 0,
        ...result,
        sent: result.results.filter((r) => r.status === "sent").length,
        manual: result.results.filter((r) => r.status === "manual").length,
        alreadySent: result.results.filter((r) => r.status === "already_sent").length,
        failed,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, stage: "load", error: message }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
