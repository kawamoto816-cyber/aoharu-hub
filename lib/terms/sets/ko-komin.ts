import { termSet } from "../meta";
import { KO_RINRI } from "../data/ko_rinri";
import { KO_SEIKEI } from "../data/ko_seikei";

export const SET = termSet(
  "ko-komin",
  "高校公民",
  "公民　公共・倫理・政治経済",
  [...KO_RINRI, ...KO_SEIKEI],
);
