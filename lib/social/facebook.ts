// Facebook ページ「アオハルラーン」へのリール投稿 (Graph API の video_reels)。
//   必要な環境変数:
//     FACEBOOK_APP_ID, FACEBOOK_APP_SECRET   Meta for Developers のアプリ (連携の手続きにだけ使う)
//     FACEBOOK_PAGE_ID, FACEBOOK_PAGE_TOKEN  /internal/social/facebook-auth で取得して Vercel に登録する
//   ページのアクセストークンは、長期のユーザートークンから取ったものなので期限がない
//   (パスワード変更・アプリの権限の取り消しで無効になったときだけ、もう一度連携する)。
// 投稿の流れ: start (video_id と upload_url) → 動画の URL を渡してアップロード → finish (公開)。

const VERSION = "v24.0";
const GRAPH = `https://graph.facebook.com/${VERSION}`;
const SCOPES = ["pages_show_list", "pages_read_engagement", "pages_manage_posts"];

export function isFacebookConfigured(): boolean {
  return Boolean(process.env.FACEBOOK_PAGE_ID && process.env.FACEBOOK_PAGE_TOKEN);
}

async function call(method: "GET" | "POST", url: string, params: Record<string, string> = {}, headers: Record<string, string> = {}) {
  const u = new URL(url);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  const res = await fetch(u, { method, headers });
  const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok || json.error) {
    const err = json.error as { message?: string; code?: number } | undefined;
    throw new Error(`Facebook API ${res.status}${err?.code ? ` (${err.code})` : ""}: ${err?.message ?? JSON.stringify(json).slice(0, 300)}`);
  }
  return json;
}

/** 生成済みの動画 (公開 URL) を、ページのリールとして公開する。戻り値は video_id */
export async function postReelToFacebook(input: { videoUrl: string; description: string }): Promise<{ id: string }> {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const token = process.env.FACEBOOK_PAGE_TOKEN;
  if (!pageId || !token) throw new Error("Facebook ページの連携が設定されていません (FACEBOOK_PAGE_ID / FACEBOOK_PAGE_TOKEN)");

  const start = await call("POST", `${GRAPH}/${pageId}/video_reels`, { upload_phase: "start", access_token: token });
  const videoId = String(start.video_id ?? "");
  const uploadUrl = String(start.upload_url ?? `https://rupload.facebook.com/video-upload/${VERSION}/${videoId}`);
  if (!videoId) throw new Error("Facebook: video_id を受け取れませんでした");

  const up = await call("POST", uploadUrl, {}, { Authorization: `OAuth ${token}`, file_url: input.videoUrl });
  if (up.success === false) throw new Error(`Facebook: 動画のアップロードに失敗しました (${JSON.stringify(up).slice(0, 200)})`);

  const fin = await call("POST", `${GRAPH}/${pageId}/video_reels`, {
    upload_phase: "finish",
    video_id: videoId,
    video_state: "PUBLISHED",
    description: input.description.slice(0, 2000),
    access_token: token,
  });
  if (fin.success === false) throw new Error(`Facebook: 公開に失敗しました (${JSON.stringify(fin).slice(0, 200)})`);
  return { id: videoId };
}

// ------------------------------------------------------------------
// 連携 (OAuth)。/internal/social/facebook-auth → Facebook の許可画面 → /internal/social/facebook-callback
// ------------------------------------------------------------------
function appCreds(): { appId: string; appSecret: string } {
  const appId = process.env.FACEBOOK_APP_ID;
  const appSecret = process.env.FACEBOOK_APP_SECRET;
  if (!appId || !appSecret) throw new Error("FACEBOOK_APP_ID / FACEBOOK_APP_SECRET が設定されていません");
  return { appId, appSecret };
}

export function facebookAuthUrl(redirectUri: string, state: string): string {
  const { appId } = appCreds();
  const u = new URL(`https://www.facebook.com/${VERSION}/dialog/oauth`);
  u.searchParams.set("client_id", appId);
  u.searchParams.set("redirect_uri", redirectUri);
  u.searchParams.set("state", state);
  u.searchParams.set("scope", SCOPES.join(","));
  u.searchParams.set("response_type", "code");
  return u.toString();
}

/** 認可コード → 長期のユーザートークン → 管理しているページの一覧 (各ページの期限なしトークンつき) */
export async function facebookAuthFinish(code: string, redirectUri: string): Promise<{ id: string; name: string; token: string }[]> {
  const { appId, appSecret } = appCreds();
  const short = await call("GET", `${GRAPH}/oauth/access_token`, { client_id: appId, client_secret: appSecret, redirect_uri: redirectUri, code });
  const long = await call("GET", `${GRAPH}/oauth/access_token`, {
    grant_type: "fb_exchange_token",
    client_id: appId,
    client_secret: appSecret,
    fb_exchange_token: String(short.access_token ?? ""),
  });
  const pages = await call("GET", `${GRAPH}/me/accounts`, { fields: "id,name,access_token", access_token: String(long.access_token ?? "") });
  const data = (pages.data ?? []) as { id: string; name: string; access_token: string }[];
  return data.map((p) => ({ id: p.id, name: p.name, token: p.access_token }));
}
