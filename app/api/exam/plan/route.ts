import { NextResponse } from "next/server";
import { examQuota, examViewer } from "@/lib/exam/server";

// GET /api/exam/plan → { plan, limit, used, remaining }（入試モードの本番画面の ExamGate が呼ぶ）
//   guest は remaining:null（端末の localStorage で数える）。pro・max は limit:null（無制限）。
export const dynamic = "force-dynamic";

export async function GET() {
  const q = await examQuota(await examViewer());
  return NextResponse.json(q, { headers: { "Cache-Control": "no-store" } });
}
