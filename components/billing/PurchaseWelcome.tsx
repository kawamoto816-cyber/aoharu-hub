"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

// 自分で支払いを終えて戻ってきた直後（?checkout=success）に、「次にやること」を3つだけ出す。
// 払ったあとすぐ使ってもらうと、満足と口コミにつながる。CheckoutSuccessTracker が URL のクエリを消すので、
// 最初の描画のときに読んでおく。表示は閉じるまで出す。

type Plan = "season" | "pro" | "max";

const STEPS: { t: string; d: string; href: string }[] = [
  { t: "前の添削の指摘を直して、もう一度添削する", d: "点の上がり方が見えます。回数の制限はありません。", href: "/tensaku" },
  { t: "しぼりゆで、志望理由書の骨組みを固める", d: "質問に答えるだけで、何をどの順で書くかが決まります。", href: "https://reason.bluespring.co.jp" },
  { t: "メンサツで、面接の練習を1回やってみる", d: "志望先の求める人物像にそって質問されます。", href: "https://interview.bluespring.co.jp" },
];

export function PurchaseWelcome() {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("checkout") !== "success") return;
    const v = p.get("plan");
    const next: Plan = v === "season" || v === "max" ? v : "pro";
    setPlan(next);
    trackEvent("purchase_welcome_view", { plan: next });
  }, []);

  if (!plan || !open) return null;
  const name = plan === "season" ? "受験シーズンパス" : plan === "max" ? "Max プラン" : "Pro プラン";
  return (
    <div role="status" className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:bottom-4 sm:left-auto sm:right-4 sm:max-w-md">
      <div className="rounded-[16px] border-[1.5px] border-[#15172B] bg-white p-4 text-[#15172B] shadow-[4px_4px_0_#15172B]">
        <div className="flex items-start justify-between gap-3">
          <p className="m-0 text-[16px] font-black leading-snug">{name}が使えるようになりました</p>
          <button type="button" onClick={() => setOpen(false)} aria-label="閉じる" className="-mr-1 -mt-1 h-8 w-8 rounded-full text-lg font-bold text-[#5A5D73]">
            ×
          </button>
        </div>
        <p className="mb-0 mt-1 text-xs text-[#5A5D73]">反映まで数分かかることがあります。領収書は支払いのときのメールアドレスに届きます。</p>
        <p className="mb-0 mt-3 text-xs font-black text-[#1533B8]">まずはこの3つから</p>
        <ol className="m-0 mt-1 grid list-none gap-2 p-0">
          {STEPS.map((s, i) => (
            <li key={s.t}>
              <a
                href={s.href}
                onClick={() => trackEvent("purchase_welcome_click", { plan, step: i + 1 })}
                className="block rounded-xl border border-[#15172B]/20 px-3 py-2 no-underline hover:bg-[#FFF6C4]"
              >
                <span className="text-sm font-bold text-[#15172B]">
                  {i + 1}. {s.t}
                </span>
                <span className="block text-xs text-[#5A5D73]">{s.d}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
