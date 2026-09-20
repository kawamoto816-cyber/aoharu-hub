import type { Metadata } from "next";
import Link from "next/link";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import { GuideSection } from "@/components/admin/GuideSection";

// /admin/guide: SEO記事の状況 (@bluespring.co.jp でログインした人だけ)。
// 公開中の本数と、自動チェックに引っかかって下書きのまま止まっている記事を一覧する。
// 記事は SEO記事エージェントが Google ドライブに書き、/internal/guide/ingest が毎日取り込む。
// 中身は components/admin/GuideSection に共通化してあり、/admin/social（配信ダッシュボード）にも同じものを埋め込んでいる。

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

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">アオハルOS ／ 社内</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">SEO記事ダッシュボード</h1>

      <div className="mt-6">
        <GuideSection />
      </div>

      <p className="mt-10 text-xs text-slate-400">
        <Link href="/admin/social" className="underline underline-offset-2">
          配信ダッシュボードへ
        </Link>
      </p>
    </main>
  );
}
