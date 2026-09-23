import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { listPendingForms, recordFormResult, type FormResultStatus } from "@/lib/sales/forms";

// 法人営業のフォーム宛て自動送信 (GitHub Actions の sales-forms ワークフロー専用)。
//   GET  /internal/sales/forms?limit=30   未処理のフォーム宛て (承認済み・未送信) を古い順に返す
//   POST /internal/sales/forms            {"id": 123, "status": "sent"|"skipped"|"failed", "note": "..."} で結果を書き戻す
//   Authorization: Bearer CRON_SECRET
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function isCron(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret) && req.headers.get("authorization") === `Bearer ${secret}`;
}

const NO_STORE = { "Cache-Control": "no-store" };

export async function GET(req: Request) {
  if (!isAdminToken(req) && !isCron(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const limit = Math.min(Math.max(Number(new URL(req.url).searchParams.get("limit")) || 30, 1), 100);
  try {
    const items = await listPendingForms(limit);
    return NextResponse.json({ ok: true, count: items.length, items }, { headers: NO_STORE });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 502, headers: NO_STORE });
  }
}

export async function POST(req: Request) {
  if (!isAdminToken(req) && !isCron(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const body = (await req.json().catch(() => null)) as { id?: unknown; status?: unknown; note?: unknown } | null;
  const id = Number(body?.id);
  const status = body?.status as FormResultStatus;
  if (!Number.isInteger(id) || !["sent", "skipped", "failed"].includes(status)) {
    return NextResponse.json({ ok: false, error: "id と status (sent|skipped|failed) が必要です" }, { status: 400, headers: NO_STORE });
  }
  const note = typeof body?.note === "string" ? body.note.slice(0, 500) : null;
  try {
    const r = await recordFormResult(id, status, note);
    return NextResponse.json({ ok: true, ...r }, { headers: NO_STORE });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 502, headers: NO_STORE });
  }
}
