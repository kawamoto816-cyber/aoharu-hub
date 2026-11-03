// 外国語（小5・6）「将来の夢（I want to be 〜.）」の単元模試 (B: 問題プールからシードで選ぶ)。
// 問題・英文はすべてオリジナル (教科書・ドリル・歌やチャンツの文は使っていない)。
// 大問1「I want to be 〜. の言い方」・大問2「夢の話を読んで答える」(放送のかわりに英語の文をのせる)。
// それぞれプール6問 (基本2・標準2・発展2) から基本・標準・発展を1問ずつ。1回 6問・満点100 (基本15・標準17・発展18 × 2)。
// 選択問題は ch()、並べかえは od() で作る。A (生成) は使っていないので検算式はなし。
// 小5・6 の単元なので、小5までに習わない漢字にはルビ《》をつける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "e-english-56-yume";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
type Back = ReturnType<typeof L>;
type Step = [string, string, Back[]];
const S1 = L(1, "want・want to・want to be のちがい");
const S2 = L(2, "仕事の言葉の前は a か an");
const S3 = L(3, "仕事の言葉と理由");
const S4 = L(4, "夢を伝える・たずねる");

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

// ---- 大問1 I want to be 〜. の言い方 ----
const IIKATA: QuestionB[] = [
  // 基本
  ch("doctor", 1, "I want to be a doctor. の意味として正しいものはどれですか。", [
    ["わたしは医者になりたいです。", "want to be 〜 は「〜になりたい」です。"],
    ["わたしは医者に会いたいです。", "「会いたい」なら want to see です。"],
    ["わたしは医者がほしいです。", "want 〜 だけなら「〜がほしい」ですが、この文は want to be です。"],
    ["わたしは医者でした。", "すんだことではありません。"],
  ], "want to be ＝〜になりたい", ["3つのちがい", "want（ほしい）・want to（したい）・{{want to be}}（なりたい）。", [S1]]),
  ch("vet", 1, "vet はどの仕事ですか。", [
    ["獣医《じゅうい》", "vet は動物の病気をみる獣医《じゅうい》です。"],
    ["先生", "先生は teacher です。"],
    ["料理人", "料理人は cook です。"],
    ["歌手", "歌手は singer です。"],
  ], "vet ＝獣医《じゅうい》", ["仕事の言葉", "{{vet}} は獣医《じゅうい》。動物が好き、という理由と組にして覚えます。", [S3]]),
  // 標準
  ch("singer", 2, "「わたしは歌手になりたいです。」を英語で言うと、どれですか。", [
    ["I want to be a singer.", "want to be のあとに a ＋仕事の言葉です。"],
    ["I want a singer.", "「歌手がほしい」になってしまいます。"],
    ["I want to a singer.", "to のあとに be が必要です。"],
    ["I want to be singer.", "仕事の言葉の前に a が必要です。"],
  ], "I want to be a ＋仕事.", ["組み立てる", "I {{want to be}} {{a}} singer. a をわすれないようにします。", [S1, S2]]),
  ch("an-artist", 2, "前に an をつける仕事の言葉はどれですか。", [
    ["artist", "artist はアに近い音で始まるので an artist です。"],
    ["teacher", "teacher は a teacher です。"],
    ["pilot", "pilot は a pilot です。"],
    ["nurse", "nurse は a nurse です。"],
  ], "母音の音で始まる言葉には an", ["はじめの音", "{{artist}} のように母音の音で始まる言葉には {{an}} をつけます。", [S2]]),
  // 発展
  ch("three-wants", 3, "次の3つの文の意味の組み合わせとして正しいものはどれですか。\n① I want a ball.　② I want to play.　③ I want to be a player.", [
    ["① ほしい　② したい　③ なりたい", "want・want to・want to be の順です。"],
    ["① したい　② ほしい　③ なりたい", "① の want だけは「ほしい」です。"],
    ["① ほしい　② なりたい　③ したい", "be が入る ③ が「なりたい」です。"],
    ["① なりたい　② したい　③ ほしい", "反対《はんたい》になっています。"],
  ], "want → want to → want to be", ["3つのちがい", "{{want}}（ほしい）→ {{want to}}（したい）→ {{want to be}}（なりたい）。", [S1]], "思考・判断・表現"),
  od("what-be", 3, "「あなたは何になりたいですか。」の意味になるように、ならべかえなさい。", ["What", "do you", "want", "to be?"], "What do you want to be?", ["たずね方", "{{What}} ＋ do you ＋ want ＋ {{to be}}?", [S4]]),
];

// ---- 大問2 夢の話を読んで答える ----
const YOMU: QuestionB[] = [
  // 基本
  ch("pilot", 1, "次の会話を読んで、質問に答えなさい。\nA: What do you want to be?\nB: I want to be a pilot.\n質問：B がなりたい仕事はどれですか。", [
    ["パイロット", "I want to be a pilot. と言っています。"],
    ["医者", "医者は doctor です。"],
    ["先生", "先生は teacher です。"],
    ["警察官《けいさつかん》", "警察官《けいさつかん》は police officer です。"],
  ], "want to be のあとがなりたい仕事", ["聞き取る", "{{want to be}} のあとの {{a pilot}} がなりたい仕事です。", [S4]], "思考・判断・表現"),
  ch("my-dream", 1, "My dream is to be a baker. の意味として正しいものはどれですか。", [
    ["わたしの夢はパン屋さんになることです。", "My dream is to be 〜. は「わたしの夢は〜になることです」です。"],
    ["わたしの夢はパンを食べることです。", "to be は「なること」です。"],
    ["わたしはパン屋さんへ行きたいです。", "go to とは言っていません。"],
    ["わたしのお父さんはパン屋さんです。", "father とは言っていません。"],
  ], "My dream is to be 〜. ＝夢は〜になること", ["もう1つの言い方", "{{My dream is to be 〜.}} も「〜になりたい」を伝える言い方です。", [S4]], "思考・判断・表現"),
  // 標準
  ch("vet-reason", 2, "（　）に入る理由として、いちばん合うものはどれですか。\nI want to be a vet. (　)", [
    ["I like animals.", "獣医《じゅうい》は動物の病気をみる仕事なので、動物が好きという理由が合います。"],
    ["I like cooking.", "料理が好きなら cook などが合います。"],
    ["I can sing well.", "歌がとくいなら singer などが合います。"],
    ["I like airplanes.", "飛行機が好きなら pilot などが合います。"],
  ], "仕事と理由をセットにする", ["合う理由", "{{vet}}（獣医《じゅうい》）→ {{I like animals.}} がつながります。", [S3]], "思考・判断・表現"),
  ch("astronaut", 2, "アオイが話しています。\nAoi: I want to be an astronaut. I like space. I want to see the earth from space.\n質問：アオイについて正しいものはどれですか。", [
    ["宇宙《うちゅう》飛行士になって、宇宙《うちゅう》から地球を見たい", "astronaut は宇宙《うちゅう》飛行士。see the earth from space と言っています。"],
    ["宇宙《うちゅう》飛行士で、地球から宇宙《うちゅう》を見ている", "want to be なので、まだなっていません。"],
    ["パイロットになって、空を飛びたい", "pilot ではなく astronaut です。"],
    ["宇宙《うちゅう》が好きではない", "I like space. と言っています。"],
  ], "夢→理由→したいこと の順に読む", ["文ごとに整理", "夢 {{an astronaut}} → 理由 {{I like space.}} → したいこと see the earth from space。", [S3, S2]], "思考・判断・表現"),
  // 発展
  ch("cook", 3, "（　）に入る仕事の言葉として、いちばん合うものはどれですか。\nHaru: I like cooking. I can make curry and pizza. I want to be a (　).", [
    ["cook", "料理が好きで、カレーやピザが作れるので cook（料理人）が合います。"],
    ["doctor", "医者になりたい理由としては合いません。"],
    ["pilot", "パイロットになりたい理由としては合いません。"],
    ["singer", "歌手になりたい理由としては合いません。"],
  ], "前の理由から、仕事を考える", ["理由から考える", "I like {{cooking}}. I can make curry → {{cook}}（料理人）。", [S3]], "思考・判断・表現"),
  ch("naosu", 3, "Yuto: I want to be teacher. には、まちがいが1つあります。正しく直した文はどれですか。", [
    ["I want to be a teacher.", "仕事の言葉の前には a をつけます。"],
    ["I want to be an teacher.", "teacher は母音の音で始まらないので a です。"],
    ["I want be a teacher.", "want のあとの to をとってしまっています。"],
    ["I want a teacher.", "「先生がほしい」になってしまいます。"],
  ], "仕事の言葉の前の a をわすれない", ["a をつける", "I want to be {{a}} teacher. teacher は a、artist なら an です。", [S2]], "思考・判断・表現"),
];

export const E_ENGLISH_56_YUME_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "外国語（小5・6）",
  minutes: 7,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "I want to be 〜. の言い方", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: IIKATA },
    { title: "夢の話を読んで答える", lead: "放送のかわりに、英語の文がのっています。読んで答えなさい。", style: "word", pick: 3, questions: YOMU },
  ],
};
