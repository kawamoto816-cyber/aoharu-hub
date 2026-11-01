import type { FormulaFigure } from "@/lib/lecture/types";
import { Rich } from "./Rich";

// 式 (文) の変形 (formula)。ステップを上から順に、{{ }} の「変わった部分」を黄色地の赤字で示す。

export function FormulaFig({ fig }: { fig: FormulaFigure }) {
  return (
    <ol className="m-0 grid list-none gap-0 p-0">
      {fig.steps.map((s, i) => (
        <li key={i}>
          {i > 0 && (
            <div aria-hidden="true" className="flex justify-center py-0.5 text-[#1533B8]">
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 2v13M3 10l5 5 5-5" />
              </svg>
            </div>
          )}
          <div className={`flex items-start gap-2.5 rounded-[12px] border-[1.5px] px-3 py-2 ${i === fig.steps.length - 1 ? "border-[#1533B8] bg-[#E6EAFB]" : "border-[#15172B] bg-white"}`}>
            <span aria-hidden="true" className="mt-[3px] flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#15172B] text-[11px] font-black text-white">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className={`m-0 break-words font-bold leading-relaxed ${fig.prose ? "text-[15.5px]" : "font-mono text-[17px] tracking-tight"}`}>
                {s.label && <span className="mr-2 inline-block rounded-[6px] bg-[#15172B] px-1.5 py-0.5 align-middle font-sans text-[11px] font-black tracking-normal text-white">{s.label}</span>}
                <Rich text={s.expr} variant="change" />
              </p>
              {s.note && <p className="m-0 text-[12px] font-bold leading-snug text-[#3A3D55]"><Rich text={s.note} /></p>}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
