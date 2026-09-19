import { NextResponse } from "next/server";
import { isAdminToken } from "@/lib/metrics/admin-auth";
import { APPROVAL_FOLDER_ID, exportDocText, jstNow } from "@/lib/social/queue";
import { getGoogleAccessToken, getServiceAccount } from "@/lib/metrics/google-auth";
import { parseArticleDoc } from "@/lib/guide/parse";
import { upsertArticle } from "@/lib/guide/store";
import { GUIDE_ARTICLES } from "@/lib/guide";

// Google ドライブの「SEO記事 YYYY-MM-DD」ドキュメントを読み、/guide の記事としてDBに取り込む。
//   GET /internal/guide/ingest?token=...                            (管理トークン / 手動)
//   GET /internal/guide/ingest + Authorization: Bearer CRON_SECRET  (GitHub Actions)
//   GET /internal/guide/ingest?date=YYYY-MM-DD                      日付を指定して取り込み直す
//   GET /internal/guide/ingest?dry=1                                保存せず結果だけ見る
// 何度呼んでも同じ結果になる (slug で upsert するため)。
// 自動の品質チェックに通ったものだけ published、引っかかったものは draft として保存する。
export const dynamic = "force-dynamic";
export const maxDuration = 120;

function isCron(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret) && req.headers.get("authorization") === `Bearer ${secret}`;
}

async function findArticleDocs(date: string): Promise<{ id: string; name: string }[]> {
  const token = await getGoogleAccessToken();
  if (!token) throw new Error("GA4_SERVICE_ACCOUNT_JSON が未設定です (Drive を読めません)");
  const q = `'${APPROVAL_FOLDER_ID}' in parents and name contains 'SEO記事 ${date}' and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name)&orderBy=modifiedTime%20desc&supportsAllDrives=true&includeItemsFromAllDrives=true`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    const sa = getServiceAccount()?.client_email ?? "(不明)";
    throw new Error(`Drive files.list ${res.status}: ${(await res.text()).slice(0, 200)} — フォルダをサービスアカウント ${sa} に閲覧共有してください`);
  }
  const json = (await res.json()) as { files?: { id: string; name: string }[] };
  return json.files ?? [];
}

export async function GET(req: Request) {
  if (!isAdminToken(req) && !isCron(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const p = new URL(req.url).searchParams;
  const date = p.get("date") ?? jstNow().date;
  const dry = p.get("dry") === "1";

  let docs: { id: string; name: string }[];
  try {
    docs = await findArticleDocs(date);
  } catch (e) {
    return NextResponse.json({ ok: false, stage: "find", date, error: e instanceof Error ? e.message : String(e) }, { status: 502 });
  }

  const staticSlugs = new Set(GUIDE_ARTICLES.map((a) => a.slug));
  const results: { slug: string; title: string; status: string; issues?: string[]; error?: string }[] = [];

  for (const doc of docs) {
    let text: string;
    try {
      text = await exportDocText(doc.id);
    } catch (e) {
      results.push({ slug: "(doc)", title: doc.name, status: "failed", error: e instanceof Error ? e.message : String(e) });
      continue;
    }
    for (const { article, issues } of parseArticleDoc(text, date)) {
      // 静的記事と同じ slug は上書きしない (手で書いた記事を自動生成で潰さないため)
      if (staticSlugs.has(article.slug)) {
        results.push({ slug: article.slug, title: article.title, status: "skipped_static" });
        continue;
      }
      if (dry) {
        results.push({ slug: article.slug, title: article.title, status: issues.length ? "would_draft" : "would_publish", issues });
        continue;
      }
      try {
        await upsertArticle(article, issues, doc.name);
        results.push({ slug: article.slug, title: article.title, status: issues.length ? "draft" : "published", issues: issues.length ? issues : undefined });
      } catch (e) {
        results.push({ slug: article.slug, title: article.title, status: "failed", error: e instanceof Error ? e.message : String(e) });
      }
    }
  }

  const published = results.filter((r) => r.status === "published").length;
  const draft = results.filter((r) => r.status === "draft").length;
  const failed = results.filter((r) => r.status === "failed").length;

  return NextResponse.json(
    {
      ok: failed === 0,
      date,
      docs: docs.map((d) => d.name),
      found: results.length,
      published,
      draft,
      failed,
      results,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
