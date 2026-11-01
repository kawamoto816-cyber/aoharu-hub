import type { CauseFigure, FigNode, FlowFigure } from "@/lib/lecture/types";
import { Rich, TONE_BOX } from "./Rich";

// 流れ (flow) と 原因→結果 (cause)。どちらも HTML の箱と矢印で、狭い画面では縦に積む。

export function Box({ node, className = "" }: { node: FigNode; className?: string }) {
  return (
    <div className={`rounded-[12px] border-[1.5px] px-3 py-2 text-center ${TONE_BOX[node.tone ?? "plain"]} ${className}`}>
      <p className="m-0 text-[14px] font-black leading-snug">
        <Rich text={node.label} />
      </p>
      {node.sub && <p className="m-0 mt-0.5 text-[11.5px] font-bold leading-snug opacity-80">{node.sub}</p>}
    </div>
  );
}

/** 矢印。dir=down は縦、right は横。label は矢印に添える言葉。 */
export function Arrow({ dir, label }: { dir: "down" | "right" | "auto"; label?: string }) {
  const vertical = dir === "down" ? "flex" : dir === "auto" ? "flex sm:hidden" : "hidden";
  const horizontal = dir === "right" ? "flex" : dir === "auto" ? "hidden sm:flex" : "hidden";
  return (
    <>
      <div aria-hidden="true" className={`${vertical} items-center justify-center gap-1.5 py-1 text-[#15172B]`}>
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 2v17M3 13l6 6 6-6" />
        </svg>
        {label && <span className="rounded-full bg-[#15172B] px-2 py-0.5 text-[11px] font-black text-white">{label}</span>}
      </div>
      <div aria-hidden="true" className={`${horizontal} flex-none flex-col items-center justify-center gap-1 px-1 text-[#15172B]`}>
        {label && <span className="rounded-full bg-[#15172B] px-2 py-0.5 text-[11px] font-black text-white">{label}</span>}
        <svg width="26" height="18" viewBox="0 0 26 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 9h21M17 3l6 6-6 6" />
        </svg>
      </div>
    </>
  );
}

export function FlowFig({ fig }: { fig: FlowFigure }) {
  // 横並びにするのは、幅のある画面で 3つ以下のときだけ (4つ以上や dir=col は縦)。
  const row = (fig.dir ?? "row") === "row" && fig.steps.length <= 3;
  return (
    <ol className={`m-0 flex list-none flex-col p-0 ${row ? "sm:flex-row sm:items-stretch" : ""}`}>
      {fig.steps.map((s, i) => (
        <li key={`${s.label}-${i}`} className={`flex flex-col ${row ? "sm:min-w-0 sm:flex-1 sm:flex-row" : ""}`}>
          {i > 0 && <Arrow dir={row ? "auto" : "down"} label={fig.arrows?.[i - 1]} />}
          <Box node={s} className={row ? "sm:flex sm:flex-1 sm:flex-col sm:justify-center" : ""} />
        </li>
      ))}
    </ol>
  );
}

export function CauseFig({ fig }: { fig: CauseFigure }) {
  const n = fig.causes.length;
  const cols = n >= 3 ? "sm:grid-cols-3" : n === 2 ? "sm:grid-cols-2" : "";
  return (
    <div>
      <p className="m-0 mb-1.5 text-[11px] font-black tracking-wider text-[#3A3D55]">原因</p>
      <ul className={`m-0 grid list-none gap-2 p-0 ${cols}`}>
        {fig.causes.map((c) => (
          <li key={c.label} className="flex">
            <Box node={c} className="flex flex-1 flex-col justify-center" />
          </li>
        ))}
      </ul>
      {n > 1 && (
        <div aria-hidden="true" className={`mx-[12%] hidden h-3 rounded-b-[10px] border-x-[1.5px] border-b-[1.5px] border-[#15172B] ${cols ? "sm:block" : ""}`} />
      )}
      <Arrow dir="down" />
      <p className="m-0 mb-1.5 text-[11px] font-black tracking-wider text-[#B42318]">結果</p>
      <Box node={{ ...fig.effect, tone: fig.effect.tone ?? "red" }} />
      {fig.chain?.map((c) => (
        <div key={c.label}>
          <Arrow dir="down" />
          <Box node={c} />
        </div>
      ))}
    </div>
  );
}
