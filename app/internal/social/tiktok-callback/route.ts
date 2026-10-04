import { NextResponse } from "next/server";
import { queryCreatorInfo, tiktokAuthFinish } from "@/lib/social/tiktok";

// TikTok 認可のコールバック。連携できたアカウント名を表示し、投稿画面 (/admin/social/tiktok) へ案内する。
// トークンはサーバーに保存しない。Vercel に登録し直すときのために、閉じた状態の「設定用の情報」の中にだけ表示する
// (審査用の画面録画にトークンが映らないよう、初期状態では開かない)。
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

    // 連携できたアカウントの表示名を取得する (失敗しても認可自体は完了しているので続ける)
    let accountLabel = "";
    try {
      const info = await queryCreatorInfo(token.accessToken);
      accountLabel = `${info.nickname}${info.username ? ` (@${info.username})` : ""}`;
    } catch {
      accountLabel = "";
    }

    const res = page(`<h1>TikTok との連携が完了しました (Connected to TikTok)</h1>
<p>連携したアカウント (Account): <b>${accountLabel || "取得できませんでした"}</b></p>
<p>許可された範囲 (Scopes): <code>${token.scope}</code></p>
<p><a href="/admin/social/tiktok" style="display:inline-block;margin-top:8px;padding:10px 18px;background:#0f172a;color:#fff;border-radius:10px;font-weight:bold;text-decoration:none">投稿画面へ進む (Go to Post to TikTok)</a></p>
<details style="margin-top:40px;color:#666;font-size:13px"><summary>設定用の情報（運営者のみ。画面録画しないこと）</summary>
<p>トークンを登録し直す場合だけ、次の2つを Vercel（aoharu-hub → Settings → Environment Variables、Type=Secret）に登録して Redeploy してください。この画面を閉じると再表示されません。</p>
<table style="border-collapse:collapse"><tr><td style="padding:6px 12px 6px 0"><code>TIKTOK_ACCESS_TOKEN</code></td><td><code style="user-select:all;word-break:break-all">${token.accessToken}</code></td></tr>
<tr><td style="padding:6px 12px 6px 0"><code>TIKTOK_REFRESH_TOKEN</code></td><td><code style="user-select:all;word-break:break-all">${token.refreshToken}</code></td></tr></table>
<p>このページの内容はサーバーに保存していません。</p></details>`);
    res.cookies.set("tt_oauth_req", "", { path: "/internal/social", maxAge: 0 });
    return res;
  } catch (e) {
    return page(`<h1>認可に失敗しました</h1><pre>${e instanceof Error ? e.message : String(e)}</pre>`, 502);
  }
}
