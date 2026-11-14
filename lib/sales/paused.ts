import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import { ACTIVE_PATTERNS, type PatternKey } from "./patterns";

// 送るのを止めているパターン (いまは習い事教室 club) の見込み先の連絡先を返す。
// 承認ドキュメントやフォーム送信待ちに残っている分も、送る直前にここではじく (2026-11-15 じゅんさんの方針:
// 法人営業は塾・私立高校・通信制サポート校だけにしぼる。習い事教室は返信がすべて「不要」だった)。
export async function pausedContacts(contacts: string[]): Promise<Set<string>> {
  const list = [...new Set(contacts.filter(Boolean))];
  if (list.length === 0) return new Set();
  const supabase = getSupabaseAdmin();
  const paused = new Set<string>();
  for (let i = 0; i < list.length; i += 200) {
    const chunk = list.slice(i, i + 200);
    const [byMail, byForm] = await Promise.all([
      supabase.from("sales_leads").select("contact_email,pattern_key").in("contact_email", chunk),
      supabase.from("sales_leads").select("contact_form_url,pattern_key").in("contact_form_url", chunk),
    ]);
    for (const r of (byMail.data ?? []) as { contact_email: string; pattern_key: PatternKey }[]) {
      if (!ACTIVE_PATTERNS.includes(r.pattern_key)) paused.add(r.contact_email.toLowerCase());
    }
    for (const r of (byForm.data ?? []) as { contact_form_url: string; pattern_key: PatternKey }[]) {
      if (!ACTIVE_PATTERNS.includes(r.pattern_key)) paused.add(r.contact_form_url.toLowerCase());
    }
  }
  return paused;
}
