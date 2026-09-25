import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import { markLeadContacted } from "./outreach";
import { isUsableFormUrl } from "./contact";
import { nameMatchesSuppression, nameSuppressionPatterns } from "./leads";

// 法人営業のフォーム宛て自動送信 (GitHub Actions の sales-forms ワークフローが使う)。
//   平日09:30 の送信ジョブが、承認済みの [form] 項目を sales_outreach に status='manual' で記録する。
//   GitHub Actions 上のヘッドレスブラウザ (scripts/sales-forms/submit.mjs) が
//     1) GET  /internal/sales/forms  で未処理のフォーム宛てを受け取り
//     2) 各フォームを入力・送信し
//     3) POST /internal/sales/forms  で結果 (送信済み / 見送り / 失敗) を書き戻す。
//   結果を書き戻した行は status が 'manual' でなくなるので、同じフォームに二度送ることはない
//   (失敗・完了画面を確認できなかったものも自動では再送しない。二重送信を避けるため)。

const RESEND_COOLDOWN_DAYS = 90;

export interface PendingForm {
  id: number;
  url: string;
  company: string;
  subject: string;
  body: string;
}

export type FormResultStatus = "sent" | "skipped" | "failed";

/** 未処理のフォーム宛てを古い順に返す。NGリスト・送信済み・送れないURLは、その場で「見送り」にする */
export async function listPendingForms(limit = 30): Promise<PendingForm[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("sales_outreach")
    .select("id,recipient,company,subject,body")
    .eq("method", "form")
    .eq("status", "manual")
    .order("created_at", { ascending: true })
    .order("id", { ascending: true })
    .limit(Math.max(limit * 3, 100));
  if (error) throw new Error(`sales_outreach select: ${error.message}`);
  const rows = (data ?? []) as { id: number; recipient: string; company: string | null; subject: string | null; body: string | null }[];
  if (rows.length === 0) return [];

  // 90日以内に同じフォームへ送信済みのもの
  const since = new Date(Date.now() - RESEND_COOLDOWN_DAYS * 86400 * 1000).toISOString();
  const urls = [...new Set(rows.map((r) => r.recipient))];
  const { data: sentRows } = await supabase
    .from("sales_outreach")
    .select("recipient")
    .in("recipient", urls)
    .in("status", ["sent", "manual_sent"])
    .gte("sent_at", since);
  const alreadySent = new Set(((sentRows ?? []) as { recipient: string }[]).map((r) => r.recipient));
  // 以前に自動送信で「見送り・失敗」にした宛先 (同じフォームに何度も送ろうとしない。失敗には押した可能性のあるものも含む)
  const { data: doneRows } = await supabase.from("sales_outreach").select("recipient").in("recipient", urls).in("status", ["skipped", "failed"]);
  const alreadyTried = new Set(((doneRows ?? []) as { recipient: string }[]).map((r) => r.recipient));
  const ngNames = await nameSuppressionPatterns();
  // 送信停止リスト: フォームURLそのもの、または同じドメインのメールアドレスで受信拒否があった先
  const hostOf = (u: string) => {
    try {
      return new URL(u).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  };
  const patterns = [...new Set(urls.flatMap((u) => [u, `@${hostOf(u)}`]))];
  const { data: supRows } = await supabase.from("sales_suppression").select("pattern").in("pattern", patterns);
  const suppressed = new Set(((supRows ?? []) as { pattern: string }[]).map((r) => r.pattern));

  const out: PendingForm[] = [];
  const seen = new Set<string>();
  for (const r of rows) {
    const company = r.company ?? "";
    let skip: string | null = null;
    if (seen.has(r.recipient)) skip = "同じフォームが重複して承認されていたため";
    else if (alreadySent.has(r.recipient)) skip = "90日以内に同じフォームへ送信済み";
    else if (alreadyTried.has(r.recipient)) skip = "以前に見送り・失敗になったフォーム (同じフォームに繰り返し送らない)";
    else if (suppressed.has(r.recipient) || suppressed.has(`@${hostOf(r.recipient)}`)) skip = "送信停止リストにある宛先";
    else if (!isUsableFormUrl(r.recipient)) skip = "フォームのURLではない";
    else if (/^https?:\/\/(lin\.ee|line\.me|page\.line\.me)\//i.test(r.recipient)) skip = "LINEの友だち追加リンク (フォームではない)";
    else if (company && nameMatchesSuppression(company, ngNames)) skip = "送信NGリストの法人";
    else if (!r.subject || !r.body) skip = "件名または本文が空";
    if (skip) {
      await recordFormResult(r.id, "skipped", skip).catch(() => undefined);
      continue;
    }
    seen.add(r.recipient);
    out.push({ id: r.id, url: r.recipient, company, subject: r.subject ?? "", body: r.body ?? "" });
    if (out.length >= limit) break;
  }
  return out;
}

/** フォーム送信の結果を書き戻す。送信済みなら見込み先リストも「送信済み」にする */
export async function recordFormResult(id: number, status: FormResultStatus, note?: string | null): Promise<{ updated: boolean }> {
  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();
  const patch: Record<string, unknown> =
    status === "sent"
      ? { status: "manual_sent", sent_at: now, error: note ?? null }
      : { status: status === "skipped" ? "skipped" : "failed", error: note ?? null };
  // status='manual' の行だけを更新する (二重に書き戻しても最初の結果を優先)
  const { data, error } = await supabase.from("sales_outreach").update(patch).eq("id", id).eq("status", "manual").select("recipient");
  if (error) throw new Error(`sales_outreach update: ${error.message}`);
  const row = (data ?? [])[0] as { recipient: string } | undefined;
  if (row && status === "sent") await markLeadContacted(row.recipient).catch(() => undefined);
  return { updated: Boolean(row) };
}
