import { parseExpr } from "../math/parse";
import { formatCoef, formatFrac, formatPoly } from "../math/format";
import { cAdd, cDiv, cKey, cMul, cNeg, coef, fAdd, fDiv, fMul, fSub, frac, gcd, monoKey, pAdd, pConst, pMul, pNum, pSubst, parseMonoKey, poly, splitSquare, type Coef, type Frac, type Poly } from "../math/value";
import { cNum, formatComplex, intersect, type Bound, type Field, type SolSet } from "./check";
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
  /** 自己テスト用：答え (1つ目の欄) を数値で確かめる手がかり */
  verify?: Verify;
}

/** 自己テストで答えを数値で確かめる方法 (式は lib/kousuu/expr で読める書き方) */
export type Verify =
  /** f を微分したもの */
  | { deriv: string }
  /** 微分すると f になるもの (不定積分) */
  | { anti: string }
  /** ∫[a,b] f dx */
  | { integral: [string, string, string] }
  /** f の極限 [式, 文字, 行き先 ("inf" か値)] */
  | { limit: [string, string, string] }
  /** y=f(x) の x=a における接線 */
  | { tangent: [string, string] }
  /** 数列の初めの項 (n=1, 2, …) */
  | { seq: number[] }
  /** f の逆関数 */
  | { inverse: string };

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

// ---- 数学B・Ⅲ・C ----
const realF = (value: string): Field => ({ kind: "real", value });
const funcF = (value: string, v = "x", upToConst = false): Field => (upToConst ? { kind: "func", value, v, upToConst } : { kind: "func", value, v });
/** 符号つきの項をつなぐ (各項は先頭に - があってもよい、空の項は飛ばす) */
function J(ts: string[]): string {
  let s = "";
  for (const t of ts) {
    if (!t) continue;
    s += s && !t.startsWith("-") ? `+${t}` : t;
  }
  return s || "0";
}
/** 有理数の係数つきの項 (符号は先頭に。v が数で始まるときは · をはさむ) */
function TF(c: Frac | number, v: string): string {
  const f = typeof c === "number" ? frac(c) : c;
  if (f.n === 0) return "";
  const a = { n: Math.abs(f.n), d: f.d };
  const sign = f.n < 0 ? "-" : "";
  if (!v) return sign + fs(a);
  if (a.n === 1 && a.d === 1) return sign + v;
  return `${sign}${fs(a)}${/^([\d.]|\([-\d])/.test(v) ? "·" : ""}${v}`;
}
/** 等比数列の項 m·r^(n-1) の書き方 */
function geomShow(m: number | Frac, q: Frac): string {
  const mf = typeof m === "number" ? frac(m) : m;
  const base = q.d === 1 && q.n > 0 ? `${q.n}` : `(${fs(q)})`;
  if (q.d === 1 && q.n > 0 && mf.d === 1 && mf.n === q.n) return `${q.n}^n`;
  if (q.d === 1 && q.n > 0 && mf.d === 1 && mf.n === -q.n) return `-${q.n}^n`;
  return TF(mf, `${base}^(n-1)`);
}
/** 数列の最初の項を、漸化式どおりに順に計算する */
function iterate(a1: number, next: (a: number, n: number) => number, count = 10): number[] {
  const out = [a1];
  while (out.length < count) out.push(next(out[out.length - 1], out.length));
  return out;
}
/** 1次式の書き方 (例 2x+1) */
const lin = (a: number, b: number, v = "x") => L([
  [a, v],
  [b, ""],
]);
/** π の有理数倍 (例 (9π)/4) */
const piStr = (f: Frac) => angStr(f);
/** n の多項式 (係数は有理数) */
function polyN(cs: Frac[]): Poly {
  let p: Poly = new Map();
  cs.forEach((c, e) => {
    if (c.n !== 0) p = pAdd(p, poly(coef(c), e ? { n: e } : {}));
  });
  return p;
}
/** Σ[k=1,n] k^e を n の多項式の係数 (定数項から) で */
const SUMS: Frac[][] = [
  [frac(0), frac(1)],
  [frac(0), frac(1, 2), frac(1, 2)],
  [frac(0), frac(1, 6), frac(1, 2), frac(1, 3)],
  [frac(0), frac(0), frac(1, 4), frac(1, 2), frac(1, 4)],
];
function sumPoly(cs: number[]): Poly {
  // cs[e] は k^e の係数
  const out: Frac[] = [frac(0), frac(0), frac(0), frac(0), frac(0)];
  cs.forEach((c, e) => SUMS[e].forEach((s, i) => (out[i] = fAdd(out[i], fMul(frac(c), s)))));
  return polyN(out);
}
/** 2つのベクトルの組を、なす角を変えずに並べかえる (座標の入れかえ・符号・倍) */
function shuffleVecs(rnd: Rand, a: number[], b: number[]): [number[], number[]] {
  const idx = a.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const sg = a.map(() => (rnd() < 0.5 ? 1 : -1));
  const s1 = pick(rnd, [1, 1, 2]);
  const s2 = pick(rnd, [1, 1, 2]);
  const tr = (v: number[], s: number) => idx.map((k, i) => v[k] * sg[i] * s);
  return rnd() < 0.5 ? [tr(a, s1), tr(b, s2)] : [tr(b, s2), tr(a, s1)];
}
const dot = (a: number[], b: number[]) => a.reduce((s, x, i) => s + x * b[i], 0);
const vecStr = (v: number[]) => `(${v.join(", ")})`;
/** z を何乗かする */
function cxPow(z: Cx, n: number): Cx {
  let w: Cx = cx(1, 0);
  for (let i = 0; i < n; i++) w = cxMul(w, z);
  return w;
}
/** 角 (度) を 0〜360 に */
const deg360 = (d: number) => ((d % 360) + 360) % 360;
/** 標準正規分布 P(0≤Z≤u) の表 (1万分の1単位) */
const ZTABLE: Record<string, number> = { "0.5": 1915, "1": 3413, "1.5": 4332, "2": 4772 };
const dec = (k: number) => String(k / 10000);

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
  // ===== 数学B 数列 =====
  59: (r) => {
    const a = NZ(r, -9, 12);
    const d = NZ(r, -6, 7);
    const an = (n: number) => a + (n - 1) * d;
    const k = R(r, 0, 3);
    if (k === 0) return { lead: `初項 ${a}、公差 ${d} の等差数列 {a_n} の一般項`, q: "", fields: [exprF(parseExpr(lin(d, a - d, "n")))], labels: ["a_n ="] };
    if (k === 1) {
      const m = R(r, 10, 40);
      return { lead: `初項 ${a}、公差 ${d} の等差数列の第 ${m} 項`, q: "", fields: [nf(an(m))] };
    }
    if (k === 2) {
      const p = R(r, 2, 6);
      const q = p + R(r, 2, 8);
      return { lead: `第 ${p} 項が ${an(p)}、第 ${q} 項が ${an(q)} である等差数列の初項と公差`, q: "", fields: [nf(a), nf(d)], labels: ["初項", "公差"] };
    }
    const m = R(r, 8, 40);
    return { lead: `初項 ${a}、公差 ${d} の等差数列で、${an(m)} は第何項か`, q: "", fields: [nf(m)], labels: ["第"], suffix: ["項"] };
  },
  60: (r) => {
    const k = R(r, 0, 2);
    if (k === 2) {
      const a = NZ(r, -5, 5);
      const q = pick(r, [2, 3, -2, -3]);
      if (Math.abs(a * q ** 4) > 2000) return GENS[60](r);
      return { lead: `第 2 項が ${a * q}、第 5 項が ${a * q ** 4} である等比数列の初項と公比 (公比は実数)`, q: "", fields: [nf(a), nf(q)], labels: ["初項", "公比"] };
    }
    const [q, as] = pick(r, [
      [frac(2), [1, 3, 5, -1, -3, 7]],
      [frac(3), [1, 2, -2, 4, 5]],
      [frac(-2), [1, 3, -1, 5]],
      [frac(-3), [1, 2, -1]],
      [frac(1, 2), [64, 32, 48, 96, 80]],
      [frac(-1, 2), [32, 64, 96]],
      [frac(1, 3), [81, 162, 243]],
    ] as [Frac, number[]][]);
    const a = pick(r, as);
    const terms = iterate(a, (x) => (x * q.n) / q.d);
    if (k === 0) return { lead: `初項 ${a}、公比 ${fs(q)} の等比数列 {a_n} の一般項`, q: "", fields: [funcF(geomShow(a, q), "n")], labels: ["a_n ="], verify: { seq: terms } };
    for (;;) {
      const m = R(r, 3, 8);
      const v = fMul(frac(a), fPow(q, m - 1));
      if (Math.abs(v.n) > 20000) continue;
      return { lead: `初項 ${a}、公比 ${fs(q)} の等比数列の第 ${m} 項`, q: "", fields: [nf(v)] };
    }
  },
  61: (r) => {
    const k = R(r, 0, 3);
    if (k === 0) {
      const a = NZ(r, -10, 15);
      const d = NZ(r, -5, 6);
      const n = R(r, 8, 30);
      return { lead: `初項 ${a}、公差 ${d} の等差数列の、初項から第 ${n} 項までの和`, q: "", fields: [nf(frac(n * (2 * a + (n - 1) * d), 2))] };
    }
    if (k === 1) {
      const a = R(r, 1, 9);
      const d = R(r, 2, 7);
      const n = R(r, 6, 25);
      const last = a + (n - 1) * d;
      return { lead: "和を求める", q: `${a}+${a + d}+${a + 2 * d}+…+${last}`, fields: [nf(frac(n * (a + last), 2))] };
    }
    if (k === 2) {
      const q = pick(r, [frac(2), frac(3), frac(-2), frac(1, 2), frac(2)]);
      const a = q.d === 2 ? pick(r, [64, 32, 96, 128]) : pick(r, [1, 2, 3, 5, -1]);
      const n = R(r, 4, q.n === 3 ? 6 : 8);
      const S = fDiv(fMul(frac(a), fSub(frac(1), fPow(q, n))), fSub(frac(1), q));
      return { lead: `初項 ${a}、公比 ${fs(q)} の等比数列の、初項から第 ${n} 項までの和`, q: "", fields: [nf(S)] };
    }
    const a = NZ(r, -6, 8);
    const d = NZ(r, -4, 5);
    const sums = iterate(a, (s, n) => s + a + n * d);
    return { lead: `初項 ${a}、公差 ${d} の等差数列の、初項から第 n 項までの和 S_n`, q: "", fields: [funcF(formatPoly(polyN([frac(0), fSub(frac(a), frac(d, 2)), frac(d, 2)])), "n")], labels: ["S_n ="], verify: { seq: sums } };
  },
  62: (r) => {
    const forms: (() => [string, (k: number) => number, number, number])[] = [
      () => {
        const p = NZ(r, -4, 5);
        const q = R(r, -5, 5);
        return [`(${lin(p, q, "k")})`, (k) => p * k + q, R(r, 1, 3) === 1 ? R(r, 2, 5) : 1, R(r, 8, 20)];
      },
      () => ["k^2", (k) => k * k, 1, R(r, 4, 12)],
      () => ["k(k+1)", (k) => k * (k + 1), 1, R(r, 3, 10)],
      () => {
        const b = NZ(r, -3, 3);
        return [`(k^2${T(b, "k")})`, (k) => k * k + b * k, 1, R(r, 4, 10)];
      },
      () => ["k^3", (k) => k ** 3, 1, R(r, 3, 8)],
      () => ["2^k", (k) => 2 ** k, 1, R(r, 3, 9)],
      () => ["3^(k-1)", (k) => 3 ** (k - 1), 1, R(r, 3, 7)],
      () => ["(2k-1)", (k) => 2 * k - 1, 1, R(r, 8, 25)],
    ];
    const [body, f, m, N] = pick(r, forms)();
    let s = 0;
    for (let k = m; k <= N; k++) s += f(k);
    return { lead: "和を求める", q: `Σ[k=${m},${N}]${body}`, fields: [nf(s)] };
  },
  63: (r) => {
    const forms: (() => [string, (k: number) => number, string])[] = [
      () => {
        const p = NZ(r, -4, 5);
        const q = R(r, -6, 6);
        return [`(${lin(p, q, "k")})`, (k) => p * k + q, formatPoly(sumPoly([q, p]))];
      },
      () => ["k^2", (k) => k * k, "1/6n(n+1)(2n+1)"],
      () => ["k^3", (k) => k ** 3, "1/4n^2(n+1)^2"],
      () => ["k(k+1)", (k) => k * (k + 1), "1/3n(n+1)(n+2)"],
      () => {
        const a = pick(r, [1, 2, 3, -1, 6]);
        const b = R(r, -4, 4);
        const c = R(r, -3, 3);
        return [`(${L([[a, "k^2"], [b, "k"], [c, ""]])})`, (k) => a * k * k + b * k + c, formatPoly(sumPoly([c, b, a]))];
      },
      () => pick(r, [
        ["2^k", (k: number) => 2 ** k, "2^(n+1)-2"],
        ["2^(k-1)", (k: number) => 2 ** (k - 1), "2^n-1"],
        ["3^(k-1)", (k: number) => 3 ** (k - 1), "(3^n-1)/2"],
        ["2·3^(k-1)", (k: number) => 2 * 3 ** (k - 1), "3^n-1"],
        ["4^(k-1)", (k: number) => 4 ** (k - 1), "(4^n-1)/3"],
      ] as [string, (k: number) => number, string][]),
    ];
    const [body, f, show] = pick(r, forms)();
    const sums = iterate(f(1), (s, n) => s + f(n + 1));
    return { lead: "和を n の式で表す", q: `Σ[k=1,n]${body}`, fields: [funcF(show, "n")], verify: { seq: sums } };
  },
  64: (r) => {
    const A = R(r, -3, 5);
    let b: (k: number) => number;
    let show: string;
    if (r() < 0.7) {
      const p = NZ(r, -3, 4);
      const q = R(r, -3, 4);
      b = (k) => p * k + q;
      show = formatPoly(polyN([frac(A - q), fSub(frac(q), frac(p, 2)), frac(p, 2)]));
    } else {
      const [c, q] = pick(r, [
        [1, 2],
        [2, 2],
        [3, 2],
        [2, 3],
        [4, 3],
        [6, 3],
      ] as const);
      const m = c / (q - 1);
      b = (k) => c * q ** (k - 1);
      show = J([geomShow(m, frac(q)), TF(A - m, "")]);
    }
    const terms = iterate(A, (a, n) => a + b(n));
    return { lead: `数列 ${terms.slice(0, 5).join(", ")}, … の一般項 (階差数列を使う)`, q: "", fields: [funcF(show, "n")], labels: ["a_n ="], verify: { seq: terms } };
  },
  65: (r) => {
    const A = NZ(r, -4, 6);
    const k = R(r, 0, 3);
    let rhs: string;
    let next: (a: number, n: number) => number;
    let show: string;
    if (k === 0) {
      const d = NZ(r, -5, 6);
      rhs = `a_n${T(d, "")}`;
      next = (a) => a + d;
      show = lin(d, A - d, "n");
    } else if (k === 1) {
      const q = pick(r, [2, 3, -2, 4, -3]);
      rhs = `${T(q, "a_n", true)}`;
      next = (a) => q * a;
      show = geomShow(A, frac(q));
    } else if (k === 2) {
      const p = pick(r, [2, 3, -2, 2, 3, 4]);
      let al = NZ(r, -4, 4);
      if (al === A) al = A + 1 === 0 ? A + 2 : A + 1;
      const q = al * (1 - p);
      rhs = `${T(p, "a_n", true)}${T(q, "")}`;
      next = (a) => p * a + q;
      show = J([geomShow(A - al, frac(p)), TF(al, "")]);
    } else {
      const p = NZ(r, -3, 4);
      const q = R(r, -3, 4);
      rhs = `a_n${T(p, "n")}${T(q, "")}`;
      next = (a, n) => a + p * n + q;
      show = formatPoly(polyN([frac(A - q), fSub(frac(q), frac(p, 2)), frac(p, 2)]));
    }
    const terms = iterate(A, next);
    return { lead: `a_1=${A}, a_(n+1)=${rhs} で定められる数列 {a_n} の一般項`, q: "", fields: [funcF(show, "n")], labels: ["a_n ="], verify: { seq: terms } };
  },
  // ===== 数学B 統計的な推測 =====
  66: (r) => {
    const xs = pick(r, [
      [0, 1, 2],
      [1, 2, 3],
      [0, 1, 2, 3],
      [1, 2, 3, 4],
      [-1, 0, 1],
      [-1, 0, 1, 2],
      [0, 2, 4],
      [-2, 0, 2],
    ]);
    const D = pick(r, [4, 5, 6, 8, 10, 12].filter((d) => d >= xs.length + 1));
    const w = xs.map(() => 1);
    for (let i = xs.length; i < D; i++) w[R(r, 0, xs.length - 1)]++;
    const E = frac(xs.reduce((s, x, i) => s + x * w[i], 0), D);
    const E2 = frac(xs.reduce((s, x, i) => s + x * x * w[i], 0), D);
    const V = fSub(E2, fMul(E, E));
    const q = `X : ${xs.join(", ")}\nP : ${w.map((x) => fs(frac(x, D))).join(", ")}`;
    if (r() < 0.6) return { lead: "確率変数 X の確率分布が次のとき、期待値と分散", q, fields: [nf(E), nf(V)], labels: ["E(X) =", "V(X) ="] };
    const a = pick(r, [2, 3, -2, 5, -1]);
    const b = NZ(r, -5, 5);
    const Y = lin(a, b, "X");
    return { lead: `確率変数 X の確率分布が次のとき、Y=${Y} の期待値と分散`, q, fields: [nf(fAdd(fMul(frac(a), E), frac(b))), nf(fMul(frac(a * a), V))], labels: ["E(Y) =", "V(Y) ="] };
  },
  67: (r) => {
    const k = R(r, 0, 2);
    if (k === 1) {
      const [p, ev] = pick(r, [
        [frac(1, 6), "1の目"],
        [frac(1, 3), "3の倍数の目"],
        [frac(1, 2), "偶数の目"],
        [frac(1, 6), "6の目"],
      ] as [Frac, string][]);
      const n = p.d * pick(r, [3, 5, 6, 10, 15, 20, 30, 50]);
      const V = fMul(frac(n), fMul(p, fSub(frac(1), p)));
      return { lead: `1個のさいころを ${n} 回投げて、${ev}が出る回数を X とするとき`, q: "", fields: [nf(fMul(frac(n), p)), num(sq(V))], labels: ["E(X) =", "σ(X) ="] };
    }
    if (k === 2) {
      const n = pick(r, [4, 6, 8, 10, 16, 20, 36, 50, 100]);
      return { lead: `硬貨を ${n} 枚投げて、表が出る枚数を X とするとき`, q: "", fields: [nf(frac(n, 2)), nf(frac(n, 4))], labels: ["E(X) =", "V(X) ="] };
    }
    const p = pick(r, [frac(1, 2), frac(1, 3), frac(1, 4), frac(1, 5), frac(1, 6), frac(2, 3), frac(3, 4), frac(2, 5), frac(1, 10)]);
    const n = p.d * pick(r, [2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50]);
    const V = fMul(frac(n), fMul(p, fSub(frac(1), p)));
    return { lead: `確率変数 X が二項分布 B(${n}, ${fs(p)}) にしたがうとき`, q: "", fields: [nf(fMul(frac(n), p)), nf(V), num(sq(V))], labels: ["E(X) =", "V(X) =", "σ(X) ="] };
  },
  68: (r) => {
    const k = R(r, 0, 2);
    const zOf = (s: number) => {
      const cs: number[] = [];
      for (let t = -12; t <= 12; t++) if (t !== 0 && Number.isInteger((t / 4) * s)) cs.push(t / 4);
      return pick(r, cs);
    };
    if (k === 0) {
      const s = pick(r, [2, 4, 5, 8, 10, 12, 15, 20]);
      const m = 5 * R(r, 6, 34);
      const z = zOf(s);
      return { lead: `確率変数 X が正規分布 N(${m}, ${s}^2) にしたがうとき、X=${m + z * s} を標準化した値 (Z=(X-m)/σ)`, q: "", fields: [realF(String(z))], labels: ["Z ="] };
    }
    if (k === 1) {
      const [n, p, m, s] = pick(r, [
        [100, frac(1, 2), 50, 5],
        [400, frac(1, 2), 200, 10],
        [36, frac(1, 2), 18, 3],
        [64, frac(1, 2), 32, 4],
        [144, frac(1, 2), 72, 6],
        [72, frac(1, 3), 24, 4],
        [162, frac(1, 3), 54, 6],
        [450, frac(1, 3), 150, 10],
        [180, frac(1, 6), 30, 5],
        [720, frac(1, 6), 120, 10],
        [48, frac(1, 4), 12, 3],
        [192, frac(1, 4), 48, 6],
      ] as [number, Frac, number, number][]);
      const z = zOf(s);
      return { lead: `X が二項分布 B(${n}, ${fs(p)}) にしたがうとき、X を正規分布で近似する。平均 m、標準偏差 σ と、X=${m + z * s} を標準化した値 Z`, q: "", fields: [nf(m), nf(s), realF(String(z))], labels: ["m =", "σ =", "Z ="] };
    }
    const s = pick(r, [2, 4, 6, 8, 10, 12, 20]);
    const m = 5 * R(r, 6, 34);
    const us = ["0.5", "1", "1.5", "2"];
    const xAt = (u: string) => m + Number(u) * s;
    const [u1, u2] = two(r, us);
    const forms: [string, number, string[]][] = [
      [`P(X≥${xAt(u1)})`, 5000 - ZTABLE[u1], [u1]],
      [`P(X≤${xAt(u1)})`, 5000 + ZTABLE[u1], [u1]],
      [`P(X≤${m - Number(u1) * s})`, 5000 - ZTABLE[u1], [u1]],
      [`P(${m - Number(u1) * s}≤X≤${xAt(u2)})`, ZTABLE[u1] + ZTABLE[u2], [u1, u2]],
      [`P(${xAt(Number(u1) < Number(u2) ? u1 : u2)}≤X≤${xAt(Number(u1) < Number(u2) ? u2 : u1)})`, Math.abs(ZTABLE[u2] - ZTABLE[u1]), [u1, u2]],
    ];
    const [q, v, used] = pick(r, forms);
    const table = [...used].sort((a, b) => Number(a) - Number(b)).map((u) => `P(0≤Z≤${u})=${dec(ZTABLE[u])}`).join(", ");
    return { lead: `X が正規分布 N(${m}, ${s}^2) にしたがうとき、次の確率。ただし ${table} とする`, q, fields: [realF(dec(v))] };
  },
  // ===== 数学Ⅲ 関数 =====
  69: (r) => {
    const k = R(r, 0, 2);
    if (k === 0) {
      if (r() < 0.5) {
        const a = NZ(r, -3, 4);
        const p = NZ(r, -4, 4);
        let b = R(r, -6, 6);
        if (b === -a * p) b++;
        return { lead: "漸近線を求める (x= の形と y= の形の2本)", q: `y=(${lin(a, b)})/(${lin(1, -p)})`, fields: [nf(p), nf(a)], labels: ["x =", "y ="] };
      }
      const c = NZ(r, -6, 6);
      const p = R(r, -4, 4);
      const d = NZ(r, -5, 5);
      return { lead: "漸近線を求める (x= の形と y= の形の2本)", q: `y=${c}/${p === 0 ? "x" : `(${lin(1, -p)})`}${T(d, "")}`, fields: [nf(p), nf(d)], labels: ["x =", "y ="] };
    }
    if (k === 1) {
      for (;;) {
        const c = R(r, -3, 3);
        const x0 = R(r, -c, 6 - c);
        const s = R(r, -8, -c - 1);
        const a = x0 + s + 2 * c;
        const b = c * c - x0 * s;
        if (a === 0 || x0 === s) continue;
        return { lead: "方程式を解く", q: `√(${lin(a, b)})=${lin(1, c)}`, fields: [nf(x0)], labels: ["x ="] };
      }
    }
    const a = NZ(r, -3, 3);
    const b = NZ(r, -6, 6);
    const x0 = coef(frac(-b, a));
    const sol: SolSet = a > 0 ? { parts: [{ lo: { c: x0, closed: true } }] } : { parts: [{ hi: { c: x0, closed: true } }] };
    return { lead: "定義域を求める", q: `y=√(${lin(a, b)})`, fields: [ineqF(sol)] };
  },
  70: (r) => {
    const k = R(r, 0, 3);
    const a = NZ(r, -3, 3);
    const b = NZ(r, -5, 5);
    const fS = lin(a, b);
    const F = parseExpr(fS);
    if (k === 0) {
      const quad = r() < 0.6;
      const c = R(r, -4, 4);
      const p = NZ(r, -3, 3);
      const gS = quad ? L([[1, "x^2"], [c, ""]]) : lin(p, c);
      const G = parseExpr(gS);
      const gf = quad ? pAdd(pMul(F, F), pNum(c)) : pAdd(pMul(pNum(p), F), pNum(c));
      const fg = pAdd(pMul(pNum(a), G), pNum(b));
      const first = r() < 0.5;
      return { lead: `f(x)=${fS}, g(x)=${gS} のとき`, q: "", fields: [exprF(first ? gf : fg)], labels: [first ? "(g∘f)(x) =" : "(f∘g)(x) ="] };
    }
    if (k === 1) {
      if (Math.abs(a) === 1) return GENS[70](r);
      return { lead: `f(x)=${fS} の逆関数`, q: "", fields: [exprF(pAdd(poly(coef(frac(1, a)), { x: 1 }), pNum(frac(-b, a))))], labels: ["f^(-1)(x) ="] };
    }
    if (k === 2) {
      for (;;) {
        const A = NZ(r, -3, 4);
        const B = R(r, -5, 5);
        const D = NZ(r, -4, 4);
        if (A * D - B === 0 || gcd(gcd(A, B), D) !== 1) continue;
        const f = `(${lin(A, B)})/(${lin(1, D)})`;
        const top = lin(-D, B);
        const inv = /^-?\d+$/.test(top) ? `${top}/(${lin(1, -A)})` : `(${top})/(${lin(1, -A)})`;
        return { lead: `f(x)=${f} の逆関数`, q: "", fields: [funcF(inv)], labels: ["f^(-1)(x) ="], verify: { inverse: f } };
      }
    }
    const c = NZ(r, -5, 5);
    return { lead: `f(x)=√(${lin(1, -c)}) の逆関数 (定義域にも注意)`, q: "", fields: [exprF(parseExpr(L([[1, "x^2"], [c, ""]])))], labels: ["f^(-1)(x) ="], suffix: ["(x≥0)"] };
  },
  // ===== 数学Ⅲ 極限 =====
  71: (r) => {
    const k = R(r, 0, 3);
    if (k === 0) {
      const a = NZ(r, -4, 5);
      const d = NZ(r, -3, 4);
      const P = L([[a, "n^2"], [R(r, -5, 5), "n"], [R(r, -5, 5), ""]]);
      const Q = L([[d, "n^2"], [R(r, -5, 5), "n"], [NZ(r, -5, 5), ""]]);
      if (r() < 0.25) {
        const P1 = lin(NZ(r, -4, 5), R(r, -5, 5), "n");
        const src = `(${P1})/(${Q})`;
        return { lead: "極限を求める", q: `lim[n→∞]${src}`, fields: [nf(0)], verify: { limit: [src, "n", "inf"] } };
      }
      const src = `(${P})/(${Q})`;
      return { lead: "極限を求める", q: `lim[n→∞]${src}`, fields: [nf(frac(a, d))], verify: { limit: [src, "n", "inf"] } };
    }
    if (k === 1) {
      const a = NZ(r, -6, 6);
      if (r() < 0.6) {
        const src = `√(n^2${T(a, "n")})-n`;
        return { lead: "極限を求める", q: `lim[n→∞](${src})`, fields: [nf(frac(a, 2))], verify: { limit: [src, "n", "inf"] } };
      }
      const b = NZ(r, -6, 6);
      if (a === b) return GENS[71](r);
      const src = `√(n^2${T(a, "n")})-√(n^2${T(b, "n")})`;
      return { lead: "極限を求める", q: `lim[n→∞](${src})`, fields: [nf(frac(a - b, 2))], verify: { limit: [src, "n", "inf"] } };
    }
    if (k === 2) {
      const [A, B] = pick(r, [
        [3, 2],
        [4, 3],
        [5, 2],
        [4, 1],
        [5, 3],
        [3, 1],
      ] as const);
      const bT = (c: number) => (B === 1 ? TF(c, "") : TF(c, `${B}^n`));
      if (r() < 0.5) {
        const src = `(${J([`${A}^(n+1)`, bT(NZ(r, -3, 3))])})/(${J([`${A}^n`, bT(R(r, 1, 3))])})`;
        return { lead: "極限を求める", q: `lim[n→∞]${src}`, fields: [nf(A)], verify: { limit: [src, "n", "inf"] } };
      }
      const p = NZ(r, -3, 4);
      const d = R(r, 1, 3);
      const src = `(${J([TF(p, `${A}^n`), bT(NZ(r, -3, 3))])})/(${J([TF(d, `${A}^n`), bT(-1)])})`;
      return { lead: "極限を求める", q: `lim[n→∞]${src}`, fields: [nf(frac(p, d))], verify: { limit: [src, "n", "inf"] } };
    }
    const q = pick(r, [frac(1, 2), frac(1, 3), frac(-1, 2), frac(2, 3), frac(-1, 3), frac(1, 4), frac(3, 4)]);
    const a = NZ(r, -4, 6);
    const S = fDiv(frac(a), fSub(frac(1), q));
    return { lead: "無限等比級数の和", q: `Σ[n=1,∞]${a === 1 ? "" : a === -1 ? "-" : a}(${fs(q)})^(n-1)`, fields: [nf(S)] };
  },
  72: (r) => {
    const k = R(r, 0, 3);
    if (k === 0) {
      const a = NZ(r, -3, 3);
      if (r() < 0.35) {
        const e = pick(r, [2, 3]);
        const src = `(x^${e}${T(-(a ** e), "")})/(${lin(1, -a)})`;
        return { lead: "極限を求める", q: `lim[x→${a}]${src}`, fields: [nf(e * a ** (e - 1))], verify: { limit: [src, "x", String(a)] } };
      }
      let b = NZ(r, -4, 4);
      let c = NZ(r, -4, 4);
      if (b === a) b = a + 1;
      if (c === a || c === b) c = a + (b === a + 2 ? 3 : 2);
      const N = formatPoly(parseExpr(`(x${T(-a, "")})(x${T(-b, "")})`));
      const D = formatPoly(parseExpr(`(x${T(-a, "")})(x${T(-c, "")})`));
      const src = `(${N})/(${D})`;
      return { lead: "極限を求める", q: `lim[x→${a}]${src}`, fields: [nf(frac(a - b, a - c))], verify: { limit: [src, "x", String(a)] } };
    }
    if (k === 1) {
      const a = R(r, 1, 5);
      let b = R(r, 1, 5);
      if (b === a) b = a === 5 ? 1 : a + 1;
      const ax = a === 1 ? "x" : `${a}x`;
      const bx = b === 1 ? "x" : `${b}x`;
      const forms: [string, Frac][] = [
        [`(sin${ax})/${b === 1 ? "x" : `(${bx})`}`, frac(a, b)],
        [`(sin${ax})/(sin${bx})`, frac(a, b)],
        [`(tan${ax})/${b === 1 ? "x" : `(${bx})`}`, frac(a, b)],
        [`(1-cos${a === 1 ? " x" : ax})/x^2`, frac(a * a, 2)],
        [`x/(sin${ax})`, frac(1, a)],
      ];
      const [src, v] = pick(r, forms);
      const q = src.replace("/x^2", "/(x^2)");
      return { lead: "極限を求める", q: `lim[x→0]${q}`, fields: [nf(v)], verify: { limit: [q, "x", "0"] } };
    }
    if (k === 2) {
      const a = pick(r, [1, 2, 3, -1, 2]);
      const ax = a === 1 ? "x" : a === -1 ? "-x" : `${a}x`;
      const eS = a === 1 ? "e" : a === -1 ? "1/e" : `e^${a}`;
      const forms: [string, string, Field][] = [
        [`(e^(${ax})-1)/x`, "0", nf(a)],
        [`(log(1+${ax}))/x`.replace("+-", "-"), "0", nf(a)],
        [`(1+${ax})^(1/x)`.replace("+-", "-"), "0", realF(eS)],
        [`(1+${a}/x)^x`.replace("+-", "-"), "inf", realF(eS)],
      ];
      const [src, to, f] = pick(r, forms);
      return { lead: "極限を求める", q: `lim[x→${to === "inf" ? "∞" : 0}]${src}`, fields: [f], verify: { limit: [src, "x", to] } };
    }
    const a = NZ(r, -6, 6);
    const src = `√(x^2${T(a, "x")})-x`;
    return { lead: "極限を求める", q: `lim[x→∞](${src})`, fields: [nf(frac(a, 2))], verify: { limit: [src, "x", "inf"] } };
  },
  // ===== 数学Ⅲ 微分 =====
  73: (r) => {
    const k = R(r, 0, 3);
    if (k === 0) {
      const A = L([[1, "x^2"], [NZ(r, -4, 4), ""]]);
      const B = r() < 0.5 ? lin(NZ(r, -3, 3), NZ(r, -5, 5)) : L([[1, "x^2"], [NZ(r, -3, 3), "x"], [R(r, -3, 3), ""]]);
      const f = `(${A})(${B})`;
      return { lead: "導関数を求める (積の微分)", q: `f(x)=${f}`, fields: [exprF(deriv(parseExpr(f)))], labels: ["f'(x) ="], verify: { deriv: f } };
    }
    if (k === 1) {
      for (;;) {
        const c = pick(r, [1, 1, 2, 3]);
        const d = NZ(r, -5, 5);
        if (gcd(c, d) !== 1) continue;
        const P = r() < 0.5 ? parseExpr(lin(NZ(r, -3, 4), R(r, -5, 5))) : parseExpr(L([[1, "x^2"], [R(r, -3, 3), "x"], [R(r, -3, 3), ""]]));
        const Q = parseExpr(lin(c, d));
        if (at(P, frac(-d, c)).size === 0) continue;
        const N = pAdd(pMul(deriv(P), Q), cNegP(pMul(P, deriv(Q))));
        const Ns = formatPoly(N);
        const top = N.size === 1 && N.has("") ? Ns : `(${Ns})`;
        const f = `(${formatPoly(P)})/(${formatPoly(Q)})`;
        return { lead: "導関数を求める (商の微分)", q: `f(x)=${f}`, fields: [funcF(`${top}/((${formatPoly(Q)})^2)`)], labels: ["f'(x) ="], verify: { deriv: f } };
      }
    }
    if (k === 2) {
      const a = R(r, 1, 4);
      const p = NZ(r, -3, 3);
      const q = R(r, -4, 4);
      const P = parseExpr(lin(p, q));
      const Q = parseExpr(`x^2+${a}`);
      const N = pAdd(pMul(deriv(P), Q), cNegP(pMul(P, deriv(Q))));
      const f = `(${formatPoly(P)})/(x^2+${a})`;
      return { lead: "導関数を求める (商の微分)", q: `f(x)=${f}`, fields: [funcF(`(${formatPoly(N)})/((x^2+${a})^2)`)], labels: ["f'(x) ="], verify: { deriv: f } };
    }
    const forms: [string, string][] = [
      ["1/x", "-1/(x^2)"],
      ["1/(x^2)", "-2/(x^3)"],
      ["1/(x^3)", "-3/(x^4)"],
      ["x√x", "3/2√x"],
      ["√x", "1/(2√x)"],
      ["1/√x", "-1/(2x√x)"],
      ["x^2√x", "5/2x√x"],
    ];
    const [f, ans] = pick(r, forms);
    return { lead: "導関数を求める", q: `f(x)=${f}`, fields: [funcF(ans)], labels: ["f'(x) ="], verify: { deriv: f } };
  },
  74: (r) => {
    const k = R(r, 0, 4);
    let f: string;
    let ans: string;
    if (k === 0) {
      const a = R(r, 2, 3);
      const b = NZ(r, -5, 5);
      const n = R(r, 3, 6);
      f = `(${lin(a, b)})^${n}`;
      ans = `${n * a}(${lin(a, b)})^${n - 1}`;
    } else if (k === 1) {
      const c = NZ(r, -4, 4);
      const n = R(r, 2, 5);
      f = `(x^2${T(c, "")})^${n}`;
      ans = `${2 * n}x(x^2${T(c, "")})${n - 1 === 1 ? "" : `^${n - 1}`}`;
    } else if (k === 2) {
      const a = R(r, 1, 4);
      const b = NZ(r, -1, 5);
      const g = gcd(a, 2);
      const top = a / g;
      const den = 2 / g;
      f = `√(${lin(a, b)})`;
      ans = `${top}/${den === 1 ? "" : "("}${den === 1 ? "" : den}√(${lin(a, b)})${den === 1 ? "" : ")"}`;
    } else if (k === 3) {
      const c = R(r, 1, 6);
      f = `√(x^2${T(c, "")})`;
      ans = `x/√(x^2${T(c, "")})`;
    } else {
      const a = R(r, 1, 3);
      const b = NZ(r, -5, 5);
      const n = R(r, 1, 3);
      const l = lin(a, b);
      f = n === 1 ? `1/(${l})` : `1/((${l})^${n})`;
      ans = `-${n * a}/((${l})^${n + 1})`;
    }
    return { lead: "導関数を求める (合成関数の微分)", q: `f(x)=${f}`, fields: [funcF(ans)], labels: ["f'(x) ="], verify: { deriv: f } };
  },
  75: (r) => {
    const a = R(r, 1, 4);
    const ax = a === 1 ? " x" : `${a}x`;
    const forms: (() => [string, string])[] = [
      () => {
        const k = pick(r, [1, 2, 3, -1, -2]);
        const b = r() < 0.5 ? 0 : NZ(r, -3, 3);
        const arg = b ? `(${lin(a, b)})` : ax;
        return r() < 0.5 ? [TF(k, `sin${arg}`), TF(k * a, `cos${arg}`)] : [TF(k, `cos${arg}`), TF(-k * a, `sin${arg}`)];
      },
      () => [`tan${ax}`, `${a}/(cos^2 ${a === 1 ? "x" : ax})`],
      () =>
        pick(r, [
          ["x sin x", "sin x+x cos x"],
          ["x cos x", "cos x-x sin x"],
          ["x^2sin x", "2x sin x+x^2cos x"],
          ["x^2cos x", "2x cos x-x^2sin x"],
        ] as [string, string][]),
      () =>
        pick(r, [
          ["sin^2 x", "2sin x cos x"],
          ["cos^2 x", "-2sin x cos x"],
          ["sin x cos x", "cos2x"],
          ["sin^3 x", "3sin^2 x cos x"],
          ["cos^3 x", "-3cos^2 x sin x"],
          ["sin(x^2)", "2x cos(x^2)"],
          ["cos(x^2)", "-2x sin(x^2)"],
        ] as [string, string][]),
      () => {
        const k = NZ(r, -3, 3);
        const m = NZ(r, -3, 3);
        const b = R(r, 1, 3);
        const bx = b === 1 ? " x" : `${b}x`;
        return [J([TF(k, `sin${ax}`), TF(m, `cos${bx}`)]), J([TF(k * a, `cos${ax}`), TF(-m * b, `sin${bx}`)])];
      },
    ];
    const [f, ans] = pick(r, forms)();
    return { lead: "導関数を求める", q: `f(x)=${f}`, fields: [funcF(ans)], labels: ["f'(x) ="], verify: { deriv: f } };
  },
  76: (r) => {
    const forms: (() => [string, string, string?])[] = [
      () => {
        const a = pick(r, [2, 3, -1, -2, 4]);
        const ax = a === -1 ? "-x" : `${a}x`;
        return [`e^(${ax})`, TF(a, `e^(${ax})`)];
      },
      () =>
        pick(r, [
          ["xe^x", "(x+1)e^x"],
          ["x^2e^x", "(x^2+2x)e^x"],
          ["xe^(-x)", "(1-x)e^(-x)"],
          ["e^(x^2)", "2xe^(x^2)"],
          ["e^x sin x", "e^x(sin x+cos x)"],
          ["e^x cos x", "e^x(cos x-sin x)"],
        ] as [string, string][]),
      () => {
        const a = R(r, 1, 3);
        const b = R(r, 1, 5);
        return [`log(${lin(a, b)})`, `${a}/(${lin(a, b)})`];
      },
      () => {
        const c = R(r, 1, 5);
        return [`log(x^2+${c})`, `2x/(x^2+${c})`];
      },
      () =>
        pick(r, [
          ["x log x", "log x+1"],
          ["(log x)/x", "(1-log x)/(x^2)"],
          ["x^2log x", "2x log x+x"],
          ["(log x)^2", "(2log x)/x"],
          ["2^x", "2^x log 2"],
          ["3^x", "3^x log 3"],
          ["log_2 x", "1/(x log 2)", "log x/log 2"],
          ["log_3 x", "1/(x log 3)", "log x/log 3"],
        ] as [string, string, string?][]),
    ];
    const [f, ans, src] = pick(r, forms)();
    return { lead: "導関数を求める", q: `f(x)=${f}`, fields: [funcF(ans)], labels: ["f'(x) ="], verify: { deriv: src ?? f } };
  },
  77: (r) => {
    const forms: (() => [string, string, string])[] = [
      () =>
        pick(r, [
          ["e^x", "0", "x+1"],
          ["e^x", "1", "ex"],
          ["e^x", "2", "e^2x-e^2"],
          ["e^(2x)", "0", "2x+1"],
          ["e^(-x)", "0", "-x+1"],
          ["log x", "1", "x-1"],
          ["log x", "e", "x/e"],
          ["log x", "e^2", "x/(e^2)+1"],
          ["sin x", "0", "x"],
          ["sin x", "π", "-x+π"],
          ["cos x", "π/2", "-x+π/2"],
          ["tan x", "π/4", "2x+1-π/2"],
          ["xe^x", "1", "2ex-e"],
          ["x log x", "e", "2x-e"],
          ["x log x", "1", "x-1"],
        ] as [string, string, string][]),
      () => {
        const a = R(r, 1, 4);
        return ["√x", String(a * a), formatPoly(parseExpr(`1/${2 * a}x+${a}/2`))];
      },
      () => {
        const a = NZ(r, -3, 3);
        return ["1/x", String(a), formatPoly(pAdd(poly(coef(frac(-1, a * a)), { x: 1 }), pNum(frac(2, a))))];
      },
    ];
    const [f, a, ans] = pick(r, forms)();
    return { lead: `曲線 y=${f} 上の x=${a} の点における接線の方程式`, q: "", fields: [funcF(ans)], labels: ["y ="], verify: { tangent: [f, a] } };
  },
  // ===== 数学Ⅲ 積分 =====
  78: (r) => {
    const specials: (() => [string, string])[] = [
      () => {
        const k = R(r, 1, 4);
        return [k === 1 ? "1/x" : `${k}/x`, TF(k, "log|x|")];
      },
      () => {
        const k = R(r, 1, 3);
        return [`${k}/(x^2)`, `-${k}/x`];
      },
      () => pick(r, [["√x", "2/3x√x"], ["1/√x", "2√x"]] as [string, string][]),
      () => {
        const k = R(r, 1, 3);
        return [TF(k, "e^x"), TF(k, "e^x")];
      },
      () => {
        const a = pick(r, [2, 3, -1, -2]);
        const ax = a === -1 ? "-x" : `${a}x`;
        return [`e^(${ax})`, TF(frac(1, a), `e^(${ax})`)];
      },
      () => pick(r, [["sin x", "-cos x"], ["cos x", "sin x"], ["1/(cos^2 x)", "tan x"], ["2^x", "2^x/(log 2)"], ["3^x", "3^x/(log 3)"]] as [string, string][]),
      () => {
        const a = R(r, 2, 4);
        return r() < 0.5 ? [`sin${a}x`, TF(frac(-1, a), `cos${a}x`)] : [`cos${a}x`, TF(frac(1, a), `sin${a}x`)];
      },
      () => {
        const a = R(r, 1, 3);
        const b = NZ(r, -4, 4);
        return [`1/(${lin(a, b)})`, TF(frac(1, a), `log|${lin(a, b)}|`)];
      },
    ];
    const [sf, sF] = pick(r, specials)();
    if (r() < 0.45) return { lead: "不定積分を求める (C は積分定数)", q: `∫${sf} dx`, fields: [funcF(sF, "x", true)], verify: { anti: sf } };
    const n = R(r, 1, 3);
    const k = NZ(r, -4, 4) * (n + 1);
    const pf = TF(k, n === 1 ? "x" : `x^${n}`);
    const pF = TF(frac(k, n + 1), `x^${n + 1}`);
    const f = J([pf, sf]);
    return { lead: "不定積分を求める (C は積分定数)", q: `∫(${f})dx`, fields: [funcF(J([pF, sF]), "x", true)], verify: { anti: f } };
  },
  79: (r) => {
    if (r() < 0.35) {
      for (;;) {
        const [a0, b0] = two(r, [0, 30, 45, 60, 90, 120, 135, 150, 180]);
        const [a, b] = a0 < b0 ? [a0, b0] : [b0, a0];
        const fn = r() < 0.5 ? "sin" : "cos";
        const v = fn === "sin" ? cSub(cosDeg(a), cosDeg(b)) : cSub(sinDeg(b), sinDeg(a));
        if (v.size === 0) continue;
        const A = angStr(frac(a, 180));
        const B = angStr(frac(b, 180));
        return { lead: "定積分を求める", q: `∫[${A},${B}]${fn} x dx`, fields: [num(v)], verify: { integral: [`${fn} x`, A, B] } };
      }
    }
    const forms: (() => [string, string, string, Field])[] = [
      () => pick(r, [
        ["1/x", "1", "e", nf(1)],
        ["1/x", "1", "e^2", nf(2)],
        ["1/x", "e", "e^3", nf(2)],
        ["1/x", "1", "2", realF("log 2")],
        ["1/x", "1", "3", realF("log 3")],
        ["1/x", "1", "4", realF("2log 2")],
        ["1/x", "2", "6", realF("log 3")],
        ["e^x", "0", "1", realF("e-1")],
        ["e^x", "0", "2", realF("e^2-1")],
        ["e^x", "-1", "1", realF("e-1/e")],
        ["e^x", "0", "log 2", nf(1)],
        ["e^x", "0", "log 3", nf(2)],
        ["e^(2x)", "0", "1", realF("(e^2-1)/2")],
        ["e^(-x)", "0", "1", realF("1-1/e")],
        ["1/(cos^2 x)", "0", "π/4", nf(1)],
        ["1/(cos^2 x)", "0", "π/3", num(coef(1, 3))],
        ["1/(cos^2 x)", "π/6", "π/3", num(coef(frac(2, 3), 3))],
      ] as [string, string, string, Field][]),
      () => {
        const a = R(r, 0, 2);
        const b = a + R(r, 1, 2);
        return ["√x", String(a * a), String(b * b), nf(frac(2 * (b ** 3 - a ** 3), 3))];
      },
      () => {
        const a = R(r, 1, 3);
        const b = a + R(r, 1, 3);
        return ["1/(x^2)", String(a), String(b), nf(fSub(frac(1, a), frac(1, b)))];
      },
    ];
    const [f, A, B, fld] = pick(r, forms)();
    return { lead: "定積分を求める", q: `∫[${A},${B}]${f} dx`, fields: [fld], verify: { integral: [f, A, B] } };
  },
  80: (r) => {
    const forms: (() => [string, string, string, Field])[] = [
      () => {
        const k = pick(r, [1, 2, 2]);
        const c = R(r, 1, 3);
        const m = R(r, 1, 2);
        const n = R(r, 1, 3);
        const v = fMul(frac(k, 2 * (n + 1)), frac((m * m + c) ** (n + 1) - c ** (n + 1)));
        return [`${k === 1 ? "" : k}x(x^2+${c})^${n}`, "0", String(m), nf(v)];
      },
      () => {
        const a = R(r, 1, 3);
        const b = NZ(r, -2, 2);
        const n = R(r, 2, 4);
        return [`(${lin(a, b)})^${n}`, "0", "1", nf(frac((a + b) ** (n + 1) - b ** (n + 1), a * (n + 1)))];
      },
      () => {
        const n = R(r, 1, 4);
        const pw = n === 1 ? "" : `^${n}`;
        return r() < 0.5 ? [`sin${pw} x cos x`, "0", "π/2", nf(frac(1, n + 1))] : [`cos${pw} x sin x`, "0", "π/2", nf(frac(1, n + 1))];
      },
      () =>
        pick(r, [
          ["xe^(x^2)", "0", "1", realF("(e-1)/2")],
          ["2xe^(x^2)", "0", "1", realF("e-1")],
          ["x/(x^2+1)", "0", "1", realF("1/2log 2")],
          ["2x/(x^2+1)", "0", "1", realF("log 2")],
          ["x/(x^2+1)", "0", "√3", realF("log 2")],
          ["2x/(x^2+1)", "0", "√2", realF("log 3")],
          ["(log x)/x", "1", "e", nf(frac(1, 2))],
          ["(log x)/x", "1", "e^2", nf(2)],
          ["((log x)^2)/x", "1", "e", nf(frac(1, 3))],
        ] as [string, string, string, Field][]),
      () => {
        const a = R(r, 1, 4);
        return [`√(${a * a}-x^2)`, "0", String(a), realF(piStr(frac(a * a, 4)))];
      },
      () =>
        pick(r, [
          ["1/(1+x^2)", "0", "1", realF("π/4")],
          ["1/(1+x^2)", "0", "√3", realF("π/3")],
          ["1/(1+x^2)", "-1", "1", realF("π/2")],
          ["1/(1+x^2)", "1", "√3", realF("π/12")],
          ["1/(4+x^2)", "0", "2", realF("π/8")],
        ] as [string, string, string, Field][]),
    ];
    const [f, A, B, fld] = pick(r, forms)();
    return { lead: "定積分を求める (置換積分)", q: `∫[${A},${B}]${f} dx`, fields: [fld], verify: { integral: [f, A, B] } };
  },
  81: (r) => {
    if (r() < 0.55) {
      const [f, A, B, fld] = pick(r, [
        ["xe^x", "0", "1", nf(1)],
        ["xe^x", "0", "2", realF("e^2+1")],
        ["xe^x", "0", "3", realF("2e^3+1")],
        ["xe^(-x)", "0", "1", realF("1-2/e")],
        ["xe^(2x)", "0", "1", realF("(e^2+1)/4")],
        ["log x", "1", "e", nf(1)],
        ["log x", "1", "e^2", realF("e^2+1")],
        ["x log x", "1", "e", realF("(e^2+1)/4")],
        ["x^2log x", "1", "e", realF("(2e^3+1)/9")],
        ["x sin x", "0", "π", realF("π")],
        ["x sin x", "0", "π/2", nf(1)],
        ["x cos x", "0", "π/2", realF("π/2-1")],
        ["x cos x", "0", "π", nf(-2)],
        ["x sin2x", "0", "π/2", realF("π/4")],
      ] as [string, string, string, Field][]);
      return { lead: "定積分を求める (部分積分)", q: `∫[${A},${B}]${f} dx`, fields: [fld], verify: { integral: [f, A, B] } };
    }
    const [f, F] = pick(r, [
      ["xe^x", "(x-1)e^x"],
      ["xe^(2x)", "1/4(2x-1)e^(2x)"],
      ["xe^(3x)", "1/9(3x-1)e^(3x)"],
      ["xe^(-x)", "-(x+1)e^(-x)"],
      ["x^2e^x", "(x^2-2x+2)e^x"],
      ["x sin x", "-x cos x+sin x"],
      ["x sin2x", "-1/2x cos2x+1/4sin2x"],
      ["x cos x", "x sin x+cos x"],
      ["x cos2x", "1/2x sin2x+1/4cos2x"],
      ["log x", "x log x-x"],
      ["x log x", "1/2x^2log x-1/4x^2"],
      ["x^2log x", "1/3x^3log x-1/9x^3"],
    ] as [string, string][]);
    return { lead: "不定積分を求める (部分積分、C は積分定数)", q: `∫${f} dx`, fields: [funcF(F, "x", true)], verify: { anti: f } };
  },
  82: (r) => {
    const forms: (() => [string, Field, [string, string, string], string])[] = [
      () =>
        pick(r, [
          ["曲線 y=sin x (0≤x≤π) と x 軸で囲まれた部分の面積", nf(2), ["sin x", "0", "π"], "S ="],
          ["曲線 y=cos x (-π/2≤x≤π/2) と x 軸で囲まれた部分の面積", nf(2), ["cos x", "-π/2", "π/2"], "S ="],
          ["曲線 y=e^x と x 軸、y 軸、直線 x=1 で囲まれた部分の面積", realF("e-1"), ["e^x", "0", "1"], "S ="],
          ["曲線 y=e^x と x 軸、y 軸、直線 x=2 で囲まれた部分の面積", realF("e^2-1"), ["e^x", "0", "2"], "S ="],
          ["曲線 y=1/x と x 軸、2直線 x=1, x=e で囲まれた部分の面積", nf(1), ["1/x", "1", "e"], "S ="],
          ["曲線 y=1/x と x 軸、2直線 x=1, x=e^2 で囲まれた部分の面積", nf(2), ["1/x", "1", "e^2"], "S ="],
          ["曲線 y=1/x と x 軸、2直線 x=1, x=3 で囲まれた部分の面積", realF("log 3"), ["1/x", "1", "3"], "S ="],
          ["曲線 y=log x と x 軸、直線 x=e で囲まれた部分の面積", nf(1), ["log x", "1", "e"], "S ="],
          ["曲線 y=√x と直線 y=x で囲まれた部分の面積", nf(frac(1, 6)), ["√x-x", "0", "1"], "S ="],
          ["曲線 y=√x と直線 y=x/2 で囲まれた部分の面積", nf(frac(4, 3)), ["√x-x/2", "0", "4"], "S ="],
          ["2曲線 y=sin x, y=cos x (π/4≤x≤(5π)/4) で囲まれた部分の面積", num(coef(2, 2)), ["sin x-cos x", "π/4", "5π/4"], "S ="],
          ["曲線 y=e^x と y 軸、直線 y=e で囲まれた部分の面積", nf(1), ["e-e^x", "0", "1"], "S ="],
          ["曲線 y=x^2 (0≤x≤1) と x 軸、直線 x=1 で囲まれた部分を x 軸のまわりに1回転してできる立体の体積", realF("π/5"), ["π*x^4", "0", "1"], "V ="],
          ["曲線 y=sin x (0≤x≤π) と x 軸で囲まれた部分を x 軸のまわりに1回転してできる立体の体積", realF("π^2/2"), ["π*(sin x)^2", "0", "π"], "V ="],
          ["曲線 y=e^x と x 軸、y 軸、直線 x=1 で囲まれた部分を x 軸のまわりに1回転してできる立体の体積", realF("π(e^2-1)/2"), ["π*e^(2x)", "0", "1"], "V ="],
          ["曲線 y=1/x と x 軸、2直線 x=1, x=2 で囲まれた部分を x 軸のまわりに1回転してできる立体の体積", realF("π/2"), ["π/(x^2)", "1", "2"], "V ="],
        ] as [string, Field, [string, string, string], string][]),
      () => {
        const [a, b] = two(r, [2, 3, 4, 5]);
        return [`楕円 x^2/${a * a}+y^2/${b * b}=1 の面積`, realF(piStr(frac(a * b))), [`2*${b}*√(1-x^2/${a * a})`, String(-a), String(a)], "S ="];
      },
      () => {
        const a = R(r, 1, 4);
        return [`曲線 y=√x と x 軸、直線 x=${a} で囲まれた部分を x 軸のまわりに1回転してできる立体の体積`, realF(piStr(frac(a * a, 2))), ["π*x", "0", String(a)], "V ="];
      },
      () => {
        const a = R(r, 1, 3);
        return [`円 x^2+y^2=${a * a} を x 軸のまわりに1回転してできる球の体積`, realF(piStr(frac(4 * a ** 3, 3))), [`π*(${a * a}-x^2)`, String(-a), String(a)], "V ="];
      },
    ];
    const [lead, fld, iv, lab] = pick(r, forms)();
    return { lead, q: "", fields: [fld], labels: [lab], verify: { integral: iv } };
  },
  // ===== 数学C ベクトル =====
  83: (r) => {
    const v = () => [NZ(r, -4, 5), R(r, -4, 5)];
    const a = v();
    const b = v();
    const head = `vec a=${vecStr(a)}, vec b=${vecStr(b)} のとき`;
    const k = R(r, 0, 3);
    if (k <= 1) {
      const p = NZ(r, -3, 3);
      const q = NZ(r, -3, 3);
      const c = [p * a[0] + q * b[0], p * a[1] + q * b[1]];
      const name = L([
        [p, "vec a"],
        [q, "vec b"],
      ]);
      if (k === 0) return { lead: `${head}、${name} の成分`, q: "", fields: [nf(c[0]), nf(c[1])], labels: [`${name} =`], layout: "point" };
      if ((c[0] === 0 && c[1] === 0) || c[0] ** 2 + c[1] ** 2 > 300) return GENS[83](r);
      return { lead: `${head}、|${name}|`, q: "", fields: [num(sq(c[0] ** 2 + c[1] ** 2))], labels: [`|${name}| =`] };
    }
    if (k === 2) {
      const [b1, b2] = [NZ(r, -4, 5), NZ(r, -4, 5)];
      const t = NZ(r, -3, 3);
      return { lead: `vec a=(x, ${t * b2}) と vec b=${vecStr([b1, b2])} が平行になる x`, q: "", fields: [nf(t * b1)], labels: ["x ="] };
    }
    const [p, q, h] = pick(r, [
      [3, 4, 5],
      [5, 12, 13],
      [8, 15, 17],
      [6, 8, 10],
    ] as const);
    const s = pick(r, [1, 2]);
    let u: number[] = r() < 0.5 ? [p, q] : [q, p];
    u = u.map((x) => x * (r() < 0.5 ? 1 : -1));
    return { lead: `vec a=${vecStr(u.map((x) => x * s))} と同じ向きの単位ベクトルの成分`, q: "", fields: [nf(frac(u[0], h)), nf(frac(u[1], h))], labels: ["e ="], layout: "point" };
  },
  84: (r) => {
    const k = R(r, 0, 3);
    if (k === 0) {
      const a = [NZ(r, -4, 5), R(r, -4, 5)];
      const b = [R(r, -4, 5), NZ(r, -4, 5)];
      return { lead: `vec a=${vecStr(a)}, vec b=${vecStr(b)} の内積`, q: "", fields: [nf(dot(a, b))], labels: ["vec a·vec b ="] };
    }
    if (k === 1) {
      const [a0, b0, d0] = pick(r, [
        [[1, 0], [1, 1], 45],
        [[2, 1], [1, 3], 45],
        [[3, 1], [1, 2], 45],
        [[1, 2], [-1, 3], 45],
        [[2, 1], [-1, 2], 90],
        [[3, 1], [-1, 3], 90],
        [[1, 2], [-4, 2], 90],
      ] as [number[], number[], number][]);
      const neg = r() < 0.35;
      const [a, b1] = shuffleVecs(r, a0, b0);
      const b = neg ? b1.map((x) => -x) : b1;
      return { lead: `vec a=${vecStr(a)}, vec b=${vecStr(b)} のなす角 θ (0°≤θ≤180°)`, q: "", fields: [nf(neg ? 180 - d0 : d0)], labels: ["θ ="], suffix: ["°"] };
    }
    const p = R(r, 1, 5);
    const q = R(r, 1, 5);
    if (k === 2) {
      const th = pick(r, [30, 45, 60, 90, 120, 135, 150]);
      const s = cMul(coef(p * q), cosDeg(th));
      if (r() < 0.5) return { lead: `|vec a|=${p}, |vec b|=${q}, vec a·vec b=${formatCoef(s)} のとき、vec a と vec b のなす角 θ (0°≤θ≤180°)`, q: "", fields: [nf(th)], labels: ["θ ="], suffix: ["°"] };
      return { lead: `|vec a|=${p}, |vec b|=${q} で、vec a と vec b のなす角が ${th}° のときの内積`, q: "", fields: [num(s)], labels: ["vec a·vec b ="] };
    }
    const s = R(r, -(p * q) + 1, p * q - 1);
    const m = pick(r, [1, 1, 2, 3]);
    const n = pick(r, [1, -1, 2, -2]);
    const val = m * m * p * p + n * n * q * q + 2 * m * n * s;
    if (val > 300) return GENS[84](r);
    const name = L([
      [m, "vec a"],
      [n, "vec b"],
    ]);
    return { lead: `|vec a|=${p}, |vec b|=${q}, vec a·vec b=${s} のとき`, q: "", fields: [num(sq(val))], labels: [`|${name}| =`] };
  },
  85: (r) => {
    const v = () => [R(r, -4, 4), R(r, -4, 4), NZ(r, -4, 4)];
    const k = R(r, 0, 3);
    if (k === 0) {
      const a = v();
      const b = v();
      const p = NZ(r, -3, 3);
      const q = NZ(r, -3, 3);
      const name = L([
        [p, "vec a"],
        [q, "vec b"],
      ]);
      return { lead: `vec a=${vecStr(a)}, vec b=${vecStr(b)} のとき、${name} の成分`, q: "", fields: a.map((x, i) => nf(p * x + q * b[i])), labels: [`${name} =`], layout: "point" };
    }
    if (k === 1) {
      const A = v();
      const B = v();
      const d = A.map((x, i) => B[i] - x);
      if (r() < 0.5 && dot(d, d) > 0) return { lead: `2点 A${vecStr(A)}, B${vecStr(B)} 間の距離`, q: "", fields: [num(sq(dot(d, d)))], labels: ["AB ="] };
      const a = v();
      return { lead: `vec a=${vecStr(a)} の大きさ`, q: "", fields: [num(sq(dot(a, a)))], labels: ["|vec a| ="] };
    }
    if (k === 2) {
      const a = v();
      const b = v();
      return { lead: `vec a=${vecStr(a)}, vec b=${vecStr(b)} の内積`, q: "", fields: [nf(dot(a, b))], labels: ["vec a·vec b ="] };
    }
    const [a0, b0, d0] = pick(r, [
      [[1, 1, 0], [1, 0, 1], 60],
      [[1, 0, 1], [0, 1, 1], 60],
      [[2, 1, -1], [1, -1, -2], 60],
      [[1, -1, 0], [0, 1, -1], 120],
      [[1, 1, 0], [-1, 0, 1], 120],
      [[1, 0, 0], [1, 1, 0], 45],
      [[0, 0, 1], [1, 0, 1], 45],
      [[1, 2, 2], [2, 1, -2], 90],
      [[1, 1, 1], [1, -1, 0], 90],
    ] as [number[], number[], number][]);
    const neg = r() < 0.3;
    const [a, b1] = shuffleVecs(r, a0, b0);
    const b = neg ? b1.map((x) => -x) : b1;
    return { lead: `vec a=${vecStr(a)}, vec b=${vecStr(b)} のなす角 θ (0°≤θ≤180°)`, q: "", fields: [nf(neg ? 180 - d0 : d0)], labels: ["θ ="], suffix: ["°"] };
  },
  // ===== 数学C 複素数平面 =====
  86: (r) => {
    const k = R(r, 0, 2);
    if (k === 0) {
      const d = pick(r, [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330]);
      const m = R(r, 1, 3);
      const rr = d % 90 === 0 ? coef(m) : d % 45 === 0 ? coef(m, 2) : coef(2 * m);
      const z = formatComplex(cMul(rr, cosDeg(d)), cMul(rr, sinDeg(d)));
      return { lead: `z=${z} を極形式 r(cosθ+i sinθ) で表したときの r と θ (0≤θ<2π)`, q: "", fields: [num(rr), realF(angStr(frac(d, 180)))], labels: ["r =", "θ ="] };
    }
    if (k === 1) {
      const angs = [30, 45, 60, 90, 120, 135, 150];
      const [a, b] = two(r, angs);
      const r1 = R(r, 1, 4);
      const r2 = R(r, 1, 3);
      const pol = (m: number, d: number) => `${m === 1 ? "" : m}(cos ${angStr(frac(d, 180))}+i sin ${angStr(frac(d, 180))})`;
      const head = `z_1=${pol(r1, a)}, z_2=${pol(r2, b)} のとき`;
      if (r() < 0.6) return { lead: `${head}、z_1z_2 の絶対値と偏角 θ (0≤θ<2π)`, q: "", fields: [nf(r1 * r2), realF(angStr(frac(deg360(a + b), 180)))], labels: ["|z_1z_2| =", "θ ="] };
      return { lead: `${head}、z_1/z_2 の絶対値と偏角 θ (0≤θ<2π)`, q: "", fields: [nf(frac(r1, r2)), realF(angStr(frac(deg360(a - b), 180)))], labels: ["|z_1/z_2| =", "θ ="] };
    }
    const z1 = [R(r, -4, 4), R(r, -4, 4)];
    const z2 = [R(r, -4, 4), R(r, -4, 4)];
    if (z1[0] === z2[0] && z1[1] === z2[1]) return GENS[86](r);
    const d = [z1[0] - z2[0], z1[1] - z2[1]];
    return { lead: `複素数平面上の2点 ${cxS(z1[0], z1[1])}, ${cxS(z2[0], z2[1])} 間の距離`, q: "", fields: [num(sq(dot(d, d)))] };
  },
  87: (r) => {
    const forms: (() => [string, Cx, number])[] = [
      () => {
        const [a, b] = pick(r, [
          [1, 1],
          [1, -1],
          [-1, 1],
          [-1, -1],
        ] as const);
        return [cxS(a, b), cx(a, b), 12];
      },
      () => {
        const [ra, rb] = pick(r, [
          [coef(1), coef(1, 3)],
          [coef(1, 3), coef(1)],
          [coef(-1), coef(1, 3)],
          [coef(1, 3), coef(-1)],
          [coef(1), coef(-1, 3)],
          [coef(-1, 3), coef(1)],
        ] as [Coef, Coef][]);
        return [formatComplex(ra, rb), { re: ra, im: rb }, 9];
      },
      () => {
        const d = pick(r, [30, 45, 60, 120, 135, 150]);
        const z = { re: cosDeg(d), im: sinDeg(d) };
        const A = angStr(frac(d, 180));
        return [`cos ${A}+i sin ${A}`, z, 16];
      },
    ];
    const [zs, z, nmax] = pick(r, forms)();
    const n = R(r, 2, nmax);
    const w = cxPow(z, n);
    return { lead: "ド・モアブルの定理で計算する", q: `(${zs})^${n}`, fields: [cxF(w)] };
  },
  // ===== 数学C 二次曲線 =====
  88: (r) => {
    const k = R(r, 0, 2);
    if (k === 0) {
      const p = NZ(r, -4, 4);
      const yx = r() < 0.5;
      const eq = yx ? `y^2=${4 * p}x` : `x^2=${4 * p}y`;
      if (r() < 0.65) return { lead: `放物線 ${eq} の焦点`, q: "", fields: yx ? [nf(p), nf(0)] : [nf(0), nf(p)], labels: ["焦点"], layout: "point" };
      return { lead: `放物線 ${eq} の準線の方程式`, q: "", fields: [nf(-p)], labels: [yx ? "x =" : "y ="] };
    }
    const [a, b] = two(r, [1, 2, 3, 4, 5, 6]);
    const den = (n: number, v: string) => (n === 1 ? `${v}^2` : `${v}^2/${n * n}`);
    if (k === 1) {
      const std = r() < 0.6;
      const g = gcd(b * b, a * a);
      const eq = std ? `${den(a, "x")}+${den(b, "y")}=1` : `${L([[(b * b) / g, "x^2"], [(a * a) / g, "y^2"]])}=${(a * a * b * b) / g}`;
      const c = sq(Math.abs(a * a - b * b));
      if (r() < 0.25) return { lead: `楕円 ${eq} の長軸の長さ`, q: "", fields: [nf(2 * Math.max(a, b))] };
      return { lead: `楕円 ${eq} の焦点のうち、${a > b ? "x" : "y"} 座標が正のもの`, q: "", fields: a > b ? [num(c), nf(0)] : [nf(0), num(c)], labels: ["焦点"], layout: "point" };
    }
    const minus = r() < 0.3;
    const eq = `${den(a, "x")}-${den(b, "y")}=${minus ? -1 : 1}`;
    const c = sq(a * a + b * b);
    const t = R(r, 0, 2);
    if (t === 0) return { lead: `双曲線 ${eq} の焦点のうち、${minus ? "y" : "x"} 座標が正のもの`, q: "", fields: minus ? [nf(0), num(c)] : [num(c), nf(0)], labels: ["焦点"], layout: "point" };
    if (t === 1) return { lead: `双曲線 ${eq} の漸近線のうち、傾きが正のものの傾き`, q: "", fields: [nf(frac(b, a))] };
    return { lead: `双曲線 ${eq} の頂点のうち、${minus ? "y" : "x"} 座標が正のもの`, q: "", fields: minus ? [nf(0), nf(b)] : [nf(a), nf(0)], labels: ["頂点"], layout: "point" };
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

