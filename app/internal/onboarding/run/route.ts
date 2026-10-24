import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { runOnboarding } from "@/lib/onboarding/emails";

// 登録ユーザーへのお知らせメール (lib/onboarding/emails.ts) を1回まわす。冪等。
//   GET /internal/onboarding/run + Authorization: Bearer CRON_SECRET (GitHub Actions 18:10 JST)
// 夜遅く・早朝には送らない (日本時間 9〜21時台のみ)。
export const dynamic = "force-dynamic";
export const maxDuration = 120;

function isCron(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret) && req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!isAdminToken(req) && !isCron(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const hour = new Date(Date.now() + 9 * 3600_000).getUTCHours();
  if (hour < 9 || hour > 21) return NextResponse.json({ ok: true, skipped: "outside_hours", hourJst: hour });
  try {
    const r = await runOnboarding();
    return NextResponse.json({ ok: r.errors.length === 0, ...r }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
