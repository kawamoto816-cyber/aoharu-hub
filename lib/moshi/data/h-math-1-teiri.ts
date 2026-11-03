// 数学Ⅰ「正弦定理・余弦定理」の単元模試 (A: 辺・角を入れかえる生成型)。問題はすべてオリジナル。
// 検算: sin 30°＝1/2、sin 45°＝√2/2、sin 60°＝√3/2 などを使った式を calc に書き、scripts/check-moshi.ts がシード1〜100で答えと照合する。
//   3辺から角を求める問題は、余弦定理で cos がちょうど ±1/2・±√2/2・±√3/2 になる辺の組 (表) だけを使い、表の組は生成関数の中で cos を計算し直して確かめる。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-1-teiri";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "正弦定理：辺 ÷ 向かいの角の sin はどれも同じ");
const S2 = L(2, "外接円の半径も、1組の辺と角で出る");
const S3 = L(3, "余弦定理：2辺とその間の角から、残りの辺");
const S4 = L(4, "3辺がわかれば、角も余弦定理で");
const S5 = L(5, "わかっているもので、使う定理を選ぶ");

// ---- 式の書き方 (表示は −・²、答えと calc は ASCII) ----
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const D = (s: string | number) => String(s).replace(/-/g, "−");
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

/** sin θ＝√m/2 の m */
const M: Record<number, number> = { 30: 1, 45: 2, 60: 3, 120: 3, 135: 2, 150: 1 };
const sinT = (th: number, ascii = false) => (M[th] === 1 ? "1/2" : ascii ? `√${M[th]}/2` : `√${M[th]}/2`);
const ANGS = [30, 45, 60, 120, 135, 150];

function seigen(r: Rng): QuestionBody {
  let A = 30;
  let B = 45;
  for (let i = 0; i < 40; i++) {
    [A, B] = r.sample(ANGS, 2);
    if (A + B < 180) break;
  }
  if (A + B >= 180) [A, B] = [30, 45];
  const C = 180 - A - B;
  const a = r.int(2, 9);
  const useC = C in M && r.bool();
  const given = useC ? `a＝${a}、B＝${B}°、C＝${C}°` : `a＝${a}、A＝${A}°、B＝${B}°`;
  const ans = surd(0, a, M[A] * M[B], M[A]);
  return {
    prompt: `△ABC で、${given} のとき、b を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(0, a, M[A] * M[B], M[A], true)], calc: `${a}*(${sinT(B, true)})/(${sinT(A, true)})` },
    point: "a/sin A＝b/sin B。向かい合う辺と角を組にする",
    steps: [
      ...(useC ? [{ title: "残りの角", body: `A＝180° − ${B}° − ${C}°＝{{${A}°}}。`, back: [S5] }] : []),
      { title: "正弦定理", body: `${a}/sin ${A}°＝b/sin ${B}° より、b＝${a}×sin ${B}°/sin ${A}°＝${a}×(${sinT(B)})÷(${sinT(A)})。`, back: [S1] },
      { title: "計算する", body: `{{b＝${ans}}}。`, trap: "sin 120°＝sin 60°、sin 150°＝sin 30°。鈍角でも sin は正。" },
    ],
  };
}

function gaisetsu(r: Rng): QuestionBody {
  const A = r.pick(ANGS);
  if (r.bool()) {
    const a = r.int(2, 12);
    return {
      prompt: `△ABC で、a＝${a}、A＝${A}° のとき、外接円の半径 R を求めなさい。`,
      answer: { kind: "num", answerKind: "surd", answer: [surd(0, a, M[A], M[A], true)], calc: `${a}/(2*(${sinT(A, true)}))` },
      point: "a/sin A＝2R",
      steps: [
        { title: "正弦定理の 2R", body: `a/sin A＝2R なので、2R＝${a}÷(${sinT(A)})。`, back: [S2] },
        { title: "計算する", body: `{{R＝${surd(0, a, M[A], M[A])}}}。`, trap: "a/sin A は直径 2R。半径にするために 2 でわるのを忘れない。" },
      ],
    };
  }
  const R = r.int(2, 9);
  return {
    prompt: `△ABC の外接円の半径が ${R}、A＝${A}° のとき、a を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(0, R, M[A], 1, true)], calc: `2*${R}*(${sinT(A, true)})` },
    point: "a＝2R sin A",
    steps: [
      { title: "正弦定理の 2R", body: `a/sin A＝2R なので、a＝2×${R}×sin ${A}°。`, back: [S2] },
      { title: "計算する", body: `sin ${A}°＝${sinT(A)} なので {{a＝${surd(0, R, M[A], 1)}}}。` },
    ],
  };
}

/** cos A を分数 p/q で */
const COS: [number, number][] = [
  [1, 2],
  [-1, 2],
  [1, 3],
  [-1, 3],
  [1, 4],
  [-1, 4],
  [2, 3],
  [3, 4],
];

function yogen(r: Rng): QuestionBody {
  const [p, q] = r.pick(COS);
  // 2bc·p/q が整数になるように b を q の倍数に
  const b = q * r.int(1, 3);
  let c = r.int(2, 8);
  if (c === b) c += 1;
  const N = b * b + c * c - (2 * b * c * p) / q;
  const cosText = p === 1 && q === 2 ? "A＝60°" : p === -1 && q === 2 ? "A＝120°" : `cos A＝${frac(p, q)}`;
  const cosV = frac(p, q);
  return {
    prompt: `△ABC で、b＝${b}、c＝${c}、${cosText} のとき、a を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(0, 1, N, 1, true)], calc: `√${N}` },
    point: "a²＝b²＋c²−2bc cos A",
    steps: [
      { title: "余弦定理", body: `a²＝${b}² + ${c}² − 2×${b}×${c}×${cosText.startsWith("A") ? `cos ${cosText.slice(2)}` : "cos A"}。cos A＝${cosV}。`, back: [S3] },
      { title: "計算する", body: `a²＝${b * b} + ${c * c} ${p > 0 ? "−" : "+"} ${Math.abs((2 * b * c * p) / q)}＝${N}。a＞0 なので {{a＝${surd(0, 1, N)}}}。`, trap: "cos A が負のときは −2bc cos A が正になり、a² は b²＋c² より大きくなる。" },
    ],
  };
}

function cosv(r: Rng): QuestionBody {
  let a = 4;
  let b = 5;
  let c = 6;
  for (let i = 0; i < 40; i++) {
    a = r.int(2, 9);
    b = r.int(2, 9);
    c = r.int(2, 9);
    if (a < b + c && b < a + c && c < a + b && new Set([a, b, c]).size >= 2) break;
  }
  if (!(a < b + c && b < a + c && c < a + b)) [a, b, c] = [4, 5, 6];
  const ang = r.pick(["A", "B", "C"]);
  const [x, y, z] = ang === "A" ? [b, c, a] : ang === "B" ? [c, a, b] : [a, b, c]; // cos＝(x²+y²−z²)/(2xy)
  const num = x * x + y * y - z * z;
  return {
    prompt: `△ABC で、a＝${a}、b＝${b}、c＝${c} のとき、cos ${ang} の値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [frac(num, 2 * x * y, true)], calc: `(${x}^2+${y}^2-${z}^2)/(2*${x}*${y})` },
    point: "cos A＝(b²＋c²−a²)/(2bc)。ひく辺は角の向かい",
    steps: [
      { title: "向かいの辺を確かめる", body: `∠${ang} の向かいの辺は ${ang.toLowerCase()}＝${z}。はさむ2辺は ${x} と ${y}。`, back: [S4] },
      { title: "余弦定理", body: `cos ${ang}＝(${x}² + ${y}² − ${z}²)/(2×${x}×${y})＝${D(num)}/${2 * x * y}＝{{${frac(num, 2 * x * y)}}}。`, trap: "分子でひくのは、求める角の向かいの辺の2乗。" },
    ],
  };
}

function shurui(r: Rng): QuestionBody {
  let s: number[] = [];
  const kind = r.int(0, 2);
  for (let i = 0; i < 60; i++) {
    if (kind === 1) {
      const t = r.pick([
        [3, 4, 5],
        [5, 12, 13],
        [8, 15, 17],
        [6, 8, 10],
        [9, 12, 15],
        [7, 24, 25],
      ]);
      s = t;
      break;
    }
    const x = r.int(2, 12);
    const y = r.int(x, 13);
    const z = r.int(y, 14);
    if (z >= x + y) continue;
    const d = x * x + y * y - z * z;
    if ((kind === 0 && d > 0 && z > y) || (kind === 2 && d < 0)) {
      s = [x, y, z];
      break;
    }
  }
  if (!s.length) s = kind === 0 ? [5, 6, 7] : [3, 5, 7];
  const [x, y, z] = s;
  const d = x * x + y * y - z * z;
  const correct = d > 0 ? 0 : d === 0 ? 1 : 2;
  const opts = ["鋭角三角形", "直角三角形", "鈍角三角形"];
  const order = r.shuffle([x, y, z]);
  return {
    prompt: `3辺の長さが ${order.join("、")} の三角形は、次のどれですか。`,
    answer: { kind: "choice", options: opts, correct, why: opts.map((_, i) => (i === correct ? `正しい。${x}² + ${y}²＝${x * x + y * y}、${z}²＝${z * z}。` : "最大の辺の2乗と、ほかの2辺の2乗の和を比べなおす。")) },
    point: "最大の辺の向かいの角だけ調べればよい",
    steps: [
      { title: "最大の角を調べる", body: `最大の辺 ${z} の向かいの角が最大の角。cos の分子は ${x}² + ${y}² − ${z}²＝${D(d)}。`, back: [S4] },
      { title: "符号で決める", body: `${d > 0 ? "正なので最大の角は鋭角" : d === 0 ? "0なので最大の角は直角" : "負なので最大の角は鈍角"}。{{${opts[correct]}}}。`, back: [S5], trap: "どの角でもよいわけではない。最大の辺の向かいの角が鈍角かどうかで決まる。" },
    ],
  };
}

/** [b, c の表示, b², c², bc の √ の中を整理した係数…] 余弦定理で角がちょうど決まる組。cosv＝(b²+c²−a²)/(2bc) */
const KAKU: { b: string; c: string; a: string; b2: number; c2: number; a2: number; deg: number }[] = [
  { b: "3", c: "5", a: "7", b2: 9, c2: 25, a2: 49, deg: 120 },
  { b: "7", c: "8", a: "13", b2: 49, c2: 64, a2: 169, deg: 120 },
  { b: "5", c: "16", a: "19", b2: 25, c2: 256, a2: 361, deg: 120 },
  { b: "3", c: "8", a: "7", b2: 9, c2: 64, a2: 49, deg: 60 },
  { b: "5", c: "8", a: "7", b2: 25, c2: 64, a2: 49, deg: 60 },
  { b: "8", c: "15", a: "13", b2: 64, c2: 225, a2: 169, deg: 60 },
  { b: "√3", c: "1", a: "√7", b2: 3, c2: 1, a2: 7, deg: 150 },
  { b: "2√3", c: "2", a: "2", b2: 12, c2: 4, a2: 4, deg: 30 },
  { b: "√2", c: "2", a: "√10", b2: 2, c2: 4, a2: 10, deg: 135 },
  { b: "2√2", c: "1", a: "√5", b2: 8, c2: 1, a2: 5, deg: 45 },
  { b: "√2", c: "1", a: "√5", b2: 2, c2: 1, a2: 5, deg: 135 },
  { b: "3√2", c: "3", a: "3", b2: 18, c2: 9, a2: 9, deg: 45 },
];
const COSD: Record<number, string> = { 30: "√3/2", 45: "√2/2", 60: "1/2", 120: "−1/2", 135: "−√2/2", 150: "−√3/2" };

function kaku(r: Rng): QuestionBody {
  const t = r.pick(KAKU);
  // 表の組を確かめる: (b²+c²−a²)²＝4b²c²cos² A
  const num = t.b2 + t.c2 - t.a2;
  const cos2 = ({ 30: 3 / 4, 45: 1 / 2, 60: 1 / 4, 120: 1 / 4, 135: 1 / 2, 150: 3 / 4 } as Record<number, number>)[t.deg];
  if (Math.abs(num * num - 4 * t.b2 * t.c2 * cos2) > 1e-9 || (num > 0) !== (t.deg < 90)) throw new Error("KAKU の表がまちがっている");
  const others = r.sample([30, 45, 60, 90, 120, 135, 150].filter((x) => x !== t.deg), 3);
  const opts = r.shuffle([t.deg, ...others]);
  const swap = r.bool();
  const [b, c] = swap ? [t.b, t.c] : [t.c, t.b];
  return {
    prompt: `△ABC で、a＝${t.a}、b＝${b}、c＝${c} のとき、A の大きさはどれですか。`,
    answer: { kind: "choice", options: opts.map((x) => `${x}°`), correct: opts.indexOf(t.deg), why: opts.map((x) => (x === t.deg ? `正しい。cos A＝${COSD[t.deg]}。` : `cos ${x}° は ${x === 90 ? "0" : COSD[x]}。cos A の値と合わない。`)) },
    point: "3辺がわかれば、cos A＝(b²＋c²−a²)/(2bc)",
    steps: [
      { title: "余弦定理で cos A", body: `cos A＝(${t.b2} + ${t.c2} − ${t.a2})/(2×${t.b}×${t.c})＝${D(num)}/(2×${t.b}×${t.c})＝{{${COSD[t.deg]}}}。`, back: [S4] },
      { title: "角を読む", body: `0° < A < 180° で cos A＝${COSD[t.deg]} なので、{{A＝${t.deg}°}}。`, trap: "cos が負なら鈍角。30° と 150° のように、sin が同じでも cos の符号でちがう角になる。" },
    ],
  };
}

function hankei(r: Rng): QuestionBody {
  const obtuse = r.bool();
  const A = obtuse ? 120 : 60;
  // N＝b²＋c²±bc が 3 の倍数になる組にすると、R＝√(N/3) で有理化が軽くなる
  let b = 2;
  let c = obtuse ? 5 : 4;
  for (let i = 0; i < 60; i++) {
    b = r.int(2, 9);
    c = r.int(2, 9);
    if (b !== c && (b * b + c * c + (obtuse ? b * c : -b * c)) % 3 === 0) break;
  }
  if (b === c || (b * b + c * c + (obtuse ? b * c : -b * c)) % 3 !== 0) [b, c] = obtuse ? [2, 5] : [2, 4];
  const N = b * b + c * c + (obtuse ? b * c : -b * c);
  const R = surd(0, 1, 3 * N, 3);
  return {
    prompt: `△ABC で、b＝${b}、c＝${c}、A＝${A}° のとき、△ABC の外接円の半径 R を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(0, 1, 3 * N, 3, true)], calc: `√${N}/(2*(√3/2))` },
    point: "余弦定理で a を出してから、正弦定理で R",
    steps: [
      { title: "余弦定理で a", body: `a²＝${b}² + ${c}² − 2×${b}×${c}×cos ${A}°＝${b * b} + ${c * c} ${obtuse ? "+" : "−"} ${b * c}＝${N}。a＝${surd(0, 1, N)}。`, back: [S3] },
      { title: "正弦定理で R", body: `2R＝a/sin ${A}°＝${surd(0, 1, N)}÷(√3/2)。`, back: [S2] },
      { title: "有理化", body: `R＝${surd(0, 1, N)}/√3＝{{${R}}}。`, back: [S5], trap: "a/sin A は 2R（直径）。そのまま半径にしない。" },
    ],
  };
}

export const H_MATH_1_TEIRI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅰ",
  review: { status: "draft" },
  sections: [
    {
      title: "正弦定理と三角形の形",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "seigen", type: "A", difficulty: 1, points: 12, seconds: 75, skill: "知識・技能", generate: seigen },
        { id: "gaisetsu", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: gaisetsu },
        { id: "shurui", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: shurui },
      ],
    },
    {
      title: "余弦定理",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "yogen", type: "A", difficulty: 2, points: 14, seconds: 90, skill: "知識・技能", generate: yogen },
        { id: "cosv", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: cosv },
        { id: "kaku", type: "A", difficulty: 2, points: 14, seconds: 90, skill: "思考・判断・表現", generate: kaku },
      ],
    },
    {
      title: "2つの定理を組み合わせる",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "hankei", type: "A", difficulty: 3, points: 20, seconds: 180, skill: "思考・判断・表現", generate: hankei }],
    },
  ],
};
