// 外国語（小5・6）「中学校でしたいこと」の単元模試 (B: 問題プールからシードで選ぶ)。
// 問題・英文はすべてオリジナル (教科書・ドリル・歌やチャンツの文は使っていない)。
// 大問1「I want to 〜. の言い方」・大問2「スピーチや会話を読んで答える」(放送のかわりに英語の文をのせる)。
// それぞれプール6問 (基本2・標準2・発展2) から基本・標準・発展を1問ずつ。1回 6問・満点100 (基本15・標準17・発展18 × 2)。
// 選択問題は ch()、並べかえは od() で作る。A (生成) は使っていないので検算式はなし。
// 小5・6 の単元なので、小5までに習わない漢字にはルビ《》をつける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "e-english-56-chugaku";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
type Back = ReturnType<typeof L>;
type Step = [string, string, Back[]];
const S1 = L(1, "I want to のあとの言葉で、したいことが決まる");
const S2 = L(2, "部活の言い方：team と club");
const S3 = L(3, "理由をつけたす");
const S4 = L(4, "たずね方");
const S5 = L(5, "スピーチにまとめる");

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

// ---- 大問1 I want to 〜. の言い方 ----
const IIKATA: QuestionB[] = [
  // 基本
  ch("join-soccer", 1, "I want to join the soccer team. の意味として正しいものはどれですか。", [
    ["サッカー部に入りたいです。", "join は「入る・加わる」。want to で「〜したい」です。"],
    ["サッカーを見たいです。", "見るなら watch です。"],
    ["サッカーが好きです。", "好きなら I like soccer. です。"],
    ["サッカー部に入りました。", "すんだことではありません。"],
  ], "join ＋部活 ＝部活に入る", ["動作の言葉", "部活に入るのは {{join}}。I {{want to join}} 〜. で「〜に入りたい」です。", [S1, S2]]),
  ch("make-friends", 1, "「たくさん友だちを作りたいです。」を英語で言うと、どれですか。", [
    ["I want to make many friends.", "友だちを作るは make friends です。"],
    ["I want to join many friends.", "join は部活などに入るときの言葉です。"],
    ["I want make many friends.", "want のあとに to が必要です。"],
    ["I want to many friends.", "to のあとに動作の言葉（make）が必要です。"],
  ], "I want to ＋動作の言葉", ["to のあと", "I want to のあとに動作の言葉 {{make}} を置きます。", [S1]]),
  // 標準
  ch("enjoy", 2, "（　）に入る言葉として、いちばん合うものはどれですか。\nI want to (　) the school festival.", [
    ["enjoy", "行事を楽しむは enjoy です。"],
    ["join", "join は部活などに入るときの言葉です。"],
    ["study", "study は勉強する。行事には合いません。"],
    ["make", "make は作る。「学校祭を作る」になってしまいます。"],
  ], "行事は enjoy", ["何をしたいか", "行事を楽しむなら {{enjoy}}、部活に入るなら join です。", [S1]], "思考・判断・表現"),
  ch("study-math", 2, "「数学を一生けんめい勉強したいです。」を英語で言うと、どれですか。", [
    ["I want to study math hard.", "勉強するは study、一生けんめいは hard です。"],
    ["I want to join math hard.", "join は部活に入るときの言葉です。"],
    ["I want study math hard.", "want のあとに to が必要です。"],
    ["I want to math study hard.", "to のすぐあとに動作の言葉（study）を置きます。"],
  ], "勉強するは study", ["動作の言葉をえらぶ", "I want to {{study}} math hard. のように、to のすぐ後ろに study を置きます。", [S1]]),
  // 発展
  ch("what-club", 3, "「あなたは何の部活に入りたいですか。」を英語で言うと、どれですか。", [
    ["What club do you want to join?", "What club のあとに do you want to join? を続けます。"],
    ["What club do you join want?", "want to join の順です。"],
    ["What do you want club?", "club は What のすぐあとに置きます。"],
    ["Do you want to join club?", "「部活に入りたい？」になり、何の部活かを聞いていません。"],
  ], "What club do you want to join?", ["たずね方", "{{What club}} ＋ do you {{want to join}}? の順です。", [S4]], "思考・判断・表現"),
  od("art-club", 3, "「わたしは美術部に入りたいです。」の意味になるように、ならべかえなさい。", ["I", "want", "to", "join", "the art club."], "I want to join ＋部活.", ["組み立てる", "{{I want to}} ＋ {{join}} ＋ the art club. です。", [S1, S2]]),
];

// ---- 大問2 スピーチや会話を読んで答える ----
const YOMU: QuestionB[] = [
  // 基本
  ch("chorus", 1, "リンが話しています。\nRin: I want to join the chorus. I like singing.\n質問：リンが入りたい部活はどれですか。", [
    ["合唱部", "chorus は合唱部です。"],
    ["吹奏楽部《すいそうがくぶ》", "吹奏楽部《すいそうがくぶ》は brass band です。"],
    ["美術部", "美術部は art club です。"],
    ["野球部", "野球部は baseball team です。"],
  ], "chorus ＝合唱部", ["部活の名前", "{{chorus}}（合唱部）は、それだけで部活を表す言葉です。", [S2]], "思考・判断・表現"),
  ch("riyuu", 1, "次のスピーチで、理由を言っている文はどれですか。\nHello. I want to join the tennis team. I like tennis. Thank you.", [
    ["I like tennis.", "テニスが好きだから入りたい、という理由です。"],
    ["Hello.", "あいさつです。"],
    ["I want to join the tennis team.", "したいことです。"],
    ["Thank you.", "しめくくりの言葉です。"],
  ], "理由は I like 〜. などで言う", ["スピーチの組み立て", "あいさつ→したいこと→{{理由}}（{{I like tennis.}}）→しめくくり。", [S3, S5]], "思考・判断・表現"),
  // 標準
  ch("sports-festival", 2, "次の会話を読んで、質問に答えなさい。\nDaiki: What do you want to do in junior high school?\nMei: I want to enjoy the sports festival.\n質問：メイが中学校でしたいことはどれですか。", [
    ["体育祭を楽しむこと", "enjoy the sports festival と言っています。"],
    ["運動部に入ること", "join（入る）とは言っていません。"],
    ["スポーツを勉強すること", "study とは言っていません。"],
    ["体育祭を見ること", "enjoy は「楽しむ」です。"],
  ], "want to のあとの動作の言葉で決まる", ["動作の言葉", "{{enjoy}}（楽しむ）＋ the sports festival（体育祭）です。", [S1, S4]], "思考・判断・表現"),
  ch("brass-band", 2, "会話の（　）に入る言葉として、いちばん合うものはどれですか。\nA: (　)\nB: I want to join the brass band.", [
    ["What club do you want to join?", "入りたい部活を聞かれて、brass band と答えています。"],
    ["What do you want to be?", "この質問なら I want to be 〜. で答えます。"],
    ["Where do you want to go?", "この質問なら I want to go to 〜. で答えます。"],
    ["Can you play the trumpet?", "この質問なら Yes, I can. か No, I can't. で答えます。"],
  ], "答えの形から、たずねた文を考える", ["答えから考える", "I want to join 〜. で答えるのは {{What club do you want to join?}} です。", [S4]], "思考・判断・表現"),
  // 発展
  od("speech", 3, "中学校でしたいことのスピーチです。聞く人に伝わりやすい順にならべかえなさい。", ["Hello, everyone.", "I want to join the science club.", "I want to be a scientist.", "Thank you."], "あいさつ→したいこと→理由→しめくくり", ["スピーチの順", "{{あいさつ}}→{{したいこと}}→{{理由}}→{{しめくくり}}の順にします。", [S5, S3]]),
  ch("riyuu-match", 3, "Kenta: I want to be a soccer player. のあとに続けるのに、いちばん合う文はどれですか。", [
    ["I want to join the soccer team.", "サッカー選手になりたいという理由に合う、したいことです。"],
    ["I want to join the art club.", "美術部はサッカー選手の夢とつながりません。"],
    ["I want to join the chorus.", "合唱部はサッカー選手の夢とつながりません。"],
    ["I want to be a singer.", "夢が2つになり、話がつながりません。"],
  ], "理由と、したいことをつなげる", ["つながりを考える", "サッカー選手になりたい → だから {{soccer team}} に入りたい、とつながります。", [S3]], "思考・判断・表現"),
];

export const E_ENGLISH_56_CHUGAKU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "外国語（小5・6）",
  minutes: 7,
  review: { status: "draft" },
  sections: [
    { title: "I want to 〜. の言い方", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: IIKATA },
    { title: "スピーチや会話を読んで答える", lead: "放送のかわりに、英語の文がのっています。読んで答えなさい。", style: "word", pick: 3, questions: YOMU },
  ],
};
