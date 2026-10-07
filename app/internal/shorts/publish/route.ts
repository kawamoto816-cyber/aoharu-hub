import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { getSetting, setSetting } from "@/lib/social/store";
import { jstNow } from "@/lib/social/queue";
import {
  listPendingInstagramReels,
  listPendingYoutubeUploads,
  markInstagramReelFailed,
  markInstagramReelPosted,
  markYoutubeFailed,
  markYoutubeUploaded,
} from "@/lib/social/shorts";
import { isInstagramConfigured, publishReelContainer, reelContainerStatus, startReelContainer } from "@/lib/social/instagram";
import { isYouTubePostingConfigured, uploadShortToYouTube } from "@/lib/social/youtube";

// 生成済みショート動画の YouTube・Instagram リールへの投稿 (1回の実行でそれぞれ最大1本ずつ)。
//   GET /internal/shorts/publish   (Bearer CRON_SECRET または token)
// GitHub Actions が日中に約2時間おきに呼ぶので、たまった動画も時間差で1本ずつ出ていく。
//
// 以前は run-queue (SNS の文章投稿) に相乗りしていたが、リールの取り込み待ちが実行時間をほぼ使い切り、
// 後ろにある YouTube が毎回「時間切れで見送り」になっていた (2026-10-04 以降 YouTube だけ未投稿)。
// この処理では YouTube を先に行い、リールは取り込みを待たずに「作成 → 次回の実行で公開」と分けて進める。
export const dynamic = "force-dynamic";
export const maxDuration = 120;

// YouTube Data API の1日の割り当て (既定 10,000) で、動画アップロードは1回 1,600。上限に余裕を残して1日6本まで。
const YOUTUBE_DAILY_MAX = Number(process.env.YOUTUBE_DAILY_MAX ?? 6);
// リールの取り込みがこれ以上終わらなければ、コンテナを作り直す
const REEL_STALE_MS = 3 * 60 * 60 * 1000;
const REEL_KEY = "instagram_reel_pending";

function isCron(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret) && req.headers.get("authorization") === `Bearer ${secret}`;
}

type Result = { slug: string; status: string; external_id?: string; error?: string };

async function youtubeStep(): Promise<Result> {
  if (!isYouTubePostingConfigured()) return { slug: "-", status: "not_configured" };
  const countKey = `youtube_uploads_${jstNow().date}`;
  const count = Number((await getSetting(countKey).catch(() => null)) ?? 0);
  if (count >= YOUTUBE_DAILY_MAX) return { slug: "-", status: "daily_limit", error: `本日は${count}本投稿済み (上限 ${YOUTUBE_DAILY_MAX})` };
  const [v] = await listPendingYoutubeUploads(1);
  if (!v) return { slug: "-", status: "nothing_pending" };
  try {
    const r = await uploadShortToYouTube({ videoUrl: v.video_url, title: v.title, description: `${v.description ?? ""}`.trim() });
    await markYoutubeUploaded(v.slug, r.id);
    await setSetting(countKey, String(count + 1)).catch(() => undefined);
    return { slug: v.slug, status: "posted", external_id: r.id };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    await markYoutubeFailed(v.slug, message, v.youtube_attempts).catch(() => undefined);
    return { slug: v.slug, status: "failed", error: message };
  }
}

async function reelStep(deadlineAt: number): Promise<Result> {
  if (!isInstagramConfigured()) return { slug: "-", status: "not_configured" };
  const raw = await getSetting(REEL_KEY).catch(() => null);
  let pending: { slug: string; creationId: string; at: number; attempts: number } | null = null;
  try {
    pending = raw ? JSON.parse(raw) : null;
  } catch {
    pending = null;
  }

  // 前回作ったコンテナがあれば、状態を見て公開する
  if (pending?.creationId) {
    try {
      const st = await reelContainerStatus(pending.creationId);
      if (st.code === "FINISHED") {
        const r = await publishReelContainer(pending.creationId);
        await markInstagramReelPosted(pending.slug, r.id);
        await setSetting(REEL_KEY, "").catch(() => undefined);
        return { slug: pending.slug, status: "posted", external_id: r.id };
      }
      if (st.code === "ERROR" || st.code === "EXPIRED") {
        await setSetting(REEL_KEY, "").catch(() => undefined);
        await markInstagramReelFailed(pending.slug, `リール処理エラー (${st.code}) ${st.detail}`, pending.attempts ?? 0).catch(() => undefined);
        return { slug: pending.slug, status: "failed", error: `${st.code} ${st.detail}` };
      }
      if (Date.now() - pending.at < REEL_STALE_MS) return { slug: pending.slug, status: "processing", error: `${st.code} ${st.detail}`.trim() };
      await setSetting(REEL_KEY, "").catch(() => undefined); // 長すぎるので作り直す
    } catch (e) {
      return { slug: pending.slug, status: "check_failed", error: e instanceof Error ? e.message : String(e) };
    }
  }

  // 新しいコンテナを作り、時間が残っていれば少しだけ待って公開する
  const [v] = await listPendingInstagramReels(1);
  if (!v) return { slug: "-", status: "nothing_pending" };
  try {
    const creationId = await startReelContainer({ videoUrl: v.video_url, caption: `${v.title}\n\n${v.description ?? ""}`.trim() });
    await setSetting(REEL_KEY, JSON.stringify({ slug: v.slug, creationId, at: Date.now(), attempts: v.instagram_attempts }));
    while (Date.now() + 8_000 < deadlineAt) {
      await new Promise((r) => setTimeout(r, 6_000));
      const st = await reelContainerStatus(creationId);
      if (st.code === "FINISHED") {
        const r = await publishReelContainer(creationId);
        await markInstagramReelPosted(v.slug, r.id);
        await setSetting(REEL_KEY, "").catch(() => undefined);
        return { slug: v.slug, status: "posted", external_id: r.id };
      }
      if (st.code === "ERROR" || st.code === "EXPIRED") break;
    }
    return { slug: v.slug, status: "processing", error: "取り込み中。次回の実行で公開します" };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    await markInstagramReelFailed(v.slug, message, v.instagram_attempts).catch(() => undefined);
    return { slug: v.slug, status: "failed", error: message };
  }
}

export async function GET(req: Request) {
  if (!isAdminToken(req) && !isCron(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const startedAt = Date.now();
  const youtube = await youtubeStep().catch((e: Error) => ({ slug: "(error)", status: "failed", error: e.message }));
  // リールは残り時間の範囲で (関数の上限 120 秒から余裕を引く)
  const reel = await reelStep(startedAt + 100_000).catch((e: Error) => ({ slug: "(error)", status: "failed", error: e.message }));
  const ok = youtube.status !== "failed" && reel.status !== "failed";
  return NextResponse.json({ ok, jst: jstNow(), youtube, reel }, { headers: { "Cache-Control": "no-store" } });
}
