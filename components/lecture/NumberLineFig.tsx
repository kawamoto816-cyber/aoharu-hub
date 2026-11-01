import type { NumberLineFigure } from "@/lib/lecture/types";
import { rubyReading, TONE_STROKE } from "./Rich";

// 数直線 (numberline)。SVG で目もり・点・区間・移動の矢印 (上の弧) を描く。
// 幅 340 の座標で描いて画面幅に合わせて縮める。狭すぎるときは横スクロール。

const W = 340;
const PAD = 22;
const ROW = 30; // 弧の段の高さ

const fmt = (v: number) => (v > 0 ? `+${v}` : v < 0 ? `−${-v}` : "0");

export function NumberLineFig({ fig }: { fig: NumberLineFigure }) {
  const { min, max } = fig;
  const tick = fig.tick ?? 1;
  const every = fig.labelEvery ?? tick;
  const x = (v: number) => PAD + ((v - min) / (max - min)) * (W - PAD * 2);
  const moves = fig.moves ?? [];
  // 負の数がない数直線（小学校の数・時こくなど）は符号をつけない
  const signed = min < 0;
  const rows = moves.length ? Math.max(...moves.map((m) => m.row ?? 0)) + 1 : 0;
  const top = rows ? rows * ROW * 0.75 + 30 : 8;
  const y = top + 6; // 数直線の高さ
  const hasPointLabels = (fig.points ?? []).some((p) => p.label);
  const hasRangeLabels = (fig.ranges ?? []).some((r) => r.label);
  const H = y + 26 + (hasPointLabels ? 20 : 0) + (hasRangeLabels ? 18 : 0);
  const ticks: number[] = [];
  for (let v = min; v <= max + 1e-9; v += tick) ticks.push(Math.round(v * 1000) / 1000);
  const arcs = moves.map((m) => {
    const h = ROW * ((m.row ?? 0) + 1);
    const x1 = x(m.from);
    const x2 = x(m.to);
    return {
      tone: m.tone ?? "navy",
      label: m.label,
      mid: (x1 + x2) / 2,
      peak: y - 0.75 * h - 5, // 弧のいちばん高い所
      d: `M ${x1} ${y - 3} C ${x1} ${y - h - 6}, ${x2} ${y - h - 6}, ${x2} ${y - 4}`,
    };
  });
  const isLabeled = (v: number) => Math.abs(Math.round((v - min) / every) * every - (v - min)) < 1e-9;

  return (
    <div className="-mx-1 overflow-x-auto px-1">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full min-w-[300px]" aria-hidden="true">
        <defs>
          {(["navy", "blue", "red", "yellow", "plain"] as const).map((t) => (
            <marker key={t} id={`lec-nl-${t}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" fill={TONE_STROKE[t]} />
            </marker>
          ))}
        </defs>
        {/* 移動の矢印 (弧を先に全部描き、言葉はあとから上に重ねる) */}
        {arcs.map((a, i) => (
          <path key={i} d={a.d} fill="none" stroke={TONE_STROKE[a.tone]} strokeWidth="2.2" markerEnd={`url(#lec-nl-${a.tone})`} />
        ))}
        {arcs.map((a, i) =>
          a.label ? (
            <text key={i} x={a.mid} y={a.peak - 5} textAnchor="middle" fontSize="12" fontWeight="900" fill={TONE_STROKE[a.tone]} stroke="#fff" strokeWidth="5" strokeLinejoin="round" paintOrder="stroke">
              {rubyReading(a.label)}
            </text>
          ) : null,
        )}
        {/* 区間 */}
        {(fig.ranges ?? []).map((r, i) => {
          const c = TONE_STROKE[r.tone ?? "blue"];
          return (
            <g key={i}>
              <line x1={x(r.from)} y1={y} x2={x(r.to)} y2={y} stroke={c} strokeWidth="6" strokeLinecap="butt" opacity="0.85" />
              <circle cx={x(r.from)} cy={y} r="5" fill={r.openFrom ? "#fff" : c} stroke={c} strokeWidth="2" />
              <circle cx={x(r.to)} cy={y} r="5" fill={r.openTo ? "#fff" : c} stroke={c} strokeWidth="2" />
              {r.label && (
                <text x={(x(r.from) + x(r.to)) / 2} y={H - 4} textAnchor="middle" fontSize="12" fontWeight="900" fill={c}>
                  {rubyReading(r.label)}
                </text>
              )}
            </g>
          );
        })}
        {/* 数直線と目もり */}
        <line x1={PAD - 12} y1={y} x2={W - PAD + 12} y2={y} stroke="#15172B" strokeWidth="2" markerEnd="url(#lec-nl-navy)" />
        {ticks.map((v) => (
          <g key={v}>
            <line x1={x(v)} y1={y - (v === 0 ? 7 : 5)} x2={x(v)} y2={y + (v === 0 ? 7 : 5)} stroke="#15172B" strokeWidth={v === 0 ? 2.4 : 1.4} />
            {isLabeled(v) && (
              <text x={x(v)} y={y + 20} textAnchor="middle" fontSize="12" fontWeight={v === 0 ? 900 : 700} fill={!signed ? "#15172B" : v < 0 ? "#1533B8" : v > 0 ? "#B42318" : "#15172B"}>
                {signed ? fmt(v) : String(v)}
              </text>
            )}
          </g>
        ))}
        {/* 点 */}
        {(fig.points ?? []).map((p, i) => {
          const c = TONE_STROKE[p.tone ?? "navy"];
          return (
            <g key={i}>
              <circle cx={x(p.x)} cy={y} r="5.5" fill={p.tone === "yellow" ? "#FFE45C" : c} stroke="#15172B" strokeWidth="1.5" />
              {p.label && (
                <text x={x(p.x)} y={y + 40} textAnchor="middle" fontSize="12.5" fontWeight="900" fill={p.tone === "yellow" ? "#15172B" : c}>
                  {rubyReading(p.label)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
