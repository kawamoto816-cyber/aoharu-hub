// /internal/metrics: /api/admin/metrics と同じ集計API の別パス。
// 定期タスク (アナリストエージェント) のページ取得ツールは robots.txt を尊重し、
// /api/ 配下の Disallow を Allow より優先してしまうため、/api/ の外に同じエンドポイントを置く。
// 認証 (社内ログイン or トークン) は元の route と共通。
export { GET, dynamic, maxDuration } from "@/app/api/admin/metrics/route";
