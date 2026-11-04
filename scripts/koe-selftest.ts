// 声で説明（lib/koe）の自己テスト。 npx tsx scripts/koe-selftest.ts
// 全単元で要点表を作れるか（要点が3個未満の単元の数）・AIの出力の読み方・一言の点検・まちがいの引用の確かめ・AIなしの判定を見る。
import { J_SCI_1_KAZAN } from "../lib/lecture/data/j-sci-1-kazan";
import { REGISTRY } from "../lib/lecture/registry";
import { templateNext, type PointStatus } from "../lib/koe/index";
import { guardNext, quoteInText, textbookOf } from "../lib/koe/guard";
import { mockJudge } from "../lib/koe/mock";
import { MAX_POINTS, MIN_POINTS, keyPoints } from "../lib/koe/points";
import { parseKoe } from "../lib/koe/prompt";
import { plain } from "../lib/naze/index";

let fails = 0;
function ok(cond: boolean, name: string) {
  if (!cond) fails++;
  console.log(`${cond ? "ok  " : "FAIL"} ${name}`);
}

// 1. 全単元の要点表
const counts = new Map<number, number>();
let under3 = 0;
let outOfRange = 0;
let noWords = 0;
for (const lec of REGISTRY) {
  const pts = keyPoints(lec);
  counts.set(pts.length, (counts.get(pts.length) ?? 0) + 1);
  if (pts.length < 3) {
    under3++;
    console.log(`  要点が3個未満: ${lec.unit} (${pts.length})`);
  }
  if (pts.length < MIN_POINTS || pts.length > MAX_POINTS) outOfRange++;
  noWords += pts.filter((p) => p.words.length === 0).length;
}
console.log(`  単元 ${REGISTRY.length}・要点の数の分布 ${JSON.stringify(Object.fromEntries([...counts].sort((a, b) => a[0] - b[0])))}`);
console.log(`  要点が3個未満の単元: ${under3}・4〜8個の外: ${outOfRange}・語句のない要点: ${noWords}`);
ok(under3 === 0, "全単元で要点が3個以上");

// 2. AIの出力の読み方
const pts = keyPoints(J_SCI_1_KAZAN);
const n = pts.length;
const good = JSON.stringify({ points: Array(n).fill("said"), mistake: null, next: "つぎは〜" });
ok(parseKoe(`はい\n${good}\n`, n).status.length === n, "前後に文があってもJSONを読める");
let bad = false;
try {
  parseKoe(JSON.stringify({ points: ["said"], mistake: null, next: "x" }), n);
} catch {
  bad = true;
}
ok(bad, "要点の数が合わない出力は bad_output");

// 3. まちがいの引用と教科書の言葉
const text = "火山はマグマが冷えてできる。ねばりけが強いと、なだらかな形になる。";
ok(quoteInText("ねばりけが強いと、なだらか", text), "説明にある引用は通る");
ok(!quoteInText("溶岩は黒い", text), "説明にない引用は捨てる");
const tb = textbookOf(J_SCI_1_KAZAN, pts, "p1");
ok(!!tb && plain(J_SCI_1_KAZAN.sections[pts[1].section].body).includes(tb.textbook), "p番号の教科書の言葉は、その節の本文の一文");
const tm = textbookOf(J_SCI_1_KAZAN, pts, "m0");
ok(!!tm && tm.textbook === plain(J_SCI_1_KAZAN.mistakes[0].right), "m番号の教科書の言葉は、よくあるまちがいの正しくは");
ok(textbookOf(J_SCI_1_KAZAN, pts, "x9") === null && textbookOf(J_SCI_1_KAZAN, pts, "p99") === null, "読めない ref は捨てる");

// 4. 一言の点検
const status: PointStatus[] = pts.map((_, i) => (i === 0 ? "said" : "missing"));
const leak = guardNext({ status, mistake: null, next: `つまり${J_SCI_1_KAZAN.check[0].a}` }, J_SCI_1_KAZAN, pts, text, false);
ok(leak.replaced && leak.next === templateNext(pts, status, false), "確認の答えが入った一言は定型に差しかえ");
const safe = guardNext({ status, mistake: null, next: `「${pts[1].label}」のことも話してみよう。` }, J_SCI_1_KAZAN, pts, text, false);
ok(!safe.replaced, "見出しを使った一言は通る");

// 5. AIなしの判定
const all = pts.map((p) => p.words.join("と")).join("。");
ok(mockJudge(pts, all, false).status.every((s) => s === "said"), "語句を全部言えば全部「言えた」");
ok(mockJudge(pts, "きょうは いい てんき です ね ほんとうに", false).status.every((s) => s === "missing"), "関係ない話は全部「まだ」");

console.log(fails ? `\n${fails} FAIL` : "\nall ok");
process.exit(fails ? 1 : 0);
