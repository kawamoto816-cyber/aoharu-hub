// 中2英語「受け身（be動詞＋過去分詞）」の単元模試 (B: 問題プールからシードで選ぶ)。問題はすべてオリジナル。
// 節1「文法の知識」プール12問 (基本4・標準4・発展4) から pick 4 (基本2・標準1・発展1)。
// 節2「書きかえ・並べかえ」プール6問 (基本3・標準3) から pick 2 (基本1・標準1)。
// 1回6問＝基本3・標準2・発展1。配点 基本15・標準18・発展19 で満点100 (lib/moshi/unit.ts の pickQuestions)。A の生成問題はないので検算は不要。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-2-ukemi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "受け身は「される側」が主語");
const S2 = L(2, "能動態を受け身に書きかえる3ステップ");
const S3 = L(3, "be動詞で「時」と「数」を表す");
const S4 = L(4, "否定文・疑問文は be動詞の文と同じ");
const S5 = L(5, "by を使わないとき");

const P = { 1: 15, 2: 18, 3: 19 } as const;
const T = { 1: 50, 2: 75, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const GRAMMAR: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("be-is", 1),
    prompt: "次の文の（　）に入る語として正しいものはどれですか。\nThis song (　　) loved by many young people.",
    answer: {
      kind: "choice",
      options: ["is", "are", "does", "do"],
      correct: 0,
      why: ["正しい。主語 this song は単数で今のことなので is。受け身は be動詞＋過去分詞。", "are は主語が複数のとき。this song は単数。", "受け身の文では does は使わない。be動詞を使う。", "受け身の文では do は使わない。また主語は単数。"],
    },
    point: "受け身は be動詞＋過去分詞。be動詞は主語に合わせる",
    steps: [{ title: "受け身の形", body: "「〜されている」は {{be動詞＋過去分詞}}（is loved）。主語 this song は単数なので is です。", back: [S1] }],
  },
  {
    ...base("written", 1),
    prompt: "次の文の（　）内の語を、正しい形に変えて書きなさい。\nThis letter was (　　) by my grandmother.（write）",
    answer: { kind: "term", accept: ["written"], near: [{ text: "wrote", why: "wrote は過去形です。be動詞のあとは過去分詞 written にします。" }, { text: "writed", why: "write は不規則動詞で、write - wrote - written と変化します。" }, { text: "write", why: "be動詞のあとは過去分詞にします。" }] },
    point: "write - wrote - written。be動詞のあとは過去分詞",
    steps: [{ title: "過去分詞にする", body: "受け身は be動詞のあとに {{過去分詞}}。write は不規則に変化し、過去分詞は {{written}} です。", trap: "過去形 wrote と取りちがえる。", back: [S1] }],
  },
  {
    ...base("were-kako", 1),
    prompt: "次の文の（　）に入る語として正しいものはどれですか。\nThese cookies (　　) made by my brother yesterday.",
    answer: {
      kind: "choice",
      options: ["were", "was", "are", "did"],
      correct: 0,
      why: ["正しい。主語 these cookies は複数、yesterday があるので過去。were made。", "was は主語が単数のときの過去。these cookies は複数。", "are は今のこと。yesterday があるので過去にする。", "受け身の文では did は使わない。"],
    },
    point: "受け身の「時」と「数」は be動詞で表す",
    steps: [{ title: "時と数を見る", body: "yesterday で {{過去}}、these cookies で {{複数}}。だから be動詞は were。過去分詞 made の形は変わりません。", back: [S3] }],
  },
  {
    ...base("by-him", 1),
    prompt: "次の文の（　）に入る語として正しいものはどれですか。\nThis picture was taken by (　　).",
    answer: {
      kind: "choice",
      options: ["him", "he", "his", "he's"],
      correct: 0,
      why: ["正しい。by のあとの代名詞は目的格。he の目的格は him。", "he は主格。by のあとには置かない。", "his は「彼の」（所有格）。あとに名詞が必要。", "he's は he is の短縮形。"],
    },
    point: "by のあとの代名詞は目的格（him・her・them）",
    steps: [{ title: "by のあとは目的格", body: "by のような前置詞のあとの代名詞は {{目的格}}。he → {{him}}、she → her、they → them です。", back: [S2] }],
  },
  // ---- 標準 ----
  {
    ...base("gimon-was", 2),
    prompt: "次の文の（　）に入る語として正しいものはどれですか。\n(　　) this temple built about five hundred years ago?",
    answer: {
      kind: "choice",
      options: ["Was", "Did", "Is", "Does"],
      correct: 0,
      why: ["正しい。受け身の疑問文は be動詞を主語の前に出す。ago があるので過去の Was。", "受け身の疑問文では did は使わない。", "is は今のこと。about five hundred years ago は過去。", "受け身の疑問文では does は使わない。"],
    },
    point: "受け身の疑問文は be動詞を主語の前へ。did は使わない",
    steps: [{ title: "be動詞を前に", body: "受け身の疑問文は {{be動詞を主語の前}} に出します。ago があるので過去の {{Was}}。", trap: "過去の文だからと Did を使ってしまう。", back: [S4] }],
  },
  {
    ...base("kotae-it-is", 2),
    prompt: "次の会話の（　）に入るものとして正しいものはどれですか。\nA: Is this computer used by many students?\nB: Yes, (　　).",
    answer: {
      kind: "choice",
      options: ["it is", "it does", "they are", "I am"],
      correct: 0,
      why: ["正しい。Is でたずねられたら be動詞で答える。this computer は it にする。", "受け身の疑問文には does では答えない。", "this computer は単数なので they ではなく it。", "主語は this computer。I では答えにならない。"],
    },
    point: "受け身の疑問文には be動詞で答え、主語は代名詞に",
    steps: [{ title: "be動詞で答える", body: "Is 〜? には {{Yes, it is. / No, it isn't.}}。this computer は代名詞 it に置きかえます。", back: [S4] }],
  },
  {
    ...base("spoken", 2),
    prompt: "次の文の（　）内の語を、正しい形に変えて書きなさい。\nFrench is (　　) in some parts of Canada.（speak）",
    answer: { kind: "term", accept: ["spoken"], near: [{ text: "speaked", why: "speak は不規則動詞で、speak - spoke - spoken と変化します。" }, { text: "spoke", why: "spoke は過去形です。be動詞のあとは過去分詞 spoken にします。" }] },
    point: "speak - spoke - spoken",
    steps: [{ title: "不規則動詞の過去分詞", body: "speak は {{speak - spoke - spoken}}。be動詞 is のあとなので過去分詞 spoken です。", trap: "-ed をつけて speaked としてしまう。", back: [S1] }],
  },
  {
    ...base("hitei-wasnt", 2),
    prompt: "The window was broken by Ken. を否定文にしたものとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["The window wasn't broken by Ken.", "The window didn't broken by Ken.", "The window wasn't break by Ken.", "The window didn't break by Ken."],
      correct: 0,
      why: ["正しい。受け身の否定文は be動詞のあとに not。過去分詞 broken はそのまま。", "受け身の否定文では did は使わない。", "be動詞のあとは過去分詞 broken。原形 break にはしない。", "did ＋原形にすると「窓がこわした」という意味になり、受け身ではなくなる。"],
    },
    point: "受け身の否定は be動詞のあとに not。過去分詞はそのまま",
    steps: [{ title: "be動詞に not", body: "受け身の否定文は {{was not（wasn't）＋過去分詞}}。do・does・did は使いません。", back: [S4] }],
  },
  // ---- 発展 ----
  {
    ...base("covered-with", 3),
    prompt: "次の文の（　）に入る語として正しいものはどれですか。\nThe top of the mountain is covered (　　) snow.",
    answer: {
      kind: "choice",
      options: ["with", "by", "in", "to"],
      correct: 0,
      why: ["正しい。「〜でおおわれている」は be covered with 〜 という決まった言い方。", "雪が何かを「した」のではなく、状態を表す決まった言い方なので by ではなく with。", "be covered in 〜 という言い方もあるが、中学では be covered with 〜 で覚える。ここでは with を選ぶ。", "to は be known to 〜（〜に知られている）などで使う。"],
    },
    point: "be covered with 〜＝〜でおおわれている",
    steps: [{ title: "by 以外の決まった言い方", body: "受け身でも by を使わない決まった言い方があります。be covered {{with}} 〜、be known {{to}} 〜、be interested {{in}} 〜。", back: [S5] }],
  },
  {
    ...base("known-to", 3),
    prompt: "次の文の（　）に入る語として正しいものはどれですか。\nThe old bakery is known (　　) everyone in this town.",
    answer: {
      kind: "choice",
      options: ["to", "by", "with", "at"],
      correct: 0,
      why: ["正しい。「〜に知られている」は be known to 〜。", "「〜に知られている」は by ではなく to を使う決まった言い方。", "with は be covered with 〜（〜でおおわれている）などで使う。", "at はここでは使わない。"],
    },
    point: "be known to 〜＝〜に知られている",
    steps: [{ title: "決まった言い方", body: "「〜に知られている」は {{be known to}} 〜。by ではなく to を使います。", back: [S5] }],
  },
  {
    ...base("by-shoryaku", 3, "思考・判断・表現"),
    prompt: "People speak Spanish in Mexico. を受け身の文にしたものとして、もっとも自然なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Spanish is spoken in Mexico.", "Spanish is spoken by them in Mexico.", "Spanish speaks in Mexico.", "Mexico is spoken Spanish."],
      correct: 0,
      why: ["正しい。話すのはメキシコの人々だと言わなくてもわかるので、by people は省くのが自然。", "by them は「だれが」を言わなくてもわかるときには省く。つけると不自然。", "be動詞と過去分詞がなく、「スペイン語が話す」という意味になってしまう。", "もとの文の目的語は Spanish。Mexico を主語にはできない。"],
    },
    point: "だれがしたか言わなくてもわかるとき、by 〜は省く",
    steps: [{ title: "目的語を主語に", body: "もとの文の目的語 Spanish を主語にし、{{is spoken}} とします。", back: [S2] }, { title: "by people は省く", body: "話す人はメキシコの人々だと {{言わなくてもわかる}} ので、by 〜は書きません。", back: [S5] }],
  },
  {
    ...base("ayamari", 3, "思考・判断・表現"),
    prompt: "次の文のうち、{{まちがいをふくむ}}ものはどれですか。",
    answer: {
      kind: "choice",
      options: ["That house was build in 1990.", "Was this bag made in Italy?", "These songs are sung by children.", "This castle is visited by many people."],
      correct: 0,
      why: ["まちがい。be動詞のあとは過去分詞。build の過去分詞は built なので was built。", "正しい。疑問文は be動詞 Was を主語の前に。made は make の過去分詞。", "正しい。sing - sang - sung。主語が複数なので are。", "正しい。visit の過去分詞は visited。主語が単数なので is。"],
    },
    point: "be動詞のあとは原形でなく過去分詞（build → built）",
    steps: [{ title: "be動詞のあとの形を見る", body: "受け身は {{be動詞＋過去分詞}}。build - built - built なので was {{built}} が正しい形です。", back: [S1] }, { title: "be動詞と主語も確かめる", body: "時（現在・過去）と主語の数に合った be動詞かどうかも確かめます。", back: [S3] }],
  },
];

const REWRITE: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("narabe-cleaned", 1),
    prompt: "日本文に合うように、語を並べかえなさい。使わない語が1つあります。\n「この部屋は毎日そうじされます。」",
    answer: { kind: "order", tokens: ["This", "room", "is", "cleaned", "every", "day"], distractor: "cleans" },
    point: "主語（される側）＋ be動詞 ＋ 過去分詞",
    steps: [{ title: "される側を主語に", body: "「この部屋は」が主語。そのあとに {{is cleaned}}（be動詞＋過去分詞）、every day は最後です。", back: [S1] }],
  },
  {
    ...base("kakikae-is-taught", 1),
    prompt: "次の2つの文がほぼ同じ意味になるように、（　）に入る1語を書きなさい。\nMr. Sato teaches music.\nMusic (　　) taught by Mr. Sato.",
    answer: { kind: "term", accept: ["is"], near: [{ text: "was", why: "もとの文は teaches で今のことなので、過去の was ではなく is です。" }, { text: "are", why: "主語 music は単数なので is です。" }] },
    point: "もとの文の時（現在）に合わせて be動詞を選ぶ",
    steps: [{ title: "時と数を合わせる", body: "もとの文は teaches で {{現在}}。新しい主語 music は単数なので {{is}} taught。", back: [S2, S3] }],
  },
  {
    ...base("narabe-written-by", 1),
    prompt: "日本文に合うように、語を並べかえなさい。使わない語が1つあります。\n「その手紙はユキによって書かれました。」",
    answer: { kind: "order", tokens: ["The", "letter", "was", "written", "by", "Yuki"], distractor: "wrote" },
    point: "「〜によって」は by ＋ 人を最後に",
    steps: [{ title: "by ＋ 人", body: "was written（be動詞＋過去分詞）のあとに {{by Yuki}} を置きます。wrote は過去形なので使いません。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...base("kakikae-was-opened", 2),
    prompt: "次の2つの文がほぼ同じ意味になるように、（　）に入る2語を書きなさい。\nThey opened this museum in 2015.\nThis museum (　　) (　　) in 2015.",
    answer: { kind: "term", accept: ["was opened"], near: [{ text: "is opened", why: "もとの文は opened で過去のことなので was opened です。" }, { text: "were opened", why: "主語 this museum は単数なので was です。" }, { text: "did open", why: "受け身は be動詞＋過去分詞。was opened です。" }] },
    point: "過去の文の受け身は was / were ＋ 過去分詞",
    steps: [{ title: "3ステップで書きかえ", body: "①目的語 this museum を主語に、②動詞を {{was opened}} に、③they は「人々」で言わなくてもわかるので by them は省きます。", back: [S2, S5] }],
  },
  {
    ...base("narabe-was-painted", 2),
    prompt: "日本文に合うように、語を並べかえなさい。使わない語が1つあります。\n「この絵はあなたのお姉さんによってかかれたのですか。」",
    answer: { kind: "order", tokens: ["Was", "this", "picture", "painted", "by", "your", "sister"], distractor: "Did" },
    point: "受け身の疑問文は be動詞 ＋ 主語 ＋ 過去分詞 〜?",
    steps: [{ title: "be動詞を先頭に", body: "受け身の疑問文は {{Was ＋主語＋過去分詞}}。Did は使いません。by your sister は最後です。", back: [S4] }],
  },
  {
    ...base("narabe-were-not", 2),
    prompt: "日本文に合うように、語を並べかえなさい。使わない語が1つあります。\n「これらの部屋は昨日使われませんでした。」",
    answer: { kind: "order", tokens: ["These", "rooms", "were", "not", "used", "yesterday"], distractor: "did" },
    point: "受け身の否定は be動詞 ＋ not ＋ 過去分詞",
    steps: [{ title: "be動詞のあとに not", body: "主語が複数で過去なので {{were}}。否定は were のあとに not を置き、used を続けます。did は使いません。", back: [S3, S4] }],
  },
];

export const J_EN_2_UKEMI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中2",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    { title: "受け身の文法", lead: "次の問いに答えなさい。", style: "mix", pick: 4, questions: GRAMMAR },
    { title: "書きかえ・並べかえ", lead: "次の問いに答えなさい。並べかえでは、文の最初の語は大文字で始まっています。", style: "mix", pick: 2, questions: REWRITE },
  ],
};
