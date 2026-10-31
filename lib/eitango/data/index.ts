import type { WordEntry } from "../types";
import { STAGE01 } from "./stage01";
import { STAGE02 } from "./stage02";
import { STAGE03 } from "./stage03";
import { STAGE04 } from "./stage04";

// 公開しているステージ。ステージを足したらここに1行足す。
export const STAGE_DATA: Record<number, WordEntry[]> = { 1: STAGE01, 2: STAGE02, 3: STAGE03, 4: STAGE04 };
