import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";

// 利用者の声（docs/voices.sql）。テーブルがまだ無いときも、画面が壊れないように空で返す。

export const VOICE_GRADES = ["高1", "高2", "高3", "既卒", "その他"] as const;
export type VoiceGrade = (typeof VOICE_GRADES)[number];
export type VoiceStatus = "pending" | "approved" | "rejected";

export type Voice = {
  id: string;
  created_at: string;
  kind: string;
  grade: VoiceGrade;
  before_score: number | null;
  after_score: number | null;
  comment: string;
  consent_publish: boolean;
  status: VoiceStatus;
};

const COLS = "id,created_at,kind,grade,before_score,after_score,comment,consent_publish,status";

export async function addVoice(v: {
  userId: string;
  kind: string;
  grade: VoiceGrade;
  beforeScore: number | null;
  afterScore: number | null;
  comment: string;
  consentPublish: boolean;
}): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  // 1人が送れるのは1日3件まで（いたずら対策）
  const since = new Date(Date.now() - 86_400_000).toISOString();
  const { count } = await supabase.from("voices").select("id", { count: "exact", head: true }).eq("user_id", v.userId).gte("created_at", since);
  if ((count ?? 0) >= 3) return false;
  const { error } = await supabase.from("voices").insert({
    user_id: v.userId,
    kind: v.kind,
    grade: v.grade,
    before_score: v.beforeScore,
    after_score: v.afterScore,
    comment: v.comment,
    consent_publish: v.consentPublish,
  });
  if (error) {
    console.error("[voices] insert", error.message);
    return false;
  }
  return true;
}

/** サイトに載せる声（本人が載せてよいと選び、社内で「載せる」にしたもの） */
export async function listPublishedVoices(limit = 6): Promise<Voice[]> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("voices")
      .select(COLS)
      .eq("status", "approved")
      .eq("consent_publish", true)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) return [];
    return (data ?? []) as Voice[];
  } catch {
    return [];
  }
}

/** 管理画面用（新しい順） */
export async function listVoicesForAdmin(limit = 100): Promise<Voice[]> {
  try {
    const { data, error } = await getSupabaseAdmin().from("voices").select(COLS).order("created_at", { ascending: false }).limit(limit);
    if (error) return [];
    return (data ?? []) as Voice[];
  } catch {
    return [];
  }
}

export async function setVoiceStatus(id: string, status: VoiceStatus): Promise<boolean> {
  const { error } = await getSupabaseAdmin().from("voices").update({ status, reviewed_at: new Date().toISOString() }).eq("id", id);
  return !error;
}
