"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { examPlayHref } from "@/lib/exam/modes";
import { readExamResults, type ExamAttempt } from "@/lib/exam/results";
import { roundOf, SERIES, type Series } from "@/lib/exam/series";

// 模試の回ごとの一覧 (教科 × 第1回〜)。受けた回は、この端末の記録 (lib/exam/results) から最高点を出す。
// 記録は端末の中だけ。読めない環境では、どの回も「解く」のまま。

export interface BoardSubject {
  key: string;
  name: string;
  minutes: number;
  total: number;
  /** 大問の見出し (一覧の下に小さく) */
  sections: string[];
  ok: boolean;
}

type Best = Record<string, Record<number, { score: number; total: number }>>;

function bestOf(s: Series, all: ExamAttempt[]): Best {
  const out: Best = {};
  for (const a of all) {
    if (a.mode !== s.mode) continue;
    const key = a.spec.split(":")[1];
    const n = roundOf(s, a.seed);
    if (!key || !n) continue;
    const cur = out[key]?.[n];
    if (!cur || a.score > cur.score) (out[key] ??= {})[n] = { score: a.score, total: a.total };
  }
  return out;
}

export function SeriesBoard({ series, subjects, sumLabel }: { series: Series["id"]; subjects: BoardSubject[]; /** 全教科を受けた回に合計を出すとき (「5教科」) */ sumLabel?: string }) {
  const s = SERIES[series];
  const [best, setBest] = useState<Best>({});
  useEffect(() => {
    const t = window.setTimeout(() => setBest(bestOf(s, readExamResults())), 0);
    return () => window.clearTimeout(t);
  }, [s]);
  const rounds = Array.from({ length: s.rounds }, (_, i) => i + 1);
  const open = subjects.filter((x) => x.ok);
  const sums = sumLabel
    ? rounds
        .map((n) => {
          const got = open.map((x) => best[x.key]?.[n]);
          if (open.length === 0 || got.some((g) => !g)) return null;
          return { n, score: got.reduce((a, g) => a + g!.score, 0), total: got.reduce((a, g) => a + g!.total, 0) };
        })
        .filter((x): x is { n: number; score: number; total: number } => !!x)
    : [];

  return (
    <div className="mt-5 grid gap-4">
      {sums.length > 0 && (
        <section aria-label={`${sumLabel}の合計`} className="rounded-[16px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-4">
          <h2 className="m-0 text-[15px] font-black">{sumLabel}の合計（この端末の記録・各回の最高点）</h2>
          <ul className="m-0 mt-2 flex list-none flex-wrap gap-2 p-0">
            {sums.map((x) => (
              <li key={x.n} className="rounded-[10px] bg-white px-3 py-1.5 text-[14px] font-black tabular-nums">
                第{x.n}回　{x.score}／{x.total}点
              </li>
            ))}
          </ul>
        </section>
      )}
      <ul className="m-0 grid list-none gap-4 p-0 lg:grid-cols-2">
        {subjects.map((x) => (
          <li key={x.key} className="min-w-0 rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-4 shadow-[4px_4px_0_#15172B] sm:p-5">
            <h3 className="m-0 flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5 text-[19px] font-black">
              {x.name}
              <span className="text-[12.5px] font-black text-[#3A3D55]">
                {x.minutes}分・{x.total}点・大問{x.sections.length}
              </span>
            </h3>
            <p className="m-0 mt-1.5 text-[12px] leading-relaxed text-[#5A5D73]">{x.sections.map((t) => t.replace(/^第\d問\s*/, "").replace(/^\s+/, "")).join("／")}</p>
            {x.ok ? (
              <>
                <ol className="m-0 mt-3 grid list-none grid-cols-3 gap-2 p-0 sm:grid-cols-6">
                  {rounds.map((n) => {
                    const b = best[x.key]?.[n];
                    return (
                      <li key={n}>
                        <Link
                          href={examPlayHref(s.mode, { subject: x.key }, s.seedOf(n))}
                          className={`flex min-h-[56px] flex-col items-center justify-center rounded-[12px] border-[1.5px] border-[#15172B] px-1 text-center no-underline ${b ? "bg-[#E8F5EC] text-[#15172B]" : "bg-[#F7F6F1] text-[#15172B]"}`}
                        >
                          <span className="text-[13px] font-black">第{n}回</span>
                          <span className={`text-[11.5px] font-bold tabular-nums ${b ? "text-[#1B7A3A]" : "text-[#5A5D73]"}`}>{b ? `${b.score}/${b.total}` : "解く"}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
                <Link href={examPlayHref(s.mode, { subject: x.key })} className="mt-3 inline-flex min-h-[44px] items-center text-[13.5px] font-black text-[#1533B8]">
                  おまかせで解く（毎回ちがう問題）→
                </Link>
              </>
            ) : (
              <p role="status" className="m-0 mt-3 rounded-[12px] bg-[#FFF4E5] p-3 text-[13px] font-bold text-[#B54708]">
                この教科はまだ問題を準備しています。
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
