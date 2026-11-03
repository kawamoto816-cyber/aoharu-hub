import type { OshieruSet } from "../types";
import { OSHIERU_E_MATH_1_KURIAGARI } from "./e-math-1-kuriagari";
import { OSHIERU_J_MATH_1_SEIFU } from "./j-math-1-seifu";
import { OSHIERU_J_MATH_1_HOTEISHIKI } from "./j-math-1-hoteishiki";
import { OSHIERU_J_SCI_1_KAZAN } from "./j-sci-1-kazan";
import { OSHIERU_J_SOC_HIST_KAMAKURA } from "./j-soc-hist-kamakura";

// MVPの5単元の誤解セット。単元を足すときは data/<単元id>.ts を書いてここに並べる。
export const OSHIERU_SETS: OshieruSet[] = [
  OSHIERU_E_MATH_1_KURIAGARI,
  OSHIERU_J_MATH_1_SEIFU,
  OSHIERU_J_MATH_1_HOTEISHIKI,
  OSHIERU_J_SCI_1_KAZAN,
  OSHIERU_J_SOC_HIST_KAMAKURA,
];
