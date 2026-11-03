// 数学Ⅱ「高次方程式」の単元模試 (A: 係数を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 剰余の定理・因数定理は P(a) を代入する式を calc に書いて照合する。因数分解は3つの整数解を先に決めて展開した式を問題にする。
//   2次式で割った余りは px＋q を先に決めて P(a)・P(b) を作る。ω の式は ω³＝1・ω²＋ω＋1＝0 から値を出し、
//   3次方程式の解と係数の関係は p・q・r から作る式を calc に書く (scripts/check-moshi.ts がシード1〜100で照合する)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-2-koji";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "剰余の定理");
const S2 = L(2, "因数定理");
const S3 = L(3, "例：x³−4x²+x+6＝0 を解く");
const S4 = L(4, "x³＝1 の解は3つある");
const S5 = L(5, "3次方程式の解と係数の関係");

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const D = (s: string | number) => String(s).replace(/-/g, "−");
/** p の係数: 1 → ""、−1 → "−" */
const cp = (n: number) => (n === 1 ? "" : n === -1 ? "−" : D(n));
const pa = (n: number) => (n < 0 ? `(−${-n})` : String(n));
const nz = (r: Rng, a: number, b: number) => {
  let v = 0;
  while (v === 0) v = r.int(a, b);
  return v;
};
function frac(n: number, d: number, ascii = false): string {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d) || 1;
  const s = d / g === 1 ? `${n / g}` : `${n / g}/${d / g}`;
  return ascii ? s : D(s);
}
const SUP: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻" };
const sup = (n: number) => [...String(n)].map((c) => SUP[c]).join("");
function poly(ts: [number, string][], ascii = false): string {
  let out = "";
  for (const [c, m0] of ts) {
    if (c === 0) continue;
    const m = ascii ? m0.replace(/²/g, "^2").replace(/³/g, "^3") : m0;
    const a = Math.abs(c);
    const body = m && a === 1 ? m : `${a}${m}`;
    if (!out) out = (c < 0 ? (ascii ? "-" : "−") : "") + body;
    else out += ascii ? `${c < 0 ? "-" : "+"}${body}` : ` ${c < 0 ? "−" : "+"} ${body}`;
  }
  return out || "0";
}
const xm = (a: number) => `x ${a < 0 ? "+" : "−"} ${Math.abs(a)}`;

function jouyo(r: Rng): QuestionBody {
  const b = r.int(-5, 5);
  const c = r.int(-6, 6);
  const d = nz(r, -9, 9);
  const k = r.pick([1, 2]);
  const a = nz(r, -3, 3);
  const v = k * a ** 3 + b * a * a + c * a + d;
  const P = poly([[k, "x³"], [b, "x²"], [c, "x"], [d, ""]]);
  return {
    prompt: `整式 P(x)＝${P} を ${xm(a)} で割ったときの余りを求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], calc: `${k}*(${a})^3+(${b})*(${a})^2+(${c})*(${a})+(${d})` },
    point: "x−a で割った余りは P(a)",
    steps: [
      { title: "剰余の定理", body: `${xm(a)} で割った余りは {{P(${D(a)})}} に等しい。割り算をしなくてよい。`, back: [S1] },
      { title: "代入する", body: `P(${D(a)})＝${k === 1 ? "" : `${k}×`}${pa(a)}³ ＋ ${pa(b)}×${pa(a)}² ＋ ${pa(c)}×${pa(a)} ＋ ${pa(d)}＝{{${D(v)}}}。`, trap: `x ${a < 0 ? "+" : "−"} ${Math.abs(a)} のときに代入するのは x＝${D(a)}。符号を逆にしない。` },
    ],
  };
}

function inshu(r: Rng): QuestionBody {
  const p = r.int(-5, 5);
  const q = r.int(-6, 6);
  const k = nz(r, -3, 3);
  const m = -(k ** 3 + p * k * k + q * k);
  return {
    prompt: `整式 ${poly([[1, "x³"], [p, "x²"], [q, "x"]])} ＋ a が ${xm(k)} で割り切れるように、定数 a の値を定めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(m)], labels: ["a ="], calc: `-((${k})^3+(${p})*(${k})^2+(${q})*(${k}))` },
    point: "割り切れる ⇔ P(k)＝0（因数定理）",
    steps: [
      { title: "因数定理", body: `${xm(k)} で割り切れるのは {{P(${D(k)})＝0}} のとき。`, back: [S2] },
      { title: "a を求める", body: `P(${D(k)})＝${D(k ** 3 + p * k * k + q * k)} ＋ a＝0 から a＝{{${D(m)}}}。` },
    ],
  };
}

function kaku(r: Rng): QuestionBody {
  const roots = r.sample([-4, -3, -2, -1, 1, 2, 3, 4, 5], 3).sort((x, y) => x - y);
  if (!roots.some((x) => Math.abs(x) <= 2)) roots[0] = roots[0] < 0 ? -1 : 1;
  roots.sort((x, y) => x - y);
  if (roots[0] === roots[1] || roots[1] === roots[2]) roots.splice(0, 3, -1, 2, 3);
  const [u, v, w] = roots;
  const s1 = u + v + w;
  const s2 = u * v + v * w + w * u;
  const s3 = u * v * w;
  const P = poly([[1, "x³"], [-s1, "x²"], [s2, "x"], [-s3, ""]]);
  const f = (a: number) => `(x${a < 0 ? "+" : "-"}${Math.abs(a)})`;
  const first = roots.find((x) => Math.abs(x) <= 2)!;
  const rest = roots.filter((x) => x !== first);
  const Q = poly([[1, "x²"], [-(rest[0] + rest[1]), "x"], [rest[0] * rest[1], ""]]);
  return {
    prompt: `次の式を因数分解しなさい。\n${P}`,
    answer: { kind: "num", answerKind: "factor", answer: [roots.map(f).join("")] },
    point: "定数項の約数を代入して、0 になる x を探す",
    steps: [
      { title: "因数を1つ見つける", body: `定数項 ${D(-s3)} の約数を代入すると、x＝${D(first)} で 0 になります。だから {{${xm(first)}}} が因数。`, back: [S2] },
      { title: "割り算で残りを出す", body: `${xm(first)} で割ると商は ${Q}。`, back: [S3] },
      { title: "2次式も分ける", body: `${Q}＝(${xm(rest[0])})(${xm(rest[1])}) なので、答えは {{${roots.map((a) => `(${xm(a)})`).join("")}}}。`, trap: "2次式の部分を残したままにしない。最後まで因数分解できるか確かめる。" },
    ],
  };
}

function amari(r: Rng): QuestionBody {
  const a = nz(r, -3, 3);
  let b = nz(r, -3, 3);
  if (b === a) b = a === 3 ? -2 : a + 1;
  const p = nz(r, -5, 5);
  const q = r.int(-6, 6);
  const A = p * a + q;
  const B = p * b + q;
  const ans = poly([[p, "x"], [q, ""]], true);
  return {
    prompt: `整式 P(x) を ${xm(a)} で割ると余りが ${D(A)}、${xm(b)} で割ると余りが ${D(B)} である。P(x) を (${xm(a)})(${xm(b)}) で割ったときの余りを求めなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [ans] },
    point: "2次式で割った余りは px＋q とおける",
    steps: [
      { title: "余りを px＋q とおく", body: `P(x)＝(${xm(a)})(${xm(b)})Q(x) ＋ px ＋ q と書けます。`, back: [S1] },
      { title: "代入して連立", body: `P(${D(a)})＝${cp(a)}p＋q＝${D(A)}、P(${D(b)})＝${cp(b)}p＋q＝${D(B)}。` },
      { title: "解く", body: `p＝${D(p)}、q＝${D(q)} なので、余りは {{${poly([[p, "x"], [q, ""]])}}}。`, trap: "2次式で割った余りは1次以下。定数だけとおかない。" },
    ],
  };
}

function omega(r: Rng): QuestionBody {
  const form = r.int(0, 3);
  const e = (res: number) => 3 * r.int(2, 12) + res;
  let shown: string;
  let v: number;
  let calc: string;
  let how: string;
  if (form === 0) {
    const m = e(1);
    const n = e(2);
    shown = `ω${sup(m)} ＋ ω${sup(n)}`;
    v = -1;
    calc = "0-1";
    how = `ω${sup(m)}＝(ω³)${sup((m - 1) / 3)}ω＝ω、ω${sup(n)}＝ω²。ω＋ω²＝−1`;
  } else if (form === 1) {
    const [x, y, z] = r.shuffle([e(0), e(1), e(2)]);
    shown = `ω${sup(x)} ＋ ω${sup(y)} ＋ ω${sup(z)}`;
    v = 0;
    calc = "1-1";
    how = "指数を3で割った余りが 0、1、2 なので、1＋ω＋ω²＝0";
  } else if (form === 2) {
    const n = r.int(4, 30);
    const zero = n % 3 === 0;
    shown = `ω${sup(n)} ＋ 1/ω${sup(n)}`;
    v = zero ? 2 : -1;
    calc = zero ? "1+1" : "0-1";
    how = zero ? `${n} は3の倍数なので ω${sup(n)}＝1。1＋1＝2` : n % 3 === 1 ? "ω" + sup(n) + "＝ω、1/ω＝ω³/ω＝ω²。ω＋ω²＝−1" : "ω" + sup(n) + "＝ω²、1/ω²＝ω³/ω²＝ω。ω²＋ω＝−1";
  } else {
    const k = 3 * r.int(1, 4);
    const two = r.bool();
    shown = two ? `(1 ＋ ω²)${sup(k)}` : `(1 ＋ ω)${sup(k)}`;
    v = 1;
    calc = "1";
    how = `${two ? "1＋ω²＝−ω" : "1＋ω＝−ω²"} なので、(${two ? "−ω" : "−ω²"})${sup(k)}＝(−1)${sup(k)}×ω${sup(two ? k : 2 * k)}`;
    if (k % 2) {
      v = -1;
      calc = "0-1";
    }
    how += `＝${v === 1 ? "1" : "−1"}`;
  }
  return {
    prompt: `方程式 x³＝1 の虚数解の1つを ω とするとき、${shown} の値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], calc },
    point: "ω³＝1 で指数を小さくし、ω²＋ω＋1＝0 を使う",
    steps: [
      { title: "使う2つの式", body: "ω は x³＝1 の解で、x²＋x＋1＝0 の解でもあるので、{{ω³＝1}}、{{ω²＋ω＋1＝0}}。", back: [S4] },
      { title: "指数を小さくする", body: `${how}。答えは {{${D(v)}}}。`, trap: "ω² を「ω の共役」と考えるのはよいが、値を (−1±√3i)/2 で計算すると手間がかかる。" },
    ],
  };
}

function kaito(r: Rng): QuestionBody {
  const p = nz(r, -5, 5);
  const q = nz(r, -6, 6);
  const c = nz(r, -6, 6);
  const kind = r.int(0, 2);
  let what: string;
  let ans: string;
  let calc: string;
  let how: string;
  if (kind === 0) {
    what = "α² ＋ β² ＋ γ²";
    ans = String(p * p - 2 * q);
    calc = `(${-p})^2-2*(${q})`;
    how = `(α＋β＋γ)²−2(αβ＋βγ＋γα)＝${pa(-p)}² − 2×${pa(q)}`;
  } else if (kind === 1) {
    what = "1/α ＋ 1/β ＋ 1/γ";
    ans = frac(q, -c, true);
    calc = `(${q})/(${-c})`;
    how = `(αβ＋βγ＋γα)/(αβγ)＝${D(q)}/${pa(-c)}`;
  } else {
    what = "(1 ＋ α)(1 ＋ β)(1 ＋ γ)";
    ans = String(1 - p + q - c);
    calc = `1+(${-p})+(${q})+(${-c})`;
    how = `1 ＋ (α＋β＋γ) ＋ (αβ＋βγ＋γα) ＋ αβγ＝1 ＋ ${pa(-p)} ＋ ${pa(q)} ＋ ${pa(-c)}`;
  }
  return {
    prompt: `3次方程式 ${poly([[1, "x³"], [p, "x²"], [q, "x"], [c, ""]])} ＝ 0 の3つの解を α、β、γ とするとき、${what} の値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], calc },
    point: "α＋β＋γ、αβ＋βγ＋γα、αβγ の3つで表す",
    steps: [
      { title: "解と係数の関係", body: `α＋β＋γ＝${D(-p)}、αβ＋βγ＋γα＝${D(q)}、αβγ＝${D(-c)}。`, back: [S5] },
      { title: "3つの値で表す", body: `${how}＝{{${D(ans)}}}。`, trap: "αβγ＝−（定数項）。x³ の係数が1のとき、符号は −、＋、− の順。" },
    ],
  };
}

export const H_MATH_2_KOJI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅱ",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "剰余の定理と因数定理",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "jouyo", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: jouyo },
        { id: "inshu", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: inshu },
      ],
    },
    {
      title: "3次式の因数分解・余り・ω",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kaku", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "知識・技能", generate: kaku },
        { id: "amari", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: amari },
        { id: "omega", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "思考・判断・表現", generate: omega },
      ],
    },
    {
      title: "3次方程式の解と係数の関係",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "kaito", type: "A", difficulty: 3, points: 24, seconds: 150, skill: "思考・判断・表現", generate: kaito }],
    },
  ],
};
