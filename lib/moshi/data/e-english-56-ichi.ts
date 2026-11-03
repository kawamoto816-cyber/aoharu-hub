// 外国語（小5・6）「物の位置（in・on・under）と道案内」の単元模試 (B: 問題プールからシードで選ぶ)。
// 問題・英文はすべてオリジナル (教科書・ドリル・歌やチャンツの文は使っていない)。
// 大問1「位置を表す言葉」・大問2「場所と道案内を聞き取る」(放送のかわりに英語の文をのせる)。
// それぞれプール6問 (基本2・標準2・発展2) から基本・標準・発展を1問ずつ。1回 6問・満点100 (基本15・標準17・発展18 × 2)。
// 選択問題は ch()、並べかえは od() で作る。A (生成) は使っていないので検算式はなし。
// 小5・6 の単元なので、小5までに習わない漢字にはルビ《》をつける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "e-english-56-ichi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
type Back = ReturnType<typeof L>;
type Step = [string, string, Back[]];
const S1 = L(1, "場所の前におく4つの言葉");
const S2 = L(2, "on は「ふれている」");
const S3 = L(3, "Where is 〜? とたずね、It's 〜. と答える");
const S4 = L(4, "道案内は3つの言い方で");

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

// ---- 大問1 位置を表す言葉 ----
const KOTOBA: QuestionB[] = [
  // 基本
  ch("under", 1, "under の意味として正しいものはどれですか。", [
    ["〜の下に", "under は「〜の下に」です。"],
    ["〜の上に", "上にふれているときは on です。"],
    ["〜の中に", "「〜の中に」は in です。"],
    ["〜のそばに", "「〜のそばに」は by です。"],
  ], "in 中・on 上（ふれる）・under 下・by そば", ["4つの言葉", "{{in}}（中）・{{on}}（ふれている）・{{under}}（下）・{{by}}（そば）。", [S1]]),
  ch("in-box", 1, "「ボールは箱の中にあります。」を英語で言うと、どれですか。", [
    ["The ball is in the box.", "in ＋ the box の順で「箱の中に」です。"],
    ["The ball is the box in.", "日本語の順のままです。in は場所の前におきます。"],
    ["The ball is on the box.", "on は「箱の上に（ふれて）」です。"],
    ["The ball in is the box.", "is のあとに in the box を続けます。"],
  ], "in ＋場所（日本語と反対の順）", ["言葉の順", "「箱の中」は {{in the box}}。in を場所の{{前}}におきます。", [S1]]),
  // 標準
  ch("wall", 2, "かべにかかっている時計を英語で言うと、どれですか。", [
    ["the clock on the wall", "かべにふれているので on です。"],
    ["the clock in the wall", "かべの中にうまっているわけではありません。"],
    ["the clock under the wall", "かべの下ではありません。"],
    ["the clock by the wall", "by は「そば」。ふれてかかっているなら on です。"],
  ], "ふれていれば、横でも on", ["on は「ふれている」", "on は上だけでなく、{{ふれている}}ときに使います。かべの時計は {{on the wall}}。", [S2]], "思考・判断・表現"),
  ch("shoes", 2, "Where are my shoes? と聞かれました。答えとして正しいものはどれですか。", [
    ["They're by the door.", "shoes は2つ以上なので They're で答えます。"],
    ["It's by the door.", "It's は1つの物のときです。"],
    ["They're by door the.", "the は door の前です。"],
    ["Yes, they are.", "Where で聞かれたら、Yes・No では答えません。"],
  ], "Where are 〜? には They're 〜.", ["1つか、2つ以上か", "2つ以上の物は {{Where are 〜?}} と聞き、{{They're 〜.}} と答えます。", [S3]]),
  // 発展
  ch("ceiling", 3, "天井《てんじょう》についている電灯を英語で言うとき、（　）に入る言葉はどれですか。\nthe light (　) the ceiling", [
    ["on", "天井《てんじょう》にふれてついているので on です。"],
    ["under", "電灯は天井《てんじょう》の下に見えますが、ふれているので on を使います。"],
    ["in", "天井《てんじょう》の中ではありません。"],
    ["by", "そばにあるのではなく、ふれています。"],
  ], "下向きでも、ふれていれば on", ["ふれているか", "天井《てんじょう》の電灯は {{ふれている}}ので {{on the ceiling}} です。", [S2]], "思考・判断・表現"),
  od("where-cap", 3, "「わたしのぼうしはどこですか。」の意味になるように、ならべかえなさい。", ["Where", "is", "my", "cap?"], "Where is ＋物?", ["たずね方", "{{Where is}} ＋ my cap? の順です。", [S3]]),
];

// ---- 大問2 場所と道案内を聞き取る ----
const KIKU: QuestionB[] = [
  // 基本
  ch("pencil-desk", 1, "次の会話を読んで、質問に答えなさい。\nA: Where is my pencil?\nB: It's under the desk.\n質問：えんぴつはどこにありますか。", [
    ["つくえの下", "under the desk です。"],
    ["つくえの上", "上なら on the desk です。"],
    ["つくえの中", "中なら in the desk です。"],
    ["つくえのそば", "そばなら by the desk です。"],
  ], "It's のあとが場所", ["場所を聞く", "{{It's under the desk.}} で「つくえの下」です。", [S3, S1]], "思考・判断・表現"),
  ch("turn-left", 1, "道案内を聞きました。\nGo straight. Turn left at the corner.\n質問：どのように進みますか。", [
    ["まっすぐ進んで、角を左に曲がる", "Go straight.（まっすぐ）→ Turn left at the corner.（角で左）です。"],
    ["まっすぐ進んで、角を右に曲がる", "right ではなく left（左）です。"],
    ["すぐに左に曲がる", "まず Go straight.（まっすぐ）です。"],
    ["角を左に曲がって、もどる", "もどるとは言っていません。"],
  ], "Go straight. → Turn left / right", ["順に聞く", "{{Go straight.}} → {{Turn left}} at the corner.", [S4]], "思考・判断・表現"),
  // 標準
  ch("bag-door", 2, "次の会話を読んで、質問に答えなさい。\nTaku: Mom, where is my bag? It isn't on the chair.\nMom: It's by the door.\n質問：タクのかばんはどこにありますか。", [
    ["ドアのそば", "お母さんが It's by the door. と言っています。"],
    ["いすの上", "It isn't on the chair.（いすの上にはない）と言っています。"],
    ["ドアの下", "under ではなく by（そば）です。"],
    ["いすの下", "いすの下とは言っていません。"],
  ], "isn't のあとではなく、答えの文を聞く", ["打《う》ち消しに注意", "on the chair は「ない」場所。答えは {{by the door}}（ドアのそば）です。", [S3, S1]], "思考・判断・表現"),
  ch("right-left", 2, "道案内を聞きました。\nGo straight. Turn right at the corner. You can see it on your left.\n質問：正しいものはどれですか。", [
    ["角を右に曲がると、左に見える", "曲がるのは right、見えるのは on your left です。"],
    ["角を左に曲がると、右に見える", "反対《はんたい》です。"],
    ["角を右に曲がると、右に見える", "見えるのは on your left（左）です。"],
    ["まっすぐ進むと、左に見える", "とちゅうで右に曲がります。"],
  ], "曲がる向きと、見える向きを分けて聞く", ["2つの右左", "曲がるのは {{right}}、見えるのは {{on your left}}。", [S4]], "思考・判断・表現"),
  // 発展
  ch("glasses", 3, "次の会話を読んで、質問に答えなさい。\nGrandpa: Where are my glasses? They aren't in my bag.\nMai: Grandpa, they're on your head!\n質問：おじいさんのめがねはどこにありますか。", [
    ["おじいさんの頭の上", "they're on your head と言っています。頭にふれているので on です。"],
    ["おじいさんのかばんの中", "They aren't in my bag.（かばんの中にはない）と言っています。"],
    ["マイの頭の上", "your head は、話している相手（おじいさん）の頭です。"],
    ["テーブルの下", "テーブルは出てきません。"],
  ], "your はだれのことかを考える", ["だれの頭か", "マイがおじいさんに言った {{on your head}} は「おじいさんの頭の上」です。", [S3, S2]], "思考・判断・表現"),
  ch("library", 3, "あなたは今、学校の前にいます。図書館へは、まっすぐ進み、1つ目の角を右に曲がると、道の左側にあります。道を英語で教えるとき、正しいものはどれですか。", [
    ["Go straight. Turn right at the first corner. You can see it on your left.", "まっすぐ→1つ目の角で右→左に見える、の順です。"],
    ["Go straight. Turn left at the first corner. You can see it on your right.", "曲がる向きと見える側が反対《はんたい》です。"],
    ["Go straight. Turn right at the second corner. You can see it on your left.", "second は2つ目です。1つ目は first。"],
    ["Turn right. Go straight. You can see it on your right.", "順も、見える側もちがいます。"],
  ], "進む→曲がる→見える の3つを組み合わせる", ["組み立てる", "{{Go straight.}} → Turn right {{at the first corner}}. → You can see it {{on your left}}.", [S4]], "思考・判断・表現"),
];

export const E_ENGLISH_56_ICHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "外国語（小5・6）",
  minutes: 7,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "位置を表す言葉", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: KOTOBA },
    { title: "場所と道案内を聞き取る", lead: "放送のかわりに、英語の文がのっています。読んで答えなさい。", style: "word", pick: 3, questions: KIKU },
  ],
};
