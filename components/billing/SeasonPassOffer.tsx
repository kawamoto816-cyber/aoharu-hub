"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import { UpgradeActions } from "./UpgradeActions";

// 受験シーズンパスの案内（添削の結果が出た直後・無料枠を使い切ったときに出す）。
// いちばん「もっと直したい」と思う場面で、出願・面接が終わるまでの道具として1枚で見せる。
// 見えたら season_offer_view を1回送る（見た人のうち何人が支払い画面に進んだかを数えるため）。

const ENDS_LABEL = "2027年3月31日";

export function SeasonPassOffer({ location, lead }: { location: string; lead?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const sent = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || sent.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !sent.current) {
          sent.current = true;
          trackEvent("season_offer_view", { location });
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [location]);

  return (
    <div ref={ref} className="mt-6 rounded-[16px] border-[1.5px] border-[#15172B] bg-[#FFF6C4] p-4 shadow-[4px_4px_0_#15172B]">
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">出願・面接が終わるまで</p>
      <p className="m-0 mt-1 text-[18px] font-black leading-snug">受験シーズンパス　9,800円（1回払い）</p>
      {lead && <p className="mb-0 mt-2 text-[14px] font-bold leading-[1.8]">{lead}</p>}
      <ul className="m-0 mt-3 grid list-none gap-1.5 p-0 text-[13.5px] leading-[1.7]">
        <li>✓ 志望理由書・小論文・自己推薦書の添削が、回数の制限なし</li>
        <li>✓ 志望理由書の構成づくり（しぼりゆ）・AI面接官の面接練習（メンサツ）も使い放題</li>
        <li>✓ {ENDS_LABEL}まで、アオハルOSの全機能（Max と同じ）</li>
        <li>✓ 自動更新なし。期限が来たら無料プランにもどるだけで、追加の請求はありません</li>
      </ul>
      <UpgradeActions location={location} product="season" endsLabel={ENDS_LABEL} />
      <p className="mb-0 mt-2 text-[11.5px] leading-relaxed text-[#5A5D73]">
        月ごとに使いたい場合は Pro（月980円・いつでも解約可）もあります。<Link href="/#pricing" className="font-bold text-[#1533B8] underline">料金の一覧</Link>
      </p>
    </div>
  );
}
