import type { Metadata } from "next";
import { RedeemForm } from "@/components/billing/RedeemForm";

// /juku/code?c=JUKU-XXXX-XXXX：塾から受け取った招待コードを、生徒・指導者が自分のアカウントで入れるページ。
export const metadata: Metadata = { title: "招待コードを入れる｜アオハルOS", robots: { index: false, follow: false } };

export default async function JukuCodePage({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const { c } = await searchParams;
  return (
    <main className="mx-auto max-w-md flex-1 px-5 py-16 text-[#15172B]">
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">アオハルOS ／ 塾・教室からの招待コード</p>
      <h1 className="mt-2 text-2xl font-black leading-snug">招待コードを入れる</h1>
      <p className="mt-3 text-sm leading-relaxed text-[#3A3D55]">
        塾・教室から受け取ったコードを入れると、2027年3月31日まで、志望理由書・小論文の添削や面接練習など、アオハルOSの全機能が使えます。支払いは要りません。
      </p>
      <RedeemForm initialCode={c ?? ""} />
    </main>
  );
}
