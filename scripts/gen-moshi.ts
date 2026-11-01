// lib/moshi/data/*.ts から lib/moshi/registry.ts を作り直す (大問のファイルを足したら実行する)。
//   npx tsx scripts/gen-moshi.ts
// 1ファイル＝1単元 (ファイル名＝単元id)。中身は `export const XXX: Daimon[] = [...]`。
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const dir = "lib/moshi/data";
const rows = readdirSync(dir)
  .filter((f) => f.endsWith(".ts"))
  .sort()
  .map((f) => {
    const name = readFileSync(`${dir}/${f}`, "utf8").match(/export const (\w+)\s*:\s*Daimon\[\]/)?.[1];
    if (!name) throw new Error(`${f}: export const XXX: Daimon[] が見つからない`);
    return { file: f.replace(/\.ts$/, ""), name };
  });
const out = `// 自動生成 (scripts/gen-moshi.ts)。手で書きかえない。
import type { Daimon } from "./types";
${rows.map((r) => `import { ${r.name} } from "./data/${r.file}";`).join("\n")}

/** ファイル名 (単元id) → その単元の大問 */
export const REGISTRY: Record<string, Daimon[]> = {
${rows.map((r) => `  "${r.file}": ${r.name},`).join("\n")}
};
`;
writeFileSync("lib/moshi/registry.ts", out);
console.log(`${rows.length} 単元`);
