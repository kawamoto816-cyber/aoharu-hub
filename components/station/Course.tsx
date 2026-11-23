"use client";

import Link from "next/link";
import { useEffect, useMemo, useSyncExternalStore } from "react";
import { EXAM_RESULTS_KEY, type ExamAttempt } from "@/lib/exam/results";
import { CoursePaid } from "./CoursePaid";
import { DayHead } from "./DayHead";
import { courseDay, fromYmd, TODAY_KEY, ymd, type TodayList, daysToZenki, firstWeek, laterWeeks, HISTORY, latestBySpec, strategy, subjectsFor, type CourseUniv, type Line, type UnitInfo } from "@/lib/station/course";

// 直前5週間コース（試作）の画面。① 志望校 ② 診断 ③ 作戦表 ④ 最初の週の計画 ⑤ 2〜5週目（有料の伴走。試作は切りかえボタンで見られる。components/station/CoursePaid.tsx）。
// えらんだ志望校・目標・チェックは、このブラウザにだけ残す。診断の結果は大学別模試の記録（この端末）から読む。

const KEY = "aoharu-course-v1";
export interface CourseState {
  univ: string;
  line: Line;
  history: string;
  rate: number;
  checked: string[];
  /** コースを始めた日（YYYY-MM-DD） */
  start?: string;
  /** 試作：有料（伴走）の画面を見る */
  paid?: boolean;
  /** 週ごとのふり返り */
  reviews?: Record<string, Review>;
}
export interface Review {
  better: string;
  worry: string;
  hours: number;
}
const INITIAL: CourseState = { univ: "", line: "文系", history: "日本史", rate: 0.6, checked: [] };

// ---- このブラウザの記録（コースの設定と、模試の結果）を読む ----
const listeners = new Set<() => void>();
function subscribe(l: () => void) {
  listeners.add(l);
  const on = () => l();
  window.addEventListener("storage", on);
  window.addEventListener("focus", on);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", on);
    window.removeEventListener("focus", on);
  };
}
const raw = (k: string) => {
  try {
    return window.localStorage.getItem(k) ?? "";
  } catch {
    return "";
  }
};
function save(s: CourseState) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* 保存できなくても続ける */
  }
  for (const l of listeners) l();
}
function parse<T>(s: string, fallback: T): T {
  try {
    return s ? (JSON.parse(s) as T) : fallback;
  } catch {
    return fallback;
  }
}

const card = "rounded-[14px] border-[2px] border-[#15172B] bg-white p-4";
const step = (n: number, title: string, sub?: string) => (
  <div className="flex flex-wrap items-baseline gap-2">
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#15172B] text-[14px] font-black text-white">{n}</span>
    <h2 className="m-0 text-[18px] font-black">{title}</h2>
    {sub && <span className="text-[12px] font-bold text-[#5A5D73]">{sub}</span>}
  </div>
);

export function Course({ univs, units, serverToday }: { univs: CourseUniv[]; units: Record<string, UnitInfo>; serverToday: string }) {
  const sRaw = useSyncExternalStore(subscribe, () => raw(KEY), () => "");
  const rRaw = useSyncExternalStore(subscribe, () => raw(EXAM_RESULTS_KEY), () => "");
  const s = useMemo(() => ({ ...INITIAL, ...parse<Partial<CourseState>>(sRaw, {}) }), [sRaw]);
  const results = useMemo(() => parse<ExamAttempt[]>(rRaw, []).filter((a) => a && typeof a.spec === "string" && Array.isArray(a.parts)), [rRaw]);
  const set = (p: Partial<CourseState>) => save({ ...s, ...p });

  const u = univs.find((x) => x.univ === s.univ);
  const all = u ? subjectsFor(u, s.line) : [];
  const hasBoth = HISTORY.every((h) => all.some((x) => x.kamoku === h));
  const subjects = hasBoth ? all.filter((x) => !HISTORY.includes(x.kamoku) || x.kamoku === s.history) : all;
  const latest = latestBySpec(results, subjects.map((x) => x.key));
  const rows = strategy(subjects, latest, s.rate);
  const diagnosed = rows.filter((r) => r.attempt);
  const plan = firstWeek(rows, units);
  // 今日の日付（YYYY-MM-DD）。サーバーが描くときは日本時間の今日（serverToday）を使い、ブラウザで動き出したらその端末の今日に置きかえる。
  // 以前はサーバー側を空にしていたので、配られる HTML では「今日から — 日」になり、ブラウザで動き出すまで日数が出なかった。
  const today = useSyncExternalStore(subscribe, () => ymd(new Date()), () => serverToday);
  const zenki = daysToZenki(fromYmd(today));
  const cur = courseDay(s.start, fromYmd(today));
  const plans = laterWeeks(rows, units);
  const todayTasks = cur ? (cur.week === 1 ? plan : plans.find((p) => p.week === cur.week)?.days ?? []).find((d) => d.no === cur.day)?.tasks ?? [] : [];
  const todayText = todayTasks.map((x) => x.text).join("\n");
  const todayIds = todayTasks.map((x) => x.id).join("\n");

  // アオハルームの「今日のやること」の候補として、このブラウザに置く
  useEffect(() => {
    if (!cur || !u) return;
    const v: TodayList = { date: ymd(new Date()), univ: u.univ, week: cur.week, day: cur.day, items: todayText ? todayText.split("\n") : [], ids: todayIds ? todayIds.split("\n") : [] };
    try {
      window.localStorage.setItem(TODAY_KEY, JSON.stringify(v));
    } catch {
      /* 保存できなくても続ける */
    }
  }, [cur?.week, cur?.day, u?.univ, todayText, todayIds]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <p className="m-0 rounded-[12px] bg-[#E6EAFB] px-4 py-2 text-[13.5px] font-bold">
        国公立の前期日程は例年2月25日から。今日から<b className="text-[18px]"> {zenki.days} </b>日です（大学ごとの日程は募集要項で確かめてください）。
      </p>

      {/* ① 志望校 */}
      <section aria-label="志望校をえらぶ" className={card}>
        {step(1, "志望校をえらぶ", "いま試作で選べるのは、大学別模試がある国公立大学です")}
        <div role="radiogroup" aria-label="系統" className="mt-3 flex gap-2">
          {(["文系", "理系"] as Line[]).map((l) => (
            <button key={l} type="button" role="radio" aria-checked={s.line === l} onClick={() => set({ line: l })} className={`rounded-[10px] border-[1.5px] border-[#15172B] px-4 py-1.5 text-[14px] font-black ${s.line === l ? "bg-[#1533B8] text-white" : "bg-white"}`}>
              {l}
            </button>
          ))}
        </div>
        <ul className="m-0 mt-3 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-4">
          {univs.map((x) => {
            const n = subjectsFor(x, s.line).length;
            return (
              <li key={x.univ}>
                <button
                  type="button"
                  aria-pressed={s.univ === x.univ}
                  disabled={n === 0}
                  onClick={() => set({ univ: x.univ })}
                  className={`w-full rounded-[10px] border-[1.5px] border-[#15172B] px-2 py-2 text-left text-[14px] font-black disabled:opacity-40 ${s.univ === x.univ ? "bg-[#FFE45C]" : "bg-white"}`}
                >
                  {x.univ}
                  <span className="block text-[11px] font-bold text-[#5A5D73]">{n ? `${s.line}で${n}科目` : "この系統はまだ"}</span>
                </button>
              </li>
            );
          })}
        </ul>
        {hasBoth && (
          <div role="radiogroup" aria-label="地歴" className="mt-3 flex items-center gap-2 text-[13px]">
            <span className="font-bold">地歴は</span>
            {HISTORY.map((h) => (
              <button key={h} type="button" role="radio" aria-checked={s.history === h} onClick={() => set({ history: h })} className={`rounded-full border-[1.5px] border-[#15172B] px-3 py-1 font-black ${s.history === h ? "bg-[#15172B] text-white" : "bg-white"}`}>
                {h}
              </button>
            ))}
          </div>
        )}
      </section>

      {u && (
        <>
          {/* ② 診断 */}
          <section aria-label="診断" className={card}>
            {step(2, "診断：大学別模試を1回ずつ", `${diagnosed.length}/${subjects.length}科目 できた`)}
            <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">{u.univ}型の2次試験の形式に寄せたオリジナル問題で、いまの点を測ります。本番の時間で解いて、終わったらこのページに戻ってください（結果は自動で読みこみます）。</p>
            <ul className="m-0 mt-3 grid list-none gap-2 p-0 sm:grid-cols-2">
              {rows.map((r) => (
                <li key={r.subject.key} className="flex items-center gap-2 rounded-[10px] bg-[#F7F6F1] px-3 py-2">
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14.5px] font-black">{r.subject.kamoku}</span>
                    <span className="block text-[12px] text-[#5A5D73]">
                      {r.subject.minutes}分・{r.total}点{r.attempt ? `・診断 ${new Date(r.attempt.at).getMonth() + 1}/${new Date(r.attempt.at).getDate()}` : ""}
                    </span>
                  </span>
                  {r.attempt ? (
                    <span className="text-[16px] font-black tabular-nums">
                      {r.score}
                      <span className="text-[12px] text-[#5A5D73]">/{r.total}</span>
                    </span>
                  ) : null}
                  <Link href={r.subject.play} target="_blank" className="rounded-[9px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-3 py-1 text-[12.5px] font-black text-[#15172B] no-underline">
                    {r.attempt ? "もう一度" : "診断する ↗"}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* ③ 作戦表 */}
          <section aria-label="作戦表" className={card}>
            {step(3, "作戦表：目標まであと何点")}
            <label className="mt-2 flex flex-wrap items-center gap-2 text-[13px] font-bold">
              目標の得点率
              <input type="range" min={0.4} max={0.85} step={0.05} value={s.rate} onChange={(e) => set({ rate: Number(e.target.value) })} className="w-[160px]" />
              <span className="text-[16px] font-black tabular-nums">{Math.round(s.rate * 100)}%</span>
            </label>
            <p className="m-0 mt-1 text-[12px] leading-relaxed text-[#5A5D73]">
              既定の60%は仮の目安です。大学が公表している合格最低点や配点を見て、自分で決めてください。点は大学別模試の満点で見た目安で、実際の試験の配点とは同じではありません。
            </p>
            {diagnosed.length === 0 ? (
              <p className="m-0 mt-3 rounded-[10px] bg-[#FFF8D6] px-3 py-2 text-[13.5px] font-bold">②の診断を1科目でも終えると、ここに作戦表が出ます。</p>
            ) : (
              <>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full min-w-[520px] border-collapse text-[13.5px]">
                    <thead>
                      <tr className="border-b-[1.5px] border-[#15172B] text-left text-[12px] text-[#5A5D73]">
                        <th className="py-1.5 pr-2">科目</th>
                        <th className="py-1.5 pr-2 text-right">いま</th>
                        <th className="py-1.5 pr-2 text-right">目標</th>
                        <th className="py-1.5 pr-2 text-right">あと</th>
                        <th className="py-1.5">失点の大きい大問</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r) => (
                        <tr key={r.subject.key} className="border-b border-[#E3E1D8] align-top">
                          <td className="py-2 pr-2 font-black">{r.subject.kamoku}</td>
                          <td className="py-2 pr-2 text-right tabular-nums">{r.attempt ? `${r.score}/${r.total}` : "—"}</td>
                          <td className="py-2 pr-2 text-right tabular-nums">{r.target}</td>
                          <td className={`whitespace-nowrap py-2 pr-2 text-right font-black tabular-nums ${r.gap > 0 ? "text-[#B42318]" : "text-[#11643A]"}`}>{r.attempt ? (r.gap > 0 ? `${r.gap}点` : "届いた") : "未診断"}</td>
                          <td className="py-2 text-[12.5px]">{r.parts.map((p) => `${p.title}（${p.score}/${p.total}）`).join("、") || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="font-black">
                        <td className="py-2 pr-2">合計（診断した科目）</td>
                        <td className="py-2 pr-2 text-right tabular-nums">
                          {diagnosed.reduce((a, r) => a + r.score, 0)}/{diagnosed.reduce((a, r) => a + r.total, 0)}
                        </td>
                        <td className="py-2 pr-2 text-right tabular-nums">{diagnosed.reduce((a, r) => a + r.target, 0)}</td>
                        <td className="whitespace-nowrap py-2 pr-2 text-right tabular-nums text-[#B42318]">{diagnosed.reduce((a, r) => a + r.gap, 0)}点</td>
                        <td />
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <h3 className="m-0 mt-3 text-[14px] font-black">点を取りもどしやすい単元（診断で得点率70%未満）</h3>
                <ul className="m-0 mt-1 flex list-none flex-wrap gap-1.5 p-0">
                  {diagnosed.flatMap((r) =>
                    r.units.map((x) => (
                      <li key={r.subject.key + x.unit} className="rounded-full bg-[#FDECEA] px-2.5 py-1 text-[12.5px] font-bold">
                        {r.subject.kamoku}・{units[x.unit]?.name ?? x.unit} {x.pct}%
                      </li>
                    )),
                  )}
                  {diagnosed.every((r) => !r.units.length) && <li className="text-[12.5px] text-[#5A5D73]">目立って低い単元はありません。大問ごとの見直しから始めます。</li>}
                </ul>
              </>
            )}
          </section>

          {/* ④ 最初の週 */}
          <section aria-label="最初の週の計画" className={card}>
            {step(4, "最初の週の計画", "ここまで無料")}
            {plan.length > 0 && <StartDay s={s} set={set} cur={cur} today={today} />}
            {plan.length === 0 ? (
              <p className="m-0 mt-2 text-[13.5px] text-[#5A5D73]">診断の結果から、7日分のやることを並べます。</p>
            ) : (
              <ol className="m-0 mt-3 grid list-none gap-2 p-0">
                {plan.map((d) => (
                  <li key={d.no} className={`rounded-[12px] border-[1.5px] p-3 ${cur?.week === 1 && cur.day === d.no ? "border-[#1533B8] bg-[#F3F5FF]" : "border-[#C9C7BD]"}`}>
                    <DayHead no={d.no} isToday={cur?.week === 1 && cur.day === d.no} />
                    <ul className="m-0 mt-1 grid list-none gap-1.5 p-0">
                      {d.tasks.map((t) => {
                        const on = s.checked.includes(t.id);
                        return (
                          <li key={t.id} className="flex flex-wrap items-start gap-x-2 gap-y-1 sm:flex-nowrap">
                            <input
                              type="checkbox"
                              aria-label={`${d.no}日目：${t.text}`}
                              checked={on}
                              onChange={() => set({ checked: on ? s.checked.filter((x) => x !== t.id) : [...s.checked, t.id] })}
                              className="mt-1 h-4 w-4 shrink-0"
                            />
                            <span className={`min-w-0 flex-1 text-[13.5px] leading-relaxed ${on ? "text-[#8A8C9C] line-through" : ""}`}>{t.text}</span>
                            <span className="flex w-full shrink-0 flex-wrap gap-1 pl-6 sm:w-auto sm:pl-0">
                              {t.links.map((l) => (
                                <Link key={l.href} href={l.href} target="_blank" className="rounded-[8px] border border-[#15172B] bg-white px-2 py-0.5 text-[11.5px] font-black text-[#15172B] no-underline">
                                  {l.label}
                                </Link>
                              ))}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ol>
            )}
            {plan.length > 0 && (
              <p className="m-0 mt-2 text-[12px] text-[#5A5D73]">
                1日の目安は2〜3時間。
                <Link href="/station/room" className="font-bold text-[#1533B8]">
                  アオハルーム
                </Link>
                で25分ずつ区切ると、学びポイントにもなります。
              </p>
            )}
          </section>

          {/* ⑤ 2週目から：有料の伴走（試作は切りかえボタン） */}
          <CoursePaid s={s} set={set} rows={rows} units={units} results={results} subjects={subjects} cur={cur} week1Total={plan.reduce((a, d) => a + d.tasks.length, 0)} />
        </>
      )}
    </div>
  );
}

/** コースを始める日と、いまは何週目か */
function StartDay({ s, set, cur, today }: { s: CourseState; set: (p: Partial<CourseState>) => void; cur: { week: number; day: number } | null; today: string }) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2 rounded-[10px] bg-[#F7F6F1] px-3 py-2 text-[13px]">
      <label className="flex items-center gap-1.5 font-bold">
        コースを始める日
        <input type="date" value={s.start ?? ""} onChange={(e) => set({ start: e.target.value || undefined })} className="rounded-[8px] border-[1.5px] border-[#15172B] bg-white px-2 py-1 text-[13px]" />
      </label>
      {!s.start && today && (
        <button type="button" onClick={() => set({ start: today })} className="rounded-[8px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-3 py-1 text-[12.5px] font-black">
          今日から始める
        </button>
      )}
      {cur ? (
        <span className="font-black text-[#1533B8]">
          いまは{cur.week}週目の{cur.day}日目
          {cur.week > 1 ? "（2週目からの計画は、下の伴走にあります）" : ""}
        </span>
      ) : s.start ? (
        <span className="text-[#5A5D73]">始める日になると、その日のやることに印がつきます</span>
      ) : (
        <span className="text-[#5A5D73]">共通テストのあと（1月中旬〜）に始めると、前期日程にちょうど5週間です</span>
      )}
    </div>
  );
}
