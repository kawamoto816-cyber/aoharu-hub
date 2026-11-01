import Link from "next/link";
import { bookPlace } from "@/lib/lecture/book";
import { findKyoka, LEVEL_NAME } from "@/lib/learn/kyoka";
import { unitTermSet } from "@/lib/terms";
import { Rich } from "./Rich";

// 図解レクチャーの終わりに置く「教科書」の道しるべ：この単元の重要語句 → 次の単元へ・前の単元へ・目次へ。

export function BookNav({ unit, kids = false }: { unit: string; kids?: boolean }) {
  const p = bookPlace(unit);
  const terms = unitTermSet(unit);
  if (!p && !terms) return null;
  const k = p ? findKyoka(p.kyoka) : undefined;
  const T = kids
    ? { terms: "この たんげんの だいじな ことばを おぼえる", termsSub: (n: number) => `${n}こ・カードと 4たく`, next: "つぎの たんげんへ", prev: "まえの たんげん", toc: "もくじに もどる" }
    : { terms: "この単元の重要語句を覚える", termsSub: (n: number) => `${n}語・カードで覚えて4択で確かめる`, next: "次の単元へ", prev: "前の単元", toc: "目次にもどる" };
  return (
    <nav aria-label="教科書の道しるべ" className="mt-10 grid gap-3">
      {terms && (
        <Link
          href={`/learn/${terms.set}/play?g=${unit}`}
          className="flex min-h-[48px] items-center justify-between gap-2 rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-4 py-2.5 text-[15px] font-black text-[#15172B] no-underline shadow-[3px_3px_0_#15172B]"
        >
          <span>
            <Rich text={T.terms} />
            <span className="block text-[12px] font-bold text-[#3A3D55]">{T.termsSub(terms.count)}</span>
          </span>
          <span aria-hidden="true">→</span>
        </Link>
      )}
      {p && k && (
        <div className="rounded-[16px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-3">
          <p className="m-0 text-[12px] font-black text-[#1533B8]">
            教科書（図解）　{LEVEL_NAME[p.level]}{k.name}・{p.chapter}　{p.no} / {p.of}
          </p>
          {p.next && (
            <Link
              href={`/learn/lecture/${p.next.id}`}
              className="mt-2 flex min-h-[56px] items-center justify-between gap-3 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] px-4 py-2 text-white no-underline shadow-[0_4px_0_#0B1F7A]"
            >
              <span className="min-w-0">
                <span className="block text-[12px] font-bold text-[#FFE45C]">{T.next}</span>
                <span className="block text-[16px] font-black">{p.next.name}</span>
              </span>
              <span aria-hidden="true" className="text-[18px] font-black">
                →
              </span>
            </Link>
          )}
          <div className="mt-2 flex flex-wrap gap-2">
            {p.prev && (
              <Link href={`/learn/lecture/${p.prev.id}`} className="inline-flex min-h-[44px] items-center rounded-full border-[1.5px] border-[#15172B] bg-white px-3.5 text-[13px] font-bold text-[#15172B] no-underline">
                ← {T.prev}：{p.prev.name}
              </Link>
            )}
            <Link href={`/learn/kyoka/${p.kyoka}#book-${p.level}`} className="inline-flex min-h-[44px] items-center rounded-full border-[1.5px] border-[#15172B] bg-white px-3.5 text-[13px] font-bold text-[#15172B] no-underline">
              {T.toc}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
