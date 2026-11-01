import Link from "next/link";
import { daimonOfUnit, moshiHref, moshiUnitInfo } from "@/lib/moshi";

// 単元ページ (図解レクチャー・ドリル) に置く「定期テスト形式で解く」ボタン。その単元の大問がなければ何も出さない。

export function MoshiLink({ unit, className = "" }: { unit: string; className?: string }) {
  const n = daimonOfUnit(unit).length;
  // 小1・小2の単元はひらがな多め (ドリルと同じ出し分け)
  const kids = moshiUnitInfo(unit)?.kids ?? false;
  if (n === 0) return null;
  return (
    <Link
      href={moshiHref([unit])}
      className={`flex min-h-[48px] items-center justify-between gap-2 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-4 py-2.5 text-[15px] font-black text-[#15172B] no-underline shadow-[3px_3px_0_#15172B] ${className}`}
    >
      <span>
        {kids ? "テストの かたちで とく" : "定期テスト形式で解く"}
        <span className="block text-[12px] font-bold text-[#3A3D55]">
          {kids ? `だいもん ${n}こ・さいごに まとめて まるつけ` : `大問${n}題・最後にまとめて採点、小問ごとの解き方つき`}
        </span>
      </span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}
