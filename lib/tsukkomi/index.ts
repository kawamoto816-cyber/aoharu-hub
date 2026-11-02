import type { Boke } from "./types";
import { J_SCI_2_DENRYU } from "./data/j-sci-2-denryu";
import { J_SCI_1_KAZAN } from "./data/j-sci-1-kazan";
import { J_MATH_1_SEIFU } from "./data/j-math-1-seifu";
import { J_MATH_2_ICHIJI_KANSU } from "./data/j-math-2-ichiji-kansu";
import { J_SOC_HIST_KAMAKURA } from "./data/j-soc-hist-kamakura";
import { J_SOC_GEO_ASIA } from "./data/j-soc-geo-asia";

// ツッコミ学習法のボケ（単元ごと）。単元を足すときは data/<単元>.ts を作って、ここに並べる。

export const TSUKKOMI_HOME = "/learn/tsukkomi";
export const tsukkomiHref = (unit: string) => `${TSUKKOMI_HOME}/${unit}`;

/** 単元 id → その単元のボケ。並び順が一覧の並び順（教科ごとにまとめて表示する） */
export const TSUKKOMI: Record<string, Boke[]> = {
  "j-math-1-seifu": J_MATH_1_SEIFU,
  "j-math-2-ichiji-kansu": J_MATH_2_ICHIJI_KANSU,
  "j-sci-1-kazan": J_SCI_1_KAZAN,
  "j-sci-2-denryu": J_SCI_2_DENRYU,
  "j-soc-geo-asia": J_SOC_GEO_ASIA,
  "j-soc-hist-kamakura": J_SOC_HIST_KAMAKURA,
};

export const TSUKKOMI_UNITS = Object.keys(TSUKKOMI);
export const getTsukkomi = (unit: string): Boke[] | undefined => TSUKKOMI[unit];
export const hasTsukkomi = (unit: string) => unit in TSUKKOMI;
