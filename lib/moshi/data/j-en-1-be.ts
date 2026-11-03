// 中1英語「be動詞」の単元模試 (B: 問題プールからシードで選ぶ)。問題・英文はすべてオリジナル (ドリル・教科書の文は使っていない)。
// 大問1「語を選ぶ」・大問2「書きかえ・並べかえ」の2つ。それぞれプール9問 (基本3・標準3・発展3) から、基本・標準・発展を1問ずつ出す。
// 1回 6問・満点100 (基本15・標準17・発展18 × 2)。A (生成) は使っていないので検算式はなし。英文の答えは acc() で表記ゆれ (’・カンマ・?) を受ける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-1-be";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "be動詞は「＝」と「いる・ある」");
const S2 = L(2, "主語で am・are・is が決まる");
const S3 = L(3, "迷ったら、主語を分けて考える");
const S4 = L(4, "肯定文 → 否定文 → 疑問文");

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
    ...base("am", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nI (　) twelve years old.",
    answer: {
      kind: "choice",
      options: ["am", "is", "are", "be"],
      correct: 0,
      why: ["主語が I なので am。", "is は he・she・it など1人・1つの主語に使う。", "are は you と2人・2つ以上の主語に使う。", "be はそのままの形では、この文に入らない。"],
    },
    point: "I には am",
    steps: [{ title: "主語を見る", body: "主語は {{I}}（自分）。I のときの be動詞は {{am}} です。", back: [S2] }],
  },
  {
    ...base("is-place", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nOur school (　) near the station.",
    answer: {
      kind: "choice",
      options: ["is", "am", "are", "be"],
      correct: 0,
      why: ["our school は1つなので is。「駅の近くにある」の意味。", "am は主語が I のときだけ。", "are は you や2つ以上の主語のとき。", "be のままでは文にならない。"],
    },
    point: "1つの主語には is。場所が続けば「ある」",
    steps: [{ title: "主語は1つ", body: "主語 our school は {{1つ}} なので is。あとに near the station（場所）が来るので「〜に{{ある}}」の意味になります。", back: [S2, S1] }],
  },
  {
    ...base("you-are", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nYou (　) a good singer, Aki.",
    answer: {
      kind: "choice",
      options: ["are", "is", "am", "be"],
      correct: 0,
      why: ["you は相手が1人（Aki）でも are。", "相手が1人でも You is とは言わない。", "am は I のときだけ。", "be のままでは文にならない。"],
    },
    point: "you は1人でも are",
    steps: [{ title: "you はいつも are", body: "話しかけている相手は Aki 1人ですが、主語が {{you}} のときは {{are}} を使います。", trap: "「1人だから is」としない。", back: [S3] }],
  },
  // 標準
  {
    ...base("and-are", 2),
    prompt: "（　）に入る語として正しいものはどれですか。\nHaruto and his sister (　) in the music room now.",
    answer: {
      kind: "choice",
      options: ["are", "is", "am", "be"],
      correct: 0,
      why: ["Haruto と his sister の2人が主語なので are。", "直前の his sister だけを見ると is にしてしまう。主語は2人。", "am は I のときだけ。", "be のままでは文にならない。"],
    },
    point: "A and B の主語は2人 → are",
    steps: [{ title: "and でつながった主語", body: "主語は {{Haruto and his sister}} の2人。2人・2つ以上なので {{are}} です。", trap: "be動詞のすぐ前の his sister だけを見て is にしない。", back: [S3] }],
  },
  {
    ...base("imi-iru", 2),
    prompt: "次の文の be動詞のうち、「（〜に）いる・ある」の意味で使われているものはどれですか。",
    answer: {
      kind: "choice",
      options: ["My uncle is in Canada now.", "My uncle is a cook.", "This apple is sweet.", "We are classmates."],
      correct: 0,
      why: ["in Canada（場所）が続くので「カナダにいる」。", "a cook（料理人）が続く。「おじ＝料理人」のイコール。", "sweet（あまい）はようすを表す。「このりんご＝あまい」。", "classmates が続く。「私たち＝同級生」。"],
    },
    point: "be動詞＋場所 →「いる・ある」",
    steps: [{ title: "あとに何が来るか", body: "be動詞のあとに名詞やようすの語が来れば「＝」、{{場所を表すことば}}（in Canada など）が来れば「{{いる・ある}}」です。", back: [S1] }],
  },
  {
    ...base("ans-it", 2),
    prompt: "対話が成り立つように、（　）に入るものを選びなさい。\nIs Ms. Brown's dog big? — Yes, (　).",
    answer: {
      kind: "choice",
      options: ["it is", "she is", "it does", "they are"],
      correct: 0,
      why: ["dog（1ぴきの犬）は it でうけ、Is 〜? には is で答える。", "she は Ms. Brown をさす。たずねているのは犬のこと。", "be動詞でたずねられたら be動詞で答える。does は一般動詞の文で使う。", "犬は1ぴきなので they ではない。"],
    },
    point: "Is 〜? には is で。犬1ぴきは it",
    steps: [
      { title: "主語は何か", body: "主語は Ms. Brown's {{dog}}（1ぴき）。答えでは代名詞 {{it}} にかえます。", back: [S4] },
      { title: "be動詞で答える", body: "Is でたずねられたので、答えも {{is}}。Yes, it is. です。", trap: "does で答えない。", back: [S4] },
    ],
  },
  // 発展
  {
    ...base("seikai-bun", 3, "思考・判断・表現"),
    prompt: "次の英文のうち、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Rina is not in the classroom.", "You is very tall, Kenta.", "Kenta and I am on the same team.", "Is he a pilot? — Yes, he does."],
      correct: 0,
      why: ["正しい。not は be動詞 is のすぐ後ろ。", "you は1人でも are。You are very tall, Kenta.", "主語は Kenta and I の2人なので are。", "Is でたずねられたら Yes, he is. と be動詞で答える。"],
      mistakeOf: [null, 0, 1, 2],
    },
    point: "you・A and B・答えの形を1つずつ確かめる",
    steps: [
      { title: "主語と be動詞", body: "You は1人でも {{are}}、Kenta and I は2人なので {{are}}。", back: [S3] },
      { title: "否定と答え", body: "not は be動詞の{{すぐ後ろ}}。be動詞の疑問文には be動詞で答えます。", back: [S4] },
    ],
  },
  {
    ...base("dialog-isnt", 3, "思考・判断・表現"),
    prompt: "対話が成り立つように、（　）に入る語を選びなさい。\nA: Is that girl your classmate?\nB: No, she (　). She is my cousin.",
    answer: {
      kind: "choice",
      options: ["isn't", "aren't", "doesn't", "is"],
      correct: 0,
      why: ["No で答え、主語は she（1人）なので isn't。あとで「いとこだ」と言っている。", "aren't は you や複数の主語のとき。", "be動詞の疑問文には be動詞で答える。", "Yes のときの答え。No のあとなので否定にする。"],
    },
    point: "No なら isn't。答えは be動詞で",
    steps: [
      { title: "対話の流れ", body: "B は「いとこだ」と続けているので、同級生では{{ない}}。No の答えです。", back: [S4] },
      { title: "形を決める", body: "主語は she（1人）なので is not → {{isn't}}。No, she isn't. です。", back: [S4] },
    ],
  },
  {
    ...base("its", 3),
    prompt: "対話が成り立つように、（　）に入るものを選びなさい。\nWhere is your bike? — (　) next to the gate.",
    answer: {
      kind: "choice",
      options: ["It's", "It", "Its", "They're"],
      correct: 0,
      why: ["It is の短縮形。「門のとなりにある」。", "It だけでは be動詞がなく、文にならない。", "Its は「それの」。be動詞がふくまれない。", "自転車は1台なので they ではない。"],
    },
    point: "It's＝It is。Its は「それの」",
    steps: [{ title: "be動詞が要る", body: "答えの文にも be動詞が必要。your bike（1台）を it でうけ、It is を短くした {{It's}} を使います。", trap: "' のない Its は「それの」という意味で、be動詞がない。", back: [S2, S1] }],
  },
];

// ---- 大問2 書きかえ・並べかえ ----
const WRITE: QuestionB[] = [
  // 基本
  {
    ...base("neg-library", 1),
    prompt: "次の文を否定文に書きかえなさい。\nThe library is open today.",
    answer: { kind: "term", accept: acc("The library is not open today.", "The library isn't open today."), near: [{ text: "The library not is open today.", why: "not は be動詞 is の後ろに置きます。" }, { text: "The library doesn't open today.", why: "be動詞の文なので、is のあとに not を置きます。" }] },
    point: "否定文は be動詞のすぐ後ろに not",
    steps: [{ title: "is の後ろに not", body: "be動詞 is のすぐ後ろに {{not}} を置きます。The library {{is not}}（isn't）open today.", back: [S4] }],
  },
  {
    ...base("q-building", 1),
    prompt: "次の文を疑問文に書きかえなさい。\nThat tall building is a hospital.",
    answer: { kind: "term", accept: acc("Is that tall building a hospital?"), near: [{ text: "That tall building is a hospital?", why: "疑問文は is を主語の前に出します。" }, { text: "Does that tall building a hospital?", why: "be動詞の文なので、is を主語の前に出します。" }] },
    point: "疑問文は be動詞を主語の前へ",
    steps: [{ title: "is を前に出す", body: "主語は that tall building。{{is}} をその前に出し、最後を「?」にします。{{Is}} that tall building a hospital?", back: [S4] }],
  },
  {
    ...base("these-are", 1),
    prompt: "（　）に入る be動詞を1語で書きなさい。\nThese cookies (　) for you.",
    answer: { kind: "term", accept: ["are"], near: [{ text: "is", why: "cookies は2つ以上（複数）なので are。" }] },
    point: "2つ以上の主語には are",
    steps: [{ title: "主語の数", body: "these cookies は{{2つ以上}}（複数）。be動詞は {{are}} です。", back: [S2] }],
  },
  // 標準
  {
    ...base("order-home", 2),
    prompt: "日本語に合うように、語を並べかえなさい（1語だけ使わない語があります）。\n「あなたのお父さんは今、家にいますか。」",
    answer: { kind: "order", tokens: ["Is", "your", "father", "at", "home", "now?"], distractor: "Does" },
    point: "Is＋主語＋場所 ?「〜にいますか」",
    steps: [{ title: "be動詞の疑問文", body: "「いる」は be動詞。主語 your father（1人）に合わせた {{Is}} を文の頭に置き、主語・場所（{{at home}}）と続けます。", trap: "Does は一般動詞の疑問文で使う。", back: [S1, S4] }],
  },
  {
    ...base("ans-we", 2),
    prompt: "次の問いに、Yes を使って3語で答えなさい。\nAre you and Mei in the art club?",
    answer: { kind: "term", accept: acc("Yes, we are."), near: [{ text: "Yes, I am.", why: "you and Mei（あなたとメイ）とたずねられているので、自分とメイを合わせて we で答えます。" }, { text: "Yes, they are.", why: "自分もふくまれるので they ではなく we。" }] },
    point: "you and 〜 でたずねられたら we で答える",
    steps: [{ title: "答えの主語", body: "「あなたとメイ」とたずねられたら、答える人は「私とメイ」＝{{we}}。2人なので {{are}}。Yes, we are.", back: [S3, S4] }],
  },
  {
    ...base("order-cats", 2),
    prompt: "日本語に合うように、語を並べかえなさい（1語だけ使わない語があります）。\n「その箱の中のねこたちは、とても小さい。」",
    answer: { kind: "order", tokens: ["The", "cats", "in", "the", "box", "are", "very", "small."], distractor: "is" },
    point: "主語の中心 cats は複数 → are",
    steps: [{ title: "主語のまとまり", body: "主語は The cats in the box（箱の中のねこたち）。中心の {{cats}} は複数なので {{are}}。", trap: "すぐ前の box（1つ）にひかれて is にしない。", back: [S2, S3] }],
  },
  // 発展
  {
    ...base("subj-neg", 3, "思考・判断・表現"),
    prompt: "次の文の主語を My parents にかえて、否定文に書きかえなさい。\nI am busy today.",
    answer: { kind: "term", accept: acc("My parents are not busy today.", "My parents aren't busy today."), near: [{ text: "My parents is not busy today.", why: "parents（両親）は2人なので are。" }, { text: "My parents am not busy today.", why: "am は主語が I のときだけ。両親は2人なので are。" }] },
    point: "主語をかえたら be動詞もかえる",
    steps: [
      { title: "be動詞をかえる", body: "主語が I → {{My parents}}（2人）になるので、am を {{are}} にかえます。", back: [S2] },
      { title: "not を置く", body: "are のすぐ後ろに not。My parents {{are not}}（aren't）busy today.", back: [S4] },
    ],
  },
  {
    ...base("q-pair", 3, "思考・判断・表現"),
    prompt: "対話が成り立つように、（ア）（イ）に入る語の組み合わせを選びなさい。\nA: (ア) Mr. and Mrs. Hill from Canada?\nB: Yes, (イ) are. They live in Toronto.",
    answer: {
      kind: "choice",
      options: ["ア Are　イ they", "ア Is　イ they", "ア Are　イ we", "ア Is　イ he"],
      correct: 0,
      why: ["ヒル夫妻は2人なので Are。答えでは they でうける。", "主語は2人なので Is ではない。", "B はヒル夫妻のことを答えているので we ではない。", "主語は2人。Is・he は1人の男性のとき。"],
    },
    point: "2人の主語 → Are でたずね、they で答える",
    steps: [
      { title: "主語の数", body: "Mr. and Mrs. Hill は{{2人}}なので、be動詞は {{Are}}。", back: [S3] },
      { title: "答えの代名詞", body: "答えでは2人を {{they}} にかえます。Yes, they are.", back: [S4] },
    ],
  },
  {
    ...base("q-subj", 3, "思考・判断・表現"),
    prompt: "次の文の主語を your brother にかえて、全文を書きなさい。\nAre you a high school student?",
    answer: { kind: "term", accept: acc("Is your brother a high school student?"), near: [{ text: "Are your brother a high school student?", why: "your brother は1人なので Is にかえます。" }, { text: "Does your brother a high school student?", why: "be動詞の疑問文のまま、Are を Is にかえます。" }] },
    point: "主語が1人になれば Are → Is",
    steps: [{ title: "be動詞を主語に合わせる", body: "主語 you → {{your brother}}（1人）。be動詞は {{is}} になり、疑問文なので文の頭に {{Is}} を置きます。", back: [S2, S4] }],
  },
];

export const J_EN_1_BE_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中1",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    { title: "be動詞を選ぶ", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: SELECT },
    { title: "書きかえ・並べかえ", lead: "次の問いに答えなさい。英文は最初の文字を大文字にし、最後に . や ? をつけなさい。", style: "word", pick: 3, questions: WRITE },
  ],
};
