"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { EMPTY_ACTION_STATE } from "@/lib/applications/action-state";
import { postToTiktokAction } from "./actions";

// TikTok の Content Sharing Guidelines に沿った投稿フォーム。
//   - 公開範囲は creator_info の選択肢から人が選ぶ (初期値なし)
//   - コメント・デュエット・ステッチの許可は初期状態ですべてオフ。アカウント側で無効なものは選べない
//   - 商用コンテンツの表示は初期状態でオフ。オンにしたら「自分のブランド」「ブランドコンテンツ」の少なくとも1つを選ぶ
//   - ブランドコンテンツは「自分だけ」に設定できない
//   - 投稿ボタンの近くに、音楽利用の確認 (とブランドコンテンツのポリシー) への同意文を出す
// 審査担当者が読めるよう、項目名には英語を併記している。

const PRIVACY_LABEL: Record<string, string> = {
  PUBLIC_TO_EVERYONE: "全員 (Everyone)",
  MUTUAL_FOLLOW_FRIENDS: "相互フォローの友達 (Friends)",
  FOLLOWER_OF_CREATOR: "フォロワー (Followers)",
  SELF_ONLY: "自分だけ (Only me)",
};

const MUSIC_URL = "https://www.tiktok.com/legal/page/global/music-usage-confirmation/en";
const BC_POLICY_URL = "https://www.tiktok.com/legal/page/global/bc-policy/en";

function PostButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
    >
      {pending ? "TikTok に送信中… (Posting…)" : "TikTok に投稿 (Post to TikTok)"}
    </button>
  );
}

export function PostForm(props: {
  slug: string;
  defaultTitle: string;
  privacyOptions: string[];
  commentDisabled: boolean;
  duetDisabled: boolean;
  stitchDisabled: boolean;
  tooLong: boolean;
}) {
  const [state, formAction] = useActionState(postToTiktokAction, EMPTY_ACTION_STATE);
  const [title, setTitle] = useState(props.defaultTitle);
  const [privacy, setPrivacy] = useState("");
  const [commercial, setCommercial] = useState(false);
  const [brandOrganic, setBrandOrganic] = useState(false);
  const [brandedContent, setBrandedContent] = useState(false);

  const commercialIncomplete = commercial && !brandOrganic && !brandedContent;
  const privateWithBranded = brandedContent && privacy === "SELF_ONLY";
  const canPost = !props.tooLong && !!title.trim() && !!privacy && !commercialIncomplete && !privateWithBranded && !state.ok;

  let label: string | null = null;
  if (commercial && brandedContent) label = "この動画には「Paid partnership (有償の提携)」のラベルが付きます";
  else if (commercial && brandOrganic) label = "この動画には「Promotional content (プロモーション)」のラベルが付きます";

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="slug" value={props.slug} />

      <div>
        <label htmlFor="title" className="text-xs font-bold text-slate-600">
          キャプション (Title)
        </label>
        <textarea
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={2200}
          rows={5}
          className="mt-1 w-full rounded-xl border border-slate-300 p-3 text-sm"
        />
        <p className="text-right text-[11px] text-slate-400">{title.length} / 2200</p>
      </div>

      <div>
        <label htmlFor="privacy_level" className="text-xs font-bold text-slate-600">
          公開範囲 (Who can view this video)
        </label>
        <select
          id="privacy_level"
          name="privacy_level"
          value={privacy}
          onChange={(e) => setPrivacy(e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-300 p-3 text-sm"
        >
          <option value="" disabled>
            選択してください (Select)
          </option>
          {props.privacyOptions.map((o) => (
            <option key={o} value={o} disabled={o === "SELF_ONLY" && brandedContent}>
              {PRIVACY_LABEL[o] ?? o}
              {o === "SELF_ONLY" && brandedContent ? " — ブランドコンテンツは非公開にできません (Branded content visibility cannot be set to private)" : ""}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className="text-xs font-bold text-slate-600">視聴者に許可すること (Allow users to)</legend>
        <div className="mt-2 flex flex-wrap gap-4 text-sm">
          {[
            { name: "allow_comment", label: "コメント (Comment)", off: props.commentDisabled },
            { name: "allow_duet", label: "デュエット (Duet)", off: props.duetDisabled },
            { name: "allow_stitch", label: "ステッチ (Stitch)", off: props.stitchDisabled },
          ].map((c) => (
            <label key={c.name} className={`flex items-center gap-2 ${c.off ? "text-slate-300" : ""}`}>
              <input type="checkbox" name={c.name} disabled={c.off} />
              {c.label}
              {c.off && <span className="text-[11px]">（アカウントの設定で無効）</span>}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="rounded-xl border border-slate-200 p-4">
        <label className="flex items-center justify-between gap-3 text-sm font-bold">
          <span>
            商用コンテンツの表示 (Disclose video content)
            <span className="block text-[11px] font-normal text-slate-500">
              自分や第三者の商品・サービスを宣伝する動画の場合はオンにします (Turn on if this video promotes yourself, a third party, or both)
            </span>
          </span>
          <input
            type="checkbox"
            name="commercial"
            checked={commercial}
            onChange={(e) => {
              setCommercial(e.target.checked);
              if (!e.target.checked) {
                setBrandOrganic(false);
                setBrandedContent(false);
              }
            }}
          />
        </label>
        {commercial && (
          <div className="mt-3 space-y-2 text-sm">
            <label className="flex items-start gap-2">
              <input type="checkbox" name="brand_organic" checked={brandOrganic} onChange={(e) => setBrandOrganic(e.target.checked)} />
              <span>
                自分のブランド (Your brand)
                <span className="block text-[11px] text-slate-500">自分や自社の商品・サービスの宣伝</span>
              </span>
            </label>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                name="branded_content"
                checked={brandedContent}
                onChange={(e) => {
                  setBrandedContent(e.target.checked);
                  if (e.target.checked && privacy === "SELF_ONLY") setPrivacy("");
                }}
              />
              <span>
                ブランドコンテンツ (Branded content)
                <span className="block text-[11px] text-slate-500">第三者のブランドとの有償の提携</span>
              </span>
            </label>
            {commercialIncomplete && (
              <p className="text-xs font-bold text-amber-600">
                「自分のブランド」か「ブランドコンテンツ」を選んでください (You need to indicate if your content promotes yourself, a third
                party, or both)
              </p>
            )}
            {label && <p className="text-xs text-slate-600">{label}</p>}
          </div>
        )}
      </fieldset>

      <p className="text-xs text-slate-600">
        {brandedContent ? (
          <>
            投稿すると、TikTok の{" "}
            <a href={BC_POLICY_URL} target="_blank" rel="noopener noreferrer" className="underline">
              Branded Content Policy
            </a>{" "}
            と{" "}
            <a href={MUSIC_URL} target="_blank" rel="noopener noreferrer" className="underline">
              Music Usage Confirmation
            </a>{" "}
            に同意したことになります。(By posting, you agree to TikTok&apos;s Branded Content Policy and Music Usage Confirmation.)
          </>
        ) : (
          <>
            投稿すると、TikTok の{" "}
            <a href={MUSIC_URL} target="_blank" rel="noopener noreferrer" className="underline">
              Music Usage Confirmation
            </a>{" "}
            に同意したことになります。(By posting, you agree to TikTok&apos;s Music Usage Confirmation.)
          </>
        )}
      </p>

      {props.tooLong && <p className="text-xs font-bold text-rose-600">この動画はアカウントの投稿できる長さを超えています</p>}
      <PostButton disabled={!canPost} />

      {state.message && (
        <p aria-live="polite" className={`text-sm font-bold ${state.ok ? "text-emerald-600" : "text-rose-600"}`}>
          {state.ok ? "✓ " : ""}
          {state.message}
        </p>
      )}
    </form>
  );
}
