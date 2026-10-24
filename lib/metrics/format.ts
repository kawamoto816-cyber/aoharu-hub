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
  guide_cta_click: "記事CTAクリック",
  tensaku_preview_submit: "お試し添削の送信",
  tensaku_preview_result: "お試し添削の結果表示",
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
    // SEO記事エージェントが「あと少しで1ページ目」の記事を書き直すための材料
    const rewrite = new Map<string, { page: string; impressions: number; clicks: number; queries: string[]; best: number }>();
    for (const r of gsc.pageQueries ?? []) {
      if (r.position < 5 || r.position > 20) continue;
      const cur = rewrite.get(r.page) ?? { page: r.page, impressions: 0, clicks: 0, queries: [], best: 99 };
      cur.impressions += r.impressions;
      cur.clicks += r.clicks;
      cur.best = Math.min(cur.best, r.position);
      if (cur.queries.length < 4) cur.queries.push(`${r.query}（${r.position.toFixed(1)}位・表示${r.impressions}）`);
      rewrite.set(r.page, cur);
    }
    const cands = [...rewrite.values()].sort((a, b) => b.impressions - a.impressions).slice(0, 12);
    lines.push("## リライト候補（掲載順位5〜20位の記事。表示の多い順）");
    lines.push(
      cands.map((c) => `- ${c.page}: 表示 ${c.impressions} / クリック ${c.clicks} / 検索語: ${c.queries.join("、")}`).join("\n") ||
        "- なし",
    );
    lines.push("");

    // 記事ごとに検索語をまとめる (下の3つの欄で共通に使う)
    type Group = { page: string; impressions: number; clicks: number; queries: { q: string; pos: number; imp: number }[] };
    const groupBy = (pred: (r: { position: number; clicks: number }) => boolean) => {
      const m = new Map<string, Group>();
      for (const r of gsc.pageQueries ?? []) {
        if (!pred(r)) continue;
        const g = m.get(r.page) ?? { page: r.page, impressions: 0, clicks: 0, queries: [] };
        g.impressions += r.impressions;
        g.clicks += r.clicks;
        g.queries.push({ q: r.query, pos: r.position, imp: r.impressions });
        m.set(r.page, g);
      }
      return [...m.values()]
        .map((g) => ({ ...g, queries: g.queries.sort((a, b) => b.imp - a.imp).slice(0, 5) }))
        .sort((a, b) => b.impressions - a.impressions);
    };
    const fmt = (g: Group) =>
      `- ${g.page}: 表示 ${g.impressions} / クリック ${g.clicks} / 検索語: ${g.queries
        .map((x) => `${x.q}（${x.pos.toFixed(1)}位・表示${x.imp}）`)
        .join("、")}`;

    // A. 1ページ目に出ているのにクリックされない → タイトル・説明文・リード冒頭を直すだけで効く
    const zeroClick = groupBy((r) => r.position <= 10 && r.clicks === 0).filter((g) => g.impressions >= 5).slice(0, 10);
    lines.push("## タイトル直し候補（掲載順位10位以内なのにクリック0の検索語。表示の多い順）");
    lines.push(zeroClick.map(fmt).join("\n") || "- なし");
    lines.push("");

    // B. 2ページ目の先頭 (10〜15位) → 本文を厚くして1ページ目に押し上げる
    const push = groupBy((r) => r.position > 10 && r.position <= 15).filter((g) => g.impressions >= 5).slice(0, 10);
    lines.push("## 押し上げ候補（掲載順位10〜15位の検索語。表示の多い順）");
    lines.push(push.map(fmt).join("\n") || "- なし");
    lines.push("");

    // C. 20位より下 → 合う記事がまだない。新しく書く題材の候補
    const gaps = new Map<string, { q: string; imp: number; pos: number; page: string }>();
    for (const r of gsc.pageQueries ?? []) {
      if (r.position <= 20 || r.impressions < 2) continue;
      const cur = gaps.get(r.query);
      if (!cur || r.impressions > cur.imp) gaps.set(r.query, { q: r.query, imp: r.impressions, pos: r.position, page: r.page });
    }
    const gapList = [...gaps.values()].sort((a, b) => b.imp - a.imp).slice(0, 15);
    lines.push("## 新規記事の候補（20位より下にしか出ていない検索語。合う記事がまだない可能性が高い）");
    lines.push(gapList.map((g) => `- ${g.q}: 表示 ${g.imp} / ${g.pos.toFixed(1)}位（いま出ている記事: ${g.page}）`).join("\n") || "- なし");
    lines.push("");
  }

  return lines.join("\n");
}
