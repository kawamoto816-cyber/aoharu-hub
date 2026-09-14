import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    // /api/admin/metrics はトークン認証付き。定期タスクの取得ツールが robots.txt を尊重するため明示的に許可する。
    rules: [{ userAgent: "*", allow: ["/", "/api/admin/metrics"], disallow: ["/api/", "/admin"] }],
    sitemap: "https://app.bluespring.co.jp/sitemap.xml",
  };
}
