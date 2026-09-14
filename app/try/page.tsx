import type { Metadata } from "next";
import Link from "next/link";
import { TrackedLink } from "@/components/TrackedLink";
import { SmartSignUpButton } from "@/components/SmartSignUpButton";
import { APP_URLS, SEGMENT_COPY, SEGMENTS, parseSegment, type Segment } from "@/lib/segments";

// /try: 実利系アプリの入口ページ。
// 「文章がある人 → テンサクン (添削レポート)」「白紙の人 → しぼりゆ (構成案)」
// 「面接が不安な人 → メンサツ (1問体験)」に分岐させ、無料で結果まで到達できることを伝える。
// ?for=highschool|student|career でセグメントごとに文言を出し分ける。

export const metadata: Metadata = {
  title: "無料で試す｜アオハルOS",
  description:
    "志望理由書・小論文・ESの添削レポート、面接の評価レポート、志望理由書の構成案まで、登録だけで無料。クレジットカード不要。",
  alternates: { canonical: "https://app.bluespring.co.jp/try" },
};

const DEFAULT_SEGMENT: Segment = "highschool";

export default async function TryPage({
  searchParams,
}: {
  searchParams: Promise<{ for?: string | string[] }>;
}) {
  const params = await searchParams;
  const segment = parseSegment(params.for) ?? DEFAULT_SEGMENT;
  const copy = SEGMENT_COPY[segment];

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-8 sm:pt-24">
        <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">アオハルOS ／ 無料で試す</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{copy.tryHeadline}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">{copy.tryLead}</p>

        <nav aria-label="対象の切り替え" className="mt-6 flex flex-wrap gap-2">
          {SEGMENTS.map((key) => (
            <Link
              key={key}
              href={`/try?for=${key}`}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${
                key === segment
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {SEGMENT_COPY[key].label}
            </Link>
          ))}
        </nav>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="grid gap-5 md:grid-cols-2">
          <TrackedLink
            href={APP_URLS.tensakun}
            event="try_entry_click"
            params={{ entry: "has_text", app: "tensakun", segment }}
            className="group flex flex-col rounded-2xl border-2 border-indigo-600 bg-indigo-50/40 p-6 transition-colors hover:bg-indigo-50"
          >
            <span className="inline-flex w-fit rounded-full bg-indigo-600 px-2.5 py-1 text-[11px] font-bold text-white">
              文章がある人はこちら
            </span>
            <span className="mt-4 text-xl font-bold text-slate-900">{copy.docName}をAIに添削してもらう</span>
            <span className="mt-2 text-sm leading-relaxed text-slate-600">
              貼り付けて「提出」を押すと、観点別スコアと改善ポイントの添削レポートが1分で返ってきます。{copy.docExample}。
            </span>
            <span className="mt-4 text-xs font-bold text-indigo-700">無料：添削レポート 月2本</span>
            <span className="mt-5 inline-flex w-fit items-center gap-1 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white group-hover:bg-indigo-500">
              テンサクンで添削する →
            </span>
          </TrackedLink>

          <TrackedLink
            href={APP_URLS.shiboriyu}
            event="try_entry_click"
            params={{ entry: "blank", app: "shiboriyu", segment }}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:bg-slate-50"
          >
            <span className="inline-flex w-fit rounded-full bg-slate-800 px-2.5 py-1 text-[11px] font-bold text-white">
              まだ白紙の人はこちら
            </span>
            <span className="mt-4 text-xl font-bold text-slate-900">対話で{copy.docName}の骨子をつくる</span>
            <span className="mt-2 text-sm leading-relaxed text-slate-600">
              AIの質問に4つ答えるだけで、「何を・どのエピソードで・どの順で」書くかの構成案ができます。書き出せない人ほど効きます。
            </span>
            <span className="mt-4 text-xs font-bold text-slate-700">無料：構成案 月1回（初稿の生成はPro）</span>
            <span className="mt-5 inline-flex w-fit items-center gap-1 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-800 group-hover:border-slate-400">
              しぼりゆで骨子をつくる →
            </span>
          </TrackedLink>
        </div>

        <TrackedLink
          href={APP_URLS.mensatsu}
          event="try_entry_click"
          params={{ entry: "interview", app: "mensatsu", segment }}
          className="mt-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <span className="text-[11px] font-bold text-indigo-600">面接が不安な人は</span>
            <p className="mt-1 text-base font-bold text-slate-900">{copy.interviewName}を、AI面接官と1問だけ体験する</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              質問に1つ答えると評価レポートが届きます（無料 月1回）。本番形式の5〜10問はProで。
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-800">
            メンサツで1問体験 →
          </span>
        </TrackedLink>

        <div className="mt-10 rounded-2xl bg-slate-50/80 p-6 text-sm leading-relaxed text-slate-600">
          <p className="font-bold text-slate-900">無料で使うのに必要なこと</p>
          <p className="mt-2">
            メールアドレスかGoogleアカウントでの登録だけです。クレジットカードは要りません。無料枠は毎月リセットされ、
            もっと使いたくなったらProプラン（月980円・いつでも解約可）に切り替えられます。
          </p>
          <div className="mt-4">
            <SmartSignUpButton
              analyticsLocation="try_bottom"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-indigo-500"
            >
              先に無料登録しておく
            </SmartSignUpButton>
          </div>
        </div>

        {segment === "highschool" && (
          <p className="mt-8 text-center text-xs text-slate-500">
            保護者の方は{" "}
            <Link href="/parents" className="font-bold text-indigo-600 underline underline-offset-2">
              保護者向けのご案内
            </Link>{" "}
            もご覧ください。
          </p>
        )}
      </section>

      <footer className="mx-auto max-w-4xl px-6 pb-12 text-center text-xs text-slate-400">
        <Link href="/legal/tokushoho" className="underline underline-offset-2 hover:text-slate-600">
          特定商取引法に基づく表記
        </Link>
      </footer>
    </main>
  );
}
