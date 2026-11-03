// 模試の結果を端末内 (localStorage) に保存する。単元ごとの最高点と回数。
// あたらしいがっこうのダッシュボードから readMoshiResults() で読む想定。読めない・書けない環境 (プライベートモードなど) では何もしない。

export const MOSHI_RESULTS_KEY = "aoharu.moshi.results.v1";

export interface MoshiUnitRecord {
  /** 解いた回数 */
  count: number;
  /** 最高の得点率 (0〜100) */
  bestPct: number;
  /** 最高のときの得点 / 満点 */
  bestScore: number;
  bestTotal: number;
  /** 最後の得点率・正答率 */
  lastPct: number;
  lastRate: number;
  /** ISO 8601 */
  lastAt: string;
  bestAt: string;
}

export type MoshiResults = Record<string, MoshiUnitRecord>;

function isRecord(v: unknown): v is MoshiUnitRecord {
  if (!v || typeof v !== "object") return false;
  const r = v as Record<string, unknown>;
  return typeof r.count === "number" && typeof r.bestPct === "number";
}

export function readMoshiResults(): MoshiResults {
  try {
    const raw = window.localStorage.getItem(MOSHI_RESULTS_KEY);
    if (!raw) return {};
    const obj = JSON.parse(raw) as unknown;
    if (!obj || typeof obj !== "object") return {};
    const out: MoshiResults = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) if (isRecord(v)) out[k] = v;
    return out;
  } catch {
    return {};
  }
}

export function readMoshiResult(unit: string): MoshiUnitRecord | null {
  return readMoshiResults()[unit] ?? null;
}

/** 1回分の結果を足す。保存後の記録と、今回が最高点の更新か (はじめての回もふくむ) を返す。保存できなければ null */
export function recordMoshiResult(unit: string, r: { score: number; total: number; rate: number }): { record: MoshiUnitRecord; best: boolean; prev: MoshiUnitRecord | null } | null {
  try {
    const all = readMoshiResults();
    const prev = all[unit] ?? null;
    const pct = r.total ? Math.round((r.score / r.total) * 100) : 0;
    const now = new Date().toISOString();
    const best = !prev || pct > prev.bestPct;
    const record: MoshiUnitRecord = {
      count: (prev?.count ?? 0) + 1,
      bestPct: best ? pct : prev.bestPct,
      bestScore: best ? r.score : prev.bestScore,
      bestTotal: best ? r.total : prev.bestTotal,
      bestAt: best ? now : prev.bestAt,
      lastPct: pct,
      lastRate: r.rate,
      lastAt: now,
    };
    all[unit] = record;
    window.localStorage.setItem(MOSHI_RESULTS_KEY, JSON.stringify(all));
    return { record, best, prev };
  } catch {
    return null;
  }
}
