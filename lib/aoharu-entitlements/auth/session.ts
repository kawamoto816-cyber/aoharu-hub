import { auth, clerkClient } from "@clerk/nextjs/server";

/**
 * 現在のClerkユーザーIDを取得する。未ログインなら null。
 * app.bluespring.co.jp をPrimary、各アプリをSecondaryとして登録しておけば
 * 全アプリで同じuserIdが返る (=このuserIdをSupabaseの主キーとして使い回せる)。
 */
export async function getCurrentUserId(): Promise<string | null> {
  const { userId } = await auth();
  return userId ?? null;
}

/** 未ログイン時に例外を投げるバージョン。Route Handler等での早期return用 */
export async function requireUserId(): Promise<string> {
  const userId = await getCurrentUserId();
  if (!userId) {
    throw new Error("UNAUTHENTICATED");
  }
  return userId;
}

/**
 * ユーザーのメールアドレスを取得する (組織向け無料アクセス判定などに使用)。
 * 取得できない/失敗した場合は null を返す (呼び出し側で通常のプラン判定にフォールバックする)。
 */
export async function getUserEmail(userId: string): Promise<string | null> {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const email =
      user.primaryEmailAddress?.emailAddress ?? user.emailAddresses[0]?.emailAddress ?? null;
    return email ? email.toLowerCase() : null;
  } catch (err) {
    console.error("[aoharu-entitlements] getUserEmail failed:", err);
    return null;
  }
}
