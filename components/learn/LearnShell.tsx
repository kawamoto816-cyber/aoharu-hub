import type { ReactNode } from "react";
import Link from "next/link";
import { zen } from "@/components/landing/fonts";
import { SUPERVISION } from "@/lib/learn/types";

// 「まなぶ」各ページの外枠 (方眼紙の背景・ヘッダー・パンくず・監修表記)。
// 右上はレイアウト共通の「無料登録」ボタンが重なるので空けておく。

const paper =
  "bg-[#F7F6F1] [background-image:linear-gradient(#E4E2D8_1px,transparent_1px),linear-gradient(90deg,#E4E2D8_1px,transparent_1px)] [background-size:28px_28px]";

export function LearnShell({ crumbs, children, narrow = false }: { crumbs: { href?: string; label: string }[]; children: ReactNode; narrow?: boolean }) {
  return (
    <main className={`${zen.className} ${paper} min-h-screen flex-1 text-[#15172B]`}>
      <header className="border-b border-[#E4E2D8] bg-[#F7F6F1]/95">
        <div className="mx-auto flex max-w-[1100px] items-center gap-3 px-4 py-3 sm:px-6 sm:pr-[230px]">
          <Link href="/" className="flex items-center gap-2 text-[#15172B] no-underline">
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-[#1533B8] text-base font-black text-white">ア</span>
            <span className="text-lg font-black">アオハルOS</span>
          </Link>
          <Link href="/learn" className="rounded-full border-[1.5px] border-[#15172B] bg-[#FFE45C] px-3 py-1 text-sm font-black text-[#15172B] no-underline">
            まなぶ
          </Link>
        </div>
      </header>
      <div className={`mx-auto px-4 pb-16 pt-5 sm:px-6 ${narrow ? "max-w-[560px]" : "max-w-[1100px]"}`}>
        <nav aria-label="パンくずリスト" className="text-xs font-bold text-[#3A3D55]">
          {crumbs.map((c, i) => (
            <span key={c.label}>
              {i > 0 && <span className="mx-1.5">/</span>}
              {c.href ? (
                <Link href={c.href} className="text-[#3A3D55] hover:text-[#1533B8]">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <div className="mt-4">{children}</div>
        <p className="mb-0 mt-12 text-center text-xs text-[#3A3D55]">{SUPERVISION}</p>
      </div>
    </main>
  );
}
