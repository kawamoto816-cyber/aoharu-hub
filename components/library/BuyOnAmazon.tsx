"use client";

import { trackEvent } from "@/lib/analytics";
import { AMAZON_DISCLOSURE } from "@/lib/library/amazon";

// 本のページの最後に置く、原典を読みたい人向けの Amazon へのリンク (アソシエイト)。
// 広告リンクなので「PR」を付け、rel="sponsored"。押された本だけを記録する (利用者の情報は送らない)。
export function BuyOnAmazon({ bookId, title, href }: { bookId: string; title: string; href: string }) {
  return (
    <section aria-labelledby="buy-heading" className="mt-8 rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5">
      <h2 id="buy-heading" className="m-0 text-base font-black">
        原典を読んでみたい人へ
      </h2>
      <p className="m-0 mt-1.5 text-[13px] leading-relaxed text-[#3A3D55]">文庫や新しい訳など、いくつかの版があります。読みやすそうな訳を選んでみましょう。学校や地域の図書館で借りるのもおすすめです。</p>
      <div className="mt-3 flex items-center gap-2">
        <a
          href={href}
          target="_blank"
          rel="sponsored noopener noreferrer"
          onClick={() => trackEvent("affiliate_click", { book: bookId, store: "amazon" })}
          className="inline-flex min-h-[48px] items-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-5 text-sm font-black text-[#15172B] no-underline shadow-[0_3px_0_#15172B]"
        >
          Amazonで『{title}』を探す
        </a>
        <span className="rounded border border-[#9A9CB0] px-1.5 py-0.5 text-[10px] font-bold text-[#5A5D73]">PR</span>
      </div>
      <p className="mb-0 mt-3 text-[11px] text-[#5A5D73]">{AMAZON_DISCLOSURE}</p>
    </section>
  );
}
