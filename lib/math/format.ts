import { gcd, parseMonoKey, type Coef, type Frac, type Poly } from "./value";

// 答えを、問題文と同じ書き方の文字列にする (MathText が分数・指数・√ をきれいに描く)。
// 例: (3/2)x → "3/2x"、x² → "x^2"、(−3+√17)/4 → "(-3+√17)/4"

function lcm(a: number, b: number) {
  return (a / gcd(a, b)) * b;
}

export function formatFrac(f: Frac): string {
  return f.d === 1 ? String(f.n) : `${f.n}/${f.d}`;
}

/** 有理数と √ の和を書く。分母がそろうときは (…)/n の形にする */
export function formatCoef(c: Coef): string {
  if (c.size === 0) return "0";
  const terms = [...c].sort(([a], [b]) => a - b);
  if (terms.length === 1) {
    const [[k, v]] = terms;
    if (k === 1) return formatFrac(v);
    const num = v.n === 1 ? "" : v.n === -1 ? "-" : String(v.n);
    return v.d === 1 ? `${num}√${k}` : `${num || "1"}√${k}/${v.d}`.replace(/^1√/, "√").replace(/^-1√/, "-√");
  }
  const L = terms.reduce((acc, [, v]) => lcm(acc, v.d), 1);
  let s = "";
  for (const [k, v] of terms) {
    const n = (v.n * L) / v.d;
    const sign = n < 0 ? "-" : s ? "+" : "";
    const a = Math.abs(n);
    s += k === 1 ? `${sign}${a}` : `${sign}${a === 1 ? "" : a}√${k}`;
  }
  return L === 1 ? s : `(${s})/${L}`;
}

function monoString(key: string): string {
  const m = parseMonoKey(key);
  return Object.keys(m)
    .sort()
    .map((v) => (m[v] === 1 ? v : `${v}^${m[v]}`))
    .join("");
}

function degree(key: string) {
  return Object.values(parseMonoKey(key)).reduce((s, e) => s + e, 0);
}

/** 同じ次数なら、アルファベット順で前の文字の指数が大きい項を先に (a²+ab+b²) */
function lexCompare(a: string, b: string): number {
  const ma = parseMonoKey(a);
  const mb = parseMonoKey(b);
  for (const v of "abcdefghijklmnopqrstuvwxyz") {
    const d = (mb[v] ?? 0) - (ma[v] ?? 0);
    if (d !== 0) return d;
  }
  return 0;
}

/** 文字式を書く (次数の高い順、同じ次数は文字の順) */
export function formatPoly(p: Poly): string {
  if (p.size === 0) return "0";
  const terms = [...p].sort(([a], [b]) => degree(b) - degree(a) || lexCompare(a, b));
  let s = "";
  for (const [k, c] of terms) {
    const mono = monoString(k);
    let body: string;
    let neg = false;
    if (c.size === 1 && c.has(1)) {
      const f = c.get(1)!;
      neg = f.n < 0;
      const a = { n: Math.abs(f.n), d: f.d };
      if (!mono) body = formatFrac(a);
      else if (a.n === 1 && a.d === 1) body = mono;
      else body = `${formatFrac(a)}${mono}`;
    } else {
      const cs = formatCoef(c);
      body = mono ? `(${cs})${mono}` : cs;
      if (!mono && cs.startsWith("-")) {
        neg = true;
        body = cs.slice(1);
      }
    }
    s += neg ? `-${body}` : s ? `+${body}` : body;
  }
  return s;
}
