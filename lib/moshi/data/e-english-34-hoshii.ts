// 外国語活動（小3・4）「ほしいものを伝える（I want 〜.）」の単元模試 (B: 問題プールからシードで選ぶ)。
// 問題・英文はすべてオリジナル (教科書・ドリル・歌やチャンツ・マザーグースの文は使っていない)。
// 大問1「I want 〜. の言い方」・大問2「お店の会話を読んで答える」(放送のかわりに会話の文をのせる)。
// それぞれプール6問 (基本2・標準2・発展2) から基本・標準・発展を1問ずつ。1回 6問・満点100 (基本15・標準17・発展18 × 2)。
// 選択問題は ch() で作る (opts の先頭が正解。画面で並べかえる)。A (生成) は使っていないので検算式はなし。
// 小3・4 の単元なので、小3までに習わない漢字にはルビ《》をつける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "e-english-34-hoshii";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
type Back = ReturnType<typeof L>;
const S1 = L(1, "ほしい物は I want のあとに言う");
const S2 = L(2, "1つの物には a か an をつける");
const S3 = L(3, "2つ以上《いじょう》なら s をつける");
const S4 = L(4, "たずねる・答える");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 50, 3: 60 } as const;
/** 選択問題。opts は [選択肢, その理由] で、先頭が正解 */
function ch(id: string, d: 1 | 2 | 3, prompt: string, opts: [string, string][], point: string, step: [string, string, Back[]], skill: QuestionB["skill"] = "知識・技能"): QuestionB {
  return { id, type: "B", difficulty: d, points: P[d], seconds: T[d], skill, prompt, answer: { kind: "choice", options: opts.map((o) => o[0]), correct: 0, why: opts.map((o) => o[1]) }, point, steps: [{ title: step[0], body: step[1], back: step[2] }] };
}

// ---- 大問1 I want 〜. の言い方 ----
const IIKATA: QuestionB[] = [
  // 基本
  ch("ball", 1, "「わたしはボールがほしいです。」を英語《えいご》で言うと、どれですか。", [
    ["I want a ball.", "I want のあとに、ほしい物（a ball）を言います。"],
    ["I a ball want.", "日本語の順《じゅん》のままです。want（ほしい）が物より先です。"],
    ["Want I a ball.", "I（わたしは）がいちばん前です。"],
    ["I want ball a.", "a は物の名前の前につけます。"],
  ], "I want ＋ほしい物.", ["ならべ方", "{{I want}} のあとにほしい物を言います。「ほしい」が物より{{先}}です。", [S1, S2]]),
  ch("an", 1, "前に an をつけるのはどれですか。", [
    ["apple", "apple は、はじめの音がアに近いので an apple です。"],
    ["ball", "ball は a ball です。"],
    ["pen", "pen は a pen です。"],
    ["cat", "cat は a cat です。"],
  ], "ア・イ・ウ・エ・オに近い音で始まる語は an", ["はじめの音", "{{apple}} のように、はじめの音がア・イ・ウ・エ・オに近い語には {{an}} をつけます。", [S2]]),
  // 標準
  ch("three-apples", 2, "「りんごが3つほしいです。」を英語《えいご》で言うと、どれですか。", [
    ["I want three apples.", "2つ以上《いじょう》なので、apple に s をつけます。"],
    ["I want three apple.", "2つ以上《いじょう》のときは、語の終わりに s をつけます。"],
    ["I want a three apples.", "数があるときは a をつけません。"],
    ["I want apples three.", "数は物の名前の前に言います。"],
  ], "2つ以上《いじょう》なら 数＋物の名前＋s", ["数と s", "{{three}}（数）のあとに {{apples}}（s がつく）を言います。", [S3]]),
  ch("no-i-dont", 2, "Do you want a cookie? と聞かれました。ほしくないときの答えはどれですか。", [
    ["No, I don't.", "ほしくないときは No, I don't. です。"],
    ["No, I want.", "No のあとは I don't. です。"],
    ["Yes, I don't.", "Yes と don't がいっしょで、意味が合いません。"],
    ["Yes, I do.", "ほしいときの答えです。"],
  ], "ほしくないなら No, I don't.", ["答え方", "ほしいなら {{Yes, I do.}}、ほしくないなら {{No, I don't.}} です。", [S4]]),
  // 発展
  ch("oto", 3, "a と an のどちらをつけるかは、何で決まりますか。", [
    ["語のはじめの音", "決めるのは文字ではなく、はじめの音です。"],
    ["語のはじめの文字", "文字ではなく音で決まります。"],
    ["語の終わりの音", "見るのは、はじめの音です。"],
    ["語の長さ", "長さは関係《かんけい》ありません。"],
  ], "a・an ははじめの「音」で決まる", ["文字より音", "a か an かは、語の{{はじめの音}}で決まります。", [S2]], "思考・判断・表現"),
  ch("orange-banana", 3, "（　）に入る言葉の組み合わせとして正しいものはどれですか。\nI want (①) orange and (②) banana.", [
    ["① an　② a", "orange はオに近い音で始まるので an、banana は a です。"],
    ["① a　② an", "反対《はんたい》です。orange が an、banana が a です。"],
    ["① an　② an", "banana は、はじめの音がバなので a です。"],
    ["① a　② a", "orange は、はじめの音がオに近いので an です。"],
  ], "1つずつ、はじめの音を確《たし》かめる", ["1つずつ考える", "{{orange}} は an、{{banana}} は a。物ごとに、はじめの音で決めます。", [S2]], "思考・判断・表現"),
];

// ---- 大問2 お店の会話を読んで答える ----
const KAIWA: QuestionB[] = [
  // 基本
  ch("cap", 1, "次の会話を読んで、質問《しつもん》に答えなさい。\nClerk: What do you want?\nYuta: I want a cap, please.\n質問《しつもん》：ユウタがほしい物はどれですか。", [
    ["ぼうし", "cap はぼうしです。"],
    ["カップ", "カップは cup です。cap とまん中の文字がちがいます。"],
    ["かばん", "かばんは bag です。"],
    ["ボール", "ボールは ball です。"],
  ], "I want のあとがほしい物", ["I want のあと", "{{I want}} のあとの {{cap}}（ぼうし）がほしい物です。", [S1, S4]], "思考・判断・表現"),
  ch("pencil-yes", 1, "次の会話を読んで、質問《しつもん》に答えなさい。\nA: Do you want a pencil?\nB: Yes, I do.\n質問《しつもん》：B について正しいものはどれですか。", [
    ["えんぴつがほしい", "Do you want a pencil? に Yes, I do. と答えています。"],
    ["えんぴつはほしくない", "ほしくないなら No, I don't. です。"],
    ["ノートがほしい", "ノート（notebook）は出てきません。"],
    ["えんぴつが好《す》き", "want は「ほしい」です。「好《す》き」は like。"],
  ], "Yes, I do. ＝はい、ほしいです", ["答えを聞く", "{{Yes, I do.}} なので、B はえんぴつがほしいです。", [S4]], "思考・判断・表現"),
  // 標準
  ch("bananas-apple", 2, "リナがお店で言いました。\nRina: I want two bananas and an apple, please.\n質問《しつもん》：リナがほしい物はどれですか。", [
    ["バナナ2本とりんご1こ", "two bananas（バナナ2本）と an apple（りんご1こ）です。"],
    ["バナナ1本とりんご2こ", "数が反対《はんたい》です。"],
    ["バナナ2本だけ", "and an apple（りんご1こも）と言っています。"],
    ["りんご2こだけ", "りんごは an apple（1こ）、バナナもほしいと言っています。"],
  ], "物ごとに数を聞き取る", ["数と物を組にする", "{{two bananas}} と {{an apple}}。an は「1つの」です。", [S2, S3]], "思考・判断・表現"),
  ch("what-want", 2, "会話の（　）に入る言葉として、いちばん合うものはどれですか。\nA: (　)\nB: I want a new bag.", [
    ["What do you want?", "「何がほしい？」と聞かれたので、I want 〜. で答えています。"],
    ["Do you want a bag?", "この質問《しつもん》なら Yes, I do. か No, I don't. で答えます。"],
    ["What color do you like?", "この質問《しつもん》なら I like ＋色. で答えます。"],
    ["How are you?", "この質問《しつもん》なら I'm fine. のように答えます。"],
  ], "答えの形から、たずねた文を考える", ["答えから考える", "I want 〜. で答えるのは {{What do you want?}} です。", [S4]], "思考・判断・表現"),
  // 発展
  ch("grapes", 3, "次の会話を読んで、質問《しつもん》に答えなさい。\nMom: Do you want an orange, Ken?\nKen: No, I don't. I want grapes.\n質問《しつもん》：ケンがほしい物はどれですか。", [
    ["ぶどう", "オレンジは No, I don't.。そのあと I want grapes. と言っています。"],
    ["オレンジ", "オレンジは No, I don't.（ほしくない）と答えています。"],
    ["オレンジとぶどう", "オレンジはほしくないと答えています。"],
    ["何もほしくない", "I want grapes. と言っています。"],
  ], "No のあとの I want 〜. が本当にほしい物", ["2つ目の文", "{{No, I don't.}} のあとの {{I want grapes.}} がほしい物です。", [S4]], "思考・判断・表現"),
  ch("notebooks", 3, "お店で「ノートを2さつください。」と、ていねいに言うとき、いちばん合うものはどれですか。", [
    ["Two notebooks, please.", "数＋物の名前＋s のあとに please をつけると、ていねいになります。"],
    ["Two notebook, please.", "2つ以上《いじょう》なので、notebook に s をつけます。"],
    ["A two notebooks, please.", "数があるときは a をつけません。"],
    ["Notebooks two, please.", "数は物の名前の前に言います。"],
  ], "数＋物の名前s ＋ please", ["ていねいに、正しく", "{{Two notebooks}}（2つなので s）に {{please}} をつけます。", [S3]], "思考・判断・表現"),
];

export const E_ENGLISH_34_HOSHII_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "外国語活動（小3・4）",
  minutes: 6,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "I want 〜. の言い方", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: IIKATA },
    { title: "お店の会話を読んで答える", lead: "放送のかわりに、会話の文がのっています。読んで答えなさい。", style: "word", pick: 3, questions: KAIWA },
  ],
};
