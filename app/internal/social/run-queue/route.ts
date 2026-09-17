import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { isXConfigured, postToX } from "@/lib/social/x";
import { isThreadsConfigured, postToThreads } from "@/lib/social/threads";
import { isInstagramConfigured, postToInstagram, postReelToInstagram } from "@/lib/social/instagram";
import { parseCard } from "@/lib/social/card";
import { findRecentDuplicate, recordPost, textHash } from "@/lib/social/store";
import { dueSlots, jstNow, loadQueue, type QueueItem } from "@/lib/social/queue";
import {
  listPendingInstagramReels,
  markInstagramReelPosted,
  markInstagramReelFailed,
  listPendingYoutubeUploads,
  markYoutubeUploaded,
  markYoutubeFailed,
} from "@/lib/social/shorts";
import { isYouTubePostingConfigured, uploadShortToYouTube } from "@/lib/social/youtube";
import { refreshSocialMetrics } from "@/lib/social/metrics";

// 承認済み投稿キューをサーバー側で処理する (自己完結・冪等)。
//   GET /internal/social/run-queue?token=...            現在時刻 (JST) までの枠を投稿
//   GET /internal/social/run-queue?token=...&dry=1      投稿せずに対象を表示
//   GET /internal/social/run-queue?token=...&date=YYYY-MM-DD&slot=夜   日付・枠を指定 (再実行用)
// 何度呼んでも、同じ本文は48時間以内に二重投稿されない (already_posted)。
// 定刻を過ぎて呼ばれても、その時刻までの枠をまとめて投稿する (取りこぼしの自己回復)。
// Vercel Cron からは Authorization: Bearer CRON_SECRET でも呼べる。
export const dynamic = "force-dynamic";
export const maxDuration = 120;

function isCron(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret) && req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!isAdminToken(req) && !isCron(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const p = new URL(req.url).searchParams;
  const now = jstNow();
  const date = p.get("date") ?? now.date;
  const slotParam = p.get("slot");
  const slots = slotParam ? [slotParam] : dueSlots(now.hour);
  const dry = p.get("dry") === "1";

  let queue: Awaited<ReturnType<typeof loadQueue>>;
  try {
    queue = await loadQueue(date);
  } catch (e) {
    return NextResponse.json({ ok: false, stage: "load", date, error: e instanceof Error ? e.message : String(e) }, { status: 502 });
  }

  const targets = queue.items.filter((it) => slots.includes(it.slot));
  const results: { channel: string; slot: string; status: string; external_id?: string | null; error?: string; preview: string }[] = [];

  for (const it of targets) {
    const preview = it.text.slice(0, 40);
    const configured = it.channel === "x" ? isXConfigured() : it.channel === "threads" ? isThreadsConfigured() : isInstagramConfigured();
    if (!configured) {
      results.push({ channel: it.channel, slot: it.slot, status: "not_configured", preview });
      continue;
    }
    const dup = await findRecentDuplicate(it.channel, textHash(it.text)).catch(() => null);
    if (dup) {
      results.push({ channel: it.channel, slot: it.slot, status: "already_posted", external_id: dup.external_id, preview });
      continue;
    }
    if (dry) {
      results.push({ channel: it.channel, slot: it.slot, status: "dry_run", preview });
      continue;
    }
    try {
      let r: { id: string };
      if (it.channel === "x") r = await postToX(it.text);
      else if (it.channel === "threads") r = await postToThreads(it.text);
      else {
        const card = parseCard(it.text);
        if (!card) throw new Error("Instagram: 見出し行がありません");
        r = await postToInstagram(card, new URL(req.url).origin);
      }
      await recordPost({ channel: it.channel, text: it.text, status: "posted", external_id: r.id, source: `run-queue-${date}-${it.slot}` });
      results.push({ channel: it.channel, slot: it.slot, status: "posted", external_id: r.id, preview });
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      await recordPost({ channel: it.channel, text: it.text, status: "failed", error: message, source: `run-queue-${date}-${it.slot}` }).catch(() => undefined);
      results.push({ channel: it.channel, slot: it.slot, status: "failed", error: message, preview });
    }
  }

  const failed = results.filter((r) => r.status === "failed").length;

  // ショート動画のInstagramリール自動投稿。専用の Cron 枠は追加できない (Hobby プランの上限) ため、
  // このキュー処理に相乗りさせ、未投稿ぶんを1本だけ少しずつ消化する (自己回復・多重実行しても安全)。
  const reels: { slug: string; status: string; external_id?: string; error?: string }[] = [];
  if (!dry && isInstagramConfigured()) {
    try {
      const pending = await listPendingInstagramReels(1);
      for (const v of pending) {
        const caption = `${v.title}\n\n${v.description ?? ""}`.trim();
        try {
          const r = await postReelToInstagram({ videoUrl: v.video_url, caption });
          await markInstagramReelPosted(v.slug, r.id);
          reels.push({ slug: v.slug, status: "posted", external_id: r.id });
        } catch (e) {
          const message = e instanceof Error ? e.message : String(e);
          await markInstagramReelFailed(v.slug, message, v.instagram_attempts).catch(() => undefined);
          reels.push({ slug: v.slug, status: "failed", error: message });
        }
      }
    } catch (e) {
      reels.push({ slug: "(query)", status: "failed", error: e instanceof Error ? e.message : String(e) });
    }
  }

  // ショート動画の YouTube (Shorts) 自動投稿。こちらも同じ理由で Cron 枠は増やさず相乗りさせる。
  // 動画の実体を取得してアップロードするため Instagram より時間がかかりやすく、1本ずつ処理する。
  const youtube: { slug: string; status: string; external_id?: string; error?: string }[] = [];
  if (!dry && isYouTubePostingConfigured()) {
    try {
      const pending = await listPendingYoutubeUploads(1);
      for (const v of pending) {
        const description = `${v.description ?? ""}`.trim();
        try {
          const r = await uploadShortToYouTube({ videoUrl: v.video_url, title: v.title, description });
          await markYoutubeUploaded(v.slug, r.id);
          youtube.push({ slug: v.slug, status: "posted", external_id: r.id });
        } catch (e) {
          const message = e instanceof Error ? e.message : String(e);
          await markYoutubeFailed(v.slug, message, v.youtube_attempts).catch(() => undefined);
          youtube.push({ slug: v.slug, status: "failed", error: message });
        }
      }
    } catch (e) {
      youtube.push({ slug: "(query)", status: "failed", error: e instanceof Error ? e.message : String(e) });
    }
  }

  // 夜枠の実行時 (または ?metrics=1) に、投稿の反応も取り込む (Hobby プランは Cron が1日1回×2本までのため相乗り)。
  let metrics: { updated: number; warnings: string[] } | { error: string } | null = null;
  if (!dry && (p.get("metrics") === "1" || slots.includes("夜"))) {
    metrics = await refreshSocialMetrics().catch((e: Error) => ({ error: e.message }));
  }

  return NextResponse.json(
    {
      metrics,
      ok: failed === 0,
      date,
      jstTime: `${String(now.hour).padStart(2, "0")}:${String(now.minute).padStart(2, "0")}`,
      slots,
      docs: queue.docs,
      queued: queue.items.length,
      targeted: targets.length,
      posted: results.filter((r) => r.status === "posted").length,
      alreadyPosted: results.filter((r) => r.status === "already_posted").length,
      failed,
      results,
      reels,
      youtube,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

// QueueItem を参照しておく (型の再エクスポート用)
export type { QueueItem };
