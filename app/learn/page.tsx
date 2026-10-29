import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { SkillMap } from "@/components/learn/SkillMap";
import { LearnSync } from "@/components/learn/LearnSync";
import { SHORONBUN } from "@/lib/learn/shoronbun";

// /learn: 「まなぶ」のホーム。スキル盤と、次に進むカード。
// いまは「書く（小論文）」の20枚から公開している。

const URL = "https://app.bluespring.co.jp/learn";
const TITLE = "まなぶ｜総合型選抜・推薦入試のスキルをカードで習得｜アオハルOS";
const DESC = "総合型選抜・推薦入試で必要な力を、カードをめくって図解で覚え、三択で確かめ、AIアプリで試して身につけます。まずは小論文の20枚から。登録なし・無料。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function LearnHome() {
  const first = SHORONBUN.cards[0];
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
            図解で覚えて、三択で確かめて、アプリで試す。試したカードはスキル盤で青く光ります。まずは「書く：小論文」の20枚から始められます。
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
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/learn/shoronbun" className="inline-flex min-h-[52px] items-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] px-6 text-base font-black text-white no-underline shadow-[0_4px_0_#0B1F7A]">
              小論文のカードを見る
            </Link>
            <Link href={`/learn/shoronbun/${first.no}`} className="inline-flex min-h-[52px] items-center rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-6 text-base font-black text-[#15172B] no-underline">
              1枚目からめくる
            </Link>
          </div>
        </div>
        <section aria-label="スキル盤" className="rounded-[20px] border-[1.5px] border-[#15172B] bg-white/70 p-3 shadow-[6px_6px_0_#15172B]">
          <SkillMap writeIds={SHORONBUN.cards.map((c) => c.id)} />
        </section>
      </div>
    </LearnShell>
  );
}
