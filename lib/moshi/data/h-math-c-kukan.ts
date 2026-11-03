// 数学C「空間のベクトル」の単元模試 (A: 成分を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 距離・大きさは √(x²＋y²＋z²) を calc に書き、内積は成分の積の和。なす角は cos θ が ±1/2, ±√2/2, 0 になる
//   ベクトルの組を、座標の入れかえ・符号・正の数倍で作り、生成関数の中で cos θ を計算して角を決める。
//   垂直なベクトルは答え (s, t) を先に決めて係数を作り、equations で内積＝0 を確かめる。同じ平面上の点は
//   行列式 (3つのベクトルの体積)＝0 の式を equations に書く。球面は平方完成した中心と半径を calc で確かめる。
//   scripts/check-moshi.ts がシード1〜100で照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-c-kukan";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "空間の点は (x, y, z)。距離は成分の2乗の和の平方根");
const S2 = L(2, "内積も、成分の積を3つ足すだけ");
const S3 = L(3, "平面との違いは「1次独立なベクトルが3つ」");
const S4 = L(4, "直線上は1文字、平面上は2文字で表せる");
const S5 = L(5, "球面の方程式と、球面どうしの交わり");

const D = (s: string | number) => String(s).replace(/-/g, "−");
const pa = (n: number) => (n < 0 ? `(−${-n})` : String(n));
const nz = (r: Rng, a: number, b: number) => {
  let v = 0;
  while (v === 0) v = r.int(a, b);
  return v;
};
type V3 = [number, number, number];
const V = (v: number[]) => `(${v.map(D).join(", ")})`;
const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const sub = (a: number[], b: number[]): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
function surd(n: number): string {
  let out = 1;
  let k = n;
  for (let p = 2; p * p <= k; p++) while (k % (p * p) === 0) { k /= p * p; out *= p; }
  return k === 1 ? String(out) : `${out === 1 ? "" : out}√${k}`;
}
const sq = (v: string, c: number) => (c === 0 ? `${v}²` : `(${v} ${c < 0 ? "＋" : "−"} ${Math.abs(c)})²`);
const rv = (r: Rng, m: number): V3 => [r.int(-m, m), r.int(-m, m), r.int(-m, m)];

function kyori(r: Rng): QuestionBody {
  const A = rv(r, 5);
  let d = rv(r, 4);
  if (dot(d, d) === 0) d = [1, 2, 2];
  const B = [A[0] + d[0], A[1] + d[1], A[2] + d[2]];
  const s2 = dot(d, d);
  return {
    prompt: `2点 A${V(A)}、B${V(B)} の間の距離を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(s2)], calc: `√${s2}`, labels: ["AB ="] },
    point: "AB＝√{(x₂−x₁)²＋(y₂−y₁)²＋(z₂−z₁)²}",
    steps: [
      { title: "差をとる", body: `AB→＝${V(d)}。`, back: [S1] },
      { title: "2乗の和の平方根", body: `AB＝√(${d.map((x) => `${pa(x)}²`).join("＋")})＝√${s2}＝{{${surd(s2)}}}。`, trap: "z 成分を忘れて平面の公式のまま計算しない。" },
    ],
  };
}

function naiseki(r: Rng): QuestionBody {
  const a = rv(r, 5);
  const b = rv(r, 5);
  if (dot(a, a) === 0) a[0] = 2;
  const c = r.bool() ? rv(r, 3) : null;
  if (c) {
    const s = [b[0] + c[0], b[1] + c[1], b[2] + c[2]];
    const v = dot(a, s);
    return {
      prompt: `a⃗＝${V(a)}、b⃗＝${V(b)}、c⃗＝${V(c)} のとき、a⃗·(b⃗＋c⃗) を求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [String(v)], calc: `(${a[0]})*(${s[0]})+(${a[1]})*(${s[1]})+(${a[2]})*(${s[2]})` },
      point: "先に b⃗＋c⃗ を成分で求めてから内積",
      steps: [
        { title: "b⃗＋c⃗", body: `b⃗＋c⃗＝${V(s)}。`, back: [S1] },
        { title: "内積", body: `${a.map((x, i) => `${pa(x)}×${pa(s[i])}`).join("＋")}＝{{${D(v)}}}。`, back: [S2] },
      ],
    };
  }
  const v = dot(a, b);
  return {
    prompt: `a⃗＝${V(a)}、b⃗＝${V(b)} のとき、内積 a⃗·b⃗ を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], calc: `(${a[0]})*(${b[0]})+(${a[1]})*(${b[1]})+(${a[2]})*(${b[2]})` },
    point: "a⃗·b⃗＝x₁x₂＋y₁y₂＋z₁z₂",
    steps: [{ title: "成分の積を3つたす", body: `${a.map((x, i) => `${pa(x)}×${pa(b[i])}`).join("＋")}＝{{${D(v)}}}。`, back: [S2], trap: "内積は数。成分ごとの積を並べたベクトルにしない。" }],
  };
}

const BASE: [V3, V3][] = [
  [[1, 1, 0], [0, 1, 1]],
  [[1, 0, 1], [1, 1, 0]],
  [[1, -1, 0], [0, 1, -1]],
  [[1, 0, 0], [1, 1, 0]],
  [[1, 1, 0], [-1, 0, 0]],
  [[1, 0, 1], [0, 1, 0]],
  [[1, 1, 0], [-1, 0, 1]],
  [[1, 2, 2], [2, 1, -2]],
  [[0, 1, 1], [1, 0, 1]],
  [[1, 1, 0], [1, 1, 0]],
];
const ANG = [0, 30, 45, 60, 90, 120, 135, 150, 180];
function kakudo(r: Rng): QuestionBody {
  const [p, q] = r.pick(BASE);
  const perm = r.shuffle([0, 1, 2]);
  const sg = [r.pick([1, -1]), r.pick([1, -1]), r.pick([1, -1])];
  const ka = r.int(1, 3);
  const kb = r.int(1, 3);
  const a = perm.map((i, j) => p[i] * sg[j] * ka);
  const b = perm.map((i, j) => q[i] * sg[j] * kb);
  if (r.bool(0.25)) for (let j = 0; j < 3; j++) b[j] = -b[j];
  const d = dot(a, b);
  const cos = d / Math.sqrt(dot(a, a) * dot(b, b));
  const th = Math.round((Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI);
  const near = ANG.filter((x) => x !== th);
  const opts = r.shuffle([th, ...r.sample(near, 3)]);
  return {
    prompt: `a⃗＝${V(a)}、b⃗＝${V(b)} のなす角 θ (0°≦θ≦180°) を求めなさい。`,
    answer: { kind: "choice", options: opts.map((x) => `${x}°`), correct: opts.indexOf(th), why: opts.map((x) => (x === th ? `正しい。cos θ＝${D(d)}/√${dot(a, a) * dot(b, b)} を計算した値。` : `cos ${x}° にはならない。cos θ＝a⃗·b⃗/(|a⃗||b⃗|) を計算し直す。`)) },
    point: "cos θ＝a⃗·b⃗/(|a⃗||b⃗|)",
    steps: [
      { title: "内積と大きさ", body: `a⃗·b⃗＝${D(d)}、|a⃗|＝${surd(dot(a, a))}、|b⃗|＝${surd(dot(b, b))}。`, back: [S1, S2] },
      { title: "cos θ", body: `cos θ＝${D(d)}÷(${surd(dot(a, a))}×${surd(dot(b, b))})${d === 0 ? "＝0" : ""}。よって {{θ＝${th}°}}。`, trap: d < 0 ? "内積が負なので鈍角。鋭角の答えと取りちがえない。" : "cos θ が正なら鋭角。" },
    ],
  };
}

function suichoku(r: Rng): QuestionBody {
  const s = nz(r, -4, 4);
  const t = nz(r, -4, 4);
  const p: V3 = [1, s, t];
  let a: V3 = [0, 0, 0];
  let b: V3 = [0, 0, 0];
  for (let i = 0; i < 50; i++) {
    const a2 = nz(r, -3, 3);
    const a3 = r.int(-3, 3);
    const b2 = r.int(-3, 3);
    const b3 = nz(r, -3, 3);
    a = [-(a2 * s + a3 * t), a2, a3];
    b = [-(b2 * s + b3 * t), b2, b3];
    if (a2 * b3 - a3 * b2 !== 0) break;
  }
  return {
    prompt: `a⃗＝${V(a)}、b⃗＝${V(b)} の両方に垂直なベクトル p⃗＝(1, s, t) について、s、t の値を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(s), String(t)], labels: ["s =", "t ="], equations: [`${a[0]}+(${a[1]})*s+(${a[2]})*t=0`, `${b[0]}+(${b[1]})*s+(${b[2]})*t=0`] },
    point: "垂直 ⇔ 内積＝0 を2本立てて連立",
    steps: [
      { title: "内積＝0", body: `a⃗·p⃗＝${D(a[0])}${a[1] < 0 ? "−" : "＋"}${Math.abs(a[1]) === 1 ? "" : Math.abs(a[1])}s${a[2] < 0 ? "−" : "＋"}${Math.abs(a[2]) === 1 ? "" : Math.abs(a[2])}t＝0、b⃗·p⃗＝${D(b[0])}${b[1] < 0 ? "−" : "＋"}${Math.abs(b[1]) === 1 ? "" : Math.abs(b[1])}s${b[2] < 0 ? "−" : "＋"}${Math.abs(b[2]) === 1 ? "" : Math.abs(b[2])}t＝0。`, back: [S2] },
      { title: "連立方程式", body: `解くと {{s＝${D(s)}、t＝${D(t)}}}。p⃗＝${V(p)}。`, trap: "求めた p⃗ を a⃗、b⃗ と内積して 0 になるか確かめる。" },
    ],
  };
}

function kyumen(r: Rng): QuestionBody {
  const c = [r.int(-4, 4), r.int(-4, 4), r.int(-4, 4)];
  const R2 = r.pick([4, 9, 16, 25, 5, 8, 12, 20, 36]);
  const k = -2 * c[0];
  const l = -2 * c[1];
  const m = -2 * c[2];
  const n = c[0] ** 2 + c[1] ** 2 + c[2] ** 2 - R2;
  const term = (co: number, v: string) => (co === 0 ? "" : ` ${co < 0 ? "−" : "＋"} ${Math.abs(co) === 1 ? "" : Math.abs(co)}${v}`);
  const eq = `x²＋y²＋z²${term(k, "x")}${term(l, "y")}${term(m, "z")}${n === 0 ? "" : ` ${n < 0 ? "−" : "＋"} ${Math.abs(n)}`}＝0`;
  if (r.bool()) {
    return {
      prompt: `球面 ${eq} の半径を求めなさい。`,
      answer: { kind: "num", answerKind: "surd", answer: [surd(R2)], calc: `√${(k / 2) ** 2 + (l / 2) ** 2 + (m / 2) ** 2 - n}` },
      point: "x, y, z それぞれ平方完成する",
      steps: [
        { title: "平方完成", body: `${sq("x", c[0])}＋${sq("y", c[1])}＋${sq("z", c[2])}＝${R2}。`, back: [S5] },
        { title: "半径", body: `中心 ${V(c)}、半径 √${R2}＝{{${surd(R2)}}}。`, trap: `右辺の ${R2} は半径の2乗。そのまま半径にしない。` },
      ],
    };
  }
  // 平面 z＝h との交わりの円の半径
  const h = c[2] + r.pick([-2, -1, 1, 2].filter((o) => o * o < R2));
  const d2 = R2 - (h - c[2]) ** 2;
  return {
    prompt: `球面 ${eq} と平面 z＝${D(h)} が交わってできる円の半径を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(d2)], calc: `√${d2}`, equations: [`x^2=${R2}-(${h}-(${c[2]}))^2`] },
    point: "中心から平面までの距離 d として、円の半径は √(r²−d²)",
    steps: [
      { title: "中心と半径", body: `平方完成すると、中心 ${V(c)}、半径 ${surd(R2)}。`, back: [S5] },
      { title: "平面までの距離", body: `中心から平面 z＝${D(h)} までの距離は |${D(h)}−${pa(c[2])}|＝${Math.abs(h - c[2])}。` },
      { title: "三平方の定理", body: `円の半径は √(${R2}−${(h - c[2]) ** 2})＝{{${surd(d2)}}}。`, trap: "z＝h を代入して x, y の式にしても求められる。" },
    ],
  };
}

function kyomen(r: Rng): QuestionBody {
  let A: V3 = [0, 0, 0];
  let u: V3 = [1, 0, 0];
  let v: V3 = [0, 1, 0];
  let s = 1;
  let t = 1;
  for (let i = 0; i < 50; i++) {
    A = rv(r, 3);
    u = rv(r, 3);
    v = rv(r, 3);
    s = nz(r, -2, 3);
    t = nz(r, -2, 3);
    if (u[0] * v[1] - u[1] * v[0] !== 0) break;
  }
  const B = [A[0] + u[0], A[1] + u[1], A[2] + u[2]];
  const Cp = [A[0] + v[0], A[1] + v[1], A[2] + v[2]];
  const P = [A[0] + s * u[0] + t * v[0], A[1] + s * u[1] + t * v[1], A[2] + s * u[2] + t * v[2]];
  const ap = sub(P, A);
  // 行列式 det(u, v, AP)＝0 (AP の z 成分を k−A₃ とおく)
  const det = `(${u[0]})*((${v[1]})*(k-(${A[2]}))-(${v[2]})*(${ap[1]}))-(${u[1]})*((${v[0]})*(k-(${A[2]}))-(${v[2]})*(${ap[0]}))+(${u[2]})*((${v[0]})*(${ap[1]})-(${v[1]})*(${ap[0]}))=0`;
  return {
    prompt: `4点 A${V(A)}、B${V(B)}、C${V(Cp)}、P(${D(P[0])}, ${D(P[1])}, k) が同じ平面上にあるように、k の値を定めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(P[2])], labels: ["k ="], equations: [det] },
    point: "AP→＝sAB→＋tAC→ とおき、x, y 成分で s, t を決める",
    steps: [
      { title: "ベクトルで表す", body: `AB→＝${V(u)}、AC→＝${V(v)}、AP→＝(${D(ap[0])}, ${D(ap[1])}, ${A[2] === 0 ? "k" : `k${A[2] < 0 ? "＋" : "−"}${Math.abs(A[2])}`})。AP→＝sAB→＋tAC→ とおきます。`, back: [S3, S4] },
      { title: "x, y 成分", body: `${D(ap[0])}＝${D(u[0])}s＋${pa(v[0])}t、${D(ap[1])}＝${D(u[1])}s＋${pa(v[1])}t を解いて {{s＝${D(s)}、t＝${D(t)}}}。` },
      { title: "z 成分", body: `${A[2] === 0 ? "k" : `k${A[2] < 0 ? "＋" : "−"}${Math.abs(A[2])}`}＝${D(u[2])}×${pa(s)}＋${pa(v[2])}×${pa(t)}＝${D(ap[2])} より {{k＝${D(P[2])}}}。`, trap: "s, t は x, y 成分だけで決め、z 成分は k を求めるのに使う。" },
    ],
  };
}

export const H_MATH_C_KUKAN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学C",
  review: { status: "draft" },
  sections: [
    {
      title: "距離と内積",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kyori", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: kyori },
        { id: "naiseki", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: naiseki },
        { id: "kakudo", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: kakudo },
      ],
    },
    {
      title: "垂直・球面・同じ平面上の点",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "suichoku", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "思考・判断・表現", generate: suichoku },
        { id: "kyumen", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: kyumen },
        { id: "kyomen", type: "A", difficulty: 3, points: 24, seconds: 210, skill: "思考・判断・表現", generate: kyomen },
      ],
    },
  ],
};
