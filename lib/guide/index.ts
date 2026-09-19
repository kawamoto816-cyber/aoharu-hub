import type { GuideArticle } from "./types";
import { article as shiboRiyushoKakikata } from "./articles/shibo-riyusho-kakikata";
import { article as shiboRiyushoNazeKonoDaigaku } from "./articles/shibo-riyusho-naze-kono-daigaku";
import { article as sogoGataSuisenChigai } from "./articles/sogo-gata-suisen-chigai";
import { article as sogoGataMensetsuShitsumon } from "./articles/sogo-gata-mensetsu-shitsumon";
import { article as shoronbunKakikata } from "./articles/shoronbun-kakikata";

export type { GuideArticle, GuideBlock, GuideSection } from "./types";

// 記事を追加したらここに1行足す (新しいものを上に)。
export const GUIDE_ARTICLES: GuideArticle[] = [
  shiboRiyushoKakikata,
  shiboRiyushoNazeKonoDaigaku,
  sogoGataSuisenChigai,
  sogoGataMensetsuShitsumon,
  shoronbunKakikata,
];

export const TOPIC_LABEL: Record<GuideArticle["topic"], string> = {
  "shibo-riyusho": "志望理由書",
  shoronbun: "小論文",
  mensetsu: "面接",
  "nyushi-seido": "入試制度",
  es: "ES・就活",
  tenshoku: "転職",
};

export function getGuideArticle(slug: string): GuideArticle | undefined {
  return GUIDE_ARTICLES.find((a) => a.slug === slug);
}

/**
 * 表示に使う記事の全件 (静的記事 + DBの記事)。同じ slug があれば静的記事を優先する。
 * DBが未設定・未作成でも静的記事だけで動く。
 */
export async function loadGuideArticles(): Promise<GuideArticle[]> {
  const { listPublishedArticles } = await import("./store");
  const stored = await listPublishedArticles();
  const staticSlugs = new Set(GUIDE_ARTICLES.map((a) => a.slug));
  return [...GUIDE_ARTICLES, ...stored.filter((a) => !staticSlugs.has(a.slug))];
}

/** 1本ぶん。静的記事になければDBを見る */
export async function loadGuideArticle(slug: string): Promise<GuideArticle | undefined> {
  const found = getGuideArticle(slug);
  if (found) return found;
  const { getStoredArticle } = await import("./store");
  return (await getStoredArticle(slug)) ?? undefined;
}

/** 関連記事 (全件のプールから選ぶ) */
export function pickRelated(article: GuideArticle, pool: GuideArticle[], limit = 3): GuideArticle[] {
  const bySlug = new Map(pool.map((a) => [a.slug, a]));
  const explicit = (article.related ?? [])
    .map((s) => bySlug.get(s))
    .filter((a): a is GuideArticle => Boolean(a) && a!.slug !== article.slug);
  if (explicit.length >= limit) return explicit.slice(0, limit);
  const rest = pool.filter(
    (a) => a.slug !== article.slug && !explicit.some((e) => e.slug === a.slug) && a.segment === article.segment,
  );
  return [...explicit, ...rest].slice(0, limit);
}

export function getRelatedArticles(article: GuideArticle, limit = 3): GuideArticle[] {
  const explicit = (article.related ?? [])
    .map((s) => getGuideArticle(s))
    .filter((a): a is GuideArticle => Boolean(a) && a!.slug !== article.slug);
  if (explicit.length >= limit) return explicit.slice(0, limit);
  const rest = GUIDE_ARTICLES.filter(
    (a) => a.slug !== article.slug && !explicit.some((e) => e.slug === a.slug) && a.segment === article.segment,
  );
  return [...explicit, ...rest].slice(0, limit);
}
