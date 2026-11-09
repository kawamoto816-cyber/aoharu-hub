import { NextResponse } from "next/server";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import { setVoiceStatus, type VoiceStatus } from "@/lib/voices/store";

// POST /api/admin/voices { id, status: "approved" | "rejected" | "pending" }（@bluespring.co.jp でログインした人だけ）
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const admin = await isAdminUser();
  if (!admin.ok) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const b = (await req.json().catch(() => ({}))) as { id?: string; status?: string };
  const status = b.status as VoiceStatus;
  if (!b.id || !["approved", "rejected", "pending"].includes(status)) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  const ok = await setVoiceStatus(b.id, status);
  return NextResponse.json({ ok }, { status: ok ? 200 : 500 });
}
