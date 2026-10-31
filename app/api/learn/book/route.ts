import { NextResponse } from "next/server";
import { findBook } from "@/lib/library/books-index";
import { getLearnAccess } from "@/lib/learn/access";

// GET /api/learn/book?id=kant-eien-heiwa → 知の図書館の本1冊 (裏まで)。
// Pro の本は Pro の人だけ (未ログイン 401 / 無料 402)。
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const book = findBook(new URL(req.url).searchParams.get("id") ?? "");
  if (!book) return NextResponse.json({ error: "not_found" }, { status: 404 });
  if (!book.free) {
    const access = await getLearnAccess();
    if (access === "signed_out") return NextResponse.json({ error: "signed_out" }, { status: 401 });
    if (access !== "pro") return NextResponse.json({ error: "pro_only" }, { status: 402 });
  }
  return NextResponse.json({ book }, { headers: { "Cache-Control": "private, no-store" } });
}
