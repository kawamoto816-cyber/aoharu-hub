import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { LearnBoard } from "@/components/learn/LearnBoard";
import { LearnSync } from "@/components/learn/LearnSync";
import { SHORONBUN } from "@/lib/learn/shoronbun";
import { MENSETSU } from "@/lib/learn/mensetsu";
import { SHIBORIYUSHO } from "@/lib/learn/shiboriyusho";
import { JIBUN } from "@/lib/learn/jibun";
import { DAIGAKU } from "@/lib/learn/daigaku";
import { KYOYO } from "@/lib/learn/kyoyo";
import { PARADIGM } from "@/lib/learn/paradigm";

// /learn: 「まなぶ」のホーム。スキル盤と、次に進むカード。
// 表は5つの領域 (自分を知る・志望校を知る・書く・話す・教養・時事) の各20枚。
// 裏面 (難関校アドバンスト) はいま「知のパラダイム」20枚を公開している。

const URL = "https://app.bluespring.co.jp/learn";
const TITLE = "まなぶ｜総合型選抜・推薦入試のスキルをカードで習得｜アオハルOS";
const DESC = "総合型選抜・推薦入試で必要な力を、カードをめくって図解で覚え、三択で確かめ、AIアプリで試して身につけます。自分を知る・志望校を知る・志望理由書・小論文・面接・教養・時事の各20枚。登録なし・無料。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function LearnHome() {
  return (
    <LearnShell crumbs={[{ href: "/", label: "アオハルOS" }, { label: "まなぶ" }]}>
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <h1 className="m-0 text-[28px] font-black leading-snug sm:text-[36px]">
            カードをめくって、
            <br />
            <span className="bg-[linear-gradient(transparent_58%,#FFE45C_58%)]">合格に必要な力</span>を集めよう。
          </h1>
          <p className="mb-0 mt-4 text-[15px] leading-[1.9] text-[#3A3D55]">
            図解で覚えて、三択で確かめて、アプリで試す。試したカードはスキル盤で青く光ります。「自分を知る」「志望校を知る」「書く：志望理由書」「書く：小論文」「話す：面接」「教養・時事」の各20枚があります。
          </p>
          <ul className="m-0 mt-5 list-none space-y-2 p-0 text-[14px]">
            {["登録なし・無料で全部読める", "無料登録すると、進み具合をアカウントに保存", "総合型選抜の本の著者が監修"].map((t) => (
              <li key={t} className="flex gap-2">
                <span className="font-black text-[#1533B8]">✓</span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <LearnSync showNudge returnUrl="/learn" />
          </div>
          <div id="topics" className="mt-6 flex scroll-mt-6 flex-wrap gap-3">
            <Link href="/learn/jibun" className="inline-flex min-h-[52px] items-center rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-6 text-base font-black text-[#15172B] no-underline shadow-[0_4px_0_#15172B]">
              自分を知るカード
            </Link>
            <Link href="/learn/daigaku" className="inline-flex min-h-[52px] items-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#BFE3D0] px-6 text-base font-black text-[#15172B] no-underline shadow-[0_4px_0_#15172B]">
              志望校を知るカード
            </Link>
            <Link href="/learn/shiboriyusho" className="inline-flex min-h-[52px] items-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-6 text-base font-black text-[#15172B] no-underline shadow-[0_4px_0_#15172B]">
              志望理由書のカード
            </Link>
            <Link href="/learn/shoronbun" className="inline-flex min-h-[52px] items-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] px-6 text-base font-black text-white no-underline shadow-[0_4px_0_#0B1F7A]">
              小論文のカード
            </Link>
            <Link href="/learn/mensetsu" className="inline-flex min-h-[52px] items-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#D9341F] px-6 text-base font-black text-white no-underline shadow-[0_4px_0_#15172B]">
              面接のカード
            </Link>
            <Link href="/learn/kyoyo" className="inline-flex min-h-[52px] items-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#D8D2F5] px-6 text-base font-black text-[#15172B] no-underline shadow-[0_4px_0_#15172B]">
              教養・時事のカード
            </Link>
          </div>
        </div>
        <LearnBoard
          ids={{
            self: JIBUN.cards.map((c) => c.id),
            school: DAIGAKU.cards.map((c) => c.id),
            write: [...SHIBORIYUSHO.cards, ...SHORONBUN.cards].map((c) => c.id),
            talk: MENSETSU.cards.map((c) => c.id),
            kyoyo: KYOYO.cards.map((c) => c.id),
            paradigm: PARADIGM.cards.map((c) => c.id),
          }}
        />
      </div>
    </LearnShell>
  );
}
