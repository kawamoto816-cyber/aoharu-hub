import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SmartSignUpButton } from "@/components/SmartSignUpButton";
import { TrackedLink } from "@/components/TrackedLink";
import { BeforeAfter } from "@/components/landing/BeforeAfter";
import { DemoButton } from "@/components/landing/DemoButton";
import { zen, klee } from "@/components/landing/fonts";
import { TUTORIALS, TUTORIAL_ORDER, type TutorialKey } from "@/lib/tutorials";

// /tutorial/[app]: Pro プランの3アプリの紹介ページ。
// いちばん伝えたいのは「使うと書類・答えがどう変わるか」。見本の使う前／使った後を最初に見せ、
// そのあとに使い方 (入れるもの → 返ってくるもの) と無料で試せる範囲を置く。

const BASE = "https://app.bluespring.co.jp";

export function generateStaticParams() {
  return TUTORIAL_ORDER.map((app) => ({ app }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ app: string }> }): Promise<Metadata> {
  const { app } = await params;
  const t = TUTORIALS[app as TutorialKey];
  if (!t) return {};
  return {
    title: `${t.name}の使い方と効果｜アオハルOS`,
    description: t.metaDescription,
    alternates: { canonical: `${BASE}/tutorial/${t.key}` },
    openGraph: { title: `${t.name}の使い方と効果｜アオハルOS`, description: t.metaDescription, url: `${BASE}/tutorial/${t.key}` },
  };
}

const paper =
  "bg-[#F7F6F1] [background-image:linear-gradient(#E4E2D8_1px,transparent_1px),linear-gradient(90deg,#E4E2D8_1px,transparent_1px)] [background-size:28px_28px]";

export default async function TutorialPage({ params }: { params: Promise<{ app: string }> }) {
  const { app } = await params;
  const t = TUTORIALS[app as TutorialKey];
  if (!t) notFound();
  const idx = TUTORIAL_ORDER.indexOf(t.key);
  const next = TUTORIALS[TUTORIAL_ORDER[(idx + 1) % TUTORIAL_ORDER.length]];

  return (
    <main className={`${zen.className} flex-1 bg-[#F7F6F1] text-[#15172B]`}>
      <header className="sticky top-0 z-40 border-b border-[#E4E2D8] bg-[#F7F6F1]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6 sm:pr-[230px]">
          <Link href="/" className="flex items-center gap-2.5 text-[#15172B]">
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-[#1533B8] text-lg font-black text-white">ア</span>
            <span className="text-xl font-black tracking-wide">アオハルOS</span>
          </Link>
          <nav aria-label="アプリ" className="flex flex-wrap gap-2 text-sm font-bold">
            {TUTORIAL_ORDER.map((k) => (
              <Link
                key={k}
                href={`/tutorial/${k}`}
                aria-current={k === t.key ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 ${k === t.key ? "bg-[#15172B] text-white" : "text-[#15172B] hover:bg-white"}`}
              >
                {TUTORIALS[k].step}｜{TUTORIALS[k].name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* 見出し + 使う前／使った後 */}
      <section className={`${paper} border-b border-[#E4E2D8]`}>
        <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
          <p className="m-0 text-sm font-bold" style={{ color: t.color }}>
            {t.step} ― {t.name}
          </p>
          <h1 className="mt-3 max-w-[22em] text-[28px] font-black leading-[1.35] sm:text-[42px]">{t.title}</h1>
          <p className="mt-4 max-w-[40em] text-[15px] leading-[1.9] text-[#3A3D55] sm:text-[17px]">{t.lead}</p>
          <div className="mt-10">
            <BeforeAfter t={t} handFont={klee.className} />
          </div>
          <p className="mt-6 text-xs text-[#5A5D73]">
            見本は編集部が作成した例です（実在の生徒の文章ではありません）。実際に返ってくる内容は、入力した文章や志望校によって変わります。
          </p>
        </div>
      </section>

      {/* 何が変わったか */}
      <section className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="m-0 text-[26px] font-black sm:text-[34px]">{t.name}を使うと、ここが変わる。</h2>
        <div className="mt-8 grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          {t.changes.map((c, i) => (
            <article key={c.title} className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-7">
              <p className="m-0 text-[36px] font-black leading-none" style={{ color: t.color }}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-0 mt-3 text-xl font-black">{c.title}</h3>
              <p className="mb-0 mt-2 text-[15px] leading-[1.8] text-[#3A3D55]">{c.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 使い方 */}
      <section className="border-y border-[#E4E2D8] bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="m-0 text-[26px] font-black sm:text-[34px]">使い方は、3つだけ。</h2>
            <DemoButton src={t.video} title={t.name} app={t.key} />
          </div>
          <ol className="m-0 mt-8 flex list-none flex-col gap-4 p-0">
            {t.steps.map((s, i) => (
              <li key={s.title} className="grid gap-4 rounded-[18px] border-[1.5px] border-[#15172B] p-6 md:grid-cols-[180px_1fr_auto_1fr] md:items-center">
                <p className="m-0 text-lg font-black">
                  <span className="mr-2" style={{ color: t.color }}>{i + 1}</span>
                  {s.title}
                </p>
                <div className="rounded-xl bg-[#F7F6F1] p-4">
                  <p className="m-0 text-xs font-bold text-[#5A5D73]">あなたが入れるもの</p>
                  <p className="mb-0 mt-1 text-[15px] leading-[1.7]">{s.input}</p>
                </div>
                <svg className="hidden md:block" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#15172B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
                <div className="rounded-xl bg-[#FFF6C4] p-4">
                  <p className="m-0 text-xs font-bold text-[#5A5D73]">返ってくるもの</p>
                  <p className="mb-0 mt-1 text-[15px] font-bold leading-[1.7]">{s.output}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 無料でできること + CTA */}
      <section className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-wrap items-center gap-10 rounded-3xl border-[1.5px] border-[#15172B] bg-white p-7 sm:p-12">
          <div className="min-w-0 flex-[1_1_420px]">
            <h2 className="m-0 text-[24px] font-black leading-[1.4] sm:text-[30px]">{t.name}で受け取れるもの</h2>
            <ul className="m-0 mt-5 flex list-none flex-col gap-2.5 p-0 text-[15px]">
              {t.returns.map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <span className="font-black text-[#1533B8]">✓</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <p className="mb-0 mt-5 text-sm leading-[1.8] text-[#3A3D55]">{t.free}</p>
          </div>
          <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-3">
            <SmartSignUpButton
              analyticsLocation={`tutorial_${t.key}`}
              className="inline-flex min-h-[56px] items-center justify-center rounded-[14px] bg-[#1533B8] px-7 text-[17px] font-bold text-white shadow-[0_4px_0_#0B1F7A]"
            >
              無料で{t.name}を試す
            </SmartSignUpButton>
            <TrackedLink
              href={t.url}
              event="try_entry_click"
              params={{ app: t.key, location: "tutorial" }}
              className="inline-flex min-h-[52px] items-center justify-center rounded-[14px] border-2 border-[#15172B] px-7 text-[15px] font-bold text-[#15172B] hover:bg-[#FFF6C4]"
            >
              登録済みの方は{t.name}を開く
            </TrackedLink>
            <p className="m-0 text-center text-xs text-[#5A5D73]">登録だけ・クレジットカード不要</p>
          </div>
        </div>
      </section>

      {/* よくある質問 */}
      <section className="mx-auto max-w-[880px] px-4 pb-16 sm:px-6">
        <h2 className="m-0 text-[24px] font-black sm:text-[28px]">よくある質問</h2>
        <div className="mt-6 flex flex-col gap-3">
          {t.faq.map((f) => (
            <details key={f.q} className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-[22px] py-[18px]">
              <summary className="cursor-pointer text-base font-bold">{f.q}</summary>
              <p className="mb-0 mt-3 text-[15px] leading-[1.85] text-[#3A3D55]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 次のアプリ */}
      <section className="bg-[#15172B] text-white">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-6 px-4 py-12 sm:px-6">
          <p className="m-0 text-lg font-bold">
            次は「{next.step}」― {next.name}
          </p>
          <Link href={`/tutorial/${next.key}`} className="inline-flex min-h-[48px] items-center rounded-xl bg-[#FFE45C] px-6 font-black text-[#15172B]">
            {next.name}の使い方と効果を見る →
          </Link>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-4 px-4 pb-28 pt-7 text-xs text-[#5A5D73] sm:px-6 sm:pb-10">
        <Link href="/" className="text-[#5A5D73] underline underline-offset-2">アオハルOS トップへ</Link>
        <Link href="/legal/tokushoho" className="text-[#5A5D73] underline underline-offset-2">特定商取引法に基づく表記</Link>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E4E2D8] bg-white/95 px-4 pb-5 pt-3 backdrop-blur sm:hidden">
        <SmartSignUpButton
          analyticsLocation={`tutorial_${t.key}_sticky`}
          className="flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[#1533B8] text-base font-bold text-white"
        >
          無料で{t.name}を試す（カード不要）
        </SmartSignUpButton>
      </div>
    </main>
  );
}
