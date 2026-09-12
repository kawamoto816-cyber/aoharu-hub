import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import { getEntitlement } from "@bluespring/aoharu-entitlements";
import { APPS } from "@/lib/apps-config";
import { PlanActions } from "@/components/PlanActions";
import { PricingTable } from "@/components/PricingTable";
import { CheckoutIntentHandler } from "@/components/CheckoutIntentHandler";

const PLAN_LABEL: Record<"free" | "pro" | "max", string> = {
  free: "Free",
  pro: "Pro",
  max: "Max",
};

const STATUS_LABEL: Record<string, string> = {
  active: "有効",
  trialing: "トライアル中",
  past_due: "お支払いエラー",
  canceled: "解約済み",
  incomplete: "手続き未完了",
  incomplete_expired: "手続き期限切れ",
  unpaid: "未払い",
};

function formatDate(iso: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    return <LandingPage />;
  }

  const entitlement = await getEntitlement(userId);
  return <Hub plan={entitlement.plan} entitlement={entitlement} />;
}

// ------------------------------------------------------------------
// ログイン後ハブ
// ------------------------------------------------------------------

function Hub({
  plan,
  entitlement,
}: {
  plan: "free" | "pro" | "max";
  entitlement: Awaited<ReturnType<typeof getEntitlement>>;
}) {
  const periodEnd = formatDate(entitlement.currentPeriodEnd);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16 sm:py-20">
      <CheckoutIntentHandler />
      <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
        アオハルOS
      </p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
        マイページ
      </h1>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-slate-500">現在のプラン</p>
            <p className="mt-1 text-xl font-bold text-slate-900">
              {PLAN_LABEL[plan]}プラン
            </p>
            {entitlement.status !== "active" && plan !== "free" && (
              <p className="mt-1 text-xs font-bold text-amber-600">
                状態: {STATUS_LABEL[entitlement.status] ?? entitlement.status}
              </p>
            )}
            {entitlement.cancelAtPeriodEnd && periodEnd && (
              <p className="mt-1 text-xs text-slate-500">
                {periodEnd} をもって自動更新が停止します。
              </p>
            )}
            {!entitlement.cancelAtPeriodEnd && periodEnd && plan !== "free" && (
              <p className="mt-1 text-xs text-slate-500">
                次回更新日: {periodEnd}
              </p>
            )}
          </div>
          <PlanActions plan={plan} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-bold text-slate-900">利用できるアプリ</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {APPS.map((app) => {
            const hasAccess = entitlement.hasAccess(app.key);
            return (
              <div
                key={app.key}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 p-5"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{app.icon}</span>
                    <span className="text-sm font-bold text-slate-900">
                      {app.name}
                    </span>
                    {hasAccess ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                        利用可能
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                        {plan === "free" ? "お試し利用可" : "プラン対象外"}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    {app.description}
                  </p>
                </div>
                <a
                  href={app.url}
                  className="mt-4 inline-flex w-fit items-center gap-1 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-indigo-500"
                >
                  アプリを開く →
                </a>
              </div>
            );
          })}
        </div>
        {plan === "free" && (
          <p className="mt-4 text-xs text-slate-500">
            Freeプランでは各アプリを月3回まで無料でお試しいただけます。上限に達した場合はProプランへのアップグレードをご案内します。
          </p>
        )}
      </section>

      <footer className="mt-16 text-xs text-slate-400">
        <Link href="/legal/tokushoho" className="underline underline-offset-2 hover:text-slate-600">
          特定商取引法に基づく表記
        </Link>
      </footer>
    </main>
  );
}

// ------------------------------------------------------------------
// ログイン前LP
// ------------------------------------------------------------------

function LandingPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-16 text-center sm:pt-28">
        <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
          アオハルOS
        </p>
        <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
          受験も、就活も、転職も。
          <br />
          進路とキャリアを切り拓くAIアプリ群
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
          小論文添削の「テンサクン」、志望理由書・ESづくりの「しぼりゆ」、面接対策の「メンサツ」など、高校生・受験生から大学生の就職活動、社会人の転職活動まで、進路・キャリアづくりを支えるAIアプリをひとつのアカウントでまとめて利用できます。
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <SignInButton mode="modal">
            <button className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-indigo-500">
              無料ではじめる
            </button>
          </SignInButton>
          <a
            href="#apps"
            className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50"
          >
            提供アプリを見る
          </a>
        </div>
      </section>

      <section id="apps" className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-center text-xl font-bold text-slate-900">
          提供アプリ
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {APPS.map((app) => (
            <div
              key={app.key}
              className="rounded-2xl border border-slate-200 p-6"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{app.icon}</span>
                <span className="text-base font-bold text-slate-900">
                  {app.name}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {app.description}
              </p>
            </div>
          ))}
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400">
            今後もアオハルOSのアプリは順次追加予定です
          </div>
        </div>
      </section>

      <section className="bg-slate-50/60 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-xl font-bold text-slate-900">
            料金プラン
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-xs leading-relaxed text-slate-500">
            高校生・受験生の総合型選抜/推薦対策から、大学生の就職活動、社会人の転職活動まで。プランを選んでそのままお申し込みいただけます。
          </p>
          <PricingTable />
          <p className="mt-4 text-center text-[11px] text-slate-400">
            表示価格は全て税込です。プランはいつでも変更・解約できます。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-900">
          さっそく無料ではじめましょう
        </h2>
        <p className="mt-3 text-sm text-slate-500">
          クレジットカード登録なしで、今すぐ各アプリをお試しいただけます。
        </p>
        <div className="mt-6">
          <SignInButton mode="modal">
            <button className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-indigo-500">
              無料ではじめる
            </button>
          </SignInButton>
        </div>
      </section>

      <footer className="mx-auto max-w-4xl px-6 pb-12 text-center text-xs text-slate-400">
        <Link href="/legal/tokushoho" className="underline underline-offset-2 hover:text-slate-600">
          特定商取引法に基づく表記
        </Link>
      </footer>
    </main>
  );
}
