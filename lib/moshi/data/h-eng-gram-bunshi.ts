// 高校英語（文法）「分詞」の単元模試 (B: 問題プール12問からシードで6問)。問題・例文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// プール12問 (基本4・標準4・発展4)。1回に基本2・標準2・発展2 (15×2＋17×2＋18×2＝100点)。選択肢の順もシードで変わる。A (生成) は使っていないので検算式はなし。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-gram-bunshi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "現在分詞と過去分詞：「する」か「される」か");
const S2 = L(2, "1語なら前から、語句がつけば後ろから");
const S3 = L(3, "補語になる分詞：O と C の関係を見る");
const S4 = L(4, "感情の分詞：人は「させられる」、物は「させる」");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("wearing-cap", 1),
    prompt: "The man (　　) a red cap is our new coach.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["wearing", "worn", "wears", "wore"],
      correct: 0,
      why: [
        "男性が帽子を「かぶっている（する側）」ので現在分詞。wearing a red cap が後ろから the man を説明する。",
        "worn は「着られた・かぶられた」。男性はかぶられる側ではない。",
        "wears は動詞。文の動詞は is がすでにあり、2つ目の動詞は置けない。",
        "wore も動詞の過去形で、同じ理由で置けない。",
      ],
    },
    point: "名詞が「する」側なら -ing",
    steps: [{ title: "する か される か", body: "the man が帽子を{{かぶっている}} → する側 → {{wearing}}。語句がつくので名詞の後ろに置きます。", back: [S1, S2] }],
  },
  {
    ...base("made-in", 1),
    prompt: "My father has a watch (　　) in Switzerland.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["made", "making", "makes", "to make"],
      correct: 0,
      why: [
        "時計は「作られた」側なので過去分詞 made。",
        "making だと時計が何かを「作っている」ことになる。",
        "makes は動詞。文の動詞は has がある。",
        "to make だと「作るための時計」になり意味が通らない。",
      ],
    },
    point: "名詞が「される」側なら過去分詞",
    steps: [{ title: "される側", body: "時計は{{作られる}}もの → 過去分詞 {{made}}。made in Switzerland が後ろから a watch を説明します。", back: [S1, S2] }],
  },
  {
    ...base("playing-term", 1),
    prompt: "Who is the boy (　　) the guitar on the stage?\n空所に play を適切な形にして、英語1語で書きなさい。",
    answer: { kind: "term", accept: ["playing"], near: [{ text: "played", why: "少年はギターを「ひいている」側なので現在分詞 playing です。played だと「ひかれた」になります。" }] },
    point: "the boy playing 〜 ＝ 〜をひいている少年",
    steps: [{ title: "形を決める", body: "少年がギターを{{ひく}}（する側）→ {{playing}}。the guitar on the stage がつくので後ろから修飾。", back: [S1, S2] }],
  },
  {
    ...base("boring-speech", 1),
    prompt: "The speech was so (　　) that some people fell asleep.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["boring", "bored", "bore", "to bore"],
      correct: 0,
      why: [
        "speech（物）が聞き手を「退屈させる」ので boring。",
        "bored は人が「退屈させられた」ときに使う。主語は speech。",
        "bore は動詞（退屈させる）の原形。was のあとに置けない。",
        "to bore では「退屈させるための」となり意味が通らない。",
      ],
    },
    point: "物は「させる」-ing、人は「させられる」-ed",
    steps: [{ title: "感情の分詞", body: "主語は{{物}}（speech）。人を退屈させる側なので {{boring}}。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...base("surprised-news", 2),
    prompt: "We were (　　) to hear that the shop had closed.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["surprised", "surprising", "surprise", "to surprise"],
      correct: 0,
      why: [
        "主語 We（人）が「おどろかされた」ので過去分詞 surprised。",
        "surprising は物が人を「おどろかせる」とき。We が人をおどろかせたわけではない。",
        "surprise は動詞の原形か名詞。were のあとに置けない。",
        "were to surprise では意味が通らない。",
      ],
    },
    point: "人が主語の感情は過去分詞",
    steps: [{ title: "人が主語", body: "We は知らせに{{おどろかされた}}側 → {{surprised}}。", back: [S4] }],
  },
  {
    ...base("had-repaired", 2),
    prompt: "I had my bicycle (　　) at the shop last week.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["repaired", "repairing", "repair", "to repair"],
      correct: 0,
      why: [
        "my bicycle は「修理される」側。have O＋過去分詞で「O を〜してもらう」。",
        "repairing だと自転車が何かを修理していることになる。",
        "have O＋原形は O が「する」ときの形。自転車は修理しない。",
        "have O to 〜 の形はこの意味では使わない。",
      ],
    },
    point: "have O＋過去分詞 ＝ O を〜してもらう",
    steps: [{ title: "O と C の関係", body: "my bicycle は{{修理される}}側 → C は過去分詞 {{repaired}}。", back: [S3] }],
  },
  {
    ...base("order-woman-sitting", 2),
    prompt: "「ベンチに座っている女の人は私のおばです」となるように、語句を正しい順に並べなさい。",
    answer: { kind: "order", tokens: ["The woman", "sitting", "on the bench", "is", "my aunt."], distractor: "sat" },
    point: "分詞＋語句は名詞の後ろに置く",
    steps: [
      { title: "分詞の形", body: "女の人が{{座っている}} → sitting。", back: [S1] },
      { title: "置く場所", body: "sitting on the bench と語句がつくので、名詞 The woman の{{後ろ}}。その後に動詞 is。", back: [S2] },
    ],
  },
  {
    ...base("kept-waiting", 2),
    prompt: "I'm sorry I kept you (　　) so long.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["waiting", "waited", "wait", "to wait"],
      correct: 0,
      why: [
        "you が「待っている」状態を続けさせた。keep O＋-ing で「O を〜させたままにする」。",
        "wait は目的語をとらない動詞で、「待たれる」という形にはならない。",
        "keep O の後ろに原形は置かない。",
        "keep O to 〜 の形はない。",
      ],
    },
    point: "keep O -ing ＝ O を〜させておく",
    steps: [{ title: "O と C の関係", body: "you が{{待っている}}（する側）→ C は現在分詞 {{waiting}}。", back: [S3] }],
  },
  // ---- 発展 ----
  {
    ...base("heard-called", 3),
    prompt: "In the crowded station, I heard my name (　　) from behind.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["called", "calling", "call", "to call"],
      correct: 0,
      why: [
        "my name は「呼ばれる」側。hear O＋過去分詞で「O が〜されるのを聞く」。",
        "calling だと名前が何かを呼んでいることになる。",
        "hear O＋原形は O が「する」とき。名前は呼ぶ側ではない。",
        "hear O の後ろに to 不定詞は置かない（能動態では原形か分詞）。",
      ],
    },
    point: "O が「される」なら知覚動詞の後ろも過去分詞",
    steps: [{ title: "O を主語にして考える", body: "「名前が呼ぶ」ではなく「名前が{{呼ばれる}}」→ {{called}}。", back: [S3] }],
  },
  {
    ...base("error-interesting", 3, "思考・判断・表現"),
    prompt: "次のうち、{{誤りを含む}}文はどれですか。",
    answer: {
      kind: "choice",
      options: ["I am interesting in Japanese history.", "This story is interesting to me.", "The children looked excited.", "We were shocked by the news."],
      correct: 0,
      why: [
        "人（I）が興味を「もたされている」ので interested が正しい。I am interested in 〜。",
        "正しい。物（story）が人の興味を引く側なので interesting。",
        "正しい。子どもたちはわくわく「させられている」ので excited。",
        "正しい。人がショックを「受けた」ので shocked。",
      ],
    },
    point: "be interested in 〜（人が主語）",
    steps: [{ title: "主語で判断", body: "主語が{{人}}で、その人が感情を抱いているなら過去分詞。I am {{interested}} in 〜。", back: [S4] }],
  },
  {
    ...base("order-house-built", 3),
    prompt: "「これは百年前に建てられた家です」となるように、語句を正しい順に並べなさい。",
    answer: { kind: "order", tokens: ["This is", "a house", "built", "a hundred years", "ago."], distractor: "building" },
    point: "名詞＋過去分詞＋語句 ＝ 〜された名詞",
    steps: [
      { title: "分詞の形", body: "家は{{建てられた}}側 → built。", back: [S1] },
      { title: "後ろから修飾", body: "built a hundred years ago がひとまとまりで a house の{{後ろ}}に置かれます。", back: [S2] },
    ],
  },
  {
    ...base("main-verb", 3, "思考・判断・表現"),
    prompt: "The festival held in this town every summer attracts many tourists.\nこの文の述語動詞（V）はどれですか。",
    answer: {
      kind: "choice",
      options: ["attracts", "held", "summer", "tourists"],
      correct: 0,
      why: [
        "The festival（S）が多くの観光客を引きつける（V）。attracts が文の動詞。",
        "held は過去分詞で、held in this town every summer が The festival を後ろから説明している。",
        "summer は名詞。every summer は「毎年夏に」の M。",
        "tourists は attracts の目的語。",
      ],
    },
    point: "後ろから修飾する過去分詞を V とまちがえない",
    steps: [
      { title: "まとまりをくくる", body: "The festival [{{held}} in this town every summer] ── 過去分詞のまとまりは名詞の説明。", back: [S2] },
      { title: "動詞を見つける", body: "残りの {{attracts}} many tourists が V＋O。主語が三人称単数なので -s がついています。", back: [S2] },
    ],
  },
];

export const H_ENG_GRAM_BUNSHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "文法",
  minutes: 8,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [{ title: "分詞の形と働き", lead: "次の問いに答えなさい。", style: "word", pick: 6, questions: POOL }],
};
