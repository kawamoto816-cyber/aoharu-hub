// 中1英語「リスニング」の単元模試。問題・英文 (放送文) はすべてオリジナル (ドリル・教科書・過去問の文は使っていない)。
// 音声ファイルは使わない。放送文 (スクリプト) を問題文に書き、読んで答える形にしている。
// 大問1 (C 固定)「放送文を読んで答える」3問 (基本15・標準17・発展18) ＋ 大問2 (B プール6問から3問)「質問への返事」(基本15・標準17・発展18)。
// 1回 6問・満点100。A (生成) は使っていないので検算式はなし。
import type { QuestionB, QuestionC, UnitMoshi } from "../types";

const U = "j-en-1-listening";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "放送の前・中・後にすること");
const S2 = L(2, "疑問詞で、答えの種類が決まる");
const S3 = L(3, "Yes / No の質問は、同じ動詞で答える");
const S4 = L(4, "似た音の数字と、決まった返し方");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });
const cbase = (id: string, difficulty: 1 | 2 | 3, skill: QuestionC["skill"] = "思考・判断・表現") => ({ id, type: "C" as const, difficulty, points: P[difficulty], seconds: T[difficulty] + 30, skill });

// ---- 大問1 放送文を読んで答える (C) ----
const SCRIPTS: QuestionC[] = [
  {
    ...cbase("bus-time", 1),
    prompt: "【No.1】\nAya: What time is it now, Tom?\nTom: It's seven thirty.\nAya: Oh, our bus comes at seven forty-five. Let's go.\n質問：What time does the bus come?",
    answer: {
      kind: "choice",
      options: ["7時45分", "7時30分", "7時15分", "8時30分"],
      correct: 0,
      why: ["質問は「バスが来る時刻」。Aya が at seven forty-five と言っている。", "7時30分は「今の時刻」。質問が聞いているのはバスの時刻。", "fifteen は放送に出てこない。", "8時は放送に出てこない。"],
      mistakeOf: [null, 2, null, null],
    },
    point: "数字が2つ出たら、質問が聞いている方を答える",
    steps: [
      { title: "質問を確かめる", body: "最後の質問は What time does {{the bus}} come?（バスは何時に来る？）。", back: [S1] },
      { title: "メモと照らす", body: "7:30 は{{今の時刻}}、7:45 が{{バスの時刻}}。答えは7時45分です。", trap: "最初に聞こえた数字にとびつかない。", back: [S1] },
    ],
  },
  {
    ...cbase("racket", 2),
    prompt: "【No.2】\nKen: Mom, where is my racket?\nMom: Is it in your room?\nKen: No. It isn't there.\nMom: Oh, it's under the table in the kitchen.\n質問：Where is Ken's racket?",
    answer: {
      kind: "choice",
      options: ["台所のテーブルの下", "ケンの部屋", "台所のいすの上", "玄関のくつ箱の中"],
      correct: 0,
      why: ["お母さんが最後に under the table in the kitchen と言っている。", "ケンが It isn't there.（そこにはない）と答えている。", "on the chair ではなく under the table。", "玄関は放送に出てこない。"],
    },
    point: "Where →「場所」を答える",
    steps: [
      { title: "最初の1語", body: "質問は {{Where}} で始まるので、答えは{{場所}}です。", back: [S2] },
      { title: "最後の場所", body: "部屋は「ない」と打ち消されています。最後に出た {{under the table in the kitchen}} が答え。", back: [S1] },
    ],
  },
  {
    ...cbase("club-boys", 3),
    prompt: "【No.3】\nYuki: How many students are in the music club, Ms. Hill?\nMs. Hill: Fifteen. Ten girls and five boys.\nYuki: And the art club?\nMs. Hill: It has twenty students.\n質問：How many boys are in the music club?",
    answer: {
      kind: "choice",
      options: ["5人", "10人", "15人", "20人"],
      correct: 0,
      why: ["音楽部は15人で、そのうち男子は five boys（5人）。", "10人は音楽部の女子の数。", "15人は音楽部全体の人数。質問は男子だけ。", "20人は美術部の人数。"],
    },
    point: "How many＋何を数えるかまで聞く",
    steps: [
      { title: "数字をメモ", body: "音楽部 15（女子10・男子5）、美術部 20。数字は{{だれの数か}}もいっしょにメモします。", back: [S1, S4] },
      { title: "質問に合わせる", body: "質問は How many {{boys}} … in the music club?（音楽部の男子は何人？）。答えは {{5人}}。", trap: "会話の最初の質問（全体の人数）と、最後の質問はちがう。", back: [S2] },
    ],
  },
];

// ---- 大問2 質問への返事 (B) ----
const REPLY: QuestionB[] = [
  // 基本
  {
    ...base("res-can", 1),
    prompt: "次の質問に対する返事として正しいものはどれですか。\nCan you play the guitar?",
    answer: {
      kind: "choice",
      options: ["Yes, I can.", "Yes, I do.", "Yes, I am.", "Yes, you can."],
      correct: 0,
      why: ["Can でたずねられたら can で答える。", "do は Do you 〜? への答え。", "am は Are you 〜? への答え。", "you は相手。自分のことを聞かれているので I で答える。"],
      mistakeOf: [null, 0, null, null],
    },
    point: "Can 〜? には can で答える",
    steps: [{ title: "同じ語で返す", body: "質問の最初の語は {{Can}}。答えも {{can}} を使い、Yes, I can. です。", back: [S3] }],
  },
  {
    ...base("res-thanks", 1),
    prompt: "次のことばに対する返事として正しいものはどれですか。\nThank you for the nice present.",
    answer: {
      kind: "choice",
      options: ["You're welcome.", "I'm sorry.", "Yes, it is.", "No, I don't."],
      correct: 0,
      why: ["お礼を言われたら You're welcome.（どういたしまして）。", "I'm sorry. はあやまるときのことば。", "Yes, it is. は Is it 〜? への答え。", "No, I don't. は Do you 〜? への答え。"],
    },
    point: "Thank you. ↔ You're welcome.",
    steps: [{ title: "決まった返し方", body: "Thank you. には {{You're welcome.}}。セットで覚えておくと、聞いた瞬間に選べます。", back: [S4] }],
  },
  // 標準
  {
    ...base("res-are", 2),
    prompt: "次の質問に対する返事として正しいものはどれですか。\nAre you a member of the soccer team?",
    answer: {
      kind: "choice",
      options: ["Yes, I am.", "Yes, I do.", "Yes, you are.", "Yes, I can."],
      correct: 0,
      why: ["Are you 〜? には I am で答える。", "do は Do you 〜? への答え。", "自分のことを聞かれているので I で答える。", "can は Can you 〜? への答え。"],
    },
    point: "Are you 〜? には I am で答える",
    steps: [{ title: "be動詞で返す", body: "質問は be動詞 {{Are}} で始まります。you と聞かれたら自分のことなので {{Yes, I am.}}", back: [S3] }],
  },
  {
    ...base("res-sorry", 2),
    prompt: "次のことばに対する返事として、もっとも自然なものはどれですか。\nI'm sorry. I'm late.",
    answer: {
      kind: "choice",
      options: ["That's OK.", "You're welcome.", "Yes, I am.", "Thank you."],
      correct: 0,
      why: ["あやまられたら That's OK.（いいですよ）。", "You're welcome. はお礼への返事。", "Yes, I am. は Are you 〜? への答え。", "あやまっている人にお礼を言うのは合わない。"],
    },
    point: "I'm sorry. ↔ That's OK.",
    steps: [{ title: "決まった返し方", body: "I'm sorry. には {{That's OK.}}。お礼への返事 You're welcome. と区別します。", back: [S4] }],
  },
  // 発展
  {
    ...base("res-how", 3, "思考・判断・表現"),
    prompt: "次の質問に対する答えとして正しいものはどれですか。\nHow do you come to school?",
    answer: {
      kind: "choice",
      options: ["By bus.", "Every day.", "At eight.", "Yes, I do."],
      correct: 0,
      why: ["How は「どうやって（手段）」。By bus.（バスで）が合う。", "Every day.（毎日）は回数・ひんどの答え。手段ではない。", "At eight. は What time 〜? への答え。", "疑問詞で始まる質問には Yes・No で答えない。"],
    },
    point: "How →「どうやって」の手段を答える",
    steps: [
      { title: "最初の1語", body: "質問は {{How}} で始まり、「どうやって学校に来るか」をたずねています。", back: [S2] },
      { title: "答えの種類", body: "手段を答えるので {{By bus.}}。疑問詞の質問に Yes・No は使いません。", back: [S2, S3] },
    ],
  },
  {
    ...base("res-teen", 3),
    prompt: "fifteen（15）と fifty（50）を聞き分けるときの、強く読む位置の説明として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["fifteen は後ろの teen、fifty は前の fif を強く読む", "どちらも前の fif を強く読む", "どちらも後ろを強く読む", "fifteen は前の fif、fifty は後ろの ty を強く読む"],
      correct: 0,
      why: ["-teen は後ろ、-ty は前を強く読む。", "fifteen は teen を強く読むので、前ではない。", "fifty は前を強く読む。", "強く読む位置が反対になっている。"],
    },
    point: "-teen は後ろ、-ty は前を強く",
    steps: [{ title: "強く読む位置", body: "{{-teen}}（13〜19）は後ろの teen を、{{-ty}}（20・30…）は前を強く読みます。", back: [S4] }],
  },
];

export const J_EN_1_LISTENING_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中1",
  minutes: 12,
  review: { status: "draft" },
  sections: [
    {
      title: "放送文を読んで答える",
      lead: "本番では英語が放送されます。ここでは放送文（スクリプト）を読んで、質問の答えを選びなさい。",
      style: "reading",
      questions: SCRIPTS,
    },
    { title: "質問への返事", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: REPLY },
  ],
};
