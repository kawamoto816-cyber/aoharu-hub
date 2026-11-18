import type { MistakeRoot, PrereqNeed, PrereqUnit } from "./types";
import { PREREQ_MATH } from "./data/math";
import { PREREQ_SCI } from "./data/sci";
import { PREREQ_JA } from "./data/ja";
import { PREREQ_ENG } from "./data/eng";
import { PREREQ_SOC } from "./data/soc";
import { PREREQ_SOCH } from "./data/soch";

// さかのぼり（学年をこえて、つまずきの根っこまで戻す）のデータの入口。
// データは lib/sakanobori/data/<教科のまとまり>.ts（別に書いている途中のこともある）。ここは配列をまとめて引くだけ。
// データがまだ空・単元が足りなくても動く（needs が分からない単元は「前提なし」として扱う）。
// 依存はデータと型だけ（サーバーでもクライアントでも使える）。診断の本体は ./diagnose.ts。

export type { MistakeRoot, PrereqNeed, PrereqUnit } from "./types";

export const SAKANOBORI_HOME = "/learn/sakanobori";

/** 6つのデータをまとめたもの（同じ単元が2回あれば先のものを使う） */
export const PREREQ: PrereqUnit[] = [PREREQ_MATH, PREREQ_SCI, PREREQ_JA, PREREQ_ENG, PREREQ_SOC, PREREQ_SOCH].flatMap((a) => (Array.isArray(a) ? a : []));

const BY_UNIT = new Map<string, PrereqUnit>();
for (const p of PREREQ) if (p && typeof p.unit === "string" && !BY_UNIT.has(p.unit)) BY_UNIT.set(p.unit, p);

export const prereqOf = (unit: string): PrereqUnit | undefined => BY_UNIT.get(unit);
export const hasPrereq = (unit: string) => BY_UNIT.has(unit);
/** データのある単元 */
export const prereqUnits = (): string[] => [...BY_UNIT.keys()];

/** 直前の前提（なければ空） */
export function needsOf(unit: string): PrereqNeed[] {
  const p = BY_UNIT.get(unit);
  return (p?.needs ?? []).filter((n) => n && n.unit && n.unit !== unit);
}

/** レクチャーの「よくあるまちがい」i 番の原因の単元（書いてなければ undefined） */
export function mistakeRoot(unit: string, i: number): MistakeRoot | undefined {
  return BY_UNIT.get(unit)?.mistakes?.find((m) => m.i === i);
}

/** なぜ need が unit の前提か（データの why） */
export const whyNeed = (unit: string, need: string): string | undefined => needsOf(unit).find((n) => n.unit === need)?.why;

export interface ChainNode {
  unit: string;
  /** unit からの段数（直前の前提が 1） */
  depth: number;
  /** どの単元の前提としてたどったか */
  via: string;
  why: string;
}

/** 前提を depth 段までたどる（幅優先・同じ単元は1度だけ）。輪があっても止まる */
export function prereqChain(unit: string, depth = 4): ChainNode[] {
  const out: ChainNode[] = [];
  const seen = new Set([unit]);
  let layer = [unit];
  for (let d = 1; d <= depth && layer.length; d++) {
    const next: string[] = [];
    for (const u of layer)
      for (const n of needsOf(u)) {
        if (seen.has(n.unit)) continue;
        seen.add(n.unit);
        out.push({ unit: n.unit, depth: d, via: u, why: n.why });
        next.push(n.unit);
      }
    layer = next;
  }
  return out;
}

/** unit を前提にしている単元（上り道で使う） */
export function dependentsOf(unit: string): string[] {
  return PREREQ.filter((p) => p.needs?.some((n) => n.unit === unit)).map((p) => p.unit);
}

/** 単元 id の学校段階（e=小・j=中・h=高） */
export const stageOf = (unit: string): number => ({ e: 0, j: 1, h: 2 })[unit[0] as "e" | "j" | "h"] ?? 9;
