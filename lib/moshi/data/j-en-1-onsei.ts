// 中1英語「アルファベットと音」の単元模試 (B: 問題プールからシードで選ぶ)。問題・英文はすべてオリジナル (ドリル・教科書の文は使っていない)。
// 音声は使わず、文字・つづりと音の関係・アクセントの位置を文字で問う。
// 大問1「文字」・大問2「音とアクセント」の2つ。それぞれプール6問 (基本2・標準2・発展2) から、基本・標準・発展を1問ずつ出す。
// 1回 6問・満点100 (基本15・標準17・発展18 × 2)。A (生成) は使っていないので検算式はなし。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-1-onsei";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "26文字は、母音字5つと子音字21");
const S2 = L(2, "文字の「名前」と単語の中の「音」");
const S3 = L(3, "音をつなげて単語を読む");
const S4 = L(4, "強く読むところ（アクセント）");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 80 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

// ---- 大問1 文字 ----
const MOJI: QuestionB[] = [
  // 基本
  {
    ...base("boin", 1),
    prompt: "アルファベットの母音字（ぼいんじ）5つの組として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["a・e・i・o・u", "a・b・c・d・e", "k・s・t・n・m", "a・i・u・e・n"],
      correct: 0,
      why: ["母音字は a・e・i・o・u の5つ。", "b・c・d は子音字。", "どれも子音字。", "n は子音字。o が入っていない。"],
    },
    point: "母音字は a・e・i・o・u",
    steps: [{ title: "母音字と子音字", body: "26文字のうち {{a・e・i・o・u}} の5つが母音字、それ以外が子音字です。", back: [S1] }],
  },
  {
    ...base("oomoji", 1),
    prompt: "次の文のうち、大文字の使い方が正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Ken and I are friends.", "Ken and i are friends.", "ken and I are friends.", "Ken And I Are Friends."],
      correct: 0,
      why: ["文の最初・人の名前・I（私）が大文字になっている。", "「私」の I は文のどこでも大文字。", "文の最初と人の名前 Ken は大文字。", "文の途中のふつうの語（and・are・friends）は小文字。"],
      mistakeOf: [null, 2, null, null],
    },
    point: "文の最初・名前・I は大文字",
    steps: [{ title: "大文字にするところ", body: "{{文の最初}}、{{人の名前}}、「私」の {{I}} は大文字。それ以外の語は小文字です。", back: [S1] }],
  },
  // 標準
  {
    ...base("shiin-kazu", 2),
    prompt: "アルファベット26文字のうち、子音字（しいんじ）は何文字ですか。",
    answer: {
      kind: "choice",
      options: ["21文字", "5文字", "20文字", "16文字"],
      correct: 0,
      why: ["26文字から母音字5つを引いて21文字。", "5文字は母音字の数。", "26−5＝21。20ではない。", "26−10 で計算している。母音字は5つ。"],
    },
    point: "26 − 母音字5 ＝ 子音字21",
    steps: [{ title: "引き算で", body: "全部で {{26文字}}、母音字が {{5つ}} なので、子音字は 26−5＝{{21}} 文字です。", back: [S1] }],
  },
  {
    ...base("namae-oto", 2),
    prompt: "アルファベットを順に「エイ、ビー、スィー…」と読むときの読み方を何といいますか。",
    answer: {
      kind: "choice",
      options: ["文字の名前", "単語の中の音", "アクセント", "フォニックス"],
      correct: 0,
      why: ["順に読むときの読み方は、文字の「名前」。", "単語の中では、名前とちがう音を出すことが多い。", "アクセントは単語の中で強く読むところ。", "フォニックスは、つづりと音の関係を学ぶ方法の名前。"],
    },
    point: "「エイ・ビー…」は文字の名前",
    steps: [{ title: "名前と音", body: "アルファベットを順に読むときは文字の{{名前}}。cat の a のように、単語の中では別の{{音}}になることが多いです。", back: [S2] }],
  },
  // 発展
  {
    ...base("seisho", 3, "思考・判断・表現"),
    prompt: "次の英文のうち、大文字・小文字の使い方がすべて正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["My name is Yuki. I live in Osaka.", "my name is Yuki. I live in Osaka.", "My name is yuki. I live in osaka.", "My name is Yuki. i live in Osaka."],
      correct: 0,
      why: ["文の最初・名前 Yuki・地名 Osaka・I がすべて大文字。", "文の最初の my は大文字の My にする。", "人の名前 Yuki、地名 Osaka は大文字で始める。", "2つ目の文の最初で、しかも「私」の I なので大文字。"],
    },
    point: "文の最初・人名・地名・I を1つずつ確かめる",
    steps: [{ title: "1か所ずつ確かめる", body: "{{文の最初}}（My・I）、{{人の名前}}（Yuki）、{{地名}}（Osaka）が大文字になっているかを順に見ます。", back: [S1] }],
  },
  {
    ...base("sita-sen", 3),
    prompt: "4本線に小文字を書くとき、文字の一部がいちばん下の線のほうへ下がる文字だけの組はどれですか。",
    answer: {
      kind: "choice",
      options: ["g・p・y", "b・d・h", "a・c・e", "k・l・t"],
      correct: 0,
      why: ["g・p・y は、下にのびる部分がある。", "b・d・h は上にのびる文字。", "a・c・e は真ん中の2本の線の間に書く文字。", "k・l・t は上にのびる文字。"],
    },
    point: "g・p・y は下へ、b・d・h は上へのびる",
    steps: [{ title: "4本線の位置", body: "小文字には、上にのびる文字（b・d・h など）と、下にのびる文字（{{g・p・y}} など）があります。b と p、d と q はとくに位置に気をつけます。", back: [S1] }],
  },
];

// ---- 大問2 音とアクセント ----
const OTO: QuestionB[] = [
  // 基本
  {
    ...base("cat-a", 1),
    prompt: "cat の a の読み方の説明として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["文字の名前「エイ」とはちがう、短い音", "文字の名前と同じ「エイ」", "読まない（音を出さない）", "日本語の「オ」と同じ音"],
      correct: 0,
      why: ["cat の a は「ア」と「エ」の間のような短い音。", "「エイ」は文字の名前。単語の中では別の音。", "a は読む。読まないと c と t だけになる。", "「オ」の音ではない。"],
      mistakeOf: [null, 0, null, null],
    },
    point: "単語の中の a は名前とちがう音",
    steps: [{ title: "名前と音", body: "a の名前は「エイ」。でも cat の a は{{「ア」と「エ」の間のような短い音}}です。", back: [S2] }],
  },
  {
    ...base("tsunagu", 1),
    prompt: "c・a・t の音を順に出して cat を読むときのコツとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["音をなめらかにつなげ、最後の t のあとに「ト（to）」の母音をつけない", "文字の名前を順に「スィー・エイ・ティー」と読む", "1文字ずつ区切って、間をあけて読む", "最後の t をいちばん強く長く読む"],
      correct: 0,
      why: ["音をつなげ、t は子音だけで終える。", "名前を並べても単語の読み方にはならない。", "音はなめらかにつなげて読む。", "t は短い子音。母音をつけたり長く読んだりしない。"],
    },
    point: "音をつなげる。最後に母音を足さない",
    steps: [{ title: "つなげて読む", body: "一つひとつの{{音}}を順に出し、なめらかに{{つなげ}}ます。英語には母音をともなわない子音だけの音がたくさんあります。", back: [S3] }],
  },
  // 標準
  {
    ...base("cake-a", 2),
    prompt: "次の単語のうち、a を文字の名前「エイ」に近い音で読むものはどれですか。",
    answer: {
      kind: "choice",
      options: ["cake", "cat", "map", "hat"],
      correct: 0,
      why: ["cake の a は「エイ」に近い音。", "cat の a は短い音。", "map の a は短い音。", "hat の a は短い音。"],
    },
    point: "cat・map・hat の a は短い音",
    steps: [{ title: "短い a を見分ける", body: "cat・map・hat の a はどれも{{短い音}}。cake の a だけが名前「{{エイ}}」に近い音です。", back: [S2] }],
  },
  {
    ...base("banana", 2),
    prompt: "banana（バナナ）を英語で読むとき、強く読むところはどこですか。",
    answer: {
      kind: "choice",
      options: ["2番目の na（ba-NA-na）", "最初の ba（BA-na-na）", "最後の na（ba-na-NA）", "どこも同じ強さで読む"],
      correct: 0,
      why: ["banana は2番目の na を強く・長く読む。", "日本語の「バナナ」の感覚で最初を強くしない。", "最後ではない。", "英語の単語には強く読むところ（アクセント）がある。"],
    },
    point: "カタカナ語でもアクセントの位置に注意",
    steps: [{ title: "アクセント", body: "英語の単語には、ほかより{{強く・長く}}読むところがあります。banana は {{2番目}}の na です。", back: [S4] }],
  },
  // 発展
  {
    ...base("accent-first", 3),
    prompt: "次の単語のうち、最初の部分を強く読むものはどれですか。",
    answer: {
      kind: "choice",
      options: ["orange", "guitar", "hotel", "banana"],
      correct: 0,
      why: ["orange は最初の o を強く読む（OR-ange）。", "guitar は後ろの tar を強く読む。", "hotel は後ろの tel を強く読む。", "banana は2番目の na を強く読む。"],
    },
    point: "guitar・hotel は後ろが強い",
    steps: [{ title: "カタカナ語と比べる", body: "ギター・ホテルは日本語では最初が目立ちますが、英語の {{guitar}}・{{hotel}} は後ろを強く読みます。最初が強いのは {{orange}}。", back: [S4] }],
  },
  {
    ...base("dog-end", 3, "思考・判断・表現"),
    prompt: "dog を英語らしく読むときの説明として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["最後の g のあとに母音をつけず、のどで止める", "最後に「グ」と、はっきり「ウ」の母音をつけて読む", "o を文字の名前どおり「オウ」と読む", "d は読まずに og と読む"],
      correct: 0,
      why: ["英語は子音だけで終わる単語が多い。g で止める。", "母音を足すと、別の音に聞こえる。", "dog の o は名前の「オウ」ではない、短い音。", "d も音をつなげて読む。"],
      mistakeOf: [null, 1, null, null],
    },
    point: "子音で終わる語は、母音を足さない",
    steps: [
      { title: "子音だけの音", body: "日本語の「ドッグ」は最後に「ウ」の母音がつきますが、英語の dog は {{g で止め}}ます。", back: [S3] },
      { title: "o の音", body: "単語の中の o は、名前の「オウ」とはちがう{{短い音}}になっています。", back: [S2] },
    ],
  },
];

export const J_EN_1_ONSEI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中1",
  minutes: 8,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "文字", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: MOJI },
    { title: "音とアクセント", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: OTO },
  ],
};
