// ツッコミAI（lib/tsukkomi/ai）の自己テスト。 npx tsx scripts/tsukkomi-ai-selftest.ts
// 実際のボケのデータで、hint の点検（正解が入ったら差しかえ）・AIの出力の読み方・AIなしの判定を確かめる。
import { TSUKKOMI } from "../lib/tsukkomi/index";
import { correctWord, templateHint, writable } from "../lib/tsukkomi/ai/index";
import { findHintLeak, guardJudge } from "../lib/tsukkomi/ai/guard";
import { mockJudge } from "../lib/tsukkomi/ai/mock";

let fails = 0;
function ok(cond: boolean, name: string) {
  if (!cond) fails++;
  console.log(`${cond ? "ok  " : "FAIL"} ${name}`);
}

const den = TSUKKOMI["j-sci-2-denryu"];
const b1 = den.find((b) => b.id === "den-01")!; // 電流計は、はかりたい所に並列につなぐ。（正しくは 直列に）

// 1. hint の点検
ok(!!findHintLeak("正しくは直列につなぐよ。", b1), "正しい語句を書いた hint は見つかる");
ok(!!findHintLeak(`つまり${b1.explain.why}`, b1), "わけの文をそのまま書いた hint は見つかる");
ok(!findHintLeak("電流計の中を電流がどう通ればよいか、考えてみよう。", b1), "答えを言わない hint は通る");
ok(!findHintLeak("電流計は、はかりたい所につなぐ。どこがおかしい？", b1), "ボケの文（画面に出ている）の言葉は数えない");
ok(!findHintLeak("「直列に」と書けたね。なぜそう言える？", b1, ["", "直列につなぐ"]), "生徒が自分で書いた言葉は数えない");
const g = guardJudge({ found: true, fixed: "partial", hint: "答えは直列にだよ。" }, b1, ["並列", "まっすぐ"]);
ok(g.replaced && g.hint === templateHint(true, "partial"), "正解が入った hint は定型に差しかえ");

// 短い正しい語句（2字）も見る
const all = Object.values(TSUKKOMI).flat().filter(writable);
const short = all.find((b) => correctWord(b).replace(/[。、\s]/g, "").length === 2 && !b.tokens.join("").includes(correctWord(b).replace(/[。、\s]/g, "")));
if (short) {
  const w = correctWord(short).replace(/[。、\s]/g, "");
  ok(!!findHintLeak(`答えは${w}だね。`, short), `2字の正しい語句（${w}）も見つかる`);
}

// 2. 全問で、定型の hint は正解を含まない
let leaks = 0;
for (const b of all) for (const f of [true, false]) for (const x of ["ok", "partial", "no"] as const) if (findHintLeak(templateHint(f, x), b)) leaks++;
ok(leaks === 0, `定型の hint は全 ${all.length} 問で正解を含まない`);

// 3. AIなしの判定
const m1 = mockJudge(b1, "並列", "直列につなぐ");
ok(m1.found && m1.fixed === "ok", "場所も直しも合っている → found・ok");
const m2 = mockJudge(b1, "はかりたい所", "直列");
ok(!m2.found && m2.fixed === "ok", "場所がちがう → found false");
const m3 = mockJudge(b1, "並列に", "電源に");
ok(m3.found && m3.fixed === "no", "直しがちがう → no");
ok(all.every((b) => mockJudge(b, b.tokens[b.wrongIndex!], correctWord(b)).fixed === "ok"), "全問：まちがいの語句と正しい語句をそのまま書けば ok");
ok(all.every((b) => mockJudge(b, b.tokens[b.wrongIndex!], correctWord(b)).found), "全問：まちがいの語句をそのまま書けば found");

// 4. 書いてツッコむに出せる問題がどの単元にもある
const empty = Object.entries(TSUKKOMI).filter(([, list]) => !list.some(writable)).map(([u]) => u);
ok(empty.length === 0, `36単元すべてに書いてツッコむ問題がある${empty.length ? `（ない: ${empty.join(", ")}）` : ""}`);

console.log(fails ? `\n${fails} 件 FAIL` : "\nすべて ok");
process.exit(fails ? 1 : 0);
