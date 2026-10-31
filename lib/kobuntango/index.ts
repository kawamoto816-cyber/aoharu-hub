import { KOBUN_1 } from "./kobun1";
import { KOBUN_2 } from "./kobun2";
import type { KobunWord } from "./types";

// 古文単語300。No.1〜150 最重要、No.151〜300 重要。カードの id は番号。
export const KOBUN_WORDS: KobunWord[] = [...KOBUN_1, ...KOBUN_2];
export const KOBUN_GROUPS = [
  { key: "1", title: "No.1〜100", from: 1, to: 100 },
  { key: "2", title: "No.101〜200", from: 101, to: 200 },
  { key: "3", title: "No.201〜300", from: 201, to: 300 },
];
