// 高校英語（文法）「時制」の単元模試 (B: 問題プール12問からシードで6問)。問題・例文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// プール12問 (基本4・標準4・発展4)。1回に基本2・標準2・発展2 (15×2＋17×2＋18×2＝100点)。選択肢の順もシードで変わる。A (生成) は使っていないので検算式はなし。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-gram-jisei";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "時制は「今」を基準に、動詞の形で時を示す");
const S2 = L(2, "現在形は「今この瞬間」ではなく「いつも」");
const S3 = L(3, "時・条件の副詞節では、未来のことも現在形");
const S4 = L(4, "未来の言い方は1つではない");
const S5 = L(5, "物語の時制は「語っている今」から決まる");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("water-boils", 1),
    prompt: "Water (　　) at 100 degrees Celsius.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["boils", "is boiling", "boiled", "will boil"],
      correct: 0,
      why: [
        "いつでも成り立つ事実（一般的な真理）は現在形。",
        "is boiling は「今わいている最中」。いつもの事実には使わない。",
        "過去形では「昔はそうだった」ことになる。",
        "will boil では未来のことだけになる。",
      ],
    },
    point: "いつも成り立つことは現在形",
    steps: [{ title: "現在形の意味", body: "現在形は「今この瞬間」ではなく{{いつもそうだ}}。水が100℃でわくのはいつでも成り立つ → {{boils}}。", back: [S2] }],
  },
  {
    ...base("look-swimming", 1),
    prompt: "Look! Some children (　　) in the river.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["are swimming", "swim", "swam", "will swim"],
      correct: 0,
      why: [
        "Look!（見て）とあるので、今まさにしている最中 → 現在進行形。",
        "現在形 swim は「（ふだん）泳ぐ」習慣を表す。",
        "過去形では今のことにならない。",
        "未来のことではない。",
      ],
    },
    point: "今まさに〜している ＝ be＋-ing",
    steps: [{ title: "今の最中", body: "Look! は{{今この瞬間}}のしるし → 現在進行形 {{are swimming}}。", back: [S2] }],
  },
  {
    ...base("usually-goes", 1),
    prompt: "My mother usually (　　) to work by bus.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["goes", "is going", "go", "went"],
      correct: 0,
      why: [
        "usually（ふだん）は習慣を表すので現在形。主語が三人称単数なので -es。",
        "進行形は今している最中。ふだんの習慣には現在形を使う。",
        "主語 My mother は三人称単数なので go ではなく goes。",
        "usually は今の習慣を表すので過去形は合わない。",
      ],
    },
    point: "習慣（usually・every day）は現在形",
    steps: [{ title: "習慣", body: "{{usually}} ＝ いつもの習慣 → 現在形。主語が三人称単数なので {{goes}}。", back: [S2] }],
  },
  {
    ...base("wrote-term", 1),
    prompt: "Yesterday I (　　) a long letter to my grandfather.\n空所に write を適切な形にして、英語1語で書きなさい。",
    answer: { kind: "term", accept: ["wrote"], near: [{ text: "writed", why: "write は不規則動詞です。write − wrote − written。" }, { text: "written", why: "written は過去分詞です。過去形は wrote。" }] },
    point: "write − wrote − written",
    steps: [{ title: "過去形", body: "Yesterday は{{過去}}のしるし。write の過去形は {{wrote}}。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...base("when-arrives", 2),
    prompt: "I'll call you as soon as my brother (　　) home.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["gets", "will get", "got", "has got to"],
      correct: 0,
      why: [
        "as soon as 〜（〜するとすぐに）は時の副詞節。未来のことでも現在形で表す。",
        "時の副詞節の中では will を使わない。",
        "過去形では「すでに帰った」ことになる。",
        "has got to は「〜しなければならない」の意味になる。",
      ],
    },
    point: "時・条件の副詞節は未来でも現在形",
    steps: [{ title: "副詞節の中", body: "as soon as・when・if などの{{副詞節}}では、未来のことも{{現在形}}。my brother {{gets}} home。", back: [S3] }],
  },
  {
    ...base("train-leaves", 2),
    prompt: "According to the timetable, the first train (　　) at 5:40 tomorrow morning.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["leaves", "left", "has left", "was leaving"],
      correct: 0,
      why: [
        "時刻表で決まっている予定は、未来のことでも現在形で表せる。",
        "tomorrow morning（明日の朝）なので過去形は合わない。",
        "現在完了は「もう出てしまった」の意味。",
        "過去進行形は過去のある時点のこと。",
      ],
    },
    point: "時刻表・確定した予定は現在形で未来",
    steps: [{ title: "未来の言い方", body: "時刻表のように{{決まっている}}予定は現在形 {{leaves}} で表せます。", back: [S4] }],
  },
  {
    ...base("reading-now", 2),
    prompt: "Sorry, you can't borrow this book yet. I (　　) it now.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["am reading", "read", "was reading", "have been read"],
      correct: 0,
      why: [
        "now があり、「今読んでいる途中」なので貸せない → 現在進行形。",
        "現在形 read は習慣の意味で、「今読んでいる途中」を表せない。",
        "過去進行形では今のことにならない。",
        "have been read は受け身の形で、「私が読まれている」ことになる。",
      ],
    },
    point: "今の途中の動作は進行形",
    steps: [{ title: "現在形と進行形", body: "{{now}}（今）読んでいる{{途中}} → {{am reading}}。現在形は「いつも」の意味になります。", back: [S2] }],
  },
  {
    ...base("order-going-to", 2),
    prompt: "「私たちは来週の日曜日におばを訪ねるつもりだ」となるように、語句を正しい順に並べなさい。",
    answer: { kind: "order", tokens: ["We", "are going to", "visit", "our aunt", "next Sunday."], distractor: "will" },
    point: "be going to 〜 ＝ 〜するつもりだ",
    steps: [{ title: "予定・意図", body: "前から決めている予定は {{be going to}}＋原形。We are going to visit our aunt next Sunday.", back: [S4] }],
  },
  // ---- 発展 ----
  {
    ...base("dont-know-if-will", 3, "思考・判断・表現"),
    prompt: "I don't know if Mr. Sato (　　) to the party tomorrow.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["will come", "comes", "came", "coming"],
      correct: 0,
      why: [
        "この if 節は know の目的語（〜かどうか）になる名詞節。名詞節では未来のことに will を使う。",
        "comes にするのは「もし〜なら」の副詞節のとき。ここは「来るかどうか」の名詞節。",
        "tomorrow なので過去形は合わない。",
        "動詞の形が欠けている。",
      ],
    },
    point: "名詞節の if（〜かどうか）は will を使う",
    steps: [
      { title: "節の種類", body: "if 〜 が know の{{目的語}}になっている → 「〜かどうか」の{{名詞節}}。", back: [S3] },
      { title: "時制", body: "現在形にするのは副詞節だけ。名詞節では未来をそのまま {{will come}}。", back: [S3] },
    ],
  },
  {
    ...base("soup-tastes", 3),
    prompt: "This soup (　　) a little salty.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["tastes", "is tasting", "was tasted", "tasting"],
      correct: 0,
      why: [
        "taste（〜の味がする）は状態を表す動詞で、ふつう進行形にしない。",
        "状態を表す taste は進行形にしない。（人が「味見をしている」なら進行形も可だが、主語はスープ）",
        "was tasted では「味見された」の受け身で、salty とつながらない。",
        "動詞がなく、文にならない。",
      ],
    },
    point: "状態動詞（taste・know・like）は現在形",
    steps: [{ title: "状態か動作か", body: "スープが「しょっぱい{{味がする}}」は{{状態}}。状態を表す動詞は進行形にせず {{tastes}}。", back: [S2] }],
  },
  {
    ...base("story-would-leave", 3, "思考・判断・表現"),
    prompt: "（物語の一節）Emma packed her bag. She knew that her ship (　　) early the next morning.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["would leave", "will leave", "has left", "leave"],
      correct: 0,
      why: [
        "物語は「語っている今」から見て過去。その中の「次の朝」は過去から見た未来なので will を過去にずらした would。",
        "will は「語っている今」から見た未来。物語の中の出来事には合わない。",
        "現在完了は「語っている今」とつながる形で、物語の過去の場面に合わない。",
        "主語 her ship は三人称単数で、時制も物語の過去と合わない。",
      ],
    },
    point: "過去から見た未来は would",
    steps: [{ title: "基準を決める", body: "基準は{{語っている今}}。packed・knew と過去で語る物語では、「次の朝」も過去の中の未来 → {{would}} leave。", back: [S5] }],
  },
  {
    ...base("was-listening-term", 3),
    prompt: "My father (　　) (　　) to the radio when the phone rang.\n「電話が鳴ったとき、父はラジオを聞いているところだった」となるように、空所に入る2語を書きなさい。",
    answer: { kind: "term", accept: ["was listening"], near: [{ text: "listened", why: "電話が鳴った「その時」に途中だった動作は、過去進行形 was listening で表します。" }, { text: "is listening", why: "電話が鳴ったのは過去なので、be 動詞も過去形 was にします。" }] },
    point: "過去のある時点で途中の動作は was＋-ing",
    steps: [{ title: "過去進行形", body: "rang（過去）の{{時点}}で途中だった → {{was listening}}。", back: [S1] }],
  },
];

export const H_ENG_GRAM_JISEI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "文法",
  minutes: 8,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [{ title: "時制の使い分け", lead: "次の問いに答えなさい。", style: "word", pick: 6, questions: POOL }],
};
