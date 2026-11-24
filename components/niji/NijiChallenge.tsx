"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { recordMastery } from "@/lib/sakanobori/mastery";
import { setKakomonReturn } from "@/components/kakomon/KakomonReturn";
import type { UnitLink } from "@/components/kakomon/Challenge";
import {
  daimonPoints,
  itemKey,
  type NijiDaimon,
  type NijiExam,
  type NijiItem,
} from "@/lib/niji/types";

// 2次試験の過去問チャレンジの本体。問題は載せない (大学の公開ページを見て、紙に解く)。
// ① 時間を計る (大問ごと) → ② 設問ごとに自己採点 (空欄は ○×、記述は書けた項目のチェックで部分点。落とした設問は理由を1つ) → ③ 作戦表。
// 途中の状態は、この端末に残す。

type Why = "p" | "c" | "t";
type Mark = { v?: 0 | 1; steps?: boolean[]; done?: boolean; why?: Why };
type Saved = {
  phase: "run" | "grade" | "done";
  startedAt?: number;
  /** 大問ごとにかかった秒 */
  laps: Record<string, number>;
  cur?: string;
  curSince?: number;
  marks: Record<string, Mark>;
  target: number;
  doneUnits: string[];
  recorded?: boolean;
};

const key = (id: string) => `niji:v1:${id}`;
function load(id: string): Saved | null {
  try {
    const raw = window.localStorage.getItem(key(id));
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}
function store(id: string, v: Saved | null) {
  try {
    if (v) window.localStorage.setItem(key(id), JSON.stringify(v));
    else window.localStorage.removeItem(key(id));
  } catch {
    /* 保存できない端末でも、そのまま使える */
  }
}

const WHY: [Why, string][] = [
  ["p", "方針が立たない"],
  ["c", "計算・書き方で落とした"],
  ["t", "時間切れ"],
];
const mmss = (sec: number) =>
  `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;
const nowMs = () => Date.now();
const r1 = (n: number) => Math.round(n * 10) / 10;
const card =
  "rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4 sm:p-5";
const bigBtn =
  "inline-flex min-h-[48px] items-center justify-center rounded-[12px] border-[1.5px] border-[#15172B] px-5 text-[15px] font-black";
const smBtn =
  "inline-flex min-h-[40px] items-center rounded-[10px] border-[1.5px] border-[#15172B] px-3 text-[13px] font-black no-underline";
const pill =
  "min-h-[38px] min-w-[44px] cursor-pointer rounded-[10px] border-[1.5px] px-2.5 text-[13px] font-black";

const got = (it: NijiItem, m?: Mark) =>
  !m
    ? 0
    : it.steps
      ? it.steps.reduce((a, s, i) => a + (m.steps?.[i] ? s[1] : 0), 0)
      : m.v === 1
        ? it.pt
        : 0;
const touched = (it: NijiItem, m?: Mark) =>
  !!m && (it.steps ? !!m.done : m.v !== undefined);

const sakanoboriHref = (unit: string, n: number) =>
  `/learn/sakanobori?u=${encodeURIComponent(unit)}&w=${Array.from({ length: Math.min(Math.max(n, 1), 8) }, () => encodeURIComponent(unit)).join(",")}`;

function PageLinks({ exam }: { exam: NijiExam }) {
  return (
    <a
      href={exam.page}
      target="_blank"
      rel="noopener noreferrer"
      className={`${smBtn} bg-white text-[#15172B]`}
      onClick={() => trackEvent("niji_open_page", { exam: exam.id })}
    >
      問題・出題意図を開く（{exam.univ}）
    </a>
  );
}

const fresh = (target = 0.6): Saved => ({
  phase: "run",
  laps: {},
  marks: {},
  target,
  doneUnits: [],
});

export function NijiChallenge({
  exam,
  unitLinks,
}: {
  exam: NijiExam;
  unitLinks: Record<string, UnitLink>;
}) {
  const [s, setS] = useState<Saved | null>(null);
  const [target, setTarget] = useState(0.6);
  const [now, setNow] = useState(0);
  const [tab, setTab] = useState(exam.daimon[0].no);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 初回だけ、この端末に残した続きから復元する
    setS(load(exam.id));
    setNow(Date.now());
  }, [exam.id]);
  const update = (f: (p: Saved) => Saved) =>
    setS((p) => {
      const next = f(p ?? fresh(target));
      store(exam.id, next);
      return next;
    });

  const running = s?.phase === "run" && !!s.startedAt;
  useEffect(() => {
    if (!running) return;
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, [running]);

  const items = useMemo(
    () =>
      exam.daimon.flatMap((d) =>
        d.blocks.flatMap((b) => b.items.map((it) => ({ d, it }))),
      ),
    [exam],
  );
  const total = useMemo(
    () => exam.daimon.reduce((a, d) => a + daimonPoints(d), 0),
    [exam],
  );

  const start = (timed: boolean) => {
    const t = nowMs();
    setNow(t);
    update(() => ({
      ...fresh(target),
      phase: timed ? "run" : "grade",
      ...(timed ? { startedAt: t, cur: exam.daimon[0].no, curSince: t } : {}),
    }));
    trackEvent("niji_start", { exam: exam.id, timed: timed ? 1 : 0 });
    window.scrollTo(0, 0);
  };
  const closeLap = (p: Saved, t: number): Record<string, number> =>
    p.cur && p.curSince
      ? { ...p.laps, [p.cur]: (p.laps[p.cur] ?? 0) + (t - p.curSince) / 1000 }
      : p.laps;
  const switchTo = (no: string) => {
    const t = nowMs();
    update((p) => ({ ...p, laps: closeLap(p, t), cur: no, curSince: t }));
  };
  const toGrade = () => {
    const t = nowMs();
    update((p) => ({
      ...p,
      phase: "grade",
      laps: closeLap(p, t),
      cur: undefined,
      curSince: undefined,
    }));
    window.scrollTo(0, 0);
  };
  const setMark = (k: string, f: (m: Mark) => Mark) =>
    update((p) => ({ ...p, marks: { ...p.marks, [k]: f(p.marks[k] ?? {}) } }));
  const reset = () => {
    store(exam.id, null);
    setS(null);
    window.scrollTo(0, 0);
  };

  const score = (d?: NijiDaimon) =>
    items
      .filter((x) => !d || x.d === d)
      .reduce((a, { d: dd, it }) => a + got(it, s?.marks[itemKey(dd, it)]), 0);
  const nTouched = items.filter(({ d, it }) =>
    touched(it, s?.marks[itemKey(d, it)]),
  ).length;

  const toDone = () => {
    update((p) => {
      if (!p.recorded) {
        // 単元ごとの出来を、さかのぼりの習熟度に1件ずつ記録する (つけた設問がすべて満点なら ok)
        const by = new Map<string, boolean>();
        for (const { d, it } of items) {
          const m = p.marks[itemKey(d, it)];
          if (!touched(it, m)) continue;
          by.set(it.unit, (by.get(it.unit) ?? true) && got(it, m) >= it.pt);
        }
        recordMastery([...by.entries()].map(([unit, ok]) => ({ unit, ok })));
        trackEvent("niji_submit", { exam: exam.id, score: r1(score()) });
      }
      return { ...p, phase: "done", recorded: true };
    });
    window.scrollTo(0, 0);
  };

  const title = `${exam.univ} ${exam.year} ${exam.subject}`;

  // ---------- はじめ方 ----------
  if (!s) {
    return (
      <div className="grid gap-4">
        <section className={card}>
          <h2 className="m-0 text-[17px] font-black">はじめ方</h2>
          <ol className="m-0 mt-3 grid list-none gap-3 p-0">
            {[
              [
                "問題を開いて、紙に解く",
                `問題は${exam.univ}の公開ページで開きます（印刷しても、タブレットで見ても）。本番と同じく、導出の過程も紙に書きます。`,
              ],
              [
                "設問ごとに自己採点",
                "空欄は答えを見て ○×。記述は「この式が書けたか」のチェック表で部分点を出し、解答例で確かめます。",
              ],
              [
                "落とした理由を1タップ",
                "「方針が立たない／計算・書き方で落とした／時間切れ」。理由によって、次にやることが変わります。",
              ],
              [
                "作戦表でつぶす",
                "目標点までの差を、取りもどしやすい順に単元へ。つぶしたら、同じ問題にもう一度。",
              ],
            ].map(([t, b], i) => (
              <li key={t} className="flex gap-3">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#1533B8] text-[13px] font-black text-white">
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <b className="block text-[15px]">{t}</b>
                  <span className="text-[13px] leading-relaxed text-[#3A3D55]">
                    {b}
                  </span>
                  {i === 0 && (
                    <span className="mt-2 block">
                      <PageLinks exam={exam} />
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ol>
          <h3 className="m-0 mt-4 text-[14px] font-black">
            目標点（自分で決める）
          </h3>
          <p className="m-0 mt-1.5 flex flex-wrap gap-2" role="radiogroup">
            {[0.5, 0.6, 0.7, 0.8].map((t) => (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={target === t}
                onClick={() => setTarget(t)}
                className={`${pill} ${target === t ? "border-[#1533B8] bg-[#F1F4FD] text-[#1533B8]" : "border-[#E4E2D8] bg-white text-[#15172B]"}`}
              >
                {t * 10}割
              </button>
            ))}
          </p>
          <p className="m-0 mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => start(true)}
              className={`${bigBtn} cursor-pointer bg-[#1533B8] text-white shadow-[0_4px_0_#0B1F7A]`}
            >
              時計を動かして始める（{exam.minutes}分）
            </button>
            <button
              type="button"
              onClick={() => start(false)}
              className={`${bigBtn} cursor-pointer bg-white text-[#15172B]`}
            >
              もう解いた・自己採点だけする
            </button>
          </p>
          {exam.timeNote && (
            <p className="m-0 mt-3 text-[12px] leading-relaxed text-[#5A5D75]">
              {exam.timeNote}
            </p>
          )}
        </section>
        <Source exam={exam} />
      </div>
    );
  }

  // ---------- 解く (時計) ----------
  if (s.phase === "run") {
    const elapsed = s.startedAt ? Math.floor((now - s.startedAt) / 1000) : 0;
    const left = exam.minutes * 60 - elapsed;
    const lapOf = (no: string) =>
      (s.laps[no] ?? 0) +
      (s.cur === no && s.curSince ? Math.max(0, now - s.curSince) / 1000 : 0);
    return (
      <div>
        <div
          className="sticky top-2 z-10 mb-3 flex items-center justify-between gap-3 rounded-[12px] bg-[#15172B] px-4 py-2.5 text-white"
          role="timer"
          aria-live="off"
        >
          <span className="text-[13px] font-bold leading-snug">
            {title}
            <br />
            <span className="text-[12px] font-normal opacity-80">
              いま：問題{s.cur}
            </span>
          </span>
          <span className="whitespace-nowrap text-[13px]">
            {left >= 0 ? "残り" : "延長"}{" "}
            <b
              className={`text-[22px] tabular-nums ${left <= 300 ? "text-[#FFE45C]" : ""}`}
            >
              {mmss(Math.abs(left))}
            </b>
          </span>
        </div>
        <section className={card}>
          <h2 className="m-0 text-[17px] font-black">大問ごとの時間</h2>
          <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
            答えはここには入れません。紙に解き、大問を移るときに、その大問のボタンを押します。時間を過ぎても止まりません（延長した分も残ります）。
          </p>
          <ul className="m-0 mt-3 grid list-none gap-2 p-0">
            {exam.daimon.map((d) => (
              <li
                key={d.no}
                className={`flex items-center justify-between gap-2 rounded-[12px] border p-3 ${s.cur === d.no ? "border-[#1533B8] bg-[#F1F4FD]" : "border-[#E4E2D8] bg-[#FBFAF6]"}`}
              >
                <span className="min-w-0">
                  <b className="text-[15px]">問題{d.no}</b>
                  <span className="block text-[12px] leading-snug text-[#5A5D75]">
                    {d.theme}
                  </span>
                </span>
                <span className="flex flex-none items-center gap-2">
                  <span className="text-right text-[12px] text-[#5A5D75]">
                    <b className="block text-[16px] tabular-nums text-[#15172B]">
                      {mmss(lapOf(d.no))}
                    </b>
                    目安 {d.minutes}分
                  </span>
                  {s.cur !== d.no && (
                    <button
                      type="button"
                      onClick={() => switchTo(d.no)}
                      className={`${smBtn} cursor-pointer bg-white text-[#15172B]`}
                    >
                      ここを解く
                    </button>
                  )}
                </span>
              </li>
            ))}
          </ul>
          <p className="m-0 mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={toGrade}
              className={`${bigBtn} cursor-pointer bg-[#1533B8] text-white`}
            >
              解き終えた・自己採点へ
            </button>
            <PageLinks exam={exam} />
          </p>
        </section>
      </div>
    );
  }

  // ---------- 自己採点 ----------
  if (s.phase === "grade") {
    const d = exam.daimon.find((x) => x.no === tab) ?? exam.daimon[0];
    return (
      <div>
        <div className="sticky top-2 z-10 mb-3 flex items-center justify-between gap-3 rounded-[12px] bg-[#15172B] px-4 py-2.5 text-white">
          <span className="text-[13px] font-bold leading-snug">
            自己採点
            <br />
            <span className="text-[12px] font-normal opacity-80">
              つけた設問 {nTouched} / {items.length}
            </span>
          </span>
          <span className="whitespace-nowrap text-[13px]">
            いま <b className="text-[22px] tabular-nums">{r1(score())}</b> /{" "}
            {total}点
          </span>
        </div>
        <section className={card}>
          <p className="m-0 text-[13px] leading-relaxed text-[#3A3D55]">
            空欄は「答えを見る」で照らして
            ○×（合っていた小問群は「空欄を全部○」でまとめて）。記述は、答案に書けた項目にチェックし、「解答例を見る」で確かめます。落とした設問だけ、理由を聞きます。点はアオハルの目安です。
          </p>
          <p className="m-0 mt-3 flex flex-wrap gap-2" role="tablist">
            {exam.daimon.map((x) => (
              <button
                key={x.no}
                type="button"
                role="tab"
                aria-selected={x.no === d.no}
                onClick={() => setTab(x.no)}
                className={`${pill} ${x.no === d.no ? "border-[#15172B] bg-[#15172B] text-white" : "border-[#15172B] bg-white text-[#15172B]"}`}
              >
                問題{x.no}（{r1(score(x))}/{daimonPoints(x)}）
              </button>
            ))}
          </p>
          {d.blocks.map((b) => (
            <div key={b.title} className="mt-4 border-t border-[#E4E2D8] pt-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="m-0 text-[13px] font-black text-[#3A3D55]">
                  {b.title}
                </h3>
                {b.items.some((it) => !it.steps) && (
                  <button
                    type="button"
                    onClick={() =>
                      update((p) => {
                        const marks = { ...p.marks };
                        for (const it of b.items)
                          if (!it.steps) {
                            const k = itemKey(d, it);
                            marks[k] = { ...marks[k], v: 1, why: undefined };
                          }
                        return { ...p, marks };
                      })
                    }
                    className="min-h-[34px] cursor-pointer rounded-[10px] border-[1.5px] border-[#15172B] bg-white px-2.5 text-[12px] font-black"
                  >
                    空欄を全部○
                  </button>
                )}
              </div>
              {b.items.map((it) => {
                const k = itemKey(d, it);
                const m = s.marks[k];
                const lost = touched(it, m) && got(it, m) < it.pt;
                return (
                  <div
                    key={it.id}
                    className="border-b border-dashed border-[#E4E2D8] py-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="m-0 text-[14px] font-black leading-snug">
                        {it.id}　{it.name}
                      </p>
                      <p className="m-0 whitespace-nowrap text-[12px] tabular-nums text-[#5A5D75]">
                        {touched(it, m) ? `${r1(got(it, m))} / ` : ""}
                        {it.pt}点
                      </p>
                    </div>
                    {it.steps ? (
                      <>
                        {it.steps.map((st, i) => (
                          <label
                            key={st[0]}
                            className="flex cursor-pointer items-start gap-2 py-1 text-[13.5px]"
                          >
                            <input
                              type="checkbox"
                              checked={!!m?.steps?.[i]}
                              onChange={(e) =>
                                setMark(k, (mm) => {
                                  const steps =
                                    mm.steps ?? it.steps!.map(() => false);
                                  const next = steps.map((v, j) =>
                                    j === i ? e.target.checked : v,
                                  );
                                  return { ...mm, steps: next, done: true };
                                })
                              }
                              className="mt-0.5 h-5 w-5 flex-none accent-[#1533B8]"
                            />
                            <span>
                              {st[0]}
                              <span className="text-[12px] text-[#5A5D75]">
                                （{st[1]}点）
                              </span>
                            </span>
                          </label>
                        ))}
                        <p className="m-0 mt-1 flex flex-wrap gap-1.5">
                          <button
                            type="button"
                            aria-pressed={!!m?.done && !m.steps?.some(Boolean)}
                            onClick={() =>
                              setMark(k, (mm) => ({
                                ...mm,
                                steps: it.steps!.map(() => false),
                                done: true,
                              }))
                            }
                            className={`${pill} text-[12px] ${m?.done && !m.steps?.some(Boolean) ? "border-[#15172B] bg-[#15172B] text-white" : "border-[#8a94a3] bg-white"}`}
                          >
                            1つも書けなかった
                          </button>
                          <button
                            type="button"
                            aria-expanded={!!open[k]}
                            onClick={() =>
                              setOpen((o) => ({ ...o, [k]: !o[k] }))
                            }
                            className={`${pill} border-[#8a94a3] bg-white text-[12px]`}
                          >
                            解答例を見る
                          </button>
                        </p>
                      </>
                    ) : (
                      <p className="m-0 mt-1.5 flex flex-wrap gap-1.5">
                        {([1, 0] as const).map((v) => (
                          <button
                            key={v}
                            type="button"
                            aria-pressed={m?.v === v}
                            aria-label={v ? "合っていた" : "まちがえた"}
                            onClick={() =>
                              setMark(k, (mm) => ({
                                ...mm,
                                v,
                                ...(v ? { why: undefined } : {}),
                              }))
                            }
                            className={`${pill} ${m?.v === v ? "border-[#15172B] bg-[#15172B] text-white" : "border-[#8a94a3] bg-white"}`}
                          >
                            {v ? "○" : "×"}
                          </button>
                        ))}
                        <button
                          type="button"
                          aria-expanded={!!open[k]}
                          onClick={() => setOpen((o) => ({ ...o, [k]: !o[k] }))}
                          className={`${pill} border-[#8a94a3] bg-white text-[12px]`}
                        >
                          答えを見る
                        </button>
                      </p>
                    )}
                    {open[k] && (
                      <div className="mt-1.5 rounded-[8px] bg-[#F1F4FD] px-2.5 py-1.5 text-[13px] leading-relaxed">
                        {it.steps
                          ? it.ex?.map((l) => (
                              <p key={l} className="m-0">
                                {l}
                              </p>
                            ))
                          : it.ans}
                      </div>
                    )}
                    {lost && (
                      <p
                        className="m-0 mt-1.5 flex flex-wrap gap-1.5"
                        role="radiogroup"
                        aria-label="落とした理由"
                      >
                        {WHY.map(([w, t]) => (
                          <button
                            key={w}
                            type="button"
                            role="radio"
                            aria-checked={m?.why === w}
                            onClick={() =>
                              setMark(k, (mm) => ({ ...mm, why: w }))
                            }
                            className={`min-h-[34px] cursor-pointer rounded-[10px] border-[1.5px] px-2.5 text-[12px] font-black ${m?.why === w ? "border-[#C0392B] bg-[#C0392B] text-white" : "border-[#8a94a3] bg-white"}`}
                          >
                            {t}
                          </button>
                        ))}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
          <p className="m-0 mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={toDone}
              className={`${bigBtn} cursor-pointer bg-[#1533B8] text-white`}
            >
              作戦表を見る
            </button>
            <PageLinks exam={exam} />
          </p>
          <p className="m-0 mt-3 text-[12px] leading-relaxed text-[#5A5D75]">
            解答例は、アオハルが問題から解いて書いたものです。{exam.checked}
          </p>
        </section>
      </div>
    );
  }

  // ---------- 作戦表 ----------
  const sc = r1(score());
  const targetPt = Math.round(total * s.target);
  const by = new Map<
    string,
    { lost: number; ids: string[]; why: Partial<Record<Why, number>> }
  >();
  for (const { d, it } of items) {
    const m = s.marks[itemKey(d, it)];
    if (!touched(it, m)) continue;
    const l = it.pt - got(it, m);
    if (l <= 0) continue;
    const r = by.get(it.unit) ?? { lost: 0, ids: [], why: {} };
    r.lost += l;
    r.ids.push(`${d.no}${it.id}`);
    const w = m?.why ?? "p";
    r.why[w] = (r.why[w] ?? 0) + l;
    by.set(it.unit, r);
  }
  const rank = (r: { why: Partial<Record<Why, number>> }) =>
    (r.why.c ?? 0) * 3 + (r.why.p ?? 0) * 2 + (r.why.t ?? 0);
  const rows = [...by.entries()]
    .filter(([u]) => unitLinks[u])
    .sort((a, b) => rank(b[1]) - rank(a[1]));
  const topWhy = (r: { why: Partial<Record<Why, number>> }) =>
    (Object.entries(r.why) as [Why, number][]).sort(
      (a, b) => b[1] - a[1],
    )[0][0];
  const timeLost = items.reduce((a, { d, it }) => {
    const m = s.marks[itemKey(d, it)];
    return touched(it, m) && m?.why === "t" ? a + it.pt - got(it, m) : a;
  }, 0);
  const timed = Object.keys(s.laps).length > 0;
  const tagCls: Record<Why, string> = {
    c: "bg-[#FFF1D6] text-[#8A5A00]",
    p: "bg-[#FDECEA] text-[#C0392B]",
    t: "bg-[#E6F0FF] text-[#1533B8]",
  };
  const tagName: Record<Why, string> = {
    c: "計算・書き方",
    p: "方針が立たない",
    t: "時間切れ",
  };
  const untouched = items.length - nTouched;

  return (
    <div className="grid gap-4">
      <section className={card}>
        <p className="m-0 text-[13px] text-[#3A3D55]">{title}</p>
        <p className="m-0 mt-1 text-[44px] font-black leading-none tabular-nums">
          {sc}
          <span className="text-[17px] font-bold text-[#5A5D75]">
            {" "}
            / {total}点（目安）
          </span>
        </p>
        <div className="mt-2 flex items-center gap-2">
          <div
            className="h-2 flex-1 overflow-hidden rounded bg-[#E9E8E0]"
            aria-hidden
          >
            <div
              className="h-full bg-[#1533B8]"
              style={{
                width: `${Math.min(100, Math.round((sc / total) * 100))}%`,
              }}
            />
          </div>
          <span className="text-[12px] font-bold text-[#3A3D55]">
            {sc >= targetPt
              ? `目標の${s.target * 10}割（${targetPt}点）をこえました`
              : `目標の${s.target * 10}割（${targetPt}点）まで あと${r1(targetPt - sc)}点`}
          </span>
        </div>
        <table className="mt-3 w-full border-collapse text-[13.5px]">
          <tbody>
            {exam.daimon.map((d) => (
              <tr key={d.no} className="border-b border-[#E4E2D8]">
                <th className="py-1.5 text-left font-black">問題{d.no}</th>
                <td className="py-1.5 text-right tabular-nums">
                  {r1(score(d))} / {daimonPoints(d)}点
                </td>
                <td className="py-1.5 text-right tabular-nums text-[#5A5D75]">
                  {timed
                    ? `${Math.round((s.laps[d.no] ?? 0) / 60)}分（目安 ${d.minutes}分）`
                    : `目安 ${d.minutes}分`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {untouched > 0 && (
          <p className="m-0 mt-2 text-[12px] text-[#C0392B]">
            まだつけていない設問が {untouched}{" "}
            個あります（点にも作戦表にも入っていません）。
          </p>
        )}
        <p className="m-0 mt-2 text-[12px] leading-relaxed text-[#5A5D75]">
          大学は設問ごとの配点を公表していません。点は、アオハルが決めた目安です。
        </p>
      </section>

      <section id="gyakuten" className={`${card} scroll-mt-4`}>
        <p className="m-0 text-[12px] font-black tracking-wider text-[#1533B8]">
          逆転勉強法
        </p>
        <h2 className="m-0 mt-0.5 text-[18px] font-black">
          目標点までの作戦表
        </h2>
        <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
          落とした点を単元に分け、取りもどしやすい順（計算・書き方 → 方針 →
          時間）に並べました。
        </p>
        {rows.length === 0 && (
          <p className="m-0 mt-3 text-[13px] font-bold">
            落とした設問はありません。別の年度・大学で、同じ時間配分をためせます。
          </p>
        )}
        <ol className="m-0 mt-3 grid list-none gap-2 p-0">
          {rows.map(([u, r], i) => {
            const l = unitLinks[u];
            const top = topWhy(r);
            const ok = s.doneUnits.includes(u);
            const acts: { t: string; href: string; saka?: boolean }[] = [];
            const saka = l.sakanobori && {
              t: "どこまでさかのぼるか探す",
              href: sakanoboriHref(u, r.ids.length),
              saka: true,
            };
            const moshi = l.moshi && {
              t: "単元模試で、答えまで出す練習",
              href: l.moshi,
            };
            const lec = l.lecture && { t: "図解で学びなおす", href: l.lecture };
            const time = { t: "時間の作戦を見る", href: "#niji-time" };
            for (const a of top === "c"
              ? [moshi, saka, lec]
              : top === "t"
                ? [time, saka, moshi, lec]
                : [saka, lec, moshi])
              if (a) acts.push(a);
            return (
              <li
                key={u}
                className={`rounded-[12px] border p-3 ${ok ? "border-[#B9C3E8] bg-[#F1F4FD]" : "border-[#E4E2D8] bg-[#FBFAF6]"}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="m-0 text-[12px] font-bold text-[#5A5D75]">
                      {i + 1}. {l.where}
                    </p>
                    <p
                      className={`m-0 text-[15px] font-black ${ok ? "text-[#5A5D75] line-through" : ""}`}
                    >
                      {l.name}
                    </p>
                  </div>
                  <p className="m-0 whitespace-nowrap text-[12px] font-bold text-[#C0392B]">
                    −{r1(r.lost)}点
                  </p>
                </div>
                <p className="m-0 mt-0.5 text-[12px] text-[#3A3D55]">
                  落とした設問：{r.ids.join("・")}
                </p>
                <p className="m-0 mt-1 flex flex-wrap gap-1">
                  {(Object.entries(r.why) as [Why, number][]).map(([w, v]) => (
                    <span
                      key={w}
                      className={`rounded-full px-2 py-0.5 text-[11px] font-black ${tagCls[w]}`}
                    >
                      {tagName[w]} {r1(v)}点
                    </span>
                  ))}
                </p>
                <p className="m-0 mt-1 text-[12.5px] leading-relaxed text-[#3A3D55]">
                  {top === "c"
                    ? "式は立っています。答えまで運ぶ練習を先に。"
                    : top === "t"
                      ? "解ければ取れる設問です。前の設問の時間を削る作戦を先に。"
                      : "どこまでさかのぼればわかるかを探します。"}
                </p>
                <p className="m-0 mt-2 flex flex-wrap gap-1.5">
                  {acts.map((a, j) => (
                    <Link
                      key={a.t}
                      href={a.href}
                      onClick={() => {
                        if (a.saka)
                          setKakomonReturn({
                            examId: exam.id,
                            title,
                            unit: u,
                            unitName: l.name,
                            base: "niji",
                          });
                        trackEvent("niji_plan_action", {
                          exam: exam.id,
                          unit: u,
                          act: a.t,
                        });
                      }}
                      className={`${smBtn} ${j === 0 ? "bg-[#FFE45C]" : "bg-white"} text-[#15172B]`}
                    >
                      {j === 0 ? "① " : ""}
                      {a.t}
                    </Link>
                  ))}
                </p>
                <label className="mt-2 flex cursor-pointer items-center gap-2 text-[13px] font-bold">
                  <input
                    type="checkbox"
                    checked={ok}
                    onChange={() =>
                      update((p) => ({
                        ...p,
                        doneUnits: ok
                          ? p.doneUnits.filter((x) => x !== u)
                          : [...p.doneUnits, u],
                      }))
                    }
                    className="h-5 w-5 accent-[#1533B8]"
                  />
                  この単元はつぶした
                </label>
              </li>
            );
          })}
        </ol>
        <div
          id="niji-time"
          className="mt-3 scroll-mt-4 rounded-[12px] bg-[#E6F0FF] p-3"
        >
          <p className="m-0 text-[14px] font-black">時間の作戦</p>
          <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
            {timeLost > 0
              ? `時間切れで ${r1(timeLost)}点 を落としています。`
              : "時間切れで落とした設問はありません。"}
            {timed
              ? exam.daimon
                  .filter((d) => (s.laps[d.no] ?? 0) > d.minutes * 60)
                  .map(
                    (d) =>
                      `問題${d.no}に${Math.round((s.laps[d.no] ?? 0) / 60)}分（目安${d.minutes}分）かかりました。`,
                  )
                  .join("")
              : ""}
            はじめの空欄で止まったら30秒で次へ進み、後ろの記述（部分点が出る）に時間を残します。
          </p>
        </div>
      </section>

      {exam.daimon
        .filter((d) => d.ruidai)
        .map((d) => (
          <section key={d.no} className={card}>
            <p className="m-0 text-[12px] font-black tracking-wider text-[#1533B8]">
              類題・アオハルのオリジナル（問題{d.no}の型）
            </p>
            <h2 className="m-0 mt-0.5 text-[18px] font-black">
              {d.ruidai!.title}
            </h2>
            <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
              {d.ruidai!.lead}
            </p>
            <details className="mt-2">
              <summary className="cursor-pointer text-[14px] font-black text-[#1533B8]">
                類題を開く
              </summary>
              {d.ruidai!.body.map((l) => (
                <p key={l} className="m-0 mt-2 text-[14px] leading-relaxed">
                  {l}
                </p>
              ))}
              <details className="mt-3 rounded-[10px] bg-[#F1F4FD] p-3">
                <summary className="cursor-pointer text-[13px] font-black">
                  解答例を見る
                </summary>
                {d.ruidai!.answer.map((l) => (
                  <p key={l} className="m-0 mt-1.5 text-[13px] leading-relaxed">
                    {l}
                  </p>
                ))}
              </details>
            </details>
          </section>
        ))}

      <section className={card}>
        <h2 className="m-0 text-[17px] font-black">仕上げ</h2>
        <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]">
          単元をつぶしたら、同じ問題を白紙からもう一度。
        </p>
        <p className="m-0 mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              update((p) => ({ ...p, phase: "grade" }));
              window.scrollTo(0, 0);
            }}
            className={`${bigBtn} cursor-pointer bg-white text-[#15172B]`}
          >
            自己採点をなおす
          </button>
          <button
            type="button"
            onClick={reset}
            className={`${bigBtn} cursor-pointer bg-white text-[#15172B]`}
          >
            記録を消して、もう一度挑む
          </button>
          <Link
            href="/learn/niji"
            className={`${bigBtn} bg-white text-[#15172B] no-underline`}
          >
            別の過去問をえらぶ
          </Link>
        </p>
      </section>
      <Source exam={exam} />
    </div>
  );
}

function Source({ exam }: { exam: NijiExam }) {
  return (
    <p className="m-0 mt-1 break-all text-[12px] leading-relaxed text-[#5A5D75]">
      問題と出題意図：
      <a
        href={exam.page}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#1533B8]"
      >
        {exam.pageLabel}
      </a>
      。問題文・図はこのページに載せていません。解答例・チェック表・点の目安・類題は、アオハルOSが問題から解いて作成したもので、大学の公式の解答ではありません。
    </p>
  );
}
