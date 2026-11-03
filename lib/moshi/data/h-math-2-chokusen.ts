// 数学Ⅱ「点と直線」の単元模試 (A: 座標を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 距離は √(Δx²＋Δy²)、点と直線の距離は |ax₀＋by₀＋c|/√(a²＋b²) を calc に書いて照合する。
//   内分点・外分点は (nA＋mB)/(m＋n)・(−nA＋mB)/(m−n) を equations に書く (座標が整数になるように B を A から作る)。
//   直線の式は傾きと通る点を先に決め、採点器が式として照合する (scripts/check-moshi.ts がシード1〜100で確かめる)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-2-chokusen";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "2点間の距離は三平方の定理");
const S2 = L(2, "内分点と外分点");
const S3 = L(3, "直線の方程式：1点と傾きで決まる");
const S4 = L(4, "平行と垂直は傾きでわかる");
const S5 = L(5, "点と直線の距離");

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const D = (s: string | number) => String(s).replace(/-/g, "−");
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
/** 有理数係数の多項式。ts は [分子, 分母, 文字] */
function polyQ(ts: [number, number, string][], ascii = false): string {
  let out = "";
  for (const [n0, d0, m0] of ts) {
    if (n0 === 0) continue;
    let n = n0;
    let d = d0;
    if (d < 0) [n, d] = [-n, -d];
    const g = gcd(n, d);
    n /= g;
    d /= g;
    const m = ascii ? m0.replace(/²/g, "^2") : m0;
    const a = Math.abs(n);
    const body = d === 1 ? (m && a === 1 ? m : `${a}${m}`) : ascii ? `${a}/${d}${m}` : m ? `(${a}/${d})${m}` : `${a}/${d}`;
    if (!out) out = (n < 0 ? (ascii ? "-" : "−") : "") + body;
    else out += ascii ? `${n < 0 ? "-" : "+"}${body}` : ` ${n < 0 ? "−" : "+"} ${body}`;
  }
  return out || "0";
}
const pt = (x: number, y: number) => `(${D(x)}, ${D(y)})`;
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
/** √n の文字列 */
const root = (n: number) => {
  const [k, m] = sq(n);
  return m === 1 ? String(k) : `${k === 1 ? "" : k}√${m}`;
};

function kyori(r: Rng): QuestionBody {
  const x1 = r.int(-5, 5);
  const y1 = r.int(-5, 5);
  const dx = nz(r, -6, 6);
  const dy = nz(r, -6, 6);
  const x2 = x1 + dx;
  const y2 = y1 + dy;
  const n = dx * dx + dy * dy;
  const ans = root(n);
  return {
    prompt: `2点 A${pt(x1, y1)}、B${pt(x2, y2)} 間の距離を求めなさい。`,
    answer: { kind: "num", answerKind: sq(n)[1] === 1 ? "num" : "surd", answer: [ans], calc: `√${n}` },
    point: "x 座標の差・y 座標の差で直角三角形を作る",
    steps: [
      { title: "座標の差", body: `x 座標の差は ${D(dx)}、y 座標の差は ${D(dy)}。`, back: [S1] },
      { title: "三平方の定理", body: `AB＝√(${pa(dx)}²＋${pa(dy)}²)＝√${n}＝{{${ans}}}。`, trap: "差を2乗するので、引く順番が逆でも答えは同じ。2乗を忘れて足さない。" },
    ],
  };
}

const RATIOS: [number, number][] = [
  [1, 2],
  [2, 1],
  [1, 3],
  [3, 1],
  [2, 3],
  [3, 2],
  [3, 4],
];

function naibun(r: Rng): QuestionBody {
  const [m, n] = r.pick(RATIOS);
  const x1 = r.int(-5, 5);
  const y1 = r.int(-5, 5);
  const u = nz(r, -2, 2);
  const v = r.int(-2, 2);
  const x2 = x1 + (m + n) * u;
  const y2 = y1 + (m + n) * v;
  const X = x1 + m * u;
  const Y = y1 + m * v;
  return {
    prompt: `2点 A${pt(x1, y1)}、B${pt(x2, y2)} を結ぶ線分 AB を ${m}：${n} に内分する点の座標を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(X), String(Y)], labels: ["x =", "y ="], equations: [`x=(${n}*(${x1})+${m}*(${x2}))/${m + n}`, `y=(${n}*(${y1})+${m}*(${y2}))/${m + n}`] },
    point: "m：n に内分する点は (nA＋mB)/(m＋n)",
    steps: [
      { title: "内分点の公式", body: `x＝(${n}×${pa(x1)}＋${m}×${pa(x2)})/${m + n}、y＝(${n}×${pa(y1)}＋${m}×${pa(y2)})/${m + n}。`, back: [S2] },
      { title: "計算する", body: `x＝{{${D(X)}}}、y＝{{${D(Y)}}}。`, trap: "A には n、B には m をかける（遠いほうの比をかける）。逆にしない。" },
    ],
  };
}

function gaibun(r: Rng): QuestionBody {
  const [m, n] = r.pick(RATIOS.filter(([a, b]) => Math.abs(a - b) <= 2));
  const x1 = r.int(-4, 4);
  const y1 = r.int(-4, 4);
  const u = nz(r, -2, 2);
  const v = r.int(-2, 2);
  const x2 = x1 + (m - n) * u;
  const y2 = y1 + (m - n) * v;
  const X = x1 + m * u;
  const Y = y1 + m * v;
  return {
    prompt: `2点 A${pt(x1, y1)}、B${pt(x2, y2)} を結ぶ線分 AB を ${m}：${n} に外分する点の座標を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(X), String(Y)], labels: ["x =", "y ="], equations: [`x=(-${n}*(${x1})+${m}*(${x2}))/(${m - n})`, `y=(-${n}*(${y1})+${m}*(${y2}))/(${m - n})`] },
    point: "外分は n を −n にかえて、内分と同じ式",
    steps: [
      { title: "外分点の公式", body: `m：n に外分する点は (−nA＋mB)/(m−n)。x＝(−${n}×${pa(x1)}＋${m}×${pa(x2)})/${pa(m - n)}。`, back: [S2] },
      { title: "計算する", body: `x＝{{${D(X)}}}、y＝(−${n}×${pa(y1)}＋${m}×${pa(y2)})/${pa(m - n)}＝{{${D(Y)}}}。`, trap: `外分点は線分の外にある。${m > n ? "B の先" : "A の手前"}にあるか確かめる。` },
    ],
  };
}

function chokusen(r: Rng): QuestionBody {
  const half = r.bool(0.3);
  const kn = half ? r.pick([1, -1, 3, -3]) : nz(r, -3, 3);
  const kd = half ? 2 : 1;
  const x1 = r.int(-4, 4);
  const y1 = r.int(-5, 5);
  const dx = kd * r.pick([1, 2, -1]);
  const x2 = x1 + dx;
  const y2 = y1 + (kn * dx) / kd;
  // y＝k(x−x1)＋y1 → 切片 y1 − k x1
  const cn = y1 * kd - kn * x1;
  const ans = polyQ([[kn, kd, "x"], [cn, kd, ""]], true);
  return {
    prompt: `2点 ${pt(x1, y1)}、${pt(x2, y2)} を通る直線の方程式を、y＝ の形で求めなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [ans], labels: ["y ="] },
    point: "傾きを出してから、1点を通る式 y−y₁＝m(x−x₁)",
    steps: [
      { title: "傾き", body: `傾きは (${D(y2)}−${pa(y1)})/(${D(x2)}−${pa(x1)})＝{{${frac(kn, kd)}}}。`, back: [S3] },
      { title: "1点を通る式", body: `y − ${pa(y1)}＝${frac(kn, kd)}(x − ${pa(x1)}) を整理して、{{y＝${polyQ([[kn, kd, "x"], [cn, kd, ""]])}}}。`, trap: "x の差と y の差を、同じ点の順で引く。" },
    ],
  };
}

function suichoku(r: Rng): QuestionBody {
  const k = r.pick([1, -1, 2, -2, 3, -3]);
  const c = r.int(-5, 5);
  const perp = r.bool(0.7);
  const x0 = k * r.int(-2, 2) || k;
  const y0 = r.int(-5, 5);
  let sn: number;
  let sd: number;
  if (perp) {
    sn = -1;
    sd = k;
  } else {
    sn = k;
    sd = 1;
  }
  // 切片 y0 − (sn/sd) x0
  const cn = y0 * sd - sn * x0;
  const ans = polyQ([[sn, sd, "x"], [cn, sd, ""]], true);
  const line = polyQ([[k, 1, "x"], [c, 1, ""]]);
  return {
    prompt: `点 ${pt(x0, y0)} を通り、直線 y＝${line} に${perp ? "垂直" : "平行"}な直線の方程式を、y＝ の形で求めなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [ans], labels: ["y ="] },
    point: perp ? "垂直 ⇔ 傾きの積が −1" : "平行 ⇔ 傾きが等しい",
    steps: [
      { title: "傾きを決める", body: perp ? `もとの傾きは ${D(k)}。垂直なので m×${pa(k)}＝−1 から {{m＝${frac(-1, k)}}}。` : `平行なので傾きは同じ {{${D(k)}}}。`, back: [S4] },
      { title: "点を通る式", body: `y − ${pa(y0)}＝${frac(sn, sd)}(x − ${pa(x0)}) から {{y＝${polyQ([[sn, sd, "x"], [cn, sd, ""]])}}}。`, back: [S3], trap: perp ? "符号を変えるだけ・逆数にするだけ、では垂直にならない。両方行う。" : undefined },
    ],
  };
}

const NORMALS: [number, number][] = [
  [3, 4],
  [4, 3],
  [1, 2],
  [2, 1],
  [1, 1],
  [1, 3],
  [5, 12],
  [2, 3],
  [12, 5],
];

function tento(r: Rng): QuestionBody {
  let [a, b] = r.pick(NORMALS);
  if (r.bool()) b = -b;
  if (r.bool(0.3)) [a, b] = [b, a];
  const c = r.int(-9, 9);
  let x0 = r.int(-4, 4);
  const y0 = r.int(-4, 4);
  if (a * x0 + b * y0 + c === 0) x0 += 1;
  const N = Math.abs(a * x0 + b * y0 + c);
  const S = a * a + b * b;
  const [k, m] = sq(S);
  let ans: string;
  if (m === 1) ans = frac(N, k, true);
  else {
    const g = gcd(N, k * m);
    const num = N / g;
    const den = (k * m) / g;
    ans = `${num === 1 ? "" : num}√${m}${den === 1 ? "" : `/${den}`}`;
  }
  const line = `${a < 0 ? "−" : ""}${Math.abs(a) === 1 ? "" : Math.abs(a)}x ${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}y${c === 0 ? "" : ` ${c < 0 ? "−" : "+"} ${Math.abs(c)}`} ＝ 0`;
  return {
    prompt: `点 ${pt(x0, y0)} と直線 ${line} の距離を求めなさい。`,
    answer: { kind: "num", answerKind: m === 1 ? "num" : "surd", answer: [ans], calc: `${N}/√${S}` },
    point: "距離＝|ax₀＋by₀＋c|/√(a²＋b²)",
    steps: [
      { title: "分子：点を代入", body: `|${D(a)}×${pa(x0)} ＋ ${pa(b)}×${pa(y0)} ＋ ${pa(c)}|＝{{${N}}}。`, back: [S5] },
      { title: "分母：√(a²＋b²)", body: `√(${a * a}＋${b * b})＝${root(S)}。`, trap: "直線の式は「＝0」の形にしてから a、b、c を読む。" },
      { title: "答え", body: `${N}/${root(S)}${m === 1 ? "" : " を有理化して"}、{{${D(ans)}}}。` },
    ],
  };
}

export const H_MATH_2_CHOKUSEN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅱ",
  review: { status: "draft" },
  sections: [
    {
      title: "距離と内分点",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kyori", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: kyori },
        { id: "naibun", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: naibun },
      ],
    },
    {
      title: "外分点・直線の方程式",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "gaibun", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: gaibun },
        { id: "chokusen", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: chokusen },
        { id: "suichoku", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: suichoku },
      ],
    },
    {
      title: "点と直線の距離",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "tento", type: "A", difficulty: 3, points: 24, seconds: 150, skill: "思考・判断・表現", generate: tento }],
    },
  ],
};
