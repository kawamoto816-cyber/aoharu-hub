import type { Metadata } from "next";
import Link from "next/link";
import { GUIDE_ARTICLES, TOPIC_LABEL } from "@/lib/guide";
import { SEGMENTS, SEGMENT_COPY } from "@/lib/segments";

// /guide: 記事一覧。セグメント別にグルーピングして表示する。
export const metadata: Metadata = {
  title: "受験・就活・転職のガイド｜アオハルOS",
  description:
    "総合型選抜・推薦入試の志望理由書・小論文・面接、就活のES・面接、転職の志望動機まで。文部科学省資料などの一次情報をもとに、今日から使える書き方と準備の手順をまとめています。",
  alternates: { canonical: "https://app.bluespring.co.jp/guide" },
};

export default function GuideIndexPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-3xl px-6 pt-12 pb-8 sm:pt-16">
        <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">アオハルOS ／ ガイド</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900">受験・就活・転職の「書く・話す」ガイド</h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
          志望理由書・小論文・面接・ES・職務経歴書。文部科学省の実施要項などの一次情報をもとに、構成の型と準備の手順をまとめています。読んだら、そのまま無料で添削や模擬面接を試せます。
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        {SEGMENTS.map((seg) => {
          const items = GUIDE_ARTICLES.filter((a) => a.segment === seg);
          if (items.length === 0) return null;
          return (
            <div key={seg} className="mt-8">
              <h2 className="text-lg font-bold text-slate-900">{SEGMENT_COPY[seg].label}</h2>
              <ul className="mt-3 space-y-3">
                {items.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/guide/${a.slug}`}
                      className="block rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:bg-slate-50"
                    >
                      <span className="text-[11px] font-bold text-indigo-600">{TOPIC_LABEL[a.topic]}</span>
                      <span className="mt-1 block text-base font-bold text-slate-900">{a.title}</span>
                      <span className="mt-2 block text-sm leading-relaxed text-slate-500">{a.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        <div className="mt-12 rounded-2xl bg-slate-50/80 p-6 text-sm leading-relaxed text-slate-600">
          <p className="font-bold text-slate-900">読んだら、無料で試せます</p>
          <p className="mt-2">
            書いた文章はテンサクンで添削レポート（無料で月2本）、白紙ならしぼりゆで構成案、面接はメンサツでAI面接官と1問体験。登録だけで、クレジットカードは要りません。
          </p>
          <Link
            href="/try"
            className="mt-4 inline-flex rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-500"
          >
            無料で試す →
          </Link>
        </div>
      </section>
    </main>
  );
}
