// 小2算数「たし算の筆算」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 2けた＋2けた (答えは 100 未満)・2けた＋1けたを rng から作り、くり上がりの有無を一のくらいの和で決める。
// num は calc (たし算そのもの・□は ひき算) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
// 選択肢は、よくある まちがい (くり上げた1をわすれる・13 をそのまま書く) から作り、同じ値はのぞいて r で並べかえる。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-2-tashi-hissan";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_TABA = L(1, "10の たばと ばらで 考える");
const B_SOROE = L(2, "くらいを そろえて 書く");
const B_KURI = L(3, "くり上がりの しかた");
const B_IREKAE = L(4, "入れかえて たしかめる");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });
/** items の先頭が正解。同じ文字の選択肢はのぞき、r で並べかえる */
function choice(r: Rng, items: [string, string][]): ChoiceQ {
  const seen = new Set<string>();
  const its = items.filter(([o]) => !seen.has(o) && !!seen.add(o));
  const order = r.shuffle(its.map((_, i) => i));
  return { kind: "choice", options: order.map((i) => its[i][0]), why: order.map((i) => its[i][1]), correct: order.indexOf(0) };
}

/** 2けた＋2けた。carry: 一のくらいで くり上がる。和は 100 未満 */
function pair(r: Rng, carry: boolean): [number, number] {
  for (;;) {
    const a = r.int(11, 89);
    const b = r.int(11, 89);
    const c = (a % 10) + (b % 10) >= 10;
    if (a + b < 100 && c === carry && a % 10 !== 0 && b % 10 !== 0) return [a, b];
  }
}

const steps = (a: number, b: number) => {
  const o = (a % 10) + (b % 10);
  const t1 = Math.floor(a / 10);
  const t2 = Math.floor(b / 10);
  if (o < 10)
    return [
      { title: "一のくらい", body: `${a % 10}＋${b % 10}＝${o}。一のくらいに ${o}を 書きます。`, back: [B_SOROE] },
      { title: "十のくらい", body: `${t1}＋${t2}＝${t1 + t2}。答えは {{${a + b}}} です。` },
    ];
  return [
    { title: "一のくらい", body: `${a % 10}＋${b % 10}＝${o}。一のくらいに ${o - 10}を 書き、10は 十のくらいへ {{1}} くり上げます。`, back: [B_KURI] },
    { title: "十のくらい", body: `くり上げた 1と あわせて 1＋${t1}${t2 ? `＋${t2}` : ""}＝${1 + t1 + t2}。答えは {{${a + b}}} です。`, trap: "くり上げた 1を たしわすれない。" },
  ];
};

function nashi(r: Rng): QuestionBody {
  const [a, b] = pair(r, false);
  return { prompt: `筆算《ひっさん》で 計算しなさい。\n${a}＋${b}`, answer: num(a + b, `${a}+${b}`), point: "くらいを そろえて、一のくらいから", steps: steps(a, b) };
}

function ari(r: Rng): QuestionBody {
  const [a, b] = pair(r, true);
  return { prompt: `筆算《ひっさん》で 計算しなさい。\n${a}＋${b}`, answer: num(a + b, `${a}+${b}`), point: "一のくらいが 10を こえたら、十のくらいへ 1 くり上げる", steps: steps(a, b) };
}

function hitoketa(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do {
    a = r.int(12, 89);
    b = r.int(3, 9);
  } while ((a % 10) + b < 10 || a + b >= 100);
  return {
    prompt: `筆算《ひっさん》で 計算しなさい。\n${a}＋${b}`,
    answer: num(a + b, `${a}+${b}`),
    point: "1けたの 数は 一のくらいの 下に 書く",
    steps: [
      { title: "右の はしを そろえる", body: `${b}は ばらが ${b}こ。${a}の 一のくらい ${a % 10}の 下に 書きます。`, trap: `${b}を 十のくらいの 下に 書かない。`, back: [B_SOROE] },
      ...steps(a, b),
    ],
  };
}

function bun(r: Rng): QuestionBody {
  const [a, b] = pair(r, r.bool(0.7));
  const ctx = r.pick([
    { p: `どんぐりを、わたしは ${a}こ、弟は ${b}こ ひろいました。あわせて 何こ ひろいましたか。`, u: "こ" },
    { p: `バスに ${a}人 のって います。つぎの バスていで ${b}人 のって きました。みんなで 何人に なりましたか。`, u: "人" },
    { p: `色紙が ${a}まい あります。${b}まい もらうと、ぜんぶで 何まいに なりますか。`, u: "まい" },
  ]);
  return {
    prompt: ctx.p,
    answer: num(a + b, `${a}+${b}`, ctx.u),
    point: "「あわせて」「ふえると」は たし算",
    steps: [{ title: "しきを 書く", body: `あわせる・ふえるので たし算。しきは ${a}＋${b}。`, back: [B_TABA] }, ...steps(a, b)],
  };
}

function machigai(r: Rng): QuestionBody {
  const [a, b] = pair(r, true);
  const o = (a % 10) + (b % 10);
  const t = Math.floor(a / 10) + Math.floor(b / 10);
  return {
    prompt: `${a}＋${b}の 答えは どれですか。`,
    answer: choice(r, [
      [String(a + b), `一のくらい ${o - 10}、十のくらいは くり上げた 1と あわせて ${t + 1}。${a + b}です。`],
      [String(a + b - 10), `くり上げた 1を たしわすれて います。十のくらいは ${t}では なく ${t + 1}です。`],
      [`${t}${o}`, `一のくらいの ${o}を そのまま 書いて います。1つの くらいに 書ける 数字は 1つです。`],
      [String(a + b + 10), `十のくらいに 1を 2回 たして います。`],
    ]),
    point: "くり上げた 1を わすれない",
    steps: steps(a, b),
  };
}

function irekae(r: Rng): QuestionBody {
  const [a, b] = pair(r, r.bool());
  const c = a + b;
  return {
    prompt: `${a}＋${b}＝${c} の 答えが 正しいか たしかめます。どの 計算で たしかめると よいですか。`,
    answer: choice(r, [
      [`${b}＋${a}`, `たす じゅんを 入れかえても 答えは 同じ。${b}＋${a}も ${c}に なれば 正しいです。`],
      [`${c}＋${b}`, `${c}＋${b}は ${c + b}。たしかめには なりません。`],
      [`${a}＋${a}`, `${a}＋${a}は ${b}を つかって いません。`],
      [`${c}＋${a}`, `答えに さらに たして しまって います。`],
    ]),
    point: "たす じゅんを 入れかえて たしかめる",
    steps: [{ title: "入れかえて たしかめる", body: `たす じゅんを 入れかえても 答えは 同じです。{{${b}＋${a}}}を 計算して ${c}に なれば 正しい。`, back: [B_IREKAE] }],
  };
}

function mushikui(r: Rng): QuestionBody {
  const [a, b] = pair(r, true);
  const c = a + b;
  const t = Math.floor(a / 10);
  const o = a % 10;
  return {
    prompt: `□に 入る 数字は 何ですか。\n${t}□＋${b}＝${c}`,
    answer: num(o, `${c}-${b}-${t * 10}`),
    point: "答えから ひいて、もとの 数を 見つける",
    steps: [
      { title: "ひき算で もとの 数を 出す", body: `${t}□は、${c}から ${b}を ひいた 数です。${c}−${b}＝${a}。`, back: [B_IREKAE] },
      { title: "□を 読む", body: `${a}の 一のくらいなので、□は {{${o}}} です。` },
      { title: "たしかめる", body: `${a}＋${b}＝${c}。${b}＋${a}も ${c}に なり、あって います。`, back: [B_IREKAE] },
    ],
  };
}

export const E_MATH_2_TASHI_HISSAN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小2",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    {
      title: "筆算《ひっさん》で 計算する",
      lead: "つぎの 計算を しなさい。",
      style: "calc",
      questions: [
        { id: "nashi", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: nashi },
        { id: "ari", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: ari },
        { id: "hitoketa", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: hitoketa },
      ],
    },
    {
      title: "文しょうの もんだい・まちがいを 見つける",
      lead: "つぎの もんだいに 答えなさい。",
      style: "mix",
      questions: [
        { id: "bun", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "思考・判断・表現", generate: bun },
        { id: "machigai", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "思考・判断・表現", generate: machigai },
        { id: "irekae", type: "A", difficulty: 2, points: 15, seconds: 60, skill: "知識・技能", generate: irekae },
      ],
    },
    {
      title: "□に 入る 数",
      lead: "つぎの もんだいに 答えなさい。",
      style: "mix",
      questions: [
        { id: "mushikui", type: "A", difficulty: 3, points: 19, seconds: 150, skill: "思考・判断・表現", generate: mushikui },
      ],
    },
  ],
};
