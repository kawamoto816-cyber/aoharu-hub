import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/aoharu-entitlements";
import { loadState, type BinState } from "@/lib/station/bin-store";

// 学習便の乗車API（app/api/station/bin/*）で共通の部分。
// どの操作も、終わったあとの状態（GET /api/station/bin と同じ形）を返す。失敗のときは error（生徒に見せる文）を添える。

const NO_STORE = { "Cache-Control": "no-store" };

/** ログインの確認と本文の読み取り。だめなら返すべき応答を返す */
export async function readPost(req: Request): Promise<{ userId: string; body: Record<string, unknown> } | { res: NextResponse }> {
  const userId = await getCurrentUserId();
  if (!userId) return { res: NextResponse.json({ signedIn: false }, { status: 401, headers: NO_STORE }) };
  let body: unknown = {};
  try {
    const text = await req.text();
    if (text.length > 4000) return { res: NextResponse.json({ error: "入力が長すぎます。" }, { status: 413, headers: NO_STORE }) };
    body = text ? JSON.parse(text) : {};
  } catch {
    return { res: NextResponse.json({ error: "送信の形式が正しくありません。" }, { status: 400, headers: NO_STORE }) };
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return { res: NextResponse.json({ error: "送信の形式が正しくありません。" }, { status: 400, headers: NO_STORE }) };
  return { userId, body: body as Record<string, unknown> };
}

export const done = (state: BinState) => NextResponse.json(state, { headers: NO_STORE });

/** できなかったとき。いまの状態も一緒に返す（画面が取り直さなくてよいように） */
export async function fail(userId: string, status: number, error: string) {
  return NextResponse.json({ ...(await loadState(userId)), error }, { status, headers: NO_STORE });
}

export const SAVE_FAILED = "保存できませんでした。少し待って、もう一度ためしてください。";
