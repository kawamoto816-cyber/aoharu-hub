// 自動生成 (scripts/gen-moshi.ts)。手で書きかえない。
import type { Daimon } from "./types";
import { J_MATH_1_HOTEISHIKI } from "./data/j-math-1-hoteishiki";
import { J_MATH_1_MOJI } from "./data/j-math-1-moji";
import { J_MATH_1_SEIFU } from "./data/j-math-1-seifu";
import { J_MATH_2_RENRITSU } from "./data/j-math-2-renritsu";

/** ファイル名 (単元id) → その単元の大問 */
export const REGISTRY: Record<string, Daimon[]> = {
  "j-math-1-hoteishiki": J_MATH_1_HOTEISHIKI,
  "j-math-1-moji": J_MATH_1_MOJI,
  "j-math-1-seifu": J_MATH_1_SEIFU,
  "j-math-2-renritsu": J_MATH_2_RENRITSU,
};
