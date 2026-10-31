// 「鍛える」エンジン（AOHARU MATH）の数の型。
// Frac = 分数、Coef = 有理数と √ の和（a + b√2 + c√3 …）、Poly = 文字式（係数は Coef）。
// 問題も答えも、この型で同じかどうかを確かめる。AI は使わない。

export interface Frac {
  n: number;
  d: number;
}

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

export function frac(n: number, d = 1): Frac {
  if (d === 0) throw new Error("division by zero");
  if (!Number.isInteger(n) || !Number.isInteger(d)) throw new Error("not integer");
  const g = gcd(n, d) || 1;
  const s = d < 0 ? -1 : 1;
  return { n: (s * n) / g, d: (s * d) / g };
}

export const fAdd = (a: Frac, b: Frac) => frac(a.n * b.d + b.n * a.d, a.d * b.d);
export const fSub = (a: Frac, b: Frac) => frac(a.n * b.d - b.n * a.d, a.d * b.d);
export const fMul = (a: Frac, b: Frac) => frac(a.n * b.n, a.d * b.d);
export const fDiv = (a: Frac, b: Frac) => frac(a.n * b.d, a.d * b.n);
export const fIsZero = (a: Frac) => a.n === 0;
export const fEq = (a: Frac, b: Frac) => a.n === b.n && a.d === b.d;

/** n = s² × k (k は平方因数を持たない) に分ける */
export function splitSquare(n: number): { out: number; k: number } {
  let out = 1;
  let k = n;
  for (let p = 2; p * p <= k; p++) {
    while (k % (p * p) === 0) {
      k /= p * p;
      out *= p;
    }
  }
  return { out, k };
}

export function isSquareFree(n: number): boolean {
  return splitSquare(n).out === 1;
}

/** 有理数と √ の和。キーは √ の中身 (1 は有理数の部分) */
export type Coef = Map<number, Frac>;

export function coef(n: number | Frac, root = 1): Coef {
  const f = typeof n === "number" ? frac(n) : n;
  const m: Coef = new Map();
  if (!fIsZero(f)) m.set(root, f);
  return m;
}

export function cAdd(a: Coef, b: Coef): Coef {
  const m: Coef = new Map(a);
  for (const [k, v] of b) {
    const s = fAdd(m.get(k) ?? frac(0), v);
    if (fIsZero(s)) m.delete(k);
    else m.set(k, s);
  }
  return m;
}

export function cNeg(a: Coef): Coef {
  const m: Coef = new Map();
  for (const [k, v] of a) m.set(k, frac(-v.n, v.d));
  return m;
}

export function cMul(a: Coef, b: Coef): Coef {
  let m: Coef = new Map();
  for (const [k1, v1] of a)
    for (const [k2, v2] of b) {
      const { out, k } = splitSquare(k1 * k2);
      m = cAdd(m, coef(fMul(fMul(v1, v2), frac(out)), k));
    }
  return m;
}

/** 1つの項だけの Coef で割る（√ は分母の有理化をする） */
export function cDiv(a: Coef, b: Coef): Coef {
  if (b.size !== 1) throw new Error("unsupported division");
  const [[k, v]] = [...b];
  // a / (v√k) = a × √k / (v k)
  return cMul(cMul(a, coef(1, k)), coef(fDiv(frac(1), fMul(v, frac(k)))));
}

export function cIsZero(a: Coef): boolean {
  return a.size === 0;
}

/** 有理数だけなら返す */
export function cRational(a: Coef): Frac | null {
  if (a.size === 0) return frac(0);
  if (a.size === 1 && a.has(1)) return a.get(1)!;
  return null;
}

export function cKey(a: Coef): string {
  return [...a]
    .sort(([x], [y]) => x - y)
    .map(([k, v]) => `${v.n}/${v.d}r${k}`)
    .join("+");
}

/** 文字式。キーは文字と指数 (例 "a2b1"、定数は "") */
export type Poly = Map<string, Coef>;
export type Mono = Record<string, number>;

export function monoKey(m: Mono): string {
  return Object.keys(m)
    .filter((v) => m[v] !== 0)
    .sort()
    .map((v) => `${v}${m[v]}`)
    .join("");
}

export function parseMonoKey(key: string): Mono {
  const m: Mono = {};
  for (const [, v, e] of key.matchAll(/([a-z])(-?\d+)/g)) m[v] = Number(e);
  return m;
}

export function poly(c: Coef, mono: Mono = {}): Poly {
  const p: Poly = new Map();
  if (!cIsZero(c)) p.set(monoKey(mono), c);
  return p;
}

export const pNum = (n: number | Frac, root = 1) => poly(coef(n, root));
export const pVar = (v: string) => poly(coef(1), { [v]: 1 });

export function pAdd(a: Poly, b: Poly): Poly {
  const p: Poly = new Map(a);
  for (const [k, v] of b) {
    const s = cAdd(p.get(k) ?? new Map(), v);
    if (cIsZero(s)) p.delete(k);
    else p.set(k, s);
  }
  return p;
}

export function pNeg(a: Poly): Poly {
  const p: Poly = new Map();
  for (const [k, v] of a) p.set(k, cNeg(v));
  return p;
}

export const pSub = (a: Poly, b: Poly) => pAdd(a, pNeg(b));

export function pMul(a: Poly, b: Poly): Poly {
  let p: Poly = new Map();
  for (const [k1, v1] of a)
    for (const [k2, v2] of b) {
      const m1 = parseMonoKey(k1);
      const m2 = parseMonoKey(k2);
      const m: Mono = { ...m1 };
      for (const [v, e] of Object.entries(m2)) m[v] = (m[v] ?? 0) + e;
      p = pAdd(p, poly(cMul(v1, v2), m));
    }
  return p;
}

/** 1つの項だけの式で割る（単項式の割り算・数での割り算） */
export function pDiv(a: Poly, b: Poly): Poly {
  if (b.size !== 1) throw new Error("unsupported division");
  const [[kb, vb]] = [...b];
  const mb = parseMonoKey(kb);
  let p: Poly = new Map();
  for (const [k, v] of a) {
    const m = parseMonoKey(k);
    for (const [x, e] of Object.entries(mb)) {
      m[x] = (m[x] ?? 0) - e;
      if (m[x] < 0) throw new Error("not a polynomial");
    }
    p = pAdd(p, poly(cDiv(v, vb), m));
  }
  return p;
}

export function pPow(a: Poly, n: number): Poly {
  if (!Number.isInteger(n) || n < 0 || n > 12) throw new Error("bad exponent");
  let p = pNum(1);
  for (let i = 0; i < n; i++) p = pMul(p, a);
  return p;
}

export function pKey(a: Poly): string {
  return [...a]
    .sort(([x], [y]) => (x < y ? -1 : x > y ? 1 : 0))
    .map(([k, v]) => `${k}:${cKey(v)}`)
    .join(";");
}

export const pEq = (a: Poly, b: Poly) => pKey(a) === pKey(b);

/** 定数なら Coef を返す */
export function pConst(a: Poly): Coef | null {
  if (a.size === 0) return new Map();
  if (a.size === 1 && a.has("")) return a.get("")!;
  return null;
}

/** 文字に数を代入する */
export function pSubst(a: Poly, vars: Record<string, Coef>): Poly {
  let p: Poly = new Map();
  for (const [k, v] of a) {
    let term = pNum(1);
    const m = parseMonoKey(k);
    const rest: Mono = {};
    for (const [x, e] of Object.entries(m)) {
      if (vars[x]) term = pMul(term, pPow(poly(vars[x]), e));
      else rest[x] = e;
    }
    p = pAdd(p, pMul(term, poly(v, rest)));
  }
  return p;
}

export function pDegree(a: Poly): number {
  let d = 0;
  for (const k of a.keys()) d = Math.max(d, Object.values(parseMonoKey(k)).reduce((s, e) => s + e, 0));
  return d;
}
