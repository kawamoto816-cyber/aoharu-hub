import {
  bumpDraftAction,
  createApplicationAction,
  deleteApplicationAction,
  setDocumentsAction,
  updateApplicationAction,
} from "@/app/actions/applications";
import type { Application } from "@/lib/applications/store";
import {
  ADMISSION_TYPES,
  ADMISSION_LABEL,
  DOC_KINDS,
  DOC_LABEL,
  admissionLabel,
} from "@/lib/applications/kinds";
import { daysLeft, nextStep } from "@/lib/applications/next-step";

// マイページ上部の「出願案件」。残り日数・書類の稿数・次にやること を出す。
// 書類は入試方式ごとの初期値から始まるが、実際に課されるものはユーザーが確定する
// （課される書類は大学・学部・年度で変わるため、こちらで断定しない）。
// すべてサーバーコンポーネント + フォームで、JSなしでも動く。

const INPUT =
  "w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-400";
const LABEL = "block text-xs font-bold text-slate-500";

function formatDeadline(deadline: string): string {
  return `${Number(deadline.slice(5, 7))}月${Number(deadline.slice(8, 10))}日`;
}

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

function AdmissionSelect({ id, defaultValue }: { id: string; defaultValue?: string | null }) {
  const known = ADMISSION_TYPES.find((t) => t === defaultValue);
  return (
    <select id={id} name="admissionType" defaultValue={known ?? ""} className={`${INPUT} mt-1`}>
      <option value="">選択してください</option>
      {ADMISSION_TYPES.map((t) => (
        <option key={t} value={t}>
          {ADMISSION_LABEL[t]}
        </option>
      ))}
    </select>
  );
}

function NewApplicationForm({ compact = false }: { compact?: boolean }) {
  const s = compact ? "c" : "n";
  return (
    <form action={createApplicationAction} className="mt-4 grid gap-3 sm:grid-cols-2">
      <div>
        <label className={LABEL} htmlFor={`schoolName-${s}`}>
          大学・学校名（必須）
        </label>
        <input
          id={`schoolName-${s}`}
          name="schoolName"
          required
          maxLength={100}
          placeholder="○○大学"
          className={`${INPUT} mt-1`}
        />
      </div>
      <div>
        <label className={LABEL} htmlFor={`deadline-${s}`}>
          出願日
        </label>
        <input id={`deadline-${s}`} name="deadline" type="date" className={`${INPUT} mt-1`} />
      </div>
      <div>
        <label className={LABEL} htmlFor={`faculty-${s}`}>
          学部・学科
        </label>
        <input id={`faculty-${s}`} name="faculty" maxLength={100} placeholder="△△学部" className={`${INPUT} mt-1`} />
      </div>
      <div>
        <label className={LABEL} htmlFor={`admissionType-${s}`}>
          入試方式
        </label>
        <AdmissionSelect id={`admissionType-${s}`} />
      </div>
      <div className="sm:col-span-2">
        <label className={LABEL} htmlFor={`guidelinesUrl-${s}`}>
          募集要項のURL（任意）
        </label>
        <input
          id={`guidelinesUrl-${s}`}
          name="guidelinesUrl"
          type="url"
          placeholder="https://..."
          className={`${INPUT} mt-1`}
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-indigo-500"
        >
          登録する
        </button>
        <p className="mt-2 text-xs text-slate-500">
          入試方式を選ぶと、よくある書類が最初から入ります。実際に課される書類は募集要項で確認して、あとから増減できます。
        </p>
      </div>
    </form>
  );
}

/** その入試で使う書類を選ぶ（ここが正確さの決め手なので、隠さず常に出す） */
function DocumentPicker({ application }: { application: Application }) {
  const selected = new Set(application.documents.map((d) => d.kind));
  return (
    <form action={setDocumentsAction} className="mt-3 rounded-xl border border-slate-200 p-4">
      <input type="hidden" name="applicationId" value={application.id} />
      <p className="text-xs font-bold text-slate-500">この入試で課される書類</p>
      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
        {DOC_KINDS.map((kind) => (
          <label key={kind} className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              name="kinds"
              value={kind}
              defaultChecked={selected.has(kind)}
              className="h-4 w-4 rounded border-slate-300"
            />
            {DOC_LABEL[kind]}
          </label>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-slate-700"
        >
          この内容で確定する
        </button>
        {application.guidelinesUrl ? (
          <a
            href={application.guidelinesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-indigo-600 underline underline-offset-2"
          >
            募集要項を開く →
          </a>
        ) : (
          <span className="text-xs text-slate-400">募集要項のURLを登録すると、ここから開けます</span>
        )}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-slate-500">
        課される書類は大学・学部・年度で変わります。学科試験（英語・数学など）はここには入れていません。必ず募集要項で確認してください。
      </p>
    </form>
  );
}

function ApplicationCard({ application }: { application: Application }) {
  const step = nextStep(application);
  const typeLabel = admissionLabel(application.admissionType);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-bold text-slate-900">
          {application.schoolName}
          {application.faculty ? <span className="ml-2 text-sm font-bold text-slate-500">{application.faculty}</span> : null}
        </h3>
        <DeadlineBadge deadline={application.deadline} />
      </div>
      {typeLabel && <p className="mt-1 text-xs text-slate-500">{typeLabel}</p>}

      {step ? (
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
      ) : (
        <div className="mt-5 rounded-xl bg-slate-50 p-4">
          <p className="text-sm font-bold text-slate-900">この入試で課される書類を選んでください</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-600">
            選ぶと、残りの日数に合わせて「次にやること」が出るようになります。
          </p>
        </div>
      )}

      {application.documents.length > 0 && (
        <div className="mt-5">
          <p className="text-xs font-bold text-slate-500">書類の進み具合</p>
          <ul className="mt-2 divide-y divide-slate-100">
            {application.documents.map((doc) => (
              <li key={doc.id} className="flex items-center justify-between gap-3 py-2.5">
                <span className="text-sm text-slate-700">{DOC_LABEL[doc.kind]}</span>
                <span className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">
                    {doc.draftCount === 0
                      ? "未着手"
                      : doc.kind === "mensetsu"
                        ? `${doc.draftCount}回目`
                        : `${doc.draftCount}稿目`}
                  </span>
                  <form action={bumpDraftAction}>
                    <input type="hidden" name="documentId" value={doc.id} />
                    <button
                      type="submit"
                      className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-600 transition-colors hover:border-indigo-300 hover:text-indigo-600"
                    >
                      {doc.kind === "mensetsu" ? "+1回" : "+1稿"}
                    </button>
                  </form>
                  {doc.draftCount > 0 && (
                    <form action={bumpDraftAction}>
                      <input type="hidden" name="documentId" value={doc.id} />
                      <input type="hidden" name="delta" value="-1" />
                      <button
                        type="submit"
                        className="rounded-lg px-1.5 py-1 text-xs text-slate-400 transition-colors hover:text-slate-600"
                        aria-label={`${DOC_LABEL[doc.kind]}の回数を1つ戻す`}
                      >
                        −
                      </button>
                    </form>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <DocumentPicker application={application} />

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
            <AdmissionSelect id={`edit-type-${application.id}`} defaultValue={application.admissionType} />
          </div>
          <div className="sm:col-span-2">
            <label className={LABEL} htmlFor={`edit-url-${application.id}`}>
              募集要項のURL
            </label>
            <input
              id={`edit-url-${application.id}`}
              name="guidelinesUrl"
              type="url"
              defaultValue={application.guidelinesUrl ?? ""}
              placeholder="https://..."
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
            <p className="mt-2 text-xs text-slate-400">
              入試方式を変えても、いま選んでいる書類はそのままです。書類は上のチェックで変えてください。
            </p>
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
