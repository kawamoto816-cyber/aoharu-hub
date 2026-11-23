import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/aoharu-entitlements";
import { loadRoom } from "@/lib/station/room-store";

// アオハルーム（無料の自習室）のいま。
//   GET /api/station/room → { signedIn, ready, member, present, rows }
// 登録していない人にも、部屋の様子（いまいる人・ランキング）は見せる。座る（記録する）のは登録した人だけ。
export const dynamic = "force-dynamic";

export async function GET() {
  const userId = await getCurrentUserId();
  return NextResponse.json(await loadRoom(userId ?? null), { headers: { "Cache-Control": "no-store" } });
}
