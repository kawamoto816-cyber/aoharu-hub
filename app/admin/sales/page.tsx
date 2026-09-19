import type { Metadata } from "next";
import Link from "next/link";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import { listRecentOutreach, salesFunnelStats } from "@/lib/sales/outreach";

// /admin/sales: 法人営業の送信数・開封・返信・面談を一覧する (@bluespring.co.jp でログインした人だけ)。
// 送信はサーバー(Resend)、開封・クリックは Resend Webhook、返信・面談は営業エージェントが
// ドライブに書く「返信記録」を /internal/sales/replies/ingest が取り込んで更新する。

export const metadata: Metadata = {
  title: "法人営業ダッシュボード｜アオハルOS",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function fmt(d: string | null | undefined): string {
  if (!d) return "—";
  return new Date(d).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default async function AdminSalesPage() {
  const admin = await isAdminUser();
  if (!admin.ok) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-xl font-bold text-slate-900">法人営業ダッシュボード</h1>
        <p className="mt-3 text-sm text-slate-500">社内アカウント（@bluespring.co.jp）でログインすると表示されます。</p>
        <Link href="/" className="mt-6 inline-block text-sm font-bold text-indigo-600 underline underline-offset-2">
          トップへ戻る
        </Link>
      </main>
    );
  }

  const [stats, recent] = await Promise.all([salesFunnelStats(), listRecentOutreach(50)]);
  const openRate = stats.sent ? Math.round((stats.opened / stats.sent) * 100) : 0;
  const replyRate = stats.sent ? Math.round((stats.replied / stats.sent) * 100) : 0;

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">アオハルOS ／ 社内</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">法人営業ダッシュボード</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-500">
        送信はサーバーが自動で行い、開封・クリックは送信メールの追跡で自動的に記録されます。返信・面談は、営業エージェントに「返信あり：○○」「面談決定：○○」と伝えると自動で反映されます。
      </p>

      <section className="mt-8 grid gap-4 sm:grid-cols-4">
        {[
          { label: "送信数", value: stats.sent },
          { label: "開封", value: `${stats.opened}（${openRate}%）` },
          { label: "返信", value: `${stats.replied}（${replyRate}%）` },
          { label: "面談", value: stats.meeting },
        ].map((t) => (
          <div key={t.label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-bold text-slate-500">{t.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{t.value}</p>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-slate-900">送信履歴（新しい順）</h2>
        {recent.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">まだ送信はありません。</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-sm">
              <thead>
                <tr>
                  {["送信日", "法人名", "宛先", "状態", "開封", "返信", "面談", "メモ"].map((h) => (
                    <th key={h} className="border-b-2 border-slate-300 bg-slate-50 px-3 py-2 text-left font-bold text-slate-700">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((r) => (
                  <tr key={r.id} className="align-top">
                    <td className="whitespace-nowrap border-b border-slate-200 px-3 py-2 text-slate-500">{fmt(r.sent_at ?? r.created_at)}</td>
                    <td className="border-b border-slate-200 px-3 py-2 font-bold text-slate-900">{r.company || "—"}</td>
                    <td className="border-b border-slate-200 px-3 py-2 text-slate-600">{r.recipient}</td>
                    <td className="whitespace-nowrap border-b border-slate-200 px-3 py-2 text-slate-600">{r.status}</td>
                    <td className="whitespace-nowrap border-b border-slate-200 px-3 py-2 text-slate-500">{fmt(r.opened_at)}</td>
                    <td className="whitespace-nowrap border-b border-slate-200 px-3 py-2 text-slate-500">{fmt(r.replied_at)}</td>
                    <td className="whitespace-nowrap border-b border-slate-200 px-3 py-2 text-slate-500">{fmt(r.meeting_at)}</td>
                    <td className="border-b border-slate-200 px-3 py-2 text-xs text-slate-500">{r.reply_note || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="mt-10 text-xs text-slate-400">
        <Link href="/admin/guide" className="underline underline-offset-2">
          SEO記事ダッシュボードへ
        </Link>
      </p>
    </main>
  );
}
