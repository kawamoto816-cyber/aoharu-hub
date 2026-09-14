import { TrackedLink } from "@/components/TrackedLink";
import { APP_URLS } from "@/lib/segments";
import type { GuideArticle } from "@/lib/guide/types";

// /guide 記事末尾のCTA。クリックは GA4 の guide_cta_click で計測する。
const CTA_HREF: Record<GuideArticle["cta"]["app"], string> = {
  tensakun: APP_URLS.tensakun,
  shiboriyu: APP_URLS.shiboriyu,
  mensatsu: APP_URLS.mensatsu,
  try: "/try",
  parents: "/parents",
};

export function GuideCta({ article }: { article: GuideArticle }) {
  const { cta } = article;
  return (
    <aside className="mt-12 rounded-2xl border-2 border-indigo-600 bg-indigo-50/40 p-6 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">アオハルOS</p>
      <p className="mt-2 text-xl font-bold text-slate-900">{cta.heading}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{cta.text}</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <TrackedLink
          href={CTA_HREF[cta.app]}
          event="guide_cta_click"
          params={{ slug: article.slug, app: cta.app, segment: article.segment }}
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-indigo-500"
        >
          {cta.button} →
        </TrackedLink>
        <span className="text-xs text-slate-500">登録は無料・クレジットカード不要・いつでも解約できます</span>
      </div>
    </aside>
  );
}
