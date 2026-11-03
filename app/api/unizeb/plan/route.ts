import { NextResponse } from "next/server";
import { gradeLimit } from "@/lib/unizeb/access";
import { serverPlan } from "@/lib/unizeb/server";

// GET /api/unizeb/plan → { plan, grade:{month,day?} }（画面の currentPlan() が呼ぶ）
export const dynamic = "force-dynamic";

export async function GET() {
  const plan = await serverPlan();
  return NextResponse.json({ plan, grade: gradeLimit(plan) }, { headers: { "Cache-Control": "no-store" } });
}
