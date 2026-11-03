// 中1英語「助動詞 can」の単元模試 (B: 問題プールからシードで6問)。問題はすべてオリジナル (例文もこの模試のために作成)。
// プール14問 (基本4・標準6・発展4)。1回に基本2・標準2・発展2 が出る (lib/moshi/unit.ts の pickQuestions)。選択肢の順もシードで変わる。
// 内容は lib/lecture/data/j-en-1-can.ts の節・よくあるまちがい・確認問題に合わせた。A (生成) は使っていないので検算は不要。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-1-can";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "can は動詞の前。動詞は原形にもどす");
const S2 = L(2, "否定文・疑問文で do / does は使わない");
const S3 = L(3, "can の3つの意味");
const S4 = L(4, "Can I 〜? / Can you 〜? への答え方");
const S5 = L(5, "can のふるさとは「知っている」");

// 配点は難易度で決める (基本15・標準17・発展18。2問ずつ出るので満点100)
const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("genkei", 1),
    prompt: "（　）に入るものとして正しいものはどれですか。\nEmi (　　) the guitar very well.（エミはギターをとても上手にひけます。）",
    answer: {
      kind: "choice",
      options: ["can play", "can plays", "cans play", "can playing"],
      correct: 0,
      why: ["正しい。can のあとの動詞は原形。", "主語が Emi（3人称単数）でも、can のあとの動詞に s はつけない。", "can 自体にも s はつかない。", "can のあとは -ing 形ではなく原形。"],
    },
    point: "can＋動詞の原形。主語が何でも形は同じ",
    steps: [{ title: "can のあとは原形", body: "「〜できる」は {{can＋動詞の原形}}。主語が Emi でも plays にはせず、{{can play}} とします。", trap: "三単現の s を can のあとの動詞につけてしまう。", back: [S1] }],
  },
  {
    ...base("hitei", 1),
    prompt: "日本文に合うように、（　）に入る1語を書きなさい。\n私は速く走れません。\nI (　　) run fast.",
    answer: { kind: "term", accept: ["can't", "cannot", "can’t"], near: [{ text: "don't", why: "can の文の否定は do を使わず、can のあとに not をつけて can't（cannot）にします。" }, { text: "can", why: "「走れません」なので否定の形にします。can't（cannot）。" }] },
    point: "否定は can't（cannot）＋原形",
    steps: [{ title: "can に not をつける", body: "can の文の否定は、can のあとに not を置きます。1語で書くと {{can't}} か {{cannot}}。don't は使いません。", back: [S2] }],
  },
  {
    ...base("kotae-swim", 1),
    prompt: "Can you swim? に「はい」で答えるとき、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Yes, I can.", "Yes, I do.", "Yes, I am.", "Yes, you can."],
      correct: 0,
      why: ["正しい。can でたずねられたら can で答える。you でたずねられたので I で答える。", "do で答えるのは Do you 〜? の質問。", "am で答えるのは Are you 〜? の質問。", "「あなたは泳げるか」と聞かれたので、答えの主語は I。"],
    },
    point: "Can 〜? には can で答える",
    steps: [{ title: "たずねた語で答える", body: "Can you 〜?（できますか）には {{Yes, I can.}} / {{No, I can't.}} と can を使って答えます。", back: [S4] }],
  },
  {
    ...base("imi-kyoka", 1),
    prompt: "Can I use your eraser? の意味として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["あなたの消しゴムを使ってもいいですか。", "私はあなたの消しゴムを使うことができます。", "あなたの消しゴムを使ってくれますか。", "あなたは私の消しゴムを使えますか。"],
      correct: 0,
      why: ["正しい。Can I 〜? は「〜してもいいですか」と許可を求める言い方。", "これは I can use your eraser. の意味。疑問文ではない。", "「〜してくれますか」と頼むのは Can you 〜?。", "主語は I（私）で、your eraser は「あなたの消しゴム」。"],
    },
    point: "Can I 〜? ＝ 〜してもいいですか（許可）",
    steps: [{ title: "主語が I なら許可", body: "{{Can I 〜?}} は「私が〜してもいいですか」と許可を求める言い方です。Can you 〜? の「〜してくれますか」と区別します。", back: [S3] }],
  },
  // ---- 標準 ----
  {
    ...base("kakikae", 2),
    prompt: "Tom writes kanji. を「トムは漢字を書くことができます。」という文に書きかえます。（　）に入る2語を書きなさい。\nTom (　　) (　　) kanji.",
    answer: { kind: "term", accept: ["can write"], near: [{ text: "can writes", why: "can のあとの動詞は原形。writes の s をとって can write にします。" }, { text: "cans write", why: "can 自体には s がつきません。can write。" }] },
    point: "can を入れたら、動詞の s をとる",
    steps: [
      { title: "can を動詞の前に", body: "writes の前に can を置きます。", back: [S1] },
      { title: "動詞を原形にもどす", body: "can のあとは原形なので、writes → {{write}}。答えは {{can write}}。", trap: "can を入れたのに writes の s を残してしまう。" },
    ],
  },
  {
    ...base("narabe-gimon", 2),
    prompt: "日本文に合うように、語句を並べかえなさい。1つ使わない語句があります。\nあなたのお父さんは車を運転できますか。",
    answer: { kind: "order", tokens: ["Can", "your father", "drive", "a car?"], distractor: "Does" },
    point: "疑問文は Can を主語の前へ。does は使わない",
    steps: [{ title: "Can を文の最初に", body: "can の疑問文は {{Can＋主語＋動詞の原形 〜?}}。Does はいっしょに使いません。Can your father drive a car?", trap: "Does your father can drive 〜? のように do / does を足してしまう。", back: [S2] }],
  },
  {
    ...base("kotae-he", 2),
    prompt: "次の質問に「いいえ」で答えます。（　）に入る2語を書きなさい。\nCan Mr. Sato speak Chinese? — No, (　　) (　　).",
    answer: { kind: "term", accept: ["he can't", "he cannot", "he can’t"], near: [{ text: "he doesn't", why: "Can 〜? の質問には can で答えます。No, he can't." }, { text: "Mr. Sato can't", why: "答えの文では Mr. Sato を代名詞 he にかえます。" }] },
    point: "主語は代名詞にかえて、can で答える",
    steps: [{ title: "代名詞＋can't", body: "Mr. Sato は男性なので {{he}} にかえ、can の質問なので {{can't}} で答えます。No, he can't.", back: [S4] }],
  },
  {
    ...base("irai-kotae", 2, "思考・判断・表現"),
    prompt: "友だちに Can you carry this box with me? と頼まれました。引き受けるときの答えとして、もっとも自然なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Sure.", "Yes, you can.", "Yes, I do.", "No, I don't."],
      correct: 0,
      why: ["正しい。依頼を引き受けるときは Sure. や OK. がよく使われる。", "「あなたはしてもいいですよ」になってしまい、頼まれた答えにならない。", "Can you 〜? の質問に do で答えない。", "do で答えないうえに、引き受けていない。"],
    },
    point: "依頼・許可には Sure. / OK. で答える",
    steps: [{ title: "依頼への答え方", body: "Can you 〜? は「〜してくれますか」という依頼。引き受けるなら {{Sure.}} や {{OK.}}、ことわるなら Sorry, 〜. と理由をそえます。", back: [S3, S4] }],
  },
  {
    ...base("what-can", 2),
    prompt: "What can you see from this window? への答えとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["I can see a tall tower.", "Yes, I can.", "No, I can't.", "I see can a tall tower."],
      correct: 0,
      why: ["正しい。What（何）とたずねられたので、見えるものを can を使って答える。", "疑問詞の質問には Yes / No で答えない。", "疑問詞の質問には Yes / No で答えない。", "can は動詞 see の前に置く。"],
    },
    point: "What can 〜? には、中身を答える",
    steps: [{ title: "疑問詞＋can の疑問文", body: "{{What can you 〜?}} は「何を〜できますか」。答えは Yes / No ではなく、{{I can see 〜.}} のように中身を言います。", back: [S2] }],
  },
  {
    ...base("ayamari", 2),
    prompt: "次の英文のうち、まちがいをふくむものはどれですか。",
    answer: {
      kind: "choice",
      options: ["He cans speak French.", "My mother can drive.", "They can swim well.", "We can sing this song."],
      correct: 0,
      why: ["まちがい。can 自体には s がつかない。He can speak French. が正しい。", "正しい英文。", "正しい英文。", "正しい英文。"],
    },
    point: "can は主語が he でも cans にならない",
    steps: [{ title: "can の形は1つだけ", body: "主語が he・she・my mother でも、{{can}} の形は変わりません。He {{can}} speak French.", back: [S1, S5] }],
  },
  // ---- 発展 ----
  {
    ...base("narabe-what", 3),
    prompt: "日本文に合うように、語を並べかえなさい。1つ使わない語があります。\nあなたは何語を話せますか。",
    answer: { kind: "order", tokens: ["What", "languages", "can", "you", "speak?"], distractor: "do" },
    point: "疑問詞（＋名詞）を先頭に、can＋主語＋原形",
    steps: [
      { title: "たずねたい中身を先頭に", body: "「何語」は {{What languages}}。疑問詞のまとまりを文の最初に置きます。", back: [S2] },
      { title: "あとは can の疑問文", body: "続けて {{can you speak?}}。do は使いません。What languages can you speak?", trap: "What languages do you can speak? のように do を入れてしまう。" },
    ],
  },
  {
    ...base("imi-erabu", 3, "思考・判断・表現"),
    prompt: "次の英文のうち、can が「〜してもいいですか（許可）」の意味で使われているものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Can I sit next to you?", "Can you help me with my homework?", "My dog can jump high.", "Can your brother ski?"],
      correct: 0,
      why: ["正しい。Can I 〜? で「となりにすわってもいいですか」と許可を求めている。", "Can you 〜? で「手伝ってくれますか」と依頼している。", "「高くとべる」という能力。", "「あなたのお兄さん（弟）はスキーができますか」と能力をたずねている。"],
    },
    point: "許可は Can I、依頼は Can you、ふつうは能力",
    steps: [{ title: "主語で意味を見分ける", body: "{{Can I 〜?}} は許可、{{Can you 〜?}} は依頼。それ以外の主語では、ふつう「〜できる」という能力の意味です。", back: [S3] }],
  },
  {
    ...base("bamen", 3, "思考・判断・表現"),
    prompt: "ホームステイ先で、テーブルの上の塩をとってほしいとき、家の人に言う英文としてもっとも適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Can you pass me the salt?", "Can I pass you the salt?", "I can pass you the salt.", "Do you can pass me the salt?"],
      correct: 0,
      why: ["正しい。相手に「〜してくれますか」と頼むので Can you 〜?。", "「私があなたに塩をわたしてもいいですか」になり、立場が逆。", "「私は塩をわたせます」という意味で、頼んでいない。", "can の疑問文に do は使わない。"],
    },
    point: "相手に頼むときは Can you 〜?",
    steps: [
      { title: "だれが動くか", body: "塩をとるのは相手なので、主語は {{you}}。頼む言い方は {{Can you 〜?}} です。", back: [S3] },
      { title: "語順", body: "can の疑問文なので Can を主語の前に出し、do は使いません。", back: [S2] },
    ],
  },
  {
    ...base("yurai", 3, "思考・判断・表現"),
    prompt: "can には、主語が he でも s がつきません。レクチャーで学んだ can の由来から考えると、その理由としてもっとも適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["can はもともと「知っている」という意味の、過去形の形をした動詞から生まれたから", "can はもともと名詞だったので、動詞の変化をしないから", "can は400年前に新しく作られた語で、古いきまりにしたがわないから", "can のあとにはいつも to がつくので、s をつける場所がないから"],
      correct: 0,
      why: ["正しい。過去形に s がつかないのと同じで、can にも s がつかない。", "can は名詞から生まれた語ではない。", "can はもっと古く、1000年ほど前の英語にあった動詞から生まれた。", "can のあとは to のない原形。to はつかない。"],
    },
    point: "can のもとは「知っている」の過去形の形",
    steps: [{ title: "過去形と同じあつかい", body: "can は1000年ほど前に「{{知っている}}」を意味した、{{過去形の形}}の動詞から生まれました。過去形に s がつかないように、can にも s がつきません。あとの動詞も、昔から to のない形（原形）です。", back: [S5] }],
  },
];

export const J_EN_1_CAN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中1",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "助動詞 can",
      lead: "次の問いに答えなさい。",
      style: "mix",
      pick: 6,
      questions: POOL,
    },
  ],
};
