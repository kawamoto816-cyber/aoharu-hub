import { getCurrentUserId, getUserEmail } from "@bluespring/aoharu-entitlements";

// 管理画面 / 管理APIのアクセス制御。
//   1) ログイン済みで、メールが ADMIN_EMAIL_DOMAIN (既定 @bluespring.co.jp) のユーザー
//   2) または、ヘッダー x-admin-token が ADMIN_METRICS_TOKEN と一致 (定期タスク等のプログラム用)
// のどちらかを満たせば許可する。

export function getAdminDomain(): string {
  return (process.env.ADMIN_EMAIL_DOMAIN ?? "@bluespring.co.jp").toLowerCase();
}

export async function isAdminUser(): Promise<{ ok: boolean; email: string | null }> {
  const userId = await getCurrentUserId();
  if (!userId) return { ok: false, email: null };
  const email = await getUserEmail(userId);
  if (!email) return { ok: false, email: null };
  return { ok: email.endsWith(getAdminDomain()), email };
}

export function isAdminToken(req: Request): boolean {
  const expected = process.env.ADMIN_METRICS_TOKEN;
  if (!expected) return false;
  const given = req.headers.get("x-admin-token") ?? new URL(req.url).searchParams.get("token");
  return !!given && given === expected;
}
