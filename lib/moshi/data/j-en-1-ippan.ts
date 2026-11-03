// 中1英語「一般動詞」の単元模試 (B: 問題プールからシードで選ぶ)。問題・英文はすべてオリジナル (ドリル・教科書の文は使っていない)。
// 大問1「語を選ぶ」・大問2「書きかえ・並べかえ」の2つ。それぞれプール9問 (基本3・標準3・発展3) から、基本・標準・発展を1問ずつ出す。
// 1回 6問・満点100 (基本15・標準17・発展18 × 2)。A (生成) は使っていないので検算式はなし。英文の答えは acc() で表記ゆれ (’・カンマ・?) を受ける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-1-ippan";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "be動詞の文と一般動詞の文");
const S2 = L(2, "主語が「3人称単数」なら動詞に -s");
const S3 = L(3, "-s のつけ方には3つのきまりがある");
const S4 = L(4, "否定文・疑問文は do / does を使う");
const S5 = L(5, "三単現の s は、昔の英語の「生き残り」");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

/** 英文の答えの表記ゆれ: 末尾の ? なし・カンマなし・’ (スマホのアポストロフィ) */
function acc(...xs: string[]): string[] {
  const out = new Set<string>();
  for (const x of xs) for (const y of [x, x.replace(/\?$/, ""), x.replace(/,/g, "")]) for (const z of [y, y.replace(/'/g, "’")]) out.add(z);
  return [...out];
}

// ---- 大問1 語を選ぶ ----
const SELECT: QuestionB[] = [
  // 基本
  {
    ...base("plural-play", 1),
    prompt: "（　）に入る語句として正しいものはどれですか。\nAoi and Sora (　) badminton on Fridays.",
    answer: {
      kind: "choice",
      options: ["play", "plays", "playing", "are play"],
      correct: 0,
      why: ["主語は Aoi and Sora の2人（複数）なので -s をつけない。", "-s は主語が3人称単数のときだけ。2人なのでつけない。", "-ing の形だけでは、この文の動詞にならない。", "be動詞と一般動詞は並べない。"],
      mistakeOf: [null, 2, null, 1],
    },
    point: "主語が複数なら -s はつけない",
    steps: [{ title: "主語の数", body: "主語は Aoi and Sora の{{2人}}。複数なので、動詞は {{play}} のままです。", back: [S2] }],
  },
  {
    ...base("drives", 1),
    prompt: "（　）に入る語句として正しいものはどれですか。\nOur teacher (　) a red car.",
    answer: {
      kind: "choice",
      options: ["drives", "drive", "driving", "is drive"],
      correct: 0,
      why: ["our teacher は3人称単数なので -s をつけて drives。", "主語が3人称単数なので -s が要る。", "-ing の形だけでは、この文の動詞にならない。", "be動詞と一般動詞は並べない。"],
    },
    point: "3人称単数の主語 → 動詞に -s",
    steps: [{ title: "三単現の s", body: "our teacher は I・you 以外の{{1人}}＝3人称単数。現在の文なので drive に -s をつけて {{drives}}。", back: [S2] }],
  },
  {
    ...base("be-or-play", 1),
    prompt: "（　）に入る語句として正しいものはどれですか。\nI (　) the violin.",
    answer: {
      kind: "choice",
      options: ["play", "am play", "plays", "am"],
      correct: 0,
      why: ["主語 I の一般動詞の文。play のまま。", "be動詞と一般動詞は1つの文に並べない。", "主語が I なので -s はつけない。", "I am the violin. では「私＝バイオリン」になってしまう。"],
      mistakeOf: [null, 1, null, null],
    },
    point: "動詞の席は1つ。am play としない",
    steps: [{ title: "動詞は1つ", body: "「ひく」は一般動詞 {{play}}。動詞の席は1つなので、{{am play}} のように並べません。", back: [S1] }],
  },
  // 標準
  {
    ...base("brushes", 2),
    prompt: "（　）に入る語として正しいものはどれですか。\nMy little brother (　) his teeth after lunch.",
    answer: {
      kind: "choice",
      options: ["brushes", "brushs", "brush", "brushies"],
      correct: 0,
      why: ["sh で終わる語は -es をつける。", "sh で終わる語は -s ではなく -es。", "主語が3人称単数なので、形をかえる。", "y で終わる語ではないので -ies にはしない。"],
    },
    point: "sh で終わる語は -es",
    steps: [{ title: "つけ方を決める", body: "brush は {{sh}} で終わるので {{-es}}。brushes（ブラッシズ）です。", back: [S3] }],
  },
  {
    ...base("cries", 2),
    prompt: "（　）に入る語として正しいものはどれですか。\nThe baby (　) at night.",
    answer: {
      kind: "choice",
      options: ["cries", "crys", "cry", "cryes"],
      correct: 0,
      why: ["「子音字＋y」で終わる cry は y を i にかえて -es。", "y の前が子音字 r なので、そのまま -s にはしない。", "主語 the baby は3人称単数なので形をかえる。", "y を i にかえてから -es をつける。"],
      mistakeOf: [null, 3, null, null],
    },
    point: "子音字＋y → y を i にかえて -es",
    steps: [{ title: "y の前を見る", body: "cry は y の前が子音字 r。{{y を i にかえて -es}} で cries です。play のように母音字＋y ならそのまま -s。", back: [S3] }],
  },
  {
    ...base("has", 2),
    prompt: "（　）に入る語として正しいものはどれですか。\nMr. White (　) three sons.",
    answer: {
      kind: "choice",
      options: ["has", "have", "haves", "is have"],
      correct: 0,
      why: ["have は3人称単数のとき has になる。", "主語 Mr. White は3人称単数なので形をかえる。", "have は -s をつけず、has という形になる。", "be動詞と一般動詞は並べない。"],
    },
    point: "have の3人称単数は has",
    steps: [{ title: "have は特別", body: "主語は3人称単数。have だけは -s をつけず、{{has}} に形が変わります。", back: [S3] }],
  },
  // 発展
  {
    ...base("seikai-bun", 3, "思考・判断・表現"),
    prompt: "次の英文のうち、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Mr. Kato teaches science.", "My aunt doesn't speaks French.", "I am live in Nara.", "Riku and Hana walks to school."],
      correct: 0,
      why: ["正しい。ch で終わる teach は -es で teaches。", "doesn't のあとは原形。My aunt doesn't speak French.", "be動詞と一般動詞は並べない。I live in Nara.", "主語は2人なので -s はつけない。Riku and Hana walk to school."],
      mistakeOf: [null, 0, 1, 2],
    },
    point: "-s は1つの文に1回。動詞の席は1つ",
    steps: [
      { title: "動詞の形", body: "does を使ったら動詞は{{原形}}。be動詞と一般動詞は並べません。", back: [S4, S1] },
      { title: "主語の数", body: "Riku and Hana は2人なので {{-s をつけない}}。Mr. Kato は1人なので teaches。", back: [S2, S3] },
    ],
  },
  {
    ...base("is-does", 3, "思考・判断・表現"),
    prompt: "（ア）（イ）に入る語の組み合わせとして正しいものはどれですか。\n(ア) your brother busy on weekends?\n(イ) your brother cook on weekends?",
    answer: {
      kind: "choice",
      options: ["ア Is　イ Does", "ア Does　イ Is", "ア Is　イ Is", "ア Does　イ Does"],
      correct: 0,
      why: ["busy（いそがしい）はようすの語なので be動詞 Is。cook は一般動詞なので Does。", "逆。busy は be動詞の文、cook は一般動詞の文。", "cook は一般動詞なので Is ではなく Does。", "busy は一般動詞ではないので be動詞 Is を使う。"],
    },
    point: "ようすの語 → be動詞、動作 → do / does",
    steps: [
      { title: "動詞はどれか", body: "(ア) の文には動詞がなく、busy はようすの語 → {{be動詞}}の文。(イ) は cook（料理する）がある → {{一般動詞}}の文。", back: [S1] },
      { title: "主語に合わせる", body: "主語 your brother は3人称単数。(ア) は {{Is}}、(イ) は {{Does}} を文の頭に置きます。", back: [S4] },
    ],
  },
  {
    ...base("maketh", 3),
    prompt: "1611年の英訳聖書の He maketh me to lie down …… の maketh は、今の英語ではどの形にあたりますか。",
    answer: {
      kind: "choice",
      options: ["makes", "make", "making", "maketh のまま使う"],
      correct: 0,
      why: ["3人称単数の語尾 -eth は、今の英語の -s にあたる。", "主語 he は3人称単数なので、今の英語でも -s がつく。", "-ing の形ではない。", "-eth の形は、今のふだんの英語では使わない。"],
    },
    point: "昔の -eth ＝ 今の三単現の -s",
    steps: [{ title: "-eth から -s へ", body: "1611年の聖書では3人称単数の語尾は {{-eth}}。北部のことばの -s が広まり、maketh は {{makes}} になりました。", back: [S5] }],
  },
];

// ---- 大問2 書きかえ・並べかえ ----
const WRITE: QuestionB[] = [
  // 基本
  {
    ...base("goes", 1),
    prompt: "次の文の主語を Jun にかえて、全文を書きなさい。\nI go to the pool on Sundays.",
    answer: { kind: "term", accept: acc("Jun goes to the pool on Sundays."), near: [{ text: "Jun gos to the pool on Sundays.", why: "o で終わる go は -es をつけて goes。" }, { text: "Jun go to the pool on Sundays.", why: "Jun は3人称単数なので、動詞に -s・-es をつけます。" }] },
    point: "o で終わる語は -es（go → goes）",
    steps: [{ title: "主語と動詞", body: "Jun は3人称単数なので動詞をかえます。go は {{o}} で終わるので {{goes}}。", back: [S2, S3] }],
  },
  {
    ...base("neg-we", 1),
    prompt: "次の文を否定文に書きかえなさい。\nWe eat lunch in the classroom.",
    answer: { kind: "term", accept: acc("We do not eat lunch in the classroom.", "We don't eat lunch in the classroom."), near: [{ text: "We are not eat lunch in the classroom.", why: "一般動詞の否定文は do not（don't）を使います。" }, { text: "We not eat lunch in the classroom.", why: "not だけでなく、do not（don't）を動詞の前に置きます。" }] },
    point: "一般動詞の否定は do not（don't）＋動詞",
    steps: [{ title: "do not を置く", body: "主語 we の一般動詞の文。動詞 eat の前に {{do not}}（don't）を置きます。", back: [S4] }],
  },
  {
    ...base("flies", 1),
    prompt: "（　）内の語を正しい形にかえて、1語で書きなさい。\nMiki (fly) a kite with her father.",
    answer: { kind: "term", accept: ["flies"], near: [{ text: "flys", why: "「子音字＋y」で終わる語は y を i にかえて -es。" }, { text: "fly", why: "Miki は3人称単数なので形をかえます。" }] },
    point: "子音字＋y → ies（fly → flies）",
    steps: [{ title: "y を i に", body: "Miki は3人称単数。fly は y の前が子音字 l なので、{{y を i にかえて -es}}。flies です。", back: [S3] }],
  },
  // 標準
  {
    ...base("neg-kaito", 2),
    prompt: "次の文を否定文に書きかえなさい。\nKaito speaks Korean.",
    answer: { kind: "term", accept: acc("Kaito does not speak Korean.", "Kaito doesn't speak Korean."), near: [{ text: "Kaito doesn't speaks Korean.", why: "does を使ったら、あとの動詞は原形 speak にもどします。" }, { text: "Kaito don't speak Korean.", why: "主語 Kaito は3人称単数なので does not（doesn't）。" }] },
    point: "does not のあとは原形",
    steps: [
      { title: "does not を使う", body: "主語 Kaito は3人称単数なので {{does not}}（doesn't）。", back: [S4] },
      { title: "動詞を原形に", body: "-s は does が引き受けるので、speaks は {{speak}} にもどします。", trap: "doesn't speaks と -s を2回つけない。", back: [S4] },
    ],
  },
  {
    ...base("order-walk", 2),
    prompt: "日本語に合うように、語を並べかえなさい（1語だけ使わない語があります）。\n「あなたのおばあさんは毎朝、散歩をしますか。」",
    answer: { kind: "order", tokens: ["Does", "your", "grandmother", "walk", "every", "morning?"], distractor: "walks" },
    point: "Does＋主語＋原形 ?",
    steps: [{ title: "Does の疑問文", body: "主語 your grandmother は3人称単数なので {{Does}} を文の頭に。あとの動詞は原形 {{walk}} です。", trap: "walks を使うと -s が2回になる。", back: [S4] }],
  },
  {
    ...base("ans-father", 2),
    prompt: "次の問いに、No を使って3語で答えなさい。\nDoes your father like spicy food?",
    answer: { kind: "term", accept: acc("No, he doesn't.", "No, he does not."), near: [{ text: "No, he isn't.", why: "Does でたずねられたら does で答えます。" }, { text: "No, he don't.", why: "主語 he は3人称単数なので doesn't。" }] },
    point: "Does 〜? には does で答える",
    steps: [{ title: "答えの形", body: "your father は答えでは {{he}}。Does でたずねられたので {{doesn't}} で答えます。No, he doesn't.", back: [S4] }],
  },
  // 発展
  {
    ...base("q-hana", 3, "思考・判断・表現"),
    prompt: "次の文を疑問文に書きかえなさい。\nHana has a pet bird.",
    answer: { kind: "term", accept: acc("Does Hana have a pet bird?"), near: [{ text: "Does Hana has a pet bird?", why: "Does を使ったら、has は原形 have にもどします。" }, { text: "Is Hana have a pet bird?", why: "一般動詞の文なので Does を使います。" }, { text: "Has Hana a pet bird?", why: "今の英語では Does を文の頭に置き、has を have にもどします。" }] },
    point: "has は原形 have にもどす",
    steps: [
      { title: "Does を前に", body: "Hana は3人称単数。一般動詞の疑問文なので {{Does}} を文の頭に置きます。", back: [S4] },
      { title: "has の原形", body: "has の原形は {{have}}。Does Hana have a pet bird?", back: [S3, S4] },
    ],
  },
  {
    ...base("order-swim", 3, "思考・判断・表現"),
    prompt: "日本語に合うように、語を並べかえなさい（1語だけ使わない語があります）。\n「ユウタと彼の弟は、毎年夏に川で泳ぎます。」",
    answer: { kind: "order", tokens: ["Yuta", "and", "his", "brother", "swim", "in", "the", "river", "every", "summer."], distractor: "swims" },
    point: "A and B の主語は複数 → -s なし",
    steps: [{ title: "主語のまとまり", body: "主語は Yuta and his brother の{{2人}}。複数なので {{swim}} のまま。", trap: "すぐ前の his brother（1人）にひかれて swims にしない。", back: [S2] }],
  },
  {
    ...base("fix-study", 3, "思考・判断・表現"),
    prompt: "次の英文には誤りが1つあります。正しく直して、全文を書きなさい。\nDoes she studies math after dinner?",
    answer: { kind: "term", accept: acc("Does she study math after dinner?"), near: [{ text: "Does she studys math after dinner?", why: "Does のあとの動詞は原形 study にもどします。" }, { text: "Do she studies math after dinner?", why: "she は3人称単数なので Does のまま。直すのは studies のほう。" }] },
    point: "-s は1つの文に1回だけ",
    steps: [{ title: "-s はどこに", body: "Does の中に -s が入っているので、あとの動詞は原形 {{study}}。studies は y を i にかえた -es の形です。", back: [S4, S3] }],
  },
];

export const J_EN_1_IPPAN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中1",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "動詞の形を選ぶ", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: SELECT },
    { title: "書きかえ・並べかえ", lead: "次の問いに答えなさい。英文は最初の文字を大文字にし、最後に . や ? をつけなさい。", style: "word", pick: 3, questions: WRITE },
  ],
};
