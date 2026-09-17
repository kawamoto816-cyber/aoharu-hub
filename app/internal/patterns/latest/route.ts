import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { listActiveContentPatterns, formatPatternsDigest } from "@/lib/patterns/store";

// 編集長エージェントが毎朝、企画の参考として読み込む「勝ちパターン」ダイジェスト。
//   GET /internal/patterns/latest?token=...             JSON
//   GET /internal/patterns/latest?token=...&format=text  プレーンテキスト (プロンプトにそのまま貼れる形式)
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isAdminToken(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const format = new URL(req.url).searchParams.get("format");
  try {
    const rows = await listActiveContentPatterns(60);
    if (format === "text") {
      return new NextResponse(formatPatternsDigest(rows), {
        headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
      });
    }
    return NextResponse.json({ ok: true, count: rows.length, patterns: rows }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 502 });
  }
}
