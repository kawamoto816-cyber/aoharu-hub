import { parseExpr } from "./parse";
import { formatCoef, formatPoly } from "./format";
import { cAdd, coef, frac, gcd, pConst, parseMonoKey, splitSquare, type Coef, type Frac, type Poly } from "./value";
import type { Answer } from "./check";

// 50段それぞれの問題の作り方。答えは問題の式を読んで計算する (表示と答えが食い違わないように)。
// 方程式は先に解を決めてから式を作る。数字は答えがきれいになる範囲で選ぶ。

export interface Problem {
  /** 前置きの文 (例 "x=-2 のとき") */
  lead?: string;
  /** 式・方程式 (MathText で描く) */
  q: string;
  answer: Answer;
  /** 入力欄の前の文字 (例 ["x ="] / ["x =", "y ="]) */
  labels?: string[];
  /** 正解の見せ方 (因数分解など、answer から作れないとき) */
  show?: string[];
  /** 自己テスト用：方程式 (解を代入して確かめる) */
  equations?: string[];
}

// ---- 乱数 ----
export type Rand = () => number;
const R = (rnd: Rand, a: number, b: number) => a + Math.floor(rnd() * (b - a + 1));
const NZ = (rnd: Rand, a: number, b: number) => {
  for (;;) {
    const v = R(rnd, a, b);
    if (v !== 0) return v;
  }
};
const pick = <T,>(rnd: Rand, xs: readonly T[]): T => xs[Math.floor(rnd() * xs.length)];
const sign = (rnd: Rand) => (rnd() < 0.5 ? -1 : 1);

// ---- 書き方 ----
/** 演算子のあとに置く数 (負ならかっこ) */
const p = (n: number) => (n < 0 ? `(${n})` : `${n}`);
const pf = (f: Frac) => (f.n < 0 ? `(${f.n}/${f.d})` : f.d === 1 ? `${f.n}` : `${f.n}/${f.d}`);
/** 係数つきの項 (先頭なら符号そのまま、途中なら +/-) */
function term(c: number, v: string, first: boolean): string {
  if (c === 0) return "";
  const a = Math.abs(c);
  const body = v ? (a === 1 ? v : `${a}${v}`) : `${a}`;
  if (first) return c < 0 ? `-${body}` : body;
  return c < 0 ? `-${body}` : `+${body}`;
}
/** 係数の並びから式を作る (例 [[3,"x"],[-5,""]] → "3x-5") */
function lin(parts: [number, string][]): string {
  let s = "";
  for (const [c, v] of parts) s += term(c, v, s === "");
  return s || "0";
}
/** 単項式 (負ならかっこ付きで演算子のあとに置ける) */
const pm = (s: string) => (s.startsWith("-") ? `(${s})` : s);

const num = (q: string): Answer => ({ kind: "num", value: pConst(parseExpr(q))! });
const expr = (q: string): Answer => ({ kind: "expr", value: parseExpr(q) });

/** 分母をそろえた形 ((…)/n) で見せる */
function fracForm(poly: Poly): string {
  let L = 1;
  for (const c of poly.values()) for (const f of c.values()) L = (L / gcd(L, f.d)) * f.d;
  if (L === 1 || poly.size === 1) return formatPoly(poly);
  const numer = parseExpr(`(${formatPoly(poly)})*${L}`);
  return `(${formatPoly(numer)})/${L}`;
}

const DEN = [2, 3, 4, 5, 6, 8, 9, 10, 12] as const;
function rfrac(rnd: Rand, max = 9): Frac {
  for (;;) {
    const d = pick(rnd, DEN);
    const n = NZ(rnd, -max, max);
    const f = frac(n, d);
    if (f.d > 1) return f;
  }
}

// ---- 50段 ----
type Gen = (rnd: Rand) => Problem;

const GENS: Record<number, Gen> = {
  // 中1 正負の数
  1: (r) => {
    const a = NZ(r, -20, 20);
    const b = a > 0 ? NZ(r, -20, -1) : NZ(r, -20, 20);
    const q = `${p(a)}+${p(b)}`;
    return { q, answer: num(q) };
  },
  2: (r) => {
    const a = NZ(r, -20, 20);
    const b = r() < 0.7 ? NZ(r, -20, -1) : NZ(r, 1, 20);
    const q = `${p(a)}-${p(b)}`;
    return { q, answer: num(q) };
  },
  3: (r) => {
    let q = String(NZ(r, -12, 12));
    for (let i = 0; i < 3; i++) {
      const n = NZ(r, -12, 12);
      q += (r() < 0.5 ? "+" : "-") + (n < 0 && r() < 0.7 ? `(${n})` : n < 0 ? `(${n})` : String(n));
    }
    return { q, answer: num(q) };
  },
  4: (r) => {
    if (r() < 0.5) {
      const q = `${p(NZ(r, -12, 12))}×${p(NZ(r, -9, 9))}`;
      return { q, answer: num(q) };
    }
    const b = NZ(r, -9, 9);
    const q = `${p(b * NZ(r, -9, 9))}÷${p(b)}`;
    return { q, answer: num(q) };
  },
  5: (r) => {
    const a = R(r, 2, 6);
    const forms = [`(-${a})^2`, `-${a}^2`, `(-${Math.min(a, 4)})^3`, `-${Math.min(a, 4)}^3`, `${a}^2`, `(-1)^${R(r, 2, 5)}`, `-(-${a})^2`];
    const q = pick(r, forms);
    return { q, answer: num(q) };
  },
  6: (r) => {
    const d = NZ(r, -5, 5);
    const forms = [
      () => `${NZ(r, -4, 4)}×${p(NZ(r, -4, 4))}^2+${d * NZ(r, -6, 6)}÷${p(d)}`,
      () => `${p(NZ(r, -20, 20))}-${R(r, 2, 6)}×${p(NZ(r, -9, 9))}`,
      () => `(${NZ(r, -9, 9)}-${p(NZ(r, -9, 9))})×${p(NZ(r, -6, 6))}`,
      () => `${p(NZ(r, -5, 5))}^2-${R(r, 2, 6)}×${p(NZ(r, -6, 6))}`,
      () => `${d * NZ(r, -8, 8)}÷${p(d)}-${p(NZ(r, -4, 4))}^2`,
    ];
    const q = pick(r, forms)();
    return { q, answer: num(q) };
  },
  7: (r) => {
    const a = rfrac(r);
    const b = rfrac(r);
    const first = a.n < 0 ? `-${-a.n}/${a.d}` : `${a.n}/${a.d}`;
    const q = `${first}${r() < 0.5 ? "+" : "-"}${pf(b)}`;
    return { q, answer: num(q) };
  },
  8: (r) => {
    const a = rfrac(r, 9);
    const b = rfrac(r, 9);
    const forms = [`${pf(a)}×${pf(b)}`, `${pf(a)}÷${pf(b)}`, `${pf(a)}÷${pf(b)}×${p(NZ(r, -6, 6))}`, `${p(NZ(r, -12, 12))}÷${pf(b)}`];
    const q = pick(r, forms);
    return { q, answer: num(q) };
  },
  // 文字式
  9: (r) => {
    const c = NZ(r, -9, 9);
    const forms: [string[], string][] = [
      [["a", "b", p(c)], ""],
      [["x", p(c), "x"], ""],
      [["y", String(R(r, 2, 9)), "x"], ""],
      [["a", "a", "a", p(c)], ""],
      [["(-1)", "a", "b"], ""],
      [["b", "a", p(c), "b"], ""],
      [["x", "y", "x", "(-1)"], ""],
    ];
    const [parts] = pick(r, forms);
    const q = parts.join("×");
    return { q, answer: { kind: "exact", value: parseExpr(q) } };
  },
  10: (r) => {
    const x = NZ(r, -5, 5);
    const y = NZ(r, -5, 5);
    const forms = [
      [`x=${x}`, `${NZ(r, -4, 4)}x^2${term(NZ(r, -9, 9), "", false)}`],
      [`x=${x}`, `${NZ(r, -9, 9)}${term(NZ(r, -6, 6), "x", false)}`],
      [`x=${x}`, `x^2${term(NZ(r, -6, 6), "x", false)}`],
      [`x=${x}, y=${y}`, `${NZ(r, -5, 5)}x${term(NZ(r, -5, 5), "y", false)}`],
      [`x=${x}`, `-x^2`],
    ];
    const [cond, e] = pick(r, forms);
    const q = e
      .replace(/x/g, `(${x})`)
      .replace(/y/g, `(${y})`)
      .replace(/(\d)\(/g, "$1×(");
    return { lead: `${cond} のとき、次の式の値`, q: e, answer: num(q) };
  },
  11: (r) => {
    const a = lin([[NZ(r, -9, 9), "x"], [NZ(r, -9, 9), ""]]);
    const b = lin([[NZ(r, -9, 9), "x"], [NZ(r, -9, 9), ""]]);
    const q = `(${a})${r() < 0.5 ? "+" : "-"}(${b})`;
    return { q, answer: expr(q) };
  },
  12: (r) => {
    if (r() < 0.6) {
      const q = `${NZ(r, -6, 6)}(${lin([[NZ(r, -9, 9), "x"], [NZ(r, -9, 9), ""]])})`;
      return { q, answer: expr(q) };
    }
    const k = NZ(r, -6, 6);
    const q = `(${lin([[k * NZ(r, -5, 5), "x"], [k * NZ(r, -5, 5), ""]])})÷${p(k)}`;
    return { q, answer: expr(q) };
  },
  13: (r) => {
    const q = `${NZ(r, -5, 5)}(${lin([[NZ(r, -6, 6), "x"], [NZ(r, -6, 6), ""]])})${r() < 0.5 ? "+" : "-"}${R(r, 2, 5)}(${lin([[NZ(r, -6, 6), "x"], [NZ(r, -6, 6), ""]])})`;
    return { q, answer: expr(q) };
  },
  14: (r) => {
    const [m, n] = pick(r, [
      [2, 3],
      [3, 4],
      [2, 5],
      [4, 6],
      [3, 6],
      [2, 4],
      [3, 5],
    ] as const);
    const q = `(${lin([[NZ(r, -5, 5), "x"], [NZ(r, -9, 9), ""]])})/${m}${r() < 0.5 ? "+" : "-"}(${lin([[NZ(r, -5, 5), "x"], [NZ(r, -9, 9), ""]])})/${n}`;
    const a = expr(q);
    return { q, answer: a, show: [fracForm((a as { value: Poly }).value)] };
  },
  // 一次方程式
  15: (r) => {
    const x = NZ(r, -12, 12);
    const forms = [
      () => {
        const a = NZ(r, -12, 12);
        return `x${term(a, "", false)}=${x + a}`;
      },
      () => {
        const a = NZ(r, -9, 9);
        return `${term(a, "x", true)}=${a * x}`;
      },
      () => {
        const a = NZ(r, -12, 12);
        return `${x + a}=x${term(a, "", false)}`;
      },
    ];
    const eq = pick(r, forms)();
    return { q: eq, answer: { kind: "num", value: coef(x) }, labels: ["x ="], equations: [eq] };
  },
  16: (r) => {
    const x = NZ(r, -10, 10);
    const a = NZ(r, -9, 9);
    const b = NZ(r, -15, 15);
    const eq = `${lin([[a, "x"], [b, ""]])}=${a * x + b}`;
    return { q: eq, answer: { kind: "num", value: coef(x) }, labels: ["x ="], equations: [eq] };
  },
  17: (r) => {
    const x = NZ(r, -10, 10);
    let a = NZ(r, -9, 9);
    let c = NZ(r, -9, 9);
    while (c === a) c = NZ(r, -9, 9);
    if (r() < 0.2) [a, c] = [a, c];
    const b = NZ(r, -15, 15);
    const d = a * x + b - c * x;
    const eq = `${lin([[a, "x"], [b, ""]])}=${lin([[c, "x"], [d, ""]])}`;
    return { q: eq, answer: { kind: "num", value: coef(x) }, labels: ["x ="], equations: [eq] };
  },
  18: (r) => {
    const x = NZ(r, -10, 10);
    const m = NZ(r, -5, 5);
    const b = NZ(r, -9, 9);
    let c = NZ(r, -6, 6);
    while (c === m) c = NZ(r, -6, 6);
    const d = m * (x + b) - c * x;
    const eq = `${m === 1 ? "" : m === -1 ? "-" : m}(x${term(b, "", false)})=${lin([[c, "x"], [d, ""]])}`;
    return { q: eq, answer: { kind: "num", value: coef(x) }, labels: ["x ="], equations: [eq] };
  },
  19: (r) => {
    const x = NZ(r, -10, 10);
    let A = NZ(r, -9, 9);
    let C = NZ(r, -9, 9);
    while (C === A) C = NZ(r, -9, 9);
    if (A % 10 === 0) A = 3;
    const B = NZ(r, -30, 30);
    const D = (A - C) * x + B;
    const dec = (n: number) => {
      const s = (Math.abs(n) / 10).toString();
      return n < 0 ? `-${s}` : s;
    };
    const t = (n: number, v: string, first: boolean) => {
      if (n === 0) return "";
      const body = `${dec(Math.abs(n))}${v}`;
      return first ? (n < 0 ? `-${body}` : body) : n < 0 ? `-${body}` : `+${body}`;
    };
    const eq = `${t(A, "x", true)}${t(B, "", false)}=${t(C, "x", true)}${t(D, "", false) || (D === 0 ? "" : "")}`;
    return { q: eq, answer: { kind: "num", value: coef(x) }, labels: ["x ="], equations: [eq] };
  },
  20: (r) => {
    for (;;) {
      const m = pick(r, [2, 3, 4, 5, 6]);
      let n = pick(r, [2, 3, 4, 5, 6]);
      if (n === m) n = m === 6 ? 4 : m + 1;
      const a = NZ(r, -6, 6);
      const b = NZ(r, -6, 6);
      // (x+a)/m = (x+b)/n → n(x+a) = m(x+b)
      const x = frac(m * b - n * a, n - m);
      if (x.d !== 1 || Math.abs(x.n) > 30) continue;
      const eq = `(x${term(a, "", false)})/${m}=(x${term(b, "", false)})/${n}`;
      return { q: eq, answer: { kind: "num", value: coef(x.n) }, labels: ["x ="], equations: [eq] };
    }
  },
  21: (r) => {
    const a = R(r, 2, 15);
    const b = R(r, 1, 12);
    let c = R(r, 2, 12);
    while (c === b) c = R(r, 2, 12);
    const x = frac(a * b, c);
    const eq = r() < 0.5 ? `x:${a}=${b}:${c}` : `${b}:${c}=x:${a}`;
    return { q: eq, answer: { kind: "num", value: coef(x) }, labels: ["x ="] };
  },
  // 中2 式の計算
  22: (r) => {
    const a = lin([[NZ(r, -9, 9), "a"], [NZ(r, -9, 9), "b"]]);
    const b = lin([[NZ(r, -9, 9), "a"], [NZ(r, -9, 9), "b"]]);
    const q = `(${a})${r() < 0.5 ? "+" : "-"}(${b})`;
    return { q, answer: expr(q) };
  },
  23: (r) => {
    if (r() < 0.5) {
      const q = `${NZ(r, -5, 5)}(${lin([[NZ(r, -6, 6), "x"], [NZ(r, -6, 6), "y"]])})${r() < 0.5 ? "+" : "-"}${R(r, 2, 5)}(${lin([[NZ(r, -6, 6), "x"], [NZ(r, -6, 6), "y"]])})`;
      return { q, answer: expr(q) };
    }
    const [m, n] = pick(r, [
      [2, 3],
      [3, 4],
      [2, 5],
      [4, 6],
    ] as const);
    const q = `(${lin([[NZ(r, -5, 5), "x"], [NZ(r, -5, 5), "y"]])})/${m}${r() < 0.5 ? "+" : "-"}(${lin([[NZ(r, -5, 5), "x"], [NZ(r, -5, 5), "y"]])})/${n}`;
    const a = expr(q);
    return { q, answer: a, show: [fracForm((a as { value: Poly }).value)] };
  },
  24: (r) => {
    const forms = [
      () => `${pm(lin([[NZ(r, -6, 6), "a"]]))}×${pm(lin([[NZ(r, -6, 6), "ab"]]))}`,
      () => `${pm(lin([[NZ(r, -5, 5), "x"]]))}^2`,
      () => `${pm(lin([[NZ(r, -4, 4), "x"]]))}^2×${pm(lin([[NZ(r, -5, 5), "y"]]))}`,
      () => `${pm(lin([[NZ(r, -6, 6), "xy"]]))}×${pm(lin([[NZ(r, -6, 6), "x"]]))}`,
    ];
    const q = pick(r, forms)();
    return { q, answer: expr(q) };
  },
  25: (r) => {
    const k = NZ(r, -6, 6);
    const c = NZ(r, -6, 6);
    const forms = [
      () => `${lin([[k * c, "a^2b"]])}÷${pm(lin([[k, "a"]]))}`,
      () => `${lin([[k * c, "xy"]])}÷${pm(lin([[k, "y"]]))}`,
      () => `${lin([[k * c, "x^3"]])}÷${pm(lin([[k, "x"]]))}`,
      () => `${lin([[k * c, "ab^2"]])}÷${pm(lin([[k, "ab"]]))}`,
    ];
    const q = pick(r, forms)();
    return { q, answer: expr(q) };
  },
  26: (r) => {
    const a = NZ(r, -4, 4);
    const b = NZ(r, -4, 4);
    const d = pick(r, [1, 2, 3, 4, 6].filter((x) => (a * b) % x === 0));
    const ds = sign(r) * d;
    const forms = [
      () => `${lin([[a * 2, "x^2y"]])}÷${pm(lin([[ds, "x"]]))}×${pm(lin([[b, "y"]]))}`,
      () => `${pm(lin([[a, "a"]]))}^2×${pm(lin([[b * 3, "b"]]))}÷${pm(lin([[3 * (b % 2 === 0 ? 2 : 1), "ab"]]))}`,
      () => `${lin([[a * b * 6, "ab^2"]])}÷${pm(lin([[2 * a, "b"]]))}÷${pm(lin([[b === 0 ? 1 : b, "a"]]))}`,
    ];
    const q = pick(r, forms)();
    return { q, answer: expr(q) };
  },
  27: (r) => {
    const a = NZ(r, -4, 4);
    const b = NZ(r, -4, 4);
    const k = NZ(r, -4, 4);
    const e = `${k === 1 ? "" : k === -1 ? "-" : k}(${lin([[NZ(r, -3, 3), "a"], [NZ(r, -3, 3), "b"]])})-(${lin([[NZ(r, -4, 4), "a"], [NZ(r, -4, 4), "b"]])})`;
    const q = e.replace(/a/g, `(${a})`).replace(/b/g, `(${b})`).replace(/(\d)\(/g, "$1×(");
    return { lead: `a=${a}, b=${b} のとき、次の式の値`, q: e, answer: num(q) };
  },
  28: (r) => {
    const a = NZ(r, -6, 6);
    const b = NZ(r, -6, 6);
    const c = NZ(r, -12, 12);
    if (r() < 0.6) {
      // ax+by=c を y について解く → y = (c - ax)/b
      const ans = parseExpr(`(${c}-(${a})x)/(${b})`);
      return { lead: "y について解く", q: `${lin([[a, "x"], [b, "y"]])}=${c}`, answer: { kind: "expr", value: ans }, labels: ["y ="], show: [fracForm(ans)] };
    }
    const ans = parseExpr(`(${c}-(${b})y)/(${a})`);
    return { lead: "x について解く", q: `${lin([[a, "x"], [b, "y"]])}=${c}`, answer: { kind: "expr", value: ans }, labels: ["x ="], show: [fracForm(ans)] };
  },
  // 連立方程式
  29: (r) => {
    const x = NZ(r, -8, 8);
    const y = NZ(r, -8, 8);
    const a = NZ(r, -4, 4);
    const b = NZ(r, -4, 4);
    const c = NZ(r, -4, 4);
    const s = r() < 0.5 ? -b : b;
    const e1 = `${lin([[a, "x"], [b, "y"]])}=${a * x + b * y}`;
    const e2 = `${lin([[c, "x"], [s, "y"]])}=${c * x + s * y}`;
    if (a * s - b * c === 0) return GENS[29](r);
    return { q: `${e1}\n${e2}`, answer: { kind: "pair", x: coef(x), y: coef(y) }, labels: ["x =", "y ="], equations: [e1, e2] };
  },
  30: (r) => {
    for (;;) {
      const x = NZ(r, -8, 8);
      const y = NZ(r, -8, 8);
      const [a, b, c, d] = [NZ(r, -6, 6), NZ(r, -6, 6), NZ(r, -6, 6), NZ(r, -6, 6)];
      if (a * d - b * c === 0 || Math.abs(a) === Math.abs(c) || Math.abs(b) === Math.abs(d)) continue;
      const e1 = `${lin([[a, "x"], [b, "y"]])}=${a * x + b * y}`;
      const e2 = `${lin([[c, "x"], [d, "y"]])}=${c * x + d * y}`;
      return { q: `${e1}\n${e2}`, answer: { kind: "pair", x: coef(x), y: coef(y) }, labels: ["x =", "y ="], equations: [e1, e2] };
    }
  },
  31: (r) => {
    for (;;) {
      const x = NZ(r, -8, 8);
      const [a, b] = [NZ(r, -4, 4), NZ(r, -9, 9)];
      const y = a * x + b;
      const [c, d] = [NZ(r, -5, 5), NZ(r, -5, 5)];
      if (c + d * a === 0) continue;
      const e1 = `y=${lin([[a, "x"], [b, ""]])}`;
      const e2 = `${lin([[c, "x"], [d, "y"]])}=${c * x + d * y}`;
      return { q: `${e1}\n${e2}`, answer: { kind: "pair", x: coef(x), y: coef(y) }, labels: ["x =", "y ="], equations: [e1, e2] };
    }
  },
  32: (r) => {
    for (;;) {
      const [m, n] = pick(r, [
        [2, 3],
        [3, 2],
        [2, 5],
        [4, 3],
        [3, 4],
      ] as const);
      const x = m * NZ(r, -4, 4);
      const y = n * NZ(r, -4, 4);
      const [A, B] = [NZ(r, -9, 9), NZ(r, -9, 9)];
      const s = sign(r);
      if (A * s * m - B * n === 0) continue; // 2式が平行にならないように (おおまかな確認)
      const dec = (k: number) => (k < 0 ? `-${(Math.abs(k) / 10).toString()}` : (k / 10).toString());
      const C = A * x + B * y;
      const e1 = `${dec(A)}x${B < 0 ? "-" : "+"}${(Math.abs(B) / 10).toString()}y=${dec(C)}`;
      const k = x / m + (s * y) / n;
      const e2 = `x/${m}${s < 0 ? "-" : "+"}y/${n}=${k}`;
      // 平行チェック (行列式)
      const det = (A / 10) * (s / n) - (B / 10) * (1 / m);
      if (Math.abs(det) < 1e-9) continue;
      return { q: `${e1}\n${e2}`, answer: { kind: "pair", x: coef(x), y: coef(y) }, labels: ["x =", "y ="], equations: [e1, e2] };
    }
  },
  33: (r) => {
    for (;;) {
      const x = NZ(r, -6, 6);
      const y = NZ(r, -6, 6);
      const [a, b, c] = [NZ(r, -5, 5), NZ(r, -5, 5), NZ(r, -5, 5)];
      const e = a * x + b * y;
      if ((e - c * x) % y !== 0) continue;
      const d = (e - c * x) / y;
      if (d === 0 || a * d - b * c === 0) continue;
      const q = `${lin([[a, "x"], [b, "y"]])}=${lin([[c, "x"], [d, "y"]])}=${e}`;
      return { q, answer: { kind: "pair", x: coef(x), y: coef(y) }, labels: ["x =", "y ="], equations: [`${lin([[a, "x"], [b, "y"]])}=${e}`, `${lin([[c, "x"], [d, "y"]])}=${e}`] };
    }
  },
  // 一次関数
  34: (r) => {
    const a = NZ(r, -5, 5);
    const b = R(r, -9, 9);
    if (r() < 0.5) {
      const x1 = NZ(r, -4, 4);
      return { lead: `傾きが ${a} で、点(${x1}, ${a * x1 + b})を通る直線の式`, q: "", answer: expr(lin([[a, "x"], [b, ""]])), labels: ["y ="] };
    }
    const x1 = NZ(r, -4, 4);
    return { lead: `変化の割合が ${a} で、x=${x1} のとき y=${a * x1 + b} の一次関数の式`, q: "", answer: expr(lin([[a, "x"], [b, ""]])), labels: ["y ="] };
  },
  35: (r) => {
    const a = NZ(r, -4, 4);
    const b = R(r, -9, 9);
    const x1 = R(r, -5, 2);
    const x2 = x1 + R(r, 1, 5);
    return { lead: `2点(${x1}, ${a * x1 + b}), (${x2}, ${a * x2 + b})を通る直線の式`, q: "", answer: expr(lin([[a, "x"], [b, ""]])), labels: ["y ="] };
  },
  // 中3 展開・因数分解
  36: (r) => {
    const forms = [
      () => `${lin([[NZ(r, -5, 5), "x"]])}(${lin([[NZ(r, -6, 6), "x"], [NZ(r, -9, 9), ""]])})`,
      () => {
        const k = NZ(r, -5, 5);
        return `(${lin([[k * NZ(r, -5, 5), "a^2"], [k * NZ(r, -5, 5), "a"]])})÷${pm(lin([[k, "a"]]))}`;
      },
      () => `${lin([[NZ(r, -4, 4), "a"]])}(${lin([[NZ(r, -5, 5), "a"], [NZ(r, -5, 5), "b"], [NZ(r, -5, 5), ""]])})`,
    ];
    const q = pick(r, forms)();
    return { q, answer: expr(q) };
  },
  37: (r) => {
    const forms = [
      () => `(${lin([[1, "a"], [NZ(r, -6, 6), ""]])})(${lin([[1, "b"], [NZ(r, -6, 6), ""]])})`,
      () => `(${lin([[NZ(r, -4, 4), "x"], [NZ(r, -6, 6), ""]])})(${lin([[NZ(r, -4, 4), "x"], [NZ(r, -6, 6), ""]])})`,
      () => `(${lin([[1, "x"], [NZ(r, -4, 4), "y"]])})(${lin([[NZ(r, -3, 3), "x"], [NZ(r, -4, 4), "y"]])})`,
    ];
    const q = pick(r, forms)();
    return { q, answer: expr(q) };
  },
  38: (r) => {
    const q = `(x${term(NZ(r, -9, 9), "", false)})(x${term(NZ(r, -9, 9), "", false)})`;
    return { q, answer: expr(q) };
  },
  39: (r) => {
    const a = NZ(r, -9, 9);
    const forms = [
      () => `(x${term(a, "", false)})^2`,
      () => `(${lin([[NZ(r, 2, 4) * sign(r), "x"], [NZ(r, -6, 6), ""]])})^2`,
      () => `(x+${Math.abs(a)})(x-${Math.abs(a)})`,
      () => {
        const [m, n] = [R(r, 1, 4), R(r, 1, 5)];
        return `(${lin([[m, "x"], [n, "y"]])})(${lin([[m, "x"], [-n, "y"]])})`;
      },
    ];
    const q = pick(r, forms)();
    return { q, answer: expr(q) };
  },
  40: (r) => {
    const [a, b, c] = [NZ(r, -6, 6), R(r, 1, 6), NZ(r, -6, 6)];
    const forms = [
      () => `(x${term(a, "", false)})^2-(x+${b})(x-${b})`,
      () => `(x${term(a, "", false)})(x${term(c, "", false)})-x(x${term(NZ(r, -6, 6), "", false)})`,
      () => `${R(r, 2, 3)}(x${term(a, "", false)})^2-(x${term(c, "", false)})^2`,
      () => `(x${term(a, "", false)})^2+(x${term(c, "", false)})(x${term(-c, "", false)})`,
    ];
    const q = pick(r, forms)();
    return { q, answer: expr(q) };
  },
  41: (r) => {
    if (r() < 0.35) {
      // 共通因数: k v (一次式)
      for (;;) {
        const k = R(r, 2, 6) * sign(r);
        const v = pick(r, ["a", "x"]);
        const w = v === "a" ? "b" : "y";
        const [m, n] = [NZ(r, -5, 5), NZ(r, -5, 5)];
        if (gcd(m, n) !== 1 || m < 0) continue;
        const inner = lin([[m, v], [n, w]]);
        const outer = `${k < 0 ? "-" : ""}${Math.abs(k)}${v}`;
        const q = formatPoly(parseExpr(`${outer}(${inner})`));
        return { lead: "因数分解", q, answer: { kind: "factor", value: parseExpr(q) }, show: [`${outer}(${inner})`] };
      }
    }
    const [a, b] = [NZ(r, -9, 9), NZ(r, -9, 9)];
    const show = `(x${term(a, "", false)})(x${term(b, "", false)})`;
    if (a === -b) return GENS[41](r);
    const q = formatPoly(parseExpr(show));
    return { lead: "因数分解", q, answer: { kind: "factor", value: parseExpr(q) }, show: [show] };
  },
  42: (r) => {
    const a = R(r, 1, 9);
    const forms: (() => string)[] = [
      () => `(x+${a})(x-${a})`,
      () => `(x${term(sign(r) * a, "", false)})^2`,
      () => `${R(r, 2, 5)}(x+${a})(x-${a})`,
      () => `${R(r, 2, 4)}(x${term(sign(r) * R(r, 1, 6), "", false)})^2`,
      () => `${R(r, 2, 4)}(x${term(NZ(r, -6, 6), "", false)})(x${term(NZ(r, -6, 6), "", false)})`,
      () => {
        const m = R(r, 2, 5);
        let n = R(r, 1, 5);
        while (gcd(m, n) !== 1) n = R(r, 1, 5);
        return `(${m}x+${n})(${m}x-${n})`;
      },
    ];
    for (;;) {
      const show = pick(r, forms)();
      const value = parseExpr(show);
      const q = formatPoly(value);
      // 公式の形が崩れる (例 2(x+3)(x-3) で同じ因数) ものは作り直す
      if ((show.match(/\(/g) ?? []).length === 2) {
        const fs = [...show.matchAll(/\(([^()]+)\)/g)].map((m) => m[1]);
        if (fs[0] === fs[1]) continue;
      }
      return { lead: "因数分解", q, answer: { kind: "factor", value }, show: [show.replace(/\^2/g, "^2")] };
    }
  },
  // 平方根
  43: (r) => {
    if (r() < 0.5) {
      const n = R(r, 2, 15);
      const sq = r() < 0.5;
      const v = sq ? n * n : pick(r, [2, 3, 5, 6, 7, 10, 11, 13, 14, 15, 17]);
      const c = sq ? coef(n) : coef(1, v);
      return { lead: "次の数の平方根を2つ", q: String(v), answer: { kind: "roots", values: [c, cNegate(c)] }, labels: ["", ""] };
    }
    const [a, b] = pick(r, [
      [4, 9],
      [1, 16],
      [9, 25],
      [16, 49],
      [1, 4],
      [25, 36],
    ] as const);
    const c = coef(frac(Math.sqrt(a), Math.sqrt(b)));
    return { lead: "次の数の平方根を2つ", q: `${a}/${b}`, answer: { kind: "roots", values: [c, cNegate(c)] }, labels: ["", ""] };
  },
  44: (r) => {
    for (;;) {
      const s = R(r, 2, 7);
      const k = pick(r, [2, 3, 5, 6, 7, 10]);
      const n = s * s * k;
      if (n > 300) continue;
      const q = `√${n}`;
      return { lead: "a√b の形に", q, answer: { kind: "surd", value: pConst(parseExpr(q))! } };
    }
  },
  45: (r) => {
    const forms = [
      () => `√${pick(r, [2, 3, 6, 8, 12])}×√${pick(r, [2, 3, 6, 8, 10, 15])}`,
      () => {
        const k = pick(r, [2, 3, 5, 6]);
        return `${k * R(r, 1, 4)}/√${k}`;
      },
      () => `√${pick(r, [18, 24, 27, 50, 72])}÷√${pick(r, [2, 3, 6])}`,
      () => `√${pick(r, [2, 3, 5])}/√${pick(r, [3, 7, 11])}`,
      () => `${R(r, 2, 4)}√${pick(r, [2, 3])}×√${pick(r, [6, 8, 12])}`,
    ];
    for (;;) {
      const q = pick(r, forms)();
      const v = pConst(parseExpr(q))!;
      return { q, answer: { kind: "surd", value: v } };
    }
  },
  46: (r) => {
    const forms = [
      () => `√${pick(r, [8, 12, 18, 20, 27, 45, 50])}+√${pick(r, [2, 3, 5, 8, 12, 18, 27, 32, 48])}`,
      () => `√${pick(r, [50, 72, 98, 48, 75])}-√${pick(r, [8, 18, 2, 12, 27])}`,
      () => `(√${pick(r, [2, 3, 5, 7])}${r() < 0.5 ? "+" : "-"}${R(r, 1, 4)})^2`,
      () => `√${pick(r, [2, 3])}(√${pick(r, [6, 12, 8])}-${R(r, 1, 5)})`,
      () => {
        const k = pick(r, [2, 3, 5]);
        return `(√${k}+${R(r, 1, 4)})(√${k}-${R(r, 1, 4)})`;
      },
    ];
    const q = pick(r, forms)();
    return { q, answer: { kind: "surd", value: pConst(parseExpr(q))! } };
  },
  // 二次方程式
  47: (r) => {
    const forms = [
      () => {
        const k = pick(r, [5, 7, 10, 18, 20, 12, 27, 49, 64, 36]);
        return { eq: `x^2=${k}`, c: coef(1, 1), k, h: 0, a: 1 };
      },
      () => {
        const k = pick(r, [5, 3, 7, 16, 9, 8]);
        return { eq: `(x${term(NZ(r, -5, 5), "", false)})^2=${k}`, c: coef(1), k, h: 0, a: 1 };
      },
      () => {
        const [a, b] = pick(r, [
          [4, 9],
          [9, 16],
          [4, 25],
          [16, 9],
        ] as const);
        return { eq: `${a}x^2=${b}`, c: coef(1), k: b / a, h: 0, a };
      },
    ];
    const f = pick(r, forms)();
    // 方程式から解を作る (x = h ± √k の形)
    const m = f.eq.match(/^\(x([+-]\d+)\)\^2=(\d+)$/);
    let h = 0;
    let rad: Coef;
    if (m) {
      h = -Number(m[1]);
      rad = sqrtCoef(Number(m[2]), 1);
    } else if (f.eq.startsWith("x^2=")) {
      rad = sqrtCoef(f.k, 1);
    } else {
      const [a, b] = f.eq.split(/x\^2=/).map(Number);
      rad = sqrtCoef(b, a);
    }
    const r1 = cAdd(coef(h), rad);
    const r2 = cAdd(coef(h), cNegate(rad));
    return { q: `${f.eq}`, answer: { kind: "roots", values: [r1, r2] }, labels: ["x =", "x ="], equations: [f.eq] };
  },
  48: (r) => {
    const forms = [
      () => {
        const a = NZ(r, -9, 9);
        let b = NZ(r, -9, 9);
        if (a === b) b = a === 9 ? -9 : a + 1;
        return [a, b];
      },
      () => [0, NZ(r, -9, 9)],
      () => {
        const a = R(r, 1, 9);
        return [a, -a];
      },
    ];
    const [a, b] = pick(r, forms)();
    const eq = `${formatPoly(parseExpr(`(x-(${a}))(x-(${b}))`))}=0`;
    return { q: eq, answer: { kind: "roots", values: [coef(a), coef(b)] }, labels: ["x =", "x ="], equations: [eq] };
  },
  49: (r) => {
    for (;;) {
      const a = R(r, 1, 3);
      const b = NZ(r, -7, 7);
      const c = NZ(r, -6, 6);
      const D = b * b - 4 * a * c;
      if (D <= 0) continue;
      const { out, k } = splitSquare(D);
      if (k === 1) continue; // 因数分解で解けるものは除く
      const base = coef(frac(-b, 2 * a));
      const rad = coef(frac(out, 2 * a), k);
      const eq = `${lin([[a, "x^2"], [b, "x"], [c, ""]])}=0`;
      return { q: eq, answer: { kind: "roots", values: [cAdd(base, rad), cAdd(base, cNegate(rad))] }, labels: ["x =", "x ="], equations: [eq] };
    }
  },
  // 二次関数
  50: (r) => {
    if (r() < 0.5) {
      const a = NZ(r, -4, 4);
      const x = NZ(r, -4, 4);
      return { lead: `y=ax^2 のグラフが点(${x}, ${a * x * x})を通るとき、a の値`, q: "", answer: { kind: "num", value: coef(a) }, labels: ["a ="] };
    }
    const a = NZ(r, -3, 3);
    const x1 = R(r, -4, 3);
    const x2 = x1 + R(r, 1, 4);
    return { lead: `y=${a === 1 ? "" : a === -1 ? "-" : a}x^2 で、x が ${x1} から ${x2} まで増加するときの変化の割合`, q: "", answer: { kind: "num", value: coef(a * (x1 + x2)) } };
  },
};

function cNegate(c: Coef): Coef {
  const m: Coef = new Map();
  for (const [k, v] of c) m.set(k, frac(-v.n, v.d));
  return m;
}

/** √(n/d) を Coef にする */
function sqrtCoef(n: number, d: number): Coef {
  // √(n/d) = √(n d)/d
  const { out, k } = splitSquare(n * d);
  return coef(frac(out, d), k);
}

export function generate(step: number, rnd: Rand = Math.random): Problem {
  const g = GENS[step];
  if (!g) throw new Error(`no step ${step}`);
  return g(rnd);
}

export function makeSet(step: number, count = 10, rnd: Rand = Math.random): Problem[] {
  const out: Problem[] = [];
  const seen = new Set<string>();
  let guard = 0;
  while (out.length < count && guard++ < 200) {
    const pr = generate(step, rnd);
    const key = `${pr.lead ?? ""}|${pr.q}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(pr);
  }
  return out;
}

export { formatCoef, parseMonoKey };
