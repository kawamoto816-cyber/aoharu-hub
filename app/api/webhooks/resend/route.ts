import { NextResponse } from "next/server";
import { markClicked, markOpened } from "@/lib/sales/outreach";

// Resend の Webhook 受け口。「開封」「クリック」を自動で sales_outreach に記録する。
// Resend ダッシュボード → Webhooks で、このURLに ?secret=<RESEND_WEBHOOK_SECRET> を付けて登録し、
// イベントは email.opened と email.clicked を選ぶ。
// 例: https://app.bluespring.co.jp/api/webhooks/resend?secret=xxxxx
// RESEND_WEBHOOK_SECRET が未設定の場合はこの受け口自体を無効化する (誰でも叩けてしまうため)。
export const dynamic = "force-dynamic";

interface ResendWebhookBody {
  type?: string;
  data?: { email_id?: string; id?: string };
}

export async function POST(req: Request) {
  const expected = process.env.RESEND_WEBHOOK_SECRET;
  if (!expected) return NextResponse.json({ ok: false, error: "RESEND_WEBHOOK_SECRET が未設定です" }, { status: 503 });
  const given = new URL(req.url).searchParams.get("secret");
  if (given !== expected) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });

  let body: ResendWebhookBody;
  try {
    body = (await req.json()) as ResendWebhookBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const emailId = body.data?.email_id ?? body.data?.id;
  if (!emailId) return NextResponse.json({ ok: true, skipped: "no email_id" });

  try {
    if (body.type === "email.opened") {
      await markOpened(emailId);
    } else if (body.type === "email.clicked") {
      await markClicked(emailId);
      await markOpened(emailId); // クリックしたなら開封もしている
    } else {
      return NextResponse.json({ ok: true, skipped: body.type ?? "unknown" });
    }
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 502 });
  }

  return NextResponse.json({ ok: true, type: body.type, emailId });
}
