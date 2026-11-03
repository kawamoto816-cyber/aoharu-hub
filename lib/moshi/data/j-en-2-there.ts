// 中2英語「There is / are 〜」の単元模試 (B: 問題プールからシードで6問)。問題はすべてオリジナル。
// プール15問 (基本5・標準6・発展4)。1回に基本2・標準2・発展2 が出る (lib/moshi/unit.ts の pickQuestions)。選択肢の順もシードで変わる。
// A (生成) は使っていないので検算式はなし。choice・term・order の正答は check-moshi が採点器で満点になるか確かめる。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-2-there";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "There is ＋ もの ＋ 場所 の順に並べる");
const S2 = L(2, "is か are かは、後ろの名詞で決まる");
const S3 = L(3, "否定文・疑問文と How many 〜 are there?");
const S4 = L(4, "the や my がつく「特定のもの」には使わない");
const S5 = L(5, "物語は There で始まる");

// 配点は難易度で決める (基本15・標準17・発展18。2問ずつ出るので満点100)
const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("bridge", 1),
    prompt: "（ ）に入る語として正しいものはどれですか。\nThere (　　) a small bridge over the river.",
    answer: {
      kind: "choice",
      options: ["is", "are", "am", "be"],
      correct: 0,
      why: ["正しい。後ろの名詞 a small bridge は1つなので is。", "are は後ろの名詞が2つ以上のとき。", "am は主語が I のときだけ。", "be は原形。この文では is か are にする。"],
    },
    point: "後ろの名詞が1つなら There is",
    steps: [{ title: "後ろの名詞を見る", body: "文の主語は be動詞の後ろの {{a small bridge}}（1つ）。だから {{There is}}。", back: [S1, S2] }],
  },
  {
    ...base("windows", 1),
    prompt: "（ ）に入る語として正しいものはどれですか。\nThere (　　) four windows in this classroom.",
    answer: {
      kind: "choice",
      options: ["are", "is", "has", "does"],
      correct: 0,
      why: ["正しい。four windows は複数なので are。", "is は後ろの名詞が1つや数えられない名詞のとき。", "there と has はいっしょに使わない。", "There 構文は be動詞の文。does は使わない。"],
      mistakeOf: [null, 0, null, null],
    },
    point: "後ろの名詞が複数なら There are",
    steps: [{ title: "数を見る", body: "four windows は {{4つ（複数）}} なので {{There are}}。", back: [S2] }],
  },
  {
    ...base("leaves", 1),
    prompt: "（ ）に入る語として正しいものはどれですか。\nThere (　　) a lot of leaves on the ground last week.",
    answer: {
      kind: "choice",
      options: ["were", "was", "are", "is"],
      correct: 0,
      why: ["正しい。leaves（leaf の複数形）は複数で、last week は過去なので were。", "was は後ろの名詞が1つのときの過去。leaves は複数。", "are は現在。last week は過去。", "is は現在で単数。"],
    },
    point: "過去の文は is → was、are → were",
    steps: [{ title: "時と数の両方を見る", body: "last week で {{過去}}、leaves は {{複数}}。だから {{There were}}。", back: [S2] }],
  },
  {
    ...base("post-office", 1),
    prompt: "（ ）に入る語句として正しいものはどれですか。\nIs there a post office on this street? — Yes, (　　).",
    answer: {
      kind: "choice",
      options: ["there is", "it is", "there are", "it does"],
      correct: 0,
      why: ["正しい。Is there 〜? には there を使って Yes, there is. と答える。", "答えにも there を使う。it は使わない。", "a post office は1つなので is。", "There 構文は be動詞の文。does では答えない。"],
      mistakeOf: [null, 2, null, null],
    },
    point: "Is there 〜? には there を使って答える",
    steps: [{ title: "答えも there で", body: "疑問文 Is there 〜? には {{Yes, there is.}} / {{No, there isn't.}} と答えます。", back: [S3] }],
  },
  {
    ...base("sugar", 1),
    prompt: "（ ）内の語を、正しい形にかえて答えなさい。\nThere ( be ) a little sugar in the jar.",
    answer: { kind: "term", accept: ["is", "'s"], near: [{ text: "are", why: "sugar は数えられない名詞なので単数あつかい。is を使います。" }] },
    point: "数えられない名詞は単数あつかいで is",
    steps: [{ title: "数えられない名詞", body: "sugar（砂糖）は {{数えられない名詞}}。単数あつかいなので {{There is}}。", back: [S2] }],
  },
  // ---- 標準 ----
  {
    ...base("elephants", 2),
    prompt: "日本語に合うように、語を並べかえなさい（使わない語が1つあります）。\nこの動物園には、ゾウが何頭いますか。",
    answer: { kind: "order", tokens: ["How", "many", "elephants", "are", "there", "in", "this", "zoo?"], distractor: "is" },
    point: "How many ＋ 複数名詞 ＋ are there 〜?",
    steps: [{ title: "数をたずねる形", body: "{{How many elephants}} のあとに疑問文の語順 {{are there}}、最後に場所。is は使わない語です。", back: [S3] }],
  },
  {
    ...base("your-bike", 2, "思考・判断・表現"),
    prompt: "「あなたの自転車は、門のそばにあります。」を表す英文として、もっとも適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Your bike is by the gate.", "There is your bike by the gate.", "There are your bike by the gate.", "There your bike is by the gate."],
      correct: 0,
      why: ["正しい。your がつく特定のものは、主語にしてふつうの be動詞の文で言う。", "There 構文は、相手が知らない新しいものを伝える形。your bike のような特定のものにはふつう使わない。", "特定のものに There は使わない。また bike は1台なので are も合わない。", "語順がくずれている。"],
      mistakeOf: [null, 1, 1, null],
    },
    point: "my・your・the がつく特定のものは「主語＋be動詞＋場所」",
    steps: [{ title: "新しいものか、特定のものか", body: "your bike は {{どれのことか決まっているもの}}。There ではなく {{Your bike is}} 〜 と言います。", back: [S4] }],
  },
  {
    ...base("trains", 2),
    prompt: "（ ）に入る語として正しいものはどれですか。\nThere (　　) any trains after midnight.",
    answer: {
      kind: "choice",
      options: ["aren't", "isn't", "don't", "doesn't"],
      correct: 0,
      why: ["正しい。trains は複数なので are not（aren't）。", "trains は複数。isn't は1つのとき。", "There 構文の否定は be動詞のあとに not。don't は使わない。", "doesn't も使わない。"],
    },
    point: "否定文は be動詞のあとに not",
    steps: [{ title: "否定文の形", body: "be動詞のあとに {{not}}。trains は複数なので {{There aren't}} any 〜。", back: [S3] }],
  },
  {
    ...base("no-chairs", 2, "思考・判断・表現"),
    prompt: "There are no chairs in this room. の意味として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["この部屋には、いすが1つもない。", "この部屋には、いすがいくつかある。", "この部屋のいすは、どこにもない場所にある。", "この部屋には、いすがたくさんある。"],
      correct: 0,
      why: ["正しい。no ＋名詞で「1つも〜がない」とゼロを言い切る。", "no は「ない」を表す。「いくつか」は some。", "no は chairs を打ち消し、「いすがない」という意味になる。", "「たくさん」は many や a lot of。"],
    },
    point: "There are no 〜 ＝「〜が1つもない」",
    steps: [{ title: "no の働き", body: "名詞の前の {{no}} は「1つもない」。not を使わずに {{ゼロ}} を言い切る形です。", back: [S3] }],
  },
  {
    ...base("customers", 2),
    prompt: "日本語に合うように、語を並べかえなさい（使わない語が1つあります）。\nきのうの夜、その店にはお客さんがたくさんいましたか。",
    answer: { kind: "order", tokens: ["Were", "there", "many", "customers", "in", "the", "shop", "last", "night?"], distractor: "Did" },
    point: "疑問文は be動詞を there の前に",
    steps: [{ title: "疑問文の作り方", body: "過去で複数なので were。{{Were を there の前}} に出します。Did は使わない語です。", back: [S2, S3] }],
  },
  {
    ...base("fisherman", 2),
    prompt: "昔話の始まりの文です。（ ）に入る語句として正しいものはどれですか。\nOnce upon a time, (　　) an old fisherman by the sea.",
    answer: {
      kind: "choice",
      options: ["there was", "there were", "there is", "it was"],
      correct: 0,
      why: ["正しい。過去の物語で、an old fisherman は1人なので there was。", "were は後ろの名詞が複数のとき。漁師は1人。", "昔話は過去のことなので is ではなく was。", "まだ知らない登場人物を紹介するのは There 構文。it は使わない。"],
    },
    point: "昔話の始まり＝Once upon a time, there was 〜",
    steps: [{ title: "登場人物を紹介する", body: "聞き手がまだ知らない {{新しい登場人物}} を出すので There 構文。過去で1人なので {{there was}}。", back: [S5] }],
  },
  // ---- 発展 ----
  {
    ...base("the-dictionary", 3, "思考・判断・表現"),
    prompt: "英文として{{ふつう使わない}}ものはどれですか。",
    answer: {
      kind: "choice",
      options: ["There is the dictionary on my desk.", "There is a key under the mat.", "There are two clocks in the hall.", "There was some rain this morning."],
      correct: 0,
      why: ["ふつう使わない。the dictionary はどれのことか決まっているものなので、The dictionary is on my desk. と言う。", "正しい。a key は相手が知らない新しいもの。", "正しい。two clocks は複数なので are。", "正しい。rain は数えられない名詞なので単数あつかいで was。"],
      mistakeOf: [1, null, null, null],
    },
    point: "There 構文は「新しいもの」を登場させる形",
    steps: [{ title: "a か the か", body: "There 構文は {{相手が知らない新しいもの}} を伝える形。{{the}} や my がつく特定のものには使いません。", back: [S4] }],
  },
  {
    ...base("no-milk", 3),
    prompt: "日本語に合うように、（ ）に入る語を2語で答えなさい。\n冷蔵庫には、牛乳がまったくありませんでした。\nThere (　　) (　　) milk in the fridge.",
    answer: { kind: "term", accept: ["was no", "wasn't any", "was not any"], near: [{ text: "were no", why: "milk は数えられない名詞なので単数あつかい。were ではなく was。" }, { text: "isn't any", why: "「ありませんでした」は過去の文。is ではなく was。" }] },
    point: "数えられない名詞＋過去 → There was",
    steps: [
      { title: "is / are と時を決める", body: "milk は {{数えられない名詞}} で単数あつかい、文は過去なので {{was}}。", back: [S2] },
      { title: "「まったくない」", body: "{{was no}} milk、または {{wasn't any}} milk で「1つもない」を表します。", back: [S3] },
    ],
  },
  {
    ...base("princesses", 3),
    prompt: "日本語に合うように、語を並べかえなさい（使わない語が1つあります）。\nむかしむかし、古いお城に2人の王女がいました。",
    answer: { kind: "order", tokens: ["Once", "upon", "a", "time,", "there", "were", "two", "princesses", "in", "an", "old", "castle."], distractor: "was" },
    point: "過去の物語で複数なら there were",
    steps: [
      { title: "be動詞を決める", body: "two princesses は複数、昔話なので過去。{{there were}} を使い、was は使わない語です。", back: [S2, S5] },
      { title: "語順", body: "Once upon a time, のあとに {{there were ＋ 登場人物 ＋ 場所}} の順。", back: [S1, S5] },
    ],
  },
  {
    ...base("good-movies", 3, "思考・判断・表現"),
    prompt: "英文として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Are there any good movies on TV tonight?", "Is there any students in the music room?", "There are a library next to the park.", "How many cup are there on the shelf?"],
      correct: 0,
      why: ["正しい。movies は複数なので Are there 〜?。", "students は複数なので Are there 〜? にする。", "a library は1つなので There is。", "How many のあとの名詞は複数形 cups にする。"],
      mistakeOf: [null, 0, 0, 3],
    },
    point: "be動詞は後ろの名詞、How many のあとは複数形",
    steps: [
      { title: "後ろの名詞で決める", body: "students・movies は複数なので {{are}}、a library は1つなので {{is}}。", back: [S2] },
      { title: "How many", body: "How many のあとは必ず {{複数形}}（cups）。", back: [S3] },
    ],
  },
];

export const J_EN_2_THERE_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中2",
  minutes: 10,
  review: { status: "draft" },
  sections: [{ title: "There is / are の文", lead: "次の問いに答えなさい。", style: "word", pick: 6, questions: POOL }],
};
