"use client";

import { useEffect } from "react";

// URL に ?ref=SENSEI-XXXXXX があれば、このブラウザに90日間おぼえておく（個人の先生の紹介コード）。
// 受験シーズンパスの支払いのときに UpgradeActions が読んで送る。保存できない環境では何もしない。
export const REF_STORAGE_KEY = "aoharu_ref";
const DAYS = 90;

export function readStoredRef(): string | null {
  try {
    const v = localStorage.getItem(REF_STORAGE_KEY);
    if (!v) return null;
    const o = JSON.parse(v) as { code: string; at: number };
    if (Date.now() - o.at > DAYS * 86400_000) return null;
    return o.code;
  } catch {
    return null;
  }
}

export function RefCapture() {
  useEffect(() => {
    try {
      const ref = new URL(window.location.href).searchParams.get("ref");
      if (ref && /^[A-Za-z0-9-]{6,20}$/.test(ref)) localStorage.setItem(REF_STORAGE_KEY, JSON.stringify({ code: ref, at: Date.now() }));
    } catch {
      /* 保存できなくても使える */
    }
  }, []);
  return null;
}
