// 中2英語「リスニング」の単元模試。問題・英文 (放送文) はすべてオリジナル (ドリル・教科書・過去問の文は使っていない)。
// 音声ファイルは使わない。放送文 (スクリプト) を問題文に書き、読んで答える形にしている。
// 大問1 (C 固定)「放送文を読んで答える」3問 (基本15・標準17・発展18) ＋ 大問2 (B プール6問から3問)「さそい・お願いへの返事」(基本15・標準17・発展18)。
// 1回 6問・満点100。時刻の計算 (4:15 の20分前＝3:55) は手で検算済み。A (生成) は使っていない。
import type { QuestionB, QuestionC, UnitMoshi } from "../types";

const U = "j-en-2-listening";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "さそい・お願いには決まった返し方がある");
const S2 = L(2, "But や Actually のあとに答えがある");
const S3 = L(3, "時刻や金額は、計算してから答える");
const S4 = L(4, "長い英文は「だれ・いつ・どこ・何」をメモする");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 70, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });
const cbase = (id: string, difficulty: 1 | 2 | 3, seconds: number) => ({ id, type: "C" as const, difficulty, points: P[difficulty], seconds, skill: "思考・判断・表現" as const });

// ---- 大問1 放送文を読んで答える (C) ----
const SCRIPTS: QuestionC[] = [
  {
    ...cbase("actually", 1, 80),
    prompt: "【No.1】\nKen: Let's meet at the station on Saturday, Mika.\nMika: OK. How about ten in the morning?\nKen: Well, I have a piano lesson in the morning. Actually, can we meet at one?\nMika: Sure. See you then.\n質問：What time will Ken and Mika meet on Saturday?",
    answer: {
      kind: "choice",
      options: ["1時", "10時", "9時", "11時"],
      correct: 0,
      why: ["Actually のあとで at one に変わり、Mika が Sure. と答えている。", "10時は最初に出た案。ケンにピアノのレッスンがあるので変わった。", "9時は放送に出てこない。", "11時は放送に出てこない。"],
      mistakeOf: [null, 1, null, null],
    },
    point: "Actually のあとの、変わった予定を答える",
    steps: [
      { title: "変更の合図", body: "ケンの {{Actually}}（実は）が、予定が変わる合図です。", back: [S2] },
      { title: "最後に決まった内容", body: "変わったあとの {{at one}} に Mika が Sure. と答えているので、1時に会います。", trap: "最初に出た10時にとびつかない。", back: [S2] },
    ],
  },
  {
    ...cbase("before-20", 2, 90),
    prompt: "【No.2】\nAmy: The movie starts at four fifteen.\nTaku: Then let's meet twenty minutes before it starts.\nAmy: OK. Let's meet in front of the theater.\n質問：What time will Amy and Taku meet?",
    answer: {
      kind: "choice",
      options: ["3時55分", "4時15分", "4時35分", "3時45分"],
      correct: 0,
      why: ["4時15分の20分前なので3時55分。", "4時15分は映画が始まる時刻。会う時刻ではない。", "20分「あと」で計算している。before は「前」。", "30分前で計算している。"],
      mistakeOf: [null, 2, null, null],
    },
    point: "before・after は計算の合図",
    steps: [
      { title: "数字をメモ", body: "映画は {{4:15}} に始まる。会うのは {{twenty minutes before}}（20分前）。", back: [S3] },
      { title: "計算する", body: "4時15分 − 20分 ＝ {{3時55分}}。選択肢には計算前の 4:15 がわざと入っています。", back: [S3] },
    ],
  },
  {
    ...cbase("announce-rain", 3, 120),
    prompt: "【No.3】\nGood morning, everyone. This is Ms. Green. Next Friday, we will have a cleaning event at Minami Park. Please come to the school gate at eight thirty. Bring a towel and something to drink. We will start cleaning at nine and finish at eleven. If it rains on Friday, we will have the event next Monday.\n質問：When will they have the event if it rains on Friday?",
    answer: {
      kind: "choice",
      options: ["次の月曜日", "次の金曜日", "次の土曜日", "雨の日は中止になる"],
      correct: 0,
      why: ["If it rains on Friday, we will have the event next Monday. と言っている。", "金曜日は晴れたときの予定。", "土曜日は放送に出てこない。", "中止ではなく、月曜日に行う。"],
    },
    point: "長い案内は「いつ・どこ・何」をメモ",
    steps: [
      { title: "メモをとる", body: "金曜・南公園・校門8:30・タオルと飲み物・9時〜11時・{{雨なら月曜}}。キーワードだけを短くメモします。", back: [S4] },
      { title: "質問に合わせる", body: "質問は「{{雨のとき}}はいつ行うか」。最後の If it rains … のあとの {{next Monday}} が答えです。", back: [S4] },
    ],
  },
];

// ---- 大問2 さそい・お願いへの返事 (B) ----
const REPLY: QuestionB[] = [
  // 基本
  {
    ...base("shall-we", 1),
    prompt: "次の文に対する返事として正しいものはどれですか。\nShall we play badminton after school?",
    answer: {
      kind: "choice",
      options: ["Yes, let's.", "Yes, I do.", "No, I'm not.", "You're welcome."],
      correct: 0,
      why: ["Shall we 〜?（〜しましょうか）はさそい。Yes, let's. で答える。", "Do you 〜? への答え。さそいへの返事ではない。", "Are you 〜? への答え。", "お礼への返事。"],
      mistakeOf: [null, 0, null, null],
    },
    point: "Shall we 〜? → Yes, let's.",
    steps: [{ title: "さそいへの返事", body: "Shall we 〜? は「いっしょに〜しましょうか」という{{さそい}}。{{Yes, let's.}} で答えます。", back: [S1] }],
  },
  {
    ...base("will-you", 1),
    prompt: "次の文に対する返事として正しいものはどれですか。\nWill you open the window?",
    answer: {
      kind: "choice",
      options: ["Sure.", "Yes, let's.", "No, it isn't.", "Me, too."],
      correct: 0,
      why: ["Will you 〜?（〜してくれますか）はお願い。Sure.（いいですよ）。", "Yes, let's. はさそい（Let's 〜. / Shall we 〜?）への返事。", "Is it 〜? への答え。", "相手と同じ気持ちのときに言う。"],
    },
    point: "Will you 〜?（お願い）→ Sure.",
    steps: [{ title: "お願いへの返事", body: "Will you 〜? は「〜してくれますか」という{{お願い}}。{{Sure.}} や All right. で引き受けます。", back: [S1] }],
  },
  // 標準
  {
    ...base("shall-i", 2),
    prompt: "次の文に対する返事として正しいものはどれですか。\nShall I carry your bag?",
    answer: {
      kind: "choice",
      options: ["Yes, please.", "Yes, let's.", "Sure, I will.", "No, you aren't."],
      correct: 0,
      why: ["Shall I 〜?（私が〜しましょうか）には Yes, please.（お願いします）。", "Shall we 〜? のさそいへの返事。Shall I は申し出。", "運ぶのは相手。自分が運ぶわけではない。", "Are you 〜? への答えのような形で、合わない。"],
    },
    point: "Shall I 〜?（申し出）→ Yes, please.",
    steps: [{ title: "I か we か", body: "{{Shall I}} 〜? は「（私が）〜しましょうか」という申し出。{{Yes, please.}} や No, thank you. で答えます。", trap: "Shall we 〜? の Yes, let's. と混ぜない。", back: [S1] }],
  },
  {
    ...base("could-you", 2),
    prompt: "次の文に対する返事として正しいものはどれですか。\nCould you help me with my homework?",
    answer: {
      kind: "choice",
      options: ["All right.", "Yes, let's.", "Yes, I did.", "Here you are."],
      correct: 0,
      why: ["Could you 〜?（〜していただけますか）はお願い。All right. で引き受ける。", "さそいへの返事。", "Did you 〜? への答え。", "物をわたすときのことば。"],
    },
    point: "Could you 〜? もお願い → All right.",
    steps: [{ title: "お願いへの返事", body: "Could you 〜? は Will you 〜? よりていねいな{{お願い}}。{{All right.}} や Sure. で答えます。", back: [S1] }],
  },
  // 発展
  {
    ...base("dialog-love", 3, "思考・判断・表現"),
    prompt: "対話が成り立つように、（　）に入るものを選びなさい。\nA: I'm going to go to the zoo tomorrow. Do you want to come with me?\nB: (　)\nA: Great! Let's meet at nine.",
    answer: {
      kind: "choice",
      options: ["I'd love to.", "No, thank you.", "I'm sorry, I can't.", "Yes, I am."],
      correct: 0,
      why: ["A が Great! と喜び、待ち合わせを決めているので、さそいを受けている。", "ことわると、A の Great! につながらない。", "ことわると、待ち合わせの話につながらない。", "Do you 〜? には do で答える。am は合わない。"],
    },
    point: "あとの文（Great!）から返事を決める",
    steps: [
      { title: "前とあとを見る", body: "B のあとで A が {{Great!}}（よかった）と言い、時刻を決めています。B はさそいを{{受けた}}はずです。", back: [S1] },
      { title: "決まった返し方", body: "さそいを受ける言い方は {{I'd love to.}}（ぜひ行きたい）。", back: [S1] },
    ],
  },
  {
    ...base("dialog-cant", 3, "思考・判断・表現"),
    prompt: "対話が成り立つように、（　）に入るものを選びなさい。\nA: Can you come to my birthday party on Sunday?\nB: (　) I have to visit my grandmother.",
    answer: {
      kind: "choice",
      options: ["Sorry, I can't.", "Sure, I can.", "Yes, let's.", "That's a good idea."],
      correct: 0,
      why: ["あとで「祖母をたずねなければならない」と理由を言っているので、ことわる。", "行けるなら、行けない理由を続けない。", "さそいを受ける返事。あとの理由と合わない。", "賛成する返事。あとの理由と合わない。"],
    },
    point: "Sorry のあとに、ことわる理由が来る",
    steps: [{ title: "あとの理由を見る", body: "B は {{I have to visit my grandmother.}}（祖母をたずねなければならない）と続けています。ことわる {{Sorry, I can't.}} が合います。", back: [S1, S2] }],
  },
];

export const J_EN_2_LISTENING_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中2",
  minutes: 12,
  review: { status: "draft" },
  sections: [
    {
      title: "放送文を読んで答える",
      lead: "本番では英語が放送されます。ここでは放送文（スクリプト）を読んで、質問の答えを選びなさい。",
      style: "reading",
      questions: SCRIPTS,
    },
    { title: "さそい・お願いへの返事", lead: "次の問いに答えなさい。", style: "word", pick: 3, questions: REPLY },
  ],
};
