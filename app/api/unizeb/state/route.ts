import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import { openState, sealState, serverViewer } from "@/lib/unizeb/server";

// GET/PUT /api/unizeb/state：マイ事業ボード・カードの答え・スキルアセット（UzState）。
//   - 登録なし（guest）は保存しない → 404（画面は端末の中だけで動く）
//   - 中身は UNIZEB_STATE_KEY で暗号化して unizeb_state に1行（家庭のお金の情報なども入るため、運営の管理画面でも読めない）
//   - Max の人にだけ、Lv4〜15 のカード（lib/unizeb/v3/cards-pro.json）を cardsPro として足して返す
//   - まだ保存がないときは { assets: [], fresh: true }（画面は端末の中の答えをそのまま使い、次の保存でアカウントへ移る）
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };
const MAX_BYTES = 512 * 1024;

let PRO: unknown[] | null = null;
function cardsPro(): unknown[] {
  if (!PRO) PRO = JSON.parse(fs.readFileSync(path.join(process.cwd(), "lib/unizeb/v3/cards-pro.json"), "utf8")) as unknown[];
  return PRO;
}

export async function GET() {
  const v = await serverViewer();
  if (!v.userId) return NextResponse.json({ error: "guest" }, { status: 404, headers: NO_STORE });
  const extra = v.plan === "max" ? { cardsPro: cardsPro() } : {};
  let state: Record<string, unknown> = { assets: [], fresh: true };
  try {
    const { data, error } = await getSupabaseAdmin().from("unizeb_state").select("data").eq("user_id", v.userId).maybeSingle();
    if (error) throw new Error(error.message);
    const raw = data?.data ? openState(String(data.data)) : null;
    if (raw) state = JSON.parse(raw) as Record<string, unknown>;
  } catch (e) {
    console.warn("[unizeb/state] read failed:", e instanceof Error ? e.message : e);
  }
  return NextResponse.json({ ...state, plan: v.plan, ...extra }, { headers: NO_STORE });
}

export async function PUT(req: Request) {
  const v = await serverViewer();
  if (!v.userId) return NextResponse.json({ error: "guest" }, { status: 404, headers: NO_STORE });
  const text = await req.text();
  if (text.length > MAX_BYTES) return NextResponse.json({ error: "too_large" }, { status: 413, headers: NO_STORE });
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(text) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400, headers: NO_STORE });
  }
  // サーバーが足したものは保存しない
  const { cardsPro: _p, plan: _pl, fresh: _f, ...state } = body;
  void _p;
  void _pl;
  void _f;
  if (!Array.isArray(state.assets)) state.assets = [];
  const sealed = sealState(JSON.stringify(state));
  if (!sealed) return NextResponse.json({ error: "not_configured" }, { status: 503, headers: NO_STORE });
  const { error } = await getSupabaseAdmin()
    .from("unizeb_state")
    .upsert({ user_id: v.userId, data: sealed, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
  if (error) {
    console.warn("[unizeb/state] write failed:", error.message);
    return NextResponse.json({ error: "save_failed" }, { status: 500, headers: NO_STORE });
  }
  return NextResponse.json({ ok: true }, { headers: NO_STORE });
}
