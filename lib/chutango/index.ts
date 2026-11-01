import { CHU_G1 } from "./g1";
import { CHU_G2 } from "./g2";
import { CHU_G3 } from "./g3";
import type { ChuWord } from "./types";

// 中学英単語1200 (中1・中2・中3 各400)。カードの id は番号。
export const CHU_WORDS: ChuWord[] = [...CHU_G1, ...CHU_G2, ...CHU_G3];
