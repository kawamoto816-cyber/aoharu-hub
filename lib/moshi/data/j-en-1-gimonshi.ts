// 中1英語「疑問詞」の単元模試 (B: 問題プールからシードで6問)。問題はすべてオリジナル (例文もこの模試のために作成)。
// プール14問 (基本4・標準6・発展4)。1回に基本2・標準2・発展2 が出る (lib/moshi/unit.ts の pickQuestions)。選択肢の順もシードで変わる。
// 内容は lib/lecture/data/j-en-1-gimonshi.ts の節・よくあるまちがい・確認問題に合わせた。A (生成) は使っていないので検算は不要。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-1-gimonshi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "疑問詞は何をたずねるか");
const S2 = L(2, "語順：疑問詞＋疑問文");
const S3 = L(3, "How と What は後ろの語で意味が広がる");
const S4 = L(4, "Who が主語になるとき");
const S5 = L(5, "6人の召し使い：疑問詞で世界をたずねる");

// 配点は難易度で決める (基本15・標準17・発展18。2問ずつ出るので満点100)
const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("where", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\n(　　) do you play soccer? — In the park near my house.",
    answer: {
      kind: "choice",
      options: ["Where", "When", "Who", "Why"],
      correct: 0,
      why: ["正しい。「家の近くの公園で」と場所を答えている。", "When は時をたずねる。答えが時ではない。", "Who は人をたずねる。", "Why は理由をたずねる。答えに Because がない。"],
    },
    point: "場所をたずねるのは Where",
    steps: [{ title: "答えから逆にたどる", body: "答えの In the park は {{場所}}。場所をたずねる疑問詞は {{Where}} です。", back: [S1] }],
  },
  {
    ...base("who", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\n(　　) is that boy? — He is my cousin, Daiki.",
    answer: {
      kind: "choice",
      options: ["Who", "What", "Whose", "Which"],
      correct: 0,
      why: ["正しい。「いとこのダイキです」と人を答えている。", "What は物をたずねる。", "Whose は「だれの」と持ち主をたずねる。", "Which は「どちら」と選ぶときに使う。"],
    },
    point: "人をたずねるのは Who",
    steps: [{ title: "人か物か", body: "答えが「いとこのダイキ」という {{人}} なので {{Who}}（だれ）を使います。", back: [S1] }],
  },
  {
    ...base("whose", 1),
    prompt: "（　）に入る1語を書きなさい。\n(　　) umbrella is this? — It's my sister's.",
    answer: { kind: "term", accept: ["Whose"], near: [{ text: "Who", why: "「だれの」と持ち主をたずねるときは Whose。Whose umbrella で「だれのかさ」。" }, { text: "Who's", why: "Who's は Who is の短縮形。持ち主は Whose。" }] },
    point: "持ち主をたずねるのは Whose＋名詞",
    steps: [{ title: "持ち主をたずねる", body: "答えの my sister's（姉の）は持ち主。{{Whose umbrella}}（だれのかさ）とたずねます。", trap: "発音が同じ Who's（＝Who is）と書いてしまう。", back: [S1] }],
  },
  {
    ...base("kotae-where", 1),
    prompt: "Where does your uncle work? への答えとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["He works at a hospital.", "Yes, he does.", "No, he doesn't.", "He is busy."],
      correct: 0,
      why: ["正しい。Where（どこで）に対して、働く場所を答えている。", "疑問詞の質問には Yes / No で答えない。", "疑問詞の質問には Yes / No で答えない。", "場所を答えていない。"],
    },
    point: "疑問詞の質問には中身を答える",
    steps: [{ title: "Yes / No で答えない", body: "疑問詞の質問には、たずねられた {{中身}}（ここでは場所）を答えます。He works {{at a hospital}}.", back: [S2] }],
  },
  // ---- 標準 ----
  {
    ...base("how-many", 2),
    prompt: "（　）に入る2語を書きなさい。\n(　　) (　　) cats does Mr. Ito have? — He has four.",
    answer: { kind: "term", accept: ["How many"], near: [{ text: "How much", why: "数えられる名詞の「いくつ」は How many。How much は量や値段。" }, { text: "What many", why: "数をたずねるのは How many です。" }] },
    point: "数をたずねるのは How many＋複数形",
    steps: [{ title: "数をたずねる", body: "答えが four（4ひき）という {{数}} なので、{{How many}} を使います。後ろの cats は複数形です。", back: [S3] }],
  },
  {
    ...base("fukusu", 2),
    prompt: "次の英文のうち、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["How many pencils do you have?", "How many pencil do you have?", "How many pencils you have?", "How many pencils are you have?"],
      correct: 0,
      why: ["正しい。How many＋複数形のあとに、ふつうの疑問文 do you have を続ける。", "How many のあとの数えられる名詞は複数形にする。", "一般動詞の疑問文なので do が必要。", "have は一般動詞なので are ではなく do を使う。"],
    },
    point: "How many＋複数形＋疑問文の語順",
    steps: [
      { title: "名詞は複数形", body: "How many のあとは {{複数形}}。pencil → pencils。", back: [S3] },
      { title: "あとはふつうの疑問文", body: "have は一般動詞なので {{do you have?}} と続けます。", back: [S2] },
    ],
  },
  {
    ...base("why-kotae", 2, "思考・判断・表現"),
    prompt: "Why do you like winter? への答えとして、もっとも自然なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Because I can ski in the mountains.", "Yes, I like it very much.", "In December.", "I like winter."],
      correct: 0,
      why: ["正しい。Why（なぜ）には Because 〜 で理由を答える。", "疑問詞の質問に Yes で答えていて、理由もない。", "時を答えている。When の質問への答え。", "質問をくり返しているだけで、理由がない。"],
    },
    point: "Why には Because 〜 で理由を答える",
    steps: [{ title: "理由を答える", body: "Why は理由をたずねる疑問詞。ふつう {{Because 〜}} で答えます。", back: [S2] }],
  },
  {
    ...base("narabe-where", 2),
    prompt: "日本文に合うように、語句を並べかえなさい。1つ使わない語があります。\nあなたのお姉さんはどこに住んでいますか。",
    answer: { kind: "order", tokens: ["Where", "does", "your sister", "live?"], distractor: "lives" },
    point: "疑問詞＋does＋主語＋原形",
    steps: [{ title: "疑問詞のあとはふつうの疑問文", body: "{{Where}} を先頭に置き、does your sister live? を続けます。does があるので動詞は原形の {{live}}。", trap: "Where your sister lives? のように does をぬかす。", back: [S2] }],
  },
  {
    ...base("what-time", 2),
    prompt: "（　）に入る2語を書きなさい。\n(　　) (　　) is it now? — It's ten fifteen.",
    answer: { kind: "term", accept: ["What time"], near: [{ text: "When", why: "( ) が2つあり、時刻をたずねるので What time。" }, { text: "How time", why: "時刻は What time でたずねます。" }] },
    point: "時刻は What time",
    steps: [{ title: "What＋名詞", body: "What は後ろに名詞をつけて意味が広がります。時刻をたずねるのは {{What time}}。", back: [S3] }],
  },
  {
    ...base("how-old", 2),
    prompt: "（　）に入る1語を書きなさい。\nHow (　　) is this bridge? — It's about 120 years old.",
    answer: { kind: "term", accept: ["old"], near: [{ text: "many", why: "How many は数。年れい・古さをたずねるのは How old。" }, { text: "long", why: "How long は長さや期間。答えの years old から How old。" }] },
    point: "How＋形容詞で程度をたずねる",
    steps: [{ title: "答えの old に注目", body: "答えが 〜 years {{old}} なので、{{How old}}（どれくらい古い・何才）とたずねます。", back: [S3] }],
  },
  // ---- 発展 ----
  {
    ...base("kakikae-what", 3, "思考・判断・表現"),
    prompt: "Ms. Green teaches {{science}}. の {{science}} をたずねる文になるように、語を並べかえなさい。1つ使わない語があります。",
    answer: { kind: "order", tokens: ["What", "does", "Ms. Green", "teach?"], distractor: "teaches" },
    point: "物は What。does を入れて動詞は原形",
    steps: [
      { title: "疑問詞を選ぶ", body: "science は教える {{もの}}（教科）なので What。", back: [S1] },
      { title: "語順", body: "What のあとに does Ms. Green teach? を続けます。does を使うので teaches は原形 {{teach}} にもどします。", trap: "What does Ms. Green teaches? のように s を残す。", back: [S2] },
    ],
  },
  {
    ...base("who-shugo", 3),
    prompt: "「だれがこの教室をそうじしますか。」を表す英文として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Who cleans this classroom?", "Who does clean this classroom?", "Who do you clean this classroom?", "Who clean this classroom?"],
      correct: 0,
      why: ["正しい。Who が主語なので疑問詞＋動詞の語順。3人称単数あつかいで cleans。", "Who が主語のときは does を使わない。", "Who が主語なので do も you もいらない。主語が2つあることになり、文として成り立たない。", "Who は3人称単数あつかいなので、動詞に s をつける。"],
    },
    point: "Who が主語なら Who＋動詞(-s)",
    steps: [{ title: "Who がそのまま主語", body: "「だれが」と Who が {{主語}} になるときは do / does を使わず、{{Who＋動詞}} の語順。Who は3人称単数あつかいなので {{cleans}}。", back: [S4] }],
  },
  {
    ...base("who-kotae", 3),
    prompt: "（　）に入る1語を書きなさい。\nWho makes breakfast in your family? — My father (　　).",
    answer: { kind: "term", accept: ["does"], near: [{ text: "do", why: "主語の My father は3人称単数なので does。" }, { text: "makes", why: "答えは「主語＋do / does」で短く言います。My father does." }] },
    point: "Who 〜? の答えは「主語＋does」",
    steps: [{ title: "短く答える", body: "Who が主語の質問には、{{主語＋do / does}} で答えます。My father は3人称単数なので {{does}}。", back: [S4] }],
  },
  {
    ...base("5w1h", 3, "思考・判断・表現"),
    prompt: "次の文を読み、Why の質問の答えにあたる部分を選びなさい。\nLast Saturday, Riku and his friends picked up trash on the beach because they wanted to help the sea animals.",
    answer: {
      kind: "choice",
      options: ["because they wanted to help the sea animals", "Last Saturday", "on the beach", "Riku and his friends"],
      correct: 0,
      why: ["正しい。because 以下が理由で、Why の答えになる。", "時を表す部分。When の答え。", "場所を表す部分。Where の答え。", "人を表す部分。Who の答え。"],
    },
    point: "1つの出来事を疑問詞で分けて読む",
    steps: [{ title: "情報の種類で分ける", body: "Last Saturday＝When、Riku and his friends＝Who、on the beach＝Where、picked up trash＝What、{{because 〜}}＝{{Why}}。疑問詞ごとに情報を取り出すと、出来事の全体がわかります。", back: [S5] }],
  },
];

export const J_EN_1_GIMONSHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中1",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    {
      title: "疑問詞",
      lead: "次の問いに答えなさい。",
      style: "mix",
      pick: 6,
      questions: POOL,
    },
  ],
};
