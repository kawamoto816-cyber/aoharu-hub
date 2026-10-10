import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { getSetting, setSetting } from "@/lib/social/store";
import { jstNow } from "@/lib/social/queue";
import {
  findOriginalOf,
  listPendingInstagramReels,
  listPendingYoutubeUploads,
  listShortsVideos,
  markDuplicate,
  markInstagramReelFailed,
  markInstagramReelPosted,
  markYoutubeFailed,
  markYoutubeUploaded,
} from "@/lib/social/shorts";
import { clearAlert, raiseAlert } from "@/lib/social/alert";
import { isInstagramConfigured, publishReelContainer, reelContainerStatus, startReelContainer } from "@/lib/social/instagram";
import { isYouTubePostingConfigured, uploadShortToYouTube } from "@/lib/social/youtube";

// 生成済みショート動画の YouTube・Instagram リールへの投稿 (1回の実行でそれぞれ最大1本ずつ)。
//   GET /internal/shorts/publish   (Bearer CRON_SECRET または token)
// GitHub Actions が日中に1時間おきに呼ぶ。GitHub の定時実行は数時間遅れたり抜けたりするので、
// 呼ばれる回数ではなく、この処理の中で「投稿してよい時間帯 (8〜21時台)」と「前の投稿から90分以上」を守って
// 時間差で1本ずつ出す。夜中に遅れて呼ばれた場合は何もしない。
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
// 投稿してよい時間帯 (日本時間・時)
const OPEN_HOUR = 8;
const CLOSE_HOUR = 21; // 21:59 まで
// 同じプラットフォームの投稿どうしの最短間隔
const MIN_GAP_MS = 90 * 60 * 1000;

async function tooSoon(key: string): Promise<boolean> {
  const last = await getSetting(key).catch(() => null);
  return Boolean(last) && Date.now() - new Date(last as string).getTime() < MIN_GAP_MS;
}

/** 重複 (同じ台本の作り直し) を飛ばして、投稿すべき最初の1本を選ぶ */
async function pickFirst<T extends { slug: string }>(list: T[], platform: "youtube" | "instagram"): Promise<T | null> {
  for (const v of list) {
    const original = await findOriginalOf(v.slug).catch(() => null);
    if (original) {
      await markDuplicate(v.slug, platform, original).catch(() => undefined);
      continue;
    }
    return v;
  }
  return null;
}

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
  if (await tooSoon("youtube_last_upload_at")) return { slug: "-", status: "spacing", error: "前の投稿から90分たっていません" };
  const v = await pickFirst(await listPendingYoutubeUploads(25), "youtube");
  if (!v) return { slug: "-", status: "nothing_pending" };
  try {
    const r = await uploadShortToYouTube({ videoUrl: v.video_url, title: v.title, description: `${v.description ?? ""}`.trim() });
    await markYoutubeUploaded(v.slug, r.id);
    await setSetting(countKey, String(count + 1)).catch(() => undefined);
    await setSetting("youtube_last_upload_at", new Date().toISOString()).catch(() => undefined);
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
        await setSetting("instagram_reel_last_at", new Date().toISOString()).catch(() => undefined);
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
  if (await tooSoon("instagram_reel_last_at")) return { slug: "-", status: "spacing", error: "前の投稿から90分たっていません" };
  const v = await pickFirst(await listPendingInstagramReels(25), "instagram");
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
        await setSetting("instagram_reel_last_at", new Date().toISOString()).catch(() => undefined);
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
  const now = jstNow();
  const force = new URL(req.url).searchParams.get("force") === "1";

  // 生成が止まっていないか (直近36時間に1本も生成されていなければ知らせる)
  const latest = await listShortsVideos(1).catch(() => []);
  const lastRendered = latest[0]?.rendered_at ? new Date(latest[0].rendered_at as string).getTime() : 0;
  if (lastRendered && Date.now() - lastRendered > 36 * 3600 * 1000) {
    await raiseAlert(
      "shorts_render_stalled",
      "ショート動画が36時間以上生成されていません",
      `最後に生成された動画: ${latest[0]?.title ?? "-"}（${latest[0]?.rendered_at}）`,
      "GitHub の Actions → shorts-auto の実行結果を確認してください。承認済み投稿に [shorts] の台本が入っていない日が続いている可能性もあります。Claude に「ショート動画の生成を調べて」と依頼してください。",
    );
  } else if (lastRendered) await clearAlert("shorts_render_stalled");

  if (!force && (now.hour < OPEN_HOUR || now.hour > CLOSE_HOUR)) {
    return NextResponse.json({ ok: true, jst: now, skipped: `投稿時間外 (${OPEN_HOUR}〜${CLOSE_HOUR}時台のみ投稿)` }, { headers: { "Cache-Control": "no-store" } });
  }

  const youtube = await youtubeStep().catch((e: Error) => ({ slug: "(error)", status: "failed", error: e.message }));
  // リールは残り時間の範囲で (関数の上限 120 秒から余裕を引く)
  const reel = await reelStep(startedAt + 100_000).catch((e: Error) => ({ slug: "(error)", status: "failed", error: e.message }));

  for (const [name, r] of [["YouTube", youtube], ["Instagram リール", reel]] as const) {
    const key = name === "YouTube" ? "shorts_youtube_failed" : "shorts_reel_failed";
    if (r.status === "failed") {
      await raiseAlert(
        key,
        `ショート動画の ${name} 投稿が失敗しました`,
        `動画: ${r.slug}\nエラー: ${r.error ?? "(不明)"}`,
        /401|403|token|invalid_grant|認証/i.test(r.error ?? "")
          ? `${name} の連携（トークン）が切れている可能性があります。Claude に「${name} を再連携して」と依頼してください。`
          : "次の実行で自動的に別の動画から再開します (同じ動画は3回失敗すると見送ります)。続く場合は Claude に調査を依頼してください。",
      );
    } else if (r.status === "posted") await clearAlert(key);
  }

  const ok = youtube.status !== "failed" && reel.status !== "failed";
  return NextResponse.json({ ok, jst: now, youtube, reel }, { headers: { "Cache-Control": "no-store" } });
}
