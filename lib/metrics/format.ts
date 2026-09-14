import { FUNNEL_EVENTS, type MetricsReport } from "./sources";

// 集計レポートをプレーンテキスト (Markdown風) に整形する。
// アナリストエージェント (定期タスク) が /api/admin/metrics?format=text で読むための形式。
// JSONより桁の読み違いが起きにくく、そのまま日報の素材になる。

const FUNNEL_LABEL: Record<(typeof FUNNEL_EVENTS)[number], string> = {
  segment_click: "分岐カード",
  try_entry_click: "/try 入口",
  parents_cta_click: "保護者CTA",
  share_to_child: "子に送る",
  sign_up_click: "登録クリック",
  begin_checkout: "決済開始",
  purchase: "購入",
};

const APP_LABEL: Record<string, string> = {
  tensakun: "テンサクン",
  mensatsu: "メンサツ",
  shiboriyu: "しぼりゆ",
};

function sum(values: number[]): number {
  return values.reduce((a, b) => a + b, 0);
}

function appLabel(key: string): string {
  return APP_LABEL[key] ?? key;
}

export function formatReportText(report: MetricsReport): string {
  const lines: string[] = [];
  const { days } = report;
  lines.push(`# アオハルOS 指標レポート（直近${days}日）`);
  lines.push(`生成: ${report.generatedAt}`);
  lines.push("");

  // --- 取得状況 ---
  const sources: [string, { ok: boolean; error?: string }][] = [
    ["GA4", report.ga4],
    ["Search Console", report.searchConsole],
    ["利用ログ (Supabase)", report.usage],
    ["Stripe", report.stripe],
  ];
  const failed = sources.filter(([, s]) => !s.ok);
  lines.push("## 取得状況");
  lines.push(
    failed.length === 0
      ? "4ソースすべて正常に取得"
      : failed.map(([name, s]) => `${name}: 取得失敗 (${s.error ?? "unknown"})`).join(" / "),
  );
  lines.push("");

  // --- サマリー ---
  const ga4 = report.ga4.data;
  const gsc = report.searchConsole.data;
  const usage = report.usage.data;
  const stripe = report.stripe.data;

  lines.push("## サマリー");
  if (ga4) {
    lines.push(`- セッション: ${sum(ga4.daily.map((d) => d.sessions))}`);
    lines.push(`- 新規ユーザー (GA4): ${sum(ga4.daily.map((d) => d.newUsers))}`);
  }
  if (usage) {
    const signups = sum(usage.signupsDaily.map((d) => d.signups));
    const completions = sum(Object.values(usage.completionsByApp));
    const plans = Object.entries(usage.usersByPlan)
      .map(([p, n]) => `${p} ${n}`)
      .join(" / ");
    lines.push(`- 新規登録 (subscriptions行): ${signups}（累計 ${usage.totalUsers} 人、プラン別: ${plans || "なし"}）`);
    lines.push(
      `- 結果まで到達 (完了単位): ${completions}（${
        Object.entries(usage.completionsByApp)
          .map(([k, v]) => `${appLabel(k)} ${v}`)
          .join(" / ") || "なし"
      }）`,
    );
  }
  if (stripe) {
    lines.push(
      `- 有料契約: ${stripe.activeSubscriptions}（MRR ¥${stripe.mrrJpy.toLocaleString("ja-JP")}、トライアル ${stripe.trialing}、支払い遅延 ${stripe.pastDue}）`,
    );
  }
  if (gsc) {
    lines.push(
      `- 検索: 表示 ${sum(gsc.daily.map((d) => d.impressions))} / クリック ${sum(gsc.daily.map((d) => d.clicks))}（Search Consoleは2日遅れ）`,
    );
  }
  lines.push("");

  // --- ファネル ---
  if (ga4) {
    lines.push(`## ファネル（${days}日合計）`);
    for (const ev of FUNNEL_EVENTS) {
      lines.push(`- ${FUNNEL_LABEL[ev]} (${ev}): ${sum(ga4.daily.map((d) => d.events[ev] ?? 0))}`);
    }
    lines.push("");
  }

  // --- 日次 ---
  lines.push("## 日次推移（新しい順）");
  lines.push("日付 | セッション | 新規U | 登録クリック | 新規登録 | 利用(全) | テンサクン | しぼりゆ | メンサツ | 検索表示 | 検索クリック");
  const dates = (ga4?.daily ?? usage?.usageDaily ?? []).map((d) => d.date).slice().reverse();
  for (const date of dates) {
    const g = ga4?.daily.find((d) => d.date === date);
    const u = usage?.usageDaily.find((d) => d.date === date);
    const s = usage?.signupsDaily.find((d) => d.date === date);
    const q = gsc?.daily.find((d) => d.date === date);
    lines.push(
      [
        date.slice(5),
        g?.sessions ?? 0,
        g?.newUsers ?? 0,
        g?.events.sign_up_click ?? 0,
        s?.signups ?? 0,
        u?.total ?? 0,
        u?.byApp.tensakun ?? 0,
        u?.byApp.shiboriyu ?? 0,
        u?.byApp.mensatsu ?? 0,
        q ? q.impressions : "-",
        q ? q.clicks : "-",
      ].join(" | "),
    );
  }
  lines.push("");

  // --- チャネル / ページ / クエリ ---
  if (ga4) {
    lines.push("## 流入チャネル");
    lines.push(ga4.channels.map((c) => `- ${c.channel}: ${c.sessions}`).join("\n") || "- なし");
    lines.push("");
    lines.push("## 閲覧の多いページ");
    lines.push(ga4.pages.slice(0, 15).map((p) => `- ${p.path}: ${p.views}`).join("\n") || "- なし");
    lines.push("");
  }
  if (gsc) {
    lines.push("## 検索クエリ（上位）");
    lines.push(
      gsc.queries
        .slice(0, 20)
        .map((q) => `- ${q.query}: クリック ${q.clicks} / 表示 ${q.impressions} / 掲載順位 ${q.position.toFixed(1)}`)
        .join("\n") || "- まだ検索流入がありません",
    );
    lines.push("");
  }

  return lines.join("\n");
}
