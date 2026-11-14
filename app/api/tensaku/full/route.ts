import { NextResponse } from "next/server";
import { checkAppAccess, getCurrentUserId, getFreeTierStatus, logUsage } from "@/lib/aoharu-entitlements";
import { FULL_MAX_CHARS, runFull } from "@/lib/tensaku/full";
import { MIN_CHARS, type DocKind } from "@/lib/tensaku/preview";
import { consumeTicket, getTickets } from "@/lib/tensaku/ticket";
import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";

/** これまでに無料の枠で全文添削した回数（月をまたいで数える） */
async function lifetimeFreeScores(userId: string): Promise<number> {
  const { count } = await getSupabaseAdmin().from("usage_log").select("*", { count: "exact", head: true }).eq("user_id", userId).eq("app_key", APP).eq("action", ACTION);
  return count ?? 0;
}

// 登録後の全文添削 (/tensaku から使う)。テンサクンと同じ回数枠で数える。
//   GET  /api/tensaku/full            → { signedIn, unlimited, remaining, quota }
//   POST /api/tensaku/full { kind, target, text } → FullResult (点数・観点・指摘・改善のポイント)
// 入力文は保存しない。利用ログには種類と文字数だけを残す。添削に失敗した回は数えない。
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const APP = "tensakun";
const ACTION = "score";
const KINDS: DocKind[] = ["shibo", "shoronbun", "jiko"];

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ signedIn: false });
  try {
    const [s, tickets] = await Promise.all([getFreeTierStatus(userId, APP), getTickets(userId)]);
    return NextResponse.json({ signedIn: true, unlimited: s.unlimited, remaining: s.remaining, quota: s.quota, plan: s.plan, tickets }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ signedIn: true, unlimited: false, remaining: null, quota: 2 });
  }
}

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  let body: { kind?: string; target?: string; text?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const kind = (KINDS.includes(body.kind as DocKind) ? body.kind : "shibo") as DocKind;
  const target = String(body.target ?? "").trim().slice(0, 60);
  const text = String(body.text ?? "").trim();
  if (text.length < MIN_CHARS) return NextResponse.json({ error: "too_short", min: MIN_CHARS }, { status: 400 });
  if (text.length > FULL_MAX_CHARS) return NextResponse.json({ error: "too_long", max: FULL_MAX_CHARS }, { status: 400 });

  const access = await checkAppAccess(userId, APP, ACTION);
  // 無料の枠を使い切っていても、1通分（300円）の回数が残っていればそれを使う
  const byTicket = !access.allowed && access.reason === "quota_exceeded" && (await getTickets(userId)) > 0;
  if (!access.allowed && !byTicket) return NextResponse.json({ error: access.reason }, { status: 402 });

  // 無料の範囲（2026-11-15 じゅんさんの判断）：登録後の1本目は全部見せる。2本目からは点数・観点の点・いちばん大事な指摘1つ・次に直すことまで。
  // 残りの指摘と観点ごとのコメントは、Pro・パス・1通300円で見られる。有料（無制限）と1通分で使った回は全部見せる。
  const unlimited = access.allowed && access.remaining === undefined;
  const partial = !unlimited && !byTicket && (await lifetimeFreeScores(userId).catch(() => 0)) >= 1;

  try {
    const full = await runFull({ kind, target, text });
    const result = partial
      ? { ...full, criteria: full.criteria.map((c) => ({ ...c, comment: "" })), points: full.points.slice(0, 1), lockedPoints: Math.max(0, full.points.length - 1) }
      : full;
    if (byTicket) await consumeTicket(userId);
    // 1通分で使った回は、無料の枠の数え方（score）に入れない
    await logUsage({ userId, appKey: APP, action: byTicket ? "score_ticket" : ACTION, metadata: { source: "hub_tensaku", kind, length: text.length } });
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("tensaku full failed:", msg); // 入力文は出さない
    return NextResponse.json({ error: msg === "not_configured" ? "not_configured" : "failed" }, { status: 502 });
  }
}
