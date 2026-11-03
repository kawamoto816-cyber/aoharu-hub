import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";

// 運営の月のAI予算（全アプリ共通。2026-11-04 代表承認）。
//
//   - AIを呼ぶたびに recordAiCost() で、使ったトークンと円の目安を ai_cost_log に1行残す（本文は残さない）。
//   - 呼ぶ前に checkAiBudget(tier) を通す。今月の合計が予算の8割をこえたら運営に1回だけ知らせ、
//     予算をこえたら「登録なし・無料」の分から止める（Pro・Max は止めない）。
//   - 予算は AI_MONTHLY_BUDGET_YEN（既定 30,000円）。知らせ先は AI_BUDGET_ALERT_WEBHOOK（Slack の Incoming Webhook など。なければログだけ）。
//   - Supabase に届かないときは止めない（本体の機能を止めないため。ログに警告だけ出す）。
//   - テーブル：docs/ai-budget.sql を Supabase の SQL Editor で1回実行する。

export type BudgetTier = "guest" | "free" | "pro" | "max";

const YEN_PER_USD = Number(process.env.AI_YEN_PER_USD ?? 150);

/** 100万トークンあたりの米ドル（入力・出力）。モデル名の前方一致。料金表が変わったらここを直す */
const PRICES: [prefix: string, input: number, output: number][] = [
  ["claude-haiku", 1, 5],
  ["claude-sonnet", 3, 15],
  ["claude-opus", 5, 25],
];

export interface AiUsage {
  input_tokens?: number;
  output_tokens?: number;
  cache_creation_input_tokens?: number;
  cache_read_input_tokens?: number;
}

export function estimateYen(model: string, u: AiUsage): number {
  const p = PRICES.find(([pre]) => model.startsWith(pre)) ?? PRICES[PRICES.length - 1];
  const input = (u.input_tokens ?? 0) + (u.cache_creation_input_tokens ?? 0) * 1.25 + (u.cache_read_input_tokens ?? 0) * 0.1;
  const usd = (input * p[1] + (u.output_tokens ?? 0) * p[2]) / 1_000_000;
  return Math.round(usd * YEN_PER_USD * 100) / 100;
}

const budgetYen = () => Number(process.env.AI_MONTHLY_BUDGET_YEN ?? 30000);
/** 日本時間の月（YYYY-MM）と、その月のはじまり（UTC の ISO 文字列） */
function jstMonth(): { key: string; startIso: string } {
  const now = new Date(Date.now() + 9 * 3600_000);
  const key = now.toISOString().slice(0, 7);
  const start = new Date(`${key}-01T00:00:00+09:00`);
  return { key, startIso: start.toISOString() };
}

let cache: { month: string; yen: number; at: number } | null = null;

async function monthTotal(): Promise<number> {
  const { key, startIso } = jstMonth();
  if (cache && cache.month === key && Date.now() - cache.at < 60_000) return cache.yen;
  const { data, error } = await getSupabaseAdmin().from("ai_cost_log").select("yen").gte("created_at", startIso).limit(100000);
  if (error) throw new Error(error.message);
  const yen = (data ?? []).reduce((t, r: { yen: number | string | null }) => t + Number(r.yen ?? 0), 0);
  cache = { month: key, yen, at: Date.now() };
  return yen;
}

async function alertOnce(kind: "80" | "100", total: number) {
  const { key } = jstMonth();
  try {
    const { error } = await getSupabaseAdmin().from("ai_budget_alert").insert({ month: key, kind, total_yen: Math.round(total) });
    if (error) return; // すでに知らせた（month+kind が一意）
  } catch {
    return;
  }
  const text = `【アオハルOS】今月のAI費用の目安が予算の${kind === "80" ? "8割" : "上限"}に達しました：約${Math.round(total).toLocaleString()}円／予算${budgetYen().toLocaleString()}円（${key}）。${kind === "100" ? "無料・登録なしのAI機能を止めています。" : ""}`;
  console.warn("[ai-budget]", text);
  const hook = process.env.AI_BUDGET_ALERT_WEBHOOK;
  if (hook) {
    try {
      await fetch(hook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text }), signal: AbortSignal.timeout(5000) });
    } catch {
      /* 知らせに失敗しても本体は止めない */
    }
  }
}

/** AIを呼ぶ前に通す。false のときは呼ばない（無料・登録なしの分だけ止める） */
export async function checkAiBudget(tier: BudgetTier): Promise<{ allowed: boolean; reason?: "budget" }> {
  try {
    const total = await monthTotal();
    const budget = budgetYen();
    if (total >= budget) {
      void alertOnce("100", total);
      if (tier === "guest" || tier === "free") return { allowed: false, reason: "budget" };
    } else if (total >= budget * 0.8) {
      void alertOnce("80", total);
    }
  } catch (e) {
    console.warn("[ai-budget] check skipped:", e instanceof Error ? e.message : e);
  }
  return { allowed: true };
}

/** AIを呼んだあとに残す（本文は残さない。アプリ名・操作・モデル・トークン・円の目安だけ） */
export async function recordAiCost(p: { app: string; action: string; model: string; usage?: AiUsage | null; userId?: string | null }): Promise<void> {
  const u = p.usage ?? {};
  const yen = estimateYen(p.model, u);
  if (cache) cache.yen += yen;
  try {
    const { error } = await getSupabaseAdmin().from("ai_cost_log").insert({
      app_key: p.app,
      action: p.action,
      user_id: p.userId ?? null,
      model: p.model,
      input_tokens: (u.input_tokens ?? 0) + (u.cache_creation_input_tokens ?? 0) + (u.cache_read_input_tokens ?? 0),
      output_tokens: u.output_tokens ?? 0,
      yen,
    });
    if (error) console.warn("[ai-budget] record failed:", error.message);
  } catch (e) {
    console.warn("[ai-budget] record failed:", e instanceof Error ? e.message : e);
  }
}
