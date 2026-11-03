// 高校英語（文法）「文型」の単元模試 (B: 問題プール12問からシードで6問)。問題・例文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// プール12問 (基本4・標準4・発展4)。1回に基本2・標準2・発展2 (15×2＋17×2＋18×2＝100点)。選択肢の順もシードで変わる。A (生成) は使っていないので検算式はなし。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-gram-bunkei";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "まず修飾語（M）を外して、骨組みを見る");
const S2 = L(2, "5つの文型");
const S3 = L(3, "O か C か、O O か O C かは「＝」で見分ける");
const S4 = L(4, "第4文型は「to / for ＋人」で第3文型に書きかえられる");
const S5 = L(5, "同じ動詞でも、文型が変わると意味が変わる");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("slept-sv", 1),
    prompt: "The baby {{slept}} quietly in the car.\nこの文の文型として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["第1文型（SV）", "第2文型（SVC）", "第3文型（SVO）", "第4文型（SVOO）"],
      correct: 0,
      why: [
        "quietly（静かに）と in the car（車の中で）は修飾語 M。外すと The baby slept だけが残る。",
        "slept の後ろに S と「＝」になる C はない。",
        "slept の後ろに目的語 O はない。in the car は前置詞のついた M。",
        "目的語が2つ並んでいるわけではない。",
      ],
    },
    point: "M を外して残るのが S＋V だけなら第1文型",
    steps: [{ title: "M を外す", body: "副詞 quietly と前置詞のまとまり in the car は{{修飾語 M}}。残る骨組みは The baby slept ＝ {{SV}}。", back: [S1, S2] }],
  },
  {
    ...base("became-svc", 1),
    prompt: "My cousin {{became}} a nurse last year.\nこの文の文型として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["第2文型（SVC）", "第1文型（SV）", "第3文型（SVO）", "第5文型（SVOC）"],
      correct: 0,
      why: [
        "My cousin ＝ a nurse の関係が成り立つので、a nurse は補語 C。",
        "a nurse は文に欠かせない要素で、M ではない。",
        "O なら S と「＝」にならない。いとこ＝看護師なので C。",
        "became の後ろは a nurse の1つだけ。O と C の2つはない。",
      ],
    },
    point: "S＝C が成り立てば第2文型",
    steps: [{ title: "「＝」を確かめる", body: "last year は M。My cousin {{＝}} a nurse が成り立つので a nurse は {{C}}。SVC です。", back: [S3] }],
  },
  {
    ...base("there-is", 1),
    prompt: "There {{is}} a small café next to the post office.\nこの文の文型として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["第1文型（SV）", "第2文型（SVC）", "第3文型（SVO）", "第4文型（SVOO）"],
      correct: 0,
      why: [
        "There is 〜 の文は、〜（a small café）が S、is が V。next to the post office は M なので SV。",
        "a small café は is の後ろにあるが、C ではなく主語 S。",
        "be 動詞は目的語をとらない。",
        "目的語は1つもない。",
      ],
    },
    point: "There is 〜 は「〜が S」の第1文型",
    steps: [{ title: "S を見つける", body: "There は形だけの語。主語は {{a small café}}、動詞は is。場所を表す next to 〜 は M なので{{第1文型}}です。", back: [S1, S2] }],
  },
  {
    ...base("made-happy", 1),
    prompt: "The letter made my grandmother {{happy}}.\nこの文の happy の働きとして最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["補語（C）", "目的語（O）", "主語（S）", "修飾語（M）"],
      correct: 0,
      why: [
        "my grandmother ＝ happy（祖母がうれしい）の関係になるので、O を説明する C。",
        "目的語は my grandmother。happy は形容詞で O にはならない。",
        "主語は The letter。",
        "happy を外すと「手紙が祖母を作った」となり意味が成り立たない。文に欠かせないので M ではない。",
      ],
    },
    point: "O＝C の関係なら第5文型の C",
    steps: [{ title: "O と C の関係", body: "my grandmother {{＝}} happy が成り立つので happy は {{C}}。make O C で「O を C にする」。", back: [S3] }],
  },
  // ---- 標準 ----
  {
    ...base("svoc-named", 2),
    prompt: "次のうち、第5文型（SVOC）の文はどれですか。",
    answer: {
      kind: "choice",
      options: ["We named the kitten Mochi.", "She bought her son a jacket.", "He found the key under the mat.", "The soup smells good."],
      correct: 0,
      why: [
        "the kitten ＝ Mochi（子ねこ＝モチ）なので O＋C。SVOC。",
        "her son ≠ a jacket。目的語が2つの SVOO。",
        "under the mat は M。the key だけが O の SVO。",
        "The soup ＝ good の SVC。",
      ],
    },
    point: "O の後ろが O と「＝」なら SVOC、「≠」なら SVOO",
    steps: [{ title: "後ろの2つを比べる", body: "動詞の後ろに名詞が2つあるとき、{{O＝C}}なら第5文型、{{O≠O}}なら第4文型。", back: [S3] }],
  },
  {
    ...base("buy-for", 2),
    prompt: "第4文型（SVOO）を第3文型（SVO）に書きかえるとき、人の前に {{for}} を置く動詞はどれですか。",
    answer: {
      kind: "choice",
      options: ["buy", "give", "show", "send"],
      correct: 0,
      why: [
        "buy は「（相手のために）買ってあげる」。相手がいなくても成り立つ動作なので for。",
        "give は相手に届けるのが前提の動作なので to。",
        "show も相手に向かう動作なので to。",
        "send も相手に届ける動作なので to。",
      ],
    },
    point: "相手に届ける動詞は to、相手のためにする動詞は for",
    steps: [{ title: "to か for か", body: "give・show・send・teach は{{to}}。buy・make・cook・find は{{for}}（〜のために）。", back: [S4] }],
  },
  {
    ...base("order-song-sad", 2),
    prompt: "「その歌を聞くと、私はいつも悲しくなる（その歌はいつも私を悲しくさせる）」となるように、語句を正しい順に並べなさい。",
    answer: { kind: "order", tokens: ["That song", "always", "makes", "me", "sad."], distractor: "to" },
    point: "make O C ＝ O を C にする",
    steps: [
      { title: "文型を決める", body: "「私を悲しくさせる」は me ＝ sad なので {{SVOC}}。make me sad。", back: [S3] },
      { title: "頻度の副詞", body: "always は一般動詞の{{前}}に置きます。That song always makes me sad.", back: [S1] },
    ],
  },
  {
    ...base("found-easy", 2, "思考・判断・表現"),
    prompt: "I found the new textbook {{easy}}.\nこの文の意味として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["新しい教科書は易しいとわかった。", "新しい教科書を簡単に見つけた。", "新しい教科書を易しくした。", "易しい新しい教科書を見つけた。"],
      correct: 0,
      why: [
        "the new textbook ＝ easy の SVOC。find O C は「O が C だとわかる」。",
        "「簡単に見つけた」なら副詞 easily を使い、SVO＋M になる。",
        "「O を C にする」は make。find にその意味はない。",
        "「易しい教科書」なら easy は名詞の前（an easy new textbook）に置く。",
      ],
    },
    point: "find O C ＝ O が C だとわかる",
    steps: [{ title: "文型で意味が決まる", body: "find O は「O を見つける」、find {{O C}} は「O が C だと{{わかる}}」。easy は形容詞なので C。", back: [S5] }],
  },
  // ---- 発展 ----
  {
    ...base("odd-one-out", 3, "思考・判断・表現"),
    prompt: "次のうち、文型がほかの3つとちがうものはどれですか。",
    answer: {
      kind: "choice",
      options: ["He left the room quietly.", "They kept the room warm.", "The noise drove him crazy.", "We painted the fence white."],
      correct: 0,
      why: [
        "quietly は動詞を説明する副詞で M。the room だけが O の第3文型。",
        "the room ＝ warm の SVOC。",
        "him ＝ crazy の SVOC。",
        "the fence ＝ white の SVOC。",
      ],
    },
    point: "形容詞は C、副詞は M",
    steps: [{ title: "O の後ろの語の品詞", body: "warm・crazy・white は{{形容詞}}で O を説明する C。quietly は{{副詞}}で M なので、第3文型です。", back: [S1, S3] }],
  },
  {
    ...base("find-for", 3),
    prompt: "My uncle found me a good seat.\n= My uncle found a good seat (　　) me.\n空所に入る英語1語を書きなさい。",
    answer: { kind: "term", accept: ["for"], near: [{ text: "to", why: "find は「相手のために見つけてあげる」動作なので、to ではなく for を使います。" }] },
    point: "find 人 物 → find 物 for 人",
    steps: [{ title: "書きかえの前置詞", body: "find は buy・make と同じく「〜の{{ために}}」の動作。found a good seat {{for}} me。", back: [S4] }],
  },
  {
    ...base("back-row-look", 3, "思考・判断・表現"),
    prompt: "The students in the back row of the classroom {{look}} sleepy this morning.\nこの文の文型として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["第2文型（SVC）", "第1文型（SV）", "第3文型（SVO）", "第5文型（SVOC）"],
      correct: 0,
      why: [
        "in the back row of the classroom と this morning は M。The students ＝ sleepy で SVC。",
        "sleepy は文に欠かせない補語。外すと意味が成り立たない。",
        "sleepy は形容詞で、目的語にはならない。",
        "look の後ろは sleepy の1つだけ。",
      ],
    },
    point: "長い主語も M をくくれば骨組みが見える",
    steps: [
      { title: "M をくくる", body: "(in the back row of the classroom) と (this morning) をくくると {{The students look sleepy}}。", back: [S1] },
      { title: "「＝」を見る", body: "students {{＝}} sleepy なので C。look C は「C に見える」の{{第2文型}}。", back: [S3] },
    ],
  },
  {
    ...base("order-what-made", 3),
    prompt: "「どうしてあなたはそんなに怒ったのですか（何があなたをそんなに怒らせたのですか）」となるように、語を正しい順に並べなさい。",
    answer: { kind: "order", tokens: ["What", "made", "you", "so", "angry?"], distractor: "did" },
    point: "無生物主語＋make O C で「なぜ」を表す",
    steps: [
      { title: "主語を物にする", body: "「何が」を主語 {{What}} にして、make O C（O を C にする）。", back: [S3] },
      { title: "疑問詞が主語", body: "What が主語なので {{did}} は使わない。What made you so angry?", back: [S2] },
    ],
  },
];

export const H_ENG_GRAM_BUNKEI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "文法",
  minutes: 8,
  review: { status: "draft" },
  sections: [{ title: "文型の見分け", lead: "次の問いに答えなさい。", style: "word", pick: 6, questions: POOL }],
};
