// 外国語（小5・6）「人を紹介する（He is 〜. / She is 〜.）」の単元模試 (B: 問題プールからシードで選ぶ)。
// 問題・英文はすべてオリジナル (教科書・ドリル・歌やチャンツの文は使っていない)。
// 大問1「He・She の使い分け」・大問2「紹介を読んで答える」(放送のかわりに英語の文をのせる)。
// それぞれプール6問 (基本2・標準2・発展2) から基本・標準・発展を1問ずつ。1回 6問・満点100 (基本15・標準17・発展18 × 2)。
// 選択問題は ch()、並べかえは od() で作る。A (生成) は使っていないので検算式はなし。
// 小5・6 の単元なので、小5までに習わない漢字にはルビ《》をつける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "e-english-56-hito";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
type Back = ReturnType<typeof L>;
type Step = [string, string, Back[]];
const S1 = L(1, "This is 〜. で始め、2回目からは He・She");
const S2 = L(2, "He と She の使い分け");
const S3 = L(3, "He is・She is のあとに来る言葉");
const S4 = L(4, "「だれ？」とたずねる・答える");

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

// ---- 大問1 He・She の使い分け ----
const TSUKAIWAKE: QuestionB[] = [
  // 基本
  ch("this-is", 1, "写真を指して This is Riku. と言いました。意味として正しいものはどれですか。", [
    ["こちらはリクです。", "This is 〜. は人を紹介《しょうかい》するときの「こちらは〜です」です。"],
    ["わたしはリクです。", "自分のことなら I'm Riku. です。"],
    ["リクはどこですか。", "たずねる文ではありません。"],
    ["リクが好きです。", "好きなら I like 〜. です。"],
  ], "This is 〜. ＝こちらは〜です", ["紹介《しょうかい》の始め", "人を紹介《しょうかい》するときは、まず {{This is 〜.}} で名前を言います。", [S1]]),
  ch("she", 1, "This is my aunt, Mika. のあと、ミカさんのことを続けて言うとき、文の始めに使う言葉はどれですか。", [
    ["She", "aunt（おば）は女の人なので She です。"],
    ["He", "He は男の人・男の子に使います。"],
    ["I", "I は自分のことです。"],
    ["You", "You は話している相手のことです。"],
  ], "女の人は She、男の人は He", ["2回目からは", "名前をくり返さず、女の人なら {{She}}、男の人なら {{He}} にかえます。", [S1, S2]]),
  // 標準
  ch("her-name", 2, "女の人の名前を伝えるとき、正しい文はどれですか。", [
    ["Her name is Mina.", "女の人の「その人の名前は」は Her name です。"],
    ["His name is Mina.", "His は男の人に使います。"],
    ["She name is Mina.", "「かのじょの名前」は She name ではなく Her name です。"],
    ["Her is Mina.", "name がぬけています。"],
  ], "男の人は His name、女の人は Her name", ["His と Her", "男の人なら {{His name is 〜.}}、女の人なら {{Her name is 〜.}} です。", [S2]]),
  ch("good-at", 2, "He is good at cooking. の意味として正しいものはどれですか。", [
    ["かれは料理がとくいです。", "good at 〜 は「〜がとくい」です。"],
    ["かれは料理が好きです。", "好きなら He likes cooking. です。"],
    ["かれは料理をしたいです。", "したいなら want to です。"],
    ["かれは料理ができません。", "できないなら can't です。"],
  ], "good at 〜 ＝〜がとくい", ["とくいなこと", "とくいなことは {{good at 〜}} で言います。", [S3]]),
  // 発展
  ch("who", 3, "Who is this? と聞かれました。答えとして、いちばん合うものはどれですか。", [
    ["This is my uncle.", "「だれ？」と聞かれたので、This is 〜. でだれかを答えます。"],
    ["Yes, he is.", "Who で聞かれたら、Yes・No では答えません。"],
    ["He is good at tennis.", "とくいなことで、だれかを答えていません。"],
    ["I'm fine, thank you.", "How are you? への答えです。"],
  ], "Who is this? には This is 〜.", ["何を聞かれたか", "{{Who}}（だれ）と聞かれたので、{{This is my uncle.}} のように答えます。", [S4]], "思考・判断・表現"),
  od("good-at-dancing", 3, "「かのじょはダンスがとくいです。」の意味になるように、ならべかえなさい。", ["She", "is", "good", "at", "dancing."], "She is good at 〜.", ["組み立てる", "{{She is}} ＋ {{good at}} ＋ dancing. です。", [S3, S2]]),
];

// ---- 大問2 紹介を読んで答える ----
const YOMU: QuestionB[] = [
  // 基本
  ch("pe-teacher", 1, "ケンが写真を見せて話しています。\nKen: This is Mr. Sato. He is our P.E. teacher.\n質問：サトウ先生が教えている教科はどれですか。", [
    ["体育", "P.E. teacher は体育の先生です。"],
    ["音楽", "音楽は music です。"],
    ["算数", "算数は math です。"],
    ["英語", "英語は English です。"],
  ], "P.E. ＝体育", ["He is のあと", "{{He is}} のあとの {{our P.E. teacher}}（体育の先生）が、どんな人かです。", [S3]], "思考・判断・表現"),
  ch("brother", 1, "アイが話しています。\nAi: This is Kenta. He is my brother.\n質問：ケンタはアイにとってだれですか。", [
    ["兄か弟", "brother は兄や弟です。"],
    ["姉か妹", "姉や妹は sister です。"],
    ["お父さん", "お父さんは father です。"],
    ["友だち", "友だちは friend です。"],
  ], "brother ＝兄・弟、sister ＝姉・妹", ["関係《かんけい》の言葉", "He is my {{brother}}. で、ケンタは兄か弟です。", [S3]], "思考・判断・表現"),
  // 標準
  ch("is-she", 2, "会話の（　）に入る言葉として正しいものはどれですか。\nA: Is she your sister?\nB: Yes, (　).", [
    ["she is", "Is she 〜? には she で答えます。"],
    ["he is", "聞かれたのは she（女の人）です。"],
    ["I am", "聞かれたのは自分ではありません。"],
    ["she does", "Is でたずねられたら is で答えます。"],
  ], "Is she 〜? には Yes, she is.", ["同じ言葉で答える", "{{Is she}} 〜? には {{Yes, she is.}} と、she と is で答えます。", [S4]], "思考・判断・表現"),
  ch("aoi", 2, "ユウが友だちを紹介《しょうかい》しています。\nYu: This is my friend, Aoi. She is kind. She can play the flute.\n質問：アオイについて正しいものはどれですか。", [
    ["やさしくて、フルートがふける", "She is kind.（やさしい）と She can play the flute. と言っています。"],
    ["やさしくて、ピアノがひける", "楽器は flute（フルート）です。"],
    ["ユウのお姉さんで、フルートがふける", "my friend（友だち）と言っています。"],
    ["元気で、フルートがふけない", "kind は「やさしい」、can は「できる」です。"],
  ], "She のあとの文を1つずつ読む", ["1文ずつ読む", "{{She is kind.}}（人がら）、{{She can play the flute.}}（できること）。", [S1, S3]], "思考・判断・表現"),
  // 発展
  ch("grandfather", 3, "（①）（②）に入る言葉の組み合わせとして正しいものはどれですか。\nThis is my grandfather. (①) name is Taro. (②) is a farmer.", [
    ["① His　② He", "grandfather は男の人。「かれの名前」は His name、「かれは」は He です。"],
    ["① He　② His", "反対《はんたい》です。name の前は His、is の前は He です。"],
    ["① Her　② She", "grandfather は男の人なので、Her・She は使いません。"],
    ["① His　② She", "grandfather は男の人なので、She は使いません。"],
  ], "name の前は His・Her、is の前は He・She", ["男女と場所で決める", "男の人なので {{His}} name、{{He}} is です。", [S2]], "思考・判断・表現"),
  ch("emma", 3, "紹介《しょうかい》を読んで、質問に答えなさい。\nThis is Emma. She is from Canada. She is good at skiing. She can speak French, too.\n質問：エマについて正しいものはどれですか。", [
    ["カナダ出身で、スキーがとくい", "from Canada と good at skiing と言っています。"],
    ["フランス出身で、スキーがとくい", "from Canada（カナダ出身）です。French は話せる言葉です。"],
    ["カナダ出身で、スケートがとくい", "とくいなのは skiing（スキー）です。"],
    ["カナダ出身で、フランス語は話せない", "can speak French（フランス語が話せる）と言っています。"],
  ], "from は出身、good at はとくい、can はできること", ["文ごとに整理", "出身 {{Canada}}、とくい {{skiing}}、できること {{speak French}}。", [S3]], "思考・判断・表現"),
];

export const E_ENGLISH_56_HITO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "外国語（小5・6）",
  minutes: 7,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "He・She の使い分け", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: TSUKAIWAKE },
    { title: "紹介《しょうかい》を読んで答える", lead: "放送のかわりに、英語の文がのっています。読んで答えなさい。", style: "word", pick: 3, questions: YOMU },
  ],
};
