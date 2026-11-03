// 小3国語「ローマ字」の単元模試 (B: 問題プールからシードで6問)。問題はすべてオリジナル。
// プール12問 (基本4・標準4・発展4)。1回に基本2・標準2・発展2 が出る。計算はないので A の検算はなし。
// 書き方はレクチャー (lib/lecture/data/e-japanese-3-romaji.ts) と同じ：訓令式と ヘボン式 (し si/shi など)、のばす音は「^」、
// つまる音は子音を重ねる、「ん」の後ろに母音・y が来るときは n'、人名・地名・文のはじめは大文字。
import type { ChoiceQ, QuestionB, UnitMoshi } from "../types";

const U = "e-japanese-3-romaji";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "母音は a・i・u・e・o の5つ");
const S2 = L(2, "2つの書き方がある音");
const S3 = L(3, "のばす音・つまる音・「ん」");
const S4 = L(4, "大文字を使うところ");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 75, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });
const ch = (options: string[], correct: number, why: string[]): ChoiceQ => ({ kind: "choice", options, correct, why });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("ka", 1),
    prompt: "「か」をローマ字で書いたものはどれですか。",
    answer: ch(["ka", "ki", "sa"], 0, ["正しい。子音 k と母音 a で ka です。", "ki は「き」です。", "sa は「さ」です。"]),
    point: "子音＋母音で書く",
    steps: [{ title: "組み合わせる", body: "か行の子音は k。「か」は k ＋ a で {{ka}} です。", back: [S1] }],
  },
  {
    ...base("e", 1),
    prompt: "「え」をローマ字で書いたものはどれですか。",
    answer: ch(["e", "i", "o"], 0, ["正しい。「え」は母音 e の1文字です。", "i は「い」です。", "o は「お」です。"]),
    point: "あ・い・う・え・お＝a・i・u・e・o",
    steps: [{ title: "母音", body: "「あ・い・う・え・お」は {{a・i・u・e・o}} の1文字で書きます。", back: [S1] }],
  },
  {
    ...base("sakura", 1),
    prompt: "「さくら」をローマ字で書いたものはどれですか。",
    answer: ch(["sakura", "sakula", "sacura"], 0, ["正しい。sa・ku・ra です。", "ら行は l ではなく r で書きます。", "か行は c ではなく k で書きます。"]),
    point: "か行は k、ら行は r",
    steps: [{ title: "音ごとに書く", body: "さ＝sa、く＝ku、ら＝ra で {{sakura}} です。", back: [S1] }],
  },
  {
    ...base("oomoji", 1),
    prompt: "ローマ字で、人の名前を書くときの決まりはどれですか。",
    answer: ch(["最初《さいしょ》の1文字を大文字にする", "全部《ぜんぶ》小文字で書く", "最後《さいご》の1文字を大文字にする"], 0, ["正しい。人の名前や地名は、最初《さいしょ》の1文字を大文字にします。", "名前の最初《さいしょ》は大文字にします。", "大文字にするのは最初《さいしょ》の1文字です。"]),
    point: "人名・地名・文のはじめは大文字",
    steps: [{ title: "大文字のきまり", body: "人の名前は {{最初《さいしょ》の1文字を大文字}}。名字と名前の間は1文字あけます。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...base("shi", 2),
    prompt: "「し」の2通りの書き方の組み合わせとして正しいものはどれですか。",
    answer: ch(["si と shi", "si と chi", "shi と tsu"], 0, ["正しい。訓令式《くんれいしき》は si、ヘボン式は shi です。", "chi は「ち」のヘボン式です。", "tsu は「つ」のヘボン式です。"]),
    point: "し＝si／shi、ち＝ti／chi、つ＝tu／tsu、ふ＝hu／fu",
    steps: [{ title: "2通りの書き方", body: "行ごとに子音をそろえると {{si}}、英語《えいご》の音に近づけると {{shi}} です。", back: [S2] }],
  },
  {
    ...base("kitte", 2),
    prompt: "「きって」をローマ字で書いたものはどれですか。",
    answer: ch(["kitte", "kite", "kitute"], 0, ["正しい。小さい「っ」は次の子音 t を2つ重ねます。", "つまる音が書かれていません。", "小さい「っ」を tu とは書きません。"]),
    point: "小さい「っ」は次の子音を重ねる",
    steps: [{ title: "つまる音", body: "「っ」の次は「て」（te）。子音 t を重ねて {{kitte}} です。", back: [S3] }],
  },
  {
    ...base("honya", 2),
    prompt: "「ほんや（本屋）」をローマ字で書いたものはどれですか。",
    answer: ch(["hon'ya", "honya", "hoNya"], 0, ["正しい。「ん」の後ろに y が来るので n' と書いて区切ります。", "honya だと「ほにゃ」と読めてしまいます。", "大文字の N にはしません。"]),
    point: "「ん」＋母音・y のときは n'",
    steps: [{ title: "区切りのしるし", body: "「ん」の後ろが「や」（ya）。そのままだと「にゃ」と読めるので {{n'}} と書きます。", back: [S3] }],
  },
  {
    ...base("fuji", 2),
    prompt: "地名の「ふじ」を、ヘボン式で正しく書いたものはどれですか。",
    answer: ch(["Fuji", "fuji", "Huzi"], 0, ["正しい。ヘボン式で「ふ」は fu、「じ」は ji、地名なので最初《さいしょ》は大文字です。", "地名は最初《さいしょ》の1文字を大文字にします。", "Huzi は訓令式《くんれいしき》の書き方です。"]),
    point: "ヘボン式＋地名は大文字",
    steps: [
      { title: "ヘボン式", body: "ヘボン式では「ふ」＝fu、「じ」＝ji。", back: [S2] },
      { title: "大文字", body: "地名なので最初《さいしょ》を大文字にして {{Fuji}} です。", back: [S4] },
    ],
  },
  // ---- 発展 ----
  {
    ...base("okaasan", 3),
    prompt: "「おかあさん」をローマ字（のばす音に「^」を使う書き方）で書いたものはどれですか。",
    answer: ch(["okâsan", "okaasan", "okasan"], 0, ["正しい。のばす音は母音の上に「^」をつけます。", "この問題では、のばす音に「^」を使う書き方で答えます。", "のばす音が書かれていません。"]),
    point: "のばす音は母音の上に「^」",
    steps: [{ title: "のばす音", body: "「かあ」は a をのばすので {{â}}。o・kâ・sa・n で okâsan です。", back: [S3] }],
  },
  {
    ...base("tsukue", 3),
    prompt: "「つくえ」をヘボン式で書いたものはどれですか。",
    answer: ch(["tsukue", "tukue", "tsukuwe"], 0, ["正しい。ヘボン式で「つ」は tsu です。", "tukue は訓令式《くんれいしき》の書き方です。", "「え」は e と書きます。"]),
    point: "つ＝tu（訓令式《くんれいしき》）／tsu（ヘボン式）",
    steps: [{ title: "ヘボン式の「つ」", body: "ヘボン式では「つ」を {{tsu}} と書きます。", back: [S2] }],
  },
  {
    ...base("gakko", 3),
    prompt: "「がっこう」をローマ字（のばす音に「^」を使う書き方）で書いたものはどれですか。",
    answer: ch(["gakkô", "gakô", "gakkou", "gatukô"], 0, ["正しい。「っ」で k を重ね、「こう」の o をのばして ô です。", "つまる音が書かれていません。", "この問題では、のばす音に「^」を使う書き方で答えます。", "小さい「っ」を tu とは書きません。"]),
    point: "つまる音＋のばす音",
    steps: [
      { title: "つまる音", body: "「っ」の次は「こ」（ko）。k を重ねて gakko。", back: [S3] },
      { title: "のばす音", body: "「こう」は o をのばす音なので ô。{{gakkô}} です。", back: [S3] },
    ],
  },
  {
    ...base("inu", 3),
    prompt: "「いぬ」をローマ字（小文字）で書きなさい。",
    answer: { kind: "term", accept: ["inu"], near: [{ text: "imu", why: "「ぬ」は な行なので n です。" }] },
    point: "な行は n",
    steps: [{ title: "音ごとに書く", body: "い＝i、ぬ＝nu で {{inu}} です。", back: [S1] }],
  },
];

export const E_JAPANESE_3_ROMAJI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "ja",
  grade: "小3",
  minutes: 10,
  review: { status: "draft" },
  sections: [{ title: "ローマ字", lead: "次の問いに答えなさい。", style: "word", pick: 6, questions: POOL }],
};
