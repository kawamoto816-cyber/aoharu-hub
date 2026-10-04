"use client";

import { ActionForm, SubmitButton } from "@/components/ActionForm";
import { checkTiktokStatusAction } from "./actions";

// 投稿済み動画の TikTok 側の処理状況を確かめるボタン
export function StatusCheck({ publishId }: { publishId: string }) {
  return (
    <ActionForm action={checkTiktokStatusAction}>
      <input type="hidden" name="publish_id" value={publishId} />
      <SubmitButton pendingLabel="確認中…" className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold text-slate-700">
        TikTok での状態を確認
      </SubmitButton>
    </ActionForm>
  );
}
