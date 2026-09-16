import { getGoogleAccessToken, getServiceAccount } from "./google-auth";
import { buildMetricsReport } from "./sources";
import { formatReportText } from "./format";
import { APPROVAL_FOLDER_ID, jstNow } from "@/lib/social/queue";

// 指標レポートを Google ドキュメントとして「承認キュー」フォルダに書き出す。
// アナリスト／編集長の定期タスクは、ページ取得 (WebFetch) の許可待ちで失敗することがあるため、
// 許可が要らない Google Drive 経由で指標を渡す。
// サービスアカウントは Drive の保存容量を持たない (新規ファイルを作れない) ので、
// じゅんさんが作った固定名のドキュメント「指標レポート（最新）」の中身を毎回上書きする (冪等)。
//   必要: フォルダ内にその名前のドキュメントを作っておく／サービスアカウントにフォルダを「編集者」で共有／スコープ drive。

const DRIVE = "https://www.googleapis.com/drive/v3";
const UPLOAD = "https://www.googleapis.com/upload/drive/v3";

export const METRICS_DOC_NAME = "指標レポート（最新）";

export function metricsDocName(): string {
  return METRICS_DOC_NAME;
}

async function driveToken(): Promise<string> {
  const token = await getGoogleAccessToken();
  if (!token) throw new Error("GA4_SERVICE_ACCOUNT_JSON が未設定です (Drive に書けません)");
  return token;
}

async function findDoc(token: string, name: string): Promise<string | null> {
  const q = `'${APPROVAL_FOLDER_ID}' in parents and name = '${name.replace(/'/g, "\\'")}' and trashed = false`;
  const url = `${DRIVE}/files?q=${encodeURIComponent(q)}&fields=files(id)&supportsAllDrives=true&includeItemsFromAllDrives=true`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Drive files.list ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const json = (await res.json()) as { files?: { id: string }[] };
  return json.files?.[0]?.id ?? null;
}

function multipart(metadata: Record<string, unknown>, text: string): { body: string; contentType: string } {
  const boundary = "aoharu_metrics_boundary";
  const body =
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n` +
    `--${boundary}\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n${text}\r\n--${boundary}--`;
  return { body, contentType: `multipart/related; boundary=${boundary}` };
}

export async function publishMetricsDoc(days = 14): Promise<{ id: string; name: string; created: boolean; chars: number }> {
  const token = await driveToken();
  const report = await buildMetricsReport(days);
  const { date } = jstNow();
  const text = `更新日 (JST): ${date}\n${formatReportText(report)}`;
  const name = metricsDocName();
  const existing = await findDoc(token, name);

  const sa = getServiceAccount()?.client_email ?? "(不明)";
  if (existing) {
    const { body, contentType } = multipart({ mimeType: "application/vnd.google-apps.document" }, text);
    const res = await fetch(`${UPLOAD}/files/${existing}?uploadType=multipart&supportsAllDrives=true`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": contentType },
      body,
    });
    if (!res.ok) throw new Error(`Drive update ${res.status}: ${(await res.text()).slice(0, 200)}`);
    return { id: existing, name, created: false, chars: text.length };
  }

  throw new Error(
    `Drive にドキュメント「${name}」がありません。承認キューフォルダに Google ドキュメント「${name}」を作成し、サービスアカウント ${sa} を「編集者」で共有してください (サービスアカウントは新規作成できません)`,
  );
}
