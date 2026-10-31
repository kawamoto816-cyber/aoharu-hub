// AOHARU MATH の自己テスト: 50段それぞれで問題を作り、正解の見せ方が採点で「正解」になるか、
// 方程式は解を代入して成り立つかを確かめる。 node --experimental-strip-types scripts/math-selftest.ts
import { makeSet, type Problem } from "../lib/math/gen";
import { judge, answerText } from "../lib/math/check";
import { parseExpr } from "../lib/math/parse";
import { pSubst, pSub, type Coef } from "../lib/math/value";

function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

function holds(eq: string, vars: Record<string, Coef>): boolean {
  const parts = eq.split("=");
  for (let i = 1; i < parts.length; i++) {
    const d = pSubst(pSub(parseExpr(parts[i - 1].replace(/:/g, "÷")), parseExpr(parts[i].replace(/:/g, "÷"))), vars);
    if (d.size !== 0) return false;
  }
  return true;
}

let bad = 0;
for (let step = 1; step <= 50; step++) {
  const rnd = seeded(step * 7919);
  const samples: string[] = [];
  for (let k = 0; k < 40; k++) {
    for (const pr of makeSet(step, 10, rnd) as Problem[]) {
      const show = pr.show ?? answerText(pr.answer);
      const v = judge(pr.answer, show);
      if (v.some((x) => x !== "ok")) {
        bad++;
        if (bad < 40) console.log(`step ${step} show not ok`, pr.lead ?? "", pr.q, show, v);
      }
      if (pr.equations) {
        const a = pr.answer;
        const sets: Record<string, Coef>[] = a.kind === "num" ? [{ x: a.value }] : a.kind === "pair" ? [{ x: a.x, y: a.y }] : a.kind === "roots" ? a.values.map((c) => ({ x: c })) : [];
        for (const vars of sets)
          for (const eq of pr.equations)
            if (!holds(eq, vars)) {
              bad++;
              if (bad < 40) console.log(`step ${step} equation fails`, eq, show);
            }
      }
      if (samples.length < 3) samples.push(`${pr.lead ? pr.lead + " | " : ""}${pr.q.replace(/\n/g, " / ")}  →  ${show.join(" , ")}`);
    }
  }
  console.log(String(step).padStart(2), samples.join("   ;   "));
}
console.log(bad ? `NG ${bad}` : "ALL OK");
