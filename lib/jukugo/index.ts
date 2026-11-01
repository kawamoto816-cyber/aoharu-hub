import { JUKUGO_1 } from "./data1";
import { JUKUGO_2 } from "./data2";
import type { Jukugo } from "./types";

// 英熟語500 (No.1〜250 最頻出、251〜500 頻出)。カードの id は番号。
export const JUKUGO: Jukugo[] = [...JUKUGO_1, ...JUKUGO_2];
