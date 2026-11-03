// 高校英語（文法）「話法」の単元模試 (B: 問題プールからシードで選ぶ)。問題・例文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// 節1 語法 (プール12問: 基本4・標準4・発展4) から5問 (基本2・標準2・発展1)、
// 節2 並べかえ (プール4問: 基本2・標準2) から2問 (基本1・標準1)。1回7問・100点 (13×3＋15×3＋16＝100)。
// A (生成) は使っていないので数値の検算はなし。choice・term・order の正答は check-moshi が採点器で満点になるか確かめる。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-gram-waho";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "直接話法と間接話法");
const S2 = L(2, "書きかえは決まった順で");
const S3 = L(3, "変わる語の一覧");
const S4 = L(4, "疑問文・命令文を伝える");

const P = { 1: 13, 2: 15, 3: 16 } as const;
const T = { 1: 45, 2: 60, 3: 90 } as const;
const TO = { 1: 60, 2: 75, 3: 90 } as const;
type Sk = QuestionB["skill"];
const base = (id: string, difficulty: 1 | 2 | 3, skill: Sk = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });
const ord = (id: string, difficulty: 1 | 2 | 3) => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: TO[difficulty], skill: "知識・技能" as Sk });
const ASK = "間接話法に書きかえるとき、空所に入る最も適切なものはどれですか。";
const NARABE = "日本語に合うように語句を並べかえなさい。使わない語が1つあります。";

const FORMS: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("was-hungry", 1),
    prompt: `Taro said, "I am hungry."\n→ Taro said that he (　　) hungry.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["was", "is", "am", "were"],
      correct: 0,
      why: [
        "伝える動詞 said が過去なので、引用の中の現在形 am を過去形にずらす。主語 he に合わせて was。",
        "時制の一致をしていない。",
        "I を he に変えたので am は合わない。",
        "were は主語 he に合わない。",
      ],
    },
    point: "said のあとは時制を1つ過去へ",
    steps: [{ title: "時制の一致", body: "said（過去）に合わせて am → {{was}}。I は伝える人から見て {{he}} に変わります。", back: [S1, S2] }],
  },
  {
    ...base("liked-me", 1),
    prompt: `Aya said to me, "I like your bag."\n→ Aya told me that she liked (　　) bag.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["my", "your", "her", "his"],
      correct: 0,
      why: [
        "Aya が話しかけた相手（you）は伝えている「私」。your は伝える人から見て my になる。",
        "伝える人の立場に変えていない。",
        "her だと Aya 自身のかばんになってしまう。",
        "his だと別の男の人のかばんになる。",
      ],
    },
    point: "代名詞は伝える人の立場で決まる",
    steps: [{ title: "だれのことか", body: "your bag ＝話しかけられた「{{私}}」のかばん。伝える私から見て {{my}} bag。", back: [S2, S3] }],
  },
  {
    ...base("would-go", 1),
    prompt: `Ken said, "I will call you later."\n→ Ken said that he (　　) call me later.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["would", "will", "shall", "can"],
      correct: 0,
      why: [
        "said に合わせて will を過去形 would にずらす。",
        "時制の一致をしていない。",
        "shall に変える決まりはない。",
        "can は意味がちがう（できる）。",
      ],
    },
    point: "will → would",
    steps: [{ title: "助動詞も過去へ", body: "will・can は {{would・could}} にずらします。", back: [S3] }],
  },
  {
    ...base("said-to-told", 1),
    prompt: `My mother said to me, "Dinner is ready."\n→ My mother (　　) me that dinner was ready.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["told", "said", "talked", "spoke"],
      correct: 0,
      why: [
        "said to 人 は間接話法で told 人 にする。told me that 〜。",
        "said のあとに直接 me は置けない（said to me なら可）。",
        "talk は「話をする」で、talked me that とは言わない。",
        "speak も spoke me that とは言わない。",
      ],
    },
    point: "said to 人 → told 人",
    steps: [{ title: "伝える動詞", body: "said to me は {{told me}} に変えて、that 〜 を続けます。", back: [S2] }],
  },
  // ---- 標準 ----
  {
    ...base("day-before", 2),
    prompt: `Last week Mai said, "I met Yuto yesterday."\n→ Mai said that she had met Yuto (　　).\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["the day before", "yesterday", "the next day", "tomorrow"],
      correct: 0,
      why: [
        "別の日に伝えるので、yesterday は「その前日」の the day before（the previous day）に変える。",
        "伝えている今から見た「昨日」になってしまう。",
        "the next day は tomorrow を言いかえたもの。",
        "tomorrow は時が逆。",
      ],
    },
    point: "yesterday → the day before",
    steps: [{ title: "時の語", body: "先週の発言を今伝えるので、yesterday → {{the day before}}。met も {{had met}} にずらしています。", back: [S3] }],
  },
  {
    ...base("asked-where", 2),
    prompt: `The man said to me, "Where is the post office?"\n→ The man asked me where the post office (　　).\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["was", "is it", "was it", "did be"],
      correct: 0,
      why: [
        "疑問詞のあとは主語＋動詞の語順。時制を過去にずらして where the post office was。",
        "疑問文の語順のままで、時制もずれていない。",
        "疑問文の語順のまま。",
        "be動詞に did はつけない。",
      ],
    },
    point: "ask ＋疑問詞＋主語＋動詞",
    steps: [{ title: "語順", body: "疑問詞 where のあとは{{主語＋動詞の語順}}。is は過去にずらして {{was}}。", back: [S4] }],
  },
  {
    ...base("told-to-clean", 2),
    prompt: `The coach said to us, "Run five laps."\n→ The coach told us (　　) five laps.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["to run", "run", "running", "that run"],
      correct: 0,
      why: [
        "命令文は tell 人 to 〜 で伝える。",
        "told us のあとに原形だけは置けない。",
        "-ing ではない。",
        "that のあとには主語が必要。",
      ],
    },
    point: "命令文 → tell 人 to 〜",
    steps: [{ title: "命令文を伝える", body: "「〜しなさい」は {{tell 人 to 〜}}。The coach told us {{to run}} five laps.", back: [S4] }],
  },
  {
    ...base("asked-if", 2),
    prompt: `Emi said to me, "Do you have a pencil?"\n→ Emi asked me (　　) I had a pencil.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["if", "that", "what", "do"],
      correct: 0,
      why: [
        "疑問詞のない疑問文は if（whether）「〜かどうか」でつなぐ。",
        "that は平叙文を伝えるとき。",
        "what は「何を」をたずねる疑問詞。元の文に what はない。",
        "do は疑問文の語順の名残り。間接話法では使わない。",
      ],
    },
    point: "疑問詞なし → ask if / whether",
    steps: [{ title: "つなぐ語", body: "Yes/No でこたえる疑問文は {{if}}（whether）でつなぎ、主語＋動詞の語順にします。", back: [S4] }],
  },
  // ---- 発展 ----
  {
    ...base("not-to-be", 3),
    prompt: `My father said to me, "Don't be late for dinner."\n→ My father told me (　　) late for dinner.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["not to be", "don't be", "to be not", "not be"],
      correct: 0,
      why: [
        "否定の命令文は tell 人 not to 〜。not は to の前に置く。",
        "命令文の形のまま。",
        "not の位置がちがう。",
        "to がない。",
      ],
    },
    point: "「〜するな」→ tell 人 not to 〜",
    steps: [{ title: "否定の命令文", body: "Don't 〜 は {{not to 〜}}。not は {{to の前}}に置きます。", back: [S4] }],
  },
  {
    ...base("there-next-day", 3, "思考・判断・表現"),
    prompt: `Two weeks ago, Rina said to me, "I will visit this museum tomorrow."\n→ Rina told me that she would visit (　　).\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["that museum the next day", "this museum tomorrow", "that museum tomorrow", "this museum the day before"],
      correct: 0,
      why: [
        "2週間前の別の場所での発言。this → that、tomorrow → the next day と、伝える人の立場に変える。",
        "直接話法のまま。今から見た「明日」になってしまう。",
        "tomorrow を変えていない。",
        "the day before は yesterday を言いかえたもの。",
      ],
    },
    point: "this → that、tomorrow → the next day",
    steps: [
      { title: "場所の語", body: "伝えている今は別の場所なので {{this → that}}。", back: [S3] },
      { title: "時の語", body: "2週間前の「明日」なので {{tomorrow → the next day}}。", back: [S3] },
    ],
  },
  {
    ...base("had-finished", 3),
    prompt: `Sota said, "I have finished the report."\n→ Sota said that he (　　) finished the report.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["had", "has", "have", "was"],
      correct: 0,
      why: [
        "said に合わせて、現在完了 have finished は過去完了 had finished にずらす。",
        "時制の一致をしていない。",
        "主語 he にも時制にも合わない。",
        "was finished だと受け身になり、意味が変わる。",
      ],
    },
    point: "現在完了 → 過去完了",
    steps: [{ title: "時制の一致", body: "現在完了・過去形は、said のあとで{{過去完了}}（had ＋過去分詞）にずらします。", back: [S3] }],
  },
  {
    ...base("asked-what-doing", 3),
    prompt: `My teacher said to me, "What are you reading?"\n→ My teacher asked me what (　　).\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["I was reading", "was I reading", "you were reading", "are you reading"],
      correct: 0,
      why: [
        "you は伝える「私」なので I。語順は主語＋動詞、時制は過去にずらして I was reading。",
        "疑問文の語順のまま。",
        "you を伝える人の立場（I）に変えていない。",
        "直接話法のまま。",
      ],
    },
    point: "疑問詞＋主語＋動詞、代名詞と時制も変える",
    steps: [
      { title: "語順", body: "what のあとは{{主語＋動詞の語順}}。", back: [S4] },
      { title: "代名詞と時制", body: "you → {{I}}、are → {{was}}。", back: [S3] },
    ],
  },
];

const ORDER: QuestionB[] = [
  // ---- 基本 ----
  {
    ...ord("narabe-said-tired", 1),
    prompt: `${NARABE}\n「ユキは疲れていると言った。」`,
    answer: { kind: "order", tokens: ["Yuki", "said", "that", "she", "was", "tired."], distractor: "is" },
    point: "said that ＋主語＋過去形",
    steps: [{ title: "時制の一致", body: "said（過去）に合わせて {{was}} tired。is は使いません。", back: [S2] }],
  },
  {
    ...ord("narabe-asked-open", 1),
    prompt: `${NARABE}\n「彼女は私に窓を閉めるように頼んだ。」`,
    answer: { kind: "order", tokens: ["She", "asked", "me", "to", "close", "the window."], distractor: "that" },
    point: "依頼 → ask 人 to 〜",
    steps: [{ title: "依頼を伝える", body: "Please 〜 の依頼は {{ask 人 to 〜}} で伝えます。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...ord("narabe-asked-what-liked", 2),
    prompt: `${NARABE}\n「彼は私に、どんな音楽が好きかとたずねた。」`,
    answer: { kind: "order", tokens: ["He", "asked", "me", "what", "music", "I", "liked."], distractor: "did" },
    point: "ask 人 ＋疑問詞＋主語＋動詞",
    steps: [{ title: "語順", body: "what music のあとは {{I liked}}（主語＋動詞）。疑問文の did は使いません。", back: [S4] }],
  },
  {
    ...ord("narabe-told-not-run", 2),
    prompt: `${NARABE}\n「先生は私たちに、ろうかを走らないように言った。」`,
    answer: { kind: "order", tokens: ["The teacher", "told", "us", "not", "to", "run", "in the hallway."], distractor: "don't" },
    point: "tell 人 not to 〜",
    steps: [{ title: "否定の命令文", body: "「〜するな」は {{not to 〜}}。told us not to run …。", back: [S4] }],
  },
];

export const H_ENG_GRAM_WAHO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "文法",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    { title: "直接話法と間接話法", lead: "次の問いに答えなさい。", style: "word", pick: 5, questions: FORMS },
    { title: "並べかえ", lead: "日本語に合うように、語（語句）を並べかえなさい。文の最初の語は大文字で始めてあります。", style: "word", pick: 2, questions: ORDER },
  ],
};
