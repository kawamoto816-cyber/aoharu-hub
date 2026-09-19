"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import {
  bumpDraft,
  createApplication,
  deleteApplication,
  setDocuments,
  updateApplication,
} from "@/lib/applications/store";
import { DOC_KINDS, isAdmissionType, isDocKind, type DocKind } from "@/lib/applications/kinds";
import type { ActionState } from "@/lib/applications/action-state";

// マイページの出願案件フォームから呼ばれるサーバーアクション。
// Server Function は直接POSTでも叩けるため、どの関数でも必ず先にログイン確認と
// 持ち主確認（store 側の assertOwner）を行う。
// 画面に結果を出すため、成功/失敗を ActionState として返す（例外で落とさない）。

async function requireUser(): Promise<string> {
  const { userId } = await auth();
  if (!userId) throw new Error("UNAUTHENTICATED");
  return userId;
}

function text(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

/** YYYY-MM-DD 以外は受け付けない（空文字は「未入力」として null にする） */
function dateOrNull(formData: FormData, key: string): string | null {
  const v = text(formData, key);
  return /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null;
}

/** 募集要項のURL。http(s) 以外は保存しない */
function urlOrNull(formData: FormData, key: string): string | null {
  const v = text(formData, key).slice(0, 500);
  return /^https?:\/\/\S+$/.test(v) ? v : null;
}

function admissionOrNull(formData: FormData, key: string): string | null {
  const v = text(formData, key);
  return isAdmissionType(v) ? v : null;
}

/** チェックされた書類の種類だけを拾う */
function docKinds(formData: FormData): DocKind[] {
  const picked = formData.getAll("kinds").filter((v): v is string => typeof v === "string");
  return DOC_KINDS.filter((k) => picked.includes(k) && isDocKind(k));
}

function failure(e: unknown): ActionState {
  const message = e instanceof Error ? e.message : String(e);
  if (message === "UNAUTHENTICATED") return { ok: false, message: "ログインし直してください。" };
  if (message === "FORBIDDEN" || message === "NOT_FOUND") {
    return { ok: false, message: "この案件は見つかりませんでした。画面を再読み込みしてください。" };
  }
  console.error("[applications] action failed:", message);
  return { ok: false, message: "保存できませんでした。少し時間をおいて、もう一度お試しください。" };
}

export async function createApplicationAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const userId = await requireUser();
    const schoolName = text(formData, "schoolName").slice(0, 100);
    if (!schoolName) return { ok: false, message: "大学・学校名を入力してください。" };
    await createApplication(userId, {
      schoolName,
      faculty: text(formData, "faculty").slice(0, 100) || null,
      admissionType: admissionOrNull(formData, "admissionType"),
      deadline: dateOrNull(formData, "deadline"),
      guidelinesUrl: urlOrNull(formData, "guidelinesUrl"),
    });
    revalidatePath("/");
    return { ok: true, message: `${schoolName} を登録しました。` };
  } catch (e) {
    return failure(e);
  }
}

export async function updateApplicationAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const userId = await requireUser();
    const id = text(formData, "applicationId");
    if (!id) return { ok: false, message: "案件が特定できませんでした。" };
    await updateApplication(userId, id, {
      schoolName: text(formData, "schoolName").slice(0, 100) || undefined,
      faculty: text(formData, "faculty").slice(0, 100) || null,
      admissionType: admissionOrNull(formData, "admissionType"),
      deadline: dateOrNull(formData, "deadline"),
      guidelinesUrl: urlOrNull(formData, "guidelinesUrl"),
    });
    revalidatePath("/");
    return { ok: true, message: "保存しました。" };
  } catch (e) {
    return failure(e);
  }
}

/** その入試で実際に課される書類を確定する */
export async function setDocumentsAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const userId = await requireUser();
    const id = text(formData, "applicationId");
    if (!id) return { ok: false, message: "案件が特定できませんでした。" };
    const kinds = docKinds(formData);
    await setDocuments(userId, id, kinds);
    revalidatePath("/");
    return {
      ok: true,
      message:
        kinds.length === 0
          ? "対策なしで保存しました。1つ以上選ぶと「次にやること」が出ます。"
          : `保存しました（${kinds.length}件）。`,
    };
  } catch (e) {
    return failure(e);
  }
}

export async function deleteApplicationAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const userId = await requireUser();
    const id = text(formData, "applicationId");
    if (!id) return { ok: false, message: "案件が特定できませんでした。" };
    await deleteApplication(userId, id);
    revalidatePath("/");
    return { ok: true, message: "削除しました。" };
  } catch (e) {
    return failure(e);
  }
}

/** 稿数を1つ進める / 戻す。画面上で数字が変わるので、メッセージは出さない */
export async function bumpDraftAction(formData: FormData): Promise<void> {
  const userId = await requireUser();
  const documentId = text(formData, "documentId");
  if (!documentId) return;
  const delta = text(formData, "delta") === "-1" ? -1 : 1;
  await bumpDraft(userId, documentId, delta);
  revalidatePath("/");
}
