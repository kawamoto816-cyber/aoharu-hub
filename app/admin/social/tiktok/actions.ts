"use server";

import { revalidatePath } from "next/cache";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import type { ActionState } from "@/lib/applications/action-state";
import { getShortsVideo, markTiktokUploaded, recordTiktokError } from "@/lib/social/shorts";
import { fetchPostStatus, getAccessToken, postVideoFileUpload, queryCreatorInfo } from "@/lib/social/tiktok";

// /admin/social/tiktok の「TikTokに投稿」ボタン。社内アカウント (@bluespring.co.jp) だけが実行できる。
// 画面で人が選んだ公開範囲・許可設定・商用コンテンツの表示を、そのまま TikTok に渡す (勝手に既定値を入れない)。
export async function postToTiktokAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await isAdminUser();
  if (!admin.ok) return { ok: false, message: "権限がありません" };

  const slug = String(formData.get("slug") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const privacyLevel = String(formData.get("privacy_level") ?? "");
  const allowComment = formData.get("allow_comment") === "on";
  const allowDuet = formData.get("allow_duet") === "on";
  const allowStitch = formData.get("allow_stitch") === "on";
  const commercial = formData.get("commercial") === "on";
  const brandOrganic = commercial && formData.get("brand_organic") === "on";
  const brandedContent = commercial && formData.get("branded_content") === "on";

  const video = slug ? await getShortsVideo(slug) : null;
  if (!video) return { ok: false, message: "動画が見つかりません" };
  if (video.tiktok_posted_at) return { ok: false, message: "この動画はすでに TikTok に投稿済みです" };
  if (!title) return { ok: false, message: "キャプションを入力してください" };
  if (!privacyLevel) return { ok: false, message: "公開範囲を選んでください" };
  if (commercial && !brandOrganic && !brandedContent) {
    return { ok: false, message: "商用コンテンツをオンにした場合は、「自分のブランド」か「ブランドコンテンツ」のどちらかを選んでください" };
  }
  if (brandedContent && privacyLevel === "SELF_ONLY") {
    return { ok: false, message: "ブランドコンテンツは「自分だけ」の公開範囲では投稿できません" };
  }

  try {
    const accessToken = await getAccessToken();
    // 投稿の直前にもう一度クリエイター情報を取り、選ばれた公開範囲と許可設定が今も有効か確かめる
    const info = await queryCreatorInfo(accessToken);
    if (!info.privacyLevelOptions.includes(privacyLevel)) {
      return { ok: false, message: "選んだ公開範囲は、このアカウントでは今は使えません。ページを開き直してください" };
    }
    if (info.maxVideoPostDurationSec && video.duration_sec && video.duration_sec > info.maxVideoPostDurationSec) {
      return { ok: false, message: `動画が長すぎます (${video.duration_sec}秒。このアカウントの上限は${info.maxVideoPostDurationSec}秒)` };
    }
    const { publishId } = await postVideoFileUpload(accessToken, video.video_url, {
      title,
      privacyLevel,
      allowComment: allowComment && !info.commentDisabled,
      allowDuet: allowDuet && !info.duetDisabled,
      allowStitch: allowStitch && !info.stitchDisabled,
      brandOrganic,
      brandedContent,
    });
    await markTiktokUploaded(slug, publishId);
    console.log(`[tiktok] posted ${slug} by ${admin.email}: publish_id=${publishId} privacy=${privacyLevel}`);
    revalidatePath("/admin/social/tiktok");
    revalidatePath("/admin/social");
    return {
      ok: true,
      message: "TikTok に送りました。TikTok 側の処理に数分かかることがあります。反映されるまで少し待ってから、アカウントを確認してください。",
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    await recordTiktokError(slug, message).catch(() => undefined);
    return { ok: false, message: `投稿できませんでした: ${message}` };
  }
}

// 投稿後の処理状況 (TikTok 側の publish status) を確認するボタン。
export async function checkTiktokStatusAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await isAdminUser();
  if (!admin.ok) return { ok: false, message: "権限がありません" };
  const publishId = String(formData.get("publish_id") ?? "");
  if (!publishId) return { ok: false, message: "投稿IDがありません" };
  try {
    const json = (await fetchPostStatus(publishId, await getAccessToken())) as {
      data?: { status?: string; fail_reason?: string };
    };
    const status = json.data?.status ?? "不明";
    const label: Record<string, string> = {
      PROCESSING_UPLOAD: "アップロード処理中",
      PROCESSING_DOWNLOAD: "取り込み中",
      SEND_TO_USER_INBOX: "下書きとして届きました",
      PUBLISH_COMPLETE: "公開が完了しました",
      FAILED: `失敗しました (${json.data?.fail_reason ?? "理由不明"})`,
    };
    return { ok: status !== "FAILED", message: `TikTok の状態: ${label[status] ?? status}` };
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : String(e) };
  }
}
