// 中1英語「過去形」の単元模試 (B: 問題プールからシードで6問)。問題はすべてオリジナル。
// プール15問 (基本5・標準5・発展5)。1回に基本2・標準2・発展2 が出る (lib/moshi/unit.ts の pickQuestions)。選択肢の順もシードで変わる。
// A (生成) は使っていないので検算式はなし。choice・term・order の正答は check-moshi が採点器で満点になるか確かめる。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-1-kakokei";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "一般動詞の過去形：-ed をつける動詞と、形が変わる動詞");
const S2 = L(2, "否定文・疑問文は did ＋ 原形");
const S3 = L(3, "be動詞の過去形は was と were の2つ");
const S4 = L(4, "過去を示すことばといっしょに使う");
const S5 = L(5, "不規則動詞はなぜある？");

// 配点は難易度で決める (基本15・標準17・発展18。2問ずつ出るので満点100)
const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("lived", 1),
    prompt: "（ ）内の語を、正しい形にかえて答えなさい。\nMy sister ( live ) in Kobe last year.",
    answer: { kind: "term", accept: ["lived"], near: [{ text: "liveed", why: "e で終わる語は -d だけをつけます。" }, { text: "lives", why: "last year があるので過去形にします。" }] },
    point: "e で終わる語は -d だけ（live → lived）",
    steps: [
      { title: "時を表すことばを見る", body: "{{last year}}（去年）があるので過去の文。動詞を過去形にします。", back: [S4] },
      { title: "つづりのきまり", body: "live は e で終わるので {{-d だけ}} をつけて lived。", trap: "liveed と e を重ねない。", back: [S1] },
    ],
  },
  {
    ...base("were-we", 1),
    prompt: "（ ）に入る語として正しいものはどれですか。\nTom and I (　　) in the library then.",
    answer: {
      kind: "choice",
      options: ["were", "was", "are", "did"],
      correct: 0,
      why: ["正しい。主語 Tom and I は2人（複数）なので were。", "was は主語が I・he・she などの1人のとき。Tom and I は2人。", "then（そのとき）があるので過去形にする。", "in the library（図書館に）と「いる」を表すのは be動詞。did は一般動詞の文で使う。"],
      mistakeOf: [null, 2, null, null],
    },
    point: "複数の主語の be動詞の過去形は were",
    steps: [
      { title: "過去の文か", body: "{{then}}（そのとき）があるので過去の文です。", back: [S4] },
      { title: "主語で選ぶ", body: "Tom and I は2人なので、are の過去形 {{were}}。", trap: "I が見えても、主語全体は2人。was にしない。", back: [S3] },
    ],
  },
  {
    ...base("went", 1),
    prompt: "（ ）に入る語として正しいものはどれですか。\nYuki (　　) to the zoo last Sunday.",
    answer: {
      kind: "choice",
      options: ["went", "goed", "goes", "go"],
      correct: 0,
      why: ["正しい。go は不規則動詞で、過去形は went。", "go に -ed はつけない。不規則動詞。", "goes は現在形（三単現）。last Sunday があるので過去形。", "go は原形。この文には did がないので過去形にする。"],
      mistakeOf: [null, 3, null, null],
    },
    point: "go の過去形は went（不規則動詞）",
    steps: [
      { title: "過去の合図", body: "{{last Sunday}}（この前の日曜日）で過去の文とわかります。", back: [S4] },
      { title: "不規則動詞", body: "go の過去形は {{went}}。形がまったく変わる動詞は1つずつ覚えます。", back: [S1] },
    ],
  },
  {
    ...base("ago", 1),
    prompt: "（ ）に入る語句として正しいものはどれですか。\nI cleaned my room (　　).",
    answer: {
      kind: "choice",
      options: ["three days ago", "tomorrow", "every day", "now"],
      correct: 0,
      why: ["正しい。cleaned は過去形なので、過去を示す「3日前に」が合う。", "tomorrow（明日）は未来。過去形の文には合わない。", "every day（毎日）はふだんの習慣で、現在形といっしょに使う。", "now（今）は現在。過去形の文には合わない。"],
    },
    point: "〜 ago（〜前に）は過去の文の合図",
    steps: [{ title: "動詞の形から考える", body: "cleaned は過去形。過去を示すことば {{〜 ago}}（〜前に）がいっしょに使えます。", back: [S4] }],
  },
  {
    ...base("yes-did", 1),
    prompt: "（ ）に入る1語を答えなさい。\nDid you enjoy the party? — Yes, I (　　).",
    answer: { kind: "term", accept: ["did"], near: [{ text: "do", why: "Did でたずねられたら、did で答えます。" }, { text: "enjoyed", why: "Yes, I did. のように did で答えるのがふつうです。" }] },
    point: "Did 〜? には did で答える",
    steps: [{ title: "たずねた形で答える", body: "Did でたずねられたら、{{Yes, 主語 did.}} / No, 主語 didn't. で答えます。", back: [S2] }],
  },
  // ---- 標準 ----
  {
    ...base("did-cook", 2),
    prompt: "（ ）に入る語として正しいものはどれですか。\nDid your father (　　) dinner last night?",
    answer: {
      kind: "choice",
      options: ["cook", "cooked", "cooks", "cooking"],
      correct: 0,
      why: ["正しい。Did があるので、あとの動詞は原形。", "過去であることは Did が示すので、動詞は過去形にしない。", "Did のあとは原形。三単現の -s もつけない。", "ing 形は be動詞といっしょに使う形。"],
      mistakeOf: [null, 0, null, null],
    },
    point: "Did のあとの動詞は原形",
    steps: [{ title: "did が時を受けもつ", body: "疑問文の頭に Did を置いたら、動詞は {{原形}} にもどします。", trap: "last night があっても、Did のあとで cooked にしない。", back: [S2] }],
  },
  {
    ...base("wasnt", 2),
    prompt: "日本語に合うように、（ ）に入る語を答えなさい。\nその映画はおもしろくありませんでした。\nThe movie (　　) interesting.",
    answer: { kind: "term", accept: ["wasn't", "was not", "wasn’t"], near: [{ text: "didn't", why: "interesting は動詞ではないので、この文の動詞は be動詞。be動詞の否定は was not（wasn't）です。" }, { text: "isn't", why: "「〜ありませんでした」なので過去形にします。" }] },
    point: "be動詞の過去の否定は was not（wasn't）",
    steps: [
      { title: "動詞を見つける", body: "interesting（おもしろい）は動詞ではありません。この文の動詞は {{be動詞}} です。", back: [S3] },
      { title: "否定の形", body: "主語 The movie は1つなので was。否定は {{was not（wasn't）}}。", trap: "be動詞の文に didn't は使わない。", back: [S3] },
    ],
  },
  {
    ...base("what-eat", 2),
    prompt: "日本語に合うように、語を並べかえなさい（使わない語が1つあります）。\nあなたはきのうの夜、何を食べましたか。",
    answer: { kind: "order", tokens: ["What", "did", "you", "eat", "last", "night?"], distractor: "ate" },
    point: "疑問詞＋did＋主語＋原形 〜?",
    steps: [
      { title: "疑問詞は文の頭", body: "「何を」の {{What}} を先頭に、そのあとに疑問文の形 did you 〜 を続けます。", back: [S2] },
      { title: "did のあとは原形", body: "did があるので、動詞は ate ではなく原形の {{eat}}。", trap: "ate は使わない語。", back: [S2] },
    ],
  },
  {
    ...base("carried", 2),
    prompt: "（ ）内の語を、正しい形にかえて答えなさい。\nThe boy ( carry ) a big box to the classroom an hour ago.",
    answer: { kind: "term", accept: ["carried"], near: [{ text: "carryed", why: "「子音字＋y」で終わる語は、y を i にかえて -ed をつけます。" }, { text: "carries", why: "an hour ago があるので過去形にします。" }] },
    point: "子音字＋y は y を i にかえて -ed",
    steps: [
      { title: "過去の合図", body: "{{an hour ago}}（1時間前に）があるので過去形。", back: [S4] },
      { title: "つづりのきまり", body: "carry は r（子音字）＋y で終わるので、{{y を i にかえて -ed}}。carried。", back: [S1] },
    ],
  },
  {
    ...base("ed-sound", 2),
    prompt: "語の終わりの -ed の読み方が「イド」/ɪd/ になるものはどれですか。",
    answer: {
      kind: "choice",
      options: ["wanted", "played", "looked", "lived"],
      correct: 0,
      why: ["正しい。t で終わる語の -ed は /ɪd/ と読み、1音節ふえる。", "のどがふるえる音のあとなので /d/。", "息だけで出す k の音のあとなので /t/。", "のどがふるえる v の音のあとなので /d/。"],
    },
    point: "t・d で終わる語の -ed は「イド」",
    steps: [{ title: "直前の音で決まる", body: "-ed の読み方は3通り。{{t・d で終わる語}}は /ɪd/、息だけの音のあとは /t/、それ以外は /d/。", back: [S1] }],
  },
  // ---- 発展 ----
  {
    ...base("were-you", 3),
    prompt: "日本語に合うように、語を並べかえなさい（使わない語が1つあります）。\nあなたたちはきのう、つかれていましたか。",
    answer: { kind: "order", tokens: ["Were", "you", "tired", "yesterday?"], distractor: "Did" },
    point: "be動詞の過去の疑問文は Was / Were を前へ",
    steps: [
      { title: "be動詞の文か", body: "tired（つかれた）は動詞ではないので、be動詞の文です。", back: [S3] },
      { title: "疑問文の作り方", body: "you は are の主語なので過去形は were。{{Were を主語の前へ}}出します。", trap: "be動詞の文に Did は使わない。", back: [S3] },
    ],
  },
  {
    ...base("ayamari", 3, "思考・判断・表現"),
    prompt: "英文として{{まちがっている}}ものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Did they were in the gym?", "Was your sister sick last week?", "She didn't come to school yesterday.", "We saw a rainbow two hours ago."],
      correct: 0,
      why: ["まちがい。be動詞の疑問文に did は使わない。正しくは Were they in the gym?", "正しい。主語 your sister は1人なので Was。", "正しい。didn't のあとは原形 come。", "正しい。saw は see の過去形で、two hours ago と合う。"],
    },
    point: "be動詞の文と一般動詞の文を区別する",
    steps: [
      { title: "動詞の種類を見る", body: "「体育館にいた」は be動詞の文。疑問文は {{Were を前に出す}} だけで、did は使いません。", back: [S3] },
      { title: "ほかの文を確かめる", body: "didn't のあとは原形、saw は see の不規則な過去形です。", back: [S2, S1] },
    ],
  },
  {
    ...base("fukisoku-riyu", 3, "思考・判断・表現"),
    prompt: "go・come・have のように、よく使う動詞ほど不規則動詞が多い理由として、もっとも適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "毎日何度も使う動詞は、古い過去形がまるごと覚えられ、伝わって残ったから",
        "新しく生まれた動詞ほど、形を変えて過去形を作るから",
        "よく使う動詞は、-ed をつけると発音できなくなるから",
        "よく使う動詞は、主語によって過去形の形を変えるから",
      ],
      correct: 0,
      why: ["正しい。多くの動詞は -ed にそろったが、よく使う動詞は昔の形のまま受けつがれた。", "逆。新しく生まれる動詞は、text → texted のように必ず -ed になる。", "発音できないわけではない。子どもが goed と言うこともある。", "一般動詞の過去形は、主語に関係なく同じ形。"],
    },
    point: "不規則動詞は、よく使うことばに残った古い形",
    steps: [{ title: "ことばの歴史", body: "昔の英語の過去形の作り方の1つが残ったもの。{{毎日のように使う動詞}}は規則にそろわず、古い形が受けつがれました。", back: [S5] }],
  },
  {
    ...base("didnt-play", 3),
    prompt: "「私たちはこの前の土曜日、テニスをしませんでした。」を表す英文として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["We didn't play tennis last Saturday.", "We didn't played tennis last Saturday.", "We weren't play tennis last Saturday.", "We don't play tennis last Saturday."],
      correct: 0,
      why: ["正しい。didn't＋原形 play。", "didn't のあとは原形にもどす。played にしない。", "play は一般動詞なので、否定は be動詞ではなく didn't。", "last Saturday は過去なので、don't ではなく didn't。"],
      mistakeOf: [null, 0, null, null],
    },
    point: "一般動詞の過去の否定は didn't＋原形",
    steps: [
      { title: "動詞の種類", body: "play は一般動詞。過去の否定は動詞の前に {{didn't}} を置きます。", back: [S2] },
      { title: "あとの動詞", body: "didn't のあとは {{原形}}。過去であることは did が示します。", back: [S2] },
    ],
  },
  {
    ...base("took", 3),
    prompt: "（ ）内の語を、正しい形にかえて答えなさい。\nMika ( take ) a lot of pictures in Kyoto two days ago.",
    answer: { kind: "term", accept: ["took"], near: [{ text: "taked", why: "take は不規則動詞で、過去形は took です。" }, { text: "takes", why: "two days ago があるので過去形にします。" }] },
    point: "take の過去形は took（不規則動詞）",
    steps: [
      { title: "過去の合図", body: "{{two days ago}}（2日前に）で過去の文。", back: [S4] },
      { title: "不規則動詞", body: "take は形が変わる動詞で、過去形は {{took}}。", trap: "-ed をつけて taked としない。", back: [S1] },
    ],
  },
];

export const J_EN_1_KAKOKEI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中1",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [{ title: "過去形の文", lead: "次の問いに答えなさい。", style: "word", pick: 6, questions: POOL }],
};
