import type { Metadata } from "next";
import Link from "next/link";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import { listVoicesForAdmin } from "@/lib/voices/store";
import { VoiceReviewButtons } from "@/components/voices/VoiceReviewButtons";

// /admin/voices：テンサクンの「ひとこと送る」で届いた声（@bluespring.co.jp でログインした人だけ）。
// 「載せる」にしたもの（かつ本人が載せてよいと選んだもの）だけが /season・/parents に出る。
// 名前・学校名・個人が分かる内容・差別的な言い方が入っていたら「載せない」にする。

export const metadata: Metadata = {
  title: "利用者の声｜アオハルOS 社内",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const STATUS_LABEL = { pending: "未確認", approved: "載せる", rejected: "載せない" } as const;

export default async function AdminVoicesPage() {
  const admin = await isAdminUser();
  if (!admin.ok) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-xl font-bold text-slate-900">利用者の声</h1>
        <p className="mt-3 text-sm text-slate-500">社内アカウント（@bluespring.co.jp）でログインすると表示されます。</p>
        <Link href="/" className="mt-6 inline-block text-sm font-bold text-indigo-600 underline underline-offset-2">
          トップへ戻る
        </Link>
      </main>
    );
  }
  const voices = await listVoicesForAdmin();
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">アオハルOS ／ 社内</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">利用者の声</h1>
      <p className="mt-2 text-sm text-slate-500">
        「載せる」にして、本人が「載せてよい」を選んでいるものだけが、受験シーズンパスのページと保護者向けページに出ます。名前・学校名など個人が分かる内容があれば「載せない」にしてください。
      </p>
      {voices.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">まだ届いていません。</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {voices.map((v) => (
            <li key={v.id} className="rounded-2xl border border-slate-200 p-4">
              <p className="m-0 text-sm leading-relaxed text-slate-900">「{v.comment}」</p>
              <p className="mb-0 mt-2 text-xs text-slate-500">
                {new Date(v.created_at).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}・{v.grade}・{v.kind}
                {v.before_score != null ? `・${v.before_score}点 → ${v.after_score}点` : ""}・{v.consent_publish ? "載せてよい" : "載せないでほしい"}・
                <span className="font-bold">{STATUS_LABEL[v.status]}</span>
              </p>
              {v.consent_publish && <VoiceReviewButtons id={v.id} status={v.status} />}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
