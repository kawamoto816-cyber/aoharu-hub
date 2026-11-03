// 外国語活動（小3・4）「時刻と一日の生活」の単元模試 (B: 問題プールからシードで選ぶ)。
// 問題・英文はすべてオリジナル (教科書・ドリル・歌やチャンツの文は使っていない)。
// 大問1「時刻と生活の言い方」・大問2「時刻を聞き取る」(放送のかわりに会話の文をのせる)。
// それぞれプール6問 (基本2・標準2・発展2) から基本・標準・発展を1問ずつ。1回 6問・満点100 (基本15・標準17・発展18 × 2)。
// 選択問題は ch() で作る (opts の先頭が正解。画面で並べかえる)。A (生成) は使っていないので検算式はなし。
// 小3・4 の単元なので、小3までに習わない漢字にはルビ《》をつける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "e-english-34-jikoku";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
type Back = ReturnType<typeof L>;
const S1 = L(1, "時刻《じこく》は It's の後ろに「時→分」");
const S2 = L(2, "時刻《じこく》をたずねて、答える");
const S3 = L(3, "一日の生活を表す言葉");
const S4 = L(4, "「〜時に」は at、午前は a.m.・午後は p.m.");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 50, 3: 60 } as const;
/** 選択問題。opts は [選択肢, その理由] で、先頭が正解 */
function ch(id: string, d: 1 | 2 | 3, prompt: string, opts: [string, string][], point: string, step: [string, string, Back[]], skill: QuestionB["skill"] = "知識・技能"): QuestionB {
  return { id, type: "B", difficulty: d, points: P[d], seconds: T[d], skill, prompt, answer: { kind: "choice", options: opts.map((o) => o[0]), correct: 0, why: opts.map((o) => o[1]) }, point, steps: [{ title: step[0], body: step[1], back: step[2] }] };
}

// ---- 大問1 時刻と生活の言い方 ----
const IIKATA: QuestionB[] = [
  // 基本
  ch("seven-thirty", 1, "It's seven thirty. は何時ですか。", [
    ["7時30分", "時の数（seven）が先、分の数（thirty）が後です。"],
    ["3時7分", "時と分が反対《はんたい》です。英語《えいご》も時が先です。"],
    ["7時13分", "13は thirteen。thirty は30です。"],
    ["7時ちょうど", "ちょうど7時なら It's seven. や It's seven o'clock. です。"],
  ], "時が先、分が後", ["順《じゅん》に読む", "{{seven}}（7時）→ {{thirty}}（30分）で、7時30分です。", [S1]]),
  ch("what-time", 1, "「今、何時ですか。」を英語《えいご》で言うと、どれですか。", [
    ["What time is it?", "時刻《じこく》をたずねる言い方です。"],
    ["What day is it?", "曜日をたずねる言い方です。"],
    ["How are you?", "様子をたずねる言い方です。"],
    ["How many?", "数をたずねる言い方です。"],
  ], "時刻《じこく》は What time is it?", ["たずね方", "時刻《じこく》は {{What time is it?}} とたずね、It's 〜. で答えます。", [S2]]),
  // 標準
  ch("eight-fifteen", 2, "8時15分を英語《えいご》で言うと、どれですか。", [
    ["It's eight fifteen.", "時の eight が先、分の fifteen が後です。"],
    ["It's fifteen eight.", "分が先になっています。時が先です。"],
    ["It's eight fifty.", "fifty は50です。15は fifteen。"],
    ["It's eighteen.", "eighteen は18です。"],
  ], "It's ＋時＋分.", ["ならべ方", "{{It's}} ＋ {{eight}}（時）＋ {{fifteen}}（分）です。", [S1]]),
  ch("get-up", 2, "get up の意味として正しいものはどれですか。", [
    ["起きる", "get up は「起きる」です。"],
    ["ねる", "「ねる」は go to bed です。"],
    ["学校へ行く", "「学校へ行く」は go to school です。"],
    ["家に帰る", "「家に帰る」は go home です。"],
  ], "get up ＝起きる、go to bed ＝ねる", ["生活の言葉", "{{get up}}（起きる）・go to school（学校へ行く）・go to bed（ねる）をセットで覚《おぼ》えます。", [S3]]),
  // 発展
  ch("at-six", 3, "「わたしは6時に起きます。」を英語《えいご》で言うと、どれですか。", [
    ["I get up at six.", "「〜時に」は時刻《じこく》の前に at をつけます。"],
    ["I get up six at.", "at は時刻《じこく》の前に入れます。"],
    ["I at six get up.", "get up（起きる）は I のすぐ後ろです。"],
    ["I go to bed at six.", "go to bed は「ねる」です。"],
  ], "「〜時に」は at ＋時刻《じこく》", ["at の場所", "I {{get up}} {{at six}}. のように、at は時刻《じこく》のすぐ前に入れます。", [S4, S3]], "思考・判断・表現"),
  ch("pm", 3, "9 p.m. の意味として正しいものはどれですか。", [
    ["午後9時（夜の9時）", "p.m. は午後です。"],
    ["午前9時（朝の9時）", "午前は a.m. です。"],
    ["9分", "p.m. は「分」ではありません。"],
    ["9時30分", "30分なら nine thirty です。"],
  ], "a.m. は午前、p.m. は午後", ["数の後ろの記号", "数の後ろの {{a.m.}} は午前、{{p.m.}} は午後です。", [S4]], "思考・判断・表現"),
];

// ---- 大問2 時刻を聞き取る ----
const KIKU: QuestionB[] = [
  // 基本
  ch("ten", 1, "次の会話を読んで、質問《しつもん》に答えなさい。\nA: What time is it?\nB: It's ten.\n質問《しつもん》：今は何時ですか。", [
    ["10時", "ten は10です。"],
    ["2時", "2は two です。"],
    ["12時", "12は twelve です。"],
    ["10時30分", "30分なら ten thirty です。"],
  ], "It's のあとの数を聞く", ["数を聞き取る", "It's のあとの {{ten}}（10）が時刻《じこく》です。", [S2]], "思考・判断・表現"),
  ch("four-forty", 1, "次の会話を読んで、質問《しつもん》に答えなさい。\nA: What time is it?\nB: It's four forty.\nA: Thank you.\n質問《しつもん》：今は何時ですか。", [
    ["4時40分", "four（4時）→ forty（40分）です。"],
    ["4時14分", "14は fourteen です。forty は40。"],
    ["4時30分", "30は thirty です。"],
    ["5時40分", "5は five です。"],
  ], "時→分の順《じゅん》に聞き取る", ["2つの数", "はじめの {{four}} が時、あとの {{forty}} が分です。", [S1, S2]], "思考・判断・表現"),
  // 標準
  ch("bed", 2, "リョウが話しています。\nRyo: I go to bed at nine thirty.\n質問《しつもん》：リョウについて正しいものはどれですか。", [
    ["9時30分にねる", "go to bed（ねる）、at nine thirty（9時30分に）です。"],
    ["9時30分に起きる", "起きるなら get up です。"],
    ["9時13分にねる", "13は thirteen。thirty は30です。"],
    ["3時9分にねる", "時と分が反対《はんたい》です。"],
  ], "何をするかと、何時かを両方聞く", ["2つを聞き取る", "{{go to bed}}（ねる）と {{at nine thirty}}（9時30分に）です。", [S3, S4]], "思考・判断・表現"),
  ch("school", 2, "サキが話しています。\nSaki: I get up at six fifty. I go to school at seven forty.\n質問《しつもん》：サキが学校へ行くのは何時ですか。", [
    ["7時40分", "go to school（学校へ行く）のあとに at seven forty と言っています。"],
    ["6時50分", "6時50分は起きる時刻《じこく》です。"],
    ["7時14分", "14は fourteen です。"],
    ["6時15分", "15は fifteen です。"],
  ], "生活の言葉と時刻《じこく》を組にする", ["どの時刻《じこく》か", "{{go to school}} の後ろの {{seven forty}}（7時40分）が答えです。", [S3, S4]], "思考・判断・表現"),
  // 発展
  ch("seven-fifteen-pm", 3, "お父さんが言いました。\nDad: It's seven fifteen p.m.\n質問《しつもん》：今はいつですか。", [
    ["夜の7時15分", "p.m. は午後。夜の7時15分です。"],
    ["朝の7時15分", "朝なら a.m. です。"],
    ["夜の7時50分", "50は fifty です。fifteen は15。"],
    ["朝の7時50分", "a.m. ではなく p.m.、fifty ではなく fifteen です。"],
  ], "-teen と -ty、a.m. と p.m. に気をつける", ["2つの手がかり", "{{fifteen}} は15、{{p.m.}} は午後。夜の7時15分です。", [S4, S1]], "思考・判断・表現"),
  ch("breakfast", 3, "アンが自分の朝のことを話しています。\nAnn: I get up at six thirty. I have breakfast at seven. I go to school at seven thirty.\n質問《しつもん》：アンが朝ごはんを食べるのは何時ですか。", [
    ["7時", "I have breakfast at seven. と言っています。"],
    ["6時30分", "6時30分は起きる時刻《じこく》です。"],
    ["7時30分", "7時30分は学校へ行く時刻《じこく》です。"],
    ["6時", "6時ちょうどの話は出てきません。"],
  ], "時刻《じこく》が3つ出たら、何をする時刻《じこく》かを組にする", ["メモして組にする", "起きる 6:30、{{have breakfast}}（朝ごはん）{{7:00}}、学校 7:30。答えは7時です。", [S3, S4]], "思考・判断・表現"),
];

export const E_ENGLISH_34_JIKOKU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "外国語活動（小3・4）",
  minutes: 6,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "時刻《じこく》と生活の言い方", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: IIKATA },
    { title: "時刻《じこく》を聞き取る", lead: "放送のかわりに、会話や英語《えいご》の文がのっています。読んで答えなさい。", style: "word", pick: 3, questions: KIKU },
  ],
};
