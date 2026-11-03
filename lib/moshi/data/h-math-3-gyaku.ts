// 数学Ⅲ「逆関数と合成関数」の単元模試 (A: 係数を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 合成関数の値は f・g に代入する式を calc に、合成関数・逆関数の式は採点器が式として照合する。
//   分数関数の逆関数の値は、答え s と値 t を先に決めて b＝t(s＋c)−as で f を作り、x＝(b−ct)/(t−a) を calc に。
//   逆関数の定義域は f の値域の端 r を calc に。y＝√(x＋a) と逆関数の交点は y＝x 上の点 s (s≧2) から a＝s²−s で作る
//   (scripts/check-moshi.ts がシード1〜100で照合する)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-3-gyaku";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "合成関数 (g∘f)(x) は「f の次に g」");
const S2 = L(2, "逆関数は x について解いて、x と y を入れかえる");
const S3 = L(3, "定義域と値域が入れかわり、グラフは y＝x について対称");
const S4 = L(4, "逆関数があるのは「1対1」の関数だけ");

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
const lin = (a: number, b: number) => `${a === 1 ? "" : a === -1 ? "−" : D(a)}x${b === 0 ? "" : ` ${pm(b)}`}`;
const xm = (p: number) => (p === 0 ? "x" : `x ${pm(p)}`);
/** ascii の多項式 (係数は分数の文字列も可) */
function poly(ts: [string, string][]): string {
  let out = "";
  for (const [c0, m] of ts) {
    if (c0 === "0") continue;
    const neg = c0.startsWith("-");
    const c = neg ? c0.slice(1) : c0;
    const body = m && c === "1" ? m : `${c}${m}`;
    out += out ? `${neg ? "-" : "+"}${body}` : `${neg ? "-" : ""}${body}`;
  }
  return out || "0";
}
const show = (s: string) => s.replace(/-/g, " − ").replace(/\+/g, " ＋ ").replace(/\^2/g, "²").replace(/^ − /, "−").replace(/(\d+\/\d+)x/g, "($1)x");

function goseiValue(r: Rng): QuestionBody {
  const a = nz(r, -3, 3);
  const b = r.int(-5, 5);
  const c = r.int(-5, 5);
  const t = r.int(-3, 3);
  const gf = r.bool();
  const f = (x: number) => a * x + b;
  const g = (x: number) => x * x + c;
  const v = gf ? g(f(t)) : f(g(t));
  const fs = lin(a, b);
  const gs = `x²${c === 0 ? "" : ` ${pm(c)}`}`;
  return {
    prompt: `f(x)＝${fs}、g(x)＝${gs} のとき、${gf ? "(g∘f)" : "(f∘g)"}(${D(t)}) の値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], calc: gf ? `(${a}*(${t})+(${b}))^2+(${c})` : `${a}*((${t})^2+(${c}))+(${b})` },
    point: "(g∘f)(x)＝g(f(x))。右側の関数から先に計算する",
    steps: [
      { title: "先に入れる関数", body: gf ? `まず f(${D(t)})＝${D(f(t))}。` : `まず g(${D(t)})＝${D(g(t))}。`, back: [S1] },
      { title: "次の関数に入れる", body: gf ? `g(${D(f(t))})＝{{${D(v)}}}。` : `f(${D(g(t))})＝{{${D(v)}}}。`, trap: "(g∘f) は「f の次に g」。左から順に計算しない。" },
    ],
  };
}

function goseiShiki(r: Rng): QuestionBody {
  const a = nz(r, -3, 3);
  const b = nz(r, -4, 4);
  const c = r.int(-5, 5);
  const gf = r.bool();
  const fs = lin(a, b);
  const gs = `x²${c === 0 ? "" : ` ${pm(c)}`}`;
  // g(f(x))＝(ax＋b)²＋c、f(g(x))＝a(x²＋c)＋b
  const ans = gf ? poly([[String(a * a), "x^2"], [String(2 * a * b), "x"], [String(b * b + c), ""]]) : poly([[String(a), "x^2"], [String(a * c + b), ""]]);
  return {
    prompt: `f(x)＝${fs}、g(x)＝${gs} のとき、合成関数 ${gf ? "(g∘f)" : "(f∘g)"}(x) を求めなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [ans], labels: [`${gf ? "(g∘f)" : "(f∘g)"}(x) =`] },
    point: "中身に関数の式をまるごと入れてから整理する",
    steps: [
      { title: "中身に入れる", body: gf ? `g(f(x))＝(${fs})²${c === 0 ? "" : ` ${pm(c)}`}。` : `f(g(x))＝${D(a)}(${gs}) ${pm(b)}。`, back: [S1] },
      { title: "展開して整理", body: `{{${show(ans)}}}。`, trap: "(g∘f) と (f∘g) は一般に別の関数。順番を確かめる。" },
    ],
  };
}

function gyakuSen(r: Rng): QuestionBody {
  const a = r.pick([2, 3, 4, 5, -2, -3, -4]);
  const b = nz(r, -8, 8);
  // y＝ax＋b → x＝(y−b)/a
  const ans = poly([[frac(1, a), "x"], [frac(-b, a), ""]]);
  return {
    prompt: `関数 f(x)＝${lin(a, b)} の逆関数 f⁻¹(x) を求めなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [ans], labels: ["f⁻¹(x) ="] },
    point: "x について解いてから、x と y を入れかえる",
    steps: [
      { title: "x について解く", body: `y＝${lin(a, b)} から x＝(y ${pm(-b)})/${a < 0 ? `(${D(a)})` : a}。`, back: [S2] },
      { title: "x と y を入れかえる", body: `f⁻¹(x)＝(x ${pm(-b)})/${a < 0 ? `(${D(a)})` : a}＝{{${show(ans)}}}。`, trap: "f⁻¹(x) は 1/f(x) ではない。" },
    ],
  };
}

function gyakuBunsu(r: Rng): QuestionBody {
  for (;;) {
    const a = nz(r, -3, 3);
    const c = nz(r, -4, 4);
    const s = r.int(-4, 4);
    const t = r.int(-5, 5);
    if (s + c === 0 || t === a) continue;
    const b = t * (s + c) - a * s;
    if (a * c - b === 0) continue;
    return {
      prompt: `関数 f(x)＝(${lin(a, b)})/(${xm(c)}) について、f⁻¹(${D(t)}) の値を求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [String(s)], calc: `((${b})-(${c})*(${t}))/((${t})-(${a}))` },
      point: "f⁻¹(t) は「f(x)＝t となる x」",
      steps: [
        { title: "意味に直す", body: `f⁻¹(${D(t)})＝x とおくと、f(x)＝${D(t)}。`, back: [S2] },
        { title: "方程式を解く", body: `(${lin(a, b)})＝${D(t)}(${xm(c)}) を解いて、{{x＝${D(s)}}}。`, trap: "f(" + D(t) + ") を計算するのではない。出力が " + D(t) + " になる入力をさがす。" },
      ],
    };
  }
}

function teigiiki(r: Rng): QuestionBody {
  const a = r.pick([1, 2, 3]);
  const b = r.int(-6, 6);
  const rr = r.int(-5, 5);
  const neg = r.bool();
  const sign = neg ? "≦" : "≧";
  const inside = lin(a, b);
  return {
    prompt: `関数 f(x)＝${neg ? "−" : ""}√(${inside})${rr === 0 ? "" : ` ${pm(rr)}`} の逆関数 f⁻¹(x) の定義域を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(rr)], labels: [`x ${sign}`], calc: `${rr}` },
    point: "逆関数の定義域 ＝ もとの関数の値域",
    steps: [
      { title: "もとの関数の値域", body: `√(${inside}) ≧ 0 なので、f(x) の値域は y ${sign} ${D(rr)}。`, back: [S3] },
      { title: "入れかわる", body: `逆関数では値域と定義域が入れかわるので、定義域は {{x ${sign} ${D(rr)}}}。`, trap: "√ の中≧0（もとの定義域）を答えない。それは逆関数の値域になる。" },
    ],
  };
}

function kouten(r: Rng): QuestionBody {
  const k = r.int(1, 3);
  const s = r.int(k + 1, k + 5);
  const a = s * s - k * s;
  const inside = `${k === 1 ? "" : k}x ＋ ${a}`;
  return {
    prompt: `関数 f(x)＝√(${inside}) のグラフと、その逆関数 y＝f⁻¹(x) のグラフの共有点の x 座標を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(s)], labels: ["x ="], equations: [`${k}*x+${a}=x^2`] },
    point: "増加関数なら、逆関数との共有点は直線 y＝x 上",
    steps: [
      { title: "y＝x 上で考える", body: `f(x) は増加関数なので、y＝f(x) と y＝f⁻¹(x) の共有点は {{y＝x}} 上にあります。`, back: [S3, S4] },
      { title: "方程式を解く", body: `√(${inside})＝x を2乗して x² − ${k === 1 ? "" : k}x − ${a}＝0、x＝${s}、${D(k - s)}。x≧0 なので {{x＝${s}}}。`, trap: "2乗した方程式の解は、√≧0 の条件で確かめる。" },
    ],
  };
}

export const H_MATH_3_GYAKU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅲ",
  review: { status: "draft" },
  sections: [
    {
      title: "合成関数",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "gosei-value", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: goseiValue },
        { id: "gosei-shiki", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: goseiShiki },
      ],
    },
    {
      title: "逆関数",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "gyaku-sen", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: gyakuSen },
        { id: "gyaku-bunsu", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: gyakuBunsu },
        { id: "teigiiki", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "思考・判断・表現", generate: teigiiki },
        { id: "kouten", type: "A", difficulty: 3, points: 22, seconds: 180, skill: "思考・判断・表現", generate: kouten },
      ],
    },
  ],
};
