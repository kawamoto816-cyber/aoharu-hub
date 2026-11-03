// 数学Ⅲ「数列の極限」の単元模試 (A: 係数を入れかえる生成型)。問題はすべてオリジナル。
// 検算: ∞/∞ は最高次の係数の比 a/d、指数の比は a/b、√ の差は (a−c)/2、無限等比級数は a/(1−r)、
//   循環小数は (くり返す2けた)/99、部分分数の級数は 1/(a(a＋b)) を、それぞれ calc に書く
//   (scripts/check-moshi.ts がシード1〜100で照合する)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-3-suretsu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S2 = L(2, "∞/∞ と ∞−∞ は「形を変えて」読む");
const S4 = L(4, "rⁿ の極限は r の範囲で4通り");
const S5 = L(5, "無限級数：足し続けた和の行き先");
const S6 = L(6, "無限等比級数は |r|＜1 のとき a/(1−r)");

const D = (n: number) => (n < 0 ? `−${-n}` : String(n));
const pm = (n: number) => (n < 0 ? `− ${-n}` : `＋ ${n}`);
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
const term = (c: number, m: string, first: boolean) => {
  if (c === 0) return "";
  const a = Math.abs(c);
  const body = m && a === 1 ? m : /^[(\d]/.test(m) ? `${a}・${m}` : `${a}${m}`;
  return first ? `${c < 0 ? "−" : ""}${body}` : ` ${c < 0 ? "−" : "＋"} ${body}`;
};

function yuri(r: Rng): QuestionBody {
  const a = nz(r, -5, 5);
  const b = r.int(-6, 6);
  const c = r.int(-6, 6);
  const d = r.pick([1, 2, 3, 4]);
  const e = nz(r, -5, 5);
  const v = frac(a, d);
  const num = `${term(a, "n²", true)}${term(b, "n", false)}${term(c, "", false)}`;
  const den = `${term(d, "n²", true)}${term(e, "", false)}`;
  return {
    prompt: `極限 lim[n→∞] (${num})/(${den}) を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `${a}/${d}` },
    point: "分母の最高次 n² で分子・分母を割る",
    steps: [
      { title: "n² で割る", body: `分子・分母を n² で割ると、(${D(a)}${term(b, "/n", false)}${term(c, "/n²", false)})/(${d}${term(e, "/n²", false)})。`, back: [S2] },
      { title: "極限をとる", body: `1/n、1/n² → 0 なので、{{${F(v)}}}。`, trap: "∞/∞＝1 としない。最高次の係数の比になる。" },
    ],
  };
}

function shisu(r: Rng): QuestionBody {
  const [q, p] = r.sample([2, 3, 4, 5], 2).sort((x, y) => x - y);
  const a = nz(r, -4, 4);
  const b = r.pick([1, 2, 3]);
  const c = nz(r, -3, 3);
  const k = r.int(1, 5);
  const v = frac(a, b);
  const P = (co: number, first: boolean) => term(co, `${p}ⁿ`, first);
  const qp = q * 2 === p ? "1/2" : `${q}/${p}`; // 2/4 は 1/2 と書く
  return {
    prompt: `極限 lim[n→∞] (${P(a, true)}${term(c, `${q}ⁿ`, false)})/(${P(b, true)} ${pm(k)}) を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `${a}/${b}` },
    point: `いちばん大きい底 ${p}ⁿ で割り、(${qp})ⁿ→0 を使う`,
    steps: [
      { title: `${p}ⁿ で割る`, body: `(${D(a)}${term(c, `(${qp})ⁿ`, false)})/(${b} ${pm(k)}/${p}ⁿ)。`, back: [S4] },
      { title: "極限をとる", body: `−1＜${qp}＜1 なので (${qp})ⁿ→0、1/${p}ⁿ→0。極限は {{${F(v)}}}。`, trap: `${q}ⁿ の項を残したままにしない。r の範囲で rⁿ の行き先を判断する。` },
    ],
  };
}

function root(r: Rng): QuestionBody {
  let a = 0;
  let c = 0;
  while (a === c) {
    a = r.int(-6, 8);
    c = r.int(-6, 6);
  }
  const b = r.int(-5, 5);
  const v = frac(a - c, 2);
  const i1 = `n²${term(a, "n", false)}${term(b, "", false)}`;
  const i2 = `n²${term(c, "n", false)}`;
  return {
    prompt: `極限 lim[n→∞] {√(${i1}) − √(${i2})} を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `((${a})-(${c}))/2` },
    point: "∞−∞ は分子の有理化で ∞/∞ の形に変える",
    steps: [
      { title: "有理化する", body: `分子・分母に √(${i1}) ＋ √(${i2}) をかけると、分子は ${term(a - c, "n", true)}${term(b, "", false)}。`, back: [S2] },
      { title: "n で割る", body: `分母は n で割ると √(1＋…)＋√(1＋…) → 2。極限は (${D(a - c)})/2＝{{${F(v)}}}。`, trap: "√ の中の n² の係数が同じなので、差は ∞−∞。そのまま 0 や ∞ としない。" },
    ],
  };
}

function toohi(r: Rng): QuestionBody {
  const [p, q] = r.pick([
    [1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [-1, 2], [-1, 3], [-2, 3], [1, 5], [-1, 4], [2, 5], [-3, 4],
  ] as const);
  const a = r.pick([2, 3, 4, 6, 8, 9, 12, 15]);
  const v = frac(a * q, q - p);
  const t2 = frac(a * p, q);
  const t3 = frac(a * p * p, q * q);
  return {
    prompt: `無限等比級数 ${a} ＋ (${F(t2)}) ＋ (${F(t3)}) ＋ … の和を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `${a}/(1-(${p}/${q}))` },
    point: "|r|＜1 を確かめてから、和 a/(1−r)",
    steps: [
      { title: "初項と公比", body: `初項 ${a}、公比 r＝${F(frac(p, q))}。|r|＜1 なので収束します。`, back: [S6] },
      { title: "和を出す", body: `${a}/(1 − (${F(frac(p, q))}))＝{{${F(v)}}}。`, trap: "公比が負のとき 1−r の計算で符号を落とさない。" },
    ],
  };
}

function junkan(r: Rng): QuestionBody {
  let x = 0;
  let y = 0;
  while (x === y) {
    x = r.int(0, 9);
    y = r.int(1, 9);
  }
  const ab = 10 * x + y;
  const v = frac(ab, 99);
  return {
    prompt: `循環小数 0.${x}̇${y}̇（${x}${y} がくり返す）を分数で表しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `${ab}/99` },
    point: "初項 " + ab + "/100、公比 1/100 の無限等比級数とみる",
    steps: [
      { title: "級数とみる", body: `0.${x}̇${y}̇＝${ab}/100 ＋ ${ab}/100² ＋ …。初項 ${ab}/100、公比 1/100。`, back: [S6] },
      { title: "和を出す", body: `(${ab}/100)/(1 − 1/100)＝${ab}/99＝{{${v}}}。`, trap: "約分できるときは約分して答える。" },
    ],
  };
}

function bubun(r: Rng): QuestionBody {
  const a = r.int(1, 4);
  const b = r.int(0, 4);
  const v = frac(1, a * (a + b));
  const f = (k: number) => a * k + b;
  return {
    prompt: `無限級数 1/(${f(1)}・${f(2)}) ＋ 1/(${f(2)}・${f(3)}) ＋ 1/(${f(3)}・${f(4)}) ＋ … の和を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `1/(${a}*(${a}+${b}))` },
    point: "部分分数に分けて部分和を求め、n→∞",
    steps: [
      { title: "部分分数に分ける", body: `第 k 項は 1/((${a === 1 ? "" : a}k${b ? ` ＋ ${b}` : ""})(${a === 1 ? "" : a}k ＋ ${a + b}))＝${a === 1 ? "" : `(1/${a})`}{1/(${a === 1 ? "" : a}k${b ? ` ＋ ${b}` : ""}) − 1/(${a === 1 ? "" : a}k ＋ ${a + b})}。`, back: [S5] },
      { title: "部分和", body: `となりどうしが消えて、Sₙ＝${a === 1 ? "" : `(1/${a})`}{1/${f(1)} − 1/(${a === 1 ? "" : a}n ＋ ${a + b})}。` },
      { title: "極限", body: `n→∞ で Sₙ → ${a === 1 ? `1/${f(1)}` : `1/(${a}・${f(1)})`}＝{{${v}}}。`, trap: "項が 0 に近づくだけでは収束とはいえない。部分和の極限で決める。" },
    ],
  };
}

export const H_MATH_3_SURETSU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅲ",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "数列の極限",
      lead: "次の極限を求めなさい。",
      style: "calc",
      questions: [
        { id: "yuri", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: yuri },
        { id: "shisu", type: "A", difficulty: 1, points: 15, seconds: 90, skill: "知識・技能", generate: shisu },
        { id: "root", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: root },
      ],
    },
    {
      title: "無限級数",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "toohi", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: toohi },
        { id: "junkan", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "思考・判断・表現", generate: junkan },
        { id: "bubun", type: "A", difficulty: 3, points: 22, seconds: 210, skill: "思考・判断・表現", generate: bubun },
      ],
    },
  ],
};
