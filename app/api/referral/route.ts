import { NextResponse } from "next/server";
import { discounted, getReferral, REFERRAL } from "@/lib/referral/store";
import { seasonPassPriceJpy } from "@bluespring/aoharu-entitlements";

// GET /api/referral?code=SENSEI-XXXXXX → { ok, code, discountPct, priceJpy }
// 紹介コードが使えるかを確かめる（先生の名前などは返さない）。
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const code = new URL(req.url).searchParams.get("code");
  const r = await getReferral(code).catch(() => null);
  if (!r) return NextResponse.json({ ok: false });
  return NextResponse.json({ ok: true, code: r.code, discountPct: REFERRAL.discountPct, priceJpy: discounted(seasonPassPriceJpy()) });
}
