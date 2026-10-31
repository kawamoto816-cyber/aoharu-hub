"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { MathText } from "./MathText";
import { makeSet, type Problem } from "@/lib/math/gen";
import { answerText, fieldCount, judge, type Verdict } from "@/lib/math/check";
import { normalize } from "@/lib/math/parse";
import { findStep, type MathStep } from "@/lib/math/steps";
import { PASSES_TO_CLEAR, recordSet, setCurrent, useMathProgress } from "@/lib/math/progress";
import { trackEvent } from "@/lib/analytics";

// 1セット (10問) を解く画面。
//   はじめる → 10問を解く → まとめて採点 → まちがえた問題だけ解き直す → 全部正解で終わり。
//   解き直しなしで満点かつ目標時間内なら合格。2回続けてまちがえた問題にはヒントカード、3回で答えを見せる。

type Phase = "ready" | "solving" | "fixing" | "done";

/** いまの時刻 (イベントの中でだけ呼ぶ) */
const clock = () => Date.now();

const fmt = (sec: number) => `${Math.floor(sec / 60)}分${String(Math.floor(sec % 60)).padStart(2, "0")}秒`;

export function Drill({ step, onRestart }: { step: MathStep; onRestart: () => void }) {
  const [problems] = useState<Problem[]>(() => makeSet(step.no));
  const [inputs, setInputs] = useState<string[][]>(() => problems.map((p) => Array(fieldCount(p.answer)).fill("")));
  const [verdicts, setVerdicts] = useState<(Verdict[] | null)[]>(() => problems.map(() => null));
  const [tries, setTries] = useState<number[]>(() => problems.map(() => 0));
  const [phase, setPhase] = useState<Phase>("ready");
  const [startedAt, setStartedAt] = useState(0);
  const [now, setNow] = useState(0);
  const [first, setFirst] = useState<{ seconds: number; perfect: boolean } | null>(null);
  const [outcome, setOutcome] = useState<{ pass: boolean; perfect: boolean; seconds: number; justCleared: boolean; passes: number; misses: number } | null>(null);
  const focused = useRef<{ p: number; f: number }>({ p: 0, f: 0 });
  const refs = useRef<Record<string, HTMLInputElement | null>>({});
  const progress = useMathProgress();
  const rec = progress.steps[step.no];

  useEffect(() => {
    if (phase !== "solving" && phase !== "fixing") return;
    const t = setInterval(() => setNow(clock()), 1000);
    return () => clearInterval(t);
  }, [phase]);

  const keys = useMemo(() => {
    const kinds = new Set(problems.map((p) => p.answer.kind));
    const letters = new Set(problems.flatMap((p) => [...`${p.q}${p.lead ?? ""}`.matchAll(/[abxy]/g)].map((m) => m[0])));
    const k = ["−", "/"];
    if (kinds.has("surd") || kinds.has("roots")) k.push("√", "(", ")");
    if (kinds.has("expr") || kinds.has("exact") || kinds.has("factor")) {
      for (const v of ["x", "y", "a", "b"]) if (letters.has(v)) k.push(v);
      k.push("²", "(", ")");
    }
    return [...new Set(k)];
  }, [problems]);

  function start() {
    const t = clock();
    setStartedAt(t);
    setNow(t);
    setPhase("solving");
    setCurrent(step.no);
    trackEvent("math_set_start", { step: step.no });
    setTimeout(() => refs.current["0-0"]?.focus(), 50);
  }

  function setField(p: number, f: number, v: string) {
    setInputs((xs) => xs.map((row, i) => (i === p ? row.map((x, j) => (j === f ? v : x)) : row)));
  }

  function insert(sym: string) {
    const { p, f } = focused.current;
    const el = refs.current[`${p}-${f}`];
    const text = sym === "−" ? "-" : sym;
    const cur = inputs[p]?.[f] ?? "";
    const s = el?.selectionStart ?? cur.length;
    const e = el?.selectionEnd ?? cur.length;
    setField(p, f, cur.slice(0, s) + text + cur.slice(e));
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(s + text.length, s + text.length);
    });
  }

  function grade() {
    const vs = problems.map((pr, i) => {
      const prev = verdicts[i];
      if (prev && prev.every((v) => v === "ok")) return prev;
      return judge(pr.answer, inputs[i]);
    });
    const allOk = vs.every((v) => v.every((x) => x === "ok"));
    setVerdicts(vs);
    setTries((ts) => ts.map((t, i) => (vs[i].every((x) => x === "ok") ? t : t + 1)));
    const seconds = (clock() - startedAt) / 1000;
    const f = first ?? { seconds, perfect: allOk };
    if (!first) setFirst(f);
    if (!allOk) {
      setPhase("fixing");
      const firstWrong = vs.findIndex((v) => !v.every((x) => x === "ok"));
      setTimeout(() => refs.current[`${firstWrong}-0`]?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
      return;
    }
    const pass = f.perfect && f.seconds <= step.target * 60;
    const { rec: r, justCleared } = recordSet(step.no, { pass, perfect: f.perfect, seconds: Math.round(f.seconds) });
    setOutcome({ pass, perfect: f.perfect, seconds: f.seconds, justCleared, passes: r.passes, misses: r.misses });
    setPhase("done");
    trackEvent("math_set_finish", { step: step.no, pass, perfect: f.perfect, seconds: Math.round(f.seconds), cleared: justCleared });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const elapsed = phase === "ready" ? 0 : (now - startedAt) / 1000;
  const overTime = elapsed > step.target * 60;

  if (phase === "ready") {
    return (
      <div className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]">
        <p className="m-0 text-[15px] font-black">10問・目標 {step.target}分</p>
        <ul className="m-0 mt-2 list-disc pl-5 text-[13.5px] leading-relaxed text-[#3A3D55]">
          <li>紙と鉛筆を用意して、途中の式は紙に書きましょう。画面には答えだけを入れます。</li>
          <li>10問を解き終えたら、まとめて採点します。まちがえた問題は、満点になるまで解き直します。</li>
          <li>解き直しなしで満点、かつ目標時間内なら合格。{PASSES_TO_CLEAR}セット続けて合格で次の段へ進めます。</li>
        </ul>
        {rec && (
          <p className="m-0 mt-3 text-[12.5px] font-bold text-[#1533B8]">
            この段：{rec.sets}セット・続けて合格 {rec.passes}/{PASSES_TO_CLEAR}
            {rec.cleared ? "・合格ずみ" : ""}
            {rec.best ? `・ベスト ${fmt(rec.best)}` : ""}
          </p>
        )}
        <button type="button" onClick={start} className="mt-4 flex min-h-[52px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] text-[16px] font-black text-[#15172B] shadow-[0_3px_0_#15172B]">
          はじめる（時間をはかります）
        </button>
      </div>
    );
  }

  if (phase === "done" && outcome) {
    const next = step.no < 50 ? findStep(step.no + 1) : null;
    const prevStep = step.prev.length ? findStep(step.prev[0]) : null;
    return (
      <div className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]">
        <p className="m-0 text-[13px] font-bold text-[#3A3D55]">
          最初の採点まで {fmt(outcome.seconds)}（目標 {step.target}分）
        </p>
        {outcome.pass ? (
          <>
            <p className="m-0 mt-2 text-[22px] font-black text-[#1533B8]">合格！</p>
            <p className="m-0 mt-1 text-[14px] leading-relaxed">
              {outcome.justCleared || outcome.passes >= PASSES_TO_CLEAR ? `第${step.no}段をクリアしました。次の段へ進めます。` : `解き直しなしで満点、時間内です。あと${PASSES_TO_CLEAR - outcome.passes}セット続けて合格すると、次の段へ進めます。`}
            </p>
          </>
        ) : outcome.perfect ? (
          <>
            <p className="m-0 mt-2 text-[22px] font-black">満点！あとは速さ</p>
            <p className="m-0 mt-1 text-[14px] leading-relaxed">解き直しなしで満点です。目標時間をこえたので、もう1セット。速く正確に解けると、上の段で計算につまずかなくなります。</p>
          </>
        ) : (
          <>
            <p className="m-0 mt-2 text-[22px] font-black">解き直して満点</p>
            <p className="m-0 mt-1 text-[14px] leading-relaxed">最後まで直しきりました。次は、最初の採点で満点をめざしましょう。</p>
          </>
        )}
        {!outcome.perfect && outcome.misses >= 3 && prevStep && (
          <p className="m-0 mt-3 rounded-xl bg-[#FFF4DE] px-3 py-2 text-[13px] leading-relaxed">
            3セット続けて満点を逃しました。いったん
            <Link href={`/learn/math/${prevStep.no}`} className="font-bold text-[#1533B8]">
              第{prevStep.no}段「{prevStep.title}」
            </Link>
            を1セットはさむと、この段が楽になります。
          </p>
        )}
        <div className="mt-4 grid gap-2.5">
          {(outcome.justCleared || (rec?.cleared && outcome.pass)) && next ? (
            <Link href={`/learn/math/${next.no}`} className="flex min-h-[52px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] text-[16px] font-black text-white no-underline shadow-[0_3px_0_#0B1F7A]">
              第{next.no}段「{next.title}」へ →
            </Link>
          ) : null}
          <button type="button" onClick={onRestart} className="flex min-h-[52px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] text-[16px] font-black text-[#15172B] shadow-[0_3px_0_#15172B]">
            もう1セット
          </button>
          <Link href="/learn/math" className="flex min-h-[48px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-white text-[14px] font-bold text-[#15172B] no-underline">
            段の一覧へ
          </Link>
        </div>
      </div>
    );
  }

  const answered = inputs.filter((row) => row.every((x) => x.trim())).length;

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-4 mb-3 flex flex-col gap-2 border-b border-[#E4E2D8] bg-[#F7F6F1]/95 px-4 py-2.5 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex items-center justify-between text-[13px] font-bold">
          <span>
            {phase === "fixing" ? "まちがえた問題を直そう" : `解いた ${answered} / ${problems.length}`}
          </span>
          <span className={overTime ? "text-[#B42318]" : "text-[#3A3D55]"}>
            {fmt(elapsed)}／目標 {step.target}分
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5" aria-label="記号の入力">
          {keys.map((k) => (
            <button
              key={k}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => insert(k)}
              className="min-h-[38px] min-w-[38px] rounded-lg border-[1.5px] border-[#15172B] bg-white px-2 text-[16px] font-bold text-[#15172B]"
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <ol className="m-0 flex list-none flex-col gap-3 p-0">
        {problems.map((pr, pi) => {
          const v = verdicts[pi];
          const ok = v?.every((x) => x === "ok");
          const locked = phase === "fixing" && ok;
          const t = tries[pi];
          return (
            <li key={pi} className={`rounded-[16px] border-[1.5px] bg-white p-4 ${ok ? "border-[#1533B8]" : v ? "border-[#D9341F]" : "border-[#15172B]"}`}>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-[13px] font-black text-[#3A3D55]">({pi + 1})</span>
                <div className="min-w-0 flex-1">
                  {pr.lead && <MathText src={pr.lead} className="text-[14px] text-[#3A3D55]" />}
                  {pr.q && (
                    <div className="mt-0.5">
                      <MathText src={pr.q} className="text-[22px] font-bold" />
                    </div>
                  )}
                  <div className="mt-2 flex flex-col gap-2">
                    {inputs[pi].map((val, fi) => {
                      const fv = v?.[fi];
                      return (
                        <div key={fi}>
                          <label className="flex items-center gap-2">
                            {pr.labels?.[fi] ? <span className="shrink-0 text-[16px] font-bold">{pr.labels[fi]}</span> : null}
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
                              inputMode="text"
                              autoCapitalize="off"
                              autoCorrect="off"
                              autoComplete="off"
                              spellCheck={false}
                              aria-label={`(${pi + 1}) の答え${inputs[pi].length > 1 ? ` ${fi + 1}つ目` : ""}`}
                              className={`min-h-[44px] w-full rounded-lg border-[1.5px] px-3 text-[18px] ${fv === "ok" ? "border-[#1533B8] bg-[#EEF1FF]" : fv ? "border-[#D9341F]" : "border-[#9A9CB0]"} disabled:opacity-80`}
                            />
                            {fv === "ok" && <span className="text-[20px] font-black text-[#1533B8]" aria-label="正解">○</span>}
                            {fv && fv !== "ok" && <span className="text-[20px] font-black text-[#D9341F]" aria-label="まちがい">✕</span>}
                          </label>
                          {val && fv !== "ok" && (
                            <div className="mt-1 pl-1 text-[15px] text-[#3A3D55]">
                              <MathText src={normalize(val)} />
                            </div>
                          )}
                          {fv === "form" && <p className="m-0 mt-1 text-[12.5px] font-bold text-[#B54708]">あと一歩：値は合っています。約分・同類項のまとめ・√の簡単化・有理化・因数分解の続きを確かめよう。</p>}
                          {fv === "invalid" && (
                            <p className="m-0 mt-1 text-[12.5px] font-bold text-[#B42318]">{val.trim() ? "式として読めませんでした。記号や かっこ を確かめよう。" : "答えを入れよう。"}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {!ok && t >= 2 && (
                    <div className="mt-3 rounded-xl border-[1.5px] border-dashed border-[#15172B] bg-[#FFFBE6] p-3">
                      <p className="m-0 text-[12px] font-black text-[#1533B8]">ヒントカード</p>
                      <p className="m-0 mt-1 text-[13.5px] leading-relaxed">{step.hint}</p>
                      <div className="mt-2 flex flex-col gap-0.5 text-[15px]">
                        {step.hintSteps.map((h, i) => (
                          <span key={i} className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-[#3A3D55]">{i === 0 ? "例" : "→"}</span>
                            <MathText src={h} />
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {!ok && t >= 3 && (
                    <p className="m-0 mt-2 flex flex-wrap items-center gap-2 text-[14px]">
                      <span className="font-bold">答え：</span>
                      {(pr.show ?? answerText(pr.answer)).map((a, i) => (
                        <MathText key={i} src={`${pr.labels?.[i] ? pr.labels[i] + " " : ""}${a}`} />
                      ))}
                      <span className="text-[12px] text-[#3A3D55]">（自分で入れて確かめよう）</span>
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <button type="button" onClick={grade} className="mt-5 flex min-h-[56px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] text-[17px] font-black text-white shadow-[0_4px_0_#0B1F7A]">
        {phase === "fixing" ? "直したところを採点する" : "採点する"}
      </button>
    </div>
  );
}
