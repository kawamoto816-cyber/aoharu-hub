import type { Metadata } from "next";
import { resolveShareToken } from "@/lib/parent-share/store";
import { lastActivityByApp } from "@/lib/parent-share/activity";
import { listApplications, admissionLabel } from "@/lib/applications/store";
import { daysLeft } from "@/lib/applications/next-step";
import { applicationProgress, type DocProgress } from "@/lib/applications/parent-progress";
import { APP_KEYS, type AppKey } from "@bluespring/aoharu-entitlements";

// /parent-view/[token]: 保護者ビュー。ログイン不要、URLのトークンだけが鍵。
// 書いた文章・面接の回答内容そのものは一切出さない。出すのは
// 「対策の進み具合」（何を対策中か、稿数の目安に対してどこまで進んだか）と
// 「各アプリの最終利用日」だけ。個人情報（メールアドレス等）も出さない。

export const metadata: Metadata = {
  title: "進み具合｜アオハルOS",
  robots: { index: false, follow: false },
};

const PREP_APPS: { key: AppKey; name: string; icon: string }[] = [
  { key: APP_KEYS.SHIBORIYU, name: "しぼりゆ（志望理由書づくり）", icon: "🖋️" },
  { key: APP_KEYS.TENSAKUN, name: "テンサクン（添削）", icon: "📝" },
  { key: APP_KEYS.MENSATSU, name: "メンサツ（模擬面接）", icon: "🎤" },
];

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function deadlineNote(deadline: string | null): string | null {
  const left = daysLeft(deadline);
  if (left === null) return null;
  if (left < 0) return "締切を過ぎています";
  if (left === 0) return "本日が締切です";
  return `締切まであと${left}日`;
}

function statusBadgeClass(status: DocProgress["status"]): string {
  if (status === "仕上がってきた") return "bg-emerald-50 text-emerald-600";
  if (status === "対策中") return "bg-amber-50 text-amber-600";
  return "bg-slate-100 text-slate-500";
}

export default async function ParentViewPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const userId = await resolveShareToken(token);

  if (!userId) {
    return (
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-20 text-center">
        <p className="text-sm font-bold text-slate-900">このリンクは開けません</p>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          リンクが間違っているか、本人がリンクを作り直して無効になっています。お手数ですが、本人に新しいリンクをもらってください。
        </p>
      </main>
    );
  }

  const [applications, activity] = await Promise.all([listApplications(userId), lastActivityByApp(userId)]);
  const progressList = applications.map(applicationProgress);

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-14 sm:py-20">
      <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">アオハルOS</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">進み具合</h1>
      <p className="mt-3 text-xs leading-relaxed text-slate-500">
        書いた文章や面接の回答内容そのものは表示されません。ここで見えるのは、対策の進み具合と、各アプリを最後に使った日だけです。
      </p>

      <section className="mt-10">
        <h2 className="text-sm font-bold text-slate-900">出願案件ごとの対策の進み具合</h2>
        {progressList.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 text-xs leading-relaxed text-slate-500">
            まだ出願案件が登録されていません。
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {progressList.map(({ application, docs, doneCount, totalCount }) => {
              const note = deadlineNote(application.deadline);
              return (
                <div key={application.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <p className="text-sm font-bold text-slate-900">
                      {application.schoolName}
                      {application.faculty ? ` ${application.faculty}` : ""}
                    </p>
                    {totalCount > 0 && (
                      <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600">
                        {doneCount}/{totalCount} 仕上がってきた
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {application.admissionType ? admissionLabel(application.admissionType) : "入試方式未設定"}
                    {note ? ` ・ ${note}` : ""}
                  </p>

                  {docs.length === 0 ? (
                    <p className="mt-3 text-xs text-slate-400">対策する内容をまだ選んでいません。</p>
                  ) : (
                    <ul className="mt-4 space-y-3">
                      {docs.map((d) => (
                        <li key={d.label}>
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-700">{d.label}</span>
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${statusBadgeClass(d.status)}`}>
                              {d.status}
                            </span>
                          </div>
                          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-indigo-500"
                              style={{ width: `${Math.round(d.ratio * 100)}%` }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-bold text-slate-900">各アプリの最終利用日</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {PREP_APPS.map((app) => {
            const lastUsed = activity[app.key];
            return (
              <div key={app.key} className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm">
                  <span className="mr-1">{app.icon}</span>
                  <span className="font-bold text-slate-900">{app.name}</span>
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  {lastUsed ? `最終利用日: ${formatDate(lastUsed)}` : "まだ利用していません"}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <p className="mt-10 text-[11px] leading-relaxed text-slate-400">
        このページはリンクを知っている人であれば誰でも見られます。他の人に共有したくない場合は、本人にリンクの作り直しを頼んでください。
      </p>
    </main>
  );
}
