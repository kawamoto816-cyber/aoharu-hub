// 高校英語（文法）「助動詞」の単元模試 (B: 問題プール12問からシードで6問)。問題・例文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// プール12問 (基本4・標準4・発展4)。1回に基本2・標準2・発展2 (15×2＋17×2＋18×2＝100点)。選択肢の順もシードで変わる。A (生成) は使っていないので検算式はなし。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-gram-jodoshi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "1つの助動詞に、2つの顔がある");
const S2 = L(2, "推量の助動詞は「確信の強さ」でならぶ");
const S3 = L(3, "過去のことは「助動詞＋have＋過去分詞」");
const S4 = L(4, "must not と don't have to は意味がまったくちがう");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("mustnt-park", 1),
    prompt: "You (　　) park your bike here. It's not allowed.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["mustn't", "don't have to", "may", "can"],
      correct: 0,
      why: [
        "It's not allowed（許されていない）とあるので禁止 → must not（〜してはいけない）。",
        "don't have to は「〜する必要はない」。禁止ではない。",
        "may は「〜してもよい」で、許されていないことと合わない。",
        "can は「〜できる・してよい」で、禁止と反対。",
      ],
    },
    point: "must not ＝ 〜してはいけない（禁止）",
    steps: [{ title: "禁止", body: "許されていない → {{禁止}} → {{mustn't}}。", back: [S4] }],
  },
  {
    ...base("dont-have-to-sunday", 1),
    prompt: "Tomorrow is Sunday, so I (　　) get up early.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["don't have to", "must not", "can't", "should"],
      correct: 0,
      why: [
        "日曜日なので「早起きする必要はない」→ don't have to（不必要）。",
        "must not だと「早起きしてはいけない」と禁止になる。",
        "can't だと「早起きできない」になり、日曜日という理由とつながりにくい。",
        "should だと「早起きするべきだ」になり、so の前後が合わない。",
      ],
    },
    point: "don't have to ＝ 〜する必要はない",
    steps: [{ title: "不必要", body: "日曜日 → 早起きの{{必要がない}} → {{don't have to}}。", back: [S4] }],
  },
  {
    ...base("may-i", 1),
    prompt: "「あなたのペンを使ってもいいですか」となるように、空所に入る最も適切な語を選びなさい。\n(　　) I use your pen?",
    answer: {
      kind: "choice",
      options: ["May", "Must", "Will", "Need"],
      correct: 0,
      why: [
        "May I 〜? は「〜してもよいですか」と許可を求める言い方。",
        "Must I 〜? は「〜しなければなりませんか」。",
        "Will I 〜? は「私は〜するでしょうか」で、許可を求める意味にならない。",
        "Need I 〜? は「〜する必要がありますか」。",
      ],
    },
    point: "May I 〜? ＝ 〜してもよいですか",
    steps: [{ title: "許可", body: "may の顔の1つは{{許可}}（〜してもよい）。May I use 〜?", back: [S1] }],
  },
  {
    ...base("able-term", 1),
    prompt: "Haruto can swim very fast.\n= Haruto is (　　) to swim very fast.\n空所に入る英語1語を書きなさい。",
    answer: { kind: "term", accept: ["able"], near: [{ text: "can", why: "be 動詞のあとに can は置けません。can ＝ be able to です。" }] },
    point: "can ＝ be able to（能力）",
    steps: [{ title: "書きかえ", body: "能力の can は {{be able to}} と言いかえられます。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...base("must-be-tired", 2),
    prompt: "She has been working since early this morning. She (　　) be tired.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["must", "can't", "mustn't", "doesn't have to"],
      correct: 0,
      why: [
        "朝早くからずっと働いている → 疲れているに「ちがいない」。確信の強い推量の must。",
        "can't be は「疲れているはずがない」で、前の文と合わない。",
        "mustn't は「〜してはいけない」の禁止。推量にはならない。",
        "doesn't have to は「〜する必要はない」で、推量にならない。",
      ],
    },
    point: "must be ＝ 〜にちがいない",
    steps: [{ title: "確信の強さ", body: "根拠がはっきりしていて、ほぼまちがいない → {{must}}。", back: [S2] }],
  },
  {
    ...base("cant-be-home", 2, "思考・判断・表現"),
    prompt: "Ryo (　　) be at home now. I saw him at the station five minutes ago.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["can't", "must", "should", "may"],
      correct: 0,
      why: [
        "5分前に駅で見かけた → 今家にいる「はずがない」。強い打ち消しの推量 can't。",
        "must だと「家にいるにちがいない」で、根拠と逆になる。",
        "should だと「家にいるはずだ」で、根拠と合わない。",
        "may だと「家にいるかもしれない」。駅で見たという根拠と合わない。",
      ],
    },
    point: "can't be ＝ 〜のはずがない（must の反対）",
    steps: [{ title: "推量の目盛り", body: "「ありえない」と強く打ち消す → {{can't}}。must の反対は must not ではなく can't。", back: [S2] }],
  },
  {
    ...base("which-must-guess", 2),
    prompt: "次のうち、下線の must が「〜にちがいない」の意味で使われているものはどれですか。",
    answer: {
      kind: "choice",
      options: ["He {{must}} be hungry after the long walk.", "You {{must}} wear a helmet on this road.", "I {{must}} finish this report by noon.", "Visitors {{must}} not touch the paintings."],
      correct: 0,
      why: [
        "長く歩いたあと → おなかがすいているに「ちがいない」。推量の must。",
        "ヘルメットを「かぶらなければならない」。義務の must。",
        "報告書を「終えなければならない」。義務の must。",
        "絵に「さわってはいけない」。禁止の must not。",
      ],
    },
    point: "must の2つの顔：義務と推量",
    steps: [{ title: "2つの顔", body: "must は「{{〜しなければならない}}」と「{{〜にちがいない}}」。後ろに be が来て状態を表すときは推量のことが多い。", back: [S1] }],
  },
  {
    ...base("order-should-earlier", 2),
    prompt: "「あなたはもっと早く寝るべきだ」となるように、語句を正しい順に並べなさい。",
    answer: { kind: "order", tokens: ["You", "should", "go", "to bed", "earlier."], distractor: "to" },
    point: "should＋原形 ＝ 〜するべきだ",
    steps: [{ title: "助動詞＋原形", body: "助動詞のあとは{{原形}}。should {{go}}。to は使いません。", back: [S1] }],
  },
  // ---- 発展 ----
  {
    ...base("must-have-rained", 3),
    prompt: "The ground is wet. It (　　) rained during the night.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["must have", "can't have", "should", "must"],
      correct: 0,
      why: [
        "地面がぬれている（今の根拠）→ 夜の間に雨が降った（過去）に「ちがいない」→ must have＋過去分詞。",
        "can't have rained は「雨が降ったはずがない」で、根拠と逆。",
        "should の後ろは原形。rained は置けない。",
        "must の後ろは原形。rained を続けるには have が必要。",
      ],
    },
    point: "must have＋過去分詞 ＝ 〜したにちがいない",
    steps: [{ title: "過去の推量", body: "推量は今、出来事は{{過去}} → 助動詞＋{{have＋過去分詞}}。must have rained。", back: [S3] }],
  },
  {
    ...base("should-have-told", 3, "思考・判断・表現"),
    prompt: "You (　　) told me about the problem earlier. I could have helped you.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["should have", "must have", "can't have", "will have"],
      correct: 0,
      why: [
        "「もっと早く言ってくれればよかったのに（言うべきだった）」→ should have＋過去分詞。過去の行動への後悔・非難。",
        "must have told は「言ったにちがいない」で、後半の「助けられたのに」と合わない。",
        "can't have told は「言ったはずがない」で、相手への気持ちが表せない。",
        "will have told は未来のある時点までの完了。",
      ],
    },
    point: "should have＋過去分詞 ＝ 〜すべきだったのに",
    steps: [{ title: "過去への後悔", body: "実際には言わなかった → 「言う{{べきだった}}のに」→ {{should have}} told。", back: [S3] }],
  },
  {
    ...base("may-have-been", 3),
    prompt: "Aki didn't answer my call last night. She (　　) been asleep.\n「眠っていたのかもしれない」という意味になるように、空所に入る最も適切な語句を選びなさい。",
    answer: {
      kind: "choice",
      options: ["may have", "may", "must", "can"],
      correct: 0,
      why: [
        "過去（昨夜）のことを「〜したかもしれない」と推量 → may have＋過去分詞。",
        "may の後ろは原形。been は置けない。",
        "must の後ろも原形。been を続けるには have が必要。",
        "can の後ろも原形。",
      ],
    },
    point: "may have＋過去分詞 ＝ 〜したかもしれない",
    steps: [{ title: "過去の推量", body: "「かもしれない」（半々）は may。過去のことなので {{may have}} been。", back: [S2, S3] }],
  },
  {
    ...base("order-cant-have-said", 3),
    prompt: "「彼がそんなことを言ったはずがない」となるように、語句を正しい順に並べなさい。",
    answer: { kind: "order", tokens: ["He", "can't", "have", "said", "such a thing."], distractor: "must" },
    point: "can't have＋過去分詞 ＝ 〜したはずがない",
    steps: [
      { title: "強い打ち消し", body: "「はずがない」→ {{can't}}。", back: [S2] },
      { title: "過去のこと", body: "言ったのは過去 → {{can't have said}}。", back: [S3] },
    ],
  },
];

export const H_ENG_GRAM_JODOSHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "文法",
  minutes: 8,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [{ title: "助動詞の意味と使い分け", lead: "次の問いに答えなさい。", style: "word", pick: 6, questions: POOL }],
};
