"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { trackEvent } from "@/lib/analytics";
import { recentVariant, sendStartEvent } from "@/lib/start/ab";

// 新規登録の「完了」を GA4 の sign_up として1回だけ送る (これまでは登録ボタンのクリックしか測れていなかった)。
// Clerk のユーザー作成時刻が30分以内で、このブラウザでまだ送っていなければ送る。広告の成果 (コンバージョン) にも使う。
export function SignUpTracker() {
  const { isLoaded, user } = useUser();
  useEffect(() => {
    if (!isLoaded || !user?.createdAt) return;
    const ageMs = Date.now() - new Date(user.createdAt).getTime();
    if (ageMs > 30 * 60 * 1000) return;
    const key = `aoharu_signup_tracked_${user.id}`;
    try {
      if (localStorage.getItem(key)) return;
      localStorage.setItem(key, "1");
    } catch {
      /* 保存できない環境でも1回は送る */
    }
    const sv = recentVariant();
    trackEvent("sign_up", { method: "clerk", page: window.location.pathname, start_variant: sv ?? undefined });
    // 入口ページ (/start) の ABC テスト：14日以内に /start を見た端末なら、その案の登録として数える
    if (sv) sendStartEvent(sv, "signup");
  }, [isLoaded, user]);
  return null;
}
