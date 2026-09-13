"use client";

import type { ReactNode } from "react";
import { useClerk } from "@clerk/nextjs";
import { openSignUpWithRecovery } from "@/lib/authReloadGuard";
import { trackEvent } from "@/lib/analytics";

// 通常はClerkの<SignUpButton mode="modal">と同じ見た目・動作をするボタン。
// クライアント/サーバー間のセッション不一致でモーダルが開かなかった場合に
// 自動リロードで復旧を試みる点だけが異なる(詳細はlib/authReloadGuard.ts参照)。
//
// analyticsLocation: GA4計測用に「どこに置かれたボタンか」を区別するための
// 任意ラベル(例: "header" / "hero" / "bottom_cta")。省略時は計測しない。
export function SmartSignUpButton({
  className,
  children,
  analyticsLocation,
}: {
  className?: string;
  children: ReactNode;
  analyticsLocation?: string;
}) {
  const clerk = useClerk();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (analyticsLocation) {
          trackEvent("sign_up_click", { location: analyticsLocation });
        }
        openSignUpWithRecovery(clerk);
      }}
    >
      {children}
    </button>
  );
}
