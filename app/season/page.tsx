import type { Metadata } from "next";
import Link from "next/link";
import { SeasonPassOffer } from "@/components/billing/SeasonPassOffer";
import { VoiceList } from "@/components/voices/VoiceList";
import { seasonPrice, yen, SEASON_ENDS_LABEL } from "@/lib/aoharu-entitlements/config/season-price";

// /season：受験シーズンパスの1枚ページ。
// しぼりゆ・メンサツ（別のアプリ）で無料枠を使い切った人が ?from=<アプリ> つきで来る。
// 買うボタンは SeasonPassOffer（ログインしていなければ登録 → トップで自動的に支払い画面へ）。
// 早割の値段は日付で変わる（このページは ?from を読むので毎回作る）。

export const metadata: Metadata = {
  title: "受験シーズンパス｜志望理由書・小論文の添削と面接練習が出願まで使い放題｜アオハルOS",
  description: `志望理由書・小論文の添削、構成づくり、AI面接官との面接練習が${SEASON_ENDS_LABEL}まで使い放題。1回払い・自動更新なし。`,
  alternates: { canonical: "https://app.bluespring.co.jp/season" },
};

const APP_LABEL: Record<string, string> = {
  mensatsu: "メンサツ（面接練習）",
  shiboriyu: "しぼりゆ（志望理由書の構成づくり）",
  tensaku: "テンサクン（添削）",
};

const STEPS: { t: string; d: string }[] = [
  { t: "しぼりゆで、書く材料をそろえる", d: "対話で自分の経験を引き出して、志望理由書の骨組みを作ります。" },
  { t: "テンサクンで、書いては直す", d: "書き直すたびに点数と直すところが返ってきます。回数の制限はありません。" },
  { t: "メンサツで、面接の本番まで練習する", d: "大学の求める人物像を読み込んだAI面接官と、何度でも練習できます。" },
];

const FAQ: { q: string; a: string }[] = [
  { q: "月額のサブスクリプションですか？", a: `いいえ。1回払うだけです。${SEASON_ENDS_LABEL}が来たら無料プランにもどるだけで、自動で更新されたり追加で請求されたりすることはありません。` },
  { q: "親に払ってもらえますか？", a: "はい。「保護者にお願いする」を押すと、保護者の方が支払えるリンク（24時間有効）ができるので、LINEやメールで送れます。保護者の方が支払うと、あなたのアカウントがすぐに使い放題になります。" },
  { q: "どんな払い方ができますか？", a: "クレジットカード・PayPay・Apple Pay・Google Pay が使えます（端末によって出る払い方が変わります）。決済は Stripe という決済サービスで行います。" },
  { q: "Pro（月980円）とどちらがいいですか？", a: "出願や面接が数か月先まで続くなら、シーズンパスのほうが安く、全アプリが使えます。1〜2か月だけ使うなら Pro（いつでも解約可）が向いています。" },
];

export default async function SeasonPage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const { from } = await searchParams;
  const fromKey = from && APP_LABEL[from] ? from : null;
  const sp = seasonPrice();

  return (
    <main className="flex-1 bg-[#FBF8EE] text-[#15172B]">
      <section className="mx-auto max-w-2xl px-4 pb-10 pt-12 sm:pt-16">
        <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">アオハルOS ／ 受験シーズンパス</p>
        <h1 className="mt-2 text-[28px] font-black leading-tight sm:text-[34px]">
          出願と面接が終わるまで、
          <br />
          {yen(sp.jpy)}円で全部使い放題。
        </h1>
        {fromKey && (
          <p className="mt-4 rounded-xl border border-[#15172B]/20 bg-white px-4 py-3 text-sm font-bold leading-relaxed">
            {APP_LABEL[fromKey]}の今月の無料分を使い切りました。パスにすると、{SEASON_ENDS_LABEL}まで回数を気にせず続けられます。
          </p>
        )}
        <SeasonPassOffer location={`season_page${fromKey ? `_${fromKey}` : ""}`} />
      </section>

      <section className="mx-auto max-w-2xl px-4 pb-10">
        <h2 className="text-xl font-black">パスでできること</h2>
        <ol className="mt-4 grid list-none gap-3 p-0">
          {STEPS.map((s, i) => (
            <li key={s.t} className="rounded-2xl border-[1.5px] border-[#15172B] bg-white p-4">
              <p className="m-0 text-sm font-black">
                <span className="mr-2 text-[#1533B8]">{i + 1}</span>
                {s.t}
              </p>
              <p className="mb-0 mt-1 text-[13.5px] leading-relaxed text-[#3A3D55]">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <VoiceList className="mx-auto max-w-2xl px-4 pb-10" />

      <section className="mx-auto max-w-2xl px-4 pb-14">
        <h2 className="text-xl font-black">よくある質問</h2>
        <div className="mt-4 space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="rounded-2xl border border-[#15172B]/20 bg-white p-4">
              <summary className="cursor-pointer list-none text-sm font-bold">Q. {f.q}</summary>
              <p className="mb-0 mt-2 text-sm leading-relaxed text-[#3A3D55]">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-[#5A5D73]">
          株式会社ブルースプリング ／{" "}
          <Link href="/legal/tokushoho" className="underline">
            特定商取引法に基づく表記
          </Link>{" "}
          ／{" "}
          <Link href="/parents#season" className="underline">
            保護者の方へ
          </Link>
        </p>
      </section>
    </main>
  );
}
