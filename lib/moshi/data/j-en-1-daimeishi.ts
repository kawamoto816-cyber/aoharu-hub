// 中1英語「代名詞」の単元模試 (B: 問題プールからシードで6問)。問題はすべてオリジナル。
// プール15問 (基本5・標準5・発展5)。1回に基本2・標準2・発展2 が出る (lib/moshi/unit.ts の pickQuestions)。選択肢の順もシードで変わる。
// A (生成型) は使わないので検算式はない。英文と答えは lib/lecture/data/j-en-1-daimeishi.ts の要点・まちがい・確認問題に合わせた。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-1-daimeishi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "名詞のかわりをする語");
const S2 = L(2, "場所で決まる3つの形");
const S3 = L(3, "迷ったら、置く場所を見る");
const S4 = L(4, "this・that・these・those");

// 配点は難易度で決める (基本15・標準17・発展18。2問ずつ出るので満点100)
const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("they-friends", 1),
    prompt: "Yumi and Ken are my friends. (　　) are very kind. の (　　) に入る語として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["They", "We", "He", "Them"],
      correct: 0,
      why: ["正しい。ユミとケンの2人を指し、主語の位置なので主格の They。", "We は自分をふくむ「わたしたち」。ここではユミとケンの2人だけ。", "He は男性1人。2人を指すときは they。", "Them は目的格。主語の位置には置けない。"],
    },
    point: "2人以上は they、主語の位置は主格",
    steps: [{ title: "何人を指すか", body: "Yumi and Ken は2人なので {{they}}。動詞 are の前の主語なので主格の {{They}} です。", back: [S1] }],
  },
  {
    ...base("my-name", 1),
    prompt: "(　　) name is Takuya. I am a junior high school student. の (　　) に入る語として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["My", "I", "Me", "Mine"],
      correct: 0,
      why: ["正しい。名詞 name の前で「わたしの」を表すので所有格の My。", "I は主格。名詞の前では「〜の」の形にする。", "Me は目的格。名詞の前には置けない。", "Mine は「わたしのもの」で、後ろに名詞を置かない。"],
    },
    point: "名詞の前で「〜の」は所有格",
    steps: [{ title: "すぐ後ろを見る", body: "すぐ後ろに名詞 name があるので、{{所有格}} の {{My}}。", back: [S2] }],
  },
  {
    ...base("know-him", 1),
    prompt: "Do you know Mr. Tanaka? — Yes. I know (　　) well. の (　　) に入る語として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["him", "he", "his", "they"],
      correct: 0,
      why: ["正しい。動詞 know のあとなので目的格の him。", "he は主格。動詞のあとには置けない。", "his は所有格。後ろに名詞が必要。", "they は2人以上を指す主格。田中さんは1人。"],
    },
    point: "動詞のあとは目的格",
    steps: [{ title: "置く場所を見る", body: "（　）は動詞 know のあと。男性1人なので {{目的格}} の {{him}} です。", trap: "I know he. のように主格を置かない。", back: [S3] }],
  },
  {
    ...base("its-name", 1),
    prompt: "This is my dog. (　　) name is Pochi. の (　　) に入る語として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Its", "It", "They", "Their"],
      correct: 0,
      why: ["正しい。犬1ぴきの「その〜の」で、名詞 name の前なので所有格の Its。", "It は主格・目的格。名詞の前には「〜の」の形を置く。", "They は2つ以上を指す主格。", "Their は2つ以上のものの所有格。犬は1ぴき。"],
    },
    point: "it の所有格は its",
    steps: [{ title: "物・動物1つの「〜の」", body: "犬1ぴきは {{it}}。名詞 name の前なので所有格の {{Its}} です。", back: [S1, S2] }],
  },
  {
    ...base("plural-this", 1),
    prompt: "this（これ）の複数形を書きなさい。",
    answer: { kind: "term", accept: ["these"], near: [{ text: "those", why: "those は that（あれ）の複数形です。this の複数形は these。" }, { text: "thises", why: "this は -es をつけず、these という別の形になります。" }] },
    point: "this → these、that → those",
    steps: [{ title: "近い・遠いと数", body: "近くの2つ以上は {{these}}、遠くの2つ以上は those です。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...base("mine", 2),
    prompt: "「このかばんはわたしのものです。」という意味になるように、This bag is (　　). の (　　) に入る1語を書きなさい。",
    answer: { kind: "term", accept: ["mine"], near: [{ text: "my", why: "my は後ろに名詞が必要です。名詞を置かずに「わたしのもの」を表すのは mine。" }, { text: "me", why: "me は目的格。「わたしのもの」は所有代名詞の mine。" }] },
    point: "後ろに名詞がなければ所有代名詞",
    steps: [{ title: "後ろに名詞がない", body: "is のあとで文が終わり、名詞がありません。「〜のもの」を表す {{所有代名詞}} の {{mine}} を使います。", trap: "This bag is my. はまちがい。", back: [S3] }],
  },
  {
    ...base("these-are", 2),
    prompt: "(　　) are my new pencils. の (　　) に入る語として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["These", "This", "That", "It"],
      correct: 0,
      why: ["正しい。be動詞が are で、pencils は複数なので These。", "This は1つのときに使う。be動詞は is になる。", "That も1つのとき。be動詞は is になる。", "It は1つの物。be動詞は is になる。"],
    },
    point: "these・those の文は be動詞 are",
    steps: [{ title: "数と be動詞をそろえる", body: "pencils は2本以上、be動詞は are。だから this の複数形 {{These}} です。", back: [S4] }],
  },
  {
    ...base("like-her", 2),
    prompt: "Ms. Brown teaches us English. We like (　　) very much. の (　　) に入る語として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["her", "she", "hers", "them"],
      correct: 0,
      why: ["正しい。ブラウン先生（女性1人）を指し、動詞 like のあとなので目的格の her。", "she は主格。動詞のあとには置けない。", "hers は「彼女のもの」。ここでは「彼女を」の意味。", "them は2人以上。ブラウン先生は1人。"],
    },
    point: "she の目的格は her",
    steps: [{ title: "だれを指し、どこに置くか", body: "Ms. Brown は女性1人。動詞 like のあとなので {{目的格}} の {{her}}。her は所有格と目的格が同じ形です。", back: [S2, S3] }],
  },
  {
    ...base("yours", 2),
    prompt: "「このかさはあなたのものですか。」という意味になるように、Is this umbrella (　　)? の (　　) に入る語として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["yours", "your", "you", "its"],
      correct: 0,
      why: ["正しい。後ろに名詞がなく「あなたのもの」なので所有代名詞 yours。", "your は所有格。後ろに名詞が必要。", "you は「あなたは・あなたを」。「あなたのもの」ではない。", "its は「それの」で、後ろに名詞が必要。"],
    },
    point: "you の所有代名詞は yours",
    steps: [{ title: "名詞がないときの「〜の」", body: "（　）のあとに名詞がないので、所有代名詞の {{yours}} を使います。", back: [S3] }],
  },
  {
    ...base("ayas-bag", 2),
    prompt: "「アヤのかばん」を英語で書きなさい（2語）。",
    answer: { kind: "term", accept: ["Aya's bag", "Aya’s bag"], near: [{ text: "Aya bag", why: "人の名前で「〜の」を表すときは 's をつけます。Aya's bag。" }, { text: "Ayas bag", why: "s の前にアポストロフィ（'）が必要です。Aya's bag。" }] },
    point: "名前＋'s で「〜の」",
    steps: [{ title: "名前の「〜の」", body: "人の名前には {{'s}} をつけて「〜の」を表します。{{Aya's bag}}。", back: [S4] }],
  },
  // ---- 発展 ----
  {
    ...base("help-them", 3, "思考・判断・表現"),
    prompt: "I sometimes help my mother and my sister. の my mother and my sister を1語の代名詞にかえるとき、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["them", "they", "their", "her"],
      correct: 0,
      why: ["正しい。2人を指し、動詞 help のあとなので目的格の them。", "they は主格。動詞のあとには置けない。", "their は所有格。後ろに名詞が必要。", "her は女性1人。ここでは母と姉の2人。"],
    },
    point: "2人以上 ＋ 動詞のあと → them",
    steps: [{ title: "人数を決める", body: "母と姉で2人なので {{they}} の仲間。", back: [S1] }, { title: "形を決める", body: "動詞 help のあとなので目的格の {{them}} です。", back: [S2] }],
  },
  {
    ...base("we-ken-and-i", 3, "思考・判断・表現"),
    prompt: "Ken and I are classmates. (　　) often play soccer after school. の (　　) に入る語として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["We", "They", "He", "Us"],
      correct: 0,
      why: ["正しい。ケンと自分（I）の2人なので「わたしたち」。主語の位置なので主格の We。", "They は自分をふくまない2人以上。ここでは I がふくまれる。", "He はケン1人だけ。", "Us は目的格。主語の位置には置けない。"],
    },
    point: "自分をふくむ2人以上は we",
    steps: [{ title: "自分が入っているか", body: "Ken and I には自分がふくまれるので {{we}}。主語の位置なので主格の {{We}}。", trap: "2人以上だからと they にしない。", back: [S1] }],
  },
  {
    ...base("find-error", 3, "思考・判断・表現"),
    prompt: "まちがいをふくむ英文はどれですか。",
    answer: {
      kind: "choice",
      options: ["This pen is her.", "These are my books.", "He plays tennis with us.", "Their house is very big."],
      correct: 0,
      why: ["まちがい。後ろに名詞がなく「彼女のもの」なので hers にする。", "正しい。these の文は be動詞 are。", "正しい。前置詞 with のあとは目的格 us。", "正しい。名詞 house の前は所有格 their。"],
    },
    point: "「彼女のもの」は hers",
    steps: [{ title: "置く場所で確かめる", body: "This pen is (　). は後ろに名詞がないので、{{所有代名詞}} の {{hers}} にします。", back: [S3] }, { title: "ほかの文", body: "these の文は are、{{前置詞のあと}}は目的格、名詞の前は所有格で、どれも正しい形です。", back: [S2, S4] }],
  },
  {
    ...base("order-our-teacher", 3, "思考・判断・表現"),
    prompt: "「彼らはわたしたちの先生を知っています。」という意味になるように、語を並べかえなさい。使わない語が1つあります。",
    answer: { kind: "order", tokens: ["They", "know", "our", "teacher"], distractor: "us" },
    point: "名詞の前は所有格 our",
    steps: [{ title: "「わたしたちの」", body: "名詞 teacher の前で「わたしたちの」を表すのは所有格の {{our}}。us は目的格なので使いません。", back: [S2] }],
  },
  {
    ...base("order-those", 3, "思考・判断・表現"),
    prompt: "「あれらはあなたの本ですか。」という意味になるように、語を並べかえなさい。使わない語が1つあります。",
    answer: { kind: "order", tokens: ["Are", "those", "your", "books"], distractor: "yours" },
    point: "those の疑問文は Are those 〜?",
    steps: [{ title: "あれら＝those", body: "遠くの2つ以上は {{those}}。疑問文なので be動詞 Are を前に出します。", back: [S4] }, { title: "「あなたの」", body: "名詞 books の前なので所有格の {{your}}。yours は使いません。", back: [S3] }],
  },
];

export const J_EN_1_DAIMEISHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中1",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    {
      title: "代名詞",
      lead: "次の問いに答えなさい。",
      style: "mix",
      pick: 6,
      questions: POOL,
    },
  ],
};
