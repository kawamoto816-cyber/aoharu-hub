// app/api/stripe/webhook/route.ts
// アオハルOS全体で唯一のStripe Webhookエンドポイント。
// Stripeダッシュボードのwebhook設定はここ(app.bluespring.co.jp)だけに登録すること。
// (lib/aoharu-entitlements/stripe/webhook.ts のコメント参照。DBはSupabaseで
//  全アプリ共有のため、同期処理は1箇所で十分)
import { NextResponse } from "next/server";
import { getStripe, handleStripeWebhookEvent } from "@bluespring/aoharu-entitlements";
import { ensureTeamPassForSession, TEAM_METADATA_KIND } from "@/lib/team-pass/store";
import { grantTicketForSession, TICKET } from "@/lib/tensaku/ticket";
import { recordReferralSale } from "@/lib/referral/store";

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
    // 塾向けシーズンプラン（ログインなしで塾が払う）：招待コードを発行して、メールで送る
    if (event.type === "checkout.session.completed" && event.data.object.metadata?.kind === TEAM_METADATA_KIND) {
      await ensureTeamPassForSession(event.data.object.id);
      return NextResponse.json({ received: true });
    }
    // 1通分の添削（300円）：その人の添削の回数を2つ足す
    if (event.type === "checkout.session.completed" && event.data.object.metadata?.kind === TICKET.metadataKind) {
      await grantTicketForSession(event.data.object.id);
      return NextResponse.json({ received: true });
    }
    // 紹介コードつきのパス：先生へのお礼の計算のために記録する（パスを付けるのは下の共通の処理）
    if (event.type === "checkout.session.completed" && event.data.object.metadata?.ref && event.data.object.payment_status === "paid") {
      const o = event.data.object;
      await recordReferralSale(o.metadata!.ref!, o.id, o.amount_total ?? 0).catch((e) => console.error("[referral] record", e instanceof Error ? e.message : e));
    }
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
