import { createHmac, randomBytes } from "node:crypto";

// X (旧Twitter) への投稿。API v2 POST /2/tweets を OAuth 1.0a (ユーザーコンテキスト) で呼ぶ。
// 追加ライブラリなしで署名を自前計算する。必要な環境変数:
//   X_API_KEY, X_API_SECRET (アプリの Consumer Keys)
//   X_ACCESS_TOKEN, X_ACCESS_SECRET (投稿するアカウント @aoharu_os のトークン。/internal/social/x-auth で発行)
//
// 開発者アカウント (課金) と投稿アカウントは別でよい。アプリに対して投稿アカウントが
// 3-legged OAuth で認可すれば、そのアカウントのアクセストークンが得られる (xAuthStart / xAuthFinish)。

const TWEETS_URL = "https://api.x.com/2/tweets";
const REQUEST_TOKEN_URL = "https://api.x.com/oauth/request_token";
const AUTHORIZE_URL = "https://api.x.com/oauth/authorize";
const ACCESS_TOKEN_URL = "https://api.x.com/oauth/access_token";

function pct(s: string): string {
  return encodeURIComponent(s).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
}

export function isXConfigured(): boolean {
  return Boolean(process.env.X_API_KEY && process.env.X_API_SECRET && process.env.X_ACCESS_TOKEN && process.env.X_ACCESS_SECRET);
}

function consumer(): { key: string; secret: string } {
  const key = process.env.X_API_KEY;
  const secret = process.env.X_API_SECRET;
  if (!key || !secret) throw new Error("X API のキーが設定されていません (X_API_KEY / X_API_SECRET)");
  return { key, secret };
}

/**
 * OAuth 1.0a の Authorization ヘッダーを作る。
 * extraParams: 署名に含める追加パラメータ (oauth_callback / oauth_verifier / form-encoded ボディ)。JSON ボディは含めない。
 */
function buildAuthHeader(
  method: string,
  url: string,
  creds: { token?: string; tokenSecret?: string },
  extraParams: Record<string, string> = {},
): string {
  const { key, secret } = consumer();
  const oauth: Record<string, string> = {
    oauth_consumer_key: key,
    oauth_nonce: randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_version: "1.0",
    ...(creds.token ? { oauth_token: creds.token } : {}),
    ...extraParams,
  };
  const paramString = Object.keys(oauth)
    .sort()
    .map((k) => `${pct(k)}=${pct(oauth[k])}`)
    .join("&");
  const base = [method.toUpperCase(), pct(url), pct(paramString)].join("&");
  const signingKey = `${pct(secret)}&${pct(creds.tokenSecret ?? "")}`;
  const signature = createHmac("sha1", signingKey).update(base).digest("base64");
  const header: Record<string, string> = { ...oauth, oauth_signature: signature };
  return (
    "OAuth " +
    Object.keys(header)
      .filter((k) => k.startsWith("oauth_"))
      .sort()
      .map((k) => `${pct(k)}="${pct(header[k])}"`)
      .join(", ")
  );
}

export async function postToX(text: string): Promise<{ id: string }> {
  if (!isXConfigured()) throw new Error("X API のキーが設定されていません (X_API_KEY 等)");
  const res = await fetch(TWEETS_URL, {
    method: "POST",
    headers: {
      Authorization: buildAuthHeader("POST", TWEETS_URL, {
        token: process.env.X_ACCESS_TOKEN!,
        tokenSecret: process.env.X_ACCESS_SECRET!,
      }),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  const json = (await res.json().catch(() => ({}))) as { data?: { id?: string }; detail?: string; title?: string };
  if (!res.ok || !json.data?.id) {
    throw new Error(`X API ${res.status}: ${json.detail ?? json.title ?? JSON.stringify(json).slice(0, 300)}`);
  }
  return { id: json.data.id };
}

// ---- 3-legged OAuth (投稿アカウントの認可) ----

export async function xAuthStart(callbackUrl: string): Promise<{ authorizeUrl: string; requestToken: string; requestSecret: string }> {
  const res = await fetch(REQUEST_TOKEN_URL, {
    method: "POST",
    headers: { Authorization: buildAuthHeader("POST", REQUEST_TOKEN_URL, {}, { oauth_callback: callbackUrl }) },
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`request_token ${res.status}: ${body.slice(0, 300)}`);
  const p = new URLSearchParams(body);
  const requestToken = p.get("oauth_token");
  const requestSecret = p.get("oauth_token_secret");
  if (!requestToken || !requestSecret || p.get("oauth_callback_confirmed") !== "true") {
    throw new Error(`request_token の応答が不正です: ${body.slice(0, 200)}`);
  }
  return { authorizeUrl: `${AUTHORIZE_URL}?oauth_token=${encodeURIComponent(requestToken)}`, requestToken, requestSecret };
}

export async function xAuthFinish(
  requestToken: string,
  requestSecret: string,
  verifier: string,
): Promise<{ accessToken: string; accessSecret: string; screenName: string; userId: string }> {
  const res = await fetch(ACCESS_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: buildAuthHeader("POST", ACCESS_TOKEN_URL, { token: requestToken, tokenSecret: requestSecret }, { oauth_verifier: verifier }),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `oauth_verifier=${encodeURIComponent(verifier)}`,
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`access_token ${res.status}: ${body.slice(0, 300)}`);
  const p = new URLSearchParams(body);
  const accessToken = p.get("oauth_token");
  const accessSecret = p.get("oauth_token_secret");
  if (!accessToken || !accessSecret) throw new Error(`access_token の応答が不正です: ${body.slice(0, 200)}`);
  return { accessToken, accessSecret, screenName: p.get("screen_name") ?? "", userId: p.get("user_id") ?? "" };
}
