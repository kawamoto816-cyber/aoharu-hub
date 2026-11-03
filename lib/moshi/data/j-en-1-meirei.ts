// 中1英語「命令文」の単元模試 (B: 問題プールからシードで6問)。問題はすべてオリジナル (例文もこの模試のために作成)。
// プール15問 (基本4・標準6・発展5)。1回に基本2・標準2・発展2 が出る (lib/moshi/unit.ts の pickQuestions)。選択肢の順もシードで変わる。
// 内容は lib/lecture/data/j-en-1-meirei.ts の節・よくあるまちがい・確認問題に合わせた。A (生成) は使っていないので検算は不要。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-1-meirei";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "命令文は主語をとって、動詞の原形で始める");
const S2 = L(2, "be動詞の命令文は Be で始める");
const S3 = L(3, "命令・禁止・さそいの3つの形");
const S4 = L(4, "言われたときの返し方");
const S5 = L(5, "Let us ―― 大統領が選んだ「〜しよう」");

// 配点は難易度で決める (基本15・標準17・発展18。2問ずつ出るので満点100)
const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("genkei", 1),
    prompt: "（　）に入るものとして正しいものはどれですか。\n(　　) your bike in this area.（自転車はこの場所にとめなさい。）",
    answer: {
      kind: "choice",
      options: ["Park", "Parks", "Parking", "You parks"],
      correct: 0,
      why: ["正しい。命令文は主語を置かず、動詞の原形で始める。", "命令文には主語がないので、動詞に s はつかない。", "-ing 形では命令文にならない。", "命令文では主語 you を言わない。また you のあとの動詞に s はつかない。"],
    },
    point: "命令文は動詞の原形で始める",
    steps: [{ title: "主語をとって原形から", body: "「〜しなさい」は目の前の相手に言うので主語を省き、{{動詞の原形}}で始めます。{{Park}} your bike 〜.", back: [S1] }],
  },
  {
    ...base("be-nice", 1),
    prompt: "（　）に入るものとして正しいものはどれですか。\n(　　) nice to your little brother.（弟にやさしくしなさい。）",
    answer: {
      kind: "choice",
      options: ["Be", "Are", "Is", "Do"],
      correct: 0,
      why: ["正しい。nice は形容詞なので、be動詞の原形 Be で始める。", "命令文では are を使わず、原形の be にする。", "is も原形ではないので命令文の最初に置けない。", "Do nice 〜 では「やさしい」というようすを表せない。be動詞が必要。"],
    },
    point: "形容詞の命令文は Be で始める",
    steps: [{ title: "be動詞の原形は be", body: "nice（やさしい）は形容詞なので、be動詞の力を借ります。am・are・is の原形は {{be}}。{{Be nice}} to 〜.", trap: "You are nice. の are をそのまま使って Are nice. としてしまう。", back: [S2] }],
  },
  {
    ...base("dont-shout", 1),
    prompt: "日本文に合うように、（　）に入る1語を書きなさい。\nこの部屋で大きな声を出してはいけません。\n(　　) shout in this room.",
    answer: { kind: "term", accept: ["Don't", "Don’t"], near: [{ text: "Not", why: "not だけでは禁止の文になりません。命令文の前に Don't を置きます。" }, { text: "No", why: "禁止の命令文は Don't＋動詞の原形で始めます。" }, { text: "Do not", why: "意味は正しいですが、（　）は1つなので短い形の Don't にします。" }] },
    point: "禁止は Don't＋動詞の原形",
    steps: [{ title: "命令文の前に Don't", body: "「〜してはいけない」は、命令文 Shout 〜. の前に {{Don't}} を置きます。Don't shout in this room.", back: [S3] }],
  },
  {
    ...base("kotae-lets", 1),
    prompt: "Let's make curry tonight. と言われて、さんせいするときの答えとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Yes, let's.", "Yes, I do.", "Yes, I am.", "Yes, you can."],
      correct: 0,
      why: ["正しい。Let's 〜. には Let's の形をそのまま使って Yes, let's. と答える。", "Let's 〜. は質問ではないので、do で答えない。", "am で答えるのは Are you 〜? の質問。", "「あなたはしてもいい」となり、さそいへの返事にならない。"],
    },
    point: "Let's 〜. には Yes, let's. / No, let's not.",
    steps: [{ title: "Let's で返す", body: "さそわれたら Let's の形で返します。さんせいなら {{Yes, let's.}}、反対なら No, let's not.", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...base("kakikae-be", 2),
    prompt: "You are careful on the stairs. を「階段では気をつけなさい。」という命令文に書きかえなさい。",
    answer: { kind: "term", accept: ["Be careful on the stairs."], near: [{ text: "Are careful on the stairs.", why: "you をとったら、are を原形の be にかえます。" }, { text: "Careful on the stairs.", why: "careful は形容詞なので、be動詞の原形 Be が必要です。" }] },
    point: "you をとり、are を be にかえる",
    steps: [
      { title: "主語 you をとる", body: "命令文は主語を言わないので、You をとります。", back: [S1] },
      { title: "are を原形にもどす", body: "are の原形は {{be}}。文の最初なので大文字にして {{Be careful on the stairs.}}", trap: "are を残して Are careful 〜. にしてしまう。", back: [S2] },
    ],
  },
  {
    ...base("narabe-dont-be", 2),
    prompt: "日本文に合うように、語句を並べかえなさい。1つ使わない語句があります。\nまちがいをこわがってはいけません。",
    answer: { kind: "order", tokens: ["Don't", "be", "afraid of", "mistakes."], distractor: "are" },
    point: "be動詞の禁止は Don't be 〜",
    steps: [{ title: "Don't＋Be の命令文", body: "afraid（こわがって）は形容詞なので Be afraid of 〜.。禁止はその前に Don't を置いて {{Don't be afraid of mistakes.}}", trap: "Don't are 〜 と are を使ってしまう。Don't のあとも原形。", back: [S2, S3] }],
  },
  {
    ...base("please", 2),
    prompt: "次の英文のうち、まちがいをふくむものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Please closes the gate.", "Close the gate, please.", "Please close the gate.", "Mika, close the gate."],
      correct: 0,
      why: ["まちがい。Please がついても命令文の動詞は原形。Please close the gate. が正しい。", "正しい英文。please は文の最後に , please とつけてもよい。", "正しい英文。", "正しい英文。名前のあとにコンマを打って呼びかけている。動詞は原形のまま。"],
    },
    point: "Please がついても動詞は原形",
    steps: [{ title: "主語がないので s はつかない", body: "Please 〜. も命令文なので、動詞は {{原形}}。closes ではなく {{close}} です。呼びかけの名前（Mika,）があっても同じです。", back: [S1] }],
  },
  {
    ...base("kotae-meirei", 2),
    prompt: "友だちに Please hold this bag for a minute. と言われました。引き受けるときの返事として、もっとも自然なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["All right.", "Yes, I do.", "Yes, let's.", "No, I'm not."],
      correct: 0,
      why: ["正しい。命令文やお願いには OK. / All right. / Sure. と返す。", "お願いは質問ではないので、Yes, I do. とは答えない。", "Yes, let's. は Let's 〜. とさそわれたときの返事。", "Are you 〜? の答え方で、しかも引き受けていない。"],
    },
    point: "お願いには OK. / All right. / Sure.",
    steps: [{ title: "質問ではないので Yes / No で答えない", body: "Please 〜. はお願い。引き受けるなら {{All right.}}、{{OK.}}、{{Sure.}} と返して、すぐに動きます。", back: [S4] }],
  },
  {
    ...base("narabe-lets", 2),
    prompt: "日本文に合うように、語句を並べかえなさい。1つ使わない語句があります。\n放課後、図書館でいっしょに勉強しよう。",
    answer: { kind: "order", tokens: ["Let's", "study", "in the library", "after school."], distractor: "studying" },
    point: "Let's のあとも動詞は原形",
    steps: [{ title: "Let's＋動詞の原形", body: "「〜しよう」は {{Let's＋動詞の原形}}。studying ではなく {{study}} を使います。場所（in the library）→ 時（after school）の順にします。", trap: "Let's studying 〜 と -ing 形にしてしまう。", back: [S3] }],
  },
  {
    ...base("lets-tadashii", 2),
    prompt: "次の英文のうち、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Let's swim in the sea.", "Let's swimming in the sea.", "Let's swims in the sea.", "Let's to swim in the sea."],
      correct: 0,
      why: ["正しい。Let's＋動詞の原形。", "Let's のあとに -ing 形は来ない。", "Let's のあとの動詞に s はつかない。", "Let's のあとに to は置かない。"],
    },
    point: "Let's＋原形。-ing・s・to はつけない",
    steps: [{ title: "Let's のあとは原形だけ", body: "Let's は Let us を短くした形で、あとの動詞はいつも {{原形}}です。{{Let's swim}} 〜.", back: [S3] }],
  },
  // ---- 発展 ----
  {
    ...base("ken-wash", 3),
    prompt: "（　）に入るものとして正しいものはどれですか。\nKen, (　　) the dishes after dinner.（ケン、夕食のあとでお皿を洗ってね。）",
    answer: {
      kind: "choice",
      options: ["wash", "washes", "washing", "to wash"],
      correct: 0,
      why: ["正しい。Ken, は呼びかけで主語ではない。命令文なので動詞は原形。", "Ken を主語と考えると washes にしたくなるが、コンマのある Ken, は呼びかけ。", "-ing 形では命令文にならない。", "命令文は to で始めない。"],
    },
    point: "名前, のあとも命令文。動詞は原形",
    steps: [
      { title: "コンマのある名前は呼びかけ", body: "{{Ken,}} は「ケン」と呼びかけているだけで、主語ではありません。", back: [S1] },
      { title: "動詞は原形", body: "命令はケン（目の前の相手）に向けたものなので、動詞は {{wash}}。", trap: "Ken を3人称単数の主語と思って washes にしてしまう。" },
    ],
  },
  {
    ...base("lets-not", 3),
    prompt: "次の会話の（　）に入る2語を書きなさい。\nA: Let's play tennis this afternoon.\nB: No, (　　) (　　). It's too hot today.",
    answer: { kind: "term", accept: ["let's not"], near: [{ text: "I don't", why: "Let's 〜. は質問ではないので do で答えません。No, let's not. です。" }, { text: "let's don't", why: "Let's の反対は Let's not。don't は使いません。" }, { text: "I can't", why: "Sorry, I can't. も使えますが、ここは No, に続く2語なので let's not にします。" }] },
    point: "反対するときは No, let's not.",
    steps: [{ title: "Let's で返す", body: "さそいに反対するときは、Let's の形をそのまま使って {{No, let's not.}}（いや、やめておこう）。あとに理由（It's too hot today.）をそえると、やわらかく伝わります。", back: [S4] }],
  },
  {
    ...base("bamen-kinshi", 3, "思考・判断・表現"),
    prompt: "川のそばで、留学生に「この川では泳がないでください。危ないです。」と伝えます。英文としてもっとも適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Please don't swim in this river. It's dangerous.", "Please not swim in this river. It's dangerous.", "Don't swimming in this river. It's dangerous.", "You don't swim in this river. It's dangerous."],
      correct: 0,
      why: ["正しい。ていねいな禁止は Please don't＋動詞の原形。", "not だけでは禁止にならない。don't が必要。", "Don't のあとは原形。swimming にしない。", "「あなたはこの川で泳がない」という事実を言う文になり、禁止にならない。"],
    },
    point: "ていねいな禁止は Please don't＋原形",
    steps: [
      { title: "禁止の形", body: "「〜しないで」は {{Don't＋動詞の原形}}。ていねいにするなら前に Please をつけて {{Please don't swim}} 〜.", back: [S3] },
      { title: "主語のある文との区別", body: "You don't 〜. は「あなたは〜しない」というふつうの否定文。命令文は主語を言いません。", back: [S1] },
    ],
  },
  {
    ...base("be-not-afraid", 3, "思考・判断・表現"),
    prompt: "シェイクスピアの劇には be not afraid（おそれるな）という言い方が出てきます。これを今の英語の禁止の形にしたものとして、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Don't be afraid.", "Don't afraid.", "Not be afraid.", "Aren't afraid."],
      correct: 0,
      why: ["正しい。今の英語では、be動詞の命令文の禁止も Don't で始めて Don't be 〜. とする。", "afraid は形容詞なので be が必要。Don't be afraid.", "not で始める形は今の英語では使わない。", "are は原形ではないので命令文にならない。"],
    },
    point: "昔の be not 〜 は、今は Don't be 〜",
    steps: [
      { title: "昔と今の禁止", body: "シェイクスピアの時代は動詞のあとに not を置いて禁止を表せましたが、のちに do を使うしくみが広まりました。", back: [S3] },
      { title: "be動詞の禁止", body: "afraid は形容詞なので Be afraid.。禁止は前に Don't を置いて {{Don't be afraid.}}", back: [S2] },
    ],
  },
  {
    ...base("let-us", 3, "思考・判断・表現"),
    prompt: "リンカーンは演説で、Bind up the nation's wounds.（国の傷を手当てせよ）という命令文ではなく、let us 〜（〜しよう）を使いました。この選び方から伝わることとして、もっとも適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["話している大統領自身も、仕事をする「わたしたち」の側に入っていること", "聞いている人だけに、強く仕事を言いつけていること", "please と同じように、ていねいにお願いしているだけであること", "すでに終わった出来事を、聞く人に説明していること"],
      correct: 0,
      why: ["正しい。Let us は「わたしたちに〜させよう」で、話す人もふくめた呼びかけ。", "それは命令文の Bind up 〜. の場合。命令文は相手（you）だけに向けたことば。", "Let us は話す人自身もふくめる点が please の命令文とちがう。", "Let us 〜 はこれからすることへの呼びかけで、過去の説明ではない。"],
    },
    point: "Let us は話す人もふくめた「わたしたち」",
    steps: [{ title: "命令文と Let us のちがい", body: "命令文は目の前の相手（you）に言うことばで、話す人は命じる側に立ちます。{{Let us}} は「わたしたちに〜させよう」なので、{{話す人自身もふくめた}}呼びかけになります。", back: [S5] }],
  },
];

export const J_EN_1_MEIREI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中1",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "命令文",
      lead: "次の問いに答えなさい。",
      style: "mix",
      pick: 6,
      questions: POOL,
    },
  ],
};
