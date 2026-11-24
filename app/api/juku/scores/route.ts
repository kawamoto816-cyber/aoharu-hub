import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/aoharu-entitlements";
import { cleanScores, isTeamMember, saveScores } from "@/lib/team-pass/scores";

// 塾・教室の招待コードを入れた人の、単元模試・模試の得点（端末にしか無い記録）を受け取る。
//   POST /api/juku/scores { moshi: {unit: {c, best, last, at}}, exams: [{title, at, score, total}] } → { member, saved }
// 招待コードの利用者でなければ、何も保存しない（member:false）。先生用ダッシュボード（/juku/dashboard）で使う。
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ member: false }, { status: 401 });
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const headers = { "Cache-Control": "no-store" };
  try {
    if (!(await isTeamMember(userId)))
      return NextResponse.json({ member: false, saved: false }, { headers });
    await saveScores(userId, cleanScores(body));
    return NextResponse.json({ member: true, saved: true }, { headers });
  } catch {
    return NextResponse.json(
      { member: true, saved: false },
      { status: 503, headers },
    );
  }
}
