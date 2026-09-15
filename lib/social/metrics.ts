import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import { getGoogleAccessToken } from "@/lib/metrics/google-auth";
import { dateRange } from "@/lib/metrics/sources";
import { xApiGet } from "./x";
import { getSetting } from "./store";
import { getInstagramPermalink } from "./instagram";
import type { SocialChannel } from "./store";

// 自社SNS投稿の反応 (いいね・返信・リポスト・表示) を各APIから取り込み、social_metrics に保存する。
// /admin/social (配信ダッシュボード) が読む。テーブル定義は docs/social-posts.sql。

export interface PostMetrics {
  external_id: string;
  channel: SocialChannel;
  likes: number;
  replies: number;
  reposts: number;
  quotes: number;
  impressions: number | null;
  permalink: string | null;
  fetched_at: string;
}

export interface SocialPostRow {
  id: string;
  channel: SocialChannel;
  text: string;
  external_id: string | null;
  source: string | null;
  status: string;
  created_at: string;
}

export const ACCOUNTS = [
  { key: "x", label: "X", handle: "@aoharu_os", url: "https://x.com/aoharu_os", analytics: "https://x.com/i/account_analytics" },
  { key: "threads", label: "Threads", handle: "@aoharu_os", url: "https://www.threads.net/@aoharu_os", analytics: "https://www.threads.net/@aoharu_os/insights" },
  { key: "instagram", label: "Instagram", handle: "@aoharu_os", url: "https://www.instagram.com/aoharu_os/", analytics: "https://www.instagram.com/aoharu_os/" },
  { key: "tiktok", label: "TikTok", handle: "@aoharu_os", url: "https://www.tiktok.com/@aoharu_os", analytics: "https://www.tiktok.com/tiktokstudio/analytics" },
  { key: "note", label: "note", handle: "aoharu_os", url: "https://note.com/aoharu_os", analytics: "https://note.com/sitesettings/stats" },
  { key: "youtube", label: "YouTube", handle: "@aoharu_os", url: "https://www.youtube.com/@aoharu_os", analytics: "https://studio.youtube.com/" },
] as const;

export function postUrl(channel: SocialChannel, externalId: string | null, permalink?: string | null): string | null {
  if (permalink) return permalink;
  if (!externalId) return null;
  if (channel === "x") return `https://x.com/aoharu_os/status/${externalId}`;
  return null; // Threads / Instagram は permalink をAPIから取得する
}

// ---- 取り込み ----

async function fetchXMetrics(ids: string[]): Promise<PostMetrics[]> {
  const out: PostMetrics[] = [];
  for (let i = 0; i < ids.length; i += 100) {
    const chunk = ids.slice(i, i + 100);
    const json = await xApiGet<{ data?: { id: string; public_metrics?: Record<string, number> }[] }>("/2/tweets", {
      ids: chunk.join(","),
      "tweet.fields": "public_metrics",
    });
    for (const t of json.data ?? []) {
      const m = t.public_metrics ?? {};
      out.push({
        external_id: t.id,
        channel: "x",
        likes: m.like_count ?? 0,
        replies: m.reply_count ?? 0,
        reposts: m.retweet_count ?? 0,
        quotes: m.quote_count ?? 0,
        impressions: typeof m.impression_count === "number" ? m.impression_count : null,
        permalink: `https://x.com/aoharu_os/status/${t.id}`,
        fetched_at: new Date().toISOString(),
      });
    }
  }
  return out;
}

async function threadsToken(): Promise<string | null> {
  return (await getSetting("threads_access_token").catch(() => null)) ?? process.env.THREADS_ACCESS_TOKEN ?? null;
}

async function fetchThreadsMetrics(ids: string[]): Promise<{ metrics: PostMetrics[]; warning?: string }> {
  const token = await threadsToken();
  if (!token) return { metrics: [], warning: "Threads のトークンが未設定" };
  const metrics: PostMetrics[] = [];
  let warning: string | undefined;
  for (const id of ids) {
    const base = `https://graph.threads.net/v1.0/${id}`;
    const infoRes = await fetch(`${base}?fields=permalink&access_token=${encodeURIComponent(token)}`);
    const info = (await infoRes.json().catch(() => ({}))) as { permalink?: string; error?: { message?: string } };
    const row: PostMetrics = {
      external_id: id,
      channel: "threads",
      likes: 0,
      replies: 0,
      reposts: 0,
      quotes: 0,
      impressions: null,
      permalink: info.permalink ?? null,
      fetched_at: new Date().toISOString(),
    };
    const insRes = await fetch(`${base}/insights?metric=views,likes,replies,reposts,quotes&access_token=${encodeURIComponent(token)}`);
    const ins = (await insRes.json().catch(() => ({}))) as { data?: { name: string; values?: { value: number }[] }[]; error?: { message?: string } };
    if (insRes.ok && ins.data) {
      for (const d of ins.data) {
        const v = d.values?.[0]?.value ?? 0;
        if (d.name === "views") row.impressions = v;
        if (d.name === "likes") row.likes = v;
        if (d.name === "replies") row.replies = v;
        if (d.name === "reposts") row.reposts = v;
        if (d.name === "quotes") row.quotes = v;
      }
    } else if (!warning) {
      warning = `Threads insights: ${ins.error?.message ?? insRes.status}（threads_manage_insights 権限付きのトークンが必要）`;
    }
    metrics.push(row);
  }
  return { metrics, warning };
}

export async function refreshSocialMetrics(days = 60): Promise<{ updated: number; warnings: string[] }> {
  const supabase = getSupabaseAdmin();
  const since = new Date(Date.now() - days * 86400 * 1000).toISOString();
  const { data, error } = await supabase
    .from("social_posts")
    .select("channel,external_id")
    .eq("status", "posted")
    .gte("created_at", since)
    .not("external_id", "is", null);
  if (error) throw new Error(`social_posts select: ${error.message}`);
  const xIds = (data ?? []).filter((r) => r.channel === "x").map((r) => r.external_id as string);
  const thIds = (data ?? []).filter((r) => r.channel === "threads").map((r) => r.external_id as string);
  const igIds = (data ?? []).filter((r) => r.channel === "instagram").map((r) => r.external_id as string);

  const warnings: string[] = [];
  const rows: PostMetrics[] = [];
  if (xIds.length) {
    try {
      rows.push(...(await fetchXMetrics(xIds)));
    } catch (e) {
      warnings.push(`X: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
  if (thIds.length) {
    const r = await fetchThreadsMetrics(thIds);
    rows.push(...r.metrics);
    if (r.warning) warnings.push(r.warning);
  }
  for (const id of igIds) {
    const permalink = await getInstagramPermalink(id);
    rows.push({ external_id: id, channel: "instagram", likes: 0, replies: 0, reposts: 0, quotes: 0, impressions: null, permalink, fetched_at: new Date().toISOString() });
  }
  if (rows.length) {
    const { error: upErr } = await supabase.from("social_metrics").upsert(rows, { onConflict: "external_id" });
    if (upErr) throw new Error(`social_metrics upsert: ${upErr.message}`);
  }
  return { updated: rows.length, warnings };
}

// ---- 読み出し ----

export interface SocialDashboard {
  days: number;
  posts: (SocialPostRow & { metrics: PostMetrics | null; url: string | null; slot: string | null })[];
  lastFetchedAt: string | null;
  ga: { ok: boolean; error?: string; daily: { date: string; socialSessions: number; signupClicks: number }[]; sources: { source: string; sessions: number }[] };
}

function slotOf(source: string | null): string | null {
  if (!source) return null;
  const m = source.match(/(朝|昼|夜)$/);
  return m ? m[1] : null;
}

export async function getSocialDashboard(days: number): Promise<SocialDashboard> {
  const supabase = getSupabaseAdmin();
  const { start, end, dates } = dateRange(days);
  const sinceIso = `${start}T00:00:00.000Z`;
  const [{ data: posts, error: pErr }, { data: metrics, error: mErr }] = await Promise.all([
    supabase.from("social_posts").select("id,channel,text,external_id,source,status,created_at").gte("created_at", sinceIso).order("created_at", { ascending: false }).limit(500),
    supabase.from("social_metrics").select("*").limit(1000),
  ]);
  if (pErr) throw new Error(`social_posts: ${pErr.message}`);
  if (mErr) throw new Error(`social_metrics: ${mErr.message}`);
  const byId = new Map<string, PostMetrics>((metrics ?? []).map((m) => [m.external_id as string, m as PostMetrics]));
  const lastFetchedAt = (metrics ?? []).map((m) => m.fetched_at as string).sort().at(-1) ?? null;

  const merged = (posts ?? []).map((p) => {
    const m = p.external_id ? byId.get(p.external_id) ?? null : null;
    return { ...(p as SocialPostRow), metrics: m, url: postUrl(p.channel as SocialChannel, p.external_id, m?.permalink), slot: slotOf(p.source) };
  });

  // GA4: SNS経由セッション (Organic Social) の日次と、参照元
  const ga: SocialDashboard["ga"] = { ok: false, daily: dates.map((d) => ({ date: d, socialSessions: 0, signupClicks: 0 })), sources: [] };
  try {
    const token = await getGoogleAccessToken();
    const propertyId = process.env.GA4_PROPERTY_ID;
    if (!token || !propertyId) throw new Error("GA4 未設定");
    const base = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
    const run = async (body: unknown) => {
      const res = await fetch(base, { method: "POST", headers, body: JSON.stringify(body) });
      if (!res.ok) throw new Error(`GA4 ${res.status}: ${(await res.text()).slice(0, 200)}`);
      return (await res.json()) as { rows?: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }[] };
    };
    const socialFilter = { filter: { fieldName: "sessionDefaultChannelGroup", stringFilter: { matchType: "EXACT", value: "Organic Social" } } };
    const [byDate, byDateEv, bySource] = await Promise.all([
      run({ dateRanges: [{ startDate: start, endDate: end }], dimensions: [{ name: "date" }], metrics: [{ name: "sessions" }], dimensionFilter: socialFilter }),
      run({
        dateRanges: [{ startDate: start, endDate: end }],
        dimensions: [{ name: "date" }],
        metrics: [{ name: "eventCount" }],
        dimensionFilter: {
          andGroup: {
            expressions: [socialFilter, { filter: { fieldName: "eventName", stringFilter: { matchType: "EXACT", value: "sign_up_click" } } }],
          },
        },
      }),
      run({
        dateRanges: [{ startDate: start, endDate: end }],
        dimensions: [{ name: "sessionSource" }],
        metrics: [{ name: "sessions" }],
        dimensionFilter: socialFilter,
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 10,
      }),
    ]);
    const toYmd = (v: string) => `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}`;
    const map = new Map(ga.daily.map((d) => [d.date, d]));
    for (const r of byDate.rows ?? []) {
      const row = map.get(toYmd(r.dimensionValues[0].value));
      if (row) row.socialSessions = Number(r.metricValues[0].value);
    }
    for (const r of byDateEv.rows ?? []) {
      const row = map.get(toYmd(r.dimensionValues[0].value));
      if (row) row.signupClicks = Number(r.metricValues[0].value);
    }
    ga.sources = (bySource.rows ?? []).map((r) => ({ source: r.dimensionValues[0].value, sessions: Number(r.metricValues[0].value) }));
    ga.ok = true;
  } catch (e) {
    ga.error = e instanceof Error ? e.message : String(e);
  }

  return { days, posts: merged, lastFetchedAt, ga };
}
