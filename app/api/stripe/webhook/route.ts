// app/api/stripe/webhook/route.ts
// アオハルOS全体で唯一のStripe Webhookエンドポイント。
// Stripeダッシュボードのwebhook設定はここ(app.bluespring.co.jp)だけに登録すること。
// (lib/aoharu-entitlements/stripe/webhook.ts のコメント参照。DBはSupabaseで
//  全アプリ共有のため、同期処理は1箇所で十分)
import { NextResponse } from "next/server";
import { getStripe, handleStripeWebhookEvent } from "@bluespring/aoharu-entitlements";

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook設定が不足しています" },
      { status: 400 }
    );
  }

  const body = await req.text();

  let event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error("[stripe/webhook] signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook署名の検証に失敗しました: ${err.message}` },
      { status: 400 }
    );
  }

  try {
    await handleStripeWebhookEvent(event);
    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("[stripe/webhook] handler error:", err);
    return NextResponse.json(
      { error: err?.message || "Webhook処理中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
