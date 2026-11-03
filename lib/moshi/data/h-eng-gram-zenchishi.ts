// 高校英語（文法）「前置詞」の単元模試 (B: 問題プールからシードで選ぶ)。問題・例文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// 節1 語法 (プール12問: 基本4・標準4・発展4) から5問 (基本2・標準2・発展1)、
// 節2 並べかえ (プール4問: 基本2・標準2) から2問 (基本1・標準1)。1回7問・100点 (13×3＋15×3＋16＝100)。
// A (生成) は使っていないので数値の検算はなし。choice・term・order の正答は check-moshi が採点器で満点になるか確かめる。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-gram-zenchishi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "前置詞＋名詞は、ひとまとまりで形容詞か副詞になる");
const S2 = L(2, "at・on・in のイメージは、時にも場所にも使える");
const S3 = L(3, "by と until、for と during");
const S4 = L(4, "2語以上で1つの前置詞：群前置詞");

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
    ...base("at-time", 1),
    prompt: `The first class begins (　　) 8:40.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["at", "on", "in", "for"],
      correct: 0,
      why: ["時刻は時の流れの中の「点」なので at。", "on は曜日・日付。", "in は月・年・季節など幅のある期間。", "for は「〜の間」で期間の長さ。"],
    },
    point: "時刻は at（点）",
    steps: [{ title: "点・接触・中", body: "{{at}} は点。時刻（8:40）はひとつの点なので at。", back: [S2] }],
  },
  {
    ...base("in-month", 1),
    prompt: `Our school festival is held (　　) October every year.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["in", "on", "at", "by"],
      correct: 0,
      why: ["月は幅のある期間なので「中」の in。", "on は曜日・日付。", "at は時刻など点。", "by は「〜までに」で意味が合わない。"],
    },
    point: "月・年・季節は in（中）",
    steps: [{ title: "幅のある期間", body: "October は1か月の{{幅}}があるので、その中を表す {{in}}。", back: [S2] }],
  },
  {
    ...base("on-day", 1),
    prompt: `Let's meet (　　) Saturday afternoon.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["on", "in", "at", "for"],
      correct: 0,
      why: [
        "曜日・特定の日は on。Saturday afternoon のように特定の日の午後も on。",
        "in the afternoon は「午後に」だが、特定の曜日がつくと on。",
        "at は時刻など点。",
        "for は期間の長さ。",
      ],
    },
    point: "特定の日（の朝・午後）は on",
    steps: [{ title: "曜日", body: "曜日がつくと {{on}}。in the afternoon でも、on {{Saturday}} afternoon になります。", back: [S2] }],
  },
  {
    ...base("for-helping", 1),
    prompt: `Thank you for (　　) me with my homework.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["helping", "help", "to help", "helped"],
      correct: 0,
      why: [
        "前置詞 for の後ろには名詞か動名詞が来る。helping。",
        "原形は前置詞の後ろに置けない。",
        "to 不定詞は前置詞の後ろに置けない。",
        "過去形は前置詞の後ろに置けない。",
      ],
    },
    point: "前置詞＋動名詞（-ing）",
    steps: [{ title: "前置詞の後ろ", body: "前置詞の後ろは{{名詞か動名詞}}。動詞なら -ing にして {{helping}}。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...base("by-friday", 2),
    prompt: `You have to return the library book (　　) next Tuesday.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["by", "until", "during", "for"],
      correct: 0,
      why: [
        "返すのは1回の動作。「〜までに（期限）」は by。",
        "until は「〜までずっと」で、続く動作（待つ・いる）に使う。",
        "during は「〜の間に」で、特定の期間を表す名詞と使う。",
        "for は期間の長さ。",
      ],
    },
    point: "by 期限／until 継続",
    steps: [{ title: "動詞で決める", body: "return は1回で終わる動作なので、期限の {{by}}。wait・stay のように続く動作なら until。", back: [S3] }],
  },
  {
    ...base("until-five", 2),
    prompt: `I stayed in the library (　　) it closed at six.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["until", "by", "during", "for"],
      correct: 0,
      why: [
        "stay は続く動作。閉まる6時まで「ずっと」いたので until（until は接続詞としても使える）。",
        "by は期限。「6時までに図書館にいた」では意味が通らない。",
        "during の後ろは名詞。it closed のような文は続かない。",
        "for の後ろも名詞（期間）。",
      ],
    },
    point: "stay ＋ until 〜 ＝〜までずっと",
    steps: [{ title: "継続", body: "{{stay}} は続く動作なので {{until}}（〜までずっと）。", back: [S3] }],
  },
  {
    ...base("during-vacation", 2),
    prompt: `I read five novels (　　) the winter vacation.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["during", "while", "because", "since"],
      correct: 0,
      why: [
        "the winter vacation（特定の期間を表す名詞）の前に置く前置詞は during。",
        "while は接続詞。後ろに主語＋動詞が必要。",
        "because は接続詞で、意味も合わない。",
        "since は「〜以来」で、過去形 read と合わない。",
      ],
    },
    point: "during ＋名詞／while ＋主語＋動詞",
    steps: [{ title: "前置詞と接続詞", body: "後ろが名詞 the winter vacation なので前置詞 {{during}}。while なら while I was on vacation のように文が続きます。", back: [S3] }],
  },
  {
    ...base("instead-of", 2),
    prompt: `I'll take the stairs (　　) the elevator for exercise.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["instead of", "because of", "in spite of", "such as"],
      correct: 0,
      why: [
        "「エレベーターの代わりに階段を使う」。instead of ＝〜の代わりに。",
        "because of は「〜のために（理由）」で意味が合わない。",
        "in spite of は「〜にもかかわらず」で意味が合わない。",
        "such as は「たとえば〜のような」。",
      ],
    },
    point: "instead of ＝〜の代わりに",
    steps: [{ title: "群前置詞", body: "2語以上で1つの前置詞のはたらきをする{{群前置詞}}。{{instead of}} は「〜の代わりに」。", back: [S4] }],
  },
  // ---- 発展 ----
  {
    ...base("on-morning", 3),
    prompt: `We left for the airport early (　　) the morning of August 10.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["on", "in", "at", "by"],
      correct: 0,
      why: [
        "ただの in the morning ではなく「8月10日の朝」と特定の日の朝なので on。",
        "in the morning は日付がつかないとき。",
        "at は時刻など点。",
        "by は「〜までに」で意味が合わない。",
      ],
    },
    point: "the morning of 〜（特定の日）→ on",
    steps: [{ title: "日付がつく", body: "in the morning でも、{{特定の日}}の朝になると {{on}} the morning of August 10。", back: [S2] }],
  },
  {
    ...base("in-spite-of", 3),
    prompt: `(　　) the strong wind, the ferry left the port on time.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["In spite of", "Because of", "Although", "Instead of"],
      correct: 0,
      why: [
        "強風なのに時間どおり出航した。予想と逆なので「〜にもかかわらず」の in spite of。",
        "because of は理由。強風が原因で時間どおり出航したのでは意味が通らない。",
        "although は接続詞。後ろに主語＋動詞が必要で、名詞 the strong wind は続かない。",
        "instead of は「〜の代わりに」。",
      ],
    },
    point: "in spite of ＋名詞／although ＋文",
    steps: [
      { title: "後ろの形", body: "後ろは名詞 the strong wind なので、前置詞のはたらきをする語。", back: [S4] },
      { title: "意味", body: "予想と逆なので {{In spite of}}。Although the wind was strong と言いかえられます。", back: [S4] },
    ],
  },
  {
    ...base("adj-phrase", 3, "思考・判断・表現"),
    prompt: "The girl with long hair is my classmate.\nこの文の with long hair のはたらきとして最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["名詞 The girl を説明する形容詞のはたらき", "動詞 is を説明する副詞のはたらき", "文の主語のはたらき", "文全体を説明する副詞のはたらき"],
      correct: 0,
      why: [
        "with long hair（長い髪の）が The girl を後ろから説明している。形容詞のはたらき。",
        "「どのように〜である」と is を説明しているのではない。",
        "主語は The girl。with long hair はそれを説明するかたまり。",
        "文全体ではなく、直前の名詞を説明している。",
      ],
    },
    point: "名詞＋前置詞句 → 形容詞のはたらき",
    steps: [{ title: "何を説明するか", body: "{{with long hair}} は The girl を後ろから説明。名詞を説明するので{{形容詞}}のはたらきです。", back: [S1] }],
  },
  {
    ...base("because-of-term", 3),
    prompt: "2つの文がほぼ同じ意味になるように、空所に入る語句を英語で書きなさい。\nThe train was delayed because it snowed heavily.\nThe train was delayed (　　) the heavy snow.",
    answer: {
      kind: "term",
      accept: ["because of", "owing to", "due to", "on account of"],
      near: [{ text: "because", why: "because は接続詞で、後ろに主語＋動詞が必要です。名詞 the heavy snow の前なので because of。" }],
    },
    point: "because ＋文 ＝ because of ＋名詞",
    steps: [{ title: "後ろが名詞", body: "後ろが名詞 the heavy snow になったので、接続詞 because ではなく群前置詞 {{because of}}（due to なども可）。", back: [S4] }],
  },
];

const ORDER: QuestionB[] = [
  // ---- 基本 ----
  {
    ...ord("narabe-book-on-desk", 1),
    prompt: `${NARABE}\n「テーブルの上のかぎは私のものです。」`,
    answer: { kind: "order", tokens: ["The key", "on", "the table", "is", "mine."], distractor: "in" },
    point: "名詞＋前置詞句で後ろから説明",
    steps: [{ title: "形容詞のかたまり", body: "The key のすぐ後ろに {{on the table}} を置いて、どのかぎかを説明します。", back: [S1, S2] }],
  },
  {
    ...ord("narabe-sunday-mornings", 1),
    prompt: `${NARABE}\n「私は日曜日の朝、川沿いを走ります。」`,
    answer: { kind: "order", tokens: ["I", "run", "along", "the river", "on", "Sunday mornings."], distractor: "at" },
    point: "曜日の朝 → on",
    steps: [{ title: "曜日", body: "曜日がつくので {{on Sunday mornings}}。", back: [S2] }],
  },
  // ---- 標準 ----
  {
    ...ord("narabe-finish-by", 2),
    prompt: `${NARABE}\n「このレポートを金曜日までに仕上げなさい。」`,
    answer: { kind: "order", tokens: ["Finish", "this report", "by", "Friday."], distractor: "until" },
    point: "仕上げる（1回の動作）→ by",
    steps: [{ title: "期限", body: "finish は1回で終わる動作なので、期限の {{by}}。until は「ずっと」続く動作に使います。", back: [S3] }],
  },
  {
    ...ord("narabe-without-eating", 2),
    prompt: `${NARABE}\n「彼は朝食を食べずに家を出た。」`,
    answer: { kind: "order", tokens: ["He", "left", "home", "without", "eating", "breakfast."], distractor: "eat" },
    point: "without ＋動名詞",
    steps: [{ title: "前置詞の後ろ", body: "前置詞 {{without}} の後ろは動名詞 {{eating}}。原形 eat は置けません。", back: [S1] }],
  },
];

export const H_ENG_GRAM_ZENCHISHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "文法",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    { title: "前置詞の使い分け", lead: "次の問いに答えなさい。", style: "word", pick: 5, questions: FORMS },
    { title: "並べかえ", lead: "日本語に合うように、語（語句）を並べかえなさい。文の最初の語は大文字で始めてあります。", style: "word", pick: 2, questions: ORDER },
  ],
};
