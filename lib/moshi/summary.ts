import type { ItemResult } from "./grade";
import type { QType, Skill } from "./types";

// 模試の結果サマリ (画面の結果・端末への保存・あとでダッシュボードで使う)。依存なし。

export interface SummaryItem {
  key: string;
  points: number;
  unit: string;
  skill: Skill;
  type?: QType;
  difficulty?: number;
}

export interface Tally {
  score: number;
  total: number;
  correct: number;
  count: number;
}

export interface ResultSummary extends Tally {
  /** 正答率 (満点の小問の数 ÷ 小問の数、0〜100 の整数) */
  rate: number;
  /** 得点率 (0〜100 の整数) */
  pct: number;
  byUnit: Record<string, Tally>;
  bySkill: Record<string, Tally>;
  byType: Record<string, Tally>;
  byDifficulty: Record<string, Tally>;
  /** 満点でなかった小問の key */
  wrong: string[];
}

const empty = (): Tally => ({ score: 0, total: 0, correct: 0, count: 0 });

export function summarize(items: SummaryItem[], results: Record<string, ItemResult | undefined>): ResultSummary {
  const all = empty();
  const byUnit: Record<string, Tally> = {};
  const bySkill: Record<string, Tally> = {};
  const byType: Record<string, Tally> = {};
  const byDifficulty: Record<string, Tally> = {};
  const wrong: string[] = [];
  for (const it of items) {
    const score = results[it.key]?.score ?? 0;
    const ok = score >= it.points;
    if (!ok) wrong.push(it.key);
    const groups = [all, (byUnit[it.unit] ??= empty()), (bySkill[it.skill] ??= empty())];
    if (it.type) groups.push((byType[it.type] ??= empty()));
    if (it.difficulty) groups.push((byDifficulty[String(it.difficulty)] ??= empty()));
    for (const g of groups) {
      g.score += score;
      g.total += it.points;
      g.count += 1;
      if (ok) g.correct += 1;
    }
  }
  const pc = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0);
  return { ...all, rate: pc(all.correct, all.count), pct: pc(all.score, all.total), byUnit, bySkill, byType, byDifficulty, wrong };
}
