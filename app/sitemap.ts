import type { MetadataRoute } from "next";
import { loadGuideArticles } from "@/lib/guide";

// 検索エンジン向けサイトマップ。入口ページを追加したらここに足す。
// /guide の記事は静的記事とDBの記事の両方を載せる (取り込んだ記事が当日中に見つかるように)。
export const revalidate = 600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://app.bluespring.co.jp";
  const now = new Date();
  const articles = await loadGuideArticles();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/try`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/try?for=highschool`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/try?for=student`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/try?for=career`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/parents`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/guide`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    ...articles.map((a) => ({
      url: `${base}/guide/${a.slug}`,
      lastModified: new Date(a.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    { url: `${base}/legal/tokushoho`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
