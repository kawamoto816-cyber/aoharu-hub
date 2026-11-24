import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import { getSetting, setSetting } from "@/lib/social/store";
import { isUsableEmail, isUsableFormUrl } from "./contact";
import { getSalesControls, isResendConfigured, markLeadContacted, recordOutreach, sendEmail, type OutreachItem } from "./outreach";

// 塾向けのご案内（学びのOS・先生用ダッシュボード・無料お試し）を、過去に営業メールを送った学習塾へ、1通ずつ送る。
// BCC の一斉送信ではなく、ふだんの営業送信と同じ道を通す（送信停止リスト・バウンス時の自動停止・開封とクリックの記録が効く）。
// 送るのは、/admin/sales で「送る」を押したときだけ（1回に sales_controls.max_per_run 件まで）。自動では送らない。
//
// 対象：見込み先リスト (sales_leads) の「学習塾」で、メールアドレスのある宛先。送信済みの塾に加えて、まだ送っていない塾（承認待ち・未着手）にも、書き出しを「はじめてご連絡します」に変えて送る（2026-11-24 じゅんさんの指示で広げた）。
// 外す：送信停止の宛先、バウンス・苦情があった宛先、返信をくれた宛先（個別にやりとり中）、このご案内をもう送った宛先。
// 文面とPDFは 2026-11-24 に代表が確認したもの（同日、スライドのリンクを足して id を 11b にした。11 では1通も送っていない）。変えるときは、id も変える（同じ id だと「もう送った」と数えるため）。

export const CAMPAIGN = {
  id: "juku-os-2026-11b",
  name: "塾向けご案内（学びのOS・無料お試し）",
  flyer: "https://app.bluespring.co.jp/docs/aoharu-os-juku-flyer.pdf",
  slides: "https://app.bluespring.co.jp/docs/aoharu-os-juku-slides.pdf",
  subject: "先生お一人でも、生徒ひとりひとりに目が届く｜5教科848単元を30日無料でお試し",
} as const;
const SOURCE = `campaign-${CAMPAIGN.id}`;
// 管理画面で「この宛先には送らない」にした宛先（個別にやりとり中の塾など。返信の記録が無くても外せるように）
const SKIP_KEY = `sales_campaign_skip:${CAMPAIGN.id}`;

export async function getCampaignSkips(): Promise<string[]> {
  try {
    const v = JSON.parse((await getSetting(SKIP_KEY)) ?? "[]");
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export async function setCampaignSkip(email: string, skip: boolean): Promise<void> {
  const e = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) throw new Error("メールアドレスの形ではありません");
  const cur = new Set(await getCampaignSkips());
  if (skip) cur.add(e);
  else cur.delete(e);
  await setSetting(SKIP_KEY, JSON.stringify([...cur]));
}

const OPEN_BEFORE = "以前、志望理由書の添削についてご連絡した、株式会社ブルースプリング「アオハルOS」の川本です。";
// まだ一度もご連絡していない学習塾（見込み先リストで、承認待ち・未着手のもの）には、書き出しだけを変える
export const OPEN_FIRST = "はじめてご連絡します。学習サービス「アオハルOS」を運営している、株式会社ブルースプリングの川本です。貴塾のホームページに掲載されている連絡先へ、ご案内をお送りしています。";

export const CAMPAIGN_BODY = `学習塾の先生へ

${OPEN_BEFORE}

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

お試しをご希望の場合は、このメールに「試す」と一言ご返信ください。招待コードと先生用のページをお送りします。くわしい内容は、こちらの資料をご覧ください。

・画面つきのご案内スライド（PDF・8ページ）
${CAMPAIGN.slides}
・ご案内（PDF・2ページ）
${CAMPAIGN.flyer}

今後このようなご案内が不要な場合は、「不要」とご返信ください。以後お送りしません。

株式会社ブルースプリング　代表取締役社長　川本 潤
岡山県岡山市北区磨屋町7-2
pr@bluespring.co.jp
https://app.bluespring.co.jp/juku`;

export const campaignBody = (first: boolean) => (first ? CAMPAIGN_BODY.replace(OPEN_BEFORE, OPEN_FIRST) : CAMPAIGN_BODY);

export interface CampaignTarget {
  email: string;
  company: string;
  /** まだ一度もご連絡していない宛先（書き出しが「はじめてご連絡します」になる） */
  first?: boolean;
}

export interface CampaignStatus {
  /** 学習塾で、送信済み・メールあての宛先 */
  base: number;
  /** これから送れる宛先（以前に送った塾が先、はじめての塾があと） */
  eligible: CampaignTarget[];
  /** eligible のうち、はじめてご連絡する宛先の数 */
  firstCount: number;
  /** このご案内を送った数 */
  sent: number;
  excluded: { suppressed: number; bounced: number; replied: number; unusable: number; skipped: number };
  /** 「送らない」にした宛先 */
  skips: CampaignTarget[];
}

const chunk = <T,>(a: T[], n: number) => Array.from({ length: Math.ceil(a.length / n) }, (_, i) => a.slice(i * n, i * n + n));

export async function campaignStatus(): Promise<CampaignStatus> {
  const db = getSupabaseAdmin();
  // 1. 学習塾・メールあり（送信済み。それに、まだ送っていない承認待ち・未着手）
  const leads = new Map<string, string>();
  const fresh = new Set<string>();
  const contactedLead = new Set<string>();
  for (let from = 0; from < 20000; from += 1000) {
    const { data, error } = await db
      .from("sales_leads")
      .select("name,contact_email,status")
      .eq("pattern_key", "juku")
      .in("status", ["contacted", "queued", "new"])
      .not("contact_email", "is", null)
      .order("id", { ascending: true })
      .range(from, from + 999);
    if (error) throw new Error(`sales_leads select: ${error.message}`);
    for (const r of (data ?? []) as { name: string; contact_email: string; status: string }[]) {
      const e = r.contact_email.trim().toLowerCase();
      if (!e) continue;
      if (!leads.has(e)) leads.set(e, r.name);
      if (r.status === "contacted") contactedLead.add(e);
      else fresh.add(e);
    }
    if ((data?.length ?? 0) < 1000) break;
  }
  const emails = [...leads.keys()];
  const excluded = { suppressed: 0, bounced: 0, replied: 0, unusable: 0, skipped: 0 };
  const skipSet = new Set(await getCampaignSkips());
  const skips: CampaignTarget[] = [];

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
    // はじめての宛先：見込み先リストで「まだ送っていない」になっていて、メールを送った記録もない
    const first = !sentBefore.has(email) && !done.has(email) && fresh.has(email) && !contactedLead.has(email);
    if (!first && !sentBefore.has(email) && !done.has(email)) continue; // 「送信済み」なのにメールの記録がない宛先（フォームで送ったものなど）には送らない
    base++;
    if (done.has(email)) continue;
    if (skipSet.has(email)) {
      excluded.skipped++;
      skips.push({ email, company: leads.get(email) ?? "" });
    } else if (!isUsableEmail(email)) excluded.unusable++;
    else if (hit.has(email) || hit.has(`@${email.split("@")[1]}`)) excluded.suppressed++;
    else if (bad.has(email)) excluded.bounced++;
    else if (replied.has(email)) excluded.replied++;
    else eligible.push({ email, company: leads.get(email) ?? "", ...(first ? { first: true } : {}) });
  }
  eligible.sort((a, b) => Number(!!a.first) - Number(!!b.first));
  return { base, eligible, firstCount: eligible.filter((t) => t.first).length, sent: done.size, excluded, skips };
}

const item = (to: string, company: string, first = false): OutreachItem => ({ method: "email", to, company, subject: CAMPAIGN.subject, body: campaignBody(first) });

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
    const it = item(t.email, t.company, !!t.first);
    try {
      const r = await sendEmail(it);
      await recordOutreach({ ...it, recipient: it.to, status: "sent", external_id: r.id, source: SOURCE });
      // はじめての宛先は、見込み先リストでも「送信済み」にする（ふだんの営業送信が、同じ塾へ別の文面を送らないように）
      if (t.first) await markLeadContacted(it.to).catch(() => undefined);
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

// ---------------------------------------------------------------------------
// フォーム宛て（メールアドレスが無く、お問い合わせフォームだけの学習塾）
// ---------------------------------------------------------------------------
// ふだんの営業と同じ道を通す：sales_outreach に「フォーム・送信待ち (manual)」で並べると、平日12:30 の
// sales-forms ワークフロー（GitHub 上のブラウザ）が、古い順に1日 30 件まで入力・送信する（lib/sales/forms.ts）。
// 営業お断り・画像認証・答えられない必須項目のあるフォームは、そこで見送りになる。
// 対象：学習塾で、まだ一度も送っていない見込み先（承認待ち・未着手）のうち、フォームしか連絡先が無いもの。
// 以前にフォームで送った塾には並べない（同じフォームへは 90 日あけるきまり。見送り・失敗にしたフォームにも送り直さない）。
// 並べるのは、/admin/sales/campaign でボタンを押したときだけ。

const FORM_SOURCE = `campaign-form-${CAMPAIGN.id}`;
export const FORM_BATCH = 30;

export const CAMPAIGN_FORM_BODY = `学習塾の先生へ

はじめてご連絡します。学習サービス「アオハルOS」を運営している、株式会社ブルースプリングの川本と申します。

先生お一人、または少ない人数で教室を回されている塾の助けになりたいと考え、アオハルOSを作ってきました。

・小学生から高校生まで、5教科848単元の授業・問題・単元模試
・公立高校入試・共通テスト・大学別の模試と、過去問の採点
・志望理由書・小論文の添削と、面接練習
・先生用のページで、生徒さんごとの学習を一覧（単元ごとの解いた数・正解の割合・模試の得点）

生徒10人＋先生1人で、30日間、すべての機能を無料でお試しいただけます。お支払いの登録は要らず、期限後に請求することもありません。ご希望の場合は、pr@bluespring.co.jp まで「試す」とご連絡ください。招待コードと先生用のページをお送りします。

くわしい内容は、こちらをご覧ください。
https://app.bluespring.co.jp/juku
画面つきのご案内スライド（PDF・8ページ）
${CAMPAIGN.slides}

今後このようなご連絡が不要な場合は、その旨を pr@bluespring.co.jp までお知らせください。以後お送りしません。

株式会社ブルースプリング　代表取締役社長　川本 潤
岡山県岡山市北区磨屋町7-2
pr@bluespring.co.jp`;

export interface CampaignFormTarget {
  url: string;
  company: string;
}

export interface CampaignFormStatus {
  /** これから並べられるフォーム */
  eligible: CampaignFormTarget[];
  /** このご案内で並べたもののいま：送信待ち・送信済み・見送り・失敗 */
  waiting: number;
  sent: number;
  skipped: number;
  failed: number;
  /** フォーム送信の列ぜんたいの送信待ち（ふだんの営業の分もふくむ） */
  queueAll: number;
}

const hostOf = (u: string) => {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

export async function campaignFormStatus(): Promise<CampaignFormStatus> {
  const db = getSupabaseAdmin();
  // 1. 学習塾・まだ送っていない・メールなし・フォームあり
  const leads = new Map<string, string>();
  for (let from = 0; from < 20000; from += 1000) {
    const { data, error } = await db
      .from("sales_leads")
      .select("name,contact_form_url")
      .eq("pattern_key", "juku")
      .in("status", ["queued", "new"])
      .is("contact_email", null)
      .not("contact_form_url", "is", null)
      .order("id", { ascending: true })
      .range(from, from + 999);
    if (error) throw new Error(`sales_leads select: ${error.message}`);
    for (const r of (data ?? []) as { name: string; contact_form_url: string }[]) {
      const u = r.contact_form_url.trim().toLowerCase();
      if (!isUsableFormUrl(u) || /^https?:\/\/(lin\.ee|line\.me|page\.line\.me)\//.test(u)) continue;
      if (!leads.has(u)) leads.set(u, r.name);
    }
    if ((data?.length ?? 0) < 1000) break;
  }
  const urls = [...leads.keys()];

  // 2. もう記録のあるフォーム（送信待ち・送信済み・見送り・失敗のどれでも）には並べない
  const touched = new Set<string>();
  for (const part of chunk(urls, 50)) {
    const { data, error } = await db.from("sales_outreach").select("recipient").eq("method", "form").in("recipient", part);
    if (error) throw new Error(`sales_outreach select: ${error.message}`);
    for (const r of (data ?? []) as { recipient: string }[]) touched.add(r.recipient);
  }

  // 3. 送信停止（フォームのURLそのもの、または同じドメインのメールで受信拒否があった先）
  const patterns = [...new Set(urls.flatMap((u) => [u, `@${hostOf(u)}`]))];
  const hit = new Set<string>();
  for (const part of chunk(patterns, 50)) {
    const { data, error } = await db.from("sales_suppression").select("pattern").in("pattern", part);
    if (error) throw new Error(`sales_suppression select: ${error.message}`);
    for (const r of (data ?? []) as { pattern: string }[]) hit.add(r.pattern);
  }

  const eligible = urls.filter((u) => !touched.has(u) && !hit.has(u) && !hit.has(`@${hostOf(u)}`)).map((u) => ({ url: u, company: leads.get(u) ?? "" }));

  // 4. このご案内で並べたもののいま
  const count = async (status: string[], source?: string) => {
    let q = db.from("sales_outreach").select("id", { count: "exact", head: true }).eq("method", "form").in("status", status);
    if (source) q = q.eq("source", source);
    const { count: n, error } = await q;
    if (error) throw new Error(`sales_outreach count: ${error.message}`);
    return n ?? 0;
  };
  const [waiting, sent, skipped, failed, queueAll] = await Promise.all([
    count(["manual"], FORM_SOURCE),
    count(["manual_sent"], FORM_SOURCE),
    count(["skipped"], FORM_SOURCE),
    count(["failed"], FORM_SOURCE),
    count(["manual"]),
  ]);
  return { eligible, waiting, sent, skipped, failed, queueAll };
}

/** フォーム宛てのご案内を、送信待ちの列に並べる（1回に FORM_BATCH 件まで）。送るのは、平日12:30 の自動送信 */
export async function enqueueCampaignForms(n = FORM_BATCH): Promise<{ queued: number; left: number; note?: string }> {
  const controls = await getSalesControls();
  const st = await campaignFormStatus();
  if (controls.paused) return { queued: 0, left: st.eligible.length, note: `送信は止まっています：${controls.pausedReason ?? "理由の記録なし"}` };
  let queued = 0;
  for (const t of st.eligible.slice(0, Math.max(1, Math.min(n, 150)))) {
    await recordOutreach({ method: "form", recipient: t.url, company: t.company, subject: CAMPAIGN.subject, body: CAMPAIGN_FORM_BODY, status: "manual", source: FORM_SOURCE });
    queued++;
  }
  return { queued, left: st.eligible.length - queued };
}
