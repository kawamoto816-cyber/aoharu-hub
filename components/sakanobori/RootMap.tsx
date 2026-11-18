import type { MapLayout, MapState } from "@/lib/sakanobori/map";

// つまずきマップ: 単元を「星」、前提を「線」にした盤面。上ほど新しい学年、下ほど前の学年。
// さかのぼった道は白い線、根っこ (赤く光る星) から元の単元 (金の星) へ上る道は、黄色い線が上へ流れる。
// SVG だけで描く (サーバーで作る。動きは SVG の animate なので、動きを減らす設定では CSS で止める)。

const FILL: Record<MapState, string> = {
  start: "#FFE45C",
  ok: "#3B82F6",
  ng: "#FFFFFF",
  root: "#E5452E",
  current: "#FFFFFF",
  skip: "#2A2D45",
  other: "#22253B",
};
const STROKE: Record<MapState, string> = {
  start: "#FFE45C",
  ok: "#9CC2FF",
  ng: "#E5452E",
  root: "#FFB4A6",
  current: "#FFE45C",
  skip: "#5A5D73",
  other: "#4A4D66",
};
const LEGEND: { s: MapState; label: string }[] = [
  { s: "start", label: "はじめの単元" },
  { s: "ng", label: "つまずいた" },
  { s: "ok", label: "できていた" },
  { s: "root", label: "根っこ" },
];

const short = (s: string, n = 7) => ([...s].length > n ? [...s].slice(0, n - 1).join("") + "…" : s);

export function RootMap({ map, title = "つまずきマップ", caption }: { map: MapLayout; title?: string; caption?: string }) {
  const at = new Map(map.nodes.map((n) => [n.unit, n]));
  const root = map.nodes.find((n) => n.state === "root");
  const desc = `${map.nodes.length}個の単元を学年の段に並べた図。${root ? `根っこは${root.row}「${root.name}」。` : ""}`;
  return (
    <figure className="m-0 mt-3 overflow-hidden rounded-[18px] border-[1.5px] border-[#15172B] bg-[#15172B] text-white">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 px-4 pt-3">
        <span className="text-[14px] font-black tracking-[0.06em] text-[#FFE45C]">{title}</span>
        {caption && <span className="text-[11.5px] font-bold text-white/70">{caption}</span>}
      </figcaption>
      <svg viewBox={`0 0 ${map.width} ${map.height}`} role="img" aria-label={desc} className="block h-auto w-full [&_animate]:motion-reduce:hidden">
        <defs>
          <pattern id="rm-dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="#FFFFFF" opacity="0.12" />
          </pattern>
          <radialGradient id="rm-glow">
            <stop offset="0%" stopColor="#E5452E" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#E5452E" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={map.width} height={map.height} fill="url(#rm-dots)" />
        {/* 学年の段 */}
        {map.rows.map((r, i) => (
          <g key={r.label}>
            {i > 0 && <line x1="8" x2={map.width - 8} y1={r.y - 14} y2={r.y - 14} stroke="#FFFFFF" strokeOpacity="0.1" strokeDasharray="2 4" />}
            <text x="10" y={r.y + 22} fontSize="11" fontWeight="900" fill="#FFE45C" fillOpacity="0.85">
              {r.label.length > 7 ? r.label.replace("高校 ", "高 ") : r.label}
            </text>
          </g>
        ))}
        {/* 線 (前提) */}
        {map.edges
          .slice()
          .sort((a, b) => Number(a.path || a.climb) - Number(b.path || b.climb))
          .map((e) => {
            const a = at.get(e.from)!;
            const b = at.get(e.to)!;
            if (!a || !b) return null;
            const midY = (a.y + b.y) / 2;
            // 同じ段どうしは、下へふくらむ弧にする (星の上を線が通らないように)
            const d = Math.abs(a.y - b.y) < 1 ? `M${a.x},${a.y} Q${(a.x + b.x) / 2},${a.y + 34} ${b.x},${b.y}` : `M${a.x},${a.y} C${a.x},${midY} ${b.x},${midY} ${b.x},${b.y}`;
            if (e.climb)
              return (
                <g key={`${e.from}>${e.to}`}>
                  <path d={d} fill="none" stroke="#FFE45C" strokeOpacity="0.35" strokeWidth="7" />
                  <path d={d} fill="none" stroke="#FFE45C" strokeWidth="2.5" strokeDasharray="6 6">
                    <animate attributeName="stroke-dashoffset" from="0" to="24" dur="1.2s" repeatCount="indefinite" />
                  </path>
                </g>
              );
            return <path key={`${e.from}>${e.to}`} d={d} fill="none" stroke={e.path ? "#FFFFFF" : "#5A5D73"} strokeOpacity={e.path ? 0.9 : 0.55} strokeWidth={e.path ? 2 : 1.2} />;
          })}
        {/* 星 (単元) */}
        {map.nodes.map((n) => {
          const r = n.state === "other" || n.state === "skip" ? 9 : 13;
          return (
            <g key={n.unit}>
              <title>{`${n.row}「${n.name}」`}</title>
              {n.state === "root" && (
                <circle cx={n.x} cy={n.y} r="30" fill="url(#rm-glow)">
                  <animate attributeName="r" values="22;34;22" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              {n.state === "current" && (
                <circle cx={n.x} cy={n.y} r={r + 6} fill="none" stroke="#FFE45C" strokeWidth="1.5" strokeDasharray="3 3">
                  <animate attributeName="stroke-dashoffset" from="0" to="12" dur="1s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={n.x} cy={n.y} r={r} fill={FILL[n.state]} stroke={STROKE[n.state]} strokeWidth={n.state === "ng" ? 3 : 1.5} />
              {n.state === "ok" && <path d={`M${n.x - 5},${n.y} l3.5,4 l6.5,-8`} fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />}
              {n.state === "ng" && <text x={n.x} y={n.y + 4.5} textAnchor="middle" fontSize="13" fontWeight="900" fill="#E5452E">?</text>}
              {n.state === "root" && <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">根</text>}
              {n.state === "start" && <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="11" fontWeight="900" fill="#15172B">今</text>}
              <text x={n.x} y={n.y + r + 13} textAnchor="middle" stroke="#15172B" strokeWidth="3.5" strokeLinejoin="round" paintOrder="stroke" fontSize={n.state === "other" || n.state === "skip" ? 9 : 10.5} fontWeight={n.state === "other" || n.state === "skip" ? 700 : 900} fill="#FFFFFF" fillOpacity={n.state === "other" || n.state === "skip" ? 0.55 : 1}>
                {short(n.name, n.state === "other" || n.state === "skip" ? 6 : 8)}
              </text>
            </g>
          );
        })}
      </svg>
      <ul className="m-0 flex list-none flex-wrap gap-x-3 gap-y-1 px-4 pb-3 pt-1 text-[11.5px] font-bold text-white/85" aria-label="マップの見かた">
        {LEGEND.map((l) => (
          <li key={l.s} className="flex items-center gap-1">
            <span aria-hidden="true" className="inline-block h-3 w-3 rounded-full border-[1.5px]" style={{ background: FILL[l.s], borderColor: STROKE[l.s] }} />
            {l.label}
          </li>
        ))}
        <li className="flex items-center gap-1">
          <span aria-hidden="true" className="inline-block h-[3px] w-4 rounded bg-[#FFE45C]" />
          根っこから上る道
        </li>
      </ul>
    </figure>
  );
}
