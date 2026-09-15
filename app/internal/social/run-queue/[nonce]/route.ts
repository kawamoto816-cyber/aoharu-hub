// /internal/social/run-queue/<任意の文字列>: run-queue と同じ処理。
// 定期タスクのページ取得ツールがクエリ違いをキャッシュ扱いすることがあるため、
// パス自体を毎回変えられるようにしている (nonce は無視する)。
export { GET } from "../route";

export const dynamic = "force-dynamic";
export const maxDuration = 120;
