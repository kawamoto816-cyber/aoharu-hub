// 数学Ⅱ「加法定理」の単元模試 (A: 角・値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 15° の仲間の値は表から答えを出し、calc は加法定理で分けた式 (sin45°cos30°−cos45°sin30° など) で別に作って照合する
//   (tan は 2±√3 がみたす2次方程式を equations に)。2倍角・半角は sin²＋cos²＝1 と公式から作る式を calc に、合成は √(a²＋b²) を calc に、
//   tan の加法定理は分数の式を calc に書く。積和は答えを和の形の表から出し、calc は (a√6＋b√2)/4 どうしの積で別に作る
//   (scripts/check-moshi.ts がシード1〜100で照合する)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-2-kahou";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "加法定理の3つの式");
const S3 = L(3, "例：sin75° と tan75°");
const S4 = L(4, "2倍角・半角の公式");
const S5 = L(5, "三角関数の合成");
const S6 = L(6, "積和・和積の公式");

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const D = (s: string | number) => String(s).replace(/-/g, "−");
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
function sq(n: number): [number, number] {
  let k = 1;
  let m = n;
  for (let i = 2; i * i <= m; i++)
    while (m % (i * i) === 0) {
      m /= i * i;
      k *= i;
    }
  return [k, m];
}
/** (p＋q√t)/d を整理した文字列 */
function surd(p: number, q: number, t: number, d = 1, ascii = false): string {
  const [k, m] = sq(t);
  q *= k;
  t = m;
  if (t === 1) {
    p += q;
    q = 0;
  }
  if (d < 0) [p, q, d] = [-p, -q, -d];
  const g = gcd(gcd(p, q), d) || 1;
  [p, q, d] = [p / g, q / g, d / g];
  let s: string;
  if (q === 0) s = frac(p, d, true);
  else {
    const rt = `${Math.abs(q) === 1 ? "" : Math.abs(q)}√${t}`;
    if (p === 0) s = `${q < 0 ? "-" : ""}${rt}${d === 1 ? "" : `/${d}`}`;
    else {
      const inner = `${p}${q < 0 ? "-" : "+"}${rt}`;
      s = d === 1 ? inner : `(${inner})/${d}`;
    }
  }
  return ascii ? s : D(s);
}
/** (a√6＋b√2)/4 の文字列 (a、b は ±1) */
function v62(a: number, b: number): string {
  if (a > 0 && b > 0) return "(√6+√2)/4";
  if (a > 0) return "(√6-√2)/4";
  if (b > 0) return "(√2-√6)/4";
  return "-(√6+√2)/4";
}

// 30°・45° の仲間の sin・cos (calc 用の ASCII)
const S: Record<number, string> = { 30: "1/2", 45: "√2/2", 60: "√3/2", 120: "√3/2", 135: "√2/2" };
const C: Record<number, string> = { 30: "√3/2", 45: "√2/2", 60: "1/2", 120: "-1/2", 135: "-√2/2" };
const F15: { deg: number; A: number; B: number; plus: boolean; sin: [number, number]; cos: [number, number]; tan: string; tanEq: string }[] = [
  { deg: 15, A: 45, B: 30, plus: false, sin: [1, -1], cos: [1, 1], tan: "2-√3", tanEq: "x^2-4x+1=0" },
  { deg: 75, A: 45, B: 30, plus: true, sin: [1, 1], cos: [1, -1], tan: "2+√3", tanEq: "x^2-4x+1=0" },
  { deg: 105, A: 60, B: 45, plus: true, sin: [1, 1], cos: [-1, 1], tan: "-2-√3", tanEq: "x^2+4x+1=0" },
  { deg: 165, A: 135, B: 30, plus: true, sin: [1, -1], cos: [-1, -1], tan: "-2+√3", tanEq: "x^2+4x+1=0" },
];

function kahou(r: Rng): QuestionBody {
  const e = r.pick(F15);
  const f = r.pick(["sin", "cos", "sin", "cos", "tan"]);
  const radian = r.bool(0.4);
  const g = gcd(e.deg, 180);
  const angle = radian ? `${e.deg / g === 1 ? "" : e.deg / g}π/${180 / g}` : `${e.deg}°`;
  const pm = e.plus ? "＋" : "−";
  if (f === "tan") {
    return {
      prompt: `tan ${angle} の値を求めなさい。`,
      answer: { kind: "num", answerKind: "surd", answer: [e.tan], equations: [e.tanEq] },
      point: "tan(α±β)＝(tanα±tanβ)/(1∓tanαtanβ)",
      steps: [
        { title: "角を分ける", body: `${e.deg}°＝${e.A}° ${pm} ${e.B}° として、tan の加法定理を使います。`, back: [S1] },
        { title: "代入して有理化", body: `tan${e.A}°、tan${e.B}° を入れて分母を有理化すると {{${D(e.tan)}}}。`, back: [S3], trap: "分母の符号は分子と逆（＋なら 1 − …）。" },
      ],
    };
  }
  const val = f === "sin" ? v62(...e.sin) : v62(...e.cos);
  const calc =
    f === "sin"
      ? `(${S[e.A]})*(${C[e.B]})${e.plus ? "+" : "-"}(${C[e.A]})*(${S[e.B]})`
      : `(${C[e.A]})*(${C[e.B]})${e.plus ? "-" : "+"}(${S[e.A]})*(${S[e.B]})`;
  const formula = f === "sin" ? `sin(α${pm}β)＝sinαcosβ ${pm} cosαsinβ` : `cos(α${pm}β)＝cosαcosβ ${e.plus ? "−" : "＋"} sinαsinβ`;
  return {
    prompt: `${f} ${angle} の値を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [val], calc },
    point: "知っている角の和・差に分けて加法定理",
    steps: [
      { title: "角を分ける", body: `${angle}${radian ? `＝${e.deg}°` : ""}＝${e.A}° ${pm} ${e.B}°。`, back: [S1] },
      { title: "加法定理", body: `{{${formula}}} に代入します。`, back: [S3], trap: f === "cos" ? "cos の加法定理は符号が逆になる（和なら −）。" : undefined },
      { title: "計算", body: `√2×√3＝√6 に気をつけて計算すると {{${D(val)}}}。` },
    ],
  };
}

const PQ: [number, number][] = [
  [1, 3],
  [2, 3],
  [1, 4],
  [3, 4],
  [3, 5],
  [4, 5],
  [2, 5],
  [1, 5],
  [5, 13],
  [12, 13],
];

function nibai(r: Rng): QuestionBody {
  const [p, q] = r.pick(PQ);
  const obtuse = r.bool(0.4);
  const n = q * q - p * p;
  const [k, m] = sq(n);
  const cs = obtuse ? -1 : 1;
  const askSin = r.bool();
  let ans: string;
  let calc: string;
  let how: string;
  if (askSin) {
    // 2×(p/q)×(cs k√m/q)
    ans = surd(0, 2 * p * k * cs, m, q * q, true);
    calc = `2*(${p}/${q})*(${cs}*√${n}/${q})`;
    how = `cosα＝${surd(0, cs * k, m, q)} なので、sin2α＝2sinαcosα＝2×${frac(p, q)}×(${surd(0, cs * k, m, q)})`;
  } else {
    ans = frac(q * q - 2 * p * p, q * q, true);
    calc = `1-2*(${p}/${q})^2`;
    how = `cos2α＝1 − 2sin²α＝1 − 2×${frac(p * p, q * q)}`;
  }
  return {
    prompt: `${obtuse ? "π/2＜α＜π" : "0＜α＜π/2"} で sinα＝${frac(p, q)} のとき、${askSin ? "sin2α" : "cos2α"} の値を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [ans], calc },
    point: askSin ? "sin2α＝2sinαcosα。cosα の符号に注意" : "cos2α＝1−2sin²α なら sin だけで出せる",
    steps: [
      { title: "2倍角の公式", body: askSin ? "{{sin2α＝2sinαcosα}}。まず cosα を sin²α＋cos²α＝1 から求めます。" : "{{cos2α＝1 − 2sin²α}} を使うと cosα はいりません。", back: [S4] },
      { title: "代入する", body: `${how}＝{{${D(ans)}}}。`, trap: obtuse && askSin ? "α が鈍角なので cosα＜0。符号を落とさない。" : "sin²α は (sinα)²。2sinα を2乗しない。" },
    ],
  };
}

function gousei(r: Rng): QuestionBody {
  const a = nz(r, -4, 4);
  const b = nz(r, -4, 4);
  const c = r.int(-4, 4);
  const mx = r.bool();
  const R2 = a * a + b * b;
  const [k, m] = sq(R2);
  const ans = surd(c, mx ? k : -k, m, 1, true);
  const f = `${a < 0 ? "−" : ""}${Math.abs(a) === 1 ? "" : Math.abs(a)}sinθ ${b < 0 ? "−" : "＋"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}cosθ${c === 0 ? "" : ` ${c < 0 ? "−" : "＋"} ${Math.abs(c)}`}`;
  return {
    prompt: `関数 y＝${f} の${mx ? "最大値" : "最小値"}を求めなさい。（θ は実数全体を動く）`,
    answer: { kind: "num", answerKind: "surd", answer: [ans], calc: `${c}${mx ? "+" : "-"}√${R2}` },
    point: "a sinθ＋b cosθ＝√(a²＋b²) sin(θ＋α)",
    steps: [
      { title: "合成する", body: `${D(a)}sinθ ＋ ${D(b)}cosθ＝{{√${R2} sin(θ＋α)}}（α は cosα＝${D(a)}/√${R2}、sinα＝${D(b)}/√${R2} をみたす角）。`, back: [S5] },
      { title: "sin の範囲", body: `−1 ≦ sin(θ＋α) ≦ 1 なので、y は ${D(surd(c, -k, m))} 以上 ${D(surd(c, k, m))} 以下。${mx ? "最大値" : "最小値"}は {{${D(ans)}}}。`, trap: "最大値を a＋b としない。合成すると振幅は √(a²＋b²)。" },
    ],
  };
}

const HK: [number, number][] = [
  [1, 3],
  [1, 4],
  [3, 4],
  [1, 5],
  [3, 5],
  [1, 7],
  [1, 8],
  [7, 9],
  [1, 9],
];

function hankaku(r: Rng): QuestionBody {
  const [p0, q] = r.pick(HK);
  const p = r.bool() ? p0 : -p0;
  const askSin = r.bool();
  // sin²(α/2)＝(1−cosα)/2、cos²(α/2)＝(1＋cosα)/2
  let N = askSin ? q - p : q + p;
  let Dn = 2 * q;
  const g = gcd(N, Dn);
  N /= g;
  Dn /= g;
  const [k, m] = sq(N * Dn);
  const ans = surd(0, k, m, Dn, true);
  const f = askSin ? "sin" : "cos";
  return {
    prompt: `0＜α＜π で cosα＝${frac(p, q)} のとき、${f}(α/2) の値を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [ans], calc: `√${N * Dn}/${Dn}` },
    point: askSin ? "sin²(α/2)＝(1−cosα)/2" : "cos²(α/2)＝(1＋cosα)/2",
    steps: [
      { title: "半角の公式", body: `${f}²(α/2)＝(1 ${askSin ? "−" : "＋"} cosα)/2＝(1 ${askSin ? "−" : "＋"} (${frac(p, q)}))/2＝{{${frac(N, Dn)}}}。`, back: [S4] },
      { title: "符号と有理化", body: `0＜α/2＜π/2 なので ${f}(α/2)＞0。√(${frac(N, Dn)}) を有理化して {{${D(ans)}}}。`, trap: "α/2 の範囲で符号を決める。α の範囲で決めない。" },
    ],
  };
}

const TV: [number, number][] = [
  [1, 2],
  [1, 3],
  [2, 1],
  [3, 1],
  [1, 4],
  [3, 4],
  [4, 3],
  [2, 3],
  [3, 2],
  [-1, 2],
  [-1, 3],
  [-2, 1],
];

function tanwa(r: Rng): QuestionBody {
  let s = r.pick(TV);
  let t = r.pick(TV);
  const plus = r.bool(0.6);
  // 分母 1 ∓ st ≠ 0、分子 ≠ 0 のものを選ぶ
  for (let i = 0; i < 20; i++) {
    const den = s[1] * t[1] + (plus ? -1 : 1) * s[0] * t[0];
    const num = s[0] * t[1] + (plus ? 1 : -1) * t[0] * s[1];
    if (den !== 0 && num !== 0) break;
    s = r.pick(TV);
    t = r.pick(TV);
  }
  const nd = () => [s[0] * t[1] + (plus ? 1 : -1) * t[0] * s[1], s[1] * t[1] + (plus ? -1 : 1) * s[0] * t[0]];
  if (nd().some((x) => x === 0)) [s, t] = [
    [1, 2],
    [1, 3],
  ];
  const [n2, d2] = nd();
  const ss = `${s[0]}/${s[1]}`;
  const ts = `${t[0]}/${t[1]}`;
  const ans = frac(n2, d2, true);
  return {
    prompt: `tanα＝${frac(s[0], s[1])}、tanβ＝${frac(t[0], t[1])} のとき、tan(α ${plus ? "＋" : "−"} β) の値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], calc: `((${ss})${plus ? "+" : "-"}(${ts}))/(1${plus ? "-" : "+"}(${ss})*(${ts}))` },
    point: "tan(α±β)＝(tanα±tanβ)/(1∓tanαtanβ)",
    steps: [
      { title: "tan の加法定理", body: `tan(α ${plus ? "＋" : "−"} β)＝(tanα ${plus ? "＋" : "−"} tanβ)/(1 ${plus ? "−" : "＋"} tanαtanβ)。`, back: [S1] },
      { title: "代入する", body: `分母・分子に ${s[1] * t[1]} をかけて整理すると {{${frac(n2, d2)}}}。`, trap: "分母は 1 から始まる。符号は分子と逆。" },
    ],
  };
}

const ODD = [15, 45, 75, 105, 135, 165];
// (a√6＋b√2)/4 の係数
const SIN62: Record<number, [number, number]> = { 15: [1, -1], 45: [0, 2], 75: [1, 1], 105: [1, 1], 135: [0, 2], 165: [1, -1] };
const COS62: Record<number, [number, number]> = { 15: [1, 1], 45: [0, 2], 75: [1, -1], 105: [-1, 1], 135: [0, -2], 165: [-1, -1] };
// sin x＝(a＋b√3)/2 (x は 30° の倍数)
function sin30(x: number): [number, number] {
  const t = ((x % 360) + 360) % 360;
  const T: Record<number, [number, number]> = { 0: [0, 0], 30: [1, 0], 60: [0, 1], 90: [2, 0], 120: [0, 1], 150: [1, 0], 180: [0, 0], 210: [-1, 0], 240: [0, -1], 270: [-2, 0], 300: [0, -1], 330: [-1, 0] };
  return T[t];
}
const cos30 = (x: number) => sin30(x + 90);

function sekiwa(r: Rng): QuestionBody {
  const [A, B] = r.sample(ODD, 2).sort((x, y) => y - x);
  const kind = r.int(0, 2);
  let u: [number, number];
  let v: [number, number];
  let shown: string;
  let how: string;
  let f1: [number, number];
  let f2: [number, number];
  if (kind === 0) {
    shown = `sin${A}°cos${B}°`;
    u = sin30(A + B);
    v = sin30(A - B);
    how = `sinαcosβ＝{sin(α＋β)＋sin(α−β)}/2＝(sin${A + B}° ＋ sin${A - B}°)/2`;
    f1 = SIN62[A];
    f2 = COS62[B];
  } else if (kind === 1) {
    shown = `cos${A}°cos${B}°`;
    u = cos30(A + B);
    v = cos30(A - B);
    how = `cosαcosβ＝{cos(α＋β)＋cos(α−β)}/2＝(cos${A + B}° ＋ cos${A - B}°)/2`;
    f1 = COS62[A];
    f2 = COS62[B];
  } else {
    shown = `sin${A}°sin${B}°`;
    const w = cos30(A + B);
    u = [-w[0], -w[1]];
    v = cos30(A - B);
    how = `sinαsinβ＝−{cos(α＋β)−cos(α−β)}/2＝(cos${A - B}° − cos${A + B}°)/2`;
    f1 = SIN62[A];
    f2 = SIN62[B];
  }
  const P = u[0] + v[0];
  const Q = u[1] + v[1];
  const ans = surd(P, Q, 3, 4, true);
  const e = ([a, b]: [number, number]) => `((${a})*√6+(${b})*√2)/4`;
  return {
    prompt: `${shown} の値を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [ans], calc: `${e(f1)}*${e(f2)}` },
    point: "積を和に直すと、知っている角の値だけになる",
    steps: [
      { title: "積和の公式", body: `${how}。`, back: [S6] },
      { title: "値を入れる", body: `${A + B}° と ${A - B}° はどちらも 30° の倍数なので値がわかり、答えは {{${D(ans)}}}。`, trap: "sin15° などの値を直接かけてもよいが、√ の計算が増える。積和の公式が近道。" },
    ],
  };
}

export const H_MATH_2_KAHOU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅱ",
  review: { status: "draft" },
  sections: [
    {
      title: "加法定理と2倍角",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kahou", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: kahou },
        { id: "nibai", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: nibai },
      ],
    },
    {
      title: "合成・半角・tan の加法定理",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "gousei", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: gousei },
        { id: "hankaku", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: hankaku },
        { id: "tanwa", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: tanwa },
      ],
    },
    {
      title: "積和の公式",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "sekiwa", type: "A", difficulty: 3, points: 24, seconds: 180, skill: "思考・判断・表現", generate: sekiwa }],
    },
  ],
};
