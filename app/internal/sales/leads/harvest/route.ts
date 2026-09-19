import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { harvestNext } from "@/lib/sales/leads";
import { isPlacesConfigured } from "@/lib/sales/places";

// Google Places API で見込み先候補を少しずつ拾い、sales_leads に積む (冪等・続き実行)。
//   GET /internal/sales/leads/harvest?token=...
// Authorization: Bearer CRON_SECRET でも可 (GitHub Actions)。1日に複数回呼ぶ想定。
export const dynamic = "force-dynamic";
export const maxDuration = 120;

function isCron(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret) && req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!isAdminToken(req) && !isCron(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  if (!isPlacesConfigured()) {
    return NextResponse.json({ ok: false, error: "GOOGLE_PLACES_API_KEY が未設定です" }, { status: 503 });
  }
  try {
    const result = await harvestNext({});
    return NextResponse.json({ ok: true, ...result }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 502 });
  }
}
