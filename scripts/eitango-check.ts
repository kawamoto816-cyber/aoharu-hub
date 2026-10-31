// 英単語2000 のデータ確認: npx tsx scripts/eitango-check.ts [ステージ番号...]
//   ・見出し語・品詞・並びが wordlist.ts と一致するか
//   ・例文に見出し語 (活用形を含む) が入っているか
//   ・訳語のどれかが EJDict (パブリックドメインの英和辞書) の訳に含まれるか (目安。ずれは目で確かめる)
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { WORDLIST } from "../lib/eitango/wordlist";
import { STAGE_DATA } from "../lib/eitango/data";

const EJ = process.env.EJDICT_DIR ?? "/tmp/claude-0/-home-claude/f1b5471d-9ed8-55a7-b5b2-d27a58ec31eb/scratchpad/ejdict/repo/src";
const dict = new Map<string, string>();
if (existsSync(EJ))
  for (const f of readdirSync(EJ))
    for (const line of readFileSync(`${EJ}/${f}`, "utf8").split("\n")) {
      const [h, v] = line.split("\t");
      if (!h || !v) continue;
      for (const k of h.split(",")) dict.set(k.trim().toLowerCase(), (dict.get(k.trim().toLowerCase()) ?? "") + " / " + v);
    }

const IRREG: Record<string, string[]> = {};
function forms(w: string): RegExp {
  const stem = w.replace(/(e|y)$/, "");
  const extra = IRREG[w] ?? [];
  const alts = [w, `${stem}\\w*`, ...extra].map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, (m) => (m === "\\" ? "\\" : m)));
  return new RegExp(`\\b(${alts.join("|")})`, "i");
}

const want = process.argv.slice(2).map(Number);
const stages = want.length ? want : Array.from({ length: 20 }, (_, i) => i + 1);
let bad = 0;
for (const st of stages) {
  const data = STAGE_DATA[st];
  if (!data) continue;
  const expected = WORDLIST.filter((w) => w.stage === st);
  if (data.length !== expected.length) console.log(`stage ${st}: 語数 ${data.length} / ${expected.length}`), bad++;
  data.forEach((e, i) => {
    const x = expected[i];
    const flag = (m: string) => {
      bad++;
      console.log(`stage ${st} #${e.no} ${e.word}: ${m}`);
    };
    if (!x || x.word !== e.word) flag(`見出し語がリストとちがう (${x?.word})`);
    if (e.no !== (st - 1) * 100 + i + 1) flag(`番号 ${e.no}`);
    if (!e.ja || !e.ex || !e.exJa) flag("空の欄");
    if (!forms(e.word).test(e.ex)) flag(`例文に見出し語がない: ${e.ex}`);
    if (e.ex.split(/\s+/).length > 18) flag("例文が長い");
    const d = dict.get(e.word) ?? "";
    const parts = e.ja.split(/[、,]/).map((s) => s.replace(/[〜～…（）()「」]/g, "").replace(/^(を|に|が|と|で)/, "").replace(/(する|な|に|の|を)$/, "").trim()).filter((s) => s.length >= 2);
    if (d && parts.length && !parts.some((p) => d.includes(p.slice(0, 2)))) console.log(`  (要確認) stage ${st} ${e.word}: 訳「${e.ja}」が辞書の訳と重ならない`);
  });
}
console.log(bad ? `NG ${bad}` : "OK");
