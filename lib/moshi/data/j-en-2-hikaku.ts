// 中2英語「比較」の単元模試 (B: 問題プールからシードで選ぶ)。問題・例文はすべてオリジナル。
// 節1 語形・語法 (プール13問: 基本4・標準5・発展4) から5問 (基本2・標準2・発展1)、
// 節2 並べかえ (プール5問: 基本2・標準3) から2問 (基本1・標準1)。1回7問・100点。
// 配点は難易度で決める (基本13・標準15・発展16 → 13×3＋15×3＋16＝100)。A (生成) はないので数値の検算はなし。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-2-hikaku";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "くらべる数で、3つの形を使い分ける");
const S2 = L(2, "文の形の変化を見る");
const S3 = L(3, "-er / -est か、more / most か");
const S4 = L(4, "「どちらが〜？」の疑問文");
const S5 = L(5, "名作の中の比較：ソネット130番");

const P = { 1: 13, 2: 15, 3: 16 } as const;
const T = { 1: 45, 2: 60, 3: 90 } as const;
const TO = { 1: 60, 2: 75, 3: 90 } as const;
type Sk = QuestionB["skill"];
const base = (id: string, difficulty: 1 | 2 | 3, skill: Sk = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });
const ord = (id: string, difficulty: 1 | 2 | 3) => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: TO[difficulty], skill: "知識・技能" as Sk });

const FORMS: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("hot-er", 1),
    prompt: "（　）内の語を正しい形にしなさい。\nToday is (hot) than yesterday.",
    answer: {
      kind: "term",
      accept: ["hotter"],
      near: [
        { text: "hoter", why: "hot は「短い母音＋子音字1つ」で終わるので、t を重ねて hotter。" },
        { text: "more hot", why: "hot は短い語なので more ではなく -er をつけます。" },
      ],
    },
    point: "than があれば比較級。hot は t を重ねて hotter",
    steps: [
      { title: "than を見つける", body: "後ろに {{than}}（〜より）があるので、2つをくらべる{{比較級}}にします。", back: [S1] },
      { title: "つづりのきまり", body: "hot は big と同じく「短い母音＋子音字1つ」で終わる語。子音字を重ねて {{hotter}} です。", trap: "hoter と t を1つにしない。", back: [S3] },
    ],
  },
  {
    ...base("of-four", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nEmi runs the fastest (　) the four.",
    answer: {
      kind: "choice",
      options: ["in", "of", "than", "as"],
      correct: 1,
      why: ["in は class・Japan のような場所や集団に使う。the four は数。", "正しい。the four（4人）のような数や複数には of。", "than は比較級（faster）のあとに使う。", "as は as 〜 as の形で使う。"],
      mistakeOf: [1, null, null, null],
    },
    point: "最上級の範囲：数・複数は of、場所・集団は in",
    steps: [{ title: "範囲を表す語", body: "the four は「4人」という{{数}}なので {{of}}。in my class のような場所・集団なら in です。", trap: "「〜の中で」を全部 in にしない。", back: [S2] }],
  },
  {
    ...base("as-genkyu", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nYour bag is as (　) as mine.",
    answer: {
      kind: "choice",
      options: ["heavy", "heavier", "heaviest", "more heavy"],
      correct: 0,
      why: ["正しい。as と as のあいだは原級。", "比較級は as 〜 as の中に入れない。", "最上級は as 〜 as の中に入れない。", "heavy の比較級は heavier。そもそも as 〜 as の中は原級。"],
      mistakeOf: [null, 2, 2, null],
    },
    point: "as と as のあいだは原級（もとの形）",
    steps: [{ title: "同じくらい", body: "「同じくらい重い」は {{as ＋ 原級 ＋ as}}。形を変えずに {{heavy}} を入れます。", back: [S1] }],
  },
  {
    ...base("good-better", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nYour idea is (　) than mine.",
    answer: {
      kind: "choice",
      options: ["better", "gooder", "more good", "best"],
      correct: 0,
      why: ["正しい。good の比較級は better。", "gooder という語はない。good は形が変わる語。", "good は more をつけず、better になる。", "best は最上級。than があるので比較級。"],
      mistakeOf: [null, 3, 3, null],
    },
    point: "good → better → best",
    steps: [{ title: "形が変わる語", body: "good・well は {{better・best}} と形そのものが変わります。than があるので比較級の {{better}}。", back: [S3] }],
  },
  // ---- 標準 ----
  {
    ...base("more-interesting", 2),
    prompt: "（　）内の語を、2語で正しい形にしなさい。\nThis story is (interesting) than that one.",
    answer: {
      kind: "term",
      accept: ["more interesting"],
      near: [
        { text: "interestinger", why: "interesting は長い語なので -er をつけず、前に more を置きます。" },
        { text: "most interesting", why: "than があるので最上級ではなく比較級。more interesting。" },
      ],
    },
    point: "長い語の比較級は more ＋ 原級",
    steps: [{ title: "長い語は more", body: "interesting は音節の多い{{長い語}}。-er をつけず、前に {{more}} を置いて more interesting にします。", trap: "interestinger としない。", back: [S3] }],
  },
  {
    ...base("easy-est", 2),
    prompt: "（　）内の語を正しい形にしなさい。\nQuestion 3 was the (easy) of all.",
    answer: {
      kind: "term",
      accept: ["easiest"],
      near: [
        { text: "easyest", why: "「子音字＋y」で終わる語は y を i にかえて -est。easiest。" },
        { text: "most easy", why: "easy は短い語なので most ではなく -est。easiest。" },
        { text: "easier", why: "the と of all があるので最上級。easiest。" },
      ],
    },
    point: "the ＋ 最上級。easy は y を i にかえる",
    steps: [
      { title: "最上級の目じるし", body: "前に {{the}}、後ろに {{of all}}（全部の中で）があるので最上級。", back: [S2] },
      { title: "y → i", body: "easy は「子音字＋y」で終わるので、y を i にかえて {{easiest}}。", back: [S3] },
    ],
  },
  {
    ...base("large-er", 2),
    prompt: "（　）内の語を正しい形にしなさい。\nYour room is (large) than mine.",
    answer: {
      kind: "term",
      accept: ["larger"],
      near: [
        { text: "largeer", why: "e で終わる語は -r だけをつけます。larger。" },
        { text: "more large", why: "large は短い語なので -er（ここでは -r）。larger。" },
      ],
    },
    point: "e で終わる語は -r だけ",
    steps: [{ title: "e で終わる語", body: "large は e で終わるので、{{-r}} だけをつけて {{larger}}。最上級なら largest です。", back: [S3] }],
  },
  {
    ...base("not-as-imi", 2),
    prompt: "次の英文の意味として正しいものはどれですか。\nKen is not as tall as Taro.",
    answer: {
      kind: "choice",
      options: ["ケンはタロウほど背が高くない。", "ケンはタロウと同じくらいの背だ。", "ケンはタロウより背が高い。", "タロウはケンほど背が高くない。"],
      correct: 0,
      why: ["正しい。not as 〜 as は「〜ほど…ない」。", "それは not のない as tall as の意味。", "not as tall as は、ケンのほうが低いという意味。", "主語が逆。背が低いのはケンのほう。"],
    },
    point: "not as 〜 as ＝「〜ほど…ない」",
    steps: [{ title: "同じではなく、下回る", body: "{{not as 〜 as}} は「〜ほど…ない」。ケンの背はタロウに{{とどかない}}、つまりタロウのほうが高いという意味です。", back: [S2] }],
  },
  {
    ...base("like-better", 2),
    prompt: "（　）に入る語として正しいものはどれですか。\nI like tea (　) than coffee.",
    answer: {
      kind: "choice",
      options: ["better", "best", "good", "well"],
      correct: 0,
      why: ["正しい。like A better than B で「BよりAが好き」。", "best は3つ以上の中でいちばんのとき（like 〜 the best）。", "good は原級。than の前は比較級。", "well は原級。比較級は better。"],
    },
    point: "like A better than B ＝ BよりAが好き",
    steps: [{ title: "好みをくらべる", body: "2つの好みをくらべるときは {{like A better than B}}。いちばん好きなら like 〜 the best です。", back: [S4] }],
  },
  // ---- 発展 ----
  {
    ...base("one-of", 3),
    prompt: "「大阪は日本で最も大きな都市の1つです。」の意味になるように、（　）に入るものを選びなさい。\nOsaka is one of (　) in Japan.",
    answer: {
      kind: "choice",
      options: ["the biggest cities", "the biggest city", "bigger cities", "the most big cities"],
      correct: 0,
      why: ["正しい。one of the ＋ 最上級 ＋ 複数名詞。", "「〜の1つ」なので、名詞は複数形 cities にする。", "「最も」なので最上級。the biggest。", "big は短い語なので most ではなく biggest（g を重ねる）。"],
    },
    point: "one of the ＋ 最上級 ＋ 複数名詞",
    steps: [
      { title: "「最も〜なものの1つ」", body: "{{one of the ＋ 最上級 ＋ 複数名詞}} の形。いくつかある中の1つなので、名詞は{{複数形}}です。", back: [S2] },
      { title: "big の最上級", body: "big は g を重ねて {{biggest}}。", back: [S3] },
    ],
  },
  {
    ...base("kakikae", 3, "思考・判断・表現"),
    prompt: "My bag is heavier than yours. とほぼ同じ意味を表す文はどれですか。",
    answer: {
      kind: "choice",
      options: ["Your bag is not as heavy as mine.", "My bag is not as heavy as yours.", "Your bag is as heavy as mine.", "Your bag is heavier than mine."],
      correct: 0,
      why: ["正しい。あなたのかばんは、わたしのかばんほど重くない＝わたしのほうが重い。", "これだと、あなたのかばんのほうが重いことになる。", "同じくらいの重さ、という意味になってしまう。", "重いほうが逆になっている。"],
    },
    point: "A は B より重い ＝ B は A ほど重くない",
    steps: [
      { title: "どちらが重いか", body: "もとの文では {{my bag}} のほうが重い。", back: [S1] },
      { title: "not as 〜 as で言いかえる", body: "軽いほうの {{your bag}} を主語にして、{{not as heavy as}} mine（わたしのほど重くない）とします。", trap: "主語を入れかえずに not as 〜 as にすると意味が逆になる。", back: [S2] },
    ],
  },
  {
    ...base("seigo", 3, "思考・判断・表現"),
    prompt: "英文として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["She is the most famous singer in Japan.", "This flower is beautifuler than that one.", "He is the tallest of his class.", "My cat is as bigger as yours."],
      correct: 0,
      why: ["正しい。famous は長い語なので most、Japan は場所なので in。", "beautiful は長い語なので more beautiful。", "class は集団なので in his class。", "as と as のあいだは原級 big。"],
      mistakeOf: [null, 0, 1, 2],
    },
    point: "長い語は more/most、集団は in、as 〜 as は原級",
    steps: [
      { title: "1つずつ確かめる", body: "長い語は {{more・most}}、場所・集団は {{in}}、as 〜 as の中は{{原級}}。この3つで、まちがいを見つけます。", back: [S2, S3] },
    ],
  },
  {
    ...base("far-kyocho", 3),
    prompt: "「この箱はあの箱より、ずっと重い。」の意味になるように、（　）に入る語を選びなさい。\nThis box is (　) heavier than that one.",
    answer: {
      kind: "choice",
      options: ["far", "very", "more", "most"],
      correct: 0,
      why: ["正しい。far は比較級の前に置いて「ずっと」と強める。", "very は原級を強める語（very heavy）。比較級は強められない。", "heavier はすでに比較級。more を重ねない。", "most は最上級をつくる語。"],
    },
    point: "比較級を強める「ずっと」は far",
    steps: [{ title: "比較級を強める", body: "比較級の前の {{far}} は「ずっと」。ソネット130番の far more red も同じ使い方です。very は比較級には使いません。", back: [S5] }],
  },
];

const ORDER: QuestionB[] = [
  // ---- 基本 ----
  {
    ...ord("narabe-longer", 1),
    prompt: "日本語に合うように語を並べかえなさい。使わない語が1つあります。\n「この川はあの川より長い。」",
    answer: { kind: "order", tokens: ["This", "river", "is", "longer", "than", "that", "one"], distractor: "more" },
    point: "主語 ＋ be動詞 ＋ 比較級 ＋ than ＋ くらべる相手",
    steps: [{ title: "比較級の文", body: "This river is のあとに {{longer than}}、最後にくらべる相手 that one。long は短い語なので more は使いません。", back: [S1] }],
  },
  {
    ...ord("narabe-as-new", 1),
    prompt: "日本語に合うように語を並べかえなさい。使わない語が1つあります。\n「私の自転車はあなたのと同じくらい新しい。」",
    answer: { kind: "order", tokens: ["My", "bike", "is", "as", "new", "as", "yours"], distractor: "newer" },
    point: "as ＋ 原級 ＋ as で「同じくらい」",
    steps: [{ title: "as と as ではさむ", body: "My bike is のあと、原級の new を {{as と as}} ではさみます。as 〜 as の中は比較級 newer にしません。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...ord("narabe-oldest", 2),
    prompt: "日本語に合うように語を並べかえなさい。使わない語が1つあります。\n「これはこの町でいちばん古いお寺です。」",
    answer: { kind: "order", tokens: ["This", "is", "the", "oldest", "temple", "in", "this", "city"], distractor: "of" },
    point: "the ＋ 最上級 ＋ 名詞 ＋ in ＋ 場所",
    steps: [{ title: "範囲は in", body: "the oldest temple（いちばん古いお寺）のあとに、範囲を表す {{in this city}}。町は場所なので of ではなく in です。", back: [S2] }],
  },
  {
    ...ord("narabe-which", 2),
    prompt: "日本語に合うように語を並べかえなさい。使わない語が1つあります。\n「サッカーと野球では、どちらがより人気がありますか。」",
    answer: { kind: "order", tokens: ["Which", "is", "more", "popular,", "soccer", "or", "baseball"], alsoOk: [[0, 1, 2, 3, 6, 5, 4]], distractor: "most" },
    point: "Which is 比較級, A or B?",
    steps: [{ title: "どちらかをたずねる", body: "{{Which}} を先頭に、is more popular と続け、最後に {{A or B}} を並べます。popular は長い語なので more。2つなので most は使いません。", back: [S4, S3] }],
  },
  {
    ...ord("narabe-like-best", 2),
    prompt: "日本語に合うように語を並べかえなさい。使わない語が1つあります。\n「あなたはどの食べ物がいちばん好きですか。」",
    answer: { kind: "order", tokens: ["What", "food", "do", "you", "like", "the", "best"], distractor: "most" },
    point: "いちばん好き ＝ like 〜 the best",
    steps: [{ title: "like には best", body: "What food（どの食べ物）を先頭に、do you like のあと {{the best}}。like の「いちばん」は most ではなく best を使うのが基本です。", back: [S4] }],
  },
];

export const J_EN_2_HIKAKU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中2",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "比較の形と使い方", lead: "次の問いに答えなさい。", style: "word", pick: 5, questions: FORMS },
    { title: "並べかえ", lead: "日本語に合うように、語を並べかえなさい。文の最初の語は大文字で始めてあります。", style: "word", pick: 2, questions: ORDER },
  ],
};
