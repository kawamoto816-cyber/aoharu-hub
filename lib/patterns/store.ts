import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";

// 「勝ちパターン」ライブラリ。競合分析エージェント (週次) が抽出した型を Supabase に蓄積し、
// 編集長エージェントの企画プロンプトから読み込ませる。
// あくまで抽象化した「型」を保存する。投稿本文の丸コピーはここに置かない。

export type Platform = "x" | "threads" | "instagram" | "tiktok" | "youtube" | "general";
export type PatternType = "hook" | "structure" | "topic" | "format" | "cta";
export type Strength = "high" | "medium" | "low";

export interface ContentPatternInput {
  platform: Platform;
  pattern_type: PatternType;
  title: string;
  description: string;
  example_note?: string | null;
  source_url?: string | null;
  strength?: Strength;
}

export interface ContentPatternRow extends ContentPatternInput {
  id: string;
  active: boolean;
  detected_at: string;
  updated_at: string;
}

function normalize(p: ContentPatternInput): ContentPatternInput & { active: boolean; updated_at: string } {
  return {
    platform: p.platform,
    pattern_type: p.pattern_type,
    title: p.title.trim().slice(0, 120),
    description: p.description.trim().slice(0, 1000),
    example_note: p.example_note?.trim().slice(0, 500) ?? null,
    source_url: p.source_url?.trim().slice(0, 500) ?? null,
    strength: p.strength ?? "medium",
    active: true,
    updated_at: new Date().toISOString(),
  };
}

/** 抽出したパターンをまとめて upsert する (platform+title が同じものは上書き更新)。 */
export async function upsertContentPatterns(patterns: ContentPatternInput[]): Promise<{ count: number }> {
  if (patterns.length === 0) return { count: 0 };
  const supabase = getSupabaseAdmin();
  const rows = patterns.map(normalize);
  const { error } = await supabase.from("content_patterns").upsert(rows, { onConflict: "platform,title" });
  if (error) throw new Error(`content_patterns upsert: ${error.message}`);
  return { count: rows.length };
}

/** 有効なパターンを新しい順に取得する。 */
export async function listActiveContentPatterns(limit = 60): Promise<ContentPatternRow[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("content_patterns")
    .select("id,platform,pattern_type,title,description,example_note,source_url,strength,active,detected_at,updated_at")
    .eq("active", true)
    .order("detected_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`content_patterns select: ${error.message}`);
  return data ?? [];
}

/** 指定タイトル (platform+title) を無効化する (古くなった型を編集長の目に触れさせないようにする)。 */
export async function deactivateContentPattern(platform: Platform, title: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("content_patterns")
    .update({ active: false, updated_at: new Date().toISOString() })
    .eq("platform", platform)
    .eq("title", title);
  if (error) throw new Error(`content_patterns update (deactivate): ${error.message}`);
}

const TYPE_LABEL: Record<PatternType, string> = {
  hook: "フック",
  structure: "構成",
  topic: "題材",
  format: "フォーマット",
  cta: "CTA",
};

/** 編集長エージェントのプロンプトにそのまま読み込ませるテキストダイジェストを作る。 */
export function formatPatternsDigest(rows: ContentPatternRow[]): string {
  if (rows.length === 0) {
    return "（まだ勝ちパターンは蓄積されていません。通常の企画方針で進めてください。）";
  }
  const byType = new Map<PatternType, ContentPatternRow[]>();
  for (const r of rows) {
    const list = byType.get(r.pattern_type) ?? [];
    list.push(r);
    byType.set(r.pattern_type, list);
  }
  const order: PatternType[] = ["hook", "structure", "topic", "format", "cta"];
  const lines: string[] = [];
  for (const t of order) {
    const list = byType.get(t);
    if (!list || list.length === 0) continue;
    lines.push(`## ${TYPE_LABEL[t]}`);
    for (const r of list) {
      const strengthTag = r.strength === "high" ? "◎" : r.strength === "low" ? "△" : "○";
      lines.push(`- [${strengthTag}][${r.platform}] ${r.title}: ${r.description}${r.example_note ? `（観測例: ${r.example_note}）` : ""}`);
    }
  }
  return lines.join("\n");
}
