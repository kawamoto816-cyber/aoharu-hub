// 数学C「媒介変数表示と極座標」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: t を消す問題は t＝x−b を代入して展開した式 (expr) を答えにする。極座標⇔直交座標は、先に r と θ (π/6 の倍数など) を
//   決めてから x＝r cos θ、y＝r sin θ を作る。極方程式 r＝2a cos θ＋2b sin θ の円の半径は √(a²＋b²)、
//   2点間の距離は余弦定理 r₁²＋r₂²−2r₁r₂cos(θ₂−θ₁)、楕円上の ax＋by の最大値は √(p²a²＋q²b²) を calc に書く。
//   scripts/check-moshi.ts がシード1〜100で照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-c-baikai";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "媒介変数表示：x と y を t で表し、t を消す");
const S2 = L(2, "円と楕円は cos θ, sin θ で表す");
const S3 = L(3, "極座標：原点からの距離 r と角 θ");
const S4 = L(4, "極方程式を x, y の式に直す");

const D = (s: string | number) => String(s).replace(/-/g, "−");
const pa = (n: number) => (n < 0 ? `(−${-n})` : String(n));
const nz = (r: Rng, a: number, b: number) => {
  let v = 0;
  while (v === 0) v = r.int(a, b);
  return v;
};
function surd(n: number): string {
  let out = 1;
  let k = n;
  for (let p = 2; p * p <= k; p++) while (k % (p * p) === 0) { k /= p * p; out *= p; }
  return k === 1 ? String(out) : `${out === 1 ? "" : out}√${k}`;
}
function poly(ts: [number, string][], ascii = false): string {
  let out = "";
  for (const [c, m0] of ts) {
    if (c === 0) continue;
    const m = ascii ? m0.replace(/²/g, "^2") : m0;
    const a = Math.abs(c);
    const body = m && a === 1 ? m : `${a}${m}`;
    if (!out) out = (c < 0 ? (ascii ? "-" : "−") : "") + body;
    else out += ascii ? `${c < 0 ? "-" : "+"}${body}` : ` ${c < 0 ? "−" : "+"} ${body}`;
  }
  return out || "0";
}

function kesu(r: Rng): QuestionBody {
  const b = r.int(-4, 4);
  const c = nz(r, -3, 3);
  const e = r.int(-4, 4);
  const d = r.int(-5, 5);
  // y＝c t²＋e t＋d、t＝x−b
  const co: [number, string][] = [[c, "x²"], [-2 * b * c + e, "x"], [c * b * b - e * b + d, ""]];
  const xs = b === 0 ? "x＝t" : `x＝t ${b < 0 ? "−" : "＋"} ${Math.abs(b)}`;
  return {
    prompt: `媒介変数 t を用いて ${xs}、y＝${poly([[c, "t²"], [e, "t"], [d, ""]])} と表される曲線を、t を消去して y を x の式で表しなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [poly(co, true)], labels: ["y ="] },
    point: "1次の式から t＝… を作って、もう一方に代入",
    steps: [
      { title: "t を x で表す", body: `${xs} より {{t＝${b === 0 ? "x" : `x ${b < 0 ? "＋" : "−"} ${Math.abs(b)}`}}}。`, back: [S1] },
      { title: "代入して展開", body: `y＝${c === 1 ? "" : c === -1 ? "−" : D(c)}(${b === 0 ? "x" : `x ${b < 0 ? "＋" : "−"} ${Math.abs(b)}`})²${e === 0 ? "" : ` ${e < 0 ? "−" : "＋"} ${Math.abs(e) === 1 ? "" : Math.abs(e)}(${b === 0 ? "x" : `x ${b < 0 ? "＋" : "−"} ${Math.abs(b)}`})`}${d === 0 ? "" : ` ${d < 0 ? "−" : "＋"} ${Math.abs(d)}`}＝{{${poly(co)}}}。`, trap: "t を消したあとの式は放物線。x の範囲に制限がないかも確かめる (この問題では t はすべての実数)。" },
    ],
  };
}

/** θ (π/6 の倍数, k×π/6) の表示 */
function rad(k: number): string {
  if (k === 0) return "0";
  const g = k % 6 === 0 ? 6 : k % 3 === 0 ? 3 : k % 2 === 0 ? 2 : 1;
  const num = k / g;
  const den = 6 / g;
  return `${num === 1 ? "" : num}π${den === 1 ? "" : `/${den}`}`;
}
/** cos・sin を「n/2 (×√3)」で */
function trig(k: number): [[number, boolean], [number, boolean]] {
  const f = (v: number): [number, boolean] => {
    const c = v * 2;
    if (Math.abs(c - Math.round(c)) < 1e-9) return [Math.round(c), false];
    return [Math.round(c / Math.sqrt(3)), true];
  };
  return [f(Math.cos((k * Math.PI) / 6)), f(Math.sin((k * Math.PI) / 6))];
}
const show = (n: number, s3: boolean) => (n === 0 ? "0" : s3 ? `${n < 0 ? "−" : ""}${Math.abs(n) === 1 ? "" : Math.abs(n)}√3` : D(n));

function kyokuza(r: Rng): QuestionBody {
  const k = r.pick([1, 2, 4, 5, 7, 8, 10, 11]);
  const R = r.pick([2, 4, 6]);
  const [[cn, cs], [sn, ss]] = trig(k);
  const x = show((cn * R) / 2, cs);
  const y = show((sn * R) / 2, ss);
  const opts = r.shuffle([
    { t: `(${R}, ${rad(k)})`, ok: true, why: "正しい。r＝√(x²＋y²)、cos θ＝x/r、sin θ＝y/r をみたす。" },
    { t: `(${R}, ${rad(12 - k)})`, ok: false, why: "y 座標の符号が逆の点。θ の象限を x、y の符号で確かめる。" },
    { t: `(${R}, ${rad((k + 6) % 12)})`, ok: false, why: "原点について反対側の点。tan θ だけで決めると π ずれる。" },
    { t: `(${R * R}, ${rad(k)})`, ok: false, why: `${R * R} は r²。r＝√(x²＋y²)＝${R}。` },
  ]);
  return {
    prompt: `直交座標が (${x}, ${y}) である点を、極座標 (r, θ) (r＞0、0≦θ＜2π) で表したものはどれですか。`,
    answer: {
      kind: "choice",
      options: opts.map((o) => o.t),
      correct: opts.findIndex((o) => o.ok),
      why: opts.map((o) => o.why),
    },
    point: "r＝√(x²＋y²)。θ は x、y の符号で象限を確かめる",
    steps: [
      { title: "r", body: `r＝√{(${x})²＋(${y})²}＝{{${R}}}。`, back: [S3] },
      { title: "θ", body: `cos θ＝${x}/${R}、sin θ＝${y}/${R} なので {{θ＝${rad(k)}}}。`, trap: "tan θ＝y/x だけで決めると、π ずれた角とまちがえやすい。" },
    ],
  };
}

function kyokuhou(r: Rng): QuestionBody {
  const a = r.int(-4, 4);
  const b = r.int(-4, 4) || 1;
  const t = (c: number, f: string) => (c === 0 ? "" : `${c < 0 ? "−" : "＋"}${Math.abs(2 * c)}${f}`);
  const rhs = `${t(a, "cos θ")}${t(b, "sin θ")}`.replace(/^＋/, "");
  const R2 = a * a + b * b;
  return {
    prompt: `極方程式 r＝${rhs} が表す円の半径を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(R2)], calc: `√${R2}`, equations: [`x^2=(${a})^2+(${b})^2`] },
    point: "両辺に r をかけ、r²＝x²＋y²、r cos θ＝x、r sin θ＝y",
    steps: [
      { title: "r をかける", body: `r²＝${t(a, "r cos θ")}${t(b, "r sin θ")}`.replace(/＝＋/, "＝") + ` より x²＋y²＝${t(a, "x")}${t(b, "y")}`.replace(/＝＋/, "＝") + "。", back: [S4] },
      { title: "平方完成", body: `${a === 0 ? "x²" : `(x ${a < 0 ? "＋" : "−"} ${Math.abs(a)})²`}＋${b === 0 ? "y²" : `(y ${b < 0 ? "＋" : "−"} ${Math.abs(b)})²`}＝${R2}。中心 (${D(a)}, ${D(b)})、半径 {{${surd(R2)}}}。`, trap: `右辺の ${R2} は半径の2乗。` },
    ],
  };
}

function daen(r: Rng): QuestionBody {
  const a = r.int(2, 6);
  let b = r.int(1, 5);
  if (b === a) b += 1;
  const p = r.int(-4, 4);
  const q = r.int(-4, 4);
  const xs = `x＝${a === 1 ? "" : a}cos θ${p === 0 ? "" : ` ${p < 0 ? "−" : "＋"} ${Math.abs(p)}`}`;
  const ys = `y＝${b === 1 ? "" : b}sin θ${q === 0 ? "" : ` ${q < 0 ? "−" : "＋"} ${Math.abs(q)}`}`;
  return {
    prompt: `θ を媒介変数として ${xs}、${ys} と表される曲線を、(x−p)²/A＋(y−q)²/B＝1 の形で表すとき、A と B を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(a * a), String(b * b)], labels: ["A =", "B ="], equations: [`x=${a}^2`, `y=${b}^2`] },
    point: "cos θ、sin θ について解き、cos²θ＋sin²θ＝1",
    steps: [
      { title: "cos θ、sin θ で表す", body: `cos θ＝(x${p === 0 ? "" : ` ${p < 0 ? "＋" : "−"} ${Math.abs(p)}`})/${a}、sin θ＝(y${q === 0 ? "" : ` ${q < 0 ? "＋" : "−"} ${Math.abs(q)}`})/${b}。`, back: [S1, S2] },
      { title: "2乗してたす", body: `cos²θ＋sin²θ＝1 より、(x${p === 0 ? "" : ` ${p < 0 ? "＋" : "−"} ${Math.abs(p)}`})²/${a * a}＋(y${q === 0 ? "" : ` ${q < 0 ? "＋" : "−"} ${Math.abs(q)}`})²/${b * b}＝1。{{A＝${a * a}、B＝${b * b}}}。`, trap: `分母は ${a} ではなく ${a}²＝${a * a}。中心は (${D(p)}, ${D(q)})。` },
    ],
  };
}

const COS6 = [1, 0.5, -0.5, -1, 0]; // 差の角 0, π/3, 2π/3, π, π/2
const DIFFK = [0, 2, 4, 6, 3];
function kyori(r: Rng): QuestionBody {
  const i = r.int(1, 4);
  const dk = DIFFK[i];
  const k1 = r.int(0, 11 - dk);
  const k2 = k1 + dk;
  const r1 = r.int(1, 6);
  const r2 = r.int(1, 6);
  const c = COS6[i];
  const d2 = r1 * r1 + r2 * r2 - 2 * r1 * r2 * c;
  return {
    prompt: `極座標で表された2点 A(${r1}, ${rad(k1)})、B(${r2}, ${rad(k2)}) の間の距離を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(d2)], calc: `√${d2}`, equations: [`x^2=${r1}^2+${r2}^2-2*${r1}*${r2}*(${c})`] },
    point: "原点 O と A、B の三角形で余弦定理",
    steps: [
      { title: "∠AOB", body: `∠AOB＝${rad(k2)}−${rad(k1)}＝{{${rad(dk)}}}。`, back: [S3] },
      { title: "余弦定理", body: `AB²＝${r1}²＋${r2}²−2×${r1}×${r2}×cos ${rad(dk)}＝${d2}。AB＝{{${surd(d2)}}}。`, trap: dk === 3 ? "∠AOB が直角なので三平方の定理でもよい。" : dk === 4 ? "cos(2π/3) は負。符号に注意。" : dk === 6 ? "∠AOB＝π のとき O、A、B は一直線に並ぶ。cos π＝−1 で、AB は2つの r の和になる。" : "cos(π/3)＝1/2。−2×r₁×r₂×1/2 で −r₁r₂ になる。" },
    ],
  };
}

function saidai(r: Rng): QuestionBody {
  const a = r.int(2, 5);
  let b = r.int(1, 4);
  if (b === a) b += 1;
  const p = nz(r, -4, 4);
  const q = nz(r, -4, 4);
  const v = p * p * a * a + q * q * b * b;
  const fx = `${p === 1 ? "" : p === -1 ? "−" : D(p)}x ${q < 0 ? "−" : "＋"} ${Math.abs(q) === 1 ? "" : Math.abs(q)}y`;
  return {
    prompt: `点 (x, y) が楕円 x²/${a * a}＋y²/${b * b}＝1 の上を動くとき、${fx} の最大値を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(v)], calc: `√${v}`, equations: [`x^2=(${p}*${a})^2+(${q}*${b})^2`] },
    point: "x＝a cos θ、y＝b sin θ とおき、三角関数の合成",
    steps: [
      { title: "媒介変数で表す", body: `x＝${a}cos θ、y＝${b === 1 ? "" : b}sin θ とおきます。`, back: [S2] },
      { title: "θ の式に", body: `${fx}＝${D(p * a)}cos θ ${q * b < 0 ? "−" : "＋"} ${Math.abs(q * b)}sin θ。`, back: [S1] },
      { title: "合成", body: `＝√(${pa(p * a)}²＋${pa(q * b)}²) sin(θ＋α)。最大値は √${v}＝{{${surd(v)}}}。`, trap: `x、y を別々に最大 (x＝${a}、y＝${b}) にすることはできない。同じ θ で動く。` },
    ],
  };
}

export const H_MATH_C_BAIKAI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学C",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "媒介変数表示",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kesu", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: kesu },
        { id: "daen", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: daen },
      ],
    },
    {
      title: "極座標と極方程式",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kyokuza", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: kyokuza },
        { id: "kyokuhou", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: kyokuhou },
        { id: "kyori", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: kyori },
      ],
    },
    {
      title: "楕円上の最大値",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "saidai", type: "A", difficulty: 3, points: 24, seconds: 180, skill: "思考・判断・表現", generate: saidai }],
    },
  ],
};
