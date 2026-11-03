// 高校英語（文法）「否定・倒置・強調・省略」の単元模試 (B: 問題プールからシードで選ぶ)。問題・例文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// 節1 語法 (プール12問: 基本4・標準4・発展4) から5問 (基本2・標準2・発展1)、
// 節2 並べかえ (プール4問: 基本2・標準2) から2問 (基本1・標準1)。1回7問・100点 (13×3＋15×3＋16＝100)。
// A (生成) は使っていないので数値の検算はなし。choice・term・order の正答は check-moshi が採点器で満点になるか確かめる。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-gram-tokushu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "部分否定と全体否定");
const S2 = L(2, "否定語が文頭に出ると、疑問文の語順になる");
const S3 = L(3, "It is 〜 that … の強調構文");
const S4 = L(4, "省略：言わなくてもわかる語は省く");

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
    ...base("not-every", 1, "思考・判断・表現"),
    prompt: "Not every member of the club agreed with the plan.\nこの文の意味として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["部員の全員がその計画に賛成したわけではない", "部員はだれもその計画に賛成しなかった", "部員の全員がその計画に賛成した", "部員の1人だけがその計画に賛成した"],
      correct: 0,
      why: [
        "not ＋ every は部分否定。賛成した人も、しなかった人もいる。",
        "「だれも〜ない」は全体否定で、No member agreed … などで表す。",
        "not があるので「全員が賛成した」にはならない。",
        "部分否定は人数を「1人だけ」と決めない。",
      ],
    },
    point: "not ＋ every ＝全部が〜とは限らない",
    steps: [{ title: "not がどこまで", body: "not が every を打ち消すので「{{全員が〜というわけではない}}」（部分否定）。", back: [S1] }],
  },
  {
    ...base("it-was-that", 1),
    prompt: `It was my grandfather (　　) taught me how to fish.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["that", "what", "which", "when"],
      correct: 0,
      why: [
        "It was 〜 that … の強調構文。「釣りを教えてくれたのは祖父だった」。人なら who も使える。",
        "what は先行詞をふくむので、強調構文の枠には使わない。",
        "which は人以外のとき。祖父は人。",
        "when は時を表す語で、ここでは主語の穴をうめられない。",
      ],
    },
    point: "It was ＋強調したい語＋ that …",
    steps: [{ title: "強調構文の枠", body: "強めたい my grandfather を {{It was}} と {{that}} ではさんだ形。It was と that を取ると元の文にもどります。", back: [S3] }],
  },
  {
    ...base("neither-do-i", 1),
    prompt: `"I don't like horror movies." "Neither (　　) I."\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["do", "am", "don't", "like"],
      correct: 0,
      why: [
        "否定の語 Neither を前に出すと、疑問文の語順（do ＋主語）になる。前の文が一般動詞なので do。",
        "前の文は一般動詞 like の文なので am は合わない。",
        "Neither に否定の意味があるので don't は重ならない。",
        "動詞をそのまま置く形ではない。",
      ],
    },
    point: "Neither do I ＝私も〜ない",
    steps: [{ title: "否定語＋倒置", body: "{{Neither}} を文頭に出し、一般動詞の文なので {{do}} を主語の前に。", back: [S2] }],
  },
  {
    ...base("none-were", 1, "思考・判断・表現"),
    prompt: "None of the students forgot their homework today.\nこの文の意味として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["今日は宿題を忘れた生徒は1人もいなかった", "今日は全員が宿題を忘れたわけではない", "今日は何人かの生徒が宿題を忘れた", "今日は全員が宿題を忘れた"],
      correct: 0,
      why: [
        "none は「1人も〜ない」という全体否定。",
        "「全員が〜とは限らない」は部分否定（Not all …）の意味。",
        "none なので1人も忘れていない。",
        "none は否定なので「全員が忘れた」にはならない。",
      ],
    },
    point: "none ＝1つも（1人も）〜ない",
    steps: [{ title: "全体否定", body: "{{none}}・no・never・neither は「1つも〜ない」という{{全体否定}}を作ります。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...base("never-have-i", 2),
    prompt: `Never (　　) such a beautiful starry sky.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["have I seen", "I have seen", "I saw", "did I saw"],
      correct: 0,
      why: [
        "否定語 Never が文頭に出たので、疑問文の語順 have ＋主語＋過去分詞。",
        "否定語が文頭なのに、ふつうの語順のまま。",
        "否定語が文頭なのに、ふつうの語順のまま。",
        "did のあとは原形（did I see）。",
      ],
    },
    point: "Never ＋疑問文の語順",
    steps: [{ title: "倒置", body: "I have never seen … の {{never}} を前に出すと、have を主語の前へ。{{Never have I seen}} …。", back: [S2] }],
  },
  {
    ...base("it-was-place", 2),
    prompt: `It was in this small café (　　) the famous novel was written.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["that", "where", "which", "what"],
      correct: 0,
      why: [
        "In this small café（副詞句）を It was と that ではさんだ強調構文。",
        "前置詞 in があるので where は重なる。It was 〜 that の枠では that を使う。",
        "which は前置詞をふくむ副詞句を受けられない。",
        "what は強調構文の枠には使わない。",
      ],
    },
    point: "副詞句の強調も It was 〜 that",
    steps: [{ title: "元の文にもどす", body: "It was と {{that}} を取ると The famous novel was written in this small café. 元の文にもどるので{{強調構文}}。", back: [S3] }],
  },
  {
    ...base("little-did", 2),
    prompt: `Little (　　) he know that his friends were planning a surprise party.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["did", "does", "was", "had"],
      correct: 0,
      why: [
        "否定の Little が文頭で倒置。know は一般動詞、話は過去なので did ＋主語＋原形。",
        "were planning（過去）と合わない。",
        "know は一般動詞なので be動詞は使わない。",
        "had のあとは過去分詞（known）が必要。",
      ],
    },
    point: "Little did S know ＝ Sは少しも知らなかった",
    steps: [{ title: "倒置", body: "{{Little}}（少しも〜ない）が文頭。一般動詞の過去の文なので {{did}} he know。", back: [S2] }],
  },
  {
    ...base("if-necessary", 2),
    prompt: `Please bring your own lunch if (　　).\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["necessary", "necessarily", "necessity", "need"],
      correct: 0,
      why: [
        "if (it is) necessary の it is が省略された形。be動詞のあとに置く形容詞 necessary。",
        "necessarily は副詞（必ず）。",
        "necessity は名詞（必要）。it is a necessity なら a が必要で、if necessity とは言わない。",
        "need は動詞・名詞。省略されているのは it is なので、be動詞のあとに置く形容詞が必要。",
      ],
    },
    point: "if necessary ＝ if it is necessary",
    steps: [{ title: "主語＋be動詞の省略", body: "if (it is) {{necessary}}。言わなくても分かる {{it is}} が省かれています。", back: [S4] }],
  },
  // ---- 発展 ----
  {
    ...base("not-until", 3),
    prompt: `Not until she got home (　　) she had left her umbrella on the train.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["did she realize", "she realized", "she did realize", "had she realized"],
      correct: 0,
      why: [
        "Not until 〜 が文頭に出ると、主の文が倒置（did ＋主語＋原形）になる。",
        "倒置していない。",
        "did が主語のあと。倒置にならない。",
        "気づいたのは家に着いた時点。had を使うと時がずれる。",
      ],
    },
    point: "Not until 〜 did S V ＝〜して初めてSはVした",
    steps: [{ title: "倒置するのは後ろ", body: "{{Not until she got home}} が否定語句のかたまり。後ろの主の文を {{did she realize}} と倒置します。", back: [S2] }],
  },
  {
    ...base("either-meaning", 3, "思考・判断・表現"),
    prompt: "I have two cousins, but I don't know either of them very well.\nこの文の意味として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["2人のいとこのどちらのこともよく知らない", "2人のいとこの両方をよく知っているわけではない（片方は知っている）", "2人のいとこの片方だけをよく知らない", "2人のいとこの両方をよく知っている"],
      correct: 0,
      why: [
        "not … either ＝ neither。「どちらも〜ない」という全体否定。",
        "片方は知っている、という部分否定は not … both で表す。",
        "not … either は2人とも否定する。",
        "not があるので「両方よく知っている」にはならない。",
      ],
    },
    point: "not either ＝どちらも〜ない／not both ＝両方とは限らない",
    steps: [{ title: "2つのときの否定", body: "2つのうち、{{not … either}}（＝ neither）は全体否定、{{not … both}} は部分否定です。", back: [S1] }],
  },
  {
    ...base("not-until-that", 3),
    prompt: `It was not until the last minute (　　) our team scored a goal.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["that", "when", "which", "what"],
      correct: 0,
      why: [
        "It was not until 〜 that … ＝「〜になって初めて…した」。強調構文の that。",
        "when は使わない。It was 〜 that の枠。",
        "which は強調構文の枠には使わない。",
        "what は先行詞をふくむので使えない。",
      ],
    },
    point: "It was not until 〜 that … ＝〜して初めて…",
    steps: [{ title: "強調構文", body: "not until the last minute を {{It was}} 〜 {{that}} ではさんだ形。最後の1分になって初めて得点した。", back: [S3] }],
  },
  {
    ...base("omitted-went", 3),
    prompt: "次の文の後半には、くり返しをさけるために動詞が1語省略されています。省略されている語を英語1語で書きなさい。\nSome of us went by bike, and others by bus.",
    answer: { kind: "term", accept: ["went"], near: [{ text: "go", why: "前半と同じ形がくり返されるので、過去形の went です。" }] },
    point: "前と同じ語は省ける（others went by bus）",
    steps: [{ title: "くり返しの省略", body: "後半は others ({{went}}) by bus。前半と同じ動詞は{{言わなくてもわかる}}ので省かれます。", back: [S4] }],
  },
];

const ORDER: QuestionB[] = [
  // ---- 基本 ----
  {
    ...ord("narabe-it-was-ken", 1),
    prompt: `${NARABE}\n「私が駅で会ったのはケンでした。」`,
    answer: { kind: "order", tokens: ["It", "was", "Ken", "that", "I", "met", "at the station."], distractor: "what" },
    point: "It was ＋強調する語＋ that …",
    steps: [{ title: "強調構文", body: "強調したい {{Ken}} を It was と that ではさみ、残りの I met at the station を続けます。", back: [S3] }],
  },
  {
    ...ord("narabe-not-always", 1),
    prompt: `${NARABE}\n「高い値段のものが必ずしも良いとは限らない。」`,
    answer: { kind: "order", tokens: ["Expensive things", "are", "not", "always", "good."], distractor: "never" },
    point: "not always ＝いつも〜とは限らない",
    steps: [{ title: "部分否定", body: "{{not always}} で「必ずしも〜とは限らない」。never にすると「決して〜ない」の全体否定になります。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...ord("narabe-never-have-i", 2),
    prompt: `${NARABE}\n「私はこんなにおいしいカレーを一度も食べたことがない。」`,
    answer: { kind: "order", tokens: ["Never", "have", "I", "eaten", "such", "delicious curry."], distractor: "did" },
    point: "Never have I ＋過去分詞",
    steps: [{ title: "倒置", body: "否定語 {{Never}} を文頭に出したので、have を主語 I の前に置きます。", back: [S2] }],
  },
  {
    ...ord("narabe-when-child", 2),
    prompt: `${NARABE}\n「子どものころ、彼は大阪に住んでいた。」`,
    answer: { kind: "order", tokens: ["When", "a child,", "he", "lived", "in Osaka."], distractor: "was" },
    point: "When (he was) a child",
    steps: [{ title: "主語＋be動詞の省略", body: "主の文と主語が同じなので、When ({{he was}}) a child と主語＋be動詞をまとめて省けます。", back: [S4] }],
  },
];

export const H_ENG_GRAM_TOKUSHU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "文法",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "否定・倒置・強調・省略", lead: "次の問いに答えなさい。", style: "word", pick: 5, questions: FORMS },
    { title: "並べかえ", lead: "日本語に合うように、語（語句）を並べかえなさい。文の最初の語は大文字で始めてあります。", style: "word", pick: 2, questions: ORDER },
  ],
};
