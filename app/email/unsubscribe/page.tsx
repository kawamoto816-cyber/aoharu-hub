import type { Metadata } from "next";
import Link from "next/link";
import { optOut, unsubscribeToken } from "@/lib/onboarding/emails";

// お知らせメールの配信停止。リンクを開いた時点で停止する (ログイン不要)。
export const metadata: Metadata = { title: "お知らせメールの停止｜アオハルOS", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function UnsubscribePage({ searchParams }: { searchParams: Promise<{ u?: string; t?: string }> }) {
  const { u, t } = await searchParams;
  const valid = Boolean(u && t && unsubscribeToken(u) === t);
  if (valid && u) await optOut(u);
  return (
    <main className="mx-auto max-w-xl flex-1 px-6 py-20">
      <h1 className="text-2xl font-bold text-slate-900">{valid ? "お知らせメールを停止しました" : "リンクが正しくありません"}</h1>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        {valid
          ? "今後、使い方のお知らせメールはお送りしません。お支払いやアカウントに関する大切なご連絡のみ、必要な場合にお送りします。"
          : "メールに記載のリンクをそのまま開いてください。うまくいかない場合は pr@bluespring.co.jp までご連絡ください。"}
      </p>
      <Link href="/" className="mt-8 inline-block text-sm font-bold text-indigo-600 underline">
        アオハルOS トップへ
      </Link>
    </main>
  );
}
