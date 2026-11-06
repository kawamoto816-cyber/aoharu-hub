// ゼロワンOSユース版の止まる授業：lib/jugyo/uz/index.ts（登録）を data/ のファイルから作り直す。
//   node --no-warnings lib/jugyo/uz/gen-index.ts
// 並びは Lv の低い順、同じ Lv の中はカードの番号順（z1-01 → z2-01 → … → z8-01 → z1-02 …）。キャストは h-charisma・h-kyoju・h-nekketsu の順。
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const files = readdirSync(join(DIR, "data")).filter((f) => f.endsWith(".ts")).map((f) => f.replace(/\.ts$/, ""));
const name = (f: string) => {
  const src = readFileSync(join(DIR, "data", `${f}.ts`), "utf8");
  const m = src.match(/export const (\w+)\s*:/);
  if (!m) throw new Error(`${f}.ts に export const がない`);
  return m[1];
};
const lvOf = (id: string) => Number(id.split("-")[1]);
const deptOf = (id: string) => Number(id.slice(1).split("-")[0]);
const order = (id: string) => lvOf(id) * 100 + deptOf(id);
const CASTS = ["h-charisma", "h-kyoju", "h-nekketsu"];
const bases = files.filter((f) => !f.includes(".")).sort((a, b) => order(a) - order(b));
const scripts = files.filter((f) => f.includes(".")).sort((a, b) => {
  const [ua, ca] = a.split(".");
  const [ub, cb] = b.split(".");
  return order(ua) - order(ub) || CASTS.indexOf(ca) - CASTS.indexOf(cb);
});
const imp = (f: string) => `import { ${name(f)} } from "./data/${f}";`;
const out = `// このファイルは lib/jugyo/uz/gen-index.ts が作る（手で書きかえない）。
// ゼロワンOSユース版（lib/unizeb の図解レクチャー）の止まる授業の登録。
// 単元 id は lecture の unit（"unizeb-<カードid>"）。データのファイル名はカードid（z1-01.ts・z1-01.h-charisma.ts）。
import type { CastScript, UnitBase } from "../types";
${[...bases, ...scripts].map(imp).join("\n")}

export const UZ_BASES: UnitBase[] = [${bases.map(name).join(", ")}];
export const UZ_SCRIPTS: CastScript[] = [${scripts.map(name).join(", ")}];

/** 音声の置き場所（本体の public/audio/jugyo とは分ける） */
export const UZ_AUDIO_DIR = "public/audio/jugyo/uz";
export const uzJugyoSrc = (key: string) => \`/audio/jugyo/uz/\${key}.mp3\`;
/** ユース版の授業のページ（レクチャーと同じ見せ方の判定） */
export const uzJugyoHref = (cardId: string) => \`/learn/unizeb/jugyo/\${cardId}\`;
`;
writeFileSync(join(DIR, "index.ts"), out);
console.log(`骨組み ${bases.length}・台本 ${scripts.length}`);
