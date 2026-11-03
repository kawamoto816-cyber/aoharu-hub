import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { GakkoDashboard } from "@/components/learn/gakko/GakkoDashboard";
import { gakkoData } from "@/lib/gakko";
import type { DashData } from "@/lib/gakko/dashboard";
import { hasUnitMoshi } from "@/lib/moshi/unit";

// /learn/gakko/dashboard: あたらしいがっこう 第2段階「学びのダッシュボード」。
// 出席簿・得意と苦手・最近の学び・学びの報告書 (印刷用)。記録は登録なしで、この端末の localStorage だけを読む。
// 単元の情報 (名前・教科・学年) と単元模試のある単元は、ここ (サーバー) で引いてクライアントへ渡す。

const URL = "https://app.bluespring.co.jp/learn/gakko/dashboard";
const TITLE = "学びのダッシュボード｜出席簿・得意と苦手・学びの報告書｜あたらしいがっこう｜アオハルラーン";
const DESC = "あたらしいがっこうで学んだ記録を、出席簿のカレンダー・教科ごとの得意とのびしろ・最近の学びで見られます。期間を選んで、印刷できる学びの報告書も。登録なし・記録はこの端末だけに保存。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function GakkoDashboardPage() {
  const base = gakkoData();
  const data: DashData = { ...base, moshi: Object.keys(base.units).filter(hasUnitMoshi) };
  return (
    <LearnShell crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/gakko", label: "あたらしいがっこう" }, { label: "学びのダッシュボード" }]}>
      <div className="mx-auto max-w-[720px] overflow-x-clip">
        <GakkoDashboard data={data} />
        <p className="mb-0 mt-8 rounded-[14px] bg-white/70 px-3.5 py-3 text-center text-[12px] leading-[1.7] text-[#3A3D55]">
          登録なしで使えます。記録はこの端末に保存され、ほかの人やサーバーには送られません。
        </p>
        <p className="mb-0 mt-3 text-center text-[12px]">
          <Link href="/learn/gakko" className="font-bold text-[#1533B8]">
            あたらしいがっこうへもどる
          </Link>
        </p>
      </div>
    </LearnShell>
  );
}
