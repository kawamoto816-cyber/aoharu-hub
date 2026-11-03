// 数学B「確率分布」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 確率分布は「値と、共通の分母 N に対する重み」で作り、期待値 Σxw/N、分散 Σx²w/N−(Σxw/N)² を calc に書く。
//   さいころ2個の問題は 36 通りをすべて調べて値の合計を出す。aX＋b・未知の確率は equations で確かめる。
//   scripts/check-moshi.ts がシード1〜100で calc・equations と答えを照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-b-bunpu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "確率変数と確率分布");
const S2 = L(2, "期待値：値×確率をすべてたす");
const S3 = L(3, "分散と標準偏差：平均からのずれ");
const S4 = L(4, "aX＋b と X＋Y の公式");

const D = (s: string | number) => String(s).replace(/-/g, "−");
const pa = (n: number | string) => (Number(n) < 0 ? `(${D(n)})` : String(n));
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const fr = (n: number, d: number) => {
  const g = gcd(n, d) * (d < 0 ? -1 : 1);
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
};
const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));
const C = (n: number, r: number) => fact(n) / (fact(r) * fact(n - r));

/** 値と重み (合計 N) を作る */
function dist(r: Rng, k: number): { xs: number[]; ws: number[]; N: number } {
  const N = r.pick([6, 8, 10, 12]);
  const start = r.int(-1, 2);
  const step = r.pick([1, 2, 1]);
  const xs = Array.from({ length: k }, (_, i) => start + i * step);
  const ws = Array(k).fill(1);
  for (let i = k; i < N; i++) ws[r.int(0, k - 1)]++;
  return { xs, ws, N };
}
const table = (xs: number[], ws: number[], N: number) => `X の値：${xs.map(D).join("、")}／確率：${ws.map((w) => fr(w, N)).join("、")}`;

function kitaichi(r: Rng): QuestionBody {
  const { xs, ws, N } = dist(r, r.int(3, 4));
  const s = xs.reduce((a, x, i) => a + x * ws[i], 0);
  return {
    prompt: `確率変数 X の確率分布が次のとおりであるとき、X の期待値 E(X) を求めなさい。\n${table(xs, ws, N)}`,
    answer: { kind: "num", answerKind: "num", answer: [fr(s, N)], calc: `(${xs.map((x, i) => `${x}*${ws[i]}`).join("+")})/${N}`, labels: ["E(X) ="] },
    point: "E(X)＝Σ(値×確率)",
    steps: [
      { title: "分母をそろえる", body: `確率の分母を ${N} にそろえると、重みは ${ws.join("、")}。合計 ${N} で確率の和は 1 です。`, back: [S1] },
      { title: "値×確率をたす", body: `E(X)＝(${xs.map((x, i) => `${pa(x)}×${ws[i]}`).join("＋")})÷${N}＝${s}/${N}＝{{${D(fr(s, N))}}}。`, back: [S2], trap: "値をただ平均する (確率を考えない) のはまちがい。" },
    ],
  };
}

function bunsan(r: Rng): QuestionBody {
  const { xs, ws, N } = dist(r, 3);
  const s1 = xs.reduce((a, x, i) => a + x * ws[i], 0);
  const s2 = xs.reduce((a, x, i) => a + x * x * ws[i], 0);
  const V = fr(s2 * N - s1 * s1, N * N);
  return {
    prompt: `確率変数 X の確率分布が次のとおりであるとき、X の分散 V(X) を求めなさい。\n${table(xs, ws, N)}`,
    answer: { kind: "num", answerKind: "num", answer: [V], calc: `${s2}/${N}-(${s1}/${N})^2`, labels: ["V(X) ="] },
    point: "V(X)＝E(X²)−{E(X)}²",
    steps: [
      { title: "E(X) と E(X²)", body: `E(X)＝${D(s1)}/${N}${fr(s1, N) === `${s1}/${N}` ? "" : `＝${D(fr(s1, N))}`}、E(X²)＝(${xs.map((x, i) => `${x * x}×${ws[i]}`).join("＋")})÷${N}＝${fr(s2, N)}。`, back: [S2, S3] },
      { title: "公式に入れる", body: `V(X)＝${fr(s2, N)}−(${D(fr(s1, N))})²＝{{${V}}}。`, trap: "E(X²) と {E(X)}² の順をまちがえると負になる。分散は 0 以上。" },
    ],
  };
}

function henkan(r: Rng): QuestionBody {
  const m = r.int(-3, 8);
  const v = r.int(1, 9);
  const a = r.pick([2, 3, -2, -3, 4, 5, -1]);
  const b = r.int(-9, 9);
  return {
    prompt: `確率変数 X の期待値が ${D(m)}、分散が ${v} であるとき、Y＝${a === -1 ? "−" : D(a)}X ${b < 0 ? "−" : "＋"} ${Math.abs(b)} の期待値 E(Y) と分散 V(Y) を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(a * m + b), String(a * a * v)], labels: ["E(Y) =", "V(Y) ="], equations: [`x=${a}*(${m})+(${b})`, `y=(${a})^2*${v}`] },
    point: "E(aX＋b)＝aE(X)＋b、V(aX＋b)＝a²V(X)",
    steps: [
      { title: "期待値", body: `E(Y)＝${D(a)}×${pa(m)}${b < 0 ? "−" : "＋"}${Math.abs(b)}＝{{${D(a * m + b)}}}。`, back: [S4] },
      { title: "分散", body: `V(Y)＝${pa(a)}²×${v}＝{{${a * a * v}}}。`, trap: "分散では b は消え、a は2乗する。a が負でも分散は正。" },
    ],
  };
}

function tama(r: Rng): QuestionBody {
  const a = r.int(2, 6);
  const b = r.int(2, 6);
  const N = a + b;
  const all = C(N, 2);
  const s = a * b + 2 * C(a, 2);
  return {
    prompt: `赤玉 ${a} 個と白玉 ${b} 個が入った袋から、同時に2個を取り出す。取り出した赤玉の個数を X とするとき、X の期待値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [fr(s, all)], calc: `(0*${C(b, 2)}+1*${a * b}+2*${C(a, 2)})/${all}`, labels: ["E(X) ="] },
    point: "X＝0, 1, 2 の確率分布を作ってから期待値",
    steps: [
      { title: "確率分布", body: `全部で ${N}C2＝${all} 通り。X＝0 は ${C(b, 2)} 通り、X＝1 は ${a}×${b}＝${a * b} 通り、X＝2 は ${C(a, 2)} 通り。`, back: [S1] },
      { title: "期待値", body: `E(X)＝(0×${C(b, 2)}＋1×${a * b}＋2×${C(a, 2)})÷${all}＝{{${fr(s, all)}}}。`, back: [S2], trap: "確率の合計が 1 (通り数の合計が " + all + ") になるか確かめると、数え落としに気づける。" },
    ],
  };
}

function michi(r: Rng): QuestionBody {
  const N = r.pick([8, 10, 12]);
  const xs = [r.int(0, 1)];
  xs.push(xs[0] + r.int(1, 2));
  xs.push(xs[1] + r.int(1, 3));
  const ws = [r.int(1, 3), r.int(1, 4)];
  ws.push(N - ws[0] - ws[1]);
  const p = ws[0];
  const E = xs.reduce((s, x, i) => s + x * ws[i], 0);
  return {
    prompt: `確率変数 X のとる値は ${xs.join("、")} で、その確率はそれぞれ ${fr(p, N)}、a、b である。X の期待値が ${fr(E, N)} であるとき、a、b の値を求めなさい。`,
    answer: {
      kind: "num",
      answerKind: "pair",
      answer: [fr(ws[1], N), fr(ws[2], N)],
      labels: ["a =", "b ="],
      equations: [`${fr(p, N)}+a+b=1`, `${xs[0]}*${fr(p, N)}+${xs[1]}*a+${xs[2]}*b=${fr(E, N)}`],
    },
    point: "確率の和が1、期待値の式の2本で連立",
    steps: [
      { title: "2つの式", body: `確率の和から {{a＋b＝${fr(N - p, N)}}}。期待値から ${xs[0] === 0 ? "" : `${xs[0]}×${fr(p, N)}＋`}${xs[1]}a＋${xs[2]}b＝${fr(E, N)}。`, back: [S1, S2] },
      { title: "連立方程式を解く", body: `{{a＝${fr(ws[1], N)}、b＝${fr(ws[2], N)}}}。`, trap: "確率の和が 1 であることを使い忘れると、式が1本しかなく解けない。" },
    ],
  };
}

const PAIRS = Array.from({ length: 36 }, (_, i) => [Math.floor(i / 6) + 1, (i % 6) + 1] as const);
const KINDS: { name: string; f: (a: number, b: number) => number }[] = [
  { name: "出た目の大きいほう (同じなら その目)", f: (a, b) => Math.max(a, b) },
  { name: "出た目の小さいほう (同じなら その目)", f: (a, b) => Math.min(a, b) },
  { name: "出た目の差の絶対値", f: (a, b) => Math.abs(a - b) },
];
function saikoro(r: Rng): QuestionBody {
  const t = r.pick(KINDS);
  const a = r.pick([1, 2, 3, 4, 6]);
  const b = r.int(-5, 5);
  const tot = PAIRS.reduce((s, [x, y]) => s + t.f(x, y), 0);
  const ys = [0, 1, 2, 3, 4, 5, 6].map((v) => PAIRS.filter(([x, y]) => t.f(x, y) === v).length);
  const E = fr(a * tot + 36 * b, 36);
  const Ys = a === 1 && b === 0 ? "X" : `${a === 1 ? "" : a}X ${b < 0 ? "−" : "＋"} ${Math.abs(b)}`;
  return {
    prompt: `大小2個のさいころを同時に投げ、${t.name}を X とする。${a === 1 && b === 0 ? "X" : `Y＝${Ys}`} の期待値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [E], calc: `${a}*${tot}/36+(${b})` },
    point: "36通りの表で X の分布を作る。aX＋b は公式で",
    steps: [
      { title: "X の分布", body: `36通りを数えると、${ys.map((c, v) => (c ? `X＝${v} が ${c}通り` : "")).filter(Boolean).join("、")}。`, back: [S1] },
      { title: "E(X)", body: `E(X)＝${tot}/36${fr(tot, 36) === `${tot}/36` ? "" : `＝${fr(tot, 36)}`}。`, back: [S2] },
      { title: "期待値の公式", body: `${a === 1 && b === 0 ? "答えは" : `E(Y)＝${a === 1 ? "" : `${a}×`}${fr(tot, 36)}${b < 0 ? "−" : "＋"}${Math.abs(b)}＝`}{{${D(E)}}}。`, back: [S4], trap: "Y の分布を作り直さなくても、E(aX＋b)＝aE(X)＋b で求まる。" },
    ],
  };
}

export const H_MATH_B_BUNPU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学B",
  review: { status: "draft" },
  sections: [
    {
      title: "期待値と分散",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kitaichi", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: kitaichi },
        { id: "henkan", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: henkan },
        { id: "bunsan", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: bunsan },
      ],
    },
    {
      title: "確率分布をつくる",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "tama", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: tama },
        { id: "michi", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: michi },
        { id: "saikoro", type: "A", difficulty: 3, points: 24, seconds: 180, skill: "思考・判断・表現", generate: saikoro },
      ],
    },
  ],
};
