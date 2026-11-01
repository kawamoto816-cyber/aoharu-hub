// lib/lecture/data/*.ts から lib/lecture/registry.ts を作り直す (レクチャーを足したら実行する)。
//   npx tsx scripts/gen-lectures.ts
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const dir = "lib/lecture/data";
const rows = readdirSync(dir)
  .filter((f) => f.endsWith(".ts"))
  .sort()
  .map((f) => {
    const name = readFileSync(`${dir}/${f}`, "utf8").match(/export const (\w+)\s*:\s*Lecture/)?.[1];
    if (!name) throw new Error(`${f}: export const XXX: Lecture が見つからない`);
    return { file: f.replace(/\.ts$/, ""), name };
  });
const out = `// 自動生成 (scripts/gen-lectures.ts)。手で書きかえない。
import type { Lecture } from "./types";
${rows.map((r) => `import { ${r.name} } from "./data/${r.file}";`).join("\n")}

export const REGISTRY: Lecture[] = [${rows.map((r) => r.name).join(", ")}];
`;
writeFileSync("lib/lecture/registry.ts", out);
console.log(`${rows.length} 単元`);
