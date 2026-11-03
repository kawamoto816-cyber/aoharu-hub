// 高校英語（技能）「リスニング」の単元模試。問題・英文 (放送文) はすべてオリジナル (この模試のために書いた。教科書・過去問・市販教材の文は使っていない)。
// 音声ファイルは使わない。放送文 (スクリプト) を問題文に書き、読んで答える形にしている。共通テスト「英語リスニング」の対話・条件選択・講義の形をイメージした。
// 大問1 (C 固定)「放送文を読んで答える」3問 (基本15・標準17・発展18) ＋ 大問2 (B プール6問から3問)「短い発話・音のつながり」(基本15・標準17・発展18)。
// 1回 6問・満点100。数の検算 (No.3: 200人の半分＝100人・4分の1＝50人・残り50人／バス 10:15 の次は 45分後＝11:00) は手で確認済み。A (生成) は使っていない。
import type { QuestionB, QuestionC, UnitMoshi } from "../types";

const U = "h-eng-skill-listening";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "音声が流れる前に、選択肢を「先読み」する");
const S2 = L(2, "英語は「強・弱」のリズムで進む");
const S3 = L(3, "単語がつながると、音が変わる");
const S4 = L(4, "答えは、放送の「言いかえ」で選ぶ");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });
const cbase = (id: string, difficulty: 1 | 2 | 3, seconds: number) => ({ id, type: "C" as const, difficulty, points: P[difficulty], seconds, skill: "思考・判断・表現" as const });

// ---- 大問1 放送文を読んで答える (C) ----
const SCRIPTS: QuestionC[] = [
  {
    ...cbase("study-group", 1, 80),
    prompt:
      "【No.1】対話を聞き、質問の答えを選びなさい。\nKenta: Are we still meeting in the library after school to study for the chemistry test?\nLisa: Actually, the library is closed today for cleaning. Why don't we use the classroom on the third floor instead?\nKenta: Good idea. See you there at four.\n質問：Where will Kenta and Lisa study today?",
    answer: {
      kind: "choice",
      options: ["In a classroom upstairs", "In the library", "In the chemistry lab", "At Kenta's house"],
      correct: 0,
      why: [
        "Actually のあとで the classroom on the third floor に変更し、Kenta も Good idea と同意。third floor を upstairs と言いかえている。",
        "library は最初の予定。Actually, the library is closed today で使えなくなった。",
        "chemistry はテストの科目。実験室で勉強するとは言っていない。",
        "Kenta の家の話は出てこない。",
      ],
    },
    point: "Actually のあとが変更後の予定",
    steps: [
      { title: "先読み", body: "選択肢がすべて場所なので「{{どこで}}」を聞きとると決めておきます。", back: [S1] },
      { title: "変更を聞く", body: "最初の予定は library。{{Actually}} のあとに閉館と教室への変更が来ます。third floor ＝ {{upstairs}} の言いかえ。", trap: "最初に聞こえた library にとびつかない。", back: [S4] },
    ],
  },
  {
    ...cbase("club-choice", 2, 120),
    prompt:
      "【No.2】あなたは参加するボランティア活動を1つ選ぼうとしています。条件は次の3つです。\nA. 週末に活動する　B. 特別な技能はいらない　C. 屋外で活動する\n4人の説明を聞き、条件に最も合う活動を選びなさい。\n1. Beach Clean-up: We pick up trash on the beach every Saturday morning. You don't need any experience. Just bring gloves.\n2. Reading Buddies: We read picture books to children at the city library on Sunday afternoons. Anyone can join.\n3. Park Guides: We guide visitors around the national park on weekends, but you need to pass a short test about local plants first.\n4. Garden Team: We grow vegetables in the school garden. No skills are needed, and we meet on Wednesdays after school.",
    answer: {
      kind: "choice",
      options: ["Beach Clean-up", "Reading Buddies", "Park Guides", "Garden Team"],
      correct: 0,
      why: [
        "土曜（週末 A）・経験不要（技能いらない B）・海岸（屋外 C）で、3つとも満たす。",
        "日曜・だれでも参加できるが、図書館の中（屋内）なので C を満たさない。",
        "週末・屋外だが、植物のテストに合格する必要があり B を満たさない。",
        "技能不要・屋外だが、水曜の放課後なので A を満たさない。",
      ],
    },
    point: "条件ごとに○×をつけて、全部○を選ぶ",
    steps: [
      { title: "表を作って聞く", body: "条件 A・B・C を横に、4つの活動を縦に並べ、聞きながら{{○×}}をつけます。", back: [S1] },
      { title: "言いかえで判定", body: "every Saturday → 週末、{{You don't need any experience}} → 技能いらない、on the beach → 屋外。", back: [S4] },
      { title: "1つでも×なら消す", body: "Reading Buddies は屋内、Park Guides は{{テストが必要}}、Garden Team は水曜。すべて○は1つだけです。", back: [S4] },
    ],
  },
  {
    ...cbase("survey-lecture", 3, 150),
    prompt:
      "【No.3】講義の一部を聞き、内容に合うものを選びなさい。\nToday I'd like to share the results of a survey we did at our school. We asked 200 students how they usually get to school. Exactly half of them said they come by bicycle. Walking was the second most common answer, at one quarter of the students. The rest take the bus or the train. What surprised us was that most bus and train users said they would prefer to cycle, but they live too far away. So, if we want more students to cycle, the distance may matter more than the weather.\n質問：Which statement matches the lecture?",
    answer: {
      kind: "choice",
      options: [
        "Fifty students come to school by bus or by train.",
        "A quarter of the students come to school by bicycle.",
        "Walking was the most popular way to get to school.",
        "The speaker thinks the weather is the main reason students do not cycle.",
      ],
      correct: 0,
      why: [
        "200人の半分（100人）が自転車、4分の1（50人）が徒歩なので、残りのバス・電車は 200−100−50＝50人。",
        "a quarter（4分の1）は徒歩。自転車は half（半分）。",
        "徒歩は the second most common（2番目に多い）。いちばんは自転車。",
        "最後に the distance may matter more than the weather と、天気より距離が大事かもしれないと言っている。",
      ],
    },
    point: "half・quarter・the rest は数に直して計算",
    steps: [
      { title: "割合を数にする", body: "200人の {{half}}＝100人（自転車）、{{one quarter}}＝50人（徒歩）。", back: [S2] },
      { title: "the rest を出す", body: "The rest（残り）は 200−100−50＝{{50人}}。選択肢では Fifty students と数で言いかえています。", back: [S4] },
      { title: "話し手の結論", body: "So のあとが結論。{{distance}} が weather より大事かもしれない、が主張です。", back: [S4] },
    ],
  },
];

// ---- 大問2 短い発話・音のつながり (B) ----
const SHORT: QuestionB[] = [
  // 基本
  {
    ...base("check-it-out", 1),
    prompt: "「チェッキッタウ」のように1つながりに聞こえた語句として、最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Check it out.", "Check the town.", "Take it out.", "Check at two."],
      correct: 0,
      why: [
        "check の k と it の i、it の t と out の ou がつながる（連結）。t は母音にはさまれ、ラ行に近く聞こえることもある。",
        "the town なら「ザ・タウン」とはっきり聞こえる。",
        "take は「テイク」で、最初の音がちがう。",
        "at two なら「アットゥー」で、終わりは「ウー」。",
      ],
    },
    point: "子音で終わる語＋母音で始まる語はつながる",
    steps: [
      { title: "連結", body: "前の語の終わりの{{子音}}と次の語の{{母音}}がつながります。check＋it → チェッキッ、it＋out → イタウ。", back: [S3] },
    ],
  },
  {
    ...base("stress-word", 1),
    prompt: "次の文を自然に読むとき、ふつう最も弱く短く読まれる語はどれですか。\nI bought a new bag at the station.",
    answer: {
      kind: "choice",
      options: ["at", "bought", "new", "station"],
      correct: 0,
      why: [
        "at は前置詞で機能語。弱く短く読まれ、聞こえにくい。",
        "bought は動詞で内容語。強く読まれる。",
        "new は形容詞で内容語。強く読まれる。",
        "station は名詞で内容語。強く読まれる。",
      ],
    },
    point: "内容語は強く、機能語は弱く",
    steps: [
      { title: "内容語と機能語", body: "名詞・動詞・形容詞・副詞は{{内容語}}で強く、冠詞・前置詞・代名詞などは{{機能語}}で弱く読みます。", back: [S2] },
    ],
  },
  // 標準
  {
    ...base("rather-stay", 2),
    prompt: "A: There's a fireworks festival tonight. Do you want to go?\nB: I'd rather stay home. I have to get up early tomorrow.\n質問：What does B mean?",
    answer: {
      kind: "choice",
      options: [
        "B does not want to go to the festival tonight.",
        "B wants to see the fireworks from home.",
        "B will go to the festival early tomorrow.",
        "B has already been to the festival.",
      ],
      correct: 0,
      why: [
        "I'd rather stay home（むしろ家にいたい）＝行きたくない。理由は明日早起きするから。",
        "家から花火を見るとは言っていない。",
        "early tomorrow は早起きの話。お祭りに行くのではない。",
        "もう行ったとは言っていない。",
      ],
    },
    point: "I'd rather 〜 は遠回しな断り",
    steps: [
      { title: "言いかえ", body: "{{I'd rather stay home.}} は「むしろ家にいたい」＝誘いを{{断っている}}。No を使わずに断る言い方です。", back: [S4] },
    ],
  },
  {
    ...base("next-bus", 2),
    prompt: "（駅のアナウンス）Attention, please. The 10:15 bus to the airport has been cancelled. The next bus to the airport will leave 45 minutes later from the same stop.\n質問：What time will the next bus to the airport leave?",
    answer: {
      kind: "choice",
      options: ["At 11:00", "At 10:15", "At 10:45", "At 10:30"],
      correct: 0,
      why: [
        "10:15 の45分後は 11:00。",
        "10:15 は運休になったバス。",
        "45 は「何分後か」の数で、時刻ではない。",
        "10:30 は 10:15 の15分後。放送は 45 minutes later。",
      ],
    },
    point: "聞こえた数をそのまま選ばず、計算する",
    steps: [
      { title: "計算", body: "10:15 ＋ 45分 ＝ 10:60 ＝ {{11:00}}。放送の数（10:15・45）がそのまま答えになるとは限りません。", back: [S1, S4] },
    ],
  },
  // 発展
  {
    ...base("new-here", 3, "思考・判断・表現"),
    prompt: "A: Excuse me. Do you know where the nearest post office is?\nB: Sorry, I'm new here myself.\n質問：What does B mean?",
    answer: {
      kind: "choice",
      options: [
        "B cannot tell A where the post office is.",
        "B works at the post office.",
        "B is going to the post office, too.",
        "B has just moved near the post office.",
      ],
      correct: 0,
      why: [
        "I'm new here myself（自分もここは初めて）＝場所を知らないので教えられない。",
        "郵便局で働いているとは言っていない。",
        "自分も郵便局へ行くとは言っていない。",
        "new here は「この土地に来たばかり」。郵便局の近くに引っ越したとは言っていない。",
      ],
    },
    point: "直接答えない返事は、何を伝えているかで選ぶ",
    steps: [
      { title: "意図を読む", body: "B は Yes/No で答えていません。{{I'm new here}}（ここに来たばかり）から「{{知らない}}」と伝えています。", back: [S4] },
    ],
  },
  {
    ...base("not-until", 3, "思考・判断・表現"),
    prompt: "A: Is the report due this Friday?\nB: No, not until next Monday. But Ms. Green said she'd be happy to read drafts this Friday.\n質問：Which is true?",
    answer: {
      kind: "choice",
      options: [
        "Students may show Ms. Green a draft before the deadline.",
        "The report must be handed in this Friday.",
        "Ms. Green will not read the report until next Monday.",
        "The deadline was moved from Monday to Friday.",
      ],
      correct: 0,
      why: [
        "締め切りは来週の月曜で、その前の今週金曜に下書き（drafts）を読んでくれる。",
        "No, not until next Monday（来週の月曜までは提出しなくてよい）＝締め切りは月曜。",
        "金曜に下書きを読んでくれると言っている。",
        "締め切りが金曜に移ったのではない。もともと月曜。",
      ],
    },
    point: "not until 〜＝〜になって初めて",
    steps: [
      { title: "締め切り", body: "No, {{not until next Monday}} は「来週の月曜まではない」＝締め切りは{{月曜}}。", back: [S4] },
      { title: "But のあと", body: "{{But}} のあとに追加の情報：金曜に{{下書き}}を見てもらえる。", back: [S4] },
    ],
  },
];

export const H_ENG_SKILL_LISTENING_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "技能",
  minutes: 12,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "放送文を読んで答える",
      lead: "本番では英語が放送されます。ここでは放送文（スクリプト）を読んで、質問の答えを選びなさい。",
      style: "reading",
      questions: SCRIPTS,
    },
    { title: "短い発話・音のつながり", lead: "放送のかわりに英文を読んで、次の問いに答えなさい。", style: "word", pick: 3, questions: SHORT },
  ],
};
