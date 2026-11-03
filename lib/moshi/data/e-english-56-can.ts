// 外国語（小5・6）「できること（can）」の単元模試 (B: 問題プールからシードで選ぶ)。
// 問題・英文はすべてオリジナル (教科書・ドリル・歌やチャンツの文は使っていない)。
// 大問1「can の文の形」・大問2「会話や紹介を読んで答える」(放送のかわりに英語の文をのせる)。
// それぞれプール6問 (基本2・標準2・発展2) から基本・標準・発展を1問ずつ。1回 6問・満点100 (基本15・標準17・発展18 × 2)。
// 選択問題は ch()、並べかえは od() で作る。A (生成) は使っていないので検算式はなし。
// 小5・6 の単元なので、小5までに習わない漢字にはルビ《》をつける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "e-english-56-can";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
type Back = ReturnType<typeof L>;
type Step = [string, string, Back[]];
const S1 = L(1, "can を動作の言葉の前におく");
const S2 = L(2, "だれが主語でも、can も動作の言葉もそのまま");
const S3 = L(3, "play のあとに the をつける？つけない？");
const S4 = L(4, "何ができるかをたずねる");

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

// ---- 大問1 can の文の形 ----
const KATACHI: QuestionB[] = [
  // 基本
  ch("swim", 1, "I can swim. の意味として正しいものはどれですか。", [
    ["わたしは泳げます。", "can は「できる」。swim（泳ぐ）の前におきます。"],
    ["わたしは泳げません。", "できないなら I can't swim. です。"],
    ["わたしは泳ぎたいです。", "「〜したい」は want to です。"],
    ["わたしは泳ぎました。", "すんだことではありません。"],
  ], "can ＋動作 ＝〜できる", ["can の意味", "{{can}} は「できる」を足す言葉。I {{can swim}}. で「泳げる」です。", [S1]]),
  ch("cant-ski", 1, "「わたしはスキーができません。」を英語で言うと、どれですか。", [
    ["I can't ski.", "できないときは can't（cannot）を使います。"],
    ["I don't ski can.", "can't を動作の言葉の前におきます。"],
    ["I can ski.", "「スキーができます」になります。"],
    ["Can I ski?", "たずねる形になっています。"],
  ], "できない ＝ can't ＋動作", ["can't の場所", "I {{can't}} ski. のように、can't も動作の言葉の前におきます。", [S1]]),
  // 標準
  ch("she-play", 2, "（　）に入る言葉として正しいものはどれですか。\nShe can (　) the piano.", [
    ["play", "can の後ろの動作の言葉は、もとの形のままです。"],
    ["plays", "She でも、can の後ろに s はつけません。"],
    ["playing", "can の後ろは、もとの形です。"],
    ["played", "can の後ろは、もとの形です。"],
  ], "can の後ろは、もとの形", ["主語がかわっても", "he・she でも {{can ＋もとの形}}。She can {{play}} 〜. です。", [S2]]),
  ch("the-violin", 2, "正しい文はどれですか。", [
    ["I can play the violin.", "楽器には the をつけます。"],
    ["I can play the tennis.", "スポーツには the をつけません。"],
    ["I can play the baseball.", "スポーツには the をつけません。"],
    ["I can play the soccer.", "スポーツには the をつけません。"],
  ], "楽器は the あり、スポーツは the なし", ["play の後ろ", "{{楽器}}は play the 〜、{{スポーツ}}は the なし。", [S3]], "思考・判断・表現"),
  // 発展
  od("run-fast", 3, "「あなたは速く走れますか。」の意味になるように、ならべかえなさい。", ["Can", "you", "run", "fast?"], "たずねるときは can を文の始めに", ["can を前に出す", "たずねるときは {{Can}} を文の始めに出して、{{Can you run fast?}} です。", [S1]]),
  ch("he-can", 3, "Can your brother cook? と聞かれました。「はい、できます」の答えとして正しいものはどれですか。", [
    ["Yes, he can.", "your brother（あなたのお兄さん・弟）は he で受け、can で答えます。"],
    ["Yes, he does.", "Can でたずねられたら can で答えます。"],
    ["Yes, I can.", "聞かれているのは自分ではなく、お兄さん・弟のことです。"],
    ["Yes, he cans.", "can に s はつけません。"],
  ], "Can 〜? には can で、人は he・she で", ["だれのことか", "brother は男の人なので {{he}}。Can でたずねられたので {{Yes, he can.}} です。", [S2, S4]], "思考・判断・表現"),
];

// ---- 大問2 会話や紹介を読んで答える ----
const YOMU: QuestionB[] = [
  // 基本
  ch("jump", 1, "次の会話を読んで、質問に答えなさい。\nA: Can you jump high?\nB: No, I can't.\n質問：B について正しいものはどれですか。", [
    ["高くとぶことができない", "No, I can't.（いいえ、できません）と答えています。"],
    ["高くとぶことができる", "できるなら Yes, I can. です。"],
    ["高くとびたい", "want to（〜したい）は出てきません。"],
    ["速く走ることができない", "聞かれたのは jump high（高くとぶ）です。"],
  ], "No, I can't. ＝いいえ、できません", ["答えを聞く", "{{No, I can't.}} なので、高くとぶことはできません。", [S1]], "思考・判断・表現"),
  ch("curry", 1, "次の会話を読んで、質問に答えなさい。\nA: What can you do?\nB: I can cook curry.\n質問：B ができることはどれですか。", [
    ["カレーを作ること", "cook curry は「カレーを作る」です。"],
    ["カレーを食べること", "食べるなら eat です。"],
    ["カレーを買うこと", "買うなら buy です。"],
    ["なわとびをすること", "なわとびは出てきません。"],
  ], "I can のあとが、できること", ["I can のあと", "{{I can}} のあとの {{cook curry}}（カレーを作る）ができることです。", [S4]], "思考・判断・表現"),
  // 標準
  ch("piano-guitar", 2, "マオが話しています。\nMao: I can play the piano. I can't play the guitar.\n質問：マオについて正しいものはどれですか。", [
    ["ピアノはひけるが、ギターはひけない", "piano は can、guitar は can't です。"],
    ["ギターはひけるが、ピアノはひけない", "反対《はんたい》です。"],
    ["ピアノもギターもひける", "ギターは can't（できない）です。"],
    ["ピアノもギターもひけない", "ピアノは can（できる）です。"],
  ], "can と can't を聞き分ける", ["2つの文", "piano は {{can}}、guitar は {{can't}}。最後の t まで注意して聞きます。", [S1]], "思考・判断・表現"),
  ch("what-can", 2, "会話の（　）に入る言葉として、いちばん合うものはどれですか。\nA: (　)\nB: I can ride a unicycle.\nA: That's great!", [
    ["What can you do?", "「何ができる？」と聞かれて、I can 〜. で答えています。"],
    ["Can you ride a unicycle?", "この質問なら Yes, I can. か No, I can't. で答えます。"],
    ["Do you like unicycles?", "この質問なら Yes, I do. か No, I don't. で答えます。"],
    ["How are you?", "この質問なら I'm fine. のように答えます。"],
  ], "I can 〜. で答えるのは What can you do?", ["答えから考える", "答えが I can 〜. なので、たずねたのは {{What can you do?}} です。", [S4]], "思考・判断・表現"),
  // 発展
  ch("pochi", 3, "ユイが自分の犬を紹介《しょうかい》しています。\nYui: This is my dog, Pochi. He can swim well. He can't run fast.\n質問：ポチについて正しいものはどれですか。", [
    ["じょうずに泳げるが、速くは走れない", "swim well は can、run fast は can't です。"],
    ["速く走れるが、泳げない", "反対《はんたい》です。"],
    ["泳げるし、速く走れる", "run fast は can't（できない）です。"],
    ["ユイが泳げる", "He can swim well. の He はポチのことです。"],
  ], "He が指すものと can・can't をおさえる", ["だれのことか", "{{He}} は Pochi。swim well は {{can}}、run fast は {{can't}} です。", [S2, S1]], "思考・判断・表現"),
  ch("kendama", 3, "「わたしはけん玉ができます。」を英語で言うとき、正しいものはどれですか。", [
    ["I can do kendama.", "けん玉をするは do kendama。can の後ろはもとの形です。"],
    ["I can play the kendama.", "けん玉は楽器ではないので the はつけません。ふつう do kendama と言います。"],
    ["I can plays kendama.", "can の後ろに s はつけません。"],
    ["I can doing kendama.", "can の後ろは、もとの形です。"],
  ], "けん玉は do kendama", ["動作の言葉をえらぶ", "けん玉は {{do kendama}}。can の後ろは {{もとの形}}のままです。", [S3, S2]], "思考・判断・表現"),
];

export const E_ENGLISH_56_CAN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "外国語（小5・6）",
  minutes: 7,
  review: { status: "draft" },
  sections: [
    { title: "can の文の形", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: KATACHI },
    { title: "会話や紹介《しょうかい》を読んで答える", lead: "放送のかわりに、英語の文がのっています。読んで答えなさい。", style: "word", pick: 3, questions: YOMU },
  ],
};
