// 数学Ⅲ「積分法」の単元模試 (A: 係数・区間を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 基本の定積分は原始関数の差を calc に (∫₁^(m²)√x dx＝(2/3)(m³−1)、∫₁ᵇ x⁻² dx＝1−1/b、∫₁^(eᵏ)(1/x)dx＝k、
//   ∫₀^(log a) eˣ dx＝a−1)。置換積分は {(c²＋a)ⁿ⁺¹ − aⁿ⁺¹}/(2(n＋1))、f′/f の形は log の中身 (1＋a＋b)/b、
//   区分求積は ∫₀¹(a＋bx)²dx＝a²＋ab＋b²/3 を calc に。部分積分 ∫₀¹(ax＋b)eˣdx＝b(e−1)＋a は e をふくむので、
//   式を選ぶ問題にし、誤りの選択肢は符号・項の落としから作る (scripts/check-moshi.ts がシード1〜100で照合する)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-3-sekibun";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "基本の不定積分は、微分の公式を逆に読む");
const S2 = L(2, "置換積分：中身を t とおいて、区間も t に直す");
const S3 = L(3, "部分積分：積の形は「微分する側」と「積分する側」に分ける");
const S4 = L(4, "どの方法を使うかは、式の形で決まる");
const S5 = L(5, "区分求積法：細い長方形の和の極限が定積分");

const pm = (n: number) => (n < 0 ? `− ${-n}` : `＋ ${n}`);
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
function frac(n: number, d: number): string {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d) || 1;
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
}
const F = (s: string) => s.replace(/-/g, "−");
const SUP: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
const sup = (n: number) => String(n).split("").map((c) => SUP[c]).join("");

function kihon(r: Rng): QuestionBody {
  const kind = r.int(0, 3);
  if (kind === 0) {
    const m = r.int(2, 5);
    const v = frac(2 * (m ** 3 - 1), 3);
    return {
      prompt: `定積分 ∫[1→${m * m}] √x dx を求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [v], calc: `2/3*(${m}^3-1)` },
      point: "√x＝x^(1/2)。∫xⁿdx＝xⁿ⁺¹/(n＋1)",
      steps: [
        { title: "原始関数", body: "∫x^(1/2)dx＝(2/3)x^(3/2)。", back: [S1] },
        { title: "代入する", body: `(2/3){(${m * m})^(3/2) − 1}＝(2/3)(${m ** 3} − 1)＝{{${v}}}。`, trap: "(" + m * m + ")^(3/2)＝" + m + "³。√ をとってから3乗する。" },
      ],
    };
  }
  if (kind === 1) {
    const b = r.int(2, 9);
    const v = frac(b - 1, b);
    return {
      prompt: `定積分 ∫[1→${b}] (1/x²) dx を求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [v], calc: `1-1/${b}` },
      point: "1/x²＝x⁻²。原始関数は −1/x",
      steps: [
        { title: "原始関数", body: "∫x⁻²dx＝−x⁻¹＝−1/x。", back: [S1] },
        { title: "代入する", body: `(−1/${b}) − (−1/1)＝{{${v}}}。`, trap: "1/x² の原始関数を log としない。log になるのは 1/x だけ。" },
      ],
    };
  }
  if (kind === 2) {
    const k = r.int(2, 6);
    const c = r.int(1, 5);
    return {
      prompt: `定積分 ∫[1→e${sup(k)}] (${c === 1 ? "" : c}/x) dx を求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [String(c * k)], calc: `${c}*${k}` },
      point: "∫(1/x)dx＝log|x|＋C、log eᵏ＝k",
      steps: [
        { title: "原始関数", body: `∫(${c === 1 ? "" : c}/x)dx＝${c === 1 ? "" : c}log|x|。`, back: [S1] },
        { title: "代入する", body: `${c === 1 ? "" : c}(log e${sup(k)} − log 1)＝${c === 1 ? "" : `${c}・`}${k}＝{{${c * k}}}。` },
      ],
    };
  }
  const a = r.int(2, 9);
  return {
    prompt: `定積分 ∫[0→log ${a}] eˣ dx を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a - 1)], calc: `${a}-1` },
    point: "∫eˣdx＝eˣ＋C、e^(log a)＝a",
    steps: [
      { title: "原始関数", body: "∫eˣdx＝eˣ。", back: [S1] },
      { title: "代入する", body: `e^(log ${a}) − e⁰＝${a} − 1＝{{${a - 1}}}。`, trap: "e⁰＝1。0 としない。" },
    ],
  };
}

function chikan(r: Rng): QuestionBody {
  const a = r.int(1, 3);
  const c = r.int(1, 2);
  const n = r.int(1, 3);
  const top = c * c + a;
  const v = frac(top ** (n + 1) - a ** (n + 1), 2 * (n + 1));
  return {
    prompt: `定積分 ∫[0→${c}] x(x² ＋ ${a})${n === 1 ? "" : sup(n)} dx を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `(${top}^${n + 1}-${a}^${n + 1})/(2*${n + 1})` },
    point: "t＝x²＋" + a + " とおくと x dx＝dt/2。区間も t に直す",
    steps: [
      { title: "置きかえる", body: `t＝x² ＋ ${a} とおくと dt＝2x dx。x：0→${c} のとき t：${a}→${top}。`, back: [S2] },
      { title: "t で積分", body: `∫[${a}→${top}] t${n === 1 ? "" : sup(n)}・(1/2)dt＝[t${sup(n + 1)}/${2 * (n + 1)}]＝(${top}${sup(n + 1)} − ${a}${sup(n + 1)})/${2 * (n + 1)}＝{{${v}}}。`, trap: "区間を x のまま (0 から " + c + ") にしない。" },
    ],
  };
}

function bubun(r: Rng): QuestionBody {
  const a = r.int(1, 4);
  const b = r.int(1, 4);
  const bx = (k: number) => (k === 1 ? "e" : `${k}e`);
  const ex = (k: number, m: number) => `${bx(k)}${m === 0 ? "" : ` ${pm(m)}`}`;
  const opts = [ex(b, a - b), ex(a + b, -a - b), ex(a + b, -b), ex(b, -a - b)];
  const uniq = [...new Set(opts)];
  const idx = r.shuffle(uniq.map((_, i) => i));
  return {
    prompt: `定積分 ∫[0→1] (${a === 1 ? "" : a}x ＋ ${b})eˣ dx を求めなさい。`,
    answer: {
      kind: "choice",
      options: idx.map((i) => uniq[i]),
      correct: idx.indexOf(0),
      why: idx.map((i) => (i === 0 ? `正しい。[(${a === 1 ? "" : a}x ＋ ${b})eˣ]₀¹ − ${a === 1 ? "" : a}[eˣ]₀¹＝(${a + b})e − ${b} − ${a === 1 ? "" : a}(e − 1)。` : "部分積分のあとの「− ∫f′g dx」の項を落としたか、符号をまちがえた値。")),
    },
    point: "多項式を微分する側、eˣ を積分する側にする",
    steps: [
      { title: "部分積分", body: `∫(${a === 1 ? "" : a}x ＋ ${b})eˣdx＝(${a === 1 ? "" : a}x ＋ ${b})eˣ − ∫${a === 1 ? "" : a}eˣdx。`, back: [S3] },
      { title: "代入する", body: `(${a + b}e − ${b}) − ${a === 1 ? "" : a}(e − 1)＝{{${uniq[0]}}}。`, trap: "− ∫f′(x)g(x)dx の項を忘れない。" },
    ],
  };
}

function bibunBunsu(r: Rng): QuestionBody {
  const a = r.int(1, 6);
  const b = r.int(1, 6);
  const v = frac(1 + a + b, b);
  return {
    prompt: `定積分 ∫[0→1] (2x ＋ ${a})/(x² ＋ ${a === 1 ? "" : a}x ＋ ${b}) dx の値は log □ と表される。□ に入る数を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], labels: ["log"], calc: `(1+${a}+${b})/${b}` },
    point: "分子が分母の導関数なら ∫f′/f dx＝log|f|",
    steps: [
      { title: "形を見る", body: `(x² ＋ ${a === 1 ? "" : a}x ＋ ${b})′＝2x ＋ ${a} なので、f′(x)/f(x) の形です。`, back: [S4] },
      { title: "積分する", body: `[log(x² ＋ ${a === 1 ? "" : a}x ＋ ${b})]₀¹＝log ${1 + a + b} − log ${b}＝{{log ${F(v)}}}。`, trap: "log A − log B＝log(A/B)。引き算のまま答えない。" },
    ],
  };
}

function chikanRoot(r: Rng): QuestionBody {
  const u = r.int(1, 2); // u＝0 だと x√x になり、置きかえがいらない
  const w = r.int(u + 1, 3);
  const m = r.int(0, 3);
  const b = u * u;
  const c = w * w - b;
  const k = m - b;
  // x＋m ＝ t＋(m−b)。∫[b→w²] (t＋k)√t dt ＝ (2/5)(w⁵−u⁵) ＋ (2/3)k(w³−u³)
  const v = frac(6 * (w ** 5 - u ** 5) + 10 * k * (w ** 3 - u ** 3), 15);
  const inside = b === 0 ? "x" : `x ＋ ${b}`;
  const outer = m === 0 ? "x" : `(x ＋ ${m})`;
  const tk = k === 0 ? "t" : `t ${pm(k)}`;
  return {
    prompt: `定積分 ∫[0→${c}] ${outer}√(${inside}) dx を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `2/5*(${w}^5-${u}^5)+2/3*(${k})*(${w}^3-${u}^3)` },
    point: "√ の中を t とおき、x を t で表す",
    steps: [
      { title: "置きかえる", body: `t＝${inside} とおくと ${m === 0 ? "x" : "x ＋ " + m}＝${tk}、dx＝dt。x：0→${c} のとき t：${b}→${w * w}。`, back: [S2, S4] },
      { title: "t で積分", body: `∫(${tk})√t dt＝(2/5)t^(5/2)${k === 0 ? "" : ` ${k < 0 ? "−" : "＋"} (2/3)${Math.abs(k) === 1 ? "" : `・${Math.abs(k)}`}t^(3/2)`}。`, trap: "t^(5/2) は (√t)⁵。t＝" + w * w + " なら " + w + "⁵。" },
      { title: "代入する", body: `区間 ${b}→${w * w} で計算して {{${F(v)}}}。` },
    ],
  };
}

function kubun(r: Rng): QuestionBody {
  const a = r.int(0, 3);
  const b = r.int(1, 3);
  const v = frac(3 * a * a + 3 * a * b + b * b, 3);
  const inner = a === 0 ? `${b === 1 ? "" : b}k/n` : `${a} ＋ ${b === 1 ? "" : b}k/n`;
  return {
    prompt: `極限 lim[n→∞] (1/n)Σ[k＝1〜n] (${inner})² を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `${a}^2+${a}*${b}+${b}^2/3` },
    point: "(1/n)Σf(k/n) → ∫₀¹f(x)dx",
    steps: [
      { title: "定積分に直す", body: `k/n を x とみて、∫[0→1] (${a === 0 ? "" : `${a} ＋ `}${b === 1 ? "" : b}x)² dx。`, back: [S5] },
      { title: "計算する", body: `展開して積分すると ${a * a} ＋ ${a * b} ＋ ${b * b}/3＝{{${v}}}。`, trap: "1/n が x の幅 dx、k/n が x にあたる。" },
    ],
  };
}

export const H_MATH_3_SEKIBUN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅲ",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "基本の積分",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kihon", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: kihon },
        { id: "bibun-bunsu", type: "A", difficulty: 1, points: 15, seconds: 90, skill: "知識・技能", generate: bibunBunsu },
      ],
    },
    {
      title: "置換積分と部分積分",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "chikan", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "知識・技能", generate: chikan },
        { id: "bubun", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "知識・技能", generate: bubun },
      ],
    },
    {
      title: "区分求積法と、方法を選ぶ積分",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kubun", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "思考・判断・表現", generate: kubun },
        { id: "chikan-root", type: "A", difficulty: 3, points: 22, seconds: 240, skill: "思考・判断・表現", generate: chikanRoot },
      ],
    },
  ],
};
