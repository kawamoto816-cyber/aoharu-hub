import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { jstNow } from "@/lib/social/queue";
import { applyReplyRecord, exportDocText, findReplyDocs, parseReplyDoc } from "@/lib/sales/outreach";

// 法人営業エージェントが Google ドライブに書く「返信記録 YYYY-MM-DD」を取り込み、
// sales_outreach の replied_at / meeting_at を更新する (冪等: 何度呼んでも同じ結果)。
//   GET /internal/sales/replies/ingest?token=...                            (管理トークン / 手動)
//   GET /internal/sales/replies/ingest + Authorization: Bearer CRON_SECRET  (GitHub Actions)
//   GET /internal/sales/replies/ingest?date=YYYY-MM-DD  その日のファイルだけ
//   GET /internal/sales/replies/ingest?all=1            日付を指定せず、見つかる「返信記録」全件を再取り込み
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function isCron(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret) && req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!isAdminToken(req) && !isCron(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const p = new URL(req.url).searchParams;
  const all = p.get("all") === "1";
  const date = all ? undefined : p.get("date") ?? jstNow().date;

  let docs: { id: string; name: string }[];
  try {
    docs = await findReplyDocs(date);
  } catch (e) {
    return NextResponse.json({ ok: false, stage: "find", error: e instanceof Error ? e.message : String(e) }, { status: 502 });
  }

  const results: { doc: string; match: string; kind: string; status: string; company?: string | null }[] = [];
  for (const doc of docs) {
    let text: string;
    try {
      text = await exportDocText(doc.id);
    } catch (e) {
      results.push({ doc: doc.name, match: "(doc)", kind: "", status: `failed: ${e instanceof Error ? e.message : String(e)}` });
      continue;
    }
    for (const record of parseReplyDoc(text)) {
      try {
        const r = await applyReplyRecord(record);
        results.push({ doc: doc.name, match: r.match, kind: r.kind, status: r.status, company: r.matchedCompany });
      } catch (e) {
        results.push({ doc: doc.name, match: record.match, kind: record.kind, status: `failed: ${e instanceof Error ? e.message : String(e)}` });
      }
    }
  }

  return NextResponse.json(
    {
      ok: !results.some((r) => r.status.startsWith("failed")),
      date: date ?? "(all)",
      docs: docs.map((d) => d.name),
      found: results.length,
      applied: results.filter((r) => r.status === "applied").length,
      notFound: results.filter((r) => r.status === "not_found").length,
      results,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
