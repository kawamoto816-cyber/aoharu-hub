"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { SmartSignUpButton } from "@/components/SmartSignUpButton";
import { syncWithAccount } from "@/lib/learn/progress";
import { useProgress } from "./useProgress";

// 「まなぶ」のページを開いたとき、アカウントの進み具合とこの端末の分を合わせる。
// 未登録で1枚以上進めた人には、「登録すると進み具合が残る」を一度だけ控えめに案内する。
export function LearnSync({ showNudge = false, returnUrl = "/learn" }: { showNudge?: boolean; returnUrl?: string }) {
  const { isLoaded, isSignedIn } = useAuth();
  const [synced, setSynced] = useState(false);
  const progress = useProgress();
  const count = Object.keys(progress).length;

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    let alive = true;
    syncWithAccount().then((ok) => {
      if (alive) setSynced(ok);
    });
    return () => {
      alive = false;
    };
  }, [isLoaded, isSignedIn]);

  if (!showNudge || !isLoaded) return null;

  if (isSignedIn) {
    return synced ? <p className="m-0 text-xs font-bold text-[#1533B8]">進み具合はアカウントに保存されています。別の端末でも続きから使えます。</p> : null;
  }

  if (count === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border-[1.5px] border-dashed border-[#15172B] bg-white px-4 py-3">
      <p className="m-0 min-w-0 flex-1 text-[13px] font-bold leading-relaxed">
        いまの進み具合（{count}枚）は、この端末にだけ保存されています。無料登録すると、アカウントに保存して別の端末でも続きから使えます。
      </p>
      <SmartSignUpButton analyticsLocation="learn_save" redirectUrl={returnUrl} className="min-h-[44px] rounded-xl border-[1.5px] border-[#15172B] bg-[#FFE45C] px-4 text-sm font-black text-[#15172B]">
        無料登録して保存する
      </SmartSignUpButton>
    </div>
  );
}
