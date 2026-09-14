import { getSetting, setSetting } from "./store";

// Threads への投稿 (Threads API)。テキスト投稿はコンテナ作成 → 公開の2段階。
// トークンは長期トークン (60日)。app_settings に保存した最新値を優先し、なければ環境変数 THREADS_ACCESS_TOKEN を使う。
// refreshThreadsToken() で更新し、更新後の値は app_settings に保存する (Vercel の環境変数は書き換えられないため)。
//   必要な環境変数: THREADS_APP_ID, THREADS_APP_SECRET, THREADS_ACCESS_TOKEN

const GRAPH = "https://graph.threads.net/v1.0";
const SETTING_KEY = "threads_access_token";

export function isThreadsConfigured(): boolean {
  return Boolean(process.env.THREADS_ACCESS_TOKEN);
}

async function getToken(): Promise<string> {
  const stored = await getSetting(SETTING_KEY).catch(() => null);
  const token = stored ?? process.env.THREADS_ACCESS_TOKEN;
  if (!token) throw new Error("Threads のアクセストークンが設定されていません (THREADS_ACCESS_TOKEN)");
  return token;
}

async function graphPost(path: string, params: Record<string, string>): Promise<Record<string, unknown>> {
  const url = new URL(`${GRAPH}${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url, { method: "POST" });
  const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    const err = json.error as { message?: string } | undefined;
    throw new Error(`Threads API ${res.status}: ${err?.message ?? JSON.stringify(json).slice(0, 300)}`);
  }
  return json;
}

export async function postToThreads(text: string): Promise<{ id: string }> {
  const token = await getToken();
  const container = await graphPost("/me/threads", { media_type: "TEXT", text, access_token: token });
  const creationId = String(container.id ?? "");
  if (!creationId) throw new Error("Threads: コンテナIDが取得できませんでした");
  const published = await graphPost("/me/threads_publish", { creation_id: creationId, access_token: token });
  const id = String(published.id ?? "");
  if (!id) throw new Error("Threads: 公開IDが取得できませんでした");
  return { id };
}

// 長期トークンの更新 (発行から24時間以上経過していれば可能。有効期限が60日延びる)。
export async function refreshThreadsToken(): Promise<{ expiresInDays: number }> {
  const token = await getToken();
  const url = new URL("https://graph.threads.net/refresh_access_token");
  url.searchParams.set("grant_type", "th_refresh_token");
  url.searchParams.set("access_token", token);
  const res = await fetch(url);
  const json = (await res.json().catch(() => ({}))) as { access_token?: string; expires_in?: number; error?: { message?: string } };
  if (!res.ok || !json.access_token) {
    throw new Error(`Threads refresh ${res.status}: ${json.error?.message ?? JSON.stringify(json).slice(0, 300)}`);
  }
  await setSetting(SETTING_KEY, json.access_token);
  await setSetting("threads_token_refreshed_at", new Date().toISOString());
  return { expiresInDays: Math.round((json.expires_in ?? 0) / 86400) };
}
