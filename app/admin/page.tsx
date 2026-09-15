import type { Metadata } from "next";
import Link from "next/link";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import { buildMetricsReport, FUNNEL_EVENTS, type MetricsReport } from "@/lib/metrics/sources";

// /admin: 社内向けダッシュボード (@bluespring.co.jp でログインした人だけ)。
// GA4 / Search Console / Supabase / Stripe を1画面にまとめる。
// 検索エンジンには載せない (robots: noindex)。

export const metadata: Metadata = {
  title: "管理ダッシュボード｜アオハルOS",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const APP_LABEL: Record<string, string> = {
  tensakun: "テンサクン",
  shiboriyu: "しぼりゆ",
  mensatsu: "メンサツ",
  "jiko-kotei": "ジココーテー",
  "16color": "16カラー",
  jikoapi: "ジコアピ",
  "career-design": "キャリデザ",
  edufit: "edufit",
  campuscope: "キャンパスコープ",
  "corporate-scope": "コーポレートスコープ",
};

const EVENT_LABEL: Record<string, string> = {
  segment_click: "分岐カード",
  try_entry_click: "/try 入口",
  parents_cta_click: "保護者CTA",
  share_to_child: "子に送る",
  sign_up_click: "登録クリック",
  begin_checkout: "決済開始",
  purchase: "購入",
};

function sum(nums: number[]) {
  return nums.reduce((a, b) => a + b, 0);
}

function fmt(n: number) {
  return n.toLocaleString("ja-JP");
}

function md(d: string) {
  return `${Number(d.slice(5, 7))}/${Number(d.slice(8, 10))}`;
}

function Tile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-[11px] font-bold text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900">{value}</p>
      {sub && <p className="mt-1 text-[11px] text-slate-400">{sub}</p>}
    </div>
  );
}

function SourceError({ name, error }: { name: string; error?: string }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
      <p className="font-bold">{name} のデータを取得できませんでした</p>
      <p className="mt-1 break-all font-mono text-[11px]">{error}</p>
    </div>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string }>;
}) {
  const admin = await isAdminUser();
  if (!admin.ok) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-xl font-bold text-slate-900">管理ダッシュボード</h1>
        <p className="mt-3 text-sm text-slate-500">
          社内アカウント（@bluespring.co.jp）でログインすると表示されます。
        </p>
        <Link href="/" className="mt-6 inline-block text-sm font-bold text-indigo-600 underline underline-offset-2">
          トップへ戻る
        </Link>
      </main>
    );
  }

  const params = await searchParams;
  const daysRaw = Number(params.days ?? "14");
  const days = Number.isFinite(daysRaw) ? Math.min(Math.max(Math.round(daysRaw), 7), 90) : 14;
  const report: MetricsReport = await buildMetricsReport(days);

  const ga = report.ga4.data;
  const gsc = report.searchConsole.data;
  const usage = report.usage.data;
  const stripe = report.stripe.data;

  const dates = usage?.usageDaily.map((r) => r.date) ?? ga?.daily.map((r) => r.date) ?? [];
  const gaByDate = new Map(ga?.daily.map((r) => [r.date, r]) ?? []);
  const gscByDate = new Map(gsc?.daily.map((r) => [r.date, r]) ?? []);
  const signupByDate = new Map(usage?.signupsDaily.map((r) => [r.date, r.signups]) ?? []);
  const usageByDate = new Map(usage?.usageDaily.map((r) => [r.date, r]) ?? []);

  const totalSessions = sum(ga?.daily.map((r) => r.sessions) ?? []);
  const totalSignups = sum(usage?.signupsDaily.map((r) => r.signups) ?? []);
  const totalCompletions = sum(Object.values(usage?.completionsByApp ?? {}));
  const totalClicks = sum(gsc?.daily.map((r) => r.clicks) ?? []);
  const eventTotals = Object.fromEntries(
    FUNNEL_EVENTS.map((e) => [e, sum(ga?.daily.map((r) => r.events[e] ?? 0) ?? [])])
  );

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">アオハルOS ／ 社内</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">管理ダッシュボード</h1>
          <p className="mt-1 text-xs text-slate-400">
            {admin.email} ・ 生成 {new Date(report.generatedAt).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })} ・
            直近 {days} 日
          </p>
        </div>
        <nav className="flex gap-2 text-xs">
          {[7, 14, 30, 90].map((d) => (
            <Link
              key={d}
              href={`/admin?days=${d}`}
              className={`rounded-full border px-3 py-1 font-bold ${
                d === days ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 text-slate-600"
              }`}
            >
              {d}日
            </Link>
          ))}
          <a
            href={`/api/admin/metrics?days=${days}`}
            className="rounded-full border border-slate-200 px-3 py-1 font-bold text-slate-600"
          >
            JSON
          </a>
          <Link
            href={`/admin/social?days=${days}`}
            className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 font-bold text-indigo-700"
          >
            配信ダッシュボード →
          </Link>
        </nav>
      </div>

      <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Tile label={`セッション（${days}日）`} value={ga ? fmt(totalSessions) : "—"} sub="GA4" />
        <Tile label={`新規登録（${days}日）`} value={usage ? fmt(totalSignups) : "—"} sub={usage ? `累計 ${fmt(usage.totalUsers)} 人` : "Supabase"} />
        <Tile
          label={`結果まで到達（${days}日）`}
          value={usage ? fmt(totalCompletions) : "—"}
          sub="添削レポート・評価レポート・構成案"
        />
        <Tile
          label="有料契約"
          value={stripe ? fmt(stripe.activeSubscriptions) : "—"}
          sub={stripe ? `MRR ¥${fmt(stripe.mrrJpy)}${stripe.pastDue ? ` ・ 支払遅延 ${stripe.pastDue}` : ""}` : "Stripe"}
        />
        <Tile label={`検索クリック（${days}日）`} value={gsc ? fmt(totalClicks) : "—"} sub="Search Console（2日遅れ）" />
      </section>

      <div className="mt-4 space-y-3">
        {!report.ga4.ok && <SourceError name="GA4" error={report.ga4.error} />}
        {!report.searchConsole.ok && <SourceError name="Search Console" error={report.searchConsole.error} />}
        {!report.usage.ok && <SourceError name="Supabase" error={report.usage.error} />}
        {!report.stripe.ok && <SourceError name="Stripe" error={report.stripe.error} />}
      </div>

      <section className="mt-10">
        <h2 className="text-sm font-bold text-slate-900">ファネル（{days}日合計）</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {FUNNEL_EVENTS.map((e) => (
            <div key={e} className="rounded-xl border border-slate-200 bg-white px-3 py-2">
              <p className="text-[10px] font-bold text-slate-500">{EVENT_LABEL[e] ?? e}</p>
              <p className="text-lg font-bold tabular-nums text-slate-900">{ga ? fmt(eventTotals[e]) : "—"}</p>
            </div>
          ))}
        </div>
        {usage && (
          <p className="mt-3 text-xs text-slate-500">
            プラン別ユーザー：
            {Object.entries(usage.usersByPlan)
              .map(([p, n]) => `${p} ${fmt(n)}`)
              .join(" ／ ")}
            。結果到達の内訳：
            {Object.entries(usage.completionsByApp).length
              ? Object.entries(usage.completionsByApp)
                  .map(([a, n]) => `${APP_LABEL[a] ?? a} ${fmt(n)}`)
                  .join(" ／ ")
              : "まだありません"}
          </p>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-bold text-slate-900">日次推移</h2>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[720px] text-xs">
            <thead>
              <tr className="bg-slate-50 text-left font-bold text-slate-500">
                <th className="px-3 py-2">日付</th>
                <th className="px-3 py-2 text-right">セッション</th>
                <th className="px-3 py-2 text-right">新規U</th>
                <th className="px-3 py-2 text-right">登録クリック</th>
                <th className="px-3 py-2 text-right">新規登録</th>
                <th className="px-3 py-2 text-right">利用（全）</th>
                <th className="px-3 py-2 text-right">テンサクン</th>
                <th className="px-3 py-2 text-right">しぼりゆ</th>
                <th className="px-3 py-2 text-right">メンサツ</th>
                <th className="px-3 py-2 text-right">検索表示</th>
                <th className="px-3 py-2 text-right">検索クリック</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 tabular-nums">
              {[...dates].reverse().map((d) => {
                const g = gaByDate.get(d);
                const s = gscByDate.get(d);
                const u = usageByDate.get(d);
                return (
                  <tr key={d}>
                    <td className="px-3 py-1.5 font-mono text-slate-500">{md(d)}</td>
                    <td className="px-3 py-1.5 text-right">{g ? fmt(g.sessions) : "—"}</td>
                    <td className="px-3 py-1.5 text-right">{g ? fmt(g.newUsers) : "—"}</td>
                    <td className="px-3 py-1.5 text-right">{g ? fmt(g.events.sign_up_click ?? 0) : "—"}</td>
                    <td className="px-3 py-1.5 text-right font-bold">{fmt(signupByDate.get(d) ?? 0)}</td>
                    <td className="px-3 py-1.5 text-right">{u ? fmt(u.total) : "—"}</td>
                    <td className="px-3 py-1.5 text-right">{u ? fmt(u.byApp.tensakun ?? 0) : "—"}</td>
                    <td className="px-3 py-1.5 text-right">{u ? fmt(u.byApp.shiboriyu ?? 0) : "—"}</td>
                    <td className="px-3 py-1.5 text-right">{u ? fmt(u.byApp.mensatsu ?? 0) : "—"}</td>
                    <td className="px-3 py-1.5 text-right">{s ? fmt(s.impressions) : "—"}</td>
                    <td className="px-3 py-1.5 text-right">{s ? fmt(s.clicks) : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900">流入チャネル</h2>
          <ul className="mt-3 space-y-1 text-xs">
            {(ga?.channels ?? []).map((c) => (
              <li key={c.channel} className="flex justify-between rounded-lg bg-white px-3 py-1.5 ring-1 ring-slate-100">
                <span className="text-slate-700">{c.channel}</span>
                <span className="font-bold tabular-nums">{fmt(c.sessions)}</span>
              </li>
            ))}
            {ga && ga.channels.length === 0 && <li className="text-slate-400">データなし</li>}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900">閲覧の多いページ</h2>
          <ul className="mt-3 space-y-1 text-xs">
            {(ga?.pages ?? []).map((p) => (
              <li key={p.path} className="flex justify-between gap-2 rounded-lg bg-white px-3 py-1.5 ring-1 ring-slate-100">
                <span className="truncate font-mono text-slate-700">{p.path}</span>
                <span className="shrink-0 font-bold tabular-nums">{fmt(p.views)}</span>
              </li>
            ))}
            {ga && ga.pages.length === 0 && <li className="text-slate-400">データなし</li>}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900">検索クエリ（上位）</h2>
          <ul className="mt-3 space-y-1 text-xs">
            {(gsc?.queries ?? []).map((q) => (
              <li key={q.query} className="flex justify-between gap-2 rounded-lg bg-white px-3 py-1.5 ring-1 ring-slate-100">
                <span className="truncate text-slate-700">{q.query}</span>
                <span className="shrink-0 tabular-nums text-slate-500">
                  {fmt(q.clicks)} / {fmt(q.impressions)} ・ {q.position}位
                </span>
              </li>
            ))}
            {gsc && gsc.queries.length === 0 && <li className="text-slate-400">まだ検索流入がありません</li>}
          </ul>
        </div>
      </section>

      <footer className="mt-12 text-[11px] text-slate-400">
        新規登録＝アオハルOSにログインして subscriptions 行が作られたユーザー数。結果まで到達＝テンサクン採点・メンサツ評価レポート・しぼりゆ構成案の完走回数。
      </footer>
    </main>
  );
}
