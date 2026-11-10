import { NextResponse } from "next/server";
import { getCurrentUserId } from "@bluespring/aoharu-entitlements";
import { redeemTeamPass } from "@/lib/team-pass/store";

// POST /api/team-pass/redeem { code } → { ok, endsAt, left } | { ok:false, reason }
// 生徒・指導者が、塾から受け取った招待コードを自分のアカウントで入れる。
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ ok: false, reason: "unauthenticated" }, { status: 401 });
  const b = (await req.json().catch(() => ({}))) as { code?: string };
  if (!b.code || b.code.length < 8) return NextResponse.json({ ok: false, reason: "not_found" }, { status: 400 });
  try {
    const r = await redeemTeamPass(b.code, userId);
    return NextResponse.json(r, { status: r.ok ? 200 : 400 });
  } catch (e) {
    console.error("[team-pass/redeem]", e instanceof Error ? e.message : e);
    return NextResponse.json({ ok: false, reason: "failed" }, { status: 500 });
  }
}
