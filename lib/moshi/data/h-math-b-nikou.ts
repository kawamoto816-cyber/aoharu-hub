// 数学B「二項分布と正規分布」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 二項分布の確率は nCr pʳ(1−p)ⁿ⁻ʳ、平均 np・分散 np(1−p) を calc・equations に書く。
//   正規分布の確率は、問題文に書いた正規分布表の値 u(z)＝P(0≦Z≦z) だけを使い、答えは % (小数第1位まで) で、
//   calc に (0.5−u(z))×100 などの式を書く。正規近似は np(1−p) が平方数になる (n, p) だけを使う。
//   scripts/check-moshi.ts がシード1〜100で calc・equations と答えを照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-b-nikou";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "二項分布：n 回のうち r 回成功する確率");
const S2 = L(2, "平均 np、分散 np(1−p)");
const S3 = L(3, "正規分布：平均を中心にした左右対称の山");
const S4 = L(4, "標準化：Z＝(X−m)/σ で表を使う");
const S5 = L(5, "二項分布の正規近似");

const D = (s: string | number) => String(s).replace(/-/g, "−");
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const fr = (n: number, d: number) => {
  const g = gcd(n, d) * (d < 0 ? -1 : 1);
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
};
const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));
const C = (n: number, r: number) => fact(n) / (fact(r) * fact(n - r));
const r2 = (x: number) => String(Math.round(x * 100) / 100);
const r4 = (x: number) => String(Math.round(x * 1000) / 1000);

/** 正規分布表 u(z)＝P(0≦Z≦z) (検査の都合で小数第3位までに丸めた値を問題文に書く) */
const UZ: Record<string, number> = { "0.5": 0.191, "1": 0.341, "1.5": 0.433, "2": 0.477, "2.5": 0.494 };
const ZS = [0.5, 1, 1.5, 2, 2.5];
const hyo = (zs: number[]) => `ただし、標準正規分布 N(0, 1) にしたがう Z について、${[...new Set(zs)].sort((a, b) => a - b).map((z) => `P(0≦Z≦${z})＝${UZ[String(z)]}`).join("、")} とする。`;

const PROBS: { s: string; n: number; d: number; ctx: string }[] = [
  { s: "1/2", n: 1, d: 2, ctx: "1枚の硬貨を投げて表が出る" },
  { s: "1/6", n: 1, d: 6, ctx: "1個のさいころを投げて1の目が出る" },
  { s: "1/3", n: 1, d: 3, ctx: "1個のさいころを投げて3の倍数の目が出る" },
  { s: "1/4", n: 1, d: 4, ctx: "当たりの確率が 1/4 のくじを1本引いて当たる" },
  { s: "2/5", n: 2, d: 5, ctx: "成功する確率が 2/5 のシュートを1本打って入る" },
];

function nikou(r: Rng): QuestionBody {
  const p = r.pick(PROBS);
  const n = r.int(3, 5);
  const k = r.int(1, n - 1);
  const num = C(n, k) * p.n ** k * (p.d - p.n) ** (n - k);
  const den = p.d ** n;
  return {
    prompt: `${p.ctx}ことを「成功」とする。この試行を ${n} 回くり返すとき、ちょうど ${k} 回成功する確率を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [fr(num, den)], calc: `${C(n, k)}*(${p.s})^${k}*(1-${p.s})^${n - k}` },
    point: "nCr pʳ(1−p)ⁿ⁻ʳ。どの回に成功するかの選び方 nCr を忘れない",
    steps: [
      { title: "二項分布", body: `成功の回数 X は二項分布 B(${n}, ${p.s}) にしたがいます。`, back: [S1] },
      { title: "式に入れる", body: `P(X＝${k})＝${n}C${k}×(${p.s})^${k}×(${fr(p.d - p.n, p.d)})^${n - k}＝${C(n, k)}×${p.n ** k * (p.d - p.n) ** (n - k)}/${den}＝{{${fr(num, den)}}}。`, trap: `${n}C${k}＝${C(n, k)} をかけ忘れると、決まった順番で成功する1通りだけの確率になる。` },
    ],
  };
}

function heikin(r: Rng): QuestionBody {
  const p = r.pick(PROBS);
  const n = p.d * r.int(5, 60);
  const m = (n * p.n) / p.d;
  const v = fr(n * p.n * (p.d - p.n), p.d * p.d);
  return {
    prompt: `${p.ctx}ことを「成功」とする。この試行を ${n} 回くり返すとき、成功する回数 X の期待値 E(X) と分散 V(X) を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(m), v], labels: ["E(X) =", "V(X) ="], equations: [`x=${n}*${p.s}`, `y=${n}*${p.s}*(1-${p.s})`] },
    point: "B(n, p) の平均 np、分散 np(1−p)",
    steps: [
      { title: "二項分布", body: `X は B(${n}, ${p.s}) にしたがいます。`, back: [S1] },
      { title: "公式", body: `E(X)＝${n}×${p.s}＝{{${m}}}、V(X)＝${n}×${p.s}×${fr(p.d - p.n, p.d)}＝{{${v}}}。`, back: [S2], trap: "分散に (1−p) をかけ忘れると、期待値と同じ値になってしまう。" },
    ],
  };
}

function seiki(r: Rng): QuestionBody {
  const m = r.int(10, 30) * 5;
  const s = r.pick([4, 5, 6, 8, 10, 12, 15]);
  const z = r.pick(ZS);
  const kind = r.int(0, 2);
  const uz = UZ[String(z)];
  if (kind === 2) {
    const z2 = r.pick(ZS.filter((x) => x !== z));
    const u2 = UZ[String(z2)];
    const lo = m - z * s;
    const hi = m + z2 * s;
    return {
      prompt: `確率変数 X が正規分布 N(${m}, ${s}²) にしたがうとき、P(${lo}≦X≦${hi}) は何% ですか。${hyo([z, z2])}`,
      answer: { kind: "num", answerKind: "num", answer: [r2((uz + u2) * 100)], calc: `(${uz}+${u2})*100`, unit: "%" },
      point: "Z＝(X−m)/σ に直し、0 の左右に分けて表を使う",
      steps: [
        { title: "標準化", body: `Z＝(X−${m})/${s} とすると、X＝${lo} は Z＝${D(-z)}、X＝${hi} は Z＝${z2}。`, back: [S4] },
        { title: "左右に分ける", body: `P(${D(-z)}≦Z≦${z2})＝P(0≦Z≦${z})＋P(0≦Z≦${z2})＝${uz}＋${u2}＝${r4(uz + u2)}。{{${r2((uz + u2) * 100)}%}}。`, back: [S3], trap: "負の側は、左右対称なので P(0≦Z≦" + z + ") と同じ。" },
      ],
    };
  }
  const up = kind === 0;
  const x = up ? m + z * s : m - z * s;
  return {
    prompt: `確率変数 X が正規分布 N(${m}, ${s}²) にしたがうとき、P(X${up ? "≧" : "≦"}${x}) は何% ですか。${hyo([z])}`,
    answer: { kind: "num", answerKind: "num", answer: [r2((0.5 - uz) * 100)], calc: `(0.5-${uz})*100`, unit: "%" },
    point: "片側は 0.5 から表の値をひく",
    steps: [
      { title: "標準化", body: `Z＝(X−${m})/${s} とすると、X＝${x} のとき Z＝${up ? z : D(-z)}。`, back: [S4] },
      { title: "表を使う", body: `P(Z${up ? "≧" : "≦"}${up ? z : D(-z)})＝0.5−P(0≦Z≦${z})＝0.5−${uz}＝${r4(0.5 - uz)}。{{${r2((0.5 - uz) * 100)}%}}。`, back: [S3], trap: "表の値 " + uz + " そのものは 0〜z の間の確率。端の側を求めるときは 0.5 からひく。" },
    ],
  };
}

const APPROX: { n: number; p: string; pn: number; pd: number; ctx: string }[] = [
  { n: 100, p: "1/2", pn: 1, pd: 2, ctx: "1枚の硬貨を 100 回投げて表が出る" },
  { n: 400, p: "1/2", pn: 1, pd: 2, ctx: "1枚の硬貨を 400 回投げて表が出る" },
  { n: 900, p: "1/2", pn: 1, pd: 2, ctx: "1枚の硬貨を 900 回投げて表が出る" },
  { n: 180, p: "1/6", pn: 1, pd: 6, ctx: "1個のさいころを 180 回投げて1の目が出る" },
  { n: 720, p: "1/6", pn: 1, pd: 6, ctx: "1個のさいころを 720 回投げて6の目が出る" },
  { n: 450, p: "1/3", pn: 1, pd: 3, ctx: "1個のさいころを 450 回投げて3の倍数の目が出る" },
  { n: 288, p: "1/3", pn: 1, pd: 3, ctx: "1個のさいころを 288 回投げて5以上の目が出る" },
  { n: 225, p: "1/5", pn: 1, pd: 5, ctx: "当たりの確率が 1/5 のくじを 225 回引いて当たる" },
  { n: 1600, p: "1/5", pn: 1, pd: 5, ctx: "発芽する確率が 1/5 の種を 1600 個まいて発芽する" },
  { n: 400, p: "1/5", pn: 1, pd: 5, ctx: "当たりの確率が 1/5 のくじを 400 回引いて当たる" },
];
const sq = (v: number) => Math.round(Math.sqrt(v));

function kinji(r: Rng): QuestionBody {
  const a = r.pick(APPROX);
  const m = (a.n * a.pn) / a.pd;
  const s = sq((a.n * a.pn * (a.pd - a.pn)) / (a.pd * a.pd));
  const z = r.pick(ZS.filter((x) => Number.isInteger(x * s)));
  const uz = UZ[String(z)];
  const x = m + z * s;
  return {
    prompt: `${a.ctx}回数を X とする。X が ${x} 回以上になる確率は、正規分布で近似するとおよそ何% ですか。${hyo([z])}`,
    answer: { kind: "num", answerKind: "num", answer: [r2((0.5 - uz) * 100)], calc: `(0.5-${uz})*100`, unit: "%" },
    point: "B(n, p) は N(np, np(1−p)) で近似できる",
    steps: [
      { title: "平均と標準偏差", body: `X は B(${a.n}, ${a.p}) にしたがい、m＝${m}、σ＝√{${a.n}×${a.p}×${fr(a.pd - a.pn, a.pd)}}＝${s}。`, back: [S2, S5] },
      { title: "標準化", body: `Z＝(X−${m})/${s} とすると、X＝${x} は Z＝${z}。`, back: [S4] },
      { title: "表を使う", body: `P(Z≧${z})＝0.5−${uz}＝${r4(0.5 - uz)}。およそ {{${r2((0.5 - uz) * 100)}%}}。`, trap: "σ は分散の平方根。分散 " + s * s + " で割らない。" },
    ],
  };
}

function josei(r: Rng): QuestionBody {
  const m = r.int(10, 16) * 5;
  const s = r.pick([4, 6, 8, 10, 12]);
  const z = r.pick(ZS);
  const uz = UZ[String(z)];
  const pct = r2((0.5 - uz) * 100);
  const N = r.pick([200, 400, 500, 1000]);
  return {
    prompt: `${N}人が受けたテストの得点は、平均 ${m} 点、標準偏差 ${s} 点の正規分布にしたがうとみなせる。得点の高いほうから ${pct}% に入るのは、何点以上の人ですか。${hyo([z])}`,
    answer: { kind: "num", answerKind: "num", answer: [String(m + z * s)], calc: `${m}+${z}*${s}`, unit: "点" },
    point: "上位の割合から z を表で探し、X＝m＋zσ にもどす",
    steps: [
      { title: "z を探す", body: `P(Z≧z)＝${pct}% なら P(0≦Z≦z)＝0.5−${r4(0.5 - uz)}＝${uz}。表から {{z＝${z}}}。`, back: [S4] },
      { title: "得点にもどす", body: `X＝${m}＋${z}×${s}＝{{${m + z * s}}}（点）。`, back: [S3], trap: `受けた人数 ${N} は答えに関係しない。割合だけで決まる。` },
    ],
  };
}

function hani(r: Rng): QuestionBody {
  const a = r.pick(APPROX);
  const m = (a.n * a.pn) / a.pd;
  const s = sq((a.n * a.pn * (a.pd - a.pn)) / (a.pd * a.pd));
  const ok = ZS.filter((x) => Number.isInteger(x * s));
  const z1 = r.pick(ok);
  const z2 = r.pick(ok);
  const u1 = UZ[String(z1)];
  const u2 = UZ[String(z2)];
  const lo = m - z1 * s;
  const hi = m + z2 * s;
  return {
    prompt: `${a.ctx}回数を X とする。X が ${lo} 回以上 ${hi} 回以下になる確率は、正規分布で近似するとおよそ何% ですか。${hyo([z1, z2])}`,
    answer: { kind: "num", answerKind: "num", answer: [r2((u1 + u2) * 100)], calc: `(${u1}+${u2})*100`, unit: "%" },
    point: "np と √{np(1−p)} を出し、両端を Z に直す",
    steps: [
      { title: "平均と標準偏差", body: `m＝${a.n}×${a.p}＝${m}、σ＝√{${a.n}×${a.p}×${fr(a.pd - a.pn, a.pd)}}＝${s}。`, back: [S2, S5] },
      { title: "両端を Z に", body: `X＝${lo} は Z＝${D(-z1)}、X＝${hi} は Z＝${z2}。`, back: [S4] },
      { title: "表を使う", body: `P(${D(-z1)}≦Z≦${z2})＝${u1}＋${u2}＝${r4(u1 + u2)}。およそ {{${r2((u1 + u2) * 100)}%}}。`, back: [S3], trap: "0 をまたぐ範囲は、左と右の表の値をたす。ひかない。" },
    ],
  };
}

export const H_MATH_B_NIKOU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学B",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "二項分布",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "nikou", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: nikou },
        { id: "heikin", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: heikin },
      ],
    },
    {
      title: "正規分布と正規近似",
      lead: "次の問いに答えなさい。答えが % のときは、小数第1位まで答えなさい。",
      style: "calc",
      questions: [
        { id: "seiki", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: seiki },
        { id: "kinji", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "知識・技能", generate: kinji },
        { id: "josei", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: josei },
        { id: "hani", type: "A", difficulty: 3, points: 24, seconds: 180, skill: "思考・判断・表現", generate: hani },
      ],
    },
  ],
};
