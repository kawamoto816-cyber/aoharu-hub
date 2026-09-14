// /internal/metrics: /api/admin/metrics と同じ集計API の別パス。
// 定期タスク (アナリストエージェント) のページ取得ツールは robots.txt を尊重し、
// /api/ 配下の Disallow を Allow より優先してしまうため、/api/ の外に同じエンドポイントを置く。
// 認証 (社内ログイン or トークン) は元の route と共通。
// ※ dynamic / maxDuration は再エクスポートできない (Next.js が静的に解析するため) ので、ここで直接書く。
export { GET } from "@/app/api/admin/metrics/route";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
