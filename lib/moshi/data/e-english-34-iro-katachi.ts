// 外国語活動（小3・4）「色・形の言い方」の単元模試 (B: 問題プールからシードで選ぶ)。
// 問題・英文はすべてオリジナル (教科書・ドリル・歌やチャンツの文は使っていない)。
// 大問1「色と形の言葉」・大問2「会話を読んで答える」(放送のかわりに会話の文をのせる)。
// それぞれプール6問 (基本2・標準2・発展2) から基本・標準・発展を1問ずつ。1回 6問・満点100 (基本15・標準17・発展18 × 2)。
// 選択問題は ch() で作る (opts の先頭が正解。画面で並べかえる)。A (生成) は使っていないので検算式はなし。
// 小3・4 の単元なので、小3までに習わない漢字にはルビ《》をつける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "e-english-34-iro-katachi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
type Back = ReturnType<typeof L>;
const S1 = L(1, "色の言葉は、身の回りの物と結《むす》びつけて覚《おぼ》える");
const S2 = L(2, "形の言葉は、角と線で見分ける");
const S3 = L(3, "色と形をいっしょに言うときは、色が先");
const S4 = L(4, "好《す》きな色をたずねて、答える");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 50, 3: 60 } as const;
/** 選択問題。opts は [選択肢, その理由] で、先頭が正解 */
function ch(id: string, d: 1 | 2 | 3, prompt: string, opts: [string, string][], point: string, step: [string, string, Back[]], skill: QuestionB["skill"] = "知識・技能"): QuestionB {
  return { id, type: "B", difficulty: d, points: P[d], seconds: T[d], skill, prompt, answer: { kind: "choice", options: opts.map((o) => o[0]), correct: 0, why: opts.map((o) => o[1]) }, point, steps: [{ title: step[0], body: step[1], back: step[2] }] };
}

// ---- 大問1 色と形の言葉 ----
const KOTOBA: QuestionB[] = [
  // 基本
  ch("blue", 1, "blue は何色ですか。", [
    ["青", "blue は青。晴れた空の色です。"],
    ["赤", "赤は red です。"],
    ["黄色", "黄色は yellow です。"],
    ["緑", "緑は green です。"],
  ], "blue ＝青（空の色）", ["物と結《むす》びつける", "空を見たら {{blue}}。色の言葉は、その色の物といっしょに覚《おぼ》えます。", [S1]]),
  ch("triangle", 1, "三角の形を英語《えいご》で言うと、どれですか。", [
    ["triangle", "triangle は三角です。tri は「3」を表します。"],
    ["circle", "circle は丸です。"],
    ["square", "square は正方形です。"],
    ["star", "star は星です。"],
  ], "triangle ＝三角", ["形の言葉", "三角は {{triangle}}、丸は circle、正方形は square です。", [S2]]),
  // 標準
  ch("red-circle", 2, "a red circle の意味として正しいものはどれですか。", [
    ["赤い丸", "red（赤い）が先、circle（丸）が後。日本語と同じ順《じゅん》です。"],
    ["丸くて赤い四角", "四角（square）は出てきません。"],
    ["青い丸", "青は blue です。"],
    ["赤い三角", "三角は triangle です。"],
  ], "色が先、形が後", ["順《じゅん》に読む", "{{red}}（赤い）＋ {{circle}}（丸）で「赤い丸」です。", [S3]]),
  ch("kado-nai", 2, "角が1つもない形はどれですか。", [
    ["circle", "circle（丸）は、まがった線だけで、角がありません。"],
    ["square", "square（正方形）は角が4つあります。"],
    ["triangle", "triangle（三角）は角が3つあります。"],
    ["star", "star（星）には、とがった角があります。"],
  ], "角とまがった線で形を見分ける", ["角を数える", "角がなく、まがった線だけなのは {{circle}}（丸）です。", [S2]], "思考・判断・表現"),
  // 発展
  ch("yellow-star", 3, "「黄色い星」を英語《えいご》で言うと、どれですか。", [
    ["a yellow star", "色の yellow を先、形の star を後に言います。"],
    ["a star yellow", "色と形の順《じゅん》が反対《はんたい》です。色が先です。"],
    ["yellow a star", "a は言葉のいちばん前につけます。"],
    ["a yellow circle", "circle は丸です。星は star。"],
  ], "a ＋色＋形 の順《じゅん》", ["ならべ方", "{{a}} ＋ {{yellow}}（色）＋ {{star}}（形）の順《じゅん》です。", [S3]], "思考・判断・表現"),
  ch("tri", 3, "triangle の tri は「3」を表します。では、triangle には角がいくつありますか。", [
    ["3つ", "tri は「3」。角が3つの形が triangle です。"],
    ["4つ", "角が4つの形は square などです。"],
    ["0", "角がないのは circle です。"],
    ["5つ", "tri は「3」なので5ではありません。"],
  ], "tri は「3」→ 角が3つ", ["言葉の中のヒント", "{{tri}} は「3」。だから triangle は角が{{3つ}}の形です。", [S2]], "思考・判断・表現"),
];

// ---- 大問2 会話を読んで答える ----
const KAIWA: QuestionB[] = [
  // 基本
  ch("pink", 1, "次の会話を読んで、質問《しつもん》に答えなさい。\nA: What color do you like?\nB: I like pink.\n質問《しつもん》：B の好《す》きな色は何ですか。", [
    ["ピンク", "I like pink. と答えています。"],
    ["青", "青（blue）は出てきません。"],
    ["赤", "赤（red）は出てきません。"],
    ["白", "白（white）は出てきません。"],
  ], "I like のあとが好《す》きなもの", ["I like のあと", "{{I like}} のあとの {{pink}} が好《す》きな色です。", [S4]], "思考・判断・表現"),
  ch("answer", 1, "What color do you like? の答えとして正しいものはどれですか。", [
    ["I like green.", "I like のあとに色の言葉を入れて答えます。"],
    ["Yes, I do.", "What で聞かれたら、Yes・No ではなく好《す》きなものを答えます。"],
    ["It's a circle.", "形を答えています。聞かれているのは好《す》きな色です。"],
    ["I'm fine.", "How are you? への答えです。"],
  ], "What color 〜? には I like ＋色.", ["答え方", "{{What color do you like?}} には {{I like ＋色.}} で答えます。", [S4]]),
  // 標準
  ch("whats-this", 2, "次の会話を読んで、質問《しつもん》に答えなさい。\nA: What's this?\nB: It's a blue star.\n質問《しつもん》：B が見せたのはどれですか。", [
    ["青い星", "blue（青い）＋ star（星）です。"],
    ["赤い星", "赤は red です。"],
    ["青い丸", "丸は circle です。"],
    ["黄色い三角", "黄色は yellow、三角は triangle です。"],
  ], "色と形を両方聞き取る", ["2つの言葉", "{{blue}}（青い）と {{star}}（星）の2つを聞き取ります。", [S3]], "思考・判断・表現"),
  ch("me-too", 2, "会話の（　）に入る言葉として、いちばん合うものはどれですか。\nA: I like orange.\nB: (　) I like orange, too.", [
    ["Me, too.", "「わたしも」。あとで I like orange, too. と言っているので合います。"],
    ["Yes, I do.", "A は質問《しつもん》していないので、Yes, I do. は合いません。"],
    ["You're welcome.", "お礼を言われたときの返事です。"],
    ["It's red.", "A は色をたずねていません。"],
  ], "同じなら Me, too.（わたしも）", ["返事をする", "相手と同じものが好《す》きなら {{Me, too.}} と返すと会話が続《つづ》きます。", [S4]], "思考・判断・表現"),
  // 発展
  ch("sky", 3, "次の会話を読んで、質問《しつもん》に答えなさい。\nA: What color do you like, Rin?\nRin: I like the color of the sky on a sunny day.\n質問《しつもん》：リンの好《す》きな色を英語《えいご》で言うと、どれですか。", [
    ["blue", "晴れた日の空の色なので、青（blue）です。"],
    ["red", "red は赤。空の色ではありません。"],
    ["black", "black は黒。晴れた日の空の色ではありません。"],
    ["yellow", "yellow は黄色。空の色ではありません。"],
  ], "物の色から、色の言葉を考える", ["物と色を結《むす》ぶ", "the sky（空）on a sunny day（晴れた日）の色は {{blue}} です。", [S1, S4]], "思考・判断・表現"),
  ch("draw", 3, "先生がこう言いました。\nDraw a red triangle and a black circle.\n質問《しつもん》：先生がかいてと言ったものはどれですか。", [
    ["赤い三角と黒い丸", "red triangle（赤い三角）と black circle（黒い丸）です。"],
    ["黒い三角と赤い丸", "色と形の組み合わせが反対《はんたい》です。"],
    ["赤い丸と黒い四角", "triangle は三角、circle は丸です。"],
    ["赤い三角と黒い四角", "circle は丸です。四角ではありません。"],
  ], "色はすぐ後ろの形につく", ["組み合わせを聞き取る", "{{a red triangle}}（赤い三角）と {{a black circle}}（黒い丸）。色はすぐ後ろの形につきます。", [S3]], "思考・判断・表現"),
];

export const E_ENGLISH_34_IRO_KATACHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "外国語活動（小3・4）",
  minutes: 6,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "色と形の言葉", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: KOTOBA },
    { title: "会話を読んで答える", lead: "放送のかわりに、会話や英語《えいご》の文がのっています。読んで答えなさい。", style: "word", pick: 3, questions: KAIWA },
  ],
};
