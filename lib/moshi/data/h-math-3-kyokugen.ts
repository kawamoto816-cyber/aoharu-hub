// 数学Ⅲ「関数の極限」の単元模試 (A: 係数を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 0/0 は分子を (x−a)(x−c) と作って a−c を、sin の極限は a/b を、√ の有理化は 1/(2a) を、
//   (1−cos ax)/x² は a²/2 を、(eᵃˣ−1)/(bx) は a/b を calc に書く。連続になる p、q は
//   「x＝a で分子が 0」と「約分後の値＝L」の2式を equations に書く (scripts/check-moshi.ts がシード1〜100で照合する)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-3-kyokugen";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "0/0 の形は約分してから代入する");
const S3 = L(3, "lim[x→0] sin x/x＝1 を使える形にする");
const S5 = L(5, "(1＋1/n)ⁿ が近づく数が e");
const S6 = L(6, "連続と中間値の定理");

const D = (n: number) => (n < 0 ? `−${-n}` : String(n));
const pm = (n: number) => (n < 0 ? `− ${-n}` : `＋ ${n}`);
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
function frac(n: number, d: number): string {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d) || 1;
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
}
const xm = (p: number) => (p === 0 ? "x" : `x ${pm(-p)}`);
const quad = (p: number, q: number) => `x²${p === 0 ? "" : ` ${p < 0 ? "−" : "＋"} ${Math.abs(p) === 1 ? "" : Math.abs(p)}x`}${q === 0 ? "" : ` ${pm(q)}`}`;
const kx = (k: number) => (k === 1 ? "x" : `${k}x`);

function yakubun(r: Rng): QuestionBody {
  let a = 0;
  let c = 0;
  while (a === c) {
    a = r.int(-4, 4);
    c = r.int(-5, 5);
  }
  const p = -(a + c);
  const q = a * c;
  const v = a - c;
  return {
    prompt: `極限 lim[x→${D(a)}] (${quad(p, q)})/${a === 0 ? "x" : `(${xm(a)})`} を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], calc: `${a}-(${c})` },
    point: "分子を因数分解して、0 になる因数を約分する",
    steps: [
      { title: "因数分解", body: `分子＝${a === 0 ? "x" : `(${xm(a)})`}${c === 0 ? "x" : `(${xm(c)})`}。x≠${D(a)} なので ${xm(a)} で約分できます。`, back: [S1] },
      { title: "代入する", body: `lim (${xm(c)})＝${D(a)} ${pm(-c)}＝{{${D(v)}}}。`, trap: "そのまま代入すると 0/0。値が決まらないので、先に約分する。" },
    ],
  };
}

function sin(r: Rng): QuestionBody {
  const [a, b] = r.sample([1, 2, 3, 4, 5, 6, 7], 2);
  const kind = r.int(0, 2);
  const v = frac(a, b);
  const dn = (k: number) => (k === 1 ? "x" : `(${k}x)`);
  const expr = kind === 0 ? `(sin ${kx(a)})/${dn(b)}` : kind === 1 ? `(sin ${kx(a)})/(sin ${kx(b)})` : `(tan ${kx(a)})/${dn(b)}`;
  return {
    prompt: `極限 lim[x→0] ${expr} を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `${a}/${b}` },
    point: "sin □/□ の □ をそろえて、lim sin θ/θ＝1 を使う",
    steps: [
      {
        title: "形をそろえる",
        body:
          kind === 1
            ? `(sin ${kx(a)}/${kx(a)})・(${kx(b)}/sin ${kx(b)})・(${a}/${b}) と変形します。`
            : kind === 0
              ? `(sin ${kx(a)}/${kx(a)})・(${a}/${b}) と変形します。`
              : `tan ${kx(a)}＝sin ${kx(a)}/cos ${kx(a)} なので、(sin ${kx(a)}/${kx(a)})・(1/cos ${kx(a)})・(${a}/${b})。`,
        back: [S3],
      },
      { title: "極限をとる", body: `sin θ/θ→1、cos 0＝1 なので、{{${v}}}。`, trap: "sin " + kx(a) + " を " + a + " sin x としない。" },
    ],
  };
}

function rootLim(r: Rng): QuestionBody {
  const a = r.int(1, 6);
  const k = r.pick([1, 2, 3]);
  const v = frac(k, 2 * a);
  const inside = `${kx(k)} ＋ ${a * a}`;
  return {
    prompt: `極限 lim[x→0] {√(${inside}) − ${a}}/x を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `${k}/(2*${a})` },
    point: "分子を有理化して、x を約分する",
    steps: [
      { title: "分子の有理化", body: `分子・分母に √(${inside}) ＋ ${a} をかけると、分子は (${inside}) − ${a * a}＝${kx(k)}。`, back: [S1] },
      { title: "約分して代入", body: `${k}/{√(${inside}) ＋ ${a}} → ${k}/(${a} ＋ ${a})＝{{${v}}}。`, trap: "x→0 で分母・分子とも 0。有理化せずに代入しない。" },
    ],
  };
}

function cos(r: Rng): QuestionBody {
  const a = r.int(1, 6);
  const b = r.pick([1, 2, 3, 4]);
  const v = frac(a * a, 2 * b);
  return {
    prompt: `極限 lim[x→0] (1 − cos ${kx(a)})/${b === 1 ? "x²" : `(${b}x²)`} を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `${a}^2/(2*${b})` },
    point: "1−cos θ＝sin²θ/(1＋cos θ) と変形する",
    steps: [
      { title: "sin に直す", body: `1 − cos ${kx(a)}＝sin²${kx(a)}/(1 ＋ cos ${kx(a)})。`, back: [S3] },
      { title: "形をそろえる", body: `(sin ${kx(a)}/${kx(a)})²・${a * a}/{${b}(1 ＋ cos ${kx(a)})} → 1・${a * a}/(${b}・2)＝{{${v}}}。`, trap: "分母の 1＋cos θ は 2 に近づく。1 としない。" },
    ],
  };
}

function exp(r: Rng): QuestionBody {
  const [a, b] = r.sample([1, 2, 3, 4, 5, 6], 2);
  const v = frac(a, b);
  return {
    prompt: `極限 lim[x→0] (${a === 1 ? "eˣ" : `e^(${kx(a)})`} − 1)/${b === 1 ? "x" : `(${b}x)`} を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `${a}/${b}` },
    point: "lim[t→0] (eᵗ−1)/t＝1 を、t＝" + kx(a) + " で使う",
    steps: [
      { title: "形をそろえる", body: `{(${a === 1 ? "eˣ" : `e^(${kx(a)})`} − 1)/${a === 1 ? "x" : `(${a}x)`}}・(${a}/${b}) と変形します。`, back: [S5] },
      { title: "極限をとる", body: `${a === 1 ? "" : `x→0 のとき ${kx(a)}→0 なので、`}前の因数は 1 に近づく。答えは {{${v}}}。` },
    ],
  };
}

function renzoku(r: Rng): QuestionBody {
  const a = r.int(-3, 3);
  let Lv = 0;
  while (Lv === 0) Lv = r.int(-5, 5);
  const c = a - Lv;
  const p = -(a + c);
  const q = a * c;
  return {
    prompt: `関数 f(x)＝(x² ＋ px ＋ q)/(${xm(a)})（x≠${D(a)}）、f(${D(a)})＝${D(Lv)} が x＝${D(a)} で連続となるように、定数 p、q の値を定めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(p), String(q)], labels: ["p =", "q ="], equations: [`(${a})^2+p*(${a})+q=0`, `${a}-(-p-(${a}))=${Lv}`] },
    point: "分母→0 で極限があるなら、分子も 0 に近づく",
    steps: [
      { title: "分子も 0", body: `連続なら lim[x→${D(a)}] f(x)＝${D(Lv)}。分母→0 なので分子→0 で、${a < 0 ? `(${D(a)})` : a}² ＋ (${D(a)})p ＋ q＝0。`, back: [S6, S1] },
      { title: "約分した値", body: `分子＝(${xm(a)})(x − c) とおくと、極限は ${D(a)} − c＝${D(Lv)} から c＝${D(c)}。`, trap: "「分子＝0」だけでは p、q は決まらない。極限の値の条件も使う。" },
      { title: "係数を比べる", body: `(${xm(a)})(${xm(c)})＝${quad(p, q)} なので、{{p＝${D(p)}、q＝${D(q)}}}。` },
    ],
  };
}

export const H_MATH_3_KYOKUGEN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅲ",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "不定形の極限",
      lead: "次の極限を求めなさい。",
      style: "calc",
      questions: [
        { id: "yakubun", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: yakubun },
        { id: "root-lim", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: rootLim },
      ],
    },
    {
      title: "三角関数・指数関数の極限",
      lead: "次の極限を求めなさい。",
      style: "calc",
      questions: [
        { id: "sin", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: sin },
        { id: "cos", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: cos },
        { id: "exp", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: exp },
      ],
    },
    {
      title: "関数の連続",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "renzoku", type: "A", difficulty: 3, points: 22, seconds: 210, skill: "思考・判断・表現", generate: renzoku }],
    },
  ],
};
