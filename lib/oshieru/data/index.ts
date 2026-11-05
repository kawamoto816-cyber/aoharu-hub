import { getLecture, lectureUnitInfo } from "@/lib/lecture";
import { buildOshieruSet, fingerprint } from "../auto";
import type { OshieruSet } from "../types";
import { OSHIERU_GEN_UNITS } from "./gen";
import { OSHIERU_HAND_SETS } from "./hand";

// オシエルの誤解セット。手で書いたもの（hand.ts）を先に、機械で作ったもの（auto.ts）をあとに並べる。
//   機械で作るのは、scripts/gen-oshieru.ts で点検を通して gen.ts に書き出した単元だけ。作り直したものの指紋が gen.ts とちがう単元
//   （そのあとレクチャーが変わり、点検しなおしていない）は使わない。
//   手で足す：data/<単元id>.ts を書いて hand.ts に並べ、scripts/gen-oshieru.ts を実行しなおす（その単元は gen.ts から外れる）。
function genSets(): OshieruSet[] {
  const hand = new Set(OSHIERU_HAND_SETS.map((s) => s.unit));
  const out: OshieruSet[] = [];
  for (const [unit, fp] of Object.entries(OSHIERU_GEN_UNITS)) {
    const lec = getLecture(unit);
    if (!lec || hand.has(unit)) continue;
    const set = buildOshieruSet(lec, lectureUnitInfo(unit)?.name ?? lec.title);
    if (set && fingerprint(set) === fp) out.push(set);
  }
  return out;
}

export const OSHIERU_SETS: OshieruSet[] = [...OSHIERU_HAND_SETS, ...genSets()];
