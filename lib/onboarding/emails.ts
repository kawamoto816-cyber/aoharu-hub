import { createHmac } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import { getSetting, setSetting } from "@/lib/social/store";

// 登録した人を、人の手を介さずに「最初の結果」まで連れていくお知らせメール。
//   first : 登録から約1日たっても、どのアプリも使っていない人へ「まず1本、添削してみませんか」
//   nudge : 登録から3日たっても、まだ使っていない人へ「書きかけでも大丈夫です」(1回だけ)
//   quota : 無料プランでテンサクンの今月の2本を使い切った人へ (その月に1回だけ)
// どのメールにも配信停止のリンクを付ける。停止した人には二度と送らない。
// 送信は ONBOARDING_SEND=1 のときだけ。未設定なら「送るはずだった件数」を返すだけ (dry run)。

const FROM = process.env.ONBOARDING_FROM_EMAIL ?? process.env.SALES_FROM_EMAIL ?? "アオハルOS（株式会社ブルースプリング） <pr@bluespring.co.jp>";
const BASE = "https://app.bluespring.co.jp";

export type Step = "first" | "nudge" | "quota";

function jstMonth(d = new Date()): string {
  return new Date(d.getTime() + 9 * 3600_000).toISOString().slice(0, 7);
}

export function unsubscribeToken(userId: string): string {
  return createHmac("sha256", process.env.CRON_SECRET ?? "aoharu").update(`unsub:${userId}`).digest("hex").slice(0, 24);
}

export function unsubscribeUrl(userId: string): string {
  return `${BASE}/email/unsubscribe?u=${encodeURIComponent(userId)}&t=${unsubscribeToken(userId)}`;
}

export async function isOptedOut(userId: string): Promise<boolean> {
  return (await getSetting(`email_optout:${userId}`)) === "1";
}

export async function optOut(userId: string): Promise<void> {
  await setSetting(`email_optout:${userId}`, "1");
}

async function clerkEmail(userId: string): Promise<{ email: string; name: string } | null> {
  const key = process.env.CLERK_SECRET_KEY;
  if (!key) return null;
  const res = await fetch(`https://api.clerk.com/v1/users/${encodeURIComponent(userId)}`, { headers: { Authorization: `Bearer ${key}` } });
  if (!res.ok) return null;
  const u = (await res.json()) as {
    primary_email_address_id?: string;
    email_addresses?: { id: string; email_address: string }[];
    first_name?: string | null;
  };
  const email = u.email_addresses?.find((e) => e.id === u.primary_email_address_id)?.email_address ?? u.email_addresses?.[0]?.email_address;
  return email ? { email, name: (u.first_name ?? "").trim() } : null;
}

function footer(userId: string): string {
  return [
    "",
    "――",
    "このメールは、アオハルOSにご登録いただいた方へ、使い方のお知らせとしてお送りしています。",
    `今後このようなお知らせが不要な場合は、こちらから停止できます: ${unsubscribeUrl(userId)}`,
    "株式会社ブルースプリング アオハルOS担当　pr@bluespring.co.jp　https://app.bluespring.co.jp",
  ].join("\n");
}

export function buildEmail(step: Step, userId: string, name: string): { subject: string; text: string } {
  const hi = name ? `${name}さん` : "こんにちは";
  if (step === "first") {
    return {
      subject: "まず1本、志望理由書を添削してみませんか",
      text: [
        `${hi}、アオハルOSにご登録いただきありがとうございます。`,
        "",
        "最初の1本は、書きかけの文章で大丈夫です。テンサクンに貼って「採点する」を押すと、100点満点の点数と、どこを・どう直すかが返ってきます。",
        "",
        "▼ テンサクンを開く（無料プランで月2本まで）",
        "https://essay.bluespring.co.jp",
        "",
        "▼ 使う前と後の見本（どんな結果が返ってくるか）",
        `${BASE}/tutorial/tensakun`,
        "",
        "名前や学校名は書かずに貼ってください。",
        footer(userId),
      ].join("\n"),
    };
  }
  if (step === "nudge") {
    return {
      subject: "書きかけの3行でも、直す場所がわかります",
      text: [
        `${hi}、アオハルOSです。`,
        "",
        "志望理由書がまだ白紙・書きかけでも大丈夫です。最初の3〜5行だけでも、テンサクンは「伝わりにくい所」と「直す方向」を返します。",
        "",
        "▼ テンサクンで添削する",
        "https://essay.bluespring.co.jp",
        "",
        "何を書けばいいか決まっていない場合は、しぼりゆの質問に答えると、何をどの順で書くかの構成案ができます（パソコンでの利用がおすすめです）。",
        "https://reason.bluespring.co.jp",
        footer(userId),
      ].join("\n"),
    };
  }
  return {
    subject: "今月の無料添削（2本）を使い切りました",
    text: [
      `${hi}、アオハルOSです。テンサクンを2本使っていただきありがとうございます。`,
      "",
      "無料プランの添削は来月1日にまた2本使えるようになります。",
      "出願や面接が近く、今月もっと直したい場合は、Pro（月980円・いつでも解約可）で回数の制限なく添削できます。100点の模範解答もProで見られます。",
      "",
      "▼ 料金とプラン",
      `${BASE}/#pricing`,
      footer(userId),
    ].join("\n"),
  };
}

async function sendViaResend(to: string, subject: string, text: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not set");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [to], subject, text, reply_to: "pr@bluespring.co.jp" }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text().catch(() => "")).slice(0, 200)}`);
}

export interface RunResult {
  dryRun: boolean;
  checked: number;
  sent: { step: Step; userId: string }[];
  skipped: number;
  errors: string[];
}

/** 直近30日の登録ユーザーを見て、送るべきお知らせを送る (冪等: 同じ人に同じ段階は1回だけ) */
export async function runOnboarding(now = new Date()): Promise<RunResult> {
  const dryRun = process.env.ONBOARDING_SEND !== "1";
  const supabase = getSupabaseAdmin();
  const since = new Date(now.getTime() - 30 * 86400_000).toISOString();
  const { data: subs, error } = await supabase
    .from("subscriptions")
    .select("user_id,plan,created_at")
    .gte("created_at", since)
    .limit(1000);
  if (error) throw new Error(`subscriptions select: ${error.message}`);

  const result: RunResult = { dryRun, checked: 0, sent: [], skipped: 0, errors: [] };
  const month = jstMonth(now);
  const firstOfMonth = new Date(`${month}-01T00:00:00+09:00`).toISOString();

  for (const s of (subs ?? []) as { user_id: string; plan: string; created_at: string }[]) {
    result.checked += 1;
    try {
      if (await isOptedOut(s.user_id)) {
        result.skipped += 1;
        continue;
      }
      const ageH = (now.getTime() - new Date(s.created_at).getTime()) / 3600_000;
      const { count: totalUse } = await supabase
        .from("usage_log")
        .select("*", { count: "exact", head: true })
        .eq("user_id", s.user_id);
      const { count: scoredThisMonth } = await supabase
        .from("usage_log")
        .select("*", { count: "exact", head: true })
        .eq("user_id", s.user_id)
        .eq("app_key", "tensakun")
        .eq("action", "score")
        .gte("created_at", firstOfMonth);

      let step: Step | null = null;
      let key = "";
      if (s.plan === "free" && (scoredThisMonth ?? 0) >= 2) {
        step = "quota";
        key = `onboarding:${s.user_id}:quota:${month}`;
      } else if ((totalUse ?? 0) === 0 && ageH >= 72 && ageH < 24 * 10) {
        step = "nudge";
        key = `onboarding:${s.user_id}:nudge`;
      } else if ((totalUse ?? 0) === 0 && ageH >= 20 && ageH < 72) {
        step = "first";
        key = `onboarding:${s.user_id}:first`;
      }
      if (!step || (await getSetting(key))) {
        result.skipped += 1;
        continue;
      }
      if (!dryRun) {
        const who = await clerkEmail(s.user_id);
        if (!who) {
          result.errors.push(`${s.user_id}: メールアドレスが取れない`);
          continue;
        }
        const mail = buildEmail(step, s.user_id, who.name);
        await sendViaResend(who.email, mail.subject, mail.text);
        await setSetting(key, now.toISOString());
      }
      result.sent.push({ step, userId: s.user_id });
    } catch (e) {
      result.errors.push(`${s.user_id}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
  return result;
}
