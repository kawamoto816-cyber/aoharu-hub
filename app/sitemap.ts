import type { MetadataRoute } from "next";

// 検索エンジン向けサイトマップ。入口ページを追加したらここに足す。
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://app.bluespring.co.jp";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/try`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/try?for=highschool`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/try?for=student`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/try?for=career`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/parents`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/legal/tokushoho`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
