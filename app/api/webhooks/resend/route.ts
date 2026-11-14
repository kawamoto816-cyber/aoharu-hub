import { NextResponse } from "next/server";
import { markBounced, markClicked, markComplained, markOpened } from "@/lib/sales/outreach";

// Resend の Webhook 受け口。「開封」「クリック」「バウンス」「苦情(スパム報告)」を自動で
// sales_outreach に記録する。バウンス率・苦情件数がしきい値を超えると自動で送信を一時停止する
// (lib/sales/outreach.ts の checkAutoPause)。
// Resend ダッシュボード → Webhooks で https://app.bluespring.co.jp/api/webhooks/resend を登録し、
// イベントは email.opened / email.clicked / email.bounced / email.complained を選ぶ。
// 本物の通知かどうかは、次のどちらかで確かめる:
//   1) URL に ?secret=<RESEND_WEBHOOK_SECRET> が付いていて一致する
//   2) 通知にある email_id を Resend の API (RESEND_API_KEY) で引き、実在して、出来事が通知と合っている
// (2026-11-15 まで RESEND_WEBHOOK_SECRET が未設定で受け口が止まっており、開封が0のままだった。
//  秘密の文字列を URL に入れずに済むよう、2) を足した)
export const dynamic = "force-dynamic";

interface ResendWebhookBody {
  type?: string;
  data?: { email_id?: string; id?: string };
}

const EVENT_OF: Record<string, string[]> = {
  "email.opened": ["opened", "clicked"],
  "email.clicked": ["clicked"],
  "email.bounced": ["bounced"],
  "email.complained": ["complained"],
};

/** Resend の API でメールを引き、通知の出来事が本当に起きているかを確かめる */
async function verifiedByApi(emailId: string, type: string | undefined): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key || !type || !EVENT_OF[type] || !/^[0-9a-f-]{20,}$/i.test(emailId)) return false;
  const res = await fetch(`https://api.resend.com/emails/${emailId}`, { headers: { Authorization: `Bearer ${key}` } }).catch(() => null);
  if (!res?.ok) return false;
  const email = (await res.json().catch(() => ({}))) as { last_event?: string };
  // 開封のあとにクリックがあると last_event は clicked になる。バウンス・苦情は last_event がそれと一致するときだけ
  return Boolean(email.last_event && EVENT_OF[type].includes(email.last_event));
}

export async function POST(req: Request) {
  const expected = process.env.RESEND_WEBHOOK_SECRET;
  const given = new URL(req.url).searchParams.get("secret");
  const bySecret = Boolean(expected) && given === expected;

  let body: ResendWebhookBody;
  try {
    body = (await req.json()) as ResendWebhookBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const emailId = body.data?.email_id ?? body.data?.id;
  if (!emailId) return NextResponse.json({ ok: true, skipped: "no email_id" });
  if (!bySecret && !(await verifiedByApi(emailId, body.type))) {
    // 開封は last_event に反映されるまで少しかかることがあるので、確かめられなかったものは 200 で読み捨てる (Resend が再送を繰り返さないように)
    return NextResponse.json({ ok: true, skipped: "unverified" });
  }

  try {
    if (body.type === "email.opened") {
      await markOpened(emailId);
    } else if (body.type === "email.clicked") {
      await markClicked(emailId);
      await markOpened(emailId); // クリックしたなら開封もしている
    } else if (body.type === "email.bounced") {
      await markBounced(emailId);
    } else if (body.type === "email.complained") {
      await markComplained(emailId);
    } else {
      return NextResponse.json({ ok: true, skipped: body.type ?? "unknown" });
    }
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 502 });
  }

  return NextResponse.json({ ok: true, type: body.type, emailId });
}
