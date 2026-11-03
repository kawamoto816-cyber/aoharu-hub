// 高校英語（技能）「自由英作文」の単元模試。問題・英文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// 大問1 (B プール8問→4問)「型と英文を選ぶ」1回に基本2・標準1・発展1 (15＋15＋17＋18＝65点)
// 大問2 (C 固定)「意見文を書く」60〜80語・発展35点 (模範解答と採点観点で自己採点)。1回 5問・満点100。A (生成) は使っていないので検算式はなし。
// 模範解答の語数は手で数えた (本文 68語・別解 68語)。
import type { QuestionB, QuestionC, UnitMoshi } from "../types";

const U = "h-eng-skill-jiyu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "型は「主張→理由→具体例→まとめ」");
const S2 = L(2, "立場は「本音」より「書きやすさ」で選ぶ");
const S3 = L(3, "語数は、理由と具体例に多くふり分ける");
const S4 = L(4, "難しい表現より、まちがえない英文で書く");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 75, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "思考・判断・表現") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const TOPIC = "Should high school students have part-time jobs?";

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("opening", 1),
    prompt: `次のテーマで意見文を書きます。最初の1文として最も適切なものはどれですか。\nテーマ：${TOPIC}`,
    answer: {
      kind: "choice",
      options: [
        "I think high school students should have part-time jobs.",
        "There are many kinds of part-time jobs in Japan.",
        "Some people say yes, and other people say no.",
        "My brother had a part-time job when he was a student.",
      ],
      correct: 0,
      why: [
        "賛成の立場（主張）を最初の1文ではっきり書いている。",
        "アルバイトの種類の話で、賛成か反対かがわからない。",
        "両方の意見を紹介するだけで、自分の立場がない。",
        "具体例のような文で、最初に置くと主張がわからない。",
      ],
    },
    point: "1文目で賛成か反対かをはっきり書く",
    steps: [{ title: "主張から", body: "最初の1文で{{賛成か反対か}}を書きます。読む人は1文目で結論がわかり、安心して先を読めます。", back: [S1] }],
  },
  {
    ...base("for-example", 1, "知識・技能"),
    prompt: "理由のあとに具体例を続けるとき、文の始めに置く語句として最も適切なものはどれですか。\nWorking part-time teaches students the value of money. (　　), they learn how hard it is to earn 1,000 yen.",
    answer: {
      kind: "choice",
      options: ["For example", "However", "In conclusion", "First"],
      correct: 0,
      why: [
        "前の理由（お金の大切さ）を、1,000円かせぐ大変さという具体例で支えている。",
        "However は前と反対の内容を続けるときに使う。",
        "In conclusion は最後のまとめに使う。",
        "First は1つ目の理由を出すときに使う。ここは例。",
      ],
    },
    point: "具体例の前は For example",
    steps: [{ title: "つなぎの言葉", body: "{{First / Second}} で理由、{{For example}} で具体例、{{In conclusion}} でまとめ。役目に合う語を選びます。", back: [S1] }],
  },
  {
    ...base("structure-order", 1),
    prompt: "次の英文を、意見文の型に合う順に並べなさい。\nテーマ：Should students read a newspaper every day?",
    answer: {
      kind: "order",
      tokens: [
        "I think students should read a newspaper every day.",
        "First, they can learn what is happening in the world.",
        "For example, they can find out about elections and new technology.",
        "For this reason, reading a newspaper is good for students.",
      ],
    },
    point: "主張→理由→具体例→まとめ",
    steps: [{ title: "型にあてはめる", body: "{{主張}}（I think …）→{{理由}}（First, …）→{{具体例}}（For example, …）→{{まとめ}}（For this reason, …）。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...base("off-topic", 2),
    prompt:
      "次の段落の中で、主張を支えていない（話がずれている）文はどれですか。\n(1) I think students should study abroad. (2) First, they can improve their English by using it every day. (3) Many foreign students visit Kyoto every year. (4) For example, they have to ask questions in English at stores and at school.",
    answer: {
      kind: "choice",
      options: ["(3)", "(1)", "(2)", "(4)"],
      correct: 0,
      why: [
        "外国人の学生が京都を訪れる話で、「留学すべき」という主張の理由にも例にもなっていない。",
        "(1) は主張。段落の中心。",
        "(2) は理由「英語が上達する」。主張を支えている。",
        "(4) は (2) の具体例。主張を支えている。",
      ],
    },
    point: "1文ずつ「主張を支えるか」を確かめる",
    steps: [
      { title: "主張を確認", body: "主張は {{students should study abroad}}（留学すべき）。", back: [S1] },
      { title: "1文ずつ照らす", body: "理由・具体例は主張を支えるもの。(3) は日本に来る学生の話で、{{留学する理由になっていない}}。", back: [S1, S4] },
    ],
  },
  {
    ...base("word-budget", 2, "知識・技能"),
    prompt: "80語程度で、理由2つの意見文を書きます。語数の配分として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "主張 約10語・理由と具体例 約60語・まとめ 約10語",
        "主張 約40語・理由と具体例 約30語・まとめ 約10語",
        "主張 約10語・理由と具体例 約20語・まとめ 約50語",
        "主張・理由・具体例・まとめを、どれも約20語ずつ",
      ],
      correct: 0,
      why: [
        "主張とまとめは1文ずつで十分。残りの約60語を理由2つとその例に使う。",
        "主張が長すぎる。理由と例が少なく、説得力が弱くなる。",
        "まとめが長すぎる。くり返しが多くなる。",
        "主張とまとめに語数を使いすぎ、理由・例が足りない。",
      ],
    },
    point: "語数は理由と具体例に多くふり分ける",
    steps: [{ title: "配分", body: "主張・まとめは{{1文（10語前後）}}ずつ。残り{{約60語}}を2つの理由と具体例に使います。", back: [S3] }],
  },
  {
    ...base("specific-example", 2),
    prompt: "理由「Smartphones help students study.」を支える具体例として、最も説得力があるものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "For example, I use a dictionary app to check new English words on the train.",
        "For example, smartphones are very popular in Japan.",
        "For example, some smartphones are expensive.",
        "For example, I like my smartphone very much.",
      ],
      correct: 0,
      why: [
        "「勉強に役立つ」を、電車で辞書アプリを使うという具体的な場面で示している。",
        "人気があることは「勉強に役立つ」の例にならない。",
        "値段の話で、理由と関係がない（むしろ反対の立場の材料）。",
        "好きかどうかで、勉強に役立つことを示していない。",
      ],
    },
    point: "例は、理由を「場面」で見せるもの",
    steps: [{ title: "理由と例をつなぐ", body: "具体例は理由の{{証拠}}。いつ・どこで・何をしたかが見える文にすると説得力が増します。", back: [S1, S3] }],
  },
  // ---- 発展 ----
  {
    ...base("conclusion-match", 3),
    prompt:
      "意見文の最初の1文が I disagree that school uniforms should be abolished. のとき、最後のまとめの文として最も適切なものはどれですか。（abolish：廃止する）",
    answer: {
      kind: "choice",
      options: [
        "For these reasons, I believe schools should keep their uniforms.",
        "For these reasons, I believe students should be free to wear any clothes.",
        "For these reasons, uniforms are expensive for many families.",
        "For these reasons, I have never worn a school uniform.",
      ],
      correct: 0,
      why: [
        "「廃止に反対」＝「制服を残すべき」。最初と同じ立場を、言いかえてまとめている。",
        "自由な服装に賛成で、最初の立場（廃止に反対）と逆になっている。",
        "制服が高いという話は、廃止に賛成する側の材料。まとめになっていない。",
        "自分の体験で、立場のまとめになっていない。",
      ],
    },
    point: "最初と最後の文は、同じ立場を言いかえる",
    steps: [
      { title: "立場を読みとる", body: "I {{disagree}} that uniforms should be abolished ＝ 廃止に反対 ＝ {{制服を残すべき}}。", back: [S1] },
      { title: "まとめは同じ立場で", body: "書き終えたら、最初の1文と最後の1文が{{同じ立場}}か確かめます。否定の向きに注意。", trap: "disagree の否定を読み落とすと、逆の立場のまとめを選んでしまう。", back: [S4] },
    ],
  },
  {
    ...base("safe-english", 3, "知識・技能"),
    prompt: "次のうち、文法・語法のまちがいがない英文はどれですか。",
    answer: {
      kind: "choice",
      options: [
        "Many students enjoy talking with their friends after school.",
        "Many student enjoys talking with their friends after school.",
        "Many students enjoy to talk with their friends after school.",
        "Many students are enjoy talking with their friends after school.",
      ],
      correct: 0,
      why: [
        "many＋複数形 students、enjoy＋〜ing で正しい。",
        "many のあとは複数形 students。主語が複数なので enjoys の s も不要。",
        "enjoy のあとは動名詞（talking）。不定詞 to talk は使わない。",
        "are と enjoy の動詞が2つ並んでいる。",
      ],
    },
    point: "複数形・三単現・動詞の形をまず見直す",
    steps: [{ title: "ミスの出やすい点", body: "{{名詞の複数形}}、主語に合わせた{{三単現の s}}、enjoy＋{{〜ing}} など動詞のあとの形を確かめます。", back: [S4] }],
  },
];

const ESSAY: QuestionC[] = [
  {
    id: "essay-online",
    type: "C",
    difficulty: 3,
    points: 35,
    seconds: 600,
    skill: "思考・判断・表現",
    prompt:
      "Some people say that high school students should take some classes online at home instead of going to school every day. Do you agree or disagree?\nあなたの考えを、理由を2つ挙げて、60語以上80語以内の英語で書きなさい。（. や , は語数に数えません）",
    answer: {
      kind: "written",
      limit: { min: 60, max: 80, unit: "語" },
      model:
        "I disagree that high school students should take classes online at home. First, students can ask questions easily at school. For example, when I do not understand a math problem, I can ask my teacher right after class. Second, school is a place to make friends. We talk with classmates and learn to work in groups. For these reasons, I believe students should go to school every day.",
      alsoModels: [
        "I agree that high school students should take some classes online at home. First, they can save time. For example, a student who lives far from school can use two hours for studying instead of riding a train. Second, they can watch lessons again. If they miss a point, they can play the video and check it. For these reasons, I think online classes are useful for students.",
      ],
      rubric: [
        { label: "最初の1文で賛成か反対か（主張）をはっきり書いている", points: 7, keywords: ["I agree", "I disagree"] },
        { label: "理由を2つ書いている（First, Second など）", points: 10, keywords: ["First", "Second"] },
        { label: "理由を支える具体例・説明がある（For example など）", points: 8, keywords: ["For example"] },
        { label: "最後に、最初と同じ立場でまとめている", points: 4, keywords: ["For these reasons"] },
        { label: "主語と動詞・時制・三単現の s・複数形にまちがいがない", points: 6 },
      ],
    },
    point: "主張→理由2つ＋例→まとめ。書ける英語で",
    steps: [
      { title: "立場とメモ", body: "書きやすい立場を選び、日本語で{{理由2つ}}と{{それぞれの例}}をメモしてから英語にします。", back: [S2] },
      { title: "型どおりに書く", body: "{{I agree / disagree that 〜.}} → First … For example … → Second … → {{For these reasons, 〜.}}", back: [S1, S3] },
      { title: "見直す", body: "最初と最後の{{立場が同じ}}か、複数形・三単現の s・時制にミスがないかを確かめます。", back: [S4] },
    ],
  },
];

export const H_ENG_SKILL_JIYU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "技能",
  minutes: 15,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "型と英文を選ぶ", lead: "意見文を書く場面を考えて、次の問いに答えなさい。", style: "word", pick: 4, questions: POOL },
    { title: "意見文を書く", lead: "次の問いについて、英語で意見文を書きなさい。", style: "writing", questions: ESSAY },
  ],
};
