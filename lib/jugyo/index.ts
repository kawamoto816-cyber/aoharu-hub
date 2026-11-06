import type { CastScript, Lesson, Scene, UnitBase } from "./types";
import { getCast, stageOf } from "./cast";
import { WARIAI_BASE } from "./data/e-math-5-wariai";
import { WARIAI_E_POP } from "./data/e-math-5-wariai.e-pop";
import { WARIAI_E_YASASHI } from "./data/e-math-5-wariai.e-yasashi";
import { HAYASA_BASE } from "./data/e-math-5-hayasa";
import { HAYASA_E_POP } from "./data/e-math-5-hayasa.e-pop";
import { HAYASA_E_YASASHI } from "./data/e-math-5-hayasa.e-yasashi";
import { BUNSU_WARI_BASE } from "./data/e-math-6-bunsu-wari";
import { BUNSU_WARI_E_POP } from "./data/e-math-6-bunsu-wari.e-pop";
import { BUNSU_WARI_E_YASASHI } from "./data/e-math-6-bunsu-wari.e-yasashi";
import { FURIKO_BASE } from "./data/e-science-5-furiko";
import { FURIKO_E_POP } from "./data/e-science-5-furiko.e-pop";
import { FURIKO_E_YASASHI } from "./data/e-science-5-furiko.e-yasashi";
import { KAMAKURA_BASE } from "./data/j-soc-hist-kamakura";
import { KAMAKURA_J_DARK } from "./data/j-soc-hist-kamakura.j-dark";
import { KAMAKURA_J_KISAKU } from "./data/j-soc-hist-kamakura.j-kisaku";
import { SEIFU_BASE } from "./data/j-math-1-seifu";
import { SEIFU_J_DARK } from "./data/j-math-1-seifu.j-dark";
import { SEIFU_J_KISAKU } from "./data/j-math-1-seifu.j-kisaku";
import { DENRYU_BASE } from "./data/j-sci-2-denryu";
import { DENRYU_J_DARK } from "./data/j-sci-2-denryu.j-dark";
import { DENRYU_J_KISAKU } from "./data/j-sci-2-denryu.j-kisaku";
import { FUTEISHI_BASE } from "./data/j-en-2-futeishi";
import { FUTEISHI_J_DARK } from "./data/j-en-2-futeishi.j-dark";
import { FUTEISHI_J_KISAKU } from "./data/j-en-2-futeishi.j-kisaku";
import { TAISHA_BASE } from "./data/h-sci-biob-taisha";
import { TAISHA_H_CHARISMA } from "./data/h-sci-biob-taisha.h-charisma";
import { TAISHA_H_KYOJU } from "./data/h-sci-biob-taisha.h-kyoju";
import { TAISHA_H_NEKKETSU } from "./data/h-sci-biob-taisha.h-nekketsu";

// 止まる授業（動画型・試作）。/learn/jugyo と /learn/jugyo/<単元id>（?cast=<キャストid> で確認用に指定）。試作なので noindex・sitemap に入れない。
// 台本を足すとき：単元の骨組み data/<単元id>.ts（問題）と、キャストごとのせりふ data/<単元id>.<キャストid>.ts を書いて
// ここに並べ、`npx tsx scripts/check-jugyo.ts` で点検する。

export const JUGYO_HOME = "/learn/jugyo";

const BASES: UnitBase[] = [WARIAI_BASE, HAYASA_BASE, BUNSU_WARI_BASE, FURIKO_BASE, KAMAKURA_BASE, SEIFU_BASE, DENRYU_BASE, FUTEISHI_BASE, TAISHA_BASE];
const SCRIPTS: CastScript[] = [
  WARIAI_E_POP, WARIAI_E_YASASHI, HAYASA_E_POP, HAYASA_E_YASASHI, BUNSU_WARI_E_POP, BUNSU_WARI_E_YASASHI, FURIKO_E_POP, FURIKO_E_YASASHI,
  KAMAKURA_J_DARK, KAMAKURA_J_KISAKU, SEIFU_J_DARK, SEIFU_J_KISAKU, DENRYU_J_DARK, DENRYU_J_KISAKU, FUTEISHI_J_DARK, FUTEISHI_J_KISAKU,
  TAISHA_H_CHARISMA, TAISHA_H_KYOJU, TAISHA_H_NEKKETSU,
];

/** 骨組みとキャストのせりふを合わせて1本の授業にする（問題の {seito} は相方の名前に） */
export function buildLesson(base: UnitBase, script: CastScript): Lesson {
  const cast = getCast(script.castId);
  if (!cast) throw new Error(`キャスト ${script.castId} がない`);
  const scenes: Scene[] = script.scenes.map((s) => {
    if (s.kind !== "pause") return s;
    const p = base.pauses[s.ref];
    if (!p) throw new Error(`${script.unitId}: 問題 ${s.ref} が骨組みにない`);
    const who = (t: string) => t.replaceAll("{seito}", cast.members.seito.name);
    return { kind: "pause", source: s.ref, ...p, question: who(p.question), say: p.say && { ...p.say, question: p.say.question && who(p.say.question) } };
  });
  return { unitId: script.unitId, stage: stageOf(script.unitId), title: script.title, cast, scenes };
}

const BASE_OF = new Map(BASES.map((b) => [b.unitId, b]));
/** すべての授業（単元 × キャスト） */
export const LESSONS: Lesson[] = SCRIPTS.map((s) => {
  const b = BASE_OF.get(s.unitId);
  if (!b) throw new Error(`単元 ${s.unitId} の骨組みがない`);
  return buildLesson(b, s);
});
/** 単元 id（並び順） */
export const UNITS: string[] = [...new Set(LESSONS.map((l) => l.unitId))];

/** 単元の授業（キャストの数だけ） */
export const getLessons = (unit: string) => LESSONS.filter((l) => l.unitId === unit);
export const getLesson = (unit: string, castId: string) => LESSONS.find((l) => l.unitId === unit && l.cast.id === castId);
export const jugyoHref = (unit: string) => `${JUGYO_HOME}/${unit}`;

/** 1分に話す字数の目安 */
export const CHARS_PER_MIN = 300;
