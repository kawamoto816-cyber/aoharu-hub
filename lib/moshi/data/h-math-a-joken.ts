// 数学A「条件付き確率」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: P_A(B)＝n(A∩B)/n(A) や乗法定理の式を、問題の数から calc に書く。答えは既約分数 (fr で約分)。
// さいころは36通りを全部調べて数える。scripts/check-moshi.ts がシード1〜100で calc と答えを照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-a-joken";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const BACK_BUNBO = L(1, "条件があると、分母が変わる");
const BACK_SHIKI = L(2, "条件付き確率の式");
const BACK_JOHO = L(3, "乗法定理：続けて起こる確率");
const BACK_GENIN = L(4, "原因の確率");
const BACK_BAYES = L(5, "ベイズの考え方");

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const fr = (n: number, d: number) => {
  const g = gcd(n, d);
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
};

const CTX = ["めがねをかけている", "自転車で通学している", "運動部に入っている"];
function hyou(r: Rng): QuestionBody {
  const yes = r.pick(CTX);
  const m = r.int(15, 25);
  const w = r.int(15, 25);
  const gm = r.int(4, m - 4);
  const gw = r.int(4, w - 4);
  const N = m + w;
  const askGirl = r.bool();
  const table = `男子${m}人のうち${yes}人は${gm}人、女子${w}人のうち${yes}人は${gw}人である。`;
  if (askGirl) {
    return {
      prompt: `ある学年の生徒${N}人について調べたところ、${table}この中から1人を選ぶとき、選んだ生徒が女子であったときに、その生徒が${yes}確率を求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [fr(gw, w)], calc: `${gw}/${w}` },
      point: "「女子であったとき」なので、全体を女子にしぼる",
      steps: [
        { title: "全体をしぼる", body: `条件「女子」で、考える全体は{{女子${w}人}}になります。`, back: [BACK_BUNBO] },
        { title: "しぼった中で数える", body: `その中で${yes}人は${gw}人なので、${gw}/${w}＝{{${fr(gw, w)}}}。`, trap: `分母を全員の${N}人にすると、「女子で、しかも${yes}」確率 P(A∩B) になってしまう。` },
      ],
    };
  }
  const g = gm + gw;
  return {
    prompt: `ある学年の生徒${N}人について調べたところ、${table}この中から1人を選ぶとき、選んだ生徒が${yes}人であったときに、その生徒が男子である確率を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [fr(gm, g)], calc: `${gm}/(${gm}+${gw})` },
    point: "条件の側（分母）がどちらかを、先に決める",
    steps: [
      { title: "全体をしぼる", body: `条件は「${yes}」なので、全体は ${gm}＋${gw}＝{{${g}人}}。`, back: [BACK_BUNBO] },
      { title: "しぼった中で数える", body: `そのうち男子は${gm}人なので、${gm}/${g}＝{{${fr(gm, g)}}}。`, trap: `${gm}/${m} は「男子であったときに${yes}」確率で、条件が逆です。`, back: [BACK_SHIKI] },
    ],
  };
}

const PAIRS = Array.from({ length: 36 }, (_, i) => [Math.floor(i / 6) + 1, (i % 6) + 1] as const);
const CONDS: [string, (a: number, b: number) => boolean][] = [
  ["出た目の和が偶数", (a, b) => (a + b) % 2 === 0],
  ["出た目の和が8以上", (a, b) => a + b >= 8],
  ["出た目の和が7以下", (a, b) => a + b <= 7],
  ["少なくとも一方の目が6", (a, b) => a === 6 || b === 6],
  ["出た目の積が偶数", (a, b) => (a * b) % 2 === 0],
];
const EVS: [string, (a: number, b: number) => boolean][] = [
  ["大の目が4以上である", (a) => a >= 4],
  ["2つの目が同じである", (a, b) => a === b],
  ["大の目が小の目より大きい", (a, b) => a > b],
  ["小の目が奇数である", (_a, b) => b % 2 === 1],
];
function dice(r: Rng): QuestionBody {
  let cond = CONDS[0];
  let ev = EVS[0];
  let nA = 0;
  let nAB = 0;
  for (let i = 0; i < 30; i++) {
    cond = r.pick(CONDS);
    ev = r.pick(EVS);
    nA = PAIRS.filter(([a, b]) => cond[1](a, b)).length;
    nAB = PAIRS.filter(([a, b]) => cond[1](a, b) && ev[1](a, b)).length;
    if (nAB > 0 && nAB < nA) break;
  }
  return {
    prompt: `大小2個のさいころを同時に投げる。${cond[0]}であったとき、${ev[0]}条件付き確率を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [fr(nAB, nA)], calc: `(${nAB}/36)/(${nA}/36)` },
    point: "P_A(B)＝n(A∩B)÷n(A)。36通りの表をしぼる",
    steps: [
      { title: "条件 A の場合の数", body: `36通りのうち「${cond[0]}」は {{${nA}通り}}。これが新しい全体です。`, back: [BACK_BUNBO] },
      { title: "A∩B を数える", body: `そのうち「${ev[0]}」のは {{${nAB}通り}}。`, back: [BACK_SHIKI] },
      { title: "わる", body: `P_A(B)＝${nAB}/${nA}＝{{${fr(nAB, nA)}}}。`, trap: `${nAB}/36 は P(A∩B)。条件付き確率の分母は条件の${nA}通りです。` },
    ],
  };
}

function ryouho(r: Rng): QuestionBody {
  const N = r.int(8, 15);
  const a = r.int(2, Math.min(6, N - 3));
  const h = N - a;
  if (r.bool()) {
    const num = a * (a - 1);
    const den = N * (N - 1);
    return {
      prompt: `当たり${a}本をふくむ${N}本のくじがある。A、B の2人がこの順に1本ずつくじを引く。引いたくじはもとにもどさないとき、2人とも当たる確率を求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [fr(num, den)], calc: `${a}/${N}*${a - 1}/${N - 1}` },
      point: "P(A∩B)＝P(A)×P_A(B)。2本目は残りのくじで考える",
      steps: [
        { title: "A が当たる", body: `P(A が当たる)＝${a}/${N}。`, back: [BACK_JOHO] },
        { title: "A が当たったあと", body: `残り${N - 1}本のうち当たりは${a - 1}本なので、条件付き確率は ${a - 1}/${N - 1}。`, trap: `もどさないので、2本目も ${a}/${N} とはならない。` },
        { title: "乗法定理", body: `${a}/${N}×${a - 1}/${N - 1}＝{{${fr(num, den)}}}。` },
      ],
    };
  }
  const num = h * a;
  const den = N * (N - 1);
  return {
    prompt: `当たり${a}本をふくむ${N}本のくじがある。A、B の2人がこの順に1本ずつくじを引く。引いたくじはもとにもどさないとき、A がはずれ、B が当たる確率を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [fr(num, den)], calc: `${h}/${N}*${a}/${N - 1}` },
    point: "1本目の結果で、2本目の確率が変わる",
    steps: [
      { title: "A がはずれる", body: `はずれは${h}本なので ${h}/${N}。`, back: [BACK_JOHO] },
      { title: "そのあと B が当たる", body: `残り${N - 1}本に当たりは${a}本のままなので ${a}/${N - 1}。` },
      { title: "乗法定理", body: `${h}/${N}×${a}/${N - 1}＝{{${fr(num, den)}}}。` },
    ],
  };
}

function bAtari(r: Rng): QuestionBody {
  const N = r.int(7, 15);
  const a = r.int(2, Math.min(6, N - 3));
  const h = N - a;
  const den = N * (N - 1);
  const x = a * (a - 1);
  const y = h * a;
  return {
    prompt: `当たり${a}本をふくむ${N}本のくじを、A、B の2人がこの順に1本ずつ引く。引いたくじはもとにもどさない。B が当たる確率を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [fr(a, N)], calc: `${a}/${N}*${a - 1}/${N - 1}+${h}/${N}*${a}/${N - 1}` },
    point: "A が当たる・はずれるで場合分けして、たす",
    steps: [
      { title: "A が当たり、B も当たる", body: `${a}/${N}×${a - 1}/${N - 1}＝${x}/${den}。`, back: [BACK_JOHO] },
      { title: "A がはずれ、B が当たる", body: `${h}/${N}×${a}/${N - 1}＝${y}/${den}。` },
      { title: "たす", body: `2つは同時に起こらないので、${x}/${den}＋${y}/${den}＝${x + y}/${den}＝{{${fr(a, N)}}}。A が当たる確率 ${a}/${N} と同じです。`, trap: "後から引くほうが不利・有利ということはない。くじは引く順番によらず公平です。" },
    ],
  };
}

function genin(r: Rng): QuestionBody {
  const p = r.pick([30, 40, 50, 60, 70]);
  const d1 = r.int(1, 5);
  let d2 = r.int(1, 5);
  if (d2 === d1) d2 = d1 === 5 ? 4 : d1 + 1;
  const x = p * d1;
  const y = (100 - p) * d2;
  return {
    prompt: `ある製品は、A工場で全体の${p}%、B工場で残りの${100 - p}%がつくられている。A工場の製品の${d1}%、B工場の製品の${d2}%が不良品である。全体から1個取り出したところ不良品であったとき、それがA工場の製品である確率を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [fr(x, x + y)], calc: `(${p}/100*${d1}/100)/(${p}/100*${d1}/100+${100 - p}/100*${d2}/100)` },
    point: "P(不良品) は工場ごとに場合分けしてたす",
    steps: [
      { title: "10000個で考える", body: `A工場製 ${p * 100}個のうち不良 {{${x}個}}、B工場製 ${(100 - p) * 100}個のうち不良 {{${y}個}}。`, back: [BACK_GENIN] },
      { title: "不良品にしぼる", body: `不良品は ${x}＋${y}＝${x + y}（個）。そのうちA工場製は${x}個なので、${x}/${x + y}＝{{${fr(x, x + y)}}}。`, trap: `${p}/100 や ${d1}/100 は答えではない。条件は「不良品であった」なので、分母は不良品の数です。`, back: [BACK_SHIKI] },
    ],
  };
}

function bayes(r: Rng): QuestionBody {
  const q = r.pick([1, 2, 4, 5]);
  const s = r.pick([90, 95, 98]);
  const f = r.pick([1, 2, 5, 10]);
  const sick = 100 * q;
  const tp = q * s; // 10000人のうち病気で陽性
  const fp = (100 - q) * f; // 病気でないのに陽性
  return {
    prompt: `ある病気にかかっている人の割合は${q}%である。この病気の検査では、かかっている人の${s}%が陽性と判定され、かかっていない人も${f}%が陽性と判定される。検査で陽性と判定された人が、実際にこの病気にかかっている確率を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [fr(tp, tp + fp)], calc: `(${q}/100*${s}/100)/(${q}/100*${s}/100+${100 - q}/100*${f}/100)` },
    point: "陽性は「病気で陽性」と「偽陽性」の合計",
    steps: [
      { title: "10000人で考える", body: `病気の人は${sick}人で、そのうち陽性は {{${tp}人}}。病気でない${10000 - sick}人のうち陽性（偽陽性）は {{${fp}人}}。`, back: [BACK_BAYES] },
      { title: "陽性の人にしぼる", body: `陽性は ${tp}＋${fp}＝${tp + fp}（人）。そのうち病気の人は${tp}人なので、${tp}/${tp + fp}＝{{${fr(tp, tp + fp)}}}。`, trap: `「陽性なら${s}%の確率で病気」ではない。病気の人がもともと少ないと、偽陽性の人数が大きく効きます。`, back: [BACK_SHIKI] },
    ],
  };
}

export const H_MATH_A_JOKEN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学A",
  review: { status: "draft" },
  sections: [
    {
      title: "条件付き確率の基本",
      lead: "次の問いに答えなさい。答えは既約分数で答えなさい。",
      style: "calc",
      questions: [
        { id: "hyou", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: hyou },
        { id: "ryouho", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: ryouho },
        { id: "dice", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "知識・技能", generate: dice },
      ],
    },
    {
      title: "乗法定理と原因の確率",
      lead: "次の問いに答えなさい。答えは既約分数で答えなさい。",
      style: "word",
      questions: [
        { id: "b-atari", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "思考・判断・表現", generate: bAtari },
        { id: "genin", type: "A", difficulty: 2, points: 18, seconds: 180, skill: "思考・判断・表現", generate: genin },
        { id: "bayes", type: "A", difficulty: 3, points: 22, seconds: 240, skill: "思考・判断・表現", generate: bayes },
      ],
    },
  ],
};
