import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import type { Lecture } from "@/lib/lecture/types";
import { Rich } from "@/components/lecture/Rich";
import { UZ_SCENES } from "@/lib/unizeb/registry";
import { LectureStoryView } from "@/components/lecture/Story";
import { cardInfo, deptLabel } from "@/lib/unizeb";
import { uzJugyoHref } from "@/lib/jugyo/uz";
import { uzJugyoSpan } from "@/lib/jugyo/uz/lessons";
import { Checks, figBases, Kicker, NextLinks, SectionView, UZ_HOME, uzCrumbs } from "./parts";

// ゼロワンOSユース版の図解レクチャー（/learn/unizeb/lec/<カードid>）。
// 型は lib/lecture の Lecture のまま。読者は「若き起業家」。最後は「このスキルを自分の事業で使う → カードへ」。

export function UzLecturePage({ lec, id }: { lec: Lecture; id: string }) {
  const c = cardInfo(id);
  const name = lec.nameRuby ?? c?.name ?? id;
  const bases = figBases(lec.sections, UZ_SCENES[`lec/${id}`]);
  const m = lec.mission;
  const jugyo = uzJugyoSpan(id);
  return (
    <LearnShell narrow crumbs={uzCrumbs(c?.name ?? id, { href: `${UZ_HOME}#lec`, label: "教科書" })} homeHref="/learn">
      <Kicker>
        図解レクチャー　{c ? `Lv${c.lv}・${deptLabel(c.dept)}・${id.toUpperCase()}` : id}
      </Kicker>
      <h1 className="m-0 mt-1 text-[26px] font-black leading-tight"><Rich text={name} /></h1>
      <p className="m-0 mt-2 text-[16px] font-black leading-snug text-[#3A3D55]"><Rich text={lec.title} /></p>

      <section aria-labelledby="lec-hook" className="mt-5 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-4 sm:p-5">
        <h2 id="lec-hook" className="m-0 text-[13px] font-black text-[#1533B8]">導入　なぜ学ぶの？</h2>
        <p className="m-0 mt-2 text-[15px] leading-relaxed"><Rich text={lec.hook} /></p>
        {lec.mystery && m && (
          <div className="mt-4 overflow-hidden rounded-[14px] border-[1.5px] border-[#15172B] bg-[#15172B] text-white shadow-[4px_4px_0_#B42318]">
            <div className="flex items-center gap-2 border-b border-dashed border-white/25 px-3.5 py-2">
              <span className="rounded bg-[#B42318] px-1.5 py-0.5 text-[11px] font-black tracking-[0.15em]">MISSION</span>
              <span className="text-[12.5px] font-black text-[#FFE45C]">若き起業家のあなたへ、依頼です</span>
            </div>
            <div className="px-3.5 pb-3.5 pt-2.5">
              <p className="m-0 text-[12px] font-bold text-[#C9CEF2]">依頼人：<Rich text={m.from} /></p>
              <p className="m-0 mt-1.5 text-[14.5px] leading-relaxed"><Rich text={m.request} /></p>
              <div className="mt-3 rounded-[10px] border-[1.5px] border-[#FFE45C] bg-white px-3 py-2.5 text-[#15172B]">
                <p className="m-0 text-[11.5px] font-black text-[#B42318]">解いてほしい謎</p>
                <p className="m-0 mt-1 text-[15.5px] font-black leading-relaxed"><Rich text={lec.mystery} /></p>
              </div>
              <p className="m-0 mt-2.5 text-[12px] font-bold text-[#C9CEF2]">手がかりは、この先の{lec.sections.length}つの節にある。読みながら考えよう。</p>
            </div>
          </div>
        )}
        <ol className="m-0 mt-3 grid list-none gap-1 border-t border-dashed border-[#C9C6B4] p-0 pt-3 text-[13px] font-bold text-[#3A3D55]">
          {lec.sections.map((s, i) => (
            <li key={s.heading}>
              <a href={`#lec-s${i + 1}`} className="text-[#3A3D55] hover:text-[#1533B8]">
                {i + 1}. <Rich text={s.heading} />
              </a>
            </li>
          ))}
        </ol>
      </section>

      {jugyo && (
        <Link href={uzJugyoHref(id)} className="mt-3 flex min-h-[52px] items-center gap-3 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#15172B] px-3.5 py-2.5 text-white no-underline shadow-[3px_3px_0_#1533B8] transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5">
          <span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#FFE45C] text-[13px] text-[#15172B]">
            ▶
          </span>
          <span className="min-w-0">
            <span className="block text-[14.5px] font-black leading-snug">このレクチャーを授業で見る</span>
            <span className="block text-[12px] font-bold text-[#C9CEF2]">約{jugyo.minutes}分・{jugyo.stops}回止まる　止まる授業</span>
          </span>
          <span aria-hidden="true" className="ml-auto flex-none text-[16px] font-black">→</span>
        </Link>
      )}

      {lec.sections.map((s, i) => (
        <SectionView
          key={s.heading}
          s={s}
          i={i}
          idp="lec-s"
          fig={bases[i]}
          last={i === lec.sections.length - 1}
          scenes={UZ_SCENES[`lec/${id}`]}
          extra={
            s.reveal ? (
              <div className="mt-5 overflow-hidden rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFF1EE] shadow-[4px_4px_0_#15172B]">
                <div className="flex items-center gap-2 bg-[#B42318] px-3.5 py-2 text-white">
                  <span className="rounded bg-white px-1.5 py-0.5 text-[11px] font-black tracking-[0.1em] text-[#B42318]">MISSION COMPLETE</span>
                  <span className="text-[13px] font-black">謎が解けた</span>
                </div>
                <div className="px-3.5 pb-3.5 pt-2.5">
                  {lec.mystery && <p className="m-0 text-[12.5px] font-bold text-[#5A5D73]"><Rich text={lec.mystery} /></p>}
                  <p className="m-0 mt-1.5 text-[15px] font-bold leading-relaxed"><Rich text={s.reveal} /></p>
                  {m && (
                    <div className="mt-3 rounded-[10px] border border-dashed border-[#15172B] bg-white px-3 py-2">
                      <p className="m-0 text-[11.5px] font-black text-[#1533B8]">依頼人から（<Rich text={m.from} />）</p>
                      <p className="m-0 mt-1 text-[14px] leading-relaxed"><Rich text={m.thanks} /></p>
                    </div>
                  )}
                </div>
              </div>
            ) : undefined
          }
        />
      ))}

      {lec.story && <LectureStoryView story={lec.story} />}

      <section aria-labelledby="lec-mis" className="mt-10">
        <h2 id="lec-mis" className="m-0 text-[19px] font-black">よくあるまちがい</h2>
        <ul className="m-0 mt-3 grid list-none gap-3 p-0">
          {lec.mistakes.map((x) => (
            <li key={x.wrong} className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3.5">
              <p className="m-0 flex items-start gap-2 text-[14px] font-bold leading-snug text-[#B42318]">
                <span aria-hidden="true" className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#D9341F] text-[12px] font-black text-white">✕</span>
                <span><span className="sr-only">まちがい：</span><Rich text={x.wrong} /></span>
              </p>
              <p className="m-0 mt-1.5 flex items-start gap-2 text-[14px] font-black leading-snug text-[#1533B8]">
                <span aria-hidden="true" className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#1533B8] text-[12px] font-black text-white">○</span>
                <span><span className="sr-only">正しくは：</span><Rich text={x.right} /></span>
              </p>
              <p className="m-0 mt-2 border-t border-dashed border-[#C9C6B4] pt-2 text-[13px] leading-relaxed text-[#3A3D55]"><Rich text={x.why} /></p>
            </li>
          ))}
        </ul>
      </section>

      <Checks items={lec.check} />

      <Link href={`${UZ_HOME}/card/${id}`} className="mt-10 block rounded-[18px] border-[1.5px] border-[#15172B] bg-[#FFE45C] p-4 text-[#15172B] no-underline shadow-[4px_4px_0_#15172B]">
        <span className="block text-[12px] font-black text-[#1533B8]">読んだら、手を動かす</span>
        <span className="mt-1 block text-[18px] font-black leading-snug">このスキルを自分の事業で使う →</span>
        <span className="mt-1 block text-[13px] font-bold text-[#3A3D55]">スキルカード {id.toUpperCase()}「{c?.name}」（つかむ・ためす・やってみる・できる）</span>
      </Link>

      <NextLinks items={lec.next.filter((x) => !x.href.endsWith(`/card/${id}`))} />
    </LearnShell>
  );
}
