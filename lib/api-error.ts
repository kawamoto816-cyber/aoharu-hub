// アオハルOS: APIレスポンスの権限エラー(401/403 + reason)を判定するための共通ヘルパー。
// 各画面のfetch呼び出し箇所は、このparseApiResultでレスポンスをパースすることで、
// checkAccessAndLogUsage()が返すreason (auth_required/quota_exceeded/no_plan/payment_issue)を
// 個別に判定しなくても、ApiAccessErrorをcatchするだけでアップグレード訴求モーダルに繋げられる。

export type UpgradeReason =
  | "auth_required"
  | "quota_exceeded"
  | "no_plan"
  | "payment_issue";

const KNOWN_REASONS: UpgradeReason[] = [
  "auth_required",
  "quota_exceeded",
  "no_plan",
  "payment_issue",
];

export class ApiAccessError extends Error {
  reason: UpgradeReason;
  status?: number;

  constructor(message: string, reason: UpgradeReason, status?: number) {
    super(message);
    this.name = "ApiAccessError";
    this.reason = reason;
    this.status = status;
  }
}

function isUpgradeReason(value: unknown): value is UpgradeReason {
  return typeof value === "string" && (KNOWN_REASONS as string[]).includes(value);
}

/**
 * fetch()のResponseをJSONパースする共通ヘルパー。
 * - reasonフィールドが付いたエラー(401/403)は ApiAccessError として投げる
 *   (呼び出し側はこれをcatchしてshowUpgradeModal(error.reason)を呼べばよい)
 * - それ以外のエラー(500など)は通常のErrorとして投げる
 * - 成功時はレスポンスのJSONをそのまま返す
 */
export async function parseApiResult<T = any>(res: Response): Promise<T> {
  let data: any = {};
  try {
    data = await res.json();
  } catch {
    // レスポンスがJSONでない場合はそのまま下のエラー処理に進む
  }

  if (isUpgradeReason(data?.reason)) {
    throw new ApiAccessError(
      data.error || "ご利用いただけません。",
      data.reason,
      res.status
    );
  }

  if (!res.ok || data?.error) {
    throw new Error(data?.error || `リクエストに失敗しました (HTTP ${res.status})`);
  }

  return data as T;
}
