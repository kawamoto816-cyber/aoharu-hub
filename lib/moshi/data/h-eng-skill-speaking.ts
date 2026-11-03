// 高校英語（技能）「スピーキング（発表・やり取り）」の単元模試。問題・英文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// 画面では声を出せないので、「話すなら何と言うか」を選ぶ・並べる・書く形にしている。
// 大問1 (B プール8問→4問)「やり取り・発表の言い方」1回に基本2・標準1・発展1 (15＋15＋17＋18＝65点)
// 大問2 (C 固定)「答え＋1文で話す内容を書く」標準35点 (自己採点)。1回 5問・満点100。A (生成) は使っていないので検算式はなし。
import type { QuestionB, QuestionC, UnitMoshi } from "../types";

const U = "h-eng-skill-speaking";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "やり取りは「答え＋1文」で会話を続ける");
const S2 = L(2, "発表は「結論→理由→例→結論」の順で話す");
const S3 = L(3, "考える時間は、つなぎの言葉でかせぐ");
const S4 = L(4, "単語が出てこないときは、言いかえて説明する");
const S5 = L(5, "名演説に学ぶ：結論・3つ・くり返し");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 70, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("answer-plus-one", 1, "思考・判断・表現"),
    prompt: "What do you usually do after school? と聞かれました。会話が最も続きやすい答えはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "I usually practice the guitar. I'm in a band with my friends.",
        "Guitar.",
        "I usually do many things after school.",
        "Yes, I do.",
      ],
      correct: 0,
      why: [
        "短く答えたあとに、バンドの話という情報を1文足している。相手が次の質問をしやすい。",
        "答えにはなっているが、1語だけで会話が止まりやすい。",
        "何をするのかが伝わらず、答えになっていない。",
        "What の疑問文に Yes/No では答えない。",
      ],
    },
    point: "短く答えて、情報を1文足す",
    steps: [{ title: "答え＋1文", body: "まず {{I usually practice the guitar.}} と答え、{{理由や具体的な情報を1文}}足すと、相手が話を広げやすくなります。", back: [S1] }],
  },
  {
    ...base("let-me-see", 1),
    prompt: "答えがすぐに浮かばず、少し考える時間がほしいときに使う言葉として、最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Let me see.", "Here you are.", "That's too bad.", "Nice to meet you."],
      correct: 0,
      why: [
        "「ええと」と、考えていることを相手に伝えるつなぎの言葉。",
        "物を手わたすときの言葉。",
        "相手の残念な話への返事。",
        "初対面のあいさつ。",
      ],
    },
    point: "だまらず、つなぎの言葉で考え中を伝える",
    steps: [{ title: "つなぎの言葉", body: "{{Let me see.}}・{{Well,}}・That's a good question. などで、考えていることを伝えます。", back: [S3] }],
  },
  {
    ...base("say-again", 1),
    prompt: "相手の質問が聞きとれなかったとき、聞き返す言い方として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Sorry, could you say that again?", "No, thank you.", "I'm sorry to hear that.", "You're welcome."],
      correct: 0,
      why: [
        "「すみません、もう一度言っていただけますか」とていねいに聞き返している。",
        "すすめられたものを断るときの言葉。",
        "相手の悪い知らせを聞いたときの言葉。",
        "お礼への返事。",
      ],
    },
    point: "聞きとれなければ、だまらず聞き返す",
    steps: [{ title: "聞き返す", body: "わからないまま答えるより、{{Sorry, could you say that again?}} と聞き返すほうが会話は続きます。", back: [S3] }],
  },
  // ---- 標準 ----
  {
    ...base("paraphrase-word", 2, "思考・判断・表現"),
    prompt: "「はさみ（scissors）」という単語が出てきません。言いかえて伝える言い方として、最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "It's something you use to cut paper.",
        "It's something you use to write letters.",
        "It's a kind of paper.",
        "I don't know the word, so I can't say it.",
      ],
      correct: 0,
      why: [
        "It's something you use to 〜（〜するのに使うもの）で、はたらきを説明している。",
        "手紙を書くのに使うのはペン。はさみの説明にならない。",
        "はさみは紙の一種ではない。",
        "そこで話が止まってしまう。かんたんな語で説明すれば伝わる。",
      ],
    },
    point: "It's something you use to 〜 で説明する",
    steps: [{ title: "はたらきで説明", body: "単語が出なくても {{It's something you use to cut paper.}} のように、{{何に使うか}}を言えば伝わります。", back: [S4] }],
  },
  {
    ...base("prep-order", 2, "思考・判断・表現"),
    prompt: "「好きな季節」についての短い発表を、聞き手にわかりやすい順に並べなさい。",
    answer: {
      kind: "order",
      tokens: [
        "My favorite season is autumn.",
        "This is because the weather is cool and comfortable.",
        "For example, I enjoy long walks in the park in October.",
        "That's why I like autumn the best.",
      ],
    },
    point: "結論→理由→例→結論（PREP）",
    steps: [{ title: "PREP の順", body: "{{結論}}（My favorite season is …）→{{理由}}（This is because …）→{{例}}（For example …）→もう一度{{結論}}（That's why …）。", back: [S2] }],
  },
  {
    ...base("how-about-you", 2),
    prompt: "A: Do you like cooking?\nB: Yes. I often make curry for my family on Sundays. (　　)\n空所に入れると、会話のボールを相手に返せるものはどれですか。",
    answer: {
      kind: "choice",
      options: ["How about you?", "See you later.", "That's all.", "Yes, please."],
      correct: 0,
      why: [
        "「あなたは？」と聞き返し、相手が話す番をつくっている。",
        "別れのあいさつで、会話を終えてしまう。",
        "「以上です」で、会話を終えてしまう。",
        "すすめられたものを受けるときの返事。",
      ],
    },
    point: "最後に How about you? で聞き返す",
    steps: [{ title: "ボールを返す", body: "答え＋1文のあとに {{How about you?}} と聞き返すと、相手が話しやすくなります。", back: [S1] }],
  },
  // ---- 発展 ----
  {
    ...base("rule-of-three", 3, "思考・判断・表現"),
    prompt: "聞き手の記憶に残りやすい発表の結びとして、名演説の工夫（3つにまとめる・同じ形をくり返す）を最もよく使っているものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "Let's read more, think more, and share more.",
        "I think reading is good, and we should do it sometimes if we have time.",
        "Reading is important. Thank you.",
        "There are many reasons, but I will not talk about them today.",
      ],
      correct: 0,
      why: [
        "read more・think more・share more と、同じ形を3つ並べている。リズムがよく覚えやすい。",
        "条件がついて長く、結論がぼやけている。",
        "結論はあるが、くり返しや3つのまとまりがない。",
        "理由を言わずに終わっており、発表の結びとして弱い。",
      ],
    },
    point: "同じ形を3つ並べると、耳に残る",
    steps: [{ title: "3つ・くり返し", body: "聞き手は読み返せないので、{{3つにまとめる}}・{{同じ形をくり返す}}が記憶の手すりになります。", back: [S5] }],
  },
  {
    ...base("polite-disagree", 3, "思考・判断・表現"),
    prompt: "話し合いで、相手の意見を受けとめたうえで別の意見を言いたいとき、最も適切な言い方はどれですか。",
    answer: {
      kind: "choice",
      options: [
        "I see your point, but I think we should start earlier.",
        "You're wrong. We should start earlier.",
        "Well, I don't know.",
        "I agree with you, so we should start earlier.",
      ],
      correct: 0,
      why: [
        "I see your point（言いたいことはわかる）で受けとめてから、but で自分の意見を言っている。",
        "意見は言えているが、相手を否定する強い言い方。",
        "自分の意見が伝わらない。",
        "agree（賛成）と言いながら別の意見を言っており、つじつまが合わない。",
      ],
    },
    point: "受けとめてから but で自分の意見",
    steps: [{ title: "受けとめて、つなぐ", body: "{{I see your point, but …}} と相手の考えを認めてから意見を言うと、やり取りが続きます。", back: [S1, S3] }],
  },
];

const OPEN: QuestionC[] = [
  {
    id: "speak-free-time",
    type: "C",
    difficulty: 2,
    points: 35,
    seconds: 300,
    skill: "思考・判断・表現",
    prompt:
      "ALT の先生に Which do you like better, spending your free time alone or with friends? と聞かれました。\n「答え＋理由＋具体例」で話す内容を、25語以上40語以内の英語で書きなさい。（. や , は語数に数えません）",
    answer: {
      kind: "written",
      limit: { min: 25, max: 40, unit: "語" },
      model:
        "I like spending my free time with friends better. This is because talking with them makes me relaxed. For example, last Sunday we went to a cafe and talked for hours. How about you?",
      alsoModels: [
        "I like spending my free time alone better. That is because I can do what I want at my own pace. For example, I often read novels in my room on weekends. It makes me feel calm.",
      ],
      rubric: [
        { label: "最初に、どちらが好きかを短くはっきり答えている", points: 8, keywords: ["I like", "better"] },
        { label: "理由を1つ述べている（This is because 〜 など）", points: 9, keywords: ["because"] },
        { label: "理由を支える具体例を述べている（For example 〜 など）", points: 9, keywords: ["For example"] },
        { label: "主語と動詞・時制・三単現の s にまちがいがない", points: 9 },
      ],
    },
    point: "答え→理由→例。話すつもりで短い文を重ねる",
    steps: [
      { title: "まず答える", body: "{{I like 〜 better.}} と最初に結論を言います。質問の語句を使えば、まちがえにくい文になります。", back: [S1, S2] },
      { title: "理由と例", body: "{{This is because 〜.}} で理由、{{For example, 〜.}} で自分の体験を1つ足します。", back: [S2] },
      { title: "会話を返す", body: "語数に余裕があれば {{How about you?}} で相手に返すと、やり取りらしくなります。", back: [S1] },
    ],
  },
];

export const H_ENG_SKILL_SPEAKING_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "技能",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "やり取り・発表の言い方", lead: "話す場面を思いうかべて、次の問いに答えなさい。", style: "word", pick: 4, questions: POOL },
    { title: "話す内容を書く", lead: "声に出して話すつもりで、英語で書きなさい。", style: "writing", questions: OPEN },
  ],
};
