// 高校英語（語彙）「英熟語」の単元模試 (B: 問題プール12問からシードで6問)。問題・例文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// プール12問 (基本4・標準4・発展4)。1回に基本2・標準2・発展2 (15×2＋17×2＋18×2＝100点)。選択肢の順もシードで変わる。A (生成) は使っていないので検算式はなし。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-vocab-jukugo";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "同じ動詞でも、後ろの語で意味が変わる");
const S2 = L(2, "前置詞・副詞のコアイメージ");
const S3 = L(3, "目的語の位置：代名詞は「動詞と副詞のあいだ」");
const S4 = L(4, "1語の動詞で言いかえて覚える");
const S5 = L(5, "たとえから生まれた熟語：シェイクスピアの舞台から");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("look-for", 1),
    prompt: "I'm {{looking for}} my umbrella. Have you seen it?\nlooking for の意味として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["探している", "世話をしている", "楽しみにしている", "調べている"],
      correct: 0,
      why: ["look for 〜 ＝〜を探す。Have you seen it?（見かけた？）とも合う。", "「世話をする」は look after 〜。", "「楽しみにする」は look forward to 〜。", "「調べる」は look into 〜。"],
    },
    point: "look for ＝ 探す",
    steps: [{ title: "後ろの語で意味が決まる", body: "look（目を向ける）＋ {{for}}（〜を求めて）＝ {{探す}}。after なら世話をする、into なら調べる。", back: [S1] }],
  },
  {
    ...base("look-into", 1),
    prompt: "The school will {{look into}} the problem.\nlook into の意味として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["調べる", "見下す", "探す", "見直す"],
      correct: 0,
      why: ["into（中へ）に目を向ける → 中をのぞく → 調べる。", "「見下す」は look down on 〜。", "「探す」は look for 〜。", "into に「もう一度」の意味はない。"],
    },
    point: "look into ＝ 中をのぞく → 調べる",
    steps: [{ title: "into のイメージ", body: "{{into}} は「中へ」。問題の中をのぞきこむ → {{調べる}}。", back: [S1, S2] }],
  },
  {
    ...base("eat-up", 1),
    prompt: "The children {{ate up}} all the cookies.\nate up の up が表す意味として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["すっかり・最後まで", "上の方へ", "ふたたび", "少しだけ"],
      correct: 0,
      why: ["eat up ＝ 全部食べる。up に「すっかり・最後まで」のイメージがある。", "クッキーを上へ食べるのではない。", "up に「ふたたび」の意味はない（re- など）。", "all the cookies と合わない。"],
    },
    point: "up ＝「すっかり・最後まで」",
    steps: [{ title: "小さな語のコア", body: "up は向きだけでなく{{完了}}も表します。eat up（食べつくす）・use up（使い切る）。", back: [S2] }],
  },
  {
    ...base("pick-it-up", 1),
    prompt: "床に落ちた紙について「それを拾ってください」と言うとき、正しい英文はどれですか。",
    answer: {
      kind: "choice",
      options: ["Please pick it up.", "Please pick up it.", "Please up pick it.", "Please pick it."],
      correct: 0,
      why: ["代名詞 it は動詞と副詞のあいだに入れる。", "目的語が代名詞のとき、副詞 up のあとには置けない。", "語順がくずれている。", "up がないと「拾う」の意味にならない（pick は「選ぶ・摘む」）。"],
    },
    point: "代名詞は動詞と副詞のあいだ",
    steps: [{ title: "目的語の位置", body: "pick up the paper／pick the paper up はどちらも可。代名詞なら必ず {{pick it up}}。", trap: "pick up it は誤り。", back: [S3] }],
  },
  // ---- 標準 ----
  {
    ...base("put-off", 2),
    prompt: "We had to {{put off}} the game because of the rain.\nput off とほぼ同じ意味の1語はどれですか。",
    answer: {
      kind: "choice",
      options: ["postpone", "cancel", "continue", "start"],
      correct: 0,
      why: ["put off ＝ 延期する ＝ postpone。", "cancel は「中止する」。延期とはちがう。", "continue は「続ける」（carry on）。", "start は「始める」。"],
    },
    point: "put off ＝ postpone（延期する）",
    steps: [{ title: "1語と組で", body: "{{put off}}（会話）＝ {{postpone}}（かたい文）。予定を off（離れたところ）へ置く → 延期。", back: [S4] }],
  },
  {
    ...base("turn-down", 2),
    prompt: "She {{turned down}} the job offer.\nturned down とほぼ同じ意味の1語はどれですか。",
    answer: {
      kind: "choice",
      options: ["refused", "accepted", "decreased", "applied"],
      correct: 0,
      why: ["turn down an offer ＝ 申し出を断る ＝ refuse。", "accept は「受け入れる」で反対の意味。", "turn down は音量などを「下げる」意味もあるが、申し出には使わない。", "apply は「応募する」。"],
    },
    point: "turn down an offer ＝ refuse",
    steps: [{ title: "目的語で判断", body: "目的語が {{the job offer}}（申し出）なので「{{断る}}」＝ refuse。the volume なら「下げる」。", back: [S4] }],
  },
  {
    ...base("carry-on", 2),
    prompt: "Please {{carry on}} with your work.\ncarry on の on が表すイメージとして最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["続ける", "上に乗せる", "やめる", "始める前に"],
      correct: 0,
      why: ["on には「続ける」のイメージがある。carry on ＝ 続ける（continue）。", "on の「接触」の意味だが、この熟語には合わない。", "「やめる」は反対の意味。off に近い。", "「前に」の意味はない。"],
    },
    point: "on ＝「続ける」",
    steps: [{ title: "on のコア", body: "on は「くっついている」から{{続く}}の意味に広がります。carry on・go on ＝ {{続ける}}。", back: [S2] }],
  },
  {
    ...base("give-up", 2),
    prompt: "My father {{gave up}} smoking last year.\ngave up とほぼ同じ意味の1語はどれですか。",
    answer: {
      kind: "choice",
      options: ["quit", "started", "enjoyed", "kept"],
      correct: 0,
      why: ["give up 〜ing ＝ 〜をやめる ＝ quit。", "start は「始める」で反対の意味。", "enjoy は「楽しむ」。", "keep 〜ing は「〜し続ける」で反対の意味。"],
    },
    point: "give up ＝ quit（やめる・あきらめる）",
    steps: [{ title: "言いかえ", body: "{{give up}} 〜ing ＝ {{quit}} 〜ing（〜するのをやめる）。言いかえ問題でよく問われます。", back: [S4] }],
  },
  // ---- 発展 ----
  {
    ...base("break-the-ice", 3, "思考・判断・表現"),
    prompt: "At the first meeting, Ken told a funny story to {{break the ice}}.\nbreak the ice の意味として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["緊張した雰囲気をほぐす", "約束をやぶる", "急いで話を終える", "相手の話をさえぎる"],
      correct: 0,
      why: [
        "凍った空気（氷）を割る → 初対面のかたい雰囲気をやわらげる。",
        "「約束をやぶる」は break a promise。",
        "「急いで終える」の意味はない。",
        "「話をさえぎる」は interrupt。",
      ],
    },
    point: "イディオムは言葉がえがく「絵」で考える",
    steps: [{ title: "絵を思いうかべる", body: "初対面のかたい空気を{{氷}}にたとえ、それを割る → {{緊張をほぐす}}。funny story ともかみ合います。", back: [S5] }],
  },
  {
    ...base("look-up-to", 3),
    prompt: "Many young players {{look up to}} the captain.\nlook up to とほぼ同じ意味の1語はどれですか。",
    answer: {
      kind: "choice",
      options: ["respect", "search", "visit", "ignore"],
      correct: 0,
      why: ["下から見上げる → 尊敬する ＝ respect。反対は look down on（見下す）。", "「調べる・探す」は look up（辞書で調べる）など。to がつくと意味が変わる。", "visit の意味はない。", "ignore（無視する）は意味が合わない。"],
    },
    point: "look up to ＝ respect、反対は look down on",
    steps: [{ title: "向きのイメージ", body: "人を{{見上げる}} → 尊敬する（{{respect}}）。見下ろす look down on は「軽べつする」。", back: [S1, S4] }],
  },
  {
    ...base("put-up-with", 3),
    prompt: "I can't {{put up with}} this noise any longer.\nput up with とほぼ同じ意味の1語はどれですか。",
    answer: {
      kind: "choice",
      options: ["stand", "make", "hear", "stop"],
      correct: 0,
      why: ["put up with 〜 ＝ 〜をがまんする ＝ stand（tolerate・bear）。", "make（作る）では意味が通らない。", "hear（聞こえる）は「がまんできない」の意味にならない。", "stop（止める）は意味が異なる。"],
    },
    point: "put up with ＝ stand・bear（がまんする）",
    steps: [{ title: "1語の言いかえ", body: "{{put up with}} ＝ {{stand}}・bear・tolerate。否定文 can't 〜 で「がまんできない」とよく使います。", back: [S4] }],
  },
  {
    ...base("order-call-off", 3),
    prompt: "「雨のせいで、彼らはその試合を中止した」となるように、語句を正しい順に並べなさい。",
    answer: {
      kind: "order",
      tokens: ["They", "called", "the game", "off", "because of", "the rain."],
      alsoOk: [[0, 1, 3, 2, 4, 5]],
    },
    point: "call off ＝ 中止する。名詞の目的語はどちらの位置も可",
    steps: [
      { title: "熟語を見つける", body: "「中止する」は {{call off}}（＝ cancel）。", back: [S4] },
      { title: "目的語の位置", body: "名詞の目的語 the game は {{called the game off}} でも called off the game でも可。代名詞なら called {{it}} off だけ。", back: [S3] },
    ],
  },
];

export const H_ENG_VOCAB_JUKUGO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "語彙",
  minutes: 8,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [{ title: "英熟語の意味と使い方", lead: "次の問いに答えなさい。", style: "word", pick: 6, questions: POOL }],
};
