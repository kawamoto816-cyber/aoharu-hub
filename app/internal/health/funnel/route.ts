import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";

// 検品: 集客の入口 (トップ・/tensaku・記事・各アプリ) が開けて、肝心の文言が出ているかを毎朝確かめる。
// 1つでも失敗したら 500 を返し、GitHub Actions の「Alert on failure」が運営者にメールで知らせる。
//   GET /internal/health/funnel + Authorization: Bearer CRON_SECRET (GitHub Actions) または ?token= (手動)
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const CHECKS: { name: string; url: string; expect: string[] }[] = [
  { name: "トップ", url: "https://app.bluespring.co.jp/", expect: ["アオハルOS"] },
  { name: "お試し添削 /tensaku", url: "https://app.bluespring.co.jp/tensaku", expect: ["AIが赤ペンを3本入れます", "無料で3つ指摘してもらう"] },
  { name: "無料で試す /try", url: "https://app.bluespring.co.jp/try", expect: ["無料"] },
  { name: "記事一覧 /guide", url: "https://app.bluespring.co.jp/guide", expect: ["/guide/"] },
  { name: "テンサクン", url: "https://essay.bluespring.co.jp/", expect: ["テンサクン"] },
  { name: "しぼりゆ", url: "https://reason.bluespring.co.jp/", expect: ["しぼりゆ"] },
  { name: "メンサツ", url: "https://interview.bluespring.co.jp/", expect: ["メンサツ"] },
  { name: "キャリキャラ", url: "https://career.bluespring.co.jp/", expect: ["キャリキャラ"] },
  { name: "16カラー診断", url: "https://color.bluespring.co.jp/", expect: ["16カラー診断"] },
  { name: "ジコアピ", url: "https://jkap.bluespring.co.jp/", expect: ["ジコアピ"] },
  { name: "ジココーテー", url: "https://kotei.bluespring.co.jp/", expect: ["ジココーテー"] },
  { name: "キャリデザ", url: "https://cd.bluespring.co.jp/", expect: ["キャリデザ"] },
  { name: "コーポレートスコープ", url: "https://corporate-scope.bluespring.co.jp/", expect: ["コーポレートスコープ"] },
  { name: "キャンパスコープ", url: "https://campus.bluespring.co.jp/", expect: ["キャンパスコープ"] },
  { name: "EduFit", url: "https://edufit.bluespring.co.jp/", expect: ["EduFit"] },
];

// 各アプリのAIが実際に答えるか (各アプリの /api/health が Gemini に短い質問を1回投げる)。
// Google側のモデル廃止・改名、APIキー、無料枠の問題で「画面は開くがAIが動かない」状態を見つける。
// HEALTH_TOKEN (Vercel の共有環境変数。ハブと各アプリで同じ値) が未設定の間は、この点検は飛ばす。
const AI_CHECKS: { name: string; origin: string }[] = [
  { name: "テンサクン", origin: "https://essay.bluespring.co.jp" },
  { name: "しぼりゆ", origin: "https://reason.bluespring.co.jp" },
  { name: "メンサツ", origin: "https://interview.bluespring.co.jp" },
  { name: "16カラー診断", origin: "https://color.bluespring.co.jp" },
  { name: "ジコアピ", origin: "https://jkap.bluespring.co.jp" },
  { name: "ジココーテー", origin: "https://kotei.bluespring.co.jp" },
  { name: "キャリデザ", origin: "https://cd.bluespring.co.jp" },
  { name: "コーポレートスコープ", origin: "https://corporate-scope.bluespring.co.jp" },
  { name: "キャンパスコープ", origin: "https://campus.bluespring.co.jp" },
  { name: "EduFit", origin: "https://edufit.bluespring.co.jp" },
];

async function checkAi(token: string) {
  return Promise.all(
    AI_CHECKS.map(async (c) => {
      try {
        const res = await fetch(`${c.origin}/api/health`, {
          cache: "no-store",
          headers: { Authorization: `Bearer ${token}` },
          signal: AbortSignal.timeout(45_000),
        });
        const body = (await res.json().catch(() => ({}))) as { ok?: boolean; model?: string; error?: string; errors?: unknown };
        return { name: `${c.name} のAI`, ok: res.ok && body.ok === true, status: res.status, model: body.model ?? null, detail: body.ok ? undefined : body.error ?? body.errors };
      } catch (e) {
        return { name: `${c.name} のAI`, ok: false, status: 0, model: null, detail: e instanceof Error ? e.message : String(e) };
      }
    }),
  );
}

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
  const healthToken = process.env.HEALTH_TOKEN;
  const ai = healthToken ? await checkAi(healthToken) : [];
  const ok = results.every((r) => r.ok) && ai.every((r) => r.ok) && previewReady;
  return NextResponse.json(
    {
      ok,
      previewReady,
      aiChecked: Boolean(healthToken),
      failed: [...results, ...ai].filter((r) => !r.ok).map((r) => r.name),
      results,
      ai,
    },
    { status: ok ? 200 : 500, headers: { "Cache-Control": "no-store" } },
  );
}
