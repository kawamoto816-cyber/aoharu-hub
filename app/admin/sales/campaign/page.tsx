import type { Metadata } from "next";
import Link from "next/link";
import { isAdminUser } from "@/lib/metrics/admin-auth";
import { CAMPAIGN, CAMPAIGN_BODY, campaignStatus } from "@/lib/sales/campaign";
import { getSalesControls } from "@/lib/sales/outreach";
import { runCampaignAction, sendCampaignTestAction, skipCampaignAction } from "./actions";

// /admin/sales/campaign: 塾向けのご案内を、過去に営業メールを送った学習塾へ、1通ずつ送る（@bluespring.co.jp でログインした人だけ）。
// 送るのはボタンを押したときだけ。1回に送る数は、ふだんの営業送信と同じ上限 (sales_controls.max_per_run)。

export const metadata: Metadata = { title: "塾向けご案内の送信｜アオハルOS", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export const maxDuration = 120;

export default async function CampaignPage({ searchParams }: { searchParams: Promise<{ msg?: string }> }) {
  const admin = await isAdminUser();
  if (!admin.ok) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-xl font-bold text-slate-900">塾向けご案内の送信</h1>
        <p className="mt-3 text-sm text-slate-500">社内アカウント（@bluespring.co.jp）でログインすると表示されます。</p>
      </main>
    );
  }
  const { msg } = await searchParams;
  const [st, controls] = await Promise.all([campaignStatus().catch((e) => (e instanceof Error ? e.message : String(e))), getSalesControls()]);
  const btn = "min-h-[44px] rounded-lg px-4 text-sm font-bold";

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 text-slate-900">
      <p className="text-xs font-bold text-slate-500">
        <Link href="/admin/sales" className="underline underline-offset-2">
          法人営業ダッシュボード
        </Link>
        {" / "}塾向けご案内の送信
      </p>
      <h1 className="mt-2 text-2xl font-bold">{CAMPAIGN.name}</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        これまでに営業メールを送った学習塾へ、1通ずつ送ります。送信停止の宛先、届かなかった宛先、返信をくださった宛先、このご案内をもう送った宛先には送りません。送るのは、下のボタンを押したときだけです。
      </p>

      {msg && <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm font-bold text-emerald-800">{msg}</p>}

      {typeof st === "string" ? (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">宛先を読みこめませんでした：{st}</p>
      ) : (
        <>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { l: "これから送れる", v: st.eligible.length },
              { l: "送った", v: st.sent },
              { l: "対象（学習塾・送信済み）", v: st.base },
              { l: "1回に送る上限", v: controls.maxPerRun },
            ].map((x) => (
              <li key={x.l} className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-bold text-slate-500">{x.l}</p>
                <p className="mt-1 text-2xl font-bold tabular-nums">{x.v}</p>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-slate-500">
            送らない宛先：送信停止 {st.excluded.suppressed}・届かなかった／苦情 {st.excluded.bounced}・返信あり {st.excluded.replied}・送れないアドレス {st.excluded.unusable}・「送らない」にした {st.excluded.skipped}
          </p>
          <p className="mt-2 rounded-lg bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
            「返信あり」は、返信の記録（営業エージェントへの報告）がある宛先だけです。お試しのコードを出した塾など、個別にやりとりしている宛先は、下の一覧の「送らない」で外してください。
          </p>
          {controls.paused && <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm font-bold text-amber-800">送信は止まっています：{controls.pausedReason ?? "理由の記録なし"}</p>}

          <div className="mt-5 flex flex-wrap gap-3">
            <form action={sendCampaignTestAction}>
              <button type="submit" className={`${btn} border border-slate-300 bg-white text-slate-800`}>
                まず自分あてに1通送って確かめる（{admin.email}）
              </button>
            </form>
            {st.eligible.length > 0 && !controls.paused && (
              <form action={runCampaignAction}>
                <button type="submit" className={`${btn} bg-slate-900 text-white`}>
                  次の {Math.min(st.eligible.length, controls.maxPerRun)} 件に送る
                </button>
              </form>
            )}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            押すと、すぐに送信が始まります（取り消せません）。終わるまで、このページを閉じずにお待ちください。残りがあるときは、時間をおいてもう一度押します。
          </p>

          {st.eligible.length > 0 && (
            <details open className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
              <summary className="cursor-pointer text-sm font-bold">これから送る宛先（全 {st.eligible.length} 件。上から {Math.min(st.eligible.length, controls.maxPerRun)} 件が次に送られます）</summary>
              <ul className="mt-2 divide-y divide-slate-100 text-xs leading-relaxed text-slate-600">
                {st.eligible.map((t, i) => (
                  <li key={t.email} className={`flex items-center justify-between gap-2 py-1 ${i < controls.maxPerRun ? "" : "opacity-60"}`}>
                    <span className="min-w-0">
                      {t.company}　<span className="break-all font-mono">{t.email}</span>
                    </span>
                    <form action={skipCampaignAction}>
                      <input type="hidden" name="email" value={t.email} />
                      <input type="hidden" name="skip" value="1" />
                      <button type="submit" className="shrink-0 rounded border border-slate-300 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                        送らない
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            </details>
          )}
          {st.skips.length > 0 && (
            <details className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
              <summary className="cursor-pointer text-sm font-bold">「送らない」にした宛先（{st.skips.length} 件）</summary>
              <ul className="mt-2 divide-y divide-slate-100 text-xs leading-relaxed text-slate-600">
                {st.skips.map((t) => (
                  <li key={t.email} className="flex items-center justify-between gap-2 py-1">
                    <span className="min-w-0">
                      {t.company}　<span className="break-all font-mono">{t.email}</span>
                    </span>
                    <form action={skipCampaignAction}>
                      <input type="hidden" name="email" value={t.email} />
                      <input type="hidden" name="skip" value="0" />
                      <button type="submit" className="shrink-0 rounded border border-slate-300 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                        送る宛先にもどす
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </>
      )}

      <h2 className="mt-8 text-lg font-bold">送る文面</h2>
      <p className="mt-2 text-sm">
        <b>件名：</b>
        {CAMPAIGN.subject}
      </p>
      <pre className="mt-2 whitespace-pre-wrap rounded-xl border border-slate-200 bg-white p-4 text-[13px] leading-relaxed">{CAMPAIGN_BODY}</pre>
      <p className="mt-2 text-xs text-slate-500">
        資料（PDF）は添付ではなく、文中のリンクで開きます：
        <a href={CAMPAIGN.flyer} target="_blank" rel="noopener noreferrer" className="ml-1 font-bold text-indigo-600 underline underline-offset-2">
          {CAMPAIGN.flyer}
        </a>
      </p>
    </main>
  );
}
