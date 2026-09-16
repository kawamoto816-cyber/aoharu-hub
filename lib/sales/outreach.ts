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
const MAX_PER_RUN = 20;
const RESEND_COOLDOWN_DAYS = 90;

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
  const q = `'${SALES_FOLDER_ID}' in parents and name contains '送信承認 ${date}' and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name)&orderBy=modifiedTime%20desc&supportsAllDrives=true&includeItemsFromAllDrives=true`;
  const res = await driveFetch(url);
  if (!res.ok) {
    const sa = getServiceAccount()?.client_email ?? "(不明)";
    throw new Error(`Drive files.list ${res.status}: ${(await res.text()).slice(0, 200)} — 法人営業フォルダをサービスアカウント ${sa} に閲覧共有してください`);
  }
  const json = (await res.json()) as { files?: { id: string; name: string }[] };
  return json.files ?? [];
}

async function exportDocText(fileId: string): Promise<string> {
  const res = await driveFetch(`https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/plain`);
  if (!res.ok) throw new Error(`Drive export ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return (await res.text()).replace(/^﻿/, "");
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

export async function listRecentOutreach(limit = 50) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("sales_outreach")
    .select("id,method,recipient,company,subject,status,external_id,error,source,sent_at,created_at")
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
  status: "sent" | "failed" | "manual" | "already_sent" | "suppressed" | "dry_run" | "not_configured" | "limit";
  external_id?: string | null;
  error?: string;
}

export async function runOutreach(opts: { date?: string; dry?: boolean }): Promise<{ date: string; docs: string[]; queued: number; results: RunResult[] }> {
  const date = opts.date ?? jstNow().date;
  const { docs, items } = await loadApprovals(date);
  const results: RunResult[] = [];
  let sentCount = 0;
  const source = `send-approval-${date}`;

  for (const it of items) {
    const base = { method: it.method, to: it.to, company: it.company };
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
    if (sentCount >= MAX_PER_RUN) {
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
