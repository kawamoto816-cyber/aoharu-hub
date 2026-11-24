import type { Metadata } from "next";
import Link from "next/link";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import { listTrialTeamPasses, TEACHER_SEATS, TRIAL_MAX_STUDENTS } from "@/lib/team-pass/store";
import { issueTrialCodeAction } from "./actions";

// /admin/team-pass: 無料お試し用の招待コードを出す（@bluespring.co.jp でログインした人だけ）。
// 法人営業のメールで「試す」と返信をくれた塾・学校に、支払いなしで使えるコードを1つ渡すためのページ。
// 使い方は有料のコードと同じ（生徒・先生が /juku/code で自分のアカウントに入れる）。

export const metadata: Metadata = { title: "お試し用の招待コード｜アオハルOS", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const day = (iso: string) => new Date(iso).toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo", year: "numeric", month: "numeric", day: "numeric" });
const defaultEndsOn = () => new Date(Date.now() + 30 * 86400000 + 9 * 3600000).toISOString().slice(0, 10);
const codeUrl = (code: string) => `https://app.bluespring.co.jp/juku/code?c=${encodeURIComponent(code)}`;

export default async function AdminTeamPassPage({ searchParams }: { searchParams: Promise<{ issued?: string; error?: string }> }) {
  const admin = await isAdminUser();
  if (!admin.ok) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-xl font-bold text-slate-900">お試し用の招待コード</h1>
        <p className="mt-3 text-sm text-slate-500">社内アカウント（@bluespring.co.jp）でログインすると表示されます。</p>
        <Link href="/" className="mt-6 inline-block text-sm font-bold text-indigo-600 underline underline-offset-2">
          トップへ戻る
        </Link>
      </main>
    );
  }
  const { issued, error } = await searchParams;
  const passes = await listTrialTeamPasses();
  const just = issued ? passes.find((p) => p.code === issued) : undefined;
  // 期限の初期値：今日から30日後（日本時間）
  const defEnds = defaultEndsOn();
  const input = "mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm";

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 text-slate-900">
      <p className="text-xs font-bold text-slate-500">
        <Link href="/admin" className="underline underline-offset-2">
          管理画面
        </Link>
        {" / "}お試し用の招待コード
      </p>
      <h1 className="mt-2 text-2xl font-bold">無料お試し用の招待コード</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        営業メールに「試す」と返信をくれた塾・学校に渡すコードを出します。支払いは通りません。生徒と先生が、それぞれのアカウントで{" "}
        <code className="rounded bg-slate-100 px-1">/juku/code</code> にコードを入れると、期限まで全機能が使えます。
      </p>

      {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}
      {just && (
        <section className="mt-4 rounded-xl border-2 border-emerald-600 bg-emerald-50 p-4">
          <p className="text-sm font-bold text-emerald-800">発行しました（{just.org}）</p>
          <p className="mt-1 font-mono text-2xl font-bold tracking-wider">{just.code}</p>
          <p className="mt-2 text-sm">
            生徒{just.seats - TEACHER_SEATS}人＋指導者{TEACHER_SEATS}人・{day(just.endsAt)}まで
          </p>
          <p className="mt-2 text-xs text-slate-600">メールに貼る案内（コピーして使えます）</p>
          <textarea
            readOnly
            rows={9}
            className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-3 font-mono text-xs leading-relaxed"
            defaultValue={[
              `招待コード：${just.code}`,
              `使える人数：生徒${just.seats - TEACHER_SEATS}人＋先生${TEACHER_SEATS}人`,
              `使える期限：${day(just.endsAt)}まで（お支払いは要りません。期限後の請求もありません）`,
              "",
              "▼ 使い方",
              "1. 下のページを、生徒さん・先生がそれぞれのスマホやパソコンで開きます。",
              `   ${codeUrl(just.code)}`,
              "2. 無料の会員登録（またはログイン）をします。",
              "3. 招待コードが入っていることを確かめて、ボタンを押します。",
            ].join("\n")}
          />
        </section>
      )}

      <form action={issueTrialCodeAction} className="mt-6 grid gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-3">
        <label className="text-sm font-bold sm:col-span-3">
          発行先（塾・学校の名前）
          <input name="org" required maxLength={80} placeholder="例：会津さくら学院" className={input} />
        </label>
        <label className="text-sm font-bold">
          生徒の人数（1〜{TRIAL_MAX_STUDENTS}）
          <input name="students" type="number" required min={1} max={TRIAL_MAX_STUDENTS} defaultValue={10} className={input} />
        </label>
        <label className="text-sm font-bold">
          期限（この日まで）
          <input name="endsOn" type="date" required defaultValue={defEnds} max="2027-03-31" className={input} />
        </label>
        <div className="flex items-end">
          <button type="submit" className="min-h-[42px] w-full rounded-lg bg-slate-900 px-4 text-sm font-bold text-white">
            コードを発行する
          </button>
        </div>
        <p className="text-xs leading-relaxed text-slate-500 sm:col-span-3">
          先生の分として、人数に{TEACHER_SEATS}人を足して発行します。同じ人が2回入れても1人分です。期限は最長で2027年3月31日です。
        </p>
      </form>

      <h2 className="mt-8 text-lg font-bold">これまでに出したコード</h2>
      {passes.length === 0 ? (
        <p className="mt-2 text-sm text-slate-500">まだありません。</p>
      ) : (
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-300 text-xs text-slate-500">
                <th className="py-2 pr-3">発行先</th>
                <th className="py-2 pr-3">コード</th>
                <th className="py-2 pr-3">使った人数</th>
                <th className="py-2 pr-3">期限</th>
                <th className="py-2">発行日</th>
              </tr>
            </thead>
            <tbody>
              {passes.map((p) => (
                <tr key={p.code} className="border-b border-slate-100">
                  <td className="py-2 pr-3 font-bold">{p.org ?? "—"}</td>
                  <td className="py-2 pr-3 font-mono">{p.code}</td>
                  <td className="py-2 pr-3 tabular-nums">
                    {p.users.length} / {p.seats}
                  </td>
                  <td className="py-2 pr-3">{day(p.endsAt)}</td>
                  <td className="py-2">{day(p.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
