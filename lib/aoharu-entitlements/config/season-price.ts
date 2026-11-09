/**
 * 受験シーズンパスの値段（画面とサーバーの両方から読む。環境変数は使わない＝ブラウザでも同じ値になる）。
 *
 * 早割：2026年12月15日 23:59（日本時間）までは 7,800円、それ以降は 9,800円（2026-11-09 代表の判断）。
 * 早割の期限が過ぎると、ここを直さなくても自動で通常の値段にもどる。
 */

export const SEASON_REGULAR_JPY = 9800;
export const SEASON_EARLY_JPY = 7800;
export const SEASON_EARLY_UNTIL = "2026-12-15T23:59:59+09:00";
export const SEASON_EARLY_LABEL = "12月15日";
export const SEASON_ENDS_LABEL = "2027年3月31日";

export type SeasonPrice = {
  /** いまの値段（税込） */
  jpy: number;
  /** 通常の値段 */
  regularJpy: number;
  /** 早割の期間中か */
  early: boolean;
  /** 早割の締切（例「12月15日」） */
  earlyLabel: string;
  /** 早割の残り日数（締切の日を含む。期間外は 0） */
  earlyDaysLeft: number;
};

export function seasonPrice(now: number = Date.now()): SeasonPrice {
  const until = Date.parse(SEASON_EARLY_UNTIL);
  const early = now <= until;
  return {
    jpy: early ? SEASON_EARLY_JPY : SEASON_REGULAR_JPY,
    regularJpy: SEASON_REGULAR_JPY,
    early,
    earlyLabel: SEASON_EARLY_LABEL,
    earlyDaysLeft: early ? Math.max(1, Math.ceil((until - now) / 86_400_000)) : 0,
  };
}

/** 9800 → "9,800" */
export const yen = (n: number): string => n.toLocaleString("ja-JP");
