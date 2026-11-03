"use client";

import { useSyncExternalStore } from "react";

// あたらしいがっこうの記録。この端末の localStorage だけに置く (登録なし)。使えない環境でも画面は動く。
//   aoharu.gakko.attendance.v1 : { [日付 YYYY-MM-DD]: その日の時間割で読んだ単元id[] }  ← 4コマそろった日だけ書く (出席)
//   aoharu.gakko.grade         : 選んだ学年 (なければ /learn の UnitPicker の学年を使う)
//   aoharu.gakko.review.v1     : { date, ids } きょう開いた復習コマ (読んだ記録が更新されない単元のため)

export const ATTENDANCE_KEY = "aoharu.gakko.attendance.v1";
export const GRADE_KEY = "aoharu.gakko.grade";
export const REVIEW_KEY = "aoharu.gakko.review.v1";
export const PICKER_KEY = "aoharu.learn.picker";

const EVENT = "aoharu-gakko";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function getRaw(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // 保存できない環境では記録しない
  }
}

/** localStorage の生の文字列 (サーバー描画のときは null)。文字列なので、そのまま useSyncExternalStore のスナップショットにできる。 */
export function useStored(key: string): string | null {
  return useSyncExternalStore(
    subscribe,
    () => getRaw(key),
    () => null,
  );
}

export function parse<T>(raw: string | null, ok: (v: unknown) => v is T, fallback: T): T {
  if (!raw) return fallback;
  try {
    const v: unknown = JSON.parse(raw);
    return ok(v) ? v : fallback;
  } catch {
    return fallback;
  }
}

const noop = () => () => {};
/** 日付キーなど、クライアントでだけ決まる値 (サーバー描画では fallback) */
export function useClientValue<T extends string>(get: () => T, fallback: T): T {
  return useSyncExternalStore(noop, get, () => fallback);
}
