"use client";

import Link from "next/link";
import { useState } from "react";
import type { ExamAttempt } from "@/lib/exam/results";
import { laterWeeks, trends, type CourseSubject, type Row, type UnitInfo } from "@/lib/station/course";
import type { CourseState, Review } from "./Course";
import { DayHead } from "./DayHead";
import { CourseOffer, useCourseAccess } from "./CourseOffer";
import type { CourseDef } from "@/lib/station/course-kinds";

// 直前コースの有料部分：2週目からの計画・週のふり返り・進み具合・保護者に見せる報告。無料と有料の境目を画面ではっきり見せる。
//   4コースとも販売中（4,980円・1回払い）。使えるかはサーバーで確かめる（CourseOffer.tsx）。Max・受験シーズンパスの人はそのまま使える
//   国公立2次 … 試作のまま。切りかえボタンで有料の画面を見られる（お金はかからない。値段・決済はまだない）

const card = "rounded-[14px] border-[2px] border-[#15172B] bg-white p-4";

export function CoursePaid({
  def,
  weeks,
  s,
  set,
  rows,
  units,
  results,
  subjects,
  week1Total,
  cur,
}: {
  def: CourseDef;
  /** コース全体の週数（1週目をふくむ） */
  weeks: number;
  s: CourseState;
  set: (p: Partial<CourseState>) => void;
  rows: Row[];
  week1Total: number;
  cur: { week: number; day: number } | null;
  units: Record<string, UnitInfo>;
  results: ExamAttempt[];
  subjects: CourseSubject[];
}) {
  const plans = laterWeeks(rows, units, { weeks, moshi: def.moshi, mark: def.mark });
  const acc = useCourseAccess(def);
  // 販売中のコースは、サーバーで確かめた利用権。試作（国公立2次）は切りかえボタン
  const open = def.sale ? acc.access : !!s.paid;
  return (
    <>
      <div role="separator" aria-label="ここから有料" className="flex items-center gap-2 py-1">
        <span className="h-0 flex-1 border-t-[2px] border-dashed border-[#1533B8]" />
        <span className="rounded-full bg-[#1533B8] px-3 py-1 text-[12.5px] font-black text-white">ここまで無料 ／ ここから有料（伴走）</span>
        <span className="h-0 flex-1 border-t-[2px] border-dashed border-[#1533B8]" />
      </div>
      <section aria-label="2週目から" className="rounded-[14px] border-[2px] border-[#1533B8] bg-[#F3F5FF] p-4">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#1533B8] text-[14px] font-black text-white">5</span>
          <h2 className="m-0 text-[18px] font-black">2週目〜{weeks > 2 ? `${weeks}週目` : "試験日"}：伴走</h2>
          {def.sale ? (
            <span className="text-[12px] font-bold text-[#1533B8]">{acc.loading ? "確かめています…" : open ? (acc.via === "max" ? "ご利用中（Max・受験シーズンパス）" : `ご利用中（${def.sale.endsLabel}まで）`) : "有料"}</span>
          ) : (
            <>
              <span className="text-[12px] font-bold text-[#1533B8]">有料（値段は未定）</span>
              <button type="button" aria-pressed={!!s.paid} onClick={() => set({ paid: !s.paid })} className="ml-auto rounded-[10px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-3 py-1.5 text-[12.5px] font-black">
                {s.paid ? "試作：無料の見え方にもどす" : "試作：有料の画面を見る（お金はかかりません）"}
              </button>
            </>
          )}
        </div>
        {acc.justPaid && (
          <p role="status" className="m-0 mt-2 rounded-[10px] bg-[#E3F5E9] px-3 py-2 text-[13.5px] font-black text-[#11643A]">
            お申し込みありがとうございます。2週目からの伴走が使えるようになりました。
          </p>
        )}
        <ul className="m-0 mt-2 grid gap-0.5 pl-5 text-[13px] leading-relaxed">
          <li>毎週、最新の診断から作戦表と計画を作り直す（{def.moshi}の大問演習・通し演習を、試験日までの週に並べる）</li>
          <li>まちがえたら、さかのぼりで根っこの単元へ戻ってから、また大問へ</li>
          <li>週のふり返りと、科目ごとの点の動き・やったことの割合（進み具合の管理）</li>
          <li>{def.sale ? "保護者に見せる週の報告（「目標まであと何点」と続けた様子を、ボタン1つで文面に）" : "保護者へ、週に1回「目標まであと何点」と続けた様子を報告"}</li>
        </ul>
        {!open ? (
          <>
            <Locked plans={plans} weeks={weeks} />
            {def.sale && !acc.loading && <CourseOffer def={def} signedIn={acc.signedIn} />}
          </>
        ) : plans.length === 0 ? (
          <p className="m-0 mt-3 text-[13.5px] font-bold">②の診断を1科目でも終えると、2週目からの計画が出ます。</p>
        ) : (
          <Paid def={def} s={s} set={set} rows={rows} plans={plans} results={results} subjects={subjects} week1Total={week1Total} cur={cur} />
        )}
      </section>
    </>
  );
}

function Locked({ plans, weeks }: { plans: ReturnType<typeof laterWeeks>; weeks: number }) {
  const themes = plans.length ? plans : Array.from({ length: weeks - 1 }, (_, i) => ({ week: i + 2, theme: "診断のあとに作ります", lead: "", days: [] }));
  return (
    <div className="mt-3 grid gap-2 sm:grid-cols-2">
      {themes.map((p) => (
        <div key={p.week} className="relative overflow-hidden rounded-[12px] border-[1.5px] border-[#C9C7BD] bg-white p-3">
          <p className="m-0 text-[12px] font-black text-[#1533B8]">{p.week}週目</p>
          <p className="m-0 text-[14px] font-black">{p.theme}</p>
          <div aria-hidden="true" className="mt-1 select-none text-[12.5px] leading-relaxed text-[#3A3D55] blur-[3px]">
            1日目　大問を1題、時間を計って解く／2日目　根っこの単元へ戻る／3日目　通しで1回分
          </div>
          <span className="absolute right-2 top-2 rounded-full bg-[#15172B] px-2 py-0.5 text-[10.5px] font-black text-white">伴走で開く</span>
        </div>
      ))}
    </div>
  );
}

function Paid({
  def,
  s,
  set,
  rows,
  plans,
  results,
  subjects,
  week1Total,
  cur,
}: {
  def: CourseDef;
  s: CourseState;
  set: (p: Partial<CourseState>) => void;
  rows: Row[];
  week1Total: number;
  cur: { week: number; day: number } | null;
  plans: ReturnType<typeof laterWeeks>;
  results: ExamAttempt[];
  subjects: CourseSubject[];
}) {
  const WEEKS = plans.map((p) => p.week);
  const [picked, setWeek] = useState(cur && cur.week >= 2 ? cur.week : 2);
  // 試験日を変えて週数が減ったときは、最後の週を出す
  const week = WEEKS.includes(picked) ? picked : WEEKS[WEEKS.length - 1];
  const plan = plans.find((p) => p.week === week)!;
  const ids = (w: number) => (w === 1 ? s.checked.filter((x) => /^d\d-/.test(x)) : s.checked.filter((x) => x.startsWith(`w${w}d`)));
  const totals = (w: number) => (w === 1 ? week1Total : (plans.find((p) => p.week === w)?.days ?? []).reduce((a, d) => a + d.tasks.length, 0));
  const toggle = (id: string) => set({ checked: s.checked.includes(id) ? s.checked.filter((x) => x !== id) : [...s.checked, id] });
  return (
    <div className="mt-3 grid gap-3">
      <div role="tablist" aria-label="週" className="flex flex-wrap gap-1.5">
        {WEEKS.map((w) => (
          <button key={w} type="button" role="tab" aria-selected={week === w} onClick={() => setWeek(w)} className={`rounded-full border-[1.5px] border-[#15172B] px-3 py-1 text-[13px] font-black ${week === w ? "bg-[#15172B] text-white" : "bg-white"}`}>
            {w}週目{cur?.week === w ? "（今週）" : ""}
          </button>
        ))}
      </div>

      <div className={card}>
        <h3 className="m-0 text-[16px] font-black">
          {week}週目：{plan.theme}
        </h3>
        <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">{plan.lead}</p>
        <ol className="m-0 mt-2 grid list-none gap-2 p-0">
          {plan.days.map((d) => (
            <li key={d.no} className={`rounded-[10px] p-2.5 ${cur?.week === week && cur.day === d.no ? "border-[1.5px] border-[#1533B8] bg-[#F3F5FF]" : "bg-[#F7F6F1]"}`}>
              <DayHead no={d.no} isToday={cur?.week === week && cur.day === d.no} />
              <ul className="m-0 mt-1 grid list-none gap-1 p-0">
                {d.tasks.map((t) => {
                  const on = s.checked.includes(t.id);
                  return (
                    <li key={t.id} className="flex flex-wrap items-start gap-x-2 gap-y-1 sm:flex-nowrap">
                      <input type="checkbox" aria-label={`${week}週目${d.no}日目：${t.text}`} checked={on} onChange={() => toggle(t.id)} className="mt-1 h-4 w-4 shrink-0" />
                      <span className={`min-w-0 flex-1 text-[13.5px] leading-relaxed ${on ? "text-[#8A8C9C] line-through" : ""}`}>{t.text}</span>
                      <span className="flex w-full shrink-0 flex-wrap gap-1 pl-6 sm:w-auto sm:pl-0">
                        {t.links.map((l) => (
                          <Link key={l.href + l.label} href={l.href} target="_blank" className="rounded-[8px] border border-[#15172B] bg-white px-2 py-0.5 text-[11.5px] font-black text-[#15172B] no-underline">
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
        <p className="m-0 mt-2 text-[11.5px] text-[#5A5D73]">計画は、その時点の最新の診断から作り直しています。{def.moshi}を解きなおすと、作戦表と一緒に並びも変わります。</p>
      </div>

      <ReviewForm key={week} week={week} s={s} set={set} rows={rows} done={ids(week).length} total={totals(week)} />
      <Progress def={def} weeks={WEEKS} s={s} results={results} subjects={subjects} ids={ids} totals={totals} />
      <ParentWeek def={def} week={week} s={s} rows={rows} results={results} subjects={subjects} done={ids(week).length} total={totals(week)} />
    </div>
  );
}

function ReviewForm({ week, s, set, rows, done, total }: { week: number; s: CourseState; set: (p: Partial<CourseState>) => void; rows: Row[]; done: number; total: number }) {
  const saved = s.reviews?.[week];
  const [r, setR] = useState<Review>(saved ?? { better: "", worry: "", hours: 3 });
  const [ok, setOk] = useState(false);
  return (
    <form
      className={card}
      onSubmit={(e) => {
        e.preventDefault();
        set({ reviews: { ...(s.reviews ?? {}), [week]: r } });
        setOk(true);
      }}
    >
      <h3 className="m-0 text-[16px] font-black">{week}週目のふり返り</h3>
      <p className="m-0 mt-1 text-[13px]">
        やったこと：<b>{done}</b>/{total}（{total ? Math.round((done / total) * 100) : 0}%）
      </p>
      <label className="mt-2 block text-[13px] font-bold">
        手ごたえがあった科目
        <select className="mt-0.5 block rounded-[8px] border-[1.5px] border-[#15172B] bg-white px-2 py-1.5 text-[14px]" value={r.better} onChange={(e) => setR({ ...r, better: e.target.value })}>
          <option value="">えらぶ</option>
          {rows.map((x) => (
            <option key={x.subject.key}>{x.subject.kamoku}</option>
          ))}
        </select>
      </label>
      <label className="mt-2 block text-[13px] font-bold">
        まだ不安なところ（単元・大問）
        <input className="mt-0.5 w-full rounded-[8px] border-[1.5px] border-[#15172B] px-2 py-1.5 text-[14px]" maxLength={40} value={r.worry} onChange={(e) => setR({ ...r, worry: e.target.value })} />
      </label>
      <label className="mt-2 block text-[13px] font-bold">
        来週、1日に使える時間
        <select className="mt-0.5 block rounded-[8px] border-[1.5px] border-[#15172B] bg-white px-2 py-1.5 text-[14px]" value={r.hours} onChange={(e) => setR({ ...r, hours: Number(e.target.value) })}>
          {[1, 2, 3, 4, 5, 6].map((h) => (
            <option key={h} value={h}>
              {h}時間
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="mt-3 rounded-[10px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-4 py-2 text-[14px] font-black">
        ふり返りを残す
      </button>
      {(ok || saved) && (
        <p role="status" className="m-0 mt-1 text-[12.5px] font-bold text-[#11643A]">
          残しました。保護者への報告にも入ります。
        </p>
      )}
    </form>
  );
}

function Progress({ def, weeks: WEEKS, s, results, subjects, ids, totals }: { def: CourseDef; weeks: number[]; s: CourseState; results: ExamAttempt[]; subjects: CourseSubject[]; ids: (w: number) => string[]; totals: (w: number) => number }) {
  const ts = trends(results, subjects, def.specPrefix).filter((t) => t.points.length);
  return (
    <div className={card}>
      <h3 className="m-0 text-[16px] font-black">進み具合</h3>
      <div className="mt-2 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="m-0 text-[12.5px] font-black">科目ごとの得点率（{def.moshi}）<span className="ml-1 font-bold text-[#B42318]">赤の破線＝目標</span></p>
          {ts.length === 0 && <p className="m-0 mt-1 text-[12.5px] text-[#5A5D73]">診断がまだありません。</p>}
          <ul className="m-0 mt-1 grid list-none gap-2 p-0">
            {ts.map((t) => {
              const first = t.points[0].pct;
              const last = t.points[t.points.length - 1].pct;
              const diff = last - first;
              return (
                <li key={t.key}>
                  <p className="m-0 flex items-baseline gap-2 text-[13px]">
                    <b>{t.kamoku}</b>
                    <span className="tabular-nums">
                      {first}% → {last}%
                    </span>
                    {t.points.length > 1 && <span className={`text-[12px] font-black ${diff >= 0 ? "text-[#11643A]" : "text-[#B42318]"}`}>{diff >= 0 ? `+${diff}` : diff}</span>}
                    <span className="text-[11px] text-[#5A5D73]">{t.points.length}回</span>
                  </p>
                  <Spark points={t.points.map((p) => p.pct)} target={Math.round(s.rate * 100)} />
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p className="m-0 text-[12.5px] font-black">週ごとの、やったことの割合</p>
          <div className="mt-2 flex h-[110px] items-end gap-3" role="img" aria-label={[1, ...WEEKS].map((w) => `${w}週目 ${totals(w) ? Math.round((ids(w).length / totals(w)) * 100) : 0}%`).join("、")}>
            {[1, ...WEEKS].map((w) => {
              const pct = totals(w) ? Math.min(100, Math.round((ids(w).length / totals(w)) * 100)) : 0;
              return (
                <div key={w} className="flex flex-1 flex-col items-center gap-0.5">
                  <span className="text-[11px] tabular-nums">{pct}%</span>
                  <span className="w-full rounded-t-[4px] bg-[#1533B8]" style={{ height: `${Math.max(2, pct * 0.75)}px`, opacity: pct ? 1 : 0.15 }} />
                  <span className="text-[11px] font-bold">{w}週</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Spark({ points, target }: { points: number[]; target: number }) {
  const W = 220;
  const H = 40;
  const x = (i: number) => (points.length === 1 ? W / 2 : 6 + (i * (W - 12)) / (points.length - 1));
  const y = (v: number) => H - 4 - (v / 100) * (H - 8);
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" className="mt-0.5 block max-w-full">
      <line x1={0} x2={W} y1={y(target)} y2={y(target)} stroke="#B42318" strokeDasharray="4 3" strokeWidth={1} />
      <polyline points={points.map((v, i) => `${x(i)},${y(v)}`).join(" ")} fill="none" stroke="#1533B8" strokeWidth={2} />
      {points.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r={3} fill="#1533B8" />
      ))}
    </svg>
  );
}

function ParentWeek({ def, week, s, rows, results, subjects, done, total }: { def: CourseDef; week: number; s: CourseState; rows: Row[]; results: ExamAttempt[]; subjects: CourseSubject[]; done: number; total: number }) {
  const diag = rows.filter((r) => r.attempt);
  const gap = diag.reduce((a, r) => a + r.gap, 0);
  const ts = trends(results, subjects, def.specPrefix).filter((t) => t.points.length > 1);
  const rv = s.reviews?.[week];
  const [copied, setCopied] = useState(false);
  const moves = ts.length ? ts.map((t) => `${t.kamoku} ${t.points[0].pct}→${t.points[t.points.length - 1].pct}%`).join("、") : "";
  const review = rv ? `手ごたえは${rv.better || "（未記入）"}。まだ不安なのは「${rv.worry || "（未記入）"}」。来週は1日${rv.hours}時間の予定です。` : "まだ書いていません。";
  // 保護者に送る文面（本人が自分で送る。こちらからは送らない）
  const text = [
    `【${def.name}】${week}週目の報告`,
    `目標まで（診断した科目の合計）：${gap ? `あと${gap}点` : "届いています"}`,
    `今週の計画：${done}/${total} できた`,
    ...(moves ? [`点の動き：${moves}`] : []),
    `ふり返り：${review}`,
    `※点は${def.moshi}（オリジナル問題）での目安で、合否を予想するものではありません。`,
  ].join("\n");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* コピーできない環境では、この画面を見せてもらう */
    }
  }
  return (
    <article aria-label="保護者への報告" className="rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFFDF5] p-4 text-[13.5px] leading-relaxed">
      <h3 className="m-0 text-[16px] font-black">{def.sale ? `保護者に見せる報告：${week}週目` : `保護者への報告（見本）：${week}週目`}</h3>
      <p className="m-0 mt-1 text-[12px] text-[#5A5D73]">{def.sale ? "この画面を見せるか、下のボタンで文面をコピーして、自分でLINEやメールで送れます（こちらから保護者の方へ送ることはありません）。" : "伴走では、毎週この形で保護者の方にお届けします（お子さまの同意のうえで）。"}</p>
      <dl className="m-0 mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
        <div className="rounded-[10px] bg-white px-3 py-2">
          <dt className="text-[11.5px] font-bold text-[#5A5D73]">目標まで（診断した科目）</dt>
          <dd className="m-0 text-[18px] font-black">{gap ? `あと${gap}点` : "届いています"}</dd>
        </div>
        <div className="rounded-[10px] bg-white px-3 py-2">
          <dt className="text-[11.5px] font-bold text-[#5A5D73]">今週の計画</dt>
          <dd className="m-0 text-[18px] font-black">
            {done}/{total}
          </dd>
        </div>
        <div className="rounded-[10px] bg-white px-3 py-2">
          <dt className="text-[11.5px] font-bold text-[#5A5D73]">点の動き</dt>
          <dd className="m-0 text-[13px] font-black">{ts.length ? ts.map((t) => `${t.kamoku} ${t.points[0].pct}→${t.points[t.points.length - 1].pct}%`).join("、") : "2回目の診断のあとに出ます"}</dd>
        </div>
      </dl>
      <p className="m-0 mt-2">
        本人のふり返り：{rv ? `手ごたえは${rv.better || "（未記入）"}。まだ不安なのは「${rv.worry || "（未記入）"}」。来週は1日${rv.hours}時間の予定です。` : "まだ書かれていません。"}
      </p>
      <p className="m-0 mt-2 rounded-[10px] bg-white px-3 py-2 text-[12.5px]">
        声のかけ方のヒント：この時期は点数の上下より、計画をこなした日数をほめてください。不安な単元を口にできたら、それは前に進んでいるしるしです。
      </p>
      {def.sale && (
        <button type="button" onClick={copy} className="mt-2 min-h-[40px] rounded-[10px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-4 text-[13px] font-black">
          {copied ? "コピーしました" : "報告の文面をコピーする"}
        </button>
      )}
      <p className="m-0 mt-2 text-[11.5px] text-[#5A5D73]">点は{def.moshi}（オリジナル問題）での目安で、合否を予想するものではありません。</p>
    </article>
  );
}
