// lib/moshi/data/*.ts から lib/moshi/registry.ts を作り直す (模試のファイルを足したら実行する)。
//   npx tsx scripts/gen-moshi.ts
// 1ファイル＝1単元 (ファイル名＝単元id)。中身は次のどちらか (両方でもよい)。
//   `export const XXX: Daimon[] = [...]`  … 定期テスト模試の大問 (/learn/moshi/play)
//   `export const XXX: UnitMoshi = {...}` … 単元模試 (/learn/moshi/<単元id>。A 生成・B プール・C 固定)
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const dir = "lib/moshi/data";
const rows = readdirSync(dir)
  .filter((f) => f.endsWith(".ts"))
  .sort()
  .map((f) => {
    const src = readFileSync(`${dir}/${f}`, "utf8");
    const daimon = src.match(/export const (\w+)\s*:\s*Daimon\[\]/)?.[1];
    const unit = src.match(/export const (\w+)\s*:\s*UnitMoshi\b/)?.[1];
    if (!daimon && !unit) throw new Error(`${f}: export const XXX: Daimon[] か export const XXX: UnitMoshi が見つからない`);
    return { file: f.replace(/\.ts$/, ""), daimon, unit };
  });
const imports = rows.map((r) => `import { ${[r.daimon, r.unit].filter(Boolean).join(", ")} } from "./data/${r.file}";`);
const out = `// 自動生成 (scripts/gen-moshi.ts)。手で書きかえない。
import type { Daimon, UnitMoshi } from "./types";
${imports.join("\n")}

/** ファイル名 (単元id) → その単元の大問 */
export const REGISTRY: Record<string, Daimon[]> = {
${rows.filter((r) => r.daimon).map((r) => `  "${r.file}": ${r.daimon},`).join("\n")}
};

/** ファイル名 (単元id) → その単元の単元模試 */
export const UNIT_REGISTRY: Record<string, UnitMoshi> = {
${rows.filter((r) => r.unit).map((r) => `  "${r.file}": ${r.unit},`).join("\n")}
};
`;
writeFileSync("lib/moshi/registry.ts", out);
console.log(`${rows.length} 単元 (大問 ${rows.filter((r) => r.daimon).length}・単元模試 ${rows.filter((r) => r.unit).length})`);
