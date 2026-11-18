// さかのぼりのデータ（lib/sakanobori/data/*.ts）を点検する。
//   npx tsx scripts/check-sakanobori.ts [ファイル名の一部]
// 調べること: 単元 id がある / 全単元がそろっている / 前提が後の学校段階でない / 輪がない / why の字数 / mistakes の番号がレクチャーにある
import { readdirSync } from "node:fs";
import path from "node:path";
import { LECTURES, getLecture } from "../lib/lecture";
import type { PrereqUnit } from "../lib/sakanobori/types";

const filter = process.argv[2];
const dir = path.join(process.cwd(), "lib/sakanobori/data");
const STAGE: Record<string, number> = { e: 0, j: 1, h: 2 };
const stage = (u: string) => STAGE[u[0]] ?? 9;

async function main() {
  const files = readdirSync(dir).filter((f) => f.endsWith(".ts") && (!filter || f.includes(filter)));
  const all: PrereqUnit[] = [];
  let errors = 0;
  const err = (m: string) => {
    errors++;
    console.log("✕ " + m);
  };
  for (const f of files) {
    const mod = (await import(path.join(dir, f))) as Record<string, unknown>;
    for (const v of Object.values(mod)) if (Array.isArray(v)) all.push(...(v as PrereqUnit[]));
  }
  const ids = new Set(LECTURES.map((l) => l.unit));
  const seen = new Map<string, PrereqUnit>();
  for (const p of all) {
    if (!ids.has(p.unit)) err(`${p.unit}: レクチャーにない単元`);
    if (seen.has(p.unit)) err(`${p.unit}: 2回書かれている`);
    seen.set(p.unit, p);
    if (!Array.isArray(p.needs) || p.needs.length > 4) err(`${p.unit}: needs は0〜4個`);
    for (const n of p.needs ?? []) {
      if (!ids.has(n.unit)) err(`${p.unit}: needs の ${n.unit} がない`);
      if (n.unit === p.unit) err(`${p.unit}: 自分自身を needs に書いている`);
      if (stage(n.unit) > stage(p.unit)) err(`${p.unit}: needs の ${n.unit} が後の学校段階`);
      if (!n.why || [...n.why].length > 40) err(`${p.unit} → ${n.unit}: why が空か40字をこえる`);
    }
    const lec = getLecture(p.unit);
    for (const m of p.mistakes ?? []) {
      if (!lec || m.i < 0 || m.i >= lec.mistakes.length) err(`${p.unit}: mistakes[${m.i}] がレクチャーにない`);
      if (!ids.has(m.root)) err(`${p.unit}: mistakes[${m.i}] の root ${m.root} がない`);
      if (stage(m.root) > stage(p.unit)) err(`${p.unit}: mistakes[${m.i}] の root ${m.root} が後の学校段階`);
      if (!m.why || [...m.why].length > 40) err(`${p.unit}: mistakes[${m.i}] の why が空か40字をこえる`);
    }
  }
  // 輪
  const color = new Map<string, number>();
  const visit = (u: string, trail: string[]): void => {
    const c = color.get(u);
    if (c === 1) {
      err(`輪: ${[...trail.slice(trail.indexOf(u)), u].join(" → ")}`);
      return;
    }
    if (c === 2) return;
    color.set(u, 1);
    for (const n of seen.get(u)?.needs ?? []) visit(n.unit, [...trail, u]);
    color.set(u, 2);
  };
  for (const u of seen.keys()) visit(u, []);
  if (!filter) {
    const missing = [...ids].filter((u) => !seen.has(u));
    if (missing.length) err(`データのない単元 ${missing.length}: ${missing.slice(0, 20).join(", ")}${missing.length > 20 ? " …" : ""}`);
  }
  const needs = all.reduce((s, p) => s + p.needs.length, 0);
  const ms = all.reduce((s, p) => s + (p.mistakes?.length ?? 0), 0);
  console.log(`単元 ${all.length}・前提 ${needs}・まちがいの根っこ ${ms}・エラー ${errors}`);
  if (errors) process.exit(1);
}
main();
