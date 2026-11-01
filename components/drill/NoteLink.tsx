"use client";

import Link from "next/link";
import { useNote } from "@/lib/learn/mistakes";

// 「まちがいノート」への小さな入口。この端末のノートの件数を添える。

export function NoteLink({ kids = false, className = "" }: { kids?: boolean; className?: string }) {
  const n = Object.keys(useNote().items).length;
  return (
    <Link
      href="/learn/note"
      className={`inline-flex min-h-[44px] items-center gap-2 rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-3 text-[14px] font-black text-[#15172B] no-underline shadow-[2px_2px_0_#15172B] hover:bg-[#FFFBE6] ${className}`}
    >
      <span aria-hidden="true" className="text-[#D9341F]">
        ✕
      </span>
      <span>まちがいノート</span>
      {n > 0 && (
        <span className="rounded-full bg-[#FFE45C] px-2 py-0.5 text-[12px] font-black">
          {n}
          {kids ? "もん" : "問"}
        </span>
      )}
      <span aria-hidden="true">→</span>
    </Link>
  );
}
