import Link from "next/link";
import { GUIDE_ARTICLES, TOPIC_LABEL, loadGuideArticles } from "@/lib/guide";
import { listDraftArticles } from "@/lib/guide/store";
import { SEGMENT_COPY } from "@/lib/segments";

// SEO記事（/guide）の状況セクション。/admin/guide と /admin/social（配信ダッシュボード）の両方から呼ぶ共通部品。
// 記事は SEO記事エージェントが Google ドライブに書き、/internal/guide/ingest が毎日取り込む。

export async function GuideSection({ compact = false }: { compact?: boolean }) {
  const [all, drafts] = await Promise.all([loadGuideArticles(), listDraftArticles()]);
  const staticCount = GUIDE_ARTICLES.length;
  const generated = all.length - staticCount;
  const bySegment = (["highschool", "student", "career"] as const).map((seg) => ({
    seg,
    count: all.filter((a) => a.segment === seg).length,
  }));
  // 公開中の全記事（手書き＋自動生成）を新しい順に。
  const recent = [...all].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1)).slice(0, compact ? 10 : 60);

  return (
    <div>
      {!compact && (
        <p className="text-sm leading-relaxed text-slate-500">
          記事はSEO記事エージェントが毎朝ドライブに書き出し、サーバーが取り込んで /guide に公開します。
          自動チェック（本文量・出典・見出し数など）に通らなかったものは、公開されず下書きとして下に出ます。
        </p>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-4">
        {[
          { label: "公開中（合計）", value: all.length },
          { label: "うち自動生成", value: generated },
          { label: "手書きの記事", value: staticCount },
          { label: "下書き（要確認）", value: drafts.length },
        ].map((t) => (
          <div key={t.label} className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[11px] font-bold text-slate-500">{t.label}</p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900">{t.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-xs font-bold text-slate-500">対象別の本数</p>
        <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-700">
          {bySegment.map((b) => (
            <span key={b.seg}>
              {SEGMENT_COPY[b.seg].label}: <strong>{b.count}</strong> 本
            </span>
          ))}
        </div>
      </div>

      {drafts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-bold text-slate-900">下書き（公開されていない記事）</h3>
          <p className="mt-1 text-xs text-slate-500">
            ドライブの元ドキュメントを直して、翌日の取り込みでやり直すか、/internal/guide/ingest を日付指定で呼び直してください。
          </p>
          <ul className="mt-3 space-y-3">
            {drafts.map((d) => (
              <li key={d.slug} className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm font-bold text-slate-900">{d.title}</p>
                <p className="mt-1 text-xs text-slate-500">
                  /guide/{d.slug}
                  {d.source_doc ? ` ／ 元: ${d.source_doc}` : ""}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-amber-900">
                  {(d.issues ?? []).map((iss, i) => (
                    <li key={i}>{iss}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-sm font-bold text-slate-900">公開中の記事一覧（新しい順）</h3>
        {recent.length === 0 ? (
          <p className="mt-3 text-xs text-slate-400">公開中の記事はありません。</p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[760px] text-xs">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-1.5">公開日</th>
                  <th className="py-1.5">タイトル</th>
                  <th className="py-1.5">対象</th>
                  <th className="py-1.5">種類</th>
                  <th className="py-1.5">作成</th>
                  <th className="py-1.5">検索語</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((a) => (
                  <tr key={a.slug} className="border-t border-slate-100 align-top">
                    <td className="whitespace-nowrap py-2 tabular-nums text-slate-500">{a.publishedAt}</td>
                    <td className="py-2">
                      <Link href={`/guide/${a.slug}`} target="_blank" className="font-bold text-indigo-600 underline underline-offset-2">
                        {a.title}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap py-2 text-slate-600">{SEGMENT_COPY[a.segment].label}</td>
                    <td className="whitespace-nowrap py-2 text-slate-600">{TOPIC_LABEL[a.topic]}</td>
                    <td className="whitespace-nowrap py-2 text-slate-500">
                      {GUIDE_ARTICLES.some((s) => s.slug === a.slug) ? "手書き" : "自動生成"}
                    </td>
                    <td className="py-2 text-slate-500">{a.keywords.slice(0, 3).join("、")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
