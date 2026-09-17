import { NextResponse } from "next/server";
import { postVideoPullFromUrl, tiktokAuthFinish } from "@/lib/social/tiktok";

// TikTok 認可のコールバック。アクセストークンを取得して画面に表示し (サーバーには保存しない)、
// 続けて Content Posting API (Direct Post, PULL_FROM_URL) で動作確認用の動画を1件投稿してみる
// (審査担当者向けデモ動画の録画は、このページの一連の流れをそのまま画面録画すればよい)。
export const dynamic = "force-dynamic";

function page(body: string, status = 200) {
  return new NextResponse(
    `<!doctype html><html lang="ja"><meta charset="utf-8"><meta name="robots" content="noindex"><title>TikTok 認可</title>
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
  const m = cookie.match(/(?:^|;\s*)tt_oauth_req=([^;]+)/);
  const [state, codeVerifier] = m ? decodeURIComponent(m[1]).split(":") : [];
  if (!code || !returnedState || !state || !codeVerifier || state !== returnedState) {
    return page("<h1>認可情報が見つかりません</h1><p>もう一度 /internal/social/tiktok-auth から開始してください（10分以内）。</p>", 400);
  }

  try {
    const origin = url.origin;
    const token = await tiktokAuthFinish(code, codeVerifier, `${origin}/internal/social/tiktok-callback`);

    // Content Posting API の動作確認: 検証済みドメイン配下のサンプル動画を PULL_FROM_URL で投稿してみる。
    let postResult = "";
    try {
      const demoVideoUrl = `${origin}/demo/tiktok-sandbox-test.mp4`;
      const { publishId } = await postVideoPullFromUrl(demoVideoUrl, "アオハルOS 動作確認投稿", {
        accessToken: token.accessToken,
      });
      postResult = `<p style="color:#0a7">Content Posting API 投稿を開始しました。publish_id: <code>${publishId}</code></p>`;
    } catch (e) {
      postResult = `<p style="color:#a00">投稿テストに失敗しました: ${e instanceof Error ? e.message : String(e)}</p>`;
    }

    const res = page(`<h1>TikTok の認可が完了しました</h1>
<p>open_id: <b>${token.openId}</b>　scope: <code>${token.scope}</code></p>
<p>次の2つを Vercel（aoharu-hub → Settings → Environment Variables、Type=Secret）に登録し、Redeploy してください。<b>この画面を閉じると再表示されません。</b></p>
<table style="border-collapse:collapse"><tr><td style="padding:6px 12px 6px 0"><code>TIKTOK_ACCESS_TOKEN</code></td><td><code style="user-select:all">${token.accessToken}</code></td></tr>
<tr><td style="padding:6px 12px 6px 0"><code>TIKTOK_REFRESH_TOKEN</code></td><td><code style="user-select:all">${token.refreshToken}</code></td></tr></table>
<h2>Content Posting API 動作確認</h2>
${postResult}
<p style="color:#666;font-size:14px">このページの内容はサーバーに保存していません。</p>`);
    res.cookies.set("tt_oauth_req", "", { path: "/internal/social", maxAge: 0 });
    return res;
  } catch (e) {
    return page(`<h1>認可に失敗しました</h1><pre>${e instanceof Error ? e.message : String(e)}</pre>`, 502);
  }
}
