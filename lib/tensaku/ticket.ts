import { getStripe, getOrCreateSubscription } from "@bluespring/aoharu-entitlements";
import { getSetting, setSetting } from "@/lib/social/store";

// 1回分の添削（2026-11-15 じゅんさんの判断：1通300円・書き直したあとの再添削1回つき）。
// 大学別の書類の記事から来た人が、無料の枠（月2本）を使い切ったときや結果の画面で、その場で1通分だけ買える。
// 1回買うと「添削の回数」が2つ増える（最初の添削＋書き直したあとの再添削）。期限はなし。
// 保存先は app_settings（key/value）。新しいテーブルは作らない。
//   tensaku_ticket:<ユーザーID>          → 残りの回数（数字）
//   tensaku_ticket_session:<セッションID> → "1"（同じ支払いで二重に足さないため）

export const TICKET = {
  priceJpy: 300,
  scores: 2,
  metadataKind: "tensaku_ticket",
  name: "テンサクン 1通分の添削（書き直したあとの再添削1回つき）",
} as const;

export async function getTickets(userId: string): Promise<number> {
  const v = await getSetting(`tensaku_ticket:${userId}`).catch(() => null);
  const n = Number(v ?? 0);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}

/** 1回分を使う。残りがなければ false */
export async function consumeTicket(userId: string): Promise<boolean> {
  const n = await getTickets(userId);
  if (n <= 0) return false;
  await setSetting(`tensaku_ticket:${userId}`, String(n - 1));
  return true;
}

/** 支払いが済んだセッションの分を足す（Webhook から呼ぶ。何度呼ばれても1回だけ足す） */
export async function grantTicketForSession(sessionId: string): Promise<boolean> {
  if (await getSetting(`tensaku_ticket_session:${sessionId}`).catch(() => null)) return false;
  const session = await getStripe().checkout.sessions.retrieve(sessionId);
  if (session.metadata?.kind !== TICKET.metadataKind || session.payment_status !== "paid") return false;
  const userId = session.metadata?.clerk_user_id ?? session.client_reference_id;
  if (!userId) return false;
  await setSetting(`tensaku_ticket_session:${sessionId}`, "1");
  const n = await getTickets(userId);
  await setSetting(`tensaku_ticket:${userId}`, String(n + TICKET.scores));
  return true;
}

/** 1回分の支払い画面を作る */
export async function createTicketCheckoutSession(params: { userId: string; successUrl: string; cancelUrl: string; userEmail?: string }) {
  const stripe = getStripe();
  const existing = await getOrCreateSubscription(params.userId);
  return stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "jpy",
          unit_amount: TICKET.priceJpy,
          product_data: { name: `アオハルOS ${TICKET.name}`, description: "志望理由書・小論文・自己推薦書の添削1回と、書き直したあとの再添削1回。期限なし・自動更新なし。" },
        },
      },
    ],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    client_reference_id: params.userId,
    customer: existing.stripe_customer_id ?? undefined,
    customer_email: existing.stripe_customer_id ? undefined : params.userEmail,
    metadata: { clerk_user_id: params.userId, kind: TICKET.metadataKind },
    payment_intent_data: { metadata: { clerk_user_id: params.userId, kind: TICKET.metadataKind } },
  });
}
