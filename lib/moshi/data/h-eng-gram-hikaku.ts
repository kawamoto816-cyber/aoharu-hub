// 高校英語（文法）「比較」の単元模試 (B: 問題プール12問からシードで6問)。問題・例文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// プール12問 (基本4・標準4・発展4)。1回に基本2・標準2・発展2 (15×2＋17×2＋18×2＝100点)。選択肢の順もシードで変わる。A (生成) は使っていないので検算式はなし。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-gram-hikaku";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "形容詞・副詞の3つの形");
const S2 = L(2, "原級：as ... as で「同じくらい」、倍数もこの型");
const S3 = L(3, "比較級：than で相手を示し、差は前に置く");
const S4 = L(4, "最上級と、その書きかえ");
const S5 = L(5, "比べる相手を選ぶ");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("heavier-than", 1),
    prompt: "This suitcase is (　　) than that one.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["heavier", "heavy", "heaviest", "more heavy"],
      correct: 0,
      why: [
        "than があるので比較級。heavy は y を i にかえて -er。",
        "原級 heavy は than と組まない（as heavy as なら可）。",
        "最上級は than と組まない。",
        "heavy のような短い語は more ではなく -er で比較級を作る。",
      ],
    },
    point: "than があれば比較級",
    steps: [{ title: "形を選ぶ", body: "{{than}} ＝ 比較級のしるし。heavy → {{heavier}}（y を i にかえて -er）。", back: [S1, S3] }],
  },
  {
    ...base("longest-river", 1),
    prompt: "The Shinano River is the (　　) river in Japan.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["longest", "longer", "long", "most long"],
      correct: 0,
      why: [
        "the＋最上級＋in 〜 で「〜の中でいちばん…」。long の最上級は longest。",
        "比較級は the と in Japan だけでは使えない。",
        "原級では「いちばん」の意味にならない。",
        "long は短い語なので most ではなく -est。",
      ],
    },
    point: "the＋最上級＋in（of）〜",
    steps: [{ title: "最上級", body: "the と in Japan があるので「日本で{{いちばん}}長い」 → {{longest}}。", back: [S1, S4] }],
  },
  {
    ...base("as-tall-as", 1),
    prompt: "My brother is now as (　　) as my father.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["tall", "taller", "tallest", "more tall"],
      correct: 0,
      why: [
        "as … as の間には原級（もとの形）を入れる。",
        "as … as の間に比較級は入らない。",
        "as … as の間に最上級は入らない。",
        "more tall という形はない。",
      ],
    },
    point: "as＋原級＋as ＝ 同じくらい…",
    steps: [{ title: "原級", body: "{{as}} … {{as}} にはさまれるのは{{原級}}。as tall as ＝ 同じくらいの背の高さ。", back: [S2] }],
  },
  {
    ...base("better-term", 1),
    prompt: "This new plan is (　　) than the old one.\n空所に good を適切な形にして、英語1語で書きなさい。",
    answer: { kind: "term", accept: ["better"], near: [{ text: "gooder", why: "good は不規則に変化します。good − better − best。" }, { text: "best", why: "than があるので比較級 better です。" }] },
    point: "good − better − best",
    steps: [{ title: "不規則な変化", body: "good・well は {{better}}・best と形が変わります。than があるので比較級。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...base("twice-as-large", 2),
    prompt: "「あなたの部屋は私の部屋の2倍の広さだ」となるように、空所に入る最も適切な語句を選びなさい。\nYour room is (　　) mine.",
    answer: {
      kind: "choice",
      options: ["twice as large as", "as twice large as", "twice larger as", "large twice as"],
      correct: 0,
      why: [
        "倍数は as … as の前に置く。twice as large as 〜 ＝ 〜の2倍の広さ。",
        "twice は as の内側には入らない。",
        "larger（比較級）と as は組まない。",
        "語順がくずれている。as と large の位置がちがう。",
      ],
    },
    point: "倍数＋as … as",
    steps: [{ title: "倍数の位置", body: "{{twice}}（three times など）は as … as の{{前}}に置きます。", back: [S2] }],
  },
  {
    ...base("much-taller", 2),
    prompt: "Kenta is (　　) taller than his younger brother.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["much", "very", "more", "most"],
      correct: 0,
      why: [
        "比較級を強めるのは much（far・even なども可）。「ずっと背が高い」。",
        "very は原級を強める語で、比較級には使わない。",
        "taller はすでに比較級なので more はつけない。",
        "most は最上級を作る語。",
      ],
    },
    point: "比較級の強めは much・far・even",
    steps: [{ title: "差の大きさ", body: "比較級の前に置いて差を強めるのは {{much}}。very taller とは言いません。", back: [S3] }],
  },
  {
    ...base("three-years-older", 2),
    prompt: "「私は姉より3歳年下だ」となるように、空所に入る最も適切な語句を選びなさい。\nI am (　　) than my sister.",
    answer: {
      kind: "choice",
      options: ["three years younger", "younger three years", "three years young", "as three years young"],
      correct: 0,
      why: [
        "差を表す語句は比較級の前に置く。three years younger than 〜。",
        "差は比較級の後ろではなく前に置く。",
        "than があるので比較級 younger が必要。",
        "as … than という組み合わせはない。",
      ],
    },
    point: "差は比較級の前に置く",
    steps: [{ title: "差の位置", body: "{{three years}}（3歳）を比較級 {{younger}} の前に。I am three years younger than my sister.", back: [S3] }],
  },
  {
    ...base("order-second-largest", 2),
    prompt: "「この湖は日本で2番目に大きい」となるように、語を正しい順に並べなさい。",
    answer: { kind: "order", tokens: ["This lake", "is", "the", "second", "largest", "in Japan."], distractor: "larger" },
    point: "the＋序数＋最上級 ＝ …番目に〜",
    steps: [{ title: "語順", body: "{{the second largest}}。序数 second は the と最上級の{{間}}に置きます。", back: [S4] }],
  },
  // ---- 発展 ----
  {
    ...base("no-other-taller", 3),
    prompt: "Mika is the tallest student in her class.\n= No other student in her class is (　　) than Mika.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["taller", "tallest", "as tall", "more tall"],
      correct: 0,
      why: [
        "No other ＋単数名詞＋比較級＋than 〜 で最上級と同じ意味。",
        "最上級は than と組まない。",
        "as tall なら後ろは as Mika になる。than とは組まない。",
        "tall の比較級は taller。more tall とは言わない。",
      ],
    },
    point: "No other 〜 比較級 than A ＝ A がいちばん",
    steps: [{ title: "書きかえ", body: "「ほかの{{どの生徒も}} Mika より背が高くない」→ No other student … {{taller}} than Mika。", back: [S4] }],
  },
  {
    ...base("best-term", 3),
    prompt: "Of all the seasons, I like autumn (　　).\n「すべての季節の中で、私は秋がいちばん好きだ」となるように、空所に入る英語1語を書きなさい。",
    answer: { kind: "term", accept: ["best", "most"], near: [{ text: "better", why: "「すべての中で」いちばんなので最上級 best です。" }] },
    point: "like … the best ＝ いちばん好き",
    steps: [{ title: "副詞の最上級", body: "well（好き・よく）の最上級は {{best}}。副詞の最上級の the は省くことが多い。most も使えます。", back: [S1, S4] }],
  },
  {
    ...base("most-interesting-ever", 3),
    prompt: "This is (　　) interesting book I have ever read.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["the most", "more", "most", "a more"],
      correct: 0,
      why: [
        "I have ever read（今まで読んだ中で）と合わせて最上級。長い語なので the most。",
        "比較級を使うなら than が必要。",
        "名詞の前の最上級には the がつく（the most interesting book）。",
        "a more interesting book だけでは何と比べたかがわからない。",
      ],
    },
    point: "the＋最上級＋名詞＋（that）I have ever 〜",
    steps: [{ title: "最上級の型", body: "「今まで〜した中で{{いちばん}}」→ {{the most}} interesting book I have ever read。", back: [S4] }],
  },
  {
    ...base("order-not-as-old", 3),
    prompt: "「彼は私が思っていたほど年をとっていなかった」となるように、語句を正しい順に並べなさい。",
    answer: { kind: "order", tokens: ["He", "was", "not", "as old", "as", "I", "had thought."], distractor: "than" },
    point: "not as … as ＝ 〜ほど…ない",
    steps: [
      { title: "原級の否定", body: "{{not as old as}} 〜 ＝ 〜ほど年をとっていない。", back: [S2] },
      { title: "比べる相手", body: "相手は「私が思っていた（年齢）」→ as {{I had thought}}。", back: [S5] },
    ],
  },
];

export const H_ENG_GRAM_HIKAKU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "文法",
  minutes: 8,
  review: { status: "draft" },
  sections: [{ title: "比較の形と書きかえ", lead: "次の問いに答えなさい。", style: "word", pick: 6, questions: POOL }],
};
