// 中1英語「英作文」の単元模試 (B: 問題プールからシードで選ぶ)。問題・英文はすべてオリジナル (ドリル・教科書の文は使っていない)。
// 大問1「正しい英文を選ぶ」・大問2「英文を書く・並べかえ」の2つ。それぞれプール6問 (基本2・標準2・発展2) から、基本・標準・発展を1問ずつ出す。
// 1回 6問・満点100 (基本15・標準17・発展18 × 2)。A (生成) は使っていないので検算式はなし。英文の答えは acc() で表記ゆれ (’・カンマ・?) を受ける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-1-eisakubun";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "日本語にない主語を、まず決める");
const S2 = L(2, "英語の語順は「だれが→どうする」が先");
const S3 = L(3, "動詞を決めるときは2つを見分ける");
const S4 = L(4, "最後に「時」と「主語」で動詞の形を整える");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

/** 英文の答えの表記ゆれ: 末尾の ? なし・カンマなし・’ (スマホのアポストロフィ) */
function acc(...xs: string[]): string[] {
  const out = new Set<string>();
  for (const x of xs) for (const y of [x, x.replace(/\?$/, ""), x.replace(/,/g, "")]) for (const z of [y, y.replace(/'/g, "’")]) out.add(z);
  return [...out];
}

// ---- 大問1 正しい英文を選ぶ ----
const SELECT: QuestionB[] = [
  // 基本
  {
    ...base("shugo", 1),
    prompt: "「毎朝7時に起きます。」（自分のこと）を表す英文として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["I get up at seven every morning.", "Get up at seven every morning.", "I am get up at seven every morning.", "I seven get up every morning."],
      correct: 0,
      why: ["主語 I を補い、すぐあとに動詞 get up。", "主語がないと「毎朝7時に起きなさい」という命令の文になる。", "get up は一般動詞。be動詞 am といっしょに使わない。", "時刻の seven を主語と動詞の間に入れている。動詞は主語のすぐあと。"],
    },
    point: "日本語にない主語 I を補う",
    steps: [{ title: "主語を決める", body: "日本語には「私は」がありませんが、自分のことなので主語は {{I}}。英語の文にはかならず主語が要ります。", back: [S1] }],
  },
  {
    ...base("be-ippan", 1),
    prompt: "「私の兄は野球が好きです。」を表す英文として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["My brother likes baseball.", "My brother is likes baseball.", "My brother is baseball.", "My brother like baseball."],
      correct: 0,
      why: ["「好きだ」は一般動詞 like。主語が3人称単数なので likes。", "be動詞 is と一般動詞 likes を並べている。", "is だと「兄＝野球」の意味になってしまう。", "主語 my brother は3人称単数で現在の文。likes にする。"],
      mistakeOf: [null, 0, null, 1],
    },
    point: "「好き」は一般動詞。be動詞はつけない",
    steps: [
      { title: "動詞の種類", body: "「好きだ」は気持ちを表す {{一般動詞}} like。「〜です」につられて is をつけません。", back: [S3] },
      { title: "形を整える", body: "主語 my brother は{{3人称単数}}で現在なので {{likes}}。", back: [S4] },
    ],
  },
  // 標準
  {
    ...base("basho-toki", 2),
    prompt: "「私たちは放課後、体育館でバレーボールをします。」を表す英文として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["We play volleyball in the gym after school.", "We play in the gym volleyball after school.", "We volleyball play in the gym after school.", "We are play volleyball in the gym after school."],
      correct: 0,
      why: ["だれが（We）→どうする（play）→何を（volleyball）→どこで→いつ、の順。", "「何を」の volleyball は動詞のすぐあとに置く。", "日本語の順のまま。動詞 play は主語のすぐあと。", "play は一般動詞。be動詞 are と並べない。"],
      mistakeOf: [null, null, 2, 0],
    },
    point: "主語→動詞→何を→どこで→いつ",
    steps: [
      { title: "主語と動詞を先に", body: "{{We play}}（私たちはする）を先に置き、何をするか（{{volleyball}}）を続けます。", back: [S2] },
      { title: "場所が先、時があと", body: "「どこで」in the gym、「いつ」after school の順。{{場所が先、時があと}}です。", back: [S2] },
    ],
  },
  {
    ...base("shugo-wa", 2),
    prompt: "「日曜日は、父が夕食を作ります。」を表す英文として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["My father cooks dinner on Sundays.", "Sunday is my father cooks dinner.", "My father cook dinner on Sundays.", "My father dinner cooks on Sundays."],
      correct: 0,
      why: ["作るのは父なので主語は my father。3人称単数なので cooks。", "「日曜日は」は主語ではない。また is と cooks を並べている。", "主語 my father は3人称単数。cooks にする。", "日本語の順のまま。動詞 cooks は主語のすぐあと。"],
    },
    point: "「〜は」がついても主語とは限らない",
    steps: [
      { title: "だれがするのか", body: "夕食を作るのは{{父}}。「日曜日は」は「いつ」を表すだけで、主語は {{my father}} です。", trap: "「〜は」がついた語をそのまま主語にしない。", back: [S1] },
      { title: "形を整える", body: "主語が3人称単数で現在なので {{cooks}}。「日曜日に（毎週）」は on Sundays を最後に。", back: [S4, S2] },
    ],
  },
  // 発展
  {
    ...base("very-much", 3, "思考・判断・表現"),
    prompt: "「私はねこがとても好きです。」を表す英文として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["I like cats very much.", "I very like cats.", "I am like cats very much.", "I like very much cats."],
      correct: 0,
      why: ["「とても好き」は like 〜 very much。very much は文の最後に置く。", "very は動詞 like の前に置けない。", "like は一般動詞。am といっしょに使わない。", "「何を」の cats は動詞 like のすぐあと。very much はそのあと。"],
      mistakeOf: [null, 3, 0, null],
    },
    point: "「とても好き」は like 〜 very much",
    steps: [{ title: "very much の位置", body: "主語→動詞→何を（{{I like cats}}）をまず作り、「とても」は最後に {{very much}} を足します。", trap: "日本語の「とても好き」の順で I very like としない。", back: [S2] }],
  },
  {
    ...base("now-ing", 3, "思考・判断・表現"),
    prompt: "「ケンは今、自分の部屋で音楽を聞いています。」を表す英文として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Ken is listening to music in his room now.", "Ken listens to music in his room now.", "Ken is listen to music in his room now.", "Ken is listening music in his room now."],
      correct: 0,
      why: ["今していることは be動詞＋ing。listen は「〜を」に to が要る。", "listens は「ふだん聞く」。「今〜している」は is listening。", "be動詞のあとは ing の形。is listen とは言わない。", "listen のあとに「音楽を」と続けるには to が要る。"],
    },
    point: "「今〜している」は be動詞＋ing",
    steps: [
      { title: "時を見る", body: "「{{今}}〜している」なので、be動詞＋ing。主語 Ken に合わせて {{is listening}}。", back: [S4] },
      { title: "語を並べる", body: "listening {{to}} music（音楽を）→ in his room（どこで）→ now（いつ）の順です。", back: [S2] },
    ],
  },
];

// ---- 大問2 英文を書く・並べかえ ----
const WRITE: QuestionB[] = [
  // 基本
  {
    ...base("order-tennis", 1),
    prompt: "日本語に合うように、語を並べかえなさい（1語だけ使わない語があります）。\n「私は毎週土曜日にテニスをします。」",
    answer: { kind: "order", tokens: ["I", "play", "tennis", "every", "Saturday."], distractor: "am" },
    point: "主語→動詞→何を→いつ",
    steps: [{ title: "英語の語順", body: "{{I play}}（私はする）を先に、tennis（何を）、every Saturday（いつ）と続けます。", trap: "play は一般動詞。am はいらない。", back: [S2, S3] }],
  },
  {
    ...base("w-like", 1),
    prompt: "「私は夏が好きです。」を3語の英文で書きなさい。",
    answer: { kind: "term", accept: acc("I like summer."), near: [{ text: "I am like summer.", why: "「好き」は一般動詞 like。be動詞 am はつけません。" }, { text: "I'm like summer.", why: "I'm は I am。like は一般動詞なので am はいりません。" }, { text: "Summer is like.", why: "好きなのは「私」。主語は I で、summer は好きな相手です。" }] },
    point: "主語 I＋一般動詞 like＋好きなもの",
    steps: [{ title: "主語と動詞", body: "「私は」→ {{I}}、「好きだ」→ {{like}}、好きな相手 {{summer}} を続けます。", trap: "「夏が」の「が」につられて summer を主語にしない。", back: [S1, S3] }],
  },
  // 標準
  {
    ...base("w-3tan", 2),
    prompt: "「エミは毎日ピアノを練習します。」を英文で書きなさい。（練習する＝practice）",
    answer: {
      kind: "term",
      accept: acc("Emi practices the piano every day.", "Emi practices piano every day."),
      near: [{ text: "Emi practice the piano every day.", why: "主語 Emi は3人称単数で現在。practices にします。" }, { text: "Emi is practice the piano every day.", why: "practice は一般動詞。is はつけず practices にします。" }],
    },
    point: "3人称単数・現在 → 動詞に s",
    steps: [
      { title: "語順", body: "Emi（だれが）→ practice（どうする）→ the piano（何を）→ every day（いつ）。", back: [S2] },
      { title: "動詞の形", body: "主語 Emi は{{3人称単数}}で、毎日のこと（現在）なので {{practices}}。", back: [S4] },
    ],
  },
  {
    ...base("order-library", 2),
    prompt: "日本語に合うように、語を並べかえなさい（1語だけ使わない語があります）。\n「私たちは毎日、図書館で勉強します。」",
    answer: { kind: "order", tokens: ["We", "study", "in", "the", "library", "every", "day."], distractor: "are" },
    point: "場所が先、時があと",
    steps: [{ title: "どこで→いつ", body: "{{We study}} のあと、場所 in the library、時 every day の順。{{場所が先、時があと}}です。", trap: "study は一般動詞。are はいらない。", back: [S2, S3] }],
  },
  // 発展
  {
    ...base("w-neg", 3, "思考・判断・表現"),
    prompt: "「私の父はコーヒーを飲みません。」を英文で書きなさい。",
    answer: {
      kind: "term",
      accept: acc("My father does not drink coffee.", "My father doesn't drink coffee."),
      near: [
        { text: "My father doesn't drinks coffee.", why: "does を使ったら、動詞は原形 drink にもどします。" },
        { text: "My father is not drink coffee.", why: "drink は一般動詞。否定は does not（doesn't）を使います。" },
        { text: "My father don't drink coffee.", why: "主語 my father は3人称単数なので does not（doesn't）。" },
      ],
    },
    point: "一般動詞の否定 → does not＋原形",
    steps: [
      { title: "動詞の種類", body: "「飲む」は{{一般動詞}}。否定文は be動詞の not ではなく、do・does を使います。", back: [S3] },
      { title: "主語に合わせる", body: "主語 my father は3人称単数なので {{does not}}（doesn't）＋原形 {{drink}}。", back: [S4] },
    ],
  },
  {
    ...base("w-q", 3, "思考・判断・表現"),
    prompt: "「あなたは自転車で学校に来ますか。」を英文で書きなさい。（自転車で＝by bike）",
    answer: {
      kind: "term",
      accept: acc("Do you come to school by bike?", "Do you come to school by bicycle?"),
      near: [{ text: "Are you come to school by bike?", why: "come は一般動詞。疑問文は Do を文の頭に置きます。" }, { text: "You come to school by bike?", why: "疑問文は Do を文の頭に置きます。" }, { text: "Do you come by bike to school?", why: "「どこへ」to school を come のすぐあとに、手段 by bike はそのあとに置くのがふつうです。" }],
    },
    point: "一般動詞の疑問文 → Do＋主語＋原形 ?",
    steps: [
      { title: "動詞を決める", body: "「来る」は一般動詞 {{come}}。疑問文は {{Do}} を主語 you の前に置きます。", back: [S3] },
      { title: "語を並べる", body: "Do you come → to school（どこへ）→ by bike（どうやって）の順。最後に「?」。", back: [S2, S4] },
    ],
  },
];

export const J_EN_1_EISAKUBUN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中1",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    { title: "正しい英文を選ぶ", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: SELECT },
    { title: "英文を書く・並べかえ", lead: "次の問いに答えなさい。英文は最初の文字を大文字にし、最後に . や ? をつけなさい。", style: "writing", pick: 3, questions: WRITE },
  ],
};
