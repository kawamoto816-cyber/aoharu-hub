import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { tiktokAuthStart } from "@/lib/social/tiktok";

// TikTok 投稿アカウントの認可 (OAuth 2.0 + PKCE) 開始。
//   GET /internal/social/tiktok-auth?token=ADMIN_METRICS_TOKEN
// ブラウザで開くと TikTok の認可画面 (Login Kit) に飛ぶ。投稿したいアカウント (@aoharu_os) でログインした状態で開くこと。
// 認可後 /internal/social/tiktok-callback に戻り、アクセストークンが表示され、続けて動作確認用の投稿 (Content Posting API) を1件試みる。
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isAdminToken(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const origin = new URL(req.url).origin;
  try {
    const { authorizeUrl, state, codeVerifier } = tiktokAuthStart(`${origin}/internal/social/tiktok-callback`);
    const res = NextResponse.redirect(authorizeUrl);
    // state と PKCE の code_verifier は callback で必要。短命の httpOnly Cookie に入れる。
    res.cookies.set("tt_oauth_req", `${state}:${codeVerifier}`, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/internal/social",
      maxAge: 600,
    });
    return res;
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 502 });
  }
}
