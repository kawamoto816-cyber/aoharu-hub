import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { isXConfigured, postToX } from "@/lib/social/x";
import { isThreadsConfigured, postToThreads } from "@/lib/social/threads";
import { findRecentDuplicate, recordPost, textHash } from "@/lib/social/store";
import { dueSlots, jstNow, loadQueue, type QueueItem } from "@/lib/social/queue";

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
    const configured = it.channel === "x" ? isXConfigured() : isThreadsConfigured();
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
      const r = it.channel === "x" ? await postToX(it.text) : await postToThreads(it.text);
      await recordPost({ channel: it.channel, text: it.text, status: "posted", external_id: r.id, source: `run-queue-${date}-${it.slot}` });
      results.push({ channel: it.channel, slot: it.slot, status: "posted", external_id: r.id, preview });
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      await recordPost({ channel: it.channel, text: it.text, status: "failed", error: message, source: `run-queue-${date}-${it.slot}` }).catch(() => undefined);
      results.push({ channel: it.channel, slot: it.slot, status: "failed", error: message, preview });
    }
  }

  const failed = results.filter((r) => r.status === "failed").length;
  return NextResponse.json(
    {
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
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

// QueueItem を参照しておく (型の再エクスポート用)
export type { QueueItem };
