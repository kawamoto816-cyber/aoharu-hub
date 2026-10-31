import { normalize, tryParse } from "../math/parse";
import { formatCoef, formatPoly } from "../math/format";
import { judge as mathJudge } from "../math/check";
import { cAdd, cKey, cNeg, gcd, isSquareFree, pConst, pDegree, pEq, pKey, pNeg, parseMonoKey, type Coef, type Poly } from "../math/value";
import { evalNode, formIssue, hasTopC, mentionsC, prep, tryNode, type Node } from "./expr";

// 高校数学 計算○段の採点。値が合っているかに加えて「答えの形」も確かめる (満点主義)。
//   ok      … 正解
//   form    … 値は合っているが、約分・有理化・整理・因数分解の続きなどがまだ (「形をなおそう」)
//   wrong   … まちがい
//   invalid … 読めない
// 数・式の読み取りと形の決まりは lib/math (中学数学) のものを使う。全角・空白・≦≧ のゆれは受けつける。

export type Verdict = "ok" | "form" | "wrong" | "invalid";

export interface Judged {
  v: Verdict;
  msg?: string;
}

/** 不等式の解の端 */
export interface Bound {
  c: Coef;
  closed: boolean;
}
/** 区間 (lo がなければ −∞、hi がなければ +∞) */
export interface Interval {
  lo?: Bound;
  hi?: Bound;
}
/** 不等式の解。all = すべての実数、parts が空 = 解なし */
export type SolSet = { all: true } | { all?: false; parts: Interval[] };

/** 答えの欄1つ分 */
export type Field =
  /** 数 (整数・分数・√ を含む数)。alt は形がちがってもよい書き方 (例 1/√2) */
  | { kind: "num"; value: Coef; alt?: string[] }
  /** 展開・整理した式 */
  | { kind: "expr"; value: Poly }
  /** 因数分解した式 */
  | { kind: "factor"; value: Poly }
  /** 複素数 a+bi */
  | { kind: "complex"; re: Coef; im: Coef }
  /** 不等式の解 (v は文字) */
  | { kind: "ineq"; value: SolSet; v: string }
  /** n進法の数字の並び */
  | { kind: "digits"; value: string }
  /** π・e・log を含む数 (value は正解の書き方。値をくらべて採点する) */
  | { kind: "real"; value: string }
  /** 関数・数列の式 (v は文字。いくつかの点で値をくらべる)。upToConst なら不定積分 (+C を書く) */
  | { kind: "func"; value: string; v: string; upToConst?: boolean };

export const ALL_REAL = "すべての実数";
export const NO_SOL = "解なし";

const OK: Judged = { v: "ok" };
const WRONG: Judged = { v: "wrong" };
const INVALID: Judged = { v: "invalid" };

/** Coef のおよその値 (大小を比べるため) */
export function cNum(c: Coef): number {
  let s = 0;
  for (const [k, v] of c) s += (v.n / v.d) * Math.sqrt(k);
  return s;
}

const cEq = (a: Coef, b: Coef) => cKey(a) === cKey(b);

// ---- 数 ----

function judgeNum(input: string, value: Coef, alt?: string[]): Judged {
  const s = normalize(input);
  if (!s) return INVALID;
  const [r] = mathJudge({ kind: "surd", value }, [s]);
  if (r === "form" && alt?.includes(s)) return OK;
  if (r === "form") return { v: "form", msg: "値は合っています。約分・√ の中を簡単に・分母の有理化をして、いちばん簡単な形にしよう。" };
  return { v: r };
}

// ---- 式 ----

function judgeExpr(input: string, value: Poly): Judged {
  const s = normalize(input).replace(/²/g, "^2").replace(/³/g, "^3");
  if (!s) return INVALID;
  const [r] = mathJudge({ kind: "expr", value }, [s]);
  if (r === "form") return { v: "form", msg: "値は合っています。かっこをはずして、同類項をまとめた形にしよう。" };
  return { v: r };
}

/** 二次の因数がこれ以上 (有理数の範囲で) 分解できないか */
function irreducible(p: Poly): boolean {
  const d = pDegree(p);
  if (d === 1) return true;
  if (d !== 2) return false;
  const vars = new Set<string>();
  for (const k of p.keys()) for (const v of Object.keys(parseMonoKey(k))) vars.add(v);
  const coefOf = (key: string) => {
    const c = p.get(key);
    if (!c) return 0;
    const r = c.get(1);
    return r ? r.n / r.d : 0;
  };
  let a: number, b: number, c: number;
  if (vars.size === 1) {
    const [x] = [...vars];
    a = coefOf(`${x}2`);
    b = coefOf(`${x}1`);
    c = coefOf("");
  } else if (vars.size === 2) {
    // 2文字は同次式 (x²+xy+y² のような形) だけを考える
    for (const k of p.keys()) {
      const m = parseMonoKey(k);
      if (Object.values(m).reduce((s, e) => s + e, 0) !== 2) return false;
    }
    const [x, y] = [...vars].sort();
    a = coefOf(`${x}2`);
    b = coefOf(`${x}1${y}1`);
    c = coefOf(`${y}2`);
  } else return false;
  const D = b * b - 4 * a * c;
  if (D < 0) return true;
  const r = Math.round(Math.sqrt(D));
  return r * r !== D;
}

/** 因数分解した形：単項式 × (因数)(因数)… 。因数は整数係数で共通因数なし、これ以上分解できない */
function isFactored(s: string): boolean {
  const m = s.match(/^(-?[0-9a-z^]*)((?:\([^()]+\)(?:\^\d+)?)+)$/);
  if (!m) return false;
  const pre = m[1];
  if (pre && pre !== "-") {
    const mm = pre.match(/^-?(\d*)((?:[a-z](?:\^\d+)?)*)$/);
    if (!mm) return false;
    if (mm[1] === "1" || mm[1] === "0" || /^0/.test(mm[1])) return false;
    const letters = mm[2].replace(/\^\d+/g, "");
    if (new Set(letters).size !== letters.length) return false;
  }
  const seen = new Set<string>();
  for (const [, f, e] of m[2].matchAll(/\(([^()]+)\)(?:\^(\d+))?/g)) {
    if (e !== undefined && Number(e) < 2) return false;
    const p = tryParse(f);
    if (!p || p.size < 2) return false;
    let g = 0;
    for (const c of p.values()) {
      if (c.size !== 1 || !c.has(1)) return false;
      const r = c.get(1)!;
      if (r.d !== 1) return false;
      g = gcd(g, r.n);
    }
    if (g !== 1) return false;
    if (mathJudge({ kind: "expr", value: p }, [f])[0] !== "ok") return false;
    if (!irreducible(p)) return false;
    const k = pKey(p);
    if (seen.has(k) || seen.has(pKey(pNeg(p)))) return false; // 同じ因数は ( )² にまとめる
    seen.add(k);
  }
  return true;
}

function judgeFactor(input: string, value: Poly): Judged {
  const s = normalize(input).replace(/²/g, "^2").replace(/³/g, "^3");
  if (!s) return INVALID;
  const p = tryParse(s);
  if (!p) return INVALID;
  if (!pEq(p, value)) return WRONG;
  if (isFactored(s)) return OK;
  return { v: "form", msg: "値は合っています。共通因数をくくり出したか、かっこの中がまだ因数分解できないか、同じ因数は ( )² にまとめたか確かめよう。" };
}

// ---- 複素数 ----

function splitTerms(s: string): string[] | null {
  const out: string[] = [];
  let depth = 0;
  let cur = "";
  for (const c of s) {
    if (c === "(") depth++;
    if (c === ")") depth--;
    if (depth < 0) return null;
    if (depth === 0 && (c === "+" || c === "-") && cur !== "") {
      out.push(cur);
      cur = c === "-" ? "-" : "";
    } else cur += c;
  }
  if (depth !== 0) return null;
  if (cur) out.push(cur);
  return out;
}

/** a+bi の形 (i² なし、実部と虚部が1つずつ、分数は約分ずみ、√ は簡単に) */
function isComplexForm(s: string): boolean {
  if (s === "0") return true;
  let body = s;
  let d = 1;
  const w = s.match(/^\(([^()]+)\)\/(\d+)$/);
  if (w) {
    body = w[1];
    d = Number(w[2]);
    if (d < 2) return false;
  }
  const terms = splitTerms(body);
  if (!terms || terms.length === 0 || terms.length > 2) return false;
  let hasRe = false;
  let hasIm = false;
  const nums: number[] = [];
  for (const t of terms) {
    const m = w ? t.match(/^-?(\d+)?(?:√(\d+))?()(i)?()$/) : t.match(/^-?(\d+)?(?:√(\d+))?(?:\/(\d+))?(i)?(?:\/(\d+))?$/);
    if (!m) return false;
    const [, num, root, den1, isI, den2] = m;
    if (!num && !root && !isI) return false;
    if (num !== undefined && (/^0/.test(num) || (num === "1" && (root || (isI && !den1 && !den2))))) return false;
    if (den1 && den2) return false;
    const den = den1 || den2;
    const n = num ? Number(num) : 1;
    if (den && (Number(den) < 2 || gcd(n, Number(den)) !== 1)) return false;
    if (root && (Number(root) < 2 || !isSquareFree(Number(root)))) return false;
    if (isI) {
      if (hasIm) return false;
      hasIm = true;
    } else {
      if (hasRe) return false;
      hasRe = true;
    }
    nums.push(n);
  }
  if (w && nums.reduce((g, n) => gcd(g, n), d) !== 1) return false;
  return true;
}

function judgeComplex(input: string, re: Coef, im: Coef): Judged {
  const s = normalize(input).replace(/²/g, "^2").replace(/³/g, "^3");
  if (!s) return INVALID;
  const p = tryParse(s);
  if (!p) return INVALID;
  let r: Coef = new Map();
  let m: Coef = new Map();
  let raw = true;
  for (const [k, c] of p) {
    const mono = parseMonoKey(k);
    if (Object.keys(mono).some((v) => v !== "i")) return WRONG;
    const e = mono.i ?? 0;
    if (e >= 2) raw = false;
    const q = e % 4;
    if (q === 0) r = cAdd(r, c);
    else if (q === 1) m = cAdd(m, c);
    else if (q === 2) r = cAdd(r, cNeg(c));
    else m = cAdd(m, cNeg(c));
  }
  if (!cEq(r, re) || !cEq(m, im)) return WRONG;
  if (raw && isComplexForm(s)) return OK;
  return { v: "form", msg: "値は合っています。i² = −1 を使って、a+bi の形 (実部と虚部をまとめ、約分した形) にしよう。" };
}

export function formatComplex(re: Coef, im: Coef): string {
  const r = re.size ? formatCoef(re) : "";
  if (!im.size) return r || "0";
  const is = formatCoef(im);
  const body = is === "1" ? "i" : is === "-1" ? "-i" : `${is}i`;
  if (!r) return body;
  return body.startsWith("-") ? `${r}${body}` : `${r}+${body}`;
}

// ---- 不等式 ----

function prepIneq(input: string): string {
  return input
    .replace(/≦|<=|=</g, "≤")
    .replace(/≧|>=|=>/g, "≥")
    .replace(/＜/g, "<")
    .replace(/＞/g, ">")
    .replace(/!=|≠/g, "≠")
    .replace(/＝/g, "=")
    .replace(/または|or/g, ",")
    .replace(/[、，,;；]/g, ",")
    .replace(/[\s　]+/g, "");
}

const flipOp: Record<string, string> = { "<": ">", ">": "<", "≤": "≥", "≥": "≤", "=": "=", "≠": "≠" };

function constOf(src: string): Coef | null {
  const p = tryParse(src);
  if (!p) return null;
  return pConst(p);
}

/** 区間が空か */
function emptyInterval(iv: Interval): boolean {
  if (!iv.lo || !iv.hi) return false;
  const a = cNum(iv.lo.c);
  const b = cNum(iv.hi.c);
  if (cEq(iv.lo.c, iv.hi.c)) return !(iv.lo.closed && iv.hi.closed);
  return a > b;
}

/** 区間を並べて、重なり・つながりをまとめる */
export function canon(set: SolSet): SolSet {
  if (set.all) return set;
  const parts = set.parts.filter((iv) => !emptyInterval(iv));
  parts.sort((x, y) => (x.lo ? cNum(x.lo.c) : -Infinity) - (y.lo ? cNum(y.lo.c) : -Infinity));
  const out: Interval[] = [];
  for (const iv of parts) {
    const last = out[out.length - 1];
    if (last) {
      // last.hi と iv.lo がつながるか
      const touch = !last.hi || !iv.lo || cNum(iv.lo.c) < cNum(last.hi.c) - 1e-12 || (cEq(iv.lo.c, last.hi.c) && (iv.lo.closed || last.hi.closed));
      if (touch) {
        const hi = !last.hi || !iv.hi ? undefined : cNum(iv.hi.c) > cNum(last.hi.c) + 1e-12 || (cEq(iv.hi.c, last.hi.c) && iv.hi.closed) ? iv.hi : last.hi;
        out[out.length - 1] = { lo: last.lo, hi };
        continue;
      }
    }
    out.push({ ...iv });
  }
  if (out.length === 1 && !out[0].lo && !out[0].hi) return { all: true };
  return { parts: out };
}

/** 2つの解の共通部分 (連立不等式) */
export function intersect(a: SolSet, b: SolSet): SolSet {
  if (a.all) return canon(b);
  if (b.all) return canon(a);
  const out: Interval[] = [];
  const maxLo = (x?: Bound, y?: Bound) => (!x ? y : !y ? x : cEq(x.c, y.c) ? { c: x.c, closed: x.closed && y.closed } : cNum(x.c) > cNum(y.c) ? x : y);
  const minHi = (x?: Bound, y?: Bound) => (!x ? y : !y ? x : cEq(x.c, y.c) ? { c: x.c, closed: x.closed && y.closed } : cNum(x.c) < cNum(y.c) ? x : y);
  for (const p of a.parts) for (const q of b.parts) out.push({ lo: maxLo(p.lo, q.lo), hi: minHi(p.hi, q.hi) });
  return canon({ parts: out });
}

function setEq(a: SolSet, b: SolSet): boolean {
  const x = canon(a);
  const y = canon(b);
  if (x.all || y.all) return !!x.all && !!y.all;
  if (x.parts.length !== y.parts.length) return false;
  const bEq = (p?: Bound, q?: Bound) => (!p && !q) || (!!p && !!q && p.closed === q.closed && cEq(p.c, q.c));
  return x.parts.every((iv, i) => bEq(iv.lo, y.parts[i].lo) && bEq(iv.hi, y.parts[i].hi));
}

/** 生徒の書いた不等式の解を読む。eps は端の数の書き方 (形の確認用) */
export function parseSol(input: string, v: string): { set: SolSet; eps: string[] } | null {
  const s = prepIneq(input);
  if (/^(すべての実数|全ての実数|実数全体|すべての実数[a-z])$/.test(s)) return { set: { all: true }, eps: [] };
  if (/^(解なし|解はない|なし)$/.test(s)) return { set: { parts: [] }, eps: [] };
  const parts: Interval[] = [];
  const eps: string[] = [];
  const isV = (x: string) => normalize(x) === v;
  const bound = (src: string, closed: boolean): Bound | null => {
    const c = constOf(src);
    if (!c) return null;
    eps.push(src);
    return { c, closed };
  };
  const pieces = s.split(",").filter(Boolean);
  if (!pieces.length) return null;
  for (const piece of pieces) {
    const t = piece.split(/(≤|≥|<|>|=|≠)/);
    if (t.length === 3) {
      let [A, op, B] = t;
      if (isV(B) && !isV(A)) {
        [A, B] = [B, A];
        op = flipOp[op];
      }
      if (!isV(A)) return null;
      const b = bound(B, op === "≤" || op === "≥" || op === "=");
      if (!b) return null;
      if (op === "<" || op === "≤") parts.push({ hi: b });
      else if (op === ">" || op === "≥") parts.push({ lo: b });
      else if (op === "=") parts.push({ lo: b, hi: b });
      else parts.push({ hi: { c: b.c, closed: false } }, { lo: { c: b.c, closed: false } });
    } else if (t.length === 5) {
      const [A, op1, X, op2, B] = t;
      if (!isV(X)) return null;
      const up = (o: string) => o === "<" || o === "≤";
      const down = (o: string) => o === ">" || o === "≥";
      if (up(op1) && up(op2)) {
        const lo = bound(A, op1 === "≤");
        const hi = bound(B, op2 === "≤");
        if (!lo || !hi) return null;
        parts.push({ lo, hi });
      } else if (down(op1) && down(op2)) {
        const hi = bound(A, op1 === "≥");
        const lo = bound(B, op2 === "≥");
        if (!lo || !hi) return null;
        parts.push({ lo, hi });
      } else return null;
    } else return null;
  }
  return { set: { parts }, eps };
}

function judgeIneq(input: string, value: SolSet, v: string): Judged {
  if (!input.trim()) return INVALID;
  const r = parseSol(input, v);
  if (!r) return { v: "invalid", msg: `${v}<3、-2<${v}≤5、${v}<-1, 3<${v} のような形で書こう。` };
  if (!setEq(r.set, value)) return WRONG;
  for (const e of r.eps) {
    const c = constOf(e)!;
    if (mathJudge({ kind: "surd", value: c }, [e])[0] !== "ok") return { v: "form", msg: "解は合っています。境目の数を約分・有理化・√ の簡単化して書こう。" };
  }
  return OK;
}

export function formatSol(set: SolSet, v: string): string {
  const s = canon(set);
  if (s.all) return ALL_REAL;
  if (!s.parts.length) return NO_SOL;
  const many = s.parts.length > 1;
  return s.parts
    .map(({ lo, hi }) => {
      if (lo && hi && cEq(lo.c, hi.c)) return `${v}=${formatCoef(lo.c)}`;
      if (lo && hi) return `${formatCoef(lo.c)}${lo.closed ? "≤" : "<"}${v}${hi.closed ? "≤" : "<"}${formatCoef(hi.c)}`;
      if (hi) return `${v}${hi.closed ? "≤" : "<"}${formatCoef(hi.c)}`;
      if (lo) return many ? `${formatCoef(lo.c)}${lo.closed ? "≤" : "<"}${v}` : `${v}${lo.closed ? "≥" : ">"}${formatCoef(lo.c)}`;
      return ALL_REAL;
    })
    .join(", ");
}

// ---- n進法 ----

function judgeDigits(input: string, value: string): Judged {
  const s = input
    .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/[（]/g, "(")
    .replace(/[）]/g, ")")
    .replace(/[\s　]+/g, "")
    .replace(/_?\(\d+\)$/, "");
  if (!/^\d+$/.test(s)) return INVALID;
  if (s === value) return OK;
  if (s.replace(/^0+(?=\d)/, "") === value) return { v: "form", msg: "値は合っています。先頭の 0 は書かないようにしよう。" };
  return WRONG;
}

// ---- π・e・関数を含む式 ----

/** 値をくらべる点 (数列の文字 n は自然数、それ以外は実数) */
const XS = [-5.3, -4.6, -3.7, -2.6, -1.7, -1.1, -0.45, 0.35, 0.7, 1.3, 1.9, 2.45, 3.3, 4.1, 5.2];
const NS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const pointsOf = (v: string) => (v === "n" ? NS : XS);

const close = (a: number, b: number) => Math.abs(a - b) <= 1e-8 * Math.max(1, Math.abs(a), Math.abs(b));

const refCache = new Map<string, Node>();
function refNode(src: string, vars: string[]): Node {
  const key = `${vars.join("")}|${src}`;
  let n = refCache.get(key);
  if (!n) {
    n = tryNode(src, vars) ?? undefined;
    if (!n) throw new Error(`bad answer src ${src}`);
    refCache.set(key, n);
  }
  return n;
}

function judgeReal(input: string, value: string): Judged {
  if (!prep(input)) return INVALID;
  const n = tryNode(input);
  if (!n) return { v: "invalid", msg: "式として読めませんでした。π は π、自然対数は log、分数は 3/4 のように書こう。" };
  const got = evalNode(n);
  const want = evalNode(refNode(value, []));
  if (!Number.isFinite(got) || !close(got, want)) return WRONG;
  const f = formIssue(n);
  return f ? { v: "form", msg: f } : OK;
}

function judgeFunc(input: string, value: string, v: string, upToConst?: boolean): Judged {
  if (!prep(input)) return INVALID;
  const n = tryNode(input, [v], !!upToConst);
  if (!n) return { v: "invalid", msg: `式として読めませんでした。文字は ${v}、かけ算の記号は省いてよい (2${v}${v === "x" ? "、x sin x" : ""})。分母が式なら 1/(${v}+1) のようにかっこでくくろう。` };
  const ref = refNode(value, [v]);
  let diff: number | null = null;
  let matched = 0;
  let missing = 0;
  for (const p of pointsOf(v)) {
    const want = evalNode(ref, { [v]: p });
    if (!Number.isFinite(want)) continue;
    const got = evalNode(n, { [v]: p, C: 0 });
    if (!Number.isFinite(got)) {
      missing++;
      continue;
    }
    if (upToConst) {
      if (diff === null) diff = got - want;
      else if (!close(got - diff, want)) return WRONG;
    } else if (!close(got, want)) return WRONG;
    matched++;
  }
  if (matched < 3) return WRONG;
  if (missing) {
    if (value.includes("|")) return { v: "form", msg: "log の中が負になるところでも成り立つように、絶対値をつけよう (例 log|x|、log|2x+1|)。" };
    return WRONG;
  }
  if (upToConst && !hasTopC(n)) return { v: "form", msg: mentionsC(n) ? "積分定数 C は、最後に +C と書こう。" : "値は合っています。積分定数 C をつけよう (例 x^2+C)。" };
  const f = formIssue(n);
  return f ? { v: "form", msg: f } : OK;
}

// ---- まとめ ----

export function judgeField(f: Field, input: string): Judged {
  switch (f.kind) {
    case "num":
      return judgeNum(input, f.value, f.alt);
    case "expr":
      return judgeExpr(input, f.value);
    case "factor":
      return judgeFactor(input, f.value);
    case "complex":
      return judgeComplex(input, f.re, f.im);
    case "ineq":
      return judgeIneq(input, f.value, f.v);
    case "digits":
      return judgeDigits(input, f.value);
    case "real":
      return judgeReal(input, f.value);
    case "func":
      return judgeFunc(input, f.value, f.v, f.upToConst);
  }
}

function perms(n: number): number[][] {
  if (n <= 1) return [[0]];
  const out: number[][] = [];
  for (const p of perms(n - 1)) for (let i = 0; i <= p.length; i++) out.push([...p.slice(0, i), n - 1, ...p.slice(i)]);
  return out;
}

/** 1問分を採点する。unordered なら欄の順番は問わない (解が2つ など) */
export function judge(fields: Field[], inputs: string[], unordered = false): Judged[] {
  if (!unordered || fields.length < 2) return fields.map((f, i) => judgeField(f, inputs[i] ?? ""));
  const score = (r: Judged[]) => r.reduce((s, x) => s + (x.v === "ok" ? 2 : x.v === "form" ? 1 : 0), 0);
  let best: Judged[] | null = null;
  for (const p of perms(fields.length)) {
    const r = p.map((fi, i) => judgeField(fields[fi], inputs[i] ?? ""));
    if (!best || score(r) > score(best)) best = r;
  }
  return best!;
}

/** 正解の見せ方 (欄ごと) */
export function fieldText(f: Field): string {
  switch (f.kind) {
    case "num":
      return formatCoef(f.value);
    case "expr":
    case "factor":
      return formatPoly(f.value);
    case "complex":
      return formatComplex(f.re, f.im);
    case "ineq":
      return formatSol(f.value, f.v);
    case "digits":
      return f.value;
    case "real":
      return f.value;
    case "func":
      return f.upToConst ? `${f.value}+C` : f.value;
  }
}
