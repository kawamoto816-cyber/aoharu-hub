// 中3英語「現在完了」の単元模試 (B: 問題プールからシードで出題)。問題・英文はすべてオリジナル。
// 大問1 文法・語法: プール13問 (基本5・標準5・発展3) から4問 (基本2・標準1・発展1)。
// 大問2 並べかえ: プール5問 (基本2・標準3) から2問 (基本1・標準1)。
// 1回6問 (基本3・標準2・発展1)。配点 基本15・標準18・発展19 → 45+36+19＝100点。選択肢・語の順もシードで変わる。
// A (生成) は使っていないので検算式はない。英文の正誤はレクチャー (lib/lecture/data/j-en-3-kanryo.ts) の要点・まちがいに合わせた。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-3-kanryo";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "形は have / has ＋ 過去分詞");
const S2 = L(2, "3つの意味：完了・経験・継続");
const S3 = L(3, "過去形は「過去だけ」、現在完了は「過去から今まで」");
const S4 = L(4, "for と since、been と gone");

const P = { 1: 15, 2: 18, 3: 19 } as const;
const T = { 1: 45, 2: 75, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const GRAMMAR: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("has-sanninsho", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nMy brother (　　) lived in Osaka since 2019.",
    answer: {
      kind: "choice",
      options: ["has", "have", "is", "was"],
      correct: 0,
      why: ["正しい。主語 My brother は3人称単数なので has ＋ 過去分詞。", "主語が3人称単数なので have ではなく has。", "is lived では「住まわされている」のような受け身の形になってしまう。", "was lived も受け身の形。since 2019（2019年から）と今までの継続なので現在完了。"],
    },
    point: "3人称単数の主語は has ＋ 過去分詞",
    steps: [{ title: "主語を見る", body: "since 2019 があるので「2019年からずっと住んでいる」という継続の現在完了。主語 My brother は3人称単数なので {{has}} lived です。", trap: "主語に関係なく have を使ってしまう。", back: [S1] }],
  },
  {
    ...base("kakobunshi-eat", 1),
    prompt: "（　）内の語を、正しい形にかえて答えなさい。\nI have already (eat) lunch.",
    answer: { kind: "term", accept: ["eaten"], near: [{ text: "ate", why: "ate は過去形。have のあとは過去分詞の eaten です。" }, { text: "eated", why: "eat は不規則動詞。eat - ate - eaten と変化します。" }] },
    point: "eat - ate - eaten。have のあとは過去分詞",
    steps: [{ title: "have ＋ 過去分詞", body: "現在完了は have ＋ {{過去分詞}}。eat は不規則動詞で eat - ate - {{eaten}} と変化します。", trap: "過去形の ate を入れてしまう。", back: [S1] }],
  },
  {
    ...base("been-to", 1),
    prompt: "日本文に合うように、（　）に入る1語を答えなさい。\n私は沖縄へ3回行ったことがあります。\nI have (　　) to Okinawa three times.",
    answer: { kind: "term", accept: ["been"], near: [{ text: "gone", why: "have gone to は「行ってしまった（今ここにいない）」。「行ったことがある」は have been to です。" }, { text: "went", why: "went は過去形。have のあとは過去分詞です。" }] },
    point: "「行ったことがある」は have been to 〜",
    steps: [{ title: "been と gone", body: "経験の「〜へ行ったことがある」は have {{been}} to 〜。three times（3回）が経験の目じるしです。", trap: "go の過去分詞 gone を入れてしまう。", back: [S4, S2] }],
  },
  {
    ...base("for-kikan", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nWe have known each other (　　) ten years.",
    answer: {
      kind: "choice",
      options: ["for", "since", "from", "ago"],
      correct: 0,
      why: ["正しい。ten years は「期間」なので for。", "since のあとには始まった時点（since 2016 など）を置く。", "from は「〜から」だが、現在完了の継続で期間を言うときは for。", "ago は過去形といっしょに使う語で、現在完了には使わない。"],
    },
    point: "期間は for、始まった時点は since",
    steps: [{ title: "期間か起点か", body: "ten years は長さ（{{期間}}）なので {{for}} ten years。「10年来の知り合いだ」という継続です。", trap: "「〜から」と訳して since を選んでしまう。", back: [S4] }],
  },
  {
    ...base("kotae-yes", 1),
    prompt: "次の問いへの答えとして正しいものはどれですか。\nHave you finished your report yet?",
    answer: {
      kind: "choice",
      options: ["Yes, I have.", "Yes, I do.", "Yes, I did.", "Yes, I am."],
      correct: 0,
      why: ["正しい。Have でたずねられたら have を使って答える。", "do は一般動詞の現在の疑問文に答えるときの形。", "did は過去形の疑問文に答えるときの形。", "am は be 動詞の疑問文に答えるときの形。"],
    },
    point: "Have 〜? には have / haven't で答える",
    steps: [{ title: "たずねた語で答える", body: "現在完了の疑問文は have を主語の前に出した形。答えるときも {{have}} を使い、Yes, I have. / No, I haven't. とします。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...base("yoho-keiken", 2, "思考・判断・表現"),
    prompt: "She has visited Nara twice. と同じ意味（用法）の現在完了をふくむ文はどれですか。",
    answer: {
      kind: "choice",
      options: ["I have seen this movie before.", "I have just cleaned my room.", "He has been sick since Monday.", "They have lived here for a long time."],
      correct: 0,
      why: ["正しい。before（以前に）があり「見たことがある」という経験。twice と同じ経験の文。", "just（ちょうど）があり「そうじしたところだ」という完了。", "since Monday があり「月曜からずっと具合が悪い」という継続。", "for a long time があり「長い間住んでいる」という継続。"],
    },
    point: "twice・before は経験、just は完了、for・since は継続",
    steps: [
      { title: "目じるしの語を探す", body: "twice（2回）は{{経験}}の目じるし。「奈良を2回訪れたことがある」です。", back: [S2] },
      { title: "選択肢も目じるしで分ける", body: "before＝経験、just＝完了、since・for＝継続。同じ経験は {{before}} の文です。", back: [S2] },
    ],
  },
  {
    ...base("kakokei-last-year", 2, "思考・判断・表現"),
    prompt: "次の英文のうち、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["I visited Kyoto last year.", "I have visited Kyoto last year.", "I have visit Kyoto last year.", "When have you visited Kyoto?"],
      correct: 0,
      why: ["正しい。last year は過去のある時点を示すので過去形。", "last year のようにはっきり過去を示す語があるときは、現在完了は使えない。", "形もまちがい。have のあとは過去分詞。それに last year があるので過去形にする。", "when（いつ）は過去の時点をたずねるので、現在完了とはいっしょに使わない。When did you visit Kyoto? とする。"],
    },
    point: "last year・〜 ago・when は過去形といっしょに",
    steps: [{ title: "過去を示すことばに注目", body: "現在完了は過去と今のつながりを表すので、{{last year・〜 ago・yesterday・when}} などの「はっきり過去」を示す語とは使いません。", trap: "「行ったことがある」と考えて last year の文に現在完了を使う。", back: [S3] }],
  },
  {
    ...base("since-kiten", 2),
    prompt: "（　）に入る1語を答えなさい。\nIt has been rainy (　　) last Sunday.（この前の日曜日からずっと雨だ）",
    answer: { kind: "term", accept: ["since"], near: [{ text: "for", why: "last Sunday は「始まった時点」。期間ではないので for ではなく since です。" }, { text: "from", why: "現在完了の継続で「〜以来」を言うときは since を使います。" }] },
    point: "始まった時点（last Sunday）の前は since",
    steps: [{ title: "起点か期間か", body: "last Sunday は雨が降りはじめた {{時点}}。時点の前には {{since}} を置きます。", back: [S4] }],
  },
  {
    ...base("yet-hitei", 2),
    prompt: "（　）に入る語として正しいものはどれですか。\nI haven't done my homework (　　).",
    answer: {
      kind: "choice",
      options: ["yet", "already", "ever", "just"],
      correct: 0,
      why: ["正しい。否定文の文末の yet は「まだ（〜していない）」。", "already（もう）はふつう肯定文で have と過去分詞の間に置く。", "ever（今までに）はおもに疑問文で使う。", "just（ちょうど）は have と過去分詞の間に置き、否定文の文末には来ない。"],
    },
    point: "否定文の文末 yet＝まだ〜していない",
    steps: [{ title: "完了の目じるし", body: "完了の文では just・already・{{yet}} を使います。否定文の文末の yet は「{{まだ}}」の意味です。", back: [S2] }],
  },
  {
    ...base("how-long", 2),
    prompt: "対話が成り立つように、（　）に入る語句として正しいものはどれですか。\nA: (　　) have you lived in this town?\nB: For about five years.",
    answer: {
      kind: "choice",
      options: ["How long", "How many", "When", "How often"],
      correct: 0,
      why: ["正しい。For about five years（約5年間）と期間で答えているので、期間をたずねる How long。", "How many は数をたずねる。あとに名詞の複数形が続く。", "when は過去の時点をたずねる語で、現在完了とはいっしょに使わない。", "How often は回数・ひんどをたずねる。"],
    },
    point: "継続の期間をたずねるのは How long 〜?",
    steps: [{ title: "答えの文から考える", body: "B は For about five years. と{{期間}}を答えています。継続の期間は {{How long}} have you 〜? でたずねます。", back: [S4, S2] }],
  },
  // ---- 発展 ----
  {
    ...base("gone-imi", 3, "思考・判断・表現"),
    prompt: "Ms. Kato has gone to London. の内容として、もっとも適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["加藤先生はロンドンへ行ってしまい、今ここにはいない。", "加藤先生はロンドンへ行ったことがある。", "加藤先生は以前ロンドンに住んでいたが、今は日本にいる。", "加藤先生はこれからロンドンへ行くつもりだ。"],
      correct: 0,
      why: ["正しい。have gone to は「〜へ行ってしまった（だから今ここにいない）」という完了。", "「行ったことがある」は has been to London。", "過去に住んでいたことは lived の文で表す。gone はそういう意味にならない。", "これからの予定は will や be going to で表す。"],
    },
    point: "has gone to＝行ってしまって今いない",
    steps: [
      { title: "been と gone", body: "have {{been}} to 〜は「行ったことがある」、have {{gone}} to 〜は「行ってしまった（今ここにいない）」。", trap: "どちらも「行った」と訳して区別しない。", back: [S4] },
      { title: "今とのつながり", body: "現在完了は、過去のできごとが今とつながっていることを表す形。gone は「行った結果、{{今はいない}}」まで伝えます。", back: [S3] },
    ],
  },
  {
    ...base("ichibun-since", 3, "思考・判断・表現"),
    prompt: "Aya started playing the piano when she was six. She still plays it. の内容を1文で表したものとして、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Aya has played the piano since she was six.", "Aya has played the piano for she was six.", "Aya played the piano since she was six.", "Aya has played the piano when she was six."],
      correct: 0,
      why: ["正しい。6歳のときから今まで続いているので継続の現在完了。始まった時点（she was six）の前は since。", "for のあとは期間。she was six（6歳だったとき）は時点なので since。", "過去形では「今も続けている」ことが表せない。since を使う継続は現在完了で。", "when は過去の時点を示すので、現在完了とはいっしょに使わない。"],
    },
    point: "過去から今まで続く＝has ＋ 過去分詞 ＋ since 〜",
    steps: [
      { title: "今も続いているか", body: "6歳で始め、{{今も}}ひいている。過去から今までの{{継続}}なので現在完了 has played。", back: [S3] },
      { title: "for か since か", body: "she was six は始まった{{時点}}なので since。since のあとには主語と動詞の文も置けます。", back: [S4] },
    ],
  },
  {
    ...base("ayamari", 3, "思考・判断・表現"),
    prompt: "次の英文のうち、まちがいをふくむものはどれですか。",
    answer: {
      kind: "choice",
      options: ["She has met him two days ago.", "He has lived here since 2015.", "Have you ever eaten natto?", "I have just finished my lunch."],
      correct: 0,
      why: ["まちがい。two days ago（2日前）は過去の時点なので、She met him two days ago. と過去形にする。", "正しい。2015年から今まで住んでいる継続。", "正しい。ever を使って経験をたずねる疑問文。", "正しい。just を使った完了の文。"],
    },
    point: "〜 ago は過去形。現在完了には使わない",
    steps: [{ title: "時を表す語をチェック", body: "現在完了の文に {{ago}}・yesterday・last 〜 があったら誤り。two days ago は過去形 {{met}} で表します。", back: [S3] }],
  },
];

const ORDER: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("narabe-already", 1),
    seconds: 60,
    prompt: "日本文に合うように、語を並べかえなさい。\n私はもう自分の部屋をそうじしました。",
    answer: { kind: "order", tokens: ["I", "have", "already", "cleaned", "my room"], alsoOk: [[0, 1, 3, 4, 2]], distractor: "did" },
    point: "already は have と過去分詞の間",
    steps: [{ title: "have ＋ already ＋ 過去分詞", body: "「もう〜した」は完了。I {{have already cleaned}} my room. の順で、already は have と過去分詞の間に置きます。", back: [S2, S1] }],
  },
  {
    ...base("narabe-ever", 1),
    seconds: 60,
    prompt: "日本文に合うように、語を並べかえなさい。\nあなたは今までに富士山に登ったことがありますか。",
    answer: { kind: "order", tokens: ["Have", "you", "ever", "climbed", "Mt. Fuji"], distractor: "did" },
    point: "疑問文は Have ＋ 主語 ＋ ever ＋ 過去分詞",
    steps: [{ title: "Have を主語の前に", body: "現在完了の疑問文は {{Have}} you 〜? の形。経験をたずねる ever は過去分詞の前に置きます。do・did は使いません。", back: [S1, S2] }],
  },
  // ---- 標準 ----
  {
    ...base("narabe-since-children", 2),
    seconds: 90,
    prompt: "日本文に合うように、語句を並べかえなさい。\n私たちは子どものころからずっと友だちです。",
    answer: { kind: "order", tokens: ["We", "have", "been", "friends", "since", "we were children"], distractor: "for" },
    point: "be 動詞の継続は have been、時点の前は since",
    steps: [
      { title: "be 動詞の現在完了", body: "「ずっと友だちだ」は be 動詞の継続。be の過去分詞を使って {{have been}} friends。", back: [S1] },
      { title: "起点は since", body: "「子どものころから」は始まった時点なので {{since}} we were children。", back: [S4] },
    ],
  },
  {
    ...base("narabe-not-yet", 2),
    seconds: 90,
    prompt: "日本文に合うように、語句を並べかえなさい。\n彼はまだその手紙を書いていません。",
    answer: { kind: "order", tokens: ["He", "has", "not", "written", "the letter", "yet"], distractor: "wrote" },
    point: "has not ＋ 過去分詞 〜 yet",
    steps: [{ title: "否定文と yet", body: "否定文は has のあとに {{not}}。write の過去分詞は {{written}}。「まだ」の yet は文末に置きます。", trap: "過去形 wrote を使ってしまう。", back: [S1, S2] }],
  },
  {
    ...base("narabe-how-long", 2),
    seconds: 90,
    prompt: "日本文に合うように、語句を並べかえなさい。\nその店はどのくらいの間ここにありますか。",
    answer: { kind: "order", tokens: ["How long", "has", "the shop", "been", "here"], distractor: "did" },
    point: "How long ＋ have / has ＋ 主語 ＋ 過去分詞",
    steps: [{ title: "期間をたずねる", body: "継続の期間は {{How long}} で文を始め、そのあとに疑問文の語順 has the shop been here を続けます。", back: [S4] }],
  },
];

export const J_EN_3_KANRYO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中3",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "現在完了の文法・語法", lead: "次の問いに答えなさい。", style: "mix", pick: 4, questions: GRAMMAR },
    { title: "語の並べかえ", lead: "日本文に合うように並べかえなさい。使わない語が1つふくまれています。", style: "word", pick: 2, questions: ORDER },
  ],
};
