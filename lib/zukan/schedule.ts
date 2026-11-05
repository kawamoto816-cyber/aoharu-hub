// つまずき図鑑の「段階」の計算 (AI は使わない・依存なし。scripts/zukan-selftest.ts で確かめる)。
//   間をあけた復習 (Cepeda ほか 2008)。段階式: 1日後 → 3日後 → 7日後 → 14日後。
//   まちがえたら最初の段 (1日後) に戻る。正解したら次の段へ。14日後の段で正解したら「卒業」。
// 日付は端末の「その日」(ローカル時刻の日付) で数える。時刻は見ない (朝に解いても夜に解いても同じ日)。

/** 段ごとの間隔 (日)。stage 0 = 1日後 … stage 3 = 14日後 */
export const INTERVALS = [1, 3, 7, 14] as const;
export const LAST_STAGE = INTERVALS.length - 1;
/** 「今日の復習」に出す最大の枚数 */
export const DAILY_MAX = 10;

/** 図鑑のカード (問題の本文は持たない。単元・大問・小問の id とシードから作りなおす) */
export interface ZukanCard {
  /** 模試の単元 (1回分を組んだ単元＝lib/moshi/data のファイル) */
  u: string;
  /** 大問 (節) の id */
  d: string;
  /** 小問の id (生成型なら「型」の id) */
  q: string;
  /** まちがえたときのシード (生成型の数値を再現できる。固定の問題は 0) */
  seed: number;
  /** 表示用: 単元名・教科・問題の短い見出し・小1小2 */
  name: string;
  subj: string;
  head: string;
  kids?: boolean;
  /** 段 (0〜3) */
  stage: number;
  /** 次の復習日 (dayNo) */
  due: number;
  /** つまずいた回数 (模試・復習でまちがえた回数の合計) */
  lapses: number;
  /** 復習した回数 (次の復習で出す数値のシードに使う) */
  reviews: number;
  /** 最初にまちがえた・最後に学んだ時刻 (ms) */
  first: number;
  last: number;
  /** 最後に学んだ日 (dayNo。実際に何日あいたかを数える) */
  lastDay: number;
  /** 卒業した時刻 (ms)。卒業していなければ undefined */
  grad?: number;
}

/** 復習1回の記録 (1週間後の思い出し率など、何日後の復習かごとの集計用) */
export interface ReviewLog {
  /** 予定の間隔 (日)。INTERVALS のどれか */
  iv: number;
  /** 実際にあいた日数 */
  el: number;
  ok: boolean;
  at: number;
}

export const cardId = (c: Pick<ZukanCard, "u" | "d" | "q">) => `${c.u}|${c.d}|${c.q}`;

/** ローカル時刻の日付の通し番号 (1970-01-01 = 0) */
export function dayNo(ms: number): number {
  const d = new Date(ms);
  return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
}

/** dayNo → その日の 0時 (ローカル) の Date */
export function dayToDate(day: number): Date {
  const u = new Date(day * 86400000);
  return new Date(u.getUTCFullYear(), u.getUTCMonth(), u.getUTCDate());
}

export type NewMistake = Pick<ZukanCard, "u" | "d" | "q" | "seed" | "name" | "subj" | "head" | "kids">;

/** 模試でまちがえた: 新しいカード、またはあるカードを最初の段に戻す (卒業していても戻す) */
export function stumble(prev: ZukanCard | undefined, m: NewMistake, now: number): ZukanCard {
  const today = dayNo(now);
  return {
    ...m,
    stage: 0,
    due: today + INTERVALS[0],
    lapses: (prev?.lapses ?? 0) + 1,
    reviews: prev?.reviews ?? 0,
    first: prev?.first ?? now,
    last: now,
    lastDay: today,
  };
}

/** 図鑑で復習して答えた: 段を進める／戻す。卒業・記録も返す */
export function review(c: ZukanCard, ok: boolean, now: number): { card: ZukanCard; log: ReviewLog; graduated: boolean } {
  const today = dayNo(now);
  const log: ReviewLog = { iv: INTERVALS[Math.min(Math.max(c.stage, 0), LAST_STAGE)], el: Math.max(0, today - c.lastDay), ok, at: now };
  const base = { ...c, reviews: c.reviews + 1, last: now, lastDay: today };
  if (!ok) return { card: { ...base, stage: 0, due: today + INTERVALS[0], lapses: c.lapses + 1, grad: undefined }, log, graduated: false };
  if (c.stage >= LAST_STAGE) return { card: { ...base, stage: LAST_STAGE, due: today + INTERVALS[LAST_STAGE], grad: now }, log, graduated: true };
  const stage = c.stage + 1;
  return { card: { ...base, stage, due: today + INTERVALS[stage] }, log, graduated: false };
}

/** 今日の復習 (復習日が来た、卒業していないカード)。日が古い順・つまずきの多い順に最大 max 枚 */
export function dueCards(cards: ZukanCard[], today: number, max = DAILY_MAX): ZukanCard[] {
  return cards
    .filter((c) => !c.grad && c.due <= today)
    .sort((a, b) => a.due - b.due || b.lapses - a.lapses || a.first - b.first)
    .slice(0, max);
}

/** 次の復習で出す問題のシード (同じカードの n 回目の復習は、いつ開いても同じ数値。まちがえたときとは別の数値) */
export function reviewSeed(c: Pick<ZukanCard, "u" | "d" | "q" | "seed" | "reviews">): number {
  let h = 0x811c9dc5;
  const s = `${cardId(c)}:${c.seed}:r${c.reviews + 1}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  const n = 1 + ((h >>> 0) % 999999);
  return n === c.seed ? (n % 999999) + 1 : n;
}

/** 予定の間隔ごとの思い出し率 */
export function recallByInterval(logs: ReviewLog[]): { iv: number; n: number; ok: number; rate: number | null }[] {
  return INTERVALS.map((iv) => {
    const ls = logs.filter((l) => l.iv === iv);
    const ok = ls.filter((l) => l.ok).length;
    return { iv, n: ls.length, ok, rate: ls.length ? Math.round((ok / ls.length) * 100) : null };
  });
}

/** 「〇日後」の言い方 (あした・きょう・〇日後・〇日すぎ) */
export function dueLabel(due: number, today: number, kids: boolean): string {
  const d = due - today;
  if (d < 0) return kids ? "きょう（おくれ）" : "今日（おくれ）";
  if (d === 0) return kids ? "きょう" : "今日";
  if (d === 1) return kids ? "あした" : "あした";
  return kids ? `${d}にちご` : `${d}日後`;
}

/** 月/日 */
export function mdLabel(day: number): string {
  const d = dayToDate(day);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}
