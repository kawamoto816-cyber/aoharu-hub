import type { CycleFigure } from "@/lib/lecture/types";
import { Rich, TONE_BOX } from "./Rich";

// 循環 (cycle)。正方形の中で箱を楕円の上に並べ、時計回りの矢印 (SVG) でつなぐ。
// 箱は HTML なので、日本語が折り返しても読める。

const R = (deg: number) => (deg * Math.PI) / 180;

export function CycleFig({ fig }: { fig: CycleFigure }) {
  const n = fig.steps.length;
  const boxW = n <= 4 ? 36 : 30; // 箱の幅 (%)
  const rx = 50 - boxW / 2 - 1; // 横の半径 (箱がはみ出さない)
  const ry = n === 4 ? 42 : 36;
  // 4つのときは四すみに置いて、真ん中の言葉と左右の箱が重ならないようにする。
  const start = n === 4 ? -135 : -90;
  const angle = (i: number) => start + (360 / n) * i;
  const pt = (deg: number) => ({ x: 50 + rx * Math.cos(R(deg)), y: 50 + ry * Math.sin(R(deg)) });
  const gap = (360 / n) * 0.3;
  const arcs = fig.steps.map((_, i) => {
    const a = pt(angle(i) + gap);
    const b = pt(angle(i + 1) - gap);
    return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${rx} ${ry} 0 0 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
  });
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[380px]">
      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <defs>
          <marker id="lec-cyc-head" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill="#1533B8" />
          </marker>
        </defs>
        {arcs.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#1533B8" strokeWidth="1.4" markerEnd="url(#lec-cyc-head)" />
        ))}
      </svg>
      {fig.center && (
        <p className="absolute left-1/2 top-1/2 m-0 w-[30%] -translate-x-1/2 -translate-y-1/2 text-center text-[12px] font-black leading-snug text-[#1533B8]">
          <Rich text={fig.center} />
        </p>
      )}
      <ol className="m-0 list-none p-0">
        {fig.steps.map((s, i) => {
          const p = pt(angle(i));
          return (
            <li
              key={`${s.label}-${i}`}
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${boxW}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-[12px] border-[1.5px] px-1.5 py-1.5 text-center ${TONE_BOX[s.tone ?? "plain"]}`}
            >
              <p className="m-0 text-[13.5px] font-black leading-tight">
                <Rich text={s.label} />
              </p>
              {s.sub && <p className="m-0 mt-0.5 text-[10.5px] font-bold leading-snug opacity-85">{s.sub}</p>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
