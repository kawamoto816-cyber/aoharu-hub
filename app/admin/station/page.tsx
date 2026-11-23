import type { Metadata } from "next";
import Link from "next/link";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import { loadSummary, rangeOf } from "@/lib/station/log-store";

// /admin/station：学習便の学習ログ（@bluespring.co.jp でログインした人だけ）。
// 日付と便の時刻（日本時間）で区切って、生徒ごとの解いた数・正解した数・学びポイント・単元を見る。保護者への報告の数字はここから取る。
// 数字は端末から送られた差分（試験運用のあいだの作り）。完走の5点はここには入らない。

export const metadata: Metadata = {
  title: "学習便の学習ログ｜アオハルOS 社内",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const PRESETS = [
  { label: "夜便 19:30〜21:00", from: "19:30", to: "21:00" },
  { label: "朝便 9:00〜10:30", from: "09:00", to: "10:30" },
  { label: "1日ぜんぶ", from: "00:00", to: "23:59" },
];

export default async function AdminStationPage({ searchParams }: { searchParams: Promise<{ date?: string; from?: string; to?: string }> }) {
  const admin = await isAdminUser();
  if (!admin.ok) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-xl font-bold text-slate-900">学習便の学習ログ</h1>
        <p className="mt-3 text-sm text-slate-500">社内アカウント（@bluespring.co.jp）でログインすると表示されます。</p>
        <Link href="/" className="mt-6 inline-block text-sm font-bold text-indigo-600 underline underline-offset-2">
          トップへ戻る
        </Link>
      </main>
    );
  }
  const params = await searchParams;
  const range = rangeOf(params.date, params.from, params.to);
  const rows = await loadSummary(range.fromIso, range.toIso);
  const query = `date=${range.date}&from=${encodeURIComponent(range.from)}&to=${encodeURIComponent(range.to)}`;
  const time = (iso: string) => new Date(iso).toLocaleTimeString("ja-JP", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit" });

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">アオハルOS ／ 社内</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">学習便の学習ログ</h1>
      <p className="mt-2 text-sm text-slate-500">
        日付と時刻（日本時間）で区切って、生徒ごとの学習量を見ます。数字は生徒の端末から1分おきに届く差分です。完走の5点は入っていません。
      </p>

      <form method="get" className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-slate-200 p-4">
        <label className="text-xs font-bold text-slate-500">
          日付
          <input type="date" name="date" defaultValue={range.date} className="mt-1 block rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900" />
        </label>
        <label className="text-xs font-bold text-slate-500">
          開始
          <input type="time" name="from" defaultValue={range.from} className="mt-1 block rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900" />
        </label>
        <label className="text-xs font-bold text-slate-500">
          終了
          <input type="time" name="to" defaultValue={range.to} className="mt-1 block rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900" />
        </label>
        <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-500">
          表示
        </button>
        <a href={`/api/admin/station-log?${query}&format=csv`} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
          CSVで保存
        </a>
      </form>
      <p className="mt-3 flex flex-wrap gap-2 text-xs">
        {PRESETS.map((p) => (
          <Link key={p.label} href={`/admin/station?date=${range.date}&from=${encodeURIComponent(p.from)}&to=${encodeURIComponent(p.to)}`} className="rounded-full border border-slate-200 px-3 py-1 font-bold text-indigo-600 hover:bg-indigo-50">
            {p.label}
          </Link>
        ))}
      </p>

      {rows === null ? (
        <p className="mt-8 text-sm text-rose-600">ログを読めませんでした。docs/station-log.sql のテーブルが作られているか確認してください。</p>
      ) : rows.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">この時間のログはありません。</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-300 text-left text-xs text-slate-500">
                <th className="py-2 pr-3">ニックネーム</th>
                <th className="py-2 pr-3">学年</th>
                <th className="py-2 pr-3 text-right">解いた数</th>
                <th className="py-2 pr-3 text-right">正解</th>
                <th className="py-2 pr-3 text-right">単元模試</th>
                <th className="py-2 pr-3 text-right">学びポイント</th>
                <th className="py-2 pr-3">最初〜最後</th>
                <th className="py-2">単元</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.user_id} className="border-b border-slate-100 align-top">
                  <td className="py-2 pr-3 font-bold text-slate-900">{r.nick || <span className="font-normal text-slate-400">（未設定）{r.user_id.slice(-6)}</span>}</td>
                  <td className="py-2 pr-3">{r.grade}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{r.solved}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{r.correct}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{r.moshi}</td>
                  <td className="py-2 pr-3 text-right font-bold tabular-nums">{r.points}</td>
                  <td className="py-2 pr-3 whitespace-nowrap text-slate-500">
                    {time(r.first)}〜{time(r.last)}
                  </td>
                  <td className="py-2 text-xs leading-relaxed text-slate-600">{r.units.join(" / ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
