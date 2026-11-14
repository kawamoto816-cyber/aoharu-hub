import { NextResponse } from "next/server";
import { getCurrentUserId, logUsage } from "@/lib/aoharu-entitlements";
import { FULL_MAX_CHARS, runFull } from "@/lib/tensaku/full";
import { MIN_CHARS, type DocKind } from "@/lib/tensaku/preview";
import { getSetting, setSetting } from "@/lib/social/store";

// 塾・教室の先生向け「生徒の志望理由書を最大10人分、無料でまとめて診断」(/juku/shindan)。
// 2026-11-15 じゅんさんの方針：法人営業は売り込みより先に、無料の診断を渡す。
//   POST /api/juku/shindan { batchId, kind, target, text } → { total, summary, nextStep, firstPoint }
// 1人分ずつ呼ぶ (まとめて呼ぶと 60 秒をこえるため)。同じ batchId で10人分まで。新しい batchId は30日に1回まで。
// 先生はログインが要る (AI の費用がかかるため)。生徒の名前は受け取らない (画面では「生徒A」などと呼ぶ)。文章は保存しない。
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const KINDS: DocKind[] = ["shibo", "shoronbun", "jiko"];
const MAX_PER_BATCH = 10;
const COOLDOWN_MS = 30 * 86400 * 1000;

interface BatchState {
  batchId: string;
  used: number;
  at: string;
}

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const batchId = String(b.batchId ?? "").slice(0, 40);
  const kind = (KINDS.includes(b.kind as DocKind) ? b.kind : "shibo") as DocKind;
  const target = String(b.target ?? "").trim().slice(0, 60);
  const text = String(b.text ?? "").trim();
  if (!/^[a-z0-9-]{8,40}$/i.test(batchId)) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  if (text.length < MIN_CHARS) return NextResponse.json({ error: "too_short", min: MIN_CHARS }, { status: 400 });
  if (text.length > FULL_MAX_CHARS) return NextResponse.json({ error: "too_long", max: FULL_MAX_CHARS }, { status: 400 });

  const key = `juku_shindan:${userId}`;
  const raw = await getSetting(key).catch(() => null);
  let state: BatchState | null = null;
  try {
    state = raw ? (JSON.parse(raw) as BatchState) : null;
  } catch {
    state = null;
  }
  const now = Date.now();
  if (state && state.batchId !== batchId && now - new Date(state.at).getTime() < COOLDOWN_MS) {
    return NextResponse.json({ error: "used_this_month", next: new Date(new Date(state.at).getTime() + COOLDOWN_MS).toISOString() }, { status: 429 });
  }
  if (!state || state.batchId !== batchId) state = { batchId, used: 0, at: new Date(now).toISOString() };
  if (state.used >= MAX_PER_BATCH) return NextResponse.json({ error: "batch_full", max: MAX_PER_BATCH }, { status: 429 });

  try {
    const r = await runFull({ kind, target, text });
    state.used += 1;
    await setSetting(key, JSON.stringify(state)).catch(() => undefined);
    await logUsage({ userId, appKey: "tensakun", action: "juku_shindan", metadata: { kind, length: text.length } }).catch(() => undefined);
    return NextResponse.json(
      { total: r.total, summary: r.summary, nextStep: r.nextStep, firstPoint: r.points[0] ?? null, remaining: MAX_PER_BATCH - state.used },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("juku shindan failed:", msg); // 入力文は出さない
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }
}
