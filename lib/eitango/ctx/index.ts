import { CTX01 } from "./ctx01";
import { CTX02 } from "./ctx02";
import { CTX03 } from "./ctx03";
import { CTX04 } from "./ctx04";
import { CTX05 } from "./ctx05";
import { CTX06 } from "./ctx06";
import { CTX07 } from "./ctx07";
import { CTX08 } from "./ctx08";
import { CTX09 } from "./ctx09";
import { CTX10 } from "./ctx10";
import { CTX11 } from "./ctx11";
import { CTX12 } from "./ctx12";
import { CTX13 } from "./ctx13";
import { CTX14 } from "./ctx14";
import { CTX15 } from "./ctx15";
import { CTX16 } from "./ctx16";
import { CTX17 } from "./ctx17";
import { CTX18 } from "./ctx18";
import { CTX19 } from "./ctx19";
import { CTX20 } from "./ctx20";

export interface CtxEntry {
  no: number;
  /** 見出し語の場所を ___ にした英文 (見出し語をそのまま入れると正しい文になる) */
  ctx: string;
  ja: string;
}

// 「鍛える・文脈」の空所補充。単語帳の例文とは別の英文。
export const CTX_DATA: Record<number, CtxEntry[]> = { 1: CTX01, 2: CTX02, 3: CTX03, 4: CTX04, 5: CTX05, 6: CTX06, 7: CTX07, 8: CTX08, 9: CTX09, 10: CTX10, 11: CTX11, 12: CTX12, 13: CTX13, 14: CTX14, 15: CTX15, 16: CTX16, 17: CTX17, 18: CTX18, 19: CTX19, 20: CTX20 };
