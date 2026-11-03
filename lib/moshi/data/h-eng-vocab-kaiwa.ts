// 高校英語（語彙）「会話表現」の単元模試 (B: 問題プール12問からシードで6問)。問題・会話文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// プール12問 (基本4・標準4・発展4)。1回に基本2・標準2・発展2 (15×2＋17×2＋18×2＝100点)。選択肢の順もシードで変わる。A (生成) は使っていないので検算式はなし。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-vocab-kaiwa";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "頼み方には、ていねいさの段階がある");
const S2 = L(2, "Do you mind 〜? には No で「いいですよ」");
const S3 = L(3, "はたらきごとに「言い方」と「返し方」を組にする");
const S4 = L(4, "会話文の空所は「前と後ろ」の両方から決める");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("mind-ok", 1),
    prompt: "A: Do you mind if I open the window?\nB: (　　) It's hot in here.\n「どうぞ」と OK するとき、空所に入る最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["No, not at all.", "Yes, I do.", "Yes, I mind.", "No, you can't."],
      correct: 0,
      why: [
        "mind は「いやだと思う」。No（いやではない）で OK になる。It's hot とも合う。",
        "「はい、いやです」となり、断ることになる。",
        "「いやです」の意味で、断ることになる。",
        "「だめです」と断っている。",
      ],
    },
    point: "Do you mind 〜? に OK するなら No",
    steps: [{ title: "mind の意味", body: "Do you mind if I 〜? は「私が〜したら、{{いやですか}}」。OK なら {{No, not at all.}}（いやではない）。", back: [S2] }],
  },
  {
    ...base("why-dont-we", 1),
    prompt: "A: Why don't we go to the new aquarium this Saturday?\nB: (　　)",
    answer: {
      kind: "choice",
      options: ["That sounds great.", "Because it's Saturday.", "No, we don't.", "You're welcome."],
      correct: 0,
      why: [
        "Why don't we 〜? は「〜しませんか」という提案。That sounds great. で賛成している。",
        "理由をたずねる質問だと思いこんだまちがい。",
        "提案に対する返事にならない。",
        "お礼への返事。",
      ],
    },
    point: "Why don't we 〜? ＝ 〜しませんか（提案）",
    steps: [{ title: "はたらきを見る", body: "{{Why don't we 〜?}} は理由をきく質問ではなく{{提案}}。返し方は That sounds great. / Sure. など。", back: [S3] }],
  },
  {
    ...base("thanks-reply", 1),
    prompt: "A: Thank you for helping me with my homework.\nB: (　　)",
    answer: {
      kind: "choice",
      options: ["My pleasure.", "Thank you.", "That's too bad.", "Here you are."],
      correct: 0,
      why: ["お礼への返事「どういたしまして（喜んで）」。", "お礼にお礼で返している。", "残念な話への返事。", "物を手わたすときの言葉。"],
    },
    point: "お礼には My pleasure. / You're welcome.",
    steps: [{ title: "言い方と返し方を組で", body: "Thank you for 〜. には {{My pleasure.}}・You're welcome.・No problem. で返します。", back: [S3] }],
  },
  {
    ...base("most-polite", 1),
    prompt: "初めて会った年上の人に窓を開けてもらうとき、最もていねいな頼み方はどれですか。",
    answer: {
      kind: "choice",
      options: ["Would you mind opening the window?", "Open the window.", "Can you open the window?", "Open the window, OK?"],
      correct: 0,
      why: ["Would you mind 〜ing? はいちばんひかえめでていねい。", "命令文は強く聞こえる。", "Can you 〜? は気軽な頼み方。", "命令文に OK? をつけても、ていねいにはならない。"],
    },
    point: "Can you＜Could you＜Would you mind の順にていねい",
    steps: [{ title: "ていねいさの段階", body: "命令文＜Can you 〜?＜Could you 〜?＜{{Would you mind 〜ing?}}。目上の人にはていねいな形を選びます。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...base("lost-ticket", 2, "思考・判断・表現"),
    prompt: "A: Oh no, I can't find my train ticket.\nB: (　　)\nA: Good idea. I'll go and ask there.",
    answer: {
      kind: "choice",
      options: [
        "Why don't you ask at the lost and found?",
        "I'm sorry to hear that.",
        "You should buy a new bag.",
        "I don't need a ticket today.",
      ],
      correct: 0,
      why: [
        "遺失物取扱所で聞くことを提案し、後ろの Good idea. I'll go and ask there. とかみ合う。",
        "前には合うが、後ろの Good idea（提案への返事）と ask there（そこで聞く）につながらない。",
        "新しいかばんの話は前ともかみ合わない。",
        "B の切符の話で、A の提案への返事につながらない。",
      ],
    },
    point: "空所の後ろの発話とかみ合うかを確かめる",
    steps: [
      { title: "前を見る", body: "A は切符をなくして困っている。", back: [S4] },
      { title: "後ろを見る", body: "後ろの {{Good idea}}（提案への返事）と {{ask there}}（場所）から、場所をふくむ{{提案}}が入ります。", back: [S4] },
    ],
  },
  {
    ...base("take-message", 2),
    prompt: "（電話で）\nA: Hello. May I speak to Mr. Sato?\nB: I'm sorry, he's out right now. (　　)\nA: Yes, please tell him that Emi called.",
    answer: {
      kind: "choice",
      options: ["Can I take a message?", "Who's speaking?", "Hold on, please.", "You have the wrong number."],
      correct: 0,
      why: [
        "伝言をうけたまわる申し出。後ろの Yes, please tell him … とかみ合う。",
        "名前をきく質問だが、後ろの Yes, please … とかみ合わない。",
        "「お待ちください」は本人がいるときの言葉。he's out と合わない。",
        "まちがい電話ではない（佐藤さんはいるが外出中）。",
      ],
    },
    point: "電話で不在なら Can I take a message?",
    steps: [{ title: "前と後ろ", body: "前は{{外出中}}、後ろは {{Yes, please tell him …}}（伝えてください）。伝言の申し出が入ります。", back: [S3, S4] }],
  },
  {
    ...base("mind-refuse", 2),
    prompt: "A: Would you mind lending me your dictionary?\nB: (　　) I'm using it right now.\n空所に入る最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["I'm sorry, but I can't.", "No, not at all.", "Of course not.", "Sure, here you are."],
      correct: 0,
      why: [
        "後ろの「今使っている」とつながる、ていねいな断り。",
        "「いやではない」＝貸す、になり、後ろとかみ合わない。",
        "これも「もちろんいやではない」＝貸す、の意味。",
        "貸す返事で、後ろの「今使っている」と合わない。",
      ],
    },
    point: "断るときは I'm sorry, but 〜 でていねいに",
    steps: [
      { title: "後ろから決める", body: "後ろが {{I'm using it right now.}} なので、B は{{断っている}}。", back: [S4] },
      { title: "mind への返事", body: "No, not at all. / Of course not. は OK の返事。断るなら {{I'm sorry, but I can't.}}", back: [S2] },
    ],
  },
  {
    ...base("borrow-pen", 2),
    prompt: "A: Could I borrow your pen for a minute?\nB: (　　)\nA: Thanks. I'll give it back soon.",
    answer: {
      kind: "choice",
      options: ["Sure, here you are.", "No, thank you.", "Yes, I could.", "You're welcome."],
      correct: 0,
      why: [
        "許可して手わたす返事。後ろの Thanks. I'll give it back soon. とかみ合う。",
        "すすめられたものを断る言葉で、頼みごとへの返事にならない。",
        "Could I 〜? は許可を求める言い方。Yes, I could. とは答えない。",
        "お礼への返事で、ここでは早すぎる。",
      ],
    },
    point: "許可には Sure, here you are. で手わたす",
    steps: [{ title: "許可のやり取り", body: "{{Could I 〜?}}（〜してもいいですか）には Sure. / Of course. で許可し、{{here you are}} で手わたします。", back: [S3] }],
  },
  // ---- 発展 ----
  {
    ...base("mind-yes", 3, "思考・判断・表現"),
    prompt: "A: Do you mind if I sit here?\nB: Yes, I'm afraid I do. My friend will be back in a minute.\nB の返事の意味として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "友達が戻るので、すわらないでほしい。",
        "どうぞすわってください。",
        "友達といっしょにすわってほしい。",
        "すわってもよいか、友達にきいてみる。",
      ],
      correct: 0,
      why: [
        "Yes（いやです）＝ 断り。理由は「友達がすぐ戻る」。",
        "OK なら No, not at all. と答える。",
        "いっしょにすわるとは言っていない。",
        "友達にきくとは言っていない。",
      ],
    },
    point: "mind の質問に Yes ＝ 断り",
    steps: [{ title: "Yes の意味", body: "Do you mind if 〜? への {{Yes}} は「{{いやです}}」。I'm afraid でやわらげた断りで、理由が後ろに続きます。", back: [S2] }],
  },
  {
    ...base("can-manage", 3, "思考・判断・表現"),
    prompt: "A: Your bag looks heavy. Shall I carry it for you?\nB: (　　)\nA: OK. Just let me know if you need help.",
    answer: {
      kind: "choice",
      options: ["Thanks, but I can manage.", "Yes, please. Thank you.", "No, I didn't.", "Yes, it is."],
      correct: 0,
      why: [
        "お礼を言って申し出を断っている。後ろの OK. Just let me know if you need help.（必要なら言ってね）とかみ合う。",
        "前には合うが、受けたなら後ろで A が運ぶはず。「必要なら言って」とかみ合わない。",
        "過去の質問への答えで、申し出への返事にならない。",
        "「かばんは重い」への返事に見えるが、Shall I 〜? の申し出に答えていない。",
      ],
    },
    point: "前だけでなく、後ろとかみ合うかで決める",
    steps: [
      { title: "前を見る", body: "{{Shall I 〜?}} は「〜しましょうか」という申し出。受けるか断るかの返事が入ります。", back: [S3] },
      { title: "後ろで決める", body: "後ろの {{if you need help}}（必要なら言って）から、B は今は{{断った}}とわかります。", back: [S4] },
    ],
  },
  {
    ...base("couldnt-agree", 3),
    prompt: "A: I think we should practice more before the contest.\nB: I couldn't agree more.\nB の気持ちとして最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["全面的に賛成している。", "まったく賛成できない。", "少しだけ賛成している。", "練習はもう十分だと思っている。"],
      correct: 0,
      why: [
        "「これ以上賛成できないほど賛成」＝ 大賛成。",
        "couldn't にひかれた誤解。否定の形だが意味は強い賛成。",
        "「これ以上はない」ほどの賛成なので、少しではない。",
        "A の「もっと練習すべき」に賛成しているので、反対の内容。",
      ],
    },
    point: "I couldn't agree more. ＝ 大賛成",
    steps: [{ title: "否定の形でも賛成", body: "{{I couldn't agree more.}} は「これ以上は賛成できない（ほど賛成）」＝{{大賛成}}。", trap: "not の形だけを見て「反対」と読まない。", back: [S3] }],
  },
  {
    ...base("say-that-again", 3),
    prompt: "A: This summer is so hot. I can't sleep at night.\nB: You can say that again.\nB の発言の意味として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["本当にそのとおりだ。", "もう一度言ってください。", "そんなことは言わないで。", "夜はよく眠れる。"],
      correct: 0,
      why: [
        "「何度でも言っていいよ（それくらいそのとおり）」＝ 強い同意。",
        "聞き返すなら Could you say that again? など。",
        "相手の発言をやめさせる意味はない。",
        "A の話に同意しているので、反対の内容。",
      ],
    },
    point: "You can say that again. ＝ まったく同感",
    steps: [{ title: "決まった言い方", body: "{{You can say that again.}} は聞き返しではなく「{{まったくそのとおり}}」という同意の返事。", trap: "Could you say that again?（聞き返し）と混同しない。", back: [S3] }],
  },
];

export const H_ENG_VOCAB_KAIWA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "語彙",
  minutes: 8,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [{ title: "会話表現", lead: "次の会話の空所に入るもの、または発言の意味として最も適切なものを選びなさい。", style: "word", pick: 6, questions: POOL }],
};
