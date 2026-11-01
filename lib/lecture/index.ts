import { LEVELS } from "@/lib/school";
import type { Lecture } from "./types";
import { E_MATH_5_HAYASA } from "./data/e-math-5-hayasa";
import { E_MATH_5_WARIAI } from "./data/e-math-5-wariai";
import { E_MATH_6_BUNSU_WARI } from "./data/e-math-6-bunsu-wari";
import { E_MATH_6_HI } from "./data/e-math-6-hi";
import { H_ENG_GRAM_BUNSHIKOBUN } from "./data/h-eng-gram-bunshikobun";
import { H_ENG_GRAM_FUTEISHI } from "./data/h-eng-gram-futeishi";
import { H_ENG_GRAM_JISEI } from "./data/h-eng-gram-jisei";
import { H_ENG_GRAM_KANDAI } from "./data/h-eng-gram-kandai";
import { H_ENG_GRAM_KANRYO } from "./data/h-eng-gram-kanryo";
import { H_ENG_GRAM_KATEIHO } from "./data/h-eng-gram-kateiho";
import { H_SCI_BIOB_HATSUGEN } from "./data/h-sci-biob-hatsugen";
import { H_SCI_CHEMB_MOL } from "./data/h-sci-chemb-mol";
import { H_SCI_CHEMB_SANKA } from "./data/h-sci-chemb-sanka";
import { J_EN_1_BE } from "./data/j-en-1-be";
import { J_EN_1_IPPAN } from "./data/j-en-1-ippan";
import { J_EN_1_KAKOKEI } from "./data/j-en-1-kakokei";
import { J_EN_2_FUTEISHI } from "./data/j-en-2-futeishi";
import { J_EN_2_HIKAKU } from "./data/j-en-2-hikaku";
import { J_EN_3_KANKEI } from "./data/j-en-3-kankei";
import { J_EN_3_KANRYO } from "./data/j-en-3-kanryo";
import { J_MATH_1_HIREI } from "./data/j-math-1-hirei";
import { J_MATH_1_HOTEISHIKI } from "./data/j-math-1-hoteishiki";
import { J_MATH_1_MOJI } from "./data/j-math-1-moji";
import { J_MATH_1_SEIFU } from "./data/j-math-1-seifu";
import { J_MATH_2_HEIKO_GODO } from "./data/j-math-2-heiko-godo";
import { J_MATH_2_ICHIJI_KANSU } from "./data/j-math-2-ichiji-kansu";
import { J_MATH_2_RENRITSU } from "./data/j-math-2-renritsu";
import { J_MATH_3_NIJI_HOTEISHIKI } from "./data/j-math-3-niji-hoteishiki";
import { J_MATH_3_SANHEIHO } from "./data/j-math-3-sanheiho";
import { J_MATH_3_TENKAI } from "./data/j-math-3-tenkai";
import { J_SCI_1_HIKARI } from "./data/j-sci-1-hikari";
import { J_SCI_1_JOTAI } from "./data/j-sci-1-jotai";
import { J_SCI_1_SHOKUBUTSU_BUNRUI } from "./data/j-sci-1-shokubutsu-bunrui";
import { J_SCI_2_DENRYU } from "./data/j-sci-2-denryu";
import { J_SCI_2_DOBUTSU } from "./data/j-sci-2-dobutsu";
import { J_SCI_2_KAGAKU_HENKA } from "./data/j-sci-2-kagaku-henka";
import { J_SCI_2_TENKI } from "./data/j-sci-2-tenki";
import { J_SCI_3_CHUWA } from "./data/j-sci-3-chuwa";
import { J_SCI_3_IDEN } from "./data/j-sci-3-iden";
import { J_SCI_3_TENTAI } from "./data/j-sci-3-tentai";
import { J_SCI_3_UNDO } from "./data/j-sci-3-undo";
import { J_SOC_CIV_KENPO } from "./data/j-soc-civ-kenpo";
import { J_SOC_CIV_SAIBANSHO } from "./data/j-soc-civ-saibansho";
import { J_SOC_CIV_SHIJO } from "./data/j-soc-civ-shijo";
import { J_SOC_GEO_NIHON_SUGATA } from "./data/j-soc-geo-nihon-sugata";
import { J_SOC_GEO_NIHON_TOKUSHOKU } from "./data/j-soc-geo-nihon-tokushoku";
import { J_SOC_GEO_SEIKATSU } from "./data/j-soc-geo-seikatsu";
import { J_SOC_HIST_EDO_SEIRITSU } from "./data/j-soc-hist-edo-seiritsu";
import { J_SOC_HIST_KAMAKURA } from "./data/j-soc-hist-kamakura";
import { J_SOC_HIST_KODAI_KOKKA } from "./data/j-soc-hist-kodai-kokka";
import { J_SOC_HIST_MEIJI_ISHIN } from "./data/j-soc-hist-meiji-ishin";
import { J_SOC_HIST_MUROMACHI } from "./data/j-soc-hist-muromachi";
import { J_SOC_HIST_RIKKEN } from "./data/j-soc-hist-rikken";
import { J_SOC_HIST_TENKA_TOITSU } from "./data/j-soc-hist-tenka-toitsu";

// 図解レクチャー (/learn/lecture/<単元id>)。単元を足すときは data/<単元id>.ts を書いて、ここの LECTURES に1行足す。

export const LECTURES: Lecture[] = [
  E_MATH_5_HAYASA,
  E_MATH_5_WARIAI,
  E_MATH_6_BUNSU_WARI,
  E_MATH_6_HI,
  H_ENG_GRAM_BUNSHIKOBUN,
  H_ENG_GRAM_FUTEISHI,
  H_ENG_GRAM_JISEI,
  H_ENG_GRAM_KANDAI,
  H_ENG_GRAM_KANRYO,
  H_ENG_GRAM_KATEIHO,
  H_SCI_BIOB_HATSUGEN,
  H_SCI_CHEMB_MOL,
  H_SCI_CHEMB_SANKA,
  J_EN_1_BE,
  J_EN_1_IPPAN,
  J_EN_1_KAKOKEI,
  J_EN_2_FUTEISHI,
  J_EN_2_HIKAKU,
  J_EN_3_KANKEI,
  J_EN_3_KANRYO,
  J_MATH_1_HIREI,
  J_MATH_1_HOTEISHIKI,
  J_MATH_1_MOJI,
  J_MATH_1_SEIFU,
  J_MATH_2_HEIKO_GODO,
  J_MATH_2_ICHIJI_KANSU,
  J_MATH_2_RENRITSU,
  J_MATH_3_NIJI_HOTEISHIKI,
  J_MATH_3_SANHEIHO,
  J_MATH_3_TENKAI,
  J_SCI_1_HIKARI,
  J_SCI_1_JOTAI,
  J_SCI_1_SHOKUBUTSU_BUNRUI,
  J_SCI_2_DENRYU,
  J_SCI_2_DOBUTSU,
  J_SCI_2_KAGAKU_HENKA,
  J_SCI_2_TENKI,
  J_SCI_3_CHUWA,
  J_SCI_3_IDEN,
  J_SCI_3_TENTAI,
  J_SCI_3_UNDO,
  J_SOC_CIV_KENPO,
  J_SOC_CIV_SAIBANSHO,
  J_SOC_CIV_SHIJO,
  J_SOC_GEO_NIHON_SUGATA,
  J_SOC_GEO_NIHON_TOKUSHOKU,
  J_SOC_GEO_SEIKATSU,
  J_SOC_HIST_EDO_SEIRITSU,
  J_SOC_HIST_KAMAKURA,
  J_SOC_HIST_KODAI_KOKKA,
  J_SOC_HIST_MEIJI_ISHIN,
  J_SOC_HIST_MUROMACHI,
  J_SOC_HIST_RIKKEN,
  J_SOC_HIST_TENKA_TOITSU,
];

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
