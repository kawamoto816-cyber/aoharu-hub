// 高校英語（語彙）「英単語2000」の単元模試 (B: 問題プール12問からシードで6問)。問題・例文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// プール12問 (基本4・標準4・発展4)。1回に基本2・標準2・発展2 (15×2＋17×2＋18×2＝100点)。選択肢の順もシードで変わる。A (生成) は使っていないので検算式はなし。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-vocab-2000";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S2 = L(2, "意味がたくさんある語は「コア」を1つつかむ");
const S3 = L(3, "語の部品（接頭辞・語根・接尾辞）で意味を組み立てる");
const S4 = L(4, "品詞の形をセットで覚える");
const S5 = L(5, "アメリカ英語とイギリス英語の「ちがい」も単語の一部");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("run-shop", 1),
    prompt: "My aunt {{runs}} a small bakery near the station.\nこの文の runs の意味として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["経営している", "走っている", "流れている", "立候補している"],
      correct: 0,
      why: [
        "目的語が a small bakery（パン屋）。店を止まらずに動かし続ける＝経営する。",
        "「走る」は目的語をとらない使い方。店を走らせることはできない。",
        "「流れる」は水などが主語のとき。",
        "「立候補する」は run for 〜 の形で使う。",
      ],
    },
    point: "run のコアは「止まらずに動き続ける」",
    steps: [{ title: "コアから訳を選ぶ", body: "run のコアは{{止まらずに動き続ける}}。店を動かし続ける → {{経営する}}。目的語が何かで訳が決まります。", back: [S2] }],
  },
  {
    ...base("re-build", 1),
    prompt: "接頭辞 re- の意味から考えて、{{rebuild}} の意味として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["建て直す", "建てるのをやめる", "前もって建てる", "建てられない"],
      correct: 0,
      why: ["re-（ふたたび）＋ build（建てる）＝ 建て直す。", "「やめる」の意味の部品はない。", "「前もって」は pre-。", "「〜できない」は un-＋-able などで表す。"],
    },
    point: "re- ＝ ふたたび",
    steps: [{ title: "部品に分ける", body: "{{re-}}（ふたたび）＋ build（建てる）。部品を知っていれば、初めての語も意味の見当がつきます。", back: [S3] }],
  },
  {
    ...base("lift-elevator", 1),
    prompt: "イギリス英語の lift は、アメリカ英語ではふつう何と言いますか。",
    answer: {
      kind: "choice",
      options: ["elevator", "escalator", "truck", "subway"],
      correct: 0,
      why: [
        "建物の中で人を上下に運ぶ「エレベーター」。イギリスで lift、アメリカで elevator。",
        "エスカレーターはどちらでも escalator。",
        "truck はアメリカ英語の「トラック」（イギリスでは lorry）。",
        "subway はアメリカ英語の「地下鉄」（イギリスでは underground）。",
      ],
    },
    point: "lift（英）＝ elevator（米）",
    steps: [{ title: "組で覚える", body: "{{lift / elevator}}、lorry / truck、underground / subway のように、英米の語を{{組}}で覚えます。", back: [S5] }],
  },
  {
    ...base("decide-noun", 1),
    prompt: "動詞 decide（決める）の名詞形を英語1語で書きなさい。",
    answer: { kind: "term", accept: ["decision"], near: [{ text: "decisive", why: "decisive は形容詞（決定的な）です。名詞は decision。" }] },
    point: "decide → decision → decisive",
    steps: [{ title: "品詞の形をセットで", body: "decide（動詞）・{{decision}}（名詞 決定）・decisive（形容詞 決定的な）を一度に覚えます。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...base("contradict", 2),
    prompt: "contra-（反対に）と dict（言う）の組み合わせから考えて、{{contradict}} の意味として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["反論する・矛盾する", "予測する", "書き取る", "辞書を引く"],
      correct: 0,
      why: ["contra-（反対に）＋ dict（言う）＝ 反対のことを言う → 反論する・矛盾する。", "「予測する」は pre-（前に）＋ dict の predict。", "「書き取る」は dictate。", "dict は dictionary にもふくまれるが、contradict に「辞書」の意味はない。"],
    },
    point: "dict ＝「言う」。前の部品で意味が決まる",
    steps: [{ title: "語根で広げる", body: "{{dict}}（言う）に pre- がつくと predict（予測する）、{{contra-}} がつくと contradict（反論する）。", back: [S3] }],
  },
  {
    ...base("drinkable", 2),
    prompt: "This water is not {{drinkable}}.\n下線の語の意味として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["飲める", "飲みすぎた", "飲み物の", "飲んでいる"],
      correct: 0,
      why: ["drink ＋ -able（〜できる）＝ 飲める。not があるので「この水は飲めない」。", "「〜すぎた」の意味の部品はない。", "-able は「〜の」ではなく「〜できる」。", "進行形は -ing。"],
    },
    point: "-able ＝ 〜できる（形容詞を作る）",
    steps: [{ title: "接尾辞", body: "{{-able}} は「〜できる」の意味で、動詞を形容詞にします。drinkable ＝ {{飲める}}。", back: [S3] }],
  },
  {
    ...base("success", 2),
    prompt: "Her hard work led to her (　　) in the entrance exam.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["success", "succession", "succeed", "successive"],
      correct: 0,
      why: [
        "her のあとは名詞。「試験での成功（合格）」の success。",
        "succession も名詞だが「連続・継承」の意味で、文に合わない。",
        "succeed は動詞。her のあとに置けない。",
        "successive は形容詞（連続した）。",
      ],
    },
    point: "succeed の名詞は success と succession",
    steps: [
      { title: "品詞を決める", body: "her（所有格）のあとなので{{名詞}}。", back: [S4] },
      { title: "意味で選ぶ", body: "succeed の名詞は {{success}}（成功）と succession（連続・継承）の2つ。試験の話なので成功。", back: [S4] },
    ],
  },
  {
    ...base("colour", 2),
    prompt: "次のうち、イギリス英語のつづりとアメリカ英語のつづりの組み合わせとして{{正しくない}}ものはどれですか。（イギリス／アメリカの順）",
    answer: {
      kind: "choice",
      options: ["center／centre", "colour／color", "theatre／theater", "favourite／favorite"],
      correct: 0,
      why: [
        "順番が逆。centre がイギリス、center がアメリカ。",
        "正しい。イギリスは -our、アメリカは -or。",
        "正しい。イギリスは -re、アメリカは -er。",
        "正しい。イギリスは -our、アメリカは -or。",
      ],
    },
    point: "イギリスは -our・-re、アメリカは -or・-er",
    steps: [{ title: "つづりの型", body: "イギリス英語は {{colour・centre}}、アメリカ英語は {{color・center}}。どちらも正しい英語です。", back: [S5] }],
  },
  // ---- 発展 ----
  {
    ...base("considerable", 3),
    prompt: "The project needed a (　　) amount of money.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["considerable", "considerate", "consideration", "consider"],
      correct: 0,
      why: [
        "considerable は「かなりの（量・大きさ）」。amount of money を説明する。",
        "considerate は「（人が）思いやりのある」。お金の量には使わない。",
        "consideration は名詞（考慮）。a と amount のあいだには形容詞が入る。",
        "consider は動詞。",
      ],
    },
    point: "considerable かなりの／considerate 思いやりのある",
    steps: [{ title: "形がまぎらわしい組", body: "consider から生まれた形容詞は2つ。{{considerable}}（かなりの）と {{considerate}}（思いやりのある）。何を説明するかで選びます。", back: [S4] }],
  },
  {
    ...base("sensitive", 3),
    prompt: "My skin is very (　　) to sunlight, so I always wear a hat in summer.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["sensitive", "sensible", "sense", "senseless"],
      correct: 0,
      why: [
        "sensitive to 〜 は「〜に敏感な」。日光に弱いので帽子をかぶる、と意味が通る。",
        "sensible は「分別のある・賢明な」。肌には使わない。",
        "sense は名詞（感覚）。very のあとには形容詞。",
        "senseless は「無意味な・感覚のない」。文の意味に合わない。",
      ],
    },
    point: "sensitive 敏感な／sensible 分別のある",
    steps: [{ title: "意味で区別", body: "{{sensitive}} は「感じやすい・敏感な」、{{sensible}} は「分別のある」。sensitive to 〜 の形でよく使います。", back: [S4] }],
  },
  {
    ...base("respective", 3),
    prompt: "After the party, the guests went back to their (　　) homes.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["respective", "respectful", "respectable", "respected"],
      correct: 0,
      why: [
        "respective は「それぞれの」。客がそれぞれ自分の家に帰った。",
        "respectful は「（人が）礼儀正しい・敬意を表す」。家には合わない。",
        "respectable は「立派な・ちゃんとした」。文の意味に合わない。",
        "respected は「尊敬されている」。家には合わない。",
      ],
    },
    point: "respective ＝ それぞれの",
    steps: [{ title: "接尾辞で意味が分かれる", body: "respect から {{respective}}（それぞれの）・respectful（敬意を表す）・respectable（立派な）。形が似ていても意味は別です。", back: [S4] }],
  },
  {
    ...base("predict-noun", 3),
    prompt: "pre-（前に）＋ dict（言う）の動詞 predict の名詞形を、英語1語で書きなさい。（意味：予測・予報）",
    answer: { kind: "term", accept: ["prediction"], near: [{ text: "predictable", why: "predictable は形容詞（予測できる）です。名詞は -tion をつけた prediction。" }] },
    point: "predict → prediction（-tion で名詞）",
    steps: [{ title: "部品と品詞", body: "{{pre-}}（前に）＋ {{dict}}（言う）＝ 予測する。-tion をつけると名詞 {{prediction}}、-able をつけると形容詞 predictable。", back: [S3, S4] }],
  },
];

export const H_ENG_VOCAB_2000_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "語彙",
  minutes: 8,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [{ title: "英単語の意味と形", lead: "次の問いに答えなさい。", style: "word", pick: 6, questions: POOL }],
};
