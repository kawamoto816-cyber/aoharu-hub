// 中3英語「関係代名詞」の単元模試 (B: 問題プールからシードで出題)。問題・英文はすべてオリジナル。
// 大問1 文法・語法: プール12問 (基本5・標準4・発展3) から4問 (基本2・標準1・発展1)。
// 大問2 並べかえ: プール5問 (基本2・標準3) から2問 (基本1・標準1)。
// 1回6問 (基本3・標準2・発展1)。配点 基本15・標準18・発展19 → 45+36+19＝100点。選択肢・語の順もシードで変わる。
// A (生成) は使っていないので検算式はない。使い分けはレクチャー (lib/lecture/data/j-en-3-kankei.ts) の表に合わせた
// (人が先行詞の目的格は that を基本とし、目的格 who を答えにする問題は出さない)。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-3-kankei";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "説明は名詞のうしろにつく");
const S2 = L(2, "先行詞が「人」か「もの」かで選ぶ");
const S3 = L(3, "主格か目的格かは、すぐあとを見る");
const S4 = L(4, "長い主語に気をつける");

const P = { 1: 15, 2: 18, 3: 19 } as const;
const T = { 1: 45, 2: 75, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const GRAMMAR: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("which-cat", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nI have a cat (　　) has blue eyes.",
    answer: {
      kind: "choice",
      options: ["which", "who", "what", "where"],
      correct: 0,
      why: ["正しい。先行詞 a cat は動物なので which（that も可）。", "who は先行詞が人のときに使う。", "what は先行詞をとらない。名詞のすぐあとで説明をつなぐことはできない。", "where は場所を表す語。ここでは has の主語になる語が必要。"],
    },
    point: "先行詞がもの・動物なら which / that",
    steps: [{ title: "先行詞を見る", body: "説明される名詞（先行詞）は a cat。{{もの・動物}}なので {{which}} を使います。", trap: "かわいがっている動物でも who にはしない。", back: [S2] }],
  },
  {
    ...base("who-woman", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nThe woman (　　) is reading a book over there is my aunt.",
    answer: {
      kind: "choice",
      options: ["who", "which", "what", "she"],
      correct: 0,
      why: ["正しい。先行詞 The woman は人で、すぐあとに動詞 is reading が続く主格なので who。", "which は先行詞がもの・動物のとき。", "what は先行詞をとらない。", "she を入れると文が2つに分かれてしまい、つなぐ語がなくなる。"],
    },
    point: "先行詞が人＋動詞 → 主格の who",
    steps: [{ title: "人か、ものか", body: "先行詞 The woman は{{人}}。すぐあとに動詞が来る主格なので {{who}}（that も可）です。", back: [S2, S3] }],
  },
  {
    ...base("that-song", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nThis is a song (　　) everyone in my class knows.",
    answer: {
      kind: "choice",
      options: ["that", "who", "what", "when"],
      correct: 0,
      why: ["正しい。先行詞 a song はもの。that（which も可）を使う。", "who は先行詞が人のとき。", "what は先行詞をとらない。", "when は時をたずねる・表す語で、ここでは knows の目的語の役をする語が必要。"],
    },
    point: "that は人にも、ものにも使える",
    steps: [{ title: "目的格の that", body: "everyone 〜 knows（主語＋動詞）が a song を説明しています。a song は knows の目的語の役なので目的格。{{that}} はものにも人にも使えます。", back: [S2, S3] }],
  },
  {
    ...base("speaks", 1),
    prompt: "（　）内の語を、正しい形にかえて答えなさい。\nI know a boy who (speak) three languages.",
    answer: { kind: "term", accept: ["speaks"], near: [{ text: "speak", why: "who の先行詞 a boy は3人称単数。今のことなので speaks と -s をつけます。" }] },
    point: "主格のあとの動詞は先行詞に合わせる",
    steps: [{ title: "who の中の主語はだれ？", body: "who は a boy のかわり。a boy は{{3人称単数}}なので、動詞は {{speaks}} です。", trap: "who のすぐあとだからと、原形のままにする。", back: [S3, S1] }],
  },
  {
    ...base("imi-bike", 1),
    prompt: "the bike which my father gave me の意味として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["父が私にくれた自転車", "私が父にあげた自転車", "自転車を私にくれた父", "父の自転車をくれた人"],
      correct: 0,
      why: ["正しい。which my father gave me（父が私にくれた）がうしろから the bike を説明している。", "gave の主語は my father、me（私に）がもらった人。向きが逆。", "中心の名詞（先行詞）は the bike。父ではない。", "中心の名詞は the bike。「人」の話ではない。"],
    },
    point: "関係代名詞の文は、うしろから名詞を説明する",
    steps: [{ title: "中心の名詞を先に", body: "中心の名詞は {{the bike}}。which 以下が「どんな自転車か」をうしろから説明します。「父が私にくれた」＋「自転車」と訳します。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...base("shoryaku", 2, "思考・判断・表現"),
    prompt: "次の文のうち、関係代名詞を省略できるものはどれですか。",
    answer: {
      kind: "choice",
      options: ["The pizza that we ate last night was good.", "The man who lives next to us is a doctor.", "I have a box which is very heavy.", "Look at the bird that is flying over the river."],
      correct: 0,
      why: ["正しい。that のあとに we ate（主語＋動詞）が続く目的格なので、省略できる。", "who のすぐあとが動詞 lives の主格。主格は省略できない。", "which のすぐあとが動詞 is の主格。", "that のすぐあとが動詞 is flying の主格。"],
    },
    point: "省略できるのは目的格（あとに主語＋動詞）",
    steps: [
      { title: "すぐあとを見る", body: "関係代名詞のすぐあとが{{動詞}}なら主格、{{主語＋動詞}}なら目的格です。", back: [S3] },
      { title: "目的格だけ省略できる", body: "The pizza (that) we ate のように、{{目的格}}の関係代名詞は省略できます。", back: [S3] },
    ],
  },
  {
    ...base("ichibun-girl", 2),
    prompt: "I met a girl. She can play the violin very well. を1文にしたものとして、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["I met a girl who can play the violin very well.", "I met a girl who she can play the violin very well.", "I met a girl which can play the violin very well.", "I met a girl can play the violin very well."],
      correct: 0,
      why: ["正しい。She が who にかわり、先行詞 a girl のうしろにつながる。", "she は who にかわったので、重ねて書かない。", "a girl は人なので which ではなく who（that）。", "主格の関係代名詞は省略できない。who がないと文が成り立たない。"],
    },
    point: "代名詞 she を who にかえて、名詞のうしろへ",
    steps: [{ title: "2つの文をつなぐ", body: "2つめの文の She は a girl のこと。She を {{who}} にかえて a girl のすぐうしろにつなぎます。she はもう書きません。", back: [S1, S2] }],
  },
  {
    ...base("ayamari-it", 2, "思考・判断・表現"),
    prompt: "次の英文のうち、まちがいをふくむものはどれですか。",
    answer: {
      kind: "choice",
      options: ["The bag which I bought it last week is blue.", "The bag I bought last week is blue.", "The bag that I bought last week is blue.", "The bag which I bought last week is blue."],
      correct: 0,
      why: ["まちがい。which が bought の目的語の役をしているので、it を重ねて書かない。", "正しい。目的格の関係代名詞を省略した形。", "正しい。目的格の that。", "正しい。目的格の which。"],
    },
    point: "目的格の関係代名詞のあとに、目的語を重ねない",
    steps: [{ title: "which が目的語のかわり", body: "もとの文は I bought {{the bag}} last week. の the bag が which にかわって前に出た形。だから bought のあとに {{it}} は書きません。", trap: "もとの文の形のまま it を残してしまう。", back: [S3] }],
  },
  {
    ...base("shukaku", 2),
    prompt: "次の文のうち、主格の関係代名詞を使っているものはどれですか。",
    answer: {
      kind: "choice",
      options: ["The boy who won the race is Ken.", "The cake which my sister made was sweet.", "The letter that I got from Emi was long.", "The game that we played yesterday was fun."],
      correct: 0,
      why: ["正しい。who のすぐあとに動詞 won が来ている。who が「勝った」の主語の役。", "which のあとが my sister made（主語＋動詞）。目的格。", "that のあとが I got（主語＋動詞）。目的格。", "that のあとが we played（主語＋動詞）。目的格。"],
    },
    point: "関係代名詞のすぐあとが動詞 → 主格",
    steps: [{ title: "すぐあとを見る", body: "who won the race は、who のすぐあとに{{動詞}} won。who が説明の文の主語なので{{主格}}です。", back: [S3] }],
  },
  // ---- 発展 ----
  {
    ...base("nagai-shugo-are", 3, "思考・判断・表現"),
    prompt: "（　）に入る語として正しいものはどれですか。\nThe boys who play soccer in the park every day (　　) my classmates.",
    answer: {
      kind: "choice",
      options: ["are", "is", "play", "plays"],
      correct: 0,
      why: ["正しい。who 〜 every day が The boys の説明。文全体の主語は The boys（複数）なので are。", "主語は The boys で複数。is は使えない。every day を主語とまちがえない。", "play は説明の部分の中の動詞。文全体の動詞がまだない。", "plays も動詞で、my classmates とつながらない。「〜である」の be 動詞が必要。"],
    },
    point: "説明の部分をカッコでくくり、主語と動詞を見つける",
    steps: [
      { title: "説明の部分をくくる", body: "The boys (who play soccer in the park every day) ( ) my classmates. とカッコでくくると、骨組みは {{The boys ＿ my classmates}}。", back: [S4] },
      { title: "主語に合わせる", body: "主語 The boys は複数なので {{are}}。すぐ前の every day や the park に引きずられないこと。", back: [S4] },
    ],
  },
  {
    ...base("imi-mika", 3, "思考・判断・表現"),
    prompt: "The picture that Mika took in Hokkaido won a prize. の意味として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["ミカが北海道でとった写真が、賞をとった。", "ミカは北海道で、賞をとった写真をとった。", "北海道で賞をとったミカが、写真をとった。", "ミカは北海道で写真をとり、自分で賞をとった。"],
      correct: 0,
      why: ["正しい。that Mika took in Hokkaido が The picture の説明。文全体の主語は The picture、動詞は won。", "賞をとったのは写真で、文全体の動詞は won。took は説明の部分の中の動詞。", "that の先行詞は The picture で、ミカではない。", "賞をとった（won）の主語は The picture。ミカではない。"],
    },
    point: "長い主語のあとに文全体の動詞が来る",
    steps: [
      { title: "説明の部分を見つける", body: "that Mika took in Hokkaido は The picture をうしろから説明しています。主語は「{{ミカが北海道でとった写真}}」。", back: [S1] },
      { title: "文全体の動詞", body: "説明が終わったところの {{won}} が文全体の動詞。「写真が賞をとった」となります。", back: [S4] },
    ],
  },
  {
    ...base("ichibun-museum", 3, "思考・判断・表現"),
    prompt: "This is the museum. I visited it last year. を1文にしたものとして、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["This is the museum I visited last year.", "This is the museum which I visited it last year.", "This is the museum who I visited last year.", "This is the museum I visited it last year."],
      correct: 0,
      why: ["正しい。目的格の which（that）を省略した形。it は関係代名詞にかわったので書かない。", "which が it のかわりなので、it を重ねて書かない。", "the museum はものなので who は使えない。", "関係代名詞を省略しても、it は重ねて書かない。"],
    },
    point: "目的格は省略できるが、もとの目的語は消す",
    steps: [
      { title: "it が関係代名詞にかわる", body: "it は the museum のこと。{{目的格}}の which（that）にかえて前に出します。", back: [S3] },
      { title: "目的格は省略できる", body: "目的格は省略でき、the museum {{I visited last year}} とも言えます。どちらの場合も it は残しません。", back: [S3] },
    ],
  },
];

const ORDER: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("narabe-uncle", 1),
    seconds: 60,
    prompt: "日本文に合うように、語句を並べかえなさい。\n私には東京に住んでいるおじがいます。",
    answer: { kind: "order", tokens: ["I", "have", "an uncle", "who", "lives", "in Tokyo"], distractor: "which" },
    point: "名詞 ＋ who ＋ 動詞 〜 でうしろから説明",
    steps: [{ title: "名詞を先に言う", body: "まず「私にはおじがいる」I have {{an uncle}}。そのうしろに「東京に住んでいる」を {{who}} lives in Tokyo でつなぎます。おじは人なので which は使いません。", back: [S1, S2] }],
  },
  {
    ...base("narabe-sweater", 1),
    seconds: 60,
    prompt: "日本文に合うように、語句を並べかえなさい。\nこれは祖母が私に作ってくれたセーターです。",
    answer: { kind: "order", tokens: ["This", "is", "the sweater", "that", "my grandmother", "made for me"], distractor: "it" },
    point: "名詞 ＋ that ＋ 主語 ＋ 動詞（目的格）",
    steps: [{ title: "目的格の that", body: "the sweater のうしろに {{that my grandmother made}} for me。that が made の目的語の役なので、it は書きません。", back: [S3] }],
  },
  // ---- 標準 ----
  {
    ...base("narabe-dog", 2),
    seconds: 90,
    prompt: "日本文に合うように、語句を並べかえなさい。\n向こうで走っている犬は、私の犬です。",
    answer: { kind: "order", tokens: ["The dog", "which", "is running", "over there", "is", "mine"], distractor: "who" },
    point: "主語 ＋ which 〜 のあとに文全体の動詞",
    steps: [
      { title: "長い主語を作る", body: "「向こうで走っている犬」は The dog {{which is running over there}}。犬は動物なので which。", back: [S2] },
      { title: "文全体の動詞", body: "説明が終わったところに文全体の動詞 {{is}} mine を置きます。", back: [S4] },
    ],
  },
  {
    ...base("narabe-book", 2),
    seconds: 90,
    prompt: "日本文に合うように、語句を並べかえなさい。\nあなたが昨日読んだ本はおもしろかったですか。",
    answer: { kind: "order", tokens: ["Was", "the book", "you", "read", "yesterday", "interesting"], distractor: "did" },
    point: "目的格を省略：the book you read 〜",
    steps: [
      { title: "目的格の省略", body: "「あなたが昨日読んだ本」は the book (which) you read yesterday。ここでは関係代名詞が{{省略}}されています。", back: [S3] },
      { title: "疑問文の語順", body: "長い主語 the book you read yesterday の前に {{Was}} を出して疑問文にします。", back: [S4] },
    ],
  },
  {
    ...base("narabe-person", 2),
    seconds: 90,
    prompt: "日本文に合うように、語句を並べかえなさい。\n私がいちばん尊敬している人は、祖父です。",
    answer: { kind: "order", tokens: ["The person", "that", "I respect", "the most", "is", "my grandfather"], distractor: "he" },
    point: "人が先行詞の目的格は that が基本",
    steps: [
      { title: "目的格の that", body: "「私がいちばん尊敬している人」は The person {{that I respect the most}}。人が先行詞の目的格は、中学では that を使うのが基本です。", back: [S2, S3] },
      { title: "文全体の動詞", body: "説明のあとに文全体の動詞 {{is}} my grandfather を続けます。", back: [S4] },
    ],
  },
];

export const J_EN_3_KANKEI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中3",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    { title: "関係代名詞の文法・語法", lead: "次の問いに答えなさい。", style: "mix", pick: 4, questions: GRAMMAR },
    { title: "語句の並べかえ", lead: "日本文に合うように並べかえなさい。使わない語が1つふくまれています。", style: "word", pick: 2, questions: ORDER },
  ],
};
