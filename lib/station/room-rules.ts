// アオハルームの決まりのうち、画面（lib/station/room.ts＝"use client"）とサーバー（lib/station/room-store.ts）の両方で使う値。
// ここには "use client" を付けない。"use client" のファイルから値をサーバーで読むと、値ではなく参照になってしまい、
// 計算が壊れる（2026-11-23：部屋のいまが読めなかった原因）。型だけならどちらから読んでもよい。

/** 部屋で選べる学年 */
export const ROOM_GRADES = ["小6", "中1", "中2", "中3", "高1", "高2", "高3"] as const;
/** 継続王になる日数 */
export const ROOM_STREAK_KING = 30;
