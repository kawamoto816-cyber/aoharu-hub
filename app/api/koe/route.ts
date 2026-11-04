import { NextResponse } from "next/server";
import { checkAiBudget } from "@/lib/ai-budget";
import { getLecture } from "@/lib/lecture";
import { MAX_TEXT, MIN_TEXT, type KoeJudge, type KoeResponse } from "@/lib/koe";
import { guardNext } from "@/lib/koe/guard";
import { judge, koeConfigured, koeProvider } from "@/lib/koe/judge";
import { countJudge, koeRemaining, takeGlobalCall } from "@/lib/koe/limits";
import { mockJudge } from "@/lib/koe/mock";
import { keyPoints } from "@/lib/koe/points";
import { isLowUnit } from "@/lib/naze";
import { getNazeViewer } from "@/lib/naze/limits";
import { isAbusive, needsSos } from "@/lib/oshieru/safety";

// 声で説明（ファインマン法・試作）のサーバーの窓口。受け取るのは起こした文字だけ（音声は受けない）。説明の文は保存しない・ログに出さない。
//   GET  /api/koe                     → { configured, provider, tier, remaining, limit }
//   POST /api/koe { unit, text, mock? } → { points: [{ index, section, label, words, status }], mistake?, next, remaining? } | { sos } | { refused }
//     text は MIN_TEXT〜MAX_TEXT 字。要点表はレクチャーのデータから機械的に作る（lib/koe/points.ts）。判定できたときだけ1回と数える。
//     mock: true はAIなしの判定（文字の一致だけ・数えない）。一言の点検は本番と同じ道を通る。
// 判定のプロバイダの鍵がなければ 503 not_configured（画面は「準備中」）。
export const dynamic = "force-dynamic";
export const maxDuration = 45;

const NO_STORE = { "Cache-Control": "no-store" };
const fail = (error: string, status: number, extra: Record<string, unknown> = {}) => NextResponse.json({ error, ...extra }, { status, headers: NO_STORE });
const ok = (r: KoeResponse) => NextResponse.json(r, { headers: NO_STORE });

export async function GET(req: Request) {
  const viewer = await getNazeViewer(req);
  const { limit, remaining } = await koeRemaining(viewer);
  const provider = koeProvider();
  return NextResponse.json({ configured: koeConfigured(provider), provider, tier: viewer.tier, remaining, limit }, { headers: NO_STORE });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return fail("bad_request", 400);
  }
  const unit = String(body.unit ?? "");
  const lec = getLecture(unit);
  if (!lec) return fail("unknown_unit", 404);
  const text = typeof body.text === "string" ? body.text.replace(/\s+/g, " ").trim().slice(0, MAX_TEXT) : "";
  if (text.replace(/\s/g, "").length < MIN_TEXT) return fail("too_short", 400);
  const mock = body.mock === true;
  const low = isLowUnit(unit);
  const points = keyPoints(lec);
  if (!points.length) return fail("unknown_unit", 404);

  // 安全の決まりは、AIに送る前にここで見る（送らない・数えない）
  if (needsSos(text)) return ok({ sos: true });
  if (isAbusive(text)) return ok({ refused: true });

  let j: KoeJudge;
  let remaining: number | undefined;
  if (mock) j = mockJudge(points, text, low);
  else {
    const provider = koeProvider();
    if (!koeConfigured(provider)) return fail("not_configured", 503);
    const viewer = await getNazeViewer(req);
    const r = await koeRemaining(viewer);
    if (r.remaining <= 0) return fail("limit", 429, { remaining: 0, limit: r.limit });
    // 運営の月のAI予算をこえたら、登録なし・無料の分から止める
    if (!(await checkAiBudget(viewer.tier)).allowed) return fail("limit_budget", 429, { remaining: 0 });
    try {
      j = await judge(provider)({ lec, points, text, low, userId: viewer.userId, beforeCall: takeGlobalCall });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("koe judge failed:", msg); // 説明の文は出さない
      if (msg === "limit_daily") return fail("limit_daily", 429);
      return fail(msg === "not_configured" ? "not_configured" : msg === "bad_output" ? "unjudged" : "failed", msg === "not_configured" ? 503 : 502);
    }
    // 判定を返せた回だけを数える
    remaining = await countJudge(viewer, unit);
  }

  // 次の一言に答えの文が入っていたら、定型の一言に差しかえる
  const g = guardNext(j, lec, points, text, low);
  if (g.replaced) console.info("koe guard replaced:", JSON.stringify({ unit })); // 単元idだけ
  return ok({
    points: points.map((p, i) => ({ index: p.index, section: p.section, label: p.label, words: p.words, status: g.status[i] })),
    mistake: g.mistake,
    next: g.next,
    remaining,
    mock: mock || undefined,
  });
}
