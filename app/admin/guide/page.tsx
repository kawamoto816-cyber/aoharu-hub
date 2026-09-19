import type { Metadata } from "next";
import Link from "next/link";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import { GUIDE_ARTICLES, TOPIC_LABEL, loadGuideArticles } from "@/lib/guide";
import { listDraftArticles } from "@/lib/guide/store";
import { SEGMENT_COPY } from "@/lib/segments";

// /admin/guide: SEO記事の状況 (@bluespring.co.jp でログインした人だけ)。
// 公開中の本数と、自動チェックに引っかかって下書きのまま止まっている記事を一覧する。
// 記事は SEO記事エージェントが Google ドライブに書き、/internal/guide/ingest が毎日取り込む。

export const metadata: Metadata = {
  title: "SEO記事ダッシュボード｜アオハルOS",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminGuidePage() {
  const admin = await isAdminUser();
  if (!admin.ok) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-xl font-bold text-slate-900">SEO記事ダッシュボード</h1>
        <p className="mt-3 text-sm text-slate-500">社内アカウント（@bluespring.co.jp）でログインすると表示されます。</p>
        <Link href="/" className="mt-6 inline-block text-sm font-bold text-indigo-600 underline underline-offset-2">
          トップへ戻る
        </Link>
      </main>
    );
  }

  const [all, drafts] = await Promise.all([loadGuideArticles(), listDraftArticles()]);
  const staticCount = GUIDE_ARTICLES.length;
  const generated = all.length - staticCount;
  const bySegment = (["highschool", "student", "career"] as const).map((seg) => ({
    seg,
    count: all.filter((a) => a.segment === seg).length,
  }));
  const recent = all.filter((a) => !GUIDE_ARTICLES.some((s) => s.slug === a.slug)).slice(0, 30);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">アオハルOS ／ 社内</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">SEO記事ダッシュボード</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-500">
        記事はSEO記事エージェントが毎朝ドライブに書き出し、サーバーが取り込んで /guide に公開します。
        自動チェック（本文量・出典・見出し数など）に通らなかったものは、公開されず下書きとして下に出ます。
      </p>

      <section className="mt-8 grid gap-4 sm:grid-cols-4">
        {[
          { label: "公開中（合計）", value: all.length },
          { label: "うち自動生成", value: generated },
          { label: "手書きの記事", value: staticCount },
          { label: "下書き（要確認）", value: drafts.length },
        ].map((t) => (
          <div key={t.label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-bold text-slate-500">{t.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{t.value}</p>
          </div>
        ))}
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold text-slate-500">対象別の本数</p>
        <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-700">
          {bySegment.map((b) => (
            <span key={b.seg}>
              {SEGMENT_COPY[b.seg].label}: <strong>{b.count}</strong> 本
            </span>
          ))}
        </div>
      </section>

      {drafts.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold text-slate-900">下書き（公開されていない記事）</h2>
          <p className="mt-1 text-xs text-slate-500">
            ドライブの元ドキュメントを直して、翌日の取り込みでやり直すか、/internal/guide/ingest を日付指定で呼び直してください。
          </p>
          <ul className="mt-4 space-y-3">
            {drafts.map((d) => (
              <li key={d.slug} className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
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
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-lg font-bold text-slate-900">公開中の自動生成記事（新しい順）</h2>
        {recent.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">まだ取り込まれた記事はありません。</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr>
                  {["公開日", "タイトル", "対象", "種類", "検索語"].map((h) => (
                    <th key={h} className="border-b-2 border-slate-300 bg-slate-50 px-3 py-2 text-left font-bold text-slate-700">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((a) => (
                  <tr key={a.slug} className="align-top">
                    <td className="whitespace-nowrap border-b border-slate-200 px-3 py-2 text-slate-500">{a.publishedAt}</td>
                    <td className="border-b border-slate-200 px-3 py-2">
                      <Link href={`/guide/${a.slug}`} className="font-bold text-indigo-600 underline underline-offset-2">
                        {a.title}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap border-b border-slate-200 px-3 py-2 text-slate-600">{SEGMENT_COPY[a.segment].label}</td>
                    <td className="whitespace-nowrap border-b border-slate-200 px-3 py-2 text-slate-600">{TOPIC_LABEL[a.topic]}</td>
                    <td className="border-b border-slate-200 px-3 py-2 text-xs text-slate-500">{a.keywords.slice(0, 3).join("、")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="mt-10 text-xs text-slate-400">
        <Link href="/admin/social" className="underline underline-offset-2">
          配信ダッシュボードへ
        </Link>
      </p>
    </main>
  );
}
