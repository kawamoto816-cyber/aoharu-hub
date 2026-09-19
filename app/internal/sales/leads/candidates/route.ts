import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { generateCandidateDoc } from "@/lib/sales/leads";

// 未着手の見込み先を、パターン別テンプレートで提案文まで組み立てて
// 「テンプレート提案 YYYY-MM-DD」としてDriveに書き出す (法人営業エージェントが朝読みに行く)。
//   GET /internal/sales/leads/candidates?token=...
// Authorization: Bearer CRON_SECRET でも可 (GitHub Actions)。エージェントの実行前に呼ぶこと。
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function isCron(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret) && req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!isAdminToken(req) && !isCron(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const limit = Number(new URL(req.url).searchParams.get("limit") ?? "150") || 150;
  try {
    const result = await generateCandidateDoc(limit);
    return NextResponse.json({ ok: true, ...result }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 502 });
  }
}
