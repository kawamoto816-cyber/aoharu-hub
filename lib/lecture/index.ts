import { LEVELS } from "@/lib/school";
import type { Lecture } from "./types";
import { J_MATH_1_SEIFU } from "./data/j-math-1-seifu";
import { E_MATH_5_WARIAI } from "./data/e-math-5-wariai";
import { J_SCI_2_DENRYU } from "./data/j-sci-2-denryu";
import { J_SOC_HIST_KAMAKURA } from "./data/j-soc-hist-kamakura";
import { J_EN_1_BE } from "./data/j-en-1-be";
import { H_SCI_BIOB_HATSUGEN } from "./data/h-sci-biob-hatsugen";

// 図解レクチャー (/learn/lecture/<単元id>)。単元を足すときは data/<単元id>.ts を書いて、ここの LECTURES に1行足す。

export const LECTURES: Lecture[] = [E_MATH_5_WARIAI, J_MATH_1_SEIFU, J_SCI_2_DENRYU, J_SOC_HIST_KAMAKURA, J_EN_1_BE, H_SCI_BIOB_HATSUGEN];

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
