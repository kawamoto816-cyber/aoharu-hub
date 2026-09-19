import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { getSalesControls, isResendConfigured, listRecentOutreach, SALES_FOLDER_ID, salesFunnelStats } from "@/lib/sales/outreach";
import { getServiceAccount } from "@/lib/metrics/google-auth";

// 法人営業の送信状況。GET /internal/sales/status?token=...
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isAdminToken(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  try {
    const [recent, funnel, controls] = await Promise.all([listRecentOutreach(50), salesFunnelStats(), getSalesControls()]);
    return NextResponse.json(
      {
        generatedAt: new Date().toISOString(),
        resend: isResendConfigured(),
        folderId: SALES_FOLDER_ID,
        serviceAccountEmail: getServiceAccount()?.client_email ?? null,
        controls,
        counts: {
          sent: recent.filter((r) => r.status === "sent").length,
          manual: recent.filter((r) => r.status === "manual").length,
          failed: recent.filter((r) => r.status === "failed").length,
        },
        funnel,
        recent,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 502 });
  }
}
