// 外国語（小5・6）「注文と値段（What would you like?）」の単元模試 (B: 問題プールからシードで選ぶ)。
// 問題・英文はすべてオリジナル (教科書・ドリル・歌やチャンツの文は使っていない)。
// 大問1「注文と値段の言い方」・大問2「お店の会話を読んで答える」(放送のかわりに会話の文をのせる)。
// それぞれプール6問 (基本2・標準2・発展2) から基本・標準・発展を1問ずつ。1回 6問・満点100 (基本15・標準17・発展18 × 2)。
// 選択問題は ch() で作る (opts の先頭が正解。画面で並べかえる)。A (生成) は使っていないので検算式はなし
// (合計は手で確かめた：600＋150＝750、400÷2＝200)。
// 小5・6 の単元なので、小5までに習わない漢字にはルビ《》をつける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "e-english-56-chumon";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
type Back = ReturnType<typeof L>;
const S1 = L(1, "お店の会話は決まった流れ");
const S2 = L(2, "I want と I'd like のちがい");
const S3 = L(3, "合計を英語で言う");
const S4 = L(4, "すすめられたときの答え方");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
/** 選択問題。opts は [選択肢, その理由] で、先頭が正解 */
function ch(id: string, d: 1 | 2 | 3, prompt: string, opts: [string, string][], point: string, step: [string, string, Back[]], skill: QuestionB["skill"] = "知識・技能"): QuestionB {
  return { id, type: "B", difficulty: d, points: P[d], seconds: T[d], skill, prompt, answer: { kind: "choice", options: opts.map((o) => o[0]), correct: 0, why: opts.map((o) => o[1]) }, point, steps: [{ title: step[0], body: step[1], back: step[2] }] };
}

// ---- 大問1 注文と値段の言い方 ----
const IIKATA: QuestionB[] = [
  // 基本
  ch("would-like", 1, "お店の人の What would you like? の意味として正しいものはどれですか。", [
    ["何になさいますか。", "お客に注文をたずねる、ていねいな言い方です。"],
    ["いくらですか。", "値段《ねだん》をたずねるのは How much is it? です。"],
    ["どこへ行きたいですか。", "Where do you want to go? の意味です。"],
    ["何が好きですか。", "What do you like? の意味です。"],
  ], "What would you like? ＝何になさいますか", ["お店の流れ", "お店の人は {{What would you like?}} とたずね、お客は I'd like 〜. と注文します。", [S1]]),
  ch("how-much", 1, "値段《ねだん》をたずねる言い方はどれですか。", [
    ["How much is it?", "値段《ねだん》は How much でたずねます。"],
    ["How many is it?", "How many は数をたずねるときの言い方です。"],
    ["What would you like?", "注文をたずねる言い方です。"],
    ["Here you are.", "物をわたすときの「はい、どうぞ」です。"],
  ], "値段《ねだん》は How much is it?", ["たずね方", "値段《ねだん》は {{How much is it?}}、数は How many です。", [S1]]),
  // 標準
  ch("id-like", 2, "ていねいな注文の言い方として正しいものはどれですか。", [
    ["I'd like a hamburger, please.", "I'd like 〜, please. はていねいな注文の言い方です。"],
    ["I want hamburger.", "a がなく、お店の人に言うと少し強く聞こえます。"],
    ["I'd like hamburger a, please.", "a は物の名前の前につけます。"],
    ["I'd likes a hamburger, please.", "like に s はつけません。"],
  ], "注文は I'd like 〜, please.", ["ていねいに", "{{I'd like}} ＋物＋ {{please}} で、ていねいに注文します。", [S2]]),
  ch("no-thank-you", 2, "Would you like some tea? とすすめられました。いらないときの答えとして、いちばん合うものはどれですか。", [
    ["No, thank you.", "いらないときも thank you をつけて、相手を気づかいます。"],
    ["No, please.", "please は、ほしいときに使います。"],
    ["Yes, please.", "ほしいときの答えです。"],
    ["No, I'm not.", "Would you like 〜? への答えにはなりません。"],
  ], "いらないときは No, thank you.", ["すすめられたとき", "ほしいなら {{Yes, please.}}、いらないなら {{No, thank you.}} です。", [S4]]),
  // 発展
  ch("750", 3, "750円を英語で言うと、どれですか。", [
    ["seven hundred fifty yen", "700の seven hundred と50の fifty を続けます。yen に s はつけません。"],
    ["seventy-five hundred yen", "これは 7500 の言い方になります。"],
    ["seven hundred fifty yens", "yen は2つ以上でも s をつけません。"],
    ["seven fifty hundred yen", "hundred は seven のすぐあとです。"],
  ], "百の位→十の位の順に。yen に s はつけない", ["数を組み立てる", "{{seven hundred}}（700）＋ {{fifty}}（50）＋ yen。", [S3]], "思考・判断・表現"),
  ch("i-would", 3, "I'd like 〜. の I'd は、どの言葉を短くした形ですか。", [
    ["I would", "I'd は I would を短くした形です。"],
    ["I do", "I do は短くすると I'd になりません。"],
    ["I am", "I am を短くすると I'm です。"],
    ["I want", "I want を短くした形はありません。"],
  ], "I'd ＝ I would", ["短くした形", "{{I'd}} は {{I would}}。ていねいな気持ちを表します。", [S2]], "思考・判断・表現"),
];

// ---- 大問2 お店の会話を読んで答える ----
const KAIWA: QuestionB[] = [
  // 基本
  ch("pizza", 1, "次の会話を読んで、質問に答えなさい。\nClerk: What would you like?\nKen: I'd like a pizza, please.\n質問：ケンが注文したものはどれですか。", [
    ["ピザ", "I'd like a pizza, please. と言っています。"],
    ["パスタ", "パスタ（pasta）は出てきません。"],
    ["ハンバーガー", "ハンバーガーは出てきません。"],
    ["サラダ", "サラダ（salad）は出てきません。"],
  ], "I'd like のあとが注文", ["I'd like のあと", "{{I'd like}} のあとの {{a pizza}} が注文です。", [S1, S2]], "思考・判断・表現"),
  ch("here-you-are", 1, "会話の（　）に入る言葉として、いちばん合うものはどれですか。\nClerk: Here you are.\nCustomer: (　)", [
    ["Thank you.", "品物を受け取ったら、お礼を言います。"],
    ["You're welcome.", "お礼を言われたときの返事です。"],
    ["How much is it?", "受け取るときに言う言葉ではありません。"],
    ["Yes, please.", "すすめられたときの答えです。"],
  ], "受け取ったら Thank you.", ["会話の流れ", "{{Here you are.}}（はい、どうぞ）とわたされたら {{Thank you.}} です。", [S1]], "思考・判断・表現"),
  // 標準
  ch("300", 2, "次の会話を読んで、質問に答えなさい。\nA: How much is it?\nB: It's three hundred yen.\n質問：値段《ねだん》はいくらですか。", [
    ["300円", "three hundred は300です。"],
    ["30円", "30は thirty です。"],
    ["3000円", "3000は three thousand です。"],
    ["130円", "130は one hundred thirty です。"],
  ], "hundred は100", ["数を聞き取る", "{{three hundred}} ＝ 3 × 100 ＝ 300円です。", [S3]], "思考・判断・表現"),
  ch("juice", 2, "次の会話を読んで、質問に答えなさい。\nClerk: Would you like some juice?\nAya: Yes, please. Orange juice, please.\n質問：アヤについて正しいものはどれですか。", [
    ["オレンジジュースをたのんだ", "Yes, please. のあと Orange juice, please. と言っています。"],
    ["ジュースはいらないと答えた", "いらないなら No, thank you. です。"],
    ["りんごジュースをたのんだ", "apple ではなく orange です。"],
    ["お茶をたのんだ", "お茶（tea）は出てきません。"],
  ], "Yes, please. ＝はい、おねがいします", ["答えを聞く", "{{Yes, please.}} のあと、{{Orange juice}} をたのんでいます。", [S4]], "思考・判断・表現"),
  // 発展
  ch("total", 3, "メニューを見てください。\ncurry 600 yen / salad 200 yen / ice cream 150 yen\nTom: I'd like curry and ice cream, please.\n質問：トムが言われる合計はどれですか。", [
    ["seven hundred fifty yen", "600＋150＝750円です。"],
    ["eight hundred yen", "800円は curry と salad の合計です。"],
    ["eight hundred fifty yen", "850円は3つの中のどれの組み合わせでもありません。"],
    ["nine hundred fifty yen", "950円は3つ全部の合計です。"],
  ], "たし算をしてから英語にする", ["計算してから言う", "curry 600 ＋ ice cream 150 ＝ 750。{{seven hundred fifty yen}} です。", [S3]], "思考・判断・表現"),
  ch("hot-dogs", 3, "次の会話を読んで、質問に答えなさい。\nSora: I'd like two hot dogs, please.\nClerk: Two hot dogs. That's four hundred yen.\n質問：ホットドッグ1本の値段《ねだん》はいくらですか。", [
    ["200円", "2本で400円なので、1本は 400÷2＝200円です。"],
    ["400円", "400円は2本の合計です。"],
    ["100円", "100円だと、2本で200円になります。"],
    ["800円", "800円だと、2本で1600円になります。"],
  ], "That's 〜 は合計の値段《ねだん》", ["合計から考える", "{{That's four hundred yen.}} は2本の合計。1本は {{200円}}です。", [S3, S1]], "思考・判断・表現"),
];

export const E_ENGLISH_56_CHUMON_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "外国語（小5・6）",
  minutes: 7,
  review: { status: "draft" },
  sections: [
    { title: "注文と値段《ねだん》の言い方", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: IIKATA },
    { title: "お店の会話を読んで答える", lead: "放送のかわりに、会話の文がのっています。読んで答えなさい。", style: "word", pick: 3, questions: KAIWA },
  ],
};
