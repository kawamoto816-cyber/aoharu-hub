import { termSet } from "../meta";
import { KO_CHIRI } from "../data/ko_chiri";
import { KO_NIHONSHI } from "../data/ko_nihonshi";
import { KO_SEKAISHI } from "../data/ko_sekaishi";

export const SET = termSet(
  "ko-chireki",
  "高校地理歴史",
  "地理歴史　地理・歴史総合・日本史・世界史",
  [...KO_CHIRI, ...KO_NIHONSHI, ...KO_SEKAISHI],
);
