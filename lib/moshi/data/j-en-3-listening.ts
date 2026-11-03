// 中3英語「リスニング」の単元模試。問題・英文 (放送文) はすべてオリジナル (ドリル・教科書・過去問の文は使っていない)。
// 音声ファイルは使わない。放送文 (スクリプト) を問題文に書き、読んで答える形にしている。
// 大問1 (C 固定)「放送文を読んで答える」3問 (基本15・標準17・発展18) ＋ 大問2 (B プール6問から3問)「短い対話・言いかえ」(基本15・標準17・発展18)。
// 1回 6問・満点100。時刻・年れいの言いかえ (a quarter past six＝6:15、half past seven＝7:30、a quarter to nine＝8:45、14＋3＝17) は手で検算済み。A (生成) は使っていない。
import type { QuestionB, QuestionC, UnitMoshi } from "../types";

const U = "j-en-3-listening";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "放送の前に、質問と選択肢を読んでおく");
const S2 = L(2, "聞こえた語と、選択肢の語はちがうことが多い");
const S3 = L(3, "予定の変更は but・Sorry・actually のあとに来る");
const S4 = L(4, "スピーチやアナウンスは、組み立てを知って聞く");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });
const cbase = (id: string, difficulty: 1 | 2 | 3, seconds: number) => ({ id, type: "C" as const, difficulty, points: P[difficulty], seconds, skill: "思考・判断・表現" as const });

// ---- 大問1 放送文を読んで答える (C) ----
const SCRIPTS: QuestionC[] = [
  {
    ...cbase("quarter-past", 1, 70),
    prompt: "【No.1】\nMai: When does the concert start, Mr. Brown?\nMr. Brown: At a quarter past six. Please come to the hall ten minutes before that.\n質問：What time does the concert start?",
    answer: {
      kind: "choice",
      options: ["6時15分", "6時45分", "6時5分", "5時45分"],
      correct: 0,
      why: ["a quarter past six は「6時を15分過ぎた」＝6時15分。", "6時45分は a quarter to seven。", "6時5分は集合の時刻（10分前）。質問はコンサートの開始時刻。", "5時45分は a quarter to six。"],
      mistakeOf: [null, null, 0, null],
    },
    point: "a quarter past 〜 ＝〜時15分",
    steps: [
      { title: "言いかえに気づく", body: "{{a quarter}} は4分の1時間＝15分、{{past}} は「過ぎた」。a quarter past six ＝ {{6:15}}。", back: [S2] },
      { title: "質問に合わせる", body: "10分前（6:05）は集合の時刻。質問は「コンサートが{{始まる}}時刻」です。", back: [S1] },
    ],
  },
  {
    ...cbase("emma-two", 2, 90),
    prompt: "【No.2】\nYuta: Shall we play tennis at two tomorrow, Emma?\nEmma: Sorry, I have to help my mother until three. How about four?\nYuta: OK. Let's meet at the park at four.\n質問：What will Emma do at two tomorrow?",
    answer: {
      kind: "choice",
      options: ["母の手伝いをする", "ユウタとテニスをする", "公園でユウタと会う", "買い物に行く"],
      correct: 0,
      why: ["3時まで母の手伝いがあるので、2時は手伝いをしている。", "2時のテニスは Sorry でことわっている。テニスは4時から。", "公園で会うのは4時。", "買い物は放送に出てこない。"],
      mistakeOf: [null, 1, null, null],
    },
    point: "Sorry のあとで予定が変わる",
    steps: [
      { title: "変更の合図", body: "Emma の {{Sorry}} のあと、2時は「{{3時まで母の手伝い}}」、テニスは4時に変わっています。", back: [S3] },
      { title: "質問をよく見る", body: "質問は「2時に何をするか」。最後に決まった予定（4時にテニス）とは別に、2時の予定を答えます。", back: [S1] },
    ],
  },
  {
    ...cbase("speech-library", 3, 120),
    prompt: "【No.3】\nHello, everyone. Today I'll talk about my favorite place, the city library. First, it has many kinds of books, so I can find books for my homework. Second, it is a quiet place to study. Last month, I found a book about space there, and now I want to be a scientist. Please visit the library this weekend. You may find something you love.\n質問：What does the speaker want the listeners to do?",
    answer: {
      kind: "choice",
      options: ["今週末に図書館へ行く", "宇宙についての本を読む", "科学者になる", "図書館で宿題をする"],
      correct: 0,
      why: ["最後の呼びかけ Please visit the library this weekend. が答え。", "宇宙の本は話し手が見つけた本。聞き手への呼びかけではない。", "科学者になりたいのは話し手。", "宿題の本は理由の1つ目。聞き手にしてほしいことではない。"],
    },
    point: "聞き手にしてほしいことは最後に",
    steps: [
      { title: "組み立て", body: "最初に話題（市立図書館）、中ほどに理由（First・Second）と例（宇宙の本）、{{最後に呼びかけ}}。", back: [S4] },
      { title: "呼びかけを聞く", body: "{{Please visit the library this weekend.}}（今週末に図書館へ行ってください）が答えです。", back: [S4] },
    ],
  },
];

// ---- 大問2 短い対話・言いかえ (B) ----
const SHORT: QuestionB[] = [
  // 基本
  {
    ...base("half-past", 1),
    prompt: "放送で It's half past seven. と聞こえました。この時刻を表すものはどれですか。",
    answer: {
      kind: "choice",
      options: ["7:30", "6:30", "7:15", "8:30"],
      correct: 0,
      why: ["half past seven は「7時を半分（30分）過ぎた」＝7:30。", "past は「過ぎた」。7時より前ではない。", "7:15 は a quarter past seven。", "8時ではなく7時を過ぎている。"],
    },
    point: "half past 〜 ＝〜時30分",
    steps: [{ title: "言いかえ", body: "{{half}}（半分＝30分）＋ {{past}}（過ぎた）。half past seven ＝ {{7:30}}。", back: [S2] }],
  },
  {
    ...base("next-wash", 1, "思考・判断・表現"),
    prompt: "放送文を読んで、質問の答えを選びなさい。\nBoy: I'm hungry, Mom.\nMom: Dinner is ready. Wash your hands first.\nBoy: OK.\n質問：What will the boy do next?",
    answer: {
      kind: "choice",
      options: ["手を洗う", "夕食を作る", "買い物に行く", "宿題をする"],
      correct: 0,
      why: ["Wash your hands first.（先に手を洗って）に OK. と答えている。", "夕食はもうできている（Dinner is ready）。", "買い物は放送に出てこない。", "宿題は放送に出てこない。"],
    },
    point: "「次にすること」は最後のやりとりに",
    steps: [{ title: "最後のやりとり", body: "お母さんの {{Wash your hands first.}} に男の子が OK. と答えています。次にするのは{{手を洗う}}こと。", back: [S1] }],
  },
  // 標準
  {
    ...base("age-older", 2, "思考・判断・表現"),
    prompt: "放送文を読んで、質問の答えを選びなさい。\nA: How old is your brother?\nB: He's three years older than me. I'm fourteen.\n質問：How old is B's brother?",
    answer: {
      kind: "choice",
      options: ["17歳", "14歳", "11歳", "3歳"],
      correct: 0,
      why: ["B は14歳で、兄は3歳年上。14＋3＝17。", "14歳は B の年れい。", "3歳「年下」で計算している。older は年上。", "3は年の差。"],
    },
    point: "年れいの差は計算してから答える",
    steps: [{ title: "計算させる問題", body: "B は {{14歳}}、兄は {{three years older}}（3歳年上）。14＋3＝{{17}}歳。聞こえた数字そのものは答えではありません。", back: [S2] }],
  },
  {
    ...base("quarter-to", 2),
    prompt: "放送で The train leaves at a quarter to nine. と聞こえました。電車が出る時刻はどれですか。",
    answer: {
      kind: "choice",
      options: ["8:45", "9:15", "9:45", "8:15"],
      correct: 0,
      why: ["a quarter to nine は「9時まで15分」＝8:45。", "9:15 は a quarter past nine。", "9時を過ぎていない。", "8:15 は a quarter past eight。"],
    },
    point: "a quarter to 〜 ＝〜時の15分前",
    steps: [{ title: "to と past", body: "{{to}} は「〜まで」、past は「〜を過ぎて」。a quarter to nine は9時の15分前＝{{8:45}}。", back: [S2] }],
  },
  // 発展
  {
    ...base("drove", 3, "思考・判断・表現"),
    prompt: "放送文を読んで、質問の答えを選びなさい。\nA: Did you walk to the museum yesterday?\nB: No. It was raining, so my father drove me there.\n質問：How did B go to the museum?",
    answer: {
      kind: "choice",
      options: ["車で", "歩いて", "バスで", "自転車で"],
      correct: 0,
      why: ["my father drove me there（父が車で送ってくれた）。drive の過去形 drove。", "walk は質問に出た語。B は No. と答えている。", "バスは放送に出てこない。", "自転車は放送に出てこない。"],
      mistakeOf: [null, 1, null, null],
    },
    point: "放送の語と、選択肢の言いかえ",
    steps: [
      { title: "No のあと", body: "walk には {{No.}} と答えています。同じ語にとびつかないこと。", back: [S2] },
      { title: "言いかえ", body: "{{drove}}（drive の過去形＝車を運転した）。選択肢では「{{車で}}」に言いかえられています。", back: [S2] },
    ],
  },
  {
    ...base("next-carry", 3, "思考・判断・表現"),
    prompt: "放送文を読んで、質問の答えを選びなさい。\nA: This box is too heavy for me.\nB: I'll help you. Where should I put it?\nA: On the table in the kitchen, please.\n質問：What will B do next?",
    answer: {
      kind: "choice",
      options: ["箱を台所のテーブルへ運ぶ", "箱を開ける", "新しいテーブルを買う", "台所で料理をする"],
      correct: 0,
      why: ["B が I'll help you. と言い、置き場所を聞いて On the table in the kitchen と答えをもらっている。", "箱を開ける話はない。", "テーブルを買う話はない。", "kitchen という語はあるが、料理をする話ではない。"],
      mistakeOf: [null, null, null, 1],
    },
    point: "I'll 〜 と最後の答えから「次」を決める",
    steps: [
      { title: "未来の言い方", body: "{{I'll help you.}}（手伝うよ）が、B がこれからすることの合図です。", back: [S3] },
      { title: "最後に決まった内容", body: "置き場所は {{On the table in the kitchen}}。B は箱を台所のテーブルへ運びます。", back: [S3] },
    ],
  },
];

export const J_EN_3_LISTENING_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中3",
  minutes: 12,
  review: { status: "draft" },
  sections: [
    {
      title: "放送文を読んで答える",
      lead: "本番では英語が放送されます。ここでは放送文（スクリプト）を読んで、質問の答えを選びなさい。",
      style: "reading",
      questions: SCRIPTS,
    },
    { title: "短い対話・言いかえ", lead: "放送のかわりに英文を読んで、次の問いに答えなさい。", style: "word", pick: 3, questions: SHORT },
  ],
};
