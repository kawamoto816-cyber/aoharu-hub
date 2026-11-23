import type { ReactNode } from "react";
import Link from "next/link";

// 学習便の案内・規約・プライバシーポリシーの共通の外枠（保護者が読むページ。試作の注意書きは出さない）
export function BinDoc({ title, lead, children }: { title: string; lead?: ReactNode; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-slate-800">
      <p className="text-xs font-bold tracking-wide text-indigo-600">アオハル 学習便（試験運用）</p>
      <h1 className="mt-2 text-2xl font-bold leading-snug text-slate-900">{title}</h1>
      {lead ? <div className="mt-3 text-sm leading-relaxed text-slate-600">{lead}</div> : null}
      <div className="mt-8 space-y-8 text-sm leading-relaxed">{children}</div>
      <nav className="mt-14 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-200 pt-6 text-xs">
        <Link href="/station/gakushubin" className="text-indigo-600 underline underline-offset-2">ご案内</Link>
        <Link href="/station/gakushubin/terms" className="text-indigo-600 underline underline-offset-2">モニター参加規約</Link>
        <Link href="/station/gakushubin/privacy" className="text-indigo-600 underline underline-offset-2">プライバシーポリシー</Link>
        <Link href="/legal/tokushoho" className="text-indigo-600 underline underline-offset-2">特定商取引法に基づく表記</Link>
      </nav>
      <p className="mt-4 text-xs text-slate-500">運営：株式会社ブルースプリング</p>
    </main>
  );
}

export function BinSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-bold text-slate-900">{title}</h2>
      <div className="mt-2 space-y-2">{children}</div>
    </section>
  );
}
