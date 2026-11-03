// lib/unizeb/registry.ts を作り直す（レクチャー・列伝・ケース・資料集・演習のファイルを読み、export を集める）。
// 使い方：node scripts/gen-unizeb.ts   （Node 22 以上。型は消して実行される）
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..", "lib", "unizeb");
const parts: { dir: string; type: string; list: string }[] = [
  { dir: "lectures", type: "Lecture", list: "UZ_LECTURES" },
  { dir: "den", type: "Den", list: "UZ_DEN" },
  { dir: "case", type: "CaseStudy", list: "UZ_CASES" },
  { dir: "shiryo", type: "ShiryoChapter", list: "UZ_SHIRYO" },
  { dir: "enshu", type: "Enshu", list: "UZ_ENSHU" },
];
const imports: string[] = [];
const lists: string[] = [];
for (const p of parts) {
  const files = readdirSync(join(ROOT, p.dir)).filter((f) => f.endsWith(".ts")).sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  const names: string[] = [];
  for (const f of files) {
    const src = readFileSync(join(ROOT, p.dir, f), "utf8");
    const m = src.match(/export const (\w+)\s*:\s*\w+/);
    if (!m) throw new Error(`${p.dir}/${f}: export const が見つからない`);
    imports.push(`import { ${m[1]} } from "./${p.dir}/${f.replace(/\.ts$/, "")}";`);
    names.push(m[1]);
  }
  lists.push(`export const ${p.list}: ${p.type}[] = [${names.join(", ")}];`);
}
// 場面イラスト：scenes/<lec|den|case>-<id>.ts → UZ_SCENES["lec/<id>"]
{
  const files = readdirSync(join(ROOT, "scenes")).filter((f) => f.endsWith(".ts")).sort();
  const pairs: string[] = [];
  for (const f of files) {
    const m = readFileSync(join(ROOT, "scenes", f), "utf8").match(/export const (\w+)\s*:/);
    if (!m) throw new Error(`scenes/${f}: export const が見つからない`);
    imports.push(`import { ${m[1]} } from "./scenes/${f.replace(/\.ts$/, "")}";`);
    const [, kind, id] = f.replace(/\.ts$/, "").match(/^(lec|den|case)-(.+)$/)!;
    pairs.push(`  "${kind}/${id}": ${m[1]},`);
  }
  lists.push(`export const UZ_SCENES: SceneBook = {\n${pairs.join("\n")}\n};`);
}
const out = `// 自動生成 (scripts/gen-unizeb.ts)。手で書きかえない。
import type { Lecture } from "@/lib/lecture/types";
import type { Den, CaseStudy, ShiryoChapter, SceneBook, Enshu } from "./types";
${imports.join("\n")}

${lists.join("\n")}
`;
writeFileSync(join(ROOT, "registry.ts"), out);
console.log(lists.map((l) => l.slice(0, 60)).join("\n"));
