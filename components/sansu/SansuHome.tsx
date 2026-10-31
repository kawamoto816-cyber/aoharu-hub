"use client";

import Link from "next/link";
import { GRADES, STEPS, STEP_COUNT } from "@/lib/sansu/steps";
import { PASSES_TO_CLEAR, useSansuProgress } from "@/lib/sansu/progress";
import { SansuText } from "./SansuText";

// 段の一覧 (学年ごと)。合格した段は青、いま進めている段は黄色。どの段からでも始められる。
export function SansuHome() {
  const progress = useSansuProgress();
  const cleared = STEPS.filter((s) => progress.steps[s.no]?.cleared).length;
  const current = progress.current ?? STEPS.find((s) => !progress.steps[s.no]?.cleared)?.no ?? 1;
  const cur = STEPS.find((s) => s.no === current) ?? STEPS[0];
  const started = Object.keys(progress.steps).length > 0 || progress.current !== undefined;

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]">
        <p className="m-0 text-[14px] font-bold text-[#3A3D55]">
          クリアした段 {cleared} / {STEP_COUNT}
        </p>
        <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-[#EEEDE7]">
          <div className="h-full rounded-full bg-[#1533B8]" style={{ width: `${(cleared / STEP_COUNT) * 100}%` }} />
        </div>
        <p className="m-0 mt-4 text-[14px] font-bold text-[#3A3D55]">{started ? "つづきから" : "はじめての人は"}</p>
        <p className="m-0 mt-0.5 text-[20px] font-black">
          第{cur.no}段　{cur.title}
        </p>
        <Link href={`/learn/sansu/${cur.no}`} className="mt-3 flex min-h-[56px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] text-[17px] font-black text-[#15172B] no-underline shadow-[0_3px_0_#15172B]">
          第{cur.no}段を はじめる
        </Link>
      </section>

      <nav aria-label="学年" className="flex flex-wrap gap-2">
        {GRADES.map((g) => (
          <a key={g.grade} href={`#g${g.grade}`} className="inline-flex min-h-[44px] items-center rounded-full border-[1.5px] border-[#15172B] bg-white px-4 text-[15px] font-black text-[#15172B] no-underline">
            {g.name}
          </a>
        ))}
      </nav>

      {GRADES.map((g) => {
        const steps = STEPS.filter((s) => s.grade === g.grade);
        const done = steps.filter((s) => progress.steps[s.no]?.cleared).length;
        return (
          <section key={g.grade} id={`g${g.grade}`} aria-labelledby={`h-g${g.grade}`} className="scroll-mt-4">
            <h2 id={`h-g${g.grade}`} className="m-0 flex flex-wrap items-baseline gap-2 text-[22px] font-black">
              {g.name}
              <span className="text-[13px] font-bold text-[#3A3D55]">
                第{steps[0].no}〜{steps[steps.length - 1].no}段・クリア {done}/{steps.length}
              </span>
            </h2>
            <ul className="m-0 mt-3 grid list-none gap-2.5 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((s) => {
                const r = progress.steps[s.no];
                const isCur = s.no === current;
                const box = r?.cleared ? "border-[#15172B] bg-[#1533B8] text-white shadow-[3px_3px_0_#15172B]" : isCur ? "border-[#15172B] bg-[#FFF6C4] shadow-[3px_3px_0_#15172B]" : "border-[#9A9CB0] bg-white";
                return (
                  <li key={s.no}>
                    <Link href={`/learn/sansu/${s.no}`} className={`flex min-h-[84px] flex-col justify-center gap-1 rounded-[14px] border-[1.5px] px-3.5 py-2.5 no-underline ${box} ${r?.cleared ? "" : "text-[#15172B]"}`}>
                      <span className="flex items-center justify-between text-[12px] font-black">
                        <span>
                          第{s.no}段・{s.unit}
                        </span>
                        <span>{r?.cleared ? "クリア" : isCur ? "いまここ" : r ? `合格 ${r.passes}/${PASSES_TO_CLEAR}` : ""}</span>
                      </span>
                      <span className="text-[16px] font-black leading-snug">{s.title}</span>
                      <span className={`text-[16px] ${r?.cleared ? "text-white/85" : "text-[#3A3D55]"}`}>
                        <SansuText src={s.example} />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
