"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Item } from "@/lib/moshi/types";
import { gradeAnswer, type ItemResult, type Response } from "@/lib/moshi/grade";
import { emptyResponse, isBlank, ItemInput, Solution } from "@/components/moshi/MoshiPlay";
import { moshiWords } from "@/components/moshi/words";
import { LectureFigure } from "@/components/lecture/Figure";
import { Rich } from "@/components/lecture/Rich";
import { bigBtn, card } from "@/components/drill/DrillPlay";
import { isFigureRef } from "@/lib/moshi/types";
import { mistakeOfChoice, recordMastery } from "@/lib/sakanobori/mastery";
import { passed } from "@/lib/sakanobori/diagnose";

// さかのぼりのチェック問題（3問）。その場で採点し、習熟度に記録してから、結果を URL に足して次の一手へ進む。
// 問題はサーバー側で選んだもの (lib/sakanobori/check.ts)。採点は単元模試と同じ lib/moshi/grade。

export function CheckRound({ unit, name, label, items, nextBase, kids }: { unit: string; name: string; label: string; items: Item[]; /** 結果 (`<単元>.<正解>.<問題数>`) を末尾に足して開く URL */ nextBase: string; kids: boolean }) {
  const w = moshiWords(kids);
  const router = useRouter();
  const [resp, setResp] = useState<Response[]>(() => items.map(emptyResponse));
  const [done, setDone] = useState<ItemResult[] | null>(null);
  const [going, setGoing] = useState(false);
  const top = useRef<HTMLDivElement>(null);
  const answered = resp.filter((r) => !isBlank(r)).length;

  useEffect(() => {
    if (done) top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [done]);

  const grade = () => {
    const res = items.map((it, i) => gradeAnswer(it.answer, it.points, resp[i]));
    recordMastery(
      items.map((it, i) => ({
        unit: it.unit ?? unit,
        ok: res[i].score >= it.points,
        mistake: it.answer.kind === "choice" && resp[i].kind === "choice" ? mistakeOfChoice(it.answer, (resp[i] as { picked: number[] }).picked) : null,
      })),
    );
    setDone(res);
  };

  const correct = done ? done.filter((r, i) => r.score >= items[i].points).length : 0;
  const ok = done ? passed({ correct, total: items.length }) : false;
  const next = useMemo(() => `${nextBase}${unit}.${correct}.${items.length}`, [nextBase, unit, correct, items.length]);

  let figNo = 0;
  return (
    <div ref={top} className="scroll-mt-3">
      <section aria-labelledby="ck-h" className={card}>
        <p className="m-0 text-[12px] font-black text-[#1533B8]">{label}</p>
        <h2 id="ck-h" className="m-0 mt-0.5 text-[19px] font-black leading-snug">
          「{name}」は だいじょうぶ？
        </h2>
        <p className="m-0 mt-1 text-[13.5px] font-bold leading-relaxed text-[#3A3D55]">
          {done ? `${items.length}問中 ${correct}問 正解。` : `${items.length}問だけ解いてみよう。${Math.ceil((items.length * 2) / 3)}問できたら、この単元はだいじょうぶ。`}
        </p>
        {done && (
          <p role="status" className={`m-0 mt-2 rounded-[12px] px-3 py-2 text-[15px] font-black leading-snug ${ok ? "bg-[#E3E8FF] text-[#1533B8]" : "bg-[#FFE6E1] text-[#D9341F]"}`}>
            {ok ? "よし、ここはできている！ ほかのところを見てみよう。" : "ここが少しあやしいね。もっと前の単元もたしかめてみよう。"}
          </p>
        )}
      </section>

      <ol className="m-0 mt-4 grid list-none gap-4 p-0">
        {items.map((it, i) => {
          const fig = it.figure && !isFigureRef(it.figure) ? it.figure : undefined;
          const no = fig ? ++figNo : 0;
          const res = done?.[i];
          return (
            <li key={`${it.id}-${i}`} className={`${card} min-w-0 p-4`}>
              <p className="m-0 flex items-center gap-2 text-[14px] font-black">
                <span aria-hidden="true" className={`flex h-8 w-8 flex-none items-center justify-center rounded-full text-[15px] font-black ${res ? (res.score >= it.points ? "bg-[#1533B8] text-white" : "bg-[#D9341F] text-white") : "bg-[#15172B] text-white"}`}>
                  {res ? (res.score >= it.points ? "○" : "✕") : i + 1}
                </span>
                <span>
                  {i + 1}問め
                  {res && <span className="sr-only">：{w.verdict[res.verdict]}</span>}
                </span>
              </p>
              <p className="m-0 mt-2 whitespace-pre-line text-[15.5px] leading-relaxed [overflow-wrap:anywhere]">
                <Rich text={it.prompt} />
              </p>
              {fig && <LectureFigure fig={fig} no={no} />}
              {res ? (
                <Solution it={it} r={resp[i]} res={res} w={w} figBase={100 + i * 10} />
              ) : (
                <ItemInput it={it} r={resp[i]} onChange={(r) => setResp((xs) => xs.map((x, k) => (k === i ? r : x)))} pool={[]} w={w} label={`${i + 1}問めの答え`} />
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-5 grid gap-2.5">
        {!done ? (
          <button type="button" onClick={grade} disabled={answered === 0} className={`${bigBtn} bg-[#1533B8] text-white shadow-[0_4px_0_#0B1F7A] disabled:opacity-50`}>
            {answered < items.length ? `答え合わせ（${answered}/${items.length}問 答えた）` : "答え合わせ"}
          </button>
        ) : (
          <button
            type="button"
            disabled={going}
            onClick={() => {
              setGoing(true);
              router.push(next);
            }}
            className={`${bigBtn} bg-[#FFE45C] text-[#15172B] shadow-[0_3px_0_#15172B] disabled:opacity-60`}
          >
            {going ? "しらべています…" : "つぎへ →"}
          </button>
        )}
        <Link href="/learn/sakanobori" className={`${bigBtn} bg-white text-[#15172B] no-underline`}>
          やめて、はじめにもどる
        </Link>
      </div>
    </div>
  );
}
