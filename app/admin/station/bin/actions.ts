"use server";

import { revalidatePath } from "next/cache";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import { isTeam } from "@/lib/station/bin";
import { setTeam } from "@/lib/station/bin-store";

// 学習便の出席表：運営が、生徒の班（A〜D、または未定）を入れる。
// 社内アカウント (@bluespring.co.jp) だけが実行できる。生徒が乗車ページで自分で選ぶこともできるが、
// 班分けのあと運営がまとめて入れておけば、生徒は選び直さなくてよい。
export async function setTeamAction(formData: FormData): Promise<void> {
  const admin = await isAdminUser();
  if (!admin.ok) throw new Error("権限がありません");
  const userId = formData.get("userId");
  const team = formData.get("team");
  if (typeof userId !== "string" || !/^user_[A-Za-z0-9]{5,60}$/.test(userId)) throw new Error("対象が正しくありません");
  if (team !== "" && !isTeam(team)) throw new Error("班が正しくありません");
  const ok = await setTeam(userId, team);
  console.log(`[station-bin] set team by ${admin.email}: ${userId.slice(-6)} → ${team || "未定"} ok=${ok}`);
  revalidatePath("/admin/station/bin");
}
