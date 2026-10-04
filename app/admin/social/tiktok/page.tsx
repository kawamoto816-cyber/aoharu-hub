import type { Metadata } from "next";
import Link from "next/link";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import { getShortsVideo, listTiktokCandidates, listShortsVideos } from "@/lib/social/shorts";
import { getAccessToken, isTikTokPostingConfigured, queryCreatorInfo, type TikTokCreatorInfo } from "@/lib/social/tiktok";
import { PostForm } from "./PostForm";
import { StatusCheck } from "./StatusCheck";

// /admin/social/tiktok: 生成済みのショート動画を、人が1本ずつ確認して TikTok に投稿する画面。
// TikTok の Content Sharing Guidelines に合わせ、開くたびに投稿先アカウントの最新情報 (creator_info) を取得して表示し、
// 公開範囲・許可設定・商用コンテンツの表示はこの画面で人が選ぶ。社内アカウント (@bluespring.co.jp) だけが使える。

export const metadata: Metadata = {
  title: "TikTok に投稿｜アオハルOS",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function jst(iso: string) {
  const d = new Date(new Date(iso).getTime() + 9 * 3600 * 1000);
  return `${d.getUTCMonth() + 1}/${d.getUTCDate()} ${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}`;
}

export default async function TiktokPostPage({ searchParams }: { searchParams: Promise<{ slug?: string }> }) {
  const admin = await isAdminUser();
  if (!admin.ok) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-xl font-bold text-slate-900">TikTok に投稿</h1>
        <p className="mt-3 text-sm text-slate-500">社内アカウント（@bluespring.co.jp）でログインすると表示されます。</p>
      </main>
    );
  }

  const { slug } = await searchParams;
  let candidates: Awaited<ReturnType<typeof listTiktokCandidates>> = [];
  let posted: Awaited<ReturnType<typeof listShortsVideos>> = [];
  let loadError: string | null = null;
  try {
    candidates = await listTiktokCandidates(20);
    posted = (await listShortsVideos(30)).filter((v) => v.tiktok_posted_at).slice(0, 5);
  } catch (e) {
    loadError = e instanceof Error ? e.message : String(e);
  }

  const selected = slug ? await getShortsVideo(slug).catch(() => null) : null;

  // 投稿先アカウントの最新情報。動画を選んだときだけ取りに行く (ページを開くたびに最新を表示する)。
  let creator: TikTokCreatorInfo | null = null;
  let creatorError: string | null = null;
  if (selected && !selected.tiktok_posted_at) {
    if (!isTikTokPostingConfigured()) {
      creatorError = "TikTok の連携が設定されていません (TIKTOK_CLIENT_KEY / TIKTOK_CLIENT_SECRET / TIKTOK_REFRESH_TOKEN)";
    } else {
      try {
        creator = await queryCreatorInfo(await getAccessToken());
      } catch (e) {
        creatorError = e instanceof Error ? e.message : String(e);
      }
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link href="/admin/social" className="text-xs font-bold text-indigo-600 underline underline-offset-2">
        ← 配信ダッシュボード
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">TikTok に投稿 (Post to TikTok)</h1>
      <p className="mt-1 text-sm text-slate-500">
        生成済みのショート動画を確認し、公開範囲などを選んで1本ずつ投稿します。YouTube・Instagram は自動投稿のままです。
      </p>
      {loadError && <p className="mt-4 text-sm font-bold text-rose-600">読み込めませんでした: {loadError}</p>}

      <div className="mt-8 grid gap-8 md:grid-cols-[280px_1fr]">
        <section>
          <h2 className="text-sm font-bold text-slate-700">未投稿の動画 ({candidates.length})</h2>
          <ul className="mt-3 space-y-2">
            {candidates.map((v) => (
              <li key={v.slug}>
                <Link
                  href={`/admin/social/tiktok?slug=${encodeURIComponent(v.slug)}`}
                  className={`block rounded-xl border p-3 text-sm ${v.slug === slug ? "border-slate-900 bg-slate-50" : "border-slate-200 bg-white"}`}
                >
                  <span className="font-bold text-slate-900">{v.title}</span>
                  <span className="mt-1 block text-[11px] text-slate-500">
                    {jst(v.rendered_at)} 生成{v.duration_sec ? `・${Math.round(v.duration_sec)}秒` : ""}
                  </span>
                </Link>
              </li>
            ))}
            {!candidates.length && !loadError && <li className="text-sm text-slate-400">未投稿の動画はありません</li>}
          </ul>

          {posted.length > 0 && (
            <>
              <h2 className="mt-8 text-sm font-bold text-slate-700">最近の投稿</h2>
              <ul className="mt-3 space-y-3">
                {posted.map((v) => (
                  <li key={v.slug} className="rounded-xl border border-slate-200 bg-white p-3 text-sm">
                    <p className="font-bold text-slate-900">{v.title}</p>
                    <p className="mt-1 text-[11px] text-slate-500">{v.tiktok_posted_at ? `${jst(v.tiktok_posted_at)} 送信` : ""}</p>
                    {v.tiktok_publish_id && (
                      <div className="mt-2">
                        <StatusCheck publishId={v.tiktok_publish_id} />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          {!selected && <p className="text-sm text-slate-500">左の一覧から投稿する動画を選んでください。</p>}

          {selected?.tiktok_posted_at && (
            <p className="text-sm font-bold text-emerald-600">この動画は {jst(selected.tiktok_posted_at)} に TikTok に送信済みです。</p>
          )}

          {selected && !selected.tiktok_posted_at && (
            <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
              <div>
                <p className="text-xs font-bold text-slate-600">プレビュー (Preview)</p>
                <video src={selected.video_url} controls playsInline className="mt-1 w-full rounded-xl bg-black" />
              </div>
              <div>
                {creatorError && (
                  <p className="mb-4 rounded-xl bg-rose-50 p-3 text-sm font-bold text-rose-700">
                    投稿先アカウントの情報を取得できませんでした。今は投稿できません。
                    <span className="mt-1 block text-xs font-normal">{creatorError}</span>
                  </p>
                )}
                {creator && (
                  <>
                    <div className="mb-5 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                      {creator.avatarUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={creator.avatarUrl} alt="" className="h-10 w-10 rounded-full" />
                      )}
                      <div className="text-sm">
                        <p className="text-[11px] text-slate-500">投稿先のアカウント (Posting to)</p>
                        <p className="font-bold text-slate-900">
                          {creator.nickname} {creator.username && <span className="font-normal text-slate-500">@{creator.username}</span>}
                        </p>
                      </div>
                    </div>
                    <PostForm
                      slug={selected.slug}
                      defaultTitle={`${selected.title}\n\n${selected.description ?? ""}`.trim().slice(0, 2200)}
                      privacyOptions={creator.privacyLevelOptions}
                      commentDisabled={creator.commentDisabled}
                      duetDisabled={creator.duetDisabled}
                      stitchDisabled={creator.stitchDisabled}
                      tooLong={Boolean(
                        creator.maxVideoPostDurationSec && selected.duration_sec && selected.duration_sec > creator.maxVideoPostDurationSec,
                      )}
                    />
                  </>
                )}
                {selected.tiktok_error && (
                  <p className="mt-4 text-[11px] text-slate-400">前回のエラー: {selected.tiktok_error}</p>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
