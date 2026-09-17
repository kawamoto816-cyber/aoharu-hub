import { NextResponse } from "next/server";
import { youtubeAuthFinish } from "@/lib/social/youtube";

// YouTube 認可のコールバック。リフレッシュトークンを取得して画面に表示する (サーバーには保存しない)。
export const dynamic = "force-dynamic";

function page(body: string, status = 200) {
  return new NextResponse(
    `<!doctype html><html lang="ja"><meta charset="utf-8"><meta name="robots" content="noindex"><title>YouTube 認可</title>
<body style="font-family:system-ui;max-width:720px;margin:40px auto;padding:0 16px;line-height:1.7">${body}</body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } },
  );
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");
  if (url.searchParams.get("error")) {
    return page(`<h1>認可がキャンセル/失敗しました</h1><p>${url.searchParams.get("error_description") ?? url.searchParams.get("error")}</p>`, 400);
  }
  const cookie = req.headers.get("cookie") ?? "";
  const m = cookie.match(/(?:^|;\s*)yt_oauth_state=([^;]+)/);
  const state = m ? decodeURIComponent(m[1]) : "";
  if (!code || !returnedState || !state || state !== returnedState) {
    return page("<h1>認可情報が見つかりません</h1><p>もう一度 /internal/social/youtube-auth から開始してください（10分以内）。</p>", 400);
  }

  try {
    const origin = url.origin;
    const token = await youtubeAuthFinish(code, `${origin}/internal/social/youtube-callback`);

    const res = page(`<h1>YouTube の認可が完了しました</h1>
<p>scope: <code>${token.scope}</code></p>
<p>次の3つを Vercel（aoharu-hub → Settings → Environment Variables、Type=Secret）に登録し、Redeploy してください。<b>この画面を閉じると再表示されません。</b></p>
<table style="border-collapse:collapse">
<tr><td style="padding:6px 12px 6px 0"><code>YOUTUBE_CLIENT_ID</code></td><td>(Google Cloud Console で発行済みのものをそのまま)</td></tr>
<tr><td style="padding:6px 12px 6px 0"><code>YOUTUBE_CLIENT_SECRET</code></td><td>(同上)</td></tr>
<tr><td style="padding:6px 12px 6px 0"><code>YOUTUBE_REFRESH_TOKEN</code></td><td><code style="user-select:all">${token.refreshToken || "(発行されませんでした。下記の注意を参照)"}</code></td></tr>
</table>
${
  token.refreshToken
    ? ""
    : `<p style="color:#a00">リフレッシュトークンが返ってきませんでした。既にこのアプリに同意済みだと Google が新しい
      リフレッシュトークンを発行しないことがあります。Google アカウントの設定 → セキュリティ →
      サードパーティのアクセス権 から「アオハルOS」の連携を一度解除してから、
      もう一度 /internal/social/youtube-auth をやり直してください。</p>`
}
<p style="color:#666;font-size:14px">
このページの内容はサーバーに保存していません。<br>
もし「Google で確認されていないアプリです」という警告画面が出ずにスムーズに認可できた場合、
OAuth 同意画面がまだ「テスト中」の可能性があります。その場合リフレッシュトークンは7日で失効するため、
Google Cloud Console → OAuth 同意画面 で公開ステータスを「本番環境」にしてから、もう一度やり直してください。
</p>`);
    res.cookies.set("yt_oauth_state", "", { path: "/internal/social", maxAge: 0 });
    return res;
  } catch (e) {
    return page(`<h1>認可に失敗しました</h1><pre>${e instanceof Error ? e.message : String(e)}</pre>`, 502);
  }
}
