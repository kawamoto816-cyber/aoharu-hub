// さかのぼりのエンジン (lib/sakanobori/diagnose.ts・mastery.ts) の検査。作り物のデータで動かす（lib/sakanobori/data は読まない）。
//   npx tsx scripts/check-sakanobori-engine.ts [--exam]
// 確かめること:
//   高1 二次関数 → 中3 関数 y=ax² → 中1 比例 とたどって、根っこが中1「比例」になる／前提ができていれば上で止まる／
//   まちがいの番号の root が最初の候補になる／たしかめられない単元は飛ばす／深さ4・回数の上限／輪があっても止まる／
//   処方（授業 → レクチャー → 単元模試、1段ずつ上る）／URL の形の行き来／習熟度の指数移動平均と苦手の判定
//   --exam: 試験モードの「苦手に合わせた回」で、苦手な単元の小問が増え、範囲外の単元が出ないこと（実データ）

import { candidates, decodeResults, decodeWrong, diagnose, encodeResults, encodeWrong, lectureUnitOfHref, passed, prescribe, type CheckResult, type PrereqGraph } from "../lib/sakanobori/diagnose";
import { applyAnswer, isWeak, mistakeOfChoice, weakUnits, type MasteryMap, type UnitMastery } from "../lib/sakanobori/mastery";
import type { PrereqUnit } from "../lib/sakanobori/types";

let errors = 0;
let count = 0;
function ok(cond: unknown, msg: string) {
  count++;
  if (!cond) {
    errors++;
    console.log("✕ " + msg);
  }
}
const eq = (a: unknown, b: unknown, msg: string) => ok(JSON.stringify(a) === JSON.stringify(b), `${msg}: ${JSON.stringify(a)} ≠ ${JSON.stringify(b)}`);

// ---- 作り物のデータ ----
const H1 = "h-math-1-nijikansu";
const J3 = "j-math-3-kansu-ax2";
const J2 = "j-math-2-ichiji-kansu";
const J1 = "j-math-1-hirei";
const J1H = "j-math-1-hoteishiki";
const E6 = "e-math-6-hirei";
const E5 = "e-math-5-wariai";
const NOQ = "j-math-2-noq"; // 問題のない単元

const FAKE: PrereqUnit[] = [
  {
    unit: H1,
    needs: [
      { unit: J3, why: "y=ax² のグラフがわからないと二次関数の形が読めない" },
      { unit: J1H, why: "方程式が解けないと頂点や交点が求められない" },
    ],
    mistakes: [
      { i: 0, root: J3, why: "放物線の開き方は a の符号で決まる" },
      { i: 1, root: H1, why: "平方完成そのものの手順のまちがい" },
    ],
  },
  { unit: J3, needs: [{ unit: J1, why: "比例の式 y=ax が使えないと a が求められない" }, { unit: J2, why: "変化の割合は一次関数で習う" }] },
  { unit: J2, needs: [{ unit: J1, why: "一次関数は比例に切片を足したもの" }] },
  { unit: J1, needs: [{ unit: E6, why: "比例の意味は小6で習う" }] },
  { unit: J1H, needs: [] },
  { unit: E6, needs: [{ unit: E5, why: "割合がわかると比例の倍の関係が見える" }] },
  { unit: E5, needs: [] },
];
const BY = new Map(FAKE.map((p) => [p.unit, p]));
const graph = (opts: { noCheck?: string[]; extraNeeds?: Record<string, string[]> } = {}): PrereqGraph => ({
  needs: (u) => [...(BY.get(u)?.needs ?? []), ...(opts.extraNeeds?.[u] ?? []).map((x) => ({ unit: x, why: "" }))],
  mistakeRoot: (u, i) => BY.get(u)?.mistakes?.find((m) => m.i === i),
  checkable: (u) => !(opts.noCheck ?? []).includes(u),
});
const R = (unit: string, correct: number, total = 3): CheckResult => ({ unit, correct, total });

// ---- 1. 候補 ----
{
  const g = graph();
  const c = candidates(H1, [{ unit: H1 }], g);
  eq(c.list.map((x) => x.unit), [J3, J1H], "まちがいの番号がなければ needs の順");
  const c2 = candidates(H1, [{ unit: H1, mistake: 0 }, { unit: H1 }], g);
  eq(c2.list[0].unit, J3, "まちがいの番号 0 → root の J3 が先頭");
  ok(c2.list[0].score > c2.list[1].score, "まちがいの root は点が高い");
  const c3 = candidates(H1, [{ unit: H1, mistake: 1 }], g);
  eq(c3.selfScore, 3, "root が自分自身なら selfScore");
  ok(c3.list.some((x) => x.unit === J3), "それでも直前の前提は候補に入る");
  const c4 = candidates(H1, [{ unit: H1, backs: [J1H] }], g);
  eq(c4.list[0].unit, J1H, "解き方の「ここへ」の単元が先頭");
  const c5 = candidates(H1, [{ unit: J3 }, { unit: H1, mistake: 0 }], g);
  ok(!c5.list.some((x) => x.unit === J1 && x.score >= 1), "ほかの単元のまちがいは、元の単元の候補に混ぜない");
}

// ---- 2. 高1 → 中3 → 中1 で根っこが中1 ----
{
  const g = graph();
  const c = candidates(H1, [{ unit: H1, mistake: 0 }], g).list;
  let s = diagnose(H1, c, [], g);
  ok(s.kind === "check" && s.unit === J3, "最初にたしかめるのは中3 y=ax²");
  if (s.kind === "check") eq(s.path.map((p) => p.unit), [H1, J3], "道（たしかめ中）");
  s = diagnose(H1, c, [R(J3, 1)], g);
  ok(s.kind === "check" && s.unit === J1, "中3 が 1/3 → 中1 比例へ下りる");
  if (s.kind === "check") eq(s.depth, 2, "中1 は2段め");
  s = diagnose(H1, c, [R(J3, 1), R(J1, 0)], g);
  ok(s.kind === "check" && s.unit === E6, "中1 も 0/3 → 小6 へ");
  s = diagnose(H1, c, [R(J3, 1), R(J1, 0), R(E6, 3)], g);
  ok(s.kind === "done" && s.root === J1, "小6 ができていれば、根っこは中1 比例");
  if (s.kind === "done") {
    eq(s.path.map((p) => p.unit), [H1, J3, J1], "道: 高1 → 中3 → 中1");
    eq(s.climb, [J1, J3, H1], "上り: 中1 → 中3 → 高1");
    eq(s.path[2].why, "比例の式 y=ax が使えないと a が求められない", "道に why がつく");
    ok(!s.capped, "上限に当たっていない");
  }
  // 中3 の2つめの前提 (J2) は、根っこが見つかったのでたしかめない
  // 2/3 は合格
  ok(passed(R(J3, 2)) && !passed(R(J3, 1)) && passed({ correct: 2, total: 2 }) && !passed({ correct: 1, total: 2 }), "合格は 2/3 以上");
}

// ---- 3. 前提ができていれば上で止まる・全部できていれば元の単元 ----
{
  const g = graph();
  const c = candidates(H1, [{ unit: H1 }], g).list;
  let s = diagnose(H1, c, [R(J3, 1), R(J1, 3), R(J2, 2)], g);
  ok(s.kind === "done" && s.root === J3, "中3 の前提が全部できていれば、根っこは中3");
  s = diagnose(H1, c, [R(J3, 3)], g);
  ok(s.kind === "check" && s.unit === J1H, "中3 ができていれば、次の候補 (方程式) へ");
  s = diagnose(H1, c, [R(J3, 3), R(J1H, 2)], g);
  ok(s.kind === "done" && s.root === H1 && s.path.length === 1, "候補が全部できていれば、根っこは元の単元");
}

// ---- 4. たしかめられない単元は飛ばす ----
{
  const g = graph({ noCheck: [J3] });
  const c = candidates(H1, [{ unit: H1, mistake: 0 }], g).list;
  let s = diagnose(H1, c, [], g);
  ok(s.kind === "check" && s.unit === J1, "問題のない中3 は飛ばして中1 へ");
  if (s.kind === "check") eq(s.path.map((p) => p.unit), [H1, J3, J1], "飛ばした単元も道に残る");
  s = diagnose(H1, c, [R(J1, 1), R(E6, 3)], g);
  ok(s.kind === "done" && s.root === J1, "飛ばしたあとでも根っこが決まる");
}

// ---- 5. 深さ4・回数の上限・輪 ----
{
  const g = graph({ extraNeeds: { [E5]: [NOQ], [NOQ]: [J1] } }); // E5 → NOQ → J1 の輪
  const c = candidates(H1, [{ unit: H1, mistake: 0 }], g).list;
  const s = diagnose(H1, c, [R(J3, 0), R(J1, 0), R(E6, 0), R(E5, 0)], g);
  ok(s.kind === "done" && s.root === E5, "深さ4 (小5) で止まって根っこにする");
  if (s.kind === "done") eq(s.path.length, 5, "道は元の単元＋4段");
  const s2 = diagnose(H1, c, [R(J3, 0), R(J1, 0)], g, { maxChecks: 2 });
  ok(s2.kind === "done" && s2.capped && s2.root === J1, "回数の上限に当たったら、いちばん深いできなかった単元で決める");
  const s3 = diagnose(H1, c, [R(J3, 0), R(J1, 0), R(E6, 0)], g, { maxDepth: 10 });
  ok(s3.kind === "check" && s3.unit === E5, "深さを広げると小5 へ");
  const s4 = diagnose(H1, c, [R(J3, 0), R(J1, 0), R(E6, 0), R(E5, 0), R(NOQ, 0)], g, { maxDepth: 10 });
  ok(s4.kind === "done", "輪があっても止まる");
}

// ---- 6. 処方 ----
{
  const rx = prescribe([J1, J3, H1], (u) => ({ jugyo: u === J1 ? `/learn/jugyo/${u}` : undefined, lecture: `/learn/lecture/${u}`, moshi: u === H1 ? undefined : `/learn/moshi/${u}` }));
  eq(rx.root.steps.map((s) => s.kind), ["jugyo", "lecture", "moshi"], "根っこ: 授業 → レクチャー → 単元模試");
  eq(rx.climb.map((c) => c.unit), [J3, H1], "上る順");
  eq(rx.climb[1].steps.map((s) => s.kind), ["lecture"], "ないリンクは出さない");
}

// ---- 7. URL の形 ----
{
  const ws = [{ unit: H1, mistake: 2, backs: [J3, J1] }, { unit: J3 }];
  eq(decodeWrong(encodeWrong(ws)), ws, "w の行き来");
  eq(decodeWrong("h-math-1-x.m1.b<script>,../x,ok-unit"), [{ unit: "h-math-1-x", mistake: 1 }, { unit: "ok-unit" }], "おかしな w は捨てる");
  const rs = [R(J3, 1), R(J1, 3)];
  eq(decodeResults(encodeResults(rs)), rs, "r の行き来");
  eq(decodeResults("a.4.3,b.1.0,c.1.3,c.3.3"), [R("c", 1)], "おかしな r は捨てる（同じ単元は先のもの）");
  eq(lectureUnitOfHref("/learn/lecture/j-math-1-hirei#lec-s2"), "j-math-1-hirei", "back の href から単元");
  eq(lectureUnitOfHref("/learn/math/dan-3"), null, "レクチャー以外は null");
}

// ---- 8. 習熟度 ----
{
  const at = "2026-11-18T00:00:00.000Z";
  let m: UnitMastery | undefined;
  m = applyAnswer(m, { unit: J1, ok: false, mistake: 1 }, at);
  eq([m.n, m.ok, m.m], [1, 0, 0.35], "1問まちがい: 0.5 → 0.35");
  eq(m.miss, { 1: 1 }, "まちがいの番号を数える");
  m = applyAnswer(m, { unit: J1, ok: false, mistake: 1 }, at);
  eq(m.miss, { 1: 2 }, "同じまちがいは足す");
  ok(isWeak(m), "2問まちがえたら苦手");
  for (let i = 0; i < 6; i++) m = applyAnswer(m, { unit: J1, ok: true }, at);
  ok(!isWeak(m) && m.m > 0.8, "続けて正解すれば苦手でなくなる（ふつうの出題にもどる）");
  const map: MasteryMap = { a: { n: 3, ok: 0, m: 0.2, at }, b: { n: 3, ok: 1, m: 0.5, at }, c: { n: 1, ok: 0, m: 0.35, at }, d: { n: 5, ok: 5, m: 0.9, at } };
  eq(weakUnits(map), ["a", "b"], "苦手は低い順（1問だけの単元は入れない）");
  eq(weakUnits(map, ["b", "d"]), ["b"], "範囲の中だけ");
  const q = { kind: "choice" as const, options: ["ア", "イ", "ウ"], correct: 0, why: ["", "", ""], mistakeOf: [null, 2, null] };
  eq([mistakeOfChoice(q, [1]), mistakeOfChoice(q, [0]), mistakeOfChoice(q, [2]), mistakeOfChoice(q, [])], [2, null, null, null], "選んだ選択肢 → まちがいの番号");
}

// ---- 9. 試験モードの重み（実データ。時間がかかるので --exam のときだけ） ----
async function examCheck() {
  const { assemble, examSpec, MODES, scopeUnits } = await import("../lib/exam");
  let tried = 0;
  for (const m of MODES) {
    for (const s of m.subjects.slice(0, 3)) {
      const spec = examSpec(m.id, { subject: s.key, level: "chu" });
      if (!spec) continue;
      const base = assemble(spec, 7);
      if (!base.ok) continue;
      const qs = (b: typeof base) => (b.ok ? b.round.daimon.flatMap((d) => d.items.map((it) => it.unit ?? d.units[0])) : []);
      const units = qs(base);
      const counts = new Map<string, number>();
      for (const u of units) counts.set(u, (counts.get(u) ?? 0) + 1);
      // 出題の少ない範囲内の単元を「苦手」にする
      const inScope = new Set(scopeUnits(spec.scope));
      const weak = [...inScope].filter((u) => (counts.get(u) ?? 0) <= 1).slice(0, 2);
      if (!weak.length) continue;
      const w = assemble(spec, 7, { weak: [...weak, "x-not-in-scope"] });
      if (!w.ok) {
        ok(false, `${spec.id}: 重みつきで組めない`);
        continue;
      }
      const wu = qs(w);
      const before = units.filter((u) => weak.includes(u)).length;
      const after = wu.filter((u) => weak.includes(u)).length;
      ok(after >= before, `${spec.id}: 苦手の小問が減った (${before} → ${after})`);
      ok(wu.every((u) => inScope.has(u)), `${spec.id}: 範囲外の単元が出た`);
      ok(after <= Math.max(before, Math.ceil(wu.length * 0.5)), `${spec.id}: 苦手の小問が多すぎる (${after}/${wu.length}。目安は約4割)`);
      eq(w.round.exam.total, base.round.exam.total, `${spec.id}: 満点が変わらない`);
      console.log(`  ${spec.id}: 苦手 ${weak.join(",")} の小問 ${before} → ${after} / ${wu.length}`);
      tried++;
    }
  }
  ok(tried > 0, "試験モードの重みを1つもためせなかった");
}

(async () => {
  if (process.argv.includes("--exam")) await examCheck();
  console.log(`検査 ${count}・エラー ${errors}`);
  if (errors) process.exit(1);
})();
