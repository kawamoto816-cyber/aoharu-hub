import type { Metadata } from "next";
import Link from "next/link";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import { listRecentOutreach, salesFunnelStats, SALES_FOLDER_ID } from "@/lib/sales/outreach";
import { countApprovedWaiting, countQueuedWithEmail, leadsPipelineStats, listRecentLeads } from "@/lib/sales/leads";
import { approveAllQueuedEmailsAction } from "./actions";
import { PATTERN_LABEL } from "@/lib/sales/patterns";
import { getServiceAccount } from "@/lib/metrics/google-auth";

// /admin/sales: 法人営業の見込み先リスト（Places APIでの発見〜提案〜送信）と
// 送信数・開封・返信・面談のアクション履歴を一覧する (@bluespring.co.jp でログインした人だけ)。
// 見込み先は sales_leads (Google Places API のハーベスト)。
// 送信はサーバー(Resend)、開封・クリックは Resend Webhook、返信・面談は営業エージェントが
// ドライブに書く「返信記録」を /internal/sales/replies/ingest が取り込んで更新する。

const STATUS_LABEL: Record<string, string> = {
  new: "新規（未着手）",
  excluded: "除外",
  queued: "提案作成済み・承認待ち",
  contacted: "送信済み",
};
const STATUS_COLOR: Record<string, string> = {
  new: "bg-slate-100 text-slate-600",
  excluded: "bg-slate-100 text-slate-400",
  queued: "bg-amber-100 text-amber-800",
  contacted: "bg-emerald-100 text-emerald-700",
};

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

  const [stats, recent, leadsStats, leads, approvedWaiting, queuedWithEmail] = await Promise.all([
    salesFunnelStats(),
    listRecentOutreach(50),
    leadsPipelineStats(),
    listRecentLeads(80),
    countApprovedWaiting(),
    countQueuedWithEmail(),
  ]);
  const openRate = stats.sent ? Math.round((stats.opened / stats.sent) * 100) : 0;
  const replyRate = stats.sent ? Math.round((stats.replied / stats.sent) * 100) : 0;
  const serviceAccountEmail = getServiceAccount()?.client_email ?? null;

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">アオハルOS ／ 社内</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">法人営業ダッシュボード</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-500">
        見込み先は Google Places API で毎日少しずつ発見し（3時間おき）、テンプレートで提案文を組み立てて承認待ちにします。
        じゅんさんが法人営業エージェントに「送信OK」と返信すると「送信承認」ドキュメントが作られ、次の平日09:30 JSTにサーバーが自動送信します（直近5日分の承認をまとめて処理。フォーム宛のみ手動）。
        開封・クリックは送信メールの追跡で自動的に記録され、返信・面談は営業エージェントに伝えると自動で反映されます。
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-slate-900">見込み先パイプライン</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-5">
          {[
            { label: "発見済み（合計）", value: leadsStats.total },
            { label: "新規（未着手）", value: leadsStats.byStatus.new },
            { label: "提案作成済み・承認待ち", value: leadsStats.byStatus.queued },
            { label: "送信済み", value: leadsStats.byStatus.contacted },
            { label: "除外", value: leadsStats.byStatus.excluded },
          ].map((t) => (
            <div key={t.label} className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-bold text-slate-500">{t.label}</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{t.value}</p>
            </div>
          ))}
        </div>
        {leadsStats.byStatus.queued > 0 && (
          <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800">
            「提案作成済み・承認待ち」が{leadsStats.byStatus.queued}件あります。毎朝の法人営業エージェントの報告（通知）に「送信OK」と返信すると、エージェントが「送信承認」ドキュメントを作り、次の平日09:30 JSTの送信ジョブが直近5日分の承認をまとめてメール送信します（フォーム宛は手動）。
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-xs text-indigo-900">
          <div className="flex-1 leading-relaxed">
            <p>
              承認待ちのうち、メールで送れる先: <span className="font-bold">{queuedWithEmail}件</span>
              {approvedWaiting > 0 && (
                <>
                  ／ 一括承認済み・送信待ち: <span className="font-bold">{approvedWaiting}件</span>
                </>
              )}
            </p>
            <p className="mt-1 text-indigo-700">
              まとめて承認すると、平日09:30の送信ジョブが1日の上限まで古い順に自動送信します（フォーム宛ては対象外・手動）。
            </p>
          </div>
          {queuedWithEmail - approvedWaiting > 0 && (
            <form action={approveAllQueuedEmailsAction}>
              <button type="submit" className="rounded-full bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-700">
                メール宛て{queuedWithEmail - approvedWaiting}件をまとめて承認
              </button>
            </form>
          )}
        </div>
        {leadsStats.byStatus.new > 0 && leadsStats.byStatus.queued === 0 && (
          <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs leading-relaxed text-rose-800">
            <p className="font-bold">「新規（未着手）」が{leadsStats.byStatus.new}件たまっていますが、「提案作成済み・承認待ち」に進んでいません。</p>
            <p className="mt-1">
              毎日05:50 JSTの自動処理（テンプレート提案の書き出し）が、Google ドライブへの書き込み権限不足で失敗している可能性があります。
              以下のサービスアカウントに、法人営業フォルダ（フォルダID: <span className="font-mono">{SALES_FOLDER_ID}</span>）を
              「編集者」権限で共有してください（現在は閲覧権限のみの可能性があります）。
            </p>
            <p className="mt-1 font-mono">{serviceAccountEmail ?? "（サービスアカウント未設定）"}</p>
            <p className="mt-1">共有し直せば、コードの変更なしに翌日の自動処理から解消します。</p>
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-slate-900">見込み先リスト（発見した順・新しい順）</h2>
        {leads.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">まだ見込み先の発見はありません。</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-sm">
              <thead>
                <tr>
                  {["発見日", "法人名", "パターン", "地域", "連絡先", "状態"].map((h) => (
                    <th key={h} className="border-b-2 border-slate-300 bg-slate-50 px-3 py-2 text-left font-bold text-slate-700">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} className="align-top">
                    <td className="whitespace-nowrap border-b border-slate-200 px-3 py-2 text-slate-500">{fmt(l.discovered_at)}</td>
                    <td className="border-b border-slate-200 px-3 py-2 font-bold text-slate-900">{l.name}</td>
                    <td className="whitespace-nowrap border-b border-slate-200 px-3 py-2 text-slate-600">
                      {PATTERN_LABEL[l.pattern_key]}
                      {l.activity_label ? `（${l.activity_label}）` : ""}
                    </td>
                    <td className="whitespace-nowrap border-b border-slate-200 px-3 py-2 text-slate-600">{l.pref ?? "—"}</td>
                    <td className="border-b border-slate-200 px-3 py-2 text-xs text-slate-500">
                      {l.contact_email ?? l.contact_form_url ?? (l.exclude_reason === "no_contact" ? "連絡先なし" : "—")}
                    </td>
                    <td className="whitespace-nowrap border-b border-slate-200 px-3 py-2">
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${STATUS_COLOR[l.status]}`}>{STATUS_LABEL[l.status]}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

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
        <h2 className="text-lg font-bold text-slate-900">送信アクション履歴（新しい順）</h2>
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
