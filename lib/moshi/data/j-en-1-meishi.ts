// 中1英語「名詞の複数形と冠詞」の単元模試 (B: 問題プールからシードで6問)。問題はすべてオリジナル。
// プール15問 (基本5・標準5・発展5)。1回に基本2・標準2・発展2 が出る (lib/moshi/unit.ts の pickQuestions)。選択肢の順もシードで変わる。
// A (生成型) は使わないので検算式はない。英文と答えは lib/lecture/data/j-en-1-meishi.ts の要点・まちがい・確認問題に合わせた。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-1-meishi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "数えられる名詞と数えられない名詞");
const S2 = L(2, "複数形のつくり方");
const S3 = L(3, "a と an は「音」で選ぶ");
const S4 = L(4, "the は「どれのことか決まっている」とき");

// 配点は難易度で決める (基本15・標準17・発展18。2問ずつ出るので満点100)
const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("plural-bus", 1),
    prompt: "bus（バス）の複数形を書きなさい。",
    answer: { kind: "term", accept: ["buses"], near: [{ text: "buss", why: "s で終わる語は -es をつけます。buses です。" }, { text: "bus", why: "2台以上なら複数形にします。s で終わる語なので -es をつけます。" }] },
    point: "s・x・ch・sh で終わる語は -es",
    steps: [{ title: "語尾を見る", body: "bus は s で終わるので、{{-es}} をつけて {{buses}}。s だけでは「バスス」と言いにくいので e を入れます。", back: [S2] }],
  },
  {
    ...base("plural-baby", 1),
    prompt: "baby（赤ちゃん）の複数形を書きなさい。",
    answer: { kind: "term", accept: ["babies"], near: [{ text: "babys", why: "子音字（b）＋y で終わる語は、y を i にかえて -es をつけます。" }, { text: "babyes", why: "y を i にかえてから -es をつけます。babies です。" }] },
    point: "子音字＋y は y を i にかえて -es",
    steps: [{ title: "y の前の文字を見る", body: "y の前は子音字の b。だから {{y を i にかえて -es}} をつけ、{{babies}} になります。", trap: "boy のように母音字＋y なら -s だけ（boys）。", back: [S2] }],
  },
  {
    ...base("uncountable", 1),
    prompt: "次のうち、ふつう{{数えられない名詞}}はどれですか。",
    answer: {
      kind: "choice",
      options: ["milk", "pencil", "desk", "orange"],
      correct: 0,
      why: ["正しい。牛乳は決まった形がなく、区切って数えられない。", "鉛筆は1本・2本と数えられる。", "机は1つ・2つと数えられる。", "オレンジは1個・2個と数えられる（an orange）。"],
    },
    point: "形の決まらないものは数えられない",
    steps: [{ title: "区切れるかを考える", body: "milk は分けても牛乳のまま。決まった形がないので {{数えられない名詞}} です。a をつけず、複数形にもしません。", back: [S1] }],
  },
  {
    ...base("an-egg", 1),
    prompt: "I eat (　　) egg every morning. の (　　) に入る語として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["an", "a", "two", "（何も入れない）"],
      correct: 0,
      why: ["正しい。egg は母音の音（エ）で始まるので an。", "母音の音で始まる語の前では a ではなく an。", "two なら egg を複数形の eggs にしなければならない。", "egg は数えられる名詞なので、1つなら an が必要。"],
    },
    point: "母音の音で始まる語の前は an",
    steps: [{ title: "次の語の音を聞く", body: "egg は「エ」という {{母音の音}} で始まるので {{an}} egg。", back: [S3] }],
  },
  {
    ...base("the-moon", 1),
    prompt: "Look at (　　) moon. It is very beautiful tonight. の (　　) に入る語として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["the", "a", "an", "some"],
      correct: 0,
      why: ["正しい。月は1つしかなく、だれにとっても「どれのことか分かる」ので the。", "月は1つしかないので「ある1つ」の a は使わない。", "moon は子音の音で始まり、また1つしかないものなので an は使わない。", "some は「いくらか」の意味で、月には使わない。"],
    },
    point: "1つしかないもの（sun・moon・sky）は the",
    steps: [{ title: "どれか分かるか", body: "moon（月）は {{1つしかないもの}}。話し手も聞き手もどれのことか分かるので {{the}} moon です。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...base("children", 2),
    prompt: "Mr. Sato has three (　　). の (　　) に child を正しい形にかえて書きなさい。",
    answer: { kind: "term", accept: ["children"], near: [{ text: "childs", why: "child は不規則に変わる語です。複数形は children。" }, { text: "child", why: "three（3人）なので複数形にします。child は不規則に変わり children。" }] },
    point: "child → children（不規則）",
    steps: [{ title: "3人だから複数形", body: "three があるので複数形。child は -s をつけず {{children}} に変わる、{{不規則に変わる}}語です。", trap: "man → men、foot → feet も同じ仲間。", back: [S2] }],
  },
  {
    ...base("plural-leaf", 2),
    prompt: "leaf（葉）の複数形を書きなさい。",
    answer: { kind: "term", accept: ["leaves"], near: [{ text: "leafs", why: "f で終わる語は、f を v にかえて -es をつけます。leaves です。" }] },
    point: "f・fe で終わる語は f(e) を v にかえて -es",
    steps: [{ title: "f で終わる語", body: "leaf は f で終わるので、f を v にかえて -es をつけ、{{leaves}} になります。", back: [S2] }],
  },
  {
    ...base("glasses-of-milk", 2),
    prompt: "「コップ2杯の牛乳」を英語で正しく表しているものはどれですか。",
    answer: {
      kind: "choice",
      options: ["two glasses of milk", "two glass of milks", "two glasses of milks", "two milks"],
      correct: 0,
      why: ["正しい。数えるのは glass（コップ）。2つなので glasses、milk の形は変わらない。", "glass を複数形にし、milk は -s をつけない。", "milk は数えられない名詞なので -s をつけない。", "milk は数えられないので、直接 two をつけられない。"],
    },
    point: "数えられない名詞は入れものを数える",
    steps: [{ title: "数が変わるのは入れもの", body: "milk は {{数えられない名詞}}。2杯なら glass を複数形にして {{two glasses of milk}}。milk はそのままです。", back: [S1] }],
  },
  {
    ...base("a-to-the", 2),
    prompt: "I have a cat. (　　) cat is black. の (　　) に入る語として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["The", "A", "An", "（何も入れない）"],
      correct: 0,
      why: ["正しい。前の文で話に出たねこなので、2回目は「その」の the。", "A は初めて話に出るときに使う。ここではもう出ているねこ。", "cat は子音の音で始まるうえ、もう話に出ているので An は使わない。", "数えられる名詞 cat が1つなので、何もつけないのはまちがい。"],
    },
    point: "一度出たものを言い直すときは the",
    steps: [{ title: "1回目と2回目", body: "1回目は「ある1ぴき」の {{a}} cat。2回目は聞き手も「さっきのねこ」と分かるので {{The}} cat です。", back: [S4] }],
  },
  {
    ...base("an-honest", 2),
    prompt: "冠詞の使い方が正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["an honest boy", "a honest boy", "an university", "a old car"],
      correct: 0,
      why: ["正しい。honest の h は読まず「オ」の母音の音で始まるので an。", "h は発音しないので母音の音で始まる。a ではなく an。", "university は「ユー」という子音の音で始まるので a university。", "old は母音の音（オ）で始まるので an old car。"],
    },
    point: "a / an は文字ではなく音で選ぶ",
    steps: [{ title: "最初の音を確かめる", body: "honest は h を読まないので {{母音の音}}で始まり {{an}}。university は「ユー」で子音の音なので a です。", trap: "つづりの最初の文字（h・u）だけで判断しない。", back: [S3] }],
  },
  // ---- 発展 ----
  {
    ...base("find-error", 3, "思考・判断・表現"),
    prompt: "まちがいをふくむ英文はどれですか。",
    answer: {
      kind: "choice",
      options: ["I want a water.", "My father plays the guitar.", "I know two big cities.", "She has an umbrella."],
      correct: 0,
      why: ["まちがい。water は数えられない名詞なので a をつけない（some water / a glass of water）。", "正しい。楽器を演奏するときは the をつける。", "正しい。city は子音字＋y なので cities。", "正しい。umbrella は「ア」の母音の音で始まるので an。"],
    },
    point: "数えられない名詞に a はつけない",
    steps: [{ title: "1文ずつ名詞を確かめる", body: "water は {{数えられない名詞}} なので a をつけません。量を言うなら some water、数えるなら a glass of water。", back: [S1] }, { title: "ほかの文", body: "play {{the}} guitar、two {{cities}}、{{an}} umbrella はどれも正しい形です。", back: [S2, S3, S4] }],
  },
  {
    ...base("order-glass", 3, "思考・判断・表現"),
    prompt: "「わたしは毎朝コップ1杯の水を飲みます。」という意味になるように、語を並べかえなさい。使わない語が1つあります。",
    answer: { kind: "order", tokens: ["I", "drink", "a", "glass", "of", "water", "every", "morning"], distractor: "waters" },
    point: "a glass of water の water はそのまま",
    steps: [{ title: "量の言い方", body: "「コップ1杯の水」は {{a glass of water}}。water は数えられないので waters は使いません。", back: [S1] }, { title: "文の形", body: "I drink ＋ a glass of water ＋ every morning の順に並べます。" }],
  },
  {
    ...base("order-piano", 3, "思考・判断・表現"),
    prompt: "「わたしの姉はピアノをひきます。」という意味になるように、語を並べかえなさい。使わない語が1つあります。",
    answer: { kind: "order", tokens: ["My", "sister", "plays", "the", "piano"], distractor: "a" },
    point: "楽器を演奏するときは play the ＋ 楽器",
    steps: [{ title: "楽器には the", body: "楽器を演奏するときは {{play the piano}} のように the をつけます。a は使いません。", back: [S4] }],
  },
  {
    ...base("an-old-a-young", 3, "思考・判断・表現"),
    prompt: "I know (　①　) old man and (　②　) young woman in this town. の ①・② に入る語の組み合わせとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["① an　② a", "① a　② an", "① an　② an", "① a　② a"],
      correct: 0,
      why: ["正しい。old は母音の音（オ）で始まるので an、young は子音の音（ヤ）で始まるので a。", "逆になっている。", "young は子音の音で始まるので a。", "old は母音の音で始まるので an。"],
    },
    point: "形容詞があれば、すぐ後ろの語の音で決める",
    steps: [{ title: "すぐ後ろの語を見る", body: "冠詞はすぐ後ろの語の音で決まります。{{an}} old man（オ）、{{a}} young woman（ヤ）。man・woman ではなく old・young の音を見ます。", back: [S3] }],
  },
  {
    ...base("plural-right", 3, "思考・判断・表現"),
    prompt: "複数形が正しく書かれているものはどれですか。",
    answer: {
      kind: "choice",
      options: ["four boys", "three knifes", "five citys", "two foots"],
      correct: 0,
      why: ["正しい。boy は母音字（o）＋y なので -s だけ。", "fe で終わる語は fe を v にかえて -es。knives。", "city は子音字＋y なので y を i にかえて -es。cities。", "foot は不規則に変わる語。feet。"],
    },
    point: "母音字＋y は -s、子音字＋y は -ies",
    steps: [{ title: "語尾ごとのルール", body: "boy は母音字＋y なので {{boys}}。knife → {{knives}}、city → {{cities}}、foot → {{feet}} です。", back: [S2] }],
  },
];

export const J_EN_1_MEISHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中1",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    {
      title: "名詞の複数形と冠詞",
      lead: "次の問いに答えなさい。",
      style: "mix",
      pick: 6,
      questions: POOL,
    },
  ],
};
