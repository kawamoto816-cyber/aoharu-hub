// 中2英語「助動詞（must・have to・should など）」の単元模試 (B: 問題プールからシードで選ぶ)。問題・例文はすべてオリジナル。
// 節1 語形・意味 (プール13問: 基本4・標準5・発展4) から5問 (基本2・標準2・発展1)、
// 節2 並べかえ (プール5問: 基本2・標準3) から2問 (基本1・標準1)。1回7問・100点。
// 配点は難易度で決める (基本13・標準15・発展16 → 13×3＋15×3＋16＝100)。A (生成) はないので数値の検算はなし。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-2-jodoshi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "助動詞 ＋ 動詞の原形が基本の形");
const S2 = L(2, "must と have to：否定でちがう");
const S3 = L(3, "have to は主語と時で形が変わる");
const S4 = L(4, "意味で分けると覚えやすい");

const P = { 1: 13, 2: 15, 3: 16 } as const;
const T = { 1: 45, 2: 60, 3: 90 } as const;
const TO = { 1: 60, 2: 75, 3: 90 } as const;
type Sk = QuestionB["skill"];
const base = (id: string, difficulty: 1 | 2 | 3, skill: Sk = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });
const ord = (id: string, difficulty: 1 | 2 | 3) => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: TO[difficulty], skill: "知識・技能" as Sk });

const FORMS: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("must-genkei", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nHe must (　) his room today.",
    answer: {
      kind: "choice",
      options: ["clean", "cleans", "cleaning", "to clean"],
      correct: 0,
      why: ["正しい。助動詞のあとの動詞は原形。", "主語が he でも、助動詞のあとに -s はつけない。", "-ing 形は助動詞のあとに置かない。", "must のあとに to は入らない（have to と混ぜない）。"],
      mistakeOf: [null, 0, null, null],
    },
    point: "助動詞 ＋ 動詞の原形",
    steps: [{ title: "助動詞のあとは原形", body: "must のあとの動詞は、主語が he でも{{原形}}の {{clean}}。三単現の -s はつけません。", back: [S1] }],
  },
  {
    ...base("has-to", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nMy sister (　) to get up at six every morning.",
    answer: {
      kind: "choice",
      options: ["has", "have", "must", "is"],
      correct: 0,
      why: ["正しい。主語が3人称単数なので has to。", "主語 My sister は3人称単数。have ではなく has。", "must のあとに to は続かない。", "is to という形は、ここでは使わない。"],
      mistakeOf: [null, 2, null, null],
    },
    point: "3人称単数の主語なら has to",
    steps: [{ title: "have が変化する", body: "have to の have はふつうの動詞と同じように変わります。主語 My sister は3人称単数なので {{has to}}。", back: [S3] }],
  },
  {
    ...base("should-imi", 1),
    prompt: "次の英文の意味として正しいものはどれですか。\nYou should ask your teacher.",
    answer: {
      kind: "choice",
      options: ["先生に聞いたほうがいい。", "先生に聞かなければならない。", "先生に聞いてはいけない。", "先生に聞くかもしれない。"],
      correct: 0,
      why: ["正しい。should は「〜すべきだ・〜したほうがよい」というアドバイス。", "これは must や have to の意味。", "これは must not の意味。", "これは may（推量）の意味。"],
    },
    point: "should ＝ 〜したほうがよい（アドバイス）",
    steps: [{ title: "should はアドバイス", body: "{{should}} は「〜すべきだ・〜したほうがよい」。must ほど強くない、相手を思った助言です。", back: [S4] }],
  },
  {
    ...base("may-kyoka", 1),
    prompt: "次の英文の意味として正しいものはどれですか。\nYou may use my dictionary.",
    answer: {
      kind: "choice",
      options: ["わたしの辞書を使ってもいいですよ。", "わたしの辞書を使うかもしれない。", "わたしの辞書を使わなければならない。", "わたしの辞書を使ってはいけない。"],
      correct: 0,
      why: ["正しい。You may 〜 で「〜してもよい」という許可。", "may には推量の意味もあるが、相手に「使っていい」と言う場面なので許可。", "これは must の意味。", "これは must not の意味。"],
    },
    point: "may ＝ 〜してもよい（許可）",
    steps: [{ title: "may の2つの意味", body: "may は「〜してもよい（{{許可}}）」と「〜かもしれない（推量）」。相手に自分の物を使わせる文なので{{許可}}です。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...base("dont-have-to", 2),
    prompt: "「明日は学校に来る必要はありません。」の意味になるように、（　）に入るものを選びなさい。\nYou (　) come to school tomorrow.",
    answer: {
      kind: "choice",
      options: ["don't have to", "must not", "should", "may"],
      correct: 0,
      why: ["正しい。don't have to は「〜する必要はない」。", "must not は「来てはいけない」という禁止になる。", "should は「来たほうがいい」。", "may は「来てもいい」「来るかもしれない」。"],
      mistakeOf: [null, 1, null, null],
    },
    point: "必要はない ＝ don't have to",
    steps: [{ title: "否定で意味が分かれる", body: "「〜する必要はない」は {{don't have to}}。{{must not}} は「〜してはいけない」という禁止です。", trap: "「〜しなくていい」を must not にすると、来てはいけないという意味になる。", back: [S2] }],
  },
  {
    ...base("had-to", 2),
    prompt: "「先週の日曜日、わたしたちは公園をそうじしなければなりませんでした。」の意味になるように、（　）に入る2語を答えなさい。\nLast Sunday, we (　) (　) clean the park.",
    answer: {
      kind: "term",
      accept: ["had to"],
      near: [
        { text: "must", why: "must には過去形がありません。過去の義務は had to。" },
        { text: "musted", why: "must に -ed はつきません。過去は had to。" },
        { text: "have to", why: "Last Sunday（先週の日曜日）なので過去。had to。" },
      ],
    },
    point: "過去の「しなければならなかった」は had to",
    steps: [{ title: "must の過去はない", body: "must には過去形がないので、have to の過去形 {{had to}} を使います。", back: [S3] }],
  },
  {
    ...base("doesnt-have-to", 2),
    prompt: "He has to cook dinner. を否定文にしたものとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["He doesn't have to cook dinner.", "He doesn't has to cook dinner.", "He hasn't to cook dinner.", "He has not to cook dinner."],
      correct: 0,
      why: ["正しい。does を使い、そのあとは原形の have。", "doesn't のあとは原形。has ではなく have。", "have to の否定は一般動詞と同じく do / does を使う。", "has のあとに not を置く形にはしない。"],
    },
    point: "has to の否定は doesn't have to",
    steps: [{ title: "一般動詞と同じ", body: "have to の否定は {{does}} を使って doesn't have to。does のあとなので have は{{原形}}にもどります。", back: [S3] }],
  },
  {
    ...base("may-suiryo", 2),
    prompt: "次の英文の意味として正しいものはどれですか。\nKumi may be tired.",
    answer: {
      kind: "choice",
      options: ["久美はつかれているかもしれない。", "久美はつかれていてもよい。", "久美はつかれているにちがいない。", "久美はつかれていなければならない。"],
      correct: 0,
      why: ["正しい。may の推量「〜かもしれない」。", "つかれることを「許す」のは不自然。ここは推量。", "「〜にちがいない」は may よりずっと強い確信。", "これは must や have to の義務の意味。"],
    },
    point: "may ＝ 〜かもしれない（推量）",
    steps: [{ title: "許可か推量か", body: "may be tired は、ようすを想像して言う文。許可ではなく {{推量}}（〜かもしれない）です。", back: [S4] }],
  },
  {
    ...base("must-gimon", 2),
    prompt: "You must leave now. を疑問文にしたものとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Must you leave now?", "Do you must leave now?", "You must leave now?", "Must you leaving now?"],
      correct: 0,
      why: ["正しい。助動詞を主語の前に出す。", "助動詞の疑問文に do は使わない。", "語順を変えずに ? をつけるだけでは、疑問文の形にならない。", "must のあとは原形 leave。"],
    },
    point: "疑問文は助動詞を主語の前へ",
    steps: [{ title: "助動詞を前へ", body: "助動詞の疑問文は、{{must を主語の前}}に出します。do や does は使いません。動詞は原形のままです。", back: [S1] }],
  },
  // ---- 発展 ----
  {
    ...base("no-you-dont", 3, "思考・判断・表現"),
    prompt: "次の会話の（　）に入るものとして正しいものはどれですか。\nA: Do I have to bring my lunch tomorrow?\nB: No, you (　). We will have lunch at the restaurant.",
    answer: {
      kind: "choice",
      options: ["don't", "mustn't", "must", "aren't"],
      correct: 0,
      why: ["正しい。Do I have to 〜? には do で答える。No, you don't. は「持ってくる必要はない」。", "mustn't は「持ってきてはいけない」という禁止になり、たずねた内容とかみ合わない。", "No のあとに must では意味が通らない。", "Do でたずねているので be動詞では答えない。"],
      mistakeOf: [null, 1, null, null],
    },
    point: "Do I have to 〜? ― No, you don't.（必要はない）",
    steps: [
      { title: "答え方は一般動詞と同じ", body: "have to の疑問文は Do で始まるので、答えも {{do / don't}} を使います。", back: [S3] },
      { title: "意味を確かめる", body: "No, you {{don't}} (have to). は「その必要はない」。レストランで食べるので、お弁当はいらないという流れに合います。", trap: "No, you mustn't. は「持ってきてはいけない」になる。", back: [S2] },
    ],
  },
  {
    ...base("seigo", 3, "思考・判断・表現"),
    prompt: "英文として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["She has to practice the piano every day.", "She musts practice the piano every day.", "She must practices the piano every day.", "She will must practice the piano every day."],
      correct: 0,
      why: ["正しい。主語が3人称単数なので has to、そのあとは原形。", "助動詞に -s はつかない。", "助動詞のあとの動詞は原形 practice。", "助動詞を2つ並べることはできない。未来の義務は will have to。"],
      mistakeOf: [null, 0, 0, null],
    },
    point: "助動詞に -s なし・あとは原形・2つ並べない",
    steps: [{ title: "形のきまりを確かめる", body: "助動詞には {{-s がつかない}}、あとの動詞は{{原形}}、助動詞は{{2つ並べない}}。has to はふつうの動詞と同じく主語で形が変わります。", back: [S1, S3] }],
  },
  {
    ...base("will-have-to", 3),
    prompt: "「来週、あなたは早起きしなければならないでしょう。」の意味になるように、（　）に入る3語を答えなさい。\nYou (　) (　) (　) get up early next week.",
    answer: {
      kind: "term",
      accept: ["will have to"],
      near: [
        { text: "will must", why: "助動詞を2つ並べることはできません。will have to。" },
        { text: "must", why: "「〜でしょう」と未来のことなので will を使い、will have to。" },
      ],
    },
    point: "未来の義務は will have to",
    steps: [{ title: "will のあとは have to", body: "will must とは言えないので、未来の「しなければならないだろう」は {{will have to}}。will のあとなので have は原形です。", back: [S3] }],
  },
  {
    ...base("shall-i", 3, "思考・判断・表現"),
    prompt: "次の会話の（　）に入るものとして、もっとも適切なものはどれですか。\nA: This box is very heavy.\nB: Shall I carry it for you?\nA: (　) Thank you very much.",
    answer: {
      kind: "choice",
      options: ["Yes, please.", "Yes, let's.", "No, you mustn't.", "Yes, I shall."],
      correct: 0,
      why: ["正しい。Shall I 〜?（〜しましょうか）の申し出を受けるときは Yes, please.", "Yes, let's. は Shall we 〜?（〜しませんか）のさそいへの答え。", "「運んではいけない」となり、あとの Thank you とかみ合わない。", "Shall I 〜? に I shall では答えない。"],
    },
    point: "Shall I 〜? には Yes, please. で答える",
    steps: [{ title: "申し出への答え", body: "{{Shall I 〜?}} は「〜しましょうか」という申し出。受けるなら {{Yes, please.}}、ことわるなら No, thank you. です。", back: [S4] }],
  },
];

const ORDER: QuestionB[] = [
  // ---- 基本 ----
  {
    ...ord("narabe-must-not", 1),
    prompt: "日本語に合うように語を並べかえなさい。使わない語が1つあります。\n「わたしたちはこの川でつりをしてはいけません。」",
    answer: { kind: "order", tokens: ["We", "must", "not", "fish", "in", "this", "river"], distractor: "don't" },
    point: "禁止は must not ＋ 原形",
    steps: [{ title: "must のすぐ後ろに not", body: "「〜してはいけない」は {{must not}} ＋ 原形。否定の not は助動詞のすぐ後ろに置き、don't は使いません。", back: [S1, S2] }],
  },
  {
    ...ord("narabe-could", 1),
    prompt: "日本語に合うように語を並べかえなさい。使わない語が1つあります。\n「窓を開けていただけませんか。」",
    answer: { kind: "order", tokens: ["Could", "you", "open", "the", "window"], distractor: "Do" },
    point: "ていねいなお願いは Could you 〜?",
    steps: [{ title: "ていねいなお願い", body: "{{Could you}} ＋ 原形 で「〜していただけませんか」。助動詞を主語の前に出す疑問文の形です。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...ord("narabe-shall-we", 2),
    prompt: "日本語に合うように語を並べかえなさい。使わない語が1つあります。\n「明日、いっしょに買い物に行きませんか。」",
    answer: { kind: "order", tokens: ["Shall", "we", "go", "shopping", "together", "tomorrow"], alsoOk: [[0, 1, 2, 3, 5, 4]], distractor: "I" },
    point: "さそいは Shall we 〜?",
    steps: [{ title: "さそいの言い方", body: "「〜しませんか」というさそいは {{Shall we 〜?}}。Shall I 〜? は「〜しましょうか」という申し出なので、ここでは I を使いません。", back: [S4] }],
  },
  {
    ...ord("narabe-did-have-to", 2),
    prompt: "日本語に合うように語を並べかえなさい。使わない語が1つあります。\n「あなたのお兄さんは土曜日に働かなければならなかったのですか。」",
    answer: { kind: "order", tokens: ["Did", "your", "brother", "have", "to", "work", "on", "Saturday"], distractor: "had" },
    point: "過去の疑問は Did ＋ 主語 ＋ have to",
    steps: [{ title: "Did を前へ", body: "had to の疑問文は {{Did}} を主語の前に出し、have は原形にもどします。Did your brother {{have to}} work 〜? の形です。", back: [S3] }],
  },
  {
    ...ord("narabe-does-have-to", 2),
    prompt: "日本語に合うように語を並べかえなさい。使わない語が1つあります。\n「トムはその本を読まなければなりませんか。」",
    answer: { kind: "order", tokens: ["Does", "Tom", "have", "to", "read", "the", "book"], distractor: "has" },
    point: "has to の疑問は Does ＋ 主語 ＋ have to",
    steps: [{ title: "Does のあとは原形", body: "主語が3人称単数の Tom なので {{Does}} を前に出します。does のあとなので has ではなく {{have}} to です。", back: [S3] }],
  },
];

export const J_EN_2_JODOSHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中2",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    { title: "助動詞の形と意味", lead: "次の問いに答えなさい。", style: "word", pick: 5, questions: FORMS },
    { title: "並べかえ", lead: "日本語に合うように、語を並べかえなさい。文の最初の語は大文字で始めてあります。", style: "word", pick: 2, questions: ORDER },
  ],
};
