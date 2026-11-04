// lib/apply-lec/registry.ts を作り直す（data/*.ts の export を、単元一覧 units.ts の順に集める）。
// 使い方：node scripts/gen-apply-lec.ts   （Node 22 以上。型は消して実行される）
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// 拡張子つきの import は tsc が通さないので、パスを変数にして読む（check-unizeb.ts と同じ）
const UNITS = "../lib/apply-lec/units.ts";
const { APL_UNITS } = (await import(UNITS)) as typeof import("../lib/apply-lec/units");
const ROOT = join(import.meta.dirname, "..", "lib", "apply-lec");
const order = new Map(APL_UNITS.map((u, i) => [u.id, i]));
const files = readdirSync(join(ROOT, "data")).filter((f) => f.endsWith(".ts"));
const found: { id: string; name: string; file: string }[] = [];
for (const f of files) {
  const id = f.replace(/\.ts$/, "");
  if (!order.has(id)) throw new Error(`data/${f}: units.ts にない単元`);
  const m = readFileSync(join(ROOT, "data", f), "utf8").match(/export const (\w+)\s*:\s*Lecture\b/);
  if (!m) throw new Error(`data/${f}: export const X: Lecture が見つからない`);
  found.push({ id, name: m[1], file: id });
}
found.sort((a, b) => order.get(a.id)! - order.get(b.id)!);
const out = `// 自動生成 (scripts/gen-apply-lec.ts)。手で書きかえない。
import type { Lecture } from "@/lib/lecture/types";
${found.map((x) => `import { ${x.name} } from "./data/${x.file}";`).join("\n")}

export const APL_LECTURES: Lecture[] = [${found.map((x) => x.name).join(", ")}];
`;
writeFileSync(join(ROOT, "registry.ts"), out);
console.log(`APL_LECTURES: ${found.map((x) => x.id).join(", ")}`);
