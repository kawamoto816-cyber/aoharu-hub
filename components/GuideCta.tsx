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

/** 記事のタイトルから大学名を取り出す（例「京都産業大学 公募推薦の出願書類…」→「京都産業大学」）。なければ null */
function universityOf(article: GuideArticle): string | null {
  const m = article.title.match(/([一-龠々ァ-ヶー]{2,10}大学)/);
  return m ? m[1] : null;
}

/** 面接の記事か（面接の記事は、面接の練習へ送る） */
function isInterview(article: GuideArticle): boolean {
  return article.topic === "mensetsu" || /面接/.test(article.title);
}

/**
 * 記事の最後・途中・画面下の案内の文面（2026-11-11）。
 * 大学別の記事は「その大学の書類を採点」「その大学の面接を練習」と、読んでいる人の目的にそのまま合わせる。
 * それ以外は記事ごとに書かれた文面（article.cta）を使う。
 */
export function ctaCopy(article: GuideArticle): { heading: string; text: string; button: string; href: string } {
  const uni = universityOf(article);
  if (article.segment === "highschool" && isInterview(article)) {
    return {
      heading: uni ? `${uni}の面接を、AI面接官で練習する` : "面接の練習を、AI面接官と今夜から",
      text: "大学の求める人物像にそって質問され、答えへの評価が返ってきます。頻出質問と答え方のカードもあります。登録は無料・カード不要です。",
      button: "面接の練習を始める",
      href: "/learn/mensetsu",
    };
  }
  if (article.segment === "highschool" && uni && article.cta.app === "tensakun") {
    const doc = /自己推薦/.test(article.title) ? "自己推薦書" : /事前課題|小論文/.test(article.title) ? "事前課題・小論文" : "志望理由書";
    return {
      heading: `${uni}の${doc}を、AIが100点満点で採点`,
      text: "書いた文章を貼るだけで、点数と「どこを・どう直すか」が返ってきます。登録なしでも3つの指摘をお試しできます。",
      button: "書いた文章を採点する",
      href: ctaHref(article),
    };
  }
  return { heading: article.cta.heading, text: article.cta.text, button: article.cta.button, href: ctaHref(article) };
}

/** 記事のテーマに合わせて、/tensaku を最初からその書類向けの表示で開く (小論文の記事 → 小論文の添削) */
export function ctaHref(article: GuideArticle): string {
  const base = CTA_HREF[article.cta.app];
  if (article.cta.app !== "tensakun") return base;
  if (article.topic === "shoronbun") return `${base}?kind=shoronbun`;
  const words = [article.title, ...article.keywords].join(" ");
  if (/自己推薦|自己PR|自己ＰＲ/.test(words)) return `${base}?kind=jiko`;
  return base;
}

export function GuideCta({ article, variant = "end" }: { article: GuideArticle; variant?: "end" | "inline" }) {
  const { cta } = article;
  const c = ctaCopy(article);
  const params = { slug: article.slug, app: c.href === "/learn/mensetsu" ? "mensatsu" : cta.app, segment: article.segment, place: variant };
  if (variant === "inline") {
    return (
      <aside className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-5">
        <p className="text-sm font-bold text-slate-900">{c.heading}</p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{c.text}</p>
        <TrackedLink
          href={c.href}
          event="guide_cta_click"
          params={params}
          className="mt-3 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-indigo-500"
        >
          {c.button} →
        </TrackedLink>
      </aside>
    );
  }
  return (
    <aside className="mt-12 rounded-2xl border-2 border-indigo-600 bg-indigo-50/40 p-6 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">アオハルOS</p>
      <p className="mt-2 text-xl font-bold text-slate-900">{c.heading}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{c.text}</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <TrackedLink
          href={c.href}
          event="guide_cta_click"
          params={params}
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-indigo-500"
        >
          {c.button} →
        </TrackedLink>
        <span className="text-xs text-slate-500">登録は無料・クレジットカード不要・いつでも解約できます</span>
      </div>
    </aside>
  );
}

/** スマホだけ、画面の下に固定で出すCTA (PCは右上の登録ボタンと本文中のCTAがあるので出さない) */
export function GuideStickyCta({ article }: { article: GuideArticle }) {
  const { cta } = article;
  const c = ctaCopy(article);
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:hidden">
      <TrackedLink
        href={c.href}
        event="guide_cta_click"
        params={{ slug: article.slug, app: cta.app, segment: article.segment, place: "sticky" }}
        className="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white"
      >
        {c.button}（無料・カード不要）→
      </TrackedLink>
    </div>
  );
}
