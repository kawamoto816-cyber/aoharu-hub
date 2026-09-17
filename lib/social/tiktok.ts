import { createHash, randomBytes } from "node:crypto";

// TikTok for Developers (Login Kit v2 + Content Posting API) 連携。
// 必要な環境変数:
//   TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET (TikTok Developer Portal のアプリ情報)
//   TIKTOK_ACCESS_TOKEN, TIKTOK_REFRESH_TOKEN (投稿アカウント @aoharu_os のトークン。
//     /internal/social/tiktok-auth で発行し、/internal/social/tiktok-callback に表示されたものを登録する)
//
// OAuth 2.0 + PKCE (Authorization Code)。認可コード交換・動画投稿 (Direct Post, PULL_FROM_URL) をまとめる。

const AUTHORIZE_URL = "https://www.tiktok.com/v2/auth/authorize/";
const TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/";
const REFRESH_URL = TOKEN_URL;
const POST_INIT_URL = "https://open.tiktokapis.com/v2/post/publish/video/init/";
const POST_STATUS_URL = "https://open.tiktokapis.com/v2/post/publish/status/fetch/";

// アプリ審査 (App Review) に登録しているスコープ。Direct Post を使うため video.publish を含む。
export const TIKTOK_SCOPES = ["user.info.basic", "video.publish", "video.upload"];

export function isTikTokConfigured(): boolean {
  return Boolean(process.env.TIKTOK_CLIENT_KEY && process.env.TIKTOK_CLIENT_SECRET);
}

function creds(): { clientKey: string; clientSecret: string } {
  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET;
  if (!clientKey || !clientSecret) throw new Error("TikTok のキーが設定されていません (TIKTOK_CLIENT_KEY / TIKTOK_CLIENT_SECRET)");
  return { clientKey, clientSecret };
}

function base64url(buf: Buffer): string {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// ---- 3-legged OAuth 2.0 (PKCE) ----

export function tiktokAuthStart(redirectUri: string): {
  authorizeUrl: string;
  state: string;
  codeVerifier: string;
} {
  const { clientKey } = creds();
  const codeVerifier = base64url(randomBytes(32));
  const codeChallenge = base64url(createHash("sha256").update(codeVerifier).digest());
  const state = base64url(randomBytes(16));
  const params = new URLSearchParams({
    client_key: clientKey,
    response_type: "code",
    scope: TIKTOK_SCOPES.join(","),
    redirect_uri: redirectUri,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });
  return { authorizeUrl: `${AUTHORIZE_URL}?${params.toString()}`, state, codeVerifier };
}

export interface TikTokTokenResult {
  accessToken: string;
  refreshToken: string;
  openId: string;
  expiresIn: number;
  scope: string;
}

export async function tiktokAuthFinish(code: string, codeVerifier: string, redirectUri: string): Promise<TikTokTokenResult> {
  const { clientKey, clientSecret } = creds();
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", "Cache-Control": "no-cache" },
    body: new URLSearchParams({
      client_key: clientKey,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  });
  const json = (await res.json().catch(() => ({}))) as Record<string, unknown> & {
    access_token?: string;
    refresh_token?: string;
    open_id?: string;
    expires_in?: number;
    scope?: string;
    error?: string;
    error_description?: string;
  };
  if (!res.ok || !json.access_token) {
    throw new Error(`token ${res.status}: ${json.error_description ?? json.error ?? JSON.stringify(json).slice(0, 300)}`);
  }
  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token ?? "",
    openId: json.open_id ?? "",
    expiresIn: json.expires_in ?? 0,
    scope: json.scope ?? "",
  };
}

export async function tiktokRefreshToken(refreshToken: string): Promise<TikTokTokenResult> {
  const { clientKey, clientSecret } = creds();
  const res = await fetch(REFRESH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", "Cache-Control": "no-cache" },
    body: new URLSearchParams({
      client_key: clientKey,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  const json = (await res.json().catch(() => ({}))) as Record<string, unknown> & {
    access_token?: string;
    refresh_token?: string;
    open_id?: string;
    expires_in?: number;
    scope?: string;
    error?: string;
    error_description?: string;
  };
  if (!res.ok || !json.access_token) {
    throw new Error(`refresh ${res.status}: ${json.error_description ?? json.error ?? JSON.stringify(json).slice(0, 300)}`);
  }
  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token ?? refreshToken,
    openId: json.open_id ?? "",
    expiresIn: json.expires_in ?? 0,
    scope: json.scope ?? "",
  };
}

// ---- Content Posting API (Direct Post, PULL_FROM_URL) ----

export function isTikTokPostingConfigured(): boolean {
  return Boolean(process.env.TIKTOK_ACCESS_TOKEN);
}

/**
 * verified な URL prefix (app.bluespring.co.jp) 配下の動画 URL を渡して投稿を開始する。
 * TikTok 側が非同期に videoUrl を取得しに来るため、事前にその URL が公開アクセス可能である必要がある。
 */
export async function postVideoPullFromUrl(
  videoUrl: string,
  title: string,
  opts: { accessToken?: string; privacyLevel?: string } = {},
): Promise<{ publishId: string }> {
  const accessToken = opts.accessToken ?? process.env.TIKTOK_ACCESS_TOKEN;
  if (!accessToken) throw new Error("TikTok のアクセストークンが設定されていません (TIKTOK_ACCESS_TOKEN)");
  const res = await fetch(POST_INIT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      post_info: {
        title,
        privacy_level: opts.privacyLevel ?? "SELF_ONLY", // Sandbox / 動作確認は非公開のみ
        disable_duet: true,
        disable_comment: true,
        disable_stitch: true,
      },
      source_info: {
        source: "PULL_FROM_URL",
        video_url: videoUrl,
      },
    }),
  });
  const json = (await res.json().catch(() => ({}))) as {
    data?: { publish_id?: string };
    error?: { code?: string; message?: string };
  };
  if (!res.ok || !json.data?.publish_id) {
    throw new Error(`post init ${res.status}: ${json.error?.message ?? json.error?.code ?? JSON.stringify(json).slice(0, 300)}`);
  }
  return { publishId: json.data.publish_id };
}

export async function fetchPostStatus(publishId: string, accessToken?: string): Promise<Record<string, unknown>> {
  const token = accessToken ?? process.env.TIKTOK_ACCESS_TOKEN;
  if (!token) throw new Error("TikTok のアクセストークンが設定されていません (TIKTOK_ACCESS_TOKEN)");
  const res = await fetch(POST_STATUS_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ publish_id: publishId }),
  });
  const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) throw new Error(`post status ${res.status}: ${JSON.stringify(json).slice(0, 300)}`);
  return json;
}
