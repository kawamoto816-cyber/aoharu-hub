import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/aoharu-entitlements";
import { loadState } from "@/lib/station/bin-store";

// 学習便の乗車の状態（登録した人のみ）。
//   GET /api/station/bin → { signedIn, now, ready, member, current, next, ride }
// 今日の便／次の便はサーバーの時計（日本時間）で決める。未登録なら signedIn:false。
export const dynamic = "force-dynamic";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ signedIn: false }, { status: 401, headers: { "Cache-Control": "no-store" } });
  return NextResponse.json(await loadState(userId), { headers: { "Cache-Control": "no-store" } });
}
