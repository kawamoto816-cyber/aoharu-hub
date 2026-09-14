import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { isXConfigured, postToX } from "@/lib/social/x";
import { isThreadsConfigured, postToThreads } from "@/lib/social/threads";
import { findRecentDuplicate, recordPost, textHash, type SocialChannel } from "@/lib/social/store";

// SNS自動投稿エンドポイント。投稿エージェント (定期タスク) が呼ぶ。
//   GET  /internal/social/post?token=...&channel=x|threads&text=...&source=...   (WebFetch から呼べるよう GET も受ける)
//   POST /internal/social/post  { channel, text, source }  + x-admin-token ヘッダー
// 同じ本文を48時間以内に同じチャネルへ二重投稿しない (already_posted を返す)。
// dry=1 を付けると投稿せずに設定と重複だけを確認する。
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_LEN: Record<SocialChannel, number> = { x: 280, threads: 500 };

function isChannel(v: string | null): v is SocialChannel {
  return v === "x" || v === "threads";
}

async function handle(req: Request, input: { channel: string | null; text: string | null; source: string | null; dry: boolean }) {
  if (!isAdminToken(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const { channel, source, dry } = input;
  const text = (input.text ?? "").replace(/\r\n/g, "\n").trim();
  if (!isChannel(channel)) return NextResponse.json({ error: "channel は x または threads" }, { status: 400 });
  if (!text) return NextResponse.json({ error: "text が空です" }, { status: 400 });
  if (text.length > MAX_LEN[channel]) {
    return NextResponse.json({ error: `text が長すぎます (${text.length} > ${MAX_LEN[channel]})` }, { status: 400 });
  }
  const configured = channel === "x" ? isXConfigured() : isThreadsConfigured();
  if (!configured) return NextResponse.json({ error: `${channel} のAPIキーが未設定です`, configured: false }, { status: 503 });

  const dup = await findRecentDuplicate(channel, textHash(text));
  if (dup) return NextResponse.json({ ok: true, status: "already_posted", channel, external_id: dup.external_id, posted_at: dup.created_at });
  if (dry) return NextResponse.json({ ok: true, status: "dry_run", channel, length: text.length });

  try {
    const result = channel === "x" ? await postToX(text) : await postToThreads(text);
    await recordPost({ channel, text, status: "posted", external_id: result.id, source });
    return NextResponse.json({ ok: true, status: "posted", channel, external_id: result.id });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    await recordPost({ channel, text, status: "failed", error: message, source }).catch(() => undefined);
    return NextResponse.json({ ok: false, status: "failed", channel, error: message }, { status: 502 });
  }
}

export async function GET(req: Request) {
  const p = new URL(req.url).searchParams;
  return handle(req, { channel: p.get("channel"), text: p.get("text"), source: p.get("source"), dry: p.get("dry") === "1" });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { channel?: string; text?: string; source?: string; dry?: boolean };
  return handle(req, { channel: body.channel ?? null, text: body.text ?? null, source: body.source ?? null, dry: body.dry === true });
}
