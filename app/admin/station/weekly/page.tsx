import type { Metadata } from "next";
import Link from "next/link";
import { CopyText } from "@/components/station/CopyText";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import { addDays, atMin, BIN_MIN, binOf, hoursLabel, isDate, jstToday, mdwLabel, mondayOf, rideMin, slotOn, weeklyText, weekNo, type Bin } from "@/lib/station/bin";
import { listMembers, listRides, type BinMember } from "@/lib/station/bin-store";
import { loadSummary } from "@/lib/station/log-store";
import { unitName } from "@/lib/terms/meta";

// /admin/station/weekly?week=YYYY-MM-DD(月曜)：学習便の週報（@bluespring.co.jp でログインした人だけ）。
// 生徒ごとに、その週（月〜日）の乗車便数・合計時間・学習量・進んだ単元をまとめ、保護者へ送る週報の文面を組み立てる（LINEに貼る。送信はここではしない）。
// 学習量は、その週の便の時間帯に届いた分の合計（＝当日報告の数字の合計）。便の外で学んだ分も含めた週の合計は、表に参考として並べる。
// 合計時間は、下車まで記録された便だけを数える（下車の記録がない便は、便数には入れて「下車なし」に出す）。

export const metadata: Metadata = {
  title: "学習便の週報｜アオハルOS 社内",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface Acc {
  member: BinMember;
  rides: number;
  noCheckout: number;
  minutes: number;
  solved: number;
  correct: number;
  moshi: number;
  units: Set<string>;
  /** 便の外も含めた週の合計 */
  allSolved: number;
  allCorrect: number;
}

const th = "py-2 pr-3";
const td = "py-2 pr-3 align-top";

export default async function AdminStationWeeklyPage({ searchParams }: { searchParams: Promise<{ week?: string | string[] }> }) {
  const admin = await isAdminUser();
  if (!admin.ok) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-xl font-bold text-slate-900">学習便の週報</h1>
        <p className="mt-3 text-sm text-slate-500">社内アカウント（@bluespring.co.jp）でログインすると表示されます。</p>
        <Link href="/" className="mt-6 inline-block text-sm font-bold text-indigo-600 underline underline-offset-2">
          トップへ戻る
        </Link>
      </main>
    );
  }
  const params = await searchParams;
  const monday = mondayOf(isDate(params.week) ? params.week : jstToday());
  const sunday = addDays(monday, 6);
  // その週の便（時刻表どおりの日。試験運用の期間の外でも、通し練習の記録を見られるように期間は見ない）
  const bins: Bin[] = [];
  for (let i = 0; i < 7; i++) {
    const d = addDays(monday, i);
    const s = slotOn(d, null);
    if (s) bins.push(binOf(d, s));
  }
  const iso = (ms: number) => new Date(ms).toISOString();
  const weekFrom = iso(Date.parse(`${monday}T00:00:00+09:00`));
  const weekTo = iso(Date.parse(`${addDays(monday, 7)}T00:00:00+09:00`));

  const [members, rides, whole, ...perBin] = await Promise.all([
    listMembers(),
    listRides(monday, sunday),
    loadSummary(weekFrom, weekTo),
    ...bins.map((b) => loadSummary(iso(atMin(b, BIN_MIN.gate)), iso(atMin(b, BIN_MIN.end + 5)))),
  ]);

  const acc = new Map<string, Acc>();
  const get = (userId: string, member?: BinMember) => {
    let a = acc.get(userId);
    if (!a) {
      a = { member: member ?? { user_id: userId, nick: "", grade: "", team: "" }, rides: 0, noCheckout: 0, minutes: 0, solved: 0, correct: 0, moshi: 0, units: new Set(), allSolved: 0, allCorrect: 0 };
      acc.set(userId, a);
    }
    return a;
  };
  for (const m of members ?? []) get(m.user_id, m);
  for (const r of rides ?? []) {
    const a = get(r.user_id);
    const bin = binOf(r.bin_date, r.slot);
    a.rides += 1;
    if (r.checkout_at) a.minutes += rideMin(bin, Date.parse(r.checkin_at), Date.parse(r.checkout_at));
    else a.noCheckout += 1;
  }
  for (const list of perBin) {
    for (const l of list ?? []) {
      const a = acc.get(l.user_id);
      if (!a) continue;
      a.solved += l.solved;
      a.correct += l.correct;
      a.moshi += l.moshi;
      for (const u of l.units) a.units.add(u);
    }
  }
  for (const l of whole ?? []) {
    const a = acc.get(l.user_id);
    if (!a) continue;
    a.allSolved = l.solved;
    a.allCorrect = l.correct;
  }
  // 学習便の人だけ（班を設定したか、この週に乗車した人）
  const rows = [...acc.values()]
    .filter((a) => a.member.team || a.rides > 0)
    .sort((a, b) => (a.member.team || "Z").localeCompare(b.member.team || "Z") || (a.member.nick || a.member.user_id).localeCompare(b.member.nick || b.member.user_id, "ja"));
  const logFailed = whole === null || perBin.some((l) => l === null);
  const pill = "rounded-full border border-slate-200 px-3 py-1 font-bold text-indigo-600 hover:bg-indigo-50";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">アオハルOS ／ 社内</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">学習便の週報</h1>
      <p className="mt-1 text-lg font-bold text-slate-700">
        第{weekNo(monday)}週：{mdwLabel(monday)}〜{mdwLabel(sunday)}
      </p>
      <p className="mt-2 text-sm text-slate-500">
        班を設定した人と、この週に乗車した人を並べています。学習量は、この週の便（{bins.map((b) => mdwLabel(b.date)).join("・")}）の時間帯に届いた分の合計です。合計時間は下車まで記録された便だけを数えます。文面はコピーしてLINEに貼り、「来週の予約：【　】」を手で埋めます（この画面からは送信しません）。
      </p>

      <form method="get" className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-slate-200 p-4">
        <label className="text-xs font-bold text-slate-500">
          週（その週のどの日でも可）
          <input type="date" name="week" defaultValue={monday} className="mt-1 block rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900" />
        </label>
        <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-500">
          表示
        </button>
      </form>
      <p className="mt-3 flex flex-wrap gap-2 text-xs">
        <Link href={`/admin/station/weekly?week=${addDays(monday, -7)}`} className={pill}>
          ← 前の週
        </Link>
        <Link href="/admin/station/weekly" className={pill}>
          今週
        </Link>
        <Link href={`/admin/station/weekly?week=${addDays(monday, 7)}`} className={pill}>
          次の週 →
        </Link>
        {bins.map((b) => (
          <Link key={b.date} href={`/admin/station/bin?date=${b.date}&slot=${b.slot}`} className={pill}>
            出席表 {mdwLabel(b.date)}
          </Link>
        ))}
      </p>

      {members === null || rides === null ? (
        <p className="mt-8 text-sm text-rose-600">乗車記録を読めませんでした。docs/station-log.sql と docs/station-bin.sql のテーブルが作られているか確認してください。</p>
      ) : rows.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">班を設定した人も、この週に乗車した人もいません。</p>
      ) : (
        <>
          {logFailed ? <p className="mt-6 text-sm text-rose-600">学習ログの一部を読めませんでした（読めなかった分は0として表示しています）。</p> : null}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-300 text-left text-xs text-slate-500">
                  <th className={th}>ニックネーム</th>
                  <th className={th}>班</th>
                  <th className={`${th} text-right`}>乗車便数</th>
                  <th className={`${th} text-right`}>合計時間</th>
                  <th className={`${th} text-right`}>解いた数</th>
                  <th className={`${th} text-right`}>正解</th>
                  <th className={`${th} text-right`}>単元模試</th>
                  <th className={th}>進んだ単元</th>
                  <th className={`${th} text-right`}>参考：便の外も含む週合計</th>
                  <th className="py-2">週報</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((a) => {
                  const units = [...a.units].sort().map(unitName);
                  const text = weeklyText(monday, { nick: a.member.nick, team: a.member.team, rides: a.rides, minutes: a.minutes, solved: a.solved, correct: a.correct, moshi: a.moshi, units });
                  return (
                    <tr key={a.member.user_id} className="border-b border-slate-100">
                      <td className={td}>
                        {a.member.nick ? <span className="font-bold text-slate-900">{a.member.nick}</span> : <span className="text-slate-400">（未設定）{a.member.user_id.slice(-6)}</span>}
                        <div className="text-xs text-slate-500">{a.member.grade}</div>
                      </td>
                      <td className={td}>{a.member.team || "—"}</td>
                      <td className={`${td} text-right tabular-nums`}>
                        {a.rides}
                        {a.noCheckout ? <div className="text-xs font-bold text-amber-700">下車なし {a.noCheckout}</div> : null}
                      </td>
                      <td className={`${td} whitespace-nowrap text-right tabular-nums`}>
                        {hoursLabel(a.minutes)}時間
                        <div className="text-xs text-slate-500">{a.minutes}分</div>
                      </td>
                      <td className={`${td} text-right tabular-nums`}>{a.solved}</td>
                      <td className={`${td} text-right tabular-nums`}>{a.correct}</td>
                      <td className={`${td} text-right tabular-nums`}>{a.moshi}</td>
                      <td className={`${td} max-w-[14rem] text-xs leading-relaxed text-slate-600`}>{units.join(" / ")}</td>
                      <td className={`${td} whitespace-nowrap text-right text-xs tabular-nums text-slate-500`}>
                        {a.allSolved}問・正解{a.allCorrect}
                      </td>
                      <td className="min-w-[22rem] py-2 align-top">
                        <CopyText text={text} label="週報をコピー" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}
