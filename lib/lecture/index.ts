import { LEVELS } from "@/lib/school";
import type { Lecture } from "./types";
import { REGISTRY } from "./registry";

// 図解レクチャー (/learn/lecture/<単元id>)。単元を足すときは data/<単元id>.ts を書いて `npx tsx scripts/gen-lectures.ts` を実行する (registry.ts を作り直す)。

export const LECTURES: Lecture[] = REGISTRY;

const BY_UNIT = new Map(LECTURES.map((l) => [l.unit, l]));

export const getLecture = (unit: string) => BY_UNIT.get(unit);
export const hasLecture = (unit: string) => BY_UNIT.has(unit);
export const lectureHref = (unit: string) => `/learn/lecture/${unit}`;

/** 学校の地図から引いた単元の情報 (単元名・学年や科目・教科・学校段階)。 */
export interface LectureUnitInfo {
  name: string;
  group: string;
  subject: string;
  level: string;
}

const INFO = new Map<string, LectureUnitInfo>();
for (const l of LEVELS)
  for (const s of l.subjects)
    for (const g of s.groups) for (const u of g.units) INFO.set(u.id, { name: u.name, group: g.title, subject: s.name, level: l.name });

export const lectureUnitInfo = (unit: string): LectureUnitInfo | undefined => INFO.get(unit);
