import { parseExpr } from "../math/parse";
import { formatCoef, formatFrac, formatPoly } from "../math/format";
import { cAdd, cDiv, cKey, cMul, cNeg, coef, fAdd, fDiv, fMul, fSub, frac, gcd, monoKey, pAdd, pConst, pMul, pNum, pSubst, parseMonoKey, poly, splitSquare, type Coef, type Frac, type Poly } from "../math/value";
import { cNum, intersect, type Bound, type Field, type SolSet } from "./check";
import { STEP_COUNT } from "./steps";

// 高校数学 計算○段それぞれの問題の作り方。答えは問題と同じ数から計算する (表示と答えが食い違わないように)。
// 方程式・不等式は先に解を決めてから式を作る。数字は答えが教科書の水準のきれいな数 (整数・分数・√) になる範囲で選ぶ。
// 式の書き方は lib/math と同じ (3/2x は (3/2)x、(…)/n は分子がかっこの中身の分数)。KousuuText が描く。

export interface Problem {
  /** 前置きの文 */
  lead?: string;
  /** 式 (KousuuText で描く) */
  q: string;
  fields: Field[];
  /** 欄の前の文字 (例 ["x =", "x ="]) */
  labels?: string[];
  /** 欄のあとの文字 (例 ["°"]) */
  suffix?: string[];
  /** 欄の順番を問わない (解が2つ など) */
  unordered?: boolean;
  /** 頂点の座標のように ( , ) で並べる */
  layout?: "point";
  /** 正解の見せ方 (因数分解など、fields から作れないとき) */
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
/** 重ならない2つ */
function two<T>(rnd: Rand, xs: readonly T[]): [T, T] {
  const a = pick(rnd, xs);
  for (;;) {
    const b = pick(rnd, xs);
    if (b !== a) return [a, b];
  }
}

// ---- 書き方 ----
/** 係数つきの項 (先頭なら符号そのまま、途中なら +/-) */
function T(c: number, v: string, first = false): string {
  if (c === 0) return "";
  const a = Math.abs(c);
  const body = v ? (a === 1 ? v : `${a}${v}`) : `${a}`;
  if (first) return c < 0 ? `-${body}` : body;
  return c < 0 ? `-${body}` : `+${body}`;
}
/** 係数の並びから式を作る (例 [[3,"x"],[-5,""]] → "3x-5") */
function L(parts: [number, string][]): string {
  let s = "";
  for (const [c, v] of parts) s += T(c, v, s === "");
  return s || "0";
}
const fs = (f: Frac) => formatFrac(f);
/** 指数の書き方 (負・分数はかっこ) */
const ex = (f: Frac) => (f.d === 1 ? `${f.n}` : `(${fs(f)})`);

// ---- 数 ----
const isSq = (n: number) => n >= 0 && Math.round(Math.sqrt(n)) ** 2 === n;
/** √(有理数) */
function sq(n: number | Frac): Coef {
  const f = typeof n === "number" ? frac(n) : n;
  if (f.n < 0) throw new Error("negative sqrt");
  if (f.n === 0) return new Map();
  const { out, k } = splitSquare(f.n * f.d);
  return coef(frac(out, f.d), k);
}
const cSub = (a: Coef, b: Coef) => cAdd(a, cNeg(b));
/** わり算 (分母が2つの項なら共役をかけて有理化) */
function cDivAny(a: Coef, b: Coef): Coef {
  if (b.size === 0) throw new Error("division by zero");
  if (b.size === 1) return cDiv(a, b);
  if (b.size !== 2) throw new Error("unsupported");
  const [[k1, v1], [k2, v2]] = [...b];
  const conj: Coef = new Map([
    [k1, v1],
    [k2, frac(-v2.n, v2.d)],
  ]);
  return cDiv(cMul(a, conj), cMul(b, conj));
}
function fPow(f: Frac, n: number): Frac {
  let r = frac(1);
  const b = n < 0 ? fDiv(frac(1), f) : f;
  for (let i = 0; i < Math.abs(n); i++) r = fMul(r, b);
  return r;
}
const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));
const nPr = (n: number, r: number) => fact(n) / fact(n - r);
const nCr = (n: number, r: number) => nPr(n, r) / fact(r);
const ratOf = (c: Coef): Frac => (c.size === 0 ? frac(0) : c.get(1)!);

// ---- 答えの欄 ----
const num = (value: Coef, alt?: string[]): Field => ({ kind: "num", value, alt });
const nf = (n: number | Frac) => num(coef(n));
const exprF = (value: Poly): Field => ({ kind: "expr", value });
const ineqF = (value: SolSet, v = "x"): Field => ({ kind: "ineq", value, v });

// ---- 三角比 ----
const HALF = coef(frac(1, 2));
function sinBase(d: number): Coef {
  if (d === 0) return new Map();
  if (d === 30) return HALF;
  if (d === 45) return coef(frac(1, 2), 2);
  if (d === 60) return coef(frac(1, 2), 3);
  if (d === 90) return coef(1);
  throw new Error(`angle ${d}`);
}
function sinDeg(d: number): Coef {
  const x = ((d % 360) + 360) % 360;
  if (x <= 90) return sinBase(x);
  if (x <= 180) return sinBase(180 - x);
  if (x <= 270) return cNeg(sinBase(x - 180));
  return cNeg(sinBase(360 - x));
}
const cosDeg = (d: number) => sinDeg(d + 90);
function tanDeg(d: number): Coef | null {
  const c = cosDeg(d);
  return c.size ? cDiv(sinDeg(d), c) : null;
}
/** 三角比で教科書がそのまま書く形 (1/√2, 1/√3) */
function trigAlt(c: Coef): string[] {
  const k = cKey(c);
  const alts: [Coef, string][] = [
    [coef(frac(1, 2), 2), "1/√2"],
    [coef(frac(-1, 2), 2), "-1/√2"],
    [coef(frac(1, 3), 3), "1/√3"],
    [coef(frac(-1, 3), 3), "-1/√3"],
  ];
  return alts.filter(([v]) => cKey(v) === k).map(([, s]) => s);
}
const trigF = (c: Coef) => num(c, trigAlt(c));
/** 弧度の書き方 (例 5π/6 → "(5π)/6") */
function angStr(f: Frac): string {
  if (f.n === 0) return "0";
  if (f.d === 1) return f.n === 1 ? "π" : f.n === -1 ? "-π" : `${f.n}π`;
  if (Math.abs(f.n) === 1) return `${f.n < 0 ? "-" : ""}π/${f.d}`;
  return f.n < 0 ? `-(${-f.n}π)/${f.d}` : `(${f.n}π)/${f.d}`;
}

// ---- 不等式 ----
const flip: Record<string, string> = { "<": ">", ">": "<", "≤": "≥", "≥": "≤" };
const OPS = ["<", ">", "≤", "≥"] as const;
const closedOp = (op: string) => op === "≤" || op === "≥";
/** 一次不等式 left op right を解く */
function solveLin(left: string, right: string, op: string, v = "x"): SolSet | null {
  const d = pAdd(parseExpr(left), cNegP(parseExpr(right)));
  const key = monoKey({ [v]: 1 });
  if ([...d.keys()].some((k) => k !== "" && k !== key)) return null;
  const k = d.get(key);
  if (!k || k.size !== 1 || !k.has(1)) return null;
  const m = d.get("") ?? new Map();
  const root = cNeg(cDiv(m, k));
  const o = k.get(1)!.n < 0 ? flip[op] : op;
  const b: Bound = { c: root, closed: closedOp(o) };
  return o === "<" || o === "≤" ? { parts: [{ hi: b }] } : { parts: [{ lo: b }] };
}
function cNegP(p: Poly): Poly {
  const out: Poly = new Map();
  for (const [k, v] of p) out.set(k, cNeg(v));
  return out;
}
/** a(x−α)(x−β) op 0 の解 (α<β、lc は x² の係数の符号) */
function quadSol(lc: number, lo: Coef, hi: Coef, op: string): SolSet {
  const wantNeg = op === "<" || op === "≤";
  const closed = closedOp(op);
  const inside = wantNeg === lc > 0;
  if (inside) return { parts: [{ lo: { c: lo, closed }, hi: { c: hi, closed } }] };
  return { parts: [{ hi: { c: lo, closed } }, { lo: { c: hi, closed } }] };
}

// ---- 多項式 ----
function deriv(p: Poly): Poly {
  let out: Poly = new Map();
  for (const [k, c] of p) {
    const e = parseMonoKey(k).x ?? 0;
    if (e === 0) continue;
    out = pAdd(out, poly(cMul(c, coef(e)), e - 1 ? { x: e - 1 } : {}));
  }
  return out;
}
const at = (p: Poly, x: number | Frac): Coef => pConst(pSubst(p, { x: coef(x) }))!;
/** 定積分 ∫[a,b] p dx */
function integ(p: Poly, a: number, b: number): Frac {
  let s = frac(0);
  for (const [k, c] of p) {
    const e = parseMonoKey(k).x ?? 0;
    const v = ratOf(c);
    s = fAdd(s, fMul(v, frac(b ** (e + 1) - a ** (e + 1), e + 1)));
  }
  return s;
}

// ---- 複素数 ----
interface Cx {
  re: Coef;
  im: Coef;
}
const cx = (a: number | Frac, b: number | Frac): Cx => ({ re: coef(a), im: coef(b) });
const cxAdd = (x: Cx, y: Cx): Cx => ({ re: cAdd(x.re, y.re), im: cAdd(x.im, y.im) });
const cxSub = (x: Cx, y: Cx): Cx => ({ re: cSub(x.re, y.re), im: cSub(x.im, y.im) });
const cxMul = (x: Cx, y: Cx): Cx => ({ re: cSub(cMul(x.re, y.re), cMul(x.im, y.im)), im: cAdd(cMul(x.re, y.im), cMul(x.im, y.re)) });
function cxDiv(x: Cx, y: Cx): Cx {
  const conj = { re: y.re, im: cNeg(y.im) };
  const n = cxMul(x, conj);
  const d = cAdd(cMul(y.re, y.re), cMul(y.im, y.im));
  return { re: cDiv(n.re, d), im: cDiv(n.im, d) };
}
const cxS = (a: number, b: number) => L([
  [a, ""],
  [b, "i"],
]);
const cxF = (z: Cx): Field => ({ kind: "complex", re: z.re, im: z.im });

// ---- 因数分解 ----
function factorProblem(show: string): Problem {
  const value = parseExpr(show);
  return { lead: "因数分解", q: formatPoly(value), fields: [{ kind: "factor", value }], show: [show] };
}

// ---- 段 ----
type Gen = (rnd: Rand) => Problem;

const GENS: Record<number, Gen> = {
  // ===== 数学Ⅰ 式の展開 =====
  1: (r) => {
    const c = () => R(r, 1, 4);
    const forms = [
      () => `(${L([[c(), "x"], [NZ(r, -5, 5), "y"]])})^2`,
      () => {
        const a = c();
        const b = R(r, 1, 5);
        return `(${L([[a, "x"], [b, "y"]])})(${L([[a, "x"], [-b, "y"]])})`;
      },
      () => `(${L([[c(), "x"], [NZ(r, -5, 5), "y"]])})(${L([[c(), "x"], [NZ(r, -5, 5), "y"]])})`,
      () => `(${L([[c(), "a"], [NZ(r, -4, 4), "b"]])})(${L([[c(), "a"], [NZ(r, -4, 4), "b"]])})`,
    ];
    const q = pick(r, forms)();
    return { lead: "展開", q, fields: [exprF(parseExpr(q))] };
  },
  2: (r) => {
    const forms = [
      () => `(${L([[1, "x"], [NZ(r, -3, 3), "y"], [NZ(r, -3, 3), "z"]])})^2`,
      () => `(${L([[1, "x"], [NZ(r, -3, 3), "y"], [NZ(r, -5, 5), ""]])})^2`,
      () => {
        const a = NZ(r, -3, 3);
        const b = R(r, 1, 5);
        return `(x${T(a, "y")}${T(b, "")})(x${T(a, "y")}${T(-b, "")})`;
      },
      () => {
        const a = R(r, 1, 3);
        const b = R(r, 1, 4);
        return `(x^2${T(a, "x")}${T(b, "")})(x^2${T(-a, "x")}${T(b, "")})`;
      },
      () => {
        for (;;) {
          const a = NZ(r, -4, 4);
          const b = NZ(r, -4, 4);
          const c = NZ(r, -4, 4);
          const d = b + c - a;
          if (d === 0 || Math.abs(d) > 5 || new Set([a, b, c, d]).size < 4) continue;
          return [a, b, c, d].map((k) => `(x${T(k, "")})`).join("");
        }
      },
      () => {
        const a = R(r, 1, 3);
        return `(x-${a})(x+${a})(x^2+${a * a})`;
      },
    ];
    const q = pick(r, forms)();
    return { lead: "展開", q, fields: [exprF(parseExpr(q))] };
  },
  3: (r) => {
    const forms = [
      () => `(x${T(NZ(r, -4, 4), "")})^3`,
      () => {
        for (;;) {
          const a = R(r, 1, 3);
          const b = NZ(r, -3, 3);
          if (gcd(a, b) === 1 && a * Math.abs(b) > 1) return `(${L([[a, "x"], [b, "y"]])})^3`;
        }
      },
      () => {
        const a = NZ(r, -5, 5);
        return `(x${T(a, "")})(x^2${T(-a, "x")}${T(a * a, "")})`;
      },
      () => {
        for (;;) {
          const k = R(r, 1, 3);
          const m = NZ(r, -3, 3);
          if (gcd(k, m) !== 1) continue;
          return `(${L([[k, "x"], [m, "y"]])})(${L([[k * k, "x^2"], [-k * m, "xy"], [m * m, "y^2"]])})`;
        }
      },
    ];
    const q = pick(r, forms)();
    return { lead: "展開", q, fields: [exprF(parseExpr(q))] };
  },
  // ===== 因数分解 =====
  4: (r) => {
    const forms = [
      () => {
        for (;;) {
          const a = NZ(r, -6, 6);
          const b = NZ(r, -6, 6);
          if (a !== b) return `(x${T(a, "y")})(x${T(b, "y")})`;
        }
      },
      () => {
        for (;;) {
          const k = R(r, 1, 3);
          const m = NZ(r, -5, 5);
          if (gcd(k, m) === 1) return `(${L([[k, "x"], [m, "y"]])})^2`;
        }
      },
      () => {
        for (;;) {
          const k = R(r, 1, 4);
          const m = R(r, 1, 5);
          if (gcd(k, m) === 1 && k * m > 1) return `(${L([[k, "x"], [m, "y"]])})(${L([[k, "x"], [-m, "y"]])})`;
        }
      },
      () => {
        const pre = pick(r, ["2", "3", "-2", "y", "2y", "3x", "a"]);
        for (;;) {
          const a = NZ(r, -5, 5);
          const b = NZ(r, -5, 5);
          if (a !== b) return `${pre}(x${T(a, "")})(x${T(b, "")})`;
        }
      },
    ];
    return factorProblem(pick(r, forms)());
  },
  5: (r) => {
    for (;;) {
      const p = R(r, 1, 4);
      const k = R(r, 1, 4);
      if (p * k < 2 || p * k > 12) continue;
      const q = NZ(r, -7, 7);
      const s = NZ(r, -7, 7);
      if (gcd(p, q) !== 1 || gcd(k, s) !== 1 || (p === k && q === s)) continue;
      const v = r() < 0.25 ? "y" : "";
      return factorProblem(`(${L([[p, "x"], [q, v]])})(${L([[k, "x"], [s, v]])})`);
    }
  },
  6: (r) => {
    const forms = [
      () => {
        const A = pick(r, ["x+y", "x-y", "x+2y", "2x+y", "x-2y", "a+b"]);
        for (;;) {
          const r1 = NZ(r, -6, 6);
          const r2 = NZ(r, -6, 6);
          if (r1 === r2) continue;
          const q = `(${A})^2${T(-(r1 + r2), `(${A})`)}${T(r1 * r2, "")}`;
          const show = `(${A}${T(-r1, "")})(${A}${T(-r2, "")})`;
          const value = parseExpr(q);
          return { lead: "因数分解", q, fields: [{ kind: "factor", value }], show: [show] } as Problem;
        }
      },
      () => {
        const [t1, t2] = two(r, [1, 4, 9, -1, -4, 2, 3]);
        const f = (t: number) => (t > 0 && isSq(t) ? `(x+${Math.sqrt(t)})(x-${Math.sqrt(t)})` : `(x^2${T(-t, "")})`);
        const parts = [t1, t2].sort((a, b) => Number(a > 0 && isSq(a)) - Number(b > 0 && isSq(b)));
        return factorProblem(parts.map(f).join(""));
      },
      () => {
        const b = pick(r, [1, -1, 2, -2, 3, -3]);
        // x²+bx−t=(x−u)(x−w)、u+w=−b
        const pairs: [number, number][] = [];
        for (let u = -5; u <= 5; u++) {
          const w = -b - u;
          if (u < w && u !== 0 && w !== 0) pairs.push([u, w]);
        }
        const [p1, p2] = two(r, pairs);
        const t1 = -p1[0] * p1[1];
        const t2 = -p2[0] * p2[1];
        const B = `(x^2${T(b, "x")})`;
        const q = `${B}^2${T(-(t1 + t2), B)}${T(t1 * t2, "")}`;
        const show = [...p1, ...p2]
          .sort((x, y) => x - y)
          .map((u) => `(x${T(-u, "")})`)
          .join("");
        const value = parseExpr(q);
        return { lead: "因数分解", q, fields: [{ kind: "factor", value }], show: [show] } as Problem;
      },
    ];
    return pick(r, forms)();
  },
  7: (r) => {
    const forms = [
      () => {
        for (;;) {
          const k = R(r, 1, 3);
          const m = NZ(r, -4, 4);
          if (gcd(k, m) !== 1) continue;
          const v = r() < 0.4 ? "y" : "";
          return `(${L([[k, "x"], [m, v]])})(${L([[k * k, "x^2"], [-k * m, v ? "xy" : "x"], [m * m, v ? "y^2" : ""]])})`;
        }
      },
      () => {
        for (;;) {
          const k = R(r, 1, 2);
          const a = NZ(r, -3, 3);
          if (gcd(k, a) === 1) return `(${L([[k, "x"], [a, ""]])})^3`;
        }
      },
      () => {
        const c = R(r, 2, 3);
        const a = NZ(r, -3, 3);
        return `${c}(x${T(a, "")})(x^2${T(-a, "x")}${T(a * a, "")})`;
      },
    ];
    return factorProblem(pick(r, forms)());
  },
  8: (r) => {
    for (;;) {
      const a = NZ(r, -3, 3);
      const b = NZ(r, -5, 5);
      const k = pick(r, [1, 1, 2]);
      const c = NZ(r, -3, 3);
      const d = NZ(r, -5, 5);
      if (gcd(gcd(k, c), d) !== 1 || (k === 1 && a === c && b === d)) continue;
      return factorProblem(`(${L([[1, "x"], [a, "y"], [b, ""]])})(${L([[k, "x"], [c, "y"], [d, ""]])})`);
    }
  },
  // ===== 根号 =====
  9: (r) => {
    const sr = (c: number, k: number, first: boolean) => {
      const body = Math.abs(c) === 1 ? `√${k}` : `${Math.abs(c)}√${k}`;
      return c < 0 ? `-${body}` : first ? body : `+${body}`;
    };
    const forms = [
      () => {
        const [a, b] = two(r, [2, 3, 5, 6, 7]);
        return `(√${a}${r() < 0.5 ? "+" : "-"}√${b})^2`;
      },
      () => {
        const [a, b] = two(r, [2, 3, 5]);
        return `(${sr(R(r, 1, 3), a, true)}${sr(NZ(r, -2, 2), b, false)})(${sr(R(r, 1, 3), a, true)}${sr(NZ(r, -2, 2), b, false)})`;
      },
      () => {
        const k = pick(r, [2, 3, 5]);
        const ms = [1, 2, 3, 4].sort(() => r() - 0.5).slice(0, 3);
        return ms.map((m, i) => `${i === 0 ? "" : r() < 0.6 ? "+" : "-"}√${m * m * k}`).join("");
      },
      () => {
        const [a, b, c] = [pick(r, [6, 10, 12, 15]), pick(r, [2, 3, 5, 6, 10]), pick(r, [2, 3, 5])];
        return `√${a}×√${b}÷√${c}`;
      },
      () => {
        const k = pick(r, [2, 3, 5]);
        return `(√${k}+${R(r, 1, 4)})^2-${pick(r, [2, 4, 6])}√${k}`;
      },
    ];
    const q = pick(r, forms)();
    return { q, fields: [num(pConst(parseExpr(q))!)] };
  },
  10: (r) => {
    const forms: (() => [string, Coef, Coef])[] = [
      () => {
        const [a, b] = two(r, [2, 3, 5, 6, 7]);
        const n = R(r, 1, 6);
        const s = r() < 0.5 ? 1 : -1;
        return [`${n}/(√${a}${s > 0 ? "+" : "-"}√${b})`, coef(n), cAdd(sq(a), s > 0 ? sq(b) : cNeg(sq(b)))];
      },
      () => {
        for (;;) {
          const p = R(r, 1, 4);
          const a = pick(r, [2, 3, 5, 6, 7]);
          if (p * p === a) continue;
          const n = R(r, 1, 6);
          const s = r() < 0.5 ? 1 : -1;
          return [`${n}/(${p}${s > 0 ? "+" : "-"}√${a})`, coef(n), cAdd(coef(p), s > 0 ? sq(a) : cNeg(sq(a)))];
        }
      },
      () => {
        const [a, b] = two(r, [2, 3, 5, 6, 7]);
        return [`(√${a}+√${b})/(√${a}-√${b})`, cAdd(sq(a), sq(b)), cSub(sq(a), sq(b))];
      },
      () => {
        for (;;) {
          const p = R(r, 1, 4);
          const a = pick(r, [2, 3, 5, 7]);
          if (p * p === a) continue;
          return [`(${p}+√${a})/(${p}-√${a})`, cAdd(coef(p), sq(a)), cSub(coef(p), sq(a))];
        }
      },
    ];
    const [q, n, d] = pick(r, forms)();
    return { q, fields: [num(cDivAny(n, d))] };
  },
  11: (r) => {
    let xs: string, ys: string, x: Coef, y: Coef;
    const kind = R(r, 0, 2);
    if (kind === 0) {
      const p = NZ(r, -3, 3);
      const k = pick(r, [2, 3, 5, 6, 7]);
      xs = `${p}+√${k}`;
      ys = `${p}-√${k}`;
      x = cAdd(coef(p), sq(k));
      y = cSub(coef(p), sq(k));
    } else if (kind === 1) {
      const [a, b] = two(r, [2, 3, 5, 7]).sort((u, v) => v - u);
      xs = `√${a}+√${b}`;
      ys = `√${a}-√${b}`;
      x = cAdd(sq(a), sq(b));
      y = cSub(sq(a), sq(b));
    } else {
      const [a, b] = pick(r, [
        [3, 2],
        [6, 5],
        [7, 6],
        [2, 1],
        [5, 4],
      ] as const);
      const rb = b === 1 ? "1" : b === 4 ? "2" : `√${b}`;
      xs = `1/(√${a}-${rb})`;
      ys = `1/(√${a}+${rb})`;
      x = cDivAny(coef(1), cSub(sq(a), sq(b)));
      y = cDivAny(coef(1), cAdd(sq(a), sq(b)));
    }
    const s = cAdd(x, y);
    const t = cMul(x, y);
    const s2 = cMul(s, s);
    const targets: [string, () => Coef][] = [
      ["x^2+y^2", () => cSub(s2, cMul(coef(2), t))],
      ["x^2y+xy^2", () => cMul(s, t)],
      ["x^3+y^3", () => cSub(cMul(s2, s), cMul(coef(3), cMul(s, t)))],
      ["1/x+1/y", () => cDivAny(s, t)],
      ["x/y+y/x", () => cDivAny(cSub(s2, cMul(coef(2), t)), t)],
      ["(x-y)^2", () => cSub(s2, cMul(coef(4), t))],
      ["x^2-xy+y^2", () => cSub(s2, cMul(coef(3), t))],
    ];
    const [q, f] = pick(r, targets);
    return { lead: `x=${xs}, y=${ys} のとき`, q, fields: [num(f())] };
  },
  12: (r) => {
    for (;;) {
      const a = R(r, 2, 9);
      const b = R(r, 1, a - 1);
      if (isSq(a * b)) continue;
      const minus = r() < 0.5;
      const val = minus ? cSub(sq(a), sq(b)) : cAdd(sq(a), sq(b));
      if (r() < 0.65) return { q: `√(${a + b}${minus ? "-" : "+"}2√${a * b})`, fields: [num(val)] };
      if ((a + b) % 2) continue;
      return { q: `√(${(a + b) / 2}${minus ? "-" : "+"}√${a * b})`, fields: [num(cMul(val, sq(frac(1, 2))))] };
    }
  },
  // ===== 不等式・絶対値 =====
  13: (r) => {
    for (;;) {
      const forms: (() => [string, string])[] = [
        () => [L([[NZ(r, -6, 6), "x"], [R(r, -9, 9), ""]]), L([[R(r, -6, 6), "x"], [R(r, -9, 9), ""]])],
        () => [`${R(r, 2, 4)}(x${T(NZ(r, -5, 5), "")})`, L([[NZ(r, -5, 5), "x"], [R(r, -9, 9), ""]])],
        () => {
          const [d1, d2] = two(r, [2, 3, 4, 6]);
          return [`(x${T(NZ(r, -5, 5), "")})/${d1}`, `x/${d2}${T(NZ(r, -3, 3), "")}`];
        },
      ];
      const [left, right] = pick(r, forms)();
      const op = pick(r, OPS);
      const sol = solveLin(left, right, op);
      if (!sol || sol.all) continue;
      const iv = sol.parts[0];
      const c = (iv.lo ?? iv.hi)!.c;
      if (ratOf(c).d > 6 || Math.abs(cNum(c)) > 30) continue;
      return { q: `${left}${op}${right}`, fields: [ineqF(sol)] };
    }
  },
  14: (r) => {
    const mk = (): [string, SolSet] => {
      for (;;) {
        const r0 = R(r, -6, 6);
        const a = NZ(r, -4, 4);
        const c = R(r, -3, 3);
        if (a === c) continue;
        const b = R(r, -8, 8);
        const d = (a - c) * r0 + b;
        const op = pick(r, OPS);
        const left = L([[a, "x"], [b, ""]]);
        const right = L([[c, "x"], [d, ""]]);
        return [`${left}${op}${right}`, solveLin(left, right, op)!];
      }
    };
    for (;;) {
      if (r() < 0.3) {
        const a = NZ(r, -3, 3);
        const b = R(r, -6, 6);
        const x1 = R(r, -5, 3);
        const x2 = x1 + R(r, 1, 5);
        let A = a * x1 + b;
        let B = a * x2 + b;
        if (A > B) [A, B] = [B, A];
        const op1 = pick(r, ["<", "≤"]);
        const op2 = pick(r, ["<", "≤"]);
        const mid = L([[a, "x"], [b, ""]]);
        const sol = intersect(solveLin(String(A), mid, op1)!, solveLin(mid, String(B), op2)!);
        return { lead: "不等式を解く", q: `${A}${op1}${mid}${op2}${B}`, fields: [ineqF(sol)] };
      }
      const [s1, a1] = mk();
      const [s2, a2] = mk();
      const sol = intersect(a1, a2);
      if (sol.all) continue;
      const bounded = sol.parts.length === 1 && sol.parts[0].lo && sol.parts[0].hi;
      if (!bounded && !(sol.parts.length === 0 ? r() < 0.15 : r() < 0.2)) continue;
      return { lead: "連立不等式を解く", q: `${s1}\n${s2}`, fields: [ineqF(sol)] };
    }
  },
  15: (r) => {
    if (r() < 0.65) {
      const a = R(r, 1, 3);
      const b = NZ(r, -6, 6);
      const c = R(r, 1, 8);
      return { q: `|${L([[a, "x"], [b, ""]])}|=${c}`, fields: [nf(frac(c - b, a)), nf(frac(-c - b, a))], labels: ["x =", "x ="], unordered: true };
    }
    for (;;) {
      const b = NZ(r, -5, 5);
      const c = pick(r, [2, 3, -2, -3]);
      const d = NZ(r, -6, 6);
      const sols: number[] = [];
      const x1 = (b - d) / (c - 1);
      if (Number.isInteger(x1) && x1 >= -b) sols.push(x1);
      const x2 = -(b + d) / (c + 1);
      if (Number.isInteger(x2) && x2 < -b) sols.push(x2);
      if (!sols.length) continue;
      return { q: `|x${T(b, "")}|=${L([[c, "x"], [d, ""]])}`, fields: sols.map((s) => nf(s)), labels: sols.map(() => "x ="), unordered: true };
    }
  },
  16: (r) => {
    const a = R(r, 1, 3);
    const b = NZ(r, -6, 6);
    const c = R(r, 1, 7);
    const lo = coef(frac(-c - b, a));
    const hi = coef(frac(c - b, a));
    const op = pick(r, OPS);
    const closed = closedOp(op);
    const inside = op === "<" || op === "≤";
    const sol: SolSet = inside ? { parts: [{ lo: { c: lo, closed }, hi: { c: hi, closed } }] } : { parts: [{ hi: { c: lo, closed } }, { lo: { c: hi, closed } }] };
    return { q: `|${L([[a, "x"], [b, ""]])}|${op}${c}`, fields: [ineqF(sol)] };
  },
  // ===== 二次関数 =====
  17: (r) => {
    let a: number, b: number, c: number;
    if (r() < 0.7) {
      a = pick(r, [1, -1, 2, -2, 3, -3, 1]);
      b = -2 * a * NZ(r, -4, 4);
      c = R(r, -9, 9);
    } else {
      a = pick(r, [1, -1]);
      b = 2 * R(r, -4, 3) + 1;
      c = R(r, -6, 6);
    }
    const p = frac(-b, 2 * a);
    const q = fSub(frac(c), frac(b * b, 4 * a));
    return { lead: "頂点の座標", q: `y=${L([[a, "x^2"], [b, "x"], [c, ""]])}`, fields: [nf(p), nf(q)], labels: ["頂点"], layout: "point" };
  },
  18: (r) => {
    let a: number, b: number, c: number;
    if (r() < 0.7) {
      a = pick(r, [1, -1, 2, -2, 3, -3]);
      b = -2 * a * NZ(r, -4, 4);
      c = R(r, -9, 9);
    } else {
      a = pick(r, [1, -1]);
      b = 2 * R(r, -4, 3) + 1;
      c = R(r, -6, 6);
    }
    const p = frac(-b, 2 * a);
    const q = fSub(frac(c), frac(b * b, 4 * a));
    const w = a > 0 ? "最小値" : "最大値";
    return { lead: `${w}と、そのときの x の値`, q: `y=${L([[a, "x^2"], [b, "x"], [c, ""]])}`, fields: [nf(p), nf(q)], labels: ["x =", w] };
  },
  19: (r) => {
    const a = pick(r, [1, -1, 2, -2, 1, -1]);
    const p = R(r, -3, 3);
    const qv = R(r, -6, 6);
    const s = R(r, -4, 3);
    const t = s + R(r, 2, 5);
    const f = (x: number) => a * (x - p) ** 2 + qv;
    const vals = [f(s), f(t)];
    if (s <= p && p <= t) vals.push(f(p));
    return {
      lead: "最大値と最小値",
      q: `y=${L([[a, "x^2"], [-2 * a * p, "x"], [a * p * p + qv, ""]])} (${s}≤x≤${t})`,
      fields: [nf(Math.max(...vals)), nf(Math.min(...vals))],
      labels: ["最大値", "最小値"],
    };
  },
  // ===== 二次方程式・不等式 =====
  20: (r) => {
    for (;;) {
      const p = R(r, 1, 4);
      const k = R(r, 1, 4);
      if (p * k < 2 || p * k > 12) continue;
      const q = NZ(r, -6, 6);
      const s = NZ(r, -6, 6);
      if (gcd(p, q) !== 1 || gcd(k, s) !== 1) continue;
      const r1 = frac(-q, p);
      const r2 = frac(-s, k);
      if (r1.n === r2.n && r1.d === r2.d) continue;
      const eq = `${formatPoly(parseExpr(`(${L([[p, "x"], [q, ""]])})(${L([[k, "x"], [s, ""]])})`))}=0`;
      return { q: eq, fields: [nf(r1), nf(r2)], labels: ["x =", "x ="], unordered: true, equations: [eq] };
    }
  },
  21: (r) => {
    for (;;) {
      const a = pick(r, [1, 1, 1, 2, 3, 4]);
      const b = NZ(r, -8, 8);
      const c = NZ(r, -8, 8);
      if (gcd(gcd(a, b), c) !== 1) continue;
      const D = b * b - 4 * a * c;
      if (D <= 0 || isSq(D)) continue;
      const base = coef(frac(-b, 2 * a));
      const rad = cMul(sq(D), coef(frac(1, 2 * a)));
      const eq = `${L([[a, "x^2"], [b, "x"], [c, ""]])}=0`;
      return { q: eq, fields: [num(cAdd(base, rad)), num(cSub(base, rad))], labels: ["x =", "x ="], unordered: true, equations: [eq] };
    }
  },
  22: (r) => {
    const kind = R(r, 0, 3);
    if (kind === 0) {
      const t = R(r, 0, 2);
      let a: number, b: number, c: number;
      if (t === 1) {
        a = pick(r, [1, 2, -1, 3]);
        const p = NZ(r, -3, 3);
        b = -2 * a * p;
        c = a * p * p;
      } else if (t === 2) {
        a = R(r, 1, 3);
        b = R(r, -4, 4);
        c = Math.floor((b * b) / (4 * a)) + R(r, 1, 4);
      } else {
        for (;;) {
          a = R(r, 1, 3) * (r() < 0.2 ? -1 : 1);
          b = NZ(r, -7, 7);
          c = NZ(r, -6, 6);
          if (b * b - 4 * a * c > 0) break;
        }
      }
      const D = b * b - 4 * a * c;
      return { lead: "実数解の個数", q: `${L([[a, "x^2"], [b, "x"], [c, ""]])}=0`, fields: [nf(D > 0 ? 2 : D === 0 ? 1 : 0)], suffix: ["個"] };
    }
    if (kind === 1) {
      const m = NZ(r, -5, 5);
      return { lead: "重解をもつときの定数 k の値", q: `x^2${T(2 * m, "x")}+k=0`, fields: [nf(m * m)], labels: ["k ="] };
    }
    if (kind === 2) {
      for (;;) {
        const k1 = NZ(r, -5, 5);
        const k2 = NZ(r, -5, 5);
        if (k1 === k2) continue;
        const al = k1 + k2;
        const be = -k1 * k2;
        return { lead: "重解をもつときの定数 k の値", q: `x^2-2kx${T(al, "k")}${T(be, "")}=0`, fields: [nf(k1), nf(k2)], labels: ["k =", "k ="], unordered: true };
      }
    }
    const b = NZ(r, -6, 6);
    const lim = coef(frac(b * b, 4));
    const [w, set] = pick(r, [
      ["異なる2つの実数解をもつ", { parts: [{ hi: { c: lim, closed: false } }] }],
      ["実数解をもつ", { parts: [{ hi: { c: lim, closed: true } }] }],
      ["実数解をもたない", { parts: [{ lo: { c: lim, closed: false } }] }],
    ] as [string, SolSet][]);
    return { lead: `${w}ような定数 k の値の範囲`, q: `x^2${T(b, "x")}+k=0`, fields: [ineqF(set, "k")] };
  },
  23: (r) => {
    for (;;) {
      let p = 1;
      let k = 1;
      if (r() < 0.3) {
        p = R(r, 1, 3);
        k = R(r, 1, 3);
        if (p * k < 2) continue;
      }
      const q = NZ(r, -6, 6);
      const s = NZ(r, -6, 6);
      if (gcd(p, q) !== 1 || gcd(k, s) !== 1) continue;
      const a1 = frac(-q, p);
      const a2 = frac(-s, k);
      if (a1.n * a2.d === a2.n * a1.d) continue;
      const sg = r() < 0.25 ? -1 : 1;
      const f = parseExpr(`${sg}(${L([[p, "x"], [q, ""]])})(${L([[k, "x"], [s, ""]])})`);
      const [lo, hi] = [coef(a1), coef(a2)].sort((x, y) => cNum(x) - cNum(y));
      const op = pick(r, OPS);
      const sol = quadSol(sg, lo, hi, op);
      if (r() < 0.3) {
        const m = NZ(r, -9, 9);
        return { q: `${formatPoly(pAdd(f, pNum(m)))}${op}${m}`, fields: [ineqF(sol)] };
      }
      return { q: `${formatPoly(f)}${op}0`, fields: [ineqF(sol)] };
    }
  },
  24: (r) => {
    const op = pick(r, OPS);
    const kind = R(r, 0, 2);
    if (kind === 0) {
      const p = R(r, -4, 4);
      const k = pick(r, [2, 3, 5, 6, 7, 8, 12]);
      const sg = r() < 0.3 ? -1 : 1;
      const f = parseExpr(`${sg}(x^2${T(-2 * p, "x")}${T(p * p - k, "")})`);
      return { q: `${formatPoly(f)}${op}0`, fields: [ineqF(quadSol(sg, cSub(coef(p), sq(k)), cAdd(coef(p), sq(k)), op))] };
    }
    if (kind === 1) {
      const a = pick(r, [1, 2, -1]);
      const p = R(r, -3, 3);
      const q = R(r, 1, 4);
      const f = parseExpr(`${a}(x^2${T(-2 * p, "x")}${T(p * p + q, "")})`);
      const wantNeg = op === "<" || op === "≤";
      const sol: SolSet = wantNeg === a > 0 ? { parts: [] } : { all: true };
      return { q: `${formatPoly(f)}${op}0`, fields: [ineqF(sol)] };
    }
    const [c, m] = r() < 0.7 ? [1, NZ(r, -4, 4)] : [2, pick(r, [1, -1, 3, -3])];
    const a = r() < 0.7 ? 1 : -1;
    const f = parseExpr(`${a}(${L([[c, "x"], [-m, ""]])})^2`);
    const root = coef(frac(m, c));
    // a>0 のとき f≥0 (等号は x=root)
    const pos = a > 0;
    const strict = op === "<" || op === ">";
    const wantNeg = op === "<" || op === "≤";
    let sol: SolSet;
    if (wantNeg === pos) sol = strict ? { parts: [] } : { parts: [{ lo: { c: root, closed: true }, hi: { c: root, closed: true } }] };
    else sol = strict ? { parts: [{ hi: { c: root, closed: false } }, { lo: { c: root, closed: false } }] } : { all: true };
    return { q: `${formatPoly(f)}${op}0`, fields: [ineqF(sol)] };
  },
  // ===== 三角比 =====
  25: (r) => {
    if (r() < 0.75) {
      for (;;) {
        const fn = pick(r, ["sin", "cos", "tan"]);
        const d = pick(r, [0, 30, 45, 60, 90, 120, 135, 150, 180, 120, 135, 150]);
        const v = fn === "sin" ? sinDeg(d) : fn === "cos" ? cosDeg(d) : tanDeg(d);
        if (!v) continue;
        return { q: `${fn}${d}°`, fields: [trigF(v)] };
      }
    }
    const fn = pick(r, ["sin", "cos", "tan"]);
    if (fn === "sin") {
      const d = pick(r, [30, 45, 60]);
      return { q: `sinθ=${formatCoef(sinDeg(d))} (0°≤θ≤180°)`, fields: [nf(d), nf(180 - d)], labels: ["θ =", "θ ="], suffix: ["°", "°"], unordered: true };
    }
    if (fn === "cos") {
      const d = pick(r, [0, 30, 45, 60, 90, 120, 135, 150, 180]);
      return { q: `cosθ=${formatCoef(cosDeg(d))} (0°≤θ≤180°)`, fields: [nf(d)], labels: ["θ ="], suffix: ["°"] };
    }
    const d = pick(r, [30, 45, 60, 120, 135, 150]);
    return { q: `tanθ=${formatCoef(tanDeg(d)!)} (0°<θ<180°)`, fields: [nf(d)], labels: ["θ ="], suffix: ["°"] };
  },
  26: (r) => {
    const kind = R(r, 0, 2);
    const S = [frac(3, 5), frac(4, 5), frac(5, 13), frac(12, 13), frac(8, 17), frac(1, 3), frac(2, 3), frac(1, 4)];
    if (kind === 0) {
      const s = pick(r, S);
      const obtuse = r() < 0.5;
      const cos = obtuse ? cNeg(sq(fSub(frac(1), fMul(s, s)))) : sq(fSub(frac(1), fMul(s, s)));
      return { lead: `sinθ=${fs(s)} (${obtuse ? "90°<θ<180°" : "0°<θ<90°"}) のとき`, q: "", fields: [num(cos), num(cDiv(coef(s), cos))], labels: ["cosθ =", "tanθ ="] };
    }
    if (kind === 1) {
      const c0 = pick(r, S);
      const c = r() < 0.5 ? frac(-c0.n, c0.d) : c0;
      const sin = sq(fSub(frac(1), fMul(c, c)));
      return { lead: `cosθ=${fs(c)} (0°<θ<180°) のとき`, q: "", fields: [num(sin), num(cDiv(sin, coef(c)))], labels: ["sinθ =", "tanθ ="] };
    }
    const t = pick(r, [frac(2), frac(-2), frac(3), frac(-3), frac(1, 2), frac(-1, 2), frac(3, 4), frac(-3, 4), frac(1, 3)]);
    const c2 = fDiv(frac(1), fAdd(frac(1), fMul(t, t)));
    const cos = t.n < 0 ? cNeg(sq(c2)) : sq(c2);
    return { lead: `tanθ=${fs(t)} (0°<θ<180°) のとき`, q: "", fields: [num(cos), num(cMul(coef(t), cos))], labels: ["cosθ =", "sinθ ="] };
  },
  27: (r) => {
    if (r() < 0.6) {
      for (;;) {
        const [A, B] = two(r, [30, 45, 60, 90, 120, 135]);
        if (A + B >= 180) continue;
        const b = R(r, 2, 8);
        return { lead: `△ABC で、b=${b}, A=${A}°, B=${B}° のとき、辺 a の長さ`, q: "", fields: [num(cDivAny(cMul(coef(b), sinDeg(A)), sinDeg(B)))], labels: ["a ="] };
      }
    }
    const a = R(r, 2, 10);
    const A = pick(r, [30, 45, 60, 90, 120, 135, 150]);
    return { lead: `△ABC で、a=${a}, A=${A}° のとき、外接円の半径 R`, q: "", fields: [num(cDivAny(coef(a), cMul(coef(2), sinDeg(A))))], labels: ["R ="] };
  },
  28: (r) => {
    for (;;) {
      let A: number, b: number, cs: string, a2: number;
      if (r() < 0.65) {
        A = pick(r, [60, 120, 90, 60, 120]);
        b = R(r, 2, 8);
        const c = R(r, 2, 8);
        cs = String(c);
        a2 = b * b + c * c - (A === 60 ? b * c : A === 120 ? -b * c : 0);
      } else {
        A = pick(r, [45, 135]);
        b = R(r, 1, 6);
        const m = R(r, 1, 4);
        cs = formatCoef(coef(m, 2));
        a2 = b * b + 2 * m * m - (A === 45 ? 2 * b * m : -2 * b * m);
      }
      if (a2 <= 0) continue;
      const a = sq(a2);
      if (r() < 0.55) return { lead: `△ABC で、b=${b}, c=${cs}, A=${A}° のとき、辺 a の長さ`, q: "", fields: [num(a)], labels: ["a ="] };
      return { lead: `△ABC で、a=${formatCoef(a)}, b=${b}, c=${cs} のとき、角 A の大きさ`, q: "", fields: [nf(A)], labels: ["A ="], suffix: ["°"] };
    }
  },
  29: (r) => {
    const A = pick(r, [30, 45, 60, 90, 120, 135, 150]);
    const b = R(r, 2, 8);
    const c = R(r, 2, 8);
    return { lead: `△ABC で、b=${b}, c=${c}, A=${A}° のとき、面積 S`, q: "", fields: [num(cMul(coef(frac(b * c, 2)), sinDeg(A)))], labels: ["S ="] };
  },
  // ===== 数学A 場合の数 =====
  30: (r) => {
    const forms: (() => [string, number])[] = [
      () => {
        const n = R(r, 3, 7);
        return [`${n}!`, fact(n)];
      },
      () => {
        const n = R(r, 4, 10);
        const k = R(r, 2, Math.min(4, n));
        return [`${n}P${k}`, nPr(n, k)];
      },
      () => {
        const n = R(r, 4, 10);
        const k = R(r, 2, Math.min(4, n));
        return [`${n}P${k}`, nPr(n, k)];
      },
      () => {
        const n = R(r, 5, 9);
        const m = R(r, Math.max(2, n - 4), n - 2);
        return [`(${n}!)/(${m}!)`, fact(n) / fact(m)];
      },
    ];
    const [q, v] = pick(r, forms)();
    return { q, fields: [nf(v)] };
  },
  31: (r) => {
    if (r() < 0.25) {
      const n = R(r, 4, 8);
      const k = R(r, 1, n - 2);
      return { q: `${n}C${k}+${n}C${k + 1}`, fields: [nf(nCr(n, k) + nCr(n, k + 1))] };
    }
    const n = R(r, 5, 12);
    const k = r() < 0.3 ? n - R(r, 1, 2) : R(r, 2, Math.min(5, n - 1));
    return { q: `${n}C${k}`, fields: [nf(nCr(n, k))] };
  },
  32: (r) => {
    const forms: (() => [string, number, string])[] = [
      () => {
        const n = R(r, 4, 7);
        return [`${n}人が円形に並ぶ並び方`, fact(n - 1), "通り"];
      },
      () => {
        const k = R(r, 2, 4);
        const m = R(r, 2, 4);
        const letters = ["a", "b", "c", "d"].slice(0, k).join(", ");
        return [`${letters} の${k}文字から、同じ文字をくり返し使ってよいとして${m}個を1列に並べる並び方`, k ** m, "通り"];
      },
      () => {
        const m = R(r, 4, 7);
        const f = R(r, 3, 6);
        const a = R(r, 1, 3);
        const b = R(r, 1, 2);
        return [`男子${m}人、女子${f}人の中から、男子${a}人と女子${b}人を選ぶ選び方`, nCr(m, a) * nCr(f, b), "通り"];
      },
      () => {
        const counts = pick(r, [
          [3, 2, 1],
          [2, 2, 1],
          [2, 2, 2],
          [3, 1, 1],
          [4, 2, 1],
          [3, 3, 1],
        ]);
        const s = counts.flatMap((c, i) => Array(c).fill("abc"[i])).join(", ");
        const n = counts.reduce((x, y) => x + y, 0);
        return [`${s} の${n}文字を1列に並べる並び方`, fact(n) / counts.reduce((x, c) => x * fact(c), 1), "通り"];
      },
      () => {
        const n = R(r, 5, 12);
        return [`正${n}角形の対角線の本数`, (n * (n - 3)) / 2, "本"];
      },
      () => {
        const n = R(r, 4, 6);
        return [`${n}人が1列に並ぶとき、特定の2人が隣り合う並び方`, 2 * fact(n - 1), "通り"];
      },
    ];
    const [lead, v, suf] = pick(r, forms)();
    return { lead, q: "", fields: [nf(v)], suffix: [suf] };
  },
  // ===== 確率 =====
  33: (r) => {
    const dice = (pred: (a: number, b: number) => boolean) => {
      let c = 0;
      for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (pred(a, b)) c++;
      return frac(c, 36);
    };
    const forms: (() => [string, Frac])[] = [
      () => {
        const s = R(r, 3, 11);
        return [`大小2個のさいころを投げるとき、目の和が${s}になる確率`, dice((a, b) => a + b === s)];
      },
      () => {
        const s = R(r, 3, 6);
        return [`大小2個のさいころを投げるとき、目の和が${s}以下になる確率`, dice((a, b) => a + b <= s)];
      },
      () => {
        const [w, f] = pick(r, [
          ["目の積が奇数", (a: number, b: number) => (a * b) % 2 === 1],
          ["目の積が偶数", (a: number, b: number) => (a * b) % 2 === 0],
          ["目の積が3の倍数", (a: number, b: number) => (a * b) % 3 === 0],
          ["同じ目が出る", (a: number, b: number) => a === b],
        ] as const);
        return [`大小2個のさいころを投げるとき、${w}になる確率`.replace("出るになる", "出る"), dice(f)];
      },
      () => {
        const k = R(r, 1, 4);
        return [`大小2個のさいころを投げるとき、目の差が${k}になる確率`, dice((a, b) => Math.abs(a - b) === k)];
      },
      () => {
        const n = R(r, 3, 5);
        const k = R(r, 1, n - 1);
        return [`${n}枚の硬貨を同時に投げるとき、ちょうど${k}枚が表になる確率`, frac(nCr(n, k), 2 ** n)];
      },
      () => {
        const n = R(r, 2, 4);
        return [`${n}枚の硬貨を同時に投げるとき、少なくとも1枚が裏になる確率`, frac(2 ** n - 1, 2 ** n)];
      },
    ];
    const [lead, v] = pick(r, forms)();
    return { lead, q: "", fields: [nf(v)] };
  },
  34: (r) => {
    const R0 = R(r, 2, 6);
    const W = R(r, 2, 5);
    const N = R0 + W;
    const forms: (() => [string, Frac])[] = [
      () => [`赤玉${R0}個、白玉${W}個が入った袋から、同時に2個取り出すとき、2個とも赤玉である確率`, frac(nCr(R0, 2), nCr(N, 2))],
      () => [`赤玉${R0}個、白玉${W}個が入った袋から、同時に2個取り出すとき、赤玉と白玉が1個ずつである確率`, frac(R0 * W, nCr(N, 2))],
      () => [`赤玉${R0}個、白玉${W}個が入った袋から、同時に3個取り出すとき、赤玉2個と白玉1個である確率`, frac(nCr(R0, 2) * W, nCr(N, 3))],
      () => [`赤玉${R0}個、白玉${W}個が入った袋から、同時に2個取り出すとき、少なくとも1個が白玉である確率`, fSub(frac(1), frac(nCr(R0, 2), nCr(N, 2)))],
      () => {
        const n = R(r, 6, 10);
        const k = R(r, 2, 3);
        return [`${n}本のうち当たりが${k}本のくじを、もとにもどさずに2本続けて引くとき、1本目が当たり、2本目がはずれる確率`, fMul(frac(k, n), frac(n - k, n - 1))];
      },
      () => {
        const n = R(r, 6, 10);
        const k = R(r, 2, 3);
        return [`${n}本のうち当たりが${k}本のくじから、同時に2本引くとき、少なくとも1本が当たる確率`, fSub(frac(1), frac(nCr(n - k, 2), nCr(n, 2)))];
      },
    ];
    const [lead, v] = pick(r, forms)();
    return { lead, q: "", fields: [nf(v)] };
  },
  35: (r) => {
    const [what, p, maxN] = pick(r, [
      ["1枚の硬貨を投げて、表", frac(1, 2), 5],
      ["1個のさいころを投げて、1の目", frac(1, 6), 3],
      ["1個のさいころを投げて、3の倍数の目", frac(1, 3), 4],
      ["1個のさいころを投げて、偶数の目", frac(1, 2), 5],
    ] as const);
    const n = R(r, 3, maxN);
    const k = R(r, 0, n);
    const v = fMul(fMul(frac(nCr(n, k)), fPow(p, k)), fPow(fSub(frac(1), p), n - k));
    const [verb, rest] = what.split("、");
    return { lead: `${verb.replace("投げて", `${n}回投げるとき`)}、${rest}がちょうど${k}回出る確率`, q: "", fields: [nf(v)] };
  },
  // ===== 整数 =====
  36: (r) => {
    for (;;) {
      const g = R(r, 6, 36);
      const [m, n] = two(r, [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
      if (gcd(m, n) !== 1) continue;
      const a = g * m;
      const b = g * n;
      if (Math.min(a, b) < 60 || Math.max(a, b) > 400) continue;
      const lcm = r() < 0.5;
      return { lead: `${Math.min(a, b)} と ${Math.max(a, b)} の${lcm ? "最小公倍数" : "最大公約数"}`, q: "", fields: [nf(lcm ? g * m * n : g)] };
    }
  },
  37: (r) => {
    for (;;) {
      const g = R(r, 13, 97);
      const m = R(r, 12, 60);
      const n = R(r, 12, 60);
      if (m === n || gcd(m, n) !== 1) continue;
      const a = g * m;
      const b = g * n;
      if (Math.min(a, b) < 300 || Math.max(a, b) > 9999) continue;
      return { lead: `ユークリッドの互除法を使って、${Math.min(a, b)} と ${Math.max(a, b)} の最大公約数を求める`, q: "", fields: [nf(g)] };
    }
  },
  38: (r) => {
    const base = pick(r, [2, 2, 3, 4, 5, 8]);
    const v = base === 2 ? R(r, 9, 127) : base === 3 ? R(r, 10, 242) : R(r, base * base, base ** 3 * 2);
    return { lead: "10進法で表す", q: `${v.toString(base)}_(${base})`, fields: [nf(v)] };
  },
  39: (r) => {
    const base = pick(r, [2, 2, 3, 5]);
    const v = base === 2 ? R(r, 20, 127) : R(r, 20, 200);
    return { lead: `${v} を${base}進法で表す`, q: "", fields: [{ kind: "digits", value: v.toString(base) }], suffix: [`_(${base})`] };
  },
  // ===== 数学Ⅱ 式と証明 =====
  40: (r) => {
    if (r() < 0.65) {
      const a = pick(r, [1, 2, 3, -1, -2]);
      const b = pick(r, [1, 2, -1, -2, 3]);
      const n = R(r, 4, 6);
      const k = R(r, 1, n - 1);
      const base = `(${L([[a, "x"], [b, ""]])})^${n}`;
      const v = parseExpr(base).get(monoKey({ x: k })) ?? new Map();
      return { lead: `展開式の ${k === 1 ? "x" : `x^${k}`} の係数`, q: base, fields: [num(v)] };
    }
    const a = pick(r, [1, 2, -1, -2, 3]);
    const n = R(r, 4, 6);
    const k = R(r, 1, n - 1);
    const base = `(x${T(a, "y")})^${n}`;
    const v = parseExpr(base).get(monoKey({ x: k, y: n - k })) ?? new Map();
    const mono = `${k === 1 ? "x" : `x^${k}`}${n - k === 1 ? "y" : `y^${n - k}`}`;
    return { lead: `展開式の ${mono} の係数`, q: base, fields: [num(v)] };
  },
  41: (r) => {
    let D: Poly, Q: Poly, Rm: Poly;
    if (r() < 0.6) {
      D = parseExpr(`x${T(NZ(r, -3, 3), "")}`);
      Q = parseExpr(L([[R(r, 1, 3), "x^2"], [R(r, -5, 5), "x"], [R(r, -6, 6), ""]]));
      Rm = pNum(R(r, -8, 8));
    } else {
      D = parseExpr(L([[1, "x^2"], [R(r, -3, 3), "x"], [NZ(r, -4, 4), ""]]));
      Q = parseExpr(L([[R(r, 1, 3), "x"], [R(r, -5, 5), ""]]));
      Rm = parseExpr(L([[R(r, -5, 5), "x"], [R(r, -6, 6), ""]]));
    }
    const Pp = pAdd(pMul(D, Q), Rm);
    return { lead: `${formatPoly(Pp)} を ${formatPoly(D)} で割った商と余り`, q: "", fields: [exprF(Q), exprF(Rm)], labels: ["商", "余り"] };
  },
  // ===== 複素数と方程式 =====
  42: (r) => {
    const z = () => [NZ(r, -5, 5), NZ(r, -5, 5)] as const;
    const forms: (() => [string, Cx])[] = [
      () => {
        const [a, b] = z();
        const [c, d] = z();
        const plus = r() < 0.5;
        return [`(${cxS(a, b)})${plus ? "+" : "-"}(${cxS(c, d)})`, plus ? cxAdd(cx(a, b), cx(c, d)) : cxSub(cx(a, b), cx(c, d))];
      },
      () => {
        const [a, b] = z();
        const [c, d] = z();
        return [`(${cxS(a, b)})(${cxS(c, d)})`, cxMul(cx(a, b), cx(c, d))];
      },
      () => {
        const [a, b] = z();
        return [`(${cxS(a, b)})^2`, cxMul(cx(a, b), cx(a, b))];
      },
      () => {
        const n = R(r, 3, 12);
        const m = n % 4;
        return [`i^${n}`, m === 0 ? cx(1, 0) : m === 1 ? cx(0, 1) : m === 2 ? cx(-1, 0) : cx(0, -1)];
      },
      () => {
        const [a, b] = pick(r, [
          [2, 8],
          [3, 12],
          [2, 18],
          [5, 20],
          [3, 27],
          [2, 3],
          [6, 2],
        ] as const);
        return [`√(-${a})×√(-${b})`, { re: cNeg(sq(a * b)), im: new Map() }];
      },
      () => {
        const n = pick(r, [4, 9, 12, 18, 25, 8, 27, 50]);
        return [`√(-${n})`, { re: new Map(), im: sq(n) }];
      },
      () => {
        const [a, b] = pick(r, [
          [2, 8],
          [3, 12],
          [6, 3],
          [5, 5],
        ] as const);
        return [`√(-${a})×√${b}`, { re: new Map(), im: sq(a * b) }];
      },
    ];
    const [q, v] = pick(r, forms)();
    return { q, fields: [cxF(v)] };
  },
  43: (r) => {
    for (;;) {
      const c = NZ(r, -4, 4);
      const d = NZ(r, -4, 4);
      if (c * c + d * d > 25) continue;
      const kind = R(r, 0, 3);
      if (kind === 0) {
        const n = NZ(r, -10, 10);
        return { q: `${n}/(${cxS(c, d)})`, fields: [cxF(cxDiv(cx(n, 0), cx(c, d)))] };
      }
      if (kind === 1) {
        const a = NZ(r, -5, 5);
        const b = NZ(r, -5, 5);
        return { q: `(${cxS(a, b)})/i`, fields: [cxF(cxDiv(cx(a, b), cx(0, 1)))] };
      }
      const a = NZ(r, -6, 6);
      const b = NZ(r, -6, 6);
      return { q: `(${cxS(a, b)})/(${cxS(c, d)})`, fields: [cxF(cxDiv(cx(a, b), cx(c, d)))] };
    }
  },
  44: (r) => {
    for (;;) {
      const a = pick(r, [1, 1, 1, 2, 3]);
      const b = NZ(r, -6, 6);
      const c = NZ(r, -6, 6);
      if (gcd(gcd(a, b), c) !== 1) continue;
      const s = frac(-b, a);
      const t = frac(c, a);
      const s2 = fMul(s, s);
      const targets: [string, Frac][] = [
        ["α^2+β^2", fSub(s2, fMul(frac(2), t))],
        ["(α-β)^2", fSub(s2, fMul(frac(4), t))],
        ["1/α+1/β", fDiv(s, t)],
        ["α^3+β^3", fSub(fMul(s2, s), fMul(frac(3), fMul(s, t)))],
        ["β/α+α/β", fDiv(fSub(s2, fMul(frac(2), t)), t)],
        ["α^2β+αβ^2", fMul(s, t)],
        ["(α+1)(β+1)", fAdd(fAdd(t, s), frac(1))],
      ];
      const [q, v] = pick(r, targets);
      if (v.d > 27) continue;
      return { lead: `二次方程式 ${L([[a, "x^2"], [b, "x"], [c, ""]])}=0 の2つの解を α, β とするとき`, q, fields: [nf(v)] };
    }
  },
  45: (r) => {
    const Pp = parseExpr(L([[pick(r, [1, 1, 2, -1, 3]), "x^3"], [R(r, -5, 5), "x^2"], [R(r, -6, 6), "x"], [R(r, -9, 9), ""]]));
    let D: string;
    let x: Frac;
    if (r() < 0.7) {
      const a = NZ(r, -3, 3);
      D = `x${T(-a, "")}`;
      x = frac(a);
    } else {
      const s = r() < 0.5 ? 1 : -1;
      D = `2x${T(-s, "")}`;
      x = frac(s, 2);
    }
    return { lead: `${formatPoly(Pp)} を ${D} で割った余り`, q: "", fields: [num(at(Pp, x))] };
  },
  // ===== 指数・対数 =====
  46: (r) => {
    const forms: (() => [string, Frac])[] = [
      () => {
        const a = R(r, 2, 5);
        const n = R(r, 1, a === 2 ? 5 : 3);
        return [`${a}^-${n}`, fPow(frac(a), -n)];
      },
      () => {
        const [n, d] = pick(r, [
          [2, 3],
          [3, 2],
          [1, 2],
          [3, 4],
          [2, 5],
          [1, 3],
        ] as const);
        const k = R(r, 1, 3);
        return [`(${n}/${d})^-${k}`, fPow(frac(n, d), -k)];
      },
      () => {
        const a = R(r, 2, 5);
        for (;;) {
          const m = R(r, 2, 4);
          const n = R(r, 2, 6);
          if (m === n || Math.abs(m - n) > 3) continue;
          if (r() < 0.5) return [`${a}^${m}×${a}^-${n}`, fPow(frac(a), m - n)];
          if (n < m) continue;
          return [`${a}^${m}÷${a}^${n}`, fPow(frac(a), m - n)];
        }
      },
      () => {
        const m = R(r, 1, 3);
        const n = R(r, 1, 2);
        return [`(2^-${m})^${n}`, fPow(frac(2), -m * n)];
      },
      () => {
        const a = R(r, 2, 9);
        const b = R(r, 2, 5);
        return [`${a}^0+${b}^-1`, fAdd(frac(1), frac(1, b))];
      },
      () => {
        const n = R(r, 1, 3);
        return [`10^-${n}`, fPow(frac(10), -n)];
      },
    ];
    const [q, v] = pick(r, forms)();
    return { q, fields: [nf(v)] };
  },
  47: (r) => {
    const forms: (() => [string, Frac] | null)[] = [
      () => {
        const b = R(r, 2, 5);
        const q = R(r, 2, 4);
        if (b ** q > 625) return null;
        const p = NZ(r, -3, 4);
        if (p % q === 0) return null;
        const f = frac(p, q);
        return [`${b ** q}^${ex(f)}`, fPow(frac(b), p)];
      },
      () => {
        const c = R(r, 2, 5);
        const d = pick(r, [2, 3, 4, 6]);
        const n1 = NZ(r, -5, 7);
        if (n1 % d === 0) return null;
        const k = R(r, 1, c === 2 ? 4 : 2);
        const n2 = k * d - n1;
        return [`${c}^${ex(frac(n1, d))}×${c}^${ex(frac(n2, d))}`, fPow(frac(c), k)];
      },
      () => {
        const c = R(r, 2, 5);
        const d = pick(r, [2, 3, 4]);
        const n1 = R(r, 1, 9);
        if (n1 % d === 0) return null;
        const k = R(r, -2, 2);
        const n2 = n1 - k * d;
        return [`${c}^${ex(frac(n1, d))}÷${c}^${ex(frac(n2, d))}`, fPow(frac(c), k)];
      },
    ];
    for (;;) {
      const res = pick(r, forms)();
      if (res) return { q: res[0], fields: [nf(res[1])] };
    }
  },
  48: (r) => {
    for (;;) {
      if (r() < 0.2) {
        const n = R(r, -3, 4);
        const arg = n >= 0 ? String(10 ** n) : `0.${"0".repeat(-n - 1)}1`;
        return { q: `log_10 ${arg}`, fields: [nf(n)] };
      }
      const c = pick(r, [2, 3, 5]);
      const m = c === 5 ? 1 : pick(r, [1, 1, 2]);
      const h = R(r, -6, 8); // 真数の指数 ×2
      if (h === 0 && r() < 0.7) continue;
      const n = frac(h, 2);
      if (c ** Math.abs(h / 2) > 625) continue;
      let arg: string;
      if (n.d === 1) arg = n.n >= 0 ? String(c ** n.n) : `1/${c ** -n.n}`;
      else {
        const k = Math.floor(Math.abs(h) / 2);
        const body = k === 0 ? `√${c}` : `${c ** k}√${c}`;
        arg = h > 0 ? body : k === 0 ? `1/√${c}` : `1/(${body})`;
      }
      return { q: `log_${c ** m} ${arg}`, fields: [nf(fDiv(n, frac(m)))] };
    }
  },
  49: (r) => {
    const forms: (() => [string, Frac] | null)[] = [
      () => {
        const a = pick(r, [6, 10, 12, 15]);
        const k = R(r, 1, 2);
        const N = a ** k;
        const isPow = (x: number) => {
          let y = x;
          while (y % a === 0) y /= a;
          return y === 1;
        };
        const ds: number[] = [];
        for (let x = 2; x < N; x++) if (N % x === 0 && !isPow(x) && !isPow(N / x) && x <= N / x) ds.push(x);
        if (!ds.length) return null;
        const X = pick(r, ds);
        return [`log_${a} ${X}+log_${a} ${N / X}`, frac(k)];
      },
      () => {
        const a = pick(r, [2, 3, 5]);
        const Y = pick(r, [3, 5, 6, 7].filter((y) => y !== a));
        const k = R(r, 1, 3);
        if (a ** k * Y > 1000) return null;
        return [`log_${a} ${a ** k * Y}-log_${a} ${Y}`, frac(k)];
      },
      () => {
        const a = pick(r, [2, 3, 5]);
        const t = pick(r, [2, 3, 5, 7].filter((y) => y !== a));
        if (r() < 0.5) return [`2log_${a} ${a * t}-log_${a} ${t * t}`, frac(2)];
        return [`log_${a} ${t * t * a}-2log_${a} ${t}`, frac(1)];
      },
      () => {
        const [p, q] = two(r, [2, 3, 5]);
        const i = R(r, 1, 2);
        const m = R(r, 1, 2);
        const j = R(r, 1, 3);
        const n = R(r, 1, 3);
        if (p ** i > 25 || q ** m > 25 || q ** j > 125 || p ** n > 125) return null;
        return [`log_${p ** i} ${q ** j}×log_${q ** m} ${p ** n}`, frac(j * n, i * m)];
      },
    ];
    for (;;) {
      const res = pick(r, forms)();
      if (res) return { q: res[0], fields: [nf(res[1])] };
    }
  },
  50: (r) => {
    const pw = (a: number, n: number) => (n >= 0 ? String(a ** n) : `1/${a ** -n}`);
    const forms: (() => [string, Frac] | null)[] = [
      () => {
        const a = pick(r, [2, 3, 5]);
        const n = R(r, -3, 5);
        if (a ** Math.abs(n) > 625 || n === 0) return null;
        return [`${a}^x=${pw(a, n)}`, frac(n)];
      },
      () => {
        const a = pick(r, [2, 3]);
        const n = R(r, -3, 5);
        const k = NZ(r, -3, 3);
        if (a ** Math.abs(n) > 243) return null;
        return [`${a}^(x${T(k, "")})=${pw(a, n)}`, frac(n - k)];
      },
      () => {
        const [B, b, e] = pick(r, [
          [4, 2, 2],
          [8, 2, 3],
          [9, 3, 2],
          [27, 3, 3],
          [25, 5, 2],
        ] as const);
        const f = NZ(r, -3, 5);
        if (b ** Math.abs(f) > 625 || f % e === 0) return null;
        return [`${B}^x=${pw(b, f)}`, frac(f, e)];
      },
      () => {
        const a = pick(r, [2, 3, 5]);
        const n = R(r, -2, 3);
        return [`log_${a} x=${n}`, fPow(frac(a), n)];
      },
      () => {
        const a = pick(r, [2, 3]);
        const n = R(r, 1, 4);
        const k = NZ(r, -3, 3);
        return [`log_${a}(x${T(k, "")})=${n}`, frac(a ** n - k)];
      },
      () => {
        const a = pick(r, [2, 3]);
        const n = R(r, 1, 3);
        const m = NZ(r, -3, 3);
        return [`log_${a}(2x${T(m, "")})=${n}`, frac(a ** n - m, 2)];
      },
    ];
    for (;;) {
      const res = pick(r, forms)();
      if (res) return { q: res[0], fields: [nf(res[1])], labels: ["x ="] };
    }
  },
  // ===== 三角関数 =====
  51: (r) => {
    for (;;) {
      const den = pick(r, [6, 4, 3, 2, 6, 4, 3]);
      const k = R(r, -2 * den, 2 * den);
      const f = frac(k, den);
      if (f.n === 0 && r() < 0.8) continue;
      const deg = (180 * f.n) / f.d;
      const fn = pick(r, ["sin", "cos", "tan"]);
      const v = fn === "sin" ? sinDeg(deg) : fn === "cos" ? cosDeg(deg) : tanDeg(deg);
      if (!v) continue;
      const a = angStr(f);
      return { q: f.n < 0 ? `${fn}(${a})` : `${fn} ${a}`, fields: [trigF(v)] };
    }
  },
  52: (r) => {
    if (r() < 0.3) {
      const [t1, t2] = two(r, [
        [3, 4, 5],
        [5, 12, 13],
        [8, 15, 17],
        [7, 24, 25],
      ] as const);
      const sa = frac(t1[0], t1[2]);
      const ca = frac(t1[1], t1[2]);
      const cb = frac(t2[0], t2[2]);
      const sb = frac(t2[1], t2[2]);
      const forms: [string, Frac][] = [
        ["sin(α+β)", fAdd(fMul(sa, cb), fMul(ca, sb))],
        ["sin(α-β)", fSub(fMul(sa, cb), fMul(ca, sb))],
        ["cos(α+β)", fSub(fMul(ca, cb), fMul(sa, sb))],
        ["cos(α-β)", fAdd(fMul(ca, cb), fMul(sa, sb))],
      ];
      const [q, v] = pick(r, forms);
      return { lead: `sinα=${fs(sa)}, cosβ=${fs(cb)} (0<α<π/2, 0<β<π/2) のとき`, q, fields: [nf(v)] };
    }
    const [deg, A, B] = pick(r, [
      [15, 45, -30],
      [75, 45, 30],
      [105, 60, 45],
      [165, 120, 45],
    ] as const);
    const fn = pick(r, ["sin", "cos", "tan"]);
    const s = cAdd(cMul(sinDeg(A), cosDeg(B)), cMul(cosDeg(A), sinDeg(B)));
    const c = cSub(cMul(cosDeg(A), cosDeg(B)), cMul(sinDeg(A), sinDeg(B)));
    const v = fn === "sin" ? s : fn === "cos" ? c : cDivAny(s, c);
    const q = r() < 0.65 ? `${fn}${deg}°` : `${fn} ${angStr(frac(deg, 180))}`;
    return { q, fields: [num(v)] };
  },
  53: (r) => {
    const S = [frac(3, 5), frac(4, 5), frac(5, 13), frac(12, 13), frac(1, 3), frac(2, 3), frac(1, 4)];
    let sin: Coef, cos: Coef, lead: string;
    if (r() < 0.6) {
      const s = pick(r, S);
      const obtuse = r() < 0.5;
      sin = coef(s);
      cos = obtuse ? cNeg(sq(fSub(frac(1), fMul(s, s)))) : sq(fSub(frac(1), fMul(s, s)));
      lead = `sinα=${fs(s)} (${obtuse ? "π/2<α<π" : "0<α<π/2"}) のとき`;
    } else {
      const c0 = pick(r, S);
      const c = r() < 0.5 ? frac(-c0.n, c0.d) : c0;
      cos = coef(c);
      sin = sq(fSub(frac(1), fMul(c, c)));
      lead = `cosα=${fs(c)} (0<α<π) のとき`;
    }
    const s2 = cMul(coef(2), cMul(sin, cos));
    const c2 = cSub(cMul(cos, cos), cMul(sin, sin));
    return { lead, q: "", fields: [num(s2), num(c2)], labels: ["sin2α =", "cos2α ="] };
  },
  // ===== 微分 =====
  54: (r) => {
    const forms: (() => [string, Poly])[] = [
      () => {
        const s = L([[NZ(r, -4, 4), "x^3"], [R(r, -6, 6), "x^2"], [R(r, -9, 9), "x"], [R(r, -9, 9), ""]]);
        return [s, parseExpr(s)];
      },
      () => {
        const p = pAdd(pAdd(poly(coef(pick(r, [frac(1, 3), frac(-1, 3), frac(2, 3)])), { x: 3 }), poly(coef(pick(r, [frac(1, 2), frac(-1, 2), frac(3, 2)])), { x: 2 })), parseExpr(L([[NZ(r, -6, 6), "x"], [R(r, -5, 5), ""]])));
        return [formatPoly(p), p];
      },
      () => {
        const s = `(${L([[R(r, 1, 3), "x"], [NZ(r, -5, 5), ""]])})(${L([[R(r, 1, 3), "x"], [NZ(r, -5, 5), ""]])})`;
        return [s, parseExpr(s)];
      },
      () => {
        const s = `x(x${T(NZ(r, -4, 4), "")})^2`;
        return [s, parseExpr(s)];
      },
      () => {
        const s = L([[NZ(r, -3, 3), "x^4"], [R(r, -4, 4), "x^3"], [R(r, -6, 6), "x"], [R(r, -9, 9), ""]]);
        return [s, parseExpr(s)];
      },
    ];
    const [s, p] = pick(r, forms)();
    return { lead: "導関数を求める", q: `f(x)=${s}`, fields: [exprF(deriv(p))], labels: ["f'(x) ="] };
  },
  55: (r) => {
    const s = r() < 0.6 ? L([[pick(r, [1, 1, -1, 2]), "x^3"], [R(r, -3, 3), "x^2"], [R(r, -5, 5), "x"], [R(r, -5, 5), ""]]) : L([[NZ(r, -3, 3), "x^2"], [R(r, -6, 6), "x"], [R(r, -6, 6), ""]]);
    const f = parseExpr(s);
    const a = R(r, -2, 3);
    const m = ratOf(at(deriv(f), a)).n;
    const fa = ratOf(at(f, a)).n;
    if (r() < 0.45) return { lead: `曲線 y=${s} 上の x=${a} の点における接線の傾き`, q: "", fields: [nf(m)] };
    return { lead: `曲線 y=${s} 上の点 (${a}, ${fa}) における接線の方程式`, q: "", fields: [exprF(parseExpr(L([[m, "x"], [fa - a * m, ""]])))], labels: ["y ="] };
  },
  56: (r) => {
    for (;;) {
      const a = pick(r, [1, 1, 2, -1, -2]);
      const p = R(r, -3, 2);
      const q = p + R(r, 1, 4);
      if (Math.abs(a) === 1 && (p + q) % 2 !== 0) continue;
      const d = R(r, -5, 5);
      const f = parseExpr(L([[a, "x^3"], [(-3 * a * (p + q)) / 2, "x^2"], [3 * a * p * q, "x"], [d, ""]]));
      const fp = at(f, p);
      const fq = at(f, q);
      const [mx, mn] = a > 0 ? [fp, fq] : [fq, fp];
      return { lead: "極大値と極小値", q: `f(x)=${formatPoly(f)}`, fields: [num(mx), num(mn)], labels: ["極大値", "極小値"] };
    }
  },
  // ===== 積分 =====
  57: (r) => {
    for (;;) {
      const s = r() < 0.8 ? L([[R(r, -3, 3), "x^2"], [R(r, -4, 4), "x"], [R(r, -5, 5), ""]]) : L([[NZ(r, -2, 2), "x^3"], [R(r, -3, 3), "x^2"], [R(r, -3, 3), "x"]]);
      if (s === "0") continue;
      const a = R(r, -1, 2);
      const b = a + R(r, 1, 3);
      return { q: `∫[${a},${b}](${s})dx`, fields: [nf(integ(parseExpr(s), a, b))] };
    }
  },
  58: (r) => {
    const kind = R(r, 0, 2);
    if (kind === 0) {
      const al = R(r, -3, 2);
      const be = al + R(r, 1, 4);
      const f1 = al === 0 ? "x" : `(x${T(-al, "")})`;
      const s = `${f1}(x${T(-be, "")})`;
      return { q: `∫[${al},${be}]${s}dx`, fields: [nf(integ(parseExpr(s), al, be))] };
    }
    if (kind === 1) {
      const al = R(r, -3, 2);
      const be = al + R(r, 1, 4);
      const a = r() < 0.7 ? 1 : -1;
      const f = parseExpr(`${a}(x${T(-al, "")})(x${T(-be, "")})`);
      return { lead: `放物線 y=${formatPoly(f)} と x 軸で囲まれた部分の面積`, q: "", fields: [nf(frac((be - al) ** 3, 6))], labels: ["S ="] };
    }
    const s = L([[NZ(r, -2, 2), "x^3"], [R(r, -3, 3), "x^2"], [R(r, -4, 4), "x"], [R(r, -5, 5), ""]]);
    const a = R(r, -3, -1);
    const b = R(r, 0, 2);
    return { q: `∫[${a},${b}](${s})dx`, fields: [nf(integ(parseExpr(s), a, b))] };
  },
};

export function generate(step: number, rnd: Rand = Math.random): Problem {
  const g = GENS[step];
  if (!g) throw new Error(`no step ${step}`);
  return g(rnd);
}

export function makeSet(step: number, count = 10, rnd: Rand = Math.random): Problem[] {
  const out: Problem[] = [];
  const seen = new Set<string>();
  let guard = 0;
  while (out.length < count && guard++ < 300) {
    const pr = generate(step, rnd);
    const key = `${pr.lead ?? ""}|${pr.q}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(pr);
  }
  return out;
}

export const GEN_COUNT = Object.keys(GENS).length;
if (GEN_COUNT !== STEP_COUNT) throw new Error("steps and generators differ");

