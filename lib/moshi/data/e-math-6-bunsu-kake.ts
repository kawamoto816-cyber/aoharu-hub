// 小6算数「分数のかけ算」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 分数は約分ずみの真分数・仮分数で作り、答えは約分した分数 (1より大きいときは仮分数、分母1なら整数)。
// calc (問題の数から答えを出す式) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-6-bunsu-kake";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_SEISU = { label: "分数×整数は、分子に整数をかける", href: L(1) };
const BACK_WARI = { label: "分数÷整数は、分母に整数をかける", href: L(2) };
const BACK_BUN = { label: "分数×分数は、1/3 あたりを出して2つ分", href: L(3) };
const BACK_ZU = { label: "面積図で見ると、マスの大きさはそろっている", href: L(4) };
const BACK_YAKU = { label: "かける前に約分すると楽", href: L(5) };
const BACK_CHIISAI = { label: "1より小さい数をかけると、積は小さくなる", href: L(6) };

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
const fr = (n: number, d: number) => {
  const g = gcd(n, d);
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
};
const num = (answer: string, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [answer], calc, ...(unit ? { unit } : {}) });
function choice(r: Rng, right: [string, string], wrongs: [string, string][]): ChoiceQ {
  const all = r.shuffle([{ t: right[0], w: right[1], ok: true }, ...wrongs.map(([t, w]) => ({ t, w, ok: false }))]);
  return { kind: "choice", options: all.map((x) => x.t), correct: all.findIndex((x) => x.ok), why: all.map((x) => x.w) };
}
/** 約分ずみの分数 n/d (分子は maxN 以下、整数にならない) */
function frac(r: Rng, ds: number[], maxN: number): [number, number] {
  for (;;) {
    const d = r.pick(ds);
    const n = r.int(1, maxN);
    if (gcd(n, d) === 1 && n % d !== 0) return [n, d];
  }
}
const DS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12];

function kakeSeisu(r: Rng): QuestionBody {
  const [n, d] = frac(r, DS, 11);
  const k = r.int(2, 9);
  const ans = fr(n * k, d);
  return {
    prompt: `${n}/${d}×${k} を計算しなさい。`,
    answer: num(ans, `${n}/${d}*${k}`),
    point: "分母はそのまま、分子に整数をかける",
    steps: [{ title: "分子にかける", body: `${n}/${d}×${k}＝${n}×${k}/${d}＝${n * k}/${d}${ans === `${n * k}/${d}` ? "" : `＝${ans}`}。答えは {{${ans}}} です。`, trap: "分母にもかけない。1/" + d + " の何こ分かがふえるだけです。", back: [BACK_SEISU] }],
  };
}

function wariSeisu(r: Rng): QuestionBody {
  const [n, d] = frac(r, DS, 11);
  const k = r.int(2, 9);
  const ans = fr(n, d * k);
  return {
    prompt: `${n}/${d}÷${k} を計算しなさい。`,
    answer: num(ans, `${n}/${d}/${k}`),
    point: "分子はそのまま、分母に整数をかける",
    steps: [{ title: "分母にかける", body: `${n}/${d}÷${k}＝${n}/${d}×${k}＝${n}/${d * k}${ans === `${n}/${d * k}` ? "" : `＝${ans}`}。答えは {{${ans}}} です。`, trap: "分子を整数でわれないときも、分母にかければ計算できます。", back: [BACK_WARI] }],
  };
}

function bunBun(r: Rng): QuestionBody {
  const [a, b] = frac(r, DS, 9);
  const [c, d] = frac(r, DS, 9);
  const ans = fr(a * c, b * d);
  return {
    prompt: `${a}/${b}×${c}/${d} を計算しなさい。`,
    answer: num(ans, `${a}/${b}*${c}/${d}`),
    point: "分母どうし、分子どうしをかける",
    steps: [
      { title: "分母どうし・分子どうし", body: `${a}×${c}/${b}×${d}＝${a * c}/${b * d} です。`, back: [BACK_BUN, BACK_ZU] },
      { title: "約分", body: `${a * c}/${b * d}${ans === `${a * c}/${b * d}` ? " はこれ以上約分できません" : `＝${ans}`}。答えは {{${ans}}} です。`, back: [BACK_YAKU] },
    ],
  };
}

function mittsu(r: Rng): QuestionBody {
  for (;;) {
    const [a, b] = frac(r, [3, 4, 5, 6, 7, 8, 9, 10], 9);
    const [c, d] = frac(r, [3, 4, 5, 6, 7, 8, 9, 10], 9);
    const [e, g] = frac(r, [3, 4, 5, 6, 7, 8, 9, 10], 9);
    const N = a * c * e;
    const D = b * d * g;
    if (gcd(N, D) < 4) continue; // 約分が必要な組
    const ans = fr(N, D);
    return {
      prompt: `${a}/${b}×${c}/${d}×${e}/${g} を計算しなさい。`,
      answer: num(ans, `${a}/${b}*${c}/${d}*${e}/${g}`),
      point: "かける前に、分母と分子で約分してから計算",
      steps: [
        { title: "1つの分数にまとめる", body: `${a}×${c}×${e}/${b}×${d}×${g} とまとめ、かける前に、分母と分子に共通な数で約分します。`, back: [BACK_YAKU] },
        { title: "答え", body: `約分してからかけると、{{${ans}}} です。`, trap: `先に全部かけて ${N}/${D} にすると、約分がたいへんでまちがえやすい。` },
      ],
    };
  }
}

function penki(r: Rng): QuestionBody {
  const [a, b] = frac(r, [2, 3, 4, 5, 6, 8], 7);
  const [c, d] = frac(r, [2, 3, 4, 5, 6, 8], 15);
  const ans = fr(a * c, b * d);
  return {
    prompt: `1dLで ${a}/${b}m² のかべをぬれるペンキがあります。このペンキ ${c}/${d}dL では、何m²ぬれますか。`,
    answer: num(ans, `${a}/${b}*${c}/${d}`, "m²"),
    point: "1dLあたりの面積×dL（分数でもかけ算）",
    steps: [
      { title: "式をたてる", body: `1dLあたり ${a}/${b}m² の ${c}/${d}つ分なので、${a}/${b}×${c}/${d} です。`, back: [BACK_BUN] },
      { title: "計算", body: `${a * c}/${b * d}${ans === `${a * c}/${b * d}` ? "" : `＝${ans}`}。答えは {{${ans}}}m² です。`, back: [BACK_YAKU] },
    ],
  };
}

function chiisai(r: Rng): QuestionBody {
  const base = r.int(6, 30);
  const lt = r.pick([[2, 3], [3, 4], [4, 5], [5, 6], [7, 8], [3, 5], [5, 9]]);
  const gt = r.sample([[4, 3], [5, 4], [7, 6], [9, 8], [3, 2], [8, 5]], 2);
  const small = r.bool();
  const one = r.pick([[3, 3], [5, 5], [4, 4]]);
  const o = (p: number[]) => `${base}×${p[0]}/${p[1]}`;
  if (small)
    return {
      prompt: `次の式のうち、積が ${base} より小さくなるものはどれですか。`,
      answer: choice(r, [o(lt), `かける数 ${lt[0]}/${lt[1]} は1より小さいので、積は ${base} より小さくなります。`], [
        ...gt.map((p) => [o(p), `かける数 ${p[0]}/${p[1]} は1より大きいので、積は ${base} より大きくなります。`] as [string, string]),
        [o(one), `${one[0]}/${one[1]}＝1 なので、積は ${base} のままです。`],
      ]),
      point: "かける数が1より小さいと、積はかけられる数より小さい",
      steps: [{ title: "かける数を1と比べる", body: "分子が分母より小さい分数は1より小さく、{{かけると積は小さく}}なります。", back: [BACK_CHIISAI] }],
    };
  const big = gt[0];
  return {
    prompt: `次の式のうち、積が ${base} より大きくなるものはどれですか。`,
    answer: choice(r, [o(big), `かける数 ${big[0]}/${big[1]} は1より大きいので、積は ${base} より大きくなります。`], [
      [o(lt), `かける数 ${lt[0]}/${lt[1]} は1より小さいので、積は ${base} より小さくなります。`],
      [o(one), `${one[0]}/${one[1]}＝1 なので、積は ${base} のままです。`],
      [`${base}×1/2`, `1/2 は1より小さいので、積は ${base} の半分になります。`],
    ]),
    point: "かける数が1より大きいときだけ、積は大きくなる",
    steps: [{ title: "かける数を1と比べる", body: "分子が分母より大きい分数は1より大きく、{{かけると積は大きく}}なります。", back: [BACK_CHIISAI] }],
  };
}

function taibunsu(r: Rng): QuestionBody {
  for (;;) {
    const w = r.int(1, 3);
    const [p, q] = frac(r, [2, 3, 4, 5], 4);
    const [a, b] = frac(r, [3, 4, 5, 6, 8, 9], 8);
    if (p >= q || a >= b) continue;
    const N = (w * q + p) * a;
    const D = q * b;
    const ans = fr(N, D);
    return {
      prompt: `たて ${a}/${b}m、横 ${w}と${p}/${q}m の長方形の花だんの面積は何m²ですか。答えは約分し、1より大きいときは仮分数で答えなさい。`,
      answer: num(ans, `${a}/${b}*(${w}+${p}/${q})`, "m²"),
      point: "帯分数は仮分数に直してからかける",
      steps: [
        { title: "仮分数に直す", body: `${w}と${p}/${q}＝${w * q + p}/${q} です。`, back: [BACK_BUN] },
        { title: "かけて約分", body: `${a}/${b}×${w * q + p}/${q}＝${N}/${D}${ans === `${N}/${D}` ? "" : `＝${ans}`}。答えは {{${ans}}}m² です。`, trap: `整数の${w}だけ、分数の${p}/${q}だけにかけて終わらない。仮分数にすると一度で計算できます。`, back: [BACK_YAKU, BACK_ZU] },
      ],
    };
  }
}

export const E_MATH_6_BUNSU_KAKE_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小6",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "分数と整数・分数と分数",
      lead: "次の計算をしなさい。答えは約分し、1より大きいときは仮分数で答えなさい。",
      style: "calc",
      questions: [
        { id: "kake-seisu", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: kakeSeisu },
        { id: "wari-seisu", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: wariSeisu },
        { id: "bun-bun", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: bunBun },
      ],
    },
    {
      title: "約分のくふう・文章題・積の大きさ",
      lead: "次の問いに答えなさい。答えは約分し、1より大きいときは仮分数で答えなさい。",
      style: "mix",
      questions: [
        { id: "mittsu", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "知識・技能", generate: mittsu },
        { id: "penki", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "思考・判断・表現", generate: penki },
        { id: "chiisai", type: "A", difficulty: 2, points: 15, seconds: 60, skill: "思考・判断・表現", generate: chiisai },
      ],
    },
    {
      title: "帯分数をふくむ面積",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "taibunsu", type: "A", difficulty: 3, points: 19, seconds: 150, skill: "思考・判断・表現", generate: taibunsu }],
    },
  ],
};
