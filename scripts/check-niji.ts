// 2次試験の過去問チャレンジのデータの点検: 単元が地図にあるか、記述のチェック表の点の合計が設問の点と合うか、設問の記号が重ならないか。
import { NIJI } from "@/lib/niji";
import { daimonPoints } from "@/lib/niji/types";
import { lectureUnitInfo } from "@/lib/lecture";
import { hasPrereq } from "@/lib/sakanobori";

let errors = 0;
const bad = (m: string) => {
  errors++;
  console.log(`✕ ${m}`);
};
for (const e of NIJI) {
  let sum = 0;
  for (const d of e.daimon) {
    const seen = new Set<string>();
    for (const b of d.blocks)
      for (const it of b.items) {
        const at = `${e.id} ${d.no}-${it.id}`;
        if (seen.has(it.id)) bad(`${at}: 記号が重なっている`);
        seen.add(it.id);
        if (!lectureUnitInfo(it.unit))
          bad(`${at}: 単元 ${it.unit} が地図にない`);
        else if (!hasPrereq(it.unit))
          console.log(`・${at}: 単元 ${it.unit} はさかのぼりの前提がない`);
        if (it.steps) {
          const s = it.steps.reduce((a, x) => a + x[1], 0);
          if (Math.abs(s - it.pt) > 1e-9)
            bad(`${at}: チェック表の合計 ${s} ≠ ${it.pt}`);
          if (!it.ex?.length) bad(`${at}: 解答例がない`);
        } else if (!it.ans) bad(`${at}: 答えがない`);
      }
    sum += daimonPoints(d);
    console.log(`${e.id} 問題${d.no}: ${daimonPoints(d)}点・${seen.size}設問`);
  }
  if (sum !== e.total) bad(`${e.id}: 点の合計 ${sum} ≠ ${e.total}`);
}
console.log(errors ? `✕ エラー ${errors}` : "✕ エラー 0");
process.exit(errors ? 1 : 0);
