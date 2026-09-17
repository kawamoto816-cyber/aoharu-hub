import { findQueueDocs, exportDocText, jstNow } from "./queue";
import { createHash } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";

// ショート動画 (TikTok / YouTube ショート) の台本キュー。
// 承認済み投稿ドキュメントの "[shorts]" ブロック (編集長の D3 形式そのまま) を機械可読な JSON にする。
// 生成 (レンダリング) は GitHub Actions が /internal/shorts/queue を読んで行い、
// 出来上がった動画の情報を /internal/shorts/done に返す (shorts_videos テーブル)。
//
// ブロックの形式 (D3):
//   [shorts]
//   ■ タイトル（冒頭テキスト）: 学部、まだ迷ってる？
//   スライド1（フック・5秒）
//   【画面テキスト】学部、まだ迷ってる？
//   【ナレーション】志望理由書の前に、学部で止まっていませんか。
//   スライド2（6秒）
//   【画面テキスト】「文系か理系か」で
//   　　決めなくていい
//   【ナレーション】…
//   ■ 説明欄用テキスト（100字）
//   …
//   ■ ハッシュタグ: #学部選び #総合型選抜

export interface ShortsSlide {
  text: string;
  narration: string;
  style?: "hook" | "accent" | "cta";
}

export interface ShortsScript {
  slug: string;
  title: string;
  description: string;
  hashtags: string[];
  slides: ShortsSlide[];
}

function slugify(title: string, date: string): string {
  // 日本語タイトルは ASCII にならないので、日付 + タイトルの短いハッシュで一意にする
  const h = createHash("sha1").update(title.trim()).digest("hex").slice(0, 8);
  return `${date}-${h}`;
}

/** 1つの [shorts] ブロック (先頭の "[shorts]" は除いたテキスト) を台本に変換する */
export function parseShortsBlock(block: string, date: string): ShortsScript | null {
  const text = block.replace(/\r\n/g, "\n").replace(/^\[shorts\]\s*(\[[^\]]*\]\s*)?/i, "");
  const lines = text.split("\n").map((l) => l.replace(/\s+$/, ""));

  let title = "";
  let description = "";
  const hashtags: string[] = [];
  const slides: ShortsSlide[] = [];
  let cur: ShortsSlide | null = null;
  let mode: "" | "text" | "narration" | "desc" = "";

  const flush = () => {
    if (cur && cur.text.trim()) slides.push({ ...cur, text: cur.text.trim(), narration: cur.narration.trim() });
    cur = null;
  };

  for (const raw of lines) {
    const line = raw.replace(/^[\s　]+/, "");
    if (!line) continue;
    let m: RegExpMatchArray | null;
    if ((m = line.match(/^■\s*タイトル[^:：]*[:：]\s*(.+)$/))) {
      title = m[1].trim();
      mode = "";
      continue;
    }
    if (/^■\s*説明欄/.test(line)) {
      flush();
      mode = "desc";
      const inline = line.replace(/^■\s*説明欄[^:：]*[:：]?\s*/, "").trim();
      if (inline && !/^（.*）$/.test(inline)) description += inline;
      continue;
    }
    if ((m = line.match(/^■\s*ハッシュタグ[^:：]*[:：]?\s*(.*)$/))) {
      flush();
      mode = "";
      for (const t of m[1].matchAll(/#[^\s#]+/g)) hashtags.push(t[0]);
      continue;
    }
    if (/^■/.test(line)) {
      // 尺・想定素材・ナレーション指示などは無視
      mode = "";
      continue;
    }
    if (/^スライド\s*\d+/.test(line)) {
      flush();
      cur = { text: "", narration: "" };
      mode = "";
      continue;
    }
    if ((m = line.match(/^【画面テキスト】\s*(.*)$/))) {
      if (!cur) cur = { text: "", narration: "" };
      cur.text += (cur.text ? "\n" : "") + m[1].trim();
      mode = "text";
      continue;
    }
    if ((m = line.match(/^【ナレーション】\s*(.*)$/))) {
      if (!cur) cur = { text: "", narration: "" };
      cur.narration += (cur.narration ? "" : "") + m[1].trim();
      mode = "narration";
      continue;
    }
    if (mode === "text" && cur) cur.text += "\n" + line;
    else if (mode === "narration" && cur) cur.narration += line;
    else if (mode === "desc") description += (description ? "\n" : "") + line;
  }
  flush();

  if (!title && slides.length) title = slides[0].text.split("\n")[0];
  if (slides.length < 2) return null;
  slides[0].style = "hook";
  slides[slides.length - 1].style = "cta";
  for (const s of slides) if (/キャリキャラ|テンサクン|メンサツ|しぼりゆ|アオハルOS/.test(s.text) && !s.style) s.style = "accent";
  return { slug: slugify(title, date), title, description: description.trim(), hashtags, slides };
}

/** 承認済み投稿ドキュメント群から [shorts] ブロックを取り出す */
export function parseShortsFromDoc(docText: string, date: string): ShortsScript[] {
  const out: ShortsScript[] = [];
  const blocks = docText.replace(/\r\n/g, "\n").split(/^\s*-{3,}\s*$/m);
  for (const raw of blocks) {
    const block = raw.trim();
    if (!/^\[shorts\]/i.test(block)) continue;
    const s = parseShortsBlock(block, date);
    if (s) out.push(s);
  }
  return out;
}

export async function loadShortsQueue(date = jstNow().date): Promise<{ docs: string[]; scripts: ShortsScript[] }> {
  const docs = await findQueueDocs(date);
  const scripts: ShortsScript[] = [];
  const seen = new Set<string>();
  for (const d of docs) {
    for (const s of parseShortsFromDoc(await exportDocText(d.id), date)) {
      if (seen.has(s.slug)) continue;
      seen.add(s.slug);
      scripts.push(s);
    }
  }
  return { docs: docs.map((d) => d.name), scripts };
}

// ------------------------------------------------------------------
// shorts_videos (生成済み動画の記録)
// ------------------------------------------------------------------
export interface ShortsVideoRow {
  slug: string;
  title: string;
  description: string;
  duration_sec: number | null;
  speaker: string | null;
  video_url: string;
  status: "rendered" | "posted_youtube" | "posted_tiktok" | "posted_all";
  source?: string | null;
}

export async function upsertShortsVideo(row: ShortsVideoRow): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("shorts_videos").upsert(
    {
      slug: row.slug,
      title: row.title,
      description: row.description,
      duration_sec: row.duration_sec,
      speaker: row.speaker,
      video_url: row.video_url,
      status: row.status,
      source: row.source ?? null,
      rendered_at: new Date().toISOString(),
    },
    { onConflict: "slug" },
  );
  if (error) throw new Error(`shorts_videos upsert: ${error.message}`);
}

export async function listShortsVideos(limit = 30) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("shorts_videos")
    .select(
      "slug,title,description,duration_sec,speaker,video_url,status,source,rendered_at,instagram_posted_at,instagram_media_id,instagram_error,instagram_attempts,youtube_posted_at,youtube_video_id,youtube_error,youtube_attempts,tiktok_posted_at,tiktok_publish_id,tiktok_error,tiktok_attempts",
    )
    .order("rendered_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`shorts_videos select: ${error.message}`);
  return data ?? [];
}

export async function hasRenderedVideo(slug: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("shorts_videos").select("slug").eq("slug", slug).limit(1);
  if (error) throw new Error(`shorts_videos select: ${error.message}`);
  return (data?.length ?? 0) > 0;
}

// ------------------------------------------------------------------
// Instagram リール投稿 (生成済み動画のうち、まだ投稿していないものを少しずつ処理する)
// ------------------------------------------------------------------
export interface PendingReel {
  slug: string;
  title: string;
  description: string | null;
  video_url: string;
  instagram_attempts: number;
}

/** まだ Instagram に投稿していない (かつ失敗が3回未満の) 動画を古い順に取得する */
export async function listPendingInstagramReels(limit = 1): Promise<PendingReel[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("shorts_videos")
    .select("slug,title,description,video_url,instagram_attempts")
    .is("instagram_posted_at", null)
    .lt("instagram_attempts", 3)
    .order("rendered_at", { ascending: true })
    .limit(limit);
  if (error) throw new Error(`shorts_videos select (instagram pending): ${error.message}`);
  return (data ?? []).map((r) => ({ ...r, instagram_attempts: r.instagram_attempts ?? 0 }));
}

export async function markInstagramReelPosted(slug: string, mediaId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("shorts_videos")
    .update({ instagram_posted_at: new Date().toISOString(), instagram_media_id: mediaId, instagram_error: null })
    .eq("slug", slug);
  if (error) throw new Error(`shorts_videos update (instagram posted): ${error.message}`);
}

export async function markInstagramReelFailed(slug: string, error: string, previousAttempts: number): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error: dbError } = await supabase
    .from("shorts_videos")
    .update({ instagram_error: error, instagram_attempts: previousAttempts + 1 })
    .eq("slug", slug);
  if (dbError) throw new Error(`shorts_videos update (instagram failed): ${dbError.message}`);
}

// ------------------------------------------------------------------
// YouTube (Shorts) 投稿 (生成済み動画のうち、まだ投稿していないものを少しずつ処理する)
// ------------------------------------------------------------------
export interface PendingYoutubeUpload {
  slug: string;
  title: string;
  description: string | null;
  video_url: string;
  youtube_attempts: number;
}

/** まだ YouTube に投稿していない (かつ失敗が3回未満の) 動画を古い順に取得する */
export async function listPendingYoutubeUploads(limit = 1): Promise<PendingYoutubeUpload[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("shorts_videos")
    .select("slug,title,description,video_url,youtube_attempts")
    .is("youtube_posted_at", null)
    .lt("youtube_attempts", 3)
    .order("rendered_at", { ascending: true })
    .limit(limit);
  if (error) throw new Error(`shorts_videos select (youtube pending): ${error.message}`);
  return (data ?? []).map((r) => ({ ...r, youtube_attempts: r.youtube_attempts ?? 0 }));
}

export async function markYoutubeUploaded(slug: string, videoId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("shorts_videos")
    .update({ youtube_posted_at: new Date().toISOString(), youtube_video_id: videoId, youtube_error: null })
    .eq("slug", slug);
  if (error) throw new Error(`shorts_videos update (youtube posted): ${error.message}`);
}

export async function markYoutubeFailed(slug: string, error: string, previousAttempts: number): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error: dbError } = await supabase
    .from("shorts_videos")
    .update({ youtube_error: error, youtube_attempts: previousAttempts + 1 })
    .eq("slug", slug);
  if (dbError) throw new Error(`shorts_videos update (youtube failed): ${dbError.message}`);
}

// ------------------------------------------------------------------
// TikTok (Content Posting API) 投稿 (生成済み動画のうち、まだ投稿していないものを少しずつ処理する)
// ------------------------------------------------------------------
export interface PendingTiktokUpload {
  slug: string;
  title: string;
  description: string | null;
  video_url: string;
  tiktok_attempts: number;
}

/** まだ TikTok に投稿していない (かつ失敗が3回未満の) 動画を古い順に取得する */
export async function listPendingTiktokUploads(limit = 1): Promise<PendingTiktokUpload[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("shorts_videos")
    .select("slug,title,description,video_url,tiktok_attempts")
    .is("tiktok_posted_at", null)
    .lt("tiktok_attempts", 3)
    .order("rendered_at", { ascending: true })
    .limit(limit);
  if (error) throw new Error(`shorts_videos select (tiktok pending): ${error.message}`);
  return (data ?? []).map((r) => ({ ...r, tiktok_attempts: r.tiktok_attempts ?? 0 }));
}

export async function markTiktokUploaded(slug: string, publishId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("shorts_videos")
    .update({ tiktok_posted_at: new Date().toISOString(), tiktok_publish_id: publishId, tiktok_error: null })
    .eq("slug", slug);
  if (error) throw new Error(`shorts_videos update (tiktok posted): ${error.message}`);
}

export async function markTiktokFailed(slug: string, error: string, previousAttempts: number): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error: dbError } = await supabase
    .from("shorts_videos")
    .update({ tiktok_error: error, tiktok_attempts: previousAttempts + 1 })
    .eq("slug", slug);
  if (dbError) throw new Error(`shorts_videos update (tiktok failed): ${dbError.message}`);
}
