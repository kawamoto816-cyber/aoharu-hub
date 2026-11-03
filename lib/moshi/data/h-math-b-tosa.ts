// 数学B「等差数列と等比数列」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 初項・公差 (公比) を先に決めて、問題の数 (項の値・和) を計算で作る。答えは一般項 a＋(n−1)d、a·r^(n−1)、
//   和 n(2a＋(n−1)d)/2、a(rⁿ−1)/(r−1) を calc に書き、等比中項は x²＝pq を equations で確かめる。
//   scripts/check-moshi.ts がシード1〜100で calc・equations と答えを照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-b-tosa";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "等差数列：となりとの差がいつも d");
const S2 = L(2, "等比数列：となりとの比がいつも r");
const S3 = L(3, "等差数列の和は「逆向きに並べてたす」");
const S4 = L(4, "等比数列の和は「r 倍してひく」");
const S5 = L(5, "等差と等比をくらべて整理する");

const D = (s: string | number) => String(s).replace(/-/g, "−");
const pa = (n: number) => (n < 0 ? `(−${-n})` : String(n));
const nz = (r: Rng, a: number, b: number) => {
  let v = 0;
  while (v === 0) v = r.int(a, b);
  return v;
};
const seq = (f: (k: number) => number, n: number) => Array.from({ length: n }, (_, i) => D(f(i + 1))).join(", ");

function tosaIppan(r: Rng): QuestionBody {
  const a = r.int(-20, 30);
  const d = nz(r, -9, 9);
  const n = r.int(12, 40);
  const an = a + (n - 1) * d;
  const f = (k: number) => a + (k - 1) * d;
  const how = r.bool();
  return {
    prompt: how
      ? `等差数列 ${seq(f, 4)}, … の第 ${n} 項を求めなさい。`
      : `初項 ${D(a)}、公差 ${D(d)} の等差数列 {aₙ} について、a${n} を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(an)], calc: `${a}+(${n}-1)*(${d})`, labels: [`a${n} =`] },
    point: "等差数列の一般項は aₙ＝a＋(n−1)d",
    steps: [
      { title: "初項と公差", body: `初項 ${D(a)}、公差 ${D(d)}${how ? `（${D(f(2))}−${pa(a)}＝${D(d)}）` : ""}。`, back: [S1] },
      { title: "一般項に入れる", body: `a${n}＝${D(a)}＋(${n}−1)×${pa(d)}＝{{${D(an)}}}。`, trap: `${n}×${pa(d)} とすると公差を1回多くたしてしまう。第 n 項までに公差をたすのは n−1 回。` },
    ],
  };
}

function tohiIppan(r: Rng): QuestionBody {
  const a = r.pick([1, 2, 3, -1, -2, 5]);
  const q = r.pick([2, 3, -2, -3]);
  const n = q === 2 || q === -2 ? r.int(6, 9) : r.int(5, 7);
  const an = a * q ** (n - 1);
  const f = (k: number) => a * q ** (k - 1);
  return {
    prompt: `等比数列 ${seq(f, 4)}, … の第 ${n} 項を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(an)], calc: `${a}*(${q})^${n - 1}`, labels: [`a${n} =`] },
    point: "等比数列の一般項は aₙ＝a·r^(n−1)",
    steps: [
      { title: "初項と公比", body: `初項 ${D(a)}、公比は ${D(f(2))}÷${pa(a)}＝${D(q)}。`, back: [S2] },
      { title: "一般項に入れる", body: `a${n}＝${D(a)}×${pa(q)}^${n - 1}＝{{${D(an)}}}。`, trap: `指数は n−1＝${n - 1}。${pa(q)}^${n} にすると1回多い。${q < 0 ? "公比が負なので、指数が奇数か偶数かで符号が変わる。" : ""}` },
    ],
  };
}

function tosaWa(r: Rng): QuestionBody {
  const a = r.int(-15, 20);
  const d = nz(r, -6, 6);
  const p = r.int(2, 5);
  const q = p + r.int(3, 8);
  const n = r.int(10, 30);
  const f = (k: number) => a + (k - 1) * d;
  const S = (n * (2 * a + (n - 1) * d)) / 2;
  return {
    prompt: `第 ${p} 項が ${D(f(p))}、第 ${q} 項が ${D(f(q))} である等差数列について、初項から第 ${n} 項までの和を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(S)], calc: `${n}*(2*${a}+(${n}-1)*(${d}))/2` },
    point: "2つの項から a と d を求めてから和の公式",
    steps: [
      { title: "公差を求める", body: `第 ${p} 項から第 ${q} 項までに公差を ${q - p} 回たすので、${q - p}d＝${D(f(q))}−${pa(f(p))}＝${D(f(q) - f(p))}。{{d＝${D(d)}}}。`, back: [S1] },
      { title: "初項を求める", body: `a＋${p - 1}×${pa(d)}＝${D(f(p))} より {{a＝${D(a)}}}。` },
      { title: "和の公式", body: `Sₙ＝n{2a＋(n−1)d}/2＝${n}×{2×${pa(a)}＋${n - 1}×${pa(d)}}÷2＝{{${D(S)}}}。`, back: [S3], trap: "(初項＋末項)×項数÷2 でもよい。末項は第 n 項で、第 n−1 項ではない。" },
    ],
  };
}

function tohiWa(r: Rng): QuestionBody {
  const a = r.pick([1, 2, 3, 4, 5, -1, -3]);
  const q = r.pick([2, 3, -2, -3, 2]);
  const n = Math.abs(q) === 2 ? r.int(6, 10) : r.int(4, 7);
  const f = (k: number) => a * q ** (k - 1);
  const S = (a * (q ** n - 1)) / (q - 1);
  return {
    prompt: `初項 ${D(a)}、公比 ${D(q)} の等比数列について、初項から第 ${n} 項までの和を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(S)], calc: `${a}*((${q})^${n}-1)/((${q})-1)` },
    point: "等比数列の和は a(rⁿ−1)/(r−1)。指数は項数 n",
    steps: [
      { title: "はじめの項", body: `${seq(f, 3)}, … と続きます。`, back: [S2] },
      { title: "和の公式", body: `Sₙ＝a(rⁿ−1)/(r−1)＝${D(a)}×{${pa(q)}^${n}−1}÷(${D(q)}−1)＝${D(a)}×${D(q ** n - 1)}÷${pa(q - 1)}＝{{${D(S)}}}。`, back: [S4], trap: "指数は項数の n。一般項の n−1 と取りちがえやすい。" },
    ],
  };
}

function chuko(r: Rng): QuestionBody {
  if (r.bool()) {
    const m = r.pick([1, 2, 3, 5]);
    const s = r.int(1, 4);
    let t = r.int(2, 6);
    if (t === s) t += 1;
    const p = m * s * s;
    const q = m * t * t;
    const x = m * s * t;
    return {
      prompt: `3つの正の数 ${p}, x, ${q} がこの順に等比数列になるとき、x の値を求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [String(x)], labels: ["x ="], equations: [`x^2=${p}*${q}`] },
      point: "a, b, c が等比数列 ⇔ b²＝ac",
      steps: [
        { title: "比が等しい", body: `x/${p}＝${q}/x なので、{{x²＝${p}×${q}}}＝${p * q}。`, back: [S2, S5] },
        { title: "正の数を選ぶ", body: `x＞0 より x＝{{${x}}}。`, trap: "等差数列とまちがえて (p＋q)÷2 にしない。" },
      ],
    };
  }
  const a = r.int(-10, 10);
  const d = nz(r, -7, 7) * 2;
  const p = a;
  const q = a + d;
  const x = a + d / 2;
  return {
    prompt: `3つの数 ${D(p)}, x, ${D(q)} がこの順に等差数列になるとき、x の値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(x)], labels: ["x ="], equations: [`2*x=${p}+(${q})`] },
    point: "a, b, c が等差数列 ⇔ 2b＝a＋c",
    steps: [
      { title: "差が等しい", body: `x−${pa(p)}＝${D(q)}−x なので、{{2x＝${D(p)}＋${pa(q)}}}。`, back: [S1, S5] },
      { title: "解く", body: `x＝${D(p + q)}÷2＝{{${D(x)}}}。` },
    ],
  };
}

function waMax(r: Rng): QuestionBody {
  const k = r.int(3, 7);
  const N = r.int(8, 18);
  const e = r.int(1, k - 1);
  const a = (N - 1) * k + e;
  const d = -k;
  const S = (N * (2 * a + (N - 1) * d)) / 2;
  return {
    prompt: `初項 ${a}、公差 ${D(d)} の等差数列がある。初項から第 n 項までの和 Sₙ が最大になる n と、そのときの Sₙ の値を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(N), String(S)], labels: ["n =", "最大値"], equations: [`x=${N}`, `y=${N}*(2*${a}+(${N}-1)*(${d}))/2`] },
    point: "正の項をすべてたし終えたところで和が最大",
    steps: [
      { title: "一般項", body: `aₙ＝${a}＋(n−1)×(${D(d)})＝${D(a + k)}−${k}n。`, back: [S1] },
      { title: "正の項はどこまでか", body: `aₙ＞0 となるのは ${k}n＜${a + k}、n＜${Math.round(((a + k) / k) * 100) / 100}… より、n≦${N}。a${N}＝${e}＞0、a${N + 1}＝${D(e - k)}＜0。よって {{n＝${N}}} で最大。`, trap: "aₙ＝0 になる項があるときは、その前後の2つの n で同じ最大値になる。この問題では 0 になる項はない。" },
      { title: "最大値", body: `S${N}＝${N}×{2×${a}＋${N - 1}×(${D(d)})}÷2＝{{${S}}}。`, back: [S3] },
    ],
  };
}

export const H_MATH_B_TOSA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学B",
  review: { status: "draft" },
  sections: [
    {
      title: "一般項",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "tosa-ippan", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: tosaIppan },
        { id: "tohi-ippan", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: tohiIppan },
      ],
    },
    {
      title: "数列の和・3つの数",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "tosa-wa", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: tosaWa },
        { id: "tohi-wa", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: tohiWa },
        { id: "chuko", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "思考・判断・表現", generate: chuko },
      ],
    },
    {
      title: "和の最大",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "wa-max", type: "A", difficulty: 3, points: 24, seconds: 180, skill: "思考・判断・表現", generate: waMax }],
    },
  ],
};
