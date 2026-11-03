// 中3英語「不定詞の発展（It is ～ for … to／疑問詞＋to／動詞＋人＋to／let・make・help＋人＋原形）」の単元模試
// (B: 問題プールからシードで選ぶ)。問題・例文はすべてオリジナル (lib/drill・j-en-2-futeishi の模試の文は使っていない)。
// 節1 型と意味 (プール13問: 基本4・標準5・発展4) から5問 (基本2・標準2・発展1)、
// 節2 並べかえ (プール5問: 基本2・標準3) から2問 (基本1・標準1)。1回7問・100点。
// 配点は難易度で決める (基本13・標準15・発展16 → 13×3＋15×3＋16＝100)。A (生成) はないので数値の検算はなし。
// choice・term・order の正答は check-moshi が採点器で満点になるか確かめる。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-3-futeishi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "長い主語は It で先に置く");
const S2 = L(2, "疑問詞＋to で「何を〜すべきか」");
const S3 = L(3, "want・tell・ask＋人＋to");
const S4 = L(4, "let・make・help は to をつけない");
const S5 = L(5, "仕事を遊びに変えた1文");

const P = { 1: 13, 2: 15, 3: 16 } as const;
const T = { 1: 45, 2: 60, 3: 90 } as const;
const TO = { 1: 60, 2: 75, 3: 90 } as const;
type Sk = QuestionB["skill"];
const base = (id: string, difficulty: 1 | 2 | 3, skill: Sk = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });
const ord = (id: string, difficulty: 1 | 2 | 3) => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: TO[difficulty], skill: "知識・技能" as Sk });

const FORMS: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("for-him", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nIt is easy for (　) to ride a unicycle.",
    answer: {
      kind: "choice",
      options: ["him", "he", "his", "himself"],
      correct: 0,
      why: ["正しい。for のあとの代名詞は目的格 him。", "he は主格。for のあとには置けない。", "his は「彼の」。あとに名詞がない。", "himself は「彼自身」。「彼にとって」は for him。"],
      mistakeOf: [null, 0, null, null],
    },
    point: "for のあとは目的格（me・him・her・us・them）",
    steps: [{ title: "だれにとって", body: "「一輪車に乗るのは{{彼にとって}}かんたんだ」。to の前の for のあとは目的格なので {{for him}} です。", trap: "for he と主格にしない。", back: [S1] }],
  },
  {
    ...base("it-to-learn", 1),
    prompt: "2つの文がほぼ同じ意味になるように、（　）に入る2語を書きなさい。\nTo learn about space is interesting.\n＝ It is interesting (　　) about space.",
    answer: {
      kind: "term",
      accept: ["to learn"],
      near: [
        { text: "learn", why: "本当の主語は to learn about space。to を落とさないこと。" },
        { text: "learning to", why: "It is 〜 のあとは to ＋ 原形の形でうしろに回します。" },
      ],
    },
    point: "It is 〜 to ＋ 原形：本当の主語はうしろへ",
    steps: [{ title: "仮の主語 It", body: "長い主語 To learn about space を、{{仮の主語 It}} で先に置きかえます。本当の主語 {{to learn}} about space は文のうしろに回します。", back: [S1] }],
  },
  {
    ...base("how-to-use-app", 1),
    prompt: "日本語に合うように、（　）に入る2語を書きなさい。\n「このアプリの使い方を教えてください。」\nPlease show me (　　) use this app.",
    answer: {
      kind: "term",
      accept: ["how to"],
      near: [
        { text: "how", why: "「〜のしかた」は how to ＋ 原形。to を落とさないこと。" },
        { text: "what to", why: "what to は「何を〜すべきか」。「使い方」は how to。" },
      ],
    },
    point: "how to ＋ 原形＝「〜のしかた」",
    steps: [{ title: "しかた・方法", body: "「使い方」は「どう使えばよいか」なので {{how to use}}。how のあとの to を忘れないようにします。", back: [S2] }],
  },
  {
    ...base("want-you-to-sing", 1),
    prompt: "（　）に入る語句として正しいものはどれですか。\nI want (　) to sing at the party.",
    answer: {
      kind: "choice",
      options: ["you", "your", "that you", "for you"],
      correct: 0,
      why: ["正しい。want ＋ 人 ＋ to ＋ 原形で「人に〜してほしい」。", "your は「あなたの」。あとに名詞が必要。", "「人に〜してほしい」は want that 〜 の形にしない。", "want のあとに for は置かない。"],
      mistakeOf: [null, null, 1, null],
    },
    point: "want ＋ 人 ＋ to ＋ 原形＝「人に〜してほしい」",
    steps: [{ title: "歌うのはだれか", body: "歌うのは I ではなく you。want と to のあいだに{{人}}をはさんで {{want you to sing}} とします。", back: [S3] }],
  },
  // ---- 標準 ----
  {
    ...base("what-to-wear", 2),
    prompt: "次の英文の意味として正しいものはどれですか。\nI couldn't decide what to wear for the concert.",
    answer: {
      kind: "choice",
      options: ["コンサートに何を着ていけばよいか、決められなかった。", "コンサートで着るものを、決めることができた。", "コンサートのために服を着ることを、決められなかった。", "コンサートに何を着ていったか、思い出せなかった。"],
      correct: 0,
      why: ["正しい。what to wear で「何を着るべきか」。", "couldn't は「できなかった」。", "what（何を）の意味が入っていない。", "decide は「決める」。「思い出す」ではない。"],
    },
    point: "what to ＋ 原形＝「何を〜すべきか」",
    steps: [{ title: "疑問詞＋to はひとまとまり", body: "{{what to wear}}（何を着るべきか）が decide の目的語。「何を着ていけばよいか決められなかった」となります。", back: [S2] }],
  },
  {
    ...base("where-to-go-next", 2),
    prompt: "日本語に合うように、（　）に入る1語を書きなさい。\n「次にどこへ行けばよいか教えてください。」\nPlease tell me (　) to go next.",
    answer: {
      kind: "term",
      accept: ["where"],
      near: [
        { text: "what", why: "what to は「何を〜すべきか」。「どこへ」は where。" },
        { text: "how", why: "how to は「〜のしかた」。「どこへ」は where。" },
      ],
    },
    point: "where to ＋ 原形＝「どこへ〜すべきか」",
    steps: [{ title: "疑問詞を選ぶ", body: "「どこへ行けばよいか」なので {{where to go}}。how は「しかた」、what は「何を」、when は「いつ」です。", back: [S2] }],
  },
  {
    ...base("doctor-told-me", 2),
    prompt: "（　）に入る語として正しいものはどれですか。\nThe doctor told (　) to rest for a few days.",
    answer: {
      kind: "choice",
      options: ["me", "I", "my", "mine"],
      correct: 0,
      why: ["正しい。tell ＋ 人（目的格）＋ to ＋ 原形。", "I は主格。動詞 told のあとの人は目的格。", "my は「私の」。あとに名詞が必要。", "mine は「私のもの」。休むのは「私」。"],
    },
    point: "tell ＋ 人（目的格）＋ to ＋ 原形",
    steps: [{ title: "休むのはだれか", body: "「医者は私に数日休むように言った」。休むのは{{私}}なので、told のあとに目的格 {{me}} を置き、to rest を続けます。", back: [S3] }],
  },
  {
    ...base("let-me-keep", 2),
    prompt: "（　）に入る語句として正しいものはどれですか。\nMy parents let me (　) a cat.",
    answer: {
      kind: "choice",
      options: ["keep", "to keep", "keeping", "kept"],
      correct: 0,
      why: ["正しい。let ＋ 人 ＋ 原形で「人に〜させてあげる」。", "let のあとは to をつけない。", "-ing の形は置かない。", "let（過去も let）のあとの動作は原形のまま。"],
      mistakeOf: [null, 2, null, null],
    },
    point: "let ＋ 人 ＋ 原形（to はつけない）",
    steps: [{ title: "let は to なし", body: "「両親は私にねこを飼わせてくれた」。let・make・help のあとは{{to のない原形}}なので {{keep}} です。", trap: "want・tell と同じ感覚で to keep にしない。", back: [S4] }],
  },
  {
    ...base("asked-brother", 2, "思考・判断・表現"),
    prompt: "次の英文の意味として正しいものはどれですか。\nMai asked her brother to carry the chairs.",
    answer: {
      kind: "choice",
      options: ["マイは兄に、いすを運んでくれるように頼んだ。", "マイは兄に、いすを運ぶように言われた。", "マイは兄といっしょに、いすを運ぶことにした。", "マイは兄に、いすを運んでもいいかとたずねた。"],
      correct: 0,
      why: ["正しい。ask ＋ 人 ＋ to ＋ 原形で「人に〜するように頼む」。運ぶのは兄。", "頼んだのはマイ。マイが言われたのではない。", "「いっしょに」の意味はない。", "運ぶのは兄。マイが許可を求めた文ではない。"],
    },
    point: "ask ＋ 人 ＋ to ＋ 原形＝「人に〜するよう頼む」",
    steps: [{ title: "動作をする人", body: "asked のあとの {{her brother}} が、to carry（運ぶ）の動作をする人です。マイは「頼んだ」人、運ぶのは{{兄}}です。", back: [S3] }],
  },
  // ---- 発展 ----
  {
    ...base("fix-made-to", 3, "思考・判断・表現"),
    prompt: "次の英文には誤りが1か所あります。正しく直したものはどれですか。\nThe teacher made us to clean the classroom.",
    answer: {
      kind: "choice",
      options: ["to clean → clean", "us → we", "made → make", "the classroom → a classroom"],
      correct: 0,
      why: ["正しい。make ＋ 人 ＋ 原形。to はつけない。", "made のあとの人は目的格 us で正しい。", "過去の文として made で正しい。", "そうじしたのは決まった教室なので the で正しい。"],
      mistakeOf: [2, null, null, null],
    },
    point: "make ＋ 人 ＋ 原形＝「（いやでも）〜させる」",
    steps: [{ title: "make は to なし", body: "make・let・help は「動詞＋人＋{{原形}}」。made us {{clean}} the classroom とします。", trap: "tell us to 〜 と同じ形だと思いこまない。", back: [S4] }],
  },
  {
    ...base("same-want-you", 3, "思考・判断・表現"),
    prompt: "次の日本文に合う英文として正しいものはどれですか。\n「私はあなたに、私の家に来てほしい。」",
    answer: {
      kind: "choice",
      options: ["I want you to come to my house.", "I want to come to your house.", "I want that you come to my house.", "I want you come to my house."],
      correct: 0,
      why: ["正しい。来るのは you なので want ＋ 人 ＋ to ＋ 原形。", "これは「私があなたの家に行きたい」。来る人がちがう。", "「人に〜してほしい」は want that 〜 の形にしない。", "want のときは人のあとに to が必要。to なしは let・make・help。"],
      mistakeOf: [null, null, 1, null],
    },
    point: "動作をするのが別の人なら want ＋ 人 ＋ to",
    steps: [
      { title: "動作をするのはだれ", body: "家に来るのは「私」ではなく{{あなた}}。だから want と to のあいだに you をはさみます。", back: [S3] },
      { title: "to の有無", body: "want・tell・ask は {{to あり}}、let・make・help は to なし。want you to come が正しい形です。", back: [S3, S4] },
    ],
  },
  {
    ...base("who-plays-piano", 3, "思考・判断・表現"),
    prompt: "次の2つの英文で、ピアノをひくのはそれぞれだれですか。\nA: Ken wants to play the piano for Yumi.\nB: Ken wants Yumi to play the piano.",
    answer: {
      kind: "choice",
      options: ["A はケン、B はユミ", "A はユミ、B はケン", "A も B もケン", "A も B もユミ"],
      correct: 0,
      why: ["正しい。A は want to（自分が〜したい）、B は want ＋ 人 ＋ to（人に〜してほしい）。", "逆。A の for Yumi は「ユミのために」で、ひくのはケン。", "B は wants と to のあいだに Yumi がいるので、ひくのはユミ。", "A は want to ＋ 原形なので、ひくのは主語のケン。"],
    },
    point: "want と to のあいだの人が、動作をする人",
    steps: [
      { title: "A の文", body: "A は want {{to play}}。人をはさんでいないので、ひくのは主語のケン。for Yumi は「ユミのために」です。", back: [S3] },
      { title: "B の文", body: "B は want {{Yumi to play}}。あいだの Yumi がひく人で、「ケンはユミにピアノをひいてほしい」となります。", back: [S3] },
    ],
  },
  {
    ...base("only-necessary", 3, "思考・判断・表現"),
    prompt: "次の英文の意味として正しいものはどれですか。\nIt is only necessary to press this button.",
    answer: {
      kind: "choice",
      options: ["このボタンを押しさえすればよい。", "このボタンを押す必要はまったくない。", "このボタンだけは押してはいけない。", "それは、このボタンを押すためだけに必要だ。"],
      correct: 0,
      why: ["正しい。It is only necessary to 〜 で「〜しさえすればよい（必要なのは〜だけ）」。", "否定の not はない。", "「〜してはいけない」の意味はない。", "It は仮の主語なので「それは」と訳さない。to press が本当の主語。"],
    },
    point: "It is only necessary to 〜＝「〜しさえすればよい」",
    steps: [
      { title: "It は仮の主語", body: "It は本当の主語 {{to press this button}} を先に預けた目印。「それは」とは訳しません。", back: [S1] },
      { title: "only necessary", body: "「必要なのは{{このボタンを押すことだけ}}」、つまり「押しさえすればよい」。トウェインが塀ぬりの教訓を書いたのと同じ形です。", back: [S5] },
    ],
  },
];

const ORDER: QuestionB[] = [
  // ---- 基本 ----
  {
    ...ord("narabe-how-guitar", 1),
    prompt: "日本語に合うように語を並べかえなさい。使わない語が1つあります。\n「私はギターのひき方を知りません。」",
    answer: { kind: "order", tokens: ["I", "don't", "know", "how", "to", "play", "the", "guitar."], distractor: "what" },
    point: "know のあとに how to ＋ 原形",
    steps: [{ title: "how to はひとまとまり", body: "I don't know のあとに、目的語の {{how to play the guitar}}（ギターのひき方）を続けます。", back: [S2] }],
  },
  {
    ...ord("narabe-let-me-see", 1),
    prompt: "日本語に合うように語を並べかえなさい。使わない語が1つあります。\n「私にその地図を見せてください。」",
    answer: { kind: "order", tokens: ["Let", "me", "see", "the", "map."], distractor: "to" },
    point: "Let me ＋ 原形＝「私に〜させて」",
    steps: [{ title: "let のあとは原形", body: "「私に見させて」なので {{Let me see}} the map。let のあとは to をつけない原形です。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...ord("narabe-fun-for-her", 2),
    prompt: "日本語に合うように語を並べかえなさい。使わない語が1つあります。\n「英語の歌を歌うことは、彼女にとって楽しい。」",
    answer: { kind: "order", tokens: ["It", "is", "fun", "for", "her", "to", "sing", "English", "songs."], distractor: "she" },
    point: "It is 〜 for ＋ 人 ＋ to ＋ 原形",
    steps: [{ title: "for ＋ 目的格を to の前に", body: "It is fun のあと、「彼女にとって」の {{for her}} を to の前に置き、to sing English songs を続けます。for のあとは she ではなく her です。", back: [S1] }],
  },
  {
    ...ord("narabe-asked-window", 2),
    prompt: "日本語に合うように語を並べかえなさい。使わない語が1つあります。\n「兄は私に、窓を閉めるように頼みました。」",
    answer: { kind: "order", tokens: ["My", "brother", "asked", "me", "to", "close", "the", "window."], distractor: "I" },
    point: "ask ＋ 人（目的格）＋ to ＋ 原形",
    steps: [{ title: "人を to の前に", body: "My brother asked のあとに、窓を閉める人 {{me}}、そして {{to close}} the window。人の部分は目的格です。", back: [S3] }],
  },
  {
    ...ord("narabe-when-to-start", 2),
    prompt: "日本語に合うように語を並べかえなさい。使わない語が1つあります。\n「私たちは、いつ出発すればよいか知りたい。」",
    answer: { kind: "order", tokens: ["We", "want", "to", "know", "when", "to", "start."], distractor: "what" },
    point: "when to ＋ 原形＝「いつ〜すべきか」",
    steps: [{ title: "to が2つ", body: "We want {{to know}}（知りたい）のあとに、目的語の {{when to start}}（いつ出発すべきか）を続けます。", back: [S2] }],
  },
];

export const J_EN_3_FUTEISHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中3",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "不定詞の型と意味", lead: "次の問いに答えなさい。", style: "word", pick: 5, questions: FORMS },
    { title: "並べかえ", lead: "日本語に合うように、語を並べかえなさい。文の最初の語は大文字で始めてあります。", style: "word", pick: 2, questions: ORDER },
  ],
};
