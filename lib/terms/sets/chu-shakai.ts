import { termSet } from "../meta";
import { CHU_CHIRI } from "../data/chu_chiri";
import { CHU_REKISHI } from "../data/chu_rekishi";
import { CHU_KOMIN } from "../data/chu_komin";

export const SET = termSet("chu-shakai", "中学社会", "社会　地理・歴史・公民", [
  ...CHU_CHIRI,
  ...CHU_REKISHI,
  ...CHU_KOMIN,
]);
