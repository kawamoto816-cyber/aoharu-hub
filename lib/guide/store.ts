import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import type { GuideArticle } from "./types";

// DBに入っているSEO記事の読み書き (テーブル定義は docs/guide-articles.sql)。
// 記事は Google ドライブの「SEO記事 YYYY-MM-DD」から /internal/guide/ingest が取り込む。
// 静的記事 (lib/guide/articles/*.ts) は残したまま、DBの記事がそこに足される形で表示される。

export interface GuideRow {
  slug: string;
  title: string;
  description: string;
  segment: GuideArticle["segment"];
  topic: GuideArticle["topic"];
  keywords: string[];
  lead: string;
  body: Pick<GuideArticle, "sections" | "faq" | "sources" | "cta">;
  status: "published" | "draft";
  issues: string[];
  source_doc: string | null;
  published_at: string;
  updated_at: string;
}

function toArticle(row: GuideRow): GuideArticle {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    segment: row.segment,
    topic: row.topic,
    keywords: row.keywords ?? [],
    publishedAt: row.published_at,
    updatedAt: (row.updated_at ?? row.published_at).slice(0, 10),
    lead: row.lead,
    sections: row.body?.sections ?? [],
    faq: row.body?.faq ?? [],
    sources: row.body?.sources ?? [],
    cta: row.body.cta,
  };
}

/** 公開中の記事 (新しい順)。テーブルが未作成でも画面を落とさず空配列を返す */
export async function listPublishedArticles(limit = 500): Promise<GuideArticle[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("guide_articles")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(limit);
    if (error) return [];
    return ((data ?? []) as GuideRow[]).map(toArticle);
  } catch {
    return [];
  }
}

/** 下書き (自動チェックに引っかかったもの)。/admin/guide で確認する */
export async function listDraftArticles(limit = 100): Promise<GuideRow[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("guide_articles")
      .select("*")
      .eq("status", "draft")
      .order("published_at", { ascending: false })
      .limit(limit);
    if (error) return [];
    return (data ?? []) as GuideRow[];
  } catch {
    return [];
  }
}

export async function getStoredArticle(slug: string): Promise<GuideArticle | null> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from("guide_articles").select("*").eq("slug", slug).eq("status", "published").limit(1);
    if (error || !data?.length) return null;
    return toArticle(data[0] as GuideRow);
  } catch {
    return null;
  }
}

export async function listAllSlugs(): Promise<string[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from("guide_articles").select("slug");
    if (error) return [];
    return (data ?? []).map((r) => (r as { slug: string }).slug);
  } catch {
    return [];
  }
}

/**
 * 記事を保存する。既に同じ slug があれば上書きする (取り込みは何度実行しても安全)。
 * issues が空なら published、そうでなければ draft。
 */
export async function upsertArticle(article: GuideArticle, issues: string[], sourceDoc: string | null): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("guide_articles").upsert(
    {
      slug: article.slug,
      title: article.title,
      description: article.description,
      segment: article.segment,
      topic: article.topic,
      keywords: article.keywords,
      lead: article.lead,
      body: { sections: article.sections, faq: article.faq, sources: article.sources, cta: article.cta },
      status: issues.length === 0 ? "published" : "draft",
      issues,
      source_doc: sourceDoc,
      published_at: article.publishedAt,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "slug" },
  );
  if (error) throw new Error(`guide_articles upsert: ${error.message}`);
}
