// 高校英語（文法）「仮定法」の単元模試 (B: 問題プールからシードで選ぶ)。問題・例文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// 節1 語法 (プール12問: 基本4・標準4・発展4) から5問 (基本2・標準2・発展1)、
// 節2 並べかえ (プール4問: 基本2・標準2) から2問 (基本1・標準1)。1回7問・100点 (13×3＋15×3＋16＝100)。
// A (生成) は使っていないので数値の検算はなし。choice・term・order の正答は check-moshi が採点器で満点になるか確かめる。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-gram-kateiho";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "ふつうの if と仮定法のちがい");
const S2 = L(2, "仮定法過去：今の事実の反対");
const S3 = L(3, "仮定法過去完了：過去の事実の反対。時がまたがる文も");
const S4 = L(4, "I wish・as if・if の省略");
const S5 = L(5, "should・were to の仮定と、仮定法のやわらかさ");

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
    ...base("were-cat", 1),
    prompt: `If I (　　) a cat, I could sleep all day.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["were", "am", "will be", "have been"],
      correct: 0,
      why: [
        "今の事実の反対（ネコではない）なので仮定法過去。be動詞は主語に関係なく were がふつう。",
        "am は現在形。ありえないことの仮定には使わない。",
        "if の中に will は使わない。",
        "現在完了は仮定法の形ではない。",
      ],
    },
    point: "仮定法過去の be動詞は were",
    steps: [{ title: "時制を1つ過去へ", body: "今の事実の反対は{{過去形}}で言います。be動詞は {{were}}。後半は could ＋原形。", back: [S2] }],
  },
  {
    ...base("would-more-time", 1),
    prompt: `If I had a bigger room, I (　　) get a piano.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["would", "will", "can", "do"],
      correct: 0,
      why: [
        "if の中が過去形 had の仮定法過去。後半は would ＋原形。",
        "will はふつうの if（実際に起こりうること）の形。",
        "can は現在形。仮定法では could にする。",
        "do では仮定の結果を表せない。",
      ],
    },
    point: "If ＋過去形, 主語＋ would ＋原形",
    steps: [{ title: "後半の形", body: "if の中が{{過去形}}なら、後半は {{would / could / might}} ＋原形。", back: [S2] }],
  },
  {
    ...base("wish-could", 1),
    prompt: `I wish I (　　) speak Korean.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["could", "can", "will", "am"],
      correct: 0,
      why: [
        "I wish のあとは今の事実の反対を過去形で。「話せたらいいのに」は could。",
        "can は現在形。I wish のあとでは1つ過去にずらす。",
        "will は未来の形。",
        "am では speak とつながらない。",
      ],
    },
    point: "I wish ＋過去形＝今〜ならいいのに",
    steps: [{ title: "I wish", body: "{{I wish}} のあとは今の事実の反対なので、can を1つ過去にして {{could}}。", back: [S4] }],
  },
  {
    ...base("rains-real", 1),
    prompt: `If it (　　) this weekend, we will cancel the barbecue.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["rains", "rained", "had rained", "will rain"],
      correct: 0,
      why: [
        "後半が will cancel のふつうの if（実際に起こりうること）。条件の節の中は未来でも現在形。",
        "rained にすると仮定法過去になり、後半は would にしなければならない。",
        "had rained は仮定法過去完了の形。",
        "条件を表す if の中では will を使わない。",
      ],
    },
    point: "ふつうの if は現在形＋ will",
    steps: [{ title: "ありうる話", body: "雨は実際に降るかもしれない。だから仮定法ではなく{{ふつうの if}}。if の中は {{rains}}、後半は will。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...base("would-have-passed", 2),
    prompt: `If I had left home ten minutes earlier, I (　　) the bus.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["would have caught", "would catch", "will catch", "had caught"],
      correct: 0,
      why: [
        "if の中が had ＋過去分詞の仮定法過去完了（過去の事実の反対）。後半は would have ＋過去分詞。",
        "would ＋原形は今の事実の反対のとき。",
        "will はふつうの if の形。",
        "後半に had ＋過去分詞は使わない。",
      ],
    },
    point: "If had ＋過去分詞, would have ＋過去分詞",
    steps: [{ title: "過去の事実の反対", body: "実際は早く出なかった（過去）。{{仮定法過去完了}}なので後半は {{would have caught}}。", back: [S3] }],
  },
  {
    ...base("as-if", 2),
    prompt: `She talks about Paris (　　) she had lived there for years.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["as if", "because", "unless", "so that"],
      correct: 0,
      why: [
        "「まるで何年も住んでいたかのように」。as if ＋過去完了で、実際とはちがうことを表す。",
        "because だと「住んでいたので」となり、had lived の仮定法の形と合わない。",
        "unless は「〜しない限り」で意味が合わない。",
        "so that は目的「〜するように」。",
      ],
    },
    point: "as if ＋仮定法＝まるで〜かのように",
    steps: [{ title: "as if", body: "{{as if}} のあとに仮定法を置くと「まるで〜かのように」。had lived で「住んでいたかのように」。", back: [S4] }],
  },
  {
    ...base("fact-meaning", 2, "思考・判断・表現"),
    prompt: "If I knew her email address, I would write to her.\nこの文が表している事実として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["今、彼女のメールアドレスを知らないので、メールを書かない", "以前、彼女のメールアドレスを知らなかったので、メールを書かなかった", "彼女のメールアドレスを知っているので、メールを書くつもりだ", "彼女のメールアドレスを知ったら、メールを書くつもりだ"],
      correct: 0,
      why: [
        "仮定法過去は今の事実の反対。実際は「今知らない」。",
        "過去の事実の反対なら If I had known …, I would have written … となる。",
        "仮定法なので、実際は知らない。",
        "実際に起こりうる話ならふつうの if（If I know …, I will …）を使う。",
      ],
    },
    point: "仮定法過去 → 今の事実の反対",
    steps: [{ title: "事実にもどす", body: "過去形 knew でも話は{{今}}。仮定法過去の裏にある事実は「今{{知らない}}から書かない」。", back: [S2] }],
  },
  {
    ...base("had-inversion", 2),
    prompt: `(　　) I known about the sale, I would have bought two.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["Had", "If", "Have", "Did"],
      correct: 0,
      why: [
        "If I had known の if を省き、had を主語の前に出した倒置。",
        "If なら If I had known と had が必要。",
        "Have は現在完了。後半 would have bought と合わない。",
        "Did では known とつながらない。",
      ],
    },
    point: "If I had known ＝ Had I known",
    steps: [{ title: "if の省略", body: "if を省くと、had を主語の前に出して{{疑問文の語順}}にします。{{Had I known}} 〜。", back: [S4] }],
  },
  // ---- 発展 ----
  {
    ...base("mixed", 3, "思考・判断・表現"),
    prompt: `If I had gone to bed earlier last night, I (　　) so sleepy now.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["wouldn't be", "wouldn't have been", "won't be", "hadn't been"],
      correct: 0,
      why: [
        "if の中は過去の事実の反対（昨夜）、後半は今（now）の事実の反対。後半は仮定法過去の would ＋原形。",
        "would have been は過去のこと。now と合わない。",
        "won't はふつうの if の形。",
        "後半に had ＋過去分詞は使わない。",
      ],
    },
    point: "過去の仮定＋今の結果 → would ＋原形",
    steps: [
      { title: "時を分ける", body: "前半は{{昨夜}}（過去完了）、後半は{{今}}（now）。", back: [S3] },
      { title: "後半の形", body: "今の事実の反対なので {{wouldn't be}}。", back: [S3] },
    ],
  },
  {
    ...base("were-to", 3),
    prompt: `If the moon (　　) to disappear, the tides would become much smaller.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["were", "is", "will", "has"],
      correct: 0,
      why: [
        "were to ＋原形で「万一〜したら」と、起こりそうにない未来を仮定する。",
        "is to は予定などを表し、would と合わない。",
        "if の中に will は使わない（will to という形もない）。",
        "has to は「〜しなければならない」で意味が合わない。",
      ],
    },
    point: "If S were to 〜 ＝万一〜したら",
    steps: [{ title: "were to", body: "ありえない・起こりそうもない未来は {{were to}} ＋原形で仮定し、後半は would ＋原形。", back: [S5] }],
  },
  {
    ...base("should-help", 3),
    prompt: `(　　) you have any questions, please feel free to ask me.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["Should", "Would", "Had", "Were"],
      correct: 0,
      why: [
        "If you should have … の if を省いた倒置。「もし〜なら」とひかえめに言う。",
        "Would を文頭に出しても仮定の意味にはならない。",
        "Had you have は形がおかしい（Had you had … なら過去の仮定）。",
        "Were you have は形がおかしい。",
      ],
    },
    point: "Should you 〜 ＝ If you should 〜",
    steps: [{ title: "should の倒置", body: "If you {{should}} have any questions の if を省いて should を前に出した形。ひかえめな「もし〜なら」です。", back: [S5, S4] }],
  },
  {
    ...base("wish-had-studied", 3),
    prompt: `I didn't practice enough, and I lost the match. I wish I (　　) harder.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["had practiced", "practiced", "would practice", "have practiced"],
      correct: 0,
      why: [
        "過去（試合の前）の事実の反対なので、I wish ＋過去完了。",
        "過去形だと今の事実の反対（今練習していればいいのに）になる。",
        "would practice は「（これから）練習してくれればいいのに」に近い意味になる。",
        "現在完了は仮定法の形ではない。",
      ],
    },
    point: "I wish ＋過去完了＝あのとき〜だったらよかった",
    steps: [{ title: "過去の後悔", body: "練習しなかったのは{{過去}}。過去の事実の反対は1つ前にずらして {{had practiced}}。", back: [S4, S3] }],
  },
];

const ORDER: QuestionB[] = [
  // ---- 基本 ----
  {
    ...ord("narabe-if-were-you", 1),
    prompt: `${NARABE}\n「もし私があなたなら、そのことを先生に相談するでしょう。」`,
    answer: { kind: "order", tokens: ["If", "I", "were", "you,", "I", "would", "talk", "to", "the teacher", "about it."], distractor: "am" },
    point: "If I were you, I would 〜",
    steps: [{ title: "仮定法過去", body: "{{If I were you,}}（私があなたなら）のあとに {{I would talk}} 〜 を続けます。", back: [S2] }],
  },
  {
    ...ord("narabe-wish-could-swim", 1),
    prompt: `${NARABE}\n「もっと速く泳げたらいいのになあ。」`,
    answer: { kind: "order", tokens: ["I", "wish", "I", "could", "swim", "faster."], distractor: "can" },
    point: "I wish I could 〜",
    steps: [{ title: "I wish", body: "今の事実の反対なので can を過去にした {{could}} を使い、I wish {{I could swim faster}}。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...ord("narabe-as-if-knew", 2),
    prompt: `${NARABE}\n「彼はまるでその町のことを何でも知っているかのように話す。」`,
    answer: { kind: "order", tokens: ["He", "talks", "as if", "he", "knew", "everything", "about the town."], distractor: "will" },
    point: "as if ＋過去形＝まるで（今）〜かのように",
    steps: [{ title: "as if", body: "He talks のあとに {{as if he knew}} 〜。今のことでも仮定法なので過去形 knew。", back: [S4] }],
  },
  {
    ...ord("narabe-if-had-missed", 2),
    prompt: `${NARABE}\n「もしあのときその電車に乗り遅れていたら、私は面接に遅れていただろう。」`,
    answer: { kind: "order", tokens: ["If", "I", "had", "missed", "the train,", "I", "would", "have", "been", "late", "for the interview."], distractor: "will" },
    point: "If had ＋過去分詞, would have ＋過去分詞",
    steps: [{ title: "過去の事実の反対", body: "前半は {{If I had missed the train,}}、後半は {{I would have been late}}。", back: [S3] }],
  },
];

export const H_ENG_GRAM_KATEIHO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "文法",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "仮定法の形と意味", lead: "次の問いに答えなさい。", style: "word", pick: 5, questions: FORMS },
    { title: "並べかえ", lead: "日本語に合うように、語（語句）を並べかえなさい。文の最初の語は大文字で始めてあります。", style: "word", pick: 2, questions: ORDER },
  ],
};
