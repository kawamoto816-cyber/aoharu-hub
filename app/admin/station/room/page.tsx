import type { Metadata } from "next";
import Link from "next/link";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import { listRoomUsers } from "@/lib/station/room-store";
import { clearNickAction } from "./actions";

// /admin/station/room：アオハルーム（無料の自習室）の見回り（@bluespring.co.jp でログインした人だけ）。
// 今週、部屋を使った人のニックネーム・学年・ポイントを並べる。よくないニックネームは、ここで消せる。
// ほかの人に見えるのはニックネームと数字だけなので、見回るのはニックネーム。

export const metadata: Metadata = {
  title: "アオハルームの見回り｜アオハルOS 社内",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminStationRoomPage() {
  const admin = await isAdminUser();
  if (!admin.ok) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-xl font-bold text-slate-900">アオハルームの見回り</h1>
        <p className="mt-3 text-sm text-slate-500">社内アカウント（@bluespring.co.jp）でログインすると表示されます。</p>
        <Link href="/" className="mt-6 inline-block text-sm font-bold text-indigo-600 underline underline-offset-2">
          トップへ戻る
        </Link>
      </main>
    );
  }
  const rows = await listRoomUsers();
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 text-slate-800">
      <p className="text-xs font-bold text-indigo-600">アオハルOS ／ 社内</p>
      <h1 className="mt-1 text-2xl font-bold text-slate-900">アオハルームの見回り</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        今週（月曜から）、部屋を使った人です。ほかの人に見えるのはニックネームと数字だけなので、本名・学校名・連絡先・人を傷つける言葉がないかを見ます。「名前を消す」を押すと、その人は部屋とランキングに出なくなり、次に開いたときに決め直します。
      </p>
      <p className="mt-2 text-xs text-slate-500">
        <Link href="/admin/station" className="font-bold text-indigo-600 underline underline-offset-2">学習ログ</Link>
        　
        <Link href="/admin/station/bin" className="font-bold text-indigo-600 underline underline-offset-2">学習便の出席表</Link>
        　
        <Link href="/station/room" className="font-bold text-indigo-600 underline underline-offset-2">部屋を開く</Link>
      </p>
      {rows === null ? (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">読み込めませんでした。テーブル（docs/station-room.sql）がまだ無いか、接続できていません。</p>
      ) : rows.length === 0 ? (
        <p className="mt-6 text-sm text-slate-500">今週、部屋を使った人はまだいません。</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-300 text-xs text-slate-500">
                <th className="py-2 pr-3">ニックネーム</th>
                <th className="py-2 pr-3">学年</th>
                <th className="py-2 pr-3 text-right">今週のポイント</th>
                <th className="py-2 pr-3 text-right">サイクル</th>
                <th className="py-2 pr-3">いま</th>
                <th className="py-2 pr-3">ID</th>
                <th className="py-2" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.user_id} className="border-b border-slate-200">
                  <td className="py-2 pr-3 font-bold text-slate-900">{r.nick || <span className="font-normal text-slate-400">（消した・未設定）</span>}</td>
                  <td className="py-2 pr-3">{r.grade}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{r.week}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{r.cycles}</td>
                  <td className="py-2 pr-3">{r.present ? "集中中" : ""}</td>
                  <td className="py-2 pr-3 text-xs text-slate-400">{r.user_id.slice(-6)}</td>
                  <td className="py-2">
                    {r.nick ? (
                      <form action={clearNickAction}>
                        <input type="hidden" name="userId" value={r.user_id} />
                        <button type="submit" className="rounded-lg border border-rose-300 px-2.5 py-1 text-xs font-bold text-rose-700 hover:bg-rose-50">
                          名前を消す
                        </button>
                      </form>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
