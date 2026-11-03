// 中1英語「現在進行形」の単元模試 (B: 問題プールからシードで6問)。問題はすべてオリジナル。
// プール15問 (基本5・標準6・発展4)。1回に基本2・標準2・発展2 が出る (lib/moshi/unit.ts の pickQuestions)。選択肢の順もシードで変わる。
// A (生成) は使っていないので検算式はなし。choice・term・order の正答は check-moshi が採点器で満点になるか確かめる。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-1-shinkokei";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "形は「be動詞＋動詞の ing 形」");
const S2 = L(2, "ing 形の作り方は3パターン");
const S3 = L(3, "現在形と現在進行形のちがい");
const S4 = L(4, "進行形にしない動詞がある");
const S5 = L(5, "歌と映画の題名に生きる ing");

// 配点は難易度で決める (基本15・標準17・発展18。2問ずつ出るので満点100)
const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("sitting", 1),
    prompt: "sit の ing 形を答えなさい。",
    answer: { kind: "term", accept: ["sitting"], near: [{ text: "siting", why: "「短い母音＋子音字」で終わる語は、最後の字を重ねて ing をつけます。" }] },
    point: "短い母音＋子音字は最後の字を重ねる",
    steps: [{ title: "語の終わりを見る", body: "sit は短い母音 i ＋子音字 t で終わるので、{{t を重ねて}} sitting。", back: [S2] }],
  },
  {
    ...base("writing", 1),
    prompt: "write の ing 形を答えなさい。",
    answer: { kind: "term", accept: ["writing"], near: [{ text: "writeing", why: "e で終わる語は、e をとって ing をつけます。" }, { text: "writting", why: "write は e で終わる語。t は重ねず、e をとって ing。" }] },
    point: "e で終わる語は e をとって ing",
    steps: [{ title: "語の終わりを見る", body: "write は {{e で終わる}} ので、e をとって writing。", back: [S2] }],
  },
  {
    ...base("is-cooking", 1),
    prompt: "（ ）に入る語として正しいものはどれですか。\nMy mother (　　) cooking in the kitchen now.",
    answer: {
      kind: "choice",
      options: ["is", "am", "are", "does"],
      correct: 0,
      why: ["正しい。主語 My mother は1人なので is。", "am は主語が I のときだけ。", "are は主語が you や複数のとき。", "進行形は be動詞＋ing 形。does は使わない。"],
    },
    point: "be動詞は主語で決まる（1人・1つは is）",
    steps: [{ title: "主語を見る", body: "進行形の be動詞は、ふつうの be動詞の文と同じく {{主語で決まり}} ます。My mother は1人なので is。", back: [S1] }],
  },
  {
    ...base("are-swimming", 1),
    prompt: "（ ）に入る語句として正しいものはどれですか。\nLook! The children (　　) in the river.",
    answer: {
      kind: "choice",
      options: ["are swimming", "is swimming", "swimming", "swims"],
      correct: 0,
      why: ["正しい。children は複数なので are＋swimming。", "children（子どもたち）は複数なので is ではなく are。", "be動詞がないと文にならない。", "Look! は「今している」の合図。swims は現在形で、主語も複数には合わない。"],
      mistakeOf: [null, null, 0, null],
    },
    point: "Look! は進行形の合図。複数の主語は are",
    steps: [
      { title: "合図を見つける", body: "{{Look!}}（見て）は、目の前で今起きている動作の合図。進行形にします。", back: [S3] },
      { title: "be動詞を選ぶ", body: "children は child の複数形なので {{are}}。", back: [S1] },
    ],
  },
  {
    ...base("am-listening", 1),
    prompt: "「私は今、音楽を聞いています。」を表す英文になるように、（ ）に入る語句を選びなさい。\nI (　　) to music now.",
    answer: {
      kind: "choice",
      options: ["am listening", "listening", "am listen", "listen"],
      correct: 0,
      why: ["正しい。am＋ing 形。", "be動詞が足りない。ing 形だけでは文にならない。", "be動詞のあとの動詞は ing 形にする。", "listen は現在形で「ふだん聞く」。now の「今している」に合わない。"],
      mistakeOf: [null, 0, 1, null],
    },
    point: "be動詞と ing 形は2つでセット",
    steps: [{ title: "2つそろえる", body: "進行形は {{am / are / is＋ing 形}}。どちらかを落とすと文になりません。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...base("usually", 2, "思考・判断・表現"),
    prompt: "（ ）に入る語句として正しいものはどれですか。\nMy brother usually (　　) to school by bus.",
    answer: {
      kind: "choice",
      options: ["goes", "is going", "going", "go"],
      correct: 0,
      why: ["正しい。usually（ふだん）はくり返していることなので現在形。主語が3人称単数なので goes。", "進行形は「今している」動作。usually の文には現在形を使う。", "be動詞がなく、文にならない。", "主語 My brother は3人称単数なので -es がいる。"],
    },
    point: "usually・every day は現在形の合図",
    steps: [{ title: "ふだんか、今か", body: "{{usually}}（ふだん）はくり返しの習慣。進行形ではなく {{現在形}} を使います。", trap: "動作の動詞でも、習慣なら進行形にしない。", back: [S3] }],
  },
  {
    ...base("are-you-doing", 2),
    prompt: "日本語に合うように、語を並べかえなさい（使わない語が1つあります）。\nあなたは今、宿題をしていますか。",
    answer: { kind: "order", tokens: ["Are", "you", "doing", "your", "homework", "now?"], distractor: "Do" },
    point: "進行形の疑問文は be動詞を主語の前へ",
    steps: [{ title: "疑問文の作り方", body: "be動詞 {{Are を主語の前に}} 出し、ing 形はそのまま残します。do は使いません。", trap: "Do は使わない語。", back: [S1] }],
  },
  {
    ...base("no-isnt", 2),
    prompt: "（ ）に入る語句として正しいものはどれですか。\nIs Mr. Brown reading a newspaper? — No, (　　).",
    answer: {
      kind: "choice",
      options: ["he isn't", "he doesn't", "he is", "he not"],
      correct: 0,
      why: ["正しい。Is でたずねられたので is not（isn't）で答える。", "進行形の疑問文は be動詞の文。does では答えない。", "No のあとは否定の形にする。", "be動詞がないので文にならない。"],
    },
    point: "Is 〜? には is / isn't で答える",
    steps: [{ title: "たずねた形で答える", body: "Is でたずねられたら {{Yes, he is.}} / {{No, he isn't.}}。be動詞で答えます。", back: [S1] }],
  },
  {
    ...base("using", 2),
    prompt: "（ ）内の語を、正しい形にかえて答えなさい。\nThey aren't ( use ) the computer now.",
    answer: { kind: "term", accept: ["using"], near: [{ text: "useing", why: "e で終わる語は、e をとって ing をつけます。" }, { text: "use", why: "be動詞（aren't）のあとの動詞は ing 形にします。" }] },
    point: "否定文でも be動詞のあとは ing 形",
    steps: [
      { title: "否定文の形", body: "進行形の否定は {{be動詞＋not＋ing 形}}。aren't のあとは ing 形です。", back: [S1] },
      { title: "つづり", body: "use は e で終わるので、e をとって {{using}}。", back: [S2] },
    ],
  },
  {
    ...base("what-doing", 2, "思考・判断・表現"),
    prompt: "What are you doing? に対する答えとして、もっとも適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["I'm making a cake.", "Yes, I am.", "I make a cake every day.", "No, I'm not."],
      correct: 0,
      why: ["正しい。「何をしているの？」に、今している動作を進行形で答えている。", "What でたずねる疑問文には Yes / No で答えない。", "毎日の習慣の答えで、「今何をしているか」には合わない。", "What でたずねる疑問文には Yes / No で答えない。"],
    },
    point: "What are you doing? には進行形で答える",
    steps: [{ title: "疑問詞の疑問文", body: "What 〜? は「何を」をたずねるので、{{I'm＋ing 形 〜.}} で具体的に答えます。", back: [S1, S3] }],
  },
  {
    ...base("singin", 2),
    prompt: "映画の題名 Singin' in the Rain（雨に唄えば）の Singin' について、正しく説明しているものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "singing の g を落とした話しことばの形",
        "sing の過去形を短くした形",
        "sing の三単現の形",
        "sign（サイン）のつづりのまちがい",
      ],
      correct: 0,
      why: ["正しい。話しことばでは ing の g を落として -in' と書くことがある。", "sing の過去形は sang。", "sing の三単現は sings。", "つづりのまちがいではなく、singing を話しことばらしく書いた形。"],
    },
    point: "-in' は ing の g を落とした話しことばの形",
    steps: [{ title: "題名の ing", body: "{{Singin'}} は singing の g を落とした形。「雨の中で歌っている」今まさにの場面を表します。", back: [S5] }],
  },
  // ---- 発展 ----
  {
    ...base("jotai", 3, "思考・判断・表現"),
    prompt: "英文として{{まちがっている}}ものはどれですか。",
    answer: {
      kind: "choice",
      options: ["She is wanting a new bike.", "He is having lunch now.", "They are running in the park.", "I like this song very much."],
      correct: 0,
      why: ["まちがい。want（ほしい）は状態を表す動詞なので、ふつう進行形にしない。She wants a new bike. が正しい。", "正しい。have が「食べる」の意味なら進行形にできる。", "正しい。run の ing 形は n を重ねて running。", "正しい。like（好きだ）は状態の動詞なので現在形で言う。"],
    },
    point: "want・like・know など状態の動詞は進行形にしない",
    steps: [
      { title: "動作か状態か", body: "{{want}}（ほしい）・like・know は状態を表す動詞。ふつう進行形にしません。", back: [S4] },
      { title: "have は意味で決まる", body: "have が「食べる」なら動作なので {{is having}} にできます。", back: [S4] },
    ],
  },
  {
    ...base("ken-emi", 3),
    prompt: "日本語に合うように、語を並べかえなさい（使わない語が1つあります）。\nケンとエミは今、図書館で勉強しています。",
    answer: { kind: "order", tokens: ["Ken", "and", "Emi", "are", "studying", "in", "the", "library", "now."], alsoOk: [[2, 1, 0, 3, 4, 5, 6, 7, 8]], distractor: "is" },
    point: "2人が主語なら be動詞は are",
    steps: [
      { title: "主語は2人", body: "Ken and Emi は2人なので、be動詞は {{are}}。is は使わない語です。", back: [S1] },
      { title: "語順", body: "主語＋are studying のあとに、場所 in the library、時 now の順に置きます。", back: [S1] },
    ],
  },
  {
    ...base("is-having", 3),
    prompt: "日本語に合うように、（ ）内の語を正しい形にかえて、2語で答えなさい。\nエミは今、夕食を食べています。\nEmi ( have ) dinner now.",
    answer: { kind: "term", accept: ["is having", "'s having"], near: [{ text: "has", why: "「今食べている」の意味なので進行形にします。have が「食べる」の意味なら進行形にできます。" }, { text: "is haveing", why: "have は e で終わるので、e をとって having。" }] },
    point: "「食べる」の have は進行形にできる",
    steps: [
      { title: "have の意味を見る", body: "ここの have は「持っている」ではなく {{「食べる」}}。動作なので進行形にできます。", back: [S4] },
      { title: "形を作る", body: "主語 Emi は1人なので is。have は e をとって {{is having}}。", back: [S1, S2] },
    ],
  },
  {
    ...base("who-singing", 3, "思考・判断・表現"),
    prompt: "Who is singing over there? に対する答えとして、もっとも適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Yuki is.", "Yuki does.", "Yes, she is.", "Yuki sings every day."],
      correct: 0,
      why: ["正しい。「だれが歌っているの？」に〈人＋is.〉で答える。", "進行形の疑問文には be動詞で答える。does は使わない。", "Who でたずねる疑問文には Yes / No で答えない。", "今歌っている人をたずねているので、毎日の習慣では答えにならない。"],
    },
    point: "Who is 〜ing? には〈人＋is.〉で答える",
    steps: [{ title: "Who が主語", body: "Who が主語の疑問文には、{{答えの人＋is.}}（Yuki is singing. を短くした形）で答えます。", back: [S1] }],
  },
];

export const J_EN_1_SHINKOKEI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中1",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [{ title: "現在進行形の文", lead: "次の問いに答えなさい。", style: "word", pick: 6, questions: POOL }],
};
