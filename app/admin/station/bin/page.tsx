import type { Metadata } from "next";
import Link from "next/link";
import { CopyText } from "@/components/station/CopyText";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import { absentText, TEAMS, addDays, atMin, BIN_MIN, binOf, dailyText, isDate, isSlot, jstHm, jstToday, lateMin, mdwLabel, mondayOf, REFLECT_LABEL, rideMin, isFullRide, slotOn, SLOTS, type Reflect, type Slot } from "@/lib/station/bin";
import { listMembers, listRides, type BinMember, type RideRow } from "@/lib/station/bin-store";
import { setTeamAction } from "./actions";
import { loadSummary, type UserSummary } from "@/lib/station/log-store";
import { unitName } from "@/lib/terms/meta";

// /admin/station/bin?date=YYYY-MM-DD&slot=night|morning：学習便の出席表（@bluespring.co.jp でログインした人だけ）。
// station_members の全員について、班・乗車時刻・宣言・下車時刻・説明・ふり返り・その便の時間帯の学習量を並べ、
// 保護者へ送る「未着通知」「当日報告」の文面を組み立てる（LINEに貼る。送信はここではしない）。
// 予約はGoogleフォームで別に管理しているので、サイトは「誰が予約したか」を知らない。未着＝まだ乗車していない全員。

export const metadata: Metadata = {
  title: "学習便の出席表｜アオハルOS 社内",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface Row {
  member: BinMember;
  ride: RideRow | undefined;
  log: UserSummary | undefined;
}

const byTeamNick = (a: Row, b: Row) => (a.member.team || "Z").localeCompare(b.member.team || "Z") || (a.member.nick || a.member.user_id).localeCompare(b.member.nick || b.member.user_id, "ja");
const th = "py-2 pr-3";
const td = "py-2 pr-3 align-top";

function Name({ m }: { m: BinMember }) {
  return m.nick ? <span className="font-bold text-slate-900">{m.nick}</span> : <span className="text-slate-400">（未設定）{m.user_id.slice(-6)}</span>;
}

export default async function AdminStationBinPage({ searchParams }: { searchParams: Promise<{ date?: string | string[]; slot?: string | string[] }> }) {
  const admin = await isAdminUser();
  if (!admin.ok) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-xl font-bold text-slate-900">学習便の出席表</h1>
        <p className="mt-3 text-sm text-slate-500">社内アカウント（@bluespring.co.jp）でログインすると表示されます。</p>
        <Link href="/" className="mt-6 inline-block text-sm font-bold text-indigo-600 underline underline-offset-2">
          トップへ戻る
        </Link>
      </main>
    );
  }
  const params = await searchParams;
  const date = isDate(params.date) ? params.date : jstToday();
  const scheduled = slotOn(date, null);
  const slot: Slot = isSlot(params.slot) ? params.slot : (scheduled ?? "night");
  const bin = binOf(date, slot);
  const fromIso = new Date(atMin(bin, BIN_MIN.gate)).toISOString();
  const toIso = new Date(atMin(bin, BIN_MIN.end + 5)).toISOString();

  const [members, rides, logs] = await Promise.all([listMembers(), listRides(date, date, slot), loadSummary(fromIso, toIso)]);
  const rideOf = new Map((rides ?? []).map((r) => [r.user_id, r]));
  const logOf = new Map((logs ?? []).map((l) => [l.user_id, l]));
  const known = new Set((members ?? []).map((m) => m.user_id));
  // 乗車記録はあるのに station_members に行が無い人も落とさない
  const everyone: BinMember[] = [...(members ?? []), ...(rides ?? []).filter((r) => !known.has(r.user_id)).map((r) => ({ user_id: r.user_id, nick: "", grade: "", team: "" }))];
  const rows: Row[] = everyone.map((member) => ({ member, ride: rideOf.get(member.user_id), log: logOf.get(member.user_id) }));
  const aboard = rows.filter((r) => r.ride).sort(byTeamNick);
  const absent = rows.filter((r) => !r.ride && r.member.team).sort(byTeamNick);
  const noTeam = rows.filter((r) => !r.ride && !r.member.team).sort(byTeamNick);

  // 前後の便（時刻表どおりの日）
  const near = (step: number) => {
    for (let i = 1; i <= 7; i++) {
      const d = addDays(date, step * i);
      const s = slotOn(d, null);
      if (s) return { d, s };
    }
    return null;
  };
  const prev = near(-1);
  const next = near(1);
  const startHm = jstHm(bin.startMs);
  const title = `${mdwLabel(date)} ${bin.name}（${startHm}〜${jstHm(atMin(bin, BIN_MIN.end))}）`;
  const pill = "rounded-full border border-slate-200 px-3 py-1 font-bold text-indigo-600 hover:bg-indigo-50";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">アオハルOS ／ 社内</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">学習便の出席表</h1>
      <p className="mt-1 text-lg font-bold text-slate-700">{title}</p>
      <p className="mt-2 text-sm text-slate-500">
        予約はGoogleフォームで別に管理しているため、この画面は「誰がこの便を予約したか」を知りません。
        <span className="font-bold text-slate-700">未着＝まだ乗車していない全員</span>です。未着通知は、予約表と照らして、予約のある人にだけ送ってください（発車5分後の{jstHm(atMin(bin, BIN_MIN.late))}以降）。文面はコピーしてLINEに貼ります（この画面からは送信しません）。
      </p>
      {scheduled === slot ? null : <p className="mt-2 text-sm font-bold text-amber-700">この日は時刻表では{scheduled ? `${SLOTS[scheduled].name}の日` : "運休日"}です。</p>}

      <form method="get" className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-slate-200 p-4">
        <label className="text-xs font-bold text-slate-500">
          日付
          <input type="date" name="date" defaultValue={date} className="mt-1 block rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900" />
        </label>
        <label className="text-xs font-bold text-slate-500">
          便
          <select name="slot" defaultValue={slot} className="mt-1 block rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900">
            <option value="night">夜便 19:30</option>
            <option value="morning">朝便 9:00</option>
          </select>
        </label>
        <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-500">
          表示
        </button>
      </form>
      <p className="mt-3 flex flex-wrap gap-2 text-xs">
        {prev ? (
          <Link href={`/admin/station/bin?date=${prev.d}&slot=${prev.s}`} className={pill}>
            ← 前の便 {mdwLabel(prev.d)}
          </Link>
        ) : null}
        <Link href="/admin/station/bin" className={pill}>
          今日
        </Link>
        {next ? (
          <Link href={`/admin/station/bin?date=${next.d}&slot=${next.s}`} className={pill}>
            次の便 {mdwLabel(next.d)} →
          </Link>
        ) : null}
        <Link href={`/admin/station/weekly?week=${mondayOf(date)}`} className={pill}>
          この週の週報
        </Link>
        <Link href={`/admin/station?date=${date}&from=${encodeURIComponent(SLOTS[slot].start)}&to=${encodeURIComponent(jstHm(atMin(bin, BIN_MIN.end)).padStart(5, "0"))}`} className={pill}>
          学習ログ
        </Link>
      </p>

      {members === null || rides === null ? (
        <p className="mt-8 text-sm text-rose-600">乗車記録を読めませんでした。docs/station-log.sql と docs/station-bin.sql のテーブルが作られているか確認してください。</p>
      ) : (
        <>
          {logs === null ? <p className="mt-6 text-sm text-rose-600">学習ログを読めませんでした（学習量は0として表示しています）。</p> : null}
          <p className="mt-6 text-sm text-slate-700">
            乗車 <span className="font-bold">{aboard.length}</span>人（うち下車 {aboard.filter((r) => r.ride?.checkout_at).length}人）／ 未着 <span className="font-bold">{absent.length}</span>人
          </p>

          <section className="mt-6">
            <h2 className="text-base font-bold text-slate-900">未着（まだ乗車していない全員）：{absent.length}人</h2>
            {absent.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500">班を設定した人は全員乗車しています。</p>
            ) : (
              <ul className="mt-3 grid gap-3 md:grid-cols-2">
                {absent.map((r) => (
                  <li key={r.member.user_id} className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4">
                    <p className="text-sm">
                      <Name m={r.member} /> <span className="text-slate-500">{r.member.grade}・{r.member.team}班</span>
                    </p>
                    <div className="mt-2">
                      <CopyText text={absentText(r.member.nick, bin)} label="未着通知をコピー" />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mt-10">
            <h2 className="text-base font-bold text-slate-900">乗車した人：{aboard.length}人</h2>
            {aboard.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500">この便の乗車記録はまだありません。</p>
            ) : (
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[1100px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-300 text-left text-xs text-slate-500">
                      <th className={th}>ニックネーム</th>
                      <th className={th}>班</th>
                      <th className={th}>乗車</th>
                      <th className={th}>宣言</th>
                      <th className={th}>下車</th>
                      <th className={th}>説明</th>
                      <th className={th}>ふり返り</th>
                      <th className={`${th} text-right`}>解いた数</th>
                      <th className={`${th} text-right`}>正解</th>
                      <th className={`${th} text-right`}>単元模試</th>
                      <th className={`${th} text-right`}>学びポイント</th>
                      <th className={th}>単元</th>
                      <th className="py-2">当日報告</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aboard.map((r) => {
                      const ride = r.ride as RideRow;
                      const inMs = Date.parse(ride.checkin_at);
                      const outMs = ride.checkout_at ? Date.parse(ride.checkout_at) : null;
                      const late = lateMin(bin, inMs);
                      const text = dailyText(bin, { checkinMs: inMs, checkoutMs: outMs, plan: ride.plan, explain: ride.explain, solved: r.log?.solved ?? 0, correct: r.log?.correct ?? 0, points: r.log?.points ?? 0 });
                      return (
                        <tr key={r.member.user_id} className="border-b border-slate-100">
                          <td className={td}>
                            <Name m={r.member} />
                            <div className="text-xs text-slate-500">{r.member.grade}</div>
                          </td>
                          <td className={td}>{r.member.team || "—"}</td>
                          <td className={`${td} whitespace-nowrap tabular-nums`}>
                            {jstHm(inMs)}
                            {late > 0 ? <div className="text-xs font-bold text-amber-700">{late}分遅れ</div> : null}
                          </td>
                          <td className={`${td} max-w-[14rem] break-words`}>{ride.plan || <span className="text-slate-400">（まだ）</span>}</td>
                          <td className={`${td} whitespace-nowrap tabular-nums`}>
                            {outMs === null ? (
                              <span className="text-slate-400">（まだ）</span>
                            ) : (
                              <>
                                {jstHm(outMs)}
                                <div className="text-xs text-slate-500">
                                  {rideMin(bin, inMs, outMs)}分{isFullRide(bin, inMs, outMs) ? "・完走" : ""}
                                </div>
                              </>
                            )}
                          </td>
                          <td className={`${td} max-w-[18rem] break-words text-xs leading-relaxed`}>{ride.explain}</td>
                          <td className={`${td} whitespace-nowrap`}>{REFLECT_LABEL[ride.reflect as Reflect] ?? ""}</td>
                          <td className={`${td} text-right tabular-nums`}>{r.log?.solved ?? 0}</td>
                          <td className={`${td} text-right tabular-nums`}>{r.log?.correct ?? 0}</td>
                          <td className={`${td} text-right tabular-nums`}>{r.log?.moshi ?? 0}</td>
                          <td className={`${td} text-right font-bold tabular-nums`}>{r.log?.points ?? 0}</td>
                          <td className={`${td} max-w-[12rem] text-xs leading-relaxed text-slate-600`}>{(r.log?.units ?? []).map(unitName).join(" / ")}</td>
                          <td className="min-w-[20rem] py-2 align-top">
                            <CopyText text={text} label="当日報告をコピー" />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            <p className="mt-3 text-xs text-slate-500">
              学習量は、この便の時間帯（{jstHm(atMin(bin, BIN_MIN.gate))}〜{jstHm(atMin(bin, BIN_MIN.end + 5))}）に生徒の端末から届いた分です。完走＝{jstHm(atMin(bin, BIN_MIN.late))}までに乗車し、{jstHm(atMin(bin, BIN_MIN.getoff))}以降に下車。当日報告の「次の予約：【　】」は貼ってから手で埋めます。
            </p>
          </section>

          {noTeam.length ? (
            <details className="mt-10 rounded-2xl border border-slate-200 p-4">
              <summary className="cursor-pointer text-sm font-bold text-slate-700">班が未設定で、乗車もしていない人：{noTeam.length}人（学習便の設定をまだしていない登録者）</summary>
              <ul className="mt-3 grid gap-3 md:grid-cols-2">
                {noTeam.map((r) => (
                  <li key={r.member.user_id} className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-sm">
                      <Name m={r.member} /> <span className="text-slate-500">{r.member.grade}</span>
                    </p>
                    <div className="mt-2">
                      <CopyText text={absentText(r.member.nick, bin)} label="未着通知をコピー" />
                    </div>
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
        </>
      )}

      <section className="mt-12">
        <h2 className="text-sm font-bold text-slate-900">班の設定</h2>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          班分けが決まったら、ここで入れます（A＝月、B＝水、C＝木、D＝金がホームルームの曜日）。入れておくと、生徒の乗車ページにホームルームの日が出ます。生徒が自分で選び直すこともできます。
        </p>
        {(members ?? []).length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">まだ、乗車ページでニックネームを決めた人がいません。</p>
        ) : (
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {(members ?? []).map((m) => (
              <li key={m.user_id} className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
                <span className="min-w-0 flex-1">
                  <Name m={m} /> <span className="text-slate-500">{m.grade}</span>
                </span>
                <form action={setTeamAction} className="flex items-center gap-1.5">
                  <input type="hidden" name="userId" value={m.user_id} />
                  <select name="team" defaultValue={m.team ?? ""} aria-label={`${m.nick || m.user_id.slice(-6)} の班`} className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm">
                    <option value="">未定</option>
                    {TEAMS.map((t) => (
                      <option key={t} value={t}>
                        {t}班
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="rounded-lg bg-indigo-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-indigo-500">
                    保存
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
