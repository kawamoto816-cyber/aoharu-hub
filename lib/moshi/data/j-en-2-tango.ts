// 中2英語「英単語」の単元模試 (B: 問題プールからシードで選ぶ)。問題・英文はすべてオリジナル (ドリル・教科書の文は使っていない)。
// 大問1「動詞の変化形と比較の形」・大問2「語の家族と熟語」の2つ。それぞれプール6問 (基本2・標準2・発展2) から、基本・標準・発展を1問ずつ出す。
// 1回 6問・満点100 (基本15・標準17・発展18 × 2)。A (生成) は使っていないので検算式はなし。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-2-tango";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "不規則動詞は4つの型に分ける");
const S2 = L(2, "語の終わりで品詞が変わる");
const S3 = L(3, "熟語は「動詞＋小さな語」で意味が変わる");
const S4 = L(4, "形容詞は「反対語」と「比較の形」をセットで");
const S5 = L(5, "言葉の意味は「みんなのきまり」で決まる");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 80 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

// ---- 大問1 動詞の変化形と比較の形 ----
const HENKA: QuestionB[] = [
  // 基本
  {
    ...base("bought", 1),
    prompt: "buy（買う）の過去形を書きなさい。",
    answer: { kind: "term", accept: ["bought"], near: [{ text: "buyed", why: "buy は不規則動詞。buy - bought - bought です。" }, { text: "brought", why: "brought は bring（持ってくる）の過去形。buy は bought。" }] },
    point: "buy - bought - bought",
    steps: [{ title: "不規則動詞", body: "buy は -ed をつけない不規則動詞。{{buy - bought - bought}} と、過去形と過去分詞が同じ型です。", back: [S1] }],
  },
  {
    ...base("better", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nThis bike is (　) than that one.（good を使って）",
    answer: {
      kind: "choice",
      options: ["better", "gooder", "more good", "best"],
      correct: 0,
      why: ["good の比較級は better。", "good に -er はつけない。", "good は more を使わず better にする。", "best は最上級。than の前には比較級。"],
      mistakeOf: [null, 3, null, null],
    },
    point: "good - better - best",
    steps: [{ title: "不規則な比較の形", body: "good は {{good - better - best}} と変わります。than の前なので比較級 {{better}}。", back: [S4] }],
  },
  // 標準
  {
    ...base("gone", 2),
    prompt: "（　）に入る形を書きなさい。\ngo - went - (　)",
    answer: { kind: "term", accept: ["gone"], near: [{ text: "went", why: "went は過去形。過去分詞は gone です。" }, { text: "goed", why: "go は不規則動詞。go - went - gone です。" }] },
    point: "go - went - gone（3つともちがう型）",
    steps: [{ title: "型で覚える", body: "go は {{3つともちがう}}型。go - went - {{gone}} とリズムで覚えます。", back: [S1] }],
  },
  {
    ...base("kata-same", 2, "思考・判断・表現"),
    prompt: "次の動詞のうち、過去形と過去分詞が同じ形になるものはどれですか。",
    answer: {
      kind: "choice",
      options: ["make", "go", "eat", "see"],
      correct: 0,
      why: ["make - made - made。過去形と過去分詞が同じ。", "go - went - gone。3つともちがう。", "eat - ate - eaten。3つともちがう。", "see - saw - seen。3つともちがう。"],
    },
    point: "make - made - made は「過去＝過去分詞」型",
    steps: [{ title: "同じ形がどこに出るか", body: "{{make - made - made}} は過去形と過去分詞が同じ。go・eat・see は3つともちがう型です。", back: [S1] }],
  },
  // 発展
  {
    ...base("written", 3),
    prompt: "（　）内の語を正しい形にかえて書きなさい。\nThis letter was (write) by my grandfather.",
    answer: { kind: "term", accept: ["written"], near: [{ text: "wrote", why: "wrote は過去形。was のあと「〜された」は過去分詞 written。" }, { text: "writed", why: "write は不規則動詞。write - wrote - written。" }, { text: "writen", why: "t が2つ。written です。" }] },
    point: "was＋過去分詞。write - wrote - written",
    steps: [
      { title: "形を決める", body: "was 〜 by …（〜によって…された）なので{{過去分詞}}。", back: [S1] },
      { title: "変化形", body: "write - wrote - {{written}}。t を2つ重ねます。", back: [S1] },
    ],
  },
  {
    ...base("most", 3, "思考・判断・表現"),
    prompt: "（　）に入る語として正しいものはどれですか。\nThis question is (　) difficult of all.",
    answer: {
      kind: "choice",
      options: ["the most", "the more", "most", "the difficultest"],
      correct: 0,
      why: ["difficult のような長い語の最上級は the most 〜。of all（全部の中で）が合図。", "more は比較級。of all（全部の中で）には最上級。", "最上級には the をつける。", "difficult に -est はつけない。後ろの difficult とも重なる。"],
    },
    point: "長い形容詞は the most 〜",
    steps: [
      { title: "比較級か最上級か", body: "{{of all}}（全部の中で）があるので最上級。", back: [S4] },
      { title: "-est か most か", body: "difficult のような長い語は -est でなく {{the most}} difficult。", back: [S4] },
    ],
  },
];

// ---- 大問2 語の家族と熟語 ----
const KAZOKU: QuestionB[] = [
  // 基本
  {
    ...base("look-for", 1),
    prompt: "「私はかぎをさがしています。」の意味になるように、（　）に入る語を選びなさい。\nI'm looking (　) my key.",
    answer: {
      kind: "choice",
      options: ["for", "at", "after", "up"],
      correct: 0,
      why: ["look for 〜 で「〜をさがす」。", "look at 〜 は「〜を見る」。", "look after 〜 は「〜の世話をする」。", "look up は「見上げる」「（辞書で）調べる」。"],
      mistakeOf: [null, 2, null, null],
    },
    point: "look for ＝さがす",
    steps: [{ title: "熟語はかたまりで", body: "同じ look でも、{{look for}}（さがす）・look at（見る）・look after（世話をする）と意味が変わります。", back: [S3] }],
  },
  {
    ...base("teacher", 1),
    prompt: "teach（教える）に -er がついた teacher の意味として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["先生（教える人）", "教えること", "教えられた", "よく教える"],
      correct: 0,
      why: ["-er は「〜する人」。教える人＝先生。", "「教えること」は teaching。", "「教えられた」は taught。", "-er は「〜する人」を表す。"],
    },
    point: "-er ＝「〜する人」",
    steps: [{ title: "接尾辞 -er", body: "{{-er}} は「〜する人」。teach → teacher（先生）、sing → singer（歌手）。", back: [S2] }],
  },
  // 標準
  {
    ...base("carefully", 2),
    prompt: "（　）に入る語として正しいものはどれですか。\nPlease walk (　) on the wet floor.",
    answer: {
      kind: "choice",
      options: ["carefully", "careful", "care", "carefulness"],
      correct: 0,
      why: ["動詞 walk を説明するのは副詞。careful に -ly をつけた carefully。", "careful は形容詞。動詞の説明には使えない。", "care は名詞・動詞（世話・気にかける）。", "carefulness は名詞（注意深さ）。"],
      mistakeOf: [null, 1, null, null],
    },
    point: "動詞を説明するのは -ly の副詞",
    steps: [{ title: "語の終わりで品詞", body: "{{-ful}} は形容詞、{{-ly}} は副詞。walk（歩く）のしかたを説明するので副詞 {{carefully}}。", back: [S2] }],
  },
  {
    ...base("look-after", 2),
    prompt: "「祖母がよく妹の世話をしてくれます。」の意味になるように、（　）に入る語を選びなさい。\nMy grandmother often looks (　) my sister.",
    answer: {
      kind: "choice",
      options: ["after", "for", "at", "like"],
      correct: 0,
      why: ["look after 〜 で「〜の世話をする」。", "look for 〜 は「〜をさがす」。", "look at 〜 は「〜を見る」。", "look like 〜 は「〜のように見える・〜に似ている」。"],
    },
    point: "look after ＝世話をする",
    steps: [{ title: "後ろの語で意味が変わる", body: "{{look after}} で「世話をする」。look のあとの小さな語までひとかたまりで覚えます。", back: [S3] }],
  },
  // 発展
  {
    ...base("useful", 3, "思考・判断・表現"),
    prompt: "-ful が「〜に満ちた」という意味の形容詞を作ることから考えて、This dictionary is very useful. の useful の意味として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["役に立つ", "使う人", "使いすぎた", "使えない"],
      correct: 0,
      why: ["use（使う・役に立つこと）＋ -ful で「役に立つ」。", "「使う人」は user（-er）。", "-ful に「〜しすぎ」の意味はない。", "反対の意味。「使えない・役に立たない」は useless。"],
    },
    point: "部品に分けて意味を推測する",
    steps: [{ title: "部品に分ける", body: "use（使う）＋ {{-ful}}（形容詞）。辞書がなくても「{{役に立つ}}」と推測できます。", back: [S2, S5] }],
  },
  {
    ...base("invitation", 3, "思考・判断・表現"),
    prompt: "（　）に入る語として正しいものはどれですか。\nThank you for your (　) to the party.（招待）",
    answer: {
      kind: "choice",
      options: ["invitation", "invite", "invited", "invitely"],
      correct: 0,
      why: ["your のあとには名詞。invite に -tion がついた名詞 invitation。", "invite は動詞（招待する）。your のあとに置けない。", "invited は過去形・過去分詞。", "invitely という語はない。"],
    },
    point: "your のあとは名詞。-tion は名詞",
    steps: [
      { title: "置く場所から品詞", body: "{{your}}（あなたの）のあとには{{名詞}}が来ます。", back: [S2] },
      { title: "名詞を作る接尾辞", body: "{{-tion}} は名詞を作ります。invite → {{invitation}}（招待）。", back: [S2] },
    ],
  },
];

export const J_EN_2_TANGO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中2",
  minutes: 8,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "動詞の変化形と比較の形", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: HENKA },
    { title: "語の家族と熟語", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: KAZOKU },
  ],
};
