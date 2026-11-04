import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import type { Lecture } from "@/lib/lecture/types";
import { LectureFigure } from "@/components/lecture/Figure";
import { Rich } from "@/components/lecture/Rich";
import { LectureStoryView } from "@/components/lecture/Story";
import { MissionCard, MissionComplete } from "@/components/lecture/Mission";
import { APL_BOOKS, APL_HOME, aplField, aplUnit } from "@/lib/apply-lec";

// 「選ばれる力」の図解の教科書（/learn/apply/lec/<id>）の1単元のページ。
// 型は lib/lecture の Lecture のまま。図・物語・ミッションの部品は components/lecture をそのまま使う。
// 学校の地図の単元ではないので、LecturePage（地図・本棚・模試へのつなぎ）は使わず、ここで組み立てる。
// 最後に「もっと深く（著書）」（lib/apply-lec/books.ts）を置く。

export const aplCrumbs = (label?: string) => [
  { href: "/learn", label: "まなぶ" },
  { href: "/learn/apply", label: "選ばれる力" },
  ...(label ? [{ href: APL_HOME, label: "図解の教科書" }, { label }] : [{ label: "図解の教科書" }]),
];

const isExternal = (href: string) => /^https?:\/\//.test(href);

export function AplLecturePage({ lec }: { lec: Lecture }) {
  const u = aplUnit(lec.unit);
  const f = aplField(lec.unit);
  const name = lec.nameRuby ?? u?.title ?? lec.unit;
  const books = APL_BOOKS[lec.unit] ?? [];
  let figNo = 0;
  return (
    <LearnShell narrow homeHref="/learn" crumbs={aplCrumbs(u?.title ?? lec.unit)}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
        図解の教科書{f && u ? `　${f.name}・単元${u.no}` : ""}
      </p>
      <h1 className="m-0 mt-1 text-[26px] font-black leading-tight"><Rich text={name} /></h1>
      <p className="m-0 mt-2 text-[16px] font-black leading-snug text-[#3A3D55]"><Rich text={lec.title} /></p>

      <section aria-labelledby="lec-hook" className="mt-5 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-4 sm:p-5">
        <h2 id="lec-hook" className="m-0 text-[13px] font-black text-[#1533B8]">導入　なぜ学ぶの？</h2>
        <p className="m-0 mt-2 text-[15px] leading-relaxed"><Rich text={lec.hook} /></p>
        {lec.mystery && <MissionCard lec={lec} kids={false} />}
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

      {lec.sections.map((s, i) => (
        <section key={s.heading} id={`lec-s${i + 1}`} aria-labelledby={`lec-s${i + 1}-h`} className="mt-9 scroll-mt-4">
          <h2 id={`lec-s${i + 1}-h`} className="m-0 flex items-start gap-2.5 text-[19px] font-black leading-snug">
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
          {s.figure && <LectureFigure fig={s.figure} no={++figNo} />}
          {s.reveal && <MissionComplete lec={lec} kids={false} answer={s.reveal} />}
          {s.cliff && i < lec.sections.length - 1 && (
            <p className="m-0 mt-4 text-right text-[13.5px] font-black text-[#1533B8]">
              <a href={`#lec-s${i + 2}`} className="text-[#1533B8] no-underline">
                <Rich text={s.cliff} />
                <span className="ml-1.5 inline-block whitespace-nowrap rounded-full bg-[#1533B8] px-2 py-0.5 align-[1px] text-[11px] text-white">
                  {lec.mystery ? "次の手がかりへ ↓" : "次へ ↓"}
                </span>
              </a>
            </p>
          )}
        </section>
      ))}

      {lec.story && <LectureStoryView story={lec.story} />}

      <section aria-labelledby="lec-mis" className="mt-10">
        <h2 id="lec-mis" className="m-0 text-[19px] font-black">よくあるまちがい</h2>
        <ul className="m-0 mt-3 grid list-none gap-3 p-0">
          {lec.mistakes.map((m) => (
            <li key={m.wrong} className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3.5">
              <p className="m-0 flex items-start gap-2 text-[14px] font-bold leading-snug text-[#B42318]">
                <span aria-hidden="true" className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#D9341F] text-[12px] font-black text-white">✕</span>
                <span><span className="sr-only">まちがい：</span><Rich text={m.wrong} /></span>
              </p>
              <p className="m-0 mt-1.5 flex items-start gap-2 text-[14px] font-black leading-snug text-[#1533B8]">
                <span aria-hidden="true" className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#1533B8] text-[12px] font-black text-white">○</span>
                <span><span className="sr-only">正しくは：</span><Rich text={m.right} /></span>
              </p>
              <p className="m-0 mt-2 border-t border-dashed border-[#C9C6B4] pt-2 text-[13px] leading-relaxed text-[#3A3D55]"><Rich text={m.why} /></p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="lec-chk" className="mt-10">
        <h2 id="lec-chk" className="m-0 text-[19px] font-black">確認しよう</h2>
        <ol className="m-0 mt-3 grid list-none gap-3 p-0">
          {lec.check.map((c, i) => (
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

      <section aria-labelledby="lec-next" className="mt-10 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#15172B] p-4 text-white sm:p-5">
        <h2 id="lec-next" className="m-0 text-[15px] font-black text-[#FFE45C]">次にやる教材</h2>
        <ul className="m-0 mt-3 grid list-none gap-2 p-0">
          {lec.next.map((x) => {
            const home = x.href === APL_HOME;
            const cls = `flex min-h-[44px] items-center justify-between gap-2 rounded-[12px] px-3.5 py-2 text-[14px] font-black no-underline ${home ? "border-[1.5px] border-white/40 text-white" : "bg-white text-[#15172B]"}`;
            const inner = (
              <>
                <span><Rich text={x.label} /></span>
                <span aria-hidden="true">{isExternal(x.href) ? "↗" : "→"}</span>
              </>
            );
            return (
              <li key={x.href}>
                {isExternal(x.href) ? (
                  <a href={x.href} target="_blank" rel="noopener" className={cls}>{inner}</a>
                ) : (
                  <Link href={x.href} className={cls}>{inner}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {books.length > 0 && (
        <section id="books" aria-labelledby="lec-books" className="mt-10 scroll-mt-4 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#FFF8EC] p-4 shadow-[4px_4px_0_#15172B] sm:p-5">
          <p className="m-0 text-[12px] font-black text-[#B42318]">監修者の著書で</p>
          <h2 id="lec-books" className="m-0 mt-1 text-[19px] font-black">もっと深く（著書）</h2>
          <ul className="m-0 mt-3 grid list-none gap-2.5 p-0">
            {books.map((b) => (
              <li key={`${b.book}-${b.ch}-${b.sec?.no ?? 0}`} className="rounded-[12px] border-[1.5px] border-[#15172B] bg-white p-3.5">
                <p className="m-0 text-[12.5px] font-black text-[#1533B8]">『{b.book}』</p>
                <p className="m-0 mt-1 text-[15px] font-black leading-snug">
                  第{b.ch}章「{b.title}」
                  {b.sec && <span className="block text-[13.5px] text-[#3A3D55]">第{b.sec.no}節 {b.sec.title}</span>}
                </p>
                <p className="m-0 mt-1.5 text-[13px] leading-relaxed text-[#3A3D55]"><Rich text={b.why} /></p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </LearnShell>
  );
}
