import { NextResponse } from "next/server";
import { readPost } from "@/lib/station/bin-api";
import { cleanCycle, getRoomMember, saveCycle } from "@/lib/station/room-store";

// アオハルーム：集中のサイクル1回ぶんの記録（登録してニックネームを決めた人のみ）。
//   POST /api/station/room/cycle  { id, at, mode, focusSec, completed, points, solved, math }
// やることの文・ひとことは受け取らない。同じ id は1回だけ数える（送り直しても増えない）。
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

export async function POST(req: Request) {
  const got = await readPost(req);
  if ("res" in got) return got.res;
  const { userId, body } = got;
  if (!(await getRoomMember(userId))) return NextResponse.json({ ok: false, reason: "no_nick" }, { status: 409, headers: NO_STORE });
  const c = cleanCycle(body, Date.now());
  // 受け取れない記録（古すぎる など）は、画面が何度も送り直さないよう「済み」として返す
  if (!c) return NextResponse.json({ ok: true, skipped: true }, { headers: NO_STORE });
  const ok = await saveCycle(userId, c);
  return NextResponse.json({ ok }, { status: ok ? 200 : 503, headers: NO_STORE });
}
