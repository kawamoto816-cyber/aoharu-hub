import type { EigaMode } from "./types";

// 名作映画で学ぶ英語の記録（この端末の localStorage だけ。サーバーには送らない）。
// 読めない・書けない（プライベートウィンドウなど）ときは空の記録として動き続ける。

export const GOAL_VIEWS = 50;

export interface EigaRecord {
  /** モードごとの「最後まで見た」回数 */
  views: Record<EigaMode, number>;
  /** 覚えたセリフの id */
  memorized: string[];
}

export const emptyRecord = (): EigaRecord => ({ views: { kansho: 0, kaisetsu: 0, hanpuku: 0 }, memorized: [] });

const key = (filmId: string) => `eiga:${filmId}:v1`;

export function loadRecord(filmId: string): EigaRecord {
  try {
    const raw = window.localStorage.getItem(key(filmId));
    if (!raw) return emptyRecord();
    const d = JSON.parse(raw) as Partial<EigaRecord>;
    const e = emptyRecord();
    const n = (v: unknown) => (typeof v === "number" && Number.isFinite(v) && v >= 0 ? Math.floor(v) : 0);
    return {
      views: { kansho: n(d.views?.kansho), kaisetsu: n(d.views?.kaisetsu), hanpuku: n(d.views?.hanpuku) },
      memorized: Array.isArray(d.memorized) ? d.memorized.filter((x): x is string => typeof x === "string") : e.memorized,
    };
  } catch {
    return emptyRecord();
  }
}

export function saveRecord(filmId: string, r: EigaRecord): void {
  try {
    window.localStorage.setItem(key(filmId), JSON.stringify(r));
  } catch {
    // 保存できなくても、その回の表示はそのまま続ける
  }
}

export const totalViews = (r: EigaRecord) => r.views.kansho + r.views.kaisetsu + r.views.hanpuku;
