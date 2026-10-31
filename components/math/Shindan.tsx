"use client";

import { useState } from "react";
import Link from "next/link";
import { MathText } from "./MathText";
import { makeSet, type Problem } from "@/lib/math/gen";
import { fieldCount, judge } from "@/lib/math/check";
import { normalize } from "@/lib/math/parse";
import { DIAGNOSIS, findStep } from "@/lib/math/steps";
import { setCurrent } from "@/lib/math/progress";
import { trackEvent } from "@/lib/analytics";

// 学力診断：各単元の代表の段から2問ずつ、やさしい順に出す。
// 2問とも正解なら次の単元へ。まちがえたら、その単元の最初 (少し手前) から始める。
// 楽に満点が取れるところから始めるのが、満点主義の前提。

const make = (i: number) => makeSet(DIAGNOSIS[i].step, 2);

export function Shindan() {
  const [idx, setIdx] = useState(0);
  const [problems, setProblems] = useState<Problem[]>(() => make(0));
  const [inputs, setInputs] = useState<string[][]>(() => problems.map((p) => Array(fieldCount(p.answer)).fill("")));
  const [start, setStart] = useState<number | null>(null);

  function check() {
    const ok = problems.every((p, i) => judge(p.answer, inputs[i]).every((v) => v === "ok"));
    if (!ok) return finish(DIAGNOSIS[idx].start);
    if (idx + 1 >= DIAGNOSIS.length) return finish(50);
    const ps = make(idx + 1);
    setIdx(idx + 1);
    setProblems(ps);
    setInputs(ps.map((p) => Array(fieldCount(p.answer)).fill("")));
  }

  function finish(no: number) {
    setStart(no);
    setCurrent(no);
    trackEvent("math_diagnosis", { start: no });
  }

  if (start !== null) {
    const s = findStep(start)!;
    return (
      <div className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]">
        <p className="m-0 text-[13px] font-bold text-[#3A3D55]">診断の結果</p>
        <p className="m-0 mt-1 text-[22px] font-black">第{s.no}段「{s.title}」から</p>
        <p className="m-0 mt-2 text-[14px] leading-relaxed">少しやさしいところから始めて、速く正確に解ける状態をつくりましょう。楽に合格できたら、どんどん先へ進めます。</p>
        <Link href={`/learn/math/${s.no}`} className="mt-4 flex min-h-[52px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] text-[16px] font-black text-[#15172B] no-underline shadow-[0_3px_0_#15172B]">
          第{s.no}段をはじめる
        </Link>
      </div>
    );
  }

  const step = findStep(DIAGNOSIS[idx].step)!;
  return (
    <div>
      <p className="m-0 text-[13px] font-bold text-[#3A3D55]">
        {idx + 1} / {DIAGNOSIS.length}　{step.title}
      </p>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#EEEDE7]">
        <div className="h-full rounded-full bg-[#1533B8]" style={{ width: `${(idx / DIAGNOSIS.length) * 100}%` }} />
      </div>
      <ol className="m-0 mt-4 flex list-none flex-col gap-3 p-0">
        {problems.map((pr, pi) => (
          <li key={`${idx}-${pi}`} className="rounded-[16px] border-[1.5px] border-[#15172B] bg-white p-4">
            {pr.lead && <MathText src={pr.lead} className="text-[14px] text-[#3A3D55]" />}
            {pr.q && (
              <div>
                <MathText src={pr.q} className="text-[22px] font-bold" />
              </div>
            )}
            {inputs[pi].map((val, fi) => (
              <div key={fi} className="mt-2">
                <label className="flex items-center gap-2">
                  {pr.labels?.[fi] ? <span className="shrink-0 text-[16px] font-bold">{pr.labels[fi]}</span> : null}
                  <input
                    value={val}
                    onChange={(e) => setInputs((xs) => xs.map((row, i) => (i === pi ? row.map((x, j) => (j === fi ? e.target.value : x)) : row)))}
                    autoCapitalize="off"
                    autoCorrect="off"
                    autoComplete="off"
                    spellCheck={false}
                    aria-label={`問題${pi + 1}の答え`}
                    className="min-h-[44px] w-full rounded-lg border-[1.5px] border-[#9A9CB0] px-3 text-[18px]"
                  />
                </label>
                {val && (
                  <div className="mt-1 pl-1 text-[15px] text-[#3A3D55]">
                    <MathText src={normalize(val)} />
                  </div>
                )}
              </div>
            ))}
          </li>
        ))}
      </ol>
      <p className="m-0 mt-3 text-[12px] text-[#3A3D55]">記号は キーボードの - / ( ) と、√ は「√」(ルートと入力して変換)、2乗は ^2 で入れられます。わからない問題は空欄のまま進んでかまいません。</p>
      <button type="button" onClick={check} className="mt-4 flex min-h-[56px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] text-[17px] font-black text-white shadow-[0_4px_0_#0B1F7A]">
        答え合わせして次へ
      </button>
    </div>
  );
}
