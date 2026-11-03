// 中3英語「英作文」の単元模試。問題・英文はすべてオリジナル (ドリル・教科書・過去問の文は使っていない)。
// 大問1 (B プール6問→3問)「正しい英文を選ぶ」基本15・標準17・発展18
// 大問2 (B プール4問→2問)「英文を書く・並べかえ」基本15・標準17
// 大問3 (C 固定)「意見文を書く」発展18 (自己採点)
// 1回 6問・満点100。A (生成) は使っていないので検算式はなし。英文の答えは acc() で表記ゆれ (’・カンマ・?) を受ける。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-3-eisakubun";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "意見文は「意見→理由→まとめ」の順");
const S2 = L(2, "むずかしい日本語は、やさしい日本語にしてから英語に");
const S3 = L(3, "中3の文法で、理由をくわしくする");
const S4 = L(4, "書いたら必ず見直す");

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
    ...base("because-dogs", 1),
    prompt: "「犬は人なつっこいので、私は犬が好きです。」を表す英文として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["I like dogs because they are friendly.", "I like dogs. Because they are friendly.", "I like dogs because of they are friendly.", "Because I like dogs, they are friendly."],
      correct: 0,
      why: ["because で理由の文を前の文につなぎ、1文にしている。", "Because 〜. だけの文は不完全。前の文とつなげる。", "because of のあとは名詞。文（主語＋動詞）は because で。", "「私が好きだから犬が人なつっこい」になり、理由と結果が逆。"],
      mistakeOf: [null, 0, null, null],
    },
    point: "because は前の文につないで1文に",
    steps: [{ title: "1文にする", body: "because は「〜なので」と{{前の文につなぐ}}語。I like dogs {{because}} they are friendly. と1文にします。", back: [S4] }],
  },
  {
    ...base("agree-with", 1),
    prompt: "「私はこの意見に賛成です。」を表す英文として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["I agree with this opinion.", "I agree this opinion.", "I am agree with this opinion.", "I agreeing with this opinion."],
      correct: 0,
      why: ["「（意見）に賛成する」は agree with 〜。", "with を落としている。", "agree は一般動詞。am といっしょに使わない。", "動詞の形がない。I agree にする。"],
      mistakeOf: [null, 1, null, null],
    },
    point: "「〜に賛成」は agree with 〜",
    steps: [{ title: "立場を書く表現", body: "意見文の最初に使う「〜に賛成です」は {{I agree with 〜.}}。with を落としやすいので注意。", back: [S1, S4] }],
  },
  // 標準
  {
    ...base("it-to", 2),
    prompt: "「毎日運動することは大切です。」を表す英文として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["It is important to exercise every day.", "It is important to exercising every day.", "It is important exercise every day.", "It is important for exercise every day to."],
      correct: 0,
      why: ["It is 〜 to＋動詞の原形 …（…することは〜だ）。", "It is 〜 to のあとは原形。-ing にしない。", "to がないと「〜すること」にならない。", "to の位置がおかしい。to は動詞の原形の前。"],
      mistakeOf: [null, 3, null, null],
    },
    point: "It is 〜 to＋原形",
    steps: [{ title: "It is 〜 to …", body: "「…することは〜だ」は {{It is 〜 to＋原形}}。important（大切な）のあとに {{to exercise}}。", back: [S3] }],
  },
  {
    ...base("go-there", 2),
    prompt: "「私はいつかそこへ行きたい。」を表す英文として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["I want to go there someday.", "I want to go to there someday.", "I want go there someday.", "I want to going there someday."],
      correct: 0,
      why: ["there（そこへ）は副詞なので、そのまま go there。", "there には「〜へ」がふくまれる。to はつけない。", "want のあとは to＋原形。", "to のあとは原形 go。"],
      mistakeOf: [null, 2, null, null],
    },
    point: "go there（to はつけない）",
    steps: [{ title: "見直しのポイント", body: "{{there}} は「そこへ」という副詞。{{go to there}} としていないかを見直します。", back: [S4] }],
  },
  // 発展
  {
    ...base("who-guitar", 3, "思考・判断・表現"),
    prompt: "「私には、ギターがじょうずにひける友達がいます。」を表す英文として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["I have a friend who can play the guitar well.", "I have a friend which can play the guitar well.", "I have a friend who can plays the guitar well.", "I have a friend can who play the guitar well."],
      correct: 0,
      why: ["人（a friend）を説明する関係代名詞は who。", "which は人以外（もの・動物）に使う。", "can のあとは原形 play。", "who は先行詞 a friend のすぐあとに置く。"],
    },
    point: "人を説明するのは who",
    steps: [{ title: "関係代名詞で1文に", body: "「友達がいる」＋「その友達はギターがひける」を {{who}} でつなぎます。a friend {{who can play}} the guitar well。", back: [S3] }],
  },
  {
    ...base("iikae-shy", 3, "思考・判断・表現"),
    prompt: "「私は人見知りです。」を、やさしい日本語「私は、知らない人と話すのが得意ではない」に言いかえて英語にしました。正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["I am not good at talking with people I don't know.", "I am not good at talk with people I don't know.", "I don't good at talking with people I don't know.", "I am not good to talking with people I don't know."],
      correct: 0,
      why: ["be good at 〜ing（〜するのが得意だ）の否定。at のあとは -ing。", "at のあとに動詞を置くときは -ing。", "good は形容詞。否定は am not good。", "「〜が得意」は good at。"],
    },
    point: "言いかえて、知っている形 be good at 〜ing で",
    steps: [
      { title: "言いかえる", body: "「人見知り」は「{{知らない人と話すのが得意ではない}}」と言いかえれば、知っている表現で書けます。", back: [S2] },
      { title: "形を確かめる", body: "{{be not good at}} ＋ -ing。people I don't know（私が知らない人々）。", back: [S4] },
    ],
  },
];

// ---- 大問2 英文を書く・並べかえ ----
const WRITE: QuestionB[] = [
  // 基本
  {
    ...base("order-it-fun", 1),
    prompt: "日本語に合うように、語を並べかえなさい（1語だけ使わない語があります）。\n「英語を話すことは楽しい。」",
    answer: { kind: "order", tokens: ["It", "is", "fun", "to", "speak", "English."], distractor: "speaking" },
    point: "It is 〜 to＋原形",
    steps: [{ title: "It is 〜 to …", body: "{{It is fun}}（楽しい）を先に、何が楽しいかを {{to speak}} English で続けます。to のあとは原形。", back: [S3] }],
  },
  {
    ...base("fix-there", 1),
    prompt: "次の英文にはまちがいが1か所あります。正しい英文に書き直しなさい。\nI want to go to there.",
    answer: { kind: "term", accept: acc("I want to go there."), near: [{ text: "I want to go to there.", why: "there（そこへ）は副詞。to はいりません。" }, { text: "I want go there.", why: "want のあとは to＋原形。to go は残します。" }] },
    point: "there の前に to はつけない",
    steps: [{ title: "見直す", body: "there は「{{そこへ}}」。to をつけると「〜へ」が重なります。{{go there}} にします。", back: [S4] }],
  },
  // 標準
  {
    ...base("w-because", 2, "思考・判断・表現"),
    prompt: "次の2つの文を because を使って1つの文にしなさい。\nI study English hard. I want to work abroad.",
    answer: {
      kind: "term",
      accept: acc("I study English hard because I want to work abroad.", "Because I want to work abroad, I study English hard."),
      near: [{ text: "I study English hard. Because I want to work abroad.", why: "Because 〜. だけの文にせず、前の文とつなげて1文にします。" }, { text: "I want to work abroad because I study English hard.", why: "理由は「外国で働きたい」。because は理由の文の前に置きます。" }],
    },
    point: "because は理由の文の前。1文で",
    steps: [{ title: "理由を見つけてつなぐ", body: "英語をがんばる理由は「{{外国で働きたい}}」。I study English hard {{because}} I want to work abroad.", back: [S1, S4] }],
  },
  {
    ...base("order-picture", 2),
    prompt: "日本語に合うように、語を並べかえなさい（1語だけ使わない語があります）。\n「これは私の祖父がとった写真です。」",
    answer: { kind: "order", tokens: ["This", "is", "a", "picture", "that", "my", "grandfather", "took."], distractor: "who" },
    point: "もの＋that＋主語＋動詞",
    steps: [{ title: "関係代名詞で説明する", body: "a picture（写真）を「私の祖父がとった」で説明します。ものなので {{that}}（または which）を使い、{{that my grandfather took}}。", trap: "who は人を説明するとき。写真には使わない。", back: [S3] }],
  },
];

export const J_EN_3_EISAKUBUN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中3",
  minutes: 16,
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
          id: "opinion-city",
          type: "C",
          difficulty: 3,
          points: 18,
          seconds: 300,
          skill: "思考・判断・表現",
          prompt: "Which is better for you, living in a city or living in the countryside?\n上の質問に対するあなたの考えを、理由を2つ挙げて、25語以上45語以内の英語で書きなさい。（. や , は語数に数えません）",
          answer: {
            kind: "written",
            limit: { min: 25, max: 45, unit: "語" },
            model: "I think living in the countryside is better. First, there is a lot of nature, so we can enjoy fishing and hiking. Second, it is quiet, and people there know each other well. So I want to live in the countryside.",
            alsoModels: ["I think living in a city is better. First, there are many shops and museums that I can visit easily. Second, it is easy to go anywhere by train or bus. So I want to live in a city in the future."],
            rubric: [
              { label: "最初に自分の立場（どちらがよいか）をはっきり書いている", points: 4, keywords: ["I think", "better"] },
              { label: "理由を2つ書いている（First, Second など）", points: 6, keywords: ["First", "Second"] },
              { label: "理由を具体的にしている（so・関係代名詞・It is 〜 to などで、くわしく）", points: 3, keywords: ["so", "that", "which", "to"] },
              { label: "主語と動詞・時制・3人称単数の s・複数形にまちがいがない", points: 5 },
            ],
          },
          point: "立場 → 理由2つ → まとめ。書ける英語で",
          steps: [
            { title: "立場を決める", body: "最初に {{I think 〜 is better.}} と立場をはっきり書きます。", back: [S1] },
            { title: "理由をくわしく", body: "{{First, 〜. Second, 〜.}} で理由を2つ。so や関係代名詞で1文に情報を足すと説得力が増します。", back: [S1, S3] },
            { title: "まとめて見直す", body: "最後に So, 〜. でまとめ、主語と動詞・{{時制}}・{{3人称単数の s}}・複数形を見直します。", back: [S4] },
          ],
        },
      ],
    },
  ],
};
