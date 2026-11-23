// app/api/billing/checkout/route.ts
// Pro/MaxプランへのアップグレードのためのStripe Checkoutセッションを作成する。
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { resolveShareToken } from "@/lib/parent-share/store";
import { createTicketCheckoutSession, TICKET } from "@/lib/tensaku/ticket";
import { discounted, getReferral } from "@/lib/referral/store";
import { COURSES, isSaleKind, type SaleKind } from "@/lib/station/course-kinds";
import { courseAccess, createCoursePassCheckoutSession } from "@/lib/station/course-pass";
import {
  getCurrentUserId,
  createCheckoutSession,
  createSeasonPassCheckoutSession,
  getOrCreateSubscription,
  seasonPassPriceJpy,
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
    // 保護者ビュー（/parent-view/<トークン>）から、保護者がそのまま受験シーズンパスを払うとき。
    // 保護者はログインしていないので、共有トークンでお子さんのアカウントを決める（トークンを持つ人はお子さんの分を払えるだけ）。
    const peek = (await req.clone().json().catch(() => ({}))) as { plan?: string; shareToken?: string; ref?: string };
    if (peek.plan === "season" && typeof peek.shareToken === "string" && peek.shareToken.length > 10) {
      const childId = await resolveShareToken(peek.shareToken);
      if (!childId) return NextResponse.json({ error: "リンクが無効です" }, { status: 404 });
      return seasonPass(req, childId, true, peek.ref);
    }

    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "ログインが必要です", reason: "auth_required" },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));

    // 受験シーズンパス（買い切り・自動更新なし）
    if (body?.plan === "season") return seasonPass(req, userId, body?.payer === "parent", typeof body?.ref === "string" ? body.ref : undefined);

    // 直前コース（共通テスト・公立高校入試）：1回払い 4,980円
    if (body?.plan === "course") return coursePass(req, userId, body?.kind, body?.payer === "parent");

    // 1通分の添削（300円・書き直したあとの再添削1回つき）
    if (body?.plan === "ticket") {
      const origin = new URL(req.url).origin;
      const user = await currentUser();
      const session = await createTicketCheckoutSession({
        userId,
        successUrl: `${origin}/tensaku?checkout=success&plan=ticket&value=${TICKET.priceJpy}&session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${origin}/tensaku?checkout=cancel`,
        userEmail: user?.emailAddresses?.[0]?.emailAddress,
      });
      if (!session.url) return NextResponse.json({ error: "Checkoutセッションの作成に失敗しました" }, { status: 500 });
      return NextResponse.json({ url: session.url });
    }

    const plan = body?.plan as UpgradePlan | undefined;
    if (!plan || !VALID_PLANS.includes(plan)) {
      return NextResponse.json(
        { error: "planはpro/maxのいずれかを指定してください" },
        { status: 400 }
      );
    }

    // payer: "parent" は、本人が保護者に送る支払いリンク。保護者が開いて支払うので、
    // 本人のメールアドレスは入れず (保護者が自分のアドレスを入れる)、支払い後は保護者向けのお礼ページへ戻す。
    const forParent = body?.payer === "parent";

    const origin = new URL(req.url).origin;
    const user = forParent ? null : await currentUser();
    const userEmail = user?.emailAddresses?.[0]?.emailAddress;

    // {CHECKOUT_SESSION_ID} はStripeがCheckout完了後のリダイレクト時に実際のセッションIDへ
    // 置換してくれるプレースホルダ。GA4のpurchaseイベントをリロード等で二重計測しないための
    // トランザクションIDとして使う。
    const successUrl = forParent
      ? `${origin}/parents/thanks?plan=${plan}`
      : `${origin}/?checkout=success&plan=${plan}` +
        `&value=${PLAN_VALUE_JPY[plan]}&session_id={CHECKOUT_SESSION_ID}`;

    const session = await createCheckoutSession({
      userId,
      plan,
      successUrl,
      cancelUrl: forParent ? `${origin}/parents` : `${origin}/?checkout=cancel`,
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

/** 受験シーズンパスの支払い画面。月額の契約中の人には出さない（二重に払わせない） */
async function seasonPass(req: Request, userId: string, forParent: boolean, refCode?: string) {
  const row = await getOrCreateSubscription(userId);
  if (row.plan !== "free" && row.status === "active") {
    return NextResponse.json({ error: "すでに有料プランをご利用中です", reason: "already_paid" }, { status: 409 });
  }
  const origin = new URL(req.url).origin;
  const user = forParent ? null : await currentUser();
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  // 個人の先生の紹介コード：10%引き（コードが見つからなければ、ふつうの値段）
  const ref = refCode ? await getReferral(refCode).catch(() => null) : null;
  const price = ref ? discounted(seasonPassPriceJpy()) : seasonPassPriceJpy();
  const successUrl = forParent
    ? `${origin}/parents/thanks?plan=season&value=${price}&session_id={CHECKOUT_SESSION_ID}`
    : `${origin}/tensaku?checkout=success&plan=season&value=${price}&session_id={CHECKOUT_SESSION_ID}`;
  const session = await createSeasonPassCheckoutSession({
    referral: ref ? { code: ref.code, unitAmountJpy: price } : undefined,
    userId,
    successUrl,
    cancelUrl: forParent ? `${origin}/parents#season` : `${origin}/tensaku?checkout=cancel`,
    userEmail,
  });
  if (!session.url) return NextResponse.json({ error: "Checkoutセッションの作成に失敗しました" }, { status: 500 });
  return NextResponse.json({ url: session.url });
}

/** 直前コースの支払い画面。もう使える人（買った人・Max・受験シーズンパス）には出さない（二重に払わせない） */
async function coursePass(req: Request, userId: string, kindRaw: unknown, forParent: boolean) {
  if (!isSaleKind(kindRaw)) return NextResponse.json({ error: "コースの種類がちがいます" }, { status: 400 });
  const kind: SaleKind = kindRaw;
  const c = COURSES[kind];
  // 公立高校入試コース（中学生向け）は、保護者あての支払いリンクだけ
  if (c.sale!.parentOnly && !forParent) return NextResponse.json({ error: "このコースは、保護者の方あての支払いリンクからお申し込みください", reason: "parent_only" }, { status: 400 });
  if ((await courseAccess(userId, kind)).access) return NextResponse.json({ error: "すでにこのコースを使えます", reason: "already_paid" }, { status: 409 });
  const origin = new URL(req.url).origin;
  const user = forParent ? null : await currentUser();
  const q = `plan=course_${kind}&value=${c.sale!.priceJpy}&session_id={CHECKOUT_SESSION_ID}`;
  const session = await createCoursePassCheckoutSession({
    userId,
    kind,
    successUrl: forParent ? `${origin}/parents/thanks?${q}` : `${origin}${c.href}?checkout=success&${q}`,
    cancelUrl: forParent ? `${origin}/parents#course` : `${origin}${c.href}?checkout=cancel`,
    userEmail: user?.emailAddresses?.[0]?.emailAddress,
  });
  if (!session.url) return NextResponse.json({ error: "Checkoutセッションの作成に失敗しました" }, { status: 500 });
  return NextResponse.json({ url: session.url });
}
