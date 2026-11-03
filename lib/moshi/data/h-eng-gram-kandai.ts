// 高校英語（文法）「関係代名詞」の単元模試 (B: 問題プールからシードで選ぶ)。問題・例文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// 節1 語法 (プール12問: 基本4・標準4・発展4) から5問 (基本2・標準2・発展1)、
// 節2 並べかえ (プール4問: 基本2・標準2) から2問 (基本1・標準1)。1回7問・100点 (13×3＋15×3＋16＝100)。
// A (生成) は使っていないので数値の検算はなし。choice・term・order の正答は check-moshi が採点器で満点になるか確かめる。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-gram-kandai";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "2つの文を、名詞のところでつなぐ");
const S2 = L(2, "先行詞と「格」で、使う語が決まる");
const S3 = L(3, "後ろの文の「穴」を見て格を決める");
const S4 = L(4, "what と、コンマのある非制限用法");

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
    ...base("who-violin", 1),
    prompt: `I have a friend (　　) plays the violin beautifully.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["who", "which", "whose", "what"],
      correct: 0,
      why: [
        "先行詞 a friend は人。すぐ後ろに動詞 plays が来るので主格の who。",
        "which は先行詞が人以外のとき。",
        "whose は後ろに名詞が続き「その人の〜」となるとき。plays の前に名詞がない。",
        "what は先行詞をふくむので、前に名詞 a friend があると使えない。",
      ],
    },
    point: "人が先行詞・後ろに動詞 → 主格 who",
    steps: [{ title: "先行詞と穴", body: "先行詞は人（a friend）。後ろは plays … で{{主語が欠けている}}ので主格の {{who}}。", back: [S2, S3] }],
  },
  {
    ...base("which-bag", 1),
    prompt: `This is the umbrella (　　) my grandmother gave me last spring.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["which", "who", "whose", "what"],
      correct: 0,
      why: [
        "先行詞 the umbrella は物。gave me の後ろに「何を」が欠けているので目的格の which。",
        "who は先行詞が人のとき。",
        "whose の後ろには名詞が来る。my grandmother は gave の主語で、whose 〜 の形ではない。",
        "what は先行詞をふくむので、前に the umbrella があると使えない。",
      ],
    },
    point: "物が先行詞・目的語が欠ける → which",
    steps: [{ title: "目的語の穴", body: "my grandmother gave me ＿ で{{「何を」が欠けている}}。先行詞は物なので目的格の {{which}}。", back: [S2, S3] }],
  },
  {
    ...base("whose-father", 1),
    prompt: `I know a boy (　　) father runs a ramen shop.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["whose", "who", "which", "whom"],
      correct: 0,
      why: [
        "「その少年の父親が」とつなぐので所有格の whose。後ろに名詞 father が続く。",
        "who だと father runs … との間に「〜の」の関係が表せない。",
        "which は先行詞が人以外。",
        "whom は目的格。後ろの文 father runs a ramen shop には目的語の欠けがない。",
      ],
    },
    point: "whose ＋名詞 ＝「その〜の…」",
    steps: [{ title: "所有格", body: "His father runs a ramen shop. の His が{{whose}}に変わった形。whose の後ろには{{名詞}}が続きます。", back: [S1, S2] }],
  },
  {
    ...base("what-want", 1),
    prompt: "日本語に合うように空所に入る英語1語を書きなさい。\n「あなたが誕生日にほしいものを教えて。」\nTell me (　　) you want for your birthday.",
    answer: { kind: "term", accept: ["what"], near: [{ text: "which", why: "which は前に先行詞が必要です。先行詞をふくんで「〜もの」となるのは what。" }, { text: "that", why: "that も前に先行詞が必要です。「〜するもの」は what。" }] },
    point: "what ＝ the thing(s) which",
    steps: [{ title: "先行詞をふくむ what", body: "Tell me のあとに先行詞がありません。「〜するもの」は先行詞をふくむ {{what}}。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...base("not-which-man", 2),
    prompt: "The woman (　　) I met at the library was a writer.\n空所に入れることが{{できない}}ものはどれですか。",
    answer: {
      kind: "choice",
      options: ["which", "who", "whom", "that"],
      correct: 0,
      why: [
        "先行詞 the woman は人なので which は使えない。",
        "目的格でも、話し言葉では who を使うことが多い。入れられる。",
        "目的格の正式な形。入れられる。",
        "that は人にも物にも使える。入れられる。",
      ],
    },
    point: "which は人の先行詞には使えない",
    steps: [{ title: "先行詞が人", body: "I met ＿ で目的語が欠けた目的格。先行詞が人なので {{whom・who・that}} は使えますが、{{which}} は使えません。", back: [S2] }],
  },
  {
    ...base("which-visited", 2),
    prompt: `Nara is the city (　　) we visited on our school trip.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["which", "where", "what", "whose"],
      correct: 0,
      why: [
        "visited の目的語（どこを）が欠けているので、目的格の関係代名詞 which。",
        "where は後ろが欠けのない文のとき。visit は目的語をとる動詞なので穴がある。",
        "what は先行詞をふくむので the city のあとには置けない。",
        "whose の後ろには名詞が来る。",
      ],
    },
    point: "visit の後ろの穴 → which",
    steps: [{ title: "穴をさがす", body: "we visited ＿ で{{目的語が欠けている}}。場所の名詞でも、穴があれば関係代名詞 {{which}} です。", back: [S3] }],
  },
  {
    ...base("comma-who", 2),
    prompt: `My cousin, (　　) lives in Sapporo, sent me some potatoes.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["who", "that", "which", "what"],
      correct: 0,
      why: [
        "コンマのある非制限用法で、先行詞は人。主格の who。",
        "that はコンマのある非制限用法では使えない。",
        "which は先行詞が人以外のとき。",
        "what は先行詞をふくむので、名詞のあとに置けない。",
      ],
    },
    point: "非制限用法に that は使えない",
    steps: [{ title: "コンマの後ろ", body: "コンマのあとで「ちなみにその人は〜」と足す{{非制限用法}}。人なので {{who}}。that はこの形では使いません。", back: [S4] }],
  },
  {
    ...base("comma-meaning", 2, "思考・判断・表現"),
    prompt: "I have two sisters, who work as nurses.\nこの文から分かることとして最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["姉妹は2人だけで、2人とも看護師である", "姉妹は3人以上いて、そのうち看護師なのが2人である", "看護師をしている姉妹がいるかどうかは分からない", "姉妹のうち1人だけが看護師である"],
      correct: 0,
      why: [
        "コンマがあるので「姉妹が2人いて、ちなみに2人とも看護師だ」と説明を足している。",
        "そう読めるのはコンマのない制限用法（two sisters who work as nurses）のとき。",
        "who work as nurses で看護師だと述べている。",
        "work は複数の主語に合う形で、2人ともを説明している。",
      ],
    },
    point: "コンマあり ＝ 説明を足すだけ（しぼりこまない）",
    steps: [
      { title: "コンマの有無", body: "コンマのある{{非制限用法}}は、先行詞をしぼりこまず「ちなみに」と説明を足します。", back: [S4] },
      { title: "読み取る", body: "姉妹は{{2人だけ}}。その2人が看護師です。", back: [S4] },
    ],
  },
  // ---- 発展 ----
  {
    ...base("which-clause", 3),
    prompt: `He said he had cleaned his room, (　　) was not true.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["which", "that", "what", "who"],
      correct: 0,
      why: [
        "コンマのあとの which は、前の文の内容（部屋を掃除したと言ったこと）を受けられる。",
        "that は非制限用法では使えない。",
        "what は先行詞をふくむので、コンマのあとで前の内容を受けることはできない。",
        "who は人を受ける。前にあるのは文の内容。",
      ],
    },
    point: ", which は前の文の内容も受けられる",
    steps: [{ title: "何を受けるか", body: "「本当ではなかった」のは{{彼が言ったことの内容}}。非制限用法の {{which}} は前の文全体を受けられます。", back: [S4] }],
  },
  {
    ...base("prep-whom", 3),
    prompt: `The teacher with (　　) I talked after class gave me good advice.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["whom", "who", "that", "which"],
      correct: 0,
      why: [
        "前置詞のすぐ後ろに来る、人の関係代名詞は whom。",
        "who は前置詞の直後には置けない。",
        "that は前置詞の直後には置けない。",
        "先行詞 the teacher は人なので which は使えない。",
      ],
    },
    point: "前置詞＋ whom ／前置詞＋ which",
    steps: [{ title: "前置詞が前に出た形", body: "I talked with the teacher. の with が前に出た形。前置詞の直後は {{whom}}（人）か {{which}}（物）だけで、who・that は置けません。", back: [S2, S3] }],
  },
  {
    ...base("what-subject", 3),
    prompt: `(　　) matters most is to keep practicing every day.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["What", "That", "Which", "It"],
      correct: 0,
      why: [
        "「いちばん大切なこと」を表す先行詞をふくむ what。What matters most が文の主語になる。",
        "That matters most …… は that に先行詞がなく文にならない。",
        "Which は先行詞が必要（疑問詞としても意味が合わない）。",
        "It matters most is …… は動詞が2つ重なり文にならない。",
      ],
    },
    point: "What ＋動詞 … が文の主語になる",
    steps: [{ title: "主語のかたまり", body: "{{What matters most}}（いちばん大切なこと）までが主語、is が文の動詞です。", back: [S4] }],
  },
  {
    ...base("wrong-double", 3, "思考・判断・表現"),
    prompt: "次の英文のうち、文法的に{{誤っている}}ものはどれですか。",
    answer: {
      kind: "choice",
      options: ["This is the song which I listened to it every morning.", "The girl who is waving at us is my sister.", "The cake I made yesterday was too sweet.", "Everything that she told me was true."],
      correct: 0,
      why: [
        "which が listened to の目的語の役目をしているのに、it も残っていて目的語が重なっている。it を消す。",
        "主格の who。正しい。",
        "目的格の関係代名詞が省略されている。正しい。",
        "先行詞に every などがつくと that が好まれる。正しい。",
      ],
    },
    point: "関係代名詞が穴をうめる。代名詞を残さない",
    steps: [{ title: "穴は1つ", body: "関係代名詞は後ろの文の{{穴}}の役目をします。listened to のあとに {{it}} を残すと目的語が2つになります。", back: [S1, S3] }],
  },
];

const ORDER: QuestionB[] = [
  // ---- 基本 ----
  {
    ...ord("narabe-friend-speaks", 1),
    prompt: `${NARABE}\n「私には中国語を上手に話す友だちがいます。」`,
    answer: { kind: "order", tokens: ["I", "have", "a friend", "who", "speaks", "Chinese", "well."], distractor: "which" },
    point: "先行詞のすぐ後ろに who ＋動詞",
    steps: [{ title: "後ろから説明", body: "I have a friend のあとに {{who speaks Chinese well}}（中国語を上手に話す）を続けます。人なので which は使いません。", back: [S1, S2] }],
  },
  {
    ...ord("narabe-book-read", 1),
    prompt: `${NARABE}\n「これは私が先週読んだ小説です。」`,
    answer: { kind: "order", tokens: ["This", "is", "the novel", "which", "I", "read", "last week."], distractor: "who" },
    point: "物の先行詞 ＋ which ＋主語＋動詞",
    steps: [{ title: "目的格", body: "the novel のあとに {{which I read last week}}。read の目的語が欠けているので目的格の which です。", back: [S2, S3] }],
  },
  // ---- 標準 ----
  {
    ...ord("narabe-what-said", 2),
    prompt: `${NARABE}\n「彼が言ったことは私をおどろかせた。」`,
    answer: { kind: "order", tokens: ["What", "he", "said", "surprised", "me."], distractor: "That" },
    point: "What he said ＝「彼が言ったこと」",
    steps: [{ title: "主語を作る", body: "{{What he said}} が主語のかたまり。そのあとに動詞 surprised me を続けます。", back: [S4] }],
  },
  {
    ...ord("narabe-company-for", 2),
    prompt: `${NARABE}\n「私の兄が働いている会社は横浜にあります。」`,
    answer: { kind: "order", tokens: ["The company", "which", "my brother", "works", "for", "is", "in Yokohama."], alsoOk: [[0, 4, 1, 2, 3, 5, 6]], distractor: "who" },
    point: "work for ＋会社。for は前にも出せる",
    steps: [
      { title: "前置詞の穴", body: "my brother works for ＿ で for の目的語が欠けているので {{which}}。", back: [S3] },
      { title: "前置詞を前に", body: "The company {{for which}} my brother works is in Yokohama. と for を which の前に出しても正しい文です。", back: [S2] },
    ],
  },
];

export const H_ENG_GRAM_KANDAI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "文法",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "関係代名詞の使い分け", lead: "次の問いに答えなさい。", style: "word", pick: 5, questions: FORMS },
    { title: "並べかえ", lead: "日本語に合うように、語（語句）を並べかえなさい。文の最初の語は大文字で始めてあります。", style: "word", pick: 2, questions: ORDER },
  ],
};
