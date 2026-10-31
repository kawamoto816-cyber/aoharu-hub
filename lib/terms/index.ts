import { allUnits } from "@/lib/school";
import type { TermItem, TermUnit } from "./types";
import { SCIENCE_34 } from "./data/science34";
import { SCIENCE_56 } from "./data/science56";
import { SOCIAL_345 } from "./data/social345";
import { SOCIAL_6 } from "./data/social6";

// 理科・社会の「重要語句カード」。カードの id は「単元id:語句」。

export interface TermSet {
  key: "rika" | "shakai";
  name: string;
  units: TermUnit[];
}

export const TERM_SETS: Record<"rika" | "shakai", TermSet> = {
  rika: { key: "rika", name: "小学理科", units: [...SCIENCE_34, ...SCIENCE_56] },
  shakai: { key: "shakai", name: "小学社会", units: [...SOCIAL_345, ...SOCIAL_6] },
};

const UNIT_NAME = new Map(allUnits().map((u) => [u.id, u.name]));
export const unitName = (id: string) => UNIT_NAME.get(id) ?? id;
/** 単元 id (e-science-5-xxx) から学年 */
export const unitGrade = (id: string) => Number(id.split("-")[2]) || 0;

export const termId = (unit: string, t: TermItem) => `${unit}:${t.t}`;

export function findTerm(set: TermSet, id: string): { unit: string; item: TermItem } | undefined {
  const [unit, ...rest] = id.split(":");
  const t = rest.join(":");
  const u = set.units.find((x) => x.unit === unit);
  const item = u?.items.find((x) => x.t === t);
  return item ? { unit, item } : undefined;
}
