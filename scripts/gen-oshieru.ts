// オシエルの誤解セットを、図解レクチャーの全単元から機械的に作り、点検を通った単元だけを lib/oshieru/data/gen.ts に書き出す。
// 書き出すのは「単元id → できたセットの指紋（sha1 の先頭12字）」の表だけ。セットそのものは、画面とAPIがレクチャーから同じ作り方で作る
// （データを2重に持たないため。2MBの表にすると dev のコンパイルがメモリ不足で落ちる）。
// レクチャーが変わって作り直したセットが指紋とずれたら、scripts/check-oshieru.ts が知らせ、画面とAPIもその単元を使わない。
//   npx tsx scripts/gen-oshieru.ts      （レクチャーを足した・直したら実行し、そのあと scripts/check-oshieru.ts）
// 作り方は lib/oshieru/auto.ts（数種類の決まった型にレクチャーの mistakes の wrong・right・why をそのまま入れる。AIは使わない）、点検は lib/oshieru/check.ts。
// 手で書いたセット（lib/oshieru/data/<単元id>.ts）がある単元は、手で書いたほうを使うので作らない。
import { writeFileSync } from "node:fs";
import { LECTURES, lectureUnitInfo } from "@/lib/lecture";
import { buildOshieruSet, fingerprint } from "@/lib/oshieru/auto";
import { checkOshieruSet } from "@/lib/oshieru/check";
import { OSHIERU_HAND_SETS } from "@/lib/oshieru/data/hand";
import type { OshieruSet } from "@/lib/oshieru/types";

const hand = new Set(OSHIERU_HAND_SETS.map((s) => s.unit));
const out: OshieruSet[] = [];
const skipped: Record<string, number> = {};
const note = (why: string) => (skipped[why] = (skipped[why] ?? 0) + 1);

for (const lec of [...LECTURES].sort((a, b) => a.unit.localeCompare(b.unit))) {
  if (hand.has(lec.unit)) continue;
  const topic = lectureUnitInfo(lec.unit)?.name ?? lec.title;
  const set = buildOshieruSet(lec, topic);
  if (!set) {
    note("思いこみとして言える mistakes が足りない");
    continue;
  }
  const bad = checkOshieruSet(set, lec, topic);
  if (bad.length) {
    for (const b of bad) note(b.replace(/「[^」]*」/g, "「…」").replace(/\[\d+\]/g, "[n]"));
    continue;
  }
  out.push(set);
}

const body = `// 自動生成 (scripts/gen-oshieru.ts)。手で書きかえない。図解レクチャーのデータから機械的に作り、lib/oshieru/check.ts の点検を通った単元だけ。
// 単元id → そのときのセットの指紋。セットは lib/oshieru/auto.ts の buildOshieruSet で作り、指紋が合うときだけ使う。
export const OSHIERU_GEN_UNITS: Record<string, string> = {
${out.map((s) => `  "${s.unit}": "${fingerprint(s)}",`).join("\n")}
};
`;
writeFileSync("lib/oshieru/data/gen.ts", body);
console.log(`書き出し ${out.length} 単元（手書き ${hand.size}・レクチャー ${LECTURES.length}）`);
for (const [k, n] of Object.entries(skipped).sort((a, b) => b[1] - a[1])) console.log(`  外した: ${k} … ${n}`);
