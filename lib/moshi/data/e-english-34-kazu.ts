// 外国語活動（小3・4）「数の言い方」の単元模試 (B: 問題プールからシードで選ぶ)。
// 問題・英文はすべてオリジナル (教科書・ドリル・歌やチャンツの文は使っていない)。
// 大問1「数の言葉」・大問2「数を聞き取る」(放送のかわりに会話の文をのせる)。
// それぞれプール6問 (基本2・標準2・発展2) から基本・標準・発展を1問ずつ。1回 6問・満点100 (基本15・標準17・発展18 × 2)。
// 選択問題は ch() で作る (opts の先頭が正解。画面で並べかえる)。A (生成) は使っていないので検算式はなし
// (たし算の問題 3＋4＝7、12＋11＝23 は手で確かめた)。
// 小3・4 の単元なので、小3までに習わない漢字にはルビ《》をつける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "e-english-34-kazu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
type Back = ReturnType<typeof L>;
const S1 = L(1, "1〜10 は、そのまま覚《おぼ》える");
const S2 = L(2, "11〜19 は -teen がつく");
const S3 = L(3, "20、30、40… は -ty がつく");
const S4 = L(4, "-teen と -ty を聞き分ける");
const S5 = L(5, "21〜99 と How many?");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 50, 3: 60 } as const;
/** 選択問題。opts は [選択肢, その理由] で、先頭が正解 */
function ch(id: string, d: 1 | 2 | 3, prompt: string, opts: [string, string][], point: string, step: [string, string, Back[]], skill: QuestionB["skill"] = "知識・技能"): QuestionB {
  return { id, type: "B", difficulty: d, points: P[d], seconds: T[d], skill, prompt, answer: { kind: "choice", options: opts.map((o) => o[0]), correct: 0, why: opts.map((o) => o[1]) }, point, steps: [{ title: step[0], body: step[1], back: step[2] }] };
}

// ---- 大問1 数の言葉 ----
const KOTOBA: QuestionB[] = [
  // 基本
  ch("seven", 1, "seven は、いくつですか。", [
    ["7", "seven は7です。v の音に気をつけましょう。"],
    ["6", "6は six です。"],
    ["9", "9は nine です。"],
    ["11", "11は eleven です。"],
  ], "seven ＝ 7", ["1〜10 の言葉", "1〜10 はそのまま覚《おぼ》えます。{{seven}} は7です。", [S1]]),
  ch("twelve", 1, "12 を英語《えいご》で言うと、どれですか。", [
    ["twelve", "12は twelve。-teen のきまりを使わない特別《とくべつ》な言い方です。"],
    ["twoteen", "このような言い方はありません。12は twelve です。"],
    ["twenty", "twenty は20です。"],
    ["eleven", "eleven は11です。"],
  ], "11 は eleven、12 は twelve", ["特別《とくべつ》な2つ", "11の {{eleven}} と12の {{twelve}} は、そのまま覚《おぼ》える特別《とくべつ》な言い方です。", [S2]]),
  // 標準
  ch("forty", 2, "40 の正しいつづりはどれですか。", [
    ["forty", "40は forty。four（4）とちがって u が入りません。"],
    ["fourty", "four の u が入ったままです。40には u が入りません。"],
    ["fourteen", "fourteen は14です。"],
    ["four", "four は4です。"],
  ], "40 は forty（u が入らない）", ["-ty の数", "10のまとまりの数には {{-ty}} がつきます。40は {{forty}} で、u が入らないことに気をつけます。", [S3]]),
  ch("fifteen", 2, "fifteen は、いくつですか。", [
    ["15", "-teen がつくので、13〜19のなかま。fifteen は15です。"],
    ["50", "50は fifty。-ty がつきます。"],
    ["5", "5は five です。"],
    ["16", "16は sixteen です。"],
  ], "-teen は 13〜19", ["終わりを見る", "終わりに {{-teen}} があれば13〜19、{{-ty}} なら20、30…のなかまです。fifteen は15。", [S2, S4]]),
  // 発展
  ch("sixty-eight", 3, "68 を英語《えいご》で言うと、どれですか。", [
    ["sixty-eight", "60の sixty と8の eight をつなげて sixty-eight です。"],
    ["sixteen-eight", "sixteen は16です。60は sixty。"],
    ["eighty-six", "eighty-six は86です。十のくらいと一のくらいが入れかわっています。"],
    ["six-eight", "6と8をならべただけで、68にはなりません。"],
  ], "21〜99 は「10のまとまり」＋「1〜9」", ["2つをつなげる", "68 は60と8。{{sixty}} と {{eight}} をつないで {{sixty-eight}} です。", [S5, S3]], "思考・判断・表現"),
  ch("teen-ty", 3, "thirteen（13）と thirty（30）の言い方のちがいとして、正しいものはどれですか。", [
    ["thirteen は後ろを強く長めに、thirty は前を強く言う。", "強く言う所がちがうので、そこで13か30かを聞き分けます。"],
    ["2つとも同じように言う。", "同じように言うと、聞く人が13か30か分かりません。"],
    ["thirteen は前を強く、thirty は後ろを強く言う。", "反対《はんたい》です。-teen は後ろ、-ty は前を強く言います。"],
    ["thirty だけ、とても速く言う。", "速さではなく、強く言う所がちがいます。"],
  ], "-teen は後ろ、-ty は前を強く", ["強く言う所", "{{-teen}} は後ろを強く長めに、{{-ty}} は前を強く言います。聞くときもそこに耳をすませます。", [S4]], "思考・判断・表現"),
];

// ---- 大問2 数を聞き取る ----
const KIKU: QuestionB[] = [
  // 基本
  ch("pencils", 1, "次の会話を読んで、質問《しつもん》に答えなさい。\nA: How many pencils do you have?\nB: I have nine pencils.\n質問《しつもん》：B は、えんぴつを何本持っていますか。", [
    ["9本", "nine は9です。"],
    ["5本", "5は five です。"],
    ["19本", "19は nineteen です。"],
    ["90本", "90は ninety です。"],
  ], "How many? には数で答える", ["数を聞き取る", "How many 〜? は「いくつ？」。答えの {{nine}}（9）を聞き取ります。", [S5, S1]], "思考・判断・表現"),
  ch("tasu", 1, "赤いりんごが3こ、青いりんごが4こあります。りんごは全部でいくつですか。英語《えいご》で答えなさい。", [
    ["seven", "3＋4＝7。7は seven です。"],
    ["eight", "eight は8です。"],
    ["six", "six は6です。"],
    ["four", "four は4。青いりんごの数だけです。"],
  ], "数を出してから英語《えいご》にする", ["計算してから言う", "3＋4＝{{7}}。7は {{seven}} です。", [S1]]),
  // 標準
  ch("fish", 2, "次の会話を読んで、質問《しつもん》に答えなさい。\nMika: How many cats do you have?\nKen: Two. And I have fourteen fish.\n質問《しつもん》：ケンは、魚を何びき持っていますか。", [
    ["14ひき", "fourteen は14です。"],
    ["40ぴき", "40は forty です。fourteen は -teen なので14。"],
    ["2ひき", "2（Two）は、ねこの数です。"],
    ["4ひき", "4は four です。"],
  ], "数が2つ出たら、何の数かを聞き分ける", ["何の数か", "Two は{{ねこ}}の数、{{fourteen}}（14）が魚の数です。", [S2, S5]], "思考・判断・表現"),
  ch("narabi", 2, "数の順《じゅん》にならべました。（　）に入る言葉はどれですか。\nten, (　), thirty, forty", [
    ["twenty", "10・20・30・40 と10ずつふえています。20は twenty。"],
    ["twelve", "twelve は12です。"],
    ["thirteen", "thirteen は13です。"],
    ["fifty", "fifty は50。40のあとに来ます。"],
  ], "10とびの数は -ty", ["きまりを見つける", "10・？・30・40 と10ずつふえるので、20の {{twenty}} が入ります。", [S3]], "思考・判断・表現"),
  // 発展
  ch("no-thirteen", 3, "次の会話を読んで、質問《しつもん》に答えなさい。\nA: How many stickers do you have? Thirty?\nB: No. Thirteen.\n質問《しつもん》：B が持っているシールの数はいくつですか。", [
    ["13", "B は No.（ちがう）と言って、Thirteen（13）と言い直しています。"],
    ["30", "30は A が言った数です。B は No. と打《う》ち消しています。"],
    ["3", "3は three です。"],
    ["33", "33は thirty-three です。"],
  ], "No. のあとが本当の答え", ["言い直しを聞く", "A の Thirty? に B は {{No.}} と答え、{{Thirteen}}（13）と言い直しています。", [S4]], "思考・判断・表現"),
  ch("class", 3, "クラスには男の子が twelve 人、女の子が eleven 人います。全部で何人ですか。英語《えいご》で答えなさい。", [
    ["twenty-three", "12＋11＝23。20の twenty と3の three をつなげます。"],
    ["twenty-one", "twenty-one は21です。"],
    ["thirty-two", "thirty-two は32です。十のくらいと一のくらいが入れかわっています。"],
    ["thirteen", "thirteen は13です。"],
  ], "12＋11＝23 → twenty-three", ["数にしてから計算", "twelve（12）＋ eleven（11）＝ 23。{{twenty}} と {{three}} で {{twenty-three}} です。", [S2, S5]], "思考・判断・表現"),
];

export const E_ENGLISH_34_KAZU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "外国語活動（小3・4）",
  minutes: 6,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "数の言葉", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: KOTOBA },
    { title: "数を聞き取る", lead: "放送のかわりに、会話や英語《えいご》の文がのっています。読んで答えなさい。", style: "word", pick: 3, questions: KIKU },
  ],
};
