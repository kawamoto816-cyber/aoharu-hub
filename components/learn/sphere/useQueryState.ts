"use client";

import { useMemo, useSyncExternalStore } from "react";

// URL の ?view=…&axis=… を読み書きする小さな仕組み。
// 静的に書き出したページのまま使えるよう、useSearchParams ではなく location.search を購読する
// (サーバー描画とハイドレーションのときは空 = 一覧)。

const EVENT = "aoharu-query-change";

function subscribe(cb: () => void) {
  window.addEventListener("popstate", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("popstate", cb);
    window.removeEventListener(EVENT, cb);
  };
}

const snapshot = () => window.location.search;
const serverSnapshot = () => "";

export function useQuery(): URLSearchParams {
  const s = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  return useMemo(() => new URLSearchParams(s), [s]);
}

/** クエリを書きかえる (null で消す)。push=true なら「戻る」で前に戻れる。hash を渡すとその位置へ */
export function setQuery(params: Record<string, string | null>, { push = false, hash = "" }: { push?: boolean; hash?: string } = {}) {
  const u = new URL(window.location.href);
  for (const [k, v] of Object.entries(params)) {
    if (v === null) u.searchParams.delete(k);
    else u.searchParams.set(k, v);
  }
  u.hash = hash;
  try {
    if (push) window.history.pushState(null, "", u);
    else window.history.replaceState(null, "", u);
  } catch {
    // 履歴を書けない環境では見た目だけ切りかえる
  }
  window.dispatchEvent(new Event(EVENT));
}
