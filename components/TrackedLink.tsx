"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

// GA4のファネル計測用リンク。クリック時に指定イベントを送ってから遷移する。
// 外部アプリ (essay.bluespring.co.jp 等) への導線に使う。
export function TrackedLink({
  href,
  event,
  params,
  className,
  children,
  external,
}: {
  href: string;
  /** GA4イベント名 (例: "try_entry_click") */
  event: string;
  /** イベントに付けるパラメータ (例: { entry: "has_text", app: "tensakun" }) */
  params?: Record<string, string | number | boolean | undefined>;
  className?: string;
  children: ReactNode;
  /** 新しいタブで開く */
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={className}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={() => trackEvent(event, params)}
    >
      {children}
    </a>
  );
}
