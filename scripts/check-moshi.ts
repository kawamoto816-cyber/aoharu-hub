// 定期テスト模試の大問データの自動チェック。大問を書いたら、gen-moshi のあとに実行する。
//   npx tsx scripts/check-moshi.ts            (全部)
//   npx tsx scripts/check-moshi.ts j-math-1-moji   (ファイル名＝単元id を指定)
// エラー (✕) が1つでもあれば終了コード1。注意 (△) は直すかどうか人が判断する。
import { readdirSync } from "node:fs";
import { REGISTRY } from "@/lib/moshi/registry";
import { getLecture } from "@/lib/lecture";
import { unitExists } from "@/lib/moshi";
import { judgeNum, toMathAnswer, cleanNumInput } from "@/lib/moshi/grade";
import { isFigureRef, type Daimon, type FigureOrRef, type NumQ, type TermQ } from "@/lib/moshi/types";
import type { Figure } from "@/lib/lecture/types";
import { tryParse } from "@/lib/math/parse";
import { cIsZero, cKey, pConst, pSub, pSubst, type Coef } from "@/lib/math/value";
import { STEPS } from "@/lib/math/steps";

const errors: string[] = [];
const warns: string[] = [];
const only = process.argv.slice(2);

const HAS_KANJI = /[㐀-鿿々]/;
const len = (s: string) => [...s.replace(/\{\{|\}\}/g, "")].length;

function coefOf(s: string): Coef | null {
  const p = tryParse(s);
  return p ? pConst(p) : null;
}

/** 等式 "lhs=rhs" に vars を代入して成り立つか */
function holds(eq: string, vars: Record<string, Coef>): boolean | "unreadable" {
  const [l, r, ...rest] = eq.split("=");
  if (r === undefined || rest.length) return "unreadable";
  const L = tryParse(l);
  const R = tryParse(r);
  if (!L || !R) return "unreadable";
  const v = pConst(pSubst(pSub(L, R), vars));
  return v !== null && cIsZero(v);
}

/** pair の文字: labels が「a =」のような1文字ならそれ、ちがえば x, y */
function letters(q: NumQ): string[] {
  const ls = (q.labels ?? []).map((l) => l.replace(/[=＝\s]/g, ""));
  if (ls.length >= 1 && ls.every((l) => /^[a-z]$/.test(l))) return ls;
  return ["x", "y"];
}

function checkNum(where: string, q: NumQ) {
  try {
    toMathAnswer(q);
  } catch (e) {
    errors.push(`${where}: 答え ${JSON.stringify(q.answer)} を採点器が読めない (${(e as Error).message})`);
    return;
  }
  const two = q.answerKind === "pair" || q.answerKind === "roots";
  if (q.answer.length !== (two ? 2 : 1)) errors.push(`${where}: answerKind ${q.answerKind} なのに answer が ${q.answer.length} 個`);
  // 模範解答を自分の採点器に入れて満点になるか (judge が "ok")
  const vs = judgeNum(q, q.answer);
  if (vs.some((v) => v !== "ok")) errors.push(`${where}: 模範解答 ${JSON.stringify(q.answer)} が judge で ${vs.join(",")} (整理した形で書く)`);
  // 表記ゆれ: 全角・「x =」つき・単位つきでも正解になるか (採点の自己テスト)
  const variants = q.answer.map((a, i) => `${q.labels?.[i] ?? ""}${a.replace(/-/g, "−")}${q.unit ?? ""}`);
  const vs2 = judgeNum(q, variants);
  if (vs2.some((v) => v !== "ok")) warns.push(`${where}: 「${variants.join(" / ")}」と書くと ${vs2.join(",")} (cleanNumInput: ${variants.map((v, i) => cleanNumInput(v, q.labels?.[i], q.unit)).join(" / ")})`);
  if (!q.equations?.length && !q.calc && q.answerKind !== "expr" && q.answerKind !== "factor") errors.push(`${where}: 数値の小問には equations か calc を付ける`);
  if (q.equations?.length) {
    const ls = letters(q);
    const vals = q.answer.map(coefOf);
    const sets: Record<string, Coef>[] =
      q.answerKind === "pair" ? [{ [ls[0]]: vals[0]!, [ls[1]]: vals[1]! }] : q.answerKind === "roots" ? vals.map((v) => ({ [ls[0]]: v! })) : [{ [ls[0]]: vals[0]! }];
    for (const eq of q.equations)
      for (const vars of sets) {
        const h = holds(eq, vars);
        if (h === "unreadable") errors.push(`${where}: 検算の式「${eq}」が読めない`);
        else if (!h) errors.push(`${where}: 答えを代入しても「${eq}」が成り立たない (${Object.keys(vars).join(",")})`);
      }
  }
  if (q.calc) {
    const c = coefOf(q.calc);
    const a = coefOf(q.answer[0]);
    if (!c) errors.push(`${where}: calc「${q.calc}」が読めない`);
    else if (!a || cKey(c) !== cKey(a)) errors.push(`${where}: calc「${q.calc}」の値が答え ${q.answer[0]} と合わない`);
  }
}

function checkTerm(where: string, q: TermQ) {
  if (!q.accept.length) errors.push(`${where}: accept が空`);
  if (q.script === "kanji" && !q.accept.some((a) => HAS_KANJI.test(a))) errors.push(`${where}: script "kanji" なのに accept に漢字がない`);
  if (q.chars && q.accept.some((a) => [...a].length !== q.chars)) warns.push(`${where}: chars ${q.chars} と accept の字数がちがうものがある`);
}

function checkFigure(where: string, f: FigureOrRef | undefined) {
  if (!f) return;
  if (isFigureRef(f)) {
    const lec = getLecture(f.ref.unit);
    if (!lec) errors.push(`${where}: 図の参照先のレクチャー ${f.ref.unit} がない`);
    else if (!lec.sections[f.ref.section]?.figure) errors.push(`${where}: ${f.ref.unit} の sections[${f.ref.section}] に図がない (節は0から数える。節は ${lec.sections.length} 個)`);
    return;
  }
  const g: Figure = f;
  if (g.type === "compare") g.rows.forEach((r, i) => r.cells.length !== g.columns.length && errors.push(`${where}: compare の rows[${i}] の cells が ${r.cells.length} 個 (columns は ${g.columns.length})`));
  if (g.type === "numberline") {
    for (const p of g.points ?? []) if (p.x < g.min || p.x > g.max) errors.push(`${where}: numberline の点 ${p.x} が ${g.min}〜${g.max} の外`);
    for (const m of g.moves ?? []) if ([m.from, m.to].some((x) => x < g.min || x > g.max)) errors.push(`${where}: numberline の矢印が範囲の外`);
  }
  if (g.type === "formula" && g.steps.length === 0) errors.push(`${where}: formula の steps が空`);
}

function checkHref(where: string, href: string) {
  const lec = href.match(/^\/learn\/lecture\/([^#]+)(?:#lec-s(\d+))?$/);
  if (lec) {
    const l = getLecture(lec[1]);
    if (!l) errors.push(`${where}: リンク先のレクチャー ${lec[1]} がない`);
    else if (lec[2] && !l.sections[Number(lec[2]) - 1]) errors.push(`${where}: ${href} の節がない (#lec-s は1から数える。節は ${l.sections.length} 個)`);
    return;
  }
  const m = href.match(/^\/learn\/math\/(\d+)$/);
  if (m) {
    if (!STEPS.some((s) => s.no === Number(m[1]))) errors.push(`${where}: 計算の段 ${m[1]} がない`);
    return;
  }
  if (!href.startsWith("/learn/")) errors.push(`${where}: リンク ${href} は /learn/ で始める`);
}

function checkDaimon(file: string, d: Daimon, seen: Set<string>) {
  const w = d.id;
  if (seen.has(d.id)) errors.push(`${w}: 大問 id が重複`);
  seen.add(d.id);
  if (!d.id.startsWith(`${file}/`)) errors.push(`${w}: id は "${file}/<番号>" にする (ファイル名＝単元id)`);
  if (d.units[0] !== file) errors.push(`${w}: units[0] はファイル名の単元 ${file} にする`);
  if (d.units.length < 1 || d.units.length > 2) errors.push(`${w}: units は1〜2個`);
  for (const u of d.units) if (!unitExists(u)) errors.push(`${w}: 単元 ${u} が学校の地図 (lib/school) にない`);
  const sum = d.items.reduce((a, it) => a + it.points, 0);
  if (sum !== d.points) errors.push(`${w}: 小問の配点の合計 ${sum} が points ${d.points} と合わない`);
  if (d.items.length < 2 || d.items.length > 8) warns.push(`${w}: 小問が ${d.items.length} 個 (目安 4〜6)`);
  const per = d.minutes / d.items.length;
  if (per < 1 || per > 4) warns.push(`${w}: 1小問あたり ${per.toFixed(1)} 分 (目安 1〜3分)`);
  d.material?.forEach((m, i) => {
    if (m.kind === "figure") checkFigure(`${w} material[${i}]`, m.figure);
    if (m.kind === "table") m.rows.forEach((r, j) => r.length !== m.head.length && errors.push(`${w} material[${i}]: 表の rows[${j}] の数が head とちがう`));
  });
  const ids = new Set<string>();
  for (const it of d.items) {
    const iw = `${w} ${it.no}`;
    if (ids.has(it.id)) errors.push(`${iw}: 小問 id ${it.id} が重複`);
    ids.add(it.id);
    if (it.unit && !unitExists(it.unit)) errors.push(`${iw}: unit ${it.unit} が地図にない`);
    if (it.dependsOn && !d.items.some((x) => x.id === it.dependsOn)) errors.push(`${iw}: dependsOn ${it.dependsOn} がない`);
    if (it.points <= 0) errors.push(`${iw}: points が0以下`);
    if (it.steps.length < 1 || it.steps.length > 4) errors.push(`${iw}: steps は1〜4つ (いま ${it.steps.length})`);
    if (len(it.point) > 40) warns.push(`${iw}: point が ${len(it.point)} 字 (40字以内)`);
    checkFigure(`${iw} figure`, it.figure);
    it.steps.forEach((s, k) => {
      if (len(s.body) > 150) warns.push(`${iw} steps[${k}]: body が ${len(s.body)} 字 (150字以内)`);
      checkFigure(`${iw} steps[${k}]`, s.figure);
      for (const b of s.back ?? []) checkHref(`${iw} steps[${k}]`, b.href);
    });
    const a = it.answer;
    switch (a.kind) {
      case "choice": {
        const n = a.options.length;
        if (n < 2 || n > 6) errors.push(`${iw}: 選択肢は2〜6個`);
        if (new Set(a.options).size !== n) errors.push(`${iw}: 選択肢が重複`);
        const cs = Array.isArray(a.correct) ? a.correct : [a.correct];
        if (cs.some((c) => c < 0 || c >= n)) errors.push(`${iw}: correct が範囲外`);
        if (a.why.length !== n) errors.push(`${iw}: why の数 ${a.why.length} が選択肢 ${n} とちがう`);
        if (a.mistakeOf) {
          const lec = getLecture(it.unit ?? d.units[0]);
          for (const m of a.mistakeOf) if (m !== null && !lec?.mistakes[m]) errors.push(`${iw}: mistakeOf ${m} がレクチャーの mistakes にない`);
        }
        break;
      }
      case "num":
        checkNum(iw, a);
        if ((a.answerKind === "pair" || a.answerKind === "roots") && it.points % 2) warns.push(`${iw}: 2つの答えで配点が奇数 (半分ずつの部分点が切り捨てになる)`);
        break;
      case "term":
        checkTerm(iw, a);
        break;
      case "order": {
        if (a.tokens.length < 2) errors.push(`${iw}: tokens は2つ以上`);
        if (a.distractor && a.tokens.includes(a.distractor)) errors.push(`${iw}: distractor が tokens に入っている`);
        if (new Set(a.tokens).size !== a.tokens.length) warns.push(`${iw}: tokens に同じ語がある (alsoOk が要らないか確かめる)`);
        for (const s of a.alsoOk ?? []) if ([...s].sort((x, y) => x - y).join() !== a.tokens.map((_, i) => i).join()) errors.push(`${iw}: alsoOk ${JSON.stringify(s)} が tokens の並べかえになっていない`);
        break;
      }
      case "written": {
        const rs = a.rubric.reduce((x, r) => x + r.points, 0);
        if (rs !== it.points) errors.push(`${iw}: rubric の合計 ${rs} が小問の points ${it.points} と合わない`);
        if (!a.model.trim()) errors.push(`${iw}: model が空`);
        if (a.limit?.max && a.limit.unit === "字" && len(a.model.replace(/\s/g, "")) > a.limit.max) errors.push(`${iw}: 模範解答が ${a.limit.max} 字をこえる`);
        if (a.limit?.max && a.limit.unit === "語" && a.model.trim().split(/\s+/).length > a.limit.max) errors.push(`${iw}: 模範解答が ${a.limit.max} 語をこえる`);
        if (a.autoPart?.kind === "num") checkNum(`${iw} autoPart`, a.autoPart);
        if (a.autoPart?.kind === "term") checkTerm(`${iw} autoPart`, a.autoPart);
        break;
      }
    }
  }
}

// registry.ts が data/ と合っているか (gen-moshi のやり忘れ)
const files = readdirSync("lib/moshi/data").filter((f) => f.endsWith(".ts")).map((f) => f.replace(/\.ts$/, ""));
for (const f of files) if (!REGISTRY[f]) errors.push(`${f}: registry.ts にない。npx tsx scripts/gen-moshi.ts を実行する`);
if (!files.every((f) => unitExists(f))) for (const f of files) if (!unitExists(f)) errors.push(`${f}.ts: ファイル名が学校の地図の単元 id にない`);

const seen = new Set<string>();
let n = 0;
let items = 0;
for (const [file, list] of Object.entries(REGISTRY)) {
  if (only.length && !only.includes(file)) continue;
  for (const d of list) {
    checkDaimon(file, d, seen);
    n++;
    items += d.items.length;
  }
}

for (const w of warns) console.log(`△ ${w}`);
for (const e of errors) console.log(`✕ ${e}`);
console.log(`\n大問 ${n}・小問 ${items}：エラー ${errors.length}・注意 ${warns.length}`);
process.exit(errors.length ? 1 : 0);
