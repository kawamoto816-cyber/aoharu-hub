import { NextResponse } from "next/server";
import { readPost } from "@/lib/station/bin-api";
import { beat, getRoomMember } from "@/lib/station/room-store";

// アオハルーム：集中しているあいだ、画面が1分ごとに知らせる（登録してニックネームを決めた人のみ）。
//   POST /api/station/room/beat  { on: boolean, mode: 25 | 50 }
// on:false は「席を立った」。知らせが2分半とぎれても、席は空く。
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const got = await readPost(req);
  if ("res" in got) return got.res;
  const { userId, body } = got;
  if (!(await getRoomMember(userId))) return NextResponse.json({ ok: false, reason: "no_nick" }, { status: 409, headers: { "Cache-Control": "no-store" } });
  const ok = await beat(userId, body.on === true, body.mode === 50 ? 50 : 25);
  return NextResponse.json({ ok }, { status: ok ? 200 : 503, headers: { "Cache-Control": "no-store" } });
}
