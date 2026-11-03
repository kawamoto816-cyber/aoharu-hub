// 中3英語「現在完了進行形」の単元模試 (B: 問題プールからシードで出題)。問題・英文はすべてオリジナル。
// 大問1 文法・語法: プール13問 (基本5・標準5・発展3) から4問 (基本2・標準1・発展1)。
// 大問2 並べかえ: プール5問 (基本2・標準3) から2問 (基本1・標準1)。
// 1回6問 (基本3・標準2・発展1)。配点 基本15・標準18・発展19 → 45+36+19＝100点。選択肢・語の順もシードで変わる。
// A (生成) は使っていないので検算式はない。英文の正誤はレクチャー (lib/lecture/data/j-en-3-kanryo-shinko.ts) の要点・まちがいに合わせた。
// 現在完了の模試 (j-en-3-kanryo) とは別の文・論点 (been ＋ ing の形、動作／状態の使い分け、現在進行形とのちがい) にした。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-3-kanryo-shinko";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "過去に始まり、今も続いている動作");
const S2 = L(2, "形は have / has been ＋ 動詞の ing 形");
const S3 = L(3, "動作の動詞は進行形、状態の動詞は現在完了");
const S4 = L(4, "現在進行形とのちがいは「長さ」");

const P = { 1: 15, 2: 18, 3: 19 } as const;
const T = { 1: 45, 2: 75, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const GRAMMAR: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("has-been-cat", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nOur cat (　　) been sleeping on the sofa since noon.",
    answer: {
      kind: "choice",
      options: ["has", "have", "is", "was"],
      correct: 0,
      why: ["正しい。主語 Our cat は3人称単数なので has been ＋ ing。", "主語が3人称単数なので have ではなく has。", "is been という形はない。been の前には have / has を置く。", "was been という形はない。since noon（正午から）と今まで続くので has been。"],
    },
    point: "3人称単数の主語は has been ＋ ing",
    steps: [{ title: "主語を見る", body: "since noon があり「正午からずっと眠っている」。主語 Our cat は3人称単数なので {{has}} been sleeping です。", trap: "been の前に is や was を入れてしまう。", back: [S2] }],
  },
  {
    ...base("ing-drive", 1),
    prompt: "（　）内の語を、正しい形にかえて答えなさい。\nMy uncle has been (drive) for five hours.",
    answer: { kind: "term", accept: ["driving"], near: [{ text: "driven", why: "driven は過去分詞。been のあとは ing 形の driving です。" }, { text: "driveing", why: "e で終わる動詞は e をとって ing をつけます。driving。" }, { text: "drive", why: "been のあとは動詞の ing 形です。" }] },
    point: "been のあとは ing 形。drive → driving",
    steps: [{ title: "been ＋ ing", body: "現在完了進行形は have / has been ＋ {{動詞の ing 形}}。drive は e をとって {{driving}} です。", trap: "been study のように原形のまま置いてしまう。", back: [S2] }],
  },
  {
    ...base("been-guitar", 1),
    prompt: "（　）に入る1語を答えなさい。\nI have (　　) practicing the guitar for two hours.（私は2時間ずっとギターを練習しています）",
    answer: { kind: "term", accept: ["been"], near: [{ text: "be", why: "have のあとは過去分詞。be の過去分詞 been を入れます。" }, { text: "being", why: "have のあとは過去分詞 been です。" }] },
    point: "have ＋ been ＋ ing",
    steps: [{ title: "2つの文法の合体", body: "進行形（be ＋ ing）の be を過去分詞 {{been}} にして have のあとに入れると、have been practicing になります。", back: [S2] }],
  },
  {
    ...base("since-clean", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nWe have been cleaning the classroom (　　) 3:30.",
    answer: {
      kind: "choice",
      options: ["since", "for", "ago", "during"],
      correct: 0,
      why: ["正しい。3:30（3時半）はそうじを始めた時点なので since。", "for のあとは長さ（for an hour など）。3:30 は時点。", "ago は過去形といっしょに使う語。", "during は「〜の間に」で、あとには期間を表す名詞（the summer など）を置く。"],
    },
    point: "始まった時点は since、長さは for",
    steps: [{ title: "時点か長さか", body: "3:30 はそうじを始めた{{時点}}。時点の前には {{since}} を置きます。", trap: "「〜から」を from にしてしまう。", back: [S1] }],
  },
  {
    ...base("kotae-they", 1),
    prompt: "次の問いへの答えとして正しいものはどれですか。\nHave Ken and Yuta been swimming all morning?",
    answer: {
      kind: "choice",
      options: ["Yes, they have.", "Yes, they are.", "Yes, they do.", "Yes, they been."],
      correct: 0,
      why: ["正しい。Have でたずねられたら have で答える。", "are は be 動詞や進行形の疑問文（Are they 〜?）に答える形。", "do は一般動詞の現在の疑問文に答える形。", "been だけでは答えにならない。have を使う。"],
    },
    point: "Have 〜 been 〜ing? には have で答える",
    steps: [{ title: "文の先頭の語で答える", body: "疑問文は {{Have}} を主語の前に出した形。答えも Yes, they {{have}}. / No, they haven't. です。", back: [S2] }],
  },
  // ---- 標準 ----
  {
    ...base("belong-jotai", 2, "思考・判断・表現"),
    prompt: "（　）に入る語句として正しいものはどれですか。\nThis old clock (　　) to our family for 100 years.",
    answer: {
      kind: "choice",
      options: ["has belonged", "has been belonging", "is belonging", "belongs"],
      correct: 0,
      why: ["正しい。belong（〜のものである）は状態の動詞なので、進行形にせず has ＋ 過去分詞で継続を表す。", "belong は状態の動詞なので、ふつう進行形にしない。", "状態の動詞は進行形にしない。for 100 years とも合わない。", "現在形では「100年間ずっと」が表せない。"],
    },
    point: "状態の動詞は have ＋ 過去分詞で「ずっと」",
    steps: [
      { title: "動詞の種類を見る", body: "belong は「〜のものである」という{{状態}}の動詞。know・like と同じで、ふつう進行形にしません。", back: [S3] },
      { title: "継続は現在完了", body: "for 100 years と長さがあるので、現在完了の継続 {{has belonged}} にします。", back: [S3] },
    ],
  },
  {
    ...base("for-an-hour-walk", 2, "思考・判断・表現"),
    prompt: "対話が成り立つように、（　）に入る語句として正しいものはどれですか。\nA: You look so wet!\nB: Yes. I (　　) in the rain for an hour.",
    answer: {
      kind: "choice",
      options: ["have been walking", "am walking", "walk", "have been walked"],
      correct: 0,
      why: ["正しい。1時間前から今までずっと歩いてきた。for an hour と長さがあるので現在完了進行形。", "現在進行形は「今している」だけで、for an hour（1時間ずっと）は表せない。", "現在形はふだんのことを表す。for an hour と合わない。", "been のあとは ing 形。been walked という形にはしない。"],
    },
    point: "for 〜（長さ）があれば have been ＋ ing",
    steps: [{ title: "長さの目じるし", body: "for an hour は続いてきた{{長さ}}。今の一コマだけを言う am walking ではなく、{{have been walking}} にします。", trap: "「歩いている」と訳して am walking を選んでしまう。", back: [S4] }],
  },
  {
    ...base("how-long-kotae", 2),
    prompt: "対話が成り立つように、（　）に入るものとして正しいものはどれですか。\nA: How long has Mr. Ito been running?\nB: (　　)",
    answer: {
      kind: "choice",
      options: ["For forty minutes.", "Forty minutes ago.", "At seven.", "Yes, he has."],
      correct: 0,
      why: ["正しい。How long（どのくらいの間）には、for を使って長さで答える。", "ago は過去の時点を表す。How long の答えにならない。", "At seven は時刻。「7時から」なら Since seven. とする。", "How long は Yes / No でたずねる疑問文ではない。"],
    },
    point: "How long 〜? には For 〜. / Since 〜. で答える",
    steps: [{ title: "何をたずねているか", body: "{{How long}} は続いている長さをたずねる語。答えは {{For}} forty minutes.（40分間）や Since 〜. です。", back: [S2] }],
  },
  {
    ...base("ichibun-dance", 2, "思考・判断・表現"),
    prompt: "My sister began to practice the dance last Friday. She is still practicing it. の内容を1文で表したものとして、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["My sister has been practicing the dance since last Friday.", "My sister has been practicing the dance for last Friday.", "My sister is practicing the dance since last Friday.", "My sister has been practice the dance since last Friday."],
      correct: 0,
      why: ["正しい。先週の金曜日に始めて今も続いているので has been ＋ ing。last Friday は時点なので since。", "for のあとは長さ。last Friday は始まった時点なので since。", "現在進行形では「先週の金曜日からずっと」が表せない。", "been のあとは ing 形の practicing。"],
    },
    point: "始めて今も続く＝has been ＋ ing ＋ since 〜",
    steps: [
      { title: "今も続いているか", body: "先週の金曜日に始め、{{今も}}練習している。過去から今までの動作なので {{has been practicing}}。", back: [S1] },
      { title: "for か since か", body: "last Friday は始まった{{時点}}なので since last Friday。", back: [S1] },
    ],
  },
  {
    ...base("imi-bus", 2, "思考・判断・表現"),
    prompt: "We have been waiting for the bus since seven. の内容として、もっとも適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["私たちは7時からずっとバスを待っていて、今も待っている。", "私たちは7時にバスを待ち始めたが、今はもう待っていない。", "私たちは7時にバスに乗った。", "私たちはこれから7時までバスを待つつもりだ。"],
      correct: 0,
      why: ["正しい。have been ＋ ing は、過去に始まった動作が今まで続いていることを表す。", "have been waiting は今も続いていることを表す。もう待っていないなら We waited 〜 などと言う。", "バスに乗ったことは言っていない。", "これからの予定は will や be going to で表す。"],
    },
    point: "have been ＋ ing＝過去から今までずっと",
    steps: [{ title: "時間を線で考える", body: "7時という過去の点から{{今}}まで、待つ動作が一本の線でつながっています。だから「{{今も}}待っている」です。", back: [S1, S4] }],
  },
  // ---- 発展 ----
  {
    ...base("ayamari-knowing", 3, "思考・判断・表現"),
    prompt: "次の英文のうち、まちがいをふくむものはどれですか。",
    answer: {
      kind: "choice",
      options: ["I have been knowing Saki since we were in first grade.", "She has been reading comics all evening.", "How long have they been talking?", "He has had this watch for ten years."],
      correct: 0,
      why: ["まちがい。know は状態の動詞なので進行形にしない。I have known Saki 〜 とする。", "正しい。read は動作の動詞。「夕方からずっとまんがを読んでいる」。", "正しい。talk は動作の動詞で、長さを How long でたずねている。", "正しい。「持っている」の have は状態の動詞なので has had で継続を表している。"],
    },
    point: "know・like・want・be は進行形にしない",
    steps: [
      { title: "動作か状態か", body: "read・talk は{{動作}}、know・have（持っている）は{{状態}}の動詞です。", back: [S3] },
      { title: "状態は have ＋ 過去分詞", body: "状態の動詞の「ずっと」は現在完了の継続。have been knowing ではなく {{have known}} です。", trap: "「ずっと」と聞くと、どの動詞も have been ＋ ing にしてしまう。", back: [S3] },
    ],
  },
  {
    ...base("kumiawase-hill", 3, "思考・判断・表現"),
    prompt: "（A）（B）に入る語句の組み合わせとして正しいものはどれですか。\nI (A) Mr. Hill for three years. He (B) us English since April.",
    answer: {
      kind: "choice",
      options: ["A: have known　B: has been teaching", "A: have been knowing　B: has been teaching", "A: have known　B: has been taught", "A: am knowing　B: is teaching"],
      correct: 0,
      why: ["正しい。know は状態なので have known、teach は動作なので has been teaching。", "know は状態の動詞なので進行形にしない。", "has been taught では「教えられてきた」という受け身になり、us English と合わない。", "for three years・since April と長さや起点があるので、現在進行形ではなく現在完了の形にする。"],
    },
    point: "know→have known、teach→has been teaching",
    steps: [
      { title: "A は状態", body: "know は{{状態}}の動詞なので、for three years の継続は {{have known}}。", back: [S3] },
      { title: "B は動作", body: "teach は{{動作}}の動詞。4月から今までずっと教えているので {{has been teaching}}。", back: [S3, S2] },
    ],
  },
  {
    ...base("how-long-known", 3, "思考・判断・表現"),
    prompt: "「あなたはどのくらい（の間）小野さんと知り合いなのですか。」を表す英文として、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["How long have you known Ms. Ono?", "How long have you been knowing Ms. Ono?", "How long do you know Ms. Ono?", "How long are you knowing Ms. Ono?"],
      correct: 0,
      why: ["正しい。know は状態の動詞なので、How long ＋ 現在完了の疑問文にする。", "know は状態の動詞なので、進行形の have been knowing にはしない。", "現在形では「今までどのくらいの間」が表せない。", "know は進行形にしない。また、長さをたずねるなら現在完了にする。"],
    },
    point: "状態の動詞の How long は have ＋ 過去分詞",
    steps: [
      { title: "How long ＋ 疑問文", body: "長さは {{How long}} でたずね、そのあとに現在完了の疑問文の語順を続けます。", back: [S2] },
      { title: "know は状態", body: "know は状態の動詞なので been knowing ではなく {{have you known}}。", back: [S3] },
    ],
  },
];

const ORDER: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("narabe-games", 1),
    seconds: 60,
    prompt: "日本文に合うように、語句を並べかえなさい。\n私の弟は今朝からずっとテレビゲームをしています。",
    answer: { kind: "order", tokens: ["My brother", "has", "been", "playing", "video games", "since this morning"], distractor: "is" },
    point: "has been ＋ ing ＋ since 〜",
    steps: [{ title: "has been ＋ ing", body: "主語 My brother は3人称単数なので {{has been playing}}。「今朝から」は始まった時点なので since this morning を最後に置きます。", back: [S2, S1] }],
  },
  {
    ...base("narabe-thinking", 1),
    seconds: 60,
    prompt: "日本文に合うように、語句を並べかえなさい。\n私たちは3日間ずっとこの問題について考えています。",
    answer: { kind: "order", tokens: ["We", "have", "been", "thinking", "about this problem", "for three days"], distractor: "since" },
    point: "長さ（3日間）は for",
    steps: [{ title: "形と長さ", body: "We {{have been thinking}} about this problem。「3日間」は長さなので {{for}} three days です。", back: [S2, S1] }],
  },
  // ---- 標準 ----
  {
    ...base("narabe-baby", 2),
    seconds: 90,
    prompt: "日本文に合うように、語句を並べかえなさい。\nその赤ちゃんはどのくらいの間泣いているのですか。",
    answer: { kind: "order", tokens: ["How long", "has", "the baby", "been", "crying"], distractor: "is" },
    point: "How long ＋ has ＋ 主語 ＋ been ＋ ing",
    steps: [{ title: "長さをたずねる", body: "{{How long}} で文を始め、疑問文の語順 has the baby been crying を続けます。is は使いません。", trap: "「泣いている」から is を入れてしまう。", back: [S2, S4] }],
  },
  {
    ...base("narabe-waiting-me", 2),
    seconds: 90,
    prompt: "日本文に合うように、語句を並べかえなさい。\nあなたはずっと私を待っていたのですか（今も待っているのですか）。",
    answer: { kind: "order", tokens: ["Have", "you", "been", "waiting", "for me"], distractor: "Are" },
    point: "疑問文は Have ＋ 主語 ＋ been ＋ ing",
    steps: [{ title: "Have を主語の前に", body: "現在完了進行形の疑問文は {{Have}} you {{been waiting}} 〜? の形。Are you waiting 〜? は「今待っているか」だけをたずねる文です。", back: [S2, S4] }],
  },
  {
    ...base("narabe-known-her", 2),
    seconds: 90,
    prompt: "日本文に合うように、語句を並べかえなさい。\n私は小学生のころから彼女を知っています。",
    answer: { kind: "order", tokens: ["I", "have", "known", "her", "since", "I was in elementary school"], distractor: "been" },
    point: "know は状態の動詞 → have known",
    steps: [{ title: "been を使わない", body: "know は{{状態}}の動詞なので進行形にせず、{{have known}} her。been は使わない語です。", trap: "「ずっと」から have been knowing にしてしまう。", back: [S3] }],
  },
];

export const J_EN_3_KANRYO_SHINKO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中3",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "現在完了進行形の文法・語法", lead: "次の問いに答えなさい。", style: "mix", pick: 4, questions: GRAMMAR },
    { title: "語の並べかえ", lead: "日本文に合うように並べかえなさい。使わない語が1つふくまれています。", style: "word", pick: 2, questions: ORDER },
  ],
};
