import { fAdd, fDiv, fEq, fMul, fSub, frac, gcd, type Frac } from "../math/value";

// 小学算数の採点。値が合っているかに加えて、「答えの形」も確かめる (満点主義)。
//   ok      … 正解
//   form    … 値は合っているが、約分・帯分数・小数の形などがまだ (「形をなおそう」)
//   wrong   … まちがい
//   invalid … 数として読めない
// 全角数字・全角スラッシュ・全角コロン・空白は受けつける。"1 3/4" は帯分数 "1と3/4" と読む。

export type Verdict = "ok" | "form" | "wrong" | "invalid";

/** 答えの欄1つ分の決まり */
export type Field =
  | { kind: "int"; value: number }
  | { kind: "dec"; value: Frac }
  /**
   * 分数。form: improper = 真分数・仮分数で (帯分数は「形をなおそう」)、mixed = 帯分数で (1より大きい仮分数は「形をなおそう」)、any = どちらでも。
   * reduce: 約分まで求める。dec: 同じ値の小数でも正解。den: 分母をこの数にそろえる (通分)。
   */
  | { kind: "frac"; value: Frac; form: "improper" | "mixed" | "any"; reduce: boolean; dec?: boolean; den?: number }
  /** いちばん簡単な整数の比 a:b */
  | { kind: "ratio"; a: number; b: number };

export interface Judged {
  v: Verdict;
  /** form のときの「形をなおそう」の中身 */
  msg?: string;
}

export function normalizeInput(s: string): string {
  return s
    .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/[／]/g, "/")
    .replace(/[．]/g, ".")
    .replace(/[：]/g, ":")
    .replace(/[−ー－‐–]/g, "-")
    .replace(/[\s　]+/g, " ")
    .trim()
    .replace(/(\d) +(?=\d+ *\/)/g, "$1と") // "1 3/4" → 帯分数
    .replace(/ /g, "");
}

export interface ParsedNum {
  type: "int" | "dec" | "frac" | "mixed";
  value: Frac;
  /** 分数・帯分数の分子と分母、帯分数の整数部分 */
  n?: number;
  d?: number;
  w?: number;
  /** 小数の書き方がふつうでない (末尾の0、先頭の0なし) */
  oddDec?: boolean;
}

/** 小数の文字列を分数にする ("2.35" → 47/20) */
export function decFrac(s: string): Frac {
  const [a, b = ""] = s.split(".");
  const d = 10 ** b.length;
  return frac(Number(a || "0") * d + Number(b || "0"), d);
}

/** 正規化した文字列を、整数・小数・分数・帯分数として読む */
export function parseNum(s: string): ParsedNum | null {
  if (!s || s.length > 16) return null;
  let m = s.match(/^\d+$/);
  if (m) return { type: "int", value: frac(Number(s)) };
  m = s.match(/^(\d*)\.(\d+)$/);
  if (m) return { type: "dec", value: decFrac(s), oddDec: m[1] === "" || m[2].endsWith("0") };
  m = s.match(/^(\d+)\/(\d+)$/);
  if (m) {
    const n = Number(m[1]);
    const d = Number(m[2]);
    if (d === 0) return null;
    return { type: "frac", value: frac(n, d), n, d };
  }
  m = s.match(/^(\d+)と(\d+)\/(\d+)$/);
  if (m) {
    const w = Number(m[1]);
    const n = Number(m[2]);
    const d = Number(m[3]);
    if (d === 0) return null;
    return { type: "mixed", value: frac(w * d + n, d), n, d, w };
  }
  return null;
}

const ok: Judged = { v: "ok" };
const form = (msg: string): Judged => ({ v: "form", msg });

export function judgeField(f: Field, input: string): Judged {
  const s = normalizeInput(input);
  if (f.kind === "ratio") return judgeRatio(f, s);
  const p = parseNum(s);
  if (!p) return { v: "invalid" };
  const want = f.kind === "int" ? frac(f.value) : f.value;
  if (!fEq(p.value, want)) return { v: "wrong" };

  if (f.kind === "int") return p.type === "int" ? ok : form("整数で答えよう。");
  if (f.kind === "dec") {
    if (p.type === "int") return ok;
    if (p.type === "dec") return p.oddDec ? form("小数の書き方をなおそう（終わりの 0 は消す、0.5 のように書く）。") : ok;
    return form("小数で答えよう。");
  }
  // 分数
  if (p.type === "int") return f.den ? form(`分母を ${f.den} にそろえよう。`) : ok;
  if (p.type === "dec") {
    if (!f.dec) return form("分数で答えよう。");
    return p.oddDec ? form("小数の書き方をなおそう（終わりの 0 は消す）。") : ok;
  }
  const n = p.n!;
  const d = p.d!;
  if (f.den) return p.type === "frac" && d === f.den ? ok : form(`分母を ${f.den} にそろえよう。`);
  if (p.type === "frac") {
    if (n % d === 0) return form("整数になおそう。");
    if (f.reduce && gcd(n, d) > 1) return form("約分しよう。");
    if (f.form === "mixed" && n > d) return form("帯分数になおそう。");
    return ok;
  }
  // 帯分数
  if (f.form === "improper") return form("仮分数で答えよう。");
  if (p.w === 0 || n === 0 || n >= d) return form("帯分数の形をなおそう（分数の部分は 1 より小さく）。");
  if (f.reduce && gcd(n, d) > 1) return form("約分しよう。");
  return ok;
}

function judgeRatio(f: { a: number; b: number }, s: string): Judged {
  const m = s.match(/^([^:]+):([^:]+)$/);
  if (!m) return { v: "invalid" };
  const x = parseNum(m[1]);
  const y = parseNum(m[2]);
  if (!x || !y || x.value.n === 0 || y.value.n === 0) return { v: "invalid" };
  // x:y = a:b ⇔ x×b = y×a
  if (!fEq(fMul(x.value, frac(f.b)), fMul(y.value, frac(f.a)))) return { v: "wrong" };
  if (x.type !== "int" || y.type !== "int" || gcd(x.value.n, y.value.n) !== 1) return form("いちばん簡単な整数の比にしよう。");
  return ok;
}

export function judge(fields: Field[], inputs: string[]): Judged[] {
  return fields.map((f, i) => judgeField(f, inputs[i] ?? ""));
}

// ---- 書き方 ----

export function fracStr(f: Frac): string {
  return f.d === 1 ? String(f.n) : `${f.n}/${f.d}`;
}

/** 帯分数 (1より小さいときは真分数、整数は整数)。den を渡すとその分母で書く */
export function mixedStr(f: Frac, den = f.d): string {
  const N = (f.n * den) / f.d;
  const w = Math.floor(N / den);
  const r = N - w * den;
  if (r === 0) return String(w);
  return w === 0 ? `${r}/${den}` : `${w}と${r}/${den}`;
}

/** 分母が 2・5 だけでできているときの小数の書き方 */
export function decStr(f: Frac): string {
  if (f.d === 1) return String(f.n);
  for (let k = 1; k <= 8; k++) {
    const p = 10 ** k;
    if (p % f.d === 0) {
      const digits = String((f.n * p) / f.d).padStart(k + 1, "0");
      const s = `${digits.slice(0, -k)}.${digits.slice(-k)}`;
      return s.replace(/0+$/, "").replace(/\.$/, "");
    }
  }
  throw new Error("not a terminating decimal");
}

export function isTerminating(f: Frac): boolean {
  let d = f.d;
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  return d === 1;
}

/** 正解の見せ方 */
export function fieldText(f: Field): string {
  switch (f.kind) {
    case "int":
      return String(f.value);
    case "dec":
      return decStr(f.value);
    case "frac":
      if (f.den) return `${(f.value.n * f.den) / f.value.d}/${f.den}`;
      return f.form === "mixed" ? mixedStr(f.value) : fracStr(f.value);
    case "ratio":
      return `${f.a}:${f.b}`;
  }
}

// ---- 式の計算 (自己テスト・問題づくり用) ----
// + − × ÷ ( ) と、整数・小数・分数 (3/4)・帯分数 (1と3/4) が書ける。分数の線はいちばん強く結びつく。

export function evalExpr(src: string): Frac {
  const s = src.replace(/\s+/g, "");
  let i = 0;
  const NUM = /(\d+)と(\d+)\/(\d+)|(\d+)\/(\d+)|(\d+(?:\.\d+)?)/y;

  function expr(): Frac {
    let v = term();
    while (s[i] === "+" || s[i] === "-") {
      const op = s[i++];
      const w = term();
      v = op === "+" ? fAdd(v, w) : fSub(v, w);
    }
    return v;
  }
  function term(): Frac {
    let v = atom();
    while (s[i] === "×" || s[i] === "÷") {
      const op = s[i++];
      const w = atom();
      v = op === "×" ? fMul(v, w) : fDiv(v, w);
    }
    return v;
  }
  function atom(): Frac {
    if (s[i] === "(") {
      i++;
      const v = expr();
      if (s[i] !== ")") throw new Error("missing )");
      i++;
      return v;
    }
    NUM.lastIndex = i;
    const m = NUM.exec(s);
    if (!m) throw new Error(`bad number at ${i} in ${src}`);
    i = NUM.lastIndex;
    if (m[1]) return frac(Number(m[1]) * Number(m[3]) + Number(m[2]), Number(m[3]));
    if (m[4]) return frac(Number(m[4]), Number(m[5]));
    return decFrac(m[6]);
  }
  const v = expr();
  if (i !== s.length) throw new Error(`trailing input in ${src}`);
  return v;
}
