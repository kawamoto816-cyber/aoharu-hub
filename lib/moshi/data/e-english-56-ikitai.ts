// 外国語（小5・6）「行きたい国・場所（I want to go to 〜.）」の単元模試 (B: 問題プールからシードで選ぶ)。
// 問題・英文はすべてオリジナル (教科書・ドリル・歌やチャンツの文は使っていない)。
// 大問1「I want to go to 〜. の言い方」・大問2「話を読んで答える」(放送のかわりに英語の文をのせる)。
// それぞれプール6問 (基本2・標準2・発展2) から基本・標準・発展を1問ずつ。1回 6問・満点100 (基本15・標準17・発展18 × 2)。
// 選択問題は ch()、並べかえは od() で作る。A (生成) は使っていないので検算式はなし。
// 小5・6 の単元なので、小5までに習わない漢字にはルビ《》をつける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "e-english-56-ikitai";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
type Back = ReturnType<typeof L>;
type Step = [string, string, Back[]];
const S1 = L(1, "I want to go to 〜. を組み立てる");
const S2 = L(2, "国の名前と、そこでできること");
const S3 = L(3, "理由をつけ足して話をふくらませる");
const S4 = L(4, "the がいる場所、いらない場所");

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

// ---- 大問1 I want to go to 〜. の言い方 ----
const IIKATA: QuestionB[] = [
  // 基本
  ch("italy", 1, "I want to go to Italy. の意味として正しいものはどれですか。", [
    ["イタリアへ行きたいです。", "want to は「〜したい」、go to は「〜へ行く」です。"],
    ["イタリアへ行きました。", "すんだことではありません。"],
    ["イタリアが好きです。", "好きなら I like Italy. です。"],
    ["イタリアから来ました。", "出身なら I'm from Italy. です。"],
  ], "want to ＋ go to ＋場所", ["2つの to", "{{want to}}（〜したい）と {{go to}}（〜へ行く）が組み合わさっています。", [S1]]),
  ch("see-koalas", 1, "「オーストラリアで、コアラを見たいです。」の意味になるように、（　）に入る言葉をえらびなさい。\nI want to (　) koalas in Australia.", [
    ["see", "見るなら see です。"],
    ["eat", "eat は「食べる」です。"],
    ["go", "go は「行く」。go koalas とは言いません。"],
    ["swim", "swim は「泳ぐ」です。"],
  ], "見るなら see、食べるなら eat", ["したいことに合う言葉", "コアラを「見たい」ので {{see}}。したいことに合う動作の言葉をえらびます。", [S2]]),
  // 標準
  ch("france", 2, "国の名前の書き方として正しいものはどれですか。", [
    ["France", "国の名前は大文字で始めます。"],
    ["france", "はじめの文字が小文字です。"],
    ["FRANCE", "全部大文字にはしません。"],
    ["the France", "国の名前には the をつけません。"],
  ], "国の名前は大文字で始め、the はつけない", ["国の名前", "国の名前は {{大文字で始め}}、the はつけません。{{France}}。", [S2, S4]]),
  ch("zoo", 2, "「動物園へ行きたいです。」を英語で言うと、どれですか。", [
    ["I want to go to the zoo.", "動物園のようなふつうの場所には the をつけます。"],
    ["I want to go to zoo.", "zoo の前に the が必要です。"],
    ["I want to go the zoo.", "go のあとに to が必要です。"],
    ["I want go to the zoo.", "want のあとに to が必要です。"],
  ], "ふつうの場所は go to the 〜", ["the がいる場所", "動物園や公園は {{go to the zoo}}・go to the park のように the をつけます。", [S4]]),
  // 発展
  ch("kyoto", 3, "正しい文はどれですか。", [
    ["I want to go to Kyoto.", "町の名前には the をつけません。"],
    ["I want to go to the Kyoto.", "町の名前の Kyoto に the はつけません。"],
    ["I want to go Kyoto.", "go のあとに to（〜へ）が必要です。"],
    ["I want to go to kyoto.", "町の名前は大文字で始めます。"],
  ], "国・町の名前は the なし、大文字で始める", ["1つずつ確《たし》かめる", "go {{to}} ＋ 町の名前（{{the なし}}・{{大文字}}）。", [S4, S1]], "思考・判断・表現"),
  od("egypt", 3, "「わたしはエジプトへ行きたいです。」の意味になるように、ならべかえなさい。", ["I", "want to", "go to", "Egypt."], "I ＋ want to ＋ go to ＋場所", ["組み立てる", "I ＋ {{want to}}（〜したい）＋ {{go to}}（〜へ行く）＋ Egypt.", [S1]]),
];

// ---- 大問2 話を読んで答える ----
const YOMU: QuestionB[] = [
  // 基本
  ch("canada", 1, "次の会話を読んで、質問に答えなさい。\nA: Where do you want to go?\nB: I want to go to Canada.\n質問：B が行きたい国はどこですか。", [
    ["カナダ", "go to Canada と言っています。"],
    ["中国", "中国は China です。"],
    ["フランス", "フランスは France です。"],
    ["オーストラリア", "オーストラリアは Australia です。"],
  ], "go to のあとが行きたい場所", ["go to のあと", "{{go to}} のあとの {{Canada}} が行きたい国です。", [S1]], "思考・判断・表現"),
  ch("croissant", 1, "マナが話しています。\nMana: I want to go to France. You can eat croissants there.\n質問：フランスで食べられるものとして、マナが言っているものはどれですか。", [
    ["クロワッサン", "You can eat croissants と言っています。"],
    ["ピザ", "ピザは出てきません。"],
    ["カレー", "カレーは出てきません。"],
    ["すし", "すしは出てきません。"],
  ], "You can eat 〜. ＝〜が食べられる", ["できること", "{{You can eat}} のあとの croissants が、そこで食べられるものです。", [S2]], "思考・判断・表現"),
  // 標準
  ch("hokkaido", 2, "ナオが話しています。\nNao: I want to go to Hokkaido. I want to eat ramen. It's delicious.\n質問：ナオが北海道でしたいことはどれですか。", [
    ["ラーメンを食べる", "I want to eat ramen. と言っています。"],
    ["スキーをする", "スキーは出てきません。"],
    ["動物を見る", "see（見る）とは言っていません。"],
    ["ラーメンを作る", "make ではなく eat（食べる）です。"],
  ], "2文目が「そこでしたいこと」", ["話の組み立て", "行きたい場所 → {{I want to eat ramen.}}（したいこと）→ It's delicious.（気持ち）。", [S3]], "思考・判断・表現"),
  ch("where-go", 2, "会話の（　）に入る言葉として、いちばん合うものはどれですか。\nA: (　)\nB: I want to go to China.", [
    ["Where do you want to go?", "「どこへ行きたい？」と聞かれて、go to China と答えています。"],
    ["What do you want to be?", "この質問なら I want to be 〜. で答えます。"],
    ["What do you want to eat?", "この質問なら I want to eat 〜. で答えます。"],
    ["Do you like China?", "この質問なら Yes, I do. か No, I don't. で答えます。"],
  ], "I want to go to 〜. で答えるのは Where 〜?", ["答えから考える", "行きたい場所を答えているので、たずねたのは {{Where do you want to go?}} です。", [S3]], "思考・判断・表現"),
  // 発展
  ch("brazil", 3, "ケイが話しています。\nKei: I want to go to Brazil. I want to watch soccer games. It's exciting.\n質問：ケイの話について正しいものはどれですか。", [
    ["ブラジルでサッカーの試合を見たい。わくわくする。", "行きたい場所・したいこと・気持ちの3文です。"],
    ["ブラジルでサッカーをしたい。おいしい。", "watch は「見る」、exciting は「わくわくする」です。"],
    ["ブラジルへ行った。サッカーの試合を見た。", "want to なので、まだ行っていません。"],
    ["ブラジルでサッカーの試合を見たい。むずかしい。", "exciting は「わくわくする」です。"],
  ], "場所→したいこと→気持ち の3文", ["3文を整理", "{{Brazil}}（場所）→ {{watch soccer games}}（したいこと）→ {{exciting}}（気持ち）。", [S3]], "思考・判断・表現"),
  ch("match", 3, "行きたい場所と、そこでしたいことの組み合わせとして、いちばん合うものはどれですか。", [
    ["I want to go to the sea. I want to swim.", "海で泳ぎたい、とつながります。"],
    ["I want to go to the library. I want to swim.", "図書館では泳げません。"],
    ["I want to go to the zoo. I want to eat sushi.", "動物園で、すしを食べたいはつながりにくい組み合わせです。"],
    ["I want to go to the park. I want to see fish in the sea.", "公園に行くのに、海の魚を見たいはつながりません。"],
  ], "したいことは、その場所でできることにする", ["つながりを考える", "{{the sea}}（海）→ {{swim}}（泳ぐ）。その場所でできることを足します。", [S3, S2]], "思考・判断・表現"),
];

export const E_ENGLISH_56_IKITAI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "外国語（小5・6）",
  minutes: 7,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "I want to go to 〜. の言い方", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: IIKATA },
    { title: "話を読んで答える", lead: "放送のかわりに、英語の文がのっています。読んで答えなさい。", style: "word", pick: 3, questions: YOMU },
  ],
};
