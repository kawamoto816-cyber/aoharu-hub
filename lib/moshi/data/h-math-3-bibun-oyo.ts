// 数学Ⅲ「微分法の応用」の単元模試 (A: 係数を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 接線の式は採点器が式として照合する (y＝k/x の接線は傾き −k/t²、点 (t, k/t) から作る)。速度・加速度は
//   v＝3t²＋2pt＋q、a＝6t＋2p に代入した式を calc に。最大・最小は x＋k/x (k は平方数) の最小値 2√k、
//   x/(x²＋a²) の最大値 1/(2a) を calc に。変曲点は f″＝12(x−r₁)(x−r₂) となる p、q を先に作り equations で照合する。
//   1次近似は a＋h/(2a) (小数3けた以内になる a を使う)、ニュートン法は x₁＝(x₀＋A/x₀)/2 を2回くり返した分数を calc に書く
//   (scripts/check-moshi.ts がシード1〜100で照合する)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-3-bibun-oyo";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "接線と法線");
const S2 = L(2, "f′(x) の符号で増減と極値");
const S3 = L(3, "f″(x) の符号で凹凸と変曲点");
const S5 = L(5, "速度と加速度");
const S6 = L(6, "接線で近似する：1次近似とニュートン法");

const D = (n: number) => (n < 0 ? `−${-n}` : String(n));
const pm = (n: number) => (n < 0 ? `− ${-n}` : `＋ ${n}`);
const pa = (n: number) => (n < 0 ? `(${D(n)})` : String(n));
const nz = (r: Rng, a: number, b: number) => {
  let v = 0;
  while (v === 0) v = r.int(a, b);
  return v;
};
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
function frac(n: number, d: number): string {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d) || 1;
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
}
const F = (s: string) => s.replace(/-/g, "−");
const dec = (x: number) => String(Math.round(x * 1000) / 1000);
const cx = (c: number, m: string, first: boolean) => {
  if (c === 0) return "";
  const a = Math.abs(c);
  const body = m && a === 1 ? m : `${a}${m}`;
  return first ? `${c < 0 ? "−" : ""}${body}` : ` ${c < 0 ? "−" : "＋"} ${body}`;
};

function sessen(r: Rng): QuestionBody {
  const k = nz(r, -12, 12);
  const divs = [1, 2, 3, 4, 6, -1, -2, -3].filter((t) => k % t === 0);
  const t = r.pick(divs);
  const y0 = k / t;
  // y − k/t ＝ (−k/t²)(x − t)  →  y ＝ (−k/t²)x ＋ 2k/t
  const m = frac(-k, t * t);
  const c = 2 * y0;
  const mx = m === "1" ? "x" : m === "-1" ? "-x" : `${m}x`;
  const ans = `${mx}${c >= 0 ? "+" : ""}${c}`;
  return {
    prompt: `曲線 y＝${k}/x 上の点 (${D(t)}, ${D(y0)}) における接線の方程式を、y＝ の形で求めなさい。`.replace(`y＝${k}/x`, `y＝${D(k)}/x`),
    answer: { kind: "num", answerKind: "expr", answer: [ans], labels: ["y ="] },
    point: "y′＝−k/x²。y−f(a)＝f′(a)(x−a)",
    steps: [
      { title: "傾き", body: `y′＝${D(-k)}/x² なので、x＝${D(t)} での傾きは ${F(m)}。`, back: [S1] },
      { title: "接線の式", body: `y − ${pa(y0)}＝${F(m)}(x − ${pa(t)}) を整理して、{{y＝${F(mx)} ${pm(c)}}}。`, trap: "(1/x)′＝−1/x²。符号を落とさない。" },
    ],
  };
}

function sokudo(r: Rng): QuestionBody {
  const p = r.int(-6, 3);
  const q = r.int(-9, 9);
  const T = r.int(1, 4);
  const askA = r.bool(0.4);
  const v = askA ? 6 * T + 2 * p : 3 * T * T + 2 * p * T + q;
  const xs = `t³${cx(p, "t²", false)}${cx(q, "t", false)}`;
  return {
    prompt: `数直線上を動く点 P の時刻 t における位置が x＝${xs} で表されるとき、t＝${T} における P の${askA ? "加速度" : "速度"}を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], calc: askA ? `6*${T}+2*(${p})` : `3*${T}^2+2*(${p})*${T}+(${q})` },
    point: askA ? "加速度は速度をもう一度微分した d²x/dt²" : "速度は位置を時刻で微分した dx/dt",
    steps: [
      { title: "速度", body: `v＝dx/dt＝3t²${cx(2 * p, "t", false)}${cx(q, "", false)}。`, back: [S5] },
      askA
        ? { title: "加速度", body: `a＝dv/dt＝6t${cx(2 * p, "", false)}。t＝${T} を代入して {{${D(v)}}}。`, trap: "位置を1回微分しただけでは速度。加速度はもう1回微分する。" }
        : { title: "代入する", body: `t＝${T} を代入して {{${D(v)}}}。`, trap: "速度は位置の値ではない。x に代入しない。" },
    ],
  };
}

function saidai(r: Rng): QuestionBody {
  if (r.bool()) {
    const s = r.int(1, 7);
    const k = s * s;
    return {
      prompt: `x＞0 のとき、関数 f(x)＝x ＋ ${k}/x の最小値を求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [String(2 * s)], calc: `${s}+${k}/${s}` },
      point: "f′(x)＝0 の前後で符号が − から ＋ なら極小（最小）",
      steps: [
        { title: "微分する", body: `f′(x)＝1 − ${k}/x²＝(x ＋ ${s})(x − ${s})/x²。x＞0 では x＝${s} で 0。`, back: [S2] },
        { title: "増減を調べる", body: `0＜x＜${s} で f′＜0、x＞${s} で f′＞0。最小値は f(${s})＝{{${2 * s}}}。`, trap: "x＝" + s + " は最小値をとる x。答えるのは f の値。" },
      ],
    };
  }
  const a = r.int(1, 6);
  const v = frac(1, 2 * a);
  return {
    prompt: `関数 f(x)＝x/(x² ＋ ${a * a}) の最大値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `${a}/(${a}^2+${a * a})` },
    point: "商の微分で f′ を出し、分子の符号で増減を見る",
    steps: [
      { title: "微分する", body: `f′(x)＝(${a * a} − x²)/(x² ＋ ${a * a})²＝(${a} ＋ x)(${a} − x)/(x² ＋ ${a * a})²。`, back: [S2] },
      { title: "増減を調べる", body: `x＝${a} で f′ が ＋ から − に変わり極大。x→±∞ で f→0 なので最大値は f(${a})＝{{${v}}}。`, trap: "極大値が最大値になることを、x→±∞ の様子で確かめる。" },
    ],
  };
}

function henkyoku(r: Rng): QuestionBody {
  const [r1, r2] = r.sample([-3, -2, -1, 0, 1, 2, 3], 2).sort((x, y) => x - y);
  // f″(x)＝12x²＋6px＋2q ＝ 12(x−r₁)(x−r₂)
  const p = -2 * (r1 + r2);
  const q = 6 * r1 * r2;
  const c = r.int(-5, 5);
  const fx = `x⁴${cx(p, "x³", false)}${cx(q, "x²", false)}${cx(c, "", false)}`;
  return {
    prompt: `関数 f(x)＝${fx} のグラフの変曲点の x 座標をすべて求めなさい。`,
    answer: { kind: "num", answerKind: "roots", answer: [String(r1), String(r2)], labels: ["x =", "x ="], equations: [`12*x^2+6*(${p})*x+2*(${q})=0`] },
    point: "f″(x)＝0 で、前後で符号が変わる点が変曲点",
    steps: [
      { title: "2回微分する", body: `f′(x)＝4x³${cx(3 * p, "x²", false)}${cx(2 * q, "x", false)}、f″(x)＝12x²${cx(6 * p, "x", false)}${cx(2 * q, "", false)}。`, back: [S3] },
      { title: "f″＝0 を解く", body: `f″(x)＝12(x ${pm(-r1)})(x ${pm(-r2)}) なので x＝${D(r1)}、${D(r2)}。前後で f″ の符号が変わるので、どちらも変曲点です。`.replace("(x ＋ 0)", "x").replace("(x − 0)", "x") },
    ],
  };
}

function kinji(r: Rng): QuestionBody {
  const a = r.pick([5, 10, 20, 25, 50]);
  const h = nz(r, -4, 4);
  const v = dec(a + h / (2 * a));
  return {
    prompt: `1次の近似式 f(a＋h)≒f(a)＋f′(a)h を使って、√${a * a + h} の近似値を小数で求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `${a}+(${h})/(2*${a})` },
    point: "f(x)＝√x、a＝" + a * a + " とおく",
    steps: [
      { title: "関数と点を決める", body: `f(x)＝√x、f′(x)＝1/(2√x)。x＝${a * a}、h＝${D(h)} とします。`, back: [S6] },
      { title: "近似する", body: `√${a * a + h}≒${a} ＋ ${pa(h)}/(2・${a})＝{{${v}}}。`, trap: "h は √ の中のずれ。√ の外の値のずれではない。" },
    ],
  };
}

function newton(r: Rng): QuestionBody {
  const A = r.pick([2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20]);
  const x0 = Math.max(1, Math.round(Math.sqrt(A)));
  // x₁＝(x₀² ＋ A)/(2x₀)
  const n1 = x0 * x0 + A;
  const d1 = 2 * x0;
  const g1 = gcd(n1, d1);
  const p = n1 / g1;
  const q = d1 / g1;
  const x1 = frac(p, q);
  const v = frac(p * p + A * q * q, 2 * p * q);
  return {
    prompt: `方程式 x² − ${A}＝0 の正の解の近似値を、ニュートン法 xₙ₊₁＝xₙ − f(xₙ)/f′(xₙ)（f(x)＝x² − ${A}）で求める。x₀＝${x0} から始めるとき、x₂ を分数で求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `((${p}/${q})+${A}/(${p}/${q}))/2` },
    point: "x − (x²−A)/(2x)＝(x＋A/x)/2 をくり返す",
    steps: [
      { title: "漸化式にする", body: `xₙ₊₁＝xₙ − (xₙ² − ${A})/(2xₙ)＝(xₙ ＋ ${A}/xₙ)/2。`, back: [S6] },
      { title: "1回目", body: `x₁＝(${x0} ＋ ${A}/${x0})/2＝${x1}。` },
      { title: "2回目", body: `x₂＝(${x1} ＋ ${A}÷${x1.includes("/") ? `(${x1})` : x1})/2＝{{${v}}}。`, trap: "x₁ を求めて終わりにしない。もう1回くり返す。" },
    ],
  };
}

export const H_MATH_3_BIBUN_OYO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅲ",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "接線と速度",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "sessen", type: "A", difficulty: 1, points: 15, seconds: 90, skill: "知識・技能", generate: sessen },
        { id: "sokudo", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: sokudo },
      ],
    },
    {
      title: "グラフの形",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "saidai", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "思考・判断・表現", generate: saidai },
        { id: "henkyoku", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: henkyoku },
      ],
    },
    {
      title: "近似",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kinji", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: kinji },
        { id: "newton", type: "A", difficulty: 3, points: 22, seconds: 210, skill: "思考・判断・表現", generate: newton },
      ],
    },
  ],
};
