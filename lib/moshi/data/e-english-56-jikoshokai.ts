// 外国語（小5・6）「自己紹介」の単元模試 (B: 問題プールからシードで選ぶ)。
// 問題・英文はすべてオリジナル (教科書・ドリル・歌やチャンツの文は使っていない)。
// 大問1「自己紹介の文」・大問2「自己紹介や会話を読んで答える」(放送のかわりに英語の文をのせる)。
// それぞれプール6問 (基本2・標準2・発展2) から基本・標準・発展を1問ずつ。1回 6問・満点100 (基本15・標準17・発展18 × 2)。
// 選択問題は ch()、並べかえは od() で作る。A (生成) は使っていないので検算式はなし。
// 小5・6 の単元なので、小5までに習わない漢字にはルビ《》をつける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "e-english-56-jikoshokai";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
type Back = ReturnType<typeof L>;
type Step = [string, string, Back[]];
const S1 = L(1, "自己紹介《じこしょうかい》の流れ");
const S2 = L(2, "形はそのまま、中身を入れかえる");
const S3 = L(3, "相手のことをたずねる");
const S4 = L(4, "書くときは大文字に気をつける");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const meta = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"]) => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });
/** 選択問題。opts は [選択肢, その理由] で、先頭が正解 */
function ch(id: string, d: 1 | 2 | 3, prompt: string, opts: [string, string][], point: string, step: Step, skill: QuestionB["skill"] = "知識・技能"): QuestionB {
  return { ...meta(id, d, skill), prompt, answer: { kind: "choice", options: opts.map((o) => o[0]), correct: 0, why: opts.map((o) => o[1]) }, point, steps: [{ title: step[0], body: step[1], back: step[2] }] };
}
/** 並べかえ。tokens は正しい順 */
function od(id: string, d: 1 | 2 | 3, prompt: string, tokens: string[], point: string, step: Step, skill: QuestionB["skill"] = "思考・判断・表現"): QuestionB {
  return { ...meta(id, d, skill), prompt, answer: { kind: "order", tokens }, point, steps: [{ title: step[0], body: step[1], back: step[2] }] };
}

// ---- 大問1 自己紹介の文 ----
const BUN: QuestionB[] = [
  // 基本
  ch("from-kobe", 1, "「わたしは神戸の出身です。」を英語で言うと、どれですか。", [
    ["I'm from Kobe.", "出身は I'm from 〜. で言います。"],
    ["I'm Kobe from.", "from は場所の前におきます。"],
    ["I like Kobe.", "「神戸が好きです」になります。"],
    ["My name is Kobe.", "名前の言い方です。"],
  ], "出身は I'm from 〜.", ["出身の言い方", "出身は {{I'm from}} ＋場所. です。", [S1]]),
  ch("last", 1, "自己紹介《じこしょうかい》の最後に言う「はじめまして、よろしく」はどれですか。", [
    ["Nice to meet you.", "自己紹介《じこしょうかい》は Nice to meet you. でしめくくります。"],
    ["Good night.", "ねる前の「おやすみなさい」です。"],
    ["You're welcome.", "お礼への「どういたしまして」です。"],
    ["How much is it?", "値段《ねだん》をたずねる言葉です。"],
  ], "しめくくりは Nice to meet you.", ["流れ", "Hello. → 名前 → 出身 → 好きなもの → {{Nice to meet you.}}", [S1]]),
  // 標準
  ch("very-much", 2, "「わたしはサッカーがとても好きです。」を英語で言うと、どれですか。", [
    ["I like soccer very much.", "very much は文の最後につけます。"],
    ["I very much like soccer.", "very much は like の前ではなく、最後におきます。"],
    ["I like very much soccer.", "soccer のあとに very much をおきます。"],
    ["I like soccer very.", "very だけでなく very much です。"],
  ], "「とても好き」は 文の最後に very much", ["入れかえる", "I like 〜. の形はそのまま、最後に {{very much}} をつけます。", [S2]]),
  ch("where-from", 2, "Where are you from? と聞かれました。答えとして正しいものはどれですか。", [
    ["I'm from Sapporo.", "出身を聞かれたので I'm from 〜. で答えます。"],
    ["I'm Sapporo.", "from がないと「わたしは札幌《さっぽろ》です」になってしまいます。"],
    ["Yes, I am.", "Where で聞かれたら、Yes・No では答えません。"],
    ["I like Sapporo.", "好きなものを答えています。"],
  ], "Where are you from? には I'm from 〜.", ["たずね方と答え方", "{{Where are you from?}} と {{I'm from 〜.}} を組で覚えます。", [S3]]),
  // 発展
  ch("capital", 3, "大文字が正しく使われている自己紹介《じこしょうかい》はどれですか。", [
    ["Hello. I'm Haruka. I'm from Sendai.", "文のはじめ、名前、町の名前が大文字です。"],
    ["hello. i'm Haruka. I'm from sendai.", "文のはじめの hello・i'm と、町の名前の sendai が小文字です。"],
    ["Hello. I'm haruka. I'm from Sendai.", "人の名前 haruka が小文字です。"],
    ["Hello. I'm Haruka. I'm from sendai.", "町の名前 sendai が小文字です。"],
  ], "文のはじめ・I・人や町の名前は大文字", ["1か所ずつ見る", "{{文のはじめ}}、{{人の名前}}、{{町や国の名前}}のはじめの文字を大文字にします。", [S4]], "思考・判断・表現"),
  od("cats-very-much", 3, "「わたしはねこがとても好きです。」の意味になるように、ならべかえなさい。", ["I", "like", "cats", "very much."], "I like ＋好きなもの＋ very much.", ["組み立てる", "I like {{cats}} {{very much}}. very much は最後です。", [S2]]),
];

// ---- 大問2 自己紹介や会話を読んで答える ----
const YOMU: QuestionB[] = [
  // 基本
  ch("kaito", 1, "自己紹介《じこしょうかい》を読んで、質問に答えなさい。\nHello. My name is Kaito. I'm from Fukuoka. I like baseball. Nice to meet you.\n質問：カイトの出身はどこですか。", [
    ["福岡", "I'm from Fukuoka. と言っています。"],
    ["大阪", "大阪は出てきません。"],
    ["野球場", "baseball は好きなスポーツです。"],
    ["東京", "東京は出てきません。"],
  ], "I'm from のあとが出身", ["出身を聞き取る", "{{I'm from}} のあとの {{Fukuoka}} が出身です。", [S1]], "思考・判断・表現"),
  ch("whats-name", 1, "会話の（　）に入る言葉として、いちばん合うものはどれですか。\nA: What's your name?\nB: (　)", [
    ["My name is Saki.", "名前を聞かれたので、名前を答えます。"],
    ["I'm from Saki.", "出身の言い方です。"],
    ["Yes, I do.", "What で聞かれたら、Yes・No では答えません。"],
    ["I like Saki.", "好きなものの言い方です。"],
  ], "What's your name? には My name is 〜.", ["たずね方と答え方", "{{What's your name?}} には {{My name is 〜.}} か I'm 〜. で答えます。", [S3]], "思考・判断・表現"),
  // 標準
  ch("natto", 2, "次の会話を読んで、質問に答えなさい。\nA: Do you like natto?\nB: No, I don't. I like rice balls.\n質問：B が好きな食べ物はどれですか。", [
    ["おにぎり", "No, I don't. のあと、I like rice balls. と言っています。"],
    ["なっとう", "なっとうは No, I don't.（好きではない）と答えています。"],
    ["なっとうとおにぎり", "なっとうは好きではありません。"],
    ["ごはんとみそしる", "みそしるは出てきません。"],
  ], "No のあとの I like 〜. が好きなもの", ["2つ目の文", "{{No, I don't.}} のあとの {{I like rice balls.}} が好きなものです。", [S3]], "思考・判断・表現"),
  ch("lily", 2, "自己紹介《じこしょうかい》を読んで、質問に答えなさい。\nHi. I'm Lily. I'm from London. I like cats very much.\n質問：リリーについて正しいものはどれですか。", [
    ["ロンドン出身で、ねこがとても好き", "I'm from London. と I like cats very much. です。"],
    ["ロンドン出身で、犬がとても好き", "好きなのは cats（ねこ）です。"],
    ["ニューヨーク出身で、ねこがとても好き", "出身は London です。"],
    ["ロンドン出身で、ねこが少し好き", "very much は「とても」です。"],
  ], "出身と好きなものを分けて聞く", ["文ごとに整理", "出身 {{London}}、好きなもの {{cats}}（{{very much}}＝とても）。", [S1, S2]], "思考・判断・表現"),
  // 発展
  od("nagare", 3, "自己紹介《じこしょうかい》の流れになるように、文をならべかえなさい。", ["Hello.", "I'm Mei.", "I'm from Kyoto.", "I like music.", "Nice to meet you."], "あいさつ→名前→出身→好きなもの→しめくくり", ["流れ", "{{Hello.}} → 名前 → 出身 → 好きなもの → {{Nice to meet you.}}", [S1]]),
  ch("ask-back", 3, "会話の（　）に入る言葉として、いちばん合うものはどれですか。\nA: I'm from Okinawa. Where are you from?\nB: (　)", [
    ["I'm from Nara.", "出身をたずね返されたので、自分の出身を答えます。"],
    ["Yes, I am.", "Where で聞かれたら、Yes・No では答えません。"],
    ["I like Okinawa.", "好きな場所を答えていて、出身の答えになっていません。"],
    ["My name is Nara.", "名前を答えています。"],
  ], "たずね返されたら、同じことを自分について答える", ["たずね返しに答える", "Where are you from? には {{I'm from 〜.}} で自分の出身を答えます。", [S3]], "思考・判断・表現"),
];

export const E_ENGLISH_56_JIKOSHOKAI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "外国語（小5・6）",
  minutes: 7,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "自己紹介《じこしょうかい》の文", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: BUN },
    { title: "自己紹介《じこしょうかい》や会話を読んで答える", lead: "放送のかわりに、英語の文がのっています。読んで答えなさい。", style: "word", pick: 3, questions: YOMU },
  ],
};
