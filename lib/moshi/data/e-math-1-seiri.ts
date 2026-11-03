// 小1算数「かずしらべ（絵や図に整理する）」の単元模試 (A: 数値を入れかえる生成型 ＋ B: ならべかたの プール)。問題はすべてオリジナル。
// A は しゅるいごとの かずを rng で決め (おなじ かずに ならないように)、ばらばらの ならびや ○の ならびを そこから作る。
// こたえは かずから calc (たし算・ひき算・1の たし算) で検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-1-seiri";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_WAKE = L(1, "まずは しゅるいごとに わける");
const B_HASHI = L(2, "はしを そろえて 1こずつ ならべる");
const B_WAKARU = L(3, "ならべると わかる こと");
const B_SHIRUSHI = L(4, "かぞえまちがいを ふせぐ");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });
/** items の先頭が正解。同じ文字の選択肢はのぞき、r で並べかえる */
function choice(r: Rng, items: [string, string][]): ChoiceQ {
  const seen = new Set<string>();
  const its = items.filter(([o]) => !seen.has(o) && !!seen.add(o));
  const order = r.shuffle(its.map((_, i) => i));
  return { kind: "choice", options: order.map((i) => its[i][0]), why: order.map((i) => its[i][1]), correct: order.indexOf(0) };
}

const SETS = [
  ["りんご", "バナナ", "いちご"],
  ["いぬ", "ねこ", "うさぎ"],
  ["あか", "あお", "きいろ"],
  ["くるま", "バス", "でんしゃ"],
];

/** 3しゅるいの なまえと、ちがう かず */
function data(r: Rng, lo: number, hi: number) {
  const names = r.pick(SETS);
  const ns = r.sample(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i), 3);
  return { names, ns };
}
const ofKind = (names: string[]) => (names[0] === "あか" ? "いろ" : names[0] === "いぬ" ? "どうぶつ" : names[0] === "くるま" ? "のりもの" : "くだもの");
/** ばらばらの ならび (しゅるいの かずは ns) */
function mess(r: Rng, names: string[], ns: number[]) {
  return r.shuffle(names.flatMap((x, i) => Array.from({ length: ns[i] }, () => x))).join("、");
}
/** ○の ならび (はしを そろえた え) */
const graph = (names: string[], ns: number[]) => names.map((x, i) => `${x}　${"○".repeat(ns[i])}`).join("\n");

function kazoeru(r: Rng): QuestionBody {
  const { names, ns } = data(r, 2, 5);
  const k = r.int(0, 2);
  return {
    prompt: `すきな ${ofKind(names)}を きいたら、つぎの ように なりました。${names[k]}は なん人ですか。\n${mess(r, names, ns)}`,
    answer: num(ns[k], Array.from({ length: ns[k] }, () => "1").join("+"), "人"),
    point: "しゅるいごとに わけて、しるしを つけて かぞえる",
    steps: [
      { title: "わけて かぞえる", body: `「${names[k]}」だけを 1つずつ さがして、かぞえた ものに しるしを つけます。`, back: [B_SHIRUSHI] },
      { title: "こたえ", body: `${names[k]}は {{${ns[k]}}}人です。`, back: [B_WAKE] },
    ],
  };
}

function ooi(r: Rng): QuestionBody {
  const { names, ns } = data(r, 2, 8);
  const big = r.bool();
  const v = big ? Math.max(...ns) : Math.min(...ns);
  const k = ns.indexOf(v);
  return {
    prompt: `すきな ${ofKind(names)}を しらべて、1人を ○1こで ならべました。いちばん ${big ? "おおい" : "すくない"}のは どれですか。\n${graph(names, ns)}`,
    answer: choice(r, names.map((x, i): [string, string] => [x, i === k ? `${x}の ならびが いちばん ${big ? "ながく" : "みじかく"}、${ns[i]}人です。` : `${x}は ${ns[i]}人。${names[k]}の ${v}人より ${big ? "すくない" : "おおい"}。`]).sort((a, b) => (a[0] === names[k] ? -1 : b[0] === names[k] ? 1 : 0))),
    point: "はしを そろえて ならべると、ながさで わかる",
    steps: [{ title: "ならびの ながさを 見る", body: `はしが そろって いるので、ならびが いちばん ${big ? "ながい" : "みじかい"} {{${names[k]}}}が いちばん ${big ? "おおい" : "すくない"}。`, back: [B_WAKARU] }],
  };
}

function chigai(r: Rng): QuestionBody {
  const { names, ns } = data(r, 2, 9);
  const [i, j] = ns[0] > ns[1] ? [0, 1] : [1, 0];
  return {
    prompt: `すきな ${ofKind(names)}を しらべて、1人を ○1こで ならべました。${names[i]}は ${names[j]}より なん人 おおいですか。\n${graph(names, ns)}`,
    answer: num(ns[i] - ns[j], `${ns[i]}-${ns[j]}`, "人"),
    point: "はみ出した ぶんが ちがい",
    steps: [
      { title: "はみ出した ぶん", body: `${names[i]}の ○は ${ns[i]}こ、${names[j]}は ${ns[j]}こ。${names[i]}の ほうが はみ出して います。`, back: [B_WAKARU] },
      { title: "ひきざん", body: `${ns[i]}−${ns[j]}＝{{${ns[i] - ns[j]}}}。${ns[i] - ns[j]}人 おおい。` },
    ],
  };
}

function zenbu(r: Rng): QuestionBody {
  const { names, ns } = data(r, 1, 6);
  const tot = ns[0] + ns[1] + ns[2];
  return {
    prompt: `すきな ${ofKind(names)}を しらべて、1人を ○1こで ならべました。ぜんぶで なん人ですか。\n${graph(names, ns)}`,
    answer: num(tot, `${ns[0]}+${ns[1]}+${ns[2]}`, "人"),
    point: "しゅるいごとの かずを たす",
    steps: [
      { title: "しゅるいごとに かぞえる", body: names.map((x, i) => `${x} ${ns[i]}人`).join("、") + "。", back: [B_WAKE] },
      { title: "まえから じゅんに たす", body: `${ns[0]}＋${ns[1]}＝${ns[0] + ns[1]}、${ns[0] + ns[1]}＋${ns[2]}＝{{${tot}}}。ぜんぶで ${tot}人です。` },
    ],
  };
}

function hatten(r: Rng): QuestionBody {
  const { names, ns } = data(r, 2, 7);
  const mx = Math.max(...ns);
  const mn = Math.min(...ns);
  return {
    prompt: `すきな ${ofKind(names)}を きいたら、つぎの ように なりました。いちばん おおい ものと いちばん すくない ものの ちがいは なん人ですか。\n${mess(r, names, ns)}`,
    answer: num(mx - mn, `${mx}-${mn}`, "人"),
    point: "わけて かぞえて、ならべて くらべる",
    steps: [
      { title: "わけて かぞえる", body: names.map((x, i) => `${x} ${ns[i]}人`).join("、") + "。", back: [B_WAKE] },
      { title: "おおい・すくないを 見つける", body: `いちばん おおいのは ${names[ns.indexOf(mx)]}の ${mx}人、すくないのは ${names[ns.indexOf(mn)]}の ${mn}人。`, back: [B_WAKARU] },
      { title: "ちがい", body: `${mx}−${mn}＝{{${mx - mn}}}。${mx - mn}人です。` },
    ],
  };
}

export const E_MATH_1_SEIRI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小1",
  minutes: 8,
  review: { status: "draft" },
  sections: [
    {
      title: "わけて かぞえる",
      lead: "つぎの もんだいに こたえなさい。",
      style: "data",
      questions: [
        { id: "kazoeru", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: kazoeru },
        { id: "ooi", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "思考・判断・表現", generate: ooi },
      ],
    },
    {
      title: "ならべて くらべる",
      lead: "つぎの もんだいに こたえなさい。",
      style: "data",
      questions: [
        { id: "chigai", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "思考・判断・表現", generate: chigai },
        { id: "zenbu", type: "A", difficulty: 2, points: 17, seconds: 75, skill: "知識・技能", generate: zenbu },
      ],
    },
    {
      title: "ならべかたの きまり",
      lead: "ただしい ものを えらびなさい。",
      style: "mix",
      pick: 1,
      questions: [
        {
          id: "okisa",
          type: "B",
          difficulty: 2,
          points: 17,
          seconds: 45,
          skill: "思考・判断・表現",
          prompt: "かずを くらべる えを かきます。えの かきかたで、よい ものは どれですか。",
          answer: {
            kind: "choice",
            options: ["えの 大きさを そろえて かく", "おおい ものほど、えを 大きく かく", "すきな ものの えだけ 大きく かく"],
            correct: 0,
            why: ["大きさが そろって いれば、ならびの ながさで くらべられます。", "えが 大きいと、かずが すくなくても ながく 見えて しまいます。", "大きさが ちがうと、ながさで くらべられません。"],
          },
          point: "えの 大きさを そろえる",
          steps: [{ title: "大きさを そろえる", body: "大きい えは 1こでも ながく 見えます。{{えの 大きさを そろえて}} かきます。", back: [B_SHIRUSHI] }],
        },
        {
          id: "hashi",
          type: "B",
          difficulty: 2,
          points: 17,
          seconds: 45,
          skill: "思考・判断・表現",
          prompt: "しゅるいごとに えを よこに ならべます。どう ならべると よいですか。",
          answer: {
            kind: "choice",
            options: ["左の はしを そろえて、1こに 1ますずつ ならべる", "すきな ところから ならべはじめる", "まん中に あつめて ならべる"],
            correct: 0,
            why: ["はしが そろって いると、ならびの ながさで おおい・すくないが わかります。", "はしが ずれると、ながい ほうが おおいとは いえません。", "はしが そろわないので、ながさで くらべられません。"],
          },
          point: "はしを そろえて ならべる",
          steps: [{ title: "はしを そろえる", body: "{{左の はしを そろえて}}、1こに 1ますずつ ならべます。", back: [B_HASHI] }],
        },
        {
          id: "shirushi",
          type: "B",
          difficulty: 2,
          points: 17,
          seconds: 45,
          skill: "思考・判断・表現",
          prompt: "ばらばらの えを かぞえる とき、おなじ えを 2かい かぞえない ための よい やりかたは どれですか。",
          answer: {
            kind: "choice",
            options: ["かぞえた えに しるしを つける", "いそいで 1かいだけ 見る", "目を つぶって かぞえる"],
            correct: 0,
            why: ["しるしが あれば、どこまで かぞえたか わかります。", "いそぐと、かぞえわすれや 2かい かぞえる ことが おきます。", "見ないと かぞえられません。"],
          },
          point: "かぞえた ものに しるしを つける",
          steps: [{ title: "しるしを つける", body: "かぞえた えには {{しるしを つけます}}。2かい かぞえずに すみます。", back: [B_SHIRUSHI] }],
        },
      ],
    },
    {
      title: "しらべて くらべる",
      lead: "つぎの もんだいに こたえなさい。",
      style: "data",
      questions: [{ id: "hatten", type: "A", difficulty: 3, points: 21, seconds: 120, skill: "思考・判断・表現", generate: hatten }],
    },
  ],
};
