import { LEVELS } from "@/lib/school";
import type { TermItem, TermUnit } from "./types";

// 重要語句カードの共通部分 (データを含まない)。ブラウザ側はセットごとに lib/terms/sets/* を読みこむ。

export type TermSetKey = "rika" | "shakai" | "chu-rika" | "chu-shakai" | "ko-rika" | "ko-chireki" | "ko-komin" | "ko-joho";

export interface TermSet {
  key: TermSetKey;
  name: string;
  /** 見出しの上の小さな文字 */
  eyebrow: string;
  units: TermUnit[];
}

export const termSet = (key: TermSetKey, name: string, eyebrow: string, units: TermUnit[]): TermSet => ({ key, name, eyebrow, units });

const UNIT_INFO = new Map<string, { name: string; group: string }>();
for (const l of LEVELS) for (const s of l.subjects) for (const g of s.groups) for (const u of g.units) UNIT_INFO.set(u.id, { name: u.name, group: g.title });

export const unitName = (id: string) => UNIT_INFO.get(id)?.name ?? id;
/** 地図のグループ名 (小5・中2・地理的分野・生物基礎 など) */
export const unitGroup = (id: string) => UNIT_INFO.get(id)?.group ?? "";
/** セットの中のグループ (地図の順) */
export const setGroups = (s: TermSet) => [...new Set(s.units.map((u) => unitGroup(u.unit)))];

export const termId = (unit: string, t: TermItem) => `${unit}:${t.t}`;
export const termCount = (s: TermSet) => s.units.reduce((n, u) => n + u.items.length, 0);

export function findTerm(s: TermSet, id: string): { unit: string; item: TermItem } | undefined {
  const [unit, ...rest] = id.split(":");
  const t = rest.join(":");
  const item = s.units.find((x) => x.unit === unit)?.items.find((x) => x.t === t);
  return item ? { unit, item } : undefined;
}
