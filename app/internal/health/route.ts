import { NextResponse } from "next/server";

// 疎通と資格情報の診断用。秘密の値そのものは一切返さない。
//   GET /internal/health              各資格情報が本番環境に設定されているかだけを返す
//   GET /internal/health?token=...    そのトークンが ADMIN_METRICS_TOKEN と一致するかも返す
// 内部APIが {"error":"forbidden"} を返したときに、
// 「環境変数が未設定」なのか「値が食い違っている」のかをすぐ切り分けるために使う。
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const expected = process.env.ADMIN_METRICS_TOKEN;
  const cronSecret = process.env.CRON_SECRET;
  const given = req.headers.get("x-admin-token") ?? new URL(req.url).searchParams.get("token");
  const auth = req.headers.get("authorization");

  const tokenMatches = given ? given === expected : null;
  const cronMatches = auth ? Boolean(cronSecret) && auth === `Bearer ${cronSecret}` : null;

  const hint = !expected
    ? "ADMIN_METRICS_TOKEN が本番環境に設定されていません。Vercel の Settings → Environment Variables で Production に追加し、再デプロイしてください"
    : tokenMatches === false
      ? "渡されたトークンが ADMIN_METRICS_TOKEN と一致しません。Vercel 側の値か、呼び出し側の値のどちらかを揃えてください"
      : tokenMatches === true
        ? "OK (管理トークンは有効です)"
        : "資格情報は設定されています。?token=... を付けると、その値が一致するかも確認できます";

  return NextResponse.json(
    {
      ok: true,
      jst: new Date(Date.now() + 9 * 3600 * 1000).toISOString().replace("T", " ").slice(0, 16),
      adminTokenConfigured: Boolean(expected),
      cronSecretConfigured: Boolean(cronSecret),
      tokenSupplied: Boolean(given),
      tokenMatches,
      cronSupplied: Boolean(auth),
      cronMatches,
      hint,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
