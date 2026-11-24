// 過去問チャレンジ (lib/kakomon) の検算。npx tsx scripts/check-kakomon.ts
import { getKakomon, KAKOMON } from "@/lib/kakomon/data";
import { checkKakomon, fullMarks, gradeKakomon } from "@/lib/kakomon/grade";
import type { Marks } from "@/lib/kakomon/types";

let errors = 0;
for (const e of KAKOMON) {
  for (const m of checkKakomon(e)) {
    errors++;
    console.log(`✕ ${e.id}: ${m}`);
  }
}
console.log(
  `${KAKOMON.length} 試験（${[...new Set(KAKOMON.map((e) => `${e.year}${e.kind}`))].join("・")}）`,
);

// 採点のきまりの確かめ
const t = (
  id: string,
  name: string,
  change: Marks,
  daimon: number,
  want: number,
) => {
  const e = getKakomon(id)!;
  const got = gradeKakomon(e, { ...fullMarks(e), ...change }).daimon.find(
    (d) => d.no === daimon,
  )!.got;
  const full = e.daimon.find((d) => d.no === daimon)!.points;
  if (got !== full - want) {
    errors++;
    console.log(`✕ ${id} ${name}: ${got}点（${full - want}点のはず）`);
  }
};
// 引数の want は「満点から何点へるか」
t(
  "r8-hon-eng-r",
  "順を問わない・各2点（逆順）",
  { "22": "5", "23": "3" },
  5,
  0,
);
t("r8-hon-eng-r", "順を問わない・各2点（片方だけ）", { "23": "1" }, 5, 2);
t("r8-hon-eng-r", "同じ番号を2回マーク", { "22": "3", "23": "3" }, 5, 2);
t("r8-hon-eng-r", "全部そろって正解（1つちがい）", { "12": "2" }, 3, 3);
t("r8-hon-eng-r", "順を問わない組＋1つ（1つちがい）", { "42": "2" }, 8, 4);
t("r8-hon-nihonshi", "「1又は2」の2つ目の組", { "16": "2", "17": "6" }, 3, 0);
t("r8-hon-nihonshi", "「1又は2」の組がずれる", { "16": "2", "17": "5" }, 3, 3);
t("r6-hon-sekaishi-b", "別の欄で決まる正解", { "13": "4", "14": "5" }, 2, 0);
t(
  "r6-hon-sekaishi-b",
  "別の欄で決まる正解（ずれ）",
  { "13": "4", "14": "1" },
  2,
  3,
);
t("r8-hon-bio", "部分点（2なら1点）", { "23": "2" }, 5, 4);
t("r6-hon-bio", "一方だけ正解で2点", { "14": "1" }, 4, 3);
t("r7-hon-math1a", "前の記号がちがうと点が入らない", { "2-カ": "1" }, 2, 2 + 1);
t("r8-hon-math2bc", "キがちがうとク・ケも0点", { "5-キ": "1" }, 5, 2 + 2);
t(
  "r8-tsui-math2bc",
  "記号の一部だけ順を問わない",
  { "7-ケ": "3", "7-コ": "0" },
  7,
  0,
);
// 選択問題: 4問ともマークしたら高い3問
{
  const e = getKakomon("r8-hon-math2bc")!;
  const m = fullMarks(e);
  for (const k of Object.keys(m)) if (k.startsWith("4-")) m[k] = "9";
  const r = gradeKakomon(e, m);
  if (r.score !== 100 || r.daimon.find((d) => d.no === 4)!.counted) {
    errors++;
    console.log(`✕ 選択問題の数え方: ${r.score}点`);
  }
  const m2 = fullMarks(e);
  for (const k of Object.keys(m2)) if (k.startsWith("7-")) delete m2[k];
  if (gradeKakomon(e, m2).score !== 100) {
    errors++;
    console.log("✕ 選択問題（3問だけマーク）");
  }
}
console.log(errors ? `✕ エラー ${errors}` : "✕ エラー 0");
process.exit(errors ? 1 : 0);
