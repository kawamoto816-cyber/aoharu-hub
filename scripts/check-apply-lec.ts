// 「選ばれる力」の図解の教科書（lib/apply-lec）を機械で確かめる。使い方：node scripts/check-apply-lec.ts
// 型・分量（reading 合計 1500〜3000 字）・図（3つ以上・2種類以上、箱 label 12字・sub 14字・compare のセル 20字）・
// 4コマの絵（1コマ3行・1行18字、型にある look・小道具）・次の教材のリンク先・著書の章（目次どおり）・使わない言い回し。
// 著書の本文で目次も照らしたいときは APL_BOOKS_DIR=<sogo.txt と shin.txt のあるフォルダ> をつける。
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = join(import.meta.dirname, "..");
const AL = join(ROOT, "lib", "apply-lec");
const errs: string[] = [];
const warns: string[] = [];
const E = (w: string, m: string) => errs.push(`✗ ${w}: ${m}`);
const W = (w: string, m: string) => warns.push(`△ ${w}: ${m}`);
const len = (s = "") => [...s.replace(/\{\{|\}\}/g, "").replace(/《[^》]*》/g, "")].length;

// 拡張子つきの import は tsc が通さないので、パスを変数にして読む
const UNITS = "../lib/apply-lec/units.ts";
const BOOKS = "../lib/apply-lec/books.ts";
const { APL_UNITS } = (await import(UNITS)) as typeof import("../lib/apply-lec/units");
const { APL_BOOKS, BOOK_TOC } = (await import(BOOKS)) as typeof import("../lib/apply-lec/books");
const UNIT_IDS = new Set(APL_UNITS.map((u) => u.id));

const BANNED = ["学校に行っている人も行ってない人も", "登校"];
function walkText(w: string, o: unknown) {
  if (typeof o === "string") {
    for (const b of BANNED) if (o.includes(b)) E(w, `使わない言い回し「${b}」`);
    if ((o.match(/\{\{/g) ?? []).length !== (o.match(/\}\}/g) ?? []).length) E(w, `{{ }} の数が合わない「${o.slice(0, 20)}…」`);
  } else if (Array.isArray(o)) o.forEach((x) => walkText(w, x));
  else if (o && typeof o === "object") Object.values(o).forEach((x) => walkText(w, x));
}

function node(w: string, n: { label: string; sub?: string }) {
  if (len(n.label) > 12) E(w, `箱の label 12字こえ「${n.label}」(${len(n.label)})`);
  if (n.sub && len(n.sub) > 14) E(w, `箱の sub 14字こえ「${n.sub}」(${len(n.sub)})`);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function figure(w: string, f: any) {
  if (len(f.title) > 30) W(w, `図の title 30字こえ「${f.title}」`);
  switch (f.type) {
    case "flow":
    case "cycle":
      if (f.steps.length < 3 || f.steps.length > 6) W(w, `${f.type} の箱が ${f.steps.length} 個`);
      f.steps.forEach((n: { label: string; sub?: string }) => node(w, n));
      break;
    case "cause":
      [...f.causes, f.effect, ...(f.chain ?? [])].forEach((n: { label: string; sub?: string }) => node(w, n));
      break;
    case "tree": {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const t = (n: any) => {
        node(w, n);
        if ((n.children?.length ?? 0) > 6) W(w, `木の子が ${n.children.length}`);
        n.children?.forEach(t);
      };
      t(f.root);
      break;
    }
    case "compare":
      if (f.columns.length < 2 || f.columns.length > 4) E(w, `compare の列が ${f.columns.length}`);
      f.columns.forEach((c: { title: string }) => len(c.title) > 12 && E(w, `compare の列名 12字こえ「${c.title}」`));
      f.rows.forEach((r: { label?: string; cells: string[] }) => {
        if (r.cells.length !== f.columns.length) E(w, `compare のセルの数が列と合わない「${r.label ?? r.cells[0]}」`);
        r.cells.forEach((c) => len(c) > 20 && E(w, `compare のセル 20字こえ「${c}」(${len(c)})`));
        if (r.label && len(r.label) > 12) E(w, `compare の行見出し 12字こえ「${r.label}」`);
      });
      break;
    case "timeline":
      f.events.forEach((e: { label: string }) => len(e.label) > 20 && E(w, `年表 label 20字こえ「${e.label}」`));
      break;
    case "formula":
      f.steps.forEach((s: { expr: string; note?: string }) => {
        if (len(s.expr) > 30) E(w, `式 30字こえ「${s.expr}」`);
        if (s.note && len(s.note) > 20) E(w, `式の note 20字こえ「${s.note}」`);
      });
      break;
    case "area":
      if (f.kind === "bar")
        f.bars.forEach((b: { parts: { value: unknown; label?: string }[] }) =>
          b.parts.forEach((p) => {
            if (typeof p.value !== "number") E(w, "線分図の value が数でない");
            if (p.label && len(p.label) > 12) E(w, `線分図の label 12字こえ「${p.label}」`);
          }),
        );
      break;
  }
}

// 4コマの絵で使える look・小道具・背景（lib/lecture/types.ts から読む）
const LT = readFileSync(join(ROOT, "lib", "lecture", "types.ts"), "utf8");
const union = (name: string) => new Set(LT.match(new RegExp(`export type ${name} =([^;]+);`))![1].match(/"(\w+)"/g)!.map((x) => x.slice(1, -1)));
const LOOKS = union("ComicLook");
const FACES = union("ComicFace");
const FXS = new Set([...LT.match(/export type ComicFx =([^;]+);/)![1].matchAll(/"([^"]+)"/g)].map((m) => m[1]));
const PROPS = union("ComicProp");
const BGS = new Set(LT.match(/bg\?: ([^;]+);/)![1].match(/"(\w+)"/g)!.map((x) => x.slice(1, -1)));

// 次の教材のリンク先
const APP_HOSTS = new Set(["interview.bluespring.co.jp", "reason.bluespring.co.jp", "jkap.bluespring.co.jp", "app.bluespring.co.jp"]);
const TENSAKU_KINDS = new Set(readFileSync(join(ROOT, "app", "tensaku", "page.tsx"), "utf8").match(/function toKind[\s\S]*?\n\}/)![0].match(/"(\w+)"/g)!.map((x) => x.slice(1, -1)));
function routeExists(path: string): boolean {
  // app/ の下を1段ずつたどる。動的なフォルダ（[id] など）も通す
  const segs = path.split("/").filter(Boolean);
  let dirs = [join(ROOT, "app")];
  for (const s of segs) {
    const next: string[] = [];
    for (const d of dirs) {
      if (!existsSync(d)) continue;
      for (const e of readdirSync(d, { withFileTypes: true })) {
        if (!e.isDirectory()) continue;
        if (e.name === s || /^\[.+\]$/.test(e.name)) next.push(join(d, e.name));
        if (/^\(.+\)$/.test(e.name)) next.push(...[join(d, e.name, s)].filter(existsSync));
      }
    }
    dirs = next;
  }
  return dirs.some((d) => existsSync(join(d, "page.tsx")) || existsSync(join(d, "route.ts")));
}

// ---- 単元のデータ ----
const files = readdirSync(join(AL, "data")).filter((f) => f.endsWith(".ts")).sort();
const written = new Set<string>();
const kinds: string[] = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lectures: { file: string; v: any }[] = [];
for (const f of files) {
  const mod = await import(pathToFileURL(join(AL, "data", f)).href);
  lectures.push({ file: `data/${f}`, v: Object.values(mod)[0] });
}
for (const { v } of lectures) written.add(v.unit);

for (const { file, v } of lectures) {
  const id = v.unit as string;
  if (!UNIT_IDS.has(id)) E(file, `unit「${id}」が units.ts にない`);
  if (file !== `data/${id}.ts`) E(file, "ファイル名と unit が合わない");
  if (v.sections.length < 4 || v.sections.length > 6) E(file, `節が ${v.sections.length}（4〜6）`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const figs = v.sections.map((s: any) => s.figure?.type).filter(Boolean);
  if (figs.length < 3 || new Set(figs).size < 2) E(file, `図が ${figs.length} 個・${new Set(figs).size} 種類（3つ以上・2種類以上）`);
  if (!v.mystery || !v.mission) E(file, "mystery か mission がない");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (v.mystery && !v.sections.some((s: any) => s.reveal)) E(file, "reveal の節がない");
  if (!v.story) E(file, "story がない");
  else {
    kinds.push(v.story.kind);
    if (!/創作/.test(v.story.note)) E(file, "story の note に「創作」がない");
  }
  if (v.mistakes.length < 2 || v.mistakes.length > 4) E(file, `mistakes が ${v.mistakes.length}（2〜4）`);
  if (v.check.length < 2 || v.check.length > 3) E(file, `check が ${v.check.length}（2〜3）`);

  let total = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  v.sections.forEach((s: any, i: number) => {
    const sw = `${file} 節${i + 1}`;
    if (!s.heading || !s.body) E(sw, "heading か body がない");
    if (!s.reading?.length) E(sw, "reading がない");
    if (s.reading && (s.reading.length < 2 || s.reading.length > 4)) W(sw, `reading の段落が ${s.reading.length}（2〜4）`);
    (s.reading ?? []).forEach((p: string, k: number) => {
      const n = len(p);
      total += n;
      if (n < 120 || n > 260) W(sw, `段落${k + 1} が ${n} 字（目安 120〜260）`);
    });
    if (s.figure) figure(sw, s.figure);
    if (i < v.sections.length - 1 && !s.cliff) E(sw, "cliff がない");
  });
  if (total < 1500 || total > 3000) E(file, `reading 合計 ${total} 字（1500〜3000）`);
  else console.log(`  ${id}: reading ${total} 字・図 ${figs.join("/")}・${v.story?.kind}`);

  // 悪い例→よい例
  if (!JSON.stringify(v.sections).includes("悪い例")) E(file, "「悪い例→よい例」の書き換えがない");

  // 小説の分量
  if (v.story?.kind === "novel") {
    const n = v.story.paragraphs.reduce((a: number, p: string) => a + len(p), 0);
    if (n < 800 || n > 1600) E(file, `小説が ${n} 字（800〜1600）`);
  }
  // 4コマ
  if (v.story?.kind === "manga4") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    v.story.panels.forEach((p: any, i: number) => {
      const pw = `${file} 4コマ${i + 1}`;
      if (!p.art) return W(pw, "art がない（絵なしの表示になる）");
      if (p.lines.length > 3) E(pw, `せりふが ${p.lines.length} 行（3行まで）`);
      p.lines.forEach((l: { text: string }) => len(l.text) > 18 && E(pw, `せりふ 18字こえ「${l.text}」`));
      if (p.art.bg && !BGS.has(p.art.bg)) E(pw, `背景 ${p.art.bg} がない`);
      p.art.cast.forEach((c: { look: string; face?: string; fx?: string; x: number }) => {
        if (!LOOKS.has(c.look)) E(pw, `look ${c.look} がない`);
        if (c.face && !FACES.has(c.face)) E(pw, `face ${c.face} がない`);
        if (c.fx && !FXS.has(c.fx)) E(pw, `fx ${c.fx} がない`);
        if (c.x < 0 || c.x > 340) E(pw, `x ${c.x} が範囲外`);
      });
      p.art.props?.forEach((x: { kind: string; text?: string }) => {
        if (!PROPS.has(x.kind)) E(pw, `小道具 ${x.kind} がない`);
        if (x.text && len(x.text) > 8) E(pw, `小道具の字 8字こえ「${x.text}」`);
      });
    });
    if (v.story.panels.length !== 4) E(file, `4コマが ${v.story.panels.length} コマ`);
  }

  // 次の教材
  let app = false;
  v.next.forEach((n: { label: string; href: string }) => {
    const nw = `${file} next「${n.label}」`;
    if (/^https?:\/\//.test(n.href)) {
      const host = new URL(n.href).host;
      if (!APP_HOSTS.has(host)) E(nw, `知らない外部リンク ${n.href}`);
      else app = true;
      return;
    }
    if (n.href.startsWith("#")) return E(nw, "ページ内リンクは使わない（著書は books.ts に）");
    const [path, query] = n.href.split("?");
    const m = path.match(/^\/learn\/apply\/lec\/(.+)$/);
    if (m) {
      if (!written.has(m[1])) E(nw, `まだ書いていない単元 ${m[1]}（ページがない）`);
      return;
    }
    if (!routeExists(path)) E(nw, `ページがない ${path}`);
    if (path === "/tensaku") {
      app = true;
      const k = new URLSearchParams(query ?? "").get("kind");
      if (k && !TENSAKU_KINDS.has(k)) E(nw, `テンサクンの kind「${k}」がない（${[...TENSAKU_KINDS].join("・")}）`);
    }
  });
  if (!app) E(file, "next にアプリ（テンサクン・メンサツ・しぼりゆ・ジコアピ）への連動がない");
  walkText(file, v);
}
if (kinds.length >= 3 && new Set(kinds).size < 2) W("story", "物語の種類がすべて同じ");

// ---- 著書の章 ----
for (const [id, refs] of Object.entries(APL_BOOKS)) {
  if (!UNIT_IDS.has(id)) E(`books ${id}`, "units.ts にない単元");
  if (!written.has(id)) W(`books ${id}`, "まだ書いていない単元");
  refs.forEach((r) => {
    const w = `books ${id}『${r.book}』第${r.ch}章`;
    const toc = BOOK_TOC[r.book];
    if (!toc) return E(w, "知らない本");
    if (toc.ch[r.ch] === undefined) E(w, "目次にない章");
    else if (toc.ch[r.ch] !== r.title) E(w, `章題が目次とちがう「${r.title}」≠「${toc.ch[r.ch]}」`);
    if (r.sec) {
      if (!toc.sec || toc.sec[r.sec.no] !== r.sec.title) E(w, `節が目次とちがう 第${r.sec.no}節「${r.sec.title}」`);
    }
    if (!r.why) W(w, "why がない");
  });
}
for (const id of written) if (!APL_BOOKS[id]?.length) E(`books ${id}`, "「もっと深く（著書）」がない");
walkText("books.ts", APL_BOOKS);
walkText("units.ts", APL_UNITS);

// 著書の本文の目次と照らす（任意）
const BD = process.env.APL_BOOKS_DIR;
if (BD) {
  const sogo = readFileSync(join(BD, "sogo.txt"), "utf8");
  const shin = readFileSync(join(BD, "shin.txt"), "utf8");
  for (const [n, t] of Object.entries(BOOK_TOC["総合型選抜のすすめ"].ch)) if (!sogo.includes(`第${n}章：${t}`)) E("BOOK_TOC 総合型選抜のすすめ", `本文の目次に「第${n}章：${t}」がない`);
  for (const [n, t] of Object.entries(BOOK_TOC["シン・学問のすすめ"].ch)) if (!new RegExp(`第${n}章[　 ]+${t}`).test(shin)) E("BOOK_TOC シン・学問のすすめ", `本文の目次に「第${n}章 ${t}」がない`);
  for (const [n, t] of Object.entries(BOOK_TOC["シン・学問のすすめ"].sec ?? {})) if (!new RegExp(`第${n}節[　 ]*${t}`).test(shin)) E("BOOK_TOC シン・学問のすすめ", `本文に「第${n}節 ${t}」がない`);
  console.log("  著書の本文の目次と照らした");
}

// ---- registry が data と合っているか ----
const reg = readFileSync(join(AL, "registry.ts"), "utf8");
for (const f of files) if (!reg.includes(`./data/${f.replace(/\.ts$/, "")}"`)) E("registry.ts", `${f} が入っていない（node scripts/gen-apply-lec.ts）`);
if ((reg.match(/from "\.\/data\//g) ?? []).length !== files.length) E("registry.ts", "data の数と合わない（node scripts/gen-apply-lec.ts）");

console.log(warns.join("\n"));
console.log(errs.join("\n"));
console.log(`\n単元 ${lectures.length}/${APL_UNITS.length}・注意 ${warns.length}・エラー ${errs.length}`);
if (errs.length) process.exit(1);
