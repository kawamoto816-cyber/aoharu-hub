// 学習便（ラーニングステーションの試験運用・2027年1月13日〜2月7日）の決まりごと。案内・規約・表記のページで同じ値を使う。
export const BIN = {
  name: "アオハル 学習便",
  period: "2027年1月13日(水)〜2月7日(日)",
  priceJpy: 2980,
  seats: 24,
  payBy: "2027年1月11日(月)",
  refundBy: "2027年1月17日(日)",
  briefing: "2027年1月9日(土)",
  /** 申込フォーム（Googleフォーム。公開すると開ける） */
  applyUrl: "https://docs.google.com/forms/d/1jZYNI17Kb4w1y1Q9EGjEvdG8VhIge2GX5VkzWeebaUY/viewform",
  mail: "pr@bluespring.co.jp",
} as const;

export const BIN_TIMETABLE = [
  { name: "夜便", days: "月・水・木・金", time: "19:30〜21:00" },
  { name: "朝便", days: "日", time: "9:00〜10:30" },
] as const;
