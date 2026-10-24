import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";

// 検品: 集客の入口 (トップ・/tensaku・記事・各アプリ) が開けて、肝心の文言が出ているかを毎朝確かめる。
// 1つでも失敗したら 500 を返し、GitHub Actions の「Alert on failure」が運営者にメールで知らせる。
//   GET /internal/health/funnel + Authorization: Bearer CRON_SECRET (GitHub Actions) または ?token= (手動)
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const CHECKS: { name: string; url: string; expect: string[] }[] = [
  { name: "トップ", url: "https://app.bluespring.co.jp/", expect: ["アオハルOS"] },
  { name: "お試し添削 /tensaku", url: "https://app.bluespring.co.jp/tensaku", expect: ["AIが赤ペンを3本入れます", "無料で3つ指摘してもらう"] },
  { name: "無料で試す /try", url: "https://app.bluespring.co.jp/try", expect: ["無料"] },
  { name: "記事一覧 /guide", url: "https://app.bluespring.co.jp/guide", expect: ["/guide/"] },
  { name: "テンサクン", url: "https://essay.bluespring.co.jp/", expect: ["テンサクン"] },
  { name: "しぼりゆ", url: "https://reason.bluespring.co.jp/", expect: ["しぼりゆ"] },
  { name: "メンサツ", url: "https://interview.bluespring.co.jp/", expect: ["メンサツ"] },
];

function isCron(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret) && req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!isAdminToken(req) && !isCron(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const results = await Promise.all(
    CHECKS.map(async (c) => {
      const started = Date.now();
      try {
        const res = await fetch(c.url, { cache: "no-store", redirect: "follow", signal: AbortSignal.timeout(20_000) });
        const html = await res.text();
        const missing = c.expect.filter((e) => !html.includes(e));
        const ok = res.ok && missing.length === 0;
        return { name: c.name, url: c.url, ok, status: res.status, ms: Date.now() - started, missing };
      } catch (e) {
        return { name: c.name, url: c.url, ok: false, status: 0, ms: Date.now() - started, missing: [], error: e instanceof Error ? e.message : String(e) };
      }
    }),
  );

  // お試し添削のAIキーが入っているか (入っていないと、広告から来た人が結果を見られない)
  const previewReady = Boolean(process.env.ANTHROPIC_API_KEY);
  const ok = results.every((r) => r.ok) && previewReady;
  return NextResponse.json(
    { ok, previewReady, failed: results.filter((r) => !r.ok).map((r) => r.name), results },
    { status: ok ? 200 : 500, headers: { "Cache-Control": "no-store" } },
  );
}
