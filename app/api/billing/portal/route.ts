// app/api/billing/portal/route.ts
// 契約中のプラン変更・支払い方法の更新・解約のためのStripeカスタマーポータル
// セッションを作成する。まだStripe顧客がいない(=一度も課金したことがない)
// ユーザーがアクセスした場合は、reason: "no_plan" を返す。
import { NextResponse } from "next/server";
import {
  getCurrentUserId,
  createBillingPortalSession,
} from "@bluespring/aoharu-entitlements";

export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "ログインが必要です", reason: "auth_required" },
        { status: 401 }
      );
    }

    const origin = new URL(req.url).origin;

    const session = await createBillingPortalSession({
      userId,
      returnUrl: origin,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    if (error?.message === "NO_STRIPE_CUSTOMER") {
      return NextResponse.json(
        {
          error:
            "現在ご契約中のプランがないため、お支払い管理ページはご利用いただけません。",
          reason: "no_plan",
        },
        { status: 400 }
      );
    }
    console.error("[billing/portal] error:", error);
    return NextResponse.json(
      { error: error?.message || "予期しないエラーが発生しました" },
      { status: 500 }
    );
  }
}
