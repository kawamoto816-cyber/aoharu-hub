import type { Lecture } from "@/lib/lecture/types";
import { E_MATH_1_KURIAGARI } from "@/lib/lecture/data/e-math-1-kuriagari";
import { J_MATH_1_SEIFU } from "@/lib/lecture/data/j-math-1-seifu";
import { J_MATH_1_HOTEISHIKI } from "@/lib/lecture/data/j-math-1-hoteishiki";
import { J_SCI_1_KAZAN } from "@/lib/lecture/data/j-sci-1-kazan";
import { J_SOC_HIST_KAMAKURA } from "@/lib/lecture/data/j-soc-hist-kamakura";
import { OSHIERU_SETS } from "./data";
import type { OshieruSet } from "./types";

// オシエル（AIの生徒ハルに教える）。/learn/oshieru/<単元id>。まだ公開していない（noindex・ほかのページからリンクしない）。
// サーバー（API）からも読むので、lib/lecture の索引（全単元）は読みこまない。
// 誤解セット (data/) と、正しさのものさしにする図解レクチャー (lib/lecture/data/) を単元ごとに組にする。

export const OSHIERU_HOME = "/learn/oshieru";
export const oshieruHref = (unit: string) => `${OSHIERU_HOME}/${unit}`;

const LECTURE_OF: Record<string, Lecture> = {
  "e-math-1-kuriagari": E_MATH_1_KURIAGARI,
  "j-math-1-seifu": J_MATH_1_SEIFU,
  "j-math-1-hoteishiki": J_MATH_1_HOTEISHIKI,
  "j-sci-1-kazan": J_SCI_1_KAZAN,
  "j-soc-hist-kamakura": J_SOC_HIST_KAMAKURA,
};

const BY_UNIT = new Map(OSHIERU_SETS.map((s) => [s.unit, s]));

export const OSHIERU_UNITS = OSHIERU_SETS.map((s) => s.unit);

export interface OshieruUnit {
  set: OshieruSet;
  lecture: Lecture;
}

export function getOshieru(unit: string): OshieruUnit | undefined {
  const set = BY_UNIT.get(unit);
  const lecture = LECTURE_OF[unit];
  if (!set || !lecture) return undefined;
  return { set, lecture };
}

/** {{ }} の強調の印を外す */
export const plain = (s: string) => s.replace(/\{\{|\}\}/g, "").replace(/《[^》]*》/g, "");
