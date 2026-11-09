import { NextResponse } from "next/server";
import { getCurrentUserId } from "@bluespring/aoharu-entitlements";
import { addVoice, VOICE_GRADES, type VoiceGrade } from "@/lib/voices/store";

// POST /api/voices { kind, grade, before, after, comment, consent } → { ok }
// テンサクンの結果の画面の「ひとこと送る」。ログインしている人だけ。名前・学校名は受け取らない。
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const comment = String(b.comment ?? "").trim().slice(0, 200);
  const grade = String(b.grade ?? "") as VoiceGrade;
  if (comment.length < 5) return NextResponse.json({ error: "too_short" }, { status: 400 });
  if (!VOICE_GRADES.includes(grade)) return NextResponse.json({ error: "bad_grade" }, { status: 400 });
  const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) && v >= 0 && v <= 100 ? Math.round(v) : null);
  const ok = await addVoice({
    userId,
    kind: String(b.kind ?? "").slice(0, 20),
    grade,
    beforeScore: num(b.before),
    afterScore: num(b.after),
    comment,
    consentPublish: b.consent === true,
  });
  if (!ok) return NextResponse.json({ error: "failed" }, { status: 429 });
  return NextResponse.json({ ok: true });
}
