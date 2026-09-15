import { createSign } from "node:crypto";

// Google のサービスアカウント (JSONキー) からアクセストークンを取得する最小実装。
// googleapis / google-auth-library を入れずに済ませるため、JWT (RS256) を自前で署名する。
// 環境変数 GA4_SERVICE_ACCOUNT_JSON にキーファイルの全文 (JSON) を入れておく。

interface ServiceAccountKey {
  client_email: string;
  private_key: string;
  token_uri?: string;
}

// Drive 読み取りは SNS 投稿キュー (Google ドキュメント) を読むために使う。
// 対象フォルダをサービスアカウントのメールアドレスに「閲覧者」で共有しておくこと。
const SCOPES = [
  "https://www.googleapis.com/auth/analytics.readonly",
  "https://www.googleapis.com/auth/webmasters.readonly",
  "https://www.googleapis.com/auth/drive.readonly",
];

let cached: { token: string; expiresAt: number } | null = null;

function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

export function getServiceAccount(): ServiceAccountKey | null {
  const raw = process.env.GA4_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ServiceAccountKey;
    if (!parsed.client_email || !parsed.private_key) return null;
    return parsed;
  } catch {
    return null;
  }
}

/** アクセストークンを取得 (55分キャッシュ)。サービスアカウント未設定なら null */
export async function getGoogleAccessToken(): Promise<string | null> {
  const key = getServiceAccount();
  if (!key) return null;

  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.token;

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: key.client_email,
      scope: SCOPES.join(" "),
      aud: key.token_uri ?? "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  );
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const signature = base64url(signer.sign(key.private_key));
  const assertion = `${header}.${claims}.${signature}`;

  const res = await fetch(key.token_uri ?? "https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!res.ok) {
    throw new Error(`Google token取得に失敗: ${res.status} ${await res.text()}`);
  }
  const json = (await res.json()) as { access_token: string; expires_in: number };
  cached = { token: json.access_token, expiresAt: Date.now() + json.expires_in * 1000 };
  return cached.token;
}
