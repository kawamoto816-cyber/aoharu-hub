import { OPEN_WORDS, STAGES } from "./stages";
import { STAGE_DATA } from "./data";
import { LEARNED_BOX, today, type WordsProgress } from "./progress";
import type { WordEntry } from "./types";

// 1回の修行の並びを作る：期限の来た復習 (古い順、最大50語) + 新しい単語 (1日の数まで)。
//   新しい単語 → カードで覚える → 4択で確かめる
//   復習 (箱1〜2) → 4択、復習 (箱3以上) → 日本語を見て英単語を打つ

export type Mode = "learn" | "choice" | "type";
export interface SessionItem {
  no: number;
  mode: Mode;
}

export function dueCount(p: WordsProgress): number {
  const t = today();
  return Object.entries(p.w).filter(([no, s]) => s.d <= t && OPEN_WORDS.some((w) => w.no === Number(no))).length;
}

export function newWords(p: WordsProgress, stage?: number, limit?: number): WordEntry[] {
  const pool = stage ? (STAGE_DATA[stage] ?? []) : STAGES.filter((s) => s.open).flatMap((s) => STAGE_DATA[s.no]);
  const n = limit ?? Math.max(0, p.perDay - p.newToday);
  return pool.filter((w) => !p.w[w.no]).slice(0, n);
}

export function buildSession(p: WordsProgress, opts: { stage?: number; extra?: boolean } = {}): SessionItem[] {
  const t = today();
  const due = Object.entries(p.w)
    .filter(([no, s]) => s.d <= t && OPEN_WORDS.some((w) => w.no === Number(no)) && (!opts.stage || Math.ceil(Number(no) / 100) === opts.stage))
    .sort((a, b) => a[1].d - b[1].d)
    .slice(0, 50)
    .map(([no, s]) => ({ no: Number(no), mode: (s.b >= LEARNED_BOX ? "type" : "choice") as Mode }));
  const fresh = newWords(p, opts.stage, opts.extra ? 10 : undefined).map((w) => ({ no: w.no, mode: "learn" as Mode }));
  return [...due, ...fresh];
}

/** 4択のまちがいの選択肢 (同じステージ・同じ品詞を優先) */
export function distractors(w: WordEntry, rnd: () => number = Math.random): string[] {
  const stage = STAGE_DATA[Math.ceil(w.no / 100)] ?? OPEN_WORDS;
  const same = stage.filter((x) => x.no !== w.no && x.pos === w.pos);
  const others = OPEN_WORDS.filter((x) => x.no !== w.no && x.pos === w.pos);
  const pool = [...same, ...others];
  const out: string[] = [];
  while (out.length < 3 && pool.length) {
    const i = Math.floor(rnd() * pool.length);
    const [x] = pool.splice(i, 1);
    if (!out.includes(x.ja) && x.ja !== w.ja) out.push(x.ja);
  }
  return out;
}
