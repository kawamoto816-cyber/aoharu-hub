import { termSet } from "../meta";
import { KO_BUTSUKA } from "../data/ko_butsuka";
import { KO_SEIBUTSU } from "../data/ko_seibutsu";
import { KO_CHIGAKU } from "../data/ko_chigaku";

export const SET = termSet(
  "ko-rika",
  "高校理科",
  "理科　物理・化学・生物・地学",
  [...KO_BUTSUKA, ...KO_SEIBUTSU, ...KO_CHIGAKU],
);
