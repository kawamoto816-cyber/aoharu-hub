"use client";

import Link from "next/link";
import { STEPS, UNITS } from "@/lib/math/steps";
import { PASSES_TO_CLEAR, useMathProgress } from "@/lib/math/progress";
import { MathText } from "./MathText";

// 50段の一覧。合格した段は青、いま進めている段は黄色。どの段からでも始められる。
export function MathHome() {
  const progress = useMathProgress();
  const cleared = STEPS.filter((s) => progress.steps[s.no]?.cleared).length;
  const current = progress.current ?? STEPS.find((s) => !progress.steps[s.no]?.cleared)?.no ?? 1;
  const cur = STEPS.find((s) => s.no === current)!;
  const started = Object.keys(progress.steps).length > 0 || progress.current !== undefined;

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]">
        <p className="m-0 text-[13px] font-bold text-[#3A3D55]">クリアした段 {cleared} / 50</p>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#EEEDE7]">
          <div className="h-full rounded-full bg-[#1533B8]" style={{ width: `${(cleared / 50) * 100}%` }} />
        </div>
        <p className="m-0 mt-4 text-[13px] font-bold text-[#3A3D55]">{started ? "続きから" : "はじめての人は"}</p>
        <p className="m-0 mt-0.5 text-[18px] font-black">
          第{cur.no}段　{cur.title}
        </p>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          <Link href={`/learn/math/${cur.no}`} className="flex min-h-[52px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] text-[15px] font-black text-[#15172B] no-underline shadow-[0_3px_0_#15172B]">
            第{cur.no}段をはじめる
          </Link>
          <Link href="/learn/math/shindan" className="flex min-h-[52px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-white text-[15px] font-black text-[#15172B] no-underline">
            学力診断で始める段を決める（約10分）
          </Link>
        </div>
      </section>

      {UNITS.map((u) => (
        <section key={u.key} aria-labelledby={`u-${u.key}`}>
          <h2 id={`u-${u.key}`} className="m-0 flex items-center gap-2 text-lg font-black">
            <span className="rounded-full border-[1.5px] border-[#15172B] bg-white px-2 py-0.5 text-[11px]">{u.grade}</span>
            {u.title}
            <span className="text-[12px] font-bold text-[#3A3D55]">
              第{u.from}{u.to !== u.from ? `〜${u.to}` : ""}段
            </span>
          </h2>
          <ul className="m-0 mt-3 grid list-none gap-2.5 p-0 sm:grid-cols-2">
            {STEPS.filter((s) => s.no >= u.from && s.no <= u.to).map((s) => {
              const r = progress.steps[s.no];
              const isCur = s.no === current;
              const box = r?.cleared ? "border-[#15172B] bg-[#1533B8] text-white shadow-[3px_3px_0_#15172B]" : isCur ? "border-[#15172B] bg-[#FFF6C4] shadow-[3px_3px_0_#15172B]" : "border-[#9A9CB0] bg-white";
              return (
                <li key={s.no}>
                  <Link href={`/learn/math/${s.no}`} className={`flex min-h-[72px] flex-col justify-center gap-1 rounded-[14px] border-[1.5px] px-3.5 py-2.5 no-underline ${box} ${r?.cleared ? "" : "text-[#15172B]"}`}>
                    <span className="flex items-center justify-between text-[11px] font-black">
                      <span>第{s.no}段</span>
                      <span>{r?.cleared ? "クリア" : isCur ? "いまここ" : r ? `合格 ${r.passes}/${PASSES_TO_CLEAR}` : ""}</span>
                    </span>
                    <span className="text-[14px] font-black leading-snug">{s.title}</span>
                    <span className={`text-[13px] ${r?.cleared ? "text-white/85" : "text-[#3A3D55]"}`}>
                      <MathText src={s.example} />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
