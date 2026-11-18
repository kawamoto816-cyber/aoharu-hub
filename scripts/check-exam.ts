// 試験モード (lib/exam) の検査。npx tsx scripts/check-exam.ts [--seeds 20] [--quiet]
// 全モード (公立入試型 5教科・共通テスト型・私立入試型・定期テスト型) を、シード 1〜20 で組み立てて確かめる:
//   満点・制限時間・大問の数と配点が仕様どおりか／小問の数が [最小, 最大] に入るか／範囲外の単元が混ざらないか／
//   答えの形式のしぼりこみ (マーク式) が守られているか／同じ問題が2度出ないか／記述の採点基準の合計＝配点／
//   模範解答を入れると満点になるか／同じシードで同じ1回分になるか
// 問題として読めるか (lib/exam/quality.ts):
//   指示のない小問がないか (「3x² − 48」だけ、など)／同じ大問の中で、ある小問の答えが別の小問の問題文・選択肢・資料に出ていないか／
//   「(6) …」のように番号のある資料が、その小問の直前 (大問の頭なら (1) 用) にあるか／「上の表」の小問の前に表があるか／
//   「(3) の答え」が前の小問を指しているか／分野つきの題 (tsec) が、出た小問の分野と合っているか
// シードは 1〜N のほか、公立高校入試模試・共通テスト模試の各回のシードと、毎回ちがうランダムなシード (--random 個、既定 3)
// 問題が足りない範囲は「不足」として一覧にする (エラーではない。データが増えると自動で解消する)。

import { LEVELS } from "@/lib/school";
import { assemble, examSpec, fixedChoices, MODES, questionCountByUnit, scopeUnits, UNIT_GROUPS, unitLoc, type ExamChoice, type ModeId } from "@/lib/exam";
import { hasInstruction, isGenericLead, leakOf, materialFor, referencedNos } from "@/lib/exam/quality";
import { SERIES } from "@/lib/exam/series";
import type { Daimon, Material } from "@/lib/moshi/types";
import { gradeAnswer, modelResponse } from "@/lib/moshi/grade";

const args = process.argv.slice(2);
const SEEDS = Number(args[args.indexOf("--seeds") + 1]) || 20;
const quiet = args.includes("--quiet");
const RANDOM = args.includes("--random") ? Number(args[args.indexOf("--random") + 1]) : 3;
const randomSeeds = Array.from({ length: RANDOM }, () => 1000 + Math.floor(Math.random() * 9_000_000));
const seriesSeeds = Object.values(SERIES).flatMap((x) => Array.from({ length: x.rounds }, (_, i) => x.seedOf(i + 1)));
const SEED_LIST = [...Array.from({ length: SEEDS }, (_, i) => i + 1), ...seriesSeeds, ...randomSeeds];
if (RANDOM) console.log(`ランダムなシード: ${randomSeeds.join(", ")}`);

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

// ---- 問題として読めるか ----
let readableCount = 0;
const byKind = { instr: 0, leak: 0, mat: 0, ref: 0, title: 0 };
const bad = (k: keyof typeof byKind, w: string, msg: string) => {
  readableCount++;
  byKind[k]++;
  err(w, msg);
};
const matHead = (m: Material) => (m.kind === "table" ? m.caption : m.kind === "figure" ? "" : m.body).slice(0, 30);

function readable(w: string, d: Daimon, di: number, src: { src: string; passage: boolean }[], ds: { title: string; topics?: { label: string; units: string[] }[]; titleTemplate?: string }) {
  const at = `${w} 大問${di + 1}`;
  const genericLead = isGenericLead(d.lead);
  // 1. 指示
  for (const it of d.items) if (genericLead && !hasInstruction(it.prompt)) bad("instr", at, `${it.no} に指示がない「${it.prompt.slice(0, 30)}」`);
  // 2. 答えのもれ (同じ元の節の本文つきのまとまりは、数の答えだけくらべる)
  d.items.forEach((a, i) =>
    d.items.forEach((b, j) => {
      if (i === j) return;
      const same = src[i].src === src[j].src;
      if (same && src[i].passage && a.answer.kind !== "num") return;
      // 資料はここではくらべない (別の節の本文にたまたま同じ語があるのは、もれではない。資料の中の答えは下で見る)
      const v = leakOf(a, { prompt: b.prompt, answer: b.answer }, same);
      if (v) bad("leak", at, `${a.no} の答え「${v}」が ${b.no} に出ている`);
    }),
  );
  const mats: { m: Material; k: number }[] = [...(d.material ?? []).map((m) => ({ m, k: -1 })), ...d.items.flatMap((it, k) => (it.material ?? []).map((m) => ({ m, k })))];
  d.items.forEach((a, i) => {
    if (a.answer.kind !== "term") return;
    for (const { m } of mats)
      if (m.kind !== "passage" && m.kind !== "figure" && !src[i].passage && leakOf(a, { prompt: "", answer: { kind: "term", accept: [] }, material: [m] }, true)) bad("leak", at, `${a.no} の答えが資料「${matHead(m)}」に出ている`);
  });
  // 3. 資料の位置: 番号のある資料は、その番号の小問の直前 (大問の頭なら (1) 用)
  for (const { m, k } of mats) {
    const f = materialFor(m);
    const no = k < 0 ? 1 : k + 1;
    if (f && !f.nos.includes(no)) bad("mat", at, `${f.nos.map((x) => `(${x})`).join("・")} 用の資料「${matHead(m)}」が ${k < 0 ? "大問の頭" : `(${no}) の前`} にある`);
  }
  d.items.forEach((it, k) => {
    if (!/(上|下|右|左|次)の表|表[0-9０-９A-ZＡ-Ｚ１-９]/.test(it.prompt)) return;
    const before = mats.filter((x) => x.k <= k).map((x) => x.m);
    if (!before.some((m) => m.kind === "table" || m.kind === "figure") && !d.items.slice(0, k + 1).some((x) => x.figure) && !/[｜|]/.test(it.prompt)) bad("mat", at, `${it.no}「${it.prompt.slice(0, 20)}」の前に表がない`);
  });
  // 4. 番号の参照: 「(3) の答え」は前の小問
  d.items.forEach((it, k) => {
    for (const n of referencedNos(it.prompt)) if (n < 1 || n > k) bad("ref", at, `${it.no} が (${n}) を指している（前の小問でない）`);
  });
  // 5. 題: 分野つきの題は、出た小問の分野だけ
  if (ds.topics && ds.titleTemplate) {
    const us = new Set(d.items.map((it) => it.unit ?? d.units[0]));
    const labels = ds.topics.filter((t) => t.units.some((u) => us.has(u))).map((t) => t.label);
    const inTitle = ds.topics.filter((t) => d.title.includes(t.label)).map((t) => t.label);
    if (labels.join("・") !== inTitle.join("・")) bad("title", at, `題「${d.title}」と中身の分野（${labels.join("・")}）が合わない`);
  }
}
let built = 0;

for (const { mode, choice } of cases) {
  const spec = examSpec(mode, choice);
  const label = `${mode} ${JSON.stringify(choice)}`;
  if (!spec) {
    err(label, "仕様が作れない");
    continue;
  }
  const where = spec.title + (choice.units ? `（${choice.units.length}単元・${spec.minutes}分）` : "");
  if (mode !== "daigaku" && spec.total !== (spec.id === "kyotsu:kokugo" ? 200 : /^kyotsu:(phyb|chemb|biob|earthb)$/.test(spec.id) ? 50 : 100)) err(where, `満点が ${spec.total}`);
  if (!MODES.some((m) => m.id === mode)) err(where, "モードがない");
  for (const ds of spec.sections) if (scopeUnits(spec.scope, ds.from).length === 0) err(where, `大問「${ds.title}」の出題元の単元が範囲にない`);
  let shortOnce = false;
  for (const seed of SEED_LIST) {
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
    round.daimon.forEach((d, i) => readable(w, d, i, b.sources[i], spec.sections[i]));
    if (seed <= 3) {
      const again = assemble(spec, seed);
      if (!again.ok || JSON.stringify(again.round.daimon) !== JSON.stringify(round.daimon)) err(w, "同じシードで同じ1回分にならない");
    }
  }
  if (!quiet && !shortOnce) console.log(`  ○ ${where}`);
}

console.log(`\n組み立て ${built} 回（${cases.length} 通り × シード ${SEED_LIST.length} 個: 1〜${SEEDS}・各回・ランダム）`);
if (readableCount) console.log(`問題として読めない組み合わせ ${readableCount}（指示 ${byKind.instr}・答えのもれ ${byKind.leak}・資料の位置 ${byKind.mat}・番号の参照 ${byKind.ref}・題 ${byKind.title}）`);
if (shortRows.length) {
  console.log(`\n△ 問題がまだ少ない範囲（${shortRows.length}）`);
  for (const r of shortRows) console.log(`  ${r}`);
}
console.log(errors ? `\n✕ エラー ${errors}` : "\n✕ エラー 0");
process.exit(errors ? 1 : 0);
