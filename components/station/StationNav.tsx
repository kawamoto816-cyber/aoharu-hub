"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { balance, useStation } from "@/lib/station/store";

const ROOMS = [
  { href: "/station", label: "駅の入口" },
  { href: "/station/board", label: "掲示板" },
  { href: "/station/circle", label: "サークル" },
  { href: "/station/stage", label: "教壇" },
  { href: "/station/ranking", label: "格付け" },
  { href: "/station/shelf", label: "自分の棚" },
  { href: "/station/guide", label: "使い方" },
];

export function StationNav() {
  const path = usePathname();
  const s = useStation();
  return (
    <nav aria-label="駅の中の案内" className="flex flex-wrap items-center gap-1.5">
      {ROOMS.map((r) => {
        const on = r.href === "/station" ? path === "/station" : path.startsWith(r.href);
        return (
          <Link
            key={r.href}
            href={r.href}
            aria-current={on ? "page" : undefined}
            className={`rounded-full border-[1.5px] border-[#15172B] px-3 py-1.5 text-[13px] font-black no-underline ${on ? "bg-[#1533B8] text-white" : "bg-white text-[#15172B] hover:bg-[#E6EAFB]"}`}
          >
            {r.label}
          </Link>
        );
      })}
      <span className="ml-auto rounded-full bg-[#15172B] px-3 py-1.5 text-[13px] font-black text-white" title="ブルーコイン（換金できない感謝のしるし）">
        <Coin /> {balance(s)}
      </span>
    </nav>
  );
}

export function Coin({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-label="ブルーコイン" role="img" className="inline-block align-[-2px]">
      <circle cx="10" cy="10" r="9" fill="#2F6BFF" stroke="#0B2A8C" strokeWidth="1.5" />
      <path d="M7 6h4a2 2 0 0 1 0 4H7zM7 10h4.5a2 2 0 0 1 0 4H7z" fill="none" stroke="#fff" strokeWidth="1.6" />
    </svg>
  );
}

export function Stars({ n, size = 15 }: { n: number; size?: number }) {
  return (
    <span role="img" aria-label={n ? `マナビシュラン 星${n}つ` : "星はまだ"} className="whitespace-nowrap" style={{ fontSize: size, letterSpacing: 1 }}>
      {n ? <span className="text-[#E0A800]">{"★".repeat(n)}</span> : null}
      <span className="text-[#C9C7BD]">{"★".repeat(3 - n)}</span>
    </span>
  );
}
