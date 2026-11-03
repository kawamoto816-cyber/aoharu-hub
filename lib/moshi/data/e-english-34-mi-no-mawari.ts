// 外国語活動（小3・4）「身の回りの物の言い方」の単元模試 (B: 問題プールからシードで選ぶ)。
// 問題・英文はすべてオリジナル (教科書・ドリル・歌やチャンツの文は使っていない)。
// 大問1「物の名前」・大問2「会話を読んで答える」(放送のかわりに会話の文をのせる)。
// それぞれプール6問 (基本2・標準2・発展2) から基本・標準・発展を1問ずつ。1回 6問・満点100 (基本15・標準17・発展18 × 2)。
// 選択問題は ch() で作る (opts の先頭が正解。画面で並べかえる)。A (生成) は使っていないので検算式はなし。
// 小3・4 の単元なので、小3までに習わない漢字にはルビ《》をつける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "e-english-34-mi-no-mawari";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
type Back = ReturnType<typeof L>;
const S1 = L(1, "物をなかま分けして覚《おぼ》える");
const S2 = L(2, "にている語に気をつける");
const S3 = L(3, "「これは何？」と聞く・答える");
const S4 = L(4, "持っているか聞く・だれの物か言う");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 50, 3: 60 } as const;
/** 選択問題。opts は [選択肢, その理由] で、先頭が正解 */
function ch(id: string, d: 1 | 2 | 3, prompt: string, opts: [string, string][], point: string, step: [string, string, Back[]], skill: QuestionB["skill"] = "知識・技能"): QuestionB {
  return { id, type: "B", difficulty: d, points: P[d], seconds: T[d], skill, prompt, answer: { kind: "choice", options: opts.map((o) => o[0]), correct: 0, why: opts.map((o) => o[1]) }, point, steps: [{ title: step[0], body: step[1], back: step[2] }] };
}

// ---- 大問1 物の名前 ----
const NAMAE: QuestionB[] = [
  // 基本
  ch("eraser", 1, "eraser はどれですか。", [
    ["消しゴム", "eraser は消しゴムです。"],
    ["えんぴつ", "えんぴつは pencil です。"],
    ["じょうぎ", "じょうぎは ruler です。"],
    ["ノート", "ノートは notebook です。"],
  ], "eraser ＝消しゴム", ["筆箱のなかま", "筆箱に入る物：pencil・{{eraser}}（消しゴム）・ruler など。", [S1]]),
  ch("cap", 1, "ぼうしを英語《えいご》で言うと、どれですか。", [
    ["cap", "cap はぼうしです。"],
    ["cup", "cup はカップです。まん中の文字が1つちがいます。"],
    ["cat", "cat はねこです。"],
    ["map", "map は地図です。"],
  ], "cap（ぼうし）と cup（カップ）", ["にている語", "{{cap}} はぼうし、{{cup}} はカップ。まん中の文字に気をつけます。", [S2]]),
  // 標準
  ch("desk", 2, "筆箱に入らない物はどれですか。", [
    ["desk", "desk はつくえ。教室にある物で、筆箱には入りません。"],
    ["pencil", "pencil（えんぴつ）は筆箱に入ります。"],
    ["eraser", "eraser（消しゴム）は筆箱に入ります。"],
    ["ruler", "ruler（じょうぎ）は筆箱に入ります。"],
  ], "使う場所でなかま分けする", ["なかま分け", "pencil・eraser・ruler は筆箱のなかま、{{desk}}（つくえ）は教室のなかまです。", [S1]], "思考・判断・表現"),
  ch("pencil", 2, "pencil の意味として正しいものはどれですか。", [
    ["えんぴつ", "pencil はえんぴつです。"],
    ["ペン", "ペンは pen です。pencil とは別《べつ》の物です。"],
    ["筆箱", "筆箱は pencil case です。"],
    ["消しゴム", "消しゴムは eraser です。"],
  ], "pen と pencil は別《べつ》の物", ["にている語", "{{pen}} はペン、{{pencil}} はえんぴつ。絵と語をセットで覚《おぼ》えます。", [S2]]),
  // 発展
  ch("your-book", 3, "「あなたの本」を英語《えいご》で言うと、どれですか。", [
    ["your book", "your（あなたの）を book の前につけます。"],
    ["a your book", "your をつけたときは、a はつけません。"],
    ["you book", "「あなたの」は you ではなく your です。"],
    ["my book", "my は「わたしの」です。"],
  ], "my・your をつけたら a はつけない", ["物の前につける言葉", "{{your}}（あなたの）を物の前につけます。my・your があるときは {{a はつけません}}。", [S4]], "思考・判断・表現"),
  ch("an-eraser", 3, "（　）に入る言葉として正しいものはどれですか。\nIt's (　) eraser.", [
    ["an", "eraser は、はじめの音がイに近いので an をつけます。"],
    ["a", "eraser はイに近い音で始まるので、a ではなく an です。"],
    ["two", "two（2つ）なら erasers と s がつきます。"],
    ["my a", "my と a をいっしょにはつけません。"],
  ], "イに近い音で始まる語には an", ["はじめの音", "{{eraser}} はイに近い音で始まるので {{an}} eraser です。", [S3]], "思考・判断・表現"),
];

// ---- 大問2 会話を読んで答える ----
const KAIWA: QuestionB[] = [
  // 基本
  ch("ruler", 1, "次の会話を読んで、質問《しつもん》に答えなさい。\nA: What's this?\nB: It's a ruler.\n質問《しつもん》：B が答えた物はどれですか。", [
    ["じょうぎ", "ruler はじょうぎです。"],
    ["のり", "のりは glue です。"],
    ["はさみ", "はさみは scissors です。"],
    ["ノート", "ノートは notebook です。"],
  ], "It's のあとが物の名前", ["答えを聞く", "It's a のあとの {{ruler}}（じょうぎ）が答えです。", [S3]], "思考・判断・表現"),
  ch("have-yes", 1, "次の会話を読んで、質問《しつもん》に答えなさい。\nA: Do you have a pencil?\nB: Yes, I do.\n質問《しつもん》：B について正しいものはどれですか。", [
    ["えんぴつを持っている", "Do you have a pencil? に Yes, I do. と答えています。"],
    ["えんぴつを持っていない", "持っていないなら No, I don't. です。"],
    ["えんぴつがほしい", "have は「持っている」です。「ほしい」は want。"],
    ["ペンを持っている", "聞かれたのは pencil（えんぴつ）です。"],
  ], "Do you have 〜? は「持っていますか」", ["have の意味", "{{have}} は「持っている」。{{Yes, I do.}} なので持っています。", [S4]], "思考・判断・表現"),
  // 標準
  ch("whats-this", 2, "会話の（　）に入る言葉として、いちばん合うものはどれですか。\nA: (　)\nB: It's a clock.", [
    ["What's this?", "「これは何？」と聞かれて、It's a clock. と答えています。"],
    ["Do you have a clock?", "この質問《しつもん》なら Yes, I do. か No, I don't. で答えます。"],
    ["How are you?", "この質問《しつもん》なら I'm fine. のように答えます。"],
    ["What color do you like?", "この質問《しつもん》なら I like ＋色. で答えます。"],
  ], "It's 〜. で答えるのは What's this?", ["答えから考える", "It's a clock.（時計です）と答えるのは {{What's this?}} です。", [S3]], "思考・判断・表現"),
  ch("blue-pen", 2, "次の会話を読んで、質問《しつもん》に答えなさい。\nKen: Do you have a red pen?\nAya: No, I don't. I have a blue pen.\n質問《しつもん》：アヤが持っている物はどれですか。", [
    ["青いペン", "I have a blue pen. と言っています。"],
    ["赤いペン", "赤いペンは No, I don't.（持っていない）と答えています。"],
    ["青いえんぴつ", "pen はペンです。えんぴつは pencil。"],
    ["何も持っていない", "I have a blue pen. と言っています。"],
  ], "No のあとの I have 〜. を聞く", ["2つ目の文", "{{No, I don't.}} のあとの {{I have a blue pen.}} が持っている物です。", [S4]], "思考・判断・表現"),
  // 発展
  ch("your-notebook", 3, "先生が言いました。\nTeacher: This is my bag. This is your notebook, Yuki.\n質問《しつもん》：ノートはだれの物ですか。", [
    ["ユキ", "your notebook, Yuki（ユキ、あなたのノート）と言っています。"],
    ["先生", "先生の物（my）は bag（かばん）です。"],
    ["先生とユキの2人", "ノートは your（あなたの）だけです。"],
    ["分からない", "your notebook, Yuki で、ユキの物と分かります。"],
  ], "my はわたしの、your はあなたの", ["だれの物か", "{{my}} bag は先生の物、{{your}} notebook はユキの物です。", [S4]], "思考・判断・表現"),
  ch("cup-cap", 3, "会話の（　）に入る言葉として、いちばん合うものはどれですか。\nA: Do you have a cup?\nB: (　) I have a cap.", [
    ["No, I don't.", "cup（カップ）は持っていなくて、cap（ぼうし）を持っていると言っています。"],
    ["Yes, I do.", "持っているのは cap です。cup とは別《べつ》の物です。"],
    ["It's a cup.", "Do you have 〜? には Yes・No で答えます。"],
    ["Me, too.", "質問《しつもん》への答えになりません。"],
  ], "cup と cap を聞き分けてから答える", ["にている語を聞き分ける", "聞かれたのは {{cup}}（カップ）、持っているのは {{cap}}（ぼうし）。だから {{No, I don't.}} です。", [S2, S4]], "思考・判断・表現"),
];

export const E_ENGLISH_34_MI_NO_MAWARI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "外国語活動（小3・4）",
  minutes: 6,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "物の名前", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: NAMAE },
    { title: "会話を読んで答える", lead: "放送のかわりに、会話の文がのっています。読んで答えなさい。", style: "word", pick: 3, questions: KAIWA },
  ],
};
