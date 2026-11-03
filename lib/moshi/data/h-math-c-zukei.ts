// 数学C「ベクトルと図形」の単元模試 (A: 座標・比を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 内分点 (na⃗＋mb⃗)/(m＋n)、外分点 (−na⃗＋mb⃗)/(m−n)、重心 (a⃗＋b⃗＋c⃗)/3 を equations に書く。
//   2直線の交点は、OP＝pOA、OQ＝qOB のとき u＝(1−p)/(1−pq) から s＝1−u、t＝uq を分数で計算し、
//   equations にも同じ式を書いて照合する。直線上の点は p⃗＝a⃗＋t(b⃗−a⃗) の成分の式。
//   scripts/check-moshi.ts がシード1〜100で照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-c-zukei";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "内分と外分：どこで分けるかを線分で見る");
const S2 = L(2, "内分点・重心の位置ベクトルは公式で");
const S3 = L(3, "交点は「2通りに表して係数を比べる」");
const S4 = L(4, "直線や円も、ベクトルの式（ベクトル方程式）で表せる");

const D = (s: string | number) => String(s).replace(/-/g, "−");
const pa = (n: number) => (n < 0 ? `(−${-n})` : String(n));
const nz = (r: Rng, a: number, b: number) => {
  let v = 0;
  while (v === 0) v = r.int(a, b);
  return v;
};
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const fr = (n: number, d: number) => {
  const g = gcd(n, d) * (d < 0 ? -1 : 1);
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
};
const P = (x: number | string, y: number | string) => `(${D(x)}, ${D(y)})`;
function surd(n: number): string {
  let out = 1;
  let k = n;
  for (let p = 2; p * p <= k; p++) while (k % (p * p) === 0) { k /= p * p; out *= p; }
  return k === 1 ? String(out) : `${out === 1 ? "" : out}√${k}`;
}
const RATIOS: [number, number][] = [[1, 2], [2, 1], [1, 3], [3, 1], [2, 3], [3, 2], [1, 1], [3, 4], [1, 4], [4, 1]];

function naibun(r: Rng): QuestionBody {
  const [m, n] = r.pick(RATIOS);
  const A = [r.int(-6, 6), r.int(-6, 6)];
  const d = [nz(r, -3, 3) * (m + n), r.int(-3, 3) * (m + n)];
  const B = [A[0] + d[0], A[1] + d[1]];
  const x = (n * A[0] + m * B[0]) / (m + n);
  const y = (n * A[1] + m * B[1]) / (m + n);
  return {
    prompt: `2点 A${P(A[0], A[1])}、B${P(B[0], B[1])} を結ぶ線分 AB を ${m}:${n} に内分する点 P の座標を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(x), String(y)], labels: ["x 座標", "y 座標"], equations: [`x=(${n}*(${A[0]})+${m}*(${B[0]}))/${m + n}`, `y=(${n}*(${A[1]})+${m}*(${B[1]}))/${m + n}`] },
    point: "m:n の内分点は (na⃗＋mb⃗)/(m＋n)。係数は「向かいの比」",
    steps: [
      { title: "公式", body: `p⃗＝(${n === 1 ? "" : n}a⃗＋${m === 1 ? "" : m}b⃗)/${m + n}。`, back: [S1, S2], trap: "a⃗ には n、b⃗ には m をかける。逆にすると B 寄りと A 寄りが入れかわる。" },
      { title: "成分で計算", body: `x＝(${n}×${pa(A[0])}＋${m}×${pa(B[0])})÷${m + n}＝${D(x)}、y＝(${n}×${pa(A[1])}＋${m}×${pa(B[1])})÷${m + n}＝${D(y)}。{{P${P(x, y)}}}。` },
    ],
  };
}

function gaibun(r: Rng): QuestionBody {
  const [m, n] = r.pick(RATIOS.filter(([a, b]) => a !== b));
  const A = [r.int(-5, 5), r.int(-5, 5)];
  const k = Math.abs(m - n);
  const d = [nz(r, -3, 3) * k, r.int(-3, 3) * k];
  const B = [A[0] + d[0], A[1] + d[1]];
  const x = (-n * A[0] + m * B[0]) / (m - n);
  const y = (-n * A[1] + m * B[1]) / (m - n);
  return {
    prompt: `2点 A${P(A[0], A[1])}、B${P(B[0], B[1])} を結ぶ線分 AB を ${m}:${n} に外分する点 Q の座標を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(x), String(y)], labels: ["x 座標", "y 座標"], equations: [`x=(-${n}*(${A[0]})+${m}*(${B[0]}))/(${m}-${n})`, `y=(-${n}*(${A[1]})+${m}*(${B[1]}))/(${m}-${n})`] },
    point: "外分は m:(−n) の内分とみる",
    steps: [
      { title: "公式", body: `q⃗＝(−${n === 1 ? "" : n}a⃗＋${m === 1 ? "" : m}b⃗)/(${m}−${n})。`, back: [S1, S2] },
      { title: "成分で計算", body: `x＝(−${n}×${pa(A[0])}＋${m}×${pa(B[0])})÷${pa(m - n)}＝${D(x)}、y＝(−${n}×${pa(A[1])}＋${m}×${pa(B[1])})÷${pa(m - n)}＝${D(y)}。{{Q${P(x, y)}}}。`, trap: `${m}${m > n ? "＞" : "＜"}${n} なので、Q は線分 AB の ${m > n ? "B" : "A"} の外側にある。図で確かめる。` },
    ],
  };
}

function juushin(r: Rng): QuestionBody {
  const A = [r.int(-6, 6), r.int(-6, 6)];
  const B = [r.int(-6, 6), r.int(-6, 6)];
  if (r.bool()) {
    const G = [r.int(-3, 3), r.int(-3, 3)];
    const Cp = [3 * G[0] - A[0] - B[0], 3 * G[1] - A[1] - B[1]];
    return {
      prompt: `三角形 ABC の重心が G${P(G[0], G[1])} で、A${P(A[0], A[1])}、B${P(B[0], B[1])} のとき、頂点 C の座標を求めなさい。`,
      answer: { kind: "num", answerKind: "pair", answer: [String(Cp[0]), String(Cp[1])], labels: ["x 座標", "y 座標"], equations: [`(${A[0]}+(${B[0]})+x)/3=${G[0]}`, `(${A[1]}+(${B[1]})+y)/3=${G[1]}`] },
      point: "重心 g⃗＝(a⃗＋b⃗＋c⃗)/3 から c⃗＝3g⃗−a⃗−b⃗",
      steps: [
        { title: "重心の公式", body: "g⃗＝(a⃗＋b⃗＋c⃗)/3 なので {{c⃗＝3g⃗−a⃗−b⃗}}。", back: [S2] },
        { title: "成分で計算", body: `x＝3×${pa(G[0])}−${pa(A[0])}−${pa(B[0])}＝${D(Cp[0])}、y＝3×${pa(G[1])}−${pa(A[1])}−${pa(B[1])}＝${D(Cp[1])}。{{C${P(Cp[0], Cp[1])}}}。` },
      ],
    };
  }
  const Cp = [r.int(-6, 6), r.int(-6, 6)];
  const sx = A[0] + B[0] + Cp[0];
  const sy = A[1] + B[1] + Cp[1];
  return {
    prompt: `3点 A${P(A[0], A[1])}、B${P(B[0], B[1])}、C${P(Cp[0], Cp[1])} を頂点とする三角形 ABC の重心 G の座標を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [fr(sx, 3), fr(sy, 3)], labels: ["x 座標", "y 座標"], equations: [`x=(${A[0]}+(${B[0]})+(${Cp[0]}))/3`, `y=(${A[1]}+(${B[1]})+(${Cp[1]}))/3`] },
    point: "重心は3頂点の平均",
    steps: [{ title: "重心の公式", body: `g⃗＝(a⃗＋b⃗＋c⃗)/3。x＝${D(sx)}/3、y＝${D(sy)}/3 で {{G${P(fr(sx, 3), fr(sy, 3))}}}。`, back: [S2], trap: "重心は各成分を3でわる。2でわるのは中点。" }],
  };
}

function chokusen(r: Rng): QuestionBody {
  const A = [r.int(-5, 5), r.int(-5, 5)];
  const d = [nz(r, -4, 4), nz(r, -4, 4)];
  const t = r.pick([-2, -1, 2, 3, 4, 1 / 2, 3 / 2, -1 / 2]);
  const dd = Number.isInteger(t) ? d : [d[0] * 2, d[1] * 2];
  const B = [A[0] + dd[0], A[1] + dd[1]];
  const x0 = A[0] + t * dd[0];
  const y0 = A[1] + t * dd[1];
  const ts = Number.isInteger(t) ? String(t) : fr(Math.round(t * 2), 2);
  return {
    prompt: `2点 A${P(A[0], A[1])}、B${P(B[0], B[1])} を通る直線上の点 P は、実数 t を用いて OP→＝OA→＋t AB→ と表せる。P の x 座標が ${D(x0)} のとき、t の値と P の y 座標を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [ts, String(y0)], labels: ["t =", "y ="], equations: [`${A[0]}+t*(${dd[0]})=${x0}`, `y=${A[1]}+t*(${dd[1]})`] },
    point: "直線のベクトル方程式 p⃗＝a⃗＋t(b⃗−a⃗) を成分で書く",
    steps: [
      { title: "成分で表す", body: `AB→＝${P(dd[0], dd[1])} なので、P(${D(A[0])}${dd[0] < 0 ? "−" : "＋"}${Math.abs(dd[0])}t, ${D(A[1])}${dd[1] < 0 ? "−" : "＋"}${Math.abs(dd[1])}t)。`, back: [S4] },
      { title: "x 座標から t", body: `${D(A[0])}${dd[0] < 0 ? "−" : "＋"}${Math.abs(dd[0])}t＝${D(x0)} より {{t＝${D(ts)}}}。` },
      { title: "y 座標", body: `y＝${D(A[1])}＋${pa(dd[1])}×${D(ts)}＝{{${D(y0)}}}。`, trap: "t は「A から AB→ の何倍進んだか」。0≦t≦1 なら線分 AB 上、それ以外は延長上。" },
    ],
  };
}

function en(r: Rng): QuestionBody {
  const A = [r.int(-5, 5), r.int(-5, 5)];
  const d = [nz(r, -4, 4) * 2, r.int(-4, 4) * 2];
  const B = [A[0] + d[0], A[1] + d[1]];
  const M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  const AB2 = d[0] ** 2 + d[1] ** 2;
  return {
    prompt: `A${P(A[0], A[1])}、B${P(B[0], B[1])} とする。点 P の位置ベクトルを p⃗ として、(p⃗−a⃗)·(p⃗−b⃗)＝0 をみたす点 P 全体は円になる。この円の半径を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(AB2 / 4)], calc: `√${AB2}/2`, equations: [`x^2=${AB2}/4`] },
    point: "(p⃗−a⃗)·(p⃗−b⃗)＝0 は AB を直径とする円",
    steps: [
      { title: "式の意味", body: "AP→·BP→＝0 なので、∠APB＝90° (または P が A か B)。{{AB を直径とする円}}です。", back: [S4] },
      { title: "半径", body: `中心は AB の中点 ${P(M[0], M[1])}、AB＝√${AB2}。半径は AB/2＝{{${surd(AB2 / 4)}}}。`, trap: "AB そのものは直径。2でわるのを忘れない。" },
    ],
  };
}

/** 文字の前の分数の係数はかっこでくくる: (3/5)u */
const fp = (n: number, d: number) => (fr(n, d).includes("/") ? `(${fr(n, d)})` : fr(n, d));

function kouten(r: Rng): QuestionBody {
  const [p1, p2] = r.pick(RATIOS.filter(([a, b]) => a + b <= 5));
  let [q1, q2] = r.pick(RATIOS.filter(([a, b]) => a + b <= 5));
  if (p1 === q1 && p2 === q2 && r.bool()) [q1, q2] = [q2, q1];
  const pn = p1;
  const pd = p1 + p2;
  const qn = q1;
  const qd = q1 + q2;
  // u＝(1−p)/(1−pq)、s＝1−u、t＝uq  (p＝pn/pd, q＝qn/qd)
  const uN = (pd - pn) * qd;
  const uD = pd * qd - pn * qn;
  const sN = uD - uN;
  const tN = uN * qn;
  const tD = uD * qd;
  const pS = `(${pn}/${pd})`;
  const qS = `(${qn}/${qd})`;
  return {
    prompt: `三角形 OAB において、辺 OA を ${p1}:${p2} に内分する点を P、辺 OB を ${q1}:${q2} に内分する点を Q とし、線分 AQ と線分 BP の交点を X とする。OA→＝a⃗、OB→＝b⃗ とするとき、OX→＝s a⃗＋t b⃗ と表したときの s、t を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [fr(sN, uD), fr(tN, tD)], labels: ["s =", "t ="], equations: [`s=1-(1-${pS})/(1-${pS}*${qS})`, `t=(1-${pS})/(1-${pS}*${qS})*${qS}`] },
    point: "2通りに表して、a⃗、b⃗ の係数を比べる",
    steps: [
      { title: "AQ 上として", body: `AX:XQ＝u:(1−u) とおくと、OX→＝(1−u)a⃗＋${fp(qn, qd)}u b⃗。`, back: [S3] },
      { title: "BP 上として", body: `BX:XP＝v:(1−v) とおくと、OX→＝${fp(pn, pd)}v a⃗＋(1−v)b⃗。` },
      { title: "係数を比べる", body: `a⃗、b⃗ は1次独立なので、1−u＝${fp(pn, pd)}v、${fp(qn, qd)}u＝1−v。解くと u＝${fr(uN, uD)}、{{s＝${fr(sN, uD)}、t＝${fr(tN, tD)}}}。`, trap: "係数を比べてよいのは、a⃗ と b⃗ が 0⃗ でなく平行でない (1次独立) から。" },
    ],
  };
}

export const H_MATH_C_ZUKEI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学C",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "内分・外分・重心",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "naibun", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: naibun },
        { id: "gaibun", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: gaibun },
        { id: "juushin", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: juushin },
      ],
    },
    {
      title: "ベクトル方程式と交点",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "chokusen", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: chokusen },
        { id: "en", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "思考・判断・表現", generate: en },
        { id: "kouten", type: "A", difficulty: 3, points: 24, seconds: 240, skill: "思考・判断・表現", generate: kouten },
      ],
    },
  ],
};
