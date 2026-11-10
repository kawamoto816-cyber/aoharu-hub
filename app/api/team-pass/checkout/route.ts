import { NextResponse } from "next/server";
import { createTeamCheckoutSession, TEAM_PLANS, type TeamPlanKey } from "@/lib/team-pass/store";

// POST /api/team-pass/checkout { plan: "team5" | "team10" } → { url }
// 塾向けシーズンプランの支払い画面。払うのは塾・教室なので、ログインは要らない。
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as { plan?: string };
  const plan = b.plan as TeamPlanKey;
  if (!TEAM_PLANS[plan]) return NextResponse.json({ error: "bad_plan" }, { status: 400 });
  try {
    const url = await createTeamCheckoutSession(plan, new URL(req.url).origin);
    if (!url) return NextResponse.json({ error: "failed" }, { status: 500 });
    return NextResponse.json({ url });
  } catch (e) {
    console.error("[team-pass/checkout]", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
