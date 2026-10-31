import { normalize, tryParse } from "./parse";
import { formatCoef, formatPoly } from "./format";
import { cKey, gcd, isSquareFree, pConst, pDegree, pEq, poly, type Coef, type Poly } from "./value";

// 答えの採点。値が合っているかに加えて、「整理した形」かも確かめる (満点主義なので、約分忘れ・同類項の残りは直してもらう)。
//   ok      … 正解
//   form    … 値は合っているが、約分・整理・有理化などがまだ (「あと一歩」)
//   wrong   … まちがい
//   invalid … 読めない式

export type Verdict = "ok" | "form" | "wrong" | "invalid";

export type Answer =
  | { kind: "num"; value: Coef } // 整数・分数
  | { kind: "surd"; value: Coef } // √ を含む数
  | { kind: "expr"; value: Poly } // 整理した文字式
  | { kind: "exact"; value: Poly } // 文字式の表し方 (書き方まで決まっている)
  | { kind: "factor"; value: Poly } // 因数分解した形
  | { kind: "pair"; x: Coef; y: Coef } // 連立方程式の解
  | { kind: "roots"; values: [Coef, Coef] }; // 二次方程式の2つの解・平方根

/** 入力欄の数 (pair・roots は2つ) */
export function fieldCount(a: Answer): number {
  return a.kind === "pair" || a.kind === "roots" ? 2 : 1;
}

function sameCoef(p: Poly | null, c: Coef): boolean {
  if (!p) return false;
  const k = pConst(p);
  return k !== null && cKey(k) === cKey(c);
}

// ---- 形の決まり ----

/** 整数か、約分した分数 */
function isNumForm(s: string): boolean {
  const m = s.match(/^-?(\d+)(?:\/(\d+))?$/);
  if (!m) return false;
  if (/^-?0\d/.test(s)) return false;
  if (m[2] === undefined) return true;
  const n = Number(m[1]);
  const d = Number(m[2]);
  return d > 1 && gcd(n, d) === 1;
}

/** 項に分ける (いちばん外のかっこの外にある + − で切る) */
function splitTerms(s: string): string[] | null {
  const out: string[] = [];
  let depth = 0;
  let cur = "";
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
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

/** (中身)/n の形なら中身と n を返す */
function unwrapFraction(s: string): { inner: string; d: number; neg: boolean } | null {
  const m = s.match(/^(-?)\(([^()]+)\)\/(\d+)$/);
  if (!m) return null;
  return { neg: m[1] === "-", inner: m[2], d: Number(m[3]) };
}

/** √ を含む数の整理した形：√の中は平方因数なし、分母に√なし、同じ√はまとめる */
function isSurdForm(s: string): boolean {
  let body = s;
  let d = 1;
  const w = unwrapFraction(s);
  if (w) {
    body = w.inner;
    d = w.d;
    if (d < 2) return false;
  }
  const terms = splitTerms(body);
  if (!terms) return false;
  const roots = new Set<number>();
  const nums: number[] = [];
  for (const t of terms) {
    const m = t.match(/^-?(\d+)?(?:√(\d+))?(?:\/(\d+))?$/);
    if (!m || (!m[1] && !m[2])) return false;
    if (m[1] === "1" && m[2]) return false; // 1√2 とは書かない
    if (w && m[3]) return false;
    const k = m[2] ? Number(m[2]) : 1;
    if (m[2] && (k < 2 || !isSquareFree(k))) return false;
    if (roots.has(k)) return false;
    roots.add(k);
    const n = m[1] ? Number(m[1]) : 1;
    if (m[3]) {
      if (Number(m[3]) < 2 || gcd(n, Number(m[3])) !== 1) return false;
    }
    nums.push(n);
  }
  if (w) {
    const g = nums.reduce((acc, n) => gcd(acc, n), d);
    if (g !== 1) return false;
  }
  return true;
}

/** 整理した文字式：かっこなし (全体が (…)/n の形は可)、同類項なし、係数は約分ずみ */
function isExprForm(s: string): boolean {
  let body = s;
  const w = unwrapFraction(s);
  if (w) body = w.inner;
  if (/[()×*÷√]/.test(body)) return false;
  const terms = splitTerms(body);
  if (!terms) return false;
  const seen = new Set<string>();
  const nums: number[] = [];
  for (const t of terms) {
    const m = t.match(/^-?(\d+)?(?:\/(\d+))?((?:[a-z](?:\^\d+|[²³])?)*)(?:\/(\d+))?$/);
    if (!m) return false;
    const [, num, den1, vars, den2] = m;
    if (!num && !vars) return false;
    if (num === "1" && vars && !den1) return false; // 1x とは書かない
    if (den1 && !num) return false;
    if (den1 && den2) return false;
    const den = den1 ?? den2;
    const n = num ? Number(num) : 1;
    if (den && (Number(den) < 2 || gcd(n, Number(den)) !== 1)) return false;
    const letters = vars.replace(/\^\d+|[²³]/g, "");
    if (new Set(letters).size !== letters.length) return false;
    const p = vars ? tryParse(vars) : null;
    const mk = vars ? (p ? ([...p.keys()][0] ?? "") : vars) : "";
    if (seen.has(mk)) return false;
    seen.add(mk);
    nums.push(n);
  }
  if (w) {
    if (w.d < 2) return false;
    const g = nums.reduce((acc, n) => gcd(acc, n), w.d);
    if (g !== 1) return false;
  }
  return true;
}

/** 因数分解した形：単項式 × (一次式)(一次式)… 。かっこの中は共通因数をくくり出しずみ */
function isFactorForm(s: string, value: Poly): boolean {
  const m = s.match(/^(-?[0-9a-z^²³]*)((?:\([^()]+\)(?:\^\d+|[²³])?)+)$/);
  if (!m) return false;
  const factors = [...m[2].matchAll(/\(([^()]+)\)/g)].map((x) => x[1]);
  if (factors.length === 0) return false;
  for (const f of factors) {
    const p = tryParse(f);
    if (!p || pDegree(p) !== 1 || p.size < 2) return false;
    let g = 0;
    for (const c of p.values()) {
      const k = pConst(poly(c));
      const r = k && k.size === 1 && k.has(1) ? k.get(1)! : null;
      if (!r || r.d !== 1) return false;
      g = gcd(g, r.n);
    }
    if (g !== 1) return false;
  }
  // 単項式の部分がすでに整理されていて、かっこの外に何も残っていないこと
  if (m[1] && m[1] !== "-" && !isExprForm(m[1])) return false;
  return pDegree(value) >= 2;
}

function monoSorted(s: string): boolean {
  // 文字式の表し方：係数が先、文字はアルファベット順、同じ文字は指数でまとめる
  const m = s.match(/^-?(\d+)?((?:[a-z](?:\^\d+)?)+)$/);
  if (!m) return isExprForm(s);
  if (m[1] === "1") return false;
  const letters = m[2].replace(/\^\d+/g, "");
  if (new Set(letters).size !== letters.length) return false;
  return [...letters].join("") === [...letters].sort().join("");
}

// ---- 採点 ----

function judgeNum(input: string, value: Coef): Verdict {
  const s = normalize(input);
  const p = tryParse(s);
  if (!p) return "invalid";
  if (!sameCoef(p, value)) return "wrong";
  return isNumForm(s) ? "ok" : "form";
}

function judgeSurd(input: string, value: Coef): Verdict {
  const s = normalize(input);
  const p = tryParse(s);
  if (!p) return "invalid";
  if (!sameCoef(p, value)) return "wrong";
  return isNumForm(s) || isSurdForm(s) ? "ok" : "form";
}

export function judge(answer: Answer, inputs: string[]): Verdict[] {
  switch (answer.kind) {
    case "num":
      return [judgeNum(inputs[0] ?? "", answer.value)];
    case "surd":
      return [judgeSurd(inputs[0] ?? "", answer.value)];
    case "expr":
    case "exact":
    case "factor": {
      const s = normalize(inputs[0] ?? "").replace(/²/g, "^2").replace(/³/g, "^3");
      const p = tryParse(s);
      if (!p) return ["invalid"];
      if (!pEq(p, answer.value)) return ["wrong"];
      if (answer.kind === "expr") return [isExprForm(s) ? "ok" : "form"];
      if (answer.kind === "exact") return [monoSorted(s) ? "ok" : "form"];
      return [isFactorForm(s, answer.value) ? "ok" : "form"];
    }
    case "pair":
      return [judgeNum(inputs[0] ?? "", answer.x), judgeNum(inputs[1] ?? "", answer.y)];
    case "roots": {
      const [a, b] = answer.values;
      const r0 = [judgeSurd(inputs[0] ?? "", a), judgeSurd(inputs[1] ?? "", b)];
      const r1 = [judgeSurd(inputs[0] ?? "", b), judgeSurd(inputs[1] ?? "", a)];
      const score = (r: Verdict[]) => r.filter((v) => v === "ok").length * 2 + r.filter((v) => v === "form").length;
      return score(r1) > score(r0) ? r1 : r0;
    }
  }
}

/** 正解の文字列 (MathText で描く)。因数分解などは問題側が show を持つ */
export function answerText(a: Answer): string[] {
  switch (a.kind) {
    case "num":
    case "surd":
      return [formatCoef(a.value)];
    case "expr":
    case "exact":
    case "factor":
      return [formatPoly(a.value)];
    case "pair":
      return [formatCoef(a.x), formatCoef(a.y)];
    case "roots":
      return a.values.map(formatCoef);
  }
}
