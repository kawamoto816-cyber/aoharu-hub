"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { SansuText } from "./SansuText";
import { makeSet, type Problem } from "@/lib/sansu/gen";
import { fieldText, judge, normalizeInput, type Judged } from "@/lib/sansu/check";
import { STEP_COUNT, findStep, type SansuStep } from "@/lib/sansu/steps";
import { PASSES_TO_CLEAR, recordSet, setCurrent, useSansuProgress } from "@/lib/sansu/progress";
import { trackEvent } from "@/lib/analytics";

// 1セット (10問) を解く画面。中学数学の Drill と同じ流れ:
//   はじめる → 10問を解く → まとめて採点 → まちがえた問題だけ解き直す → 全部正解で終わり。
//   解き直しなしで満点かつ目標時間内なら合格。2回続けてまちがえた問題にはヒントカード、3回で答えを見せる。
// 小学生向けに、文字と入力欄を大きく、低学年の段はひらがな多めの言葉にする。

type Phase = "ready" | "solving" | "fixing" | "done";

/** いまの時刻 (イベントの中でだけ呼ぶ) */
const clock = () => Date.now();

const fmt = (sec: number) => `${Math.floor(sec / 60)}分${String(Math.floor(sec % 60)).padStart(2, "0")}秒`;

/** 低学年 (1・2年) 向けの言葉 */
function words(low: boolean) {
  return low
    ? {
        paper: "かみと えんぴつを よういしよう。こたえだけを 入れます。",
        flow: "10もん といたら、まとめて まるつけ。まちがえた もんだいは、ぜんぶ あうまで なおします。",
        rule: `なおさずに ぜんぶ あって、じかん内なら ごうかく。${PASSES_TO_CLEAR}かい つづけて ごうかくで つぎの だんへ。`,
        start: "はじめる（じかんを はかります）",
        grade: "まるつけ する",
        regrade: "なおした ところを まるつけ",
        fix: "まちがえた もんだいを なおそう",
        empty: "こたえを 入れよう。",
        bad: "すうじが よめなかったよ。",
      }
    : {
        paper: "紙と鉛筆を用意して、計算は紙に書きましょう。画面には答えだけを入れます。",
        flow: "10問を解き終えたら、まとめて採点します。まちがえた問題は、満点になるまで解き直します。",
        rule: `解き直しなしで満点、かつ目標時間内なら合格。${PASSES_TO_CLEAR}セット続けて合格で次の段へ進めます。`,
        start: "はじめる（時間をはかります）",
        grade: "採点する",
        regrade: "直したところを採点する",
        fix: "まちがえた問題を直そう",
        empty: "答えを入れよう。",
        bad: "数として読めませんでした。書き方を確かめよう。",
      };
}

export function Drill({ step, onRestart }: { step: SansuStep; onRestart: () => void }) {
  const [problems] = useState<Problem[]>(() => makeSet(step.no));
  const [inputs, setInputs] = useState<string[][]>(() => problems.map((p) => Array(p.fields.length).fill("")));
  const [verdicts, setVerdicts] = useState<(Judged[] | null)[]>(() => problems.map(() => null));
  const [tries, setTries] = useState<number[]>(() => problems.map(() => 0));
  const [phase, setPhase] = useState<Phase>("ready");
  const [startedAt, setStartedAt] = useState(0);
  const [now, setNow] = useState(0);
  const [first, setFirst] = useState<{ seconds: number; perfect: boolean } | null>(null);
  const [outcome, setOutcome] = useState<{ pass: boolean; perfect: boolean; seconds: number; justCleared: boolean; passes: number; misses: number } | null>(null);
  const focused = useRef<{ p: number; f: number }>({ p: 0, f: 0 });
  const refs = useRef<Record<string, HTMLInputElement | null>>({});
  const progress = useSansuProgress();
  const rec = progress.steps[step.no];
  const low = step.grade <= 2;
  const w = words(low);

  useEffect(() => {
    if (phase !== "solving" && phase !== "fixing") return;
    const t = setInterval(() => setNow(clock()), 1000);
    return () => clearInterval(t);
  }, [phase]);

  // 数字キーボードにない記号のボタン
  const keys = useMemo(() => {
    const kinds = new Set(problems.flatMap((p) => p.fields.map((f) => f.kind)));
    const k: string[] = [];
    if (kinds.has("frac")) k.push("/");
    if (problems.some((p) => p.fields.some((f) => f.kind === "frac" && f.form !== "improper" && !f.den))) k.push("と");
    if (kinds.has("ratio")) k.push(":");
    return k;
  }, [problems]);

  function start() {
    const t = clock();
    setStartedAt(t);
    setNow(t);
    setPhase("solving");
    setCurrent(step.no);
    trackEvent("sansu_set_start", { step: step.no });
    setTimeout(() => refs.current["0-0"]?.focus(), 50);
  }

  function setField(p: number, f: number, v: string) {
    setInputs((xs) => xs.map((row, i) => (i === p ? row.map((x, j) => (j === f ? v : x)) : row)));
  }

  function insert(sym: string) {
    const { p, f } = focused.current;
    const el = refs.current[`${p}-${f}`];
    if (el?.disabled) return;
    const cur = inputs[p]?.[f] ?? "";
    const s = el?.selectionStart ?? cur.length;
    const e = el?.selectionEnd ?? cur.length;
    setField(p, f, cur.slice(0, s) + sym + cur.slice(e));
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(s + sym.length, s + sym.length);
    });
  }

  function grade() {
    const vs = problems.map((pr, i) => {
      const prev = verdicts[i];
      if (prev && prev.every((v) => v.v === "ok")) return prev;
      return judge(pr.fields, inputs[i]);
    });
    const allOk = vs.every((v) => v.every((x) => x.v === "ok"));
    setVerdicts(vs);
    setTries((ts) => ts.map((t, i) => (vs[i].every((x) => x.v === "ok") ? t : t + 1)));
    const seconds = (clock() - startedAt) / 1000;
    const f = first ?? { seconds, perfect: allOk };
    if (!first) setFirst(f);
    if (!allOk) {
      setPhase("fixing");
      const firstWrong = vs.findIndex((v) => !v.every((x) => x.v === "ok"));
      setTimeout(() => refs.current[`${firstWrong}-0`]?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
      return;
    }
    const pass = f.perfect && f.seconds <= step.target * 60;
    const { rec: r, justCleared } = recordSet(step.no, { pass, perfect: f.perfect, seconds: Math.round(f.seconds) });
    setOutcome({ pass, perfect: f.perfect, seconds: f.seconds, justCleared, passes: r.passes, misses: r.misses });
    setPhase("done");
    trackEvent("sansu_set_finish", { step: step.no, pass, perfect: f.perfect, seconds: Math.round(f.seconds), cleared: justCleared });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const elapsed = phase === "ready" ? 0 : (now - startedAt) / 1000;
  const overTime = elapsed > step.target * 60;

  if (phase === "ready") {
    return (
      <div className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]">
        <p className="m-0 text-[18px] font-black">{low ? `10もん・めあて ${step.target}分` : `10問・目標 ${step.target}分`}</p>
        <ul className="m-0 mt-2 list-disc pl-5 text-[15px] leading-relaxed text-[#3A3D55]">
          <li>{w.paper}</li>
          <li>{w.flow}</li>
          <li>{w.rule}</li>
        </ul>
        {rec && (
          <p className="m-0 mt-3 text-[13.5px] font-bold text-[#1533B8]">
            この段：{rec.sets}セット・続けて合格 {rec.passes}/{PASSES_TO_CLEAR}
            {rec.cleared ? "・合格ずみ" : ""}
            {rec.best ? `・ベスト ${fmt(rec.best)}` : ""}
          </p>
        )}
        <button type="button" onClick={start} className="mt-4 flex min-h-[56px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] text-[18px] font-black text-[#15172B] shadow-[0_3px_0_#15172B]">
          {w.start}
        </button>
      </div>
    );
  }

  if (phase === "done" && outcome) {
    const next = step.no < STEP_COUNT ? findStep(step.no + 1) : null;
    const prevStep = step.prev.length ? findStep(step.prev[0]) : null;
    return (
      <div className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]">
        <p className="m-0 text-[14px] font-bold text-[#3A3D55]">
          さいしょの まるつけまで {fmt(outcome.seconds)}（目標 {step.target}分）
        </p>
        {outcome.pass ? (
          <>
            <p className="m-0 mt-2 text-[26px] font-black text-[#1533B8]">ごうかく！</p>
            <p className="m-0 mt-1 text-[15px] leading-relaxed">
              {outcome.justCleared || outcome.passes >= PASSES_TO_CLEAR ? `第${step.no}段を クリアしました。次の段へ 進めます。` : `なおさずに 満点、時間内です。あと${PASSES_TO_CLEAR - outcome.passes}セット 続けて ごうかくすると、次の段へ 進めます。`}
            </p>
          </>
        ) : outcome.perfect ? (
          <>
            <p className="m-0 mt-2 text-[26px] font-black">満点！あとは はやさ</p>
            <p className="m-0 mt-1 text-[15px] leading-relaxed">なおさずに 満点です。目標の 時間を こえたので、もう1セット。はやく 正しく とけると、上の段が らくに なります。</p>
          </>
        ) : (
          <>
            <p className="m-0 mt-2 text-[26px] font-black">なおして 満点</p>
            <p className="m-0 mt-1 text-[15px] leading-relaxed">さいごまで なおしきりました。次は、さいしょの まるつけで 満点を めざそう。</p>
          </>
        )}
        {!outcome.perfect && outcome.misses >= 3 && prevStep && (
          <p className="m-0 mt-3 rounded-xl bg-[#FFF4DE] px-3 py-2 text-[14px] leading-relaxed">
            3セット続けて 満点を のがしました。いったん
            <Link href={`/learn/sansu/${prevStep.no}`} className="font-bold text-[#1533B8]">
              第{prevStep.no}段「{prevStep.title}」
            </Link>
            を 1セット はさむと、この段が らくに なります。
          </p>
        )}
        <div className="mt-4 grid gap-2.5">
          {(outcome.justCleared || (rec?.cleared && outcome.pass)) && next ? (
            <Link href={`/learn/sansu/${next.no}`} className="flex min-h-[56px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] px-3 text-center text-[17px] font-black text-white no-underline shadow-[0_3px_0_#0B1F7A]">
              第{next.no}段「{next.title}」へ →
            </Link>
          ) : null}
          <button type="button" onClick={onRestart} className="flex min-h-[56px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] text-[17px] font-black text-[#15172B] shadow-[0_3px_0_#15172B]">
            もう1セット
          </button>
          <Link href="/learn/sansu" className="flex min-h-[50px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-white text-[15px] font-bold text-[#15172B] no-underline">
            段の 一覧へ
          </Link>
        </div>
      </div>
    );
  }

  const answered = inputs.filter((row) => row.every((x) => x.trim())).length;

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-4 mb-3 flex flex-col gap-2 border-b border-[#E4E2D8] bg-[#F7F6F1]/95 px-4 py-2.5 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex items-center justify-between text-[14px] font-bold">
          <span>{phase === "fixing" ? w.fix : `${low ? "といた" : "解いた"} ${answered} / ${problems.length}`}</span>
          <span className={overTime ? "text-[#B42318]" : "text-[#3A3D55]"}>
            {fmt(elapsed)}／目標 {step.target}分
          </span>
        </div>
        {keys.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5" aria-label="記号の入力">
            {keys.map((k) => (
              <button
                key={k}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => insert(k)}
                className="min-h-[44px] min-w-[44px] rounded-lg border-[1.5px] border-[#15172B] bg-white px-2 text-[18px] font-bold text-[#15172B]"
              >
                {k}
              </button>
            ))}
            <span className="text-[12px] text-[#3A3D55]">
              {keys.includes("/") ? "分数は 3/4、" : ""}
              {keys.includes("と") ? "帯分数は 1と3/4、" : ""}
              {keys.includes(":") ? "比は 2:3 " : ""}と入れます
            </span>
          </div>
        )}
      </div>

      <ol className="m-0 flex list-none flex-col gap-3 p-0">
        {problems.map((pr, pi) => {
          const v = verdicts[pi];
          const ok = v?.every((x) => x.v === "ok");
          const locked = phase === "fixing" && ok;
          const t = tries[pi];
          return (
            <li key={pi} className={`rounded-[16px] border-[1.5px] bg-white p-4 ${ok ? "border-[#1533B8]" : v ? "border-[#D9341F]" : "border-[#15172B]"}`}>
              <div className="flex items-start gap-3">
                <span className="mt-1.5 text-[14px] font-black text-[#3A3D55]">({pi + 1})</span>
                <div className="min-w-0 flex-1">
                  {pr.lead && <SansuText src={pr.lead} className="text-[17px] font-bold leading-relaxed" />}
                  {pr.q && (
                    <div className="mt-0.5">
                      <SansuText src={pr.q} className="text-[28px] font-bold" />
                    </div>
                  )}
                  <div className="mt-2 flex flex-wrap items-start gap-x-4 gap-y-2">
                    {inputs[pi].map((val, fi) => {
                      const field = pr.fields[fi];
                      const fv = v?.[fi];
                      const wide = pr.fields.length === 1;
                      const showPreview = val && fv?.v !== "ok" && /[/:と]/.test(normalizeInput(val));
                      return (
                        <div key={fi} className={wide ? "w-full" : "min-w-[150px] flex-1"}>
                          <label className="flex items-center gap-2">
                            {pr.labels?.[fi] ? <span className="shrink-0 text-[18px] font-bold">{pr.labels[fi]}</span> : null}
                            <input
                              ref={(el) => {
                                refs.current[`${pi}-${fi}`] = el;
                              }}
                              value={val}
                              disabled={locked}
                              onFocus={() => (focused.current = { p: pi, f: fi })}
                              onChange={(e) => setField(pi, fi, e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  const nextKey = fi + 1 < inputs[pi].length ? `${pi}-${fi + 1}` : `${pi + 1}-0`;
                                  refs.current[nextKey]?.focus();
                                }
                              }}
                              inputMode={field.kind === "int" ? "numeric" : "decimal"}
                              enterKeyHint="next"
                              autoCapitalize="off"
                              autoCorrect="off"
                              autoComplete="off"
                              spellCheck={false}
                              aria-label={`(${pi + 1}) の答え${pr.labels?.[fi] ? ` ${pr.labels[fi]}` : inputs[pi].length > 1 ? ` ${fi + 1}つ目` : ""}`}
                              className={`min-h-[52px] w-full min-w-0 rounded-lg border-[1.5px] px-3 text-[22px] font-bold ${fv?.v === "ok" ? "border-[#1533B8] bg-[#EEF1FF]" : fv ? "border-[#D9341F]" : "border-[#9A9CB0]"} disabled:opacity-80`}
                            />
                            {pr.units?.[fi] ? <span className="shrink-0 text-[18px] font-bold">{pr.units[fi]}</span> : null}
                            {fv?.v === "ok" && (
                              <span className="text-[24px] font-black text-[#1533B8]" aria-label="正解">
                                ○
                              </span>
                            )}
                            {fv && fv.v !== "ok" && (
                              <span className="text-[24px] font-black text-[#D9341F]" aria-label="まちがい">
                                ✕
                              </span>
                            )}
                          </label>
                          {showPreview && (
                            <div className="mt-1 pl-1 text-[18px] text-[#3A3D55]">
                              <SansuText src={normalizeInput(val)} />
                            </div>
                          )}
                          {fv?.v === "form" && <p className="m-0 mt-1 text-[14px] font-bold text-[#B54708]">あと一歩：数は 合っています。{fv.msg ?? "形を なおそう。"}</p>}
                          {fv?.v === "invalid" && <p className="m-0 mt-1 text-[14px] font-bold text-[#B42318]">{val.trim() ? w.bad : w.empty}</p>}
                        </div>
                      );
                    })}
                  </div>
                  {!ok && t >= 2 && (
                    <div className="mt-3 rounded-xl border-[1.5px] border-dashed border-[#15172B] bg-[#FFFBE6] p-3">
                      <p className="m-0 text-[13px] font-black text-[#1533B8]">ヒントカード</p>
                      <p className="m-0 mt-1 text-[15px] leading-relaxed">{step.hint}</p>
                      <div className="mt-2 flex flex-col gap-0.5 text-[17px]">
                        {step.hintSteps.map((h, i) => (
                          <span key={i} className="flex items-center gap-2">
                            <span className="text-[12px] font-bold text-[#3A3D55]">{i === 0 ? "れい" : "→"}</span>
                            <SansuText src={h} />
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {!ok && t >= 3 && (
                    <p className="m-0 mt-2 flex flex-wrap items-center gap-2 text-[16px]">
                      <span className="font-bold">{low ? "こたえ：" : "答え："}</span>
                      {(pr.show ?? pr.fields.map(fieldText)).map((a, i) => (
                        <SansuText key={i} src={`${pr.labels?.[i] ? pr.labels[i] + " " : ""}${a}${pr.units?.[i] ?? ""}`} />
                      ))}
                      <span className="text-[13px] text-[#3A3D55]">（自分で 入れて 確かめよう）</span>
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <button type="button" onClick={grade} className="mt-5 flex min-h-[60px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] text-[19px] font-black text-white shadow-[0_4px_0_#0B1F7A]">
        {phase === "fixing" ? w.regrade : w.grade}
      </button>
    </div>
  );
}
