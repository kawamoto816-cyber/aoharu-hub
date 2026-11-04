import { normalize } from "@/lib/naze/guard";
import { templateNext, type KoeJudge, type KoePoint, type PointStatus } from "./index";

// AIなしの判定（?mock=1）。キーがなくても画面を一通りためせるように、文字の一致だけで決める。回数は数えない。
//   said    = 強調の語句の半分以上（語句が1つならその1つ）が説明に入っている
//   vague   = 語句が1つ以上入っている、または見出しの2字ずつの半分以上が入っている
//   missing = それ以外
// まちがいは見ない（null）。一言は定型（templateNext）。

const core = (s: string) => normalize(s.replace(/〜|~/g, ""));

function bigrams(s: string): string[] {
  const out: string[] = [];
  for (let i = 0; i + 2 <= s.length; i++) out.push(s.slice(i, i + 2));
  return out;
}

export function mockStatus(p: KoePoint, text: string): PointStatus {
  const t = normalize(text);
  const hits = p.words.filter((w) => {
    const c = core(w);
    return c.length >= 2 && t.includes(c);
  }).length;
  const hg = bigrams(core(p.label.replace(/（つづき）$/, "")));
  const ratio = hg.length ? hg.filter((g) => t.includes(g)).length / hg.length : 0;
  if (p.words.length && hits >= Math.max(1, Math.ceil(p.words.length / 2))) return "said";
  if (!p.words.length && ratio >= 0.6) return "said";
  if (hits >= 1 || ratio >= 0.5) return "vague";
  return "missing";
}

export function mockJudge(points: KoePoint[], text: string, low: boolean): KoeJudge {
  const status = points.map((p) => mockStatus(p, text));
  return { status, mistake: null, next: templateNext(points, status, low) };
}
