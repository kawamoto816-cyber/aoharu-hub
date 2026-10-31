import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { runOnboarding } from "@/lib/onboarding/emails";

// 登録ユーザーへのお知らせメール (lib/onboarding/emails.ts) を1回まわす。冪等。
//   GET /internal/onboarding/run + Authorization: Bearer CRON_SECRET (GitHub Actions 18:10 JST)
// 夜遅く・早朝には送らない (日本時間 9〜20時台のみ。受け取る人の多くが高校生なので21時以降は避ける)。
// GitHub の定時実行は大きく遅れるので、ほかの定時処理のついでにも呼ばれる (冪等なので何度呼んでもよい)。
export const dynamic = "force-dynamic";
export const maxDuration = 120;

function isCron(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret) && req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!isAdminToken(req) && !isCron(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const hour = new Date(Date.now() + 9 * 3600_000).getUTCHours();
  if (hour < 9 || hour > 20) return NextResponse.json({ ok: true, skipped: "outside_hours", hourJst: hour });
  try {
    const r = await runOnboarding();
    // 実行結果は公開リポジトリの GitHub Actions ログに残るので、誰に送ったか (ユーザーID) は返さず件数だけにする
    const sent: Record<string, number> = {};
    for (const s of r.sent) sent[s.step] = (sent[s.step] ?? 0) + 1;
    const errors = r.errors.map((e) => e.replace(/^user_[A-Za-z0-9]+: /, ""));
    return NextResponse.json({ ok: r.errors.length === 0, dryRun: r.dryRun, checked: r.checked, sent, skipped: r.skipped, errors }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
