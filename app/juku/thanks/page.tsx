import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutSuccessTracker } from "@/components/CheckoutSuccessTracker";
import { ensureTeamPassForSession, TEACHER_SEATS } from "@/lib/team-pass/store";

// /juku/thanks：塾向けシーズンプランの支払いのあと。招待コードを見せる（メールでも送る）。
export const metadata: Metadata = { title: "お申し込みありがとうございました｜アオハルOS", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function JukuThanks({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  const pass = session_id ? await ensureTeamPassForSession(session_id).catch(() => null) : null;
  const redeemUrl = pass ? `https://app.bluespring.co.jp/juku/code?c=${encodeURIComponent(pass.code)}` : "";
  return (
    <main className="mx-auto max-w-xl flex-1 px-5 py-16 text-slate-800">
      <p className="text-xs font-bold text-indigo-600">アオハルOS ／ 塾向けシーズンプラン</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">お申し込みありがとうございました</h1>
      {/* GA4 の購入計測（plan=team） */}
      <CheckoutSuccessTracker />
      {pass ? (
        <>
          <p className="mt-4 text-sm leading-relaxed">下の招待コードを、生徒さんに配ってください。同じ内容をお支払い時のメールアドレスにもお送りしました。</p>
          <div className="mt-5 rounded-2xl border-2 border-slate-900 bg-amber-50 p-5 text-center">
            <p className="m-0 text-xs font-bold text-slate-500">招待コード</p>
            <p className="m-0 mt-1 font-mono text-2xl font-black tracking-widest text-slate-900">{pass.code}</p>
            <p className="m-0 mt-2 text-xs text-slate-600">
              生徒{pass.seats - TEACHER_SEATS}人＋指導者{TEACHER_SEATS}人まで・2027年3月31日まで
            </p>
          </div>
          <h2 className="mt-8 text-sm font-bold text-slate-900">生徒さんへの配り方</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-relaxed">
            <li>生徒さんが、自分のメールアドレスでアオハルOSに無料登録（ログイン）します。</li>
            <li>次のページを開いて、招待コードを入れます：<br /><span className="break-all text-indigo-600">{redeemUrl}</span></li>
            <li>入れた人は、すぐに全機能が使えるようになります。先生ご自身も1人分使えます。</li>
          </ol>
          <p className="mt-6 text-xs leading-relaxed text-slate-500">自動更新はなく、期限後の請求はありません。領収書・請求書は Stripe からメールで届きます。</p>
        </>
      ) : (
        <p className="mt-4 text-sm leading-relaxed">
          お支払いの確認に少し時間がかかっています。数分後にこのページを読み込み直すか、お支払い時のメールアドレスに届く招待コードのメールをご確認ください。届かない場合は pr@bluespring.co.jp までご連絡ください。
        </p>
      )}
      <Link href="/juku" className="mt-8 inline-flex min-h-[44px] items-center rounded-xl border border-slate-300 px-5 text-sm font-bold text-slate-700">
        塾向けプランの説明にもどる
      </Link>
    </main>
  );
}
