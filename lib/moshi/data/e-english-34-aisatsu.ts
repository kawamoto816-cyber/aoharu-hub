// 外国語活動（小3・4）「あいさつと気持ち」の単元模試 (B: 問題プールからシードで選ぶ)。
// 問題・英文はすべてオリジナル (教科書・ドリル・歌やチャンツの文は使っていない)。
// 大問1「あいさつと気持ちの言葉」・大問2「会話を読んで答える」(放送のかわりに会話の文をのせる)。
// それぞれプール6問 (基本2・標準2・発展2) から基本・標準・発展を1問ずつ。1回 6問・満点100 (基本15・標準17・発展18 × 2)。
// 選択問題は ch() で作る (opts の先頭が正解。画面で並べかえる)。A (生成) は使っていないので検算式はなし。
// 小3・4 の単元なので、小3までに習わない漢字にはルビ《》をつける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "e-english-34-aisatsu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
type Back = ReturnType<typeof L>;
const S1 = L(1, "時刻《じこく》で変《か》わるあいさつ");
const S2 = L(2, "はじめて会ったとき");
const S3 = L(3, "How are you? と気持ちの言葉");
const S4 = L(4, "会話をつなげてみよう");
const S5 = L(5, "地球の反対側《はんたいがわ》とあいさつ");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 50, 3: 60 } as const;
/** 選択問題。opts は [選択肢, その理由] で、先頭が正解 */
function ch(id: string, d: 1 | 2 | 3, prompt: string, opts: [string, string][], point: string, step: [string, string, Back[]], skill: QuestionB["skill"] = "知識・技能"): QuestionB {
  return { id, type: "B", difficulty: d, points: P[d], seconds: T[d], skill, prompt, answer: { kind: "choice", options: opts.map((o) => o[0]), correct: 0, why: opts.map((o) => o[1]) }, point, steps: [{ title: step[0], body: step[1], back: step[2] }] };
}

// ---- 大問1 あいさつと気持ちの言葉 ----
const KOTOBA: QuestionB[] = [
  // 基本
  ch("asa", 1, "朝、学校の前で先生に会いました。何と言いますか。", [
    ["Good morning.", "朝に会ったときのあいさつです。"],
    ["Good night.", "ねる前や、夜に別《わか》れるときの「おやすみなさい」です。"],
    ["Good afternoon.", "昼すぎに会ったときのあいさつです。"],
    ["Thank you.", "お礼の言葉です。"],
  ], "朝に会ったら Good morning.", ["時刻《じこく》で考える", "朝に会ったときは {{Good morning.}} です。あいさつは時刻《じこく》で言葉が変《か》わります。", [S1]]),
  ch("hungry", 1, "I'm hungry. の意味として正しいものはどれですか。", [
    ["おなかがすいています。", "hungry は「おなかがすいた」です。"],
    ["ねむいです。", "「ねむい」は sleepy です。"],
    ["元気です。", "「元気」は fine や good です。"],
    ["悲しいです。", "「悲しい」は sad です。"],
  ], "hungry ＝おなかがすいた", ["気持ちの言葉", "I'm のあとに今の様子の言葉を入れます。{{hungry}} は「おなかがすいた」です。", [S3]]),
  // 標準
  ch("night", 2, "夜、ねる前に家族に言うあいさつはどれですか。", [
    ["Good night.", "ねる前の「おやすみなさい」です。"],
    ["Good evening.", "夜に人と会ったときの「こんばんは」です。ねる前には言いません。"],
    ["Good afternoon.", "昼すぎに会ったときのあいさつです。"],
    ["Good morning.", "朝のあいさつです。"],
  ], "ねる前は Good night.", ["会うときと別《わか》れるとき", "{{Good night.}} は「おやすみなさい」。夜に会ったときの Good evening. とちがい、ねる前や別《わか》れるときに言います。", [S1]]),
  ch("too", 2, "はじめて会った人に Nice to meet you. と言われました。返す言葉として正しいものはどれですか。", [
    ["Nice to meet you, too.", "最後《さいご》に too をつけると「こちらこそ」の意味になります。"],
    ["I'm fine.", "How are you? と聞かれたときの答えです。"],
    ["You're welcome.", "Thank you. と言われたときの「どういたしまして」です。"],
    ["Good night.", "ねる前の「おやすみなさい」です。"],
  ], "Nice to meet you. には too をつけて返す", ["too をつける", "同じ言葉の最後《さいご》に {{too}} をつけて、Nice to meet you, too. と返します。", [S2]]),
  // 発展
  ch("how-answer", 3, "How are you? と聞かれました。答えとして正しいものはどれですか。", [
    ["I'm fine, thank you.", "How are you? は様子を聞く言葉なので、I'm のあとに気持ちを言います。"],
    ["Yes, I am.", "How are you? は「はい・いいえ」で答える質問《しつもん》ではありません。"],
    ["I'm Ken.", "名前を言っています。様子を聞かれたので、気持ちを答えます。"],
    ["Nice to meet you.", "はじめて会ったときのあいさつです。"],
  ], "How are you? には I'm ＋気持ち で答える", ["何を聞かれているか", "How are you? は「元気？」と{{様子}}を聞く言葉です。{{I'm fine.}} のように気持ちで答えます。", [S3]], "思考・判断・表現"),
  ch("afternoon", 3, "午後3時、公園で近所の人に会いました。最初《さいしょ》に言うあいさつとして、いちばん合うものはどれですか。", [
    ["Good afternoon.", "昼すぎに会ったときのあいさつです。午後3時に合います。"],
    ["Good morning.", "朝のあいさつです。午後3時には合いません。"],
    ["Good night.", "ねる前や別《わか》れるときの言葉です。会ったときには使いません。"],
    ["Goodbye.", "別《わか》れるときの言葉です。会ったばかりなので合いません。"],
  ], "昼すぎに会ったら Good afternoon.", ["時刻《じこく》と場面", "午後3時に{{会った}}ので、{{Good afternoon.}} です。Hello. もいつでも使えます。", [S1, S4]], "思考・判断・表現"),
];

// ---- 大問2 会話を読んで答える ----
const KAIWA: QuestionB[] = [
  // 基本
  ch("welcome", 1, "会話の（　）に入る言葉として正しいものはどれですか。\nA: Thank you.\nB: (　)", [
    ["You're welcome.", "お礼を言われたときの「どういたしまして」です。"],
    ["Good morning.", "朝のあいさつです。お礼への返事ではありません。"],
    ["I'm fine.", "How are you? への答えです。"],
    ["Nice to meet you.", "はじめて会ったときの言葉です。"],
  ], "Thank you. には You're welcome.", ["お礼への返事", "{{Thank you.}} と言われたら {{You're welcome.}}（どういたしまして）と返します。", [S4]], "思考・判断・表現"),
  ch("hajimete", 1, "次の会話を読んで、質問《しつもん》に答えなさい。\nAnn: Hello. I'm Ann.\nTaku: Hi. I'm Taku. Nice to meet you.\n質問《しつもん》：タクがアンに伝《つた》えたことはどれですか。", [
    ["自分の名前と「はじめまして」", "I'm Taku.（名前）と Nice to meet you.（はじめまして）を言っています。"],
    ["今の気持ち", "気持ちの言葉（fine・happy など）は言っていません。"],
    ["お礼", "Thank you. は言っていません。"],
    ["お別《わか》れのあいさつ", "Goodbye. や See you. は言っていません。"],
  ], "I'm ＋名前、そして Nice to meet you.", ["はじめて会ったとき", "{{I'm 〜.}} で名前を言い、{{Nice to meet you.}} で「はじめまして」を伝《つた》えています。", [S2]], "思考・判断・表現"),
  // 標準
  ch("great", 2, "次の会話を読んで、質問《しつもん》に答えなさい。\nMr. Green: Good morning, Yui. How are you?\nYui: I'm great!\n質問《しつもん》：ユイは今、どんな様子ですか。", [
    ["とても元気", "great は「とてもいい」。とても元気だと答えています。"],
    ["ねむい", "「ねむい」は sleepy です。"],
    ["つかれている", "「つかれている」は tired です。"],
    ["おなかがすいている", "「おなかがすいた」は hungry です。"],
  ], "I'm のあとの言葉が気持ち", ["I'm のあとを聞く", "How are you? への答えは I'm のあとの言葉。{{great}} は「とても元気・とてもいい」です。", [S3]], "思考・判断・表現"),
  ch("and-you", 2, "会話の（　）に入る言葉として、いちばん合うものはどれですか。\nJun: Hi, Lisa. How are you?\nLisa: I'm fine, thank you. And you?\nJun: (　)", [
    ["I'm good, thanks.", "And you?（あなたは？）と様子を聞き返されたので、自分の様子を答えます。"],
    ["You're welcome.", "お礼を言われたときの返事です。"],
    ["Nice to meet you, too.", "はじめて会ったときの返事です。"],
    ["Good night.", "ねる前の「おやすみなさい」です。"],
  ], "And you? と聞き返されたら、自分の様子を言う", ["聞き返しに答える", "{{And you?}} は「あなたは（元気）？」。ジュンは自分の様子を {{I'm good.}} のように答えます。", [S3, S4]], "思考・判断・表現"),
  // 発展
  ch("sleepy", 3, "会話の（　）に入る言葉として、いちばん合うものはどれですか。\nEmma: How are you, Sota?\nSota: (　)\nEmma: Oh, go to bed early tonight.", [
    ["I'm sleepy.", "エマが「今夜は早くねてね」と言っているので、ねむいと答えたと分かります。"],
    ["I'm hungry.", "おなかがすいた人に「早くねて」とは言いません。"],
    ["I'm happy.", "うれしい人に「早くねて」とは言いません。"],
    ["Nice to meet you.", "How are you? への答えではありません。"],
  ], "あとの言葉から、前の答えを考える", ["あとの言葉が手がかり", "エマの go to bed early（早くねてね）から、ソウタは {{sleepy}}（ねむい）と答えたと考えます。", [S3, S4]], "思考・判断・表現"),
  ch("newyork", 3, "日本は朝8時です。日本のケンが、ニューヨークのリサとテレビ電話で話します。ニューヨークは前の日の夜7時です。リサが最初《さいしょ》に言うあいさつとして、いちばん合うものはどれですか。", [
    ["Good evening.", "リサがいるニューヨークは夜7時。夜に会ったときは Good evening. です。"],
    ["Good morning.", "朝なのは日本のケンのほうです。リサは自分のいる場所の時刻《じこく》で選《えら》びます。"],
    ["Good night.", "ねる前や別《わか》れるときの言葉です。会ったばかりなので合いません。"],
    ["Good afternoon.", "昼すぎのあいさつです。夜7時には合いません。"],
  ], "あいさつは自分のいる場所の時刻《じこく》で", ["だれの時刻《じこく》か", "あいさつは{{自分のいる場所の時刻《じこく》}}で選《えら》びます。リサは夜7時なので {{Good evening.}} です。", [S5, S1]], "思考・判断・表現"),
];

export const E_ENGLISH_34_AISATSU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "外国語活動（小3・4）",
  minutes: 6,
  review: { status: "draft" },
  sections: [
    { title: "あいさつと気持ちの言葉", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: KOTOBA },
    { title: "会話を読んで答える", lead: "放送のかわりに、会話の文がのっています。読んで答えなさい。", style: "word", pick: 3, questions: KAIWA },
  ],
};
