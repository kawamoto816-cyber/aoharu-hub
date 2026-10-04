import { createHash, randomBytes } from "node:crypto";

// TikTok for Developers (Login Kit v2 + Content Posting API) 連携。
// 必要な環境変数:
//   TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET (TikTok Developer Portal のアプリ情報)
//   TIKTOK_ACCESS_TOKEN, TIKTOK_REFRESH_TOKEN (投稿アカウント @aoharu_os のトークン。
//     /internal/social/tiktok-auth で発行し、/internal/social/tiktok-callback に表示されたものを登録する)
//   run-queue からの自動投稿 (postShortToTikTok) は TIKTOK_ACCESS_TOKEN を使わず、
//   毎回 TIKTOK_REFRESH_TOKEN からアクセストークンを取り直す (24時間で失効するため)。
//   TIKTOK_ACCESS_TOKEN は /internal/social/tiktok-callback の動作確認用の単発投稿にのみ使う。
//
// OAuth 2.0 + PKCE (Authorization Code)。認可コード交換・動画投稿 (Direct Post, PULL_FROM_URL) をまとめる。
//
// 投稿の方式 (2026-10 変更):
//   TikTok の Content Sharing Guidelines は、投稿のたびに「投稿先アカウントの表示」「公開範囲を人が選ぶ (初期値なし)」
//   「コメント・デュエット・ステッチの許可」「商用コンテンツの表示 (初期値オフ)」「音楽利用の同意」を求めている。
//   そのため run-queue からの全自動投稿はやめ、/admin/social/tiktok の投稿画面から人が1本ずつ投稿する。
//   Direct Post の監査 (audit) が通るまでは、TikTok 側が SELF_ONLY (自分だけ) 以外の公開範囲を拒否する。

const AUTHORIZE_URL = "https://www.tiktok.com/v2/auth/authorize/";
const TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/";
const REFRESH_URL = TOKEN_URL;
const POST_INIT_URL = "https://open.tiktokapis.com/v2/post/publish/video/init/";
const POST_STATUS_URL = "https://open.tiktokapis.com/v2/post/publish/status/fetch/";
const CREATOR_INFO_URL = "https://open.tiktokapis.com/v2/post/publish/creator_info/query/";

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

// 自動投稿キューが使う設定判定。TIKTOK_ACCESS_TOKEN は24時間で失効するため、
// 自動投稿では毎回 TIKTOK_REFRESH_TOKEN からアクセストークンを取り直す (YouTube と同じ方式)。
export function isTikTokPostingConfigured(): boolean {
  return Boolean(process.env.TIKTOK_CLIENT_KEY && process.env.TIKTOK_CLIENT_SECRET && process.env.TIKTOK_REFRESH_TOKEN);
}

export async function getAccessToken(): Promise<string> {
  const refreshToken = process.env.TIKTOK_REFRESH_TOKEN;
  if (!refreshToken) throw new Error("TikTok のリフレッシュトークンが設定されていません (TIKTOK_REFRESH_TOKEN)");
  const { accessToken } = await tiktokRefreshToken(refreshToken);
  return accessToken;
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
    const code = json.error?.code;
    const message = json.error?.message;
    const detail = code && message ? `${code}: ${message}` : (message ?? code ?? JSON.stringify(json).slice(0, 300));
    throw new Error(`post init ${res.status}: ${detail}`);
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

// ---- 投稿画面 (/admin/social/tiktok) 用 ----

export interface TikTokCreatorInfo {
  avatarUrl: string;
  username: string;
  nickname: string;
  privacyLevelOptions: string[];
  commentDisabled: boolean;
  duetDisabled: boolean;
  stitchDisabled: boolean;
  maxVideoPostDurationSec: number;
}

/**
 * 投稿画面を開くたびに呼ぶ (ガイドライン: 最新のクリエイター情報を表示し、公開範囲の選択肢はここから出す)。
 * 1日の投稿上限などで今は投稿できない場合は、TikTok のエラーをそのまま投げる (画面に表示する)。
 */
export async function queryCreatorInfo(accessToken: string): Promise<TikTokCreatorInfo> {
  const res = await fetch(CREATOR_INFO_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json; charset=UTF-8" },
  });
  const json = (await res.json().catch(() => ({}))) as {
    data?: {
      creator_avatar_url?: string;
      creator_username?: string;
      creator_nickname?: string;
      privacy_level_options?: string[];
      comment_disabled?: boolean;
      duet_disabled?: boolean;
      stitch_disabled?: boolean;
      max_video_post_duration_sec?: number;
    };
    error?: { code?: string; message?: string };
  };
  if (!res.ok || (json.error?.code && json.error.code !== "ok")) {
    throw new Error(`creator_info ${res.status}: ${json.error?.code ?? ""} ${json.error?.message ?? ""}`.trim());
  }
  const d = json.data ?? {};
  return {
    avatarUrl: d.creator_avatar_url ?? "",
    username: d.creator_username ?? "",
    nickname: d.creator_nickname ?? "",
    privacyLevelOptions: d.privacy_level_options ?? [],
    commentDisabled: Boolean(d.comment_disabled),
    duetDisabled: Boolean(d.duet_disabled),
    stitchDisabled: Boolean(d.stitch_disabled),
    maxVideoPostDurationSec: d.max_video_post_duration_sec ?? 0,
  };
}

export interface TikTokPostChoices {
  title: string;
  privacyLevel: string;
  allowComment: boolean;
  allowDuet: boolean;
  allowStitch: boolean;
  /** 商用コンテンツ: 自分のブランドの宣伝 (Promotional content) */
  brandOrganic: boolean;
  /** 商用コンテンツ: 第三者との有償の提携 (Paid partnership) */
  brandedContent: boolean;
}

/**
 * 人が投稿画面で選んだ内容で、動画ファイルを直接アップロードして投稿する (FILE_UPLOAD)。
 * PULL_FROM_URL はドメインの所有確認が必要で、動画の置き場所 (Supabase Storage) は確認できないため使わない。
 */
export async function postVideoFileUpload(accessToken: string, videoUrl: string, c: TikTokPostChoices): Promise<{ publishId: string }> {
  const file = await fetch(videoUrl);
  if (!file.ok) throw new Error(`動画の取得に失敗しました (${file.status})`);
  const bytes = Buffer.from(await file.arrayBuffer());
  const size = bytes.length;
  if (size > 64 * 1024 * 1024) throw new Error("動画が64MBを超えているため、1回のアップロードで送れません");

  const init = await fetch(POST_INIT_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      post_info: {
        title: c.title.slice(0, 2200),
        privacy_level: c.privacyLevel,
        disable_comment: !c.allowComment,
        disable_duet: !c.allowDuet,
        disable_stitch: !c.allowStitch,
        brand_organic_toggle: c.brandOrganic,
        brand_content_toggle: c.brandedContent,
      },
      source_info: { source: "FILE_UPLOAD", video_size: size, chunk_size: size, total_chunk_count: 1 },
    }),
  });
  const json = (await init.json().catch(() => ({}))) as {
    data?: { publish_id?: string; upload_url?: string };
    error?: { code?: string; message?: string };
  };
  if (!init.ok || !json.data?.publish_id || !json.data.upload_url) {
    throw new Error(`post init ${init.status}: ${json.error?.code ?? ""} ${json.error?.message ?? JSON.stringify(json).slice(0, 300)}`.trim());
  }
  const put = await fetch(json.data.upload_url, {
    method: "PUT",
    headers: {
      "Content-Type": "video/mp4",
      "Content-Length": String(size),
      "Content-Range": `bytes 0-${size - 1}/${size}`,
    },
    body: bytes,
  });
  if (!put.ok) throw new Error(`upload ${put.status}: ${(await put.text().catch(() => "")).slice(0, 300)}`);
  return { publishId: json.data.publish_id };
}
