// 外国語（小5・6）「したことを伝える（過去形 I went 〜.）」の単元模試 (B: 問題プールからシードで選ぶ)。
// 問題・英文はすべてオリジナル (教科書・ドリル・歌やチャンツの文は使っていない)。
// 大問1「過去の形」・大問2「したことの話を読んで答える」(放送のかわりに英語の文をのせる)。
// それぞれプール6問 (基本2・標準2・発展2) から基本・標準・発展を1問ずつ。1回 6問・満点100 (基本15・標準17・発展18 × 2)。
// 選択問題は ch() で作る (opts の先頭が正解。画面で並べかえる)。A (生成) は使っていないので検算式はなし。
// 小5・6 の単元なので、小5までに習わない漢字にはルビ《》をつける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "e-english-56-kako";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
type Back = ReturnType<typeof L>;
const S1 = L(1, "したことは「いつ→したこと→感想」");
const S2 = L(2, "ed がつく言葉と、形が変わる言葉");
const S3 = L(3, "感想は It was 〜. で、たずね方は How was 〜?");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
/** 選択問題。opts は [選択肢, その理由] で、先頭が正解 */
function ch(id: string, d: 1 | 2 | 3, prompt: string, opts: [string, string][], point: string, step: [string, string, Back[]], skill: QuestionB["skill"] = "知識・技能"): QuestionB {
  return { id, type: "B", difficulty: d, points: P[d], seconds: T[d], skill, prompt, answer: { kind: "choice", options: opts.map((o) => o[0]), correct: 0, why: opts.map((o) => o[1]) }, point, steps: [{ title: step[0], body: step[1], back: step[2] }] };
}

// ---- 大問1 過去の形 ----
const KATACHI: QuestionB[] = [
  // 基本
  ch("went", 1, "go（行く）の過去の形はどれですか。", [
    ["went", "go は形がまるごと変わって went になります。"],
    ["goed", "go に ed はつけません。"],
    ["goes", "goes は、今のことを he や she で言うときの形です。"],
    ["going", "過去の形ではありません。"],
  ], "go → went（形が変わる）", ["形が変わる言葉", "{{go}} → {{went}}。形が変わる言葉は1つずつ覚えます。", [S2]]),
  ch("enjoyed", 1, "I enjoyed fishing. の意味として正しいものはどれですか。", [
    ["わたしはつりを楽しみました。", "enjoyed は enjoy（楽しむ）の過去の形です。"],
    ["わたしはつりを楽しみます。", "今のことなら I enjoy fishing. です。"],
    ["わたしはつりを楽しみたいです。", "「〜したい」は want to です。"],
    ["わたしはつりが好きです。", "好きなら I like fishing. です。"],
  ], "ed がつくと、すんだこと", ["ed の意味", "{{enjoy}} に {{ed}} がついて、「楽しんだ」とすんだことになります。", [S2]]),
  // 標準
  ch("ate", 2, "eat（食べる）の過去の形はどれですか。", [
    ["ate", "eat は形が変わって ate になります。"],
    ["eated", "eat に ed はつけません。"],
    ["eats", "eats は、今のことを he や she で言うときの形です。"],
    ["eating", "過去の形ではありません。"],
  ], "eat → ate（形が変わる）", ["形が変わる言葉", "{{eat}} → {{ate}}。ed はつけません。", [S2]]),
  ch("yesterday", 2, "「きのう」を英語で言うと、どれですか。", [
    ["yesterday", "yesterday は「きのう」です。"],
    ["tomorrow", "tomorrow は「あした」です。"],
    ["today", "today は「今日」です。"],
    ["last summer", "last summer は「去年の夏」です。"],
  ], "いつ：yesterday・last weekend・last summer", ["いつのことか", "{{yesterday}}（きのう）・last weekend（先週末）・last summer（去年の夏）。", [S1]]),
  // 発展
  ch("last-summer", 3, "「去年の夏、わたしは海へ行きました。」を英語で言うと、どれですか。", [
    ["Last summer, I went to the sea.", "すんだことなので、go の過去の形 went を使います。"],
    ["Last summer, I go to the sea.", "すんだことなので、go ではなく went です。"],
    ["Last summer, I goed to the sea.", "goed とは言いません。went です。"],
    ["Next summer, I went to the sea.", "next summer は「来年の夏」です。"],
  ], "いつ＋過去の形", ["2つ確《たし》かめる", "{{Last summer}}（いつ）＋ I {{went}}（過去の形）to the sea.", [S1, S2]], "思考・判断・表現"),
  ch("saw", 3, "see（見る）の過去の形はどれですか。", [
    ["saw", "see は形が変わって saw になります。"],
    ["seed", "seed とは言いません。see は形が変わる言葉です。"],
    ["sees", "sees は、今のことを he や she で言うときの形です。"],
    ["seeing", "過去の形ではありません。"],
  ], "see → saw（seed とは言わない）", ["形が変わる言葉", "{{see}} → {{saw}}。ed をつけて seed にしないよう注意します。", [S2]], "思考・判断・表現"),
];

// ---- 大問2 したことの話を読んで答える ----
const YOMU: QuestionB[] = [
  // 基本
  ch("fun", 1, "次の会話を読んで、質問に答えなさい。\nA: How was your weekend?\nB: It was fun.\n質問：B の週末はどうでしたか。", [
    ["楽しかった", "fun は「楽しい」。It was fun. で「楽しかった」です。"],
    ["つまらなかった", "つまらないとは言っていません。"],
    ["おいしかった", "おいしいは delicious です。"],
    ["つかれた", "つかれたとは言っていません。"],
  ], "How was 〜? には It was 〜.", ["感想を聞き取る", "{{How was}} 〜? に {{It was fun.}}（楽しかった）と答えています。", [S3]], "思考・判断・表現"),
  ch("zoo-yesterday", 1, "ソウが話しています。\nSo: I went to the zoo yesterday.\n質問：ソウが動物園へ行ったのはいつですか。", [
    ["きのう", "yesterday と言っています。"],
    ["今日", "today とは言っていません。"],
    ["あした", "あしたなら tomorrow。went なので、すんだことです。"],
    ["先週末", "last weekend とは言っていません。"],
  ], "いつ、を表す言葉を聞く", ["いつのことか", "{{yesterday}}（きのう）。went なので、すんだことです。", [S1]], "思考・判断・表現"),
  // 標準
  ch("nara-deer", 2, "リコが話しています。\nRiko: Last weekend, I went to Nara. I saw many deer. It was exciting.\n質問：リコが奈良《なら》で見たものはどれですか。", [
    ["たくさんのシカ", "I saw many deer. と言っています。deer はシカです。"],
    ["大きな寺", "寺は出てきません。"],
    ["たくさんのサル", "サルは出てきません。"],
    ["きれいな海", "海は出てきません。"],
  ], "saw のあとが見たもの", ["したことを聞き取る", "{{saw}}（見た）のあとの {{many deer}}（たくさんのシカ）です。", [S1, S2]], "思考・判断・表現"),
  ch("how-was", 2, "会話の（　）に入る言葉として、いちばん合うものはどれですか。\nA: (　)\nB: It was delicious.", [
    ["How was the pizza?", "「ピザはどうだった？」に「おいしかった」と答えています。"],
    ["Where did you go?", "この質問なら I went to 〜. のように答えます。"],
    ["Do you like pizza?", "この質問なら Yes, I do. か No, I don't. で答えます。"],
    ["What do you want?", "この質問なら I want 〜. で答えます。"],
  ], "It was 〜. で答えるのは How was 〜?", ["答えから考える", "感想の {{It was delicious.}} で答えるのは {{How was 〜?}} です。", [S3]], "思考・判断・表現"),
  // 発展
  ch("diary", 3, "日記を読んで、質問に答えなさい。\nYesterday, I played tennis with my sister. Then we ate ice cream. It was a hot day.\n質問：日記の内容として正しいものはどれですか。", [
    ["きのう、姉か妹とテニスをして、アイスを食べた。", "played tennis with my sister と we ate ice cream です。"],
    ["きのう、姉か妹とサッカーをして、アイスを食べた。", "したのは tennis です。"],
    ["あした、姉か妹とテニスをする。", "played・ate は過去の形。すんだことです。"],
    ["きのう、テニスをして、すずしかった。", "hot（暑い）と言っています。"],
  ], "過去の形の言葉を順に追う", ["したことを順に", "{{played}} tennis → {{ate}} ice cream → It was a hot day.", [S1, S2]], "思考・判断・表現"),
  ch("naosu", 3, "次の文には、まちがいが2つあります。正しく直した文はどれですか。\nYesterday, I goed to the park and enjoy soccer.", [
    ["Yesterday, I went to the park and enjoyed soccer.", "goed → went、enjoy → enjoyed と2つとも過去の形にします。"],
    ["Yesterday, I went to the park and enjoy soccer.", "enjoy も過去の形 enjoyed にします。"],
    ["Yesterday, I goed to the park and enjoyed soccer.", "goed とは言いません。went です。"],
    ["Yesterday, I go to the park and enjoyed soccer.", "go も過去の形 went にします。"],
  ], "すんだことは、動作の言葉を全部過去の形に", ["全部そろえる", "yesterday のことなので {{went}} と {{enjoyed}}。2つともすんだことの形にします。", [S2]], "思考・判断・表現"),
];

export const E_ENGLISH_56_KAKO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "外国語（小5・6）",
  minutes: 7,
  review: { status: "draft" },
  sections: [
    { title: "過去の形", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: KATACHI },
    { title: "したことの話を読んで答える", lead: "放送のかわりに、英語の文がのっています。読んで答えなさい。", style: "word", pick: 3, questions: YOMU },
  ],
};
