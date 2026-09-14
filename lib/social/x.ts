import { createHmac, randomBytes } from "node:crypto";

// X (旧Twitter) への投稿。API v2 POST /2/tweets を OAuth 1.0a (ユーザーコンテキスト) で呼ぶ。
// 追加ライブラリなしで署名を自前計算する。必要な環境変数:
//   X_API_KEY, X_API_SECRET (Consumer Keys), X_ACCESS_TOKEN, X_ACCESS_SECRET (Read and Write で発行したもの)

const TWEETS_URL = "https://api.x.com/2/tweets";

function pct(s: string): string {
  return encodeURIComponent(s).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
}

export function isXConfigured(): boolean {
  return Boolean(process.env.X_API_KEY && process.env.X_API_SECRET && process.env.X_ACCESS_TOKEN && process.env.X_ACCESS_SECRET);
}

function buildAuthHeader(method: string, url: string): string {
  const key = process.env.X_API_KEY!;
  const secret = process.env.X_API_SECRET!;
  const token = process.env.X_ACCESS_TOKEN!;
  const tokenSecret = process.env.X_ACCESS_SECRET!;

  const oauth: Record<string, string> = {
    oauth_consumer_key: key,
    oauth_nonce: randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: token,
    oauth_version: "1.0",
  };
  // JSON ボディは署名対象に含めない (form-encoded ではないため)。クエリも使わない。
  const paramString = Object.keys(oauth)
    .sort()
    .map((k) => `${pct(k)}=${pct(oauth[k])}`)
    .join("&");
  const base = [method.toUpperCase(), pct(url), pct(paramString)].join("&");
  const signingKey = `${pct(secret)}&${pct(tokenSecret)}`;
  const signature = createHmac("sha1", signingKey).update(base).digest("base64");
  oauth.oauth_signature = signature;
  return (
    "OAuth " +
    Object.keys(oauth)
      .sort()
      .map((k) => `${pct(k)}="${pct(oauth[k])}"`)
      .join(", ")
  );
}

export async function postToX(text: string): Promise<{ id: string }> {
  if (!isXConfigured()) throw new Error("X API のキーが設定されていません (X_API_KEY 等)");
  const res = await fetch(TWEETS_URL, {
    method: "POST",
    headers: {
      Authorization: buildAuthHeader("POST", TWEETS_URL),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  const json = (await res.json().catch(() => ({}))) as { data?: { id?: string }; detail?: string; title?: string; errors?: unknown };
  if (!res.ok || !json.data?.id) {
    throw new Error(`X API ${res.status}: ${json.detail ?? json.title ?? JSON.stringify(json).slice(0, 300)}`);
  }
  return { id: json.data.id };
}
