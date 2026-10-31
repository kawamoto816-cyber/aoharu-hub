import type { KanjiEntry } from "./types";
import { G1 } from "./data/g1";
import { G2 } from "./data/g2";
import { G3 } from "./data/g3";
import { G4 } from "./data/g4";
import { G5 } from "./data/g5";
import { G6 } from "./data/g6";

// 小学校の漢字1026字 (学年別漢字配当表、2020年度から)。id は漢字そのもの。

export const GRADES: { g: number; list: KanjiEntry[] }[] = [
  { g: 1, list: G1 },
  { g: 2, list: G2 },
  { g: 3, list: G3 },
  { g: 4, list: G4 },
  { g: 5, list: G5 },
  { g: 6, list: G6 },
];

export const ALL_KANJI: KanjiEntry[] = GRADES.flatMap((x) => x.list);
const BY = new Map(ALL_KANJI.map((e) => [e.k, e]));
const GRADE_OF = new Map(GRADES.flatMap((x) => x.list.map((e) => [e.k, x.g] as const)));

export const findKanji = (k: string) => BY.get(k);
export const gradeOf = (k: string) => GRADE_OF.get(k) ?? 0;
export const kanjiOfGrade = (g: number) => GRADES.find((x) => x.g === g)?.list ?? [];
