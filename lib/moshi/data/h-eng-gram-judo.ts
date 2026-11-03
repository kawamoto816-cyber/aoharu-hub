// 高校英語（文法）「受動態」の単元模試 (B: 問題プール12問からシードで6問)。問題・例文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// プール12問 (基本4・標準4・発展4)。1回に基本2・標準2・発展2 (15×2＋17×2＋18×2＝100点)。選択肢の順もシードで変わる。A (生成) は使っていないので検算式はなし。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-gram-judo";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "作り方：目的語を主語にして、be ＋過去分詞");
const S2 = L(2, "時制や助動詞がついても、変わるのは be の部分だけ");
const S3 = L(3, "by を使わないとき、by 以外の前置詞のとき");
const S4 = L(4, "目的語が2つの文、補語のある文の受動態");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("was-built", 1),
    prompt: "This bridge (　　) about eighty years ago.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["was built", "built", "is built", "has built"],
      correct: 0,
      why: [
        "橋は「建てられた」側。過去のことなので be を過去形にして was built。",
        "built だけだと橋が何かを「建てた」ことになる。",
        "is built は現在。about eighty years ago（約80年前）と合わない。",
        "has built は能動態の現在完了で、橋が建てたことになる。",
      ],
    },
    point: "受動態 ＝ be＋過去分詞。時制は be で表す",
    steps: [{ title: "受動態の形", body: "橋は{{建てられる}}側 → be＋過去分詞。〜年前なので {{was}} built。", back: [S1, S2] }],
  },
  {
    ...base("is-spoken", 1),
    prompt: "Portuguese (　　) in Brazil.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["is spoken", "speaks", "is speaking", "spoke"],
      correct: 0,
      why: [
        "ポルトガル語は「話される」側。今も続く事実なので is spoken。",
        "speaks だとポルトガル語が何かを「話す」ことになる。",
        "is speaking も能動態で、言語が話していることになる。",
        "spoke は能動態の過去形。",
      ],
    },
    point: "話す人を言う必要がなければ by 〜 は省く",
    steps: [{ title: "by を使わない", body: "話すのはブラジルの人々で、言わなくてもわかる → by 〜 を省いて {{is spoken}} in Brazil。", back: [S1, S3] }],
  },
  {
    ...base("broken-by", 1),
    prompt: "The window was broken (　　) a ball from the playground.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["by", "of", "to", "at"],
      correct: 0,
      why: [
        "窓を割ったもの（ボール）を示すのは by。",
        "of は材料や所属を表す。",
        "to は方向や相手を表す。",
        "at は場所の一点や感情の原因（be surprised at）に使う。",
      ],
    },
    point: "「〜によって」は by",
    steps: [{ title: "する側を示す", body: "受動態で{{する側}}を言うときは {{by}} 〜。", back: [S1] }],
  },
  {
    ...base("loved-term", 1),
    prompt: "Many young people love this band.\n= This band is (　　) by many young people.\n空所に love を適切な形にして、英語1語で書きなさい。",
    answer: { kind: "term", accept: ["loved"], near: [{ text: "love", why: "受動態は be＋過去分詞です。love の過去分詞は loved。" }, { text: "loving", why: "-ing は進行形の形です。受動態は be＋過去分詞（loved）。" }] },
    point: "目的語を主語にして be＋過去分詞",
    steps: [{ title: "作り方", body: "目的語 this band を主語に → is＋過去分詞 {{loved}} → もとの主語は by many young people。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...base("must-be-finished", 2),
    prompt: "This report must (　　) by Friday.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["be finished", "finished", "be finishing", "been finished"],
      correct: 0,
      why: [
        "助動詞のあとは原形 be。報告書は「終えられる」側なので be finished。",
        "助動詞のあとに過去分詞だけを置くことはできない。",
        "be finishing は進行形で、報告書が何かを終えていることになる。",
        "助動詞の後ろに been を直接置くことはできない（have been なら可）。",
      ],
    },
    point: "助動詞＋be＋過去分詞",
    steps: [{ title: "be の部分だけ変わる", body: "助動詞の後ろは原形なので be。must {{be finished}}。", back: [S2] }],
  },
  {
    ...base("interested-in", 2),
    prompt: "My little brother is very interested (　　) dinosaurs.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["in", "by", "at", "with"],
      correct: 0,
      why: [
        "be interested in 〜 ＝ 〜に興味がある。決まった前置詞の in。",
        "気持ちを表す受動態では by ではなく決まった前置詞を使う。",
        "at は be surprised at（〜におどろく）などで使う。",
        "with は be covered with（〜でおおわれる）などで使う。",
      ],
    },
    point: "be interested in 〜",
    steps: [{ title: "by 以外の前置詞", body: "気持ちの受動態は前置詞が決まっています。interested {{in}}・surprised at。", back: [S3] }],
  },
  {
    ...base("being-built", 2),
    prompt: "A new library (　　) near the station now. It will open next spring.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["is being built", "is building", "has built", "was built"],
      correct: 0,
      why: [
        "今「建てられている最中」→ 進行形の受動態 is being built。",
        "is building だと図書館が何かを建てていることになる。",
        "has built も能動態で、図書館が建てたことになる。",
        "was built は過去で、now と来春の開館に合わない。",
      ],
    },
    point: "進行形の受動態 ＝ be being＋過去分詞",
    steps: [{ title: "進行形＋受動態", body: "進行形 is ＋ -ing の -ing に受動態の be を入れて {{is being built}}。", back: [S2] }],
  },
  {
    ...base("order-will-be-held", 2),
    prompt: "「その会議は来月開かれる予定だ」となるように、語句を正しい順に並べなさい。",
    answer: { kind: "order", tokens: ["The meeting", "will", "be", "held", "next month."], distractor: "is" },
    point: "will be＋過去分詞",
    steps: [{ title: "未来の受動態", body: "will の後ろは原形 be。The meeting {{will be held}} next month.", back: [S2] }],
  },
  // ---- 発展 ----
  {
    ...base("is-called", 3),
    prompt: "People in this town call the old tree \"the Guardian.\"\n= The old tree (　　) \"the Guardian\" by people in this town.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["is called", "calls", "is calling", "has called"],
      correct: 0,
      why: [
        "SVOC の O（the old tree）を主語にした受動態。C（\"the Guardian\"）は be＋過去分詞のあとにそのまま残る。",
        "calls だと木が何かを呼ぶことになる。",
        "is calling は能動態の進行形。",
        "has called も能動態。",
      ],
    },
    point: "SVOC の受動態：O が主語、C はそのまま",
    steps: [{ title: "SVOC を受動態に", body: "O を主語にして {{is called}}。C の \"the Guardian\" は動詞の{{後ろに残ります}}。", back: [S4] }],
  },
  {
    ...base("given-to", 3),
    prompt: "Our coach gave each player a new uniform.\n= A new uniform was given (　　) each player by our coach.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["to", "for", "of", "with"],
      correct: 0,
      why: [
        "SVOO で物を主語にした受動態では、人の前に前置詞を置く。give は相手に届ける動詞なので to。",
        "for は buy・make など「〜のために」の動詞で使う。",
        "of は受け取る相手を表さない。",
        "with は相手ではなく道具や様子を表す。",
      ],
    },
    point: "物が主語のとき：was given to＋人",
    steps: [{ title: "SVOO の受動態", body: "物 a new uniform を主語にすると、人の前に {{to}}（give の場合）を置きます。", back: [S4] }],
  },
  {
    ...base("made-from", 3, "思考・判断・表現"),
    prompt: "Cheese is made (　　) milk.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["from", "of", "by", "in"],
      correct: 0,
      why: [
        "チーズになると牛乳の形は見えない（原料）→ be made from。",
        "be made of は、見た目で材料がわかるとき（This desk is made of wood.）。",
        "by は作った人を表す。牛乳は作り手ではない。",
        "made in は作られた場所（国など）。",
      ],
    },
    point: "made from（原料）／made of（材料）",
    steps: [{ title: "形が見えるか", body: "牛乳の形はチーズに残らない → {{原料}} → made {{from}}。形が見えるなら made of。", back: [S3] }],
  },
  {
    ...base("order-who-by", 3),
    prompt: "「この絵はだれによって描かれたのですか」となるように、語句を正しい順に並べなさい。",
    answer: { kind: "order", tokens: ["Who", "was", "this picture", "painted", "by?"], distractor: "did" },
    point: "Who was 〜 過去分詞 by? ＝ だれによって〜されたか",
    steps: [
      { title: "疑問文の受動態", body: "be 動詞を前に出して {{was this picture painted}}。did は使いません。", back: [S2] },
      { title: "by を残す", body: "「だれによって」は by whom。話し言葉では Who を文頭に置き、{{by}} を文の最後に残します。", back: [S1] },
    ],
  },
];

export const H_ENG_GRAM_JUDO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "文法",
  minutes: 8,
  review: { status: "draft" },
  sections: [{ title: "受動態の形と使い方", lead: "次の問いに答えなさい。", style: "word", pick: 6, questions: POOL }],
};
