import { NextResponse } from "next/server";
import { getOshieru } from "@/lib/oshieru";
import { runScore, runTurn } from "@/lib/oshieru/ai";
import { MAX_HARU_TURNS, checkOshieruLimit, getViewer } from "@/lib/oshieru/limits";
import { endLine, isAbusive, needsSos, redirectLine, sosLine } from "@/lib/oshieru/safety";
import { AXES } from "@/lib/oshieru/score";
import type { Grade, Turn, Verdict } from "@/lib/oshieru/types";

// オシエル（AIの生徒ハルに教える）のサーバーの窓口。会話本文は保存しない・ログに出さない。
//   GET  /api/oshieru                         → { configured, tier, remaining, limit, per }
//   POST /api/oshieru { action:"turn",   unit, turns }                                   → ハルの次の発言
//   POST /api/oshieru { action:"score",  unit, turns, restatementId, verdict, hintsUsed } → 4観点の採点とマスター判定（ここで1回と数える）
//   POST /api/oshieru { action:"rejudge", ...score と同じ, prev }                          → 高性能モデルで1回だけ採点しなおし（数えない）
// ANTHROPIC_API_KEY が未設定なら 503 not_configured（画面は「準備中」と台本モードの案内を出す）。
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const NO_STORE = { "Cache-Control": "no-store" };
const MAX_TURNS = MAX_HARU_TURNS * 2 + 6;
const MAX_TEXT = 400;

function parseTurns(v: unknown): Turn[] | null {
  if (!Array.isArray(v) || v.length === 0 || v.length > MAX_TURNS) return null;
  const out: Turn[] = [];
  for (const t of v) {
    if (!t || typeof t !== "object") return null;
    const r = t as Record<string, unknown>;
    if ((r.role !== "haru" && r.role !== "student") || typeof r.text !== "string") return null;
    const text = r.text.trim().slice(0, MAX_TEXT);
    if (!text) return null;
    out.push({ role: r.role, text });
  }
  return out;
}

const fail = (error: string, status: number) => NextResponse.json({ error }, { status, headers: NO_STORE });

export async function GET(req: Request) {
  const viewer = await getViewer(req);
  const d = checkOshieruLimit(viewer, "peek");
  return NextResponse.json({ configured: !!process.env.ANTHROPIC_API_KEY, tier: d.tier, remaining: d.remaining, limit: d.limit, per: d.per }, { headers: NO_STORE });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return fail("bad_request", 400);
  }
  const u = getOshieru(String(body.unit ?? ""));
  if (!u) return fail("unknown_unit", 404);
  const turns = parseTurns(body.turns);
  if (!turns) return fail("bad_request", 400);
  const low = u.set.grade === "low";
  const action = body.action;

  if (action === "turn") {
    const last = turns[turns.length - 1];
    if (last.role !== "student") return fail("bad_request", 400);
    // 安全の決まりは、AIに送る前にここで見る（送らない）
    if (needsSos(last.text)) return NextResponse.json({ say: sosLine(low), face: "normal", state: "sos" }, { headers: NO_STORE });
    const strikes = Number(body.strikes ?? 0);
    if (isAbusive(last.text))
      return NextResponse.json(strikes >= 1 ? { say: endLine(low), face: "normal", state: "ended" } : { say: redirectLine(u.set.topic, low), face: "normal", state: "offtopic" }, { headers: NO_STORE });
    if (turns.filter((t) => t.role === "haru").length >= MAX_HARU_TURNS + 1) return NextResponse.json({ say: endLine(low), face: "normal", state: "ended" }, { headers: NO_STORE });

    if (!process.env.ANTHROPIC_API_KEY) return fail("not_configured", 503);
    const viewer = await getViewer(req);
    const d = checkOshieruLimit(viewer, "turn");
    if (!d.allowed) return NextResponse.json({ error: d.reason, remaining: d.remaining, limit: d.limit, per: d.per }, { status: 429, headers: NO_STORE });
    try {
      // 言い直しは、まちがいを残したものを6割の確率で出す
      const pick = () => {
        const flawed = u.set.restatements.filter((r) => r.flawed);
        const ok = u.set.restatements.filter((r) => !r.flawed);
        const pool = flawed.length && (Math.random() < 0.6 || !ok.length) ? flawed : ok;
        return pool[Math.floor(Math.random() * pool.length)];
      };
      const r = await runTurn(u, turns, pick);
      if (r.state === "sos") r.say = sosLine(low);
      if (r.state === "offtopic" && strikes >= 1) return NextResponse.json({ say: endLine(low), face: "normal", state: "ended" }, { headers: NO_STORE });
      return NextResponse.json(r, { headers: NO_STORE });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("oshieru turn failed:", msg); // 会話本文は出さない
      return fail(msg === "not_configured" ? "not_configured" : "failed", 502);
    }
  }

  if (action === "score" || action === "rejudge") {
    if (!process.env.ANTHROPIC_API_KEY) return fail("not_configured", 503);
    const high = action === "rejudge";
    const viewer = await getViewer(req);
    const pre = checkOshieruLimit(viewer, high ? "rejudge" : "peek");
    if (!pre.allowed) return NextResponse.json({ error: pre.reason ?? "limit_sessions", remaining: pre.remaining, limit: pre.limit, per: pre.per }, { status: 429, headers: NO_STORE });
    const verdict: Verdict | undefined = body.verdict === "pass" || body.verdict === "close" ? body.verdict : undefined;
    const hintsUsed = Math.max(0, Math.min(20, Number(body.hintsUsed ?? 0) || 0));
    try {
      const result = await runScore(u, { turns, restatementId: typeof body.restatementId === "string" ? body.restatementId : undefined, verdict, hintsUsed }, high);
      if (!high) {
        // マスター判定まで完走した回として数える（失敗した回は数えない）
        const d = checkOshieruLimit(viewer, "complete");
        if (!d.allowed) return NextResponse.json({ error: d.reason, remaining: d.remaining, limit: d.limit, per: d.per }, { status: 429, headers: NO_STORE });
        return NextResponse.json({ ...result, remaining: d.remaining }, { headers: NO_STORE });
      }
      // 採点しなおし：運営が見直せるよう、単元id・観点・評価だけを記録する（会話本文・引用は出さない）
      const prev = (body.prev && typeof body.prev === "object" ? body.prev : {}) as Record<string, unknown>;
      const g = (v: unknown): Grade | null => (v === "A" || v === "B" || v === "C" ? v : null);
      console.info(
        "oshieru rejudge:",
        JSON.stringify({ unit: u.set.unit, before: Object.fromEntries(AXES.map((a) => [a.key, g(prev[a.key])])), after: Object.fromEntries(AXES.map((a) => [a.key, result.axes[a.key].grade])), mastered: result.mastered }),
      );
      return NextResponse.json(result, { headers: NO_STORE });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error(`oshieru ${action} failed:`, msg);
      return fail(msg === "not_configured" ? "not_configured" : "failed", 502);
    }
  }

  return fail("bad_request", 400);
}
