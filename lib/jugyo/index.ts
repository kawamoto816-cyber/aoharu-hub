import type { CastScript, Lesson, Scene, UnitBase } from "./types";
import { getCast, stageOf } from "./cast";
import { manzaiSay } from "@/lib/tts/manzai";
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
import { TAISEKI_BASE } from "./data/e-math-5-taiseki";
import { TAISEKI_E_POP } from "./data/e-math-5-taiseki.e-pop";
import { TAISEKI_E_YASASHI } from "./data/e-math-5-taiseki.e-yasashi";
import { MENSEKI_BASE } from "./data/e-math-5-menseki";
import { MENSEKI_E_POP } from "./data/e-math-5-menseki.e-pop";
import { MENSEKI_E_YASASHI } from "./data/e-math-5-menseki.e-yasashi";
import { HATSUGA_BASE } from "./data/e-science-5-hatsuga";
import { HATSUGA_E_POP } from "./data/e-science-5-hatsuga.e-pop";
import { HATSUGA_E_YASASHI } from "./data/e-science-5-hatsuga.e-yasashi";
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
import { HOTEISHIKI_BASE } from "./data/j-math-1-hoteishiki";
import { HOTEISHIKI_J_DARK } from "./data/j-math-1-hoteishiki.j-dark";
import { HOTEISHIKI_J_KISAKU } from "./data/j-math-1-hoteishiki.j-kisaku";
import { KAGAKU_HENKA_BASE } from "./data/j-sci-2-kagaku-henka";
import { KAGAKU_HENKA_J_DARK } from "./data/j-sci-2-kagaku-henka.j-dark";
import { KAGAKU_HENKA_J_KISAKU } from "./data/j-sci-2-kagaku-henka.j-kisaku";
import { EDO_SEIRITSU_BASE } from "./data/j-soc-hist-edo-seiritsu";
import { EDO_SEIRITSU_J_DARK } from "./data/j-soc-hist-edo-seiritsu.j-dark";
import { EDO_SEIRITSU_J_KISAKU } from "./data/j-soc-hist-edo-seiritsu.j-kisaku";
import { TAISHA_BASE } from "./data/h-sci-biob-taisha";
import { TAISHA_H_CHARISMA } from "./data/h-sci-biob-taisha.h-charisma";
import { TAISHA_H_KYOJU } from "./data/h-sci-biob-taisha.h-kyoju";
import { TAISHA_H_NEKKETSU } from "./data/h-sci-biob-taisha.h-nekketsu";
import { BIBUN_BASE } from "./data/h-math-2-bibun";
import { BIBUN_H_CHARISMA } from "./data/h-math-2-bibun.h-charisma";
import { BIBUN_H_KYOJU } from "./data/h-math-2-bibun.h-kyoju";
import { BIBUN_H_NEKKETSU } from "./data/h-math-2-bibun.h-nekketsu";
import { MOL_BASE } from "./data/h-sci-chemb-mol";
import { MOL_H_CHARISMA } from "./data/h-sci-chemb-mol.h-charisma";
import { MOL_H_KYOJU } from "./data/h-sci-chemb-mol.h-kyoju";
import { MOL_H_NEKKETSU } from "./data/h-sci-chemb-mol.h-nekketsu";
import { DOPPLER_BASE } from "./data/h-sci-phy-doppler";
import { DOPPLER_H_CHARISMA } from "./data/h-sci-phy-doppler.h-charisma";
import { DOPPLER_H_KYOJU } from "./data/h-sci-phy-doppler.h-kyoju";
import { DOPPLER_H_NEKKETSU } from "./data/h-sci-phy-doppler.h-nekketsu";

// 止まる授業（動画型・試作）。/learn/jugyo と /learn/jugyo/<単元id>（?cast=<キャストid> で確認用に指定。canonical は cast なし）。
// 検索に載せ、sitemap にも入れる（2026-11-06 代表の決定）。入口は教科の地図の単元の箱・単元の教科書のページ・まなぶのトップ。
// 台本を足すとき：単元の骨組み data/<単元id>.ts（問題）と、キャストごとのせりふ data/<単元id>.<キャストid>.ts を書いて
// ここに並べ、`npx tsx scripts/check-jugyo.ts` で点検する。

export const JUGYO_HOME = "/learn/jugyo";

const BASES: UnitBase[] = [WARIAI_BASE, HAYASA_BASE, BUNSU_WARI_BASE, FURIKO_BASE, TAISEKI_BASE, MENSEKI_BASE, HATSUGA_BASE, KAMAKURA_BASE, SEIFU_BASE, DENRYU_BASE, FUTEISHI_BASE, HOTEISHIKI_BASE, KAGAKU_HENKA_BASE, EDO_SEIRITSU_BASE, TAISHA_BASE, BIBUN_BASE, MOL_BASE, DOPPLER_BASE];
const SCRIPTS: CastScript[] = [
  WARIAI_E_POP, WARIAI_E_YASASHI, HAYASA_E_POP, HAYASA_E_YASASHI, BUNSU_WARI_E_POP, BUNSU_WARI_E_YASASHI, FURIKO_E_POP, FURIKO_E_YASASHI,
  TAISEKI_E_POP, TAISEKI_E_YASASHI, MENSEKI_E_POP, MENSEKI_E_YASASHI, HATSUGA_E_POP, HATSUGA_E_YASASHI,
  KAMAKURA_J_DARK, KAMAKURA_J_KISAKU, SEIFU_J_DARK, SEIFU_J_KISAKU, DENRYU_J_DARK, DENRYU_J_KISAKU, FUTEISHI_J_DARK, FUTEISHI_J_KISAKU,
  HOTEISHIKI_J_DARK, HOTEISHIKI_J_KISAKU, KAGAKU_HENKA_J_DARK, KAGAKU_HENKA_J_KISAKU, EDO_SEIRITSU_J_DARK, EDO_SEIRITSU_J_KISAKU,
  TAISHA_H_CHARISMA, TAISHA_H_KYOJU, TAISHA_H_NEKKETSU, BIBUN_H_CHARISMA, BIBUN_H_KYOJU, BIBUN_H_NEKKETSU,
  MOL_H_CHARISMA, MOL_H_KYOJU, MOL_H_NEKKETSU, DOPPLER_H_CHARISMA, DOPPLER_H_KYOJU, DOPPLER_H_NEKKETSU,
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

/** その単元に止まる授業があるか */
const UNIT_SET = new Set(UNITS);
export const hasJugyo = (unit: string) => UNIT_SET.has(unit);

/** 1本の授業の長さ（分。話す字数から）と止まる回数 */
export const lessonMinutes = (l: Lesson) => Math.round(l.scenes.reduce((n, s) => n + (s.kind === "talk" ? manzaiSay(s).length : 0), 0) / CHARS_PER_MIN);
export const lessonStops = (l: Lesson) => l.scenes.filter((s) => s.kind === "pause").length;

/** 単元の授業の「約N分・M回止まる」の N・M（キャストで違えば「8〜9」のように幅で） */
export function jugyoSpan(unit: string): { minutes: string; stops: string } | null {
  const ls = getLessons(unit);
  if (!ls.length) return null;
  const range = (a: number[]) => (Math.min(...a) === Math.max(...a) ? `${a[0]}` : `${Math.min(...a)}〜${Math.max(...a)}`);
  return { minutes: range(ls.map(lessonMinutes)), stops: range(ls.map(lessonStops)) };
}
