"use client";

import { useReadLog } from "@/lib/lecture/readLog";

// 使い方ツアーの「わかる」に、例の単元を読み終えていれば印を出す (この端末の記録)。
export function TutorialReadMark({ unit }: { unit: string }) {
  const log = useReadLog();
  if (!log.read[unit]) return null;
  return <span className="rounded-full bg-[#1B7A3A] px-2 py-0.5 text-[11px] font-black text-white">✓ 読んだ</span>;
}
