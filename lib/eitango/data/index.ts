import type { WordEntry } from "../types";
import { STAGE01 } from "./stage01";
import { STAGE02 } from "./stage02";
import { STAGE03 } from "./stage03";
import { STAGE04 } from "./stage04";
import { STAGE05 } from "./stage05";
import { STAGE06 } from "./stage06";
import { STAGE07 } from "./stage07";
import { STAGE08 } from "./stage08";
import { STAGE09 } from "./stage09";
import { STAGE10 } from "./stage10";
import { STAGE11 } from "./stage11";
import { STAGE12 } from "./stage12";
import { STAGE13 } from "./stage13";
import { STAGE14 } from "./stage14";
import { STAGE15 } from "./stage15";
import { STAGE16 } from "./stage16";
import { STAGE17 } from "./stage17";
import { STAGE18 } from "./stage18";
import { STAGE19 } from "./stage19";
import { STAGE20 } from "./stage20";

// 公開しているステージ。ステージを足したらここに1行足す。
export const STAGE_DATA: Record<number, WordEntry[]> = {
  1: STAGE01,
  2: STAGE02,
  3: STAGE03,
  4: STAGE04,
  5: STAGE05,
  6: STAGE06,
  7: STAGE07,
  8: STAGE08,
  9: STAGE09,
  10: STAGE10,
  11: STAGE11,
  12: STAGE12,
  13: STAGE13,
  14: STAGE14,
  15: STAGE15,
  16: STAGE16,
  17: STAGE17,
  18: STAGE18,
  19: STAGE19,
  20: STAGE20,
};
