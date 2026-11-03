import Link from "next/link";
import type { LectureSection } from "@/lib/lecture/types";
import type { Source, SkillLink } from "@/lib/unizeb/types";
import { LectureFigure } from "@/components/lecture/Figure";
import { LecturePhotoView } from "@/components/lecture/Photo";
import { Rich } from "@/components/lecture/Rich";
import { cardInfo } from "@/lib/unizeb";

// ゼロワンOSユース版の教科書ページで共通に使う部品（節・出典・スキルカードへのつなぎ・次の教材）。
// 図と写真は図解レクチャーの部品（components/lecture）をそのまま使う。

export const UZ_HOME = "/learn/unizeb";
export const uzCrumbs = (label: string, mid?: { href: string; label: string }) => [
  { href: "/learn", label: "まなぶ" },
  { href: "/learn/apply", label: "選ばれる力" },
  { href: UZ_HOME, label: "ゼロワンOSユース版" },
  ...(mid ? [mid] : []),
  { label },
];

export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">{children}</p>;
}

/** 節（見出し・要点・本文・図・写真・次へのひとこと）。fig は図の通し番号を数える入れ物 */
export function SectionView({ s, i, idp, fig, last, extra }: { s: LectureSection; i: number; idp: string; fig: { n: number; p: number }; last: boolean; extra?: React.ReactNode }) {
  return (
    <section id={`${idp}${i + 1}`} aria-labelledby={`${idp}${i + 1}-h`} className="mt-9 scroll-mt-4">
      <h2 id={`${idp}${i + 1}-h`} className="m-0 flex items-start gap-2.5 text-[19px] font-black leading-snug">
        <span aria-hidden="true" className="mt-[1px] flex h-7 w-7 flex-none items-center justify-center rounded-[8px] bg-[#15172B] text-[14px] text-white">
          {i + 1}
        </span>
        <span><Rich text={s.heading} /></span>
      </h2>
      <p className="m-0 mt-2.5 rounded-[12px] border-l-4 border-[#FFE45C] bg-[#FFFBE6] px-3 py-2 text-[14px] font-bold leading-[1.75]">
        <Rich text={s.body} />
      </p>
      {s.reading?.map((para, k) => (
        <p key={k} className="m-0 mt-3 text-[15.5px] leading-[1.95] [text-indent:1em]">
          <Rich text={para} />
        </p>
      ))}
      {s.photos?.map((ph) => <LecturePhotoView key={ph.src} ph={ph} no={++fig.p} />)}
      {s.figure && <LectureFigure fig={s.figure} no={++fig.n} />}
      {extra}
      {s.cliff && !last && (
        <p className="m-0 mt-4 text-right text-[13.5px] font-black text-[#1533B8]">
          <a href={`#${idp}${i + 2}`} className="text-[#1533B8] no-underline">
            <Rich text={s.cliff} />
            <span className="ml-1.5 inline-block whitespace-nowrap rounded-full bg-[#1533B8] px-2 py-0.5 align-[1px] text-[11px] text-white">次へ ↓</span>
          </a>
        </p>
      )}
    </section>
  );
}

/** 使ったスキル・学び（スキルカードへのリンク） */
export function SkillLinks({ title, items }: { title: string; items: SkillLink[] }) {
  return (
    <section aria-label={title} className="mt-10">
      <h2 className="m-0 text-[19px] font-black">{title}</h2>
      <ul className="m-0 mt-3 grid list-none gap-2.5 p-0">
        {items.map((x) => {
          const c = cardInfo(x.card);
          return (
            <li key={x.card}>
              <Link href={`${UZ_HOME}/card/${x.card}`} className="block rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3.5 text-[#15172B] no-underline shadow-[3px_3px_0_#15172B]">
                <span className="flex items-baseline gap-2">
                  <span className="rounded bg-[#1533B8] px-1.5 py-0.5 font-mono text-[11px] font-bold text-white">{x.card.toUpperCase()}</span>
                  <span className="text-[15px] font-black">{c ? c.name : x.card}</span>
                  {c && <span className="ml-auto text-[11px] font-bold text-[#5A5D73]">Lv{c.lv}</span>}
                </span>
                <span className="mt-1.5 block text-[13.5px] leading-relaxed text-[#3A3D55]"><Rich text={x.how} /></span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function Checks({ items }: { items: { q: string; a: string; why: string }[] }) {
  return (
    <section aria-label="確認しよう" className="mt-10">
      <h2 className="m-0 text-[19px] font-black">確認しよう</h2>
      <ol className="m-0 mt-3 grid list-none gap-3 p-0">
        {items.map((c, i) => (
          <li key={c.q} className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3.5">
            <p className="m-0 text-[14.5px] font-bold leading-relaxed">
              <span className="mr-1.5 font-black text-[#1533B8]">Q{i + 1}.</span>
              <Rich text={c.q} />
            </p>
            <details className="group mt-2">
              <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center rounded-full border-[1.5px] border-[#15172B] bg-[#FFE45C] px-4 text-[13px] font-black [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">答えを見る</span>
                <span className="hidden group-open:inline">答えをとじる</span>
              </summary>
              <div className="mt-2 rounded-[10px] bg-[#FFFBE6] px-3 py-2">
                <p className="m-0 text-[15px] font-black">答え：<Rich text={c.a} /></p>
                <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]"><Rich text={c.why} /></p>
              </div>
            </details>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** 出典の表（実在の人・会社・制度の事実は、ここにたどれるようにする） */
export function Sources({ items, note, compact = false }: { items: Source[]; note?: string; compact?: boolean }) {
  if (!items.length && !note) return null;
  return (
    <section aria-label="出典" className={`${compact ? "mt-3" : "mt-10"} rounded-[14px] border-[1.5px] border-[#C9C6B4] bg-white/70 p-3.5`}>
      <h2 className="m-0 text-[14px] font-black text-[#3A3D55]">{compact ? "出典" : "出典と、この本文の書き方"}</h2>
      {note && <p className="m-0 mt-2 text-[12.5px] leading-relaxed text-[#3A3D55]"><Rich text={note} /></p>}
      {items.length > 0 && (
        <ol className="m-0 mt-2 grid list-decimal gap-1.5 pl-5 text-[12px] leading-snug text-[#3A3D55]">
          {items.map((s) => (
            <li key={s.url + s.title}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="break-all font-bold text-[#1533B8]">{s.title}</a>
              <span className="ml-1 whitespace-nowrap">（確認 {s.checked}）</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export function NextLinks({ items }: { items: { label: string; href: string }[] }) {
  return (
    <section aria-label="次にやる教材" className="mt-10 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#15172B] p-4 text-white sm:p-5">
      <h2 className="m-0 text-[15px] font-black text-[#FFE45C]">次にやる教材</h2>
      <ul className="m-0 mt-3 grid list-none gap-2 p-0">
        {items.map((x, i) => (
          <li key={x.href + i}>
            <Link href={x.href} className={`flex min-h-[44px] items-center justify-between gap-2 rounded-[12px] px-3.5 py-2 text-[14px] font-black no-underline ${x.href === UZ_HOME ? "border-[1.5px] border-white/40 text-white" : "bg-white text-[#15172B]"}`}>
              <span><Rich text={x.label} /></span>
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
