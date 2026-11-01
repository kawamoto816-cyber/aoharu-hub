import type { AreaFigure, BarArea, RectArea, Tone } from "@/lib/lecture/types";
import { Rich, TONE_BOX } from "./Rich";

// 線分図 (area/bar) と面積図 (area/rect)。HTML の帯と長方形を、値に比例した幅・高さで描く。

const SEG: Record<Tone, string> = {
  navy: "bg-[#15172B] text-white",
  blue: "bg-[#E6EAFB] text-[#15172B]",
  yellow: "bg-[#FFE45C] text-[#15172B]",
  red: "bg-[#FFE1DB] text-[#B42318]",
  plain: "bg-white text-[#15172B]",
};

function BarFig({ fig }: { fig: BarArea }) {
  const max = fig.max ?? Math.max(...fig.bars.map((b) => b.parts.reduce((a, p) => a + p.value, 0)));
  const pct = (v: number) => `${(v / max) * 100}%`;
  return (
    <div>
      <div className="relative grid gap-3">
        {/* 目もりの点線 (帯をつらぬく) */}
        {fig.scale?.filter((s) => s.at > 0 && s.at < max).map((s) => (
          <span key={s.at} aria-hidden="true" style={{ left: pct(s.at) }} className="absolute bottom-0 top-5 border-l-[1.5px] border-dashed border-[#9A9CB0]" />
        ))}
        {fig.bars.map((b) => {
          const sum = b.parts.reduce((a, p) => a + p.value, 0);
          return (
            <div key={b.label} className="relative">
              <p className="m-0 flex items-baseline justify-between gap-2 text-[12.5px] font-black">
                <span>{b.label}</span>
                {b.total && <span className="text-[#1533B8]">{b.total}</span>}
              </p>
              <div className="mt-1 flex h-9 overflow-hidden rounded-[8px] border-[1.5px] border-[#15172B] bg-white" style={{ width: pct(sum) }}>
                {b.parts.map((p, i) => (
                  <span
                    key={i}
                    style={{ flexGrow: p.value, flexBasis: 0 }}
                    className={`flex min-w-0 items-center justify-center px-1 text-center text-[12px] font-black leading-tight ${i > 0 ? "border-l-[1.5px] border-l-[#15172B]" : ""} ${SEG[p.tone ?? "blue"]}`}
                  >
                    {p.label}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {fig.scale && (
        <div className="relative mt-1 h-9 border-t-[1.5px] border-[#15172B]">
          {fig.scale.map((s, i) => {
            const first = i === 0 && s.at === 0;
            const last = s.at >= max;
            return (
              <span
                key={s.at}
                style={{ left: pct(s.at) }}
                className={`absolute top-0 flex flex-col text-[11.5px] font-black text-[#15172B] ${first ? "items-start" : last ? "-translate-x-full items-end" : "-translate-x-1/2 items-center"}`}
              >
                <span aria-hidden="true" className="h-1.5 w-0 border-l-[1.5px] border-[#15172B]" />
                <span className="whitespace-nowrap">{s.label}</span>
              </span>
            );
          })}
        </div>
      )}
      {fig.scaleLabel && <p className="m-0 text-right text-[11px] font-bold text-[#3A3D55]">目もり：{fig.scaleLabel}</p>}
    </div>
  );
}

function RectFig({ fig }: { fig: RectArea }) {
  const sumW = fig.rects.reduce((a, r) => a + r.w, 0);
  const maxH = Math.max(...fig.rects.map((r) => r.h));
  const CH = 150; // いちばん高い長方形の高さ (px)
  return (
    <div className="flex items-end">
      {fig.rects.map((r, i) => (
        <div key={i} style={{ flexGrow: r.w / sumW, flexBasis: 0 }} className="min-w-0">
          <div
            style={{ height: Math.max(64, (r.h / maxH) * CH) }}
            className={`relative flex flex-col items-center justify-center border-[1.5px] p-1.5 text-center ${i > 0 ? "-ml-[1.5px]" : ""} ${TONE_BOX[r.tone ?? "blue"]}`}
          >
            {r.hLabel && <span className="absolute left-1.5 top-1 text-[11px] font-black opacity-80">↕ {r.hLabel}</span>}
            {r.label && (
              <span className="mt-3 text-[14px] font-black leading-snug">
                <Rich text={r.label} />
              </span>
            )}
          </div>
          {r.wLabel && (
            <p className="m-0 mt-1 flex items-center gap-1 text-[11.5px] font-black text-[#15172B]">
              <span aria-hidden="true" className="h-0 flex-1 border-t-[1.5px] border-[#15172B]" />
              <span className="whitespace-nowrap">{r.wLabel}</span>
              <span aria-hidden="true" className="h-0 flex-1 border-t-[1.5px] border-[#15172B]" />
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export function AreaFig({ fig }: { fig: AreaFigure }) {
  return fig.kind === "bar" ? <BarFig fig={fig} /> : <RectFig fig={fig} />;
}
