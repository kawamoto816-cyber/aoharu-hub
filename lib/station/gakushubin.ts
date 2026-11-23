// 学習便（ラーニングステーションの試験運用・2027年1月13日〜2月7日）の決まりごと。案内・規約・表記のページで同じ値を使う。
export const BIN = {
  name: "アオハル 学習便",
  period: "2027年1月13日(水)〜2月7日(日)",
  priceJpy: 2980,
  /** 受付を始めた日（12月7日の予定を前倒しした。2026-11-23 代表の判断） */
  applyFrom: "2026年11月24日",
  /** 冬休みの体験便（参加が決まった家庭は無料。本番の参加費に含む）。便の日付は lib/station/bin.ts の TRIAL_BINS と合わせる */
  trial: "2026年12月26日(土)・27日(日)・28日(月)の朝 9:00〜10:30",
  seats: 24,
  payBy: "2027年1月11日(月)",
  refundBy: "2027年1月17日(日)",
  /** 申込の締切（定員に達したら先に締め切る） */
  applyBy: "2027年1月8日(金)",
  /** 第1週の便の予約の締切 */
  firstBookBy: "2027年1月10日(日)",
  /** 班をお知らせする日 */
  teamNoticeOn: "2027年1月11日(月)",
  line: "アオハル 学習便（@724myiue）",
  /** 申込フォーム（Googleフォーム。公開すると開ける） */
  applyUrl: "https://docs.google.com/forms/d/1jZYNI17Kb4w1y1Q9EGjEvdG8VhIge2GX5VkzWeebaUY/viewform",
  mail: "pr@bluespring.co.jp",
} as const;

export const BIN_TIMETABLE = [
  { name: "夜便", days: "月・水・木・金", time: "19:30〜21:00" },
  { name: "朝便", days: "日", time: "9:00〜10:30" },
] as const;
