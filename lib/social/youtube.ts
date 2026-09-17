// YouTube Data API v3 連携 (YouTube Shorts 自動投稿)。
// 必要な環境変数:
//   YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET (Google Cloud Console の OAuth 2.0 クライアント ID)
//   YOUTUBE_REFRESH_TOKEN (投稿したい Google/YouTube チャンネルで /internal/social/youtube-auth を開いて発行し、
//     /internal/social/youtube-callback に表示されたものを登録する)
//
// 重要 (必ず対応すること): Google Cloud Console の「OAuth 同意画面」の公開ステータスが
// 「テスト中 (Testing)」のままだと、発行されるリフレッシュトークンが7日で自動失効し、
// 自動投稿がある日突然止まる。「本番環境 (In production)」に切り替えること
// (Google の審査が未完了でも切替は可能。ただしその場合、/internal/social/youtube-auth を開いた際に
//  一度だけ「Google で確認されていないアプリです」という警告画面が出るので、
//  「詳細」→「<アプリ名>に移動 (安全ではないページ)」を選んで進めばよい)。
// これは投稿先アカウント本人 (じゅんさん) がその場でクリックする一度きりの手動操作で、
// 以降は自動投稿がリフレッシュトークンの失効で止まることはなくなる。
//
// アップロード方式について: YouTube Data API は TikTok の PULL_FROM_URL のような
// 「動画URLを渡すだけ」の方式に対応していない。動画の実体 (バイト列) を
// このサーバーが一度取得し、YouTube 側へ multipart アップロードする。

const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const UPLOAD_URL = "https://www.googleapis.com/upload/youtube/v3/videos";

export const YOUTUBE_SCOPES = ["https://www.googleapis.com/auth/youtube.upload"];

export function isYouTubeConfigured(): boolean {
  return Boolean(process.env.YOUTUBE_CLIENT_ID && process.env.YOUTUBE_CLIENT_SECRET);
}

export function isYouTubePostingConfigured(): boolean {
  return Boolean(process.env.YOUTUBE_CLIENT_ID && process.env.YOUTUBE_CLIENT_SECRET && process.env.YOUTUBE_REFRESH_TOKEN);
}

function creds(): { clientId: string; clientSecret: string } {
  const clientId = process.env.YOUTUBE_CLIENT_ID;
  const clientSecret = process.env.YOUTUBE_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error("YouTube のキーが設定されていません (YOUTUBE_CLIENT_ID / YOUTUBE_CLIENT_SECRET)");
  return { clientId, clientSecret };
}

function randomState(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
}

// ---- 3-legged OAuth 2.0 (Authorization Code) ----

export function youtubeAuthStart(redirectUri: string): { authorizeUrl: string; state: string } {
  const { clientId } = creds();
  const state = randomState();
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    scope: YOUTUBE_SCOPES.join(" "),
    redirect_uri: redirectUri,
    state,
    access_type: "offline", // リフレッシュトークンを発行させる
    prompt: "consent", // 過去に同意済みでも毎回リフレッシュトークンを再発行させる
    include_granted_scopes: "true",
  });
  return { authorizeUrl: `${AUTH_URL}?${params.toString()}`, state };
}

export interface YouTubeTokenResult {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  scope: string;
}

export async function youtubeAuthFinish(code: string, redirectUri: string): Promise<YouTubeTokenResult> {
  const { clientId, clientSecret } = creds();
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
  });
  const json = (await res.json().catch(() => ({}))) as Record<string, unknown> & {
    access_token?: string;
    refresh_token?: string;
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
    expiresIn: json.expires_in ?? 0,
    scope: json.scope ?? "",
  };
}

async function refreshAccessToken(refreshToken: string): Promise<string> {
  const { clientId, clientSecret } = creds();
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  const json = (await res.json().catch(() => ({}))) as { access_token?: string; error?: string; error_description?: string };
  if (!res.ok || !json.access_token) {
    throw new Error(`refresh ${res.status}: ${json.error_description ?? json.error ?? JSON.stringify(json).slice(0, 300)}`);
  }
  return json.access_token;
}

async function getAccessToken(): Promise<string> {
  const refreshToken = process.env.YOUTUBE_REFRESH_TOKEN;
  if (!refreshToken) throw new Error("YouTube のリフレッシュトークンが設定されていません (YOUTUBE_REFRESH_TOKEN)");
  return refreshAccessToken(refreshToken);
}

// ---- 動画アップロード (multipart: メタデータ + 動画本体を1リクエストで送る) ----

export async function uploadShortToYouTube(video: {
  videoUrl: string;
  title: string;
  description: string;
  tags?: string[];
}): Promise<{ id: string }> {
  const accessToken = await getAccessToken();

  const videoRes = await fetch(video.videoUrl);
  if (!videoRes.ok) throw new Error(`動画の取得に失敗しました (${videoRes.status}): ${video.videoUrl}`);
  const videoBuffer = Buffer.from(await videoRes.arrayBuffer());

  const metadata = {
    snippet: {
      title: video.title.slice(0, 100),
      description: video.description.slice(0, 5000),
      tags: video.tags?.slice(0, 15),
      categoryId: "27", // Education
    },
    status: {
      privacyStatus: "public",
      selfDeclaredMadeForKids: false,
    },
  };

  const boundary = `aoharu-shorts-${Date.now()}`;
  const preamble = Buffer.from(
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n--${boundary}\r\nContent-Type: video/mp4\r\n\r\n`,
    "utf-8",
  );
  const epilogue = Buffer.from(`\r\n--${boundary}--`, "utf-8");
  const body = Buffer.concat([preamble, videoBuffer, epilogue]);

  const url = `${UPLOAD_URL}?uploadType=multipart&part=snippet,status`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": `multipart/related; boundary=${boundary}`,
    },
    body,
  });
  const json = (await res.json().catch(() => ({}))) as { id?: string; error?: { message?: string } };
  if (!res.ok || !json.id) {
    throw new Error(`upload ${res.status}: ${json.error?.message ?? JSON.stringify(json).slice(0, 300)}`);
  }
  return { id: json.id };
}
