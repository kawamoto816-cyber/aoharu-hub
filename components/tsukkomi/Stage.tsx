import type { ReactNode } from "react";

// ツッコミ学習法の「舞台」。紺の幕、上からのスポットライト、まん中のセンターマイク、左にボケ役・右にツッコミ役の札。
// 絵は使わず、文字と図形だけで描く（既存のキャラクターには似せない）。

export function Stage({ children, active }: { children: ReactNode; active: "boke" | "tsukkomi" }) {
  return (
    <div className="relative overflow-hidden rounded-[18px] border-[1.5px] border-[#15172B] bg-[#15172B] px-3 pb-3 pt-4 text-[#15172B] shadow-[3px_3px_0_#B42318]">
      {/* スポットライト */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(255,228,92,0.22),transparent_70%)]" />
      {/* 幕のひだ */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-[repeating-linear-gradient(90deg,#B42318_0_14px,#8E1B12_14px_28px)]" />
      <div className="relative grid gap-3">{children}</div>
      {/* 床とセンターマイク */}
      <div aria-hidden="true" className="relative mt-3 flex items-end justify-between px-1">
        <Performer label="ボケ" on={active === "boke"} tone="boke" />
        <svg viewBox="0 0 40 64" width="28" height="44" className="text-[#C9CEF2]">
          <rect x="13" y="2" width="14" height="20" rx="7" fill="currentColor" />
          <path d="M11 14v3a9 9 0 0 0 18 0v-3" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M20 26v32M10 60h20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <Performer label="ツッコミ" on={active === "tsukkomi"} tone="tsukkomi" />
      </div>
      <div aria-hidden="true" className="relative -mx-3 mt-1 h-2 bg-[#8A5A00]" />
    </div>
  );
}

function Performer({ label, on, tone }: { label: string; on: boolean; tone: "boke" | "tsukkomi" }) {
  return (
    <span
      className={`flex h-11 min-w-11 items-center justify-center rounded-full border-2 px-2.5 text-[12px] font-black transition-transform duration-150 ${
        tone === "boke" ? "border-white bg-white text-[#15172B]" : "border-[#FFE45C] bg-[#1533B8] text-white"
      } ${on ? "-translate-y-1 shadow-[0_0_0_4px_rgba(255,228,92,0.45)]" : "opacity-70"}`}
    >
      {label}
    </span>
  );
}

/** 舞台の上のふきだし。side=left はボケ役、right はツッコミ役 */
export function StageBubble({ side, who, children }: { side: "left" | "right"; who: string; children: ReactNode }) {
  return (
    <div className={`flex flex-col ${side === "right" ? "items-end" : "items-start"}`}>
      <span className={`mb-1 rounded-full px-2 py-0.5 text-[11px] font-black ${side === "right" ? "bg-[#1533B8] text-white" : "bg-white text-[#15172B]"}`}>{who}</span>
      <div
        className={`relative w-full rounded-[14px] border-[1.5px] border-[#15172B] px-3 py-2.5 ${side === "right" ? "rounded-tr-[4px] bg-[#E6EAFB]" : "rounded-tl-[4px] bg-white"}`}
      >
        {children}
      </div>
    </div>
  );
}
