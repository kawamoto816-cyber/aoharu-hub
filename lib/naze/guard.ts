import type { Lecture } from "@/lib/lecture/types";
import { plain } from "./index";

// なぜなぜ先生の「答えを言わない」の点検（出力の側）。依頼文（prompt.ts）でも言わないように頼むが、
// AIの出力を必ずここに通し、単元の答えの文がほぼそのまま入っていたら捨てて、定型の問いに差しかえる。
//
//   答えの文 = check の答え（a）・mistakes の正しくは（right）・節の謎の答え（reveal）
//   ほぼそのまま = 句読点・空白・記号・強調の印・ルビを外して比べ、
//                 答えの文が 8字以上なら、そのどこか 8字が出力に入っている
//                 答えの文が 3〜7字なら、その全体が出力に入っている（2字以下は短すぎて比べない）
//   ただし、次の言葉に入っている部分は数えない（言っても答えにならない・すでに画面に出ている）
//     - 生徒が自分で書いた言葉
//     - 単元の題・節の見出し・確認の問いの文・よくあるまちがいの「まちがい」の文（allowedOf）
//
// クライアントでもサーバーでも動く（node だけで試せる：scripts/naze-guard-selftest.ts）。

export const MATCH_LEN = 8;
const MIN_SHORT = 3;

/** 比べるための形にする（NFKC・強調とルビを外す・空白と句読点・記号を消す・カタカナをひらがなに） */
export function normalize(s: string): string {
  return plain(s)
    .normalize("NFKC")
    .replace(/[\s、。，．,.!！?？「」『』（）()［］\[\]【】〈〉<>・…‥:：;；"'“”‘’〜~\-–—_/／]/g, "")
    .replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60))
    .toLowerCase();
}

/** その単元の「言ってはいけない答えの文」 */
export function forbiddenOf(lec: Pick<Lecture, "check" | "mistakes" | "sections">): string[] {
  const out: string[] = [];
  for (const c of lec.check) out.push(c.a);
  for (const m of lec.mistakes) out.push(m.right);
  for (const s of lec.sections) if (s.reveal) out.push(s.reveal);
  return out;
}

/** 出力に入っていてもよい言葉（題・見出し・確認の問い・まちがいの文）。問いを作るときに使ってよいもの */
export function allowedOf(lec: Pick<Lecture, "title" | "check" | "mistakes" | "sections">): string[] {
  return [lec.title, ...lec.sections.map((s) => s.heading), ...lec.check.map((c) => c.q), ...lec.mistakes.map((m) => m.wrong)];
}

function grams(s: string, n: number): string[] {
  const out: string[] = [];
  for (let i = 0; i + n <= s.length; i++) out.push(s.slice(i, i + n));
  return out;
}

/** 出力が答えの文をほぼそのまま含むか。含むなら、一致した部分（ふつうの形）を返す。allowed に入っている部分は数えない */
export function findLeak(output: string, forbidden: string[], allowed: string[] = []): string | null {
  // allowed の言葉が出てくるところは、先に「区切り」に置きかえて比べない（言葉のさかいめをまたぐ一致も数えない）
  // また、allowed のどこかに入っている部分（キーワードなど）も数えない
  const al = allowed.map(normalize);
  const said = al.join("|");
  let o = normalize(output);
  for (const a of al.filter((x) => x.length >= MIN_SHORT).sort((x, y) => y.length - x.length)) o = o.split(a).join("\u0000");
  for (const f of forbidden) {
    const n = normalize(f);
    if (n.length < MIN_SHORT) continue;
    if (n.length < MATCH_LEN) {
      if (o.includes(n) && !said.includes(n)) return n;
      continue;
    }
    for (const g of grams(n, MATCH_LEN)) if (o.includes(g) && !said.includes(g)) return g;
  }
  return null;
}

export function defaultQuestion(low: boolean): string {
  return low ? "どこまでなら わかるかな？ そこから ひとつずつ かんがえて みよう。" : "どこまでならわかる？そこから一つずつ考えてみよう。";
}

export function fallbackLine(question: string, low: boolean): string {
  return `${low ? "もう いっぽだけ かんがえて みよう" : "もう一歩だけ考えてみよう"}：${question}`;
}

/**
 * AIの出力を点検する。答えの文が入っていたら、その出力は捨てて
 * 「もう一歩だけ考えてみよう：〈問い〉」に差しかえる。〈問い〉は、出力の中の問いの文のうち
 * それだけなら答えの文を含まないもの（最後のもの）。なければ決まった問い。
 */
export function guardReply(output: string, forbidden: string[], opts: { allowed?: string[]; low: boolean }): { text: string; replaced: boolean } {
  const said = opts.allowed ?? [];
  const text = output.trim();
  if (!findLeak(text, forbidden, said)) return { text, replaced: false };
  const questions = text
    .split(/(?<=[。！!？?\n])/)
    .map((s) => s.trim())
    .filter((s) => /[？?]$/.test(s) && s.length >= 4 && s.length <= 80);
  const safe = questions.reverse().find((q) => !findLeak(q, forbidden, said));
  return { text: fallbackLine(safe ?? defaultQuestion(opts.low), opts.low), replaced: true };
}
