// 高校英語（文法）「完了形」の単元模試 (B: 問題プールからシードで選ぶ)。問題・例文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// 節1 語法 (プール12問: 基本4・標準4・発展4) から5問 (基本2・標準2・発展1)、
// 節2 並べかえ (プール4問: 基本2・標準2) から2問 (基本1・標準1)。1回7問・100点 (13×3＋15×3＋16＝100)。
// A (生成) は使っていないので数値の検算はなし。choice・term・order の正答は check-moshi が採点器で満点になるか確かめる。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-gram-kanryo";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "現在完了は「過去から今まで」を線で見る");
const S2 = L(2, "用法は3つ：完了・経験・継続");
const S3 = L(3, "はっきりした過去の語とはいっしょに使えない");
const S4 = L(4, "過去完了・未来完了は「基準点」をずらすだけ");

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
    ...base("lived-since", 1),
    prompt: `My family (　　) in this apartment since 2018.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["has lived", "lived", "lives", "is living"],
      correct: 0,
      why: [
        "since 2018（2018年から今まで）は過去から今までの線。現在完了の継続。",
        "過去形は過去の一点だけを言い、「今まで」を表せない。",
        "現在形では since 〜 の「〜から今まで」を表せない。",
        "現在進行形も since 〜 と合わない。",
      ],
    },
    point: "since 〜 ＋現在完了＝継続",
    steps: [{ title: "線で見る", body: "since 2018 は{{過去から今まで}}の線。have ＋過去分詞の {{has lived}}。", back: [S1, S2] }],
  },
  {
    ...base("ever-been", 1),
    prompt: `Have you ever (　　) to Okinawa?\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["been", "gone", "went", "go"],
      correct: 0,
      why: [
        "「〜へ行ったことがある」（経験）は have been to 〜。",
        "have gone to 〜 はふつう「行ってしまって今ここにいない」の意味。",
        "went は過去形。have のあとは過去分詞。",
        "go は原形。have のあとは過去分詞。",
      ],
    },
    point: "経験「行ったことがある」＝ have been to",
    steps: [{ title: "経験用法", body: "ever（これまでに）は{{経験}}の目じるし。「行ったことがある」は {{have been to}}。", back: [S2] }],
  },
  {
    ...base("just-finished", 1),
    prompt: `The concert has just (　　).\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["started", "start", "starting", "starts"],
      correct: 0,
      why: ["has のあとは過去分詞。just（ちょうど）で完了の用法。", "原形は has のあとに置けない。", "-ing は進行形の形。", "3人称単数現在の形。"],
    },
    point: "has just ＋過去分詞＝ちょうど〜したところ",
    steps: [{ title: "完了用法", body: "{{just}} は完了の目じるし。has のあとに過去分詞 {{started}}。", back: [S2] }],
  },
  {
    ...base("for-years", 1),
    prompt: `I have known Yuki (　　) ten years.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["for", "since", "ago", "during"],
      correct: 0,
      why: [
        "ten years は期間の長さ。「〜の間」は for。",
        "since の後ろには始まりの時点が来る（since 2015 など）。",
        "ago は過去形と使い、現在完了とは使えない。",
        "during の後ろには the summer など特定の期間が来る。",
      ],
    },
    point: "for ＋期間／since ＋起点",
    steps: [{ title: "期間か起点か", body: "ten years は{{期間の長さ}}なので {{for}}。始まりの時点なら since。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...base("wrong-yesterday", 2, "思考・判断・表現"),
    prompt: "次の英文のうち、文法的に{{誤っている}}ものはどれですか。",
    answer: {
      kind: "choice",
      options: ["I have lost my wallet last night.", "I lost my wallet last night.", "I have lost my wallet.", "I haven't found my wallet yet."],
      correct: 0,
      why: [
        "last night ははっきりした過去の時点。現在完了とはいっしょに使えない。過去形 lost にする。",
        "過去形と last night。正しい。",
        "なくして今もない（完了・結果）。正しい。",
        "yet は否定文の現在完了で「まだ」。正しい。",
      ],
    },
    point: "last night・yesterday・ago は現在完了と使えない",
    steps: [{ title: "過去の一点", body: "{{last night}} のような過去の一点を示す語は、今とつながる現在完了とは使えません。{{過去形}}にします。", back: [S3] }],
  },
  {
    ...base("when-did", 2),
    prompt: `When (　　) you buy that jacket?\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["did", "have", "has", "do"],
      correct: 0,
      why: [
        "When（いつ）は過去の一点をたずねるので現在完了と使えない。過去の疑問文 did。",
        "When have you bought …? は ×。When と現在完了はいっしょに使えない。",
        "主語が you なので has は合わないうえ、When と現在完了は使えない。",
        "現在形だと習慣をたずねる文になり、that jacket（あのジャケット）を買った一回のことと合わない。",
      ],
    },
    point: "When 〜? は過去形でたずねる",
    steps: [{ title: "When と完了", body: "{{When}} は時点をたずねる語なので、現在完了ではなく{{過去形}}を使います。", back: [S3] }],
  },
  {
    ...base("gone-meaning", 2, "思考・判断・表現"),
    prompt: "My brother has gone to Canada.\nこの文から分かることとして最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["兄はカナダへ行ってしまい、今ここにいない", "兄はカナダへ行ったことがある", "兄はカナダからちょうど帰ってきた", "兄はこれからカナダへ行く予定だ"],
      correct: 0,
      why: [
        "have gone to 〜 は「行ってしまった（今ここにいない）」という完了・結果。",
        "「行ったことがある」は has been to Canada。",
        "帰ってきたなら has come back from Canada など。",
        "予定なら is going to go などで表す。",
      ],
    },
    point: "has gone to ＝行ってしまって今いない",
    steps: [{ title: "結果が今に残る", body: "has {{gone}} to は「行った結果、今ここにいない」。経験なら has {{been}} to。", back: [S2] }],
  },
  {
    ...base("had-left", 2),
    prompt: `When we reached the platform, the last train (　　).\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["had already left", "has already left", "already leaves", "will already leave"],
      correct: 0,
      why: [
        "基準点は「ホームに着いたとき」（過去）。それより前に出発していたので過去完了。",
        "現在完了は基準点が今のとき。reached（過去）と合わない。",
        "現在形は過去の場面に合わない。",
        "未来の形は過去の場面に合わない。",
      ],
    },
    point: "過去の基準点より前 → had ＋過去分詞",
    steps: [{ title: "基準点をずらす", body: "基準点は{{ホームに着いた過去の時点}}。そこまでに完了していたことは {{had already left}}。", back: [S4] }],
  },
  // ---- 発展 ----
  {
    ...base("will-have", 3),
    prompt: `By next March, my sister (　　) the piano for ten years.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["will have played", "has played", "had played", "plays"],
      correct: 0,
      why: [
        "基準点は未来（来年の3月）。そこまでの継続なので未来完了 will have ＋過去分詞。",
        "現在完了は基準点が今。By next March と合わない。",
        "過去完了は基準点が過去。",
        "現在形では「〜までに10年になる」を表せない。",
      ],
    },
    point: "未来の基準点まで → will have ＋過去分詞",
    steps: [{ title: "未来に基準点", body: "{{By next March}} が基準点（未来）。現在完了の基準点を未来にずらした {{will have played}}。", back: [S4] }],
  },
  {
    ...base("had-given", 3),
    prompt: `Kenta lost the pen which his grandfather (　　) him for his birthday.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["had given", "has given", "gives", "will give"],
      correct: 0,
      why: [
        "なくした（過去）より前にもらっていたので、さらに前を表す過去完了。",
        "現在完了は今が基準点。lost（過去）の話と合わない。",
        "現在形では、もらったのがなくすより前だと表せない。",
        "未来の形は合わない。",
      ],
    },
    point: "過去のできごとよりさらに前 → 過去完了",
    steps: [{ title: "2つの過去の順番", body: "もらった → なくした。なくした{{過去の時点}}より前のことなので {{had given}}。", back: [S4] }],
  },
  {
    ...base("years-passed", 3),
    prompt: `Five years (　　) since our team last won the tournament.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["have passed", "passed", "are passing", "had passed"],
      correct: 0,
      why: [
        "最後に優勝したときから今までの期間が「たった」。since とともに現在完了。",
        "過去形では since 〜（〜から今まで）と合わない。",
        "進行形では「5年がたった」を表せない。",
        "過去完了は基準点が過去のとき。ここは今が基準点。",
      ],
    },
    point: "〜年がたつ ＝ ... years have passed since 〜",
    steps: [{ title: "主語が期間", body: "Five years が主語。{{since}} 〜 から今までなので {{have passed}}。It has been five years since 〜 とも言えます。", back: [S1] }],
  },
  {
    ...base("when-have-finished", 3),
    prompt: `I'll lend you this comic when I (　　) reading it.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["have finished", "will have finished", "had finished", "finished"],
      correct: 0,
      why: [
        "時を表す when の節の中は、未来のことでも現在形を使う。「読み終えたら」は現在完了で表す。",
        "時の副詞節の中では will を使わない。",
        "過去完了は過去の基準点のとき。",
        "過去形は未来のことに合わない。",
      ],
    },
    point: "時・条件の節では未来完了の代わりに現在完了",
    steps: [{ title: "時の節の中", body: "when 〜 の中は未来でも{{現在の形}}。「読み終えたとき」は will have finished ではなく {{have finished}}。", back: [S4] }],
  },
];

const ORDER: QuestionB[] = [
  // ---- 基本 ----
  {
    ...ord("narabe-just-lunch", 1),
    prompt: `${NARABE}\n「私はちょうど昼食を食べ終えたところです。」`,
    answer: { kind: "order", tokens: ["I", "have", "just", "finished", "lunch."], distractor: "did" },
    point: "have just ＋過去分詞",
    steps: [{ title: "just の位置", body: "{{just}} は have と過去分詞のあいだ。I have just finished lunch.", back: [S2] }],
  },
  {
    ...ord("narabe-ever-seen", 1),
    prompt: `${NARABE}\n「あなたはこれまでにオーロラを見たことがありますか。」`,
    answer: { kind: "order", tokens: ["Have", "you", "ever", "seen", "the northern lights?"], distractor: "saw" },
    point: "Have ＋主語＋ ever ＋過去分詞？",
    steps: [{ title: "経験の疑問文", body: "Have を文頭に出し、{{ever}} を主語と過去分詞のあいだに。saw は過去形なので使いません。", back: [S2] }],
  },
  // ---- 標準 ----
  {
    ...ord("narabe-bus-had-left", 2),
    prompt: `${NARABE}\n「私がバス停に着いたとき、バスはすでに出発していました。」`,
    answer: {
      kind: "order",
      tokens: ["The bus", "had", "already", "left", "when", "I", "got to", "the bus stop."],
      alsoOk: [[0, 1, 3, 2, 4, 5, 6, 7]],
      distractor: "has",
    },
    point: "着いた時点より前 → had left",
    steps: [{ title: "基準点", body: "基準点は「着いたとき」（過去）。それより前なので {{had already left}}。already は文の終わり寄り（had left already）に置くこともあります。", back: [S4] }],
  },
  {
    ...ord("narabe-learned-years", 2),
    prompt: `${NARABE}\n「彼女は3年間ずっと書道を習っています。」`,
    answer: { kind: "order", tokens: ["She", "has", "learned", "calligraphy", "for", "three years."], distractor: "since" },
    point: "has ＋過去分詞＋ for ＋期間",
    steps: [{ title: "継続", body: "3年前から今まで続いているので{{現在完了}}。期間の長さなので {{for}} three years。", back: [S1, S2] }],
  },
];

export const H_ENG_GRAM_KANRYO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "文法",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    { title: "完了形の意味と使い方", lead: "次の問いに答えなさい。", style: "word", pick: 5, questions: FORMS },
    { title: "並べかえ", lead: "日本語に合うように、語（語句）を並べかえなさい。文の最初の語は大文字で始めてあります。", style: "word", pick: 2, questions: ORDER },
  ],
};
