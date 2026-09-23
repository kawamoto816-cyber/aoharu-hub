import { createHash } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import { getGoogleAccessToken, getServiceAccount } from "@/lib/metrics/google-auth";
import { jstNow } from "@/lib/social/queue";
import { buildProposal, type PatternKey } from "./patterns";
import { isUsableEmail } from "./contact";

// 法人営業のアウトリーチ送信 (じゅんさんの「送信OK」後にサーバーが送る)。
//   - 営業エージェントが Google Drive「アオハルOS 法人営業」フォルダに「送信承認 YYYY-MM-DD」ドキュメントを作る
//   - サーバーがそれを読み、[email] の項目を Resend で送信、[form] の項目は「manual (フォーム入力待ち)」として記録する
//     (manual のフォーム宛ては GitHub Actions の sales-forms ワークフローが自動入力・送信する。lib/sales/forms.ts)
//   - 送信ログは Supabase sales_outreach。同じ宛先には 90 日間は再送しない。sales_suppression にある宛先には送らない
//   必要な環境変数: RESEND_API_KEY, (任意) SALES_FROM_EMAIL, SALES_REPLY_TO, SALES_FOLDER_ID

export const SALES_FOLDER_ID = process.env.SALES_FOLDER_ID ?? "1AP0qpLTO3wyh1gSiySPApz-CzLMEO_yb";
const FROM = process.env.SALES_FROM_EMAIL ?? "アオハルOS（株式会社ブルースプリング） <pr@bluespring.co.jp>";
const REPLY_TO = process.env.SALES_REPLY_TO ?? "pr@bluespring.co.jp";
const DEFAULT_MAX_PER_RUN = 20;
const RESEND_COOLDOWN_DAYS = 90;
// バウンス・苦情が増えたときの自動停止のしきい値 (直近の送信N件のうち)
const BOUNCE_WINDOW = 100;
const BOUNCE_RATE_LIMIT = 0.05; // 5%
const COMPLAINT_COUNT_LIMIT = 2; // 直近BOUNCE_WINDOW件中2件以上の苦情で停止

export type OutreachMethod = "email" | "form";

export interface OutreachItem {
  method: OutreachMethod;
  /** メールアドレス (email) またはフォームURL (form) */
  to: string;
  company: string;
  subject: string;
  body: string;
}

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

// ------------------------------------------------------------------
// Drive
// ------------------------------------------------------------------
async function driveFetch(url: string): Promise<Response> {
  const token = await getGoogleAccessToken();
  if (!token) throw new Error("GA4_SERVICE_ACCOUNT_JSON が未設定です (Drive を読めません)");
  return fetch(url, { headers: { Authorization: `Bearer ${token}` } });
}

export async function findApprovalDocs(date: string): Promise<{ id: string; name: string }[]> {
  return findDocsByPrefix(`送信承認 ${date}`);
}

/** 既定で何日前までの「送信承認」ドキュメントを送信対象にするか */
export const APPROVAL_LOOKBACK_DAYS = 5;

/**
 * 直近 days 日以内に作られた「送信承認」ドキュメントを古い順に返す。
 * 以前は「今日の日付の名前」のドキュメントしか読んでいなかったため、
 * 09:30 の送信ジョブより後に作られた承認 (例: 11時に作った「送信承認 2026-09-21（2）」) や
 * 週末に作られた承認が、翌日以降どの実行からも読まれず取り残されていた。
 * 同じ宛先への二重送信は recentlyContacted() (90日) で防いでいるので、複数日を読んでも安全。
 */
export async function findRecentApprovalDocs(days = APPROVAL_LOOKBACK_DAYS): Promise<{ id: string; name: string }[]> {
  const since = new Date(Date.now() - days * 86400 * 1000).toISOString();
  const q = `'${SALES_FOLDER_ID}' in parents and name contains '送信承認' and createdTime > '${since}' and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name)&orderBy=createdTime&pageSize=100&supportsAllDrives=true&includeItemsFromAllDrives=true`;
  const res = await driveFetch(url);
  if (!res.ok) {
    const sa = getServiceAccount()?.client_email ?? "(不明)";
    throw new Error(`Drive files.list ${res.status}: ${(await res.text()).slice(0, 200)} — 法人営業フォルダをサービスアカウント ${sa} に共有してください`);
  }
  const json = (await res.json()) as { files?: { id: string; name: string }[] };
  // 「（テスト）」と付いた承認は動作確認用なので送らない
  return (json.files ?? []).filter((f) => !/テスト/.test(f.name));
}

/** SALES_FOLDER_ID 内で、名前が prefix を含むドキュメントを新しい順に探す (共通処理) */
export async function findDocsByPrefix(prefix: string): Promise<{ id: string; name: string }[]> {
  const q = `'${SALES_FOLDER_ID}' in parents and name contains '${prefix.replace(/'/g, "\\'")}' and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name)&orderBy=modifiedTime%20desc&supportsAllDrives=true&includeItemsFromAllDrives=true`;
  const res = await driveFetch(url);
  if (!res.ok) {
    const sa = getServiceAccount()?.client_email ?? "(不明)";
    throw new Error(`Drive files.list ${res.status}: ${(await res.text()).slice(0, 200)} — 法人営業フォルダをサービスアカウント ${sa} に閲覧共有してください`);
  }
  const json = (await res.json()) as { files?: { id: string; name: string }[] };
  return json.files ?? [];
}

export async function exportDocText(fileId: string): Promise<string> {
  const res = await driveFetch(`https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/plain`);
  if (!res.ok) throw new Error(`Drive export ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return (await res.text()).replace(/^﻿/, "");
}

/** プレーンテキストをGoogleドキュメントとして新規作成する (テンプレート提案の書き出し用) */
export async function createDriveDoc(name: string, parentId: string, text: string): Promise<string> {
  const token = await getGoogleAccessToken();
  if (!token) throw new Error("GA4_SERVICE_ACCOUNT_JSON が未設定です (Drive に書けません)");
  const boundary = `aoharu_${Math.random().toString(36).slice(2)}`;
  const metadata = JSON.stringify({ name, parents: [parentId], mimeType: "application/vnd.google-apps.document" });
  const body =
    `--${boundary}\r\n` +
    `Content-Type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n` +
    `--${boundary}\r\n` +
    `Content-Type: text/plain; charset=UTF-8\r\n\r\n${text}\r\n` +
    `--${boundary}--`;
  const res = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": `multipart/related; boundary=${boundary}` },
    body,
  });
  if (!res.ok) throw new Error(`Drive files.create ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const json = (await res.json()) as { id: string };
  return json.id;
}

/**
 * 固定名のドキュメントの中身を上書きする (存在しなければ例外)。
 * サービスアカウントは Drive の保存容量を持たず新規ファイルを作れないため
 * (lib/metrics/publish.ts と同じ制約)、テンプレート提案はこの方式に統一する:
 * じゅんさんが一度だけ固定名のドキュメントを作り、以後は毎回その中身を上書きする。
 */
export async function upsertDriveDoc(name: string, parentId: string, text: string): Promise<{ id: string; created: boolean }> {
  const token = await getGoogleAccessToken();
  if (!token) throw new Error("GA4_SERVICE_ACCOUNT_JSON が未設定です (Drive に書けません)");
  const [existing] = await findDocsByPrefix(name);
  const boundary = `aoharu_${Math.random().toString(36).slice(2)}`;
  const body =
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify({ mimeType: "application/vnd.google-apps.document" })}\r\n` +
    `--${boundary}\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n${text}\r\n--${boundary}--`;
  if (existing) {
    const res = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${existing.id}?uploadType=multipart&supportsAllDrives=true`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": `multipart/related; boundary=${boundary}` },
      body,
    });
    if (!res.ok) throw new Error(`Drive update ${res.status}: ${(await res.text()).slice(0, 200)}`);
    return { id: existing.id, created: false };
  }
  const sa = getServiceAccount()?.client_email ?? "(不明)";
  throw new Error(
    `Drive にドキュメント「${name}」がありません。法人営業フォルダに Google ドキュメント「${name}」を作成し、サービスアカウント ${sa} を「編集者」で共有してください (サービスアカウントは新規作成できません)`,
  );
}

/**
 * ドキュメント本文をパースする。ブロックは "----" で区切る。形式:
 *   [email] 宛先: info@example.jp
 *   法人名: ○○教室
 *   件名: ○○
 *   本文:
 *   （複数行）
 *   ----
 *   [form] URL: https://example.jp/contact
 *   法人名: ...
 *   件名: ...
 *   本文:
 *   ...
 */
export function parseApprovalDoc(text: string): OutreachItem[] {
  const items: OutreachItem[] = [];
  const blocks = text.replace(/\r\n/g, "\n").split(/^\s*-{3,}\s*$/m);
  for (const raw of blocks) {
    const block = raw.trim();
    if (!block) continue;
    // 見出し行 (ドキュメントのタイトル等) が前に付いていてもよいように、行頭の [email]/[form] を探す
    const head = block.match(/^\[(email|form)\]\s*(?:宛先|URL|url)\s*[:：]\s*(\S+)\s*\n?/im);
    if (!head || head.index === undefined) continue;
    const method = head[1].toLowerCase() as OutreachMethod;
    const to = head[2].trim();
    const rest = block.slice(head.index + head[0].length);
    const company = rest.match(/^法人名\s*[:：]\s*(.+)$/m)?.[1]?.trim() ?? "";
    const subject = rest.match(/^件名\s*[:：]\s*(.+)$/m)?.[1]?.trim() ?? "";
    const bodyIdx = rest.search(/^本文\s*[:：]\s*/m);
    const body = bodyIdx >= 0 ? rest.slice(bodyIdx).replace(/^本文\s*[:：]\s*/, "").trim() : "";
    if (!to || !subject || !body) continue;
    if (method === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) continue;
    if (method === "form" && !/^https?:\/\//.test(to)) continue;
    items.push({ method, to, company, subject, body });
  }
  return items;
}

export async function loadApprovals(date?: string, days?: number): Promise<{ docs: string[]; items: OutreachItem[] }> {
  const docs = date ? await findApprovalDocs(date) : await findRecentApprovalDocs(days);
  const seen = new Set<string>();
  const items: OutreachItem[] = [];
  // 書き出しは並列で (ドキュメントが10件を超えると、順番に読むだけで数十秒かかるため)。順序は作成順を保つ
  const texts = await Promise.all(docs.map((d) => exportDocText(d.id)));
  for (const text of texts) {
    for (const it of parseApprovalDoc(text)) {
      const key = `${it.method}:${it.to.toLowerCase()}`;
      if (seen.has(key)) continue;
      seen.add(key);
      items.push(it);
    }
  }
  return { docs: docs.map((d) => d.name), items };
}

/**
 * ダッシュボードで一括承認された見込み先 (sales_leads.approved_at あり・未送信・メール宛て) を
 * 送信アイテムに組み立てる。承認の古い順。approved_at 列がまだ無い環境では空で返す。
 */
export async function loadApprovedLeadItems(limit = 300): Promise<OutreachItem[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("sales_leads")
    .select("name,pattern_key,activity_label,pref,contact_email")
    .eq("status", "queued")
    .not("approved_at", "is", null)
    .not("contact_email", "is", null)
    .order("approved_at", { ascending: true })
    .order("id", { ascending: true })
    .limit(limit);
  if (error) return [];
  const rows = (data ?? []) as { name: string; pattern_key: PatternKey; activity_label: string | null; pref: string | null; contact_email: string }[];
  return rows
    .filter((r) => isUsableEmail(r.contact_email))
    .map((r) => {
      const p = buildProposal({ name: r.name, pref: r.pref, activityLabel: r.activity_label, patternKey: r.pattern_key });
      return { method: "email" as const, to: r.contact_email.trim(), company: r.name, subject: p.subject, body: p.body };
    });
}

// ------------------------------------------------------------------
// Supabase (sales_outreach / sales_suppression)
// ------------------------------------------------------------------
export function bodyHash(s: string): string {
  return createHash("sha256").update(s.trim()).digest("hex");
}

export async function isSuppressed(to: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const addr = to.toLowerCase();
  const domain = addr.split("@")[1];
  const patterns = domain ? [addr, `@${domain}`] : [addr];
  const { data, error } = await supabase.from("sales_suppression").select("pattern").in("pattern", patterns).limit(1);
  if (error) throw new Error(`sales_suppression select: ${error.message}`);
  return (data?.length ?? 0) > 0;
}

export async function recentlyContacted(to: string): Promise<{ sent_at: string } | null> {
  const supabase = getSupabaseAdmin();
  const since = new Date(Date.now() - RESEND_COOLDOWN_DAYS * 86400 * 1000).toISOString();
  const { data, error } = await supabase
    .from("sales_outreach")
    .select("sent_at")
    .eq("recipient", to.toLowerCase())
    .in("status", ["sent", "manual_sent"])
    .gte("sent_at", since)
    .limit(1);
  if (error) throw new Error(`sales_outreach select: ${error.message}`);
  return data?.[0] ?? null;
}

/**
 * 送信できた宛先を、見込み先リスト (sales_leads) 側でも「送信済み」にする。
 * これが無かったため、ダッシュボードの「送信済み」が送っても 0 のままになっていた。
 */
export async function markLeadContacted(to: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();
  const col = to.includes("@") && !/^https?:\/\//.test(to) ? "contact_email" : "contact_form_url";
  await supabase
    .from("sales_leads")
    .update({ status: "contacted", last_contacted_at: now, updated_at: now })
    .ilike(col, to.replace(/[%_\\]/g, "\\$&")) // 大文字小文字の違いだけ吸収する (ワイルドカードは無効化)
    .neq("status", "excluded");
}

export async function recordOutreach(row: {
  method: OutreachMethod;
  recipient: string;
  company: string;
  subject: string;
  body: string;
  status: "sent" | "failed" | "manual" | "skipped";
  external_id?: string | null;
  error?: string | null;
  source?: string | null;
}): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("sales_outreach").insert({
    method: row.method,
    recipient: row.recipient.toLowerCase(),
    company: row.company,
    subject: row.subject,
    body: row.body,
    body_hash: bodyHash(row.body),
    status: row.status,
    external_id: row.external_id ?? null,
    error: row.error ?? null,
    source: row.source ?? null,
    sent_at: row.status === "sent" ? new Date().toISOString() : null,
  });
  if (error) throw new Error(`sales_outreach insert: ${error.message}`);
}

// ------------------------------------------------------------------
// 返信・面談の追跳 (「返信記録 YYYY-MM-DD」を営業エージェントがドライブに書く → ここで取り込む)
// ------------------------------------------------------------------
export interface ReplyRecord {
  kind: "replied" | "meeting";
  match: string; // 宛先(メール)または法人名
  note: string;
}

/**
 * 「返信記録 YYYY-MM-DD」ドキュメントをパースする。ブロックは "----" 区切り。形式:
 *   ■ 種別: replied
 *   宛先または法人名: ○○教室
 *   メモ: ...
 */
export function parseReplyDoc(text: string): ReplyRecord[] {
  const records: ReplyRecord[] = [];
  const blocks = text.replace(/\r\n/g, "\n").split(/^\s*-{3,}\s*$/m);
  for (const raw of blocks) {
    const block = raw.trim();
    if (!block) continue;
    const kindMatch = block.match(/^■?\s*種別\s*[:：]\s*(replied|meeting)\s*$/im);
    if (!kindMatch) continue;
    const kind = kindMatch[1].toLowerCase() as "replied" | "meeting";
    const match = block.match(/^宛先または法人名\s*[:：]\s*(.+)$/m)?.[1]?.trim() ?? "";
    const note = block.match(/^メモ\s*[:：]\s*(.+)$/m)?.[1]?.trim() ?? "";
    if (!match) continue;
    records.push({ kind, match, note });
  }
  return records;
}

export async function findReplyDocs(date?: string): Promise<{ id: string; name: string }[]> {
  return findDocsByPrefix(date ? `返信記録 ${date}` : "返信記録");
}

/** 宛先(メール完全一致) または 法人名(部分一致) で sales_outreach の行を探す */
async function findOutreachRowsFor(match: string): Promise<{ id: number; recipient: string; company: string | null }[]> {
  const supabase = getSupabaseAdmin();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(match);
  if (isEmail) {
    const { data, error } = await supabase.from("sales_outreach").select("id,recipient,company").eq("recipient", match.toLowerCase());
    if (error) throw new Error(`sales_outreach select: ${error.message}`);
    return data ?? [];
  }
  const { data, error } = await supabase.from("sales_outreach").select("id,recipient,company").ilike("company", `%${match}%`).order("created_at", { ascending: false }).limit(5);
  if (error) throw new Error(`sales_outreach select: ${error.message}`);
  return data ?? [];
}

export interface ApplyReplyResult {
  match: string;
  kind: "replied" | "meeting";
  status: "applied" | "not_found" | "ambiguous";
  matchedCompany?: string | null;
}

/** 1件の返信/面談レコードを、一番新しい該当行 (複数該当は最新のもの) に反映する */
export async function applyReplyRecord(record: ReplyRecord): Promise<ApplyReplyResult> {
  const rows = await findOutreachRowsFor(record.match);
  if (rows.length === 0) return { match: record.match, kind: record.kind, status: "not_found" };
  const row = rows[0]; // created_at 降順の先頭 = 一番新しい送信
  const supabase = getSupabaseAdmin();
  const patch: Record<string, unknown> = record.kind === "replied" ? { replied_at: new Date().toISOString() } : { meeting_at: new Date().toISOString() };
  if (record.note) patch.reply_note = record.note;
  const { error } = await supabase.from("sales_outreach").update(patch).eq("id", row.id);
  if (error) throw new Error(`sales_outreach update: ${error.message}`);
  return { match: record.match, kind: record.kind, status: rows.length > 1 ? "ambiguous" : "applied", matchedCompany: row.company };
}

// ------------------------------------------------------------------
// Resend Webhook からの自動更新 (開封・クリック)
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// 送信の上限・一時停止 (sales_controls: 1行だけ持つ)
// ------------------------------------------------------------------
export interface SalesControls {
  maxPerRun: number;
  paused: boolean;
  pausedReason: string | null;
}

/** テーブルが無い/読めない場合は安全側 (デフォルト上限・停止なし) で返す */
export async function getSalesControls(): Promise<SalesControls> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from("sales_controls").select("max_per_run,paused,paused_reason").eq("id", 1).limit(1);
    if (error || !data?.length) return { maxPerRun: DEFAULT_MAX_PER_RUN, paused: false, pausedReason: null };
    const row = data[0] as { max_per_run: number; paused: boolean; paused_reason: string | null };
    return { maxPerRun: row.max_per_run, paused: row.paused, pausedReason: row.paused_reason };
  } catch {
    return { maxPerRun: DEFAULT_MAX_PER_RUN, paused: false, pausedReason: null };
  }
}

async function pauseSending(reason: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  await supabase
    .from("sales_controls")
    .upsert({ id: 1, paused: true, paused_reason: reason, paused_at: new Date().toISOString() }, { onConflict: "id" });
}

/** バウンス・苦情マークのたびに呼ぶ。直近の送信のうち割合がしきい値を超えたら自動停止する */
async function checkAutoPause(): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("sales_outreach")
    .select("bounced_at,complained_at")
    .in("status", ["sent"])
    .order("sent_at", { ascending: false })
    .limit(BOUNCE_WINDOW);
  if (error || !data || data.length < 10) return; // 母数が少なすぎる判断は避ける
  const rows = data as { bounced_at: string | null; complained_at: string | null }[];
  const bounceRate = rows.filter((r) => r.bounced_at).length / rows.length;
  const complaints = rows.filter((r) => r.complained_at).length;
  if (bounceRate > BOUNCE_RATE_LIMIT) {
    await pauseSending(`直近${rows.length}件のバウンス率が${Math.round(bounceRate * 100)}%に達したため自動停止`);
  } else if (complaints >= COMPLAINT_COUNT_LIMIT) {
    await pauseSending(`直近${rows.length}件で苦情(スパム報告)が${complaints}件に達したため自動停止`);
  }
}

export async function markBounced(externalId: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("sales_outreach").update({ bounced_at: new Date().toISOString() }).eq("external_id", externalId).is("bounced_at", null).select("id");
  if (error) throw new Error(`sales_outreach update (bounced): ${error.message}`);
  const changed = (data?.length ?? 0) > 0;
  if (changed) await checkAutoPause();
  return changed;
}

export async function markComplained(externalId: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("sales_outreach").update({ complained_at: new Date().toISOString() }).eq("external_id", externalId).is("complained_at", null).select("id");
  if (error) throw new Error(`sales_outreach update (complained): ${error.message}`);
  const changed = (data?.length ?? 0) > 0;
  if (changed) await checkAutoPause();
  return changed;
}

export async function markOpened(externalId: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("sales_outreach").update({ opened_at: new Date().toISOString() }).eq("external_id", externalId).is("opened_at", null).select("id");
  if (error) throw new Error(`sales_outreach update (opened): ${error.message}`);
  return (data?.length ?? 0) > 0;
}

export async function markClicked(externalId: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("sales_outreach").update({ clicked_at: new Date().toISOString() }).eq("external_id", externalId).is("clicked_at", null).select("id");
  if (error) throw new Error(`sales_outreach update (clicked): ${error.message}`);
  return (data?.length ?? 0) > 0;
}

// ------------------------------------------------------------------
// 4数字のまとめ (送信・開封・返信・面談)
// ------------------------------------------------------------------
export interface SalesFunnelStats {
  sent: number;
  opened: number;
  replied: number;
  meeting: number;
}

export async function salesFunnelStats(): Promise<SalesFunnelStats> {
  const supabase = getSupabaseAdmin();
  const [sentQ, openedQ, repliedQ, meetingQ] = await Promise.all([
    supabase.from("sales_outreach").select("id", { count: "exact", head: true }).in("status", ["sent", "manual_sent"]),
    supabase.from("sales_outreach").select("id", { count: "exact", head: true }).not("opened_at", "is", null),
    supabase.from("sales_outreach").select("id", { count: "exact", head: true }).not("replied_at", "is", null),
    supabase.from("sales_outreach").select("id", { count: "exact", head: true }).not("meeting_at", "is", null),
  ]);
  return { sent: sentQ.count ?? 0, opened: openedQ.count ?? 0, replied: repliedQ.count ?? 0, meeting: meetingQ.count ?? 0 };
}

export async function listRecentOutreach(limit = 50) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("sales_outreach")
    .select("id,method,recipient,company,subject,status,external_id,error,source,sent_at,created_at,opened_at,clicked_at,replied_at,meeting_at,reply_note")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`sales_outreach select: ${error.message}`);
  return data ?? [];
}

// ------------------------------------------------------------------
// Resend
// ------------------------------------------------------------------
export async function sendEmail(item: OutreachItem): Promise<{ id: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY が未設定です");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [item.to],
      reply_to: REPLY_TO,
      subject: item.subject,
      text: item.body,
      headers: { "List-Unsubscribe": `<mailto:${REPLY_TO}?subject=配信停止>` },
    }),
  });
  const json = (await res.json().catch(() => ({}))) as { id?: string; message?: string; name?: string };
  if (!res.ok || !json.id) throw new Error(`Resend ${res.status}: ${json.message ?? json.name ?? JSON.stringify(json).slice(0, 200)}`);
  return { id: json.id };
}

// ------------------------------------------------------------------
// 実行 (冪等)
// ------------------------------------------------------------------
export interface RunResult {
  method: OutreachMethod;
  to: string;
  company: string;
  status: "sent" | "failed" | "manual" | "already_sent" | "suppressed" | "dry_run" | "not_configured" | "limit" | "paused" | "deferred";
  external_id?: string | null;
  error?: string;
}

// 1回の実行で使ってよい時間。ルートの maxDuration (120秒) より手前で打ち切り、
// 残りは "deferred" として次回に回す (途中でタイムアウトして 504 になるのを防ぐ)
const RUN_TIME_BUDGET_MS = 90_000;

/** 宛先ごとの「送信済み/手動記録済み/停止」を、1件ずつではなくまとめて引く (件数が多いと1件ずつでは時間切れになるため) */
async function prefetchRecipientState(recipients: string[]): Promise<{ recent: Set<string>; manual: Set<string>; suppressed: Set<string> }> {
  const supabase = getSupabaseAdmin();
  const lower = [...new Set(recipients.map((r) => r.toLowerCase()))];
  const recent = new Set<string>();
  const manual = new Set<string>();
  const suppressed = new Set<string>();
  if (lower.length === 0) return { recent, manual, suppressed };
  const since = new Date(Date.now() - RESEND_COOLDOWN_DAYS * 86400 * 1000).toISOString();
  for (let i = 0; i < lower.length; i += 100) {
    const chunk = lower.slice(i, i + 100);
    const [sentQ, manualQ] = await Promise.all([
      supabase.from("sales_outreach").select("recipient").in("recipient", chunk).in("status", ["sent", "manual_sent"]).gte("sent_at", since),
      supabase.from("sales_outreach").select("recipient").in("recipient", chunk).eq("status", "manual"),
    ]);
    if (sentQ.error) throw new Error(`sales_outreach select: ${sentQ.error.message}`);
    for (const r of sentQ.data ?? []) recent.add((r as { recipient: string }).recipient);
    for (const r of manualQ.data ?? []) manual.add((r as { recipient: string }).recipient);
  }
  const patterns = new Set<string>();
  for (const addr of lower) {
    patterns.add(addr);
    const domain = addr.split("@")[1];
    if (domain && !/^https?:/.test(addr)) patterns.add(`@${domain}`);
  }
  const patternList = [...patterns];
  const hit = new Set<string>();
  for (let i = 0; i < patternList.length; i += 100) {
    const { data, error } = await supabase.from("sales_suppression").select("pattern").in("pattern", patternList.slice(i, i + 100));
    if (error) throw new Error(`sales_suppression select: ${error.message}`);
    for (const r of data ?? []) hit.add((r as { pattern: string }).pattern);
  }
  for (const addr of lower) {
    const domain = addr.split("@")[1];
    if (hit.has(addr) || (domain && hit.has(`@${domain}`))) suppressed.add(addr);
  }
  return { recent, manual, suppressed };
}

export async function runOutreach(opts: { date?: string; days?: number; dry?: boolean }): Promise<{ date: string; docs: string[]; queued: number; results: RunResult[] }> {
  // date 指定時はその日の承認だけ (従来どおり)。未指定なら直近 APPROVAL_LOOKBACK_DAYS 日分の承認をまとめて処理する
  const date = opts.date ?? jstNow().date;
  const loaded = await loadApprovals(opts.date, opts.days);
  const docs = loaded.docs;
  // 承認ドキュメントの分を先に、続けてダッシュボードで一括承認された分 (日付指定の再実行時は含めない)
  const items: OutreachItem[] = [...loaded.items];
  if (!opts.date) {
    const seen = new Set(items.map((it) => `${it.method}:${it.to.toLowerCase()}`));
    for (const it of await loadApprovedLeadItems()) {
      const key = `${it.method}:${it.to.toLowerCase()}`;
      if (seen.has(key)) continue;
      seen.add(key);
      items.push(it);
    }
  }
  const results: RunResult[] = [];
  let sentCount = 0;
  const source = `send-approval-${date}`;
  const controls = await getSalesControls();
  const started = Date.now();
  const state = await prefetchRecipientState(items.map((it) => it.to));

  for (const it of items) {
    const base = { method: it.method, to: it.to, company: it.company };
    const key = it.to.toLowerCase();
    if (controls.paused && it.method === "email" && !opts.dry) {
      results.push({ ...base, status: "paused", error: controls.pausedReason ?? undefined });
      continue;
    }
    if (state.suppressed.has(key)) {
      results.push({ ...base, status: "suppressed" });
      continue;
    }
    if (state.recent.has(key)) {
      results.push({ ...base, status: "already_sent" });
      // 送信済みなのに見込み先リストが承認待ちのまま残らないよう、ここでも反映しておく
      if (it.method === "email" && !opts.dry) await markLeadContacted(it.to).catch(() => undefined);
      continue;
    }
    if (it.method === "email" && !isUsableEmail(it.to)) {
      results.push({ ...base, status: "suppressed", error: "記入例などの送れないアドレス" });
      continue;
    }
    if (Date.now() - started > RUN_TIME_BUDGET_MS) {
      results.push({ ...base, status: "deferred" }); // 時間切れ。次回の実行で続きから処理する
      continue;
    }
    if (it.method === "form") {
      // フォームはここでは送らない。「manual」として記録し、sales-forms ワークフロー (ヘッドレスブラウザ) が後で送る
      if (!opts.dry && !state.manual.has(key)) {
        await recordOutreach({ ...it, recipient: it.to, status: "manual", source });
        state.manual.add(key);
      }
      results.push({ ...base, status: "manual" });
      continue;
    }
    if (!isResendConfigured()) {
      results.push({ ...base, status: "not_configured" });
      continue;
    }
    if (sentCount >= controls.maxPerRun) {
      results.push({ ...base, status: "limit" });
      continue;
    }
    if (opts.dry) {
      results.push({ ...base, status: "dry_run" });
      continue;
    }
    try {
      const r = await sendEmail(it);
      await recordOutreach({ ...it, recipient: it.to, status: "sent", external_id: r.id, source });
      await markLeadContacted(it.to).catch(() => undefined); // 見込み先リストの反映失敗で送信を止めない
      state.recent.add(key);
      sentCount += 1;
      results.push({ ...base, status: "sent", external_id: r.id });
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      await recordOutreach({ ...it, recipient: it.to, status: "failed", error: message, source }).catch(() => undefined);
      results.push({ ...base, status: "failed", error: message });
    }
  }
  return { date, docs, queued: items.length, results };
}
