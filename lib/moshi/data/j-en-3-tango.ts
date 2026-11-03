// 中3英語「英単語」の単元模試 (B: 問題プールからシードで選ぶ)。問題・英文はすべてオリジナル (ドリル・教科書の文は使っていない)。
// 大問1「語のパーツと品詞」・大問2「熟語と意味の推測」の2つ。それぞれプール6問 (基本2・標準2・発展2) から、基本・標準・発展を1問ずつ出す。
// 1回 6問・満点100 (基本15・標準17・発展18 × 2)。A (生成) は使っていないので検算式はなし。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-3-tango";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "1語から「なかまの語」を広げる");
const S2 = L(2, "語のおしりで品詞がわかる");
const S3 = L(3, "熟語は「かたまり」で覚える");
const S4 = L(4, "知らない単語は前後から推測する");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 80 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

// ---- 大問1 語のパーツと品詞 ----
const PARTS: QuestionB[] = [
  // 基本
  {
    ...base("unhappy", 1),
    prompt: "happy（幸せな）に un- がついた unhappy の意味として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["幸せではない", "とても幸せな", "幸せに", "幸せ"],
      correct: 0,
      why: ["un- は「〜でない」。", "「とても」の意味は un- にない。", "「幸せに」は副詞 happily。", "「幸せ」（名詞）は happiness。"],
    },
    point: "un- ＝「〜でない」",
    steps: [{ title: "接頭辞", body: "{{un-}} は「〜でない」。happy → unhappy（幸せではない）。", back: [S1] }],
  },
  {
    ...base("happiness", 1),
    prompt: "happiness の品詞として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["名詞", "動詞", "形容詞", "副詞"],
      correct: 0,
      why: ["-ness は名詞を作る。happiness＝幸せ。", "-ness で動詞にはならない。", "形容詞はもとの happy。", "副詞は happily（-ly）。"],
    },
    point: "-ness・-tion は名詞",
    steps: [{ title: "語のおしり", body: "{{-ness}} は名詞を作る接尾辞。happy（形容詞）→ happiness（{{名詞}}）。", back: [S2] }],
  },
  // 標準
  {
    ...base("dangerous", 2),
    prompt: "（　）に入る語として正しいものはどれですか。\nIt is (　) to swim in this river.",
    answer: {
      kind: "choice",
      options: ["dangerous", "danger", "dangerously", "dangers"],
      correct: 0,
      why: ["is のあとに「どんな」を表す形容詞。-ous は形容詞。", "danger は名詞（危険）。「泳ぐことは危険だ」には形容詞。", "dangerously は副詞。is のあとに置けない。", "dangers は名詞の複数形。"],
    },
    point: "-ous は形容詞",
    steps: [{ title: "置く場所から品詞", body: "It is 〜 to … の〜には{{形容詞}}。{{-ous}} で終わる dangerous（危険な）。", back: [S2] }],
  },
  {
    ...base("well", 2),
    prompt: "（　）に入る語として正しいものはどれですか。\nShe speaks English very (　).",
    answer: {
      kind: "choice",
      options: ["well", "good", "goodly", "nice"],
      correct: 0,
      why: ["動詞 speaks を説明するのは副詞 well（じょうずに）。", "good は形容詞。動詞の説明には使えない。", "goodly はここでは使わない。", "nice は形容詞。"],
      mistakeOf: [null, 1, null, null],
    },
    point: "動詞を説明するのは副詞 well",
    steps: [{ title: "形容詞と副詞", body: "speaks（話す）のしかたを説明するのは副詞。good の副詞は {{well}} です。", back: [S2] }],
  },
  // 発展
  {
    ...base("kindness", 3),
    prompt: "（　）に入るように、kind を正しい形にかえて書きなさい。\nThank you for your (　).（親切）",
    answer: { kind: "term", accept: ["kindness"], near: [{ text: "kind", why: "your のあとは名詞。kind に -ness をつけて kindness。" }, { text: "kindly", why: "kindly は副詞。your のあとは名詞 kindness。" }] },
    point: "your のあとは名詞。-ness で名詞に",
    steps: [{ title: "名詞にする", body: "{{your}} のあとには名詞。形容詞 kind に {{-ness}} をつけて {{kindness}}（親切）。", back: [S2] }],
  },
  {
    ...base("impossible", 3),
    prompt: "possible（可能な）に「〜でない」の意味の接頭辞をつけて「不可能な」にした語として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["impossible", "unpossible", "dispossible", "nonpossible"],
      correct: 0,
      why: ["possible には im- をつけて impossible。", "un- は happy などにつくが、possible にはつかない。", "dis- は like → dislike などにつく。", "nonpossible という語はふつう使わない。"],
    },
    point: "possible → impossible",
    steps: [{ title: "「〜でない」の接頭辞", body: "「〜でない」は un- だけでなく {{im-}}・dis- などもあり、語によって決まっています。possible は {{impossible}}。もとの語とセットで覚えます。", back: [S1] }],
  },
];

// ---- 大問2 熟語と意味の推測 ----
const JUKUGO: QuestionB[] = [
  // 基本
  {
    ...base("famous-for", 1),
    prompt: "「この町は温泉で有名です。」の意味になるように、（　）に入る語を選びなさい。\nThis town is famous (　) its hot springs.",
    answer: {
      kind: "choice",
      options: ["for", "of", "to", "at"],
      correct: 0,
      why: ["be famous for 〜 で「〜で有名だ」。", "famous of とは言わない。", "famous to とは言わない。", "famous at とは言わない。"],
    },
    point: "be famous for ＝〜で有名だ",
    steps: [{ title: "前置詞までセットで", body: "{{be famous for}} 〜（〜で有名だ）。前置詞までかたまりで覚えます。", back: [S3] }],
  },
  {
    ...base("look-forward", 1),
    prompt: "look forward to 〜 の意味として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["〜を楽しみに待つ", "〜の前を見る", "〜をさがす", "〜の世話をする"],
      correct: 0,
      why: ["look forward to 〜 で「〜を楽しみに待つ」。", "1語ずつ訳すとこうなるが、熟語の意味ではない。", "「〜をさがす」は look for 〜。", "「〜の世話をする」は look after 〜。"],
    },
    point: "熟語は1語ずつ訳さない",
    steps: [{ title: "かたまりで覚える", body: "{{look forward to}} 〜 は「〜を{{楽しみに待つ}}」。1語ずつ訳すと意味がずれます。", back: [S3] }],
  },
  // 標準
  {
    ...base("lf-seeing", 2),
    prompt: "（　）に入るように、see を正しい形にかえて書きなさい。\nI'm looking forward to (　) you again.",
    answer: { kind: "term", accept: ["seeing"], near: [{ text: "see", why: "look forward to の to は前置詞。あとは名詞か -ing 形にします。" }, { text: "seen", why: "過去分詞ではなく -ing 形 seeing。" }] },
    point: "look forward to のあとは -ing",
    steps: [{ title: "to は前置詞", body: "look forward to の {{to}} は不定詞ではなく{{前置詞}}。あとは名詞か {{-ing 形}}なので seeing。", trap: "to を見て原形 see にしない。", back: [S3] }],
  },
  {
    ...base("such-as", 2),
    prompt: "I like fruits such as apples and grapes. の such as のはたらきとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["例を挙げる", "反対の内容を表す", "理由を表す", "時を表す"],
      correct: 0,
      why: ["such as 〜 は「〜のような」。fruits の例として apples and grapes を挙げている。", "反対の内容は but など。", "理由は because など。", "時は when など。"],
    },
    point: "such as のあとは例",
    steps: [{ title: "推測のヒント", body: "{{such as}} のあとには例が来ます。知らない語でも、あとの例から意味を予想できます。", back: [S4] }],
  },
  // 発展
  {
    ...base("messy", 3, "思考・判断・表現"),
    prompt: "次の文の messy の意味を推測して、もっとも適切なものを選びなさい。\nMy room is always clean, but my brother's room is always messy.",
    answer: {
      kind: "choice",
      options: ["散らかった", "きれいな", "広い", "明るい"],
      correct: 0,
      why: ["but は反対の内容。clean（きれいな）と反対なので「散らかった」。", "clean と同じ意味になり、but と合わない。", "but の前の clean と反対の関係になっていない。", "but の前の clean と反対の関係になっていない。"],
    },
    point: "but の前後は反対の内容",
    steps: [
      { title: "品詞を考える", body: "is always のあとなので、ようすを表す{{形容詞}}。", back: [S4] },
      { title: "but から推測", body: "{{but}} の前は clean（きれい）。反対なので messy は「{{散らかった}}」と予想できます。", back: [S4] },
    ],
  },
  {
    ...base("exhausted", 3, "思考・判断・表現"),
    prompt: "次の文の exhausted の意味を推測して、もっとも適切なものを選びなさい。\nAfter the long walk, Tom was exhausted, or very tired.",
    answer: {
      kind: "choice",
      options: ["とても疲れた", "とても元気な", "おなかがすいた", "うれしい"],
      correct: 0,
      why: [", or very tired で exhausted を言いかえている。", "very tired と反対の意味。", "or のあとの very tired と合わない。", "or のあとの very tired と合わない。"],
    },
    point: "「, or 〜」は言いかえのヒント",
    steps: [{ title: "言いかえの or", body: "{{, or very tired}} が exhausted を言いかえています。長く歩いたあとなので「{{とても疲れた}}」。", back: [S4] }],
  },
];

export const J_EN_3_TANGO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中3",
  minutes: 8,
  review: { status: "draft" },
  sections: [
    { title: "語のパーツと品詞", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: PARTS },
    { title: "熟語と意味の推測", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: JUKUGO },
  ],
};
