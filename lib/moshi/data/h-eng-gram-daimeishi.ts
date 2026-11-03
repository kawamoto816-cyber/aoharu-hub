// 高校英語（文法）「代名詞」の単元模試 (B: 問題プール12問からシードで6問)。問題・例文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// プール12問 (基本4・標準4・発展4)。1回に基本2・標準2・発展2 (15×2＋17×2＋18×2＝100点)。選択肢の順もシードで変わる。A (生成) は使っていないので検算式はなし。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-gram-daimeishi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "人称代名詞は、文の中の役割で形が変わる");
const S2 = L(2, "it は「前に出たそれ」と「仮の主語」");
const S3 = L(3, "it と one：同じ物か、同じ種類か");
const S4 = L(4, "another・the other・the others は「残り」で決まる");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("hers", 1),
    prompt: "This pencil case isn't mine. I think it belongs to Yui. Yes, it's (　　).\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["hers", "her", "she", "herself"],
      correct: 0,
      why: [
        "「彼女のもの」は所有代名詞 hers。後ろに名詞がいらない。",
        "her は「彼女の〜」（後ろに名詞が必要）か「彼女を」。",
        "she は主語の形。",
        "herself は「彼女自身」。持ち主を表さない。",
      ],
    },
    point: "〜のもの ＝ mine・yours・his・hers・ours・theirs",
    steps: [{ title: "役割で形を選ぶ", body: "it's の後ろで「彼女の{{もの}}」 → 所有代名詞 {{hers}}。", back: [S1] }],
  },
  {
    ...base("buy-one", 1),
    prompt: "I lost my umbrella, so I have to buy (　　).\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["one", "it", "them", "this"],
      correct: 0,
      why: [
        "なくしたかさそのものではなく、同じ種類の「かさ（an umbrella）」を買う → one。",
        "it だと、なくした同じかさを買うことになる。",
        "them は複数。かさは1本。",
        "this は目の前の物を指す。ここでは手元にない。",
      ],
    },
    point: "同じ種類の別の物は one",
    steps: [{ title: "同じ物か、同じ種類か", body: "なくしたかさは手元にない。買うのは{{同じ種類}}の別のかさ → {{one}}（＝ an umbrella）。", back: [S3] }],
  },
  {
    ...base("the-other-two", 1),
    prompt: "I have two cousins. One lives in Fukuoka, and (　　) lives in Sendai.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["the other", "another", "other", "the others"],
      correct: 0,
      why: [
        "2人のうち1人を言えば、残りは1人に決まる → the other。",
        "another は「ほかにまだいる中の別の1人」。2人のときは残りが決まっているので the を使う。",
        "other は単独では主語にならない（other people のように名詞が必要）。",
        "the others は残りが複数のとき。lives とも合わない。",
      ],
    },
    point: "2つのうち one … the other",
    steps: [{ title: "残りを数える", body: "2人 − 1人 ＝ 残り{{1人}}に決まる → {{the other}}。", back: [S4] }],
  },
  {
    ...base("us-term", 1),
    prompt: "Ms. Ito often tells (　　) interesting stories about her travels.\n空所に we を適切な形にして、英語1語で書きなさい。",
    answer: { kind: "term", accept: ["us"], near: [{ text: "our", why: "our は「私たちの〜」で後ろに名詞が必要です。tells の目的語なので us。" }] },
    point: "動詞の後ろ（目的語）は目的格",
    steps: [{ title: "文の中の役割", body: "tells の{{目的語}}（〜に）なので目的格 {{us}}。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...base("found-it", 2),
    prompt: "I finally found my lost key. (　　) was in the pocket of my coat.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["It", "One", "Another", "Other"],
      correct: 0,
      why: [
        "前に出た「その鍵（my lost key）」そのものを指す → It。",
        "One だと「（同じ種類の）ある鍵」になり、なくした鍵を指さない。",
        "Another は「もう1つ別の鍵」。",
        "Other は単独で主語にならない。",
      ],
    },
    point: "前に出た同じ物は it",
    steps: [{ title: "同じ物を指す", body: "見つけた鍵＝なくした{{その}}鍵 → {{It}}。", back: [S3] }],
  },
  {
    ...base("help-yourself", 2),
    prompt: "Please help (　　) to some cookies.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["yourself", "you", "your", "yours"],
      correct: 0,
      why: [
        "help oneself to 〜 は「〜を自由に取って食べる」。主語（命令文の you）と目的語が同じ人なので再帰代名詞。",
        "you では「あなたを手伝う」となり、だれが手伝うのかが合わない。",
        "your は後ろに名詞が必要。",
        "yours は「あなたのもの」。",
      ],
    },
    point: "主語と目的語が同じ人なら -self",
    steps: [{ title: "再帰代名詞", body: "命令文の主語は you。目的語も同じ人なので {{yourself}}。help yourself to 〜 ＝ 自由に取る。", back: [S1] }],
  },
  {
    ...base("the-others-rest", 2),
    prompt: "There were ten students in the room. Three were reading, and (　　) were talking.\n「残りの7人は全員話していた」という意味になるように、空所に入る最も適切な語句を選びなさい。",
    answer: {
      kind: "choice",
      options: ["the others", "others", "another", "the other"],
      correct: 0,
      why: [
        "10人のうち3人を言えば、残りは7人に決まる。残り全員で複数 → the others。",
        "others は「ほかの何人か」で、残り全員とは決まらない。",
        "another は単数（もう1人）。",
        "the other は残りが1人のとき。",
      ],
    },
    point: "残り全部・複数 ＝ the others",
    steps: [{ title: "残りを決める", body: "10 − 3 ＝ 7人。残りが決まっていて{{複数}} → {{the others}}。", back: [S4] }],
  },
  {
    ...base("order-it-easy", 2),
    prompt: "「毎日英語で日記をつけるのは簡単ではない」となるように、語句を正しい順に並べなさい。",
    answer: { kind: "order", tokens: ["It", "is", "not", "easy", "to keep", "a diary", "in English", "every day"], alsoOk: [[0, 1, 2, 3, 4, 5, 7, 6]], distractor: "That" },
    point: "It is … to 〜 ＝ 〜するのは…だ",
    steps: [
      { title: "仮の主語", body: "長い主語 to keep a diary 〜 を後ろへ回し、前に仮の主語 {{It}} を置きます。", back: [S2] },
      { title: "語順", body: "It is not easy ＋ {{to keep}} a diary in English every day。", back: [S2] },
    ],
  },
  // ---- 発展 ----
  {
    ...base("another-cup", 3),
    prompt: "This cup has a small crack. Could I have (　　) one, please?\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["another", "other", "the others", "others"],
      correct: 0,
      why: [
        "ほかにもカップがある中の「別の1つ」→ another（an＋other）。",
        "単数の one の前に other だけを置くことはできない（the other one なら可だが、残りが1つに決まるときだけ）。",
        "the others は複数で、one と合わない。",
        "others も複数で、one と合わない。",
      ],
    },
    point: "another ＝ 別のもう1つ（残りは決まらない）",
    steps: [{ title: "残りは決まっているか", body: "店のカップはほかにもたくさんある。残りが決まらない中の1つ → {{another}}。", back: [S4] }],
  },
  {
    ...base("others-some", 3),
    prompt: "Some people like to travel by train, and (　　) prefer to travel by car.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["others", "the others", "another", "the other"],
      correct: 0,
      why: [
        "世の中の人すべてを2つに分けているわけではない。「ほかの人たち」→ others。Some 〜, others … の形。",
        "the others だと「残りの人全員」になり、世の中の人を2種類に限ってしまう。",
        "another は単数。prefer（複数の動詞）と合わない。",
        "the other は残りの1人。",
      ],
    },
    point: "Some 〜, others … ＝ 〜な人もいれば…な人もいる",
    steps: [{ title: "残りは決まっていない", body: "数の決まらない「ほかの人たち」 → the をつけない {{others}}。", back: [S4] }],
  },
  {
    ...base("bigger-ones", 3),
    prompt: "These shoes are too small for me. Do you have bigger (　　)?\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["ones", "one", "them", "it"],
      correct: 0,
      why: [
        "同じ種類の別のくつ。shoes は複数なので ones。",
        "one は単数。shoes を受けられない。",
        "them は今はいている同じくつを指してしまい、bigger もつけられない。",
        "it は単数で同じ物を指す。",
      ],
    },
    point: "同じ種類で複数なら ones",
    steps: [{ title: "種類と数", body: "{{同じ種類}}の別のくつで、shoes は{{複数}} → bigger {{ones}}。", back: [S3] }],
  },
  {
    ...base("order-found-it-fun", 3),
    prompt: "「私は、彼と話すのは楽しいと思った」となるように、語句を正しい順に並べなさい。",
    answer: { kind: "order", tokens: ["I", "found", "it", "fun", "to talk", "with him."], distractor: "that" },
    point: "find it C to 〜 ＝ 〜するのは C だと思う",
    steps: [
      { title: "仮の目的語", body: "目的語 to talk with him が長いので、{{it}} を仮に置いて後ろへ回します。", back: [S2] },
      { title: "語順", body: "I found {{it}} fun {{to talk}} with him.", back: [S2] },
    ],
  },
];

export const H_ENG_GRAM_DAIMEISHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "文法",
  minutes: 8,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [{ title: "代名詞の使い分け", lead: "次の問いに答えなさい。", style: "word", pick: 6, questions: POOL }],
};
