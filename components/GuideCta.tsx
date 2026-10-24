import { TrackedLink } from "@/components/TrackedLink";
import { APP_URLS } from "@/lib/segments";
import type { GuideArticle } from "@/lib/guide/types";

// /guide 記事のCTA。クリックは GA4 の guide_cta_click で計測する (place で設置場所を区別)。
//   - variant "end"    : 記事末尾の大きなCTA
//   - variant "inline" : 本文の途中 (2つ目の見出しのあと) に置く小さなCTA
//   - GuideStickyCta   : スマホだけ画面下に固定するバー
// 2026-10: スマホでは右上の「無料登録」ボタンが非表示で、記事の一番下 (約6,000px先) までCTAがなかったため、
// 途中と画面下にも置くようにした。
export const CTA_HREF: Record<GuideArticle["cta"]["app"], string> = {
  // テンサクンの記事は、登録前に3つ指摘が見られる /tensaku へ (スマホでテンサクン本体の画面がはみ出すため、まず結果を見せる)
  tensakun: "/tensaku",
  shiboriyu: APP_URLS.shiboriyu,
  mensatsu: APP_URLS.mensatsu,
  try: "/try",
  parents: "/parents",
};

export function GuideCta({ article, variant = "end" }: { article: GuideArticle; variant?: "end" | "inline" }) {
  const { cta } = article;
  const params = { slug: article.slug, app: cta.app, segment: article.segment, place: variant };
  if (variant === "inline") {
    return (
      <aside className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-5">
        <p className="text-sm font-bold text-slate-900">{cta.heading}</p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{cta.text}</p>
        <TrackedLink
          href={CTA_HREF[cta.app]}
          event="guide_cta_click"
          params={params}
          className="mt-3 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-indigo-500"
        >
          {cta.button} →
        </TrackedLink>
      </aside>
    );
  }
  return (
    <aside className="mt-12 rounded-2xl border-2 border-indigo-600 bg-indigo-50/40 p-6 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">アオハルOS</p>
      <p className="mt-2 text-xl font-bold text-slate-900">{cta.heading}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{cta.text}</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <TrackedLink
          href={CTA_HREF[cta.app]}
          event="guide_cta_click"
          params={params}
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-indigo-500"
        >
          {cta.button} →
        </TrackedLink>
        <span className="text-xs text-slate-500">登録は無料・クレジットカード不要・いつでも解約できます</span>
      </div>
    </aside>
  );
}

/** スマホだけ、画面の下に固定で出すCTA (PCは右上の登録ボタンと本文中のCTAがあるので出さない) */
export function GuideStickyCta({ article }: { article: GuideArticle }) {
  const { cta } = article;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:hidden">
      <TrackedLink
        href={CTA_HREF[cta.app]}
        event="guide_cta_click"
        params={{ slug: article.slug, app: cta.app, segment: article.segment, place: "sticky" }}
        className="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white"
      >
        {cta.button}（無料・カード不要）→
      </TrackedLink>
    </div>
  );
}
