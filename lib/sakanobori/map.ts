import { LEVELS } from "@/lib/school";
import { needsOf } from "./index";

// つまずきマップ (さかのぼりの盤面) の配置。純粋な関数。
// 元の単元から前提をたどった単元を、学年の段 (上ほど新しい学年・下ほど前の学年) に並べ、前提どうしを線でつなぐ。
// 段は「小1〜小6・中1〜中3」は学年、高校は科目 (数学Ⅰ・数学A…) の地図の順。

export type MapState = "start" | "ok" | "ng" | "root" | "current" | "skip" | "other";

export interface MapNode {
  unit: string;
  name: string;
  /** 段の名前 (小5・中3・高校 数学Ⅰ) */
  row: string;
  state: MapState;
  x: number;
  y: number;
}
export interface MapEdge {
  /** 上の段の単元 */
  from: string;
  /** その前提 (下の段) */
  to: string;
  /** さかのぼった道の線 */
  path: boolean;
  /** 根っこから元の単元へ上る道の線 */
  climb: boolean;
}
export interface MapLayout {
  width: number;
  height: number;
  rows: { label: string; y: number }[];
  nodes: MapNode[];
  edges: MapEdge[];
}

interface UnitPlace {
  name: string;
  label: string;
  rank: number;
}
const PLACE = new Map<string, UnitPlace>();
LEVELS.forEach((l, li) =>
  l.subjects.forEach((s) =>
    s.groups.forEach((g, gi) => {
      const m = g.title.match(/^[小中高](\d)/);
      const rank = li * 100 + (m ? Number(m[1]) * 10 : gi * 10);
      const label = m ? g.title.slice(0, 2) : `高校 ${g.title}`;
      for (const u of g.units) PLACE.set(u.id, { name: u.name, label, rank });
    }),
  ),
);

export interface MapInput {
  origin: string;
  /** さかのぼった道 (元の単元 → … の順) */
  path: string[];
  /** 単元ごとの状態 (省略＝other) */
  states: Record<string, MapState>;
  /** 根っこ → … → 元の単元 (上る順) */
  climb?: string[];
  /** 道のほかに見せるまわりの単元の数 (既定 6) */
  extra?: number;
  /** 単元名を短くする (ルビ記号の除去など) */
  clean?: (s: string) => string;
}

const W = 340;
const LEFT = 58;
const ROW_H = 84;
const TOP = 34;

export function buildMap(inp: MapInput): MapLayout {
  const clean = inp.clean ?? ((s: string) => s);
  const units: string[] = [];
  const add = (u: string) => {
    if (!units.includes(u) && PLACE.has(u)) units.push(u);
  };
  add(inp.origin);
  for (const u of inp.path) add(u);
  // まわり: 道の単元の前提 (近い順) を少しだけ
  let budget = inp.extra ?? 6;
  let layer = [...units];
  for (let d = 0; d < 3 && budget > 0; d++) {
    const next: string[] = [];
    for (const u of layer)
      for (const n of needsOf(u)) {
        if (budget <= 0) break;
        if (units.includes(n.unit) || !PLACE.has(n.unit)) continue;
        add(n.unit);
        next.push(n.unit);
        budget--;
      }
    layer = next;
  }
  // 段 (新しい学年が上)
  const rowsByLabel = new Map<string, number>();
  for (const u of units) {
    const p = PLACE.get(u)!;
    rowsByLabel.set(p.label, Math.max(rowsByLabel.get(p.label) ?? -1, p.rank));
  }
  const rowLabels = [...rowsByLabel].sort((a, b) => b[1] - a[1]).map(([l]) => l);
  const rows = rowLabels.map((label, i) => ({ label, y: TOP + i * ROW_H }));
  // 段の中の並び: 道の単元を真ん中寄りに、ほかを左右に
  const onPath = new Set([inp.origin, ...inp.path]);
  const nodes: MapNode[] = [];
  for (const r of rows) {
    const here = units.filter((u) => PLACE.get(u)!.label === r.label);
    const main = here.filter((u) => onPath.has(u));
    const rest = here.filter((u) => !onPath.has(u));
    const order: string[] = [...main];
    rest.forEach((u, i) => (i % 2 === 0 ? order.push(u) : order.unshift(u)));
    const span = W - LEFT - 24;
    order.forEach((u, i) => {
      const x = LEFT + 12 + (span * (i + 1)) / (order.length + 1);
      nodes.push({ unit: u, name: clean(PLACE.get(u)!.name), row: r.label, state: inp.states[u] ?? "other", x, y: r.y + 18 });
    });
  }
  // 線: 前提どうし
  const pathPairs = new Set<string>();
  const seq = [inp.origin, ...inp.path.filter((u) => u !== inp.origin)];
  for (let i = 0; i + 1 < seq.length; i++) pathPairs.add(`${seq[i]}>${seq[i + 1]}`);
  const climbPairs = new Set<string>();
  const c = inp.climb ?? [];
  for (let i = 0; i + 1 < c.length; i++) climbPairs.add(`${c[i + 1]}>${c[i]}`);
  const edges: MapEdge[] = [];
  for (const u of units)
    for (const n of needsOf(u))
      if (units.includes(n.unit)) edges.push({ from: u, to: n.unit, path: pathPairs.has(`${u}>${n.unit}`), climb: climbPairs.has(`${u}>${n.unit}`) });
  // 道の線は、データの前提でなくても (候補から直接たどった場合) 引く
  for (const k of pathPairs) {
    const [a, b] = k.split(">");
    if (!edges.some((e) => e.from === a && e.to === b) && units.includes(a) && units.includes(b)) edges.push({ from: a, to: b, path: true, climb: climbPairs.has(k) });
  }
  return { width: W, height: TOP + rows.length * ROW_H + 6, rows, nodes, edges };
}
