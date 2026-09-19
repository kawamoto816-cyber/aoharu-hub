import {
  bumpDraftAction,
  createApplicationAction,
  deleteApplicationAction,
  updateApplicationAction,
} from "@/app/actions/applications";
import { DOC_LABEL, type Application } from "@/lib/applications/store";
import { daysLeft, nextStep } from "@/lib/applications/next-step";

// マイページ上部の「出願案件」。残り日数・書類の稿数・次にやること を出す。
// すべてサーバーコンポーネント + フォーム（サーバーアクション）で、JSなしでも動く。

const INPUT =
  "w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-400";
const LABEL = "block text-xs font-bold text-slate-500";

function formatDeadline(deadline: string): string {
  return `${Number(deadline.slice(5, 7))}月${Number(deadline.slice(8, 10))}日`;
}

/** 残り日数の一言。締切が近いほど強い色にする（煽らない範囲で） */
function DeadlineBadge({ deadline }: { deadline: string | null }) {
  const left = daysLeft(deadline);
  if (deadline === null || left === null) {
    return <span className="text-sm text-slate-500">出願日が未入力です</span>;
  }
  if (left < 0) {
    return <span className="text-sm font-bold text-slate-500">出願日（{formatDeadline(deadline)}）を過ぎています</span>;
  }
  const tone = left <= 7 ? "text-rose-600" : left <= 30 ? "text-amber-600" : "text-indigo-600";
  return (
    <span className={`text-sm font-bold ${tone}`}>
      出願まで残り{left}日（{formatDeadline(deadline)}）
    </span>
  );
}

function NewApplicationForm({ compact = false }: { compact?: boolean }) {
  return (
    <form action={createApplicationAction} className="mt-4 grid gap-3 sm:grid-cols-2">
      <div>
        <label className={LABEL} htmlFor={`schoolName-${compact ? "c" : "n"}`}>
          大学・学校名（必須）
        </label>
        <input
          id={`schoolName-${compact ? "c" : "n"}`}
          name="schoolName"
          required
          maxLength={100}
          placeholder="○○大学"
          className={`${INPUT} mt-1`}
        />
      </div>
      <div>
        <label className={LABEL} htmlFor={`deadline-${compact ? "c" : "n"}`}>
          出願日
        </label>
        <input
          id={`deadline-${compact ? "c" : "n"}`}
          name="deadline"
          type="date"
          className={`${INPUT} mt-1`}
        />
      </div>
      {!compact && (
        <>
          <div>
            <label className={LABEL} htmlFor="faculty-n">
              学部・学科
            </label>
            <input id="faculty-n" name="faculty" maxLength={100} placeholder="△△学部" className={`${INPUT} mt-1`} />
          </div>
          <div>
            <label className={LABEL} htmlFor="admissionType-n">
              入試方式
            </label>
            <input
              id="admissionType-n"
              name="admissionType"
              maxLength={50}
              placeholder="総合型選抜"
              className={`${INPUT} mt-1`}
            />
          </div>
        </>
      )}
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-indigo-500"
        >
          登録する
        </button>
      </div>
    </form>
  );
}

function ApplicationCard({ application }: { application: Application }) {
  const step = nextStep(application);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-bold text-slate-900">
          {application.schoolName}
          {application.faculty ? <span className="ml-2 text-sm font-bold text-slate-500">{application.faculty}</span> : null}
        </h3>
        <DeadlineBadge deadline={application.deadline} />
      </div>
      {application.admissionType && <p className="mt-1 text-xs text-slate-500">{application.admissionType}</p>}

      <div className="mt-5 rounded-xl bg-indigo-50/70 p-4">
        <p className="text-xs font-bold text-indigo-700">次にやること</p>
        <p className="mt-1 text-base font-bold text-slate-900">{step.label}</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-600">{step.reason}</p>
        <a
          href={step.appUrl}
          className="mt-3 inline-flex w-fit items-center gap-1 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-indigo-500"
        >
          {step.appName}を開く →
        </a>
      </div>

      <div className="mt-5">
        <p className="text-xs font-bold text-slate-500">書類の進み具合</p>
        <ul className="mt-2 divide-y divide-slate-100">
          {application.documents.map((doc) => (
            <li key={doc.id} className="flex items-center justify-between gap-3 py-2.5">
              <span className="text-sm text-slate-700">{DOC_LABEL[doc.kind]}</span>
              <span className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">
                  {doc.draftCount === 0 ? "未着手" : `${doc.draftCount}稿目`}
                </span>
                <form action={bumpDraftAction}>
                  <input type="hidden" name="documentId" value={doc.id} />
                  <button
                    type="submit"
                    className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-600 transition-colors hover:border-indigo-300 hover:text-indigo-600"
                  >
                    +1稿
                  </button>
                </form>
                {doc.draftCount > 0 && (
                  <form action={bumpDraftAction}>
                    <input type="hidden" name="documentId" value={doc.id} />
                    <input type="hidden" name="delta" value="-1" />
                    <button
                      type="submit"
                      className="rounded-lg px-1.5 py-1 text-xs text-slate-400 transition-colors hover:text-slate-600"
                      aria-label={`${DOC_LABEL[doc.kind]}の稿数を1つ戻す`}
                    >
                      −
                    </button>
                  </form>
                )}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-slate-400">書き直すたびに「+1稿」を押してください。</p>
      </div>

      <details className="mt-4 text-xs text-slate-500">
        <summary className="cursor-pointer select-none font-bold">この案件を編集する</summary>
        <form action={updateApplicationAction} className="mt-3 grid gap-3 sm:grid-cols-2">
          <input type="hidden" name="applicationId" value={application.id} />
          <div>
            <label className={LABEL} htmlFor={`edit-school-${application.id}`}>
              大学・学校名
            </label>
            <input
              id={`edit-school-${application.id}`}
              name="schoolName"
              defaultValue={application.schoolName}
              maxLength={100}
              className={`${INPUT} mt-1`}
            />
          </div>
          <div>
            <label className={LABEL} htmlFor={`edit-deadline-${application.id}`}>
              出願日
            </label>
            <input
              id={`edit-deadline-${application.id}`}
              name="deadline"
              type="date"
              defaultValue={application.deadline ?? ""}
              className={`${INPUT} mt-1`}
            />
          </div>
          <div>
            <label className={LABEL} htmlFor={`edit-faculty-${application.id}`}>
              学部・学科
            </label>
            <input
              id={`edit-faculty-${application.id}`}
              name="faculty"
              defaultValue={application.faculty ?? ""}
              maxLength={100}
              className={`${INPUT} mt-1`}
            />
          </div>
          <div>
            <label className={LABEL} htmlFor={`edit-type-${application.id}`}>
              入試方式
            </label>
            <input
              id={`edit-type-${application.id}`}
              name="admissionType"
              defaultValue={application.admissionType ?? ""}
              maxLength={50}
              className={`${INPUT} mt-1`}
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-slate-700"
            >
              保存する
            </button>
          </div>
        </form>
        <form action={deleteApplicationAction} className="mt-3">
          <input type="hidden" name="applicationId" value={application.id} />
          <button type="submit" className="text-xs text-slate-400 underline underline-offset-2 hover:text-rose-600">
            この案件を削除する
          </button>
        </form>
      </details>
    </article>
  );
}

export function ApplicationBoard({ applications }: { applications: Application[] }) {
  if (applications.length === 0) {
    return (
      <section className="mt-8 rounded-2xl border border-indigo-200 bg-indigo-50/50 p-6 sm:p-8">
        <h2 className="text-base font-bold text-slate-900">出願する学校を登録すると、次にやることが出ます</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          大学名と出願日を入れるだけです。残り日数と、今日やるべき一手が毎回ここに出るようになります。
        </p>
        <NewApplicationForm />
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="text-sm font-bold text-slate-900">出願案件</h2>
      <div className="mt-4 grid gap-4">
        {applications.map((a) => (
          <ApplicationCard key={a.id} application={a} />
        ))}
      </div>
      <details className="mt-4 text-xs text-slate-500">
        <summary className="cursor-pointer select-none font-bold">別の学校を追加する</summary>
        <NewApplicationForm compact />
      </details>
    </section>
  );
}
