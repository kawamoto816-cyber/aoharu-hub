import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { xAuthStart } from "@/lib/social/x";

// X 投稿アカウントの認可 (3-legged OAuth) 開始。
//   GET /internal/social/x-auth?token=ADMIN_METRICS_TOKEN
// ブラウザで開くと X の認可画面に飛ぶ。投稿したいアカウント (@aoharu_os) でログインした状態で開くこと。
// 認可後 /internal/social/x-callback に戻り、アクセストークンが1回だけ表示される (Vercel に登録する)。
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isAdminToken(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const origin = new URL(req.url).origin;
  try {
    const { authorizeUrl, requestToken, requestSecret } = await xAuthStart(`${origin}/internal/social/x-callback`);
    const res = NextResponse.redirect(authorizeUrl);
    // request token の秘密は callback で必要。短命の httpOnly Cookie に入れる。
    res.cookies.set("x_oauth_req", `${requestToken}:${requestSecret}`, {
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
