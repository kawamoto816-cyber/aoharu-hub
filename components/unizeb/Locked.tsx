import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { Kicker, UZ_HOME, uzCrumbs } from "@/components/unizeb/parts";

// プランで読めないページの案内（本体チャットが組み込みで追加。2026-11-04 承認の料金：列伝・ケース・資料集の全部は Pro・Max）。
export function UzLocked({ kicker, title, lead, mid, plan }: { kicker: string; title: string; lead: string; mid: { href: string; label: string }; plan: "pro" | "max" }) {
  return (
    <LearnShell narrow crumbs={uzCrumbs(title, mid)}>
      <Kicker>{kicker}</Kicker>
      <h1 className="m-0 mt-1 text-[26px] font-black leading-tight">{title}</h1>
      <p className="m-0 mt-3 text-[15px] leading-relaxed">{lead}</p>
      <p className="m-0 mt-5 rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3.5 text-[15px] font-black leading-relaxed">
        この先は {plan === "max" ? "Max" : "Pro・Max"} のプランで読めます。
      </p>
      <p className="m-0 mt-3 text-[14px] leading-relaxed">登録しなくても、見本の列伝・ケースと Lv1〜3 の図解レクチャー・スキルカードは使えます。</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/#pricing" className="inline-flex min-h-[48px] items-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-5 text-sm font-black text-[#15172B] no-underline shadow-[0_3px_0_#15172B]">
          プランを見る
        </Link>
        <Link href={UZ_HOME} className="inline-flex min-h-[48px] items-center rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-5 text-sm font-black text-[#15172B] no-underline shadow-[0_3px_0_#15172B]">
          起業の棚にもどる
        </Link>
      </div>
    </LearnShell>
  );
}
