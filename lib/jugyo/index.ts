import type { Lesson } from "./types";
import { JUGYO_E_MATH_5_WARIAI } from "./data/e-math-5-wariai";
import { JUGYO_J_SOC_HIST_KAMAKURA } from "./data/j-soc-hist-kamakura";
import { JUGYO_H_SCI_BIOB_TAISHA } from "./data/h-sci-biob-taisha";

// 止まる授業（動画型・試作）。/learn/jugyo と /learn/jugyo/<単元id>。試作なので noindex・sitemap に入れない。
// 台本を足すときは data/<単元id>.ts を書いてここに並べ、`npx tsx scripts/check-jugyo.ts` で点検する。

export const JUGYO_HOME = "/learn/jugyo";
export const LESSONS: Lesson[] = [JUGYO_E_MATH_5_WARIAI, JUGYO_J_SOC_HIST_KAMAKURA, JUGYO_H_SCI_BIOB_TAISHA];

const BY_UNIT = new Map(LESSONS.map((l) => [l.unitId, l]));
export const getLesson = (unit: string) => BY_UNIT.get(unit);
export const jugyoHref = (unit: string) => `${JUGYO_HOME}/${unit}`;

/** 1分に話す字数の目安 */
export const CHARS_PER_MIN = 300;
