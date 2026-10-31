import { getCurrentUserId, getFreeTierStatus } from "@/lib/aoharu-entitlements";

// 「まなぶ」の Pro のカード・本を読めるか。有料プランの人と、組織向け無料アクセスの人 (無制限) は読める。
export type LearnAccess = "pro" | "free" | "signed_out";

export async function getLearnAccess(): Promise<LearnAccess> {
  const userId = await getCurrentUserId();
  if (!userId) return "signed_out";
  try {
    const s = await getFreeTierStatus(userId, "tensakun");
    return s.unlimited ? "pro" : "free";
  } catch {
    return "free";
  }
}
