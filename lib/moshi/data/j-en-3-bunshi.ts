// 中3英語「分詞の後置修飾」の単元模試 (B: 問題プールからシードで出題)。問題・英文はすべてオリジナル。
// 大問1 文法・語法: プール13問 (基本5・標準5・発展3) から4問 (基本2・標準1・発展1)。
// 大問2 並べかえ: プール5問 (基本2・標準3) から2問 (基本1・標準1)。
// 1回6問 (基本3・標準2・発展1)。配点 基本15・標準18・発展19 → 45+36+19＝100点。選択肢・語の順もシードで変わる。
// A (生成) は使っていないので検算式はない。英文の正誤はレクチャー (lib/lecture/data/j-en-3-bunshi.ts) の要点・まちがいに合わせた。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-3-bunshi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "分詞は形容詞のように名詞を説明する");
const S2 = L(2, "1語なら前、2語以上ならうしろ");
const S3 = L(3, "-ing か過去分詞かは「する側・される側」");
const S4 = L(4, "文の中では主語のかたまりに注意");

const P = { 1: 15, 2: 18, 3: 19 } as const;
const T = { 1: 45, 2: 75, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const GRAMMAR: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("carrying-box", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nLook at the boy (　　) a big box.",
    answer: {
      kind: "choice",
      options: ["carrying", "carried", "carries", "carry"],
      correct: 0,
      why: ["正しい。少年は箱を「運んでいる」側なので現在分詞 carrying。", "carried は「運ばれた」。少年は運ばれる側ではない。", "carries は動詞の形。文の動詞は Look なので、名詞を説明するのは分詞。", "原形 carry は名詞のうしろに置いて説明できない。"],
    },
    point: "「〜している」は現在分詞 -ing",
    steps: [{ title: "する側か、される側か", body: "the boy と carry の関係は、少年が{{運ぶ側}}。「〜している」なので現在分詞 {{carrying}} が a big box とまとまって the boy を説明します。", back: [S3, S1] }],
  },
  {
    ...base("sung-song", 1),
    prompt: "（　）内の語を、正しい形にかえて答えなさい。\nEveryone knows the song (sing) by that group.",
    answer: { kind: "term", accept: ["sung"], near: [{ text: "singing", why: "歌は「歌われる側」なので過去分詞です。singing は「歌っている」。" }, { text: "sang", why: "sang は過去形。名詞を説明する「歌われた」は過去分詞 sung です。" }, { text: "singed", why: "sing は不規則動詞。sing - sang - sung と変化します。" }] },
    point: "sing - sang - sung。「〜された」は過去分詞",
    steps: [{ title: "歌は歌われる側", body: "the song と sing の関係は「歌われる」。by that group（そのグループによって）もヒントです。過去分詞 {{sung}} を使います。", trap: "過去形 sang を入れてしまう。", back: [S3] }],
  },
  {
    ...base("boiled-egg", 1),
    prompt: "「ゆで卵（ゆでられた卵）」を表す英語として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["a boiled egg", "a boiling egg", "an egg boiled", "a boil egg"],
      correct: 0,
      why: ["正しい。卵は「ゆでられた」側なので過去分詞。1語なので名詞の前に置く。", "boiling は「（自分が）ゆでている・わいている」。卵はゆでられる側。", "分詞が1語だけのときは、名詞の前に置く。", "原形 boil では「ゆでられた」の意味にならない。"],
    },
    point: "1語の分詞は名詞の前",
    steps: [
      { title: "される側なので過去分詞", body: "卵は{{ゆでられる側}}なので過去分詞 boiled。", back: [S3] },
      { title: "1語なら前", body: "boiled 1語だけなので、ふつうの形容詞と同じく名詞の{{前}}に置きます。", back: [S2] },
    ],
  },
  {
    ...base("feeding-birds", 1),
    prompt: "（　）内の語を、正しい形にかえて答えなさい。\nThe old man (feed) the birds in the park is my grandfather.",
    answer: { kind: "term", accept: ["feeding"], near: [{ text: "fed", why: "fed は「えさを与えられた」。おじいさんはえさを与える側なので feeding です。" }, { text: "feeds", why: "文の動詞は is。the old man を説明する分詞にするので feeding です。" }] },
    point: "名詞が「する側」なら -ing",
    steps: [{ title: "する側か", body: "おじいさんは鳥にえさを{{やる側}}なので現在分詞 {{feeding}}。文の動詞は is なので、feeds にはしません。", back: [S3, S4] }],
  },
  {
    ...base("imi-bridge", 1),
    prompt: "the bridge built in 1960 の意味として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["1960年に建てられた橋", "1960年に橋を建てた人", "1960年に橋を建てていること", "橋は1960年に建てる予定だ"],
      correct: 0,
      why: ["正しい。built in 1960 が the bridge をうしろから説明している。", "人を表す語はどこにもない。built は「建てられた」で、the bridge を説明する。", "built は過去分詞で、「建てていること」の意味にはならない。", "文の動詞がないので「〜だ」という文ではない。名詞のまとまり。"],
    },
    point: "後置修飾はうしろから前へ訳す",
    steps: [{ title: "うしろから訳す", body: "built in 1960（1960年に建てられた）が the bridge を{{うしろから}}説明しています。日本語では「{{1960年に建てられた}}橋」とうしろから前へもどって訳します。", back: [S2, S1] }],
  },
  // ---- 標準 ----
  {
    ...base("sent-postcard", 2),
    prompt: "（　）に入る語として正しいものはどれですか。\nThe postcard (　　) from Hawaii arrived yesterday.",
    answer: {
      kind: "choice",
      options: ["sent", "sending", "sends", "send"],
      correct: 0,
      why: ["正しい。はがきは「送られた」側なので過去分詞 sent。文の動詞は arrived。", "sending は「送っている」。はがきは送る側ではない。", "文の動詞はすでに arrived がある。sends を入れると動詞が2つになる。", "原形 send は名詞のうしろに置いて説明できない。"],
    },
    point: "物が主語のかたまりなら過去分詞が多い",
    steps: [
      { title: "される側", body: "はがきは{{送られる側}}なので過去分詞 sent（send - sent - sent）。", back: [S3] },
      { title: "本当の動詞", body: "The postcard sent from Hawaii が主語のかたまりで、文の動詞は {{arrived}} です。", back: [S4] },
    ],
  },
  {
    ...base("gojun-swimming", 2, "思考・判断・表現"),
    prompt: "「川で泳いでいる男の子」を表す英語として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["the boy swimming in the river", "the swimming in the river boy", "the boy swim in the river", "the boy swum in the river"],
      correct: 0,
      why: ["正しい。swimming in the river と2語以上なので、名詞のうしろに置く。", "語句がついて2語以上になった分詞は、名詞の前には置けない。", "原形 swim では名詞を説明できない。", "swum は過去分詞で「泳がれた」の意味になってしまう。男の子は泳ぐ側。"],
    },
    point: "2語以上の分詞のかたまりは名詞のうしろ",
    steps: [{ title: "かたまりは何語？", body: "swimming in the river は{{2語以上}}のかたまり。名詞 the boy の{{うしろ}}に置きます（後置修飾）。", trap: "日本語の順に「泳いでいる」を前に出してしまう。", back: [S2] }],
  },
  {
    ...base("found-bag", 2),
    prompt: "（　）内の語を、正しい形にかえて答えなさい。\nThe bag (find) under the desk was Yumi's.",
    answer: { kind: "term", accept: ["found"], near: [{ text: "finding", why: "かばんは「見つけられた」側なので過去分詞です。finding は「見つけている」。" }, { text: "finded", why: "find は不規則動詞。find - found - found と変化します。" }] },
    point: "find - found - found",
    steps: [{ title: "見つけられた側", body: "かばんは{{見つけられる側}}。過去分詞 {{found}} under the desk が the bag を説明し、文の動詞は was です。", back: [S3, S4] }],
  },
  {
    ...base("are-children", 2, "思考・判断・表現"),
    prompt: "（　）に入る語として正しいものはどれですか。\nThe children playing in the yard (　　) my cousins.",
    answer: {
      kind: "choice",
      options: ["are", "is", "am", "be"],
      correct: 0,
      why: ["正しい。主語は The children（複数）なので are。", "the yard につられて is にしない。主語は children。", "am は主語が I のときだけ。", "原形 be は文の動詞として置けない。"],
    },
    point: "主語のかたまりの中心の名詞で動詞を決める",
    steps: [{ title: "主語の中心はどれ？", body: "The children {{playing in the yard}} が主語のかたまり。中心は children（複数）なので動詞は {{are}} です。", trap: "動詞のすぐ前の the yard に合わせてしまう。", back: [S4] }],
  },
  {
    ...base("hondoushi-looks", 2, "思考・判断・表現"),
    prompt: "The man wearing a white hat at the corner looks tired. の文の動詞（「〜は…だ」の「だ」にあたる語）はどれですか。",
    answer: {
      kind: "choice",
      options: ["looks", "wearing", "hat", "tired"],
      correct: 0,
      why: ["正しい。The man wearing a white hat at the corner が主語のかたまりで、動詞は looks（〜に見える）。", "wearing は the man を説明する分詞。文の動詞ではない。", "hat は名詞。", "tired は looks のあとで様子を表す語（つかれて）。"],
    },
    point: "分詞のかたまりのあとに本当の動詞が来る",
    steps: [{ title: "かたまりの終わりを探す", body: "wearing a white hat at the corner は the man の説明。かたまりが終わったところの {{looks}} が文の動詞です。「角で白いぼうしをかぶっている男の人はつかれているように見える」。", back: [S4] }],
  },
  // ---- 発展 ----
  {
    ...base("ayamari", 3, "思考・判断・表現"),
    prompt: "次の英文のうち、まちがいをふくむものはどれですか。",
    answer: {
      kind: "choice",
      options: ["This is a cap selling at that shop.", "I have a cousin living in Australia.", "Do you know the singer loved by many young people?", "There are some apples left on the table."],
      correct: 0,
      why: ["まちがい。ぼうしは「売られている」側なので sold にする。This is a cap sold at that shop.", "正しい。いとこは「住んでいる」側なので living。", "正しい。歌手は「愛されている」側なので loved。", "正しい。りんごは「残された」側なので left（leave の過去分詞）。"],
    },
    point: "物が「される側」なのに -ing にしていないか",
    steps: [{ title: "名詞と動作の関係", body: "a cap と sell の関係は、ぼうしが{{売られる側}}。過去分詞 {{sold}} にします。ほかの文も、名詞が「する側」か「される側」かで確かめます。", trap: "「売っている」と日本語で考えて selling にする。", back: [S3] }],
  },
  {
    ...base("ichibun-bird", 3, "思考・判断・表現"),
    prompt: "Look at the bird. It is flying over the river. の内容を1文で表したものとして、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Look at the bird flying over the river.", "Look at the flying over the river bird.", "Look at the bird flown over the river.", "Look at the bird flies over the river."],
      correct: 0,
      why: ["正しい。flying over the river が the bird をうしろから説明している。", "2語以上のかたまりは名詞の前に置けない。", "flown は過去分詞で「飛ばされた」の意味になる。鳥は飛ぶ側。", "文の動詞は Look。flies を入れると動詞が2つになる。"],
    },
    point: "2文目の It is 〜ing を分詞のかたまりにしてつなぐ",
    steps: [
      { title: "It は the bird", body: "2文目の It は the bird。「川の上を{{飛んでいる}}鳥」として、flying over the river を the bird につなぎます。", back: [S3] },
      { title: "うしろに置く", body: "flying over the river は2語以上なので名詞の{{うしろ}}です。", back: [S2] },
    ],
  },
  {
    ...base("tshirts-are", 3, "思考・判断・表現"),
    prompt: "（　）に入る語句として正しいものはどれですか。\nThe T-shirts sold at this store (　　) very cheap.",
    answer: {
      kind: "choice",
      options: ["are", "is", "sell", "selling"],
      correct: 0,
      why: ["正しい。The T-shirts sold at this store が主語のかたまり。主語は複数なので are。", "this store につられて is にしない。主語の中心は T-shirts。", "sold を文の動詞と考えると sell を入れたくなるが、sold は T-shirts を説明する過去分詞。文には動詞がまだない。", "selling は分詞で、文の動詞にならない。"],
    },
    point: "sold は動詞ではなく、名詞を説明する過去分詞",
    steps: [
      { title: "sold の役わり", body: "sold at this store は「この店で{{売られている}}」で、The T-shirts の説明。過去形の動詞ではありません。", trap: "sold を文の動詞とかんちがいする。", back: [S3, S4] },
      { title: "本当の動詞を入れる", body: "主語のかたまりの中心は T-shirts（複数）。文の動詞は {{are}} です。", back: [S4] },
    ],
  },
];

const ORDER: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("narabe-singing", 1),
    seconds: 60,
    prompt: "日本文に合うように、語句を並べかえなさい。\nあそこで歌っている女の子は私のクラスメートです。",
    answer: { kind: "order", tokens: ["The girl", "singing", "over there", "is", "my classmate"], distractor: "sings" },
    point: "名詞＋-ing＋語句、そのあとに文の動詞",
    steps: [{ title: "主語のかたまり", body: "The girl {{singing over there}} が主語のかたまり。そのあとに文の動詞 {{is}} を置きます。", back: [S2, S4] }],
  },
  {
    ...base("narabe-planted", 1),
    seconds: 60,
    prompt: "日本文に合うように、語句を並べかえなさい。\nこれは祖母が植えた木です（祖母によって植えられた木です）。",
    answer: { kind: "order", tokens: ["This", "is", "a tree", "planted", "by", "my grandmother"], distractor: "planting" },
    point: "名詞＋過去分詞＋by 〜",
    steps: [{ title: "植えられた側", body: "木は{{植えられる側}}なので過去分詞 planted。by my grandmother をつけて a tree のうしろに置きます。", back: [S3, S2] }],
  },
  // ---- 標準 ----
  {
    ...base("narabe-reading", 2),
    seconds: 90,
    prompt: "日本文に合うように、語句を並べかえなさい。\n教室で本を読んでいる男の子はだれですか。",
    answer: { kind: "order", tokens: ["Who", "is", "the boy", "reading", "a book", "in the classroom"], distractor: "reads" },
    point: "Who is ＋ 名詞 ＋ -ing 〜?",
    steps: [{ title: "疑問文の中の後置修飾", body: "Who is the boy? の the boy を、{{reading a book in the classroom}} がうしろから説明します。", back: [S2] }],
  },
  {
    ...base("narabe-cheese", 2),
    seconds: 90,
    prompt: "日本文に合うように、語句を並べかえなさい。\n私はフランスで作られたチーズを食べました。",
    answer: { kind: "order", tokens: ["I", "ate", "some cheese", "made", "in France"], distractor: "making" },
    point: "作られた側なので過去分詞 made",
    steps: [{ title: "される側を見ぬく", body: "チーズは{{作られる側}}なので過去分詞 made。made in France を some cheese のうしろに置きます。", back: [S3, S2] }],
  },
  {
    ...base("narabe-waiting", 2),
    seconds: 90,
    prompt: "日本文に合うように、語句を並べかえなさい。\n門のそばで待っている女性は私たちの先生です。",
    answer: { kind: "order", tokens: ["The woman", "waiting", "by the gate", "is", "our teacher"], distractor: "waited" },
    point: "主語のかたまりのあとに is",
    steps: [{ title: "する側と主語のかたまり", body: "女性は{{待っている側}}なので waiting。The woman waiting by the gate までが主語で、そのあとに {{is}} を置きます。", back: [S3, S4] }],
  },
];

export const J_EN_3_BUNSHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中3",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    { title: "分詞の文法・語法", lead: "次の問いに答えなさい。", style: "mix", pick: 4, questions: GRAMMAR },
    { title: "語の並べかえ", lead: "日本文に合うように並べかえなさい。使わない語が1つふくまれています。", style: "word", pick: 2, questions: ORDER },
  ],
};
