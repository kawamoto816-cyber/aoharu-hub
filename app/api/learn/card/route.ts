import { NextResponse } from "next/server";
import { findCard, findTopic } from "@/lib/learn/topics";
import { isLockedCard } from "@/lib/learn/lock";
import { getLearnAccess } from "@/lib/learn/access";

// GET /api/learn/card?topic=kindai&no=7 → カード1枚の本文。
// 裏面の Pro のカードは Pro の人だけ (未ログイン 401 / 無料 402)。無料のカードは誰でも。
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const topic = findTopic(url.searchParams.get("topic") ?? "");
  const card = topic ? findCard(topic, Number(url.searchParams.get("no"))) : null;
  if (!topic || !card) return NextResponse.json({ error: "not_found" }, { status: 404 });

  if (isLockedCard(topic, card)) {
    const access = await getLearnAccess();
    if (access === "signed_out") return NextResponse.json({ error: "signed_out" }, { status: 401 });
    if (access !== "pro") return NextResponse.json({ error: "pro_only" }, { status: 402 });
  }
  return NextResponse.json({ card }, { headers: { "Cache-Control": "private, no-store" } });
}
