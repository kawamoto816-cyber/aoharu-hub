import type { Metadata } from "next";
import Link from "next/link";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import { listReferrals, REFERRAL, rewardOf } from "@/lib/referral/store";
import { createReferralAction, markPaidAction } from "./actions";

// /admin/referrals：個人の先生の紹介コード（生徒はパス10%引き・先生には売上の20%をお礼）。
// コードを発行して先生に渡し、月末に「未払いのお礼」を見て支払う（支払いはじゅんさんが手で行う）。
export const metadata: Metadata = { title: "紹介コード｜アオハルOS 社内", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const BASE = "https://app.bluespring.co.jp";

export default async function AdminReferralsPage() {
  const admin = await isAdminUser();
  if (!admin.ok) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-xl font-bold text-slate-900">紹介コード</h1>
        <p className="mt-3 text-sm text-slate-500">社内アカウント（@bluespring.co.jp）でログインすると表示されます。</p>
        <Link href="/" className="mt-6 inline-block text-sm font-bold text-indigo-600 underline">トップへ戻る</Link>
      </main>
    );
  }
  const list = await listReferrals();
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <p className="text-xs font-bold text-slate-500">アオハルOS ／ 社内</p>
      <h1 className="mt-1 text-2xl font-bold text-slate-900">紹介コード（個人の先生）</h1>
      <p className="mt-2 text-sm text-slate-600">
        生徒がコードつきのリンクから来ると、受験シーズンパスが{REFERRAL.discountPct}%引きになります。売れたら、支払われた額の{REFERRAL.rewardPct}%を先生へのお礼として月末にまとめて支払います（1通300円・Pro は対象外）。
      </p>

      <form action={createReferralAction} className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-slate-200 bg-white p-5">
        <label className="text-sm font-bold text-slate-700">
          先生の名前・メモ（社内だけで見ます）
          <input name="label" required maxLength={60} className="mt-1 block w-72 rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal" placeholder="例：岡山の小論文講師 ○○先生" />
        </label>
        <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white">コードを発行する</button>
      </form>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="py-2 pr-4">先生</th>
              <th className="py-2 pr-4">コード・先生に渡すリンク</th>
              <th className="py-2 pr-4">売れた数</th>
              <th className="py-2 pr-4">売上</th>
              <th className="py-2 pr-4">未払いのお礼</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && (
              <tr>
                <td colSpan={6} className="py-4 text-slate-500">まだコードはありません。</td>
              </tr>
            )}
            {list.map((r) => {
              const total = r.sales.reduce((s, x) => s + x.amountJpy, 0);
              const unpaid = r.sales.slice(r.paidCount).reduce((s, x) => s + rewardOf(x.amountJpy), 0);
              return (
                <tr key={r.code} className="border-b border-slate-100 align-top">
                  <td className="py-2 pr-4 font-bold text-slate-900">{r.label}</td>
                  <td className="py-2 pr-4">
                    <p className="m-0 font-mono">{r.code}</p>
                    <p className="m-0 text-xs text-slate-500">{`${BASE}/tensaku?ref=${r.code}`}</p>
                  </td>
                  <td className="py-2 pr-4">{r.sales.length}</td>
                  <td className="py-2 pr-4">{total.toLocaleString("ja-JP")}円</td>
                  <td className="py-2 pr-4 font-bold">{unpaid.toLocaleString("ja-JP")}円</td>
                  <td className="py-2">
                    {unpaid > 0 && (
                      <form action={markPaidAction}>
                        <input type="hidden" name="code" value={r.code} />
                        <button type="submit" className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold text-slate-700">支払い済みにする</button>
                      </form>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
