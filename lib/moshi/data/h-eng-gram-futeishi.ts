// 高校英語（文法）「不定詞」の単元模試 (B: 問題プール12問からシードで6問)。問題・例文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// プール12問 (基本4・標準4・発展4)。1回に基本2・標準2・発展2 (15×2＋17×2＋18×2＝100点)。選択肢の順もシードで変わる。A (生成) は使っていないので検算式はなし。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-gram-futeishi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "to ＋原形の3つの用法");
const S2 = L(2, "長い主語は It で置きかえる");
const S3 = L(3, "目的語は to か -ing か：動詞で決まる");
const S4 = L(4, "remember・forget は「時の向き」で意味が変わる");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("want-to-be", 1),
    prompt: "My brother wants (　　) a vet in the future.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["to be", "being", "be", "been"],
      correct: 0,
      why: [
        "want は目的語に to 不定詞をとる。これからのことなので to。",
        "want は動名詞を目的語にとらない。",
        "wants be のように動詞の後ろに原形を続けることはできない。",
        "been は過去分詞。",
      ],
    },
    point: "want to 〜 ＝ 〜したい",
    steps: [{ title: "名詞的用法", body: "to be a vet が want の{{目的語}}（〜になること）。want は {{to}} 不定詞をとります。", back: [S1, S3] }],
  },
  {
    ...base("homework-to-do", 1),
    prompt: "I can't go out today. I have a lot of homework (　　).\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["to do", "doing", "do", "done"],
      correct: 0,
      why: [
        "「するべき（これからする）宿題」。to do が後ろから homework を説明する形容詞的用法。",
        "doing だと「（宿題が）何かをしている」ことになる。",
        "名詞の後ろに原形だけを置いて説明することはできない。",
        "done だと「すでに終わった宿題」になり、出かけられない理由にならない。",
      ],
    },
    point: "名詞＋to 〜 ＝ 〜するべき（ための）名詞",
    steps: [{ title: "形容詞的用法", body: "homework {{to do}}（するべき宿題）。to 不定詞が後ろから{{名詞}}を説明します。", back: [S1] }],
  },
  {
    ...base("library-to-study", 1),
    prompt: "Saki went to the library (　　) for the exam.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["to study", "study", "studied", "for study"],
      correct: 0,
      why: [
        "図書館へ行った目的「勉強するために」→ 副詞的用法の to study。",
        "went の後ろに原形を続けることはできない。",
        "went studied と動詞を2つ続けることはできない。",
        "for の後ろに動詞を置くなら動名詞。for study では「勉強する」の意味にならない。",
      ],
    },
    point: "目的「〜するために」は to 〜",
    steps: [{ title: "副詞的用法", body: "なぜ行ったか → 「勉強する{{ために}}」→ {{to study}}。", back: [S1] }],
  },
  {
    ...base("it-term", 1),
    prompt: "To swim in this river is dangerous.\n= (　　) is dangerous to swim in this river.\n空所に入る英語1語を書きなさい。",
    answer: { kind: "term", accept: ["it"], near: [{ text: "this", why: "長い主語を後ろへ回すときに前に置く形式主語は It です。" }, { text: "that", why: "長い主語を後ろへ回すときに前に置く形式主語は It です。" }] },
    point: "To 〜 is … ＝ It is … to 〜",
    steps: [{ title: "形式主語", body: "長い主語 to swim in this river を後ろへ回し、空いた主語の席に {{It}} を置きます。", back: [S2] }],
  },
  // ---- 標準 ----
  {
    ...base("which-adjective", 2, "思考・判断・表現"),
    prompt: "次のうち、下線の不定詞が{{形容詞的用法}}（名詞を説明する）のものはどれですか。",
    answer: {
      kind: "choice",
      options: ["She has no friends {{to help}} her.", "I was happy {{to see}} you again.", "My plan is {{to visit}} Nara.", "He got up early {{to catch}} the first train."],
      correct: 0,
      why: [
        "to help her が friends を説明する（彼女を助けてくれる友だち）。形容詞的用法。",
        "happy の理由（会えてうれしい）。副詞的用法。",
        "is の補語（訪れること）。名詞的用法。",
        "早起きした目的（乗るために）。副詞的用法。",
      ],
    },
    point: "直前の名詞を説明していれば形容詞的用法",
    steps: [{ title: "何に係るか", body: "to 不定詞が{{名詞}}に係れば形容詞的、{{動詞・形容詞}}に係れば副詞的、名詞の席なら名詞的。", back: [S1] }],
  },
  {
    ...base("forget-to-mail", 2),
    prompt: "Don't forget (　　) this letter on your way to school.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["to mail", "mailing", "mail", "mailed"],
      correct: 0,
      why: [
        "手紙を出すのはこれから。forget to 〜 ＝ 〜するのを忘れる。",
        "forget -ing は「（すでに）〜したことを忘れる」。これからのことには使わない。",
        "forget の後ろに原形は置かない。",
        "forget mailed と動詞を2つ続けることはできない。",
      ],
    },
    point: "これからのことは to、すでにしたことは -ing",
    steps: [{ title: "時の向き", body: "手紙を出すのは{{これから}} → to の向き → {{to mail}}。", back: [S4] }],
  },
  {
    ...base("finished-cleaning", 2),
    prompt: "We finished (　　) the classroom at five.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["cleaning", "to clean", "clean", "cleaned"],
      correct: 0,
      why: [
        "finish は目的語に動名詞だけをとる。すでに始めていたことを終える → -ing。",
        "finish は to 不定詞を目的語にとらない。",
        "finish の後ろに原形は置かない。",
        "finished cleaned と動詞を2つ続けることはできない。",
      ],
    },
    point: "finish・enjoy・stop は -ing だけ",
    steps: [{ title: "動詞で決まる", body: "{{finish}} は「すでにしていること」を終える → {{-ing}}。", back: [S3] }],
  },
  {
    ...base("surprised-to-hear", 2),
    prompt: "I was surprised (　　) that our teacher was leaving the school.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["to hear", "hearing", "hear", "heard"],
      correct: 0,
      why: [
        "おどろいた原因「聞いて」。感情の形容詞＋to 〜 で原因を表す副詞的用法。",
        "surprised の後ろに -ing を直接続けて原因を表すことはふつうしない。",
        "原形は置けない。",
        "was surprised heard と動詞を続けることはできない。",
      ],
    },
    point: "感情＋to 〜 ＝ 〜して（感情の原因）",
    steps: [{ title: "副詞的用法（原因）", body: "なぜおどろいたか → 聞い{{て}} → {{to hear}}。", back: [S1] }],
  },
  // ---- 発展 ----
  {
    ...base("order-clever-of", 3),
    prompt: "「ひとりでその問題を解くとは、彼はかしこかった」となるように、語句を正しい順に並べなさい。",
    answer: { kind: "order", tokens: ["It", "was", "clever", "of", "him", "to solve", "the problem", "by himself."], distractor: "for" },
    point: "人の性質を表す形容詞は of＋人",
    steps: [
      { title: "形式主語", body: "It was clever ＋ to solve 〜 で「〜するのはかしこい」。", back: [S2] },
      { title: "for か of か", body: "clever（かしこい）は{{人の性質}}を表すので、意味上の主語は {{of him}}。", back: [S2] },
    ],
  },
  {
    ...base("remember-locking", 3, "思考・判断・表現"),
    prompt: "I'm sure I remember (　　) the door, but now it's open!\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["locking", "to lock", "lock", "locked"],
      correct: 0,
      why: [
        "鍵をかけたのは過去のこと。「かけた記憶がある」→ remember -ing。",
        "remember to 〜 は「忘れずに〜する」。いまドアが開いておどろく話と合わない。",
        "remember の後ろに原形は置かない。",
        "remember locked と動詞を続けることはできない。",
      ],
    },
    point: "remember -ing ＝ 〜したことを覚えている",
    steps: [{ title: "時の向きを決める", body: "かぎをかけたのは{{過去}}。「今」から見て後ろ向き → {{-ing}}。", back: [S4] }],
  },
  {
    ...base("too-cold-to-swim", 3),
    prompt: "The water in this lake is too cold (　　) in.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["to swim", "swimming", "swim", "that swim"],
      correct: 0,
      why: [
        "too … to 〜 ＝「〜するには…すぎる（…すぎて〜できない）」。最後の in は swim in the water の in。",
        "too … の後ろに -ing を置いてこの意味は表せない。",
        "原形は置けない。",
        "too … that の形はない（so … that なら後ろに S＋V が必要）。",
      ],
    },
    point: "too … to 〜 ＝ 〜するには…すぎる",
    steps: [{ title: "副詞的用法", body: "cold を説明する{{to swim}}（泳ぐには）。swim {{in}} the water なので in が残ります。", back: [S1] }],
  },
  {
    ...base("order-told-me-to", 3),
    prompt: "「母は私に、早く寝るように言った」となるように、語句を正しい順に並べなさい。",
    answer: { kind: "order", tokens: ["My mother", "told", "me", "to go", "to bed", "early."], distractor: "going" },
    point: "tell 人 to 〜 ＝ 人に〜するように言う",
    steps: [{ title: "動詞＋人＋to 〜", body: "tell・ask・want は {{人＋to 〜}} の形。My mother told me {{to go}} to bed early.", back: [S3] }],
  },
];

export const H_ENG_GRAM_FUTEISHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "文法",
  minutes: 8,
  review: { status: "draft" },
  sections: [{ title: "不定詞の用法と使い分け", lead: "次の問いに答えなさい。", style: "word", pick: 6, questions: POOL }],
};
