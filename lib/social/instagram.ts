import { getSetting, setSetting } from "./store";
import { cardImageUrl, type CardContent } from "./card";

// Instagram への画像投稿 (Instagram API with Instagram Login)。
// トークンは長期トークン (60日)。app_settings の最新値を優先し、なければ環境変数 INSTAGRAM_ACCESS_TOKEN。
//   必要な環境変数: INSTAGRAM_ACCESS_TOKEN (instagram_business_basic + instagram_business_content_publish)
// 手順: 画像URL (自サイトのカード生成) → コンテナ作成 → 処理完了待ち → 公開。

const GRAPH = "https://graph.instagram.com/v24.0";
const SETTING_KEY = "instagram_access_token";

export function isInstagramConfigured(): boolean {
  return Boolean(process.env.INSTAGRAM_ACCESS_TOKEN);
}

async function getToken(): Promise<string> {
  const stored = await getSetting(SETTING_KEY).catch(() => null);
  const token = stored ?? process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) throw new Error("Instagram のアクセストークンが設定されていません (INSTAGRAM_ACCESS_TOKEN)");
  return token;
}

async function graph(method: "GET" | "POST", path: string, params: Record<string, string>): Promise<Record<string, unknown>> {
  const url = new URL(`${GRAPH}${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url, { method });
  const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    const err = json.error as { message?: string } | undefined;
    throw new Error(`Instagram API ${res.status}: ${err?.message ?? JSON.stringify(json).slice(0, 300)}`);
  }
  return json;
}

async function getUserId(token: string): Promise<string> {
  const cached = await getSetting("instagram_user_id").catch(() => null);
  if (cached) return cached;
  const me = await graph("GET", "/me", { fields: "user_id,username", access_token: token });
  const id = String(me.user_id ?? me.id ?? "");
  if (!id) throw new Error("Instagram: user_id を取得できませんでした");
  await setSetting("instagram_user_id", id).catch(() => undefined);
  return id;
}

export async function postToInstagram(card: CardContent, origin?: string): Promise<{ id: string; imageUrl: string }> {
  const token = await getToken();
  const userId = await getUserId(token);
  const imageUrl = cardImageUrl(card, origin);
  const container = await graph("POST", `/${userId}/media`, { image_url: imageUrl, caption: card.caption, access_token: token });
  const creationId = String(container.id ?? "");
  if (!creationId) throw new Error("Instagram: コンテナIDが取得できませんでした");
  // 画像の取り込みが終わるまで待つ (最大 ~40秒)
  for (let i = 0; i < 8; i++) {
    const st = await graph("GET", `/${creationId}`, { fields: "status_code,status", access_token: token });
    const code = String(st.status_code ?? "");
    if (code === "FINISHED") break;
    if (code === "ERROR") throw new Error(`Instagram: コンテナ処理エラー ${String(st.status ?? "")}`);
    await new Promise((r) => setTimeout(r, 5000));
  }
  const published = await graph("POST", `/${userId}/media_publish`, { creation_id: creationId, access_token: token });
  const id = String(published.id ?? "");
  if (!id) throw new Error("Instagram: 公開IDが取得できませんでした");
  return { id, imageUrl };
}

/**
 * リールの取り込みが「実行時間内に終わらなかった」ことを表す。
 * Instagram 側の恒久的なエラーではなく、次回の実行でやり直せば成功する種類の中断なので、
 * 呼び出し側はこれを失敗として数えない (attempts を増やさない) こと。
 */
export class ReelPendingError extends Error {
  readonly creationId: string;
  constructor(creationId: string, status: string) {
    super(`Instagram: リールの取り込みが実行時間内に終わりませんでした (現在の状態 ${status})。次回の実行でやり直します`);
    this.name = "ReelPendingError";
    this.creationId = creationId;
  }
}

/**
 * ショート動画を Instagram リールとして投稿する。
 * video_url は公開アクセス可能な URL (Supabase Storage の public バケット) を渡すこと。
 * 画像と同じくコンテナ作成 → 処理完了待ち (動画のため長め) → 公開、の3段階。
 *
 * deadlineAt (エポックミリ秒) を渡すと、その時刻までしか取り込み完了を待たない。
 * サーバーレス関数の実行時間上限 (Vercel Hobby は 60 秒) の中に収めるために使う。
 * 期限までに終わらなかった場合は ReelPendingError を投げる (恒久的な失敗ではない)。
 */
export async function postReelToInstagram(
  video: { videoUrl: string; caption: string },
  opts: { deadlineAt?: number } = {},
): Promise<{ id: string }> {
  const token = await getToken();
  const userId = await getUserId(token);
  const container = await graph("POST", `/${userId}/media`, {
    video_url: video.videoUrl,
    caption: video.caption.slice(0, 2200),
    media_type: "REELS",
    access_token: token,
  });
  const creationId = String(container.id ?? "");
  if (!creationId) throw new Error("Instagram: リールのコンテナIDが取得できませんでした");
  // 動画の取り込み・処理完了を待つ (既定は最大 96秒。deadlineAt が渡されていればそちらを優先する)
  const deadlineAt = opts.deadlineAt ?? Date.now() + 96_000;
  const POLL_MS = 6_000;
  let status = "IN_PROGRESS";
  let statusDetail = "";
  for (;;) {
    const st = await graph("GET", `/${creationId}`, { fields: "status_code,status", access_token: token });
    status = String(st.status_code ?? "");
    statusDetail = String(st.status ?? "");
    if (status === "FINISHED") break;
    if (status === "ERROR" || status === "EXPIRED") throw new Error(`Instagram: リール処理エラー (${status}) ${statusDetail}`);
    // 次のポーリングまで待つと期限を越えてしまうなら、ここで打ち切る (関数が強制終了されるのを避ける)
    if (Date.now() + POLL_MS >= deadlineAt) break;
    await new Promise((r) => setTimeout(r, POLL_MS));
  }
  if (status !== "FINISHED") throw new ReelPendingError(creationId, `${status} ${statusDetail}`.trim());
  const published = await graph("POST", `/${userId}/media_publish`, { creation_id: creationId, access_token: token });
  const id = String(published.id ?? "");
  if (!id) throw new Error("Instagram: リール公開IDが取得できませんでした");
  return { id };
}

export async function getInstagramPermalink(mediaId: string): Promise<string | null> {
  try {
    const token = await getToken();
    const m = await graph("GET", `/${mediaId}`, { fields: "permalink", access_token: token });
    return typeof m.permalink === "string" ? m.permalink : null;
  } catch {
    return null;
  }
}

// 長期トークンの更新 (60日ごとに失効。週1で呼ぶ)
export async function refreshInstagramToken(): Promise<{ expiresInDays: number }> {
  const token = await getToken();
  const url = new URL("https://graph.instagram.com/refresh_access_token");
  url.searchParams.set("grant_type", "ig_refresh_token");
  url.searchParams.set("access_token", token);
  const res = await fetch(url);
  const json = (await res.json().catch(() => ({}))) as { access_token?: string; expires_in?: number; error?: { message?: string } };
  if (!res.ok || !json.access_token) throw new Error(`Instagram refresh ${res.status}: ${json.error?.message ?? JSON.stringify(json).slice(0, 200)}`);
  await setSetting(SETTING_KEY, json.access_token);
  await setSetting("instagram_token_refreshed_at", new Date().toISOString());
  return { expiresInDays: Math.round((json.expires_in ?? 0) / 86400) };
}
