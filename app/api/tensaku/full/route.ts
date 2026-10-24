import { NextResponse } from "next/server";
import { checkAppAccess, getCurrentUserId, getFreeTierStatus, logUsage } from "@/lib/aoharu-entitlements";
import { FULL_MAX_CHARS, runFull } from "@/lib/tensaku/full";
import { MIN_CHARS, type DocKind } from "@/lib/tensaku/preview";

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
    const s = await getFreeTierStatus(userId, APP);
    return NextResponse.json({ signedIn: true, unlimited: s.unlimited, remaining: s.remaining, quota: s.quota, plan: s.plan }, { headers: { "Cache-Control": "no-store" } });
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
  if (!access.allowed) return NextResponse.json({ error: access.reason }, { status: 402 });

  try {
    const result = await runFull({ kind, target, text });
    await logUsage({ userId, appKey: APP, action: ACTION, metadata: { source: "hub_tensaku", kind, length: text.length } });
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("tensaku full failed:", msg); // 入力文は出さない
    return NextResponse.json({ error: msg === "not_configured" ? "not_configured" : "failed" }, { status: 502 });
  }
}
