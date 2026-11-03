// 小1算数「かたちあそび」の単元模試 (B: かたちの なかまわけの プール ＋ A: つみきの かずを数える生成型)。問題はすべてオリジナル。
// A は はこ・つつ・ボールの こすうを rng から作り、「たいらな ところが ある もの」の かず (はこ＋つつ) を calc で検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-1-katachi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_3 = L(1, "3つの なかま");
const B_KOROGARU = L(2, "ころがる？ つめる？");
const B_NAZORU = L(3, "なぞると 出る かたち");
const B_TOU = L(4, "つみきの とうを つもう");

const KATA = ["はこの かたち", "つつの かたち", "ボールの かたち"] as const;
const WHY_K = ["たいらな ところと かどが ある かたちです。", "まるい ところと、上と 下に たいらな ところが ある かたちです。", "どこから 見ても まるい かたちです。"];

/** 「〇〇は どの かたちの なかまですか」(k: 0 はこ、1 つつ、2 ボール) */
function nakama(id: string, thing: string, k: 0 | 1 | 2, hint: string): QuestionB {
  return {
    id,
    type: "B",
    difficulty: 1,
    points: 14,
    seconds: 40,
    skill: "知識・技能",
    prompt: `${thing}は、どの かたちの なかまですか。`,
    answer: {
      kind: "choice",
      options: [...KATA],
      correct: k,
      why: KATA.map((x, i) => (i === k ? `${thing}は ${hint}。${x}です。` : `${x}は、${WHY_K[i]}${thing}とは ちがいます。`)),
    },
    point: "いろや 大きさでは なく、かたちで わける",
    steps: [{ title: "かたちを 見る", body: `${thing}は ${hint}ので、{{${KATA[k]}}}の なかまです。`, back: [B_3] }],
  };
}

/** 「〜のは どれですか」(はたらき・なぞった かたち) */
function hataraki(id: string, prompt: string, k: 0 | 1 | 2, why: [string, string, string], body: string, back: { label: string; href: string }): QuestionB {
  return {
    id,
    type: "B",
    difficulty: 2,
    points: 17,
    seconds: 50,
    skill: "思考・判断・表現",
    prompt,
    answer: { kind: "choice", options: [...KATA], correct: k, why },
    point: "たいらな ところと まるい ところを 見る",
    steps: [{ title: "かたちの とくちょう", body, back: [back] }],
  };
}

function tsumiki(r: Rng): QuestionBody {
  const h = r.int(1, 5);
  const t = r.int(1, 5);
  const b = r.int(1, 4);
  const ask = r.bool();
  return ask
    ? {
        prompt: `つみきが あります。はこの かたちが ${h}こ、つつの かたちが ${t}こ、ボールの かたちが ${b}こ です。たいらな ところが ある つみきは、ぜんぶで なんこですか。`,
        answer: { kind: "num", answerKind: "num", answer: [String(h + t)], unit: "こ", calc: `${h}+${t}` },
        point: "はこにも つつにも たいらな ところが ある",
        steps: [
          { title: "たいらな ところが ある かたち", body: "はこは どこも たいら。つつは 上と 下が たいら。ボールには たいらな ところが ありません。", back: [B_NAZORU] },
          { title: "かぞえる", body: `はこ ${h}こと つつ ${t}こで、${h}＋${t}＝{{${h + t}}}こです。`, trap: "つつを わすれない。上と 下は たいらです。" },
        ],
      }
    : {
        prompt: `つみきが あります。はこの かたちが ${h}こ、つつの かたちが ${t}こ、ボールの かたちが ${b}こ です。どの むきに おいても ころがる つみきは、なんこですか。`,
        answer: { kind: "num", answerKind: "num", answer: [String(b)], unit: "こ", calc: `${h + t + b}-${h}-${t}` },
        point: "どの むきでも ころがるのは ボールだけ",
        steps: [
          { title: "ころがる かたち", body: "つつは よこに すると ころがるが、たてに すると ころがらない。どの むきでも ころがるのは ボールだけです。", back: [B_KOROGARU] },
          { title: "かぞえる", body: `ボールの かたちは {{${b}}}こです。` },
        ],
      };
}

export const E_MATH_1_KATACHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小1",
  minutes: 6,
  review: { status: "draft" },
  sections: [
    {
      title: "かたちの なかまわけ",
      lead: "あてはまる ものを えらびなさい。",
      style: "mix",
      pick: 2,
      questions: [
        nakama("tissue", "ティッシュの はこ", 0, "たいらな ところと かどが ある"),
        nakama("saikoro", "さいころ", 0, "たいらな ところと かどが ある"),
        nakama("kan", "ジュースの かん", 1, "まるくて、上と 下が たいら"),
        nakama("shin", "トイレットペーパーの しん", 1, "まるくて、上と 下が たいら"),
        nakama("soccer", "サッカーボール", 2, "どこから 見ても まるい"),
        nakama("biidama", "ビー玉", 2, "どこから 見ても まるい"),
      ],
    },
    {
      title: "ころがる・つめる・なぞる",
      lead: "あてはまる かたちを えらびなさい。",
      style: "mix",
      pick: 2,
      questions: [
        hataraki("korogaru", "どの むきに おいても、よく ころがるのは どれですか。", 2, ["はこは たいらな ところが あるので ころがりません。", "つつは たてに すると ころがりません。", "ボールは どこも まるいので、どの むきでも ころがります。"], "ボールは どこも まるいので、{{どの むきでも ころがります}}。", B_KOROGARU),
        hataraki("tate-yoko", "たてに すると つめて、よこに すると ころがるのは どれですか。", 1, ["はこは よこに しても ころがりません。", "つつは 上と 下が たいらで、よこは まるい。たてで つめ、よこで ころがります。", "ボールは どの むきでも つめません。"], "つつは {{上と 下が たいら}}で、よこが まるい かたちです。", B_KOROGARU),
        hataraki("doko-demo", "どの むきに おいても、上に つみきを つめるのは どれですか。", 0, ["はこは どの めんも たいらなので、どの むきでも つめます。", "つつは よこに すると ころがって つめません。", "ボールは たいらな ところが ないので つめません。"], "はこは どこも {{たいら}}なので、どの むきでも つめます。", B_TOU),
        hataraki("nazoru-maru", "かみに あてて なぞると、まるが かけるのは どれですか。", 1, ["はこを なぞると しかくが できます。", "つつの 上や 下を なぞると、まるが できます。", "ボールには たいらな ところが ないので、なぞれません。"], "つつの {{たいらな 上と 下}}は まるい かたちです。", B_NAZORU),
        hataraki("nazoru-shikaku", "かみに あてて なぞると、しかくが かけるのは どれですか。", 0, ["はこの たいらな ところを なぞると、しかくが できます。", "つつを なぞると まるが できます。", "ボールには たいらな ところが ないので、なぞれません。"], "はこの {{たいらな ところ}}は しかくです。", B_NAZORU),
      ],
    },
    {
      title: "つみきを かぞえる",
      lead: "つぎの もんだいに こたえなさい。",
      style: "word",
      questions: [{ id: "tsumiki", type: "A", difficulty: 2, points: 17, seconds: 75, skill: "思考・判断・表現", generate: tsumiki }],
    },
    {
      title: "かたちの ひみつ",
      lead: "ただしい ものを えらびなさい。",
      style: "mix",
      pick: 1,
      questions: [
        {
          id: "okisa",
          type: "B",
          difficulty: 3,
          points: 21,
          seconds: 60,
          skill: "思考・判断・表現",
          prompt: "大きい あかい はこと、小さい あおい はこが あります。この 2つは、どう いえますか。",
          answer: {
            kind: "choice",
            options: ["おなじ はこの かたちの なかま", "大きさが ちがうので、ちがう なかま", "いろが ちがうので、ちがう なかま"],
            correct: 0,
            why: ["いろや 大きさが ちがっても、かたちが おなじなら おなじ なかまです。", "大きさでは なく、かたちで なかまわけ します。", "いろでは なく、かたちで なかまわけ します。"],
          },
          point: "なかまわけは、かたちで きめる",
          steps: [{ title: "かたちで わける", body: "いろや 大きさが ちがっても、{{かたちが おなじ}}なら おなじ なかまです。", back: [B_3] }],
        },
        {
          id: "tou",
          type: "B",
          difficulty: 3,
          points: 21,
          seconds: 60,
          skill: "思考・判断・表現",
          prompt: "つみきで たかい とうを つみます。いちばん 上に のせると、ころがりおちて しまうのは どれですか。",
          answer: {
            kind: "choice",
            options: ["ボールの かたち", "はこの かたち", "たてに した つつの かたち"],
            correct: 0,
            why: ["ボールは どこも まるく、たいらな ところが ないので、のせても ころがりおちます。", "はこは たいらな ところどうしを かさねられるので、のせられます。", "つつは たてに すれば 上と 下が たいらなので、のせられます。"],
          },
          point: "たいらな ところどうしを かさねる",
          steps: [{ title: "たいらな ところを かさねる", body: "とうを つむには {{たいらな ところどうしを かさねる}}。ボールには たいらな ところが ありません。", back: [B_TOU] }],
        },
        {
          id: "tsutsu-tsumu",
          type: "B",
          difficulty: 3,
          points: 21,
          seconds: 60,
          skill: "思考・判断・表現",
          prompt: "「つつの かたちは、ぜったいに 上に つめない」。この いいかたは ただしいですか。",
          answer: {
            kind: "choice",
            options: ["ただしくない。たてに すれば つめる", "ただしい。まるいので ぜったいに つめない", "ただしくない。よこに すれば つめる"],
            correct: 0,
            why: ["つつの 上と 下は たいらなので、たてに すれば つめます。", "まるいのは よこの ところだけ。上と 下は たいらです。", "よこに すると、まるい ところが 下に なって ころがります。"],
          },
          point: "つつの 上と 下は たいら",
          steps: [{ title: "つつの たいらな ところ", body: "つつは {{たてに すれば}}、上と 下の たいらな ところで つめます。", back: [B_KOROGARU] }],
        },
      ],
    },
  ],
};
