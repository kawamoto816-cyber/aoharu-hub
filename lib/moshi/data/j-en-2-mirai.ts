// 中2英語「未来の表現（will・be going to）」の単元模試 (B: 問題プールからシードで選ぶ)。問題はすべてオリジナル。
// 節1「文法の知識」プール11問 (基本4・標準4・発展3) から pick 4 (基本2・標準1・発展1)。
// 節2「書きかえ・並べかえ」プール6問 (基本3・標準3) から pick 2 (基本1・標準1)。
// 1回6問＝基本3・標準2・発展1。配点 基本15・標準18・発展19 で満点100 (lib/moshi/unit.ts の pickQuestions)。A の生成問題はないので検算は不要。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-2-mirai";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "will ＋ 動詞の原形");
const S2 = L(2, "be going to ＋ 動詞の原形");
const S3 = L(3, "使い分け：予定なら be going to");
const S4 = L(4, "Will you 〜? の依頼と時のことば");

const P = { 1: 15, 2: 18, 3: 19 } as const;
const T = { 1: 50, 2: 75, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const GRAMMAR: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("will-genkei", 1),
    prompt: "次の文の（　）に入る語として正しいものはどれですか。\nMy sister will (　　) a cake for us tomorrow.",
    answer: {
      kind: "choice",
      options: ["make", "makes", "made", "making"],
      correct: 0,
      why: ["正しい。will のあとの動詞は原形。", "主語が my sister でも、will のあとに -s はつかない。", "made は過去形。will のあとには置かない。", "making は -ing 形。will のあとは原形。"],
    },
    point: "will のあとは、主語に関係なく動詞の原形",
    steps: [{ title: "will は助動詞", body: "will のあとの動詞は {{必ず原形}}。主語が3人称単数でも -s はつけません。", trap: "主語 my sister につられて makes にしてしまう。", back: [S1] }],
  },
  {
    ...base("going-be", 1),
    prompt: "次の文の（　）に入る語として正しいものはどれですか。\nKen and I (　　) going to clean the park this Sunday.",
    answer: {
      kind: "choice",
      options: ["are", "am", "is", "be"],
      correct: 0,
      why: ["正しい。主語 Ken and I は複数なので are。", "am は主語が I だけのとき。Ken and I は「わたしたち」で複数。", "is は主語が3人称単数のとき。", "be は原形。主語のあとでは am・is・are のどれかにする。"],
    },
    point: "be going to の be は主語に合わせて am・is・are",
    steps: [{ title: "主語の数を見る", body: "Ken and I は「ケンとわたし」で {{複数}}。be going to の be動詞は主語に合わせるので {{are}} です。", trap: "すぐ前の I につられて am にしてしまう。", back: [S2] }],
  },
  {
    ...base("will-kotae", 1),
    prompt: "次の会話の（　）に入る語として正しいものはどれですか。\nA: Will your father come home early tonight?\nB: Yes, he (　　).",
    answer: {
      kind: "choice",
      options: ["will", "does", "is", "do"],
      correct: 0,
      why: ["正しい。Will でたずねられたら will で答える。", "does は一般動詞の現在の疑問文（Does 〜?）への答え。", "is は be動詞の疑問文や be going to の疑問文への答え。", "do は主語が he のときには使わない。また Will の疑問文の答えではない。"],
    },
    point: "Will 〜? には will / won't で答える",
    steps: [{ title: "たずねた語で答える", body: "疑問文の先頭が Will なら、答えも {{Yes, he will. / No, he won't.}} のように will を使います。", back: [S1] }],
  },
  {
    ...base("ill-tanshuku", 1),
    prompt: "I will の短縮形を、アポストロフィ（'）を使って書きなさい。",
    answer: { kind: "term", accept: ["I'll", "I’ll"], near: [{ text: "Iwill", why: "それは短縮していない形です。will の wi を省いて ' でつなぎます。" }, { text: "Il", why: "アポストロフィ（'）が必要です。" }] },
    point: "I will → I'll、will not → won't",
    steps: [{ title: "will の短縮形", body: "会話では I will は {{I'll}}、you will は you'll のように短くなります。will not は {{won't}} です。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...base("going-hitei", 2),
    prompt: "Emi is going to practice the piano today. を否定文にしたものとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Emi isn't going to practice the piano today.", "Emi doesn't going to practice the piano today.", "Emi is going not to practice the piano today.", "Emi won't going to practice the piano today."],
      correct: 0,
      why: ["正しい。be going to の否定文は be動詞のあとに not を置く。", "be going to の文では does は使わない。", "not の位置がちがう。be動詞（is）のすぐあとに置く。", "won't と be going to をいっしょに使うことはできない。"],
    },
    point: "be going to の否定は be動詞のあとに not",
    steps: [{ title: "be動詞の文と同じ", body: "be going to には be動詞が入っているので、否定文は {{is のあとに not}}（isn't）を置きます。do・does は使いません。", back: [S2] }],
  },
  {
    ...base("irai-kotae", 2, "思考・判断・表現"),
    prompt: "次の会話の（　）に入るものとして、もっとも自然なものはどれですか。\nA: Will you carry this box to the classroom?\nB: (　　) Where should I put it?",
    answer: {
      kind: "choice",
      options: ["Sure.", "Yes, I do.", "No, I'm not.", "Yes, you will."],
      correct: 0,
      why: ["正しい。Will you 〜? は「〜してくれませんか」という依頼で、Sure.（いいですよ）と引き受けている。あとの「どこに置けばいい？」ともつながる。", "Will you 〜? に do で答えることはない。", "be動詞で答えるのは Are you 〜? のとき。また「どこに置けばいい？」とつながらない。", "you will では、相手が運ぶことになってしまう。"],
    },
    point: "Will you 〜? は依頼。Sure. で引き受ける",
    steps: [{ title: "依頼の Will you 〜?", body: "Will you 〜? は「〜してくれませんか」という {{依頼}} にもなります。引き受けるときは {{Sure.}} や All right. と答えます。", back: [S4] }],
  },
  {
    ...base("going-kotae-not", 2),
    prompt: "次の会話の（　）に入る1語を書きなさい。\nA: Are you going to join the summer camp?\nB: No, I'm (　　). I have a piano lesson that week.",
    answer: { kind: "term", accept: ["not"], near: [{ text: "won't", why: "Are you 〜? と be動詞でたずねられているので、No, I'm not. と答えます。" }, { text: "don't", why: "be動詞の疑問文なので、do は使いません。No, I'm not. です。" }] },
    point: "Are you going to 〜? には be動詞で答える",
    steps: [{ title: "be動詞で答える", body: "be going to の疑問文には、Yes, I am. / {{No, I'm not.}} と be動詞で答えます。", back: [S2] }],
  },
  {
    ...base("toki-kotoba", 2),
    prompt: "次の文の（　）に入れることが{{できない}}ものはどれですか。\nI'm going to visit my aunt in Osaka (　　).",
    answer: {
      kind: "choice",
      options: ["last Sunday", "next month", "this weekend", "tomorrow"],
      correct: 0,
      why: ["正しい。last Sunday（この前の日曜日）は過去を表すので、未来の be going to の文には入らない。", "next month（来月）は未来を表すので入る。", "this weekend（今週末）はこれからの予定を言うときに使えるので入る。", "tomorrow（明日）は未来を表すので入る。"],
    },
    point: "未来の文には next 〜・tomorrow など未来の時のことば",
    steps: [{ title: "時のことばを見分ける", body: "未来の文には {{tomorrow・next 〜・this weekend}} などがよくいっしょに出ます。last 〜・yesterday は過去なので入りません。", back: [S4] }],
  },
  // ---- 発展 ----
  {
    ...base("sonoba-will", 3, "思考・判断・表現"),
    prompt: "次の会話で、B は友だちの話を聞いてその場で決めたことを言っています。（　）に入るものとして、もっとも自然なものはどれですか。\nA: Oh no! I left my pencil case at home.\nB: Don't worry. I (　　) lend you a pen.",
    answer: {
      kind: "choice",
      options: ["'ll", "'m going to", "'m", "do"],
      correct: 0,
      why: ["正しい。話を聞いて、その場で「じゃあ貸すよ」と決めた意志なので will（I'll）がもっとも自然。", "be going to は前から決めていた予定を表す。筆箱を忘れたと聞く前から貸すつもりだったことになり、不自然。", "I'm lend は be動詞と一般動詞の原形が並んでいて、文として正しくない。", "I do lend は「本当に貸している」と現在のことを強める言い方で、これからのことを表さない。"],
    },
    point: "その場で決めた意志は will、前からの予定は be going to",
    steps: [{ title: "いつ決めたか", body: "B は A の話を聞いて、{{その場で}}貸すと決めています。その場の意志は {{will}}（I'll）で表します。", trap: "be going to も未来なのでよいと考える。be going to は前から決めてある予定に使う。", back: [S3] }],
  },
  {
    ...base("ayamari", 3, "思考・判断・表現"),
    prompt: "次の文のうち、{{まちがいをふくむ}}ものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Will she plays tennis after school?", "They are going to have lunch in the park.", "I won't watch TV tonight.", "Is he going to take the bus to the station?"],
      correct: 0,
      why: ["まちがい。疑問文でも will のあとは原形。正しくは Will she play tennis after school?", "正しい。主語 they なので are going to ＋原形 have。", "正しい。won't は will not の短縮形で、あとは原形 watch。", "正しい。be going to の疑問文は be動詞（Is）を主語の前に出す。"],
    },
    point: "疑問文・否定文でも will のあとは原形",
    steps: [{ title: "will のあとの動詞を見る", body: "Will を前に出した疑問文でも、あとの動詞は {{原形}}。plays ではなく play です。", back: [S1] }, { title: "be going to の形も確かめる", body: "be going to の文は be動詞が主語に合っているか、to のあとが原形かを見ます。", back: [S2] }],
  },
  {
    ...base("konkyo-going", 3, "思考・判断・表現"),
    prompt: "公園で、高い木の枝が大きくゆれているのを見て言いました。目の前の様子から「〜しそうだ」と言うとき、（　）に入るものとしてもっとも自然なものはどれですか。\nLook! That branch (　　) fall!",
    answer: {
      kind: "choice",
      options: ["is going to", "is", "does", "going to"],
      correct: 0,
      why: ["正しい。目の前の様子という根拠があって「このままだと落ちそうだ」と言うときは be going to がよく使われる。", "is fall は be動詞と動詞の原形が並んでいて、文として正しくない。", "does fall は現在のことを強める言い方で、「〜しそうだ」にはならない。", "be動詞（is）が抜けている。be going to の be は省けない。"],
    },
    point: "目の前に根拠がある予想は be going to がよく使われる",
    steps: [{ title: "根拠のある予想", body: "be going to は「もう動き出している流れ」を表します。目の前の様子から「{{このままだとそうなる}}」と言うときにぴったりです。", back: [S3] }, { title: "be を落とさない", body: "主語 that branch は3人称単数なので {{is going to}}。be動詞は省けません。", back: [S2] }],
  },
];

const REWRITE: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("narabe-going", 1),
    prompt: "日本文に合うように、語を並べかえなさい。使わない語が1つあります。\n「わたしは今週末、おじに会うつもりです。」",
    answer: { kind: "order", tokens: ["I", "am", "going", "to", "see", "my", "uncle", "this", "weekend"], distractor: "will" },
    point: "be going to ＋ 原形 ＋ 時のことば",
    steps: [{ title: "形を組み立てる", body: "主語 I のあとに {{am going to}}、そのあとに原形 see を置きます。this weekend は文の最後。will は使いません。", back: [S2] }],
  },
  {
    ...base("kakikae-is-going", 1),
    prompt: "次の2つの文がほぼ同じ意味になるように、（　）に入る2語を書きなさい。\nMika will write a letter tonight.\nMika (　　) (　　) to write a letter tonight.",
    answer: { kind: "term", accept: ["is going"], near: [{ text: "are going", why: "主語 Mika は3人称単数なので is going です。" }, { text: "will going", why: "be going to の be は主語に合わせた be動詞（is）にします。" }] },
    point: "will ⇔ be going to の書きかえは be動詞を主語に合わせる",
    steps: [{ title: "be動詞を選ぶ", body: "主語 Mika は3人称単数なので {{is going}} to。to のあとは原形 write のまま。", back: [S2] }],
  },
  {
    ...base("narabe-will-be", 1),
    prompt: "日本文に合うように、語を並べかえなさい。使わない語が1つあります。\n「明日は晴れるでしょう。」",
    answer: { kind: "order", tokens: ["It", "will", "be", "sunny", "tomorrow"], distractor: "is" },
    point: "will のあとの be動詞は原形 be",
    steps: [{ title: "is は be にもどる", body: "It is sunny. を未来にすると、will のあとは原形なので {{will be}} になります。", trap: "will is と並べてしまう。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...base("narabe-what", 2),
    prompt: "日本文に合うように、語を並べかえなさい。使わない語が1つあります。\n「あなたは放課後に何をするつもりですか。」",
    answer: { kind: "order", tokens: ["What", "are", "you", "going", "to", "do", "after", "school"], distractor: "doing" },
    point: "疑問詞 ＋ be動詞 ＋ 主語 ＋ going to ＋ 原形",
    steps: [{ title: "疑問詞を先頭に", body: "What を文の先頭に置き、そのあとは疑問文の語順 {{are you going to}} ＋原形 do。", back: [S2] }],
  },
  {
    ...base("kakikae-wont", 2),
    prompt: "Tom will help his mother this evening. を否定文にするとき、（　）に入る語を1語で書きなさい。\nTom (　　) help his mother this evening.",
    answer: { kind: "term", accept: ["won't", "won’t"], near: [{ text: "willnot", why: "意味は正しいですが、1語で書くので短縮形 won't にします。" }, { text: "don't", why: "will の文の否定は will not（won't）。do・does は使いません。" }, { text: "doesn't", why: "will の文の否定は will not（won't）。does は使いません。" }] },
    point: "will not の短縮形は won't",
    steps: [{ title: "will のあとに not", body: "will の否定文は will のすぐあとに not。1語なら {{won't}} です。あとの help は原形のまま。", back: [S1] }],
  },
  {
    ...base("narabe-irai", 2),
    prompt: "日本文に合うように、語を並べかえなさい。使わない語が1つあります。\n「窓を閉めてくれませんか。」",
    answer: { kind: "order", tokens: ["Will", "you", "close", "the", "window"], distractor: "closes" },
    point: "依頼は Will you ＋ 動詞の原形 〜?",
    steps: [{ title: "依頼の形", body: "「〜してくれませんか」は {{Will you ＋原形}} 〜? で表します。closes ではなく原形 close。", back: [S4] }],
  },
];

export const J_EN_2_MIRAI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中2",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    { title: "未来の表現の文法", lead: "次の問いに答えなさい。", style: "mix", pick: 4, questions: GRAMMAR },
    { title: "書きかえ・並べかえ", lead: "次の問いに答えなさい。並べかえでは、文の最初の語は大文字で始まっています。", style: "mix", pick: 2, questions: REWRITE },
  ],
};
