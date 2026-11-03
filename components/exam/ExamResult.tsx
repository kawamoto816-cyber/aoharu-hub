"use client";

import Link from "next/link";
import { card } from "@/components/drill/DrillPlay";
import { canSeeTimeAnalysis, PRICING_HREF } from "@/lib/exam/access";
import { useExamPlan } from "./plan-context";

// 試験モードの結果に足す部分: 時間配分 (大問ごとに画面に出していた時間と、配点から見た目安)・弱い単元 (レクチャーと単元模試へ)・これまでの記録。
// MoshiPlay の結果画面から使う (examMode のときだけ)。
// 時間配分の分析 (大問ごとの棒) は Pro・Max だけ。登録なし・無料登録には、ぼかした見本と1行の説明を出す (プランは ExamGate の ExamPlanContext。分からないときは全部見せる)。

export interface ExamResultData {
  parts: { title: string; score: number; total: number; sec: number }[];
  usedSec: number;
  minutes: number;
  total: number;
  timeout: boolean;
  weak: { unit: string; name: string; score: number; total: number; pct: number; lecture?: string; moshi?: string }[];
  /** この仕様を解いた回数 (今回をふくむ)・これまでの最高の得点率。保存できなければ null */
  count: number | null;
  prevBest: number | null;
}

const ms = (sec: number) => `${Math.floor(sec / 60)}分${String(Math.round(sec % 60)).padStart(2, "0")}秒`;

export function ExamResultPanel({ data }: { data: ExamResultData }) {
  const limit = data.minutes * 60;
  const seen = data.parts.reduce((a, p) => a + p.sec, 0) || 1;
  const pct = data.total ? Math.round((data.parts.reduce((a, p) => a + p.score, 0) / data.total) * 100) : 0;
  const plan = useExamPlan();
  const locked = plan !== null && !canSeeTimeAnalysis(plan);
  return (
    <div className="mt-4 grid gap-4">
      <section aria-labelledby="ex-time" className={`${card} min-w-0`}>
        <h3 id="ex-time" className="m-0 text-[15px] font-black">
          時間配分
        </h3>
        <p className="m-0 mt-1 text-[13px] font-bold text-[#3A3D55]">
          {data.timeout ? "時間切れで自動提出しました。" : `制限時間 ${data.minutes}分のうち ${ms(data.usedSec)} で提出しました。`}
          {data.count !== null && (
            <span className="ml-1">
              この型は{data.count}回目
              {data.prevBest !== null && `（これまでの最高 ${data.prevBest}%${pct > data.prevBest ? "・自己ベスト更新" : ""}）`}。
            </span>
          )}
        </p>
        <div className={locked ? "relative min-h-[150px]" : "relative"}>
          <div aria-hidden={locked || undefined} inert={locked || undefined} className={locked ? "pointer-events-none select-none blur-[5px]" : undefined}>
            <ul className="m-0 mt-3 grid list-none gap-3 p-0">
              {data.parts.map((p, i) => {
                const spent = Math.round((data.usedSec * p.sec) / seen);
                const target = Math.round((limit * p.total) / (data.total || 1));
                const wide = Math.max(spent, target, 1);
                return (
                  <li key={i} className="grid gap-1">
                    <span className="flex items-baseline justify-between gap-2 text-[13.5px] font-bold">
                      <span className="min-w-0 [overflow-wrap:anywhere]">
                        {i + 1}　{p.title}
                      </span>
                      <span className="shrink-0 font-black tabular-nums">
                        {ms(spent)}
                        <span className="ml-1 text-[11.5px] font-bold text-[#5A5D73]">目安 {ms(target)}</span>
                      </span>
                    </span>
                    <span aria-hidden="true" className="relative block h-2.5 overflow-hidden rounded-full border border-[#15172B] bg-white">
                      <span className={`block h-full ${spent > target * 1.3 ? "bg-[#D9341F]" : "bg-[#1533B8]"}`} style={{ width: `${Math.min(100, (spent / wide) * 100)}%` }} />
                      <span className="absolute inset-y-0 w-[2px] bg-[#15172B]" style={{ left: `${Math.min(99, (target / wide) * 100)}%` }} />
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="m-0 mt-2 text-[11.5px] leading-relaxed text-[#5A5D73]">時間は、その大問が画面のまんなかにあった時間から見積もった目安です。目安の時間は配点に比例させたもの（黒い線）。</p>
          </div>
          {locked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-3 text-center">
              <p className="m-0 rounded-[10px] bg-white/90 px-3 py-2 text-[13px] font-bold leading-relaxed text-[#15172B]">
                Pro・Max では、大問ごとに使った時間と配点から見た目安を比べる「時間配分の分析」が見られます。
              </p>
              <Link href={PRICING_HREF} className="inline-flex min-h-[44px] items-center rounded-[10px] border-[1.5px] border-[#15172B] bg-[#1533B8] px-3 text-[13px] font-black text-white no-underline">
                プランを見る →
              </Link>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="ex-weak" className={`${card} min-w-0`}>
        <h3 id="ex-weak" className="m-0 text-[15px] font-black">
          弱い単元
        </h3>
        {data.weak.length === 0 ? (
          <p className="m-0 mt-1 text-[13.5px] font-bold text-[#3A3D55]">どの単元も得点率 60% 以上でした。</p>
        ) : (
          <>
            <p className="m-0 mt-1 text-[13px] font-bold text-[#3A3D55]">得点率が 60% に届かなかった単元です。レクチャーで確かめてから、単元模試で解きなおしましょう。</p>
            <ul className="m-0 mt-3 grid list-none gap-2.5 p-0">
              {data.weak.slice(0, 8).map((u) => (
                <li key={u.unit} className="rounded-[12px] bg-[#F7F6F1] p-3">
                  <p className="m-0 flex items-baseline justify-between gap-2 text-[14px] font-black">
                    <span className="min-w-0 [overflow-wrap:anywhere]">{u.name}</span>
                    <span className="shrink-0 tabular-nums text-[#D9341F]">
                      {u.score}/{u.total}
                    </span>
                  </p>
                  {(u.lecture || u.moshi) && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {u.lecture && (
                        <Link href={u.lecture} className="inline-flex min-h-[44px] items-center rounded-[10px] border-[1.5px] border-[#15172B] bg-[#1533B8] px-3 text-[13px] font-black text-white no-underline">
                          図解レクチャー →
                        </Link>
                      )}
                      {u.moshi && (
                        <Link href={u.moshi} className="inline-flex min-h-[44px] items-center rounded-[10px] border-[1.5px] border-[#15172B] bg-white px-3 text-[13px] font-black text-[#15172B] no-underline">
                          単元模試 →
                        </Link>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}
