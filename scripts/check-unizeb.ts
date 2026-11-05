// ゼロワンOSユース版のデータを機械で確かめる。使い方：node scripts/check-unizeb.ts
// 型・分量・図の字数（label 12・sub 14・compare のセル 20）・リンク切れ・使わない言い回し・出典の有無（ゼロイチ・エピソードもふくむ）。
// データのファイルは型だけを import しているので、Node 22 でそのまま読み込める。
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = join(import.meta.dirname, "..");
const UZ = join(ROOT, "lib", "unizeb");
const errs: string[] = [];
const warns: string[] = [];
const E = (w: string, m: string) => errs.push(`✗ ${w}: ${m}`);
const W = (w: string, m: string) => warns.push(`△ ${w}: ${m}`);
const len = (s = "") => [...s.replace(/\{\{|\}\}/g, "").replace(/《[^》]*》/g, "")].length;

async function load(dir: string) {
  const out: { file: string; v: any }[] = [];
  for (const f of readdirSync(join(UZ, dir)).filter((f) => f.endsWith(".ts"))) {
    const mod = await import(pathToFileURL(join(UZ, dir, f)).href);
    const v = Object.values(mod)[0];
    out.push({ file: `${dir}/${f}`, v });
  }
  return out;
}

const cardIdx = readFileSync(join(UZ, "cardIndex.ts"), "utf8");
const CARD_IDS = new Set([...cardIdx.matchAll(/"id":\s*"(z\d-\d\d)"/g)].map((m) => m[1]));

const BANNED = ["学校に行っている人も行ってない人も", "登校"];
function text(w: string, s: unknown) {
  if (typeof s !== "string") return;
  for (const b of BANNED) if (s.includes(b)) E(w, `使わない言い回し「${b}」`);
  if ((s.match(/\{\{/g) ?? []).length !== (s.match(/\}\}/g) ?? []).length) E(w, "{{ }} の数が合わない");
}
function walkText(w: string, o: unknown) {
  if (typeof o === "string") text(w, o);
  else if (Array.isArray(o)) o.forEach((x) => walkText(w, x));
  else if (o && typeof o === "object") Object.values(o).forEach((x) => walkText(w, x));
}

function node(w: string, n: any) {
  if (len(n.label) > 12) E(w, `箱の label 12字こえ「${n.label}」(${len(n.label)})`);
  if (n.sub && len(n.sub) > 14) E(w, `箱の sub 14字こえ「${n.sub}」(${len(n.sub)})`);
}
function figure(w: string, f: any) {
  if (!f) return;
  if (len(f.title) > 30) W(w, `図の title 30字こえ「${f.title}」`);
  switch (f.type) {
    case "flow":
    case "cycle":
      if (f.steps.length < 3 || f.steps.length > 6) W(w, `${f.type} の箱が ${f.steps.length} 個`);
      f.steps.forEach((n: any) => node(w, n));
      break;
    case "cause":
      [...f.causes, f.effect, ...(f.chain ?? [])].forEach((n: any) => node(w, n));
      break;
    case "tree": {
      const t = (n: any) => { node(w, n); if ((n.children?.length ?? 0) > 6) W(w, `木の子が ${n.children.length}`); n.children?.forEach(t); };
      t(f.root);
      break;
    }
    case "compare":
      if (f.columns.length < 2 || f.columns.length > 4) E(w, `compare の列が ${f.columns.length}`);
      f.columns.forEach((c: any) => len(c.title) > 12 && E(w, `compare の列名 12字こえ「${c.title}」`));
      f.rows.forEach((r: any) => {
        if (r.cells.length !== f.columns.length) E(w, `compare のセルの数が列と合わない「${r.label ?? r.cells[0]}」`);
        r.cells.forEach((c: string) => len(c) > 20 && E(w, `compare のセル 20字こえ「${c}」(${len(c)})`));
        if (r.label && len(r.label) > 12) E(w, `compare の行見出し 12字こえ「${r.label}」`);
      });
      break;
    case "timeline":
      f.events.forEach((e: any) => len(e.label) > 20 && E(w, `年表 label 20字こえ「${e.label}」`));
      break;
    case "formula":
      f.steps.forEach((s: any) => {
        if (len(s.expr) > 30) E(w, `式 30字こえ「${s.expr}」`);
        if (s.note && len(s.note) > 20) E(w, `式の note 20字こえ「${s.note}」`);
      });
      break;
    case "area":
      if (f.kind === "bar") f.bars.forEach((b: any) => b.parts.forEach((p: any) => typeof p.value !== "number" && E(w, "線分図の value が数でない")));
      break;
  }
}
function sections(w: string, secs: any[], min: number, max: number) {
  let total = 0;
  secs.forEach((s, i) => {
    const sw = `${w} 節${i + 1}`;
    if (!s.heading || !s.body) E(sw, "heading か body がない");
    (s.reading ?? []).forEach((p: string, k: number) => {
      const n = len(p);
      total += n;
      if (n < 100 || n > 300) W(sw, `段落${k + 1} が ${n} 字（目安 120〜260）`);
    });
    figure(sw, s.figure);
    if (i < secs.length - 1 && !s.cliff) W(sw, "cliff がない");
  });
  if (total < min || total > max) W(w, `reading 合計 ${total} 字（目安 ${min}〜${max}）`);
  return total;
}
const hrefs: { w: string; href: string }[] = [];

const lectures = await load("lectures");
const LEC_IDS = new Set<string>();
for (const { file, v } of lectures) {
  const id = v.unit?.replace(/^unizeb-/, "");
  LEC_IDS.add(id);
  if (!CARD_IDS.has(id)) E(file, `unit「${v.unit}」のカードがない`);
  if (!file.endsWith(`${id}.ts`)) E(file, "ファイル名と unit が合わない");
  if (v.sections.length < 4 || v.sections.length > 6) E(file, `節が ${v.sections.length}`);
  const figs = v.sections.map((s: any) => s.figure?.type).filter(Boolean);
  if (figs.length < 3 || new Set(figs).size < 2) E(file, `図が ${figs.length} 個・${new Set(figs).size} 種類`);
  if (!v.mystery || !v.mission) E(file, "mystery か mission がない");
  if (v.mystery && !v.sections.some((s: any) => s.reveal)) E(file, "reveal の節がない");
  if (!v.story) E(file, "story がない");
  if (v.mistakes.length < 2 || v.mistakes.length > 4) E(file, `mistakes が ${v.mistakes.length}`);
  if (v.check.length < 2 || v.check.length > 3) E(file, `check が ${v.check.length}`);
  if (!v.next.some((n: any) => n.href === `/learn/unizeb/card/${id}`)) E(file, "next にカードへのリンクがない");
  sections(file, v.sections, 1500, 3000);
  if (v.story?.kind === "manga4") v.story.panels.forEach((p: any, i: number) => p.art && p.lines.forEach((l: any) => len(l.text) > 18 * 3 && W(file, `4コマ${i + 1} のせりふが長い`)));
  walkText(file, v);
  v.next.forEach((n: any) => hrefs.push({ w: file, href: n.href }));
}
const den = await load("den");
const DEN_IDS = new Set(den.map((d) => d.v.id));
for (const { file, v } of den) {
  if (!file.endsWith(`${v.id}.ts`)) E(file, "ファイル名と id が合わない");
  const types = v.sections.map((s: any) => s.figure?.type);
  if (!types.includes("timeline")) E(file, "年表（timeline）がない");
  if (!types.includes("cause") && !types.includes("flow")) E(file, "0→1の図（cause か flow）がない");
  if (v.sources.length < 3) E(file, `出典が ${v.sources.length}（3つ以上）`);
  v.skills.forEach((s: any) => !CARD_IDS.has(s.card) && E(file, `スキル ${s.card} がない`));
  sections(file, v.sections, 1200, 2200);
  walkText(file, v);
}
const cases = await load("case");
const CASE_IDS = new Set(cases.map((c) => c.v.id));
for (const { file, v } of cases) {
  if (!file.endsWith(`${v.id}.ts`)) E(file, "ファイル名と id が合わない");
  if (v.options.length !== 3) E(file, `選択肢が ${v.options.length}`);
  if (v.real && v.sources.length < 1) E(file, "実在のケースに出典がない");
  if (!v.real && !/架空/.test(v.note)) E(file, "架空のケースの note に「架空」がない");
  v.lessons.forEach((s: any) => !CARD_IDS.has(s.card) && E(file, `スキル ${s.card} がない`));
  figure(file + " 状況", v.situation.figure);
  figure(file + " 結果", v.outcome.figure);
  walkText(file, v);
}
// ゼロイチ・エピソード：ファイル名と id・no の重なり・場面の段落（2段落、120〜260字）・図・選択肢（2〜3、label 15字）・
// スキル（2〜3枚、カードがある）・考える問い（1〜2）・出典（1つ以上、URL と確かめた日、Wikipedia だけにしない）・
// 直接引用のおそれ（長い「」）・最新の数字のおそれ（「現在」「時価総額」など）。
const eps = await load("ep");
const EP_IDS = new Set(eps.map((e) => e.v.id));
const epNos = new Map<number, string>();
for (const { file, v } of eps) {
  if (!file.endsWith(`${v.id}.ts`)) E(file, "ファイル名と id が合わない");
  if (!Number.isInteger(v.no) || v.no < 1) E(file, `no が正しくない（${v.no}）`);
  else if (epNos.has(v.no)) E(file, `no ${v.no} が ${epNos.get(v.no)} と重なっている`);
  else epNos.set(v.no, file);
  if (CASE_IDS.has(v.id) || DEN_IDS.has(v.id)) W(file, `id「${v.id}」が列伝・ケースと同じ（ページは別だが紛らわしい）`);
  if (!v.title || len(v.title) > 24) W(file, `title が ${len(v.title)} 字（目安 12〜20）`);
  if (!v.company || !v.year) E(file, "company か year がない");
  const sit = v.situation ?? {};
  if (!sit.body) E(file, "situation.body がない");
  if (!Array.isArray(sit.reading) || sit.reading.length !== 2) E(file, `situation.reading が ${sit.reading?.length ?? 0} 段落（2段落）`);
  (sit.reading ?? []).forEach((p: string, k: number) => {
    const n = len(p);
    if (n < 100 || n > 300) E(file, `場面の段落${k + 1} が ${n} 字（120〜260）`);
    else if (n < 120 || n > 260) W(file, `場面の段落${k + 1} が ${n} 字（目安 120〜260）`);
  });
  if (!sit.figure) E(file, "場面の図がない");
  figure(file + " 場面", sit.figure);
  if (!v.question) E(file, "question がない");
  if (v.options.length < 2 || v.options.length > 3) E(file, `選択肢が ${v.options.length}（2〜3）`);
  v.options.forEach((o: any, i: number) => {
    if (!o.label || !o.plus || !o.minus) E(file, `選択肢${i + 1} に label・plus・minus がない`);
    if (len(o.label) > 15) W(file, `選択肢${i + 1} の label 15字こえ「${o.label}」`);
  });
  if (!v.decision?.body) E(file, "decision.body がない");
  if (!v.after?.body) E(file, "after.body がない");
  [...(v.decision?.reading ?? []), ...(v.after?.reading ?? [])].forEach((p: string) => {
    const n = len(p);
    if (n < 80 || n > 300) W(file, `決断・その後の段落が ${n} 字（目安 120〜260）`);
  });
  figure(file + " その後", v.after?.figure);
  if (v.skills.length < 2 || v.skills.length > 3) E(file, `skills が ${v.skills.length}（2〜3）`);
  v.skills.forEach((s: any) => { if (!CARD_IDS.has(s.card)) E(file, `スキル ${s.card} がない`); if (!s.how) E(file, `スキル ${s.card} に how がない`); });
  if (!v.think?.length || v.think.length > 2) E(file, `think が ${v.think?.length ?? 0}（1〜2）`);
  if (!v.note) E(file, "note がない");
  if (!v.sources?.length) E(file, "出典がない");
  v.sources?.forEach((s: any) => {
    if (!/^https:\/\//.test(s.url ?? "")) E(file, `出典の URL が https でない「${s.title}」`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s.checked ?? "")) E(file, `出典の確かめた日の形がちがう「${s.title}」`);
  });
  const wiki = (v.sources ?? []).filter((s: any) => /wikipedia\.org/.test(s.url));
  if (wiki.length && wiki.length === v.sources.length) E(file, "出典が Wikipedia だけ");
  else if (wiki.length) W(file, "出典に Wikipedia がある（Wikipedia だけが根拠の事実は書かない）");
  const body: string[] = [];
  const pick = (o: unknown) => { if (typeof o === "string") body.push(o); else if (Array.isArray(o)) o.forEach(pick); else if (o && typeof o === "object") Object.values(o).forEach(pick); };
  pick([v.situation, v.question, v.decision, v.after]);
  for (const t of body) {
    for (const m of t.matchAll(/「([^」]*)」/g)) if (len(m[1]) > 20) W(file, `長い「」（直接引用のおそれ）「${m[1].slice(0, 20)}…」`);
    for (const w of ["現在", "いまでは", "今では", "時価総額", "最新の"]) if (t.includes(w)) W(file, `「${w}」（最新の数字のおそれ。書くなら◯年時点と出典）`);
  }
  walkText(file, v);
}
const shiryo = await load("shiryo");
const SHIRYO_CH = new Set(shiryo.map((s) => `ch${s.v.ch}`));
for (const { file, v } of shiryo) {
  v.items.forEach((it: any, i: number) => {
    figure(`${file} ${i + 1}`, it.figure);
    if (!it.sources.length) E(`${file} ${i + 1}`, "出典がない");
  });
  walkText(file, v);
}
// 場面イラストと写真
import { existsSync } from "node:fs";
const PROPS = new Set(readFileSync(join(UZ, "types.ts"), "utf8").match(/export type UzProp =([^;]+);/)![1].match(/"(\w+)"/g)!.map((x) => x.slice(1, -1)));
const COMIC_PROPS = new Set(readFileSync(join(ROOT, "lib", "lecture", "types.ts"), "utf8").match(/export type ComicProp =([^;]+);/)![1].match(/"(\w+)"/g)!.map((x) => x.slice(1, -1)));
const pageSecs: Record<string, number> = {};
lectures.forEach(({ v }) => (pageSecs[`lec/${v.unit.replace(/^unizeb-/, "")}`] = v.sections.length));
den.forEach(({ v }) => (pageSecs[`den/${v.id}`] = v.sections.length));
cases.forEach(({ v }) => (pageSecs[`case/${v.id}`] = 2));
eps.forEach(({ v }) => (pageSecs[`ep/${v.id}`] = 2));
const scenes = await load("scenes");
let nScene = 0;
for (const { file, v } of scenes) {
  const key = file.replace(/^scenes\//, "").replace(/\.ts$/, "").replace(/^(lec|den|case|ep)-/, "$1/");
  if (!(key in pageSecs)) E(file, `ページ ${key} がない`);
  for (const sc of v) {
    nScene++;
    if (sc.at < 0 || sc.at >= (pageSecs[key] ?? 0)) E(file, `at ${sc.at} の節がない`);
    if (!sc.caption || !sc.alt) E(file, "caption か alt がない");
    sc.extras?.forEach((x: any) => { if (!PROPS.has(x.kind)) E(file, `小道具 ${x.kind} がない`); if (x.text && len(x.text) > 8) E(file, `小道具の字 8字こえ「${x.text}」`); });
    sc.art.props?.forEach((x: any) => !COMIC_PROPS.has(x.kind) && E(file, `4コマの小道具 ${x.kind} がない`));
    sc.labels?.forEach((l: any) => len(l.text) > 12 && E(file, `注記 12字こえ「${l.text}」`));
    walkText(file, sc);
  }
}
const photoCheck = (w: string, secs: any[]) => secs.forEach((s) => s.photos?.forEach((ph: any) => {
  if (!existsSync(join(ROOT, "public", ph.src))) E(w, `写真のファイルがない ${ph.src}`);
  if (!/^(Public domain|PD|CC0|CC BY( |-)?(SA )?\d|CC BY-SA \d)/i.test(ph.credit.license)) E(w, `使えないライセンス「${ph.credit.license}」`);
  if (!/^https:\/\/commons\.wikimedia\.org\//.test(ph.credit.source)) E(w, `出典が Commons でない ${ph.credit.source}`);
}));
lectures.forEach(({ file, v }) => photoCheck(file, v.sections));
den.forEach(({ file, v }) => photoCheck(file, v.sections));

// 演習（実務のワークブック）：配点の合計100・calc の式がすべての版で計算できて割り切れる・[[name]] がすべての版にある・
// skills がその Lv のカード・review のリンク先がある・資料の分量・使わない言い回し。
const KIT = "../lib/unizeb/enshuKit.ts";
const { evalExpr, varNames } = (await import(KIT)) as typeof import("../lib/unizeb/enshuKit");
const enshu = await load("enshu");
const cardLv = new Map([...cardIdx.matchAll(/"id":\s*"(z\d-\d\d)",\s*"lv":\s*(\d+)/g)].map((m) => [m[1], Number(m[2])]));
const lecSecs = new Map(lectures.map(({ v }) => [v.unit.replace(/^unizeb-/, ""), v.sections.length]));
// AI昇進試験（kind "shoshin"）：ミッション3つ・各ミッションに データパック（1,500〜2,500字）・dilemma（Unicorn と Zebra）・観点 U・Z・X が1つずつ、
// 1ミッション33〜34点・合計100（合計は下の共通の確かめ）、答えは write、そのLvまでのスキルを全部使う、使わない言い回し（人を下に見る言葉）。
const SHOSHIN_BANNED = ["老人", "弱者", "情弱", "勝ち組", "負け組", "年寄りでも"];
const pickStr = (o: unknown, out: string[] = []) => { if (typeof o === "string") out.push(o); else if (Array.isArray(o)) o.forEach((x) => pickStr(x, out)); else if (o && typeof o === "object") Object.entries(o).forEach(([k, x]) => k !== "type" && k !== "kind" && k !== "tone" && k !== "dir" && pickStr(x, out)); return out; };
function shoshinCheck(w: string, v: any) {
  const used = new Set<string>();
  for (const t of v.tasks) {
    const tw = `${w} ミッション${t.no}`;
    t.skills.forEach((s: string) => used.add(s));
    if (t.type !== "write") E(tw, `ミッションの答えは write（${t.type}）`);
    if (!t.title) E(tw, "ミッションの title がない");
    if (!t.dilemma?.unicorn?.trim() || !t.dilemma?.zebra?.trim()) E(tw, "dilemma（Unicorn と Zebra の言い分）がない");
    if (!t.data?.length) E(tw, "データパック（data）がない");
    else {
      const n = t.data.reduce((a: number, m: any) => a + pickStr(m).reduce((b, x) => b + len(x), 0), 0);
      if (n < 1500 || n > 2500) E(tw, `データパックの分量 ${n} 字（1,500〜2,500）`);
      if (!t.data.some((m: any) => m.table || m.figure)) E(tw, "データパックに表も図もない");
      t.data.forEach((m: any) => figure(`${tw} ${m.title}`, m.figure));
    }
    const axes = t.crit.map((c: any) => c.axis).sort().join("");
    if (axes !== "UXZ") E(tw, `観点の軸が U・Z・X の1つずつでない（${t.crit.map((c: any) => c.axis ?? "なし").join("・")}）`);
    const tsum = t.crit.reduce((a: number, c: any) => a + c.w, 0);
    if (tsum < 33 || tsum > 34) E(tw, `ミッションの配点 ${tsum}（33〜34）`);
    const mlen = len(t.model);
    if (mlen > 450) W(tw, `模範解答 ${mlen} 字（答えは150〜400字）`);
  }
  const all = [...cardLv].filter(([, lv]) => lv <= v.lv).map(([id]) => id);
  const miss = all.filter((id) => !used.has(id));
  // 昇進試験は1ミッション10枚までなので、全スキルは入らない。24枚以上（Lv1〜3 の試験は24枚すべて）を使っていればよい
  const usedN = all.length - miss.length;
  if (usedN < Math.min(24, all.length)) W(w, `使っているスキルが ${usedN} 枚（24枚以上に）。未使用：${miss.join("・")}`);
  for (const s of pickStr([v.title, v.intro, v.company, v.materials, v.tasks])) for (const b of SHOSHIN_BANNED) if (s.includes(b)) E(w, `使わない言い回し「${b}」`);
}
for (const { file, v } of enshu) {
  const w = file;
  if (!file.endsWith(`${v.id}.ts`)) E(w, "ファイル名と id が合わない");
  if (v.kind === "unit" && v.id !== `lv${v.lv}`) E(w, `id「${v.id}」と lv ${v.lv} が合わない`);
  if (v.kind === "shuryo") {
    const k = { "shuryo-1": 3, "shuryo-2": 9, "shuryo-3": 15 }[v.id as string];
    if (k !== v.lv) E(w, `修了演習の lv が節目（3・9・15）と合わない`);
    if (!v.award) E(w, "修了演習に award がない");
  }
  const sho = v.kind === "shoshin";
  if (sho) {
    const k = { "shoshin-1": 3, "shoshin-2": 9, "shoshin-3": 15 }[v.id as string];
    if (k !== v.lv) E(w, `昇進試験の id と lv が節目（3・9・15）と合わない`);
    if (!v.award) E(w, "昇進試験に award（昇進先）がない");
    if (v.pass !== 80) E(w, `昇進試験の合格点 ${v.pass}（80）`);
    shoshinCheck(w, v);
  } else {
    const pl = v.lv <= 9 ? 70 : v.lv === 11 ? 80 : 75;
    if (v.pass !== pl) E(w, `合格点 ${v.pass}（passLine は ${pl}）`);
  }
  if (v.formulas) for (const [name, ex] of Object.entries(v.formulas as Record<string, string>)) {
    v.variants.forEach((x: any, i: number) => {
      try {
        const r = evalExpr(ex, x);
        if (!Number.isInteger(r)) E(w, `版${i + 1} の ${name}（${ex}）が割り切れない（${r}）`);
        if (!(name in x)) E(w, `版${i + 1} に ${name} がない（formulas）`);
        else if (x[name] !== r) E(w, `版${i + 1} の ${name}（${x[name]}）と式 ${ex} の値（${r}）がちがう`);
      } catch (e: any) {
        E(w, `版${i + 1} の ${name}：${e.message}`);
      }
    });
  }
  const [tMin, tMax] = sho ? [3, 3] : v.kind === "shuryo" ? [5, 6] : [4, 6];
  if (v.tasks.length < tMin || v.tasks.length > tMax) E(w, `課題が ${v.tasks.length} 問（${tMin}〜${tMax}）`);
  const sum = v.tasks.reduce((a: number, t: any) => a + t.crit.reduce((b: number, c: any) => b + c.w, 0), 0);
  if (sum !== 100) E(w, `配点の合計が ${sum}`);
  if (v.variants.length < 3) E(w, `variants が ${v.variants.length}（3つ以上）`);
  const keys0 = Object.keys(v.variants[0] ?? {}).sort().join(",");
  v.variants.forEach((x: any, i: number) => Object.keys(x).sort().join(",") !== keys0 && E(w, `版${i + 1} の名前が版1とちがう`));
  const used = varNames([v.title, v.intro, v.company, v.materials, v.tasks]);
  for (const n of used) v.variants.forEach((x: any, i: number) => !(n in x) && E(w, `[[${n}]] が版${i + 1} にない`));
  const nos = new Set<string>();
  for (const t of v.tasks) {
    const tw = `${w} 課題${t.no}`;
    if (nos.has(t.no)) E(tw, "課題の番号が重なっている");
    nos.add(t.no);
    const [sMin, sMax] = sho ? [3, 10] : [1, 3];
    if (t.skills.length < sMin || t.skills.length > sMax) E(tw, `skills が ${t.skills.length} 枚`);
    for (const s of t.skills) {
      if (!CARD_IDS.has(s)) E(tw, `スキル ${s} がない`);
      const lv = cardLv.get(s);
      if (v.kind === "unit" && lv !== v.lv) E(tw, `スキル ${s} は Lv${lv}（この演習は Lv${v.lv}）`);
      if ((v.kind === "shuryo" || sho) && (lv ?? 99) > v.lv) E(tw, `スキル ${s} は Lv${lv}（Lv${v.lv} までの${sho ? "昇進試験" : "修了演習"}）`);
    }
    if (!t.model) E(tw, "model がない");
    if (t.type === "calc") {
      if (!t.calc) { E(tw, "calc の式がない"); continue; }
      if (t.crit.length !== 1) E(tw, "calc の観点は1つ");
      v.variants.forEach((x: any, i: number) => {
        try {
          const r = evalExpr(t.calc.expr, x);
          if (!Number.isFinite(r)) E(tw, `版${i + 1} で式の値が数でない`);
          else if (!t.calc.tolerance && !Number.isInteger(r)) E(tw, `版${i + 1} で割り切れない（${r}）`);
          else if (r <= 0) W(tw, `版${i + 1} の答えが ${r}`);
          if (`ans${t.no}` in x && x[`ans${t.no}`] !== r) E(tw, `版${i + 1} の ans${t.no}（${x[`ans${t.no}`]}）と式の値（${r}）がちがう`);
        } catch (e: any) {
          E(tw, `版${i + 1}：${e.message}`);
        }
      });
    } else {
      if (t.type === "choice" && (!t.options || t.options.length < 2 || t.options.length > 5)) E(tw, "choice の選択肢は2〜5");
      t.crit.forEach((c: any, i: number) => { if (!c.t || !c.g4 || !c.g2) E(tw, `観点${i + 1} に t・g4・g2 がない`); });
    }
    if (!t.review || (Array.isArray(t.review) && !t.review.length)) W(tw, "review がない");
    else for (const rv of [t.review].flat() as string[]) {
      const m = rv.match(/^\/learn\/unizeb\/(lec|card)\/(z\d-\d\d)(?:#lec-s(\d+))?$/);
      if (!m) E(tw, `review の形がちがう ${rv}`);
      else if (m[1] === "card" && !CARD_IDS.has(m[2])) E(tw, `review のリンク切れ ${rv}`);
      else if (m[1] === "lec" && !lecSecs.has(m[2])) E(tw, `review のレクチャーがない ${rv}`);
      else if (m[1] === "lec" && m[3] && Number(m[3]) > (lecSecs.get(m[2]) ?? 0)) E(tw, `review の節がない ${rv}`);
    }
  }
  let chars = 0;
  for (const m of v.materials) {
    const strs: string[] = [];
    const pick = (o: unknown) => { if (typeof o === "string") strs.push(o); else if (Array.isArray(o)) o.forEach(pick); else if (o && typeof o === "object") Object.entries(o).forEach(([k, x]) => k !== "type" && k !== "kind" && k !== "tone" && k !== "dir" && pick(x)); };
    pick(m);
    chars += strs.reduce((a, x) => a + len(x), 0);
    figure(`${w} ${m.title}`, m.figure);
  }
  if (!sho && (chars < 1500 || chars > 3000)) W(w, `資料の分量 ${chars} 字（見出し・表・図をふくむ。目安 1,500〜3,000）`);
  walkText(w, v);
}

for (const { w, href } of hrefs) {
  const m = href.match(/^\/learn\/unizeb(?:\/(lec|den|case|card|ep)\/([\w-]+)|\/shiryo(?:#(ch\d+))?)?$/);
  if (!m) { W(w, `よそへのリンク ${href}`); continue; }
  const [, kind, id, ch] = m;
  if (kind === "lec" && !LEC_IDS.has(id)) W(w, `まだないレクチャー ${href}`);
  if (kind === "card" && !CARD_IDS.has(id)) E(w, `リンク切れ ${href}`);
  if (kind === "den" && !DEN_IDS.has(id)) E(w, `リンク切れ ${href}`);
  if (kind === "case" && !CASE_IDS.has(id)) E(w, `リンク切れ ${href}`);
  if (kind === "ep" && !EP_IDS.has(id)) E(w, `リンク切れ ${href}`);
  if (ch && !SHIRYO_CH.has(ch)) E(w, `リンク切れ ${href}`);
}
console.log(`レクチャー ${lectures.length}・列伝 ${den.length}・ケース ${cases.length}・エピソード ${eps.length}・資料集 ${shiryo.length}章・場面イラスト ${nScene}・演習 ${enshu.length}`);
warns.forEach((x) => console.log(x));
errs.forEach((x) => console.log(x));
console.log(errs.length ? `エラー ${errs.length}` : "エラーなし");
process.exit(errs.length ? 1 : 0);
