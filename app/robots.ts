import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    // 集計API (/internal/metrics) はトークン認証付きなので robots では触れない (Disallow すると定期タスクが読めなくなる)。
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/admin"] }],
    sitemap: "https://app.bluespring.co.jp/sitemap.xml",
  };
}
