import type { Metadata } from "next";
import Link from "next/link";
import { TeamBuyButtons } from "@/components/billing/TeamBuyButtons";

// /juku：塾・教室向けシーズンプラン（2026-11-10 じゅんさんの判断：生徒5人 14,800円／10人 24,800円・指導者1人つき・買い切り）。
// 法人営業の提案文から案内する。払うのは塾・教室なのでログインは要らない。支払い後に招待コードを発行して配ってもらう。

export const metadata: Metadata = {
  title: "塾・教室向けシーズンプラン｜生徒の志望理由書・小論文添削と面接練習を出願まで｜アオハルOS",
  description: "生徒5人まで14,800円・10人まで24,800円（指導者1人つき・2027年3月31日まで・1回払い）。招待コードを配るだけで、生徒が自分のスマホでAI添削と面接練習を使い放題。",
  alternates: { canonical: "https://app.bluespring.co.jp/juku" },
};

const POINTS: { t: string; d: string }[] = [
  { t: "先生の添削の前に、生徒が自分で直してくる", d: "志望理由書・小論文を貼ると、100点満点の点数と直す場所が返ってきます。書き直すたびに何度でも。先生は仕上げの指導に時間を使えます。" },
  { t: "面接の練習相手が、24時間いる", d: "大学の求める人物像を読み込んだAI面接官と、本番形式で練習できます。" },
  { t: "配るのはコード1つだけ", d: "生徒は自分のメールアドレスで無料登録し、コードを入れるだけ。生徒の名簿をお預かりすることはありません。" },
];

const FAQ: { q: string; a: string }[] = [
  { q: "自動で更新されますか？", a: "されません。1回払いで、2027年3月31日まで使えます。期限後の請求はありません。" },
  { q: "領収書・請求書は出ますか？", a: "お支払い後、Stripe（決済サービス）から領収書と請求書がメールで届きます。宛名はお支払い画面で入力できます。" },
  { q: "人数が足りなくなったら？", a: "もう1つプランをお申し込みいただくと、別の招待コードが発行されます。11人以上でまとめてご利用の場合は、pr@bluespring.co.jp までご相談ください。" },
  { q: "まず試してから決めたい", a: "先生ご自身で無料登録すると、添削（月2本）と面接練習（月1回）を無料でお試しいただけます。" },
];

export default function JukuPage() {
  return (
    <main className="flex-1 bg-[#FBF8EE] text-[#15172B]">
      <section className="mx-auto max-w-3xl px-4 pb-10 pt-12 sm:pt-16">
        <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">アオハルOS ／ 塾・教室の先生へ</p>
        <h1 className="mt-2 text-[28px] font-black leading-tight sm:text-[34px]">
          生徒の志望理由書・小論文・面接を、
          <br />
          出願まで AI が何度でも見ます。
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[#3A3D55]">
          塾向けシーズンプランは、1回払いで生徒さんと先生が2027年3月31日まで、アオハルOSの全機能を使い放題にできるプランです。
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { plan: "team5" as const, name: "生徒5人まで", price: "14,800円", per: "1人あたり月 約630円" },
            { plan: "team10" as const, name: "生徒10人まで", price: "24,800円", per: "1人あたり月 約530円" },
          ].map((p) => (
            <div key={p.plan} className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]">
              <p className="m-0 text-sm font-bold">{p.name}＋指導者1人</p>
              <p className="m-0 mt-1 text-3xl font-black">{p.price}</p>
              <p className="m-0 mt-1 text-xs text-[#5A5D73]">税込・1回払い・2027年3月31日まで・{p.per}</p>
              <TeamBuyButtons plan={p.plan} />
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-[#5A5D73]">お支払いはクレジットカード・PayPay など（Stripe）。お支払い後すぐに招待コードが表示され、メールでも届きます。</p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-10">
        <h2 className="text-xl font-black">できること</h2>
        <div className="mt-4 grid gap-3">
          {POINTS.map((p) => (
            <div key={p.t} className="rounded-2xl border border-[#15172B]/20 bg-white p-4">
              <p className="m-0 text-sm font-black">{p.t}</p>
              <p className="mb-0 mt-1 text-[13.5px] leading-relaxed text-[#3A3D55]">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-14">
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
          株式会社ブルースプリング ／ pr@bluespring.co.jp ／{" "}
          <Link href="/legal/tokushoho" className="underline">
            特定商取引法に基づく表記
          </Link>
        </p>
      </section>
    </main>
  );
}
