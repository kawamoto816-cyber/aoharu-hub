import { NextResponse } from "next/server";
import { checkIpLimit, hashIp, MAX_CHARS, MIN_CHARS, runPreview, takeDailyQuota, type DocKind } from "@/lib/tensaku/preview";

// POST /api/tensaku/preview  { kind, target, text } → { summary, points[3] }
// 登録前のお試し添削。入力文は保存しない。上限は lib/tensaku/preview.ts を参照。
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const KINDS: DocKind[] = ["shibo", "shoronbun", "jiko"];

export async function POST(req: Request) {
  let body: { kind?: string; target?: string; text?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const kind = (KINDS.includes(body.kind as DocKind) ? body.kind : "shibo") as DocKind;
  const target = String(body.target ?? "").trim().slice(0, 60);
  const text = String(body.text ?? "").trim();
  if (text.length < MIN_CHARS) return NextResponse.json({ error: "too_short", min: MIN_CHARS }, { status: 400 });
  if (text.length > MAX_CHARS) return NextResponse.json({ error: "too_long", max: MAX_CHARS }, { status: 400 });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (!checkIpLimit(hashIp(ip))) return NextResponse.json({ error: "limit_ip" }, { status: 429 });
  if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  if (!(await takeDailyQuota())) return NextResponse.json({ error: "limit_daily" }, { status: 429 });

  try {
    const result = await runPreview({ kind, target, text });
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("tensaku preview failed:", msg); // 入力文は出さない
    return NextResponse.json({ error: msg === "not_configured" ? "not_configured" : "failed" }, { status: 502 });
  }
}
