// 外国語活動（小3・4）「好きなものを伝える（I like 〜.）」の単元模試 (B: 問題プールからシードで選ぶ)。
// 問題・英文はすべてオリジナル (教科書・ドリル・歌やチャンツの文は使っていない)。
// 大問1「I like 〜. と Do you like 〜?」・大問2「会話を読んで答える」(放送のかわりに会話の文をのせる)。
// それぞれプール6問 (基本2・標準2・発展2) から基本・標準・発展を1問ずつ。1回 6問・満点100 (基本15・標準17・発展18 × 2)。
// 選択問題は ch() で作る (opts の先頭が正解。画面で並べかえる)。A (生成) は使っていないので検算式はなし。
// 小3・4 の単元なので、小3までに習わない漢字にはルビ《》をつける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "e-english-34-suki";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
type Back = ReturnType<typeof L>;
const S1 = L(1, "I like の後ろに、好《す》きなものを入れる");
const S2 = L(2, "好《す》きかどうかをたずねる");
const S3 = L(3, "「何が好《す》き？」は What 〜 do you like?");
const S4 = L(4, "会話はキャッチボール");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 50, 3: 60 } as const;
/** 選択問題。opts は [選択肢, その理由] で、先頭が正解 */
function ch(id: string, d: 1 | 2 | 3, prompt: string, opts: [string, string][], point: string, step: [string, string, Back[]], skill: QuestionB["skill"] = "知識・技能"): QuestionB {
  return { id, type: "B", difficulty: d, points: P[d], seconds: T[d], skill, prompt, answer: { kind: "choice", options: opts.map((o) => o[0]), correct: 0, why: opts.map((o) => o[1]) }, point, steps: [{ title: step[0], body: step[1], back: step[2] }] };
}

// ---- 大問1 I like 〜. と Do you like 〜? ----
const IIKATA: QuestionB[] = [
  // 基本
  ch("i-like-cats", 1, "「わたしはねこが好《す》きです。」を英語《えいご》で言うと、どれですか。", [
    ["I like cats.", "I like の後ろに好《す》きなもの（cats）を入れます。"],
    ["I cats like.", "日本語の順《じゅん》のままです。英語《えいご》では like が先です。"],
    ["Like I cats.", "I（わたしは）がいちばん前に来ます。"],
    ["Do you like cats?", "「ねこは好《す》き？」とたずねる文です。"],
  ], "I like ＋好《す》きなもの.", ["ならべ方", "{{I like}} の後ろに好《す》きなものを入れます。ねこは {{cats}} と s をつけて言うことが多いです。", [S1]]),
  ch("yes-i-do", 1, "Do you like dogs? と聞かれました。好《す》きなときの答えはどれですか。", [
    ["Yes, I do.", "Do you like 〜? には、好《す》きなら Yes, I do. と答えます。"],
    ["Yes, I like.", "Yes のあとは I do. です。"],
    ["No, I don't.", "好《す》きではないときの答えです。"],
    ["I'm fine.", "How are you? への答えです。"],
  ], "Do you 〜? には Yes, I do. / No, I don't.", ["答え方", "好《す》きなら {{Yes, I do.}}、好《す》きではないなら {{No, I don't.}} です。", [S2]]),
  // 標準
  ch("what-sport", 2, "What sport do you like? の答えとして正しいものはどれですか。", [
    ["I like soccer.", "何のスポーツが好《す》きかを聞かれたので、I like のあとにスポーツを言います。"],
    ["Yes, I do.", "What で聞かれたら、Yes・No では答えません。"],
    ["No, I don't.", "What で聞かれたら、Yes・No では答えません。"],
    ["I like blue.", "blue は色です。聞かれているのはスポーツです。"],
  ], "What 〜? には I like 〜. で答える", ["何を聞かれたか", "What {{sport}}（何のスポーツ）と聞かれたので、{{I like soccer.}} のようにスポーツを答えます。", [S3]], "思考・判断・表現"),
  ch("no-i-dont", 2, "Do you like carrots? と聞かれました。好《す》きではないときの答えはどれですか。", [
    ["No, I don't.", "好《す》きではないときは No, I don't. です。"],
    ["No, I do.", "No のあとは I don't. です。"],
    ["Yes, I don't.", "Yes と don't がいっしょになっていて、意味が合いません。"],
    ["No, I like.", "No のあとは I don't. です。"],
  ], "好《す》きでないなら No, I don't.", ["答え方", "好《す》きではないときは {{No, I don't.}} と答えます。", [S2]]),
  // 発展
  ch("what-food", 3, "「あなたは何の食べ物が好《す》きですか。」を英語《えいご》で言うと、どれですか。", [
    ["What food do you like?", "What の後ろに food（食べ物）をつけて、do you like? を続《つづ》けます。"],
    ["What do you like food?", "food は What のすぐ後ろに入れます。"],
    ["Do you like food?", "「食べ物は好《す》き？」になってしまいます。"],
    ["What food you like?", "do が足りません。"],
  ], "What ＋聞きたいもの＋ do you like?", ["What の後ろをかえる", "{{What food}} do you like? のように、What の後ろに聞きたいものの言葉を入れます。", [S3]], "思考・判断・表現"),
  ch("what-animal", 3, "What animal do you like? と聞かれました。答えとして合うものはどれですか。", [
    ["I like pandas.", "animal（動物）を聞かれたので、動物の pandas を答えます。"],
    ["I like blue.", "blue は色です。"],
    ["I like baseball.", "baseball はスポーツです。"],
    ["I like apples.", "apples は食べ物です。"],
  ], "What の後ろの言葉で、答えのなかまが決まる", ["なかまを合わせる", "What {{animal}}（何の動物）と聞かれたので、動物の {{pandas}} を答えます。", [S3]], "思考・判断・表現"),
];

// ---- 大問2 会話を読んで答える ----
const KAIWA: QuestionB[] = [
  // 基本
  ch("me-too", 1, "次の会話を読んで、質問《しつもん》に答えなさい。\nAya: I like apples.\nBen: Me, too.\n質問《しつもん》：ベンについて正しいものはどれですか。", [
    ["りんごが好《す》き", "Me, too.（わたしも）と言っているので、ベンもりんごが好《す》きです。"],
    ["りんごが好《す》きではない", "好《す》きではないなら Me, too. とは言いません。"],
    ["バナナが好《す》き", "バナナ（bananas）は出てきません。"],
    ["何も答えていない", "Me, too. と答えています。"],
  ], "Me, too. は「わたしも」", ["返事の意味", "{{Me, too.}} は「わたしも」。ベンもりんごが好《す》きです。", [S4]], "思考・判断・表現"),
  ch("music", 1, "次の会話を読んで、質問《しつもん》に答えなさい。\nA: Do you like music?\nB: Yes, I do.\n質問《しつもん》：B について正しいものはどれですか。", [
    ["音楽が好《す》き", "Do you like music? に Yes, I do. と答えています。"],
    ["音楽が好《す》きではない", "好《す》きではないなら No, I don't. です。"],
    ["体育が好《す》き", "体育は出てきません。"],
    ["音楽が分からない", "Yes, I do. は「はい、好《す》きです」です。"],
  ], "Yes, I do. ＝はい、好《す》きです", ["答えを聞く", "{{Yes, I do.}} なので、B は音楽が好《す》きです。", [S2]], "思考・判断・表現"),
  // 標準
  ch("swimming", 2, "次の会話を読んで、質問《しつもん》に答えなさい。\nKota: Do you like tennis, Mia?\nMia: No, I don't. I like swimming.\n質問《しつもん》：ミアが好《す》きなスポーツは何ですか。", [
    ["水泳", "I like swimming. と言っています。"],
    ["テニス", "テニスは No, I don't.（好《す》きではない）と答えています。"],
    ["サッカー", "サッカー（soccer）は出てきません。"],
    ["野球", "野球（baseball）は出てきません。"],
  ], "No のあとの I like 〜. が本当に好《す》きなもの", ["2つ目の文", "テニスは {{No, I don't.}}。そのあとの {{I like swimming.}} が好《す》きなスポーツです。", [S2, S1]], "思考・判断・表現"),
  ch("ask-back", 2, "会話の（　）に入る言葉として、いちばん合うものはどれですか。\nSara: I like dogs. (　)\nTaro: Yes, I do. I like dogs, too.", [
    ["Do you like dogs?", "タロウが Yes, I do. と答えているので、「犬は好《す》き？」と聞いたと分かります。"],
    ["What color do you like?", "色を聞かれたら I like 〜. で色を答えます。"],
    ["I'm fine.", "タロウの答えとつながりません。"],
    ["Nice to meet you.", "タロウの答えとつながりません。"],
  ], "答えから、たずねた文を考える", ["答えから考える", "Yes, I do. で答えるのは {{Do you like 〜?}} の質問《しつもん》です。", [S2, S4]], "思考・判断・表現"),
  // 発展
  ch("both", 3, "次の会話を読んで、質問《しつもん》に答えなさい。\nLucy: What fruit do you like, Ken?\nKen: I like melons.\nLucy: Me, too. I like peaches, too.\n質問《しつもん》：2人とも好《す》きな果物《くだもの》は何ですか。", [
    ["メロン", "ケンは melons が好《す》きで、ルーシーも Me, too. と言っています。"],
    ["もも", "peaches が好《す》きと言ったのはルーシーだけです。"],
    ["バナナ", "バナナは出てきません。"],
    ["りんご", "りんごは出てきません。"],
  ], "Me, too. が何に「わたしも」かを考える", ["わたしも、の相手", "ルーシーの {{Me, too.}} は、ケンの I like {{melons}}. への返事です。", [S4, S3]], "思考・判断・表現"),
  ch("catch-ball", 3, "会話を続《つづ》けるために、（　）に入る言葉として、いちばん合うものはどれですか。\nA: What color do you like?\nB: I like red. (　)\nA: I like green.", [
    ["And you?", "「あなたは？」とたずね返すと、A が I like green. と答えられます。"],
    ["Yes, I do.", "A は何もたずねていないので合いません。"],
    ["No, I don't.", "A は何もたずねていないので合いません。"],
    ["You're welcome.", "お礼への返事なので合いません。"],
  ], "自分の答えのあとに、たずね返す", ["キャッチボール", "自分の好《す》きを言ったら、{{And you?}} と相手にもたずね返すと会話が続《つづ》きます。", [S4]], "思考・判断・表現"),
];

export const E_ENGLISH_34_SUKI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "外国語活動（小3・4）",
  minutes: 6,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "I like 〜. と Do you like 〜?", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: IIKATA },
    { title: "会話を読んで答える", lead: "放送のかわりに、会話の文がのっています。読んで答えなさい。", style: "word", pick: 3, questions: KAIWA },
  ],
};
