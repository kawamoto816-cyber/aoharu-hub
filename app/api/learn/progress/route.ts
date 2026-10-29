import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/aoharu-entitlements";
import { loadProgress, saveProgress, type ProgressMap } from "@/lib/learn/store";

// 「まなぶ」の進み具合 (登録した人のみ)。
//   GET  /api/learn/progress                       → { signedIn, saved, progress }
//   POST /api/learn/progress { progress: {id: st} } → { saved, progress } (合わせた結果)
// 未登録なら signedIn:false を返すだけで、ブラウザ側の保存で動き続ける。
export const dynamic = "force-dynamic";

const ID = /^[a-z]+-(\d{1,3}|quest)$/;

function clean(input: unknown): ProgressMap {
  const out: ProgressMap = {};
  if (!input || typeof input !== "object") return out;
  for (const [id, st] of Object.entries(input as Record<string, unknown>).slice(0, 300)) {
    if (ID.test(id) && (st === "quiz" || st === "done")) out[id] = st;
  }
  return out;
}

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ signedIn: false }, { headers: { "Cache-Control": "no-store" } });
  const progress = await loadProgress(userId);
  return NextResponse.json({ signedIn: true, saved: progress !== null, progress: progress ?? {} }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ signedIn: false }, { status: 401 });
  let body: { progress?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const merged = await saveProgress(userId, clean(body.progress));
  return NextResponse.json({ signedIn: true, saved: merged !== null, progress: merged ?? {} }, { headers: { "Cache-Control": "no-store" } });
}
