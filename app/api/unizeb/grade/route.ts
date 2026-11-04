import { NextResponse } from "next/server";
import { cardInfo, getEnshu } from "@/lib/unizeb";
import { canUseCard, canUseEnshu } from "@/lib/unizeb/access";
import type { CritScore, GradeResult } from "@/lib/unizeb/client";
import { buildEnshuPrompt, finishGrade, parseGrade } from "@/lib/unizeb/enshuKit";
import { GRADE_MODEL, UzError, callClaude, checkGradeQuota, logUse, serverViewer, type UzViewer } from "@/lib/unizeb/server";
import { JSON_RETRY_SUFFIX, buildCardPrompt, getCardData, parseCardGrade, scoreCard } from "@/lib/unizeb/v3/prompt";

// POST /api/unizeb/grade：AI採点。依頼文はサーバーで作る（画面からは答えだけを受け取る）。合計と合否もサーバーが計算する。
//   { kind:"card",  id, answers }            answers に _f・_as・_seed・_short（v3 エンジンの生データ）
//   { kind:"enshu", id, answers, variant }
// 登録なしは 404（画面は「見本の採点」に切りかわる）。上限・予算・準備中は 200 で { crit:[], error }（画面にそのまま出す）。
// 回数は「採点1回＝1回」。JSON が崩れたら短い形で1回だけ頼み直す（数えるのは1回）。
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const NO_STORE = { "Cache-Control": "no-store" };
const MAX_ANSWER = 4000;
const say = (error: string) => NextResponse.json({ crit: [], error } satisfies GradeResult, { headers: NO_STORE });

function cleanAnswers(v: unknown): Record<string, string> | null {
  if (!v || typeof v !== "object") return null;
  const out: Record<string, string> = {};
  let total = 0;
  for (const [k, x] of Object.entries(v as Record<string, unknown>)) {
    const s = typeof x === "string" ? x : x == null ? "" : String(x);
    total += s.length;
    if (s.length > MAX_ANSWER * 4 || total > MAX_ANSWER * 20) return null;
    out[k] = s;
  }
  return out;
}

const parseJ = (s: string | undefined, d: unknown) => {
  try {
    return s ? JSON.parse(s) : d;
  } catch {
    return d;
  }
};

// 演習の返事は長い（最大で約1,450字）ので 3000、カードは 2000
async function ask(v: UzViewer, prompt: string, action: string, maxTokens = 2000): Promise<string> {
  return callClaude({ model: GRADE_MODEL(), prompt, maxTokens, action, viewer: v });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400, headers: NO_STORE });
  }
  const answers = cleanAnswers(body.answers);
  const id = String(body.id ?? "");
  if (!answers || !id) return NextResponse.json({ error: "bad_request" }, { status: 400, headers: NO_STORE });

  const v = await serverViewer();
  if (!v.userId) return NextResponse.json({ error: "guest" }, { status: 404, headers: NO_STORE });

  try {
    if (body.kind === "card") {
      const info = cardInfo(id);
      const card = getCardData(id);
      if (!info || !card) return NextResponse.json({ error: "unknown" }, { status: 404, headers: NO_STORE });
      if (!canUseCard(v.plan, info.lv)) return say("このカードは Max のプランで採点できます。");
      const q = await checkGradeQuota(v);
      if (!q.allowed) return q.reason === "guest" ? NextResponse.json({ error: "guest" }, { status: 404, headers: NO_STORE }) : say(q.reason!);
      const f = parseJ(answers._f, {});
      const as = parseJ(answers._as, {});
      const seed = parseJ(answers._seed, null);
      const short = answers._short === "1";
      let g;
      try {
        g = parseCardGrade(await ask(v, buildCardPrompt(card, f, as, seed, { short }), "grade"), card);
      } catch (e) {
        if (e instanceof UzError) throw e;
        g = parseCardGrade(await ask(v, buildCardPrompt(card, f, as, seed, { short: true }) + JSON_RETRY_SUFFIX, "grade_retry"), card);
      }
      const s = scoreCard(card, g.crit, g.knockout);
      const crit: CritScore[] = g.crit.map((c, i) => ({ key: `_all-${i + 1}`, score: c.score as CritScore["score"], quote: c.quote, good: c.good, fix: c.fix }));
      await logUse(v.userId, "grade", { kind: "card", id, total: s.total, passed: s.pass });
      const result: GradeResult = {
        crit,
        ko: g.knockout.hit ? g.knockout.reason : undefined,
        rewrite: g.rewrite ? { key: `_all-${g.rewrite.crit}`, before: g.rewrite.before, after: g.rewrite.after } : undefined,
        praise: g.praise || undefined,
        total: s.total,
        passed: s.pass,
      };
      return NextResponse.json(result, { headers: NO_STORE });
    }

    if (body.kind === "enshu") {
      const e = getEnshu(id);
      if (!e) return NextResponse.json({ error: "unknown" }, { status: 404, headers: NO_STORE });
      if (!canUseEnshu(v.plan, e.lv)) return say("この演習は Max のプランで採点できます。");
      const q = await checkGradeQuota(v);
      if (!q.allowed) return q.reason === "guest" ? NextResponse.json({ error: "guest" }, { status: 404, headers: NO_STORE }) : say(q.reason!);
      const vi = Number.isInteger(body.variant) ? Number(body.variant) : 0;
      const skillName = (sid: string) => cardInfo(sid)?.name ?? sid;
      let ai: GradeResult;
      try {
        ai = parseGrade(await ask(v, buildEnshuPrompt(e, vi, answers, { skillName }), "grade", 3000), e);
      } catch (err) {
        if (err instanceof UzError) throw err;
        ai = parseGrade(await ask(v, buildEnshuPrompt(e, vi, answers, { short: true, skillName }) + JSON_RETRY_SUFFIX, "grade_retry", 3000), e);
      }
      const r = finishGrade(e, vi, answers, ai);
      await logUse(v.userId, "grade", { kind: "enshu", id, total: r.total, passed: r.passed });
      return NextResponse.json(r, { headers: NO_STORE });
    }
    return NextResponse.json({ error: "bad_request" }, { status: 400, headers: NO_STORE });
  } catch (e) {
    if (e instanceof UzError) {
      if (e.code === "not_configured") return NextResponse.json({ error: "not_configured" }, { status: 404, headers: NO_STORE });
      if (e.code === "budget") return say("今月のAI採点の枠がいっぱいになりました。無料の分は来月また使えます。");
    }
    console.warn("[unizeb/grade] failed:", e instanceof Error ? e.message : e);
    return say("採点できませんでした。少し待ってからもう一度お試しください。");
  }
}
