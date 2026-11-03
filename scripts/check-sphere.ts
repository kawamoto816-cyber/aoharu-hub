// 学びのスフィア盤 (lib/sphere) のデータ検査。`npx tsx scripts/check-sphere.ts`
// 全ノードが図解レクチャー (LECTURES) にあること、edge の両端がその軸のノードにあること、
// B の輪・C の段階が学校の地図の学年と合っていること、ノードが重なっていないことを確かめる。

import { hasLecture } from "@/lib/lecture";
import { AXIS_A, AXIS_B, AXIS_C, axisUnits, boardA, boardB, boardC, type Board, type SphereEdge } from "@/lib/sphere";
import { unitMeta } from "@/lib/sphere/meta";

const errors: string[] = [];
const meta = unitMeta();

function checkEdges(axis: string, units: string[], edges: SphereEdge[], lines: string[]) {
  const set = new Set(units);
  const seen = new Set<string>();
  for (const e of edges) {
    if (!set.has(e.from)) errors.push(`${axis}: edge の from ${e.from} がノードにない`);
    if (!set.has(e.to)) errors.push(`${axis}: edge の to ${e.to} がノードにない`);
    if (e.from === e.to) errors.push(`${axis}: edge が自分自身へ ${e.from}`);
    if (!lines.includes(e.line)) errors.push(`${axis}: edge ${e.from}→${e.to} の線 ${e.line} がない`);
    if (!e.why.trim()) errors.push(`${axis}: edge ${e.from}→${e.to} に理由がない`);
    const k = [e.from, e.to].sort().join(" ");
    if (seen.has(k)) errors.push(`${axis}: edge が重複 ${k}`);
    seen.add(k);
  }
  const linked = new Set(edges.flatMap((e) => [e.from, e.to]));
  for (const u of units) if (!linked.has(u)) errors.push(`${axis}: ${u} がどの線ともつながっていない`);
}

function checkOverlap(b: Board) {
  for (let i = 0; i < b.nodes.length; i++)
    for (let j = i + 1; j < b.nodes.length; j++) {
      const p = b.nodes[i];
      const q = b.nodes[j];
      if (Math.hypot(p.x - q.x, p.y - q.y) < 22) errors.push(`${b.axis}: ノードが近すぎる ${p.unit} / ${q.unit}`);
    }
  for (const n of b.nodes) if (n.x < 8 || n.x > b.width - 8 || n.y < 8 || n.y > b.height - 8) errors.push(`${b.axis}: ${n.unit} が盤の外`);
}

for (const axis of ["a", "b", "c"] as const) {
  const units = axisUnits(axis);
  if (new Set(units).size !== units.length) errors.push(`${axis}: ノードが重複`);
  for (const u of units) {
    if (!hasLecture(u)) errors.push(`${axis}: ${u} は LECTURES にない`);
    if (!meta[u]) errors.push(`${axis}: ${u} は学校の地図にない`);
  }
}

checkEdges("a", axisUnits("a"), AXIS_A.edges, AXIS_A.lines.map((l) => l.id));
checkEdges("b", axisUnits("b"), AXIS_B.edges, AXIS_B.themes.map((t) => t.id));
checkEdges("c", axisUnits("c"), AXIS_C.edges, AXIS_C.lines.map((l) => l.id));

for (const n of AXIS_A.nodes) if (!AXIS_A.lines.some((l) => l.id === n.line)) errors.push(`a: ${n.unit} の線 ${n.line} がない`);
for (const t of AXIS_B.themes)
  for (const m of t.members) if (meta[m.unit] && meta[m.unit].ring !== m.ring) errors.push(`b: ${m.unit} の輪 ${m.ring} が学年 (${meta[m.unit].where} → ${meta[m.unit].ring}) と合わない`);
const bCount = new Map<string, number>();
for (const t of AXIS_B.themes) for (const m of t.members) bCount.set(m.unit, (bCount.get(m.unit) ?? 0) + 1);
for (const [u, c] of bCount) if (c > 2) errors.push(`b: ${u} が3つ以上のテーマにある`);
for (const n of AXIS_C.nodes) {
  if (meta[n.unit] && meta[n.unit].stage !== n.stage) errors.push(`c: ${n.unit} の段階 ${n.stage} が学校の地図 (${meta[n.unit].stage}) と合わない`);
  if (!AXIS_C.eras.some((e) => e.id === n.era)) errors.push(`c: ${n.unit} の時代 ${n.era} がない`);
  for (const l of n.lines) if (!AXIS_C.lines.some((x) => x.id === l)) errors.push(`c: ${n.unit} の線 ${l} がない`);
}

const boards = [boardA(meta), boardB(), boardC()];
for (const b of boards) checkOverlap(b);
// A: 同じマスに2つ置かない
const cells = new Set<string>();
for (const n of boards[0].nodes) {
  const k = `${n.x},${n.y}`;
  if (cells.has(k)) errors.push(`a: 同じマスに2つ ${n.unit}`);
  cells.add(k);
}

for (const b of boards) {
  const bridges = b.edges.filter((e) => e.kind === "bridge").length;
  console.log(`${b.axis.toUpperCase()}: ノード ${b.nodes.length}・線 ${b.edges.length} (うち橋 ${bridges})・交差点 ${b.nodes.filter((n) => n.junction).length}`);
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("OK");
