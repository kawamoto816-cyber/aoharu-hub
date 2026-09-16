import { getGoogleAccessToken } from "./google-auth";
import { getStripe } from "@bluespring/aoharu-entitlements";
import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";

// アオハルOS: アナリストエージェント / 管理ダッシュボード用のデータ源。
// GA4 (流入・イベント)、Search Console (検索表示・クリック)、Supabase (登録・利用)、
// Stripe (有料契約・MRR) を、それぞれ日次の系列にそろえて返す。
// どれか1つが失敗しても他は返せるように、各関数は例外を握って { error } を返す。

export interface DailyRow {
  date: string; // YYYY-MM-DD
  [metric: string]: number | string;
}

export interface SourceResult<T> {
  ok: boolean;
  data: T;
  error?: string;
}

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function dateRange(days: number): { start: string; end: string; dates: string[] } {
  const end = new Date();
  end.setUTCHours(0, 0, 0, 0);
  const dates: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setUTCDate(end.getUTCDate() - i);
    dates.push(ymd(d));
  }
  return { start: dates[0], end: dates[dates.length - 1], dates };
}

// ------------------------------------------------------------------
// GA4: 日別の セッション / ユーザー / 主要イベント数
// ------------------------------------------------------------------
export const FUNNEL_EVENTS = [
  "segment_click",
  "try_entry_click",
  "parents_cta_click",
  "share_to_child",
  "sign_up_click",
  "begin_checkout",
  "purchase",
] as const;

export interface Ga4Daily {
  date: string;
  sessions: number;
  activeUsers: number;
  newUsers: number;
  events: Record<string, number>;
}

export interface Ga4Summary {
  daily: Ga4Daily[];
  channels: { channel: string; sessions: number }[];
  pages: { path: string; views: number }[];
}

export async function fetchGa4(days: number): Promise<SourceResult<Ga4Summary | null>> {
  try {
    const token = await getGoogleAccessToken();
    const propertyId = process.env.GA4_PROPERTY_ID;
    if (!token || !propertyId) {
      return { ok: false, data: null, error: "GA4_SERVICE_ACCOUNT_JSON / GA4_PROPERTY_ID が未設定" };
    }
    const { start, end, dates } = dateRange(days);
    const base = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

    const run = async (body: unknown) => {
      const res = await fetch(base, { method: "POST", headers, body: JSON.stringify(body) });
      if (!res.ok) throw new Error(`GA4 runReport ${res.status}: ${await res.text()}`);
      return (await res.json()) as {
        rows?: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }[];
      };
    };

    const [byDate, byEvent, byChannel, byPage] = await Promise.all([
      run({
        dateRanges: [{ startDate: start, endDate: end }],
        dimensions: [{ name: "date" }],
        metrics: [{ name: "sessions" }, { name: "activeUsers" }, { name: "newUsers" }],
      }),
      run({
        dateRanges: [{ startDate: start, endDate: end }],
        dimensions: [{ name: "date" }, { name: "eventName" }],
        metrics: [{ name: "eventCount" }],
        dimensionFilter: {
          filter: { fieldName: "eventName", inListFilter: { values: [...FUNNEL_EVENTS] } },
        },
      }),
      run({
        dateRanges: [{ startDate: start, endDate: end }],
        dimensions: [{ name: "sessionDefaultChannelGroup" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 10,
      }),
      run({
        dateRanges: [{ startDate: start, endDate: end }],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 15,
      }),
    ]);

    const map = new Map<string, Ga4Daily>();
    for (const d of dates) map.set(d, { date: d, sessions: 0, activeUsers: 0, newUsers: 0, events: {} });
    const toYmd = (v: string) => `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}`;
    for (const r of byDate.rows ?? []) {
      const row = map.get(toYmd(r.dimensionValues[0].value));
      if (!row) continue;
      row.sessions = Number(r.metricValues[0].value);
      row.activeUsers = Number(r.metricValues[1].value);
      row.newUsers = Number(r.metricValues[2].value);
    }
    for (const r of byEvent.rows ?? []) {
      const row = map.get(toYmd(r.dimensionValues[0].value));
      if (!row) continue;
      row.events[r.dimensionValues[1].value] = Number(r.metricValues[0].value);
    }

    return {
      ok: true,
      data: {
        daily: [...map.values()],
        channels: (byChannel.rows ?? []).map((r) => ({
          channel: r.dimensionValues[0].value,
          sessions: Number(r.metricValues[0].value),
        })),
        pages: (byPage.rows ?? []).map((r) => ({
          path: r.dimensionValues[0].value,
          views: Number(r.metricValues[0].value),
        })),
      },
    };
  } catch (e) {
    return { ok: false, data: null, error: e instanceof Error ? e.message : String(e) };
  }
}

// ------------------------------------------------------------------
// Search Console: 日別の クリック / 表示回数 / 平均掲載順位、上位クエリ
// ------------------------------------------------------------------
export interface GscDaily {
  date: string;
  clicks: number;
  impressions: number;
  position: number;
}

export interface GscSummary {
  daily: GscDaily[];
  queries: { query: string; clicks: number; impressions: number; position: number }[];
}

export async function fetchSearchConsole(days: number): Promise<SourceResult<GscSummary | null>> {
  try {
    const token = await getGoogleAccessToken();
    if (!token) return { ok: false, data: null, error: "GA4_SERVICE_ACCOUNT_JSON が未設定" };
    // Search Console のデータは2〜3日遅れるので、終了日を少し手前にする
    const { start, end } = dateRange(days + 3);
    const endAdj = new Date(end);
    endAdj.setUTCDate(endAdj.getUTCDate() - 2);
    const site = encodeURIComponent("https://app.bluespring.co.jp/");
    const url = `https://www.googleapis.com/webmasters/v3/sites/${site}/searchAnalytics/query`;
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

    const query = async (body: unknown) => {
      const res = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
      if (!res.ok) throw new Error(`GSC query ${res.status}: ${await res.text()}`);
      return (await res.json()) as {
        rows?: { keys: string[]; clicks: number; impressions: number; position: number }[];
      };
    };

    const [byDate, byQuery] = await Promise.all([
      query({ startDate: start, endDate: ymd(endAdj), dimensions: ["date"], rowLimit: 100 }),
      query({ startDate: start, endDate: ymd(endAdj), dimensions: ["query"], rowLimit: 20 }),
    ]);

    return {
      ok: true,
      data: {
        daily: (byDate.rows ?? []).map((r) => ({
          date: r.keys[0],
          clicks: r.clicks,
          impressions: r.impressions,
          position: Math.round(r.position * 10) / 10,
        })),
        queries: (byQuery.rows ?? []).map((r) => ({
          query: r.keys[0],
          clicks: r.clicks,
          impressions: r.impressions,
          position: Math.round(r.position * 10) / 10,
        })),
      },
    };
  } catch (e) {
    return { ok: false, data: null, error: e instanceof Error ? e.message : String(e) };
  }
}

// ------------------------------------------------------------------
// Supabase: 登録ユーザー (subscriptions 行) と 利用ログ (usage_log)
// ------------------------------------------------------------------
export interface UsageSummary {
  totalUsers: number;
  usersByPlan: Record<string, number>;
  signupsDaily: { date: string; signups: number }[];
  usageDaily: { date: string; total: number; byApp: Record<string, number> }[];
  completionsByApp: Record<string, number>; // 完了単位 (score/report/outline) の合計
}

const COMPLETION_ACTIONS = new Set(["score", "report", "outline"]);

export async function fetchUsage(days: number): Promise<SourceResult<UsageSummary | null>> {
  try {
    const supabase = getSupabaseAdmin();
    const { start, dates } = dateRange(days);
    const sinceIso = `${start}T00:00:00.000Z`;

    // Supabase (PostgREST) は稀に "JWT issued at future" (時刻ずれ) で一時的に失敗する。
    // 数秒おいて最大3回まで取り直す (自己修復)。
    const load = async () => {
      const [{ data: subs, error: subsErr }, { data: usage, error: usageErr }] = await Promise.all([
        supabase.from("subscriptions").select("plan,status,created_at"),
        supabase
          .from("usage_log")
          .select("app_key,action,created_at")
          .gte("created_at", sinceIso)
          .limit(50000),
      ]);
      if (subsErr) throw new Error(subsErr.message);
      if (usageErr) throw new Error(usageErr.message);
      return { subs, usage };
    };
    let result: Awaited<ReturnType<typeof load>> | null = null;
    let lastErr: unknown = null;
    for (let attempt = 0; attempt < 3 && !result; attempt++) {
      if (attempt > 0) await new Promise((r) => setTimeout(r, 3000));
      try {
        result = await load();
      } catch (e) {
        lastErr = e;
      }
    }
    if (!result) throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
    const { subs, usage } = result;

    const usersByPlan: Record<string, number> = {};
    const signups = new Map<string, number>(dates.map((d) => [d, 0]));
    for (const s of (subs ?? []) as { plan: string; status: string; created_at: string }[]) {
      usersByPlan[s.plan] = (usersByPlan[s.plan] ?? 0) + 1;
      const d = s.created_at.slice(0, 10);
      if (signups.has(d)) signups.set(d, (signups.get(d) ?? 0) + 1);
    }

    const usageMap = new Map<string, { total: number; byApp: Record<string, number> }>(
      dates.map((d) => [d, { total: 0, byApp: {} }])
    );
    const completionsByApp: Record<string, number> = {};
    for (const u of (usage ?? []) as { app_key: string; action: string; created_at: string }[]) {
      const d = u.created_at.slice(0, 10);
      const row = usageMap.get(d);
      if (row) {
        row.total += 1;
        row.byApp[u.app_key] = (row.byApp[u.app_key] ?? 0) + 1;
      }
      if (COMPLETION_ACTIONS.has(u.action)) {
        completionsByApp[u.app_key] = (completionsByApp[u.app_key] ?? 0) + 1;
      }
    }

    return {
      ok: true,
      data: {
        totalUsers: subs?.length ?? 0,
        usersByPlan,
        signupsDaily: dates.map((d) => ({ date: d, signups: signups.get(d) ?? 0 })),
        usageDaily: dates.map((d) => ({ date: d, ...(usageMap.get(d) ?? { total: 0, byApp: {} }) })),
        completionsByApp,
      },
    };
  } catch (e) {
    return { ok: false, data: null, error: e instanceof Error ? e.message : String(e) };
  }
}

// ------------------------------------------------------------------
// Stripe: 有効な定期購読の件数と MRR (月額換算)
// ------------------------------------------------------------------
export interface StripeSummary {
  activeSubscriptions: number;
  trialing: number;
  pastDue: number;
  mrrJpy: number;
  byPrice: Record<string, number>;
}

export async function fetchStripe(): Promise<SourceResult<StripeSummary | null>> {
  try {
    const stripe = getStripe();
    const summary: StripeSummary = { activeSubscriptions: 0, trialing: 0, pastDue: 0, mrrJpy: 0, byPrice: {} };
    for await (const sub of stripe.subscriptions.list({ status: "all", limit: 100, expand: ["data.items"] })) {
      if (sub.status === "trialing") summary.trialing += 1;
      if (sub.status === "past_due") summary.pastDue += 1;
      if (sub.status !== "active") continue;
      summary.activeSubscriptions += 1;
      for (const item of sub.items.data) {
        const price = item.price;
        const amount = (price.unit_amount ?? 0) * (item.quantity ?? 1);
        const monthly =
          price.recurring?.interval === "year"
            ? amount / 12
            : price.recurring?.interval === "week"
              ? amount * 4.33
              : amount;
        summary.mrrJpy += monthly;
        summary.byPrice[price.id] = (summary.byPrice[price.id] ?? 0) + 1;
      }
    }
    summary.mrrJpy = Math.round(summary.mrrJpy);
    return { ok: true, data: summary };
  } catch (e) {
    return { ok: false, data: null, error: e instanceof Error ? e.message : String(e) };
  }
}

// ------------------------------------------------------------------
// まとめ
// ------------------------------------------------------------------
export interface MetricsReport {
  generatedAt: string;
  days: number;
  ga4: SourceResult<Ga4Summary | null>;
  searchConsole: SourceResult<GscSummary | null>;
  usage: SourceResult<UsageSummary | null>;
  stripe: SourceResult<StripeSummary | null>;
}

export async function buildMetricsReport(days = 14): Promise<MetricsReport> {
  const [ga4, searchConsole, usage, stripe] = await Promise.all([
    fetchGa4(days),
    fetchSearchConsole(days),
    fetchUsage(days),
    fetchStripe(),
  ]);
  return { generatedAt: new Date().toISOString(), days, ga4, searchConsole, usage, stripe };
}
