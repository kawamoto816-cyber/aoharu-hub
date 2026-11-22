import { NextResponse } from "next/server";
import { facebookAuthFinish } from "@/lib/social/facebook";

// Facebook 連携のコールバック。許可されたページの一覧を出し、Vercel に登録する値を閉じた欄の中にだけ表示する。
// トークンはサーバーに保存しない (この画面を閉じると再表示されない)。
export const dynamic = "force-dynamic";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

function page(body: string, status = 200) {
  return new NextResponse(
    `<!doctype html><html lang="ja"><meta charset="utf-8"><meta name="robots" content="noindex"><title>Facebook 連携</title>
<body style="font-family:system-ui;max-width:720px;margin:40px auto;padding:0 16px;line-height:1.7">${body}</body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } },
  );
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get("error")) {
    return page(`<h1>連携がキャンセルされました</h1><p>${esc(url.searchParams.get("error_description") ?? url.searchParams.get("error") ?? "")}</p>`, 400);
  }
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const m = (req.headers.get("cookie") ?? "").match(/(?:^|;\s*)fb_oauth_state=([^;]+)/);
  if (!code || !state || !m || m[1] !== state) {
    return page("<h1>連携の情報が見つかりません</h1><p>もう一度 /internal/social/facebook-auth から始めてください（10分以内）。</p>", 400);
  }
  try {
    const pages = await facebookAuthFinish(code, `${url.origin}/internal/social/facebook-callback`);
    if (!pages.length) return page("<h1>ページが見つかりません</h1><p>許可の画面で「アオハルラーン」ページにチェックを入れて、もう一度試してください。</p>", 400);
    const target = pages.find((p) => p.name.includes("アオハルラーン")) ?? pages[0];
    const res = page(`<h1>Facebook との連携が完了しました</h1>
<p>投稿先のページ: <b>${esc(target.name)}</b>（許可されたページ: ${pages.map((p) => esc(p.name)).join("、")}）</p>
<details style="margin-top:32px;color:#555;font-size:13px"><summary>設定用の情報（運営者のみ）</summary>
<p>次の2つを Vercel（aoharu-hub → Settings → Environment Variables）に登録して Redeploy してください。この画面を閉じると再表示されません。</p>
<table style="border-collapse:collapse"><tr><td style="padding:6px 12px 6px 0"><code>FACEBOOK_PAGE_ID</code></td><td><code style="user-select:all">${esc(target.id)}</code></td></tr>
<tr><td style="padding:6px 12px 6px 0"><code>FACEBOOK_PAGE_TOKEN</code></td><td><code style="user-select:all;word-break:break-all">${esc(target.token)}</code></td></tr></table>
<p>このページの内容はサーバーに保存していません。</p></details>`);
    res.cookies.set("fb_oauth_state", "", { path: "/internal/social", maxAge: 0 });
    return res;
  } catch (e) {
    return page(`<h1>連携に失敗しました</h1><pre>${esc(e instanceof Error ? e.message : String(e))}</pre>`, 502);
  }
}
