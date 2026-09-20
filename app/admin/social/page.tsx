import type { Metadata } from "next";
import Link from "next/link";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import { ACCOUNTS, getSocialDashboard, refreshSocialMetrics, type SocialDashboard } from "@/lib/social/metrics";
import { listShortsVideos } from "@/lib/social/shorts";
import { GuideSection } from "@/components/admin/GuideSection";

// /admin/social: 自社配信の可視化ダッシュボード (@bluespring.co.jp でログインした人だけ)。
// 公式SNS一覧 → 自社投稿の一覧 (本文・投稿先リンク・反応) → 成果の分析 (チャネル別・時間帯別・日次推移・SNS経由の流入)。
// 反応データは social_metrics (毎日 06:30 JST に自動取り込み)。「反応を更新」で即時取り込みもできる。

export const metadata: Metadata = {
  title: "配信ダッシュボード｜アオハルOS",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const CH_LABEL: Record<string, string> = { x: "X", threads: "Threads", instagram: "Instagram" };
const CH_COLOR: Record<string, string> = { x: "bg-slate-900 text-white", threads: "bg-indigo-600 text-white", instagram: "bg-pink-600 text-white" };
const ACCOUNT_STATUS: Record<string, string> = {
  x: "自動投稿・反応取り込み対応",
  threads: "自動投稿・反応取り込み対応",
  instagram: "自動投稿（画像カード・リール）対応",
  youtube: "自動投稿（ショート動画）対応",
  tiktok: "自動投稿の実装済み・審査完了後に稼働",
  note: "手動投稿",
};

function fmt(n: number | null | undefined) {
  return n == null ? "—" : n.toLocaleString("ja-JP");
}
function jst(iso: string) {
  const d = new Date(new Date(iso).getTime() + 9 * 3600 * 1000);
  return `${d.getUTCMonth() + 1}/${d.getUTCDate()} ${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}`;
}
function md(d: string) {
  return `${Number(d.slice(5, 7))}/${Number(d.slice(8, 10))}`;
}
function engagement(m: { likes: number; replies: number; reposts: number; quotes: number } | null) {
  return m ? m.likes + m.replies + m.reposts + m.quotes : 0;
}
function avg(nums: number[]) {
  return nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
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

/** ショート動画のプラットフォーム別ステータス表示 (投稿済み・再試行中・失敗・未投稿) */
function PlatformCell({
  postedAt,
  error,
  attempts,
  link,
  pendingNote,
}: {
  postedAt: string | null;
  error: string | null;
  attempts: number | null;
  link?: string | null;
  pendingNote?: string;
}) {
  if (postedAt) {
    return link ? (
      <a href={link} target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-600 underline underline-offset-2">
        投稿済み
      </a>
    ) : (
      <span className="font-bold text-emerald-600">投稿済み</span>
    );
  }
  if (error && (attempts ?? 0) >= 3) {
    return (
      <span className="font-bold text-rose-600" title={error}>
        失敗
      </span>
    );
  }
  if (error) {
    return (
      <span className="font-bold text-amber-600" title={error}>
        再試行中
      </span>
    );
  }
  return <span className="text-slate-400">{pendingNote ?? "未投稿"}</span>;
}

/** 日次: 投稿数 (棒) と SNS経由セッション (折れ線) を1つのSVGに */
function DailyChart({ rows }: { rows: { date: string; posts: number; sessions: number }[] }) {
  const w = 720;
  const h = 160;
  const pad = { l: 28, r: 28, t: 10, b: 22 };
  const n = rows.length;
  const iw = w - pad.l - pad.r;
  const ih = h - pad.t - pad.b;
  const maxPosts = Math.max(1, ...rows.map((r) => r.posts));
  const maxSess = Math.max(1, ...rows.map((r) => r.sessions));
  const bw = Math.max(2, (iw / n) * 0.55);
  const x = (i: number) => pad.l + (iw / n) * i + (iw / n) / 2;
  const line = rows.map((r, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${(pad.t + ih - (r.sessions / maxSess) * ih).toFixed(1)}`).join(" ");
  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-44 w-full min-w-[560px]" role="img" aria-label="日次の投稿数とSNS経由セッション">
        {rows.map((r, i) => (
          <rect
            key={r.date}
            x={x(i) - bw / 2}
            y={pad.t + ih - (r.posts / maxPosts) * ih}
            width={bw}
            height={(r.posts / maxPosts) * ih}
            fill="#c7d2fe"
            rx={2}
          />
        ))}
        <path d={line} fill="none" stroke="#4f46e5" strokeWidth={2} />
        {rows.map((r, i) => (
          <circle key={`c${r.date}`} cx={x(i)} cy={pad.t + ih - (r.sessions / maxSess) * ih} r={2.5} fill="#4f46e5" />
        ))}
        {rows.map((r, i) =>
          n <= 16 || i % Math.ceil(n / 16) === 0 ? (
            <text key={`t${r.date}`} x={x(i)} y={h - 6} textAnchor="middle" fontSize={10} fill="#64748b">
              {md(r.date)}
            </text>
          ) : null,
        )}
        <text x={pad.l - 4} y={pad.t + 8} textAnchor="end" fontSize={10} fill="#94a3b8">{maxPosts}</text>
        <text x={w - pad.r + 4} y={pad.t + 8} textAnchor="start" fontSize={10} fill="#4f46e5">{maxSess}</text>
      </svg>
      <p className="mt-1 text-[11px] text-slate-400">棒＝投稿数（左軸） ／ 線＝SNS経由セッション（GA4 Organic Social、右軸）</p>
    </div>
  );
}

export default async function SocialDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string; refresh?: string }>;
}) {
  const admin = await isAdminUser();
  if (!admin.ok) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-xl font-bold text-slate-900">配信ダッシュボード</h1>
        <p className="mt-3 text-sm text-slate-500">社内アカウント（@bluespring.co.jp）でログインすると表示されます。</p>
        <Link href="/" className="mt-6 inline-block text-sm font-bold text-indigo-600 underline underline-offset-2">
          トップへ戻る
        </Link>
      </main>
    );
  }

  const params = await searchParams;
  const daysRaw = Number(params.days ?? "14");
  const days = Number.isFinite(daysRaw) ? Math.min(Math.max(Math.round(daysRaw), 7), 90) : 14;

  let refreshNote: string | null = null;
  if (params.refresh === "1") {
    try {
      const r = await refreshSocialMetrics();
      refreshNote = `反応を更新しました（${r.updated}件）${r.warnings.length ? "／注意: " + r.warnings.join(" / ") : ""}`;
    } catch (e) {
      refreshNote = `更新に失敗: ${e instanceof Error ? e.message : String(e)}`;
    }
  }

  let dash: SocialDashboard | null = null;
  let loadError: string | null = null;
  try {
    dash = await getSocialDashboard(days);
  } catch (e) {
    loadError = e instanceof Error ? e.message : String(e);
  }

  let shorts: Awaited<ReturnType<typeof listShortsVideos>> = [];
  let shortsError: string | null = null;
  try {
    shorts = await listShortsVideos(30);
  } catch (e) {
    shortsError = e instanceof Error ? e.message : String(e);
  }
  const shortsYoutubePosted = shorts.filter((s) => s.youtube_posted_at).length;
  const shortsInstagramPosted = shorts.filter((s) => s.instagram_posted_at).length;
  const shortsTiktokPosted = shorts.filter((s) => s.tiktok_posted_at).length;

  const posts = dash?.posts.filter((p) => p.status === "posted") ?? [];
  const failedPosts = dash?.posts.filter((p) => p.status === "failed") ?? [];
  const totalEng = posts.reduce((a, p) => a + engagement(p.metrics), 0);
  const totalImp = posts.reduce((a, p) => a + (p.metrics?.impressions ?? 0), 0);
  const socialSessions = dash?.ga.daily.reduce((a, d) => a + d.socialSessions, 0) ?? 0;
  const socialSignupClicks = dash?.ga.daily.reduce((a, d) => a + d.signupClicks, 0) ?? 0;

  const byChannel = ["x", "threads", "instagram"].map((ch) => {
    const list = posts.filter((p) => p.channel === ch);
    return { ch, count: list.length, avgEng: avg(list.map((p) => engagement(p.metrics))), avgImp: avg(list.map((p) => p.metrics?.impressions ?? 0)) };
  });
  const bySlot = ["朝", "昼", "夜"].map((slot) => {
    const list = posts.filter((p) => p.slot === slot);
    return { slot, count: list.length, avgEng: avg(list.map((p) => engagement(p.metrics))) };
  });
  const top = [...posts].sort((a, b) => engagement(b.metrics) - engagement(a.metrics)).slice(0, 3);

  const postsByDate = new Map<string, number>();
  for (const p of posts) {
    const d = new Date(new Date(p.created_at).getTime() + 9 * 3600 * 1000).toISOString().slice(0, 10);
    postsByDate.set(d, (postsByDate.get(d) ?? 0) + 1);
  }
  const chartRows = (dash?.ga.daily ?? []).map((d) => ({ date: d.date, posts: postsByDate.get(d.date) ?? 0, sessions: d.socialSessions }));

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">アオハルOS ／ 社内</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">配信ダッシュボード</h1>
          <p className="mt-1 text-xs text-slate-500">
            {admin.email} ・ 直近 {days} 日 ・ 反応の最終取り込み {dash?.lastFetchedAt ? jst(dash.lastFetchedAt) : "未取得"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {[7, 14, 30, 90].map((d) => (
            <Link
              key={d}
              href={`/admin/social?days=${d}`}
              className={`rounded-full border px-3 py-1 font-bold ${d === days ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
            >
              {d}日
            </Link>
          ))}
          <Link href={`/admin/social?days=${days}&refresh=1`} className="rounded-full border border-slate-200 px-3 py-1 font-bold text-slate-600 hover:bg-slate-50">
            反応を更新
          </Link>
          <Link href="/admin/sales" className="rounded-full border border-slate-200 px-3 py-1 font-bold text-slate-600 hover:bg-slate-50">
            法人営業ダッシュボード →
          </Link>
          <Link href={`/admin?days=${days}`} className="rounded-full border border-slate-200 px-3 py-1 font-bold text-slate-600 hover:bg-slate-50">
            管理ダッシュボード →
          </Link>
        </div>
      </div>

      {refreshNote && <p className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs text-indigo-800">{refreshNote}</p>}
      {loadError && <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800">読み込みエラー: {loadError}</p>}

      {/* 公式SNS一覧 */}
      <section className="mt-8">
        <h2 className="text-sm font-bold text-slate-500">公式アカウント（クリックで自社投稿一覧へ）</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {ACCOUNTS.map((a) => (
            <div key={a.key} className="rounded-2xl border border-slate-200 bg-white p-4">
              <a href={a.url} target="_blank" rel="noopener noreferrer" className="block">
                <p className="text-base font-bold text-slate-900">{a.label}</p>
                <p className="text-xs text-slate-500">{a.handle}</p>
              </a>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
                <a href={a.url} target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-600 underline underline-offset-2">投稿一覧</a>
                <a href={a.analytics} target="_blank" rel="noopener noreferrer" className="font-bold text-slate-500 underline underline-offset-2">アナリティクス</a>
              </div>
              <p className="mt-2 text-[10px] text-slate-400">{ACCOUNT_STATUS[a.key] ?? "手動投稿"}</p>
            </div>
          ))}
        </div>
      </section>

      {/* サマリー */}
      <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Tile label={`投稿数（${days}日）`} value={fmt(posts.length)} sub={`X ${byChannel[0].count} ／ Threads ${byChannel[1].count} ／ Instagram ${byChannel[2].count}${failedPosts.length ? ` ／ 失敗 ${failedPosts.length}` : ""}`} />
        <Tile label="反応の合計" value={fmt(totalEng)} sub="いいね＋返信＋リポスト＋引用" />
        <Tile label="表示回数の合計" value={fmt(totalImp)} sub="取得できる投稿のみ" />
        <Tile label="SNS経由セッション" value={dash?.ga.ok ? fmt(socialSessions) : "—"} sub="GA4 Organic Social" />
        <Tile label="SNS経由の登録クリック" value={dash?.ga.ok ? fmt(socialSignupClicks) : "—"} sub="sign_up_click" />
      </section>

      {/* 日次 */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-bold text-slate-900">日次推移</h2>
        {chartRows.length > 0 ? <div className="mt-3"><DailyChart rows={chartRows} /></div> : <p className="mt-2 text-xs text-slate-400">データなし</p>}
        {!dash?.ga.ok && dash?.ga.error && <p className="mt-2 text-[11px] text-amber-700">GA4: {dash.ga.error}</p>}
      </section>

      {/* 分析 */}
      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-bold text-slate-900">チャネル別（1投稿あたり平均）</h2>
          <table className="mt-3 w-full text-xs">
            <thead><tr className="text-left text-slate-500"><th className="py-1">チャネル</th><th className="py-1 text-right">投稿</th><th className="py-1 text-right">反応</th><th className="py-1 text-right">表示</th></tr></thead>
            <tbody>
              {byChannel.map((c) => (
                <tr key={c.ch} className="border-t border-slate-100">
                  <td className="py-1.5 font-bold">{CH_LABEL[c.ch]}</td>
                  <td className="py-1.5 text-right tabular-nums">{c.count}</td>
                  <td className="py-1.5 text-right tabular-nums">{c.avgEng.toFixed(1)}</td>
                  <td className="py-1.5 text-right tabular-nums">{c.avgImp.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-bold text-slate-900">時間帯別（1投稿あたり平均反応）</h2>
          <table className="mt-3 w-full text-xs">
            <thead><tr className="text-left text-slate-500"><th className="py-1">枠</th><th className="py-1 text-right">投稿</th><th className="py-1 text-right">反応</th></tr></thead>
            <tbody>
              {bySlot.map((s) => (
                <tr key={s.slot} className="border-t border-slate-100">
                  <td className="py-1.5 font-bold">{s.slot}{s.slot === "朝" ? "（10時）" : s.slot === "昼" ? "（13時）" : "（20時）"}</td>
                  <td className="py-1.5 text-right tabular-nums">{s.count}</td>
                  <td className="py-1.5 text-right tabular-nums">{s.avgEng.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-[11px] text-slate-400">反応が多い枠に、伸びる型の投稿を寄せる判断に使います。</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-bold text-slate-900">SNS経由の参照元（GA4）</h2>
          {dash?.ga.ok && dash.ga.sources.length ? (
            <ul className="mt-3 space-y-1 text-xs">
              {dash.ga.sources.map((s) => (
                <li key={s.source} className="flex justify-between border-t border-slate-100 py-1.5"><span>{s.source}</span><span className="tabular-nums">{fmt(s.sessions)}</span></li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-xs text-slate-400">まだSNS経由の流入がありません</p>
          )}
        </div>
      </section>

      {/* ベスト投稿 */}
      {top.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-bold text-slate-500">反応の多かった投稿 TOP3</h2>
          <div className="mt-3 grid gap-3 lg:grid-cols-3">
            {top.map((p) => (
              <a key={p.id} href={p.url ?? "#"} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:bg-slate-50">
                <div className="flex items-center gap-2 text-[11px]">
                  <span className={`rounded-full px-2 py-0.5 font-bold ${CH_COLOR[p.channel]}`}>{CH_LABEL[p.channel]}</span>
                  <span className="text-slate-400">{jst(p.created_at)}{p.slot ? ` ・ ${p.slot}` : ""}</span>
                </div>
                <p className="mt-2 line-clamp-4 whitespace-pre-line text-xs leading-relaxed text-slate-700">{p.text}</p>
                <p className="mt-2 text-[11px] font-bold text-indigo-600">反応 {engagement(p.metrics)} ／ 表示 {fmt(p.metrics?.impressions)}</p>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 投稿一覧 */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-bold text-slate-900">自社投稿の一覧</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[820px] text-xs">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="py-1.5">日時</th><th className="py-1.5">チャネル</th><th className="py-1.5">枠</th><th className="py-1.5">本文</th>
                <th className="py-1.5 text-right">いいね</th><th className="py-1.5 text-right">返信</th><th className="py-1.5 text-right">リポスト</th><th className="py-1.5 text-right">表示</th><th className="py-1.5">投稿</th>
              </tr>
            </thead>
            <tbody>
              {dash?.posts.map((p) => (
                <tr key={p.id} className={`border-t border-slate-100 align-top ${p.status === "failed" ? "bg-amber-50" : ""}`}>
                  <td className="py-2 whitespace-nowrap tabular-nums text-slate-500">{jst(p.created_at)}</td>
                  <td className="py-2"><span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${CH_COLOR[p.channel]}`}>{CH_LABEL[p.channel]}</span></td>
                  <td className="py-2 text-slate-500">{p.slot ?? (p.source ?? "").replace(/^setup-test$/, "テスト")}</td>
                  <td className="py-2"><p className="line-clamp-2 max-w-md whitespace-pre-line leading-relaxed text-slate-700">{p.text}</p>{p.status === "failed" && <p className="text-[11px] text-amber-700">失敗</p>}</td>
                  <td className="py-2 text-right tabular-nums">{fmt(p.metrics?.likes)}</td>
                  <td className="py-2 text-right tabular-nums">{fmt(p.metrics?.replies)}</td>
                  <td className="py-2 text-right tabular-nums">{fmt(p.metrics?.reposts)}</td>
                  <td className="py-2 text-right tabular-nums">{fmt(p.metrics?.impressions)}</td>
                  <td className="py-2">{p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-600 underline underline-offset-2">開く</a> : "—"}</td>
                </tr>
              ))}
              {!dash?.posts.length && <tr><td colSpan={9} className="py-6 text-center text-slate-400">この期間の投稿はありません</td></tr>}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
          反応は毎日 6:30（日本時間）に自動で取り込みます。Threads の反応（いいね・表示）は threads_manage_insights 権限付きのトークンが必要で、未取得の間は「—」になります。note・Instagram・TikTok・YouTube は各サービスのアナリティクスをご覧ください（上のリンク）。
        </p>
      </section>

      {/* ショート動画 */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-bold text-slate-900">ショート動画（YouTube Shorts ／ Instagram リール ／ TikTok）</h2>
        <p className="mt-1 text-[11px] text-slate-400">
          静止画スライド＋AIナレーションで毎日20:30（日本時間）に自動生成。生成後、YouTube・Instagramへ自動投稿されます（TikTokは審査完了後に稼働）。
        </p>
        {shortsError && (
          <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800">読み込みエラー: {shortsError}</p>
        )}
        <div className="mt-3 grid gap-3 sm:grid-cols-4">
          <Tile label={`生成数（直近${shorts.length}件）`} value={fmt(shorts.length)} />
          <Tile label="YouTube 投稿済み" value={fmt(shortsYoutubePosted)} />
          <Tile label="Instagram リール投稿済み" value={fmt(shortsInstagramPosted)} />
          <Tile label="TikTok 投稿済み" value={fmt(shortsTiktokPosted)} sub="審査完了後に稼働" />
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] text-xs">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="py-1.5">生成日時</th>
                <th className="py-1.5">タイトル</th>
                <th className="py-1.5">動画</th>
                <th className="py-1.5">YouTube</th>
                <th className="py-1.5">Instagram</th>
                <th className="py-1.5">TikTok</th>
              </tr>
            </thead>
            <tbody>
              {shorts.map((v) => (
                <tr key={v.slug} className="border-t border-slate-100 align-top">
                  <td className="py-2 whitespace-nowrap tabular-nums text-slate-500">{jst(v.rendered_at)}</td>
                  <td className="py-2">
                    <p className="line-clamp-2 max-w-xs whitespace-pre-line leading-relaxed text-slate-700">{v.title}</p>
                  </td>
                  <td className="py-2">
                    <a href={v.video_url} target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-600 underline underline-offset-2">
                      再生
                    </a>
                  </td>
                  <td className="py-2">
                    <PlatformCell
                      postedAt={v.youtube_posted_at}
                      error={v.youtube_error}
                      attempts={v.youtube_attempts}
                      link={v.youtube_video_id ? `https://youtube.com/shorts/${v.youtube_video_id}` : null}
                    />
                  </td>
                  <td className="py-2">
                    <PlatformCell postedAt={v.instagram_posted_at} error={v.instagram_error} attempts={v.instagram_attempts} />
                  </td>
                  <td className="py-2">
                    <PlatformCell postedAt={v.tiktok_posted_at} error={v.tiktok_error} attempts={v.tiktok_attempts} pendingNote="審査待ち" />
                  </td>
                </tr>
              ))}
              {!shorts.length && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-400">
                    まだ生成された動画はありません
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* SEO記事 (/guide) */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-bold text-slate-900">SEO記事（/guide）</h2>
        <div className="mt-3">
          <GuideSection />
        </div>
      </section>
    </main>
  );
}
