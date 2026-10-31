"use client";

import Link from "next/link";
import { useWords, setPerDay, LEARNED_BOX, MASTER_BOX, today } from "@/lib/eitango/progress";
import { STAGES, OPEN_WORDS, TOTAL_WORDS } from "@/lib/eitango/stages";
import { dueCount } from "@/lib/eitango/session";

// 英単語2000 のトップ (ブラウザ側)。今日の修行・1日の新しい単語の数・20ステージの進み具合。

const clock = () => today();

export function EitangoHome() {
  const p = useWords();
  const due = dueCount(p);
  const newLeft = Math.max(0, p.perDay - (p.day === clock() ? p.newToday : 0));
  const unseen = OPEN_WORDS.filter((w) => !p.w[w.no]).length;
  const newToday = Math.min(newLeft, unseen);
  const learned = Object.values(p.w).filter((s) => s.b >= LEARNED_BOX).length;
  const mastered = Object.values(p.w).filter((s) => s.b >= MASTER_BOX).length;

  return (
    <div>
      <section className="rounded-[20px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-5 shadow-[5px_5px_0_#15172B]">
        <p className="m-0 text-[12px] font-black tracking-wider text-[#1533B8]">TODAY　今日の修行</p>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <p className="m-0 text-[15px] font-bold">
            復習 <span className="text-[28px] font-black">{due}</span> 語
          </p>
          <p className="m-0 text-[15px] font-bold">
            新しい単語 <span className="text-[28px] font-black">{newToday}</span> 語
          </p>
        </div>
        <Link href={due + newToday > 0 ? "/learn/eitango/play" : "/learn/eitango/play?extra=1"} className="mt-4 flex min-h-[56px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] text-[17px] font-black text-white no-underline shadow-[0_4px_0_#0B1F7A]">
          {due + newToday > 0 ? "今日の修行をはじめる" : "あと10語、新しい単語を覚える"}
        </Link>
        {due + newToday === 0 && <p className="m-0 mt-2 text-[12.5px] text-[#3A3D55]">今日の分は済んでいます。続けたい人はあと10語どうぞ。</p>}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[13px] font-bold text-[#3A3D55]">1日の新しい単語</span>
          {[10, 20, 30].map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={p.perDay === n}
              onClick={() => setPerDay(n)}
              className={`min-h-[36px] rounded-full border-[1.5px] border-[#15172B] px-3 text-[13px] font-black ${p.perDay === n ? "bg-[#15172B] text-white" : "bg-white text-[#15172B]"}`}
            >
              {n}語
            </button>
          ))}
        </div>
        <p className="m-0 mt-3 text-[12.5px] text-[#3A3D55]">
          覚えた {learned}語・マスター {mastered}語 / 公開中 {OPEN_WORDS.length}語（全{TOTAL_WORDS}語）
        </p>
      </section>

      <section aria-labelledby="stages-h" className="mt-8">
        <h2 id="stages-h" className="m-0 text-[20px] font-black">
          20ステージ
        </h2>
        <p className="m-0 mt-1 text-[13px] text-[#3A3D55]">1ステージ100語。基礎（1〜6）・標準（7〜14）・発展（15〜20）。点線は準備中です。</p>
        <ul className="m-0 mt-3 grid list-none grid-cols-2 gap-2.5 p-0 sm:grid-cols-4 lg:grid-cols-5">
          {STAGES.map((s) => {
            const seen = s.open ? Array.from({ length: 100 }, (_, i) => p.w[s.from + i]).filter(Boolean) : [];
            const got = seen.filter((x) => x.b >= LEARNED_BOX).length;
            return (
              <li key={s.no}>
                {s.open ? (
                  <Link href={`/learn/eitango/${s.no}`} className="block rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3 text-[#15172B] no-underline shadow-[3px_3px_0_#15172B]">
                    <span className="block text-[11px] font-black text-[#1533B8]">{s.level}</span>
                    <span className="block text-[17px] font-black">STAGE {s.no}</span>
                    <span className="block text-[11.5px] text-[#3A3D55]">
                      No.{s.from}〜{s.to}
                    </span>
                    <span className="mt-2 block h-2 overflow-hidden rounded-full bg-[#E6E4DA]">
                      <span className="block h-full bg-[#1533B8]" style={{ width: `${got}%` }} />
                    </span>
                    <span className="mt-1 block text-[11.5px] font-bold text-[#3A3D55]">
                      覚えた {got} / 100・見た {seen.length}
                    </span>
                  </Link>
                ) : (
                  <div className="rounded-[14px] border-[1.5px] border-dashed border-[#9A9CB0] p-3 text-[#5A5D73]">
                    <span className="block text-[11px] font-black">{s.level}</span>
                    <span className="block text-[17px] font-black">STAGE {s.no}</span>
                    <span className="block text-[11.5px]">
                      No.{s.from}〜{s.to}・準備中
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
