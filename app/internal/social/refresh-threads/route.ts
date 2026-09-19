import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { refreshThreadsToken } from "@/lib/social/threads";
import { isInstagramConfigured, refreshInstagramToken } from "@/lib/social/instagram";

// Threads 長期トークンの更新 (週1回)。
//   GET /internal/social/refresh-threads?token=...                          (管理トークン / 手動)
//   GET /internal/social/refresh-threads + Authorization: Bearer CRON_SECRET (GitHub Actions)
// 定期実行は GitHub Actions (.github/workflows/schedule.yml) が担当する。
// Claude の定期タスクからは呼べない (実行環境のネットワークポリシーで本番ドメインへの接続が拒否されるため)。
export const dynamic = "force-dynamic";

function isCron(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret) && req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!isAdminToken(req) && !isCron(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  try {
    const r = await refreshThreadsToken();
    const instagram = isInstagramConfigured() ? await refreshInstagramToken().catch((e: Error) => ({ error: e.message })) : null;
    return NextResponse.json({ ok: true, ...r, instagram });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 502 });
  }
}
