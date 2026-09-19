"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { EMPTY_ACTION_STATE, type ActionState } from "@/lib/applications/action-state";

// フォームの「押したことが分かる」「保存できたことが分かる」を担当する。
// 押した瞬間はボタンが「保存中…」になり、完了するとフォームの末尾に結果が出る。
// JSが無くても、フォームの送信自体は今までどおり動く（メッセージが出ないだけ）。

export function SubmitButton({
  children,
  className,
  pendingLabel = "保存中…",
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  pendingLabel?: string;
  ariaLabel?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} aria-label={ariaLabel} className={`${className ?? ""} disabled:opacity-60`}>
      {pending ? pendingLabel : children}
    </button>
  );
}

export function ActionForm({
  action,
  className,
  children,
}: {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  className?: string;
  children: React.ReactNode;
}) {
  const [state, formAction] = useActionState(action, EMPTY_ACTION_STATE);
  return (
    <form action={formAction} className={className}>
      {children}
      {state.message && (
        <p
          aria-live="polite"
          className={`mt-2 text-xs font-bold ${state.ok ? "text-emerald-600" : "text-rose-600"}`}
        >
          {state.ok ? "✓ " : ""}
          {state.message}
        </p>
      )}
    </form>
  );
}
