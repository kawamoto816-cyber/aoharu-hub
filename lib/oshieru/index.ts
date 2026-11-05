import type { Lecture } from "@/lib/lecture/types";
import { getLecture } from "@/lib/lecture";
import { OSHIERU_SETS } from "./data";
import type { OshieruSet } from "./types";

// オシエル（AIの生徒ハルに教える）。/learn/oshieru/<単元id>。図解レクチャーのページの「ハルに教える」から入る。
// 一覧 /learn/oshieru は noindex・サイトマップに入れない（代表の公開OKが出るまで）。
// 誤解セット (data/。手書き hand.ts ＋ 機械で作った gen.ts) と、正しさのものさしにする図解レクチャー (lib/lecture/data/) を単元ごとに組にする。

export const OSHIERU_HOME = "/learn/oshieru";
export const oshieruHref = (unit: string) => `${OSHIERU_HOME}/${unit}`;

const BY_UNIT = new Map(OSHIERU_SETS.map((s) => [s.unit, s]));

export const OSHIERU_UNITS = OSHIERU_SETS.map((s) => s.unit);

/** この単元でオシエルが使えるか（点検を通った誤解セットとレクチャーがある） */
export const hasOshieru = (unit: string) => BY_UNIT.has(unit) && !!getLecture(unit);

export interface OshieruUnit {
  set: OshieruSet;
  lecture: Lecture;
}

export function getOshieru(unit: string): OshieruUnit | undefined {
  const set = BY_UNIT.get(unit);
  const lecture = getLecture(unit);
  if (!set || !lecture) return undefined;
  return { set, lecture };
}

/** {{ }} の強調の印を外す */
export const plain = (s: string) => s.replace(/\{\{|\}\}/g, "").replace(/《[^》]*》/g, "");
