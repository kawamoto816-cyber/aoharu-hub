import { NextResponse } from "next/server";
import { checkAiBudget } from "@/lib/ai-budget";
import { getLecture } from "@/lib/lecture";
import { getNazeViewer } from "@/lib/naze/limits";
import { isAbusive, needsSos } from "@/lib/oshieru/safety";
import { getTsukkomi } from "@/lib/tsukkomi";
import { MAX_INPUT, writable, type TsukkomiAiResponse, type TsukkomiJudge } from "@/lib/tsukkomi/ai";
import { guardJudge } from "@/lib/tsukkomi/ai/guard";
import { countJudge, takeGlobalCall, tsukkomiRemaining } from "@/lib/tsukkomi/ai/limits";
import { mockJudge } from "@/lib/tsukkomi/ai/mock";
import { runJudge } from "@/lib/tsukkomi/ai/prompt";

// ツッコミAI（書いた直しをAIが判定）のサーバーの窓口。生徒の文は保存しない・ログに出さない。
//   GET  /api/tsukkomi                                 → { configured, tier, remaining, limit }
//   POST /api/tsukkomi { unit, id, where, fix, mock? } → { found, fixed, hint, remaining? } | { sos } | { refused }
//     unit・id は lib/tsukkomi のボケ（まちがいのある文だけ）。where＝どこがまちがい？、fix＝どう直す？（どちらも MAX_INPUT 字まで）。
//     正しい文は返さない（画面が既存データから出す）。判定できたときだけ1回と数える。
//     mock: true はAIなしの判定（文字の一致だけ・数えない）。hint の点検は本番と同じ道を通る。
// ANTHROPIC_API_KEY が未設定なら 503 not_configured（画面は「準備中」で、既存の答え合わせだけ）。
export const dynamic = "force-dynamic";
export const maxDuration = 45;

const NO_STORE = { "Cache-Control": "no-store" };
const fail = (error: string, status: number, extra: Record<string, unknown> = {}) => NextResponse.json({ error, ...extra }, { status, headers: NO_STORE });
const ok = (r: TsukkomiAiResponse) => NextResponse.json(r, { headers: NO_STORE });

const text = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, MAX_INPUT) : "");

export async function GET(req: Request) {
  const viewer = await getNazeViewer(req);
  const { limit, remaining } = await tsukkomiRemaining(viewer);
  return NextResponse.json({ configured: !!process.env.ANTHROPIC_API_KEY, tier: viewer.tier, remaining, limit }, { headers: NO_STORE });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return fail("bad_request", 400);
  }
  const unit = String(body.unit ?? "");
  const b = getTsukkomi(unit)?.find((x) => x.id === String(body.id ?? ""));
  if (!b || !writable(b)) return fail("unknown_item", 404);
  const where = text(body.where);
  const fix = text(body.fix);
  if (!where && !fix) return fail("bad_request", 400);
  const mock = body.mock === true;

  // 安全の決まりは、AIに送る前にここで見る（送らない・数えない）
  const both = `${where}\n${fix}`;
  if (needsSos(both)) return ok({ sos: true });
  if (isAbusive(both)) return ok({ refused: true });

  let judge: TsukkomiJudge;
  let remaining: number | undefined;
  if (mock) judge = mockJudge(b, where, fix);
  else {
    if (!process.env.ANTHROPIC_API_KEY) return fail("not_configured", 503);
    const viewer = await getNazeViewer(req);
    const r = await tsukkomiRemaining(viewer);
    if (r.remaining <= 0) return fail("limit", 429, { remaining: 0, limit: r.limit });
    // 運営の月のAI予算をこえたら、登録なし・無料の分から止める
    if (!(await checkAiBudget(viewer.tier)).allowed) return fail("limit_budget", 429, { remaining: 0 });
    try {
      judge = await runJudge(getLecture(unit), b, where, fix, viewer.userId, takeGlobalCall);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("tsukkomi judge failed:", msg); // 生徒の文は出さない
      if (msg === "limit_daily") return fail("limit_daily", 429);
      return fail(msg === "not_configured" ? "not_configured" : msg === "bad_output" ? "unjudged" : "failed", msg === "not_configured" ? 503 : 502);
    }
    // 判定を返せた回だけを数える
    remaining = await countJudge(viewer, unit, b.id);
  }

  // hint に正解（正しい語句・正しい文・わけ）が入っていたら、定型の hint に差しかえる
  const g = guardJudge(judge, b, [where, fix]);
  if (g.replaced) console.info("tsukkomi guard replaced:", JSON.stringify({ unit, id: b.id })); // 単元idと問題idだけ
  return ok({ found: g.found, fixed: g.fixed, hint: g.hint, remaining, mock: mock || undefined });
}
