// 中3英語「仮定法」の単元模試 (B: 問題プールからシードで出題)。問題・英文はすべてオリジナル。
// 大問1 文法・語法: プール14問 (基本5・標準6・発展3) から4問 (基本2・標準1・発展1)。
// 大問2 並べかえ: プール5問 (基本2・標準3) から2問 (基本1・標準1)。
// 1回6問 (基本3・標準2・発展1)。配点 基本15・標準18・発展19 → 45+36+19＝100点。選択肢・語の順もシードで変わる。
// A (生成) は使っていないので検算式はない。英文の正誤はレクチャー (lib/lecture/data/j-en-3-katei.ts) の要点・まちがいに合わせた。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-3-katei";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "ふつうの if と仮定法のちがい");
const S2 = L(2, "形は「If＋過去形, would / could＋原形」");
const S3 = L(3, "be動詞は主語に関係なく were");
const S4 = L(4, "I wish で「〜ならいいのに」");
const S5 = L(5, "歌と映画に生きる仮定法");

const P = { 1: 15, 2: 18, 3: 19 } as const;
const T = { 1: 45, 2: 75, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const GRAMMAR: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("were-sister", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nIf my sister (　　) at home now, she would fix my computer.",
    answer: {
      kind: "choice",
      options: ["were", "is", "be", "has"],
      correct: 0,
      why: ["正しい。後半が would なので仮定法。if の中の be動詞は主語に関係なく were。", "is はふつうの条件の形。後半が would の仮定法では過去形にする。", "be は原形。if の中には置けない。", "has は「持っている」。at home の前に入れても意味が通らない。"],
    },
    point: "仮定法の if の中の be動詞は were",
    steps: [{ title: "後半の would に注目", body: "後半が {{would}}＋原形なので、今の現実とちがう想像（仮定法）。if の中の be動詞は主語が my sister でも {{were}} です。", trap: "now があるので現在形 is を選んでしまう。", back: [S3, S2] }],
  },
  {
    ...base("would-hokkaido", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nIf we lived in Hokkaido, we (　　) go skiing every weekend.",
    answer: {
      kind: "choice",
      options: ["would", "will", "are", "did"],
      correct: 0,
      why: ["正しい。if の中が過去形 lived の仮定法なので、後半は would＋原形。", "will はふつうの条件の後半で使う形。仮定法では would にする。", "are のあとに原形 go は続かない。", "did go では「行った」という過去の事実の文になってしまう。"],
    },
    point: "仮定法の後半は would＋動詞の原形",
    steps: [{ title: "if の中が過去形", body: "If we {{lived}} 〜 は「（実際は住んでいないが）もし住んでいたら」という想像。後半は will ではなく {{would}}＋原形 go です。", trap: "ふつうの条件と同じ will を使ってしまう。", back: [S2] }],
  },
  {
    ...base("wish-had-room", 1),
    prompt: "日本文に合うように、（　）に入る1語を答えなさい。\n自分の部屋があればいいのになあ。\nI wish I (　　) my own room.",
    answer: { kind: "term", accept: ["had"], near: [{ text: "have", why: "I wish のあとは過去形にします。have の過去形は had です。" }, { text: "has", why: "主語は I。それに I wish のあとは過去形の had にします。" }] },
    point: "I wish＋主語＋過去形で「〜ならいいのに」",
    steps: [{ title: "I wish のあとは過去形", body: "実際は部屋がない、という現実とちがう願い。{{I wish＋主語＋過去形}}なので have を {{had}} にします。", trap: "今の話なので have のままにしてしまう。", back: [S4] }],
  },
  {
    ...base("wish-could-unicycle", 1),
    prompt: "日本文に合うように、（　）に入る1語を答えなさい。\n一輪車に乗れたらいいのに。\nI wish I (　　) ride a unicycle.",
    answer: { kind: "term", accept: ["could"], near: [{ text: "can", why: "I wish のあとは助動詞も過去形にします。can は could です。" }, { text: "would", why: "「〜できればいいのに」は can の過去形 could を使います。" }] },
    point: "「〜できればいいのに」は I wish I could 〜",
    steps: [{ title: "can を過去形に", body: "「乗れたら」は「できる」の can。I wish のあとなので過去形 {{could}} にします。", trap: "I wish I can 〜 としてしまう。", back: [S4] }],
  },
  {
    ...base("futsuu-rains", 1, "思考・判断・表現"),
    prompt: "（　）に入る語句として正しいものはどれですか。\nIf it (　　) tomorrow, the soccer game will be canceled.",
    answer: {
      kind: "choice",
      options: ["rains", "rained", "would rain", "rain"],
      correct: 0,
      why: ["正しい。明日雨が降ることは起こりうるので、ふつうの条件。if の中は現在形。", "過去形にするのは、現実とちがう想像のとき。後半も will なので仮定法ではない。", "would は仮定法の後半で使う形。if の中には置かない。", "主語 it は3人称単数なので rains。"],
    },
    point: "起こりうる条件は if＋現在形、後半は will",
    steps: [{ title: "起こりうるか考える", body: "明日雨が降るかどうかはまだわからない＝{{起こりうる}}こと。ふつうの条件なので if の中は現在形 {{rains}}、後半は will です。", trap: "未来の話なので will rain にしたり、if だから過去形にしたりする。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...base("imi-address", 2, "思考・判断・表現"),
    prompt: "If Mr. Sato knew my address, he would send me a postcard. の内容として、もっとも適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["佐藤さんは私の住所を知らないので、はがきは来ない。", "佐藤さんは以前、私の住所を知っていた。", "佐藤さんは私の住所を知っているので、はがきを送ってくれる。", "佐藤さんは私にはがきを送ってくれた。"],
      correct: 0,
      why: ["正しい。knew・would の仮定法は、今の現実とちがう想像。実際は住所を知らない。", "形は過去形だが、意味は「今」。昔の話ではない。", "知っているなら、ふつうの文 He knows my address, so he will 〜 になる。", "would send は「送るだろうに」という想像。送ったという事実ではない。"],
    },
    point: "過去形の仮定法は「今の現実とちがう想像」",
    steps: [
      { title: "形を見る", body: "if の中が過去形 knew、後半が {{would}}＋原形なので仮定法です。", back: [S2] },
      { title: "裏返すと現実", body: "仮定法は現実の反対。「もし知っていたら」の裏は「{{実際は知らない}}」。だからはがきは来ません。", trap: "knew を見て、昔の話だと思ってしまう。", back: [S1] },
    ],
  },
  {
    ...base("kakikae-smartphone", 2, "思考・判断・表現"),
    prompt: "I don't have a smartphone, so I can't take pictures. とほぼ同じ内容を表す文はどれですか。",
    answer: {
      kind: "choice",
      options: ["If I had a smartphone, I could take pictures.", "If I have a smartphone, I can take pictures.", "If I had a smartphone, I can take pictures.", "If I didn't have a smartphone, I could take pictures."],
      correct: 0,
      why: ["正しい。現実（持っていない・とれない）の反対を、過去形 had と could で想像している。", "現在形と can では「持っていればとれる」というふつうの条件になり、持っていないことが伝わらない。", "if の中を過去形にしたら、後半も could にする。can のままではまちがい。", "「持っていなければとれる」となり、意味が反対になる。"],
    },
    point: "現実の否定文 → 仮定法では肯定の過去形",
    steps: [
      { title: "現実をひっくり返す", body: "現実は「持っていない・とれない」。仮定法では反対の「持っていたら・とれるのに」を想像します。don't have → {{had}}、can't → {{could}}。", back: [S2] },
      { title: "前後そろえて過去形", body: "if の中を過去形にしたら、後半も would / could にそろえます。", trap: "if の中だけ過去形にして、後半を can のままにする。", back: [S2] },
    ],
  },
  {
    ...base("were-you-truth", 2),
    prompt: "（　）内の語を、正しい形にかえて答えなさい。\nIf I (be) you, I would tell her the truth.",
    answer: { kind: "term", accept: ["were"], near: [{ text: "was", why: "会話では was も使われますが、テストでは主語が I でも were と答えましょう。" }, { text: "am", why: "後半が would の仮定法なので、be動詞は過去形の were にします。" }] },
    point: "If I were you＝「もし私があなたなら」（助言）",
    steps: [{ title: "助言の決まった言い方", body: "If I {{were}} you, I would 〜. は「私があなたなら〜するだろう」とやわらかく助言する言い方。主語が I でも {{were}} を使います。", trap: "主語が I なので was にしてしまう。", back: [S3] }],
  },
  {
    ...base("wish-train", 2),
    prompt: "（　）に入る語句として正しいものはどれですか。\nThis train is so slow. I wish it (　　) faster.",
    answer: {
      kind: "choice",
      options: ["went", "goes", "will go", "go"],
      correct: 0,
      why: ["正しい。実際はおそいので、現実とちがう願い。I wish のあとは過去形 went。", "現在形では「〜ならいいのに」の意味にならない。I wish のあとは過去形。", "will は I wish のあとの「今の願い」には使わない。", "主語 it のあとに原形 go は置けない。I wish のあとは過去形。"],
    },
    point: "I wish のあとは一般動詞も過去形",
    steps: [{ title: "現実と願い", body: "現実は「とてもおそい」。その反対を願うので I wish it {{went}} faster.（もっと速く走ればいいのに）。go の過去形 went です。", back: [S4] }],
  },
  {
    ...base("would-come-party", 2, "思考・判断・表現"),
    prompt: "対話が成り立つように、（　）に入る語句として正しいものはどれですか。\nA: Can you come to the party tonight?\nB: I'm sorry. I (　　) if I didn't have to look after my little brother.",
    answer: {
      kind: "choice",
      options: ["would come", "will come", "came", "come"],
      correct: 0,
      why: ["正しい。if の中が didn't have の仮定法。「弟の世話がなければ行くのに（実際は行けない）」。", "will はふつうの条件。if の中が過去形の仮定法では would にする。", "came では「来た」という過去の事実になってしまう。", "if の中が過去形なので、後半は would＋原形にする。"],
    },
    point: "否定の過去形 didn't 〜 も仮定法の if の中に置ける",
    steps: [
      { title: "if の中を見る", body: "if I {{didn't have to}} 〜 は過去形。今夜の話なのに過去形なので、現実とちがう想像です。", back: [S2] },
      { title: "後半は would", body: "後半は {{would}} come。「行けたら行くのに」と、やんわりことわっています。", back: [S2] },
    ],
  },
  {
    ...base("song-rich-man", 2, "思考・判断・表現"),
    prompt: "ミュージカルの歌の題名 If I Were a Rich Man が表している内容として、もっとも適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["実際は金持ちではないが、金持ちになった自分を想像している。", "昔は金持ちだったことを思い出している。", "これから金持ちになるつもりだと決めている。", "自分が金持ちであることをじまんしている。"],
      correct: 0,
      why: ["正しい。were を使った仮定法なので、今の現実とちがう想像。", "were は過去形だが、仮定法では「昔」ではなく「今」の想像を表す。", "これからの予定は will や be going to で表す。", "金持ちなら If 〜 を使わず I am a rich man. と言う。"],
    },
    point: "If I were 〜＝実際はちがうが「もし〜なら」",
    steps: [{ title: "were は想像のしるし", body: "主語が I なのに {{were}}。仮定法の形なので、題名は「もし私が金持ちなら」という{{現実とちがう想像}}です。", trap: "過去形を見て、昔の話だと思う。", back: [S5, S3] }],
  },
  // ---- 発展 ----
  {
    ...base("ayamari", 3, "思考・判断・表現"),
    prompt: "次の英文のうち、まちがいをふくむものはどれですか。",
    answer: {
      kind: "choice",
      options: ["If I am taller, I could reach the top shelf.", "If it snows tonight, we will make a snowman.", "I wish I could talk with animals.", "If she had a map, she wouldn't get lost."],
      correct: 0,
      why: ["まちがい。後半が could の仮定法なので、if の中も過去形 were にする。If I were taller, 〜.", "正しい。雪は降るかもしれないので、ふつうの条件（現在形＋will）。", "正しい。I wish のあとは could＋原形。", "正しい。過去形 had と wouldn't＋原形の仮定法。"],
    },
    point: "仮定法は if の中も後半も過去形にそろえる",
    steps: [
      { title: "前半と後半をそろえる", body: "後半が {{could}} なら仮定法。if の中も過去形にし、be動詞は {{were}} にします。", trap: "if の中だけ現在形のまま残す。", back: [S2, S3] },
      { title: "ふつうの条件も正しい", body: "雪が降るのは起こりうること。現在形＋will の文は正しい英文です。", back: [S1] },
    ],
  },
  {
    ...base("souzou-dore", 3, "思考・判断・表現"),
    prompt: "次の英文のうち、話し手が「実際にはそうではない」と考えているものはどれですか。",
    answer: {
      kind: "choice",
      options: ["If I had wings, I would fly over the mountains.", "If you are tired, you can sit here.", "If Ken comes, we will start the meeting.", "When I was a child, I lived in Kobe."],
      correct: 0,
      why: ["正しい。had・would の仮定法。人につばさはないので、現実とちがう想像。", "現在形＋can のふつうの条件。相手はつかれているかもしれない。", "現在形＋will のふつうの条件。ケンは来るかもしれない。", "when の文の過去形は、本当にあった過去の事実。"],
    },
    point: "仮定法かどうかは「過去形＋would / could」で見分ける",
    steps: [
      { title: "形で見分ける", body: "if の中が過去形で、後半が {{would / could}} なら仮定法。現在形＋will / can はふつうの条件です。", back: [S1, S2] },
      { title: "過去形がいつも想像ではない", body: "When I was a child 〜 の過去形は本当の{{過去}}。仮定法の過去形は if や I wish といっしょに使われます。", back: [S1] },
    ],
  },
  {
    ...base("wish-camping", 3, "思考・判断・表現"),
    prompt: "I'm sorry I can't go camping with you. の気持ちを I wish で表した文として、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["I wish I could go camping with you.", "I wish I can go camping with you.", "I wish I couldn't go camping with you.", "I wish I will go camping with you."],
      correct: 0,
      why: ["正しい。行けない現実の反対を願うので、can't → could（肯定）。", "I wish のあとは過去形。can は could にする。", "「行けなければいいのに」となり、意味が反対。", "will は I wish のあとの今の願いには使わない。"],
    },
    point: "I wish は現実の反対を過去形で。can't → could",
    steps: [
      { title: "現実をひっくり返す", body: "現実は「行けない（can't go）」。願いはその反対の「行けたらいいのに」なので、{{肯定}}にします。", trap: "現実の not をそのまま残して couldn't にする。", back: [S4] },
      { title: "can を過去形に", body: "I wish のあとは過去形。{{could}} go camping with you. となります。", back: [S4] },
    ],
  },
];

const ORDER: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("narabe-were-you", 1),
    seconds: 60,
    prompt: "日本文に合うように、語句を並べかえなさい。\nもし私があなたなら、もっと早く寝るでしょう。",
    answer: { kind: "order", tokens: ["If", "I", "were", "you,", "I", "would", "go to bed", "earlier"], distractor: "am" },
    point: "If I were you, I would 〜.",
    steps: [{ title: "助言の決まった形", body: "前半は If I {{were}} you,、後半は I {{would}}＋原形。主語が I でも am ではなく were を使います。", back: [S3, S2] }],
  },
  {
    ...base("narabe-wish-sing", 1),
    seconds: 60,
    prompt: "日本文に合うように、語句を並べかえなさい。\n私がもっと上手に歌えたらいいのに。",
    answer: { kind: "order", tokens: ["I", "wish", "I", "could", "sing", "better"], distractor: "can" },
    point: "I wish I could＋原形",
    steps: [{ title: "I wish＋主語＋could", body: "「〜できたらいいのに」は I wish I {{could}}＋原形。can は使いません。better（もっと上手に）は文の最後です。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...base("narabe-bike-lake", 2),
    seconds: 90,
    prompt: "日本文に合うように、語句を並べかえなさい。\nもし自転車を持っていたら、私は湖まで行けるのに。",
    answer: { kind: "order", tokens: ["If", "I", "had", "a bike,", "I", "could", "ride", "to the lake"], distractor: "have" },
    point: "If＋過去形, could＋原形",
    steps: [{ title: "持っていない現実の反対", body: "実際は持っていないので仮定法。if の中は have の過去形 {{had}}、後半は「行けるのに」なので {{could}} ride です。", back: [S2] }],
  },
  {
    ...base("narabe-aunt", 2),
    seconds: 90,
    prompt: "日本文に合うように、語句を並べかえなさい。\nもしおばが近くに住んでいたら、私は毎週会いに行くだろう。",
    answer: { kind: "order", tokens: ["If", "my aunt", "lived", "near us,", "I", "would", "visit her", "every week"], distractor: "lives" },
    point: "主語が3人称でも if の中は過去形",
    steps: [{ title: "現在形 lives は使わない", body: "実際は近くに住んでいないので仮定法。my aunt が主語でも if の中は過去形 {{lived}}。後半は {{would}} visit her です。", trap: "主語が3人称単数なので lives を選ぶ。", back: [S2] }],
  },
  {
    ...base("narabe-wish-house", 2),
    seconds: 90,
    prompt: "日本文に合うように、語句を並べかえなさい。\n私の家がもっと学校に近ければいいのに。",
    answer: { kind: "order", tokens: ["I", "wish", "my house", "were", "closer to", "the school"], distractor: "is" },
    point: "I wish＋主語＋were",
    steps: [{ title: "I wish のあとの be動詞", body: "I wish のあとも過去形。be動詞は主語 my house でも {{were}} にします。closer to 〜 は「〜にもっと近い」。", back: [S4, S3] }],
  },
];

export const J_EN_3_KATEI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中3",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "仮定法の文法・語法", lead: "次の問いに答えなさい。", style: "mix", pick: 4, questions: GRAMMAR },
    { title: "語の並べかえ", lead: "日本文に合うように並べかえなさい。使わない語が1つふくまれています。", style: "word", pick: 2, questions: ORDER },
  ],
};
