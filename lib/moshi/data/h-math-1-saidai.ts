// 数学Ⅰ「二次関数の最大・最小」の単元模試 (A: 係数を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 頂点 (p, q) と a を先に決めて式を作り、最大・最小は端と頂点の値を生成関数の中で比べて決める。
//   値は equations / calc に a(x−p)²＋q などの式で書き、scripts/check-moshi.ts がシード1〜100で照合する。
//   売り上げの問題は「最大になる値上げの回数 T」を先に決め、売れる個数を n＝m(p/10＋2T) と作る (頂点が整数になる)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-1-saidai";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "定義域がなければ、頂点だけで決まる");
const S2 = L(2, "定義域があれば、グラフの一部だけを見る");
const S3 = L(3, "軸が定義域の中か外かで、3つの場合に分ける");
const S4 = L(4, "文章題：変数を決め、定義域をつけて式にする");
const S5 = L(5, "売り上げの最大：「増えるもの」×「減るもの」は山になる");

// ---- 式の書き方 (表示は −・²、答えと calc は ASCII) ----
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const D = (s: string | number) => String(s).replace(/-/g, "−");
function poly(ts: [number, string][], ascii = false): string {
  let out = "";
  for (const [c, m0] of ts) {
    if (c === 0) continue;
    const m = ascii ? m0.replace(/²/g, "^2").replace(/³/g, "^3").replace(/⁴/g, "^4") : m0;
    const a = Math.abs(c);
    const body = m && a === 1 ? m : `${a}${m}`;
    if (!out) out = (c < 0 ? (ascii ? "-" : "−") : "") + body;
    else out += ascii ? `${c < 0 ? "-" : "+"}${body}` : ` ${c < 0 ? "−" : "+"} ${body}`;
  }
  return out || "0";
}
function frac(n: number, d: number, ascii = false): string {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d) || 1;
  const s = d / g === 1 ? `${n / g}` : `${n / g}/${d / g}`;
  return ascii ? s : D(s);
}
function sq(n: number): [number, number] {
  let k = 1;
  let m = n;
  for (let i = 2; i * i <= m; i++) while (m % (i * i) === 0) { m /= i * i; k *= i; }
  return [k, m];
}
function surd(p: number, q: number, t: number, d = 1, ascii = false): string {
  const [k, m] = sq(t);
  q *= k;
  t = m;
  if (t === 1 || q === 0) { p += q * (t === 1 ? 1 : 0); q = 0; }
  if (d < 0) [p, q, d] = [-p, -q, -d];
  const g = gcd(gcd(p, q), d) || 1;
  [p, q, d] = [p / g, q / g, d / g];
  let s: string;
  if (q === 0) s = frac(p, d, true);
  else {
    const r = `${Math.abs(q) === 1 ? "" : Math.abs(q)}√${t}`;
    if (p === 0) s = `${q < 0 ? "-" : ""}${r}${d === 1 ? "" : `/${d}`}`;
    else {
      const inner = `${p}${q < 0 ? "-" : "+"}${r}`;
      s = d === 1 ? inner : `(${inner})/${d}`;
    }
  }
  return ascii ? s : D(s);
}

const nz = (r: Rng, a: number, b: number) => {
  let v = 0;
  while (v === 0) v = r.int(a, b);
  return v;
};
const quad = ([a, b, c]: number[], ascii = false) => poly([[a, "x²"], [b, "x"], [c, ""]], ascii);
function vform(a: number, p: number, q: number): string {
  const co = a === 1 ? "" : a === -1 ? "−" : D(a);
  const inner = p === 0 ? "x²" : `(x ${p < 0 ? "+" : "−"} ${Math.abs(p)})²`;
  return `${co}${inner}${q === 0 ? "" : ` ${q < 0 ? "−" : "+"} ${Math.abs(q)}`}`;
}

function nashi(r: Rng): QuestionBody {
  const a = r.pick([1, 2, 3, -1, -2, -3]);
  const p = nz(r, -5, 5);
  const q = r.int(-9, 9);
  const b = -2 * a * p;
  const c = a * p * p + q;
  const word = a > 0 ? "最小値" : "最大値";
  return {
    prompt: `二次関数 y＝${quad([a, b, c])} の${word}と、そのときの x の値を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(p), String(q)], labels: ["x =", word], equations: [`x=-(${b})/(2*${a})`, `y=${c}-(${b})^2/(4*${a})`] },
    point: a > 0 ? "下に凸なら頂点で最小。最大値はない" : "上に凸なら頂点で最大。最小値はない",
    steps: [
      { title: "平方完成", body: `y＝${vform(a, p, q)}。頂点は (${D(p)}, ${D(q)})。`, back: [S1] },
      { title: "向きで決める", body: `a＝${D(a)} ${a > 0 ? "＞" : "＜"} 0 なので${a > 0 ? "下" : "上"}に凸。{{x＝${D(p)} のとき${word} ${D(q)}}}。`, trap: "x の値と最大・最小の値（y の値）を取りちがえない。" },
    ],
  };
}

function teigi(r: Rng): QuestionBody {
  const a = r.pick([1, 2, -1, -2]);
  const p = r.int(-3, 3);
  const q = r.int(-6, 6);
  const s = p + r.int(-3, 1);
  const t = s + r.int(2, 5);
  const f = (x: number) => a * (x - p) ** 2 + q;
  const cand = [s, t, ...(p >= s && p <= t ? [p] : [])];
  const xmax = cand.reduce((m, x) => (f(x) > f(m) ? x : m), cand[0]);
  const xmin = cand.reduce((m, x) => (f(x) < f(m) ? x : m), cand[0]);
  const b = -2 * a * p;
  const c = a * p * p + q;
  const inside = p >= s && p <= t;
  return {
    prompt: `二次関数 y＝${quad([a, b, c])}（${D(s)} ≦ x ≦ ${D(t)}）の最大値と最小値を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(f(xmax)), String(f(xmin))], labels: ["最大値", "最小値"], equations: [`x=${a}*(${xmax}-(${p}))^2+${q}`, `y=${a}*(${xmin}-(${p}))^2+${q}`] },
    point: "頂点と両端の y を比べる。軸から遠い端が、もう一方の極値",
    steps: [
      { title: "平方完成", body: `y＝${vform(a, p, q)}。軸は x＝${D(p)} で、定義域の${inside ? "中" : "外"}にあります。`, back: [S2] },
      { title: "候補の値", body: `${cand.map((x) => `x＝${D(x)} で y＝${D(f(x))}`).join("、")}。`, trap: inside ? "端の値だけを比べて、頂点の値を見落とさない。" : "定義域の外にある頂点の値を、答えにしない。" },
      { title: "比べる", body: `{{最大値 ${D(f(xmax))}（x＝${D(xmax)}）、最小値 ${D(f(xmin))}（x＝${D(xmin)}）}}。` },
    ],
  };
}

function bunsho(r: Rng): QuestionBody {
  const a = r.pick([1, 2, 3]);
  const k = r.int(2, 8);
  const xy = r.bool();
  const ax = a === 1 ? "x" : `${a}x`;
  if (xy) {
    // ax + y = s, xy の最大。x = s/(2a)、最大値 s²/(4a)。s を 2a の倍数にして x を整数に
    const s = 2 * a * k;
    const x0 = k;
    const y0 = s - a * x0;
    const mx = (s * s) / (4 * a);
    return {
      prompt: `x ≧ 0、y ≧ 0、${ax} + y＝${s} のとき、xy の最大値を求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [String(mx)], calc: `${x0}*${y0}` },
      point: "1文字消して二次関数にし、x の範囲もつける",
      steps: [
        { title: "y を消す", body: `y＝${s} − ${ax}。y ≧ 0 より {{0 ≦ x ≦ ${frac(s, a)}}}。xy＝x(${s} − ${ax})＝${poly([[-a, "x²"], [s, "x"]])}。`, back: [S4] },
        { title: "平方完成", body: `xy＝${vform(-a, x0, mx)}。軸 x＝${x0} は範囲の中。` },
        { title: "最大値", body: `x＝${x0}、y＝${y0} のとき {{最大値 ${mx}}}。`, trap: "x の範囲（y ≧ 0 から出る）をつけ忘れない。軸が範囲の外なら端で最大になる。" },
      ],
    };
  }
  // ax + y = s, x² + y² の最小。x = as/(1+a²)、最小値 s²/(1+a²)。s を (1+a²) の倍数に
  const s = (1 + a * a) * k;
  const x0 = (a * s) / (1 + a * a);
  const y0 = s - a * x0;
  const mn = (s * s) / (1 + a * a);
  const A = 1 + a * a;
  return {
    prompt: `x ≧ 0、y ≧ 0、${ax} + y＝${s} のとき、x² + y² の最小値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(mn)], calc: `${x0}^2+${y0}^2` },
    point: "1文字消して二次関数にし、x の範囲もつける",
    steps: [
      { title: "y を消す", body: `y＝${s} − ${ax}。y ≧ 0 より 0 ≦ x ≦ ${frac(s, a)}。x² + y²＝x² + (${s} − ${ax})²＝${poly([[A, "x²"], [-2 * a * s, "x"], [s * s, ""]])}。`, back: [S4] },
      { title: "平方完成", body: `＝${vform(A, x0, mn)}。軸 x＝${x0} は範囲の中。` },
      { title: "最小値", body: `x＝${x0}、y＝${y0} のとき {{最小値 ${mn}}}。`, trap: "展開した x² の係数は 1 ではなく 1＋a²。平方完成でくくり忘れない。" },
    ],
  };
}

function bawake(r: Rng): QuestionBody {
  const m = r.int(2, 4);
  const c = nz(r, -5, 9);
  const kase = r.int(0, 2); // 0: a<0 / 1: 0≦a≦m / 2: a>m
  const conds = ["a < 0", `0 ≦ a ≦ ${m}`, `a > ${m}`];
  const ans = kase === 0 ? poly([[c, ""]], true) : kase === 1 ? poly([[-1, "a²"], [c, ""]], true) : poly([[-2 * m, "a"], [m * m + c, ""]], true);
  const ansD = kase === 0 ? D(c) : kase === 1 ? poly([[-1, "a²"], [c, ""]]) : poly([[-2 * m, "a"], [m * m + c, ""]]);
  const how = [
    `軸 x＝a は定義域の左の外。定義域では右上がりなので、x＝0 で最小。f(0)＝${D(c)}`,
    `軸 x＝a は定義域の中。頂点で最小になり、f(a)＝${poly([[1, "a²"], [-2, "a²"], [c, ""]])}`,
    `軸 x＝a は定義域の右の外。定義域では右下がりなので、x＝${m} で最小。f(${m})＝${m * m} − ${2 * m}a ${c < 0 ? "−" : "+"} ${Math.abs(c)}`,
  ][kase];
  return {
    prompt: `a は定数とする。二次関数 f(x)＝${poly([[1, "x²"], [-2, "ax"], [c, ""]])}（0 ≦ x ≦ ${m}）の最小値を、${conds[kase]} の場合について a の式で求めなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [ans], labels: ["最小値 ="] },
    point: "軸 x＝a が、定義域の左・中・右のどこにあるかで分ける",
    steps: [
      { title: "平方完成", body: `f(x)＝(x − a)² − a² ${c < 0 ? "−" : "+"} ${Math.abs(c)}。軸は x＝a。`, back: [S3] },
      { title: "軸の位置で決める", body: `${conds[kase]} のとき、${how}。最小値は {{${ansD}}}。`, trap: "どの場合も頂点の値 −a²＋c にしない。軸が定義域の外なら、軸に近い端で最小になる。" },
    ],
  };
}

const GOODS = ["お弁当", "Tシャツ", "ケーキ", "マグカップ", "ノート"];

function uriage(r: Rng): QuestionBody {
  const p = r.step(100, 300, 20);
  const T = r.int(1, 8);
  const m = r.pick([2, 4, 5, 10]);
  const n = m * (p / 10 + 2 * T);
  const what = r.pick(GOODS);
  const price = p + 10 * T;
  const sold = n - m * T;
  const rev = price * sold;
  return {
    prompt: `ある店で${what}を1個 ${p}円で売ると、1日に ${n}個売れる。1個の値段を10円上げるごとに、売れる個数は ${m}個ずつ減る。1日の売り上げが最大になるときの売り上げを求めなさい（値上げは10円単位とする）。`,
    answer: { kind: "num", answerKind: "num", answer: [String(rev)], unit: "円", calc: `(${p}+10*${T})*(${n}-${m}*${T})` },
    point: "（値段）×（個数）を、値上げの回数 x の二次関数にする",
    steps: [
      { title: "式を立てる", body: `10円の値上げを x 回すると、値段は (${p} + 10x)円、個数は (${n} − ${m}x)個。売り上げ y＝(${p} + 10x)(${n} − ${m}x)。`, back: [S4] },
      { title: "軸を求める", body: `y＝${10 * m}(${p / 10} + x)(${n / m} − x)。この放物線は x＝−${p / 10} と x＝${n / m} で0になるので、軸はまん中の {{x＝${T}}}。`, back: [S5] },
      { title: "最大値", body: `x＝${T} のとき、値段 ${price}円、個数 ${sold}個で、売り上げは {{${rev}円}}。`, trap: "値段を上げすぎると個数が減って売り上げは下がる。軸の位置で山の頂上を見つける。" },
    ],
  };
}

function teisu(r: Rng): QuestionBody {
  const m = r.int(2, 4);
  const b = nz(r, -3, 9);
  const mid = r.bool();
  const a = mid ? r.int(1, m) : m + r.int(1, 3);
  const K = mid ? a * a : m * (2 * a - m);
  const mn = b - K;
  return {
    prompt: `a は正の定数とする。二次関数 f(x)＝${poly([[1, "x²"], [-2, "ax"], [b, ""]])}（0 ≦ x ≦ ${m}）の最小値が ${D(mn)} であるとき、a の値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a)], labels: ["a ="], calc: mid ? `√${K}` : `(${m}^2+${K})/(2*${m})` },
    point: "場合分けして a を求め、その場合の条件に合うか確かめる",
    steps: [
      { title: "軸が定義域の中のとき (0 < a ≦ " + m + ")", body: `最小値は f(a)＝−a² ${b < 0 ? "−" : "+"} ${Math.abs(b)}。−a² ${b < 0 ? "−" : "+"} ${Math.abs(b)}＝${D(mn)} より a²＝${K}、a＝${mid ? a : surd(0, 1, K)}。${mid ? "条件に合う。" : `${surd(0, 1, K)} > ${m} なので条件に合わない。`}`, back: [S3] },
      { title: `軸が定義域の右の外のとき (a > ${m})`, body: `最小値は f(${m})＝${m * m} − ${2 * m}a ${b < 0 ? "−" : "+"} ${Math.abs(b)}。これが ${D(mn)} なので a＝${frac(m * m + K, 2 * m)}。${mid ? `${frac(m * m + K, 2 * m)} ≦ ${m} なので条件に合わない。` : "条件に合う。"}` },
      { title: "答え", body: `{{a＝${a}}}。`, trap: "求めた a が、その場合分けの範囲に入っているかを必ず確かめる。入らない解は捨てる。" },
    ],
  };
}

export const H_MATH_1_SAIDAI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅰ",
  review: { status: "draft" },
  sections: [
    {
      title: "頂点と定義域",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "nashi", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: nashi },
        { id: "teigi", type: "A", difficulty: 1, points: 14, seconds: 120, skill: "知識・技能", generate: teigi },
      ],
    },
    {
      title: "条件つきの最大・最小、場合分け、文章題",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "bunsho", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "思考・判断・表現", generate: bunsho },
        { id: "bawake", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: bawake },
        { id: "uriage", type: "A", difficulty: 2, points: 16, seconds: 180, skill: "思考・判断・表現", generate: uriage },
      ],
    },
    {
      title: "最小値から定数を決める",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "teisu", type: "A", difficulty: 3, points: 24, seconds: 240, skill: "思考・判断・表現", generate: teisu }],
    },
  ],
};
