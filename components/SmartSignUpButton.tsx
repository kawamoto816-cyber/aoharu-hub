"use client";

import type { ReactNode } from "react";
import { useClerk } from "@clerk/nextjs";
import { openSignUpWithRecovery } from "@/lib/authReloadGuard";

// 通常はClerkの<SignUpButton mode="modal">と同じ見た目・動作をするボタン。
// クライアント/サーバー間のセッション不一致でモーダルが開かなかった場合に
// 自動リロードで復旧を試みる点だけが異なる(詳細はlib/authReloadGuard.ts参照)。
export function SmartSignUpButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const clerk = useClerk();

  return (
    <button
      type="button"
      className={className}
      onClick={() => openSignUpWithRecovery(clerk)}
    >
      {children}
    </button>
  );
}
