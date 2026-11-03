// 中1英語「英単語」の単元模試 (B: 問題プールからシードで選ぶ)。問題・英文はすべてオリジナル (ドリル・教科書の文は使っていない)。
// 大問1「意味とつづり」・大問2「組み合わせと、にている語」の2つ。それぞれプール6問 (基本2・標準2・発展2) から、基本・標準・発展を1問ずつ出す。
// 1回 6問・満点100 (基本15・標準17・発展18 × 2)。A (生成) は使っていないので検算式はなし。
// 曜日・月のつづりは大文字で始めないと不正解 (caseSensitive)。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-1-tango";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "1語を「音・つづり・意味」の3点で覚える");
const S3 = L(3, "単語は「なかま」と「例文」で覚える");
const S4 = L(4, "つづりや音がにている語に注意");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 60, 3: 80 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

// ---- 大問1 意味とつづり ----
const TSUZURI: QuestionB[] = [
  // 基本
  {
    ...base("wednesday", 1),
    prompt: "「水曜日」を英語1語で書きなさい。",
    answer: {
      kind: "term",
      accept: ["Wednesday"],
      caseSensitive: true,
      near: [{ text: "wednesday", why: "曜日の名前は、いつも大文字で始めます。" }, { text: "Wensday", why: "読まない d が入ります。Wed・nes・day と区切って覚えましょう。" }, { text: "Wendsday", why: "d の位置がちがいます。Wed・nes・day。" }],
    },
    point: "曜日は大文字で始める。読まない d に注意",
    steps: [{ title: "つづりを区切る", body: "{{Wed・nes・day}} と区切って書きます。曜日は文の途中でも{{大文字}}で始めます。", back: [S1, S3] }],
  },
  {
    ...base("math", 1),
    prompt: "math の意味として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["数学", "理科", "音楽", "体育"],
      correct: 0,
      why: ["math は数学。", "理科は science。", "音楽は music。", "体育は P.E.。"],
    },
    point: "教科はなかまでまとめて覚える",
    steps: [{ title: "教科のなかま", body: "{{math}}（数学）・science（理科）・music（音楽）など、教科はなかまでまとめて覚えると思い出しやすくなります。", back: [S3] }],
  },
  // 標準
  {
    ...base("february", 2),
    prompt: "「2月」を英語1語で書きなさい。",
    answer: {
      kind: "term",
      accept: ["February"],
      caseSensitive: true,
      near: [{ text: "february", why: "月の名前は、いつも大文字で始めます。" }, { text: "Febuary", why: "r が1つ抜けています。Feb・ru・ar・y。" }],
    },
    point: "月は大文字で始める。Feb-ru-ary の r",
    steps: [{ title: "つづりを区切る", body: "{{Feb・ru・ar・y}}。最初の r を落としやすいので注意。月の名前も{{大文字}}で始めます。", back: [S1, S3] }],
  },
  {
    ...base("nakama", 2, "思考・判断・表現"),
    prompt: "次の語のうち、ほかの3つとなかまがちがうものはどれですか。",
    answer: {
      kind: "choice",
      options: ["December", "Tuesday", "Friday", "Sunday"],
      correct: 0,
      why: ["December は12月。ほかの3つは曜日。", "Tuesday は火曜日（曜日）。", "Friday は金曜日（曜日）。", "Sunday は日曜日（曜日）。"],
    },
    point: "曜日と月をなかまで区別する",
    steps: [{ title: "テーマで分ける", body: "Tuesday・Friday・Sunday は{{曜日}}、December は{{月}}（12月）です。", back: [S3] }],
  },
  // 発展
  {
    ...base("science", 3),
    prompt: "「理科」を英語1語で書きなさい。",
    answer: { kind: "term", accept: ["science"], near: [{ text: "sience", why: "s のあとに c が入ります。s・c・i・e・n・c・e。" }, { text: "scienc", why: "最後に e がつきます。" }] },
    point: "sc の c を落とさない",
    steps: [{ title: "読まない文字に注意", body: "science は {{sc}} で始まります。最初の c は音にあらわれにくいので、つづりを書いて覚えます。", back: [S1] }],
  },
  {
    ...base("twelve", 3),
    prompt: "「12」を英語のつづりで書きなさい。",
    answer: { kind: "term", accept: ["twelve"], near: [{ text: "twelv", why: "最後に e がつきます。" }, { text: "twelfe", why: "f ではなく v。twelve です。" }, { text: "tweleve", why: "e は最後の1つだけ。twelve。" }] },
    point: "twelve の v と最後の e",
    steps: [{ title: "つづりを確かめる", body: "{{twelve}}。音だけで覚えると v や最後の e を落としやすいので、音・つづり・意味をセットで覚えます。", back: [S1] }],
  },
];

// ---- 大問2 組み合わせと、にている語 ----
const KUMI: QuestionB[] = [
  // 基本
  {
    ...base("get-up", 1),
    prompt: "「起きる」の意味になるように、（　）に入る語を選びなさい。\nget (　)",
    answer: {
      kind: "choice",
      options: ["up", "at", "to", "for"],
      correct: 0,
      why: ["get up で「起きる」。", "get at では「起きる」にならない。", "get to は「〜に着く」。", "get for では「起きる」にならない。"],
    },
    point: "get up ＝起きる",
    steps: [{ title: "組で覚える", body: "{{get up}}（起きる）のように、よくいっしょに使う語は組で覚えると、そのまま英作文に使えます。", back: [S3] }],
  },
  {
    ...base("play-tennis", 1),
    prompt: "「テニスをする」の意味になるように、（　）に入る語を選びなさい。\n(　) tennis",
    answer: {
      kind: "choice",
      options: ["play", "do", "make", "have"],
      correct: 0,
      why: ["スポーツを「する」は play。play tennis。", "do は「する」だが、tennis には play を使う。", "make は「作る」。", "have は「持っている」「食べる」など。"],
    },
    point: "テニスを「する」は play",
    steps: [{ title: "組で覚える", body: "「テニスをする」は {{play tennis}}。日本語の「する」に引かれて do にしないよう、組で覚えます。", back: [S3] }],
  },
  // 標準
  {
    ...base("two-too", 2),
    prompt: "（　）に入る語として正しいものはどれですか。\nI have (　) sisters.",
    answer: {
      kind: "choice",
      options: ["two", "too", "to", "tooth"],
      correct: 0,
      why: ["two は数の「2」。「姉妹が2人いる」。", "too は「〜もまた」「あまりに〜」。音は同じでも意味がちがう。", "to は「〜へ」。音が同じでも意味がちがう。", "tooth は「歯」。"],
    },
    point: "two・too・to は同じ音で意味がちがう",
    steps: [{ title: "音が同じ語", body: "{{two}}（2）・too（〜も）・to（〜へ）は同じ音。並べて{{ちがいを意識して}}覚えます。", back: [S4] }],
  },
  {
    ...base("write", 2),
    prompt: "（　）に入る語として正しいものはどれですか。\nPlease (　) your name here.",
    answer: {
      kind: "choice",
      options: ["write", "right", "light", "ride"],
      correct: 0,
      why: ["write は「書く」。「ここに名前を書いてください」。", "right は「右」「正しい」。write と同じ音だが意味がちがう。", "light は「光」「明かり」。", "ride は「乗る」。"],
    },
    point: "write（書く）と right（右）は同じ音",
    steps: [{ title: "音が同じ語", body: "{{write}}（書く）と right（右・正しい）は同じ音。文の意味から、名前を「書く」の write を選びます。", back: [S4] }],
  },
  // 発展
  {
    ...base("our-hour", 3, "思考・判断・表現"),
    prompt: "（　）に入る語として正しいものはどれですか。\nThis is (　) classroom.",
    answer: {
      kind: "choice",
      options: ["our", "hour", "are", "out"],
      correct: 0,
      why: ["our は「私たちの」。「ここは私たちの教室です」。", "hour は「1時間」。our と同じ音だが意味がちがう。", "are は be動詞。is のあとに続けられない。", "out は「外へ」。"],
    },
    point: "our（私たちの）と hour（1時間）",
    steps: [{ title: "文の意味から選ぶ", body: "classroom の前なので「だれの」教室かを表す {{our}}。同じ音の {{hour}}（1時間）は h を読みません。", back: [S4] }],
  },
  {
    ...base("see-sea", 3, "思考・判断・表現"),
    prompt: "次の英文のうち、つづりがすべて正しいものはどれですか。（「私の部屋から海が見えます」の意味）",
    answer: {
      kind: "choice",
      options: ["I can see the sea from my room.", "I can sea the see from my room.", "I can see the see from my room.", "I can sea the sea from my room."],
      correct: 0,
      why: ["see は「見える・見る」、sea は「海」。", "see と sea が両方とも入れかわっている。", "「海」は sea。", "「見える」は see。"],
    },
    point: "see（見る）と sea（海）",
    steps: [{ title: "2つを並べて覚える", body: "{{see}}（見る）と {{sea}}（海）は同じ音。動詞の位置には see、the のあとの「海」には sea。", back: [S4] }],
  },
];

export const J_EN_1_TANGO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中1",
  minutes: 8,
  review: { status: "draft" },
  sections: [
    { title: "意味とつづり", lead: "次の問いに答えなさい。曜日・月は大文字で始めなさい。", style: "word", pick: 3, questions: TSUZURI },
    { title: "組み合わせと、にている語", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: KUMI },
  ],
};
