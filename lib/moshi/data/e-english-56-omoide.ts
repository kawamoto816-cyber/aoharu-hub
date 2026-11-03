// 外国語（小5・6）「小学校の思い出」の単元模試 (B: 問題プールからシードで選ぶ)。
// 問題・英文はすべてオリジナル (教科書・ドリル・歌やチャンツの文は使っていない)。
// 大問1「思い出を伝える文」・大問2「思い出のスピーチを読んで答える」(放送のかわりに英語の文をのせる)。
// それぞれプール6問 (基本2・標準2・発展2) から基本・標準・発展を1問ずつ。1回 6問・満点100 (基本15・標準17・発展18 × 2)。
// 選択問題は ch()、並べかえは od() で作る。A (生成) は使っていないので検算式はなし。
// 小5・6 の単元なので、小5までに習わない漢字にはルビ《》をつける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "e-english-56-omoide";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
type Back = ReturnType<typeof L>;
type Step = [string, string, Back[]];
const S1 = L(1, "6年間の行事をふり返る");
const S2 = L(2, "行事の言葉");
const S3 = L(3, "思い出を伝える4つの文");
const S4 = L(4, "感想の言葉をえらぶ");

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

// ---- 大問1 思い出を伝える文 ----
const BUN: QuestionB[] = [
  // 基本
  ch("school-trip", 1, "school trip はどの行事ですか。", [
    ["修学旅行", "school trip は修学旅行です。"],
    ["運動会", "運動会は sports day です。"],
    ["音楽会", "音楽会は music festival です。"],
    ["卒業式", "卒業式は graduation ceremony です。"],
  ], "school trip ＝修学旅行", ["行事の言葉", "{{school trip}}（修学旅行）と {{sports day}}（運動会）はよく使う言葉です。", [S2]]),
  ch("best-memory", 1, "My best memory is our sports day. の意味として正しいものはどれですか。", [
    ["わたしのいちばんの思い出は運動会です。", "My best memory is 〜. は「いちばんの思い出は〜」です。"],
    ["わたしは運動会が好きです。", "好きなら I like 〜. です。"],
    ["わたしは運動会に行きたいです。", "「〜したい」は want to です。"],
    ["わたしたちの運動会はあしたです。", "あしたのことではありません。"],
  ], "My best memory is 〜. ＝いちばんの思い出は〜", ["思い出の言い方", "いちばんの思い出は {{My best memory is 〜.}} で言います。", [S1, S2]]),
  // 標準
  ch("i-was-happy", 2, "「（わたしは）うれしかったです。」を英語で言うと、どれですか。", [
    ["I was happy.", "自分の気持ちは I was 〜. で言います。"],
    ["It was happy.", "It was 〜. は、行事やものの感想に使います。"],
    ["I am happy.", "今の気持ちになってしまいます。"],
    ["I were happy.", "I のときは was です。"],
  ], "自分の気持ちは I was 〜.", ["2つの感想", "行事やものは {{It was 〜.}}、自分の気持ちは {{I was 〜.}} です。", [S4]]),
  ch("we-went", 2, "「わたしたちは京都へ行きました。」を英語で言うと、どれですか。", [
    ["We went to Kyoto.", "みんなでしたことは We、すんだことは went です。"],
    ["We go to Kyoto.", "すんだことなので、go ではなく went です。"],
    ["We goed to Kyoto.", "goed とは言いません。went です。"],
    ["We want to go to Kyoto.", "「行きたい」になってしまいます。"],
  ], "みんなでしたことは We ＋過去の形", ["We と過去の形", "{{We}}（わたしたちは）＋ {{went}}（行った）to Kyoto.", [S1, S3]]),
  // 発展
  ch("beautiful", 3, "音楽会で、みんなの歌がとてもきれいでした。感想の（　）に入る言葉として、いちばん合うものはどれですか。\nIt was (　).", [
    ["beautiful", "beautiful は「美しい・きれい」。歌の感想に合います。"],
    ["delicious", "delicious は「おいしい」。食べ物の感想です。"],
    ["hungry", "hungry は「おなかがすいた」。歌の感想に合いません。"],
    ["sleepy", "sleepy は「ねむい」。歌の感想に合いません。"],
  ], "思い出に合う感想の言葉をえらぶ", ["合う言葉", "歌がきれい → It was {{beautiful}}.", [S4]], "思考・判断・表現"),
  od("best-trip", 3, "「わたしのいちばんの思い出は修学旅行です。」の意味になるように、ならべかえなさい。", ["My best memory", "is", "our", "school trip."], "My best memory is our 〜.", ["組み立てる", "{{My best memory}} ＋ is ＋ {{our}} school trip.", [S1, S2]]),
];

// ---- 大問2 思い出のスピーチを読んで答える ----
const YOMU: QuestionB[] = [
  // 基本
  ch("recorder", 1, "スピーチを読んで、質問に答えなさい。\nMy best memory is the music festival. I played the recorder. It was fun.\n質問：この人が音楽会でしたことはどれですか。", [
    ["リコーダーをふいた", "I played the recorder. と言っています。"],
    ["ピアノをひいた", "ピアノは出てきません。"],
    ["歌を歌った", "sang（歌った）とは言っていません。"],
    ["げきをした", "げきは出てきません。"],
  ], "過去の形の文が、したこと", ["したこと", "{{played}} the recorder（リコーダーをふいた）がしたことです。", [S3]], "思考・判断・表現"),
  ch("first-sentence", 1, "思い出のスピーチで、最初に言う文として、いちばん合うものはどれですか。", [
    ["My best memory is our sports day.", "まず、いちばんの思い出が何かを言います。"],
    ["It was fun.", "感想は最後に言います。"],
    ["I ran fast.", "したことは、思い出のあとに言います。"],
    ["We ate lunch.", "したことは、思い出のあとに言います。"],
  ], "最初は My best memory is 〜.", ["4つの文の順", "{{思い出}}→したこと→見たもの・食べたもの→{{感想}}の順です。", [S3]], "思考・判断・表現"),
  // 標準
  ch("nikko", 2, "スピーチを読んで、質問に答えなさい。\nMy best memory is our school trip. We went to Nikko. We saw a big shrine. We ate yuba. It was delicious.\n質問：修学旅行で食べたものはどれですか。", [
    ["ゆば", "We ate yuba. と言っています。"],
    ["大きな神社", "a big shrine は見たものです。"],
    ["ラーメン", "ラーメンは出てきません。"],
    ["おにぎり", "おにぎりは出てきません。"],
  ], "saw は見たもの、ate は食べたもの", ["動作の言葉で分ける", "{{saw}} → 神社（見たもの）、{{ate}} → ゆば（食べたもの）。", [S3]], "思考・判断・表現"),
  od("four", 2, "思い出を伝える4つの文を、まとまりのよい順にならべかえなさい。", ["My best memory is our school trip.", "We went to Hiroshima.", "We ate okonomiyaki.", "It was delicious."], "思い出→したこと→食べたもの→感想", ["4つの文の順", "{{思い出}}→{{したこと}}→{{食べたもの}}→{{感想}}の順です。", [S3]]),
  // 発展
  ch("relay", 3, "スピーチの（　）に入る言葉として、いちばん合うものはどれですか。\nMy best memory is our sports day. I ran in the relay. I was (　).", [
    ["excited", "I was 〜. は自分の気持ち。リレーで「わくわくした」は合います。"],
    ["delicious", "delicious は食べ物の感想で、I was のあとには合いません。"],
    ["beautiful", "beautiful は景色やものの感想で、自分の気持ちには合いません。"],
    ["hungry", "リレーの思い出の感想としては合いません。"],
  ], "I was のあとは自分の気持ちの言葉", ["気持ちの言葉", "{{I was}} 〜. なので、自分の気持ちの {{excited}}（わくわくした）がぴったりです。", [S4]], "思考・判断・表現"),
  ch("ryo", 3, "スピーチを読んで、質問に答えなさい。\nMy best memory is our swimming meet. I swam fifty meters. It was hard, but I was happy.\n質問：リョウのスピーチの内容として正しいものはどれですか。", [
    ["50メートル泳いで、大変だったが、うれしかった", "swam fifty meters、It was hard, but I was happy. です。"],
    ["15メートル泳いで、楽だった", "fifty は50。hard は「大変」です。"],
    ["50メートル泳いで、大変で、悲しかった", "I was happy.（うれしかった）と言っています。"],
    ["50メートル走って、うれしかった", "swam は swim（泳ぐ）の過去の形です。"],
  ], "It was（行事）と I was（自分）を分けて読む", ["2つの感想", "大会は {{It was hard}}（大変）、自分は {{I was happy}}（うれしい）。", [S4, S3]], "思考・判断・表現"),
];

export const E_ENGLISH_56_OMOIDE_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "外国語（小5・6）",
  minutes: 7,
  review: { status: "draft" },
  sections: [
    { title: "思い出を伝える文", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: BUN },
    { title: "思い出のスピーチを読んで答える", lead: "放送のかわりに、英語の文がのっています。読んで答えなさい。", style: "word", pick: 3, questions: YOMU },
  ],
};
