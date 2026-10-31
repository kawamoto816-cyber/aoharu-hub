// 小学算数 計算○段の自己テスト: 全段で問題を大量に作り、
//   ・正解の見せ方が judge で ok になる (全角にしても ok)
//   ・わざとずらした答えが ok にならない
//   ・「形がちがうだけ」の答え (約分前・仮分数/帯分数・分数で書いた小数・簡単にしていない比) が form になる
//   ・□ に答えを入れた式が成り立つ、あまりのあるわり算が正しい
//   ・答えの範囲が妥当 (負にならない、大きすぎない、学年に合う)
// を確かめる。 npx tsx scripts/sansu-selftest.ts
import { makeSet, missingGens, type Problem } from "../lib/sansu/gen";
import { decStr, evalExpr, fieldText, fracStr, isTerminating, judgeField, parseNum, type Field } from "../lib/sansu/check";
import { STEPS } from "../lib/sansu/steps";
import { fAdd, fEq, fMul, frac, type Frac } from "../lib/math/value";

function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

let bad = 0;
function fail(step: number, what: string, pr: Problem, extra: unknown = "") {
  bad++;
  if (bad < 60) console.log(`step ${step} ${what}:`, pr.lead ?? "", "|", pr.q, "|", extra);
}

const toWide = (s: string) => s.replace(/[0-9]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0xfee0)).replace(/\//g, "／").replace(/:/g, "：");

function value(f: Field): Frac {
  if (f.kind === "int") return frac(f.value);
  if (f.kind === "ratio") return frac(f.a, f.b);
  return f.value;
}

/** わざとずらした答え */
function shifted(f: Field): string[] {
  switch (f.kind) {
    case "int":
      return [String(f.value + 1), f.value > 0 ? String(f.value - 1) : "", String(f.value * 10 + 1)].filter(Boolean);
    case "dec": {
      const s = decStr(f.value);
      const k = s.includes(".") ? s.split(".")[1].length : 0;
      return [decStr(fAdd(f.value, frac(1, 10 ** k))), decStr(fAdd(f.value, frac(1, 10 ** (k + 1)))), decStr(fMul(f.value, frac(10)))];
    }
    case "frac": {
      const v = f.value;
      return [fracStr(frac(v.n + 1, v.d)), `${v.d}/${v.n}`.replace(/^1\/1$/, "2"), fracStr(fAdd(v, frac(1)))].filter((s) => !fEq(parseNum(s)!.value, v));
    }
    case "ratio":
      return [`${f.a + 1}:${f.b}`, `${f.b}:${f.a}`].filter(() => f.a !== f.b);
  }
}

/** 形だけちがう答えと、そのとき期待する判定 */
function variants(f: Field): [string, "ok" | "form"][] {
  const out: [string, "ok" | "form"][] = [];
  if (f.kind === "int") out.push([`${f.value}.0`, "form"]);
  if (f.kind === "dec") {
    const s = decStr(f.value);
    out.push([s.includes(".") ? `${s}0` : `${s}.0`, "form"]);
    if (f.value.d > 1) out.push([fracStr(f.value), "form"]);
  }
  if (f.kind === "frac") {
    const v = f.value;
    if (f.den) {
      out.push([`${v.n * f.den * 2 / v.d}/${f.den * 2}`, "form"]);
      if (v.d !== f.den) out.push([fracStr(v), "form"]);
    } else {
      if (v.d > 1) out.push([`${v.n * 2}/${v.d * 2}`, f.reduce ? "form" : f.form === "mixed" && v.n > v.d ? "form" : "ok"]);
      if (v.d === 1) out.push([`${v.n * 3}/3`, "form"]);
      if (v.d > 1 && v.n > v.d) {
        const w = Math.floor(v.n / v.d);
        out.push([`${w}と${v.n - w * v.d}/${v.d}`, f.form === "improper" ? "form" : "ok"]);
        out.push([`${w} ${v.n - w * v.d}/${v.d}`, f.form === "improper" ? "form" : "ok"]);
        out.push([fracStr(v), f.form === "mixed" ? "form" : "ok"]);
      }
      if (f.dec && v.d > 1 && isTerminating(v)) out.push([decStr(v), "ok"]);
    }
  }
  if (f.kind === "ratio") {
    out.push([`${f.a * 2}:${f.b * 2}`, "form"]);
    out.push([` ${f.a} : ${f.b} `, "ok"]);
  }
  return out;
}

/** 式の両辺が等しいか (a:b=c:d の比の式も) */
function holds(eq: string): boolean {
  const sides = eq.split("=");
  if (sides.length !== 2) return false;
  const val = (s: string): Frac => {
    if (s.includes(":")) {
      const [a, b] = s.split(":");
      const x = evalExpr(a);
      const y = evalExpr(b);
      return frac(x.n * y.d, x.d * y.n);
    }
    return evalExpr(s);
  };
  return fEq(val(sides[0]), val(sides[1]));
}

function answerFor(f: Field): string {
  if (f.kind === "ratio") return `${f.a}:${f.b}`;
  if (f.kind === "dec") return decStr(f.value);
  if (f.kind === "int") return String(f.value);
  return fracStr(f.value);
}

/** 段ごとの答えのいちばん大きい値 (学年に合うか) */
function maxFor(step: number): number {
  if (step <= 2) return 10;
  if (step <= 6) return 20;
  if (step <= 7) return 100;
  if (step <= 12) return 999;
  if (step <= 17) return 81;
  if (step <= 18) return 1900;
  if (step <= 20) return 9;
  if (step <= 26) return 99999;
  if (step === 36) return 100000;
  return 20000;
}

if (missingGens().length) {
  bad++;
  console.log("no generator for steps", missingGens());
}
for (const [i, s] of STEPS.entries()) {
  if (s.no !== i + 1) {
    bad++;
    console.log("step numbers are not 1..N", s.no);
  }
  for (const p of s.prev)
    if (p >= s.no) {
      bad++;
      console.log(`step ${s.no} prev ${p} is not earlier`);
    }
}

for (const step of STEPS) {
  const rnd = seeded(step.no * 7919);
  const samples: string[] = [];
  const seen = new Set<string>();
  for (let k = 0; k < 60; k++) {
    const set = makeSet(step.no, 10, rnd);
    if (set.length < 10) fail(step.no, "set too small", set[0], set.length);
    for (const pr of set) {
      seen.add(`${pr.lead}|${pr.q}`);
      const show = pr.show ?? pr.fields.map(fieldText);
      pr.fields.forEach((f, i) => {
        const a = show[i];
        const v = judgeField(f, a);
        if (v.v !== "ok") fail(step.no, "show not ok", pr, [a, v]);
        const w = judgeField(f, toWide(a));
        if (w.v !== "ok") fail(step.no, "wide not ok", pr, [toWide(a), w]);
        for (const s of shifted(f)) {
          const x = judgeField(f, s);
          if (x.v === "ok" || x.v === "form") fail(step.no, "shifted accepted", pr, [s, x]);
        }
        for (const [s, want] of variants(f)) {
          const x = judgeField(f, s);
          if (x.v !== want) fail(step.no, `variant should be ${want}`, pr, [s, x]);
        }
        if (judgeField(f, "").v !== "invalid") fail(step.no, "empty not invalid", pr);
        // 範囲
        const val = value(f);
        if (val.n < 0) fail(step.no, "negative", pr, show);
        if (val.n / val.d > maxFor(step.no)) fail(step.no, "too large", pr, show);
        if (f.kind === "frac" && val.d > 200) fail(step.no, "denominator too large", pr, show);
        if (f.kind === "dec" && (decStr(val).split(".")[1]?.length ?? 0) > 3) fail(step.no, "too many decimals", pr, show);
        const vf = pr.verify?.[i];
        if (vf) {
          try {
            if (!holds(vf.replace("□", answerFor(f)))) fail(step.no, "verify fails", pr, [vf, show]);
          } catch (e) {
            fail(step.no, "verify error", pr, [vf, String(e)]);
          }
        }
      });
      if (pr.rem) {
        const [q, m] = pr.fields.map((f) => (f.kind === "int" ? f.value : NaN));
        if (q * pr.rem.b + m !== pr.rem.a || m <= 0 || m >= pr.rem.b || q <= 0) fail(step.no, "remainder wrong", pr, [q, m]);
      }
      if (pr.labels && pr.labels.length > pr.fields.length) fail(step.no, "labels", pr);
      if (samples.length < 3) samples.push(`${pr.lead ? pr.lead + " | " : ""}${pr.q}  →  ${show.join(" , ")}`);
    }
  }
  if (seen.size < 15) fail(step.no, "too few distinct problems", { q: "", fields: [] }, seen.size);
  console.log(String(step.no).padStart(2), samples.join("   ;   "));
}

// 採点そのもののテスト
const T: [Field, string, string][] = [
  [{ kind: "frac", value: frac(7, 4), form: "mixed", reduce: true }, "1と3/4", "ok"],
  [{ kind: "frac", value: frac(7, 4), form: "mixed", reduce: true }, "１　３／４", "ok"],
  [{ kind: "frac", value: frac(7, 4), form: "mixed", reduce: true }, "7/4", "form"],
  [{ kind: "frac", value: frac(7, 4), form: "improper", reduce: true }, "1と3/4", "form"],
  [{ kind: "frac", value: frac(7, 4), form: "any", reduce: true }, "14/8", "form"],
  [{ kind: "frac", value: frac(7, 4), form: "any", reduce: true }, "1.75", "form"],
  [{ kind: "frac", value: frac(7, 4), form: "any", reduce: true, dec: true }, "1.75", "ok"],
  [{ kind: "frac", value: frac(1), form: "improper", reduce: false }, "5/5", "form"],
  [{ kind: "frac", value: frac(1, 3), form: "improper", reduce: false }, "2/6", "ok"],
  [{ kind: "dec", value: frac(15, 4) }, "3.75", "ok"],
  [{ kind: "dec", value: frac(15, 4) }, "3.750", "form"],
  [{ kind: "dec", value: frac(15, 4) }, "3.76", "wrong"],
  [{ kind: "dec", value: frac(1, 2) }, ".5", "form"],
  [{ kind: "ratio", a: 2, b: 3 }, "2：3", "ok"],
  [{ kind: "ratio", a: 2, b: 3 }, "4:6", "form"],
  [{ kind: "ratio", a: 2, b: 3 }, "3:2", "wrong"],
  [{ kind: "ratio", a: 2, b: 3 }, "2", "invalid"],
  [{ kind: "int", value: 12 }, "１２", "ok"],
  [{ kind: "int", value: 12 }, "1 2", "ok"],
  [{ kind: "int", value: 12 }, "abc", "invalid"],
];
for (const [f, s, want] of T) {
  const v = judgeField(f, s).v;
  if (v !== want) {
    bad++;
    console.log("judge test", f, JSON.stringify(s), v, "want", want);
  }
}

console.log(bad ? `NG ${bad}` : `ALL OK (${STEPS.length}段)`);
process.exit(bad ? 1 : 0);
