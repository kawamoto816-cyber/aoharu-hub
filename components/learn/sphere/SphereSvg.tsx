"use client";

import type { KeyboardEvent } from "react";
import type { Board, BoardNode, CBand, NodeState, SphereEdge, UnitMeta } from "@/lib/sphere";
import { A_ROWS, AXIS_A, aX, AXIS_B, B_C, B_OUTER, B_R, B_RINGS, C_COLS, C_LEFT, C_TOP, aY, bAngle, polar } from "@/lib/sphere";

// スフィア盤の SVG。背景 (軸ごと)・線・ノードを描く。ノードは押すとボトムシートを開く。

const INK = "#15172B";
const GLOW = "#FFE45C";
const GRAY = "#C9C6BA";
const BLUE = "#1533B8";

export const STATE_LABEL: Record<NodeState, string> = { lit: "光った", next: "次に光らせられる", dim: "まだ" };

function star(x: number, y: number, s = 3.6) {
  const k = s * 0.3;
  return `M${x} ${y - s} L${x + k} ${y - k} L${x + s} ${y} L${x + k} ${y + k} L${x} ${y + s} L${x - k} ${y + k} L${x - s} ${y} L${x - k} ${y - k} Z`;
}

const f = (n: number) => n.toFixed(1);

function edgePath(b: Board, p: BoardNode, q: BoardNode, e: SphereEdge): string {
  const M = `M${f(p.x)} ${f(p.y)}`;
  const dx = q.x - p.x;
  const dy = q.y - p.y;
  if (b.axis === "a") {
    if (Math.abs(dy) < 1 && Math.abs(dx) > 40) return `${M} Q${f((p.x + q.x) / 2)} ${f(p.y - 7)} ${f(q.x)} ${f(q.y)}`;
    if (Math.abs(dx) >= 50 && Math.abs(dy) >= 80) return `${M} Q${f(p.x * 0.1 + q.x * 0.9)} ${f(p.y * 0.6 + q.y * 0.4)} ${f(q.x)} ${f(q.y)}`;
    return `${M} L${f(q.x)} ${f(q.y)}`;
  }
  const len = Math.hypot(dx, dy) || 1;
  const mx = (p.x + q.x) / 2;
  const my = (p.y + q.y) / 2;
  let nx = -dy / len;
  let ny = dx / len;
  if (b.axis === "b") {
    // 中心から外へふくらませる
    if ((mx + nx - B_C.x) ** 2 + (my + ny - B_C.y) ** 2 < (mx - B_C.x) ** 2 + (my - B_C.y) ** 2) [nx, ny] = [-nx, -ny];
    const k = 0.12 * len;
    return `${M} Q${f(mx + nx * k)} ${f(my + ny * k)} ${f(q.x)} ${f(q.y)}`;
  }
  if (e.kind !== "bridge") return `${M} L${f(q.x)} ${f(q.y)}`;
  // C の橋：盤の外側へ弓なりに
  if ((mx > b.width / 2 && nx < 0) || (mx <= b.width / 2 && nx > 0)) [nx, ny] = [-nx, -ny];
  const k = 0.22 * len;
  return `${M} Q${f(mx + nx * k)} ${f(my + ny * k)} ${f(q.x)} ${f(q.y)}`;
}

function Background({ board }: { board: Board & { bands?: CBand[] } }) {
  if (board.axis === "a") {
    const hiTop = aY(9) - 20;
    const hi2 = aY(6) - 20;
    return (
      <g aria-hidden="true">
        <rect x="0" y={hi2} width={board.width} height={hiTop - hi2} fill="#FBFAF6" />
        <rect x="0" y={hiTop} width={board.width} height={board.height - hiTop} fill="#F7F5EE" />
        {A_ROWS.map((r, i) => (
          <g key={r}>
            <text x="8" y={aY(i) + 3} fontSize="9" fontWeight="900" fill="#3A3D55">
              {r}
            </text>
            <path d={`M34 ${aY(i)} H350`} stroke="#EFEDE6" strokeWidth="1" />
          </g>
        ))}
        <path d={`M4 ${hi2} H352`} stroke={INK} strokeWidth="1" strokeDasharray="5 4" strokeOpacity=".5" />
        <path d={`M4 ${hiTop} H352`} stroke={INK} strokeWidth="1" strokeDasharray="5 4" strokeOpacity=".5" />
        {AXIS_A.lines.map((l) => (
          <text key={l.id} x={aX(l.col)} y="22" textAnchor="middle" fontSize="13" fontWeight="900" fill={INK}>
            {l.mark}
          </text>
        ))}
        <path d="M34 30 H350" stroke={INK} strokeWidth="1.2" />
      </g>
    );
  }
  if (board.axis === "b") return null;
  return (
    <g aria-hidden="true">
      {board.bands?.map((band, i) => (
        <g key={band.id}>
          {i % 2 === 1 && <rect x="0" y={band.top} width={board.width} height={band.height} fill="#F8F6EF" />}
          <path d={`M0 ${band.top} H${board.width}`} stroke={INK} strokeOpacity=".18" />
          {band.label.map((t, k) => (
            <text key={t} x="24" y={band.top + band.height / 2 + 4 + (k - (band.label.length - 1) / 2) * 13} textAnchor="middle" fontSize="11" fontWeight="900" fill={INK}>
              {t}
            </text>
          ))}
        </g>
      ))}
      <path d={`M${C_LEFT} ${C_TOP} V${board.height}`} stroke={INK} strokeWidth="1.2" />
      {(["小", "中", "高"] as const).map((s) => {
        const [l, r] = C_COLS[s];
        return (
          <g key={s}>
            <text x={(l + r) / 2} y="20" textAnchor="middle" fontSize="11" fontWeight="900" fill="#3A3D55">
              {s === "小" ? "小学校" : s === "中" ? "中学校" : "高校"}
            </text>
            {s !== "小" && <path d={`M${l} ${C_TOP} V${board.height}`} stroke={INK} strokeOpacity=".15" strokeDasharray="3 4" />}
          </g>
        );
      })}
      <path d={`M0 ${C_TOP} H${board.width}`} stroke={INK} strokeWidth="1.2" />
      <text x="24" y="20" textAnchor="middle" fontSize="9" fontWeight="900" fill="#8A8C9C">
        時代
      </text>
    </g>
  );
}

/** B の扇と輪 (ノードより下に描く) */
function Fans({ focus }: { focus: string | null }) {
  const n = AXIS_B.themes.length;
  return (
    <g aria-hidden="true">
      {AXIS_B.themes.map((t, i) => {
        const a0 = bAngle(i) - 180 / n;
        const p0 = polar(a0, B_OUTER);
        const p1 = polar(a0 + 360 / n, B_OUTER);
        const c = polar(bAngle(i), 172);
        // 斜めの扇の名前は、外側のノードと重ならないよう上下へ少し逃がす
        const side = Math.abs(c.x - B_C.x) > 60 ? Math.sign(c.y - B_C.y) * 14 : 0;
        const lp = { x: c.x, y: c.y + side };
        const on = focus === t.id;
        return (
          <g key={t.id}>
            <path d={`M${B_C.x} ${B_C.y} L${f(p0.x)} ${f(p0.y)} A${B_OUTER} ${B_OUTER} 0 0 1 ${f(p1.x)} ${f(p1.y)} Z`} fill={on ? GLOW : "#FFFFFF"} fillOpacity={on ? 0.28 : 0} stroke={INK} strokeOpacity="0.25" />
            <text x={f(lp.x)} y={f(lp.y + 4)} textAnchor="middle" fontSize="10.5" fontWeight="900" fill={on ? INK : "#3A3D55"}>
              {t.name}
            </text>
          </g>
        );
      })}
      {B_RINGS.map((r) => (
        <circle key={r} cx={B_C.x} cy={B_C.y} r={B_R[r]} fill="none" stroke={INK} strokeOpacity={r === "高" ? 0.3 : 0.2} strokeDasharray={r === "高" ? undefined : "2 4"} />
      ))}
    </g>
  );
}

function FanLabels({ focus }: { focus: string | null }) {
  const name = focus ? AXIS_B.themes.find((t) => t.id === focus)?.name : null;
  return (
    <g aria-hidden="true">
      {B_RINGS.map((r, i) => (
        <text key={r} x={B_C.x + [69, 98, 126, 152][i]} y={B_C.y + 12} fontSize="8.5" fontWeight="900" fill="#8A8C9C" stroke="#FFFFFF" strokeWidth="3" paintOrder="stroke">
          {r}
        </text>
      ))}
      <circle cx={B_C.x} cy={B_C.y} r="30" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
      <text x={B_C.x} y={B_C.y - 4} textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#3A3D55">
        テーマ
      </text>
      <text x={B_C.x} y={B_C.y + 10} textAnchor="middle" fontSize={name && name.length > 3 ? 9.5 : 13} fontWeight="900" fill={INK}>
        {name ?? `${AXIS_B.themes.length}つ`}
      </text>
    </g>
  );
}

export function SphereSvg({
  board,
  meta,
  states,
  focus,
  selected,
  onSelect,
  nodeRef,
}: {
  board: Board & { bands?: CBand[] };
  meta: Record<string, UnitMeta>;
  states: Map<string, NodeState>;
  focus: string | null;
  selected: string | null;
  onSelect: (unit: string) => void;
  nodeRef: (unit: string, el: SVGGElement | null) => void;
}) {
  const at = new Map(board.nodes.map((n) => [n.unit, n]));
  const r0 = board.axis === "a" ? 8 : 7;
  const inFocus = (lines: string[]) => !focus || lines.includes(focus);

  const key = (e: KeyboardEvent, unit: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(unit);
    }
  };

  return (
    <svg viewBox={`0 0 ${board.width} ${board.height}`} width="100%" className="block h-auto" role="group" aria-label="スフィア盤 (単元を押すとくわしく見られます)">
      <Background board={board} />
      {board.axis === "b" && <Fans focus={focus} />}
      <g>
        {board.edges.map((e) => {
          const p = at.get(e.from);
          const q = at.get(e.to);
          if (!p || !q) return null;
          const sp = states.get(e.from);
          const sq = states.get(e.to);
          const both = sp === "lit" && sq === "lit";
          const one = sp === "lit" || sq === "lit";
          const d = edgePath(board, p, q, e);
          const bridge = e.kind === "bridge";
          const op = inFocus([e.line]) ? 1 : 0.28;
          const sel = selected && (e.from === selected || e.to === selected);
          return (
            <g key={`${e.from}-${e.to}`} opacity={op} aria-hidden="true">
              {both && <path d={d} fill="none" stroke={GLOW} strokeWidth="7" strokeLinecap="round" />}
              <path
                d={d}
                fill="none"
                stroke={both || one ? INK : GRAY}
                strokeWidth={bridge ? 2.2 : both ? 1.6 : 1.4}
                strokeLinecap="round"
                strokeDasharray={bridge ? "1 4.5" : !both && one ? "4 3" : undefined}
              />
              {sel && <path d={d} fill="none" stroke={BLUE} strokeWidth="2.6" strokeLinecap="round" strokeOpacity="0.9" />}
            </g>
          );
        })}
      </g>
      {board.axis === "b" && <FanLabels focus={focus} />}
      <g>
        {board.nodes.map((n) => {
          const st = states.get(n.unit) ?? "dim";
          const m = meta[n.unit];
          const c = m?.color ?? "#6E7084";
          const sel = selected === n.unit;
          const off = sel ? 5 : 0;
          const ly = n.label === "b" ? n.y + r0 + 11 + off : n.label === "t" ? n.y - r0 - 5 - off : n.y + 3;
          const lx = n.label === "l" ? n.x - r0 - 4 - off : n.label === "r" ? n.x + r0 + 4 + off : n.x;
          const anchor = n.label === "l" ? "end" : n.label === "r" ? "start" : "middle";
          return (
            <g
              key={n.unit}
              ref={(el) => nodeRef(n.unit, el)}
              role="button"
              tabIndex={0}
              aria-label={`${m?.name ?? n.short}（${m?.where ?? ""}）${STATE_LABEL[st]}`}
              aria-haspopup="dialog"
              className="group cursor-pointer outline-none"
              opacity={inFocus(n.lines) ? 1 : 0.5}
              onClick={() => onSelect(n.unit)}
              onKeyDown={(e) => key(e, n.unit)}
            >
              <circle cx={n.x} cy={n.y} r="17" fill="transparent" />
              <circle cx={n.x} cy={n.y} r="19" fill="none" stroke={BLUE} strokeWidth="2.5" className="opacity-0 group-focus-visible:opacity-100" />
              {sel && (
                <>
                  <circle cx={n.x} cy={n.y} r={r0 + 9} fill="none" stroke={INK} strokeWidth="2" />
                  <circle cx={n.x} cy={n.y} r={r0 + 13} fill="none" stroke={INK} strokeWidth="1" strokeDasharray="2 3" />
                </>
              )}
              {st === "lit" && (
                <>
                  <circle cx={n.x} cy={n.y} r={r0 + 6} fill={c} fillOpacity="0.16" />
                  <circle cx={n.x} cy={n.y} r={r0} fill={c} stroke={INK} strokeWidth="1.5" />
                  <path d={star(n.x, n.y)} fill="#FFFFFF" />
                </>
              )}
              {st === "next" && (
                <>
                  <circle cx={n.x} cy={n.y} r={r0 + 4} fill="none" stroke={c} strokeWidth="1.2" strokeDasharray="2.5 2.5" />
                  <circle cx={n.x} cy={n.y} r={r0} fill="#FFFFFF" stroke={c} strokeWidth="2.4" />
                  <circle cx={n.x} cy={n.y} r="2.6" fill={c} />
                </>
              )}
              {st === "dim" && (
                <>
                  <circle cx={n.x} cy={n.y} r={r0 - 1} fill="#FFFFFF" stroke={GRAY} strokeWidth="1.5" />
                  <circle cx={n.x} cy={n.y} r="2.2" fill={c} fillOpacity="0.55" />
                </>
              )}
              {n.junction && <path d={`M${n.x} ${n.y - 13} L${n.x + 13} ${n.y} L${n.x} ${n.y + 13} L${n.x - 13} ${n.y} Z`} fill="none" stroke={INK} strokeWidth="0.9" strokeOpacity="0.55" />}
              <text
                x={f(lx)}
                y={f(ly)}
                textAnchor={anchor}
                fontSize="8.6"
                fontWeight={st === "dim" ? 700 : 900}
                fill={st === "dim" ? "#6E7084" : INK}
                stroke="#FFFFFF"
                strokeWidth="3"
                paintOrder="stroke"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {n.short}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
