// 中2英語「不定詞（to ＋ 原形）」の単元模試 (B: 問題プールからシードで6問)。問題はすべてオリジナル（例文は書き下ろし）。
// プール15問 (基本5・標準6・発展4)。1回に基本2・標準2・発展2 が出る (lib/moshi/unit.ts の pickQuestions)。選択肢の順もシードで変わる。
// A (生成) は使っていないので検算の式はない。並べかえ (order) は tokens の順がそのまま正解。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-2-futeishi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "不定詞の形は、いつも to ＋ 原形");
const S2 = L(2, "3つの使い方：名詞・形容詞・副詞");
const S3 = L(3, "「to の前に何があるか」を見る");
const S4 = L(4, "Why ～? に To ～. で答える");

// 配点は難易度で決める (基本15・標準17・発展18。2問ずつ出るので満点100)
const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 75, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const YOHO = ["名詞的用法（〜すること）", "形容詞的用法（〜するための・〜すべき）", "副詞的用法（〜するために）", "副詞的用法（〜して：感情の原因）"];

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("want-to-be", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nMy brother wants (　　) a pilot in the future.",
    answer: {
      kind: "choice",
      options: ["to be", "be", "being", "is"],
      correct: 0,
      why: ["正しい。want to ＋ 原形で「〜したい」。be の原形をそのまま使う。", "want のあとに原形だけを置くことはできない。to が必要。", "want は -ing（動名詞）をとらない。", "文の動詞 wants がすでにあるので、is はここに置けない。"],
    },
    point: "want to ＋ 原形で「〜したい（〜になりたい）」",
    steps: [{ title: "want のあとは to ＋ 原形", body: "「パイロットになりたい」は want {{to be}} a pilot。be動詞も原形 be のまま to のあとに置きます。", back: [S1, S2] }],
  },
  {
    ...base("hopes-to-visit", 1),
    prompt: "（　）に入る語句として正しいものはどれですか。\nAya hopes (　　) Canada next summer.",
    answer: {
      kind: "choice",
      options: ["to visit", "to visits", "to visiting", "visits"],
      correct: 0,
      why: ["正しい。to のあとは原形 visit。", "主語が3人称単数でも、-s がつくのは hopes だけ。to のあとは原形。", "to のあとに -ing の形は置かない。", "hopes と visits の動詞が2つ並んでしまう。"],
    },
    point: "主語が3人称単数でも to のあとは原形",
    steps: [{ title: "-s がつくのは文の動詞だけ", body: "Aya は3人称単数なので {{hopes}} に -s がつきますが、to のあとは {{原形 visit}} のままです。", trap: "主語につられて to visits にしてしまう。", back: [S1] }],
  },
  {
    ...base("needed-to-buy", 1),
    prompt: "（　）内の語を不定詞の形にして書きなさい（2語）。\nTom needed some money (buy) a concert ticket.",
    answer: { kind: "term", accept: ["to buy"], near: [{ text: "for buy", why: "「〜するために」は for ではなく to ＋ 原形で表します。" }, { text: "to buying", why: "不定詞は to ＋ 原形。-ing にはしません。" }, { text: "to bought", why: "文が過去でも、to のあとは原形 buy のままです。" }] },
    point: "目的「〜するために」は to ＋ 原形",
    steps: [{ title: "過去の文でも原形", body: "「チケットを買うために」は {{to buy}}。needed が過去形でも、to のあとは原形です。", back: [S1, S2] }],
  },
  {
    ...base("no-time-to-play", 1),
    prompt: "次の英文の意味として正しいものはどれですか。\nI have no time to play games today.",
    answer: {
      kind: "choice",
      options: ["今日はゲームをする時間がない。", "今日はゲームをするために時間がない。", "今日はゲームをすることがない。", "今日はゲームをして時間がなくなった。"],
      correct: 0,
      why: ["正しい。to play は前の名詞 time を説明する（ゲームをするための時間）。", "日本語として不自然。to play は「何のために」ではなく time を説明している。", "time（時間）が訳に入っていない。", "「〜して」と原因の意味ではない。現在の文でもある。"],
    },
    point: "名詞のすぐあとの to ＋ 原形は、その名詞を説明",
    steps: [{ title: "time を後ろから説明", body: "time {{to play}} games で「ゲームをする（ための）時間」。no time なので「時間がない」です。", back: [S2, S3] }],
  },
  {
    ...base("museum-to-see", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nWe visited the museum (　　) see old dinosaur bones.",
    answer: {
      kind: "choice",
      options: ["to", "for", "at", "and to"],
      correct: 0,
      why: ["正しい。to see で「見るために」と目的を表す。", "for のあとに動詞の原形は置けない。", "at のあとに動詞の原形は置けない。", "and to では文がつながらない。"],
    },
    point: "「〜するために」は to ＋ 原形（for ＋ 原形は×）",
    steps: [{ title: "目的を表す不定詞", body: "「恐竜の骨を見るために」と目的を言うので {{to see}}。前置詞 for のあとには動詞の原形を置けません。", trap: "日本語の「〜のために」につられて for を選ぶ。", back: [S2] }],
  },
  // ---- 標準 ----
  {
    ...base("yoho-letters", 2),
    prompt: "次の文の to write は、どの用法ですか。\nKenta has a lot of letters to write this week.",
    keepOrder: true,
    answer: {
      kind: "choice",
      options: YOHO,
      correct: 1,
      why: ["has の目的語は letters。to write が「何を？」の答えになっているわけではない。", "正しい。すぐ前の名詞 letters を「書くべき（手紙）」と説明している。", "to の前で文が完成して「何のために？」に答えているのではない。", "前に感情の形容詞（glad・sad など）はない。"],
    },
    point: "to の前が名詞なら形容詞的用法",
    steps: [{ title: "to のすぐ前を見る", body: "to のすぐ前は名詞 {{letters}}。名詞を後ろから説明する {{形容詞的用法}} で「今週書くべき手紙がたくさんある」。", back: [S3] }],
  },
  {
    ...base("yoho-surprised", 2),
    prompt: "次の文の to see は、どの用法ですか。\nMy sister was surprised to see so much snow.",
    keepOrder: true,
    answer: {
      kind: "choice",
      options: YOHO,
      correct: 3,
      why: ["was のあとの補語は surprised。to see は「〜すること」ではない。", "前は名詞ではなく形容詞 surprised。", "「雪を見るために驚いた」では意味が通らない。", "正しい。感情を表す surprised のあとで「見て（驚いた）」と原因を表す。"],
    },
    point: "感情の形容詞＋to ＋ 原形＝「〜して」",
    steps: [{ title: "感情の原因", body: "surprised（驚いた）は感情を表す形容詞。そのすぐあとの {{to see}} は「見て」と、驚いた{{原因}}を表します。訳は「姉はとてもたくさんの雪を見て驚いた」。", back: [S2, S3] }],
  },
  {
    ...base("why-to-make", 2),
    prompt: "次の問いへの答えとして、もっとも適切なものはどれですか。\nWhy did Mika get up at five this morning?",
    answer: {
      kind: "choice",
      options: ["To make lunch for her family.", "For make lunch for her family.", "To made lunch for her family.", "She make lunch for her family."],
      correct: 0,
      why: ["正しい。Why ～? には To ＋ 原形で目的を答えられる。", "for のあとに原形は置けない。", "to のあとは過去形ではなく原形。", "主語が She なので makes／made になるはずで、文として誤り。"],
    },
    point: "Why ～? には To ＋ 原形. で目的を答えられる",
    steps: [{ title: "目的だけを答える", body: "「なぜ5時に起きたの？」に「家族の昼食を作るためよ」と答えるなら {{To make}} ～. の形。Because she wanted to make ～. でも答えられます。", back: [S4] }],
  },
  {
    ...base("order-books-to-read", 2),
    prompt: "日本文に合うように、語を並べかえなさい。\n「今日は読むべき本が3冊あります。」",
    answer: { kind: "order", tokens: ["I", "have", "three", "books", "to", "read", "today."], distractor: "reading" },
    point: "名詞＋to ＋ 原形で「〜すべき（名詞）」",
    steps: [{ title: "名詞のあとに to ＋ 原形", body: "まず I have three books（3冊の本がある）。そのあとに {{to read}} を続けて books を説明します。日本語と逆で、説明は名詞の{{後ろ}}です。", back: [S2] }],
  },
  {
    ...base("came-to-teach", 2),
    prompt: "（　）内の語を不定詞の形にして書きなさい（2語）。\nMs. Green came to Japan (teach) English.",
    answer: { kind: "term", accept: ["to teach"], near: [{ text: "to teaches", why: "to のあとは原形 teach です。" }, { text: "to taught", why: "came が過去でも、to のあとは原形 teach です。" }, { text: "for teach", why: "目的は for ではなく to ＋ 原形。" }] },
    point: "came to Japan の to は前置詞、to teach は不定詞",
    steps: [
      { title: "to が2つある", body: "came to Japan の to は、後ろが名詞なので「〜へ」の{{前置詞}}。( ) には「教えるために」の {{to teach}} が入ります。", back: [S3] },
    ],
  },
  {
    ...base("which-to-infinitive", 2, "思考・判断・表現"),
    prompt: "次の文のうち、to が{{不定詞}}の to であるものはどれですか。",
    answer: {
      kind: "choice",
      options: ["I want to sleep a little.", "We walked to the station.", "He talked to his teacher.", "Give this book to Ken."],
      correct: 0,
      why: ["正しい。to のあとが動詞の原形 sleep なので不定詞。", "to のあとは名詞（the station）。「〜へ」の前置詞。", "to のあとは名詞（his teacher）。前置詞。", "to のあとは名詞（Ken）。前置詞。"],
    },
    point: "to の後ろが原形なら不定詞、名詞なら前置詞",
    steps: [{ title: "to の後ろを確かめる", body: "to のあとが{{動詞の原形}}なら不定詞、{{名詞}}なら前置詞です。sleep は動詞なので、I want to sleep の to が不定詞です。", back: [S3] }],
  },
  // ---- 発展 ----
  {
    ...base("same-yoho", 3, "思考・判断・表現"),
    prompt: "次の文の to tell と{{同じ用法}}の不定詞をふくむ文はどれですか。\nI have many things to tell you.",
    answer: {
      kind: "choice",
      options: ["Do you have anything to eat?", "Ken likes to cook curry.", "I went out to buy some bread.", "We were sad to hear the news."],
      correct: 0,
      why: ["正しい。anything を「食べるための（もの）」と説明する形容詞的用法。to tell も things を説明している。", "likes の目的語「〜すること」で名詞的用法。", "「パンを買うために」で副詞的用法（目的）。", "sad のあとで「聞いて」と原因を表す副詞的用法。"],
    },
    point: "名詞（things・anything）＋to ＋ 原形＝形容詞的",
    steps: [
      { title: "もとの文の用法", body: "things {{to tell}} you で「あなたに話すべきこと」。前の名詞を説明する{{形容詞的用法}}です。", back: [S3] },
      { title: "同じ形をさがす", body: "anything {{to eat}}（何か食べるもの）も、前の名詞を説明しています。", back: [S2] },
    ],
  },
  {
    ...base("order-came-home", 3),
    prompt: "日本文に合うように、語を並べかえなさい。ただし、使わない語が1つあります。\n「父はニュースを見るために早く帰宅しました。」",
    answer: { kind: "order", tokens: ["My", "father", "came", "home", "early", "to", "watch", "the", "news."], distractor: "watching" },
    point: "文を完成させてから to ＋ 原形で目的を足す",
    steps: [
      { title: "まず文を作る", body: "My father came home early（父は早く帰宅した）で文が完成します。", back: [S3] },
      { title: "目的を後ろに足す", body: "「ニュースを見るために」は {{to watch}} the news。to のあとは原形なので watching は使いません。", back: [S2] },
    ],
  },
  {
    ...base("fix-error", 3, "思考・判断・表現"),
    prompt: "次の英文には誤りが1か所あります。正しく直したものはどれですか。\nShe wanted to bought a new bag for her trip.",
    answer: {
      kind: "choice",
      options: ["to bought → to buy", "wanted → wants", "a → the", "for → to"],
      correct: 0,
      why: ["正しい。文が過去でも、to のあとは原形 buy。", "wanted（過去形）のままで正しい。誤りは to のあと。", "a new bag で正しい。", "for her trip（旅行のために）は名詞の前なので for で正しい。"],
    },
    point: "過去の文でも to のあとは原形",
    steps: [{ title: "過去を表すのは文の動詞", body: "過去を表すのは {{wanted}} だけ。不定詞は to ＋ {{原形}} なので to buy に直します。", trap: "文全体が過去だからと、to のあとまで過去形にしてしまう。", back: [S1] }],
  },
  {
    ...base("will-to-finish", 3, "思考・判断・表現"),
    prompt: "次の英文の意味として正しいものはどれですか。\nKaito has a strong will to finish the race.",
    answer: {
      kind: "choice",
      options: ["カイトには、レースを完走しようという強い意志がある。", "カイトは、レースを完走するつもりだ。", "カイトは、レースを完走するために強くなる。", "カイトは、レースを完走して強い意志をもった。"],
      correct: 0,
      why: ["正しい。will は a strong がついた名詞「意志」。to finish がどんな意志かを説明する形容詞的用法。", "will を「〜するつもり」の助動詞と読んだ誤り。ここでは a strong will と名詞になっている。", "「〜するために強くなる」という意味の語はない。", "has は現在形で、「完走して」と原因を表す形でもない。"],
    },
    point: "a strong will（名詞）を to ＋ 原形が説明",
    steps: [
      { title: "will は名詞", body: "a strong {{will}} と、a と形容詞がついているので will は名詞「意志」です。", back: [S3] },
      { title: "名詞のあとの to", body: "名詞のすぐあとの {{to finish}} は形容詞的用法で「完走しようという（意志）」と説明します。", back: [S3] },
    ],
  },
];

export const J_EN_2_FUTEISHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中2",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "不定詞（to ＋ 動詞の原形）",
      lead: "次の問いに答えなさい。",
      style: "mix",
      pick: 6,
      questions: POOL,
    },
  ],
};
