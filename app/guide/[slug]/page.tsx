import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideCta } from "@/components/GuideCta";
import { GUIDE_ARTICLES, TOPIC_LABEL, getGuideArticle, getRelatedArticles } from "@/lib/guide";
import type { GuideBlock } from "@/lib/guide/types";
import { SEGMENT_COPY } from "@/lib/segments";

// /guide/[slug]: SEO記事。lib/guide/articles/*.ts のデータから静的生成する。
// 構造化データ (Article + FAQPage + BreadcrumbList) を付け、AI検索にも引用されやすい形にする。

const BASE = "https://app.bluespring.co.jp";

export function generateStaticParams() {
  return GUIDE_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getGuideArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title}｜アオハルOS`,
    description: article.description,
    alternates: { canonical: `${BASE}/guide/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${BASE}/guide/${article.slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
  };
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-[15px] leading-8 text-slate-700">{block.text}</p>;
    case "list": {
      const cls = "space-y-2 pl-6 text-[15px] leading-7 text-slate-700 marker:text-indigo-500";
      return block.ordered ? (
        <ol className={`list-decimal ${cls}`}>
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ol>
      ) : (
        <ul className={`list-disc ${cls}`}>
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    }
    case "example":
      return (
        <figure className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          {block.label && <figcaption className="mb-2 text-xs font-bold text-slate-500">{block.label}</figcaption>}
          <blockquote className="whitespace-pre-line text-[15px] leading-7 text-slate-800">{block.text}</blockquote>
        </figure>
      );
    case "note":
      return (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
          {block.text}
        </p>
      );
    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr>
                {block.header.map((h, i) => (
                  <th key={i} className="border-b-2 border-slate-300 bg-slate-50 px-3 py-2 text-left font-bold text-slate-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="align-top">
                  {row.map((cell, c) => (
                    <td key={c} className="border-b border-slate-200 px-3 py-2 leading-relaxed text-slate-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default async function GuideArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getGuideArticle(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article);
  const url = `${BASE}/guide/${article.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      inLanguage: "ja",
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "アオハルOS（株式会社ブルースプリング）", url: BASE },
      publisher: { "@type": "Organization", name: "株式会社ブルースプリング", url: BASE },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "アオハルOS", item: BASE },
        { "@type": "ListItem", position: 2, name: "ガイド", item: `${BASE}/guide` },
        { "@type": "ListItem", position: 3, name: article.title, item: url },
      ],
    },
  ];

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto max-w-3xl px-6 pt-12 pb-16 sm:pt-16">
        <nav aria-label="パンくず" className="text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-800">
            アオハルOS
          </Link>
          <span className="mx-1.5">/</span>
          <Link href="/guide" className="hover:text-slate-800">
            ガイド
          </Link>
          <span className="mx-1.5">/</span>
          <span>{TOPIC_LABEL[article.topic]}</span>
        </nav>

        <header className="mt-4">
          <p className="text-xs font-bold text-indigo-600">
            {SEGMENT_COPY[article.segment].label} ／ {TOPIC_LABEL[article.topic]}
          </p>
          <h1 className="mt-2 text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">{article.title}</h1>
          <p className="mt-3 text-xs text-slate-400">
            更新日 {article.updatedAt.replace(/-/g, "/")} ／ アオハルOS 編集部
          </p>
          <p className="mt-5 text-[15px] leading-8 text-slate-700">{article.lead}</p>
        </header>

        <nav aria-label="目次" className="mt-8 rounded-xl border border-slate-200 p-5">
          <p className="text-xs font-bold text-slate-500">この記事の内容</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">
            {article.sections.map((s, i) => (
              <li key={i}>
                <a href={`#s${i + 1}`} className="hover:text-indigo-600 hover:underline">
                  {s.heading}
                </a>
              </li>
            ))}
            <li>
              <a href="#faq" className="hover:text-indigo-600 hover:underline">
                よくある質問
              </a>
            </li>
          </ol>
        </nav>

        {article.sections.map((s, i) => (
          <section key={i} id={`s${i + 1}`} className="mt-10 scroll-mt-20">
            <h2 className="text-xl font-bold text-slate-900">{s.heading}</h2>
            <div className="mt-4 space-y-4">
              {s.blocks.map((b, j) => (
                <Block key={j} block={b} />
              ))}
            </div>
          </section>
        ))}

        <section id="faq" className="mt-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-slate-900">よくある質問</h2>
          <dl className="mt-4 space-y-4">
            {article.faq.map((f, i) => (
              <div key={i} className="rounded-xl border border-slate-200 p-5">
                <dt className="font-bold text-slate-900">Q. {f.q}</dt>
                <dd className="mt-2 text-[15px] leading-7 text-slate-700">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <GuideCta article={article} />

        <section className="mt-10">
          <h2 className="text-sm font-bold text-slate-500">出典・参考</h2>
          <ul className="mt-2 space-y-1 text-xs text-slate-500">
            {article.sources.map((s, i) => (
              <li key={i}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-slate-800">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            入試日程・提出書類・字数などは大学・学部・年度によって異なります。出願前に必ず志望校の最新の募集要項をご確認ください。
          </p>
        </section>

        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="text-sm font-bold text-slate-500">関連する記事</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-1">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/guide/${r.slug}`}
                    className="block rounded-xl border border-slate-200 p-4 transition-colors hover:bg-slate-50"
                  >
                    <span className="text-[11px] font-bold text-indigo-600">{TOPIC_LABEL[r.topic]}</span>
                    <span className="mt-1 block text-sm font-bold text-slate-900">{r.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      <footer className="mx-auto max-w-3xl px-6 pb-12 text-center text-xs text-slate-400">
        <Link href="/legal/tokushoho" className="underline underline-offset-2 hover:text-slate-600">
          特定商取引法に基づく表記
        </Link>
      </footer>
    </main>
  );
}
