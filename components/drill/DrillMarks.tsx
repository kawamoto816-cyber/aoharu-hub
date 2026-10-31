"use client";

import { useDrill } from "@/lib/drill/progress";

// 一覧の単元の横に出す「合格ずみ」の印 (この端末の記録)。
export function DrillMark({ unit }: { unit: string }) {
  const r = useDrill()[unit];
  if (!r) return null;
  return <span className={`rounded-full px-2 py-0.5 text-[11px] font-black ${r.cleared ? "bg-[#1533B8] text-white" : "bg-[#E6E4DA] text-[#3A3D55]"}`}>{r.cleared ? "合格" : `ベスト ${r.best}/10`}</span>;
}
