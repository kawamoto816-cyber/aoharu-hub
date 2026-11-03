// 中2英語「英作文」の単元模試。問題・英文はすべてオリジナル (ドリル・教科書・過去問の文は使っていない)。
// 大問1 (B プール6問→3問)「正しい英文を選ぶ」基本15・標準17・発展18
// 大問2 (B プール4問→2問)「英文を書く・並べかえ」基本15・標準17
// 大問3 (C 固定)「意見文を書く」発展18 (自己採点)
// 1回 6問・満点100。A (生成) は使っていないので検算式はなし。英文の答えは acc() で表記ゆれ (’・カンマ・?) を受ける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-2-eisakubun";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "長い文は2つに分けて、接続詞でつなぐ");
const S2 = L(2, "「〜するために」「〜すること」は to＋動詞の原形");
const S3 = L(3, "意見文は「意見 → 理由2つ → まとめ」の型");
const S4 = L(4, "書けない語は、やさしい日本語に言いかえる");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 75, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

/** 英文の答えの表記ゆれ: 末尾の ? なし・カンマなし・’ (スマホのアポストロフィ) */
function acc(...xs: string[]): string[] {
  const out = new Set<string>();
  for (const x of xs) for (const y of [x, x.replace(/\?$/, ""), x.replace(/,/g, "")]) for (const z of [y, y.replace(/'/g, "’")]) out.add(z);
  return [...out];
}

// ---- 大問1 正しい英文を選ぶ ----
const SELECT: QuestionB[] = [
  // 基本
  {
    ...base("if-sunny", 1),
    prompt: "「明日晴れたら、公園へ行きましょう。」を表す英文として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["If it is sunny tomorrow, let's go to the park.", "If it will be sunny tomorrow, let's go to the park.", "If it was sunny tomorrow, let's go to the park.", "It is sunny tomorrow if, let's go to the park."],
      correct: 0,
      why: ["if のあとは、未来のことでも現在形 is。", "if のあとに will は使わない。", "明日のことなので過去形 was は合わない。", "if は「晴れたら」の文の頭に置く。"],
      mistakeOf: [null, 0, null, null],
    },
    point: "if のあとは未来でも現在形",
    steps: [
      { title: "2つに分ける", body: "「晴れる」と「公園へ行こう」に分け、{{if}} でつなぎます。", back: [S1] },
      { title: "if の中の時", body: "明日のことでも、if のあとは{{現在形}}。If it {{is}} sunny tomorrow, …", back: [S1] },
    ],
  },
  {
    ...base("to-study", 1),
    prompt: "「私は英語を勉強するために図書館へ行きました。」を表す英文として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["I went to the library to study English.", "I went to the library to studied English.", "I went to the library for study English.", "I went to the library to studies English."],
      correct: 0,
      why: ["「〜するために」は to＋動詞の原形。", "過去の文でも、to のあとは原形。", "「〜するために」は for ではなく to＋原形。", "to のあとに -es はつけない。"],
      mistakeOf: [null, 1, null, null],
    },
    point: "「〜するために」は to＋原形",
    steps: [{ title: "目的を表す to", body: "「勉強するために」は {{to study}}。文が過去でも、to のあとは{{いつも原形}}です。", back: [S2] }],
  },
  // 標準
  {
    ...base("because-1bun", 2),
    prompt: "「暑かったので、私は窓を開けました。」を表す英文として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["I opened the window because it was hot.", "I opened the window. Because it was hot.", "Because I opened the window, it was hot.", "I opened the window, so it was hot."],
      correct: 0,
      why: ["because（〜なので）で理由の文を前の文につないでいる。", "because だけの文にしない。前の文とつなげて1文にする。", "「窓を開けたので暑かった」になり、理由と結果が逆。", "「窓を開けた。だから暑かった」になり、理由と結果が逆。"],
      mistakeOf: [null, 2, null, null],
    },
    point: "because は理由の前。1文につなぐ",
    steps: [
      { title: "理由はどちらか", body: "理由は「{{暑かった}}」、結果は「窓を開けた」。because は{{理由}}の文の前に置きます。", back: [S1] },
      { title: "1文にする", body: "Because 〜. だけで文を終えず、I opened the window {{because}} it was hot. と1文にします。", back: [S1] },
    ],
  },
  {
    ...base("when-comes", 2),
    prompt: "「父が帰ってきたら、私たちはいっしょに夕食を食べます。」を表す英文として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["When my father comes home, we will have dinner together.", "When my father will come home, we will have dinner together.", "When my father came home, we will have dinner together.", "When my father come home, we will have dinner together."],
      correct: 0,
      why: ["when のあとは、未来のことでも現在形。主語が3人称単数なので comes。", "when のあとに will は使わない。", "これからのことなので過去形 came は合わない。", "主語 my father は3人称単数。comes にする。"],
    },
    point: "when のあとも、未来は現在形で",
    steps: [{ title: "when の中の時と形", body: "if と同じく、when のあとは未来でも{{現在形}}。主語 my father に合わせて {{comes}} です。", back: [S1] }],
  },
  // 発展
  {
    ...base("iikae-trip", 3, "思考・判断・表現"),
    prompt: "「先週の旅行は、すごく満喫しました。」を、やさしい日本語「先週の旅行をとても楽しんだ」に言いかえて英語にしました。正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["I really enjoyed my trip last week.", "I really enjoy my trip last week.", "I was really enjoyed my trip last week.", "I really enjoyed to my trip last week."],
      correct: 0,
      why: ["「楽しんだ」＝ enjoyed。先週のことなので過去形。", "last week（先週）の話なので、過去形 enjoyed にする。", "enjoy は一般動詞。was と並べない。", "enjoy のすぐあとに「何を」を続ける。to はいらない。"],
    },
    point: "むずかしい語は言いかえ、時と形を見直す",
    steps: [
      { title: "言いかえる", body: "「満喫した」は「{{とても楽しんだ}}」と言いかえれば、知っている {{enjoy}} で書けます。", back: [S4] },
      { title: "見直し", body: "先週のことなので過去形 {{enjoyed}}。be動詞をつけていないか、to をはさんでいないかも確かめます。", back: [S4] },
    ],
  },
  {
    ...base("dream-to-be", 3, "思考・判断・表現"),
    prompt: "「私の夢は、医者になることです。」を表す英文として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["My dream is to be a doctor.", "My dream is to a doctor.", "My dream is be a doctor.", "My dream is to being a doctor."],
      correct: 0,
      why: ["「〜になること」は to be 〜。", "to のあとに動詞がない。「なる」の be が要る。", "to がないと「〜すること」にならない。", "to のあとは原形 be。being にしない。"],
    },
    point: "「〜すること」も to＋原形",
    steps: [{ title: "名詞のはたらきの to", body: "「医者に{{なること}}」は {{to be}} a doctor。to のあとは{{原形}}です。", back: [S2] }],
  },
];

// ---- 大問2 英文を書く・並べかえ ----
const WRITE: QuestionB[] = [
  // 基本
  {
    ...base("order-if", 1),
    prompt: "日本語に合うように、語を並べかえなさい（1語だけ使わない語があります）。\n「もし明日雨が降ったら、私は家にいます。」",
    answer: { kind: "order", tokens: ["If", "it", "rains", "tomorrow,", "I", "will", "stay", "home."], distractor: "rained" },
    point: "If＋現在形, 主語＋will＋原形",
    steps: [{ title: "if の文と、もう1つの文", body: "「雨が降る」は if のあとなので現在形 {{rains}}。「家にいる」はこれからのことなので {{will stay}}。", back: [S1] }],
  },
  {
    ...base("w-to-meet", 1),
    prompt: "「私は友達に会うために駅へ行きました。」を英文で書きなさい。",
    answer: {
      kind: "term",
      accept: acc("I went to the station to meet my friend.", "I went to the station to see my friend.", "I went to the station to meet my friends.", "I went to the station to see my friends."),
      near: [{ text: "I went to the station to met my friend.", why: "to のあとは原形 meet にします。" }, { text: "I went to the station for meet my friend.", why: "「〜するために」は to＋原形。for ではありません。" }],
    },
    point: "「〜するために」は to＋原形",
    steps: [
      { title: "文の骨組み", body: "まず「私は駅へ行った」＝ {{I went to the station}}。", back: [S1] },
      { title: "目的を足す", body: "「友達に会うために」は {{to meet}} my friend を最後に足します。", back: [S2] },
    ],
  },
  // 標準
  {
    ...base("w-because", 2, "思考・判断・表現"),
    prompt: "次の2つの文を because を使って1つの文にしなさい。\nI stayed home. I had a cold.",
    answer: {
      kind: "term",
      accept: acc("I stayed home because I had a cold.", "Because I had a cold, I stayed home."),
      near: [{ text: "I stayed home. Because I had a cold.", why: "because だけの文にせず、前の文とつなげて1文にします。" }, { text: "I had a cold because I stayed home.", why: "理由は「かぜをひいていた」。because は理由の文の前に置きます。" }],
    },
    point: "because は理由の文の前",
    steps: [{ title: "理由を見つける", body: "家にいた理由は「{{かぜをひいていた}}」。because を I had a cold の前に置き、I stayed home {{because}} I had a cold. とします。", back: [S1] }],
  },
  {
    ...base("w-if-is", 2),
    prompt: "（　）内の語を正しい形にかえて書きなさい。\nIf it (be) sunny next Sunday, we will play soccer.",
    answer: { kind: "term", accept: ["is"], near: [{ text: "will be", why: "if のあとは、未来のことでも現在形を使います。" }, { text: "was", why: "次の日曜日（これから）のことです。if のあとは現在形 is。" }, { text: "be", why: "主語 it に合わせた現在形 is にします。" }] },
    point: "if のあとは未来でも現在形",
    steps: [{ title: "if の中の時", body: "next Sunday は未来ですが、{{if}} のあとは{{現在形}}。主語 it なので {{is}}。", back: [S1] }],
  },
];

export const J_EN_2_EISAKUBUN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中2",
  minutes: 15,
  review: { status: "draft" },
  sections: [
    { title: "正しい英文を選ぶ", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: SELECT },
    { title: "英文を書く・並べかえ", lead: "次の問いに答えなさい。英文は最初の文字を大文字にし、最後に . や ? をつけなさい。", style: "writing", pick: 2, questions: WRITE },
    {
      title: "意見文を書く",
      lead: "次の質問に、英語で答えなさい。",
      style: "writing",
      questions: [
        {
          id: "opinion-season",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 240,
          skill: "思考・判断・表現",
          prompt: "Which do you like better, summer or winter?\n上の質問に対するあなたの考えを、理由を2つ挙げて、20語以上40語以内の英語で書きなさい。（. や , は語数に数えません）",
          answer: {
            kind: "written",
            limit: { min: 20, max: 40, unit: "語" },
            model: "I like summer better. First, I can swim in the sea. Second, summer vacation is long, so I can visit my grandparents. So summer is my favorite season.",
            alsoModels: ["I like winter better. First, I can enjoy skiing with my family. Second, I like hot food like nabe. It makes me happy. So I like winter better than summer."],
            rubric: [
              { label: "最初に意見（どちらが好きか）をはっきり書いている", points: 4, keywords: ["I like", "better"] },
              { label: "理由を2つ書いている（First, Second など）", points: 6, keywords: ["First", "Second"] },
              { label: "最後にまとめの文がある", points: 3, keywords: ["So"] },
              { label: "主語と動詞の形・時・つづりにまちがいがない", points: 5 },
            ],
          },
          point: "意見 → 理由2つ → まとめ の型で書く",
          steps: [
            { title: "意見を言い切る", body: "最初に {{I like 〜 better.}} と、どちらが好きかをはっきり書きます。", back: [S3] },
            { title: "理由を2つ", body: "{{First, 〜. Second, 〜.}} で理由を2つ。書けない語は、やさしい日本語に言いかえて知っている語で書きます。", back: [S3, S4] },
            { title: "まとめと見直し", body: "最後に {{So, 〜.}} でまとめ、主語と動詞の形・時・つづりを見直します。", back: [S3, S4] },
          ],
        },
      ],
    },
  ],
};
