"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { ensureShareToken, regenerateShareToken } from "@/lib/parent-share/store";
import type { ActionState } from "@/lib/applications/action-state";

// マイページの「保護者と共有」から呼ばれるサーバーアクション。

async function requireUser(): Promise<string> {
  const { userId } = await auth();
  if (!userId) throw new Error("UNAUTHENTICATED");
  return userId;
}

function failure(e: unknown): ActionState {
  const message = e instanceof Error ? e.message : String(e);
  if (message === "UNAUTHENTICATED") return { ok: false, message: "ログインし直してください。" };
  console.error("[parent-share] action failed:", message);
  return { ok: false, message: "処理できませんでした。少し時間をおいて、もう一度お試しください。" };
}

export async function createParentShareLinkAction(_prev: ActionState, _formData: FormData): Promise<ActionState> {
  try {
    await ensureShareToken(await requireUser());
    revalidatePath("/");
    return { ok: true, message: "共有リンクを作成しました。" };
  } catch (e) {
    return failure(e);
  }
}

export async function regenerateParentShareLinkAction(_prev: ActionState, _formData: FormData): Promise<ActionState> {
  try {
    await regenerateShareToken(await requireUser());
    revalidatePath("/");
    return { ok: true, message: "新しいリンクに切り替えました。前のリンクはもう開けません。" };
  } catch (e) {
    return failure(e);
  }
}
