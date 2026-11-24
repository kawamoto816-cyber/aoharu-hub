"use server";

import { redirect } from "next/navigation";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import { runCampaign, sendCampaignTest, setCampaignSkip } from "@/lib/sales/campaign";

// /admin/sales/campaign のボタン。社内アカウント (@bluespring.co.jp) だけが実行できる。
// 送るのは、ここでボタンを押したときだけ（自動では送らない）。

export async function sendCampaignTestAction(): Promise<void> {
  const admin = await isAdminUser();
  if (!admin.ok || !admin.email) throw new Error("権限がありません");
  let msg: string;
  try {
    await sendCampaignTest(admin.email);
    msg = `確認用の1通を ${admin.email} に送りました`;
  } catch (e) {
    msg = `確認用のメールを送れませんでした：${e instanceof Error ? e.message : String(e)}`;
  }
  redirect(`/admin/sales/campaign?msg=${encodeURIComponent(msg)}`);
}

export async function skipCampaignAction(formData: FormData): Promise<void> {
  const admin = await isAdminUser();
  if (!admin.ok) throw new Error("権限がありません");
  const email = String(formData.get("email") ?? "");
  const skip = formData.get("skip") === "1";
  let msg: string;
  try {
    await setCampaignSkip(email, skip);
    msg = skip ? `${email} には送らないようにしました` : `${email} を送る宛先にもどしました`;
  } catch (e) {
    msg = `変えられませんでした：${e instanceof Error ? e.message : String(e)}`;
  }
  redirect(`/admin/sales/campaign?msg=${encodeURIComponent(msg)}`);
}

export async function runCampaignAction(): Promise<void> {
  const admin = await isAdminUser();
  if (!admin.ok) throw new Error("権限がありません");
  let msg: string;
  try {
    const r = await runCampaign();
    console.log(`[sales] campaign run by ${admin.email}: sent=${r.sent} failed=${r.failed} left=${r.left}`);
    msg = r.note ?? `${r.sent}通を送りました（失敗 ${r.failed}通・残り ${r.left}件）`;
  } catch (e) {
    msg = `送れませんでした：${e instanceof Error ? e.message : String(e)}`;
  }
  redirect(`/admin/sales/campaign?msg=${encodeURIComponent(msg)}`);
}
