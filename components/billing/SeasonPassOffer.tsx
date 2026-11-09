"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import { seasonPrice, yen, SEASON_ENDS_LABEL } from "@/lib/aoharu-entitlements/config/season-price";
import { UpgradeActions } from "./UpgradeActions";

// 受験シーズンパスの案内（添削の結果が出た直後・無料枠を使い切ったとき・料金表・ハブに出す）。
// いちばん「もっと直したい」と思う場面で、出願・面接が終わるまでの道具として1枚で見せる。
// 見えたら season_offer_view を1回送る（見た人のうち何人が支払い画面に進んだかを数えるため）。
// 早割（season-price.ts）の期間中は、通常の値段に線を引いて早割の値段と締切を出す。

export function SeasonPassOffer({ location, lead, compact = false }: { location: string; lead?: string; compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const sent = useRef(false);
  const sp = seasonPrice();

  useEffect(() => {
    const el = ref.current;
    if (!el || sent.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !sent.current) {
          sent.current = true;
          trackEvent("season_offer_view", { location, early: sp.early ? 1 : 0 });
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [location, sp.early]);

  return (
    <div ref={ref} className="mt-6 rounded-[16px] border-[1.5px] border-[#15172B] bg-[#FFF6C4] p-4 text-left text-[#15172B] shadow-[4px_4px_0_#15172B]">
      <div className="flex flex-wrap items-center gap-2">
        <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">出願・面接が終わるまで</p>
        {sp.early && (
          <span className="rounded-full bg-[#E8412C] px-2 py-0.5 text-[11px] font-black text-white">
            早割 {sp.earlyLabel}まで（あと{sp.earlyDaysLeft}日）
          </span>
        )}
      </div>
      <p className="m-0 mt-1 text-[18px] font-black leading-snug">
        受験シーズンパス
        {sp.early && <s className="mr-1 text-[14px] font-bold text-[#5A5D73]">{yen(sp.regularJpy)}円</s>}
        {yen(sp.jpy)}円（1回払い）
      </p>
      {lead && <p className="mb-0 mt-2 text-[14px] font-bold leading-[1.8]">{lead}</p>}
      {!compact && (
        <ul className="m-0 mt-3 grid list-none gap-1.5 p-0 text-[13.5px] leading-[1.7]">
          <li>✓ 志望理由書・小論文・自己推薦書の添削が、回数の制限なし</li>
          <li>✓ 志望理由書の構成づくり（しぼりゆ）・AI面接官の面接練習（メンサツ）も使い放題</li>
          <li>✓ {SEASON_ENDS_LABEL}まで、アオハルOSの全機能（Max と同じ）</li>
          <li>✓ 自動更新なし。期限が来たら無料プランにもどるだけで、追加の請求はありません</li>
        </ul>
      )}
      <UpgradeActions location={location} product="season" endsLabel={SEASON_ENDS_LABEL} />
      <p className="mb-0 mt-2 text-[11.5px] leading-relaxed text-[#5A5D73]">
        月ごとに使いたい場合は Pro（月980円・いつでも解約可）もあります。<Link href="/#pricing" className="font-bold text-[#1533B8] underline">料金の一覧</Link>
      </p>
    </div>
  );
}
