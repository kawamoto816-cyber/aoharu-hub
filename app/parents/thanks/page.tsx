import type { Metadata } from "next";
import Link from "next/link";

// /parents/thanks: お子さんから届いた支払いリンクで、保護者が Pro の支払いを終えたあとに戻るページ。
// 支払った保護者はログインしていないので、ここでは「お子さんのアカウントが Pro になった」ことと解約の方法だけを伝える。

export const metadata: Metadata = {
  title: "お支払いありがとうございました｜アオハルOS",
  robots: { index: false, follow: false },
};

export default function ParentThanksPage() {
  return (
    <main className="mx-auto max-w-xl flex-1 px-5 py-16 text-slate-800">
      <p className="text-xs font-bold text-indigo-600">アオハルOS</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">お支払いありがとうございました</h1>
      <p className="mt-4 text-sm leading-relaxed">
        お子さんのアカウントが Pro プラン（月980円）になりました。テンサクン・しぼりゆ・メンサツを、回数を気にせず使えます。反映まで数分かかることがあります。
      </p>
      <h2 className="mt-8 text-sm font-bold text-slate-900">解約やお支払いの管理</h2>
      <p className="mt-2 text-sm leading-relaxed">
        お子さんのアカウントでログインし、マイページの「プラン管理・解約」から、いつでも解約できます。解約後も期間の終わりまで使え、次回以降の請求はありません。領収書はお支払い時に入力したメールアドレスに届きます。
      </p>
      <p className="mt-2 text-sm leading-relaxed">
        ご不明な点は <a href="mailto:pr@bluespring.co.jp" className="text-indigo-600 underline">pr@bluespring.co.jp</a> までお問い合わせください。
      </p>
      <Link href="/parents" className="mt-8 inline-flex min-h-[44px] items-center rounded-xl border border-slate-300 px-5 text-sm font-bold text-slate-700">
        保護者の方へ（サービスの説明）
      </Link>
    </main>
  );
}
