"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { seasonPrice, yen } from "@/lib/aoharu-entitlements/config/season-price";

// 早割の期間だけ、受験生・保護者が来るページの上に細い帯を出す（押すと /season）。
// 早割が終わると自動で出なくなる。×で閉じたら、その日は出さない（端末ごと）。
// 小中学生向けの学習ページ・管理画面・支払いまわりには出さない。

const SHOW_PREFIXES = ["/tensaku", "/guide", "/parents", "/try", "/learn/shoronbun", "/learn/mensetsu", "/tutorial"];
const HIDE_KEY = "aoharu_season_banner_hidden";

function today(): string {
  return new Date(Date.now() + 9 * 3600_000).toISOString().slice(0, 10);
}

export function SeasonEarlyBanner() {
  const path = usePathname() ?? "/";
  const [hidden, setHidden] = useState(true);
  const sp = seasonPrice();
  const target = path === "/" || SHOW_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));

  useEffect(() => {
    let h = false;
    try {
      h = localStorage.getItem(HIDE_KEY) === today();
    } catch {
      /* 読めなければ出す */
    }
    setHidden(h);
  }, []);

  if (!sp.early || !target || hidden) return null;
  return (
    <div className="relative z-[55] flex items-center justify-center gap-2 bg-[#15172B] px-10 py-2 text-center text-[12.5px] font-bold leading-snug text-white">
      <Link href="/season?from=banner" onClick={() => trackEvent("season_banner_click", { path })} className="text-white no-underline">
        <span className="mr-1.5 rounded-full bg-[#E8412C] px-2 py-0.5 text-[11px]">早割</span>
        受験シーズンパス {yen(sp.jpy)}円（通常{yen(sp.regularJpy)}円）は{sp.earlyLabel}まで・あと{sp.earlyDaysLeft}日
        <span className="ml-1 underline">くわしく</span>
      </Link>
      <button
        type="button"
        aria-label="閉じる"
        onClick={() => {
          setHidden(true);
          try {
            localStorage.setItem(HIDE_KEY, today());
          } catch {
            /* 保存できなくても閉じる */
          }
        }}
        className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full text-base text-white/80"
      >
        ×
      </button>
    </div>
  );
}
