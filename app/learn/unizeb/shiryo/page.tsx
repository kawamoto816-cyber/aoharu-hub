import type { Metadata } from "next";
import { ShiryoPage } from "@/components/unizeb/ShiryoPage";
import { UZ_SHIRYO } from "@/lib/unizeb";
import { canReadShiryo } from "@/lib/unizeb/access";
import { serverPlan } from "@/lib/unizeb/server";

// プラン（ログイン）で見せる中身が変わるので、毎回サーバーで組み立てる
export const dynamic = "force-dynamic";

// /learn/unizeb/shiryo：起業の資料集（法人の形・資金調達・知的財産・契約・税と社会保険・統計・用語集）。中身は lib/unizeb/shiryo。
const URL = "https://app.bluespring.co.jp/learn/unizeb/shiryo";
const TITLE = "起業の資料集｜図表・制度の早見表｜ゼロワンOSユース版｜アオハルOS";
const DESC = "個人事業・株式会社・合同会社などの事業の形、18歳未満と18歳以上で分かれる決まりを、法令と公式の情報で確かめた図表でまとめた資料集。";
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL }, openGraph: { title: TITLE, description: DESC, url: URL } };

export default async function Page() {
  // 第1章はだれでも、ほかの章は Pro・Max（2026-11-04 承認の料金）
  const plan = await serverPlan();
  return <ShiryoPage chapters={UZ_SHIRYO.filter((c) => canReadShiryo(plan, c.ch))} />;
}
