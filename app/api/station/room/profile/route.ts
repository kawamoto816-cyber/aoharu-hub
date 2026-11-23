import { NextResponse } from "next/server";
import { readPost } from "@/lib/station/bin-api";
import { ROOM_GRADES as GRADES } from "@/lib/station/room-rules";
import { cleanNick, saveRoomProfile } from "@/lib/station/room-store";

// アオハルーム：部屋で見せるニックネームと学年を決める（登録した人のみ）。
//   POST /api/station/room/profile  { nick, grade }
// 学習便の乗車ページと同じ station_members に入る（ニックネームは共通）。
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

export async function POST(req: Request) {
  const got = await readPost(req);
  if ("res" in got) return got.res;
  const { userId, body } = got;
  const n = cleanNick(body.nick);
  if (!n.ok) return NextResponse.json({ ok: false, error: n.error }, { status: 400, headers: NO_STORE });
  const grade = typeof body.grade === "string" && (GRADES as readonly string[]).includes(body.grade) ? body.grade : "";
  if (!grade) return NextResponse.json({ ok: false, error: "学年を選んでください。" }, { status: 400, headers: NO_STORE });
  const ok = await saveRoomProfile(userId, n.nick, grade);
  return NextResponse.json(ok ? { ok, nick: n.nick, grade } : { ok, error: "保存できませんでした。少し待って、もう一度ためしてください。" }, { status: ok ? 200 : 503, headers: NO_STORE });
}
