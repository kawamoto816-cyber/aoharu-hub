import { normalize } from "../../naze/guard";
import type { Boke } from "../types";
import { correctWord, templateHint, type TsukkomiJudge } from "./index";

// AIなしの判定（?mock=1）。ANTHROPIC_API_KEY がなくても画面を一通りためせるように、文字の一致だけで決める。回数は数えない。
//   found = 「どこ」（または「どう直す」）に、まちがいの語句の2字以上が入っている
//   fixed = 「どう直す」に正しい語句（終わりの助詞・句読点を外したもの）が入っていれば ok、
//           入っていないが正しい語句の2字が入っていれば partial、それ以外は no
//   hint  = 判定に合わせた定型の一言（templateHint）

const TAIL = /[にがはをでとのへもや]+$/;
const core = (s: string) => {
  const n = normalize(s);
  const c = n.replace(TAIL, "");
  return c.length >= 1 ? c : n;
};

function bigrams(s: string): string[] {
  if (s.length < 2) return s ? [s] : [];
  const out: string[] = [];
  for (let i = 0; i + 2 <= s.length; i++) out.push(s.slice(i, i + 2));
  return out;
}

export function mockJudge(b: Boke, where: string, fix: string): TsukkomiJudge {
  const wrong = core(b.wrongIndex === null ? "" : b.tokens[b.wrongIndex]);
  const right = core(correctWord(b));
  const w = normalize(where);
  const f = normalize(fix);
  const found = !!wrong && (bigrams(wrong).some((g) => w.includes(g)) || (!w && bigrams(wrong).some((g) => f.includes(g))));
  const fixed = right && f.includes(right) ? "ok" : right && bigrams(right).some((g) => f.includes(g)) ? "partial" : "no";
  return { found, fixed, hint: templateHint(found, fixed) };
}
