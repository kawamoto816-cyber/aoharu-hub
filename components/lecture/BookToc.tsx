"use client";

import Link from "next/link";
import { useReadLog } from "@/lib/lecture/readLog";
import type { BookChapter } from "@/lib/lecture/book";

// 教科の入口の「教科書（図解）」の目次。図解レクチャーを第1章から順に読み進める。
// 読んだ単元に印をつけ、「続きから読む」で次に読む単元へ。記録はこの端末だけ。

export function BookToc({ chapters, label, kids = false }: { chapters: BookChapter[]; label: string; kids?: boolean }) {
  const log = useReadLog();
  const all = chapters.flatMap((c) => c.units);
  const done = all.filter((u) => log.read[u.id]).length;
  // 続き：最後に開いた単元が読み終わっていなければそれ、読み終わっていればその次の未読、記録がなければ最初の未読
  const lastIdx = log.last ? all.findIndex((u) => u.id === log.last) : -1;
  const firstUnread = (from: number) => all.slice(from).find((u) => !log.read[u.id]) ?? all.find((u) => !log.read[u.id]);
  const resume = lastIdx >= 0 && !log.read[all[lastIdx].id] ? all[lastIdx] : firstUnread(Math.max(0, lastIdx + 1));
  const started = done > 0 || lastIdx >= 0;
  const openChapter = resume ? chapters.findIndex((c) => c.units.some((u) => u.id === resume.id)) : 0;
  const T = kids
    ? { start: "はじめから よむ", cont: "つづきから よむ", all: "ぜんぶ よんだ！", read: "よんだ" }
    : { start: "はじめから読む", cont: "続きから読む", all: "全部読みました", read: "読んだ" };

  return (
    <div className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-3">
        <p className="m-0 flex-1 text-[13px] font-bold text-[#3A3D55]">
          {label}　{all.length}単元
          <span className="ml-2 text-[#1533B8]">
            {T.read} {done} / {all.length}
          </span>
        </p>
      </div>
      <div aria-hidden="true" className="mt-2 h-2 overflow-hidden rounded-full bg-[#ECEAE0]">
        <div className="h-full rounded-full bg-[#1533B8]" style={{ width: `${all.length ? (done / all.length) * 100 : 0}%` }} />
      </div>
      {resume ? (
        <Link
          href={`/learn/lecture/${resume.id}`}
          className="mt-3 flex min-h-[56px] max-w-[520px] items-center justify-between gap-3 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] px-4 py-2 text-white no-underline shadow-[0_4px_0_#0B1F7A]"
        >
          <span className="min-w-0">
            <span className="block text-[12px] font-bold text-[#FFE45C]">{started ? T.cont : T.start}</span>
            <span className="block truncate text-[16px] font-black">{resume.name}</span>
          </span>
          <span aria-hidden="true" className="text-[18px] font-black">
            →
          </span>
        </Link>
      ) : (
        <p className="m-0 mt-3 text-[15px] font-black text-[#1533B8]">{T.all}</p>
      )}
      <div className="mt-4 grid gap-2">
        {chapters.map((c, ci) => {
          const n = c.units.filter((u) => log.read[u.id]).length;
          return (
            <details key={c.title} open={ci === openChapter} className="rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFFBE6]">
              <summary className="flex min-h-[48px] cursor-pointer items-center gap-2 px-3 text-[15px] font-black">
                <span className="flex-1">
                  第{ci + 1}章　{c.title}
                </span>
                <span className="text-[12px] font-bold text-[#3A3D55]">
                  {n} / {c.units.length}
                </span>
              </summary>
              <ol className="m-0 grid list-none gap-1 px-2 pb-2">
                {c.units.map((u, i) => {
                  const isRead = !!log.read[u.id];
                  const isNext = resume?.id === u.id;
                  return (
                    <li key={u.id}>
                      <Link
                        href={`/learn/lecture/${u.id}`}
                        className={`flex min-h-[44px] items-center gap-2 rounded-[10px] px-2.5 py-1.5 text-[14px] font-bold no-underline ${isNext ? "bg-white text-[#1533B8] outline outline-[1.5px] outline-[#1533B8]" : "text-[#15172B] hover:bg-white"}`}
                      >
                        <span className="w-7 flex-none text-right text-[12px] text-[#5A5D73]">{i + 1}.</span>
                        <span className="min-w-0 flex-1">{u.name}</span>
                        {isRead ? (
                          <span className="flex-none rounded-full bg-[#1533B8] px-2 py-0.5 text-[11px] font-black text-white">✓ {T.read}</span>
                        ) : isNext ? (
                          <span className="flex-none text-[11px] font-black text-[#1533B8]">次はここ</span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </details>
          );
        })}
      </div>
    </div>
  );
}
