import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/aoharu-entitlements";
import { cleanEntries, cleanText, saveLog } from "@/lib/station/log-store";

// 学習便の学習ログ (登録した人のみ)。端末で増えた分（差分）を受け取って保存する。
//   POST /api/station/log { entries: [{unit, solved, correct, moshi}], nick, grade } → { signedIn, saved }
// 未登録なら signedIn:false を返すだけで、端末側の記録で動き続ける。
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ signedIn: false }, { status: 401 });
  let body: { entries?: unknown; nick?: unknown; grade?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const saved = await saveLog(userId, cleanEntries(body.entries), { nick: cleanText(body.nick, 20), grade: cleanText(body.grade, 4) });
  return NextResponse.json({ signedIn: true, saved }, { headers: { "Cache-Control": "no-store" } });
}
