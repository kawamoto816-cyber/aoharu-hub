"use client";

import { useState, type ReactNode } from "react";
import type { Tutorial, TutorialMark } from "@/lib/tutorials";
import { trackEvent } from "@/lib/analytics";

// 「使う前／使った後」を切り替えて見せる見本。PCでは横に並べ、スマホでは切り替えボタンで1枚ずつ見せる。
// 強調部分には番号を振り、下に赤ペン (使う前) ／青ペン (使った後) の書き込みを並べる。

function marked(text: string, marks: TutorialMark[], kind: "before" | "after"): ReactNode[] {
  const out: ReactNode[] = [];
  let rest = text;
  marks.forEach((m, i) => {
    const at = rest.indexOf(m.text);
    if (at < 0) return;
    out.push(rest.slice(0, at));
    out.push(
      <span
        key={i}
        className={
          kind === "before"
            ? "underline decoration-[#D9341F] decoration-wavy decoration-2 underline-offset-4"
            : "bg-[linear-gradient(transparent_55%,#FFE45C_55%)]"
        }
      >
        {m.text}
        <sup className={`ml-0.5 text-[11px] font-black ${kind === "before" ? "text-[#D9341F]" : "text-[#1533B8]"}`}>{i + 1}</sup>
      </span>,
    );
    rest = rest.slice(at + m.text.length);
  });
  out.push(rest);
  return out;
}

function Panel({ t, kind, handFont }: { t: Tutorial; kind: "before" | "after"; handFont: string }) {
  const s = t.sample;
  const isBefore = kind === "before";
  const marks = isBefore ? s.beforeMarks : s.afterMarks;
  return (
    <div
      className={`flex h-full flex-col rounded-[18px] border-[1.5px] bg-white p-6 sm:p-7 ${
        isBefore ? "border-dashed border-[#9A9CB0]" : "border-[#15172B] shadow-[8px_8px_0_#15172B]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${isBefore ? "bg-[#EEEDE7] text-[#3A3D55]" : "bg-[#1533B8] text-white"}`}
        >
          {isBefore ? "使う前" : `${t.name}を使った後`}
        </span>
        <span className="text-xs text-[#5A5D73]">{s.label}</span>
      </div>
      {s.question && (
        <p className="mb-0 mt-4 rounded-xl bg-[#F7F6F1] px-4 py-3 text-sm font-bold">
          <span className="text-[#5A5D73]">面接官：</span>
          {s.question}
        </p>
      )}
      <p className={`mb-0 mt-4 text-[15px] leading-[2.05] ${isBefore ? "text-[#5A5D73]" : "text-[#15172B]"}`}>
        {marked(isBefore ? s.before : s.after, marks, kind)}
      </p>
      <ol className="mb-0 mt-5 flex list-none flex-col gap-2 border-t border-[#E4E2D8] p-0 pt-4">
        {marks.map((m, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span
              className={`flex h-6 w-6 flex-none items-center justify-center rounded-full text-xs font-bold text-white ${
                isBefore ? "bg-[#D9341F]" : "bg-[#1533B8]"
              }`}
            >
              {i + 1}
            </span>
            <span className={`${handFont} text-[15px] leading-[1.7] ${isBefore ? "text-[#D9341F]" : "text-[#1533B8]"}`}>{m.note}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function BeforeAfter({ t, handFont }: { t: Tutorial; handFont: string }) {
  const [view, setView] = useState<"before" | "after">("before");
  const pick = (v: "before" | "after") => {
    setView(v);
    trackEvent("tutorial_toggle", { app: t.key, view: v });
  };
  return (
    <div>
      {/* スマホ: 切り替え */}
      <div role="group" aria-label="見本の切り替え" className="mb-4 inline-flex rounded-full border-[1.5px] border-[#15172B] bg-white p-1 md:hidden">
        {(["before", "after"] as const).map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={view === v}
            onClick={() => pick(v)}
            className={`min-h-[40px] rounded-full px-5 text-sm font-bold ${view === v ? "bg-[#15172B] text-white" : "text-[#15172B]"}`}
          >
            {v === "before" ? "使う前" : "使った後"}
          </button>
        ))}
      </div>
      <div className="md:hidden">
        <Panel t={t} kind={view} handFont={handFont} />
        {view === "before" && (
          <button
            type="button"
            onClick={() => pick("after")}
            className="mt-4 flex min-h-[48px] w-full items-center justify-center rounded-xl border-2 border-[#15172B] bg-[#FFE45C] text-[15px] font-black text-[#15172B]"
          >
            {t.name}を使った後を見る →
          </button>
        )}
      </div>
      {/* PC: 横並び */}
      <div className="hidden items-stretch gap-6 md:grid md:grid-cols-[1fr_auto_1fr]">
        <Panel t={t} kind="before" handFont={handFont} />
        <div className="flex items-center justify-center" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#15172B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
        <Panel t={t} kind="after" handFont={handFont} />
      </div>
    </div>
  );
}
