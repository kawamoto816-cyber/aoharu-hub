import { auth } from "@clerk/nextjs/server";

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
