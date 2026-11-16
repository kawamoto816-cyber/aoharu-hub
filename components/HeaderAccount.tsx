"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { openBillingPortal } from "@/components/BillingPortalLink";

// ヘッダーの中に置く、スマホ用の小さなアカウント表示 (アバターだけ)。
// スマホでは、右上に固定したアカウントの枠 (AccountCorner) がヘッダーの「まなぶ」「はじめての方へ」に重なって
// 押せなかったので、これを置いたページでは固定の枠を出さず (app/globals.css)、ヘッダーの中にアバターだけを出す。
// 「プラン管理」とログアウトはアバターのメニューから。sm 以上は、これまでどおり右上の枠を使う。
export function HeaderAccount() {
  return (
    <SignedIn>
      <span data-header-account className="ml-auto flex shrink-0 items-center sm:hidden">
        <UserButton afterSignOutUrl="/">
          <UserButton.MenuItems>
            <UserButton.Action label="プラン管理" labelIcon={<span aria-hidden="true">💳</span>} onClick={() => void openBillingPortal()} />
          </UserButton.MenuItems>
        </UserButton>
      </span>
    </SignedIn>
  );
}
