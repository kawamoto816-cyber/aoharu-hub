// 中2英語「動名詞（-ing で「〜すること」）」の単元模試 (B: 問題プールからシードで6問)。問題はすべてオリジナル（例文は書き下ろし）。
// プール15問 (基本5・標準6・発展4)。1回に基本2・標準2・発展2 が出る (lib/moshi/unit.ts の pickQuestions)。選択肢の順もシードで変わる。
// A (生成) は使っていないので検算の式はない。並べかえ (order) は tokens の順がそのまま正解。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-2-domeishi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "動詞の -ing 形が「〜すること」になる");
const S2 = L(2, "動名詞だけをとる動詞、不定詞だけをとる動詞");
const S3 = L(3, "前置詞のあとの動詞は必ず -ing");
const S4 = L(4, "動名詞と進行形の -ing を見分ける");

// 配点は難易度で決める (基本15・標準17・発展18。2問ずつ出るので満点100)
const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 75, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("enjoyed-playing", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nWe enjoyed (　　) in the snow yesterday.",
    answer: {
      kind: "choice",
      options: ["playing", "to play", "play", "played"],
      correct: 0,
      why: ["正しい。enjoy のあとは動名詞だけ。", "enjoy は不定詞をとらない。", "enjoyed のあとに原形を置くことはできない。", "enjoyed と played の動詞が2つ並んでしまう。"],
    },
    point: "enjoy のあとは動名詞（-ing）だけ",
    steps: [{ title: "enjoy ＋ -ing", body: "enjoy は「すでにしていることを楽しむ」動詞で、あとは {{動名詞だけ}}。enjoyed {{playing}} で「遊ぶのを楽しんだ」。", trap: "enjoyed to play としてしまう。", back: [S2] }],
  },
  {
    ...base("finish-cleaning", 1),
    prompt: "（　）内の語を正しい形にして書きなさい（1語）。\nDid you finish (clean) your room?",
    answer: { kind: "term", accept: ["cleaning"], near: [{ text: "to clean", why: "finish は不定詞をとりません。動名詞 cleaning にします。" }] },
    point: "finish のあとは動名詞",
    steps: [{ title: "finish ＋ -ing", body: "finish（〜し終える）のあとは {{動名詞}}。clean に -ing をつけて {{cleaning}}。", back: [S2] }],
  },
  {
    ...base("thank-you-for", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nThank you for (　　) me with my homework.",
    answer: {
      kind: "choice",
      options: ["helping", "help", "to help", "helped"],
      correct: 0,
      why: ["正しい。前置詞 for のあとの動詞は動名詞。", "前置詞のあとに原形は置けない。", "前置詞のあとに不定詞は置けない。", "前置詞のあとに過去形は置けない。"],
    },
    point: "Thank you for ～ing.＝〜してくれてありがとう",
    steps: [{ title: "前置詞のあとは -ing", body: "for は前置詞。前置詞のあとに動詞を置くときは必ず {{動名詞}} なので helping。", back: [S3] }],
  },
  {
    ...base("subject-taking", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\n(　　) pictures of trains is my hobby.",
    answer: {
      kind: "choice",
      options: ["Taking", "Take", "Takes", "Took"],
      correct: 0,
      why: ["正しい。Taking pictures of trains（電車の写真をとること）が主語。", "原形で始めると命令文になり、is とつながらない。", "主語がないので Takes は置けない。", "過去形を主語にすることはできない。"],
    },
    point: "動名詞は文の主語になれる",
    steps: [{ title: "「〜すること」を主語に", body: "「電車の写真をとること」が主語。動詞を名詞のかたまりにする {{動名詞}} Taking を使います。", back: [S1] }],
  },
  {
    ...base("how-about-having", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nHow about (　　) lunch in the park?",
    answer: {
      kind: "choice",
      options: ["having", "have", "to have", "has"],
      correct: 0,
      why: ["正しい。about は前置詞なので動名詞 having。", "前置詞 about のあとに原形は置けない。", "前置詞のあとに不定詞は置けない。", "about のあとに has は置けない。"],
    },
    point: "How about ～ing?＝〜するのはどうですか",
    steps: [{ title: "about は前置詞", body: "How about のあとに動詞を続けるときは {{-ing}}。How about {{having}} lunch? で「お昼を食べるのはどう？」。", back: [S3] }],
  },
  // ---- 標準 ----
  {
    ...base("good-at-swimming", 2),
    prompt: "（　）内の語を正しい形にして書きなさい（1語）。\nMy cousin is good at (swim).",
    answer: { kind: "term", accept: ["swimming"], near: [{ text: "swiming", why: "swim は最後の m を重ねて swimming と書きます。" }, { text: "swim", why: "前置詞 at のあとは動名詞にします。" }] },
    point: "be good at ～ing。swim → swimming",
    steps: [
      { title: "at のあとは動名詞", body: "be good at ～（〜が得意）の at は前置詞なので、動詞は {{-ing}} にします。", back: [S3] },
      { title: "つづりに注意", body: "swim は短い母音＋子音で終わるので、m を重ねて {{swimming}}。", back: [S3] },
    ],
  },
  {
    ...base("watching-is", 2),
    prompt: "（　）に入る語として正しいものはどれですか。\nWatching movies with friends (　　) a lot of fun.",
    answer: {
      kind: "choice",
      options: ["is", "are", "be", "were"],
      correct: 0,
      why: ["正しい。主語は「映画を見ること」という1つのこと。", "movies や friends につられて are にしない。主語は動名詞のかたまり。", "主語のあとに原形 be は置けない。", "複数扱いではなく、過去の文でもない。"],
    },
    point: "動名詞の主語は1つのこと → is",
    steps: [{ title: "主語のかたまりを見る", body: "主語は Watching movies with friends（友だちと映画を見ること）。1つのことなので be動詞は {{is}}。", trap: "すぐ前の friends（複数）につられて are を選ぶ。", back: [S1] }],
  },
  {
    ...base("correct-verb-form", 2, "思考・判断・表現"),
    prompt: "次の文のうち、正しい英文はどれですか。",
    answer: {
      kind: "choice",
      options: ["I hope to visit Okinawa.", "I want visiting Okinawa.", "I enjoyed to visit Okinawa.", "I finished to clean the kitchen."],
      correct: 0,
      why: ["正しい。hope は不定詞だけをとる。", "want は不定詞だけ。want to visit が正しい。", "enjoy は動名詞だけ。enjoyed visiting が正しい。", "finish は動名詞だけ。finished cleaning が正しい。"],
    },
    point: "want・hope は to、enjoy・finish は -ing",
    steps: [{ title: "動詞で形が決まる", body: "これからのことに向かう {{want・hope・decide}} は不定詞、すでにしていることに目を向ける {{enjoy・finish・stop}} は動名詞をとります。", back: [S2] }],
  },
  {
    ...base("which-gerund", 2, "思考・判断・表現"),
    prompt: "次の文のうち、-ing 形が{{動名詞}}であるものはどれですか。",
    answer: {
      kind: "choice",
      options: ["My mother likes cooking.", "My mother is cooking now.", "They were running in the park.", "Is he sleeping in his room?"],
      correct: 0,
      why: ["正しい。likes の目的語で「料理すること」。動名詞。", "is ＋ -ing で「料理している」。進行形。", "were ＋ -ing で「走っていた」。進行形。", "Is ＋ he ＋ -ing で「眠っているか」。進行形の疑問文。"],
    },
    point: "be動詞＋-ing＝進行形、目的語の -ing＝動名詞",
    steps: [{ title: "-ing の場所を見る", body: "be動詞といっしょで「〜している」なら{{進行形}}。動詞 likes の目的語で「〜すること」なら{{動名詞}}です。", back: [S4] }],
  },
  {
    ...base("order-good-at", 2),
    prompt: "日本文に合うように、語を並べかえなさい。ただし、使わない語が1つあります。\n「兄は自転車をなおすのが得意です。」",
    answer: { kind: "order", tokens: ["My", "brother", "is", "good", "at", "fixing", "bikes."], distractor: "fix" },
    point: "be good at ～ing＝〜するのが得意だ",
    steps: [{ title: "前置詞 at のあと", body: "My brother is good at のあとに動詞を続けるので、動名詞 {{fixing}} を使います。原形 fix は使いません。", back: [S3] }],
  },
  {
    ...base("began-running", 2),
    prompt: "2つの文がほぼ同じ意味になるように、（　）に入る1語を書きなさい。\nKen began to run.\nKen began (　　).",
    answer: { kind: "term", accept: ["running"], near: [{ text: "runing", why: "run は n を重ねて running と書きます。" }, { text: "run", why: "began のあとは to run か running。ここは1語なので running。" }] },
    point: "begin は to ＋ 原形・-ing のどちらもとる",
    steps: [
      { title: "どちらもとる動詞", body: "begin・start・like は不定詞・動名詞のどちらもとり、意味はほぼ同じ。to run を動名詞にします。", back: [S2] },
      { title: "つづり", body: "run は n を重ねて {{running}}。", back: [S2] },
    ],
  },
  // ---- 発展 ----
  {
    ...base("both-ok", 3, "思考・判断・表現"),
    prompt: "（　）に to dance と dancing の{{どちらを入れても}}正しい文になるものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Yuki started (　　) when she was six.", "Yuki enjoys (　　) with her friends.", "Yuki wants (　　) on the big stage.", "Yuki is good at (　　)."],
      correct: 0,
      why: ["正しい。start は不定詞・動名詞のどちらもとる。", "enjoy は動名詞だけ。to dance は入らない。", "want は不定詞だけ。dancing は入らない。", "前置詞 at のあとは動名詞だけ。to dance は入らない。"],
    },
    point: "start・begin・like は to も -ing もOK",
    steps: [
      { title: "動詞ごとに確かめる", body: "enjoy は -ing だけ、want は to だけ、at（前置詞）のあとは -ing だけ。{{start}} はどちらもとります。", back: [S2, S3] },
    ],
  },
  {
    ...base("hobby-is-making", 3, "思考・判断・表現"),
    prompt: "次の英文の意味として正しいものはどれですか。\nHer hobby is making cakes.",
    answer: {
      kind: "choice",
      options: ["彼女の趣味はケーキを作ることです。", "彼女の趣味はケーキを作っています。", "彼女の趣味のためにケーキを作っています。", "彼女はケーキを作って趣味にしました。"],
      correct: 0,
      why: ["正しい。is のあとの making cakes は「ケーキを作ること」で、主語 Her hobby の中身を表す動名詞（補語）。", "形は is ＋ -ing だが、「趣味が作っている」では意味が通らない。進行形ではない。", "「〜のために」の意味の語はない。", "made（過去）の文ではなく、「〜して」の意味もない。"],
    },
    point: "be動詞のあとの -ing でも「〜すること」の場合がある",
    steps: [
      { title: "主語との関係を見る", body: "主語は Her hobby（彼女の趣味）。趣味が「作っている」のは変なので、進行形ではありません。", back: [S4] },
      { title: "補語の動名詞", body: "making cakes は「ケーキを作ること」で、趣味＝ケーキ作り、という {{補語}} の動名詞です。", back: [S1, S4] },
    ],
  },
  {
    ...base("sorry-for-being", 3),
    prompt: "（　）に入る語として正しいものはどれですか。\nI'm sorry for (　　) late this morning.",
    answer: {
      kind: "choice",
      options: ["being", "be", "to be", "am"],
      correct: 0,
      why: ["正しい。前置詞 for のあとなので、be動詞も動名詞 being にする。", "前置詞のあとに原形は置けない。", "前置詞のあとに不定詞は置けない。", "for のあとに am は置けない。"],
    },
    point: "be動詞も前置詞のあとは being",
    steps: [{ title: "be の動名詞", body: "for は前置詞なので動名詞にします。be動詞の -ing 形は {{being}}。I'm sorry for being late. で「遅れてごめんなさい」。", back: [S3] }],
  },
  {
    ...base("order-before-going", 3),
    prompt: "日本文に合うように、語を並べかえなさい。ただし、使わない語が1つあります。\n「寝る前に歯をみがきなさい。」",
    answer: { kind: "order", tokens: ["Brush", "your", "teeth", "before", "going", "to", "bed."], distractor: "go" },
    point: "前置詞 before のあとの動詞は -ing",
    steps: [
      { title: "命令文から", body: "「歯をみがきなさい」は Brush your teeth。", back: [S3] },
      { title: "before ＋ -ing", body: "「寝る前に」の before は、ここでは前置詞。あとの動詞は動名詞 {{going}} to bed にします。", back: [S3] },
    ],
  },
];

export const J_EN_2_DOMEISHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中2",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "動名詞（動詞の -ing 形）",
      lead: "次の問いに答えなさい。",
      style: "mix",
      pick: 6,
      questions: POOL,
    },
  ],
};
