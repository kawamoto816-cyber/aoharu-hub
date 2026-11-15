import { NextResponse } from "next/server";
import { isVariant, START_EVENTS, type StartEvent } from "@/lib/start/ab";
import { bumpStart } from "@/lib/start/counter";

// POST /api/start/ab { v: "a"|"b"|"c", ev: "view"|"cta"|"signup" } … 入口ページの ABC テストの数を1つ足す。
// 個人の情報は受け取らない (案と出来事の名前だけ)。
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as { v?: unknown; ev?: unknown };
  if (!isVariant(b.v) || !(START_EVENTS as readonly unknown[]).includes(b.ev)) return NextResponse.json({ ok: false }, { status: 400 });
  await bumpStart(b.v, b.ev as StartEvent).catch(() => undefined);
  return NextResponse.json({ ok: true });
}
