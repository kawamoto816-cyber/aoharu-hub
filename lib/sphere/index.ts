import { AXIS_A } from "./data-a";
import { AXIS_B } from "./data-b";
import { AXIS_C } from "./data-c";
import type { Axis, LabelSide, Ring, SphereEdge, SphereLine, Stage, UnitMeta } from "./types";

// 学びのスフィア盤：3つの軸のデータと、SVG に描くための配置の計算。
// ここはクライアントからも読む (lib/school は読まない。単元名などは meta.ts でサーバーが引いて渡す)。

export { AXIS_A, AXIS_B, AXIS_C };
export type * from "./types";

export const AXES: { key: Axis; name: string; title: string; desc: string }[] = [
  { key: "a", name: "系譜", title: "概念の系譜", desc: "上から下へ、小1→高校。縦の列は「ひとつの考え方の育ち方」。点線の橋は、教科をこえて同じ考え方が使われるところ。" },
  { key: "b", name: "テーマ", title: "テーマ星座", desc: "扇形がテーマ、内側から外側へ 小低（小1〜3）・小高（小4〜6）・中・高。ノードの色が教科なので、ひとつの扇に何色まざるかで「教科をこえる」が見えます。2つのテーマにまたがるノード（◇）は交差点。" },
  { key: "c", name: "時代と人物", title: "時代の帯と人物の線", desc: "縦が時代（古代中国→明治）、横が小・中・高。線は同じ人物・同じ作品。点線の橋は、時代をこえて引用されるところ（芭蕉が杜甫を引く、漱石の名が故事から来る）。" },
];

export const isAxis = (v: string | null | undefined): v is Axis => v === "a" || v === "b" || v === "c";

/** 全ノードの単元id (軸ごと) */
export function axisUnits(axis: Axis): string[] {
  if (axis === "a") return AXIS_A.nodes.map((n) => n.unit);
  if (axis === "b") return [...new Set(AXIS_B.themes.flatMap((t) => t.members.map((m) => m.unit)))];
  return AXIS_C.nodes.map((n) => n.unit);
}

export const allSphereUnits = () => [...new Set((["a", "b", "c"] as const).flatMap(axisUnits))];

// ---- 配置 ----

export interface BoardNode {
  unit: string;
  short: string;
  x: number;
  y: number;
  lines: string[];
  /** 2つ以上の線・テーマにまたがる (◇) */
  junction: boolean;
  label: LabelSide;
}

export interface Board {
  axis: Axis;
  width: number;
  height: number;
  nodes: BoardNode[];
  edges: SphereEdge[];
  lines: SphereLine[];
}

export const BOARD_W = 356;

// A: 行＝学年 (meta.row)、列＝線の列 (0〜8)
export const A_ROWS = ["小1", "小2", "小3", "小4", "小5", "小6", "中1", "中2", "中3", "高・基", "高・発"];
export const aX = (col: number) => 46 + 34.5 * col;
export const aY = (row: number) => 50 + 40 * row;

export function boardA(meta: Record<string, UnitMeta>): Board {
  const lineCol = new Map(AXIS_A.lines.map((l) => [l.id, l.col]));
  const nodes = AXIS_A.nodes.map((n) => ({
    unit: n.unit,
    short: n.short,
    x: aX(n.col ?? lineCol.get(n.line) ?? 0),
    y: aY(meta[n.unit]?.row ?? 0),
    lines: [n.line],
    junction: false,
    label: n.label ?? "b",
  }));
  return { axis: "a", width: BOARD_W, height: aY(A_ROWS.length - 1) + 30, nodes, edges: AXIS_A.edges, lines: AXIS_A.lines };
}

// B: 中心 (178,190)、テーマ i の扇の中心角 -90+60i 度、輪の半径
export const B_C = { x: 178, y: 190 };
export const B_RINGS: Ring[] = ["小低", "小高", "中", "高"];
export const B_R: Record<Ring, number> = { 小低: 66, 小高: 95, 中: 123, 高: 149 };
export const B_OUTER = 157;
export const bAngle = (i: number) => -90 + 60 * i;
export const polar = (deg: number, r: number) => ({ x: B_C.x + r * Math.cos((deg * Math.PI) / 180), y: B_C.y + r * Math.sin((deg * Math.PI) / 180) });

export function boardB(): Board {
  const themesOf = new Map<string, number[]>();
  AXIS_B.themes.forEach((t, i) => t.members.forEach((m) => themesOf.set(m.unit, [...(themesOf.get(m.unit) ?? []), i])));
  const nodes: BoardNode[] = [];
  const seen = new Set<string>();
  AXIS_B.themes.forEach((t, i) => {
    for (const ring of B_RINGS) {
      const ms = t.members.filter((m) => m.ring === ring && (themesOf.get(m.unit)?.length ?? 0) < 2);
      const auto = ms.filter((m) => m.a === undefined);
      const spread = auto.length === 1 ? [0] : auto.length === 2 ? [-20, 20] : auto.map((_, k) => -24 + (48 * k) / Math.max(1, auto.length - 1));
      let k = 0;
      for (const m of ms) {
        const off = m.a ?? spread[k++];
        const p = polar(bAngle(i) + off, B_R[ring]);
        nodes.push({ unit: m.unit, short: m.short, x: p.x, y: p.y, lines: [t.id], junction: false, label: m.label ?? "b" });
      }
    }
    // 交差点：となりあう2つの扇の境目
    for (const m of t.members) {
      const ts = themesOf.get(m.unit) ?? [];
      if (ts.length < 2 || seen.has(m.unit)) continue;
      seen.add(m.unit);
      const [a, b] = ts;
      const n = AXIS_B.themes.length;
      const boundary = (b - a + n) % n === 1 ? bAngle(a) + 30 : bAngle(b) + 30;
      const p = polar(boundary + (m.a ?? 0), B_R[m.ring]);
      nodes.push({ unit: m.unit, short: m.short, x: p.x, y: p.y, lines: ts.map((x) => AXIS_B.themes[x].id), junction: true, label: m.label ?? "b" });
    }
  });
  return { axis: "b", width: BOARD_W, height: 382, nodes, edges: AXIS_B.edges, lines: AXIS_B.themes };
}

// C: 行＝時代の帯、列＝小・中・高
export const C_TOP = 30;
export const C_LEFT = 48;
export const C_COLS: Record<Stage, [number, number]> = { 小: [48, 151], 中: [151, 253], 高: [253, 356] };
const C_ROW_H = 34;

export interface CBand {
  id: string;
  label: string[];
  top: number;
  height: number;
}

export function boardC(): Board & { bands: CBand[] } {
  const bands: CBand[] = [];
  const nodes: BoardNode[] = [];
  let top = C_TOP;
  for (const era of AXIS_C.eras) {
    const inEra = AXIS_C.nodes.filter((n) => n.era === era.id);
    const cells = (["小", "中", "高"] as const).map((s) => inEra.filter((n) => n.stage === s && !n.straddle));
    const rows = Math.max(1, ...cells.map((c) => Math.ceil(c.length / 2)));
    const height = 22 + rows * C_ROW_H;
    bands.push({ id: era.id, label: era.label, top, height });
    for (const c of cells)
      c.forEach((n, i) => {
        const [l, r] = C_COLS[n.stage];
        const w = r - l;
        const col = i % 2;
        const row = Math.floor(i / 2);
        const single = c.length === 1;
        const lastAlone = c.length % 2 === 1 && i === c.length - 1 && c.length > 1;
        const x = single ? l + w / 2 : lastAlone ? l + w * 0.5 : l + w * (col ? 0.74 : 0.26);
        const y = top + 11 + (row + 0.5) * C_ROW_H + (single || lastAlone ? 0 : col ? 7 : -7);
        nodes.push({ unit: n.unit, short: n.short, x, y, lines: n.lines, junction: n.lines.length > 1, label: n.label ?? "b" });
      });
    for (const n of inEra.filter((x) => x.straddle)) {
      const [l, r] = C_COLS[n.stage];
      nodes.push({ unit: n.unit, short: n.short, x: l + (r - l) * 0.45, y: top, lines: n.lines, junction: n.lines.length > 1, label: n.label ?? "b" });
    }
    top += height;
  }
  return { axis: "c", width: BOARD_W, height: top + 8, nodes, edges: AXIS_C.edges, lines: AXIS_C.lines, bands };
}

// ---- 光った・次に光らせられる ----

export type NodeState = "lit" | "next" | "dim";

export function nodeStates(board: Board, read: Record<string, number>): Map<string, NodeState> {
  const m = new Map<string, NodeState>();
  for (const n of board.nodes) m.set(n.unit, read[n.unit] ? "lit" : "dim");
  for (const e of board.edges) {
    const a = m.get(e.from);
    const b = m.get(e.to);
    if (a === "lit" && b === "dim") m.set(e.to, "next");
    if (b === "lit" && a === "dim") m.set(e.from, "next");
  }
  return m;
}

// 教科の色
export const SUBJECT_COLORS: { key: string; name: string; color: string; match: RegExp }[] = [
  { key: "ja", name: "国語", color: "#D9480F", match: /国語/ },
  { key: "math", name: "算数・数学", color: "#1533B8", match: /算数|数学/ },
  { key: "sci", name: "理科", color: "#0F8A5F", match: /理科/ },
  { key: "soc", name: "社会", color: "#B7791F", match: /社会|地理|歴史|公民/ },
  { key: "en", name: "英語", color: "#7A3FD0", match: /英語/ },
  { key: "info", name: "情報", color: "#0B7C92", match: /情報/ },
];
export const subjectColor = (subject: string) => SUBJECT_COLORS.find((s) => s.match.test(subject))?.color ?? "#6E7084";
