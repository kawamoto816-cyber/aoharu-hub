// 高校数学 計算○段の自己テスト: 全段で問題を大量に作り、
//   1. 正解の見せ方が採点で ok になる
//   2. わざとずらした答えが ok にならない
//   3. 形だけちがう答え (約分していない・展開したまま・i² を残す など) が form になる
//   4. 答えがきれいな範囲 (分母・√の中・大きさ) におさまる
//   5. 方程式は解を代入して成り立つ、1セット10問がそろう
//   6. 数学B・Ⅲ・C の答え (π・e・関数を含む) は、数列・微分・積分・極限・接線を数値で計算しなおして合う
// を確かめる。 npx tsx scripts/kousuu-selftest.ts
import { makeSet, type Problem, type Verify } from "../lib/kousuu/gen";
import { evalNode, evalSrc, parseNode } from "../lib/kousuu/expr";
import { STEPS, STEP_COUNT } from "../lib/kousuu/steps";
import { ALL_REAL, NO_SOL, canon, cNum, fieldText, pointsOf, formatComplex, formatSol, judge, judgeField, parseSol, type Field, type SolSet } from "../lib/kousuu/check";
import { parseExpr } from "../lib/math/parse";
import { formatCoef, formatPoly } from "../lib/math/format";
import { cAdd, coef, gcd, pAdd, pNum, pSub, pSubst, type Coef } from "../lib/math/value";

function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

let bad = 0;
const fail = (...a: unknown[]) => {
  bad++;
  if (bad < 60) console.log("NG", ...a);
};

/** 分母を2倍にした (約分していない) 書き方 */
function unreduced(c: Coef): string {
  const terms = [...c].sort(([a], [b]) => a - b);
  if (!terms.length) return "0/2";
  const L = terms.reduce((acc, [, v]) => (acc / gcd(acc, v.d)) * v.d, 1);
  let s = "";
  for (const [k, v] of terms) {
    const n = (2 * v.n * L) / v.d;
    const sign = n < 0 ? "-" : s ? "+" : "";
    s += k === 1 ? `${sign}${Math.abs(n)}` : `${sign}${Math.abs(n)}√${k}`;
  }
  return `(${s})/${2 * L}`;
}

function shiftSol(set: SolSet): SolSet {
  if (set.all) return { parts: [] };
  if (!set.parts.length) return { all: true };
  const [first, ...rest] = set.parts;
  const b = first.lo ?? first.hi!;
  const moved = { c: cAdd(b.c, coef(1)), closed: b.closed };
  return { parts: [first.lo ? { ...first, lo: moved } : { ...first, hi: moved }, ...rest] };
}

/** ずらした (まちがった) 答え */
function wrongOf(f: Field): string {
  switch (f.kind) {
    case "num":
      return formatCoef(cAdd(f.value, coef(1)));
    case "expr":
    case "factor":
      return formatPoly(pAdd(f.value, pNum(1)));
    case "complex":
      return formatComplex(cAdd(f.re, coef(1)), f.im);
    case "ineq":
      return formatSol(shiftSol(f.value), f.v);
    case "digits":
      return f.value + "1";
    case "real":
      return `${f.value}+1`;
    case "func":
      return f.upToConst ? `${f.value}+${f.v}+C` : `${f.value}+1`;
  }
}

/** 形だけちがう答え (null なら作らない) */
function formOf(f: Field, show: string): string | null {
  switch (f.kind) {
    case "num":
      return unreduced(f.value);
    case "expr":
      return `(${show})`;
    case "factor":
      return formatPoly(f.value);
    case "complex":
      return `${show}+i^2+1`;
    case "ineq": {
      const c = canon(f.value);
      if (c.all || !c.parts.length) return null;
      const b = c.parts[0].lo ?? c.parts[0].hi!;
      const s = formatCoef(b.c);
      const out = show.replace(s, `(${s})*2/2`);
      return out === show ? null : out;
    }
    case "digits":
      return `0${show}`;
    case "real":
      return `2/2*(${show})`;
    case "func":
      return f.upToConst ? f.value : `2/2*(${show})`;
  }
}

// ---- 数値で確かめる (数学B・Ⅲ・C) ----

const near = (a: number, b: number, tol: number) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));

/** 1つ目の欄の値 (文字 v の関数として) */
function answerFn(f: Field): ((t: number) => number) | null {
  if (f.kind === "num") return () => cNum(f.value);
  if (f.kind === "real") {
    const n = parseNode(f.value);
    return () => evalNode(n);
  }
  if (f.kind === "func") {
    const n = parseNode(f.value, [f.v]);
    return (t) => evalNode(n, { [f.v]: t });
  }
  if (f.kind === "expr") {
    const n = parseNode(formatPoly(f.value), ["x"]);
    return (t) => evalNode(n, { x: t });
  }
  return null;
}

function simpson(g: (x: number) => number, a: number, b: number, n = 4000): number {
  const h = (b - a) / n;
  let s = g(a) + g(b);
  for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * g(a + i * h);
  return (s * h) / 3;
}

function checkVerify(vf: Verify, f: Field): string | null {
  const ans = answerFn(f);
  if (!ans) return "no answer fn";
  const v = f.kind === "func" ? f.v : "x";
  const fn = (src: string, w = v) => {
    const n = parseNode(src, [w]);
    return (t: number) => evalNode(n, { [w]: t });
  };
  const xs = pointsOf(v);
  if ("seq" in vf) {
    for (let i = 0; i < vf.seq.length; i++) if (!near(ans(i + 1), vf.seq[i], 1e-9)) return `seq n=${i + 1}: ${ans(i + 1)} vs ${vf.seq[i]}`;
    return null;
  }
  if ("deriv" in vf || "anti" in vf) {
    const [F, g] = "deriv" in vf ? [fn(vf.deriv), ans] : [ans, fn(vf.anti)];
    let used = 0;
    for (const x of xs) {
      const h = 1e-5;
      const d = (F(x + h) - F(x - h)) / (2 * h);
      const want = g(x);
      if (!Number.isFinite(want) || !Number.isFinite(d) || Math.abs(want) > 1e4) continue;
      used++;
      if (!near(d, want, 1e-5)) return `deriv at ${x}: ${d} vs ${want}`;
    }
    return used >= 3 ? null : "too few points";
  }
  if ("integral" in vf) {
    const [src, A, B] = vf.integral;
    const val = simpson(fn(src, "x"), evalSrc(A), evalSrc(B));
    return near(ans(0), val, 2e-5) ? null : `integral ${ans(0)} vs ${val}`;
  }
  if ("limit" in vf) {
    const [src, w, to] = vf.limit;
    const g = fn(src, w);
    const want = ans(0);
    if (to === "inf") {
      const N = 2000;
      const r1 = 2 * g(2 * N) - g(N);
      const r2 = 2 * g(4 * N) - g(2 * N);
      const v2 = Number.isFinite(r1) && Number.isFinite(r2) ? r2 : g(60);
      return near(v2, want, 1e-4) ? null : `limit ${v2} vs ${want}`;
    }
    const a = evalSrc(to);
    for (const s of [1, -1]) {
      const h = 1e-3 * s;
      const v1 = 2 * g(a + h / 2) - g(a + h);
      if (!near(v1, want, 1e-4)) return `limit side ${s}: ${v1} vs ${want}`;
    }
    return null;
  }
  if ("tangent" in vf) {
    const F = fn(vf.tangent[0], "x");
    const a = evalSrc(vf.tangent[1]);
    const h = 1e-5;
    const m = (F(a + h) - F(a - h)) / (2 * h);
    for (const x of [a - 1, a, a + 2]) if (!near(ans(x), F(a) + m * (x - a), 1e-6)) return `tangent at ${x}`;
    return null;
  }
  if ("inverse" in vf) {
    const F = fn(vf.inverse, "x");
    let used = 0;
    for (const x of xs) {
      const y = ans(x);
      if (!Number.isFinite(y)) continue;
      used++;
      if (!near(F(y), x, 1e-8)) return `inverse at ${x}`;
    }
    return used >= 3 ? null : "too few points";
  }
  return "unknown verify";
}

/** きれいな数か */
function clean(c: Coef): boolean {
  for (const [k, v] of c) {
    if (k > 300 || v.d > 1300 || Math.abs(v.n / v.d) > 100000) return false;
  }
  return true;
}

function holds(eq: string, x: Coef): boolean {
  const [l, r] = eq.split("=");
  return pSubst(pSub(parseExpr(l), parseExpr(r)), { x }).size === 0;
}

// 採点そのものの確認 (ゆれの受けつけ)
const sanity: [Field, string, string][] = [
  [{ kind: "ineq", v: "x", value: parseSol("x<-1, 3<x", "x")!.set }, "x＜−1，3＜x", "ok"],
  [{ kind: "ineq", v: "x", value: parseSol("-2<x≤5", "x")!.set }, "-2 < x <= 5", "ok"],
  [{ kind: "ineq", v: "x", value: parseSol("-2<x≤5", "x")!.set }, "5≧x＞-2", "ok"],
  [{ kind: "ineq", v: "x", value: parseSol("x≥3", "x")!.set }, "3≦x", "ok"],
  [{ kind: "ineq", v: "x", value: { all: true } }, ALL_REAL, "ok"],
  [{ kind: "ineq", v: "x", value: { parts: [] } }, NO_SOL, "ok"],
  [{ kind: "ineq", v: "x", value: parseSol("x<2, 2<x", "x")!.set }, "x≠2", "ok"],
  [{ kind: "ineq", v: "x", value: parseSol("x<1-√2, 1+√2<x", "x")!.set }, "x<1-√2,1+√2<x", "ok"],
  [{ kind: "ineq", v: "x", value: parseSol("x<3", "x")!.set }, "x<6/2", "form"],
  [{ kind: "num", value: coef(1, 2) }, "√２", "ok"],
  [{ kind: "num", value: coef({ n: 1, d: 2 }, 2) }, "1/√2", "form"],
  [{ kind: "num", value: coef({ n: 1, d: 2 }, 2), alt: ["1/√2"] }, "1/√2", "ok"],
  [{ kind: "complex", re: coef({ n: 1, d: 5 }), im: coef({ n: 7, d: 5 }) }, "(1+7i)/5", "ok"],
  [{ kind: "complex", re: coef({ n: 1, d: 5 }), im: coef({ n: 7, d: 5 }) }, "1/5 + 7/5 i", "ok"],
  [{ kind: "complex", re: coef(11), im: coef(-10) }, "3-10i-8i^2", "form"],
  [{ kind: "factor", value: parseExpr("(x+1)(x-1)(x^2+1)") }, "(x^2+1)(x+1)(x-1)", "ok"],
  [{ kind: "factor", value: parseExpr("(x+1)(x-1)(x^2+1)") }, "(x^2-1)(x^2+1)", "form"],
  [{ kind: "factor", value: parseExpr("2(x+3)(x-3)") }, "(2x+6)(x-3)", "form"],
  [{ kind: "factor", value: parseExpr("(x+2)^2") }, "(x+2)(x+2)", "form"],
  [{ kind: "factor", value: parseExpr("(x+2)(x^2-2x+4)") }, "(x+2)(x²-2x+4)", "ok"],
  [{ kind: "digits", value: "101101" }, "101101(2)", "ok"],
  // π・e・関数を含む答え
  [{ kind: "real", value: "π/4" }, "π/4", "ok"],
  [{ kind: "real", value: "π/4" }, "pi/4", "ok"],
  [{ kind: "real", value: "π/4" }, "2π/8", "form"],
  [{ kind: "real", value: "(e^2+1)/4" }, "e^2/4+1/4", "ok"],
  [{ kind: "real", value: "(e^2+1)/4" }, "(2e^2+2)/8", "form"],
  [{ kind: "real", value: "2log 2" }, "log4", "form"],
  [{ kind: "real", value: "2log 2" }, "2log2", "ok"],
  [{ kind: "real", value: "1/2log 2" }, "log√2", "form"],
  [{ kind: "real", value: "1/2log 2" }, "(log 2)/2", "ok"],
  [{ kind: "real", value: "e-1" }, "e^1-1", "form"],
  [{ kind: "real", value: "1.5" }, "3/2", "ok"],
  [{ kind: "real", value: "0.1587" }, "0.5-0.3413", "form"],
  [{ kind: "func", value: "sin x+x cos x", v: "x" }, "xcosx+sinx", "ok"],
  [{ kind: "func", value: "3/(cos^2 3x)", v: "x" }, "3/cos^2(3x)", "ok"],
  [{ kind: "func", value: "3/(cos^2 3x)", v: "x" }, "3/cos^23x", "ok"],
  [{ kind: "func", value: "2sin x cos x", v: "x" }, "sin2x", "ok"],
  [{ kind: "func", value: "(x+1)e^x", v: "x" }, "xe^x+e^x", "ok"],
  [{ kind: "func", value: "2e^(2x)", v: "x" }, "2e^2x", "wrong"],
  [{ kind: "func", value: "x/√(x^2+1)", v: "x" }, "x/sqrt(x^2+1)", "ok"],
  [{ kind: "func", value: "log|x|", v: "x", upToConst: true }, "log|x|+C", "ok"],
  [{ kind: "func", value: "log|x|", v: "x", upToConst: true }, "log x+C", "form"],
  [{ kind: "func", value: "log|x|", v: "x", upToConst: true }, "log|x|", "form"],
  [{ kind: "func", value: "1/3x^3", v: "x", upToConst: true }, "x^3/3+5+C", "ok"],
  [{ kind: "func", value: "1/3x^3", v: "x", upToConst: true }, "x^3/3+x+C", "wrong"],
  [{ kind: "func", value: "3·2^(n-1)", v: "n" }, "3*2^(n-1)", "ok"],
  [{ kind: "func", value: "3·2^(n-1)", v: "n" }, "3/2·2^n", "ok"],
  [{ kind: "func", value: "1/6n(n+1)(2n+1)", v: "n" }, "1/3n^3+1/2n^2+1/6n", "ok"],
  [{ kind: "func", value: "1/6n(n+1)(2n+1)", v: "n" }, "n(n+1)(2n+1)/6", "ok"],
  [{ kind: "func", value: "(2x+1)/(x-1)", v: "x" }, "(2x+1)/(x-1)+y", "invalid"],
];
for (const [f, input, want] of sanity) {
  const got = judgeField(f, input).v;
  if (got !== want) fail("sanity", f.kind, input, got, "want", want);
}

if (STEPS.length !== STEP_COUNT || STEPS.some((s, i) => s.no !== i + 1)) fail("step numbering");

for (const st of STEPS) {
  const step = st.no;
  const rnd = seeded(step * 7919);
  const samples: string[] = [];
  let forms = 0;
  for (let k = 0; k < 40; k++) {
    const set = makeSet(step, 10, rnd) as Problem[];
    if (set.length !== 10) fail(`step ${step} set size`, set.length);
    for (const pr of set) {
      const shows = pr.show ?? pr.fields.map(fieldText);
      const v = judge(pr.fields, shows, pr.unordered);
      if (v.some((x) => x.v !== "ok")) fail(`step ${step} show not ok`, pr.lead ?? "", pr.q, shows, v);
      pr.fields.forEach((f, i) => {
        const w = [...shows];
        w[i] = wrongOf(f);
        const jw = judge(pr.fields, w, pr.unordered);
        if (jw.every((x) => x.v === "ok")) fail(`step ${step} wrong accepted`, pr.q, w);
        const fo = formOf(f, shows[i]);
        if (fo !== null) {
          const ff = [...shows];
          ff[i] = fo;
          const jf = judge(pr.fields, ff, pr.unordered);
          if (jf[i]?.v !== "form" && !jf.some((x) => x.v === "form")) fail(`step ${step} form not form`, pr.q, ff, jf);
          else forms++;
        }
        if (f.kind === "num" && !clean(f.value)) fail(`step ${step} not clean`, pr.lead ?? "", pr.q, shows[i]);
        if (f.kind === "complex" && (!clean(f.re) || !clean(f.im))) fail(`step ${step} not clean`, pr.q, shows[i]);
        if (f.kind === "ineq" && !f.value.all) for (const iv of f.value.parts) for (const b of [iv.lo, iv.hi]) if (b && !clean(b.c)) fail(`step ${step} not clean`, pr.q);
        if (f.kind === "expr" || f.kind === "factor") for (const c of f.value.values()) if (!clean(c)) fail(`step ${step} not clean`, pr.q);
        if (f.kind === "real" && !(Math.abs(evalSrc(f.value)) < 1e5)) fail(`step ${step} not clean`, pr.q, shows[i]);
      });
      if (pr.equations)
        for (const f of pr.fields)
          if (f.kind === "num") for (const eq of pr.equations) if (!holds(eq, f.value)) fail(`step ${step} equation fails`, eq, shows);
      if (pr.verify) {
        const e = checkVerify(pr.verify, pr.fields[0]);
        if (e) fail(`step ${step} verify`, pr.lead ?? "", pr.q, shows, e);
      }
      if (samples.length < 3) samples.push(`${pr.lead ? pr.lead + " | " : ""}${pr.q.replace(/\n/g, " / ")}  →  ${shows.join(" , ")}`);
    }
  }
  if (forms === 0) fail(`step ${step} no form checks`);
  console.log(String(step).padStart(2), samples.join("   ;   "));
}
console.log(bad ? `NG ${bad}` : "ALL OK");
if (bad) process.exit(1);
