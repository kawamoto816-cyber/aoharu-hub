import { NextResponse } from "next/server";
import { xAuthFinish } from "@/lib/social/x";

// X 認可のコールバック。アクセストークンを取得して画面に1回だけ表示する (サーバーには保存しない)。
export const dynamic = "force-dynamic";

function page(body: string, status = 200) {
  return new NextResponse(
    `<!doctype html><html lang="ja"><meta charset="utf-8"><meta name="robots" content="noindex"><title>X 認可</title>
<body style="font-family:system-ui;max-width:720px;margin:40px auto;padding:0 16px;line-height:1.7">${body}</body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } },
  );
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const oauthToken = url.searchParams.get("oauth_token");
  const verifier = url.searchParams.get("oauth_verifier");
  if (url.searchParams.get("denied")) return page("<h1>認可がキャンセルされました</h1>", 400);
  const cookie = req.headers.get("cookie") ?? "";
  const m = cookie.match(/(?:^|;\s*)x_oauth_req=([^;]+)/);
  const [reqToken, reqSecret] = m ? decodeURIComponent(m[1]).split(":") : [];
  if (!oauthToken || !verifier || !reqToken || !reqSecret || reqToken !== oauthToken) {
    return page("<h1>認可情報が見つかりません</h1><p>もう一度 /internal/social/x-auth から開始してください（10分以内）。</p>", 400);
  }
  try {
    const r = await xAuthFinish(reqToken, reqSecret, verifier);
    const res = page(`<h1>X の認可が完了しました</h1>
<p>投稿アカウント: <b>@${r.screenName}</b>（user_id ${r.userId}）</p>
<p>次の2つを Vercel（aoharu-hub → Settings → Environment Variables、Type=Secret）に登録し、Redeploy してください。<b>この画面を閉じると再表示されません。</b></p>
<table style="border-collapse:collapse"><tr><td style="padding:6px 12px 6px 0"><code>X_ACCESS_TOKEN</code></td><td><code style="user-select:all">${r.accessToken}</code></td></tr>
<tr><td style="padding:6px 12px 6px 0"><code>X_ACCESS_SECRET</code></td><td><code style="user-select:all">${r.accessSecret}</code></td></tr></table>
<p style="color:#666;font-size:14px">このページの内容はサーバーに保存していません。</p>`);
    res.cookies.set("x_oauth_req", "", { path: "/internal/social", maxAge: 0 });
    return res;
  } catch (e) {
    return page(`<h1>認可に失敗しました</h1><pre>${e instanceof Error ? e.message : String(e)}</pre>`, 502);
  }
}
