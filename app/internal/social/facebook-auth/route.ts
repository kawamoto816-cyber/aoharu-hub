import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { isAdminToken, isAdminUser } from "@/lib/metrics/admin-auth";
import { facebookAuthUrl } from "@/lib/social/facebook";

// Facebook ページ (アオハルラーン) のリール投稿の連携を始める。
//   GET /internal/social/facebook-auth   社内アカウント (@bluespring.co.jp) でログインしていれば開ける
// Facebook の許可画面で「アオハルラーン」ページを選んで許可すると /internal/social/facebook-callback に戻り、
// Vercel に登録する FACEBOOK_PAGE_ID と FACEBOOK_PAGE_TOKEN が (閉じた欄の中に) 表示される。
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isAdminToken(req) && !(await isAdminUser()).ok) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const origin = new URL(req.url).origin;
  try {
    const state = randomBytes(16).toString("hex");
    const res = NextResponse.redirect(facebookAuthUrl(`${origin}/internal/social/facebook-callback`, state));
    res.cookies.set("fb_oauth_state", state, { httpOnly: true, secure: true, sameSite: "lax", path: "/internal/social", maxAge: 600 });
    return res;
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 502 });
  }
}
