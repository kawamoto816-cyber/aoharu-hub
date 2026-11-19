import Link from "next/link";
import { StationShell } from "@/components/station/StationShell";
import { MyStatus } from "@/components/station/MyStatus";

// /station：ラーニングステーション（試作）の入口。駅の地図と、自分の段・コイン・会員の状態。

const ROOMS = [
  { href: "/learn", name: "自習ホーム", price: "無料", lines: ["授業・演習・模試", "さかのぼりで根っこへ", "AIコーチが伴走"], paid: false },
  { href: "/station/circle", name: "ラーニングサークル", price: "会員権　月額2,980円（案）", lines: ["4〜6人で週に1回", "学んだことをシェア", "問いと拍手で返す"], paid: true },
  { href: "/station/stage", name: "教壇", price: "登壇権　月額＋3,980円（案）", lines: ["生徒が先生になる", "書いて、または声で授業", "AIが採点し星がつく"], paid: true },
];

export default function Page() {
  return (
    <StationShell>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">学ぶ・シェアする・教える</p>
      <h1 className="m-0 mt-1 text-[28px] font-black leading-tight">ラーニングステーション</h1>
      <p className="m-0 mt-2 max-w-[720px] text-[14px] leading-relaxed text-[#3A3D55]">
        ひとりで学んだら、仲間とシェアする。わかったら、こんどは教える。わからない人は教えてもらい、覚えた人は教える。教科の学びは無料のまま、仲間と学び合う場に入るときだけ会費をいただきます。
      </p>

      <Link href="/station/guide" className="mt-4 flex items-center gap-3 rounded-[14px] border-[2px] border-[#15172B] bg-[#FFE45C] px-4 py-3 text-[#15172B] no-underline">
        <span className="text-[13px] font-black">はじめての方へ</span>
        <span className="text-[16px] font-black">使い方ツアー：10のステップで駅をひとまわり</span>
        <span aria-hidden="true" className="ml-auto font-black">→</span>
      </Link>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {ROOMS.map((r, i) => (
          <Link key={r.name} href={r.href} className={`relative block rounded-[14px] border-[1.5px] p-4 text-[#15172B] no-underline hover:-translate-y-0.5 ${r.paid ? "border-[#1533B8] bg-[#E6EAFB]" : "border-[#15172B] bg-white"}`}>
            <span className="text-[11px] font-black text-[#5A5D73]">部屋 {i + 1}</span>
            <span className="block text-[18px] font-black">{r.name}</span>
            <span className="block text-[12px] font-bold text-[#5A5D73]">{r.price}</span>
            <ul className="m-0 mt-2 list-none p-0 text-[13.5px] leading-relaxed">
              {r.lines.map((l) => (
                <li key={l}>・{l}</li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
      <Link href="/station/shelf" className="mt-3 block rounded-[14px] border-[1.5px] border-[#15172B] bg-[#EFEDE4] p-4 text-[#15172B] no-underline">
        <span className="block text-[16px] font-black">自分の棚</span>
        <span className="block text-[13px] leading-relaxed text-[#3A3D55]">学んだ単元・シェアカード・授業の記録が積み上がる。保護者への月のレポートと、総合型選抜の活動の記録になる。</span>
      </Link>

      <MyStatus />

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <section className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4">
          <h2 className="m-0 text-[16px] font-black">2つの物差しで、先生役を格付け</h2>
          <p className="m-0 mt-1 text-[13.5px] leading-relaxed text-[#3A3D55]">
            <b>マナビシュラン</b>は、授業案のAI点検と、受講者が確かめの1問を解けたかで星をつけます（わからせたかを見る）。<b>マナビログ</b>は、授業を受けた生徒の評価だけで格付けします（人気を見る）。
          </p>
          <Link href="/station/ranking" className="mt-2 inline-block text-[13px] font-black text-[#1533B8]">格付けを見る →</Link>
        </section>
        <section className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-4">
          <h2 className="m-0 text-[16px] font-black">ブルーコイン</h2>
          <p className="m-0 mt-1 text-[13.5px] leading-relaxed text-[#3A3D55]">
            学ぶ・シェアする・問いを返す・教えると貯まります。教えてもらった人は、先生役に感謝のコインを送れます。コインはお金では買えず、換金もできません。年2回のボーナス期の報酬・景品は、法律の確認が済んでから始めます。
          </p>
        </section>
      </div>
    </StationShell>
  );
}
