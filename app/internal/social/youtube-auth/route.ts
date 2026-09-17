import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { youtubeAuthStart } from "@/lib/social/youtube";

// YouTube 投稿アカウントの認可 (OAuth 2.0) 開始。
//   GET /internal/social/youtube-auth?token=ADMIN_METRICS_TOKEN
// ブラウザで開くと Google の同意画面に飛ぶ。投稿したい Google アカウント (YouTube チャンネルの所有者) で
// ログインした状態で開くこと。
//
// 注意: Google Cloud Console 側の OAuth 同意画面が「本番環境」でない (審査未完了の) 場合、
// 「Google で確認されていないアプリです」という警告が出る。ここは「詳細」→
// 「<アプリ名>に移動 (安全ではないページ)」と進めば問題ない (自分のアプリ・自分のチャンネル宛の認可のため)。
// これを一度クリックしておかないと、発行されるリフレッシュトークンが7日で失効してしまうので、
// 必ず OAuth 同意画面の公開ステータスを「本番環境」にしてから実行すること。
//
// 認可後 /internal/social/youtube-callback に戻り、リフレッシュトークンが表示される。
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isAdminToken(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const origin = new URL(req.url).origin;
  try {
    const { authorizeUrl, state } = youtubeAuthStart(`${origin}/internal/social/youtube-callback`);
    const res = NextResponse.redirect(authorizeUrl);
    res.cookies.set("yt_oauth_state", state, {
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
