"use server";

import { redirect } from "next/navigation";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import { createTrialTeamPass } from "@/lib/team-pass/store";

// /admin/team-pass の「無料お試し用の招待コードを発行する」フォーム。
// 社内アカウント (@bluespring.co.jp) だけが実行できる。支払いは通らない。
export async function issueTrialCodeAction(formData: FormData): Promise<void> {
  const admin = await isAdminUser();
  if (!admin.ok) throw new Error("権限がありません");
  let to: string;
  try {
    const pass = await createTrialTeamPass({
      org: String(formData.get("org") ?? ""),
      students: Number(formData.get("students") ?? 0),
      endsOn: String(formData.get("endsOn") ?? ""),
      issuedBy: admin.email,
    });
    console.log(`[team-pass] trial issued by ${admin.email}: ${pass.code} seats=${pass.seats} org=${pass.org}`);
    to = `/admin/team-pass?issued=${encodeURIComponent(pass.code)}`;
  } catch (e) {
    to = `/admin/team-pass?error=${encodeURIComponent(e instanceof Error ? e.message : "発行できませんでした")}`;
  }
  redirect(to);
}
