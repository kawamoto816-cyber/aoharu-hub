"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

// 右上の「無料登録」・アカウントの枠。
// ふだんは画面に固定 (fixed) するが、ドリル・修行などを解いている画面では、
// タブレット幅でタイマーや記号キー (sticky のバー) に重なってしまうので、
// ページの上にだけ置いて (absolute)、スクロールすると一緒に流れるようにする。
// 登録・ログインの入口そのものは、どの画面でも消さない。

const FOCUS = [/^\/learn\/(math|sansu|kousuu)\/\d+\/?$/, /^\/learn\/math\/shindan\/?$/, /\/play\/?$/, /^\/learn\/[a-z-]+\/[ejh]-[\w-]+\/?$/];

export function AccountCorner({ children }: { children: ReactNode }) {
  const path = usePathname() ?? "";
  const focus = FOCUS.some((re) => re.test(path));
  return <div className={`${focus ? "absolute" : "fixed"} top-4 right-4 z-[9999] flex flex-col items-end gap-1.5`}>{children}</div>;
}
