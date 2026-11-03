// 試験モード (lib/exam) の検査。npx tsx scripts/check-exam.ts [--seeds 20] [--quiet]
// 全モード (公立入試型 5教科・共通テスト型・私立入試型・定期テスト型) を、シード 1〜20 で組み立てて確かめる:
//   満点・制限時間・大問の数と配点が仕様どおりか／小問の数が [最小, 最大] に入るか／範囲外の単元が混ざらないか／
//   答えの形式のしぼりこみ (マーク式) が守られているか／同じ問題が2度出ないか／記述の採点基準の合計＝配点／
//   模範解答を入れると満点になるか／同じシードで同じ1回分になるか
// 問題が足りない範囲は「不足」として一覧にする (エラーではない。データが増えると自動で解消する)。

import { LEVELS } from "@/lib/school";
import { assemble, examSpec, fixedChoices, MODES, questionCountByUnit, scopeUnits, UNIT_GROUPS, unitLoc, type ExamChoice, type ModeId } from "@/lib/exam";
import { gradeAnswer, modelResponse } from "@/lib/moshi/grade";

const args = process.argv.slice(2);
const SEEDS = Number(args[args.indexOf("--seeds") + 1]) || 20;
const quiet = args.includes("--quiet");

let errors = 0;
const err = (where: string, msg: string) => {
  errors++;
  console.log(`  ✕ ${where}: ${msg}`);
};

// 0. モードに書いた単元が地図にあるか
for (const [name, us] of Object.entries(UNIT_GROUPS)) for (const u of us) if (!unitLoc(u)) err(`UNIT_GROUPS.${name}`, `地図にない単元 ${u}`);

// 1. 検査するえらび方
const counts = questionCountByUnit();
const cases: { mode: ModeId; choice: ExamChoice }[] = [...fixedChoices()];
for (const s of ["math", "rika", "eigo", "kokugo", "shakai"]) for (const m of [30, 50]) cases.push({ mode: "shiritsu", choice: { subject: s, minutes: m } });
cases.push({ mode: "shiritsu", choice: { subject: "math", minutes: 50, units: ["j-math-3-kansu-ax2", "j-math-3-sojii", "j-math-3-en", "j-math-3-sanheiho"] } });
for (const l of LEVELS)
  for (const s of l.subjects)
    for (const g of s.groups) {
      const us = g.units.map((u) => u.id).filter((u) => (counts[u] ?? 0) > 0);
      if (us.length === 0) continue;
      for (const m of [10, 50]) cases.push({ mode: "teiki", choice: { level: l.key as "sho" | "chu" | "ko", subject: s.key, units: us, minutes: m } });
    }

const shortRows: string[] = [];
let built = 0;

for (const { mode, choice } of cases) {
  const spec = examSpec(mode, choice);
  const label = `${mode} ${JSON.stringify(choice)}`;
  if (!spec) {
    err(label, "仕様が作れない");
    continue;
  }
  const where = spec.title + (choice.units ? `（${choice.units.length}単元・${spec.minutes}分）` : "");
  if (spec.total !== 100) err(where, `満点が ${spec.total}`);
  if (!MODES.some((m) => m.id === mode)) err(where, "モードがない");
  for (const ds of spec.sections) if (scopeUnits(spec.scope, ds.from).length === 0) err(where, `大問「${ds.title}」の出題元の単元が範囲にない`);
  let shortOnce = false;
  for (let seed = 1; seed <= SEEDS; seed++) {
    const b = assemble(spec, seed);
    if (!b.ok) {
      if (!shortOnce) shortRows.push(`${where}: 範囲の問題 ${b.available}問／足りない大問 ${b.shortages.map((s) => `${s.title}（${s.have}/${s.need}）`).join("・")}`);
      shortOnce = true;
      continue;
    }
    if (shortOnce) err(where, `シードによって組めたり組めなかったりする (seed ${seed})`);
    built++;
    const w = `${where} seed=${seed}`;
    const { round } = b;
    if (round.exam.total !== spec.total) err(w, `満点 ${round.exam.total} ≠ ${spec.total}`);
    if (round.exam.minutes !== spec.minutes) err(w, `時間 ${round.exam.minutes} ≠ ${spec.minutes}`);
    if (round.daimon.length !== spec.sections.length) err(w, `大問の数 ${round.daimon.length} ≠ ${spec.sections.length}`);
    const seen = new Set<string>();
    round.daimon.forEach((d, i) => {
      const ds = spec.sections[i];
      if (!ds) return;
      if (d.points !== ds.points) err(w, `大問${i + 1}の配点 ${d.points} ≠ ${ds.points}`);
      const sum = d.items.reduce((a, it) => a + it.points, 0);
      if (sum !== d.points) err(w, `大問${i + 1}の小問の合計 ${sum} ≠ ${d.points}`);
      if (d.items.length < ds.count[0] || d.items.length > ds.count[1]) err(w, `大問${i + 1}の小問の数 ${d.items.length}（仕様 ${ds.count.join("〜")}）`);
      const allowed = new Set(b.allowed[i]);
      for (const it of d.items) {
        const u = it.unit ?? d.units[0];
        if (!allowed.has(u)) err(w, `大問${i + 1} ${it.id}: 範囲外の単元 ${u}`);
        const loc = unitLoc(u);
        if (!loc || loc.level !== spec.scope.level || loc.subjectKey !== spec.scope.subjectKey) err(w, `大問${i + 1} ${it.id}: 教科・学校段階がちがう単元 ${u}`);
        if (ds.kinds && !ds.kinds.includes(it.answer.kind)) err(w, `大問${i + 1} ${it.id}: 形式 ${it.answer.kind} は出さない`);
        if (it.points <= 0) err(w, `大問${i + 1} ${it.id}: 配点 ${it.points}`);
        const key = it.id;
        if (seen.has(key)) err(w, `同じ問題が2度 ${key}`);
        seen.add(key);
        if (it.answer.kind === "written") {
          const rs = it.answer.rubric.reduce((a, r) => a + r.points, 0);
          if (rs !== it.points) err(w, `${it.id}: 採点基準の合計 ${rs} ≠ ${it.points}`);
        }
        if (it.dependsOn && !d.items.some((x) => x.id === it.dependsOn)) err(w, `${it.id}: 前の小問 ${it.dependsOn} が同じ大問にない`);
        const checks = it.answer.kind === "written" ? it.answer.rubric.map(() => true) : undefined;
        try {
          const r = gradeAnswer(it.answer, it.points, modelResponse(it.answer), checks);
          if (r.score !== it.points) err(w, `${it.id}: 模範解答で ${r.score}/${it.points}`);
        } catch (e) {
          err(w, `${it.id}: 採点で例外 ${(e as Error).message}`);
        }
      }
    });
    if (seed <= 3) {
      const again = assemble(spec, seed);
      if (!again.ok || JSON.stringify(again.round.daimon) !== JSON.stringify(round.daimon)) err(w, "同じシードで同じ1回分にならない");
    }
  }
  if (!quiet && !shortOnce) console.log(`  ○ ${where}`);
}

console.log(`\n組み立て ${built} 回（${cases.length} 通り × シード 1〜${SEEDS}）`);
if (shortRows.length) {
  console.log(`\n△ 問題がまだ少ない範囲（${shortRows.length}）`);
  for (const r of shortRows) console.log(`  ${r}`);
}
console.log(errors ? `\n✕ エラー ${errors}` : "\n✕ エラー 0");
process.exit(errors ? 1 : 0);
