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
  /** trial ＝ 管理画面から出した無料お試し用（支払いなし） */
  plan: TeamPlanKey | "trial";
  /** 使える人数（生徒＋指導者） */
  seats: number;
  users: string[];
  endsAt: string;
  sessionId: string;
  email: string | null;
  createdAt: string;
  /** 無料お試しの発行先（塾・学校の名前）。管理画面の一覧に出す */
  org?: string;
  /** 発行した社内アカウント */
  issuedBy?: string;
  /** 先生用ダッシュボード (/juku/dashboard?k=…) の鍵。知っている人だけが、この塾の生徒の学習状況を見られる */
  mgr?: string;
  /** コードを入れたときに本人が決めた、先生に見せる名前（userId → 名前） */
  names?: Record<string, string>;
};

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // 0/O・1/I を除く

function newCode(): string {
  const part = () => Array.from({ length: 4 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
  return `JUKU-${part()}-${part()}`;
}

function newManagerKey(): string {
  return Array.from({ length: 28 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
}

/** 先生用ダッシュボードの鍵を用意する（前に出したコードには無いので、はじめて見るときに作る） */
export async function ensureManagerKey(pass: TeamPass): Promise<string> {
  if (pass.mgr) return pass.mgr;
  pass.mgr = newManagerKey();
  await saveTeamPass(pass);
  await setSetting(`team_pass_mgr:${pass.mgr}`, pass.code);
  return pass.mgr;
}

export async function getTeamPassByManagerKey(key: string): Promise<TeamPass | null> {
  if (!/^[A-Z0-9]{20,40}$/.test(key)) return null;
  const code = await getSetting(`team_pass_mgr:${key}`);
  if (!code) return null;
  const pass = await getTeamPass(code);
  return pass && pass.mgr === key ? pass : null;
}

export const dashboardUrl = (key: string) => `https://app.bluespring.co.jp/juku/dashboard?k=${encodeURIComponent(key)}`;

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
  await ensureManagerKey(pass);
  await sendCodeMail(pass).catch((e) => console.error("[team-pass] mail", e instanceof Error ? e.message : e));
  return pass;
}

// ---- 無料お試し用の招待コード（法人営業のメールで「試す」と返信をくれた塾・学校へ） ----
// 支払いを通さずに、管理画面 (/admin/team-pass) から1つずつ出す。使い方は有料のコードと同じ (/juku/code)。
// 出したコードの一覧は app_settings の team_pass_trials（コードの配列）に持つ。

/** お試しで出せる生徒の人数の上限（コードが広まっても、費用がふくらまないように） */
export const TRIAL_MAX_STUDENTS = 40;
const TRIALS_KEY = "team_pass_trials";

export async function createTrialTeamPass(input: {
  org: string;
  students: number;
  /** 期限の日付 (YYYY-MM-DD)。その日の終わり（日本時間）まで使える */
  endsOn: string;
  issuedBy: string | null;
}): Promise<TeamPass> {
  const org = input.org.trim().slice(0, 80);
  if (!org) throw new Error("発行先の名前を入れてください");
  const students = Math.floor(input.students);
  if (!(students >= 1 && students <= TRIAL_MAX_STUDENTS)) throw new Error(`人数は1〜${TRIAL_MAX_STUDENTS}人で入れてください`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.endsOn)) throw new Error("期限の日付を入れてください");
  const endsAt = new Date(`${input.endsOn}T23:59:59+09:00`);
  if (Number.isNaN(endsAt.getTime()) || endsAt.getTime() < Date.now()) throw new Error("期限は今日より後の日付にしてください");
  if (endsAt.getTime() > Date.parse(SEASON_PASS.endsAt)) throw new Error(`期限は ${SEASON_PASS.endsLabel} までにしてください`);
  let code = newCode();
  while (await getTeamPass(code)) code = newCode();
  const now = new Date().toISOString();
  const pass: TeamPass = {
    code,
    plan: "trial",
    seats: students + TEACHER_SEATS,
    users: [],
    endsAt: endsAt.toISOString(),
    sessionId: `trial:${now}`,
    email: null,
    createdAt: now,
    org,
    ...(input.issuedBy ? { issuedBy: input.issuedBy } : {}),
  };
  await saveTeamPass(pass);
  await ensureManagerKey(pass);
  const list = await listTrialCodes();
  await setSetting(TRIALS_KEY, JSON.stringify([code, ...list]));
  return pass;
}

async function listTrialCodes(): Promise<string[]> {
  const v = await getSetting(TRIALS_KEY);
  if (!v) return [];
  try {
    const a = JSON.parse(v);
    return Array.isArray(a) ? a.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/** 管理画面の一覧用：これまでに出したお試しコード（新しい順） */
export async function listTrialTeamPasses(): Promise<TeamPass[]> {
  const codes = await listTrialCodes();
  const all = await Promise.all(codes.slice(0, 100).map((c) => getTeamPass(c)));
  return all.filter((p): p is TeamPass => !!p);
}

export type RedeemResult =
  | { ok: true; endsAt: string; left: number }
  | { ok: false; reason: "not_found" | "full" | "expired" | "already_paid" };

/** 生徒（または指導者）がコードを入れたとき。同じ人が2回入れても1人分しか数えない */
export async function redeemTeamPass(rawCode: string, userId: string, name = ""): Promise<RedeemResult> {
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
  // 先生に見せる名前（本人が決めたもの）。あとから入れ直したら上書きする
  const shown = name.replace(/[\u0000-\u001f]/g, "").trim().slice(0, 20);
  if (shown && pass.names?.[userId] !== shown) {
    pass.names = { ...(pass.names ?? {}), [userId]: shown };
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
    ...(p.mgr
      ? [
          "▼ 先生用のページ（コードを入れた生徒さんの学習状況が見られます。このURLは先生だけでお持ちください）",
          dashboardUrl(p.mgr),
          "",
        ]
      : []),
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
