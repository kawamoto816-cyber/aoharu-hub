// 共通テスト型「英語リスニング」第6問の形 (長めの対話・話し合い) の問題 (試験モードだけで使う)。
// 公式の過去問 (令和7・8年度) で確かめた大問の形 (docs/kyotsu-kakomon.md) に合わせて、新しく書いた。
// 英文・場面・人名・数字はすべてオリジナル (実在の試験・教科書・市販教材・ニュース記事の文は使っていない)。
// 放送文は 〔放送1回〕…〔/放送〕 でかこみ、中は英語だけ。数・値段は語で書く (読み上げ用)。
// l6 話し合い 2セット×4問。検算: festival 文化祭まで5週間・映画づくりは3週間以上 → 間に合う／trip バス5,000円・電車4,000円・登山3,000円。
import type { QuestionC } from "@/lib/moshi/types";
import type { ExamPoolSection } from "./types";

const U = "h-eng-skill-listening";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "音声が流れる前に、選択肢を「先読み」する");
const S4 = L(4, "答えは、放送の「言いかえ」で選ぶ");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const q = (id: string, difficulty: 1 | 2 | 3, seconds: number, skill: QuestionC["skill"] = "思考・判断・表現") => ({
  id,
  type: "C" as const,
  difficulty,
  points: P[difficulty],
  seconds,
  skill,
});

const FESTIVAL = `〔放送1回〕
Aya: We have to decide our class project for the school festival by Friday. Any ideas?
Ben: How about a café? Everyone likes food, and we could make some money for the class.
Chloe: A café is fun, but three other classes are already planning one. I'd like to make a short film. We could show it in our classroom.
Ben: A film sounds hard. Who can edit videos?
Chloe: I can, and Daichi is good at it, too. The real problem is time. We'd need at least three weeks.
Aya: The festival is in five weeks, so that's possible. But in a film, only a few people can act. In a café, everyone has a job.
Ben: That's true. Hmm, what if we show the film and sell drinks to the people who watch it?
Chloe: Like a small movie theater? I like that.
Aya: Me too. Then everyone can take part. Ben, can you check the rules about selling drinks?
Ben: Sure. I'll ask our teacher tomorrow.
〔/放送〕`;

const FESTIVAL_QS: QuestionC[] = [
  {
    ...q("festival-cafe", 2, 80),
    prompt: "Chloe がカフェの案に乗り気でないのはなぜか。",
    answer: {
      kind: "choice",
      options: ["食べ物を作るのがむずかしいから", "ほかのクラスがすでに計画しているから", "クラスのお金が足りないから", "準備に3週間以上かかるから"],
      correct: 1,
      why: [
        "食べ物を作るむずかしさの話は出てこない。",
        "three other classes are already planning one（ほかの3クラスがもう計画している）と言っている。",
        "Ben はお金がかせげると言っている。足りないとは言っていない。",
        "3週間以上かかるのは、映画づくりの話。",
      ],
    },
    point: "but のあとに、反対する理由が来る",
    steps: [
      { title: "先読み", body: "選択肢はすべて理由。{{Chloe}} の発言の理由にしぼって聞きます。", back: [S1] },
      { title: "but のあと", body: "A café is fun, {{but}} three other classes are already planning one。", back: [S4] },
    ],
  },
  {
    ...q("festival-worry", 2, 80),
    prompt: "映画だけを作る案について、Aya が気にしていることは何か。",
    answer: {
      kind: "choice",
      options: ["文化祭までに間に合わないこと", "編集できる人がいないこと", "参加できる人が少ないこと", "教室が上映に向かないこと"],
      correct: 2,
      why: [
        "Aya は The festival is in five weeks, so that's possible（間に合う）と言っている。",
        "編集を気にしたのは Ben。Chloe が自分と Daichi ができると答えている。",
        "only a few people can act（出られる人が少ない）、カフェなら全員に仕事がある、と言っている。",
        "教室の話は出てこない。",
      ],
    },
    point: "だれの心配かを聞き分ける",
    steps: [
      { title: "3人の心配", body: "Ben＝編集／Chloe＝時間／{{Aya}}＝出られる人の数。", back: [S1] },
      { title: "Aya の発言", body: "{{only a few people can act}} ↔ In a café, {{everyone has a job}}。", back: [S4] },
    ],
  },
  {
    ...q("festival-plan", 3, 90),
    prompt: "話し合いの結果、3人が賛成した案はどれか。",
    answer: {
      kind: "choice",
      options: ["カフェだけを開く", "映画を作り、ほかのクラスのカフェで上映する", "カフェを開き、店の中で劇をする", "映画を上映し、見に来た人に飲み物を売る"],
      correct: 3,
      why: [
        "カフェだけの案は、Chloe が反対した。",
        "ほかのクラスのカフェで上映する話は出てこない。",
        "劇の話は出てこない。",
        "Ben の show the film and sell drinks to the people who watch it に、Chloe と Aya が賛成している。",
      ],
    },
    point: "what if …? の新しい案と、それへの返事を聞く",
    steps: [
      { title: "新しい案", body: "Ben：{{what if we show the film and sell drinks …?}}", back: [S4] },
      { title: "返事", body: "Chloe：{{I like that.}}／Aya：{{Me too.}} → 3人ともこの案に賛成です。" },
    ],
  },
  {
    ...q("festival-next", 3, 80),
    prompt: "Ben はこのあと何をするか。",
    answer: {
      kind: "choice",
      options: ["先生に、飲み物を売るきまりを聞く", "Daichi に編集をたのむ", "ほかのクラスの計画を調べる", "映画の台本を書く"],
      correct: 0,
      why: [
        "Aya の can you check the rules about selling drinks? に、I'll ask our teacher tomorrow と答えている。",
        "Daichi は編集が得意だと紹介されただけ。たのむ話は出てこない。",
        "ほかのクラスの計画を調べる話はしていない。",
        "台本の話は出てこない。",
      ],
    },
    point: "最後のたのみごとと、その返事を聞く",
    steps: [
      { title: "たのみごと", body: "Aya：{{can you check the rules about selling drinks?}}", back: [S1] },
      { title: "返事", body: "Ben：Sure. {{I'll ask our teacher tomorrow.}}", back: [S4] },
    ],
  },
];

const TRIP = `〔放送1回〕
Mr. Ito: For our class trip in October, we have two plans. Plan A is hiking in the mountains, and Plan B is visiting museums in the city. What do you think?
Sara: I prefer hiking. We sit in classrooms all day, so I want to be outside. And it costs less, doesn't it?
Mr. Ito: Yes. Plan A is about three thousand yen for each student, and Plan B is about five thousand.
Tom: But what if it rains? Last year, our sports day was canceled twice in October. In the city, the weather doesn't matter.
Sara: That's a good point. Still, some students can't pay five thousand yen easily.
Tom: I understand. Mr. Ito, is there a cheaper way to do Plan B?
Mr. Ito: Well, if we take the train instead of a bus, it would be about four thousand yen. But we would have to leave school one hour earlier.
Tom: I don't mind getting up early.
Sara: Neither do I. Four thousand is okay, and we won't have to worry about rain. But can we have lunch in a park if it's sunny?
Mr. Ito: Good idea. I'll add that to the plan and tell the class tomorrow.
〔/放送〕`;

const TRIP_QS: QuestionC[] = [
  {
    ...q("trip-sara", 2, 80),
    prompt: "Sara が最初に山歩きを選んだ理由はどれか。",
    answer: {
      kind: "choice",
      options: ["山歩きの経験があり、道にくわしいから", "博物館には去年行ったから", "外で過ごしたいし、費用も安いから", "朝早く出発しなくてよいから"],
      correct: 2,
      why: [
        "山歩きの経験の話は出てこない。",
        "去年の話は Tom の体育祭のこと。博物館に行った話は出てこない。",
        "I want to be outside と it costs less の2つを言っている。",
        "早く出るのは電車で行く案の話で、Sara の理由ではない。",
      ],
    },
    point: "理由が2つ続くときは、And のあとも聞く",
    steps: [
      { title: "1つ目", body: "We sit in classrooms all day, so {{I want to be outside}}。", back: [S4] },
      { title: "2つ目", body: "{{And it costs less}}, doesn't it? → 費用の話が続きます。" },
    ],
  },
  {
    ...q("trip-tom", 2, 80),
    prompt: "Tom が山歩きの案について心配していることは何か。",
    answer: {
      kind: "choice",
      options: ["けがをする生徒が出ること", "雨で行けなくなること", "費用が高いこと", "歩く距離が長いこと"],
      correct: 1,
      why: [
        "けがの話は出てこない。",
        "what if it rains? と言い、去年10月に体育祭が2回中止になったことを例に出している。",
        "費用が高いのは Plan B のほうで、気にしているのは Sara。",
        "距離の話は出てこない。",
      ],
    },
    point: "what if …? は心配を表す",
    steps: [
      { title: "心配の合図", body: "{{But what if it rains?}}", back: [S1] },
      { title: "例", body: "{{canceled twice in October}}／In the city, {{the weather doesn't matter}}。", back: [S4] },
    ],
  },
  {
    ...q("trip-plan", 3, 100),
    prompt: "話し合いの結果、まとまった案はどれか。",
    answer: {
      kind: "choice",
      options: [
        "バスで市内の博物館へ行く（約5,000円・いつもの時刻に出発）",
        "山歩きに行く（約3,000円）",
        "電車で市内の博物館へ行く（約4,000円・いつもの時刻に出発）",
        "電車で市内の博物館へ行く（約4,000円・1時間早く出発）",
      ],
      correct: 3,
      why: [
        "バスの約5,000円は、払いにくい生徒がいると Sara が言った元の案。",
        "山歩きは、雨の心配があるので選ばれなかった。",
        "電車で行くと、学校を1時間早く出なければならない。",
        "電車なら約4,000円で、1時間早く出る。Tom も Sara も早起きはかまわないと言っている。",
      ],
    },
    point: "値段と条件を、案ごとにメモする",
    steps: [
      { title: "3つの数", body: "Plan A＝{{three thousand}}／Plan B（バス）＝{{five thousand}}／Plan B（電車）＝{{four thousand}}。", back: [S1] },
      { title: "条件", body: "電車の場合：{{leave school one hour earlier}}。2人とも {{I don't mind}}・{{Neither do I}} と受け入れています。", back: [S4] },
    ],
  },
  {
    ...q("trip-add", 3, 80),
    prompt: "Mr. Ito が計画に加えることは何か。",
    answer: {
      kind: "choice",
      options: ["晴れたら公園で昼食をとること", "雨のときは別の日に行くこと", "帰りはバスに乗ること", "博物館を1つ減らすこと"],
      correct: 0,
      why: [
        "Sara の can we have lunch in a park if it's sunny? に、Good idea. I'll add that to the plan と答えている。",
        "市内なら天気は関係ないので、別の日にする話は出てこない。",
        "帰りの乗り物の話は出てこない。",
        "博物館の数の話は出てこない。",
      ],
    },
    point: "I'll add that の that は、直前の提案",
    steps: [
      { title: "直前の提案", body: "Sara：{{can we have lunch in a park if it's sunny?}}", back: [S4] },
      { title: "返事", body: "Mr. Ito：Good idea. {{I'll add that to the plan}}。" },
    ],
  },
];

export const ENG_LISTENING_POOL_2: ExamPoolSection[] = [
  { unit: U, tag: "l6", section: { id: "xl-l6-festival", title: "話し合い（文化祭の出し物）", lead: "3人の話し合いを聞き、問いに答えよ。", style: "reading", material: [{ kind: "text", body: FESTIVAL }], questions: FESTIVAL_QS } },
  { unit: U, tag: "l6", section: { id: "xl-l6-trip", title: "話し合い（クラスの遠足）", lead: "先生と生徒2人の話し合いを聞き、問いに答えよ。", style: "reading", material: [{ kind: "text", body: TRIP }], questions: TRIP_QS } },
];
