import type { Metadata } from "next";
import Link from "next/link";
import { SmartSignUpButton } from "@/components/SmartSignUpButton";
import { ShareToChild } from "@/components/ShareToChild";
import { TrackedLink } from "@/components/TrackedLink";

// /parents: 保護者向けLP。
// 高校生本人はSNSから /try に来るが、決済者は保護者。検索から来た保護者に
// 「塾との費用差」「学術的な裏付け」「本人が考えて書く設計」「いつでも解約」を伝え、
// 無料登録か「お子さんに送る」に誘導する。個人情報・顔出し・体験談は載せない方針。

export const metadata: Metadata = {
  title: "保護者の方へ｜アオハルOS",
  description:
    "総合型選抜・推薦入試の志望理由書・小論文・面接対策を、専門塾の100分の1、月980円から。まずは無料で添削レポートを。クレジットカード不要、いつでも解約できます。",
  alternates: { canonical: "https://app.bluespring.co.jp/parents" },
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "AIが書いてしまって、本人の力にならないのでは？",
    a: "アオハルOSは代筆ツールではありません。添削は本人が書いた文章に対して「どこが良く、どこを直すべきか」を返し、志望理由書の構成案は本人が対話で答えた内容だけから組み立てます（AIが勝手にエピソードを作ることはしません）。書くのはあくまで本人で、AIは何度でも付き合う添削者・面接官の役割です。",
  },
  {
    q: "塾と併用しても意味がありますか？",
    a: "はい。塾の先生に見てもらえるのは週に1回程度ですが、AIなら書き直すたびにその場で見てもらえます。塾に通っている方は「先生に見せる前の下準備」として、通っていない方は「塾の代わり」として使えます。",
  },
  {
    q: "解約は簡単にできますか？",
    a: "マイページの「プラン管理」からいつでも解約できます。解約後も期間末まで使え、次回以降の請求は発生しません。無料プランのままなら、そもそも請求はありません。",
  },
  {
    q: "支払いはどうすればいいですか？",
    a: "有料プランの決済はStripe（世界中のサービスで使われている決済基盤）でクレジットカード決済です。アカウントはお子さん本人のメールアドレスで作り、お支払いだけ保護者のカードで行う形が一般的です。",
  },
  {
    q: "子どもの書いた文章はどう扱われますか？",
    a: "添削や構成案の生成に使うためにAIに送信されますが、広告目的で利用したり第三者に販売したりすることはありません。登録に必要なのはメールアドレスだけで、住所や電話番号は求めません。",
  },
];

export default function ParentsPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12 sm:pt-24">
        <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">アオハルOS ／ 保護者の方へ</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
          塾に年間100万円を払う前に、
          <br />
          月980円で試してみませんか。
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          いま大学入学者の半数以上が総合型選抜・学校推薦型選抜で入学しています（令和6年度 53.6%
          <sup>※1</sup>）。志望理由書・小論文・面接の対策は「塾に通う」以外の選択肢がほとんどありませんでした。
          アオハルOSは、その対策をAIで、専門塾の100分の1の価格で提供します。
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <SmartSignUpButton
            analyticsLocation="parents_hero"
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-indigo-500"
          >
            無料ではじめる（カード不要）
          </SmartSignUpButton>
          <TrackedLink
            href="/try?for=highschool"
            event="parents_cta_click"
            params={{ target: "try" }}
            className="rounded-xl border border-slate-200 px-6 py-3 text-center text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50"
          >
            何が無料でできるか見る
          </TrackedLink>
        </div>
      </section>

      <section className="bg-slate-50/60 py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-xl font-bold text-slate-900">費用の比較</h2>
          <p className="mt-2 text-sm text-slate-500">
            総合型選抜・推薦入試の専門塾の一般的な料金<sup>※2</sup>と、アオハルOSの料金です。
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-xs font-bold text-slate-500">
                  <th className="px-5 py-3"> </th>
                  <th className="px-5 py-3">月額</th>
                  <th className="px-5 py-3">年間の目安</th>
                  <th className="px-5 py-3">見てもらえる回数</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-5 py-4 font-bold text-slate-900">推薦・総合型選抜の専門塾</td>
                  <td className="px-5 py-4 text-slate-700">約4万〜9万円</td>
                  <td className="px-5 py-4 text-slate-700">約50万〜100万円＋入会金</td>
                  <td className="px-5 py-4 text-slate-700">週1回程度の面談</td>
                </tr>
                <tr className="bg-indigo-50/40">
                  <td className="px-5 py-4 font-bold text-indigo-700">アオハルOS Pro</td>
                  <td className="px-5 py-4 font-bold text-indigo-700">980円</td>
                  <td className="px-5 py-4 font-bold text-indigo-700">11,760円（いつでも解約可）</td>
                  <td className="px-5 py-4 text-slate-700">添削・模擬面接・志望理由書づくりが回数無制限</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-bold text-slate-900">アオハルOS Free</td>
                  <td className="px-5 py-4 text-slate-700">0円</td>
                  <td className="px-5 py-4 text-slate-700">0円</td>
                  <td className="px-5 py-4 text-slate-700">添削レポート月2本、面接の評価レポート月1回、志望理由書の構成案月1回</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
            ※1 文部科学省「令和6年度 国公私立大学入学者選抜実施状況」。※2 複数の専門塾が公開している料金表をもとにした目安で、コースや学年により異なります。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <h2 className="text-xl font-bold text-slate-900">お子さんが使うのは、主にこの3つです</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-2xl">📝</p>
            <p className="mt-2 font-bold text-slate-900">テンサクン</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              志望理由書・小論文を貼り付けると、観点別のスコアと改善点が1分で返る添削AI。書き直すたびに何度でも。
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-2xl">🖋️</p>
            <p className="mt-2 font-bold text-slate-900">しぼりゆ</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              「何を書けばいいか分からない」段階から、対話で原体験を引き出して志望理由書の骨子と初稿を組み立てるAI。
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-2xl">🎤</p>
            <p className="mt-2 font-bold text-slate-900">メンサツ</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              大学の求める人物像（アドミッションポリシー）を読み込んだAI面接官と、本番形式の模擬面接ができるAI。
            </p>
          </div>
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-600">
          いずれも教育心理学・キャリア理論（P-E Fit理論など）に基づいて設計しています。AIが本人の代わりに書くのではなく、本人が書いた・話した内容を土台に、添削と問いかけで引き上げる仕組みです。
        </p>
      </section>

      <section className="bg-slate-50/60 py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-xl font-bold text-slate-900">保護者の方からよくいただく質問</h2>
          <div className="mt-6 space-y-3">
            {FAQ.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-slate-200 bg-white p-5">
                <summary className="cursor-pointer list-none text-sm font-bold text-slate-900">
                  <span className="mr-2 text-indigo-600">Q.</span>
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-xl font-bold text-slate-900">はじめ方は2通り</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              保護者の方がまず無料登録して中身を確かめてから、お子さんに勧める。あるいは、下の文面をそのままお子さんに送って、本人に試してもらう。どちらでも構いません。
            </p>
            <div className="mt-5">
              <SmartSignUpButton
                analyticsLocation="parents_bottom"
                className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-indigo-500"
              >
                まず自分で無料登録して確かめる
              </SmartSignUpButton>
            </div>
          </div>
          <ShareToChild />
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
