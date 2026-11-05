// オシエルの誤解セットの点検（全単元）。npx tsx scripts/check-oshieru.ts
//   - 誤解がレクチャーの mistakes / sections に対応しているか、正しさのものさし（right・why・本文・check）が空でないか（lib/oshieru/check.ts）
//   - 機械で作ったセットは、ハルの文に wrong の語句がそのまま残っているか、言い直しが教えた誤解についてのものか、かぎかっこが二重でないか
//   - 機械で作ったセットは、gen.ts の指紋と同じか（ずれていたら scripts/gen-oshieru.ts）
//   - 単元が重なっていないか、手書きの単元が gen.ts にまざっていないか
// 1つでも問題があれば終了コード 1。
import { getLecture, lectureUnitInfo } from "@/lib/lecture";
import { checkOshieruSet } from "@/lib/oshieru/check";
import { OSHIERU_SETS } from "@/lib/oshieru/data";
import { OSHIERU_GEN_UNITS } from "@/lib/oshieru/data/gen";
import { OSHIERU_HAND_SETS } from "@/lib/oshieru/data/hand";
import { getOshieru } from "@/lib/oshieru";
import { toMockScript, toPublic } from "@/lib/oshieru/public";

let fails = 0;
const seen = new Set<string>();
const hand = new Set(OSHIERU_HAND_SETS.map((s) => s.unit));
for (const set of OSHIERU_SETS) {
  const bad: string[] = [];
  if (seen.has(set.unit)) bad.push("単元が重なっている");
  seen.add(set.unit);
  if (set.auto && hand.has(set.unit)) bad.push("手書きの単元が gen.ts にもある");
  const lec = getLecture(set.unit);
  bad.push(...checkOshieruSet(set, lec, set.auto ? (lectureUnitInfo(set.unit)?.name ?? lec?.title) : undefined));
  // 画面とAPIに渡す形も作れること
  const u = getOshieru(set.unit);
  if (!u) bad.push("getOshieru で引けない");
  else {
    const p = toPublic(u);
    if (!p.answers.length || p.answers.some((a) => !a.right || !a.why)) bad.push("終わったあとに見せる正しい説明が空");
    if (!toMockScript(u).lines.length) bad.push("台本モードの台本が空");
  }
  if (bad.length) {
    fails++;
    console.log(`NG ${set.unit}${set.auto ? "（機械）" : "（手書き）"}: ${bad.join(" / ")}`);
  }
}
// gen.ts にあるのに使われていない単元（指紋がずれた＝レクチャーが変わった）
const live = new Set(OSHIERU_SETS.map((s) => s.unit));
for (const u of Object.keys(OSHIERU_GEN_UNITS))
  if (!live.has(u)) {
    fails++;
    console.log(`NG ${u}（機械）: いまのレクチャーから作ったものが gen.ts の指紋とちがう・作れない（npx tsx scripts/gen-oshieru.ts）`);
  }
console.log(`${OSHIERU_SETS.length} 単元（手書き ${hand.size}・機械 ${OSHIERU_SETS.length - hand.size}）、問題 ${fails}`);
if (fails) process.exit(1);
