// 数学A「ユークリッドの互除法と不定方程式」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 最大公約数は a＝G×m (m は G で割った商) から calc に書き、互除法の各段もコードで割り算して作る。
// 不定方程式の解は、答えをもとの式に代入する equations で確かめる。解の個数は x を全部調べて数え、calc は個数の式。
// scripts/check-moshi.ts がシード1〜100で照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-a-gojo";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const BACK_SHIKUMI = L(1, "互除法のしくみ");
const BACK_WARU = L(2, "余りが0になるまで割り続ける");
const BACK_FUTEI = L(3, "不定方程式は「1組見つけて引き算」");
const BACK_GYAKU = L(4, "互除法を逆にたどる");
const BACK_ABURA = L(5, "油分け算");

/** 本文用: 負の数を全角の − で */
const t = (n: number) => String(n).replace("-", "−");
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
/** ((x % m) + m) % m */
const mod = (x: number, m: number) => ((x % m) + m) % m;
/** ax ≡ 1 (mod b) の 0<x<b の解 (a, b は互いに素) */
const inv = (a: number, b: number) => {
  for (let x = 1; x < b; x++) if (mod(a * x, b) === 1) return x;
  return 1;
};
/** 互除法の各段 "a＝b×q＋r" */
function chain(a: number, b: number): string[] {
  const out: string[] = [];
  while (b) {
    const q = Math.floor(a / b);
    const rr = a % b;
    out.push(`${a}＝${b}×${q}＋${rr}`);
    a = b;
    b = rr;
  }
  return out;
}

function saidai(r: Rng): QuestionBody {
  let G = 0;
  let a = 0;
  let b = 0;
  for (let i = 0; i < 50; i++) {
    G = r.int(7, 41);
    const m = r.int(15, 60);
    const n = r.int(8, m - 3);
    if (gcd(m, n) !== 1) continue;
    a = G * m;
    b = G * n;
    if (chain(a, b).length >= 3 && chain(a, b).length <= 5) break;
  }
  const ch = chain(a, b);
  return {
    prompt: `互除法を用いて、${a} と ${b} の最大公約数を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(G)], calc: `${a}/${a / G}` },
    point: "割る数を余りで割る。余り0のときの割る数が答え",
    steps: [
      { title: "割り続ける", body: ch.join("、"), back: [BACK_WARU] },
      { title: "余り0のときの割る数", body: `余りが0になったときの割る数 {{${G}}} が最大公約数です。`, trap: "最後の余り 0 や、最後の商を答えにしない。", back: [BACK_SHIKUMI] },
    ],
  };
}

function kaiumu(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  let G = 1;
  for (;;) {
    const g = r.pick([2, 3, 4, 6]);
    a = g * r.int(2, 9);
    b = g * r.int(2, 9);
    G = gcd(a, b);
    if (a !== b && G > 1) break;
  }
  const N = r.step(20, 60, 10);
  const ans = Math.floor(N / G);
  return {
    prompt: `c を 1 から ${N} までの整数とする。方程式 ${a}x＋${b}y＝c が整数解 x, y をもつような c は何個あるか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "個", calc: `(${N}-${N % G})/${G}` },
    point: "ax＋by＝c は、c が gcd(a, b) の倍数のときだけ解をもつ",
    steps: [
      { title: "係数の最大公約数", body: `${a} と ${b} の最大公約数は {{${G}}}。x, y が整数なら、左辺 ${a}x＋${b}y はいつも ${G} の倍数です。`, back: [BACK_GYAKU] },
      { title: "解をもつ c", body: `逆に c が ${G} の倍数なら、${a / G === 1 ? "" : a / G}x＋${b / G === 1 ? "" : b / G}y＝c/${G} は互除法で解が見つかる。1〜${N} の ${G} の倍数は {{${ans}個}}。`, trap: "c が a や b の倍数のときだけ、と考えない。最大公約数の倍数ならすべて解をもつ。", back: [BACK_FUTEI] },
    ],
  };
}

function hitokumi(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  for (;;) {
    a = r.int(3, 13);
    b = r.int(3, 13);
    if (a !== b && gcd(a, b) === 1) break;
  }
  const x = inv(a, b);
  const y = (1 - a * x) / b;
  return {
    prompt: `方程式 ${a}x＋${b}y＝1 をみたす整数 x, y の組のうち、0＜x＜${b} であるものを求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(x), String(y)], labels: ["x =", "y ="], equations: [`${a}*x+${b}*y=1`] },
    point: `x＝1, 2, … を入れて、${a}x−1 が ${b} で割り切れるものをさがす`,
    steps: [
      { title: "x を順に入れる", body: `${a}x を ${b} で割った余りが 1 になる x をさがすと、x＝{{${x}}}（${a}×${x}＝${a * x}）。`, back: [BACK_FUTEI] },
      { title: "y を求める", body: `${b}y＝1−${a * x}＝${t(1 - a * x)} より、y＝{{${t(y)}}}。`, trap: "y は負の数になってもよい。整数であればよい。" },
    ],
  };
}

function seikai(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  let c = 0;
  for (;;) {
    a = r.int(3, 11);
    b = r.int(3, 11);
    c = r.int(2, 9);
    if (a !== b && gcd(a, b) === 1) break;
  }
  const x0 = inv(a, b);
  // 一般解 x＝c·x0＋bk。x が正で最小
  const xm = mod(c * x0, b) || b;
  const ym = (c - a * xm) / b;
  const X = c * x0;
  const Y = (c * (1 - a * x0)) / b;
  const minus = (v: number) => (v < 0 ? `＋${-v}` : `−${v}`);
  return {
    prompt: `方程式 ${a}x＋${b}y＝${c} をみたす整数 x, y の組のうち、x が正で最も小さいものを求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(xm), String(ym)], labels: ["x =", "y ="], equations: [`${a}*x+${b}*y=${c}`] },
    point: "1組見つけて引き算し、x＝(1組の x)＋bk の形にする",
    steps: [
      { title: "＝1 の1組", body: `${a}×${x0}＋${b}×(${t((1 - a * x0) / b)})＝1。両辺を ${c} 倍して、x＝${X}, y＝${t(Y)} は1組の解。`, back: [BACK_FUTEI] },
      { title: "すべての解", body: `引き算すると ${a}(x${minus(X)})＝−${b}(y${minus(Y)})。${a} と ${b} は互いに素なので、x＝${X}＋${b}k（k は整数）。`, trap: `x は ${a} ではなく、相手の係数 ${b} ずつ変わる。` },
      { title: "x が正で最小", body: `x を ${b} ずつ動かして最小の正の値にすると x＝{{${xm}}}。このとき y＝(${c}−${a}×${xm})÷${b}＝{{${t(ym)}}}。` },
    ],
  };
}

function gyaku(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  for (;;) {
    a = r.int(31, 97);
    b = r.int(12, 30);
    if (gcd(a, b) === 1 && chain(a, b).length >= 3) break;
  }
  const x = inv(a, b);
  const y = (1 - a * x) / b;
  const ch = chain(a, b).slice(0, -1);
  return {
    prompt: `方程式 ${a}x＋${b}y＝1 をみたす整数 x, y の組のうち、0＜x＜${b} であるものを求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(x), String(y)], labels: ["x =", "y ="], equations: [`${a}*x+${b}*y=1`] },
    point: "互除法の式を「余り＝…」に直し、下から代入する",
    steps: [
      { title: "互除法", body: `${ch.join("、")}。最後の余りが 1 です。`, back: [BACK_WARU] },
      { title: "逆にたどる", body: `「余り＝割られる数−割る数×商」の形にして下から代入していくと、${a} と ${b} だけの式 ${a}×(整数)＋${b}×(整数)＝1 ができます。`, back: [BACK_GYAKU] },
      { title: "範囲に合わせる", body: `x を ${b} ずつずらして 0＜x＜${b} にすると x＝{{${x}}}、y＝{{${t(y)}}}（${a}×${x}＋${b}×(${t(y)})＝1）。`, trap: "逆にたどって出た x が範囲の外なら、x＋bk, y−ak の形で動かす。" },
    ],
  };
}

function kosuu(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  let c = 0;
  let sols: number[] = [];
  for (let i = 0; i < 100; i++) {
    a = r.pick([50, 60, 70, 80, 90, 120, 130]);
    b = r.pick([30, 40, 50, 80, 110]);
    if (a === b || gcd(a, b) !== 10) continue;
    c = 10 * r.int(80, 250);
    sols = [];
    for (let x = 1; a * x < c; x++) if ((c - a * x) % b === 0) sols.push(x);
    if (sols.length >= 2) break;
  }
  const n = sols.length;
  const step = b / 10;
  const ys = sols.map((x) => (c - a * x) / b);
  return {
    prompt: `${a}円のシールと${b}円のシールを、どちらも1枚以上買って、代金をちょうど${c}円にしたい。買い方は何通りあるか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(n)], unit: "通り", calc: `(${sols[n - 1]}-${sols[0]})/${step}+1` },
    point: "1組見つけ、x と y がともに正になる範囲の k を数える",
    steps: [
      { title: "式にする", body: `${a}円を x 枚、${b}円を y 枚とすると ${a}x＋${b}y＝${c}。10で割って {{${a / 10}x＋${b / 10}y＝${c / 10}}}（x≧1, y≧1）。`, back: [BACK_FUTEI, BACK_ABURA] },
      { title: "解の並び", body: `1組 x＝${sols[0]}, y＝${ys[0]} から、x は ${step} ずつ増え、y は ${a / 10} ずつ減ります。`, trap: "x も y も1枚以上。y が0や負になる組は数えない。" },
      { title: "数える", body: `(x, y)＝${sols.map((x, i) => `(${x}, ${ys[i]})`).join("、")} の {{${n}通り}}。` },
    ],
  };
}

export const H_MATH_A_GOJO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学A",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "互除法と解の有無",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "saidai", type: "A", difficulty: 1, points: 14, seconds: 120, skill: "知識・技能", generate: saidai },
        { id: "kaiumu", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: kaiumu },
      ],
    },
    {
      title: "1次不定方程式の整数解",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "hitokumi", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: hitokumi },
        { id: "seikai", type: "A", difficulty: 2, points: 16, seconds: 180, skill: "思考・判断・表現", generate: seikai },
        { id: "gyaku", type: "A", difficulty: 2, points: 18, seconds: 180, skill: "知識・技能", generate: gyaku },
      ],
    },
    {
      title: "不定方程式の文章題",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "kosuu", type: "A", difficulty: 3, points: 22, seconds: 240, skill: "思考・判断・表現", generate: kosuu }],
    },
  ],
};
