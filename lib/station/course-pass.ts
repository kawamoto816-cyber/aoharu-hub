import { getStripe, getOrCreateSubscription } from "@bluespring/aoharu-entitlements";
import { getSetting, setSetting } from "@/lib/social/store";
import { COURSES, isSaleKind, type SaleKind } from "./course-kinds";

// 直前コース（共通テスト・大学入試・公立高校入試・私立高校入試）の利用権。1回払い 4,980円・自動更新なし（2026-11-23 代表の判断）。
// 買うと、そのコースの「2週目から（伴走）」が期限の日まで使える。Max・受験シーズンパスの人は買わなくても使える。
// 保存先は app_settings（key/value）。新しいテーブルは作らない（1通分の添削 lib/tensaku/ticket.ts と同じやり方）。
//   course_pass:<種類>:<ユーザーID>     → 期限（ISO 8601）
//   course_pass_session:<セッションID>  → "1"（同じ支払いで二重に付けないため）

export const COURSE_PASS_KIND = "course_pass";

const passKey = (kind: SaleKind, userId: string) => `course_pass:${kind}:${userId}`;

export type CourseVia = "max" | "course" | null;

/** そのコースの有料部分を使えるか。via: max＝Max・受験シーズンパス、course＝コースを買った */
export async function courseAccess(userId: string, kind: SaleKind): Promise<{ access: boolean; via: CourseVia; endsAt: string | null }> {
  const ends = await getSetting(passKey(kind, userId)).catch(() => null);
  if (ends && Date.parse(ends) > Date.now()) return { access: true, via: "course", endsAt: ends };
  const row = await getOrCreateSubscription(userId).catch(() => null);
  if (row && row.plan === "max" && (row.status === "active" || row.status === "trialing")) return { access: true, via: "max", endsAt: row.current_period_end ?? null };
  return { access: false, via: null, endsAt: null };
}

/** 支払いが済んだセッションの分を付ける（Webhook と、支払いから戻った画面の両方から呼ぶ。何度呼ばれても同じ結果）。付いた相手のユーザーIDを返す */
export async function grantCoursePassForSession(sessionId: string): Promise<{ userId: string; kind: SaleKind } | null> {
  if (!/^cs_[A-Za-z0-9_]{10,200}$/.test(sessionId)) return null;
  const session = await getStripe().checkout.sessions.retrieve(sessionId);
  if (session.metadata?.kind !== COURSE_PASS_KIND || session.payment_status !== "paid") return null;
  const userId = session.metadata?.clerk_user_id ?? session.client_reference_id;
  const kind = session.metadata?.course;
  if (!userId || !isSaleKind(kind)) return null;
  if (!(await getSetting(`course_pass_session:${sessionId}`).catch(() => null))) {
    await setSetting(passKey(kind, userId), COURSES[kind].sale!.endsAt);
    await setSetting(`course_pass_session:${sessionId}`, "1");
  }
  return { userId, kind };
}

/** 支払い画面を作る（1回払い） */
export async function createCoursePassCheckoutSession(params: { userId: string; kind: SaleKind; successUrl: string; cancelUrl: string; userEmail?: string }) {
  const stripe = getStripe();
  const c = COURSES[params.kind];
  const existing = await getOrCreateSubscription(params.userId);
  const metadata = { clerk_user_id: params.userId, kind: COURSE_PASS_KIND, course: params.kind };
  return stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "jpy",
          unit_amount: c.sale!.priceJpy,
          product_data: {
            name: `アオハルOS ${c.name}（${c.sale!.endsLabel}まで）`,
            description: "診断の結果から毎週の計画を作り直す、週のふり返り、進み具合、保護者に見せる報告。1回払い・自動更新なし。模試と授業は無料のまま使えます。",
          },
        },
      },
    ],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    client_reference_id: params.userId,
    customer: existing.stripe_customer_id ?? undefined,
    customer_email: existing.stripe_customer_id ? undefined : params.userEmail,
    metadata,
    payment_intent_data: { metadata },
  });
}
