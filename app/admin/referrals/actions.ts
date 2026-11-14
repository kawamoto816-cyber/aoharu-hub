"use server";

import { revalidatePath } from "next/cache";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import { createReferral, markReferralPaid } from "@/lib/referral/store";

// 紹介コードの発行と、お礼を支払い済みにする操作。社内アカウント（@bluespring.co.jp）だけ。
export async function createReferralAction(formData: FormData): Promise<void> {
  const admin = await isAdminUser();
  if (!admin.ok) throw new Error("権限がありません");
  await createReferral(String(formData.get("label") ?? ""));
  revalidatePath("/admin/referrals");
}

export async function markPaidAction(formData: FormData): Promise<void> {
  const admin = await isAdminUser();
  if (!admin.ok) throw new Error("権限がありません");
  await markReferralPaid(String(formData.get("code") ?? ""));
  revalidatePath("/admin/referrals");
}
