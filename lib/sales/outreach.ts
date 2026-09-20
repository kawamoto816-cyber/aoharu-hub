import { createHash } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import { getGoogleAccessToken, getServiceAccount } from "@/lib/metrics/google-auth";
import { jstNow } from "@/lib/social/queue";

// 法人営業のアウトリーチ送信 (じゅんさんの「送信OK」後にサーバーが送る)。
//   - 営業エージェントが Google Drive「アオハルOS 法人営業」フォルダに「送信承認 YYYY-MM-DD」ドキュメントを作る
//   - サーバーがそれを読み、[email] の項目を Resend で送信、[form] の項目は「手動 (フォーム入力)」として記録する
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

export async function loadApprovals(date: string): Promise<{ docs: string[]; items: OutreachItem[] }> {
  const docs = await findApprovalDocs(date);
  const seen = new Set<string>();
  const items: OutreachItem[] = [];
  for (const d of docs) {
    for (const it of parseApprovalDoc(await exportDocText(d.id))) {
      const key = `${it.method}:${it.to.toLowerCase()}`;
      if (seen.has(key)) continue;
      seen.add(key);
      items.push(it);
    }
  }
  return { docs: docs.map((d) => d.name), items };
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
  status: "sent" | "failed" | "manual" | "already_sent" | "suppressed" | "dry_run" | "not_configured" | "limit" | "paused";
  external_id?: string | null;
  error?: string;
}

export async function runOutreach(opts: { date?: string; dry?: boolean }): Promise<{ date: string; docs: string[]; queued: number; results: RunResult[] }> {
  const date = opts.date ?? jstNow().date;
  const { docs, items } = await loadApprovals(date);
  const results: RunResult[] = [];
  let sentCount = 0;
  const source = `send-approval-${date}`;
  const controls = await getSalesControls();

  for (const it of items) {
    const base = { method: it.method, to: it.to, company: it.company };
    if (controls.paused && it.method === "email" && !opts.dry) {
      results.push({ ...base, status: "paused", error: controls.pausedReason ?? undefined });
      continue;
    }
    if (await isSuppressed(it.to)) {
      results.push({ ...base, status: "suppressed" });
      continue;
    }
    const recent = await recentlyContacted(it.to);
    if (recent) {
      results.push({ ...base, status: "already_sent" });
      continue;
    }
    if (it.method === "form") {
      // フォームは自動送信しない。手動 (Claude が右画面で入力) の対象として記録する
      if (!opts.dry) {
        const supabase = getSupabaseAdmin();
        const { data } = await supabase.from("sales_outreach").select("id").eq("recipient", it.to.toLowerCase()).eq("status", "manual").limit(1);
        if (!data?.length) await recordOutreach({ ...it, recipient: it.to, status: "manual", source });
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
