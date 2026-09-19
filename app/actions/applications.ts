"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { bumpDraft, createApplication, deleteApplication, updateApplication } from "@/lib/applications/store";

// マイページの出願案件フォームから呼ばれるサーバーアクション。
// Server Function は直接POSTでも叩けるため、どの関数でも必ず先にログイン確認と
// 持ち主確認（store 側の assertOwner）を行う。

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

export async function createApplicationAction(formData: FormData): Promise<void> {
  const userId = await requireUser();
  const schoolName = text(formData, "schoolName").slice(0, 100);
  if (!schoolName) return; // 大学名だけは必須。空なら何もせず戻す
  await createApplication(userId, {
    schoolName,
    faculty: text(formData, "faculty").slice(0, 100) || null,
    admissionType: text(formData, "admissionType").slice(0, 50) || null,
    deadline: dateOrNull(formData, "deadline"),
  });
  revalidatePath("/");
}

export async function updateApplicationAction(formData: FormData): Promise<void> {
  const userId = await requireUser();
  const id = text(formData, "applicationId");
  if (!id) return;
  await updateApplication(userId, id, {
    schoolName: text(formData, "schoolName").slice(0, 100) || undefined,
    faculty: text(formData, "faculty").slice(0, 100) || null,
    admissionType: text(formData, "admissionType").slice(0, 50) || null,
    deadline: dateOrNull(formData, "deadline"),
  });
  revalidatePath("/");
}

export async function deleteApplicationAction(formData: FormData): Promise<void> {
  const userId = await requireUser();
  const id = text(formData, "applicationId");
  if (!id) return;
  await deleteApplication(userId, id);
  revalidatePath("/");
}

export async function bumpDraftAction(formData: FormData): Promise<void> {
  const userId = await requireUser();
  const documentId = text(formData, "documentId");
  if (!documentId) return;
  const delta = text(formData, "delta") === "-1" ? -1 : 1;
  await bumpDraft(userId, documentId, delta);
  revalidatePath("/");
}
