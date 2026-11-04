import { NextResponse } from "next/server";
import { checkAiBudget } from "@/lib/ai-budget";
import { getLecture } from "@/lib/lecture";
import { MAX_EXCHANGES, MAX_INPUT, STUCK_LIMIT, isLowUnit, isStuck, lines, plain, stuckCount, type NazeResponse, type NazeTurn } from "@/lib/naze";
import { allowedOf, forbiddenOf, guardReply } from "@/lib/naze/guard";
import { getNazeViewer, issueSession, nazeRemaining, startConversation, takeGlobalCall, consumeSession } from "@/lib/naze/limits";
import { mockReply } from "@/lib/naze/mock";
import { pickSection, runNaze } from "@/lib/naze/prompt";
import { isAbusive, needsSos, sosLine } from "@/lib/oshieru/safety";

// なぜなぜ先生（問い返しで考えさせるAI）のサーバーの窓口。会話本文は保存しない・ログに出さない。
//   GET  /api/naze                                → { configured, tier, remaining, limit }
//   POST /api/naze { unit, turns, session?, mock? } → { reply, guide?: { sectionIndex, title }, ended?, sos?, session?, remaining? }
//     turns は [{ role: "student" | "sensei", text }]。最初は生徒の「ここがわからない」1つ（ここで1回と数え、session の札を渡す）。
//     2回目からは session を送り返す。生徒の発言は MAX_EXCHANGES 回まで。
//     mock: true は台本モード（AIなし・数えない）。安全の決まり・案内・答えの点検は本番と同じ道を通る。
// ANTHROPIC_API_KEY が未設定なら 503 not_configured（画面は「準備中」）。
export const dynamic = "force-dynamic";
export const maxDuration = 40;

const NO_STORE = { "Cache-Control": "no-store" };
const fail = (error: string, status: number, extra: Record<string, unknown> = {}) => NextResponse.json({ error, ...extra }, { status, headers: NO_STORE });
const ok = (r: NazeResponse) => NextResponse.json(r, { headers: NO_STORE });

function parseTurns(v: unknown): NazeTurn[] | null {
  if (!Array.isArray(v) || v.length === 0 || v.length > MAX_EXCHANGES * 2 + 2) return null;
  const out: NazeTurn[] = [];
  for (const t of v) {
    if (!t || typeof t !== "object") return null;
    const r = t as Record<string, unknown>;
    if ((r.role !== "student" && r.role !== "sensei") || typeof r.text !== "string") return null;
    const text = r.text.trim().slice(0, r.role === "student" ? MAX_INPUT : 400);
    if (!text) return null;
    out.push({ role: r.role, text });
  }
  if (out[0].role !== "student" || out[out.length - 1].role !== "student") return null;
  return out;
}

export async function GET(req: Request) {
  const viewer = await getNazeViewer(req);
  const { limit, remaining } = await nazeRemaining(viewer);
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
  const lec = getLecture(unit);
  if (!lec) return fail("unknown_unit", 404);
  const turns = parseTurns(body.turns);
  if (!turns) return fail("bad_request", 400);
  const mock = body.mock === true;
  const low = isLowUnit(unit);
  const student = turns.filter((t) => t.role === "student");
  const last = student[student.length - 1].text;

  // 安全の決まりは、AIに送る前にここで見る（送らない・数えない）
  if (needsSos(last)) return ok({ reply: sosLine(low), sos: true, ended: true });
  if (isAbusive(last)) return ok(student.filter((t) => isAbusive(t.text)).length >= 2 ? { reply: lines.end(low), ended: true } : { reply: lines.offtopic(low) });
  if (student.length > MAX_EXCHANGES) return ok({ reply: lines.end(low), ended: true });

  const starting = student.length === 1;
  let session: string | undefined;
  let remaining: number | undefined;
  let reply: string;
  let section: number | null = null;
  let offtopic = false;

  if (mock) {
    section = pickSection(lec, student.map((t) => t.text));
    reply = mockReply(turns, lec.sections.map((s) => s.heading), section, low);
  } else {
    if (!process.env.ANTHROPIC_API_KEY) return fail("not_configured", 503);
    const viewer = await getNazeViewer(req);
    if (starting) {
      const r = await nazeRemaining(viewer);
      if (r.remaining <= 0) return fail("limit", 429, { remaining: 0, limit: r.limit });
    } else if (!consumeSession(body.session, unit)) return fail("bad_session", 400);
    // 運営の月のAI予算をこえたら、登録なし・無料の分から止める
    if (!(await checkAiBudget(viewer.tier)).allowed) return fail("limit_budget", 429, { remaining: 0 });
    if (!takeGlobalCall()) return fail("limit_daily", 429);
    try {
      const r = await runNaze(lec, turns, low, viewer.userId);
      reply = r.reply;
      section = r.section;
      offtopic = r.offtopic;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("naze turn failed:", msg); // 会話本文は出さない
      return fail(msg === "not_configured" ? "not_configured" : "failed", 502);
    }
    if (starting) {
      // 返事を作れた会話だけを数える（失敗した回は数えない）
      const s = await startConversation(viewer, unit);
      if (!s.allowed) return fail("limit", 429, { remaining: 0, limit: s.limit });
      remaining = s.remaining;
      session = issueSession(unit);
    }
  }

  if (offtopic) reply = lines.offtopic(low);
  else {
    // 答えを言わない：出力に答えの文がほぼそのまま入っていたら、捨てて定型の問いに差しかえる
    const g = guardReply(reply, forbiddenOf(lec), { allowed: [...allowedOf(lec), ...student.map((t) => t.text)], low });
    if (g.replaced) console.info("naze guard replaced:", JSON.stringify({ unit })); // 単元idだけ
    reply = g.text;
  }

  const res: NazeResponse = { reply, session, remaining, mock: mock || undefined };
  // 3回つまったとき（1回だけ）、いちばん近い節の見出しとリンクだけを出す（答えそのものは言わない）
  if (!offtopic && !starting && isStuck(last) && stuckCount(turns) === STUCK_LIMIT) {
    const i = section ?? pickSection(lec, student.map((t) => t.text));
    res.guide = { sectionIndex: i, title: plain(lec.sections[i].heading) };
  }
  if (student.length >= MAX_EXCHANGES) res.ended = true;
  return ok(res);
}
