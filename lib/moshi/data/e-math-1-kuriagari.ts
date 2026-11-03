// 小1算数「くり上がりのあるたし算」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 1けた＋1けたで、こたえが 11〜18 に なる組だけを使う。num は calc で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
// 「わけかた」の選択肢は、正しい わけかた (あと いくつで 10) 以外の わけかたから作り、r で並べかえる。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-1-kuriagari";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_10 = L(1, "10を つくると かんたん");
const B_JUN = L(2, "やりかたは 3つの じゅんばん");
const B_SHIKI = L(3, "しきで かくと");
const B_MAE = L(4, "まえの かずを わけても よい");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });
/** items の先頭が正解。同じ文字の選択肢はのぞき、r で並べかえる */
function choice(r: Rng, items: [string, string][]): ChoiceQ {
  const seen = new Set<string>();
  const its = items.filter(([o]) => !seen.has(o) && !!seen.add(o));
  const order = r.shuffle(its.map((_, i) => i));
  return { kind: "choice", options: order.map((i) => its[i][0]), why: order.map((i) => its[i][1]), correct: order.indexOf(0) };
}

/** a ≧ b ではない かもしれない、くり上がりの ある 1けた＋1けた */
function pair(r: Rng, bigFirst: boolean): [number, number] {
  for (;;) {
    const a = r.int(2, 9);
    const b = r.int(2, 9);
    if (a + b > 10 && (!bigFirst || a >= b)) return [a, b];
  }
}

function keisan(r: Rng): QuestionBody {
  const [a, b] = pair(r, true);
  const k = 10 - a;
  return {
    prompt: `${a}＋${b}は いくつですか。`,
    answer: num(a + b, `${a}+${b}`),
    point: "あと いくつで 10かを 見る",
    steps: [
      { title: "10を つくる", body: `${a}は あと ${k}で 10。${b}を ${k}と ${b - k}に わけます。`, back: [B_JUN] },
      { title: "10と のこり", body: `${a}と ${k}で 10、10と ${b - k}で {{${a + b}}} です。`, back: [B_SHIKI] },
    ],
  };
}

function ato(r: Rng): QuestionBody {
  const [a, b] = pair(r, true);
  return {
    prompt: `${a}＋${b}を けいさんします。${a}は、あと いくつで 10に なりますか。`,
    answer: num(10 - a, `10-${a}`),
    point: "①あと いくつで 10か",
    steps: [{ title: "10の くみ", body: `10は ${a}と ${10 - a}。${a}は あと {{${10 - a}}}で 10です。`, back: [B_JUN] }],
  };
}

function wakekata(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do [a, b] = pair(r, true);
  while (b < 3);
  const k = 10 - a;
  const others = Array.from({ length: b - 1 }, (_, i) => i + 1).filter((j) => j !== k);
  const ds = r.sample(others, Math.min(2, others.length));
  return {
    prompt: `${a}＋${b}を けいさんします。${b}を どのように わけると よいですか。`,
    answer: choice(r, [
      [`${k}と ${b - k}`, `${a}は あと ${k}で 10。だから ${b}を ${k}と ${b - k}に わけます。`],
      ...ds.map((j): [string, string] => [`${j}と ${b - j}`, `${a}と ${j}では ${a + j}。10に なりません。`]),
    ]),
    point: "たす かずを「あと いくつで 10」と のこりに わける",
    steps: [
      { title: "あと いくつで 10か", body: `${a}は あと {{${k}}}で 10。`, back: [B_JUN] },
      { title: "わける", body: `${b}を ${k}と ${b - k}に わけると、${a}＋${k}＝10、10＋${b - k}＝${a + b}。`, back: [B_10] },
    ],
  };
}

function bun(r: Rng): QuestionBody {
  const [a, b] = pair(r, false);
  const [f, v] = r.pick([
    ["あめ", "もらいました"],
    ["どんぐり", "ひろいました"],
    ["シール", "かいました"],
  ]);
  return {
    prompt: `${f}が ${a}こ あります。${b}こ ${v}。ぜんぶで なんこに なりましたか。`,
    answer: num(a + b, `${a}+${b}`, "こ"),
    point: "ふえたら たしざん。10を つくって たす",
    steps: [
      { title: "しき", body: `ふえたので たしざん。しきは ${a}＋${b}。` },
      a >= b
        ? { title: "10を つくる", body: `${a}は あと ${10 - a}で 10。10と ${b - (10 - a)}で {{${a + b}}}こです。`, back: [B_10] }
        : { title: "10を つくる", body: `${b}は あと ${10 - b}で 10。${a}を ${10 - b}と ${a - (10 - b)}に わけて、10と ${a - (10 - b)}で {{${a + b}}}こです。`, back: [B_MAE] },
    ],
  };
}

function maeWake(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do [b, a] = pair(r, true);
  while (a === b || a > 5);
  const k = 10 - b;
  return {
    prompt: `${a}＋${b}は いくつですか。`,
    answer: num(a + b, `${a}+${b}`),
    point: "10に ちかい ほうに あわせると らく",
    steps: [
      { title: "まえの かずを わける", body: `${b}は あと ${k}で 10。${a}を ${k}と ${a - k}に わけます。`, back: [B_MAE] },
      { title: "10と のこり", body: `${b}と ${k}で 10、10と ${a - k}で {{${a + b}}} です。` },
    ],
  };
}

function shikaku(r: Rng): QuestionBody {
  const [a, b] = pair(r, false);
  const c = a + b;
  return {
    prompt: `□に はいる かずは いくつですか。\n${a}＋□＝${c}`,
    answer: num(b, `${c}-${a}`),
    point: "10を まん中に して かんがえる",
    steps: [
      { title: "10まで", body: `${a}から 10までは ${10 - a}。`, back: [B_10] },
      { title: "10から", body: `10から ${c}までは ${c - 10}。あわせて ${10 - a}＋${c - 10}＝{{${b}}}。□は ${b}です。`, trap: `${a}＋${c} と たさない。` },
    ],
  };
}

export const E_MATH_1_KURIAGARI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小1",
  minutes: 7,
  review: { status: "draft" },
  sections: [
    {
      title: "10を つくって たす",
      lead: "つぎの もんだいに こたえなさい。",
      style: "calc",
      questions: [
        { id: "keisan", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: keisan },
        { id: "ato", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: ato },
        { id: "wakekata", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "思考・判断・表現", generate: wakekata },
        { id: "mae-wake", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "知識・技能", generate: maeWake },
      ],
    },
    {
      title: "ぶんしょうの もんだいと □",
      lead: "つぎの もんだいに こたえなさい。",
      style: "word",
      questions: [
        { id: "bun", type: "A", difficulty: 2, points: 17, seconds: 75, skill: "思考・判断・表現", generate: bun },
        { id: "shikaku", type: "A", difficulty: 3, points: 21, seconds: 90, skill: "思考・判断・表現", generate: shikaku },
      ],
    },
  ],
};
