import type { AxisKey, Grade } from "./types";

// オシエルの記録（この端末の localStorage だけ）。残すのは「単元・日付・観点の評価・マスターしたか」だけ。
// 会話本文は残さない（その回を閉じたら消える）。読み書きはすべて try/catch で包む。
//   mastered  マスターした単元（単元id → 初めてマスターした時刻）。一度とったマスターは取り消さない
//   log       1回ごとの記録（新しい順に最大 LOG_MAX 件）。未来の職員室・学びのダッシュボードが読む予定

export interface OshieruLogEntry {
  unit: string;
  at: number;
  grades: Record<AxisKey, Grade | null>;
  mastered: boolean;
  rejudged?: boolean;
}

export interface OshieruSave {
  mastered: Record<string, number>;
  log: OshieruLogEntry[];
}

export const OSHIERU_SAVE_KEY = "aoharu:oshieru:v1";
const LOG_MAX = 100;
const EMPTY: OshieruSave = { mastered: {}, log: [] };

export function readRaw(): string | null {
  try {
    return window.localStorage.getItem(OSHIERU_SAVE_KEY);
  } catch {
    return null;
  }
}

export function parseSave(raw: string | null): OshieruSave {
  if (!raw) return EMPTY;
  try {
    const v = JSON.parse(raw) as Partial<OshieruSave>;
    return {
      mastered: v.mastered && typeof v.mastered === "object" ? v.mastered : {},
      log: Array.isArray(v.log) ? v.log.filter((e) => e && typeof e.unit === "string" && typeof e.at === "number") : [],
    };
  } catch {
    return EMPTY;
  }
}

const listeners = new Set<() => void>();

export function subscribeSave(cb: () => void): () => void {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === OSHIERU_SAVE_KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function recordResult(e: OshieruLogEntry): OshieruSave {
  const cur = parseSave(readRaw());
  const next: OshieruSave = {
    mastered: e.mastered && !cur.mastered[e.unit] ? { ...cur.mastered, [e.unit]: e.at } : cur.mastered,
    log: [e, ...cur.log].slice(0, LOG_MAX),
  };
  try {
    window.localStorage.setItem(OSHIERU_SAVE_KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
  return next;
}
