"use server";

import { revalidatePath } from "next/cache";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import { approveQueuedEmailLeads } from "@/lib/sales/leads";

// 法人営業ダッシュボードの「承認待ちのメール宛てをまとめて承認」ボタン。
// 社内アカウント (@bluespring.co.jp) だけが実行できる。実際の送信は平日09:30の送信ジョブが行う。
export async function approveAllQueuedEmailsAction(): Promise<void> {
  const admin = await isAdminUser();
  if (!admin.ok) throw new Error("権限がありません");
  const result = await approveQueuedEmailLeads();
  console.log(`[sales] bulk approve by ${admin.email}: approved=${result.approved} badContact=${result.badContact}`);
  revalidatePath("/admin/sales");
}
