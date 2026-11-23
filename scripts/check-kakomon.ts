// 過去問チャレンジ (lib/kakomon) の検算。npx tsx scripts/check-kakomon.ts
import { KAKOMON } from "@/lib/kakomon/data";
import { checkKakomon, gradeKakomon } from "@/lib/kakomon/grade";

let errors = 0;
for (const e of KAKOMON) {
  const errs = checkKakomon(e);
  for (const m of errs) console.log(`✕ ${e.id}: ${m}`);
  errors += errs.length;
  console.log(
    `${e.id}: ${e.year} ${e.kind} ${e.subject}／大問 ${e.daimon.length}・解答番号 ${e.daimon.flatMap((d) => d.items.flatMap((i) => i.parts.flatMap((p) => p.nos))).length}・${e.total}点`,
  );
}
// 採点のきまりの確かめ (令和8年度 リーディング)
const r = KAKOMON.find((e) => e.id === "r8-hon-eng-r");
if (r) {
  const t = (
    name: string,
    marks: Record<number, number>,
    daimon: number,
    want: number,
  ) => {
    const got = gradeKakomon(r, marks).daimon.find((d) => d.no === daimon)!.got;
    if (got !== want) {
      errors++;
      console.log(`✕ ${name}: ${got}点（${want}点のはず）`);
    }
  };
  t("順を問わない・各2点（逆順）", { 22: 5, 23: 3 }, 5, 4);
  t("順を問わない・各2点（片方だけ）", { 22: 5, 23: 1 }, 5, 2);
  t("同じ番号を2回マーク", { 22: 3, 23: 3 }, 5, 2);
  t("全部そろって正解（1つちがい）", { 9: 2, 10: 3, 11: 5, 12: 2 }, 3, 0);
  t("全部そろって正解", { 9: 2, 10: 3, 11: 5, 12: 1 }, 3, 3);
  t("順を問わない組＋1つ（そろう）", { 40: 5, 41: 3, 42: 1 }, 8, 4);
  t("順を問わない組＋1つ（1つちがい）", { 40: 5, 41: 3, 42: 2 }, 8, 0);
}
console.log(errors ? `✕ エラー ${errors}` : "✕ エラー 0");
process.exit(errors ? 1 : 0);
