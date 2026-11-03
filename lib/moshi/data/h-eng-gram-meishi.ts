// 高校英語（文法）「名詞・冠詞」の単元模試 (B: 問題プールからシードで選ぶ)。問題・例文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// 節1 語法 (プール12問: 基本4・標準4・発展4) から5問 (基本2・標準2・発展1)、
// 節2 並べかえ (プール4問: 基本2・標準2) から2問 (基本1・標準1)。1回7問・100点 (13×3＋15×3＋16＝100)。
// A (生成) は使っていないので数値の検算はなし。choice・term・order の正答は check-moshi が採点器で満点になるか確かめる。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-gram-meishi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "数えられる名詞・数えられない名詞");
const S2 = L(2, "量の言い方は、数えられるかで変わる");
const S3 = L(3, "a と the：相手が「どれか」分かるかどうか");
const S4 = L(4, "冠詞をつけない決まった言い方");

const P = { 1: 13, 2: 15, 3: 16 } as const;
const T = { 1: 45, 2: 60, 3: 90 } as const;
const TO = { 1: 60, 2: 75, 3: 90 } as const;
type Sk = QuestionB["skill"];
const base = (id: string, difficulty: 1 | 2 | 3, skill: Sk = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });
const ord = (id: string, difficulty: 1 | 2 | 3) => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: TO[difficulty], skill: "知識・技能" as Sk });
const ASK = "空所に入る最も適切なものはどれですか。";
const NARABE = "日本語に合うように語句を並べかえなさい。使わない語が1つあります。";

const FORMS: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("information", 1),
    prompt: `I need some (　　) about the museum's opening hours.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["information", "informations", "an information", "a information"],
      correct: 0,
      why: [
        "information は数えられない名詞。some information とする。",
        "数えられない名詞は複数形にしない。",
        "数えられない名詞に an はつけない。",
        "a もつけない（しかも母音の前は an）。",
      ],
    },
    point: "information は数えられない",
    steps: [{ title: "数えられない名詞", body: "{{information}}・advice・furniture などは数えられない名詞。a をつけず、複数形にもしません。", back: [S1] }],
  },
  {
    ...base("glass-water", 1),
    prompt: `Could I have a (　　) of water, please?\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["glass", "piece", "sheet", "loaf"],
      correct: 0,
      why: [
        "水は入れ物で数える。コップ1杯は a glass of water。",
        "a piece of は家具・助言・ケーキなどに使う。",
        "a sheet of は紙など薄いものに使う。",
        "a loaf of はパンのかたまりに使う。",
      ],
    },
    point: "a glass of water ＝コップ1杯の水",
    steps: [{ title: "入れ物で数える", body: "数えられない名詞は{{入れ物・形}}で数えます。水なら {{a glass of}}、紙なら a sheet of。", back: [S2] }],
  },
  {
    ...base("a-the-dog", 1),
    prompt: `Yesterday I saw a cat on our roof. (　　) cat was looking at the moon.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["The", "A", "An", "Some"],
      correct: 0,
      why: [
        "前の文に出てきた「その」ネコ。相手にどれか分かるので the。",
        "A cat だと、別のネコの話になる。",
        "an は母音で始まる語の前。しかもどれか分かっているので the。",
        "Some cat では、前の文のネコを指せない。",
      ],
    },
    point: "2回目に出た名詞は the",
    steps: [{ title: "話の流れ", body: "1回目は a cat（どのネコか相手は知らない）。2回目は{{相手にも分かる}}ので {{the}} cat。", back: [S3] }],
  },
  {
    ...base("by-bus", 1),
    prompt: `My father goes to work by (　　).\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["car", "a car", "the car", "cars"],
      correct: 0,
      why: [
        "交通手段を表す by のあとは冠詞をつけない。by car。",
        "by のあとに a はつけない。",
        "by のあとに the もつけない。",
        "複数形にもしない。",
      ],
    },
    point: "by ＋交通手段は無冠詞",
    steps: [{ title: "決まった言い方", body: "{{by ＋交通手段}}（by car・by train）は冠詞をつけない決まった言い方です。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...base("pieces-advice", 2),
    prompt: `My coach gave me two (　　) of advice before the game.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["pieces", "piece", "advices", "a piece"],
      correct: 0,
      why: [
        "advice は数えられないので a piece of で数える。2つなら two pieces of advice。",
        "two のあとなので piece を複数形にする。",
        "advice は複数形にしない。",
        "two と a は重ねられない。",
      ],
    },
    point: "数えるのは piece の方（two pieces of advice）",
    steps: [{ title: "単位を複数に", body: "数えられない名詞は変えず、{{単位の方}}を複数形にします。{{two pieces of}} advice。", back: [S2] }],
  },
  {
    ...base("play-the-guitar", 2),
    prompt: `My sister plays (　　) violin in the school orchestra.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["the", "a", "an", "（何も入れない）"],
      correct: 0,
      why: [
        "楽器を演奏するときは play the violin と the をつけるのが基本。",
        "a violin では「バイオリンを1つ」となり、演奏の言い方にならない。",
        "an は母音で始まる語の前。",
        "冠詞なしはスポーツ（play tennis）のとき。",
      ],
    },
    point: "play ＋ the ＋楽器／play ＋スポーツ",
    steps: [{ title: "楽器とスポーツ", body: "楽器は {{play the violin}}、スポーツは冠詞なしの play tennis。", back: [S4] }],
  },
  {
    ...base("how-much-money", 2),
    prompt: `How (　　) money did you spend on the trip?\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["much", "many", "few", "a few"],
      correct: 0,
      why: [
        "money は数えられない名詞。量をたずねるのは How much。",
        "How many は数えられる名詞の数をたずねる。",
        "How few とは言わない。",
        "a few は数えられる名詞に使う。",
      ],
    },
    point: "money は数えられない → How much",
    steps: [{ title: "数えられない名詞", body: "お金そのもの（{{money}}）は数えられない名詞。量は {{How much}} でたずねます。", back: [S1, S2] }],
  },
  {
    ...base("wrong-homeworks", 2, "思考・判断・表現"),
    prompt: "次の英文のうち、文法的に{{誤っている}}ものはどれですか。",
    answer: {
      kind: "choice",
      options: ["We have many homeworks this weekend.", "We have a lot of homework this weekend.", "I bought two loaves of bread.", "She gave me some useful advice."],
      correct: 0,
      why: [
        "homework は数えられない名詞。many や複数形は使えない。a lot of homework にする。",
        "a lot of は数えられない名詞にも使える。正しい。",
        "bread は loaf で数える。正しい。",
        "advice に some をつけるのは正しい。",
      ],
    },
    point: "homework は数えられない",
    steps: [{ title: "数えられない名詞", body: "{{homework}} は数えられないので、many も -s も使えません。much / a lot of で量を言います。", back: [S1] }],
  },
  // ---- 発展 ----
  {
    ...base("a-university", 3),
    prompt: `My cousin is (　　) university student in Kyoto.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["a", "an", "the", "（何も入れない）"],
      correct: 0,
      why: [
        "university は文字は u でも、発音は「ユ」で子音から始まる。だから a。",
        "an は発音が母音で始まる語の前。university の発音は子音で始まる。",
        "the だと、相手がどの学生か分かっていることになる。ここは「京都の大学生の1人」。",
        "student は数えられる名詞の単数形なので冠詞が必要。",
      ],
    },
    point: "a か an かは発音で決まる",
    steps: [{ title: "つづりではなく音", body: "university は「{{ユ}}ニバーシティ」と子音で始まるので {{a}}。an hour（母音で始まる）とは逆です。", back: [S3] }],
  },
  {
    ...base("have-breakfast", 3),
    prompt: `I usually have (　　) breakfast at seven.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["（何も入れない）", "a", "the", "an"],
      correct: 0,
      why: [
        "食事（breakfast・lunch・dinner）にはふつう冠詞をつけない。",
        "a は「豪華な朝食」のように形容詞がつくとき（a big breakfast）。",
        "the だと特定の朝食を指すことになる。",
        "an は母音で始まる語の前。",
      ],
    },
    point: "have breakfast は無冠詞",
    steps: [{ title: "食事は冠詞なし", body: "毎日の食事を言うときは{{冠詞なし}}で have breakfast。形容詞がつくと a big breakfast のように a がつきます。", back: [S4] }],
  },
  {
    ...base("go-to-bed", 3, "思考・判断・表現"),
    prompt: "次のうち、建物や物を「本来の目的」で使う意味になっている英文はどれですか。",
    answer: {
      kind: "choice",
      options: ["My grandfather goes to church every Sunday.", "My grandfather painted the church last Sunday.", "My grandfather visited the church to take photos.", "My grandfather walked past the church."],
      correct: 0,
      why: [
        "go to church（無冠詞）は「礼拝に行く」。教会を本来の目的で使っている。",
        "the church は建物そのもの。ペンキを塗る対象。",
        "写真をとりに行くのは建物そのもの。the がつく。",
        "前を通りすぎるのも建物そのもの。",
      ],
    },
    point: "無冠詞 ＝本来の目的（go to church・go to school）",
    steps: [{ title: "冠詞の有無", body: "本来の目的なら{{冠詞なし}}（go to church ＝礼拝に）。建物そのものなら {{the church}}。", back: [S4] }],
  },
  {
    ...base("little-furniture", 3),
    prompt: `Our new apartment is almost empty. There is very (　　) furniture in it.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["little", "few", "a few", "many"],
      correct: 0,
      why: [
        "furniture は数えられない名詞。「ほとんどない」は little。",
        "few は数えられる名詞に使う。",
        "a few も数えられる名詞に使う。",
        "many も数えられる名詞に使い、empty と合わない。",
      ],
    },
    point: "furniture は数えられない → little",
    steps: [{ title: "家具は数えられない", body: "{{furniture}} は家具をまとめて言う数えられない名詞。「ほとんどない」は very {{little}}。", back: [S1, S2] }],
  },
];

const ORDER: QuestionB[] = [
  // ---- 基本 ----
  {
    ...ord("narabe-glass-milk", 1),
    prompt: `${NARABE}\n「私は毎朝コップ1杯の牛乳を飲みます。」`,
    answer: { kind: "order", tokens: ["I", "drink", "a glass", "of", "milk", "every morning."], distractor: "milks" },
    point: "a glass of milk",
    steps: [{ title: "入れ物で数える", body: "milk は数えられないので {{a glass of milk}}。milks とはしません。", back: [S2] }],
  },
  {
    ...ord("narabe-by-train", 1),
    prompt: `${NARABE}\n「彼女は電車で学校に通っています。」`,
    answer: { kind: "order", tokens: ["She", "goes", "to school", "by", "train."], distractor: "the" },
    point: "by train は無冠詞",
    steps: [{ title: "決まった言い方", body: "{{by train}} も to school も冠詞をつけない言い方です。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...ord("narabe-useful-advice", 2),
    prompt: `${NARABE}\n「コーチは私にいくつか役に立つ助言をくれた。」`,
    answer: { kind: "order", tokens: ["The coach", "gave", "me", "some", "useful", "advice."], distractor: "advices" },
    point: "some ＋形容詞＋ advice",
    steps: [{ title: "数えられない名詞", body: "advice は数えられないので {{some useful advice}}。advices とはしません。", back: [S1] }],
  },
  {
    ...ord("narabe-moon-earth", 2),
    prompt: `${NARABE}\n「月は地球のまわりを回っています。」`,
    answer: { kind: "order", tokens: ["The moon", "goes", "around", "the earth."], distractor: "a" },
    point: "1つしかないものは the",
    steps: [{ title: "1つしかないもの", body: "月や地球のように{{1つしかない}}ものは、だれにでもどれか分かるので {{the}} をつけます。", back: [S3] }],
  },
];

export const H_ENG_GRAM_MEISHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "文法",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    { title: "名詞と冠詞の使い分け", lead: "次の問いに答えなさい。", style: "word", pick: 5, questions: FORMS },
    { title: "並べかえ", lead: "日本語に合うように、語（語句）を並べかえなさい。文の最初の語は大文字で始めてあります。", style: "word", pick: 2, questions: ORDER },
  ],
};
