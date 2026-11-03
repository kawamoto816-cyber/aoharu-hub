// 小1算数「くり下がりのあるひき算」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 11〜18 から 1けたを ひき、一のくらいから ひけない組 (くり下がり) だけを使う。num は calc で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
// 選択肢は、よくある まちがい (ひく じゅんを ぎゃくに・ばらを たしわすれ) から作り、同じ値はのぞいて r で並べかえる。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-1-kurisagari";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_10 = L(1, "ひけない ときは 10から");
const B_ZU = L(2, "ずで 見ると");
const B_SHIKI = L(3, "しきで かくと");
const B_BETSU = L(4, "べつの やりかたも ある");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });
/** items の先頭が正解。同じ文字の選択肢はのぞき、r で並べかえる */
function choice(r: Rng, items: [string, string][]): ChoiceQ {
  const seen = new Set<string>();
  const its = items.filter(([o]) => !seen.has(o) && !!seen.add(o));
  const order = r.shuffle(its.map((_, i) => i));
  return { kind: "choice", options: order.map((i) => its[i][0]), why: order.map((i) => its[i][1]), correct: order.indexOf(0) };
}

/** a は 11〜18、b は 2〜9 で、a の一のくらい < b */
function pair(r: Rng): [number, number] {
  for (;;) {
    const a = r.int(11, 18);
    const b = r.int(2, 9);
    if (a - 10 < b) return [a, b];
  }
}

const twoSteps = (a: number, b: number) => [
  { title: "10から ひく", body: `${a}は 10と ${a - 10}。${a - 10}から ${b}は ひけないので、10−${b}＝{{${10 - b}}}。`, back: [B_10] },
  { title: "のこりと あわせる", body: `${10 - b}と ${a - 10}で {{${a - b}}} です。`, trap: `${10 - b}を こたえに しない。ばらの ${a - 10}を あわせます。`, back: [B_SHIKI] },
];

function keisan(r: Rng): QuestionBody {
  const [a, b] = pair(r);
  return { prompt: `${a}−${b}は いくつですか。`, answer: num(a - b, `${a}-${b}`), point: "ひけない ときは 10から ひく", steps: twoSteps(a, b) };
}

function juKara(r: Rng): QuestionBody {
  const [a, b] = pair(r);
  return {
    prompt: `${a}−${b}を けいさんします。まず 10から ${b}を ひくと、いくつですか。`,
    answer: num(10 - b, `10-${b}`),
    point: "10−いくつを すぐ いえるように",
    steps: [{ title: "10から ひく", body: `${a}を 10と ${a - 10}に わけて、10から ${b}を ひきます。10−${b}＝{{${10 - b}}}。`, back: [B_ZU] }],
  };
}

function machigai(r: Rng): QuestionBody {
  const [a, b] = pair(r);
  const o = a - 10;
  return {
    prompt: `${a}−${b}の こたえは どれですか。`,
    answer: choice(r, [
      [String(a - b), `10−${b}＝${10 - b}、${10 - b}と ${o}で ${a - b}。`],
      [String(10 + (b - o)), `${o}−${b}が ひけないので ${b}−${o} と ぎゃくに ひいた まちがいです。`],
      [String(10 - b), `10−${b}＝${10 - b}で とめた まちがいです。ばらの ${o}を あわせます。`],
      [String(a - b + 1), `たしかめると ${a - b + 1}＋${b}＝${a + 1}。${a}に ならないので ちがいます。`],
    ]),
    point: "ひかれる かずと ひく かずを ぎゃくに しない",
    steps: twoSteps(a, b),
  };
}

function nokori(r: Rng): QuestionBody {
  const [a, b] = pair(r);
  const [f, v] = r.pick([
    ["いちご", "たべる"],
    ["クッキー", "たべる"],
    ["シール", "つかう"],
    ["いろがみ", "つかう"],
  ]);
  return {
    prompt: `${f}が ${a}こ あります。${b}こ ${v}と、のこりは なんこですか。`,
    answer: num(a - b, `${a}-${b}`, "こ"),
    point: "「のこりは」は ひきざん",
    steps: [{ title: "しき", body: `のこりなので ひきざん。しきは ${a}−${b}。`, back: [B_10] }, ...twoSteps(a, b).slice(1)],
  };
}

function chigai(r: Rng): QuestionBody {
  const [a, b] = pair(r);
  return {
    prompt: `あかい ふうせんが ${a}こ、あおい ふうせんが ${b}こ あります。あかい ふうせんは なんこ おおいですか。`,
    answer: num(a - b, `${a}-${b}`, "こ"),
    point: "「なんこ おおい」は ひきざん",
    steps: [
      { title: "ちがいは ひきざん", body: `ちがいを もとめるので ${a}−${b}。`, back: [B_10] },
      { title: "べつの やりかた", body: `${b}を ${a - 10}と ${b - (a - 10)}に わけて、${a}−${a - 10}＝10、10−${b - (a - 10)}＝{{${a - b}}}。どちらでも おなじです。`, back: [B_BETSU] },
    ],
  };
}

function shikaku(r: Rng): QuestionBody {
  const [a, b] = pair(r);
  const c = a - b;
  return {
    prompt: `□に はいる かずは いくつですか。\n${a}−□＝${c}`,
    answer: num(b, `${a}-${c}`),
    point: "ひいて のこりが いくつに なるかで かんがえる",
    steps: [
      { title: "ひいた かずを かんがえる", body: `${a}から □を とると ${c}が のこります。とった かずは ${a}−${c}＝{{${b}}}。`, back: [B_10] },
      { title: "たしかめる", body: `${a}−${b}＝${c} なので、□は ${b}です。` },
    ],
  };
}

export const E_MATH_1_KURISAGARI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小1",
  minutes: 7,
  review: { status: "draft" },
  sections: [
    {
      title: "10から ひく",
      lead: "つぎの もんだいに こたえなさい。",
      style: "calc",
      questions: [
        { id: "keisan", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: keisan },
        { id: "ju-kara", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: juKara },
        { id: "machigai", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "思考・判断・表現", generate: machigai },
      ],
    },
    {
      title: "ぶんしょうの もんだいと □",
      lead: "つぎの もんだいに こたえなさい。",
      style: "word",
      questions: [
        { id: "nokori", type: "A", difficulty: 2, points: 17, seconds: 75, skill: "知識・技能", generate: nokori },
        { id: "chigai", type: "A", difficulty: 2, points: 17, seconds: 75, skill: "思考・判断・表現", generate: chigai },
        { id: "shikaku", type: "A", difficulty: 3, points: 21, seconds: 90, skill: "思考・判断・表現", generate: shikaku },
      ],
    },
  ],
};
