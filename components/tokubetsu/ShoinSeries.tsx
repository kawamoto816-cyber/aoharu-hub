"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useReadLog } from "@/lib/lecture/readLog";

// 特別授業「吉田松陰と松下村塾」の、塾生の「通い帳」(6講の進み具合) と、卒業課題「わたしの士規七則」。
// 進み具合は図解授業を読み終えた記録 (lib/lecture/readLog) から。卒業課題はこの端末の中だけに保存する (送らない)。

export interface ShoinLesson {
  unit: string;
  no: number;
  name: string;
  title: string;
  lectureHref: string;
  jugyoHref: string | null;
}

const KEY = "aoharu.tokubetsu.shoin.kokorozashi.v1";
interface Draft {
  shi: string;
  rules: string[];
}
const EMPTY: Draft = { shi: "", rules: ["", "", ""] };

export function ShoinRoadmap({ lessons }: { lessons: ShoinLesson[] }) {
  const log = useReadLog();
  const done = lessons.filter((l) => log.read[l.unit]).length;
  const next = lessons.find((l) => !log.read[l.unit]) ?? lessons[0];
  return (
    <section aria-labelledby="kayoi" className="mt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="kayoi" className="m-0 text-[19px] font-black">
          通い帳（6講）
        </h2>
        <span className="text-[12.5px] font-bold text-[#3A3D55]">
          読み終えた講 {done}／{lessons.length}
        </span>
      </div>
      {done < lessons.length && (
        <Link href={next.lectureHref} className="mt-3 flex min-h-[52px] items-center justify-between gap-2 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-4 text-[15px] font-black text-[#15172B] no-underline shadow-[0_3px_0_#15172B]">
          {done === 0 ? "入塾する：第1講から読む" : `つづき：第${next.no}講を読む`}
          <span aria-hidden="true">→</span>
        </Link>
      )}
      <ol className="m-0 mt-3 grid list-none gap-px overflow-hidden rounded-[14px] border-[1.5px] border-[#15172B] bg-[#15172B]/15 p-0">
        {lessons.map((l) => {
          const read = !!log.read[l.unit];
          return (
            <li key={l.unit} className="bg-white px-4 py-3">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full text-[13px] font-black ${read ? "bg-[#1B7A3A] text-white" : "border-[1.5px] border-[#15172B] text-[#15172B]"}`}
                >
                  {read ? "✓" : l.no}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="m-0 text-[15.5px] font-black leading-snug">{l.name}</p>
                  <p className="m-0 mt-0.5 text-[12.5px] leading-relaxed text-[#3A3D55]">{l.title}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Link href={l.lectureHref} className="inline-flex min-h-[40px] items-center rounded-full border-[1.5px] border-[#15172B] bg-white px-3.5 text-[13px] font-black text-[#15172B] no-underline">
                      図解授業を読む
                    </Link>
                    {l.jugyoHref && (
                      <Link href={l.jugyoHref} className="inline-flex min-h-[40px] items-center rounded-full border-[1.5px] border-[#1533B8] bg-[#E6EAFB] px-3.5 text-[13px] font-black text-[#1533B8] no-underline">
                        ▶ 止まる授業で受ける
                      </Link>
                    )}
                  </div>
                </div>
                {read && <span className="sr-only">読み終えた</span>}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function load(): Draft {
  try {
    const v = JSON.parse(window.localStorage.getItem(KEY) ?? "null") as Draft | null;
    if (v && typeof v.shi === "string" && Array.isArray(v.rules)) return { shi: v.shi, rules: [0, 1, 2].map((i) => String(v.rules[i] ?? "")) };
  } catch {
    // 読めないときは空から
  }
  return EMPTY;
}

export function ShoinGraduation() {
  const [d, setD] = useState<Draft>(EMPTY);
  const [saved, setSaved] = useState<"" | "ok" | "ng">("");
  useEffect(() => {
    const t = window.setTimeout(() => setD(load()), 0);
    return () => window.clearTimeout(t);
  }, []);
  const save = (v: Draft) => {
    setD(v);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(v));
      setSaved("ok");
    } catch {
      setSaved("ng");
    }
  };
  const labels = ["だれと交わるか（選交）", "何を読み、学ぶか（読書）", "毎日の、どんな行いで支えるか"];
  return (
    <section aria-labelledby="sotsugyo" className="mt-8 rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-4 shadow-[4px_4px_0_#15172B] sm:p-5">
      <p className="m-0 text-[12px] font-black tracking-wider text-[#B42318]">卒業課題</p>
      <h2 id="sotsugyo" className="m-0 mt-1 text-[19px] font-black">
        わたしの「士規七則」を書く
      </h2>
      <p className="m-0 mt-1.5 text-[13.5px] leading-relaxed text-[#3A3D55]">
        松陰は『士規七則』を「志を立てる・交わる人を選ぶ・書を読む」の三つで結びました。第6講まで読んだら、あなたの言葉で書いてみましょう。書いたものは、この端末の中だけに残ります（どこにも送りません）。
      </p>
      <label className="mt-4 block text-[13.5px] font-black">
        わたしの志（ひとこと）
        <textarea
          value={d.shi}
          onChange={(e) => save({ ...d, shi: e.target.value.slice(0, 200) })}
          rows={2}
          placeholder="例：地元の医療を、だれでも受けられるものにする"
          className="mt-1 block w-full rounded-[12px] border-[1.5px] border-[#15172B]/40 px-3 py-2 text-[15px] font-normal leading-relaxed"
        />
      </label>
      {labels.map((lb, i) => (
        <label key={lb} className="mt-3 block text-[13.5px] font-black">
          {lb}
          <input
            value={d.rules[i]}
            onChange={(e) => save({ ...d, rules: d.rules.map((r, k) => (k === i ? e.target.value.slice(0, 120) : r)) })}
            className="mt-1 block min-h-[44px] w-full rounded-[12px] border-[1.5px] border-[#15172B]/40 px-3 text-[15px] font-normal"
          />
        </label>
      ))}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => window.print()} className="min-h-[44px] rounded-[12px] border-[1.5px] border-[#15172B] bg-[#15172B] px-4 text-[14px] font-black text-white">
          印刷して手もとに置く
        </button>
        <span role="status" className="text-[12px] font-bold text-[#5A5D73]">
          {saved === "ok" ? "この端末に保存しました" : saved === "ng" ? "この端末では保存できません（印刷してください）" : ""}
        </span>
      </div>
    </section>
  );
}
