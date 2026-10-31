import type { MetadataRoute } from "next";
import { loadGuideArticles } from "@/lib/guide";
import { SHORONBUN } from "@/lib/learn/shoronbun";
import { MENSETSU } from "@/lib/learn/mensetsu";
import { SHIBORIYUSHO } from "@/lib/learn/shiboriyusho";
import { JIBUN } from "@/lib/learn/jibun";
import { DAIGAKU } from "@/lib/learn/daigaku";
import { KYOYO } from "@/lib/learn/kyoyo";
import { PARADIGM } from "@/lib/learn/paradigm";
import { KINDAI } from "@/lib/learn/kindai";
import { CHISEIGAKU } from "@/lib/learn/chiseigaku";
import { KOKUSAI } from "@/lib/learn/kokusai";
import { GENDAI } from "@/lib/learn/gendai";
import { BOOKS } from "@/lib/library/books";
import { STEPS } from "@/lib/math/steps";

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
    { url: `${base}/tensaku`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/parents`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/guide`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/learn`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/learn/shoronbun`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...SHORONBUN.cards.map((c) => ({ url: `${base}/learn/shoronbun/${c.no}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: `${base}/learn/jibun`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...JIBUN.cards.map((c) => ({ url: `${base}/learn/jibun/${c.no}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: `${base}/learn/daigaku`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...DAIGAKU.cards.map((c) => ({ url: `${base}/learn/daigaku/${c.no}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: `${base}/learn/kyoyo`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...KYOYO.cards.map((c) => ({ url: `${base}/learn/kyoyo/${c.no}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: `${base}/learn/paradigm`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...PARADIGM.cards.map((c) => ({ url: `${base}/learn/paradigm/${c.no}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: `${base}/learn/kindai`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...KINDAI.cards.map((c) => ({ url: `${base}/learn/kindai/${c.no}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: `${base}/learn/chiseigaku`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...CHISEIGAKU.cards.map((c) => ({ url: `${base}/learn/chiseigaku/${c.no}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: `${base}/learn/kokusai`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...KOKUSAI.cards.map((c) => ({ url: `${base}/learn/kokusai/${c.no}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: `${base}/learn/gendai`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...GENDAI.cards.map((c) => ({ url: `${base}/learn/gendai/${c.no}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: `${base}/learn/library`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/learn/apply`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/learn/math`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...STEPS.map((st) => ({ url: `${base}/learn/math/${st.no}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...BOOKS.map((b) => ({ url: `${base}/learn/library/${b.id}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 })),
    { url: `${base}/learn/shiboriyusho`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...SHIBORIYUSHO.cards.map((c) => ({ url: `${base}/learn/shiboriyusho/${c.no}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: `${base}/learn/mensetsu`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...MENSETSU.cards.map((c) => ({ url: `${base}/learn/mensetsu/${c.no}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...["shiboriyu", "tensakun", "mensatsu"].map((k) => ({ url: `${base}/tutorial/${k}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...articles.map((a) => ({
      url: `${base}/guide/${a.slug}`,
      lastModified: new Date(a.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    { url: `${base}/legal/tokushoho`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
