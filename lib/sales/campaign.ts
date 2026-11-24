import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import { isUsableEmail } from "./contact";
import { getSalesControls, isResendConfigured, recordOutreach, sendEmail, type OutreachItem } from "./outreach";

// 塾向けのご案内（学びのOS・先生用ダッシュボード・無料お試し）を、過去に営業メールを送った学習塾へ、1通ずつ送る。
// BCC の一斉送信ではなく、ふだんの営業送信と同じ道を通す（送信停止リスト・バウンス時の自動停止・開封とクリックの記録が効く）。
// 送るのは、/admin/sales で「送る」を押したときだけ（1回に sales_controls.max_per_run 件まで）。自動では送らない。
//
// 対象：見込み先リスト (sales_leads) の「学習塾」で、送信済み・メールあての宛先。
// 外す：送信停止の宛先、バウンス・苦情があった宛先、返信をくれた宛先（個別にやりとり中）、このご案内をもう送った宛先。
// 文面とPDFは 2026-11-24 に代表が確認したもの。変えるときは、id も変える（同じ id だと「もう送った」と数えるため）。

export const CAMPAIGN = {
  id: "juku-os-2026-11",
  name: "塾向けご案内（学びのOS・無料お試し）",
  flyer: "https://app.bluespring.co.jp/docs/aoharu-os-juku-flyer.pdf",
  subject: "個人塾の先生へ｜生徒の学習が一覧で見える「学びのOS」を、無料でお試しいただけます",
} as const;
const SOURCE = `campaign-${CAMPAIGN.id}`;

export const CAMPAIGN_BODY = `学習塾の先生へ

以前、志望理由書の添削についてご連絡した、株式会社ブルースプリング「アオハルOS」の川本です。

先生お一人、または少ない人数で教室を回されている塾の助けになりたいと考え、アオハルOSを作ってきました。教材づくり、添削、生徒ひとりひとりの進み具合の確認。どれも大切ですが、全部を先生だけで担うのは大変です。その部分を引き受ける道具として、お使いいただけるところまで来ましたので、ご案内します。

■ できること
・小学生から高校生まで、学校の単元ごとに学びなおし（図解の授業・問題・単元模試）
・公立高校入試・共通テスト・大学別の模試と、本物の過去問を使った自己採点
・志望理由書・小論文の添削と、面接練習
・先生用のページで、生徒さんごとの利用状況を一覧（最後に使った日、回数、解いた問題の数）

■ はじめ方
塾ごとに招待コードを1つお出しします。生徒さんが自分のスマホで無料登録し、コードを入れるだけです。名簿のご提出は要りません。

■ 無料お試し
生徒10人＋先生1人で、30日間、すべての機能をお使いいただけます。お支払いの登録は要らず、期限後に請求することもありません。

お試しをご希望の場合は、このメールに「試す」と一言ご返信ください。招待コードと先生用のページをお送りします。くわしい内容は、こちらの資料（PDF・2ページ）をご覧ください。
${CAMPAIGN.flyer}

今後このようなご案内が不要な場合は、「不要」とご返信ください。以後お送りしません。

株式会社ブルースプリング　代表取締役社長　川本 潤
岡山県岡山市北区磨屋町7-2
pr@bluespring.co.jp
https://app.bluespring.co.jp/juku`;

export interface CampaignTarget {
  email: string;
  company: string;
}

export interface CampaignStatus {
  /** 学習塾で、送信済み・メールあての宛先 */
  base: number;
  /** これから送れる宛先 */
  eligible: CampaignTarget[];
  /** このご案内を送った数 */
  sent: number;
  excluded: { suppressed: number; bounced: number; replied: number; unusable: number };
}

const chunk = <T,>(a: T[], n: number) => Array.from({ length: Math.ceil(a.length / n) }, (_, i) => a.slice(i * n, i * n + n));

export async function campaignStatus(): Promise<CampaignStatus> {
  const db = getSupabaseAdmin();
  // 1. 学習塾・送信済み・メールあり
  const leads = new Map<string, string>();
  for (let from = 0; from < 20000; from += 1000) {
    const { data, error } = await db
      .from("sales_leads")
      .select("name,contact_email")
      .eq("pattern_key", "juku")
      .eq("status", "contacted")
      .not("contact_email", "is", null)
      .order("id", { ascending: true })
      .range(from, from + 999);
    if (error) throw new Error(`sales_leads select: ${error.message}`);
    for (const r of (data ?? []) as { name: string; contact_email: string }[]) {
      const e = r.contact_email.trim().toLowerCase();
      if (e && !leads.has(e)) leads.set(e, r.name);
    }
    if ((data?.length ?? 0) < 1000) break;
  }
  const emails = [...leads.keys()];
  const excluded = { suppressed: 0, bounced: 0, replied: 0, unusable: 0 };

  // 2. これまでの送信の記録
  const sentBefore = new Set<string>();
  const bad = new Set<string>();
  const replied = new Set<string>();
  const done = new Set<string>();
  for (const part of chunk(emails, 100)) {
    const { data, error } = await db.from("sales_outreach").select("recipient,source,bounced_at,complained_at,replied_at").eq("method", "email").eq("status", "sent").in("recipient", part);
    if (error) throw new Error(`sales_outreach select: ${error.message}`);
    for (const r of (data ?? []) as { recipient: string; source: string | null; bounced_at: string | null; complained_at: string | null; replied_at: string | null }[]) {
      if (r.source === SOURCE) done.add(r.recipient);
      else sentBefore.add(r.recipient);
      if (r.bounced_at || r.complained_at) bad.add(r.recipient);
      if (r.replied_at) replied.add(r.recipient);
    }
  }

  // 3. 送信停止（アドレスそのもの、または @ドメイン）
  const patterns = new Set<string>();
  for (const e of emails) {
    patterns.add(e);
    const d = e.split("@")[1];
    if (d) patterns.add(`@${d}`);
  }
  const hit = new Set<string>();
  for (const part of chunk([...patterns], 100)) {
    const { data, error } = await db.from("sales_suppression").select("pattern").in("pattern", part);
    if (error) throw new Error(`sales_suppression select: ${error.message}`);
    for (const r of (data ?? []) as { pattern: string }[]) hit.add(r.pattern);
  }

  const eligible: CampaignTarget[] = [];
  let base = 0;
  for (const email of emails) {
    if (!sentBefore.has(email) && !done.has(email)) continue; // 実際に届いた記録がない宛先には送らない
    base++;
    if (done.has(email)) continue;
    if (!isUsableEmail(email)) excluded.unusable++;
    else if (hit.has(email) || hit.has(`@${email.split("@")[1]}`)) excluded.suppressed++;
    else if (bad.has(email)) excluded.bounced++;
    else if (replied.has(email)) excluded.replied++;
    else eligible.push({ email, company: leads.get(email) ?? "" });
  }
  return { base, eligible, sent: done.size, excluded };
}

const item = (to: string, company: string): OutreachItem => ({ method: "email", to, company, subject: CAMPAIGN.subject, body: CAMPAIGN_BODY });

export interface CampaignRun {
  sent: number;
  failed: number;
  left: number;
  note?: string;
}

/** ご案内を、まだ送っていない宛先へ、1通ずつ送る（1回に max_per_run 件まで）。 */
export async function runCampaign(): Promise<CampaignRun> {
  const controls = await getSalesControls();
  const st = await campaignStatus();
  if (controls.paused) return { sent: 0, failed: 0, left: st.eligible.length, note: `送信は止まっています：${controls.pausedReason ?? "理由の記録なし"}` };
  if (!isResendConfigured()) return { sent: 0, failed: 0, left: st.eligible.length, note: "メール送信（Resend）の設定がありません" };
  const started = Date.now();
  let sent = 0;
  let failed = 0;
  for (const t of st.eligible.slice(0, controls.maxPerRun)) {
    if (Date.now() - started > 80_000) break; // 時間切れの前にやめる。残りは次に押したとき
    const it = item(t.email, t.company);
    try {
      const r = await sendEmail(it);
      await recordOutreach({ ...it, recipient: it.to, status: "sent", external_id: r.id, source: SOURCE });
      sent++;
    } catch (e) {
      failed++;
      await recordOutreach({ ...it, recipient: it.to, status: "failed", error: e instanceof Error ? e.message : String(e), source: SOURCE }).catch(() => undefined);
    }
  }
  return { sent, failed, left: st.eligible.length - sent - failed };
}

/** 文面の確認用に、自分あてへ1通だけ送る（送信の記録には入れない） */
export async function sendCampaignTest(to: string): Promise<void> {
  if (!isResendConfigured()) throw new Error("メール送信（Resend）の設定がありません");
  await sendEmail({ ...item(to, "（確認用）"), subject: `【確認用】${CAMPAIGN.subject}` });
}
