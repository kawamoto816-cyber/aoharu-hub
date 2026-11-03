// 模試データの自動チェック。lib/moshi/data/<単元id>.ts を書いたら、gen-moshi のあとに実行する。
//   npx tsx scripts/check-moshi.ts                  (全部)
//   npx tsx scripts/check-moshi.ts e-math-5-hayasa  (ファイル名＝単元id を指定。いくつでも)
// エラー (✕) が1つでもあれば終了コード1。注意 (△) は直すかどうか人が判断する。
// 大問 (Daimon[]): 配点・検算・図の参照・単元id。
// 単元模試 (UnitMoshi): 上に加えて、単元が LECTURES にあるか・学年・id の重複・配点と目安時間・B の pick・
//   模範解答で満点になるか・A の生成関数をシード1〜100で動かして例外なく妥当な値 (calc・equations の検算、NaN などなし) を返すか・
//   1回分を組んで問題数 (目安5〜8) と満点がシードで変わらないか・小学校の単元では学年外の漢字にルビ《》があるか。
import { readdirSync } from "node:fs";
import { REGISTRY } from "@/lib/moshi/registry";
import { getLecture } from "@/lib/lecture";
import { moshiUnitInfo, unitExists } from "@/lib/moshi";
import { UNIT_REGISTRY } from "@/lib/moshi/registry";
import { buildUnitRound, materialize } from "@/lib/moshi/unit";
import { gradeAnswer, modelResponse } from "@/lib/moshi/grade";
import { gradeOf } from "@/lib/kanji";
import { hasLecture } from "@/lib/lecture";
import { judgeNum, toMathAnswer, cleanNumInput } from "@/lib/moshi/grade";
import { isFigureRef, type Answer, type Daimon, type FigureOrRef, type MoshiSection, type NumQ, type Question, type QuestionBody, type TermQ, type UnitMoshi } from "@/lib/moshi/types";
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

/** 小問の答えの形式ごとの検査 (大問・単元模試の共通) */
function checkAnswer(iw: string, a: Answer, points: number, unit: string) {
  switch (a.kind) {
    case "choice": {
      const n = a.options.length;
      if (n < 2 || n > 6) errors.push(`${iw}: 選択肢は2〜6個`);
      if (new Set(a.options).size !== n) errors.push(`${iw}: 選択肢が重複`);
      const cs = Array.isArray(a.correct) ? a.correct : [a.correct];
      if (cs.some((c) => c < 0 || c >= n)) errors.push(`${iw}: correct が範囲外`);
      if (a.why.length !== n) errors.push(`${iw}: why の数 ${a.why.length} が選択肢 ${n} とちがう`);
      if (a.mistakeOf) {
        const lec = getLecture(unit);
        for (const m of a.mistakeOf) if (m !== null && !lec?.mistakes[m]) errors.push(`${iw}: mistakeOf ${m} がレクチャーの mistakes にない`);
      }
      break;
    }
    case "num":
      checkNum(iw, a);
      if ((a.answerKind === "pair" || a.answerKind === "roots") && points % 2) warns.push(`${iw}: 2つの答えで配点が奇数 (半分ずつの部分点が切り捨てになる)`);
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
      if (rs !== points) errors.push(`${iw}: rubric の合計 ${rs} が小問の points ${points} と合わない`);
      if (!a.model.trim()) errors.push(`${iw}: model が空`);
      if (a.limit?.max && a.limit.unit === "字" && len(a.model.replace(/\s/g, "")) > a.limit.max) errors.push(`${iw}: 模範解答が ${a.limit.max} 字をこえる`);
      if (a.limit?.max && a.limit.unit === "語" && a.model.trim().split(/\s+/).length > a.limit.max) errors.push(`${iw}: 模範解答が ${a.limit.max} 語をこえる`);
      for (const m of a.alsoModels ?? []) if (a.limit?.max && a.limit.unit === "字" && len(m.replace(/\s/g, "")) > a.limit.max) errors.push(`${iw}: 別の模範解答「${m.slice(0, 12)}…」が ${a.limit.max} 字をこえる`);
      if (a.autoPart?.kind === "num") checkNum(`${iw} autoPart`, a.autoPart);
      if (a.autoPart?.kind === "term") checkTerm(`${iw} autoPart`, a.autoPart);
      break;
    }
  }
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
    checkAnswer(iw, it.answer, it.points, it.unit ?? d.units[0]);
  }
}

// registry.ts が data/ と合っているか (gen-moshi のやり忘れ)
const files = readdirSync("lib/moshi/data").filter((f) => f.endsWith(".ts")).map((f) => f.replace(/\.ts$/, ""));
for (const f of files) if (!REGISTRY[f] && !UNIT_REGISTRY[f]) errors.push(`${f}: registry.ts にない。npx tsx scripts/gen-moshi.ts を実行する`);
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

// ======================= 単元模試 (UnitMoshi) =======================

const SEEDS = 100;
const SUBJECT_OF: Record<string, UnitMoshi["subject"]> = { 算数: "sansu", 数学: "math", 理科: "sci", 英語: "eng", 社会: "soc", 国語: "ja" };
const RUBY = /｜([^｜《》\n]+?)《([^《》\n]+?)》|([㐀-鿿々〆ヶ]+)《([^《》\n]+?)》/g;
const KANJI = /[㐀-鿿]/g;

/** 問題の中の、人が読む文字列 (ルビ・NaN などを調べる) */
function textsOf(b: QuestionBody): string[] {
  const out = [b.prompt, b.point, ...b.steps.flatMap((s) => [s.title, s.body, s.trap ?? ""])];
  const a = b.answer;
  if (a.kind === "choice") out.push(...a.options, ...a.why);
  if (a.kind === "written") out.push(a.model, ...a.rubric.map((r) => r.label));
  if (a.kind === "order") out.push(...a.tokens);
  if (a.kind === "num") out.push(...a.answer, ...(a.labels ?? []), a.unit ?? "");
  return out;
}

/** 小学校: その学年までに習わない漢字 (と教育漢字でない漢字) に、ルビ《》がついているか */
function rubyCheck(where: string, texts: string[], grade: number) {
  const bad = new Set<string>();
  for (const t of texts) for (const c of t.replace(RUBY, "").match(KANJI) ?? []) {
    const g = gradeOf(c);
    if (g === 0 || g > grade) bad.add(c);
  }
  if (bad.size) errors.push(`${where}: 小${grade}で習わない漢字にルビがない「${[...bad].join("")}」(漢字《かんじ》と書く)`);
}

function checkBody(where: string, b: QuestionBody, q: Question, unit: string, kidsGrade: number | null) {
  if (!b.prompt?.trim()) errors.push(`${where}: prompt が空`);
  if (len(b.point) > 40) warns.push(`${where}: point が ${len(b.point)} 字 (40字以内)`);
  if (b.steps.length < 1 || b.steps.length > 4) errors.push(`${where}: steps は1〜4つ (いま ${b.steps.length})`);
  checkFigure(`${where} figure`, b.figure);
  b.steps.forEach((s, k) => {
    if (len(s.body) > 150) warns.push(`${where} steps[${k}]: body が ${len(s.body)} 字 (150字以内)`);
    checkFigure(`${where} steps[${k}]`, s.figure);
    for (const x of s.back ?? []) checkHref(`${where} steps[${k}]`, x.href);
  });
  checkAnswer(where, b.answer, q.points, q.unit ?? unit);
  const texts = textsOf(b);
  for (const t of texts) {
    if (/NaN|undefined|Infinity|\[object |null/.test(t)) errors.push(`${where}: 文字列に「${t.match(/NaN|undefined|Infinity|\[object |null/)![0]}」が入っている: ${t.slice(0, 40)}`);
    if ((t.match(/\{\{/g) ?? []).length !== (t.match(/\}\}/g) ?? []).length) errors.push(`${where}: {{ }} の数が合わない: ${t.slice(0, 40)}`);
    if (/\d\.\d{4,}/.test(t)) errors.push(`${where}: 小数の誤差のような数がある: ${t.slice(0, 40)}`);
  }
  if (kidsGrade) rubyCheck(where, texts, kidsGrade);
  // 模範解答を自分の採点器に入れて満点になるか (記述は観点を全部チェックしたとき)
  const a = b.answer;
  try {
    const r = gradeAnswer(a, q.points, modelResponse(a), a.kind === "written" ? a.rubric.map(() => true) : undefined);
    if (r.score !== q.points) errors.push(`${where}: 模範解答で ${r.score}/${q.points} 点 (${r.verdict})`);
  } catch (e) {
    errors.push(`${where}: 模範解答を採点できない (${(e as Error).message})`);
  }
}

function checkSection(file: string, m: UnitMoshi, sec: MoshiSection, si: number, ids: Set<string>, kidsGrade: number | null) {
  const w = `${file} 節${si + 1}「${sec.title}」`;
  if (!sec.questions.length) errors.push(`${w}: questions が空`);
  const bs = sec.questions.filter((q) => q.type === "B");
  if (sec.pick !== undefined) {
    if (!bs.length) errors.push(`${w}: pick があるのに B の問題がない`);
    if (sec.pick < 1 || sec.pick > bs.length) errors.push(`${w}: pick ${sec.pick} が B の問題数 ${bs.length} をこえる (または0以下)`);
    else if (bs.length < sec.pick * 1.5) warns.push(`${w}: B のプール ${bs.length} 問は pick ${sec.pick} の1.5倍未満 (毎回ほぼ同じ問題になる)`);
    const pts = new Set(bs.map((q) => q.points));
    const byD = [1, 2, 3].map((d) => bs.filter((q) => q.difficulty === d));
    if (pts.size > 1 && byD.some((qs) => new Set(qs.map((q) => q.points)).size > 1)) warns.push(`${w}: 同じ難易度の B で配点がちがう (回によって満点が変わる)`);
  }
  if (kidsGrade) rubyCheck(`${w} 見出し・資料`, [sec.title, sec.lead, ...(sec.material ?? []).map((x) => (x.kind === "text" || x.kind === "passage" ? x.body : ""))], kidsGrade);
  sec.material?.forEach((x, i) => {
    if (x.kind === "figure") checkFigure(`${w} material[${i}]`, x.figure);
    if (x.kind === "table") x.rows.forEach((r, j) => r.length !== x.head.length && errors.push(`${w} material[${i}]: 表の rows[${j}] の数が head とちがう`));
  });
  for (const q of sec.questions) {
    const qw = `${file}/${q.id}`;
    if (!/^[a-z0-9][a-z0-9-]*$/.test(q.id)) errors.push(`${qw}: id は英小文字・数字・ハイフンで`);
    if (ids.has(q.id)) errors.push(`${qw}: id が単元の中で重複`);
    ids.add(q.id);
    if (!["A", "B", "C"].includes(q.type)) errors.push(`${qw}: type は A・B・C`);
    if (![1, 2, 3].includes(q.difficulty)) errors.push(`${qw}: difficulty は 1・2・3`);
    if (!Number.isInteger(q.points) || q.points <= 0) errors.push(`${qw}: points は正の整数`);
    if (!Number.isFinite(q.seconds) || q.seconds < 15 || q.seconds > 900) errors.push(`${qw}: seconds ${q.seconds} (目安時間は15〜900秒)`);
    if (q.unit && !unitExists(q.unit)) errors.push(`${qw}: unit ${q.unit} が学校の地図にない`);
    if (q.dependsOn && !sec.questions.some((x) => x.id === q.dependsOn)) errors.push(`${qw}: dependsOn ${q.dependsOn} が同じ節にない`);
    if (q.dependsOn && sec.pick !== undefined) warns.push(`${qw}: pick のある節で dependsOn (前の問題が出ないことがある)`);
    if (q.type === "A") {
      if (typeof q.generate !== "function") {
        errors.push(`${qw}: A には generate が要る`);
        continue;
      }
      const prompts = new Set<string>();
      let failed = 0;
      for (let seed = 1; seed <= SEEDS; seed++) {
        const before = errors.length;
        let body: QuestionBody;
        try {
          body = materialize(q, seed, m.unit);
          // 同じシードで同じ問題になるか (Math.random を使っていないか)
          if (JSON.stringify(materialize(q, seed, m.unit).answer) !== JSON.stringify(body.answer)) errors.push(`${qw} seed ${seed}: 同じシードでちがう問題になる (Math.random などを使っていないか)`);
        } catch (e) {
          errors.push(`${qw} seed ${seed}: generate が例外 (${(e as Error).message})`);
          failed++;
          if (failed >= 3) break;
          continue;
        }
        prompts.add(body.prompt);
        checkBody(`${qw} seed ${seed}`, body, q, m.unit, kidsGrade);
        if (errors.length > before && ++failed >= 3) {
          errors.push(`${qw}: ほかのシードは省略 (3つで止めた)`);
          break;
        }
      }
      if (!failed && prompts.size < 2) errors.push(`${qw}: シード${SEEDS}個で問題文が1種類 (A は数値が変わるように)`);
      else if (!failed && prompts.size < 10) warns.push(`${qw}: シード${SEEDS}個で問題文が ${prompts.size} 種類 (少ない)`);
    } else {
      const { type: _t, ...rest } = q;
      void _t;
      checkBody(qw, rest as QuestionBody, q, m.unit, kidsGrade);
    }
  }
}

function checkUnit(file: string, m: UnitMoshi) {
  const w = `${file} (単元模試)`;
  if (m.unit !== file) errors.push(`${w}: unit "${m.unit}" はファイル名と同じにする`);
  if (!unitExists(file)) errors.push(`${w}: 単元 ${file} が学校の地図 (lib/school) にない`);
  if (!hasLecture(file)) errors.push(`${w}: 単元 ${file} の図解レクチャーがない (LECTURES)。模試の結果からレクチャーへつなぐので、レクチャーのある単元に作る`);
  const info = moshiUnitInfo(file);
  if (info && info.group !== m.grade) errors.push(`${w}: grade "${m.grade}" が学校の地図の見出し "${info.group}" とちがう`);
  if (info && SUBJECT_OF[info.subject] && SUBJECT_OF[info.subject] !== m.subject) errors.push(`${w}: subject "${m.subject}" (地図では ${info.subject} ＝ "${SUBJECT_OF[info.subject]}")`);
  if (REGISTRY[file]) warns.push(`${w}: 同じ単元に大問 (Daimon) もある。/learn/moshi/${file} では UnitMoshi だけを使う`);
  const kidsGrade = /^小(\d)$/.test(m.grade) ? Number(m.grade.slice(1)) : null;
  const ids = new Set<string>();
  m.sections.forEach((sec, i) => checkSection(file, m, sec, i, ids, kidsGrade));
  // 1回分を組む: 問題数・満点がシードで変わらないか
  const counts = new Set<number>();
  const totals = new Set<number>();
  const diffs = new Set<number>();
  for (let seed = 1; seed <= SEEDS; seed++) {
    try {
      const r = buildUnitRound(file, seed);
      if (!r) {
        errors.push(`${w}: buildUnitRound が null`);
        break;
      }
      const its = r.daimon.flatMap((d) => d.items);
      counts.add(its.length);
      totals.add(r.exam.total);
      for (const it of its) diffs.add(it.level);
    } catch (e) {
      errors.push(`${w} seed ${seed}: 1回分を組めない (${(e as Error).message})`);
      break;
    }
  }
  for (const c of counts) {
    if (c < 3 || c > 15) errors.push(`${w}: 1回の問題数が ${c} (3〜15。目安5〜8)`);
    else if (c < 5 || c > 8) warns.push(`${w}: 1回の問題数が ${c} (目安5〜8)`);
  }
  if (totals.size > 1) warns.push(`${w}: 満点が回によって変わる (${[...totals].join("・")})`);
  if (!diffs.has(1)) warns.push(`${w}: 基本 (difficulty 1) の問題がない`);
  if (!diffs.has(2) && !diffs.has(3)) warns.push(`${w}: 標準・発展 (difficulty 2・3) の問題がない`);
  return { count: [...counts][0] ?? 0 };
}

let units = 0;
let uq = 0;
for (const [file, m] of Object.entries(UNIT_REGISTRY)) {
  if (only.length && !only.includes(file)) continue;
  units++;
  uq += checkUnit(file, m).count;
}

for (const w of warns) console.log(`△ ${w}`);
for (const e of errors) console.log(`✕ ${e}`);
console.log(`\n大問 ${n}・小問 ${items}／単元模試 ${units}単元 (1回 ${uq}問)：エラー ${errors.length}・注意 ${warns.length}`);
process.exit(errors.length ? 1 : 0);
