import { findLeak, normalize } from "../../naze/guard";
import type { Boke } from "../types";
import { correctWord, templateHint, type TsukkomiJudge } from "./index";

// ツッコミAIの hint の点検。AIの hint に正解（正しい語句・正しい文・わけ）がほぼそのまま入っていたら、定型の hint に差しかえる。
// 比べ方はなぜなぜ先生の findLeak（lib/naze/guard.ts）と同じ（8字以上の答えはどこか8字、3〜7字は全体）。
// 正しい語句は短いことが多い（「6V」など）ので、2字のものも、画面のボケの文・生徒の文に入っていなければ見る。
// ただし、次に入っている部分は数えない：画面に出ているボケの文（とその語句）・生徒が自分で書いた文。
// クライアントでもサーバーでも動く（scripts/tsukkomi-ai-selftest.ts で試せる）。

/** hint に書いてはいけないもの（既存データの正解） */
export function forbiddenOf(b: Boke): string[] {
  return [correctWord(b), b.explain.right, b.explain.why].filter(Boolean);
}

/** hint に入っていてもよいもの（画面に出ているボケの文と語句。生徒の文は呼ぶ側で足す） */
export function allowedOf(b: Boke): string[] {
  return [b.tokens.join(""), ...b.tokens];
}

/** hint が正解を含むか。含むなら一致した部分 */
export function findHintLeak(hint: string, b: Boke, student: string[] = []): string | null {
  const allowed = [...allowedOf(b), ...student];
  const hit = findLeak(hint, forbiddenOf(b), allowed);
  if (hit) return hit;
  const w = normalize(correctWord(b));
  if (w.length === 2 && normalize(hint).includes(w) && !allowed.some((a) => normalize(a).includes(w))) return w;
  return null;
}

/** 判定の hint を点検する。正解が入っていたら定型の hint に差しかえる */
export function guardJudge(j: TsukkomiJudge, b: Boke, student: string[]): TsukkomiJudge & { replaced: boolean } {
  if (!findHintLeak(j.hint, b, student)) return { ...j, replaced: false };
  return { ...j, hint: templateHint(j.found, j.fixed), replaced: true };
}
