import type { OshieruSet } from "../types";
import { OSHIERU_E_MATH_1_KURIAGARI } from "./e-math-1-kuriagari";
import { OSHIERU_J_MATH_1_SEIFU } from "./j-math-1-seifu";
import { OSHIERU_J_MATH_1_HOTEISHIKI } from "./j-math-1-hoteishiki";
import { OSHIERU_J_SCI_1_KAZAN } from "./j-sci-1-kazan";
import { OSHIERU_J_SOC_HIST_KAMAKURA } from "./j-soc-hist-kamakura";
import { OSHIERU_H_MATH_2_SEKIBUN } from "./h-math-2-sekibun";
import { OSHIERU_H_MATH_B_SIGMA } from "./h-math-b-sigma";
import { OSHIERU_H_CIV_KOKYO_SEINEN } from "./h-civ-kokyo-seinen";

// 手で書いた誤解セット（MVPの5単元と、機械の型で作れない3単元）。機械で作るセット（gen.ts）より先に使う。
export const OSHIERU_HAND_SETS: OshieruSet[] = [
  OSHIERU_E_MATH_1_KURIAGARI,
  OSHIERU_J_MATH_1_SEIFU,
  OSHIERU_J_MATH_1_HOTEISHIKI,
  OSHIERU_J_SCI_1_KAZAN,
  OSHIERU_J_SOC_HIST_KAMAKURA,
  OSHIERU_H_MATH_2_SEKIBUN,
  OSHIERU_H_MATH_B_SIGMA,
  OSHIERU_H_CIV_KOKYO_SEINEN,
];
