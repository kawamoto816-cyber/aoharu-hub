import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { refreshThreadsToken } from "@/lib/social/threads";

// Threads 長期トークンの更新 (週1回、定期タスクから呼ぶ)。
//   GET /internal/social/refresh-threads?token=...
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isAdminToken(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  try {
    const r = await refreshThreadsToken();
    return NextResponse.json({ ok: true, ...r });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 502 });
  }
}
