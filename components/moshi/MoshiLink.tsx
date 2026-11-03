import Link from "next/link";
import { daimonOfUnit, moshiHref, moshiUnitInfo } from "@/lib/moshi";
import { getUnitMoshi, unitMoshiHref } from "@/lib/moshi/unit";

// 単元ページ (図解レクチャー・ドリル) に置く模試への導線。
//   単元模試 (lib/moshi/data/<単元id>.ts の UnitMoshi) があれば「この単元の模試にチャレンジ」→ /learn/moshi/<単元id>
//   なければ、大問があれば従来どおり「定期テスト形式で解く」→ /learn/moshi/play?units=<単元id>
//   どちらもなければ何も出さない。

const box =
  "flex min-h-[48px] items-center justify-between gap-2 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-4 py-2.5 text-[15px] font-black text-[#15172B] no-underline shadow-[3px_3px_0_#15172B]";

export function MoshiLink({ unit, className = "" }: { unit: string; className?: string }) {
  // 小1・小2の単元はひらがな多め (ドリルと同じ出し分け)
  const kids = moshiUnitInfo(unit)?.kids ?? false;
  const um = getUnitMoshi(unit);
  if (um) {
    const n = um.sections.reduce((a, s) => a + (s.pick ?? s.questions.length), 0);
    const varies = um.sections.some((s) => s.questions.some((q) => q.type !== "C"));
    return (
      <Link href={unitMoshiHref(unit)} className={`${box} ${className}`}>
        <span>
          {kids ? "この たんげんの もしに チャレンジ" : "この単元の模試にチャレンジ"}
          <span className="block text-[12px] font-bold text-[#3A3D55]">
            {kids ? `${n}もん・さいごに まとめて まるつけ` : `${n}問・最後にまとめて採点、解き方つき${varies ? "。解くたびに新しい問題" : ""}`}
          </span>
        </span>
        <span aria-hidden="true">→</span>
      </Link>
    );
  }
  const n = daimonOfUnit(unit).length;
  if (n === 0) return null;
  return (
    <Link href={moshiHref([unit])} className={`${box} ${className}`}>
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
