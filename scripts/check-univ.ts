// 大学別型 (lib/exam/univ/<key>.ts) を点検する。
//   npx tsx scripts/check-univ.ts <key>   (例: waseda-nihonshi。省略＝できているものすべて)
// 調べること: 大問と pool の tag の対応・tag ごとの節の数 (2つ以上)・単元が範囲にある・選択肢と解説の数・
// 正解の番号・語句の答えが同じ節の本文や他の問いにもれていない・論述の採点基準の合計・30回組んで組めるか・何通りの回になるか。
import { assemble, examSpec, scopeUnits } from "@/lib/exam";
import { UNIV_EXAMS, getUnivExam } from "@/lib/exam/univ";
import type { Question, QuestionBody } from "@/lib/moshi/types";

const keys = process.argv[2] ? [process.argv[2]] : UNIV_EXAMS.map((u) => u.key);
let errors = 0;
const err = (w: string, m: string) => {
  errors++;
  console.log(`✕ ${w}: ${m}`);
};
const norm = (s: string) => s.replace(/《[^》]*》/g, "").replace(/\s/g, "");

for (const key of keys) {
  const u = getUnivExam(key);
  if (!u) {
    err(key, "UNIV_EXAMS にない (ファイルが null のまま・export 名がちがう)");
    continue;
  }
  const spec = examSpec("daigaku", { subject: key });
  if (!spec) {
    err(key, "仕様が作れない");
    continue;
  }
  const scope = new Set(scopeUnits(spec.scope));
  const tags = u.sections.map((s) => s.poolTag);
  u.sections.forEach((s, i) => {
    if (s.poolTag !== `${key}:${i + 1}`) err(key, `大問${i + 1} の poolTag は "${key}:${i + 1}" にする（いま ${s.poolTag}）`);
    const n = u.pool.filter((p) => p.tag === s.poolTag).length;
    if (n < 2) err(key, `大問${i + 1}（${s.poolTag}）の節が ${n} 個。2つ以上書く`);
  });
  let qn = 0;
  for (const p of u.pool) {
    const w = `${key} ${p.section.id ?? p.section.title}`;
    if (!tags.includes(p.tag)) err(w, `tag ${p.tag} の大問がない`);
    if (!scope.has(p.unit)) err(w, `unit ${p.unit} が範囲（${u.groups.join("・")}）にない`);
    const sec = p.section;
    if (sec.pick !== undefined && sec.pick > sec.questions.length) err(w, `pick ${sec.pick} が問題の数 ${sec.questions.length} より多い`);
    const ds = u.sections[tags.indexOf(p.tag)];
    if (ds) {
      const per = sec.pick ?? sec.questions.length;
      if (per < ds.count[0]) err(w, `1回に出る問題 ${per} が大問の最小 ${ds.count[0]} より少ない`);
    }
    const matText = norm((sec.material ?? []).map((m) => (m.kind === "passage" || m.kind === "text" ? m.body : m.kind === "table" ? m.rows.flat().join("") : "")).join(""));
    const ids = new Set<string>();
    for (const q of sec.questions as Question[]) {
      qn++;
      const qw = `${w} ${q.id}`;
      if (ids.has(q.id)) err(qw, "id が重なっている");
      ids.add(q.id);
      if (q.type === "A") continue;
      const b = q as unknown as QuestionBody & Question;
      if (q.unit && !scope.has(q.unit)) err(qw, `unit ${q.unit} が範囲にない`);
      if (!b.steps?.length) err(qw, "steps がない");
      if (!b.point || [...b.point].length > 40) err(qw, "point が空か40字をこえる");
      const a = b.answer;
      if (a.kind === "choice") {
        const cs = Array.isArray(a.correct) ? a.correct : [a.correct];
        if (cs.some((c) => c < 0 || c >= a.options.length)) err(qw, "correct の番号が選択肢にない");
        if (a.why.length !== a.options.length) err(qw, `why の数 ${a.why.length} と選択肢の数 ${a.options.length} がちがう`);
        if (new Set(a.options).size !== a.options.length) err(qw, "同じ選択肢がある");
      }
      if (a.kind === "term") {
        if (!a.accept.length) err(qw, "accept が空");
        const ans = norm(a.accept[0]);
        if (!a.chars && ans.length >= 2 && matText.includes(ans)) err(qw, `答え「${a.accept[0]}」が節の本文・資料に出ている`);
        for (const o of sec.questions as Question[]) {
          if (o === q || o.type === "A") continue;
          const ob = o as unknown as QuestionBody;
          const txt = norm(ob.prompt + (ob.answer.kind === "choice" ? ob.answer.options.join("") : ""));
          if (ans.length >= 2 && txt.includes(ans)) err(qw, `答え「${a.accept[0]}」が ${o.id} の問題文・選択肢に出ている`);
        }
      }
      if (a.kind === "written") {
        const s = a.rubric.reduce((x, r) => x + r.points, 0);
        if (s !== q.points) err(qw, `採点基準の合計 ${s} と配点 ${q.points} がちがう`);
      }
    }
  }
  // 30回組む
  let ok = 0;
  const sigs = new Set<string>();
  const short = new Map<string, number>();
  for (let seed = 1; seed <= 30; seed++) {
    const b = assemble(spec, seed);
    if (b.ok) {
      ok++;
      sigs.add(b.round.daimon.map((d) => d.items.map((it) => it.prompt.slice(0, 24)).join("|")).join("#"));
    } else for (const s of b.shortages) short.set(s.title, (short.get(s.title) ?? 0) + 1);
  }
  if (ok < 30) err(key, `30回のうち ${ok} 回しか組めない（足りない大問: ${[...short].map(([t, n]) => `${t}×${n}`).join("、")}）`);
  if (sigs.size < 10) err(key, `30回組んで ${sigs.size} 通りしかない（10通り以上ほしい。節や問題をふやす）`);
  console.log(`${u.univ}型 ${u.kamoku}: 大問 ${u.sections.length}・${spec.minutes}分・${spec.total}点・節 ${u.pool.length}・問題 ${qn}・30回で ${ok} 回組めて ${sigs.size} 通り`);
}
console.log(`エラー ${errors}`);
if (errors) process.exit(1);
