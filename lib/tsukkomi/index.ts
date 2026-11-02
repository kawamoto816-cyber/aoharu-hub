import type { Boke } from "./types";
import { J_SCI_2_DENRYU } from "./data/j-sci-2-denryu";
import { J_SCI_1_KAZAN } from "./data/j-sci-1-kazan";
import { J_MATH_1_SEIFU } from "./data/j-math-1-seifu";
import { J_MATH_2_ICHIJI_KANSU } from "./data/j-math-2-ichiji-kansu";
import { J_SOC_HIST_KAMAKURA } from "./data/j-soc-hist-kamakura";
import { J_SOC_GEO_ASIA } from "./data/j-soc-geo-asia";
import { J_MATH_1_HIREI } from "./data/j-math-1-hirei";
import { J_MATH_1_HOTEISHIKI } from "./data/j-math-1-hoteishiki";
import { J_MATH_2_KAKURITSU } from "./data/j-math-2-kakuritsu";
import { J_MATH_2_RENRITSU } from "./data/j-math-2-renritsu";
import { J_MATH_3_HEIHOKON } from "./data/j-math-3-heihokon";
import { J_MATH_3_SANHEIHO } from "./data/j-math-3-sanheiho";
import { J_SCI_1_HIKARI } from "./data/j-sci-1-hikari";
import { J_SCI_1_SUIYOEKI } from "./data/j-sci-1-suiyoeki";
import { J_SCI_2_KAGAKU_HENKA } from "./data/j-sci-2-kagaku-henka";
import { J_SCI_2_TENKI } from "./data/j-sci-2-tenki";
import { J_SCI_3_ION } from "./data/j-sci-3-ion";
import { J_SCI_3_UNDO } from "./data/j-sci-3-undo";
import { J_SOC_CIV_KENPO } from "./data/j-soc-civ-kenpo";
import { J_SOC_CIV_KOKKAI } from "./data/j-soc-civ-kokkai";
import { J_SOC_GEO_EUROPE } from "./data/j-soc-geo-europe";
import { J_SOC_GEO_NIHON_SUGATA } from "./data/j-soc-geo-nihon-sugata";
import { J_SOC_HIST_EDO_SEIRITSU } from "./data/j-soc-hist-edo-seiritsu";
import { J_SOC_HIST_MEIJI_ISHIN } from "./data/j-soc-hist-meiji-ishin";

// ツッコミ学習法のボケ（単元ごと）。単元を足すときは data/<単元>.ts を作って、ここに並べる。

export const TSUKKOMI_HOME = "/learn/tsukkomi";
export const tsukkomiHref = (unit: string) => `${TSUKKOMI_HOME}/${unit}`;

/** 単元 id → その単元のボケ。並び順が一覧の並び順（教科ごとにまとめて表示する） */
export const TSUKKOMI: Record<string, Boke[]> = {
  "j-math-1-hirei": J_MATH_1_HIREI,
  "j-math-1-hoteishiki": J_MATH_1_HOTEISHIKI,
  "j-math-1-seifu": J_MATH_1_SEIFU,
  "j-math-2-ichiji-kansu": J_MATH_2_ICHIJI_KANSU,
  "j-math-2-kakuritsu": J_MATH_2_KAKURITSU,
  "j-math-2-renritsu": J_MATH_2_RENRITSU,
  "j-math-3-heihokon": J_MATH_3_HEIHOKON,
  "j-math-3-sanheiho": J_MATH_3_SANHEIHO,
  "j-sci-1-hikari": J_SCI_1_HIKARI,
  "j-sci-1-kazan": J_SCI_1_KAZAN,
  "j-sci-1-suiyoeki": J_SCI_1_SUIYOEKI,
  "j-sci-2-denryu": J_SCI_2_DENRYU,
  "j-sci-2-kagaku-henka": J_SCI_2_KAGAKU_HENKA,
  "j-sci-2-tenki": J_SCI_2_TENKI,
  "j-sci-3-ion": J_SCI_3_ION,
  "j-sci-3-undo": J_SCI_3_UNDO,
  "j-soc-civ-kenpo": J_SOC_CIV_KENPO,
  "j-soc-civ-kokkai": J_SOC_CIV_KOKKAI,
  "j-soc-geo-asia": J_SOC_GEO_ASIA,
  "j-soc-geo-europe": J_SOC_GEO_EUROPE,
  "j-soc-geo-nihon-sugata": J_SOC_GEO_NIHON_SUGATA,
  "j-soc-hist-edo-seiritsu": J_SOC_HIST_EDO_SEIRITSU,
  "j-soc-hist-kamakura": J_SOC_HIST_KAMAKURA,
  "j-soc-hist-meiji-ishin": J_SOC_HIST_MEIJI_ISHIN,
};

export const TSUKKOMI_UNITS = Object.keys(TSUKKOMI);
export const getTsukkomi = (unit: string): Boke[] | undefined => TSUKKOMI[unit];
export const hasTsukkomi = (unit: string) => unit in TSUKKOMI;
