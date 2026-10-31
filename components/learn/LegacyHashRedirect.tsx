"use client";

import { useEffect } from "react";

// 以前は /learn にスキル盤があったので、/learn#ura・/learn#topics の古いリンクを /learn/apply へ送る。
export function LegacyHashRedirect() {
  useEffect(() => {
    const h = window.location.hash;
    if (h === "#ura" || h === "#topics") window.location.replace(`/learn/apply${h}`);
  }, []);
  return null;
}
