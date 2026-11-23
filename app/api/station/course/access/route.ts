import { NextResponse } from "next/server";
import { getCurrentUserId } from "@bluespring/aoharu-entitlements";
import { COURSES, isSaleKind } from "@/lib/station/course-kinds";
import { courseAccess, grantCoursePassForSession } from "@/lib/station/course-pass";

// GET /api/station/course/access?kind=kyotsu|koko[&session_id=cs_...]
// 直前コースの有料部分（2週目から）を使えるかを返す。
// 支払いから戻った直後は session_id がつく。Webhook がまだ届いていなくても、ここで支払いを確かめて付ける
// （付ける相手は支払いのセッションに書かれた本人だけ。ほかの人のセッションIDを渡しても、自分には付かない）。
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const kind = url.searchParams.get("kind");
  if (!isSaleKind(kind)) return NextResponse.json({ error: "kind がちがいます" }, { status: 400 });
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ signedIn: false, access: false, via: null });
  const sessionId = url.searchParams.get("session_id");
  if (sessionId) await grantCoursePassForSession(sessionId).catch((e) => console.error("[course/access] grant", e instanceof Error ? e.message : e));
  try {
    const a = await courseAccess(userId, kind);
    return NextResponse.json({ signedIn: true, access: a.access, via: a.via, endsLabel: a.via === "course" ? COURSES[kind].sale!.endsLabel : null }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    console.error("[course/access]", e instanceof Error ? e.message : e);
    return NextResponse.json({ signedIn: true, access: false, via: null, error: "確かめられませんでした" }, { status: 200 });
  }
}
