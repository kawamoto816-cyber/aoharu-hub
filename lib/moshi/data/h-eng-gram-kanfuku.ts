// 高校英語（文法）「関係副詞」の単元模試 (B: 問題プールからシードで選ぶ)。問題・例文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// 節1 語法 (プール12問: 基本4・標準4・発展4) から5問 (基本2・標準2・発展1)、
// 節2 並べかえ (プール4問: 基本2・標準2) から2問 (基本1・標準1)。1回7問・100点 (13×3＋15×3＋16＝100)。
// A (生成) は使っていないので数値の検算はなし。choice・term・order の正答は check-moshi が採点器で満点になるか確かめる。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-gram-kanfuku";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "4つの関係副詞と先行詞");
const S2 = L(2, "関係副詞＝前置詞＋ which");
const S3 = L(3, "which か where か：後ろの文が欠けているかで決める");
const S4 = L(4, "コンマのある用法と、先行詞の省略");

const P = { 1: 13, 2: 15, 3: 16 } as const;
const T = { 1: 45, 2: 60, 3: 90 } as const;
const TO = { 1: 60, 2: 75, 3: 90 } as const;
type Sk = QuestionB["skill"];
const base = (id: string, difficulty: 1 | 2 | 3, skill: Sk = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });
const ord = (id: string, difficulty: 1 | 2 | 3) => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: TO[difficulty], skill: "知識・技能" as Sk });
const ASK = "空所に入る最も適切なものはどれですか。";
const NARABE = "日本語に合うように語句を並べかえなさい。使わない語が1つあります。";

const FORMS: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("where-court", 1),
    prompt: `This is the court (　　) we practice basketball after school.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["where", "when", "why", "what"],
      correct: 0,
      why: [
        "先行詞 the court は場所。後ろ we practice basketball after school は欠けのない文なので where。",
        "when は先行詞が時のとき。",
        "why は先行詞が理由（the reason）のとき。",
        "what は先行詞をふくむので、名詞のあとには置けない。",
      ],
    },
    point: "場所の先行詞＋欠けのない文 → where",
    steps: [{ title: "先行詞の種類", body: "先行詞は{{場所}}（the court）。後ろの文は欠けがないので {{where}}。", back: [S1] }],
  },
  {
    ...base("when-day", 1),
    prompt: `I still remember the morning (　　) I first rode a bike without help.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["when", "where", "why", "how"],
      correct: 0,
      why: [
        "先行詞 the morning は時。後ろは欠けのない文なので when。",
        "where は先行詞が場所のとき。",
        "why は先行詞が理由のとき。",
        "how は先行詞を置かずに「〜する方法」を表す。",
      ],
    },
    point: "時の先行詞 → when",
    steps: [{ title: "先行詞の種類", body: "先行詞は{{時}}（the morning）。後ろ I first rode a bike … は欠けがないので {{when}}。", back: [S1] }],
  },
  {
    ...base("why-reason", 1),
    prompt: `Nobody knows the reason (　　) the shop closed so suddenly.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["why", "when", "where", "what"],
      correct: 0,
      why: [
        "先行詞 the reason（理由）のときは why。",
        "when は時の先行詞のとき。",
        "where は場所の先行詞のとき。",
        "what は先行詞をふくむので、the reason のあとに置けない。",
      ],
    },
    point: "the reason why 〜 ＝〜する理由",
    steps: [{ title: "理由の関係副詞", body: "why の先行詞はほぼ {{the reason}} だけ。the reason {{why}} the shop closed で「店が閉まった理由」。", back: [S1] }],
  },
  {
    ...base("how-method", 1),
    prompt: `日本語に合うように、${ASK}\n「これが、私が数学の点数を上げたやり方です。」\nThis is (　　) I raised my math score.`,
    answer: {
      kind: "choice",
      options: ["how", "why", "what", "where"],
      correct: 0,
      why: [
        "「〜するやり方」は how（または the way）。",
        "why は「〜する理由」。",
        "what は「〜するもの」。raised の目的語 my math score がすでにあるので入らない。",
        "where は「〜する場所」。",
      ],
    },
    point: "how ＝ the way（並べない）",
    steps: [{ title: "方法の関係副詞", body: "「やり方」は {{how}}。the way I raised … とも言えますが、{{the way how}} とは言いません。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...base("where-born", 2),
    prompt: `Kobe is the city (　　) my mother grew up.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["where", "which", "what", "whose"],
      correct: 0,
      why: [
        "grow up は目的語をとらない。my mother grew up は欠けのない文なので関係副詞 where。",
        "which を使うなら後ろに穴が必要（in which なら可）。grew up の後ろに穴はない。",
        "what は先行詞をふくむので the city のあとに置けない。",
        "whose の後ろには名詞が来る。",
      ],
    },
    point: "後ろが完全な文なら where",
    steps: [{ title: "欠けを見る", body: "my mother grew up は{{欠けのない文}}。だから関係代名詞 which ではなく関係副詞 {{where}}。", back: [S3] }],
  },
  {
    ...base("in-which-where", 2),
    prompt: "2つの文がほぼ同じ意味になるように、空所に入る英語1語を書きなさい。\nThis is the room in which the meeting will be held.\nThis is the room (　　) the meeting will be held.",
    answer: { kind: "term", accept: ["where"], near: [{ text: "which", why: "in がなくなったので which だけでは足りません。in which をまとめて1語にした where です。" }] },
    point: "in which ＝ where",
    steps: [{ title: "前置詞＋which", body: "関係副詞は{{前置詞＋ which}}の代わり。場所の {{in which}} は {{where}} 1語で言いかえられます。", back: [S2] }],
  },
  {
    ...base("way-how-wrong", 2, "思考・判断・表現"),
    prompt: "次の英文のうち、文法的に{{誤っている}}ものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Tell me the way how you cooked this soup.", "Tell me how you cooked this soup.", "Tell me the way you cooked this soup.", "Tell me the way in which you cooked this soup."],
      correct: 0,
      why: [
        "the way と how は並べて使えない。どちらか一方にする。",
        "how だけ。正しい。",
        "the way だけ。正しい。",
        "the way in which。正しい。",
      ],
    },
    point: "the way how は ×",
    steps: [{ title: "how の決まり", body: "how は{{the way と並べて使えない}}。the way か how のどちらか一方にします。", back: [S1] }],
  },
  {
    ...base("comma-where", 2),
    prompt: `Last summer we went to Okinawa, (　　) we swam with sea turtles.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["where", "which", "that", "when"],
      correct: 0,
      why: [
        "コンマのある非制限用法。先行詞 Okinawa は場所で、後ろは欠けのない文なので where（＝ and there）。",
        "we swam with sea turtles に欠けがないので which は入らない。",
        "that は非制限用法では使えない。",
        "Okinawa は時ではなく場所。",
      ],
    },
    point: ", where ＝ and there（そしてそこで）",
    steps: [{ title: "前から順に訳す", body: "コンマのある {{where}} は「そしてそこで」と前から訳します。後ろの文に欠けがないことも確認。", back: [S4, S3] }],
  },
  // ---- 発展 ----
  {
    ...base("which-attracts", 3),
    prompt: `Kanazawa is a city (　　) attracts many visitors in every season.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["which", "where", "when", "what"],
      correct: 0,
      why: [
        "attracts の主語が欠けている。主語の穴をうめるのは関係代名詞 which。",
        "where の後ろは欠けのない文。ここは主語がないので入らない。",
        "when は時の先行詞で、しかも後ろは欠けのない文のとき。",
        "what は先行詞をふくむので a city のあとに置けない。",
      ],
    },
    point: "先行詞が場所でも、穴があれば which",
    steps: [{ title: "穴がある", body: "＿ attracts many visitors で{{主語が欠けている}}。場所の名詞でも、後ろに穴があれば {{which}}。", back: [S3] }],
  },
  {
    ...base("which-spent", 3),
    prompt: `I'll never forget the week (　　) I spent at my uncle's farm.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["which", "when", "where", "why"],
      correct: 0,
      why: [
        "spend は「（時間）を過ごす」で目的語が必要。I spent ＿ の穴をうめるのは which。",
        "when の後ろは欠けのない文。spent の目的語が欠けているので入らない。",
        "where は場所の先行詞のとき。",
        "why は理由の先行詞のとき。",
      ],
    },
    point: "時の名詞でも、spent の目的語なら which",
    steps: [{ title: "動詞を見る", body: "{{spend}} は目的語をとる動詞。I spent ＿ に穴があるので、時の名詞でも {{which}}（that）を使います。", back: [S3] }],
  },
  {
    ...base("comma-when", 3),
    prompt: `I got to the stadium at seven, (　　) the game had already started.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["when", "where", "which", "that"],
      correct: 0,
      why: [
        "先行詞は時（at seven）。コンマのある非制限用法の when ＝ and then（そしてそのとき）。",
        "where は場所を受ける。ここで説明しているのは時刻。",
        "the game had already started は欠けのない文なので which は入らない。",
        "that は非制限用法では使えない。",
      ],
    },
    point: ", when ＝ and then（そしてそのとき）",
    steps: [{ title: "時を受ける", body: "コンマのある {{when}} は「そしてそのとき」。7時に着いたら、そのときにはもう試合が始まっていた。", back: [S4] }],
  },
  {
    ...base("thats-why", 3, "思考・判断・表現"),
    prompt: `I stayed up late watching a movie. That's (　　) I'm so sleepy now.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["why", "because", "how", "where"],
      correct: 0,
      why: [
        "先行詞 the reason が省略された That's why 〜（そういうわけで〜）。前の文が理由、後ろが結果。",
        "That's because 〜 は後ろに「理由」が来る。眠いことは理由ではなく結果。",
        "That's how 〜 は「そのようにして〜」で、方法を表す。",
        "That's where 〜 は「そこが〜する場所」。",
      ],
    },
    point: "That's why ＋結果／That's because ＋理由",
    steps: [
      { title: "先行詞の省略", body: "That's the reason why … の {{the reason}} が省略された形が That's {{why}} …。", back: [S4] },
      { title: "理由と結果", body: "夜ふかし（理由）→ 眠い（結果）。why の後ろには{{結果}}が来ます。", back: [S4] },
    ],
  },
];

const ORDER: QuestionB[] = [
  // ---- 基本 ----
  {
    ...ord("narabe-hospital-born", 1),
    prompt: `${NARABE}\n「ここは私の妹が生まれた病院です。」`,
    answer: { kind: "order", tokens: ["This", "is", "the hospital", "where", "my sister", "was", "born."], distractor: "which" },
    point: "was born の後ろは欠けがない → where",
    steps: [{ title: "後ろの文", body: "my sister was born は{{欠けのない文}}なので、the hospital のあとは {{where}}。", back: [S1, S3] }],
  },
  {
    ...ord("narabe-year-came", 1),
    prompt: `${NARABE}\n「あなたは彼女が日本に来た年を覚えていますか。」`,
    answer: { kind: "order", tokens: ["Do", "you", "remember", "the year", "when", "she", "came", "to Japan?"], distractor: "where" },
    point: "時の先行詞＋ when",
    steps: [{ title: "時を説明", body: "the year のあとに {{when she came to Japan}}（彼女が日本に来た）を続けます。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...ord("narabe-reason-angry", 2),
    prompt: `${NARABE}\n「私には彼が怒っている理由がわかりません。」`,
    answer: { kind: "order", tokens: ["I", "don't", "know", "the reason", "why", "he", "is", "angry."], distractor: "how" },
    point: "the reason why ＋主語＋動詞",
    steps: [{ title: "理由を説明", body: "the reason のあとに {{why he is angry}}。why の後ろはふつうの文の語順です。", back: [S1] }],
  },
  {
    ...ord("narabe-how-study", 2),
    prompt: `${NARABE}\n「このようにして、私は英単語を覚えています。」（これが、私が英単語を覚える方法です）`,
    answer: { kind: "order", tokens: ["This", "is", "how", "I", "learn", "English", "words."], distractor: "what" },
    point: "This is how 〜 ＝このようにして〜",
    steps: [{ title: "how のまとまり", body: "This is のあとに {{how I learn English words}}（私が英単語を覚える方法）。learn の目的語があるので what は入りません。", back: [S1] }],
  },
];

export const H_ENG_GRAM_KANFUKU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "文法",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "関係副詞と関係代名詞の使い分け", lead: "次の問いに答えなさい。", style: "word", pick: 5, questions: FORMS },
    { title: "並べかえ", lead: "日本語に合うように、語（語句）を並べかえなさい。文の最初の語は大文字で始めてあります。", style: "word", pick: 2, questions: ORDER },
  ],
};
