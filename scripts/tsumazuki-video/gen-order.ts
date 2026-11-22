// つまずき図鑑の動画を作る順番の表（order.txt）を作り直す。授業（lib/jugyo）とつまずきページ（lib/tsumazuki）の両方がある単元だけ。
//   npx tsx scripts/tsumazuki-video/gen-order.ts
// 順番：まちがいが式や答えではっきりする教科から（中学数学 → 小学算数 → 中学理科 → 小学理科 → 高校数学 → 高校理科 → 英語 → 社会 → 国語 → 情報）。
// 教科の中は学年の順、同じ学年は授業の並び（UNITS）の順。表は手で並べかえてもよい（run.sh は上から、まだ作っていない単元を選ぶ）。
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { UNITS } from "@/lib/jugyo";
import { TSUMAZUKI_UNITS } from "@/lib/tsumazuki";

const GROUPS = ["j-math", "e-math", "j-sci", "e-science", "h-math", "h-sci", "j-en", "e-english", "h-eng", "j-soc", "e-social", "h-civ", "h-hist", "h-geo", "j-ja", "e-japanese", "h-jpn", "h-info"];
const page = new Set(TSUMAZUKI_UNITS);
const group = (u: string) => {
  const g = GROUPS.findIndex((p) => u.startsWith(`${p}-`));
  return g < 0 ? GROUPS.length : g;
};
const grade = (u: string) => Number(u.match(/^[ejh]-[a-z]+-(\d)/)?.[1] ?? 9);
const units = UNITS.filter((u) => page.has(u))
  .map((u, i) => ({ u, i }))
  .sort((a, b) => group(a.u) - group(b.u) || grade(a.u) - grade(b.u) || a.i - b.i)
  .map((x) => x.u);
const head = [
  "# つまずき図鑑の動画を作る順番（上から。scripts/tsumazuki-video/run.sh が、まだ作っていない単元を1日 N 本選ぶ）",
  "# 作り直し: npx tsx scripts/tsumazuki-video/gen-order.ts（手で並べかえてもよい。# の行と空行は読みとばす）",
];
writeFileSync(join(__dirname, "order.txt"), [...head, ...units, ""].join("\n"));
console.log(`order.txt: ${units.length} 単元`);
