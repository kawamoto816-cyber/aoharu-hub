// app/api/billing/checkout/route.ts
// Pro/MaxプランへのアップグレードのためのStripe Checkoutセッションを作成する。
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import {
  getCurrentUserId,
  createCheckoutSession,
} from "@bluespring/aoharu-entitlements";

const VALID_PLANS = ["pro", "max"] as const;
type UpgradePlan = (typeof VALID_PLANS)[number];

// GA4のpurchaseイベント計測用。Stripe側の実際の請求額はここと独立して管理されているが、
// LP側の料金表示(PricingTable)と一致する固定の月額なので、計測目的ではこれで十分。
const PLAN_VALUE_JPY: Record<UpgradePlan, number> = {
  pro: 980,
  max: 2980,
};

export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "ログインが必要です", reason: "auth_required" },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const plan = body?.plan as UpgradePlan | undefined;
    if (!plan || !VALID_PLANS.includes(plan)) {
      return NextResponse.json(
        { error: "planはpro/maxのいずれかを指定してください" },
        { status: 400 }
      );
    }

    const origin = new URL(req.url).origin;
    const user = await currentUser();
    const userEmail = user?.emailAddresses?.[0]?.emailAddress;

    // {CHECKOUT_SESSION_ID} はStripeがCheckout完了後のリダイレクト時に実際のセッションIDへ
    // 置換してくれるプレースホルダ。GA4のpurchaseイベントをリロード等で二重計測しないための
    // トランザクションIDとして使う。
    const successUrl =
      `${origin}/?checkout=success&plan=${plan}` +
      `&value=${PLAN_VALUE_JPY[plan]}&session_id={CHECKOUT_SESSION_ID}`;

    const session = await createCheckoutSession({
      userId,
      plan,
      successUrl,
      cancelUrl: `${origin}/?checkout=cancel`,
      userEmail,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Checkoutセッションの作成に失敗しました" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("[billing/checkout] error:", error);
    return NextResponse.json(
      { error: error?.message || "予期しないエラーが発生しました" },
      { status: 500 }
    );
  }
}
