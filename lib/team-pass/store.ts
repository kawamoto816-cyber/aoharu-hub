import { randomInt } from "node:crypto";
import { getStripe, grantSeasonPass, getOrCreateSubscription, SEASON_PASS } from "@bluespring/aoharu-entitlements";
import { getSetting, setSetting } from "@/lib/social/store";

// 塾向けシーズンプラン（2026-11-10 じゅんさんの判断）。
// 塾・教室が1回払いで買うと、招待コードが1つ発行される。生徒（と指導者1人）が自分のアカウントでコードを入れると、
// 受験シーズンパスと同じく期限（2027年3月31日）まで全機能が使える。
// 保存先は app_settings（key/value）。新しいテーブルは作らない。
//   team_pass:<CODE>            → TeamPass（JSON）
//   team_pass_session:<セッションID> → CODE（同じ支払いで2つ発行しないため）

export type TeamPlanKey = "team5" | "team10";
export const TEAM_PLANS: Record<TeamPlanKey, { seats: number; priceJpy: number; label: string }> = {
  team5: { seats: 5, priceJpy: 14800, label: "生徒5人まで" },
  team10: { seats: 10, priceJpy: 24800, label: "生徒10人まで" },
};
/** 指導者用に足す人数 */
export const TEACHER_SEATS = 1;
export const TEAM_METADATA_KIND = "team_pass";

export type TeamPass = {
  code: string;
  plan: TeamPlanKey;
  /** 使える人数（生徒＋指導者） */
  seats: number;
  users: string[];
  endsAt: string;
  sessionId: string;
  email: string | null;
  createdAt: string;
};

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // 0/O・1/I を除く

function newCode(): string {
  const part = () => Array.from({ length: 4 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
  return `JUKU-${part()}-${part()}`;
}

export function normalizeCode(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, "").replace(/^JUKU/, "").replace(/^(.{4})(.{4})$/, "JUKU-$1-$2");
}

export async function getTeamPass(code: string): Promise<TeamPass | null> {
  const v = await getSetting(`team_pass:${code}`);
  return v ? (JSON.parse(v) as TeamPass) : null;
}

async function saveTeamPass(p: TeamPass): Promise<void> {
  await setSetting(`team_pass:${p.code}`, JSON.stringify(p));
}

/** 支払い済みの Checkout セッションから招待コードを用意する（何度呼んでも同じコードを返す）。未払いなら null */
export async function ensureTeamPassForSession(sessionId: string): Promise<TeamPass | null> {
  const existing = await getSetting(`team_pass_session:${sessionId}`);
  if (existing) return getTeamPass(existing);
  const session = await getStripe().checkout.sessions.retrieve(sessionId);
  if (session.metadata?.kind !== TEAM_METADATA_KIND || session.payment_status !== "paid") return null;
  const plan = (session.metadata?.plan as TeamPlanKey) ?? "team5";
  const conf = TEAM_PLANS[plan] ?? TEAM_PLANS.team5;
  const pass: TeamPass = {
    code: newCode(),
    plan,
    seats: conf.seats + TEACHER_SEATS,
    users: [],
    endsAt: session.metadata?.ends_at ?? SEASON_PASS.endsAt,
    sessionId,
    email: session.customer_details?.email ?? null,
    createdAt: new Date().toISOString(),
  };
  await saveTeamPass(pass);
  await setSetting(`team_pass_session:${sessionId}`, pass.code);
  await sendCodeMail(pass).catch((e) => console.error("[team-pass] mail", e instanceof Error ? e.message : e));
  return pass;
}

export type RedeemResult =
  | { ok: true; endsAt: string; left: number }
  | { ok: false; reason: "not_found" | "full" | "expired" | "already_paid" };

/** 生徒（または指導者）がコードを入れたとき。同じ人が2回入れても1人分しか数えない */
export async function redeemTeamPass(rawCode: string, userId: string): Promise<RedeemResult> {
  const pass = await getTeamPass(normalizeCode(rawCode));
  if (!pass) return { ok: false, reason: "not_found" };
  if (Date.parse(pass.endsAt) < Date.now()) return { ok: false, reason: "expired" };
  if (!pass.users.includes(userId)) {
    if (pass.users.length >= pass.seats) return { ok: false, reason: "full" };
    const row = await getOrCreateSubscription(userId);
    // 月額の契約中の人には付けない（二重に数えない・月額の請求と混ざらないように）
    if (row.plan !== "free" && row.status === "active" && row.stripe_subscription_id) return { ok: false, reason: "already_paid" };
    pass.users.push(userId);
    await saveTeamPass(pass);
  }
  await grantSeasonPass({ userId, stripePriceId: `${TEAM_METADATA_KIND}:${pass.code}`, endsAt: pass.endsAt });
  return { ok: true, endsAt: pass.endsAt, left: pass.seats - pass.users.length };
}

async function sendCodeMail(p: TeamPass): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key || !p.email) return;
  const from = process.env.ONBOARDING_FROM_EMAIL ?? process.env.SALES_FROM_EMAIL ?? "アオハルOS（株式会社ブルースプリング） <pr@bluespring.co.jp>";
  const text = [
    "アオハルOS 塾向けシーズンプランをお申し込みいただき、ありがとうございます。",
    "",
    `招待コード: ${p.code}`,
    `使える人数: 生徒${p.seats - TEACHER_SEATS}人＋指導者${TEACHER_SEATS}人`,
    "使える期限: 2027年3月31日まで",
    "",
    "▼ 生徒さん・先生ご自身がコードを入れるページ（各自のアカウントで登録・ログインしてから入れてください）",
    `https://app.bluespring.co.jp/juku/code?c=${encodeURIComponent(p.code)}`,
    "",
    "コードを入れた人は、期限まで志望理由書・小論文の添削、面接練習など、アオハルOSの全機能を回数の制限なく使えます。",
    "自動更新はなく、期限後の請求はありません。領収書は Stripe から別にお送りしています。",
    "",
    "ご不明な点は pr@bluespring.co.jp までご返信ください。",
    "株式会社ブルースプリング アオハルOS担当",
  ].join("\n");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [p.email], subject: "【アオハルOS】塾向けシーズンプランの招待コード", text, reply_to: "pr@bluespring.co.jp" }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}`);
}

/** 塾向けプランの支払い画面（ログイン不要。払うのは塾・教室） */
export async function createTeamCheckoutSession(plan: TeamPlanKey, origin: string): Promise<string | null> {
  const conf = TEAM_PLANS[plan];
  const metadata = { kind: TEAM_METADATA_KIND, plan, ends_at: SEASON_PASS.endsAt };
  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "jpy",
          unit_amount: conf.priceJpy,
          product_data: {
            name: `アオハルOS 塾向けシーズンプラン（${conf.label}＋指導者1人・${SEASON_PASS.endsLabel}まで）`,
            description: "招待コードを入れた生徒・指導者が、期限までアオハルOSの全機能を使い放題。買い切り・自動更新なし。",
          },
        },
      },
    ],
    customer_creation: "always",
    invoice_creation: { enabled: true },
    metadata,
    payment_intent_data: { metadata },
    success_url: `${origin}/juku/thanks?checkout=success&plan=${plan}&value=${conf.priceJpy}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/juku`,
  });
  return session.url;
}
