import type { Lecture } from "@/lib/lecture/types";
import { plain } from "@/lib/naze";
import { allowedOf, findLeak, forbiddenOf, normalize } from "@/lib/naze/guard";
import { templateNext, type KoeJudge, type KoePoint } from "./index";

// 声で説明の点検（出力の側）。
//   - 次の一言（next）：なぜなぜ先生の findLeak（lib/naze/guard.ts）を通す。check の答え・mistakes の正しくは・謎の答えが
//     ほぼそのまま入っていたら、定型の一言（templateNext）に差しかえる。見出し・確認の問い・生徒が自分で言った言葉は数えない。
//   - まちがい（mistake）：AIが返すのは「生徒の言葉の引用」と「どの要点・どのよくあるまちがいか（ref）」だけ。
//     引用が生徒の説明に本当にあるかを確かめ、なければ捨てる。教科書の言葉はサーバーがレクチャーのデータから出す（AIの文ではない）。

/** ref（"m0" = mistakes[0]・"p2" = 要点2）から、教科書（レクチャー）の言葉を出す */
export function textbookOf(lec: Pick<Lecture, "mistakes" | "sections">, points: KoePoint[], ref: string): { textbook: string; point: number | null } | null {
  const m = /^([mp])(\d+)$/.exec(ref.trim());
  if (!m) return null;
  const i = Number(m[2]);
  if (m[1] === "m") {
    const x = lec.mistakes[i];
    return x ? { textbook: plain(x.right), point: null } : null;
  }
  const p = points[i];
  if (!p) return null;
  const body = plain(lec.sections[p.section]?.body ?? "");
  const sentences = body.split(/(?<=。)/).map((s) => s.trim()).filter(Boolean);
  const hit = sentences.find((s) => p.words.some((w) => normalize(s).includes(normalize(w)))) ?? sentences[0];
  return hit ? { textbook: hit, point: p.index } : null;
}

/** 引用が生徒の説明の中にあるか（ふつうの形で比べる。2字以上） */
export function quoteInText(quote: string, text: string): boolean {
  const q = normalize(quote);
  return q.length >= 2 && normalize(text).includes(q);
}

/** 判定の一言を点検する。答えの文が入っていたら定型に差しかえる */
export function guardNext(
  j: KoeJudge,
  lec: Pick<Lecture, "title" | "check" | "mistakes" | "sections">,
  points: KoePoint[],
  text: string,
  low: boolean,
): KoeJudge & { replaced: boolean } {
  const allowed = [...allowedOf(lec), ...points.map((p) => p.label), text];
  if (!j.next || findLeak(j.next, forbiddenOf(lec), allowed)) return { ...j, next: templateNext(points, j.status, low), replaced: !!j.next };
  return { ...j, replaced: false };
}
