"use client";

import type { PlanCheck } from "@/lib/station/types";

// 授業案・声の授業の点検結果と、「掲示板に出して授業する」ボタン（教壇で共通）
export const GRADE_MARK = { A: "◎", B: "○", C: "△" } as const;

export function CheckResult({ res, missing, posted, onPublish }: { res: PlanCheck; missing: string[]; posted: boolean; onPublish: () => void }) {
  const blocked = missing.length > 0 || res.score < 60 || res.wrongFound.length > 0 || posted;
  return (
    <div className="mt-3 rounded-[12px] border-[1.5px] border-[#1533B8] bg-[#F4F6FE] p-3">
      <p className="m-0 text-[15px] font-black">
        AI点検：{res.score}点 <span className="text-[12px] font-bold text-[#5A5D73]">（試作：いまは決まった基準で点検しています）</span>
      </p>
      {res.voice && (
        <p className="m-0 mt-0.5 text-[12.5px] text-[#3A3D55]">
          話した時間 {Math.floor(res.voice.seconds / 60)}分{res.voice.seconds % 60}秒・{res.voice.chars}字・1分に約{res.voice.perMinute}字・問いかけ {res.voice.asks}回
        </p>
      )}
      <ul className="m-0 mt-1 grid list-none gap-1 p-0 text-[13px]">
        {res.items.map((it) => (
          <li key={it.key}>
            <b className="inline-block w-[1.4em]">{GRADE_MARK[it.grade]}</b>
            <b>{it.label}</b>：{it.note}
          </li>
        ))}
      </ul>
      {res.wrongFound.map((w) => (
        <p key={w.wrong} className="m-0 mt-1 rounded-[8px] bg-[#FDECEC] px-2 py-1 text-[12.5px]">
          ✕ 「{w.wrong}」に近い説明があります。正しくは「{w.right}」
        </p>
      ))}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button type="button" disabled={blocked} onClick={onPublish} className="rounded-[10px] border-[1.5px] border-[#15172B] bg-[#1533B8] px-4 py-2 text-[14px] font-black text-white disabled:opacity-40">
          {posted ? "掲示板に出しました" : "掲示板に出して授業する（＋20コイン）"}
        </button>
        <span className="text-[12px] text-[#5A5D73]">
          {missing.length > 0
            ? "教壇に立つ条件がそろうと出せます"
            : res.wrongFound.length > 0
              ? "まちがいを直して、もう一度点検すると出せます"
              : res.score < 60
                ? "60点以上で出せます。直してもう一度点検しましょう"
                : "授業のあと、受講者の正答率と評価で星が決まります"}
        </span>
      </div>
    </div>
  );
}
