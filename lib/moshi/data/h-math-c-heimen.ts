// 数学C「平面上のベクトル」の単元模試 (A: 成分を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 成分の計算・内積・大きさ |v|＝√(x²＋y²)・cos θ＝a·b/(|a||b|) は、問題の成分から calc・equations に式を書く。
//   平行・垂直の k は条件の式 (x₁y₂−x₂y₁＝0、x₁x₂＋y₁y₂＝0) に代入して確かめる。|a＋tb| の最小は
//   a＝−t₀b＋c (c⊥b) と作り、t₀＝−a·b/|b|²、最小値 |c| を equations で確かめる。scripts/check-moshi.ts がシード1〜100で照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-c-heimen";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "成分で表すと、たし算・実数倍は成分ごと");
const S2 = L(2, "内積は「大きさ×大きさ×cos θ」");
const S3 = L(3, "内積の符号で、角が鋭角か鈍角かがわかる");
const S4 = L(4, "平行と垂直は、成分の式1本で判定できる");

const D = (s: string | number) => String(s).replace(/-/g, "−");
const pa = (n: number) => (n < 0 ? `(−${-n})` : String(n));
/** ベクトルの前の係数 (1 は書かない、−1 は −) */
const cf = (n: number) => (n === 1 ? "" : n === -1 ? "−" : D(n));
const nz = (r: Rng, a: number, b: number) => {
  let v = 0;
  while (v === 0) v = r.int(a, b);
  return v;
};
const V = (x: number, y: number) => `(${D(x)}, ${D(y)})`;
/** √n を簡単にした表示 ("3√2"、"5"、"√7") */
function surd(n: number): string {
  let out = 1;
  let k = n;
  for (let p = 2; p * p <= k; p++) while (k % (p * p) === 0) { k /= p * p; out *= p; }
  return k === 1 ? String(out) : `${out === 1 ? "" : out}√${k}`;
}
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));

function seibun(r: Rng): QuestionBody {
  const a = [nz(r, -5, 5), r.int(-5, 5)];
  const b = [r.int(-5, 5), nz(r, -5, 5)];
  const s = nz(r, -3, 4);
  const t = nz(r, -3, 4);
  const x = s * a[0] + t * b[0];
  const y = s * a[1] + t * b[1];
  const lin = `${s === 1 ? "" : s === -1 ? "−" : D(s)}a⃗ ${t < 0 ? "−" : "＋"} ${Math.abs(t) === 1 ? "" : Math.abs(t)}b⃗`;
  return {
    prompt: `a⃗＝${V(a[0], a[1])}、b⃗＝${V(b[0], b[1])} のとき、${lin} を成分で表しなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(x), String(y)], labels: ["x 成分", "y 成分"], equations: [`x=${s}*(${a[0]})+(${t})*(${b[0]})`, `y=${s}*(${a[1]})+(${t})*(${b[1]})`] },
    point: "実数倍・たし算は成分ごとに計算する",
    steps: [
      { title: "実数倍", body: `${cf(s)}a⃗＝${V(s * a[0], s * a[1])}、${cf(t)}b⃗＝${V(t * b[0], t * b[1])}。`, back: [S1] },
      { title: "たす", body: `x 成分 ${D(s * a[0])}＋${pa(t * b[0])}、y 成分 ${D(s * a[1])}＋${pa(t * b[1])} で {{${V(x, y)}}}。`, trap: "負の数をかけるときは、両方の成分の符号を変える。" },
    ],
  };
}

function naiseki(r: Rng): QuestionBody {
  if (r.bool()) {
    const a = [nz(r, -6, 6), nz(r, -6, 6)];
    const b = [nz(r, -6, 6), r.int(-6, 6)];
    const d = a[0] * b[0] + a[1] * b[1];
    return {
      prompt: `a⃗＝${V(a[0], a[1])}、b⃗＝${V(b[0], b[1])} のとき、内積 a⃗·b⃗ を求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [String(d)], calc: `(${a[0]})*(${b[0]})+(${a[1]})*(${b[1]})`, labels: ["a⃗·b⃗ ="] },
      point: "a⃗·b⃗＝x₁x₂＋y₁y₂",
      steps: [{ title: "成分の積をたす", body: `${D(a[0])}×${pa(b[0])}＋${pa(a[1])}×${pa(b[1])}＝{{${D(d)}}}。`, back: [S2], trap: "内積はベクトルではなく数。答えに ( , ) はつけない。" }],
    };
  }
  const A = r.pick([2, 3, 4, 5, 6]);
  const B = r.pick([2, 3, 4, 6, 8]);
  const th = r.pick([60, 120, 90, 0, 180]);
  const cos = { 0: "1", 60: "1/2", 90: "0", 120: "-1/2", 180: "-1" }[th]!;
  const d = { 0: A * B, 60: (A * B) / 2, 90: 0, 120: -(A * B) / 2, 180: -A * B }[th]!;
  return {
    prompt: `|a⃗|＝${A}、|b⃗|＝${B} で、a⃗ と b⃗ のなす角が ${th}° のとき、内積 a⃗·b⃗ を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(d)], calc: `${A}*${B}*(${cos})`, labels: ["a⃗·b⃗ ="] },
    point: "a⃗·b⃗＝|a⃗||b⃗|cos θ",
    steps: [{ title: "定義に入れる", body: `${A}×${B}×cos ${th}°＝${A * B}×${cos.startsWith("-") ? `(${D(cos)})` : cos}＝{{${D(d)}}}。`, back: [S2, S3], trap: th > 90 ? "90° より大きい角では cos が負なので、内積も負になる。" : "cos 60°＝1/2、cos 90°＝0 を正確に。" }],
  };
}

function ookisa(r: Rng): QuestionBody {
  const A = r.int(1, 5);
  const B = r.int(1, 5);
  const ab = r.int(-4, 6);
  const s = nz(r, -3, 3);
  const t = nz(r, -3, 3);
  let v = s * s * A * A + 2 * s * t * ab + t * t * B * B;
  let ab2 = ab;
  if (v <= 0 || Math.abs(ab2) > A * B) {
    ab2 = 0;
    v = s * s * A * A + t * t * B * B;
  }
  const lin = `${s === 1 ? "" : s === -1 ? "−" : D(s)}a⃗ ${t < 0 ? "−" : "＋"} ${Math.abs(t) === 1 ? "" : Math.abs(t)}b⃗`;
  return {
    prompt: `|a⃗|＝${A}、|b⃗|＝${B}、a⃗·b⃗＝${D(ab2)} のとき、|${lin}| を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(v)], calc: `√${v}`, equations: [`x^2=(${s})^2*${A * A}+2*(${s})*(${t})*(${ab2})+(${t})^2*${B * B}`] },
    point: "大きさは2乗して内積で展開する",
    steps: [
      { title: "2乗する", body: `|${lin}|²＝${s * s === 1 ? "" : s * s}|a⃗|² ${2 * s * t < 0 ? "−" : "＋"} ${Math.abs(2 * s * t)}a⃗·b⃗ ＋ ${t * t === 1 ? "" : t * t}|b⃗|²。`, back: [S2] },
      { title: "数を入れる", body: `${s * s * A * A} ${2 * s * t * ab2 < 0 ? "−" : "＋"} ${Math.abs(2 * s * t * ab2)} ＋ ${t * t * B * B}＝${v}。`, trap: "|a⃗＋b⃗|＝|a⃗|＋|b⃗| ではない。2乗して内積の項を入れる。" },
      { title: "√ をとる", body: `|${lin}|＝√${v}＝{{${surd(v)}}}。` },
    ],
  };
}

function cosQ(r: Rng): QuestionBody {
  let a = [1, 2];
  let b = [3, 1];
  let d = 0;
  for (let i = 0; i < 50; i++) {
    a = [nz(r, -4, 4), nz(r, -4, 4)];
    b = [nz(r, -4, 4), r.int(-4, 4)];
    d = a[0] * b[0] + a[1] * b[1];
    if (d !== 0 && a[0] * b[1] - a[1] * b[0] !== 0) break;
  }
  if (d === 0) {
    a = [1, 2];
    b = [3, 1];
    d = 5;
  }
  const N = (a[0] ** 2 + a[1] ** 2) * (b[0] ** 2 + b[1] ** 2);
  // cos θ＝d/√N を有理化：d√N/N。√N＝o√k として d/(o√k)＝d√k/(ok)
  let o = 1;
  let k = N;
  for (let p = 2; p * p <= k; p++) while (k % (p * p) === 0) { k /= p * p; o *= p; }
  const num = d;
  const den = o * k;
  const g = gcd(num, den);
  const nn = num / g;
  const dd = den / g;
  const coefStr = k === 1 ? (dd === 1 ? String(nn) : `${nn}/${dd}`) : `${nn === 1 ? "" : nn === -1 ? "-" : nn}√${k}${dd === 1 ? "" : `/${dd}`}`;
  return {
    prompt: `a⃗＝${V(a[0], a[1])}、b⃗＝${V(b[0], b[1])} のなす角を θ とするとき、cos θ の値を求めなさい (分母を有理化して答えなさい)。`,
    answer: { kind: "num", answerKind: "surd", answer: [coefStr], calc: `${d}*√${N}/${N}`, labels: ["cos θ ="] },
    point: "cos θ＝a⃗·b⃗/(|a⃗||b⃗|)",
    steps: [
      { title: "内積と大きさ", body: `a⃗·b⃗＝${D(d)}、|a⃗|＝${surd(a[0] ** 2 + a[1] ** 2)}、|b⃗|＝${surd(b[0] ** 2 + b[1] ** 2)}。`, back: [S2] },
      { title: "公式に入れる", body: `cos θ＝${D(d)}/√${N}＝{{${D(coefStr)}}}。${d < 0 ? "負なので θ は鈍角です。" : "正なので θ は鋭角です。"}`, back: [S3], trap: "√ をかけ合わせてから簡単にする。分母の √ は有理化する。" },
    ],
  };
}

function heiko(r: Rng): QuestionBody {
  const a = [nz(r, -5, 5), nz(r, -5, 5)];
  if (r.bool()) {
    // 平行: b⃗＝(k, b2) で a1·b2 − a2·k＝0 → b2＝a2k/a1 が整数になるようにする
    const m = nz(r, -3, 3);
    const b2 = a[1] * m;
    const kk = a[0] * m;
    return {
      prompt: `a⃗＝${V(a[0], a[1])} と b⃗＝(k, ${D(b2)}) が平行になるように、k の値を定めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [String(kk)], labels: ["k ="], equations: [`${a[0]}*(${b2})-(${a[1]})*k=0`] },
      point: "平行 ⇔ x₁y₂−x₂y₁＝0",
      steps: [
        { title: "平行の条件", body: `${D(a[0])}×${pa(b2)}−${pa(a[1])}×k＝0。`, back: [S4] },
        { title: "解く", body: `${D(a[1])}k＝${D(a[0] * b2)} より {{k＝${D(kk)}}}。`, trap: "垂直の条件 (x₁x₂＋y₁y₂＝0) と取りちがえない。" },
      ],
    };
  }
  // 垂直: a⃗ ⊥ (b⃗＋t a⃗)。c⃗⊥a⃗ をとり b⃗＝c⃗−t a⃗ と作ると、t が整数の答えになる
  const t = nz(r, -3, 3);
  const aa = a[0] ** 2 + a[1] ** 2;
  const sg = r.pick([1, -1]);
  const c = [-a[1] * sg, a[0] * sg];
  const bb = [c[0] - t * a[0], c[1] - t * a[1]];
  return {
    prompt: `a⃗＝${V(a[0], a[1])}、b⃗＝${V(bb[0], bb[1])} とする。b⃗＋t a⃗ と a⃗ が垂直になるように、実数 t の値を定めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(t)], labels: ["t ="], equations: [`(${bb[0]}+t*(${a[0]}))*(${a[0]})+(${bb[1]}+t*(${a[1]}))*(${a[1]})=0`] },
    point: "垂直 ⇔ 内積が 0",
    steps: [
      { title: "成分で表す", body: `b⃗＋t a⃗＝(${D(bb[0])}${a[0] < 0 ? "−" : "＋"}${Math.abs(a[0]) === 1 ? "" : Math.abs(a[0])}t, ${D(bb[1])}${a[1] < 0 ? "−" : "＋"}${Math.abs(a[1]) === 1 ? "" : Math.abs(a[1])}t)。`, back: [S1] },
      { title: "内積＝0", body: `a⃗·b⃗＋t|a⃗|²＝0。a⃗·b⃗＝${D(a[0] * bb[0] + a[1] * bb[1])}、|a⃗|²＝${aa} より {{t＝${D(t)}}}。`, back: [S4], trap: "|a⃗|² は a⃗·a⃗。成分の2乗の和で、√ はつけない。" },
    ],
  };
}

function saisho(r: Rng): QuestionBody {
  const b = [nz(r, -3, 3), nz(r, -3, 3)];
  const m = r.pick([1, 2, -1, -2, 3]);
  const c = [-b[1] * m, b[0] * m];
  const t0 = nz(r, -3, 3);
  const a = [c[0] - t0 * b[0], c[1] - t0 * b[1]];
  const ab = a[0] * b[0] + a[1] * b[1];
  const bb = b[0] ** 2 + b[1] ** 2;
  const aa = a[0] ** 2 + a[1] ** 2;
  const cc = c[0] ** 2 + c[1] ** 2;
  return {
    prompt: `a⃗＝${V(a[0], a[1])}、b⃗＝${V(b[0], b[1])} とする。実数 t を変化させるとき、|a⃗＋t b⃗| の最小値を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(cc)], labels: ["最小値"], calc: `√${aa - (ab * ab) / bb}`, equations: [`x^2=${aa}-(${ab})^2/${bb}`] },
    point: "|a⃗＋tb⃗|² を t の2次式にして平方完成",
    steps: [
      { title: "2乗して t の式に", body: `|a⃗＋tb⃗|²＝|b⃗|²t²＋2(a⃗·b⃗)t＋|a⃗|²＝${bb}t² ${2 * ab < 0 ? "−" : "＋"} ${Math.abs(2 * ab)}t ＋ ${aa}。`, back: [S2] },
      { title: "平方完成", body: `＝${bb}(t ${t0 < 0 ? "＋" : "−"} ${Math.abs(t0)})² ＋ ${cc}。{{t＝${D(t0)}}} で最小。`, trap: "最小になるのは |a⃗＋tb⃗|² が最小のとき。最後に √ をとるのを忘れない。" },
      { title: "最小値", body: `√${cc}＝{{${surd(cc)}}}。このとき a⃗＋tb⃗＝${V(c[0], c[1])} で、b⃗ と垂直になっています。`, back: [S4] },
    ],
  };
}

export const H_MATH_C_HEIMEN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学C",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "成分と内積",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "seibun", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: seibun },
        { id: "naiseki", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: naiseki },
        { id: "ookisa", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: ookisa },
      ],
    },
    {
      title: "なす角・平行と垂直・最小値",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "cos", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: cosQ },
        { id: "heiko", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: heiko },
        { id: "saisho", type: "A", difficulty: 3, points: 24, seconds: 180, skill: "思考・判断・表現", generate: saisho },
      ],
    },
  ],
};
