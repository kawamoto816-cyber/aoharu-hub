import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { getEntitlement } from "@bluespring/aoharu-entitlements";
import { APPS } from "@/lib/apps-config";
import { PlanActions } from "@/components/PlanActions";
import { CheckoutIntentHandler } from "@/components/CheckoutIntentHandler";
import { CheckoutSuccessTracker } from "@/components/CheckoutSuccessTracker";
import { Landing } from "@/components/landing/Landing";
import { ApplicationBoard } from "@/components/ApplicationBoard";
import { listApplications, type Application } from "@/lib/applications/store";
import { ParentShareCard } from "@/components/ParentShareCard";
import { getShareToken } from "@/lib/parent-share/store";

const SITE_URL = "https://app.bluespring.co.jp";

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

  const [entitlement, applications, shareToken] = await Promise.all([
    getEntitlement(userId),
    listApplications(userId),
    getShareToken(userId),
  ]);
  const shareUrl = shareToken ? `${SITE_URL}/parent-view/${shareToken}` : null;
  return (
    <Hub plan={entitlement.plan} entitlement={entitlement} applications={applications} shareUrl={shareUrl} />
  );
}

// ------------------------------------------------------------------
// ログイン後ハブ
// ------------------------------------------------------------------

function Hub({
  plan,
  entitlement,
  applications,
  shareUrl,
}: {
  plan: "free" | "pro" | "max";
  entitlement: Awaited<ReturnType<typeof getEntitlement>>;
  applications: Application[];
  shareUrl: string | null;
}) {
  const periodEnd = formatDate(entitlement.currentPeriodEnd);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16 sm:py-20">
      <CheckoutIntentHandler />
      <CheckoutSuccessTracker />
      <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
        アオハルOS
      </p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
        マイページ
      </h1>

      <ApplicationBoard applications={applications} />

      <ParentShareCard shareUrl={shareUrl} />

      <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8">
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
                        お試し利用可
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
            Freeプランでは、テンサクンの添削レポート(月2本)、メンサツの評価レポート(月1回)、しぼりゆの構成案(月1回)など、各アプリの「結果」まで無料でお試しいただけます。その他のアプリは月3回まで。上限に達した場合はProプランへのアップグレードをご案内します。
          </p>
        )}
        {plan === "pro" && (
          <p className="mt-4 text-xs text-slate-500">
            Proプランの対象外アプリも、各アプリ月3回まで無料でお試しいただけます。全アプリを回数制限なく使うにはMaxプランへのアップグレードをご案内します。
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
  // 2026-10 リニューアル。中身は components/landing/Landing.tsx
  return <Landing />;
}
