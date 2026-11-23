"use server";

import { revalidatePath } from "next/cache";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import { clearNick } from "@/lib/station/room-store";

// アオハルームの見回り：よくないニックネーム（本名・学校名・連絡先・人を傷つける言葉）を消す。
// 社内アカウント (@bluespring.co.jp) だけが実行できる。消された人は、次に部屋を開いたときに決め直す。
export async function clearNickAction(formData: FormData): Promise<void> {
  const admin = await isAdminUser();
  if (!admin.ok) throw new Error("権限がありません");
  const userId = formData.get("userId");
  if (typeof userId !== "string" || !/^user_[A-Za-z0-9]{5,60}$/.test(userId)) throw new Error("対象が正しくありません");
  const ok = await clearNick(userId);
  console.log(`[station-room] clear nick by ${admin.email}: ${userId.slice(-6)} ok=${ok}`);
  revalidatePath("/admin/station/room");
}
