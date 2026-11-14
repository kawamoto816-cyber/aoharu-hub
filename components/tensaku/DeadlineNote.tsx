"use client";

import { useState } from "react";
import { findUniv, nextDeadline } from "@/lib/tensaku/deadlines";

// 添削の画面の「志望先」の下に、その大学の一般選抜の次の出願締切を出す（2027年度入試・公式ページで調べた日程）。
// 締切が近いことを思い出してもらうための表示。日程は変わることがあるので、必ず公式ページへのリンクを添える。
export function DeadlineNote({ target }: { target: string }) {
  const [now] = useState(() => Date.now());
  const u = findUniv(target);
  if (!u) return null;
  const n = nextDeadline(u, now, target);
  if (!n) return null;
  const [, m, d] = n.item.applyDeadline.split("-").map(Number);
  return (
    <p className="mb-0 mt-2 rounded-lg bg-[#FFF6C4] px-3 py-2 text-xs leading-relaxed text-[#15172B]">
      <span className="font-bold">
        {u.univ}の一般選抜：次の出願締切は{m}月{d}日（{n.days === 0 ? "今日" : `あと${n.days}日`}）
      </span>
      <span className="block text-[#5A5D73]">
        {n.item.method}。日程は変わることがあるので、
        <a href={n.item.source} target="_blank" rel="noopener noreferrer" className="font-bold text-[#1533B8] underline">
          大学の公式ページ
        </a>
        で必ず確かめてください。
      </span>
    </p>
  );
}
