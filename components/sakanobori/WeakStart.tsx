"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { readMastery, weakUnits, type MasteryMap } from "@/lib/sakanobori/mastery";

// さかのぼりの入口の「苦手な単元から始める」。この端末の習熟度 (lib/sakanobori/mastery) を読んで、低い順に出す。
// 記録がなければ何も出さない。names は単元 id → 単元名と学年のラベル（サーバーから、データのある単元だけ）。

export function WeakStart({ names }: { names: Record<string, { name: string; label: string }> }) {
  const [map, setMap] = useState<MasteryMap | null>(null);
  useEffect(() => {
    // localStorage は描画のあとで読む（サーバーの HTML と合わせるため）
    const id = window.setTimeout(() => setMap(readMastery()), 0);
    return () => window.clearTimeout(id);
  }, []);
  if (!map) return null;
  const weak = weakUnits(map).filter((u) => names[u]).slice(0, 6);
  if (!weak.length) return null;
  return (
    <section aria-labelledby="sk-weak" className="mt-6 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-4 shadow-[4px_4px_0_#15172B] sm:p-5">
      <h2 id="sk-weak" className="m-0 text-[18px] font-black">
        にがてそうな単元から
      </h2>
      <p className="m-0 mt-1 text-[13px] font-bold leading-relaxed text-[#3A3D55]">これまでに解いた答えから、まだ身についていない単元です（この端末の記録）。</p>
      <ul className="m-0 mt-3 grid list-none gap-2 p-0 sm:grid-cols-2">
        {weak.map((u) => (
          <li key={u}>
            <Link
              href={`/learn/sakanobori?u=${encodeURIComponent(u)}`}
              className="flex min-h-[52px] items-center justify-between gap-2 rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-4 py-2 text-[15px] font-black text-[#15172B] no-underline shadow-[2px_2px_0_#15172B]"
            >
              <span className="min-w-0 [overflow-wrap:anywhere]">
                {names[u].name}
                <span className="block text-[12px] font-bold text-[#5A5D73]">
                  {names[u].label}・できた割合 {Math.round(map[u].m * 100)}%
                </span>
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
