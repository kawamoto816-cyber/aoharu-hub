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
