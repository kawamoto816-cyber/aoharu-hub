import { NextResponse } from "next/server";
import { examLimit } from "@/lib/exam/access";
import { countMonthlyStarts, examViewer, logStart } from "@/lib/exam/server";

// POST /api/exam/start { spec, mode, seed } → { ok, plan, limit, used, remaining }
//   無料登録（ログイン中の free）だけ、今月の回数を数えてから usage_log（app_key "exam"・action "start"）に1件記録する。
//   上限に達していれば 429 { ok:false, remaining:0 }。数えられない・記録できないとき（Supabase 不通）は通す（ok:true, remaining:null）。
//   guest は ok:true だけ返す（回数は画面が端末で数える）。pro・max は無制限。
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    /* 中身がなくても数える */
  }
  const v = await examViewer();
  const limit = examLimit(v.plan);
  if (v.plan !== "free" || !v.userId || limit === null) return NextResponse.json({ ok: true, plan: v.plan, limit, used: null, remaining: null }, { headers: NO_STORE });

  let used: number;
  try {
    used = await countMonthlyStarts(v.userId);
  } catch (e) {
    console.warn("[exam] count failed:", e instanceof Error ? e.message : e);
    return NextResponse.json({ ok: true, plan: v.plan, limit, used: null, remaining: null }, { headers: NO_STORE });
  }
  if (used >= limit) return NextResponse.json({ ok: false, plan: v.plan, limit, used, remaining: 0 }, { status: 429, headers: NO_STORE });

  const metadata = {
    spec: typeof body.spec === "string" ? body.spec.slice(0, 120) : null,
    mode: typeof body.mode === "string" ? body.mode.slice(0, 20) : null,
    seed: typeof body.seed === "number" && Number.isFinite(body.seed) ? body.seed : null,
  };
  try {
    await logStart(v.userId, metadata);
  } catch (e) {
    console.warn("[exam] log failed:", e instanceof Error ? e.message : e);
    return NextResponse.json({ ok: true, plan: v.plan, limit, used, remaining: null }, { headers: NO_STORE });
  }
  return NextResponse.json({ ok: true, plan: v.plan, limit, used: used + 1, remaining: Math.max(0, limit - used - 1) }, { headers: NO_STORE });
}
