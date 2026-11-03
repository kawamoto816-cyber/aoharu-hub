// ツッコミ学習法の記録（この端末の localStorage だけ。サーバーには送らない）。
// 読み書きはすべて try/catch で包む。使えない端末（プライベートモードなど）では、記録なしで遊べる。
//
//   best   単元×モードごとの最高記録（自分の記録と競う）
//   total  これまでにためたツッコミポイントの合計（称号に使う）
//   miss   ツッコみそこねたボケ（id → 記録した時刻）。次の回で先に出す。正しく訂正できたら消す
//   voice  声を鳴らすか
//   log    1回ごとの記録（新しい順に最大 LOG_MAX 件）。あたらしいがっこうの「学びのダッシュボード」が読む

/** 1回（ROUND_SIZE問）の記録 */
export interface TsukkomiLogEntry {
  unit: string;
  mode: string;
  /** 終えた時刻 (ms) */
  at: number;
  points: number;
  /** 正解した問題数 / 問題数 */
  correct: number;
  n: number;
}

export interface TsukkomiSave {
  best: Record<string, number>;
  total: number;
  miss: Record<string, number>;
  voice: boolean;
  log: TsukkomiLogEntry[];
}

export const TSUKKOMI_SAVE_KEY = "aoharu:tsukkomi:v1";
const KEY = TSUKKOMI_SAVE_KEY;
export const LOG_MAX = 50;
export const EMPTY_SAVE: TsukkomiSave = { best: {}, total: 0, miss: {}, voice: true, log: [] };

function isLogEntry(v: unknown): v is TsukkomiLogEntry {
  if (!v || typeof v !== "object") return false;
  const r = v as Record<string, unknown>;
  return typeof r.unit === "string" && typeof r.at === "number" && typeof r.correct === "number" && typeof r.n === "number";
}

export const bestKey = (unit: string, mode: string) => `${unit}:${mode}`;

/** 保存されている文字列（なければ・読めなければ null）。useSyncExternalStore の snapshot に使う */
export function readRaw(): string | null {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function parseSave(raw: string | null): TsukkomiSave {
  if (!raw) return EMPTY_SAVE;
  try {
    const v = JSON.parse(raw) as Partial<TsukkomiSave>;
    return {
      best: v.best && typeof v.best === "object" ? v.best : {},
      total: typeof v.total === "number" && v.total >= 0 ? v.total : 0,
      miss: v.miss && typeof v.miss === "object" ? v.miss : {},
      voice: v.voice !== false,
      log: Array.isArray(v.log) ? v.log.filter(isLogEntry) : [],
    };
  } catch {
    return EMPTY_SAVE;
  }
}

const listeners = new Set<() => void>();
export function subscribeSave(fn: () => void) {
  listeners.add(fn);
  const onStorage = (e: StorageEvent) => e.key === KEY && fn();
  try {
    window.addEventListener("storage", onStorage);
  } catch {}
  return () => {
    listeners.delete(fn);
    try {
      window.removeEventListener("storage", onStorage);
    } catch {}
  };
}

export function loadSave(): TsukkomiSave {
  return parseSave(readRaw());
}

/** 記録を書きかえる（書けなくても、画面はそのまま続ける） */
export function updateSave(fn: (s: TsukkomiSave) => TsukkomiSave): TsukkomiSave {
  const next = fn(loadSave());
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  for (const l of listeners) l();
  return next;
}
