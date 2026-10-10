import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { raiseAlert } from "@/lib/social/alert";

// GitHub Actions など外部の処理から、不具合を運営者に知らせるための入口。
//   POST /internal/alerts  (Bearer CRON_SECRET)  body: { key, title, body, action }
export const dynamic = "force-dynamic";

function isCron(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret) && req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function POST(req: Request) {
  if (!isAdminToken(req) && !isCron(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const b = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!b || typeof b.key !== "string" || typeof b.title !== "string") return NextResponse.json({ error: "key と title は必須です" }, { status: 400 });
  const sent = await raiseAlert(
    b.key.replace(/[^\w-]/g, "_").slice(0, 60),
    b.title.slice(0, 120),
    String(b.body ?? "").slice(0, 2000),
    String(b.action ?? "Claude に調査を依頼してください。").slice(0, 1000),
  );
  return NextResponse.json({ ok: true, sent });
}
