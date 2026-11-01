import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import type { Lecture } from "@/lib/lecture/types";
import { lectureUnitInfo } from "@/lib/lecture";
import { LectureFigure } from "./Figure";
import { Rich } from "./Rich";
import { LecturePhotoView } from "./Photo";
import { MoshiLink } from "@/components/moshi/MoshiLink";

// 図解レクチャーの1単元のページ本体：導入 → 図解つきの節 → よくあるまちがい → 確認 → 次にやる教材。

export function LecturePage({ lec }: { lec: Lecture }) {
  const info = lectureUnitInfo(lec.unit);
  const name = info?.name ?? lec.unit;
  // 小学校の単元は、見出しなどの決まった文言にもルビをつける
  const kids = lec.unit.startsWith("e-");
  const L = kids
    ? { hook: "導入《どうにゅう》　なぜ学《まな》ぶの？", check: "確認《かくにん》しよう", next: "次《つぎ》にやる教材《きょうざい》", open: "答《こた》えを見《み》る", close: "答《こた》えをとじる", back: "学校《がっこう》の教科《きょうか》の地図《ちず》にもどる", answer: "答《こた》え：" }
    : { hook: "導入　なぜ学ぶの？", check: "確認しよう", next: "次にやる教材", open: "答えを見る", close: "答えをとじる", back: "学校の教科の地図にもどる", answer: "答え：" };
  let figNo = 0;
  let photoNo = 0;
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/school", label: "学校の教科" }, { label: name }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
        図解レクチャー{info && `　${info.level}・${info.subject}・${info.group}`}
      </p>
      <h1 className="m-0 mt-1 text-[26px] font-black leading-tight"><Rich text={lec.nameRuby ?? name} /></h1>
      <p className="m-0 mt-2 text-[16px] font-black leading-snug text-[#3A3D55]"><Rich text={lec.title} /></p>

      <section aria-labelledby="lec-hook" className="mt-5 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-4 sm:p-5">
        <h2 id="lec-hook" className="m-0 text-[13px] font-black text-[#1533B8]">
          <Rich text={L.hook} />
        </h2>
        <p className="m-0 mt-2 text-[15px] leading-relaxed">
          <Rich text={lec.hook} />
        </p>
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
          {s.reading?.length ? (
            <>
              <p className="m-0 mt-2.5 rounded-[12px] border-l-4 border-[#FFE45C] bg-[#FFFBE6] px-3 py-2 text-[14px] font-bold leading-[1.75]">
                <Rich text={s.body} />
              </p>
              {s.reading.map((para, k) => (
                <p key={k} className="m-0 mt-3 text-[15.5px] leading-[1.95] [text-indent:1em]">
                  <Rich text={para} />
                </p>
              ))}
            </>
          ) : (
            <p className="m-0 mt-2.5 text-[15px] leading-[1.85]">
              <Rich text={s.body} />
            </p>
          )}
          {s.photos?.map((ph) => <LecturePhotoView key={ph.src} ph={ph} no={++photoNo} />)}
          {s.figure && <LectureFigure fig={s.figure} no={++figNo} />}
        </section>
      ))}

      <section aria-labelledby="lec-mis" className="mt-10">
        <h2 id="lec-mis" className="m-0 text-[19px] font-black">
          よくあるまちがい
        </h2>
        <ul className="m-0 mt-3 grid list-none gap-3 p-0">
          {lec.mistakes.map((m) => (
            <li key={m.wrong} className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3.5">
              <p className="m-0 flex items-start gap-2 text-[14px] font-bold leading-snug text-[#B42318]">
                <span aria-hidden="true" className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#D9341F] text-[12px] font-black text-white">
                  ✕
                </span>
                <span>
                  <span className="sr-only">まちがい：</span>
                  <span className="line-through decoration-[#D9341F]/60"><Rich text={m.wrong} /></span>
                </span>
              </p>
              <p className="m-0 mt-1.5 flex items-start gap-2 text-[14px] font-black leading-snug text-[#1533B8]">
                <span aria-hidden="true" className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#1533B8] text-[12px] font-black text-white">
                  ○
                </span>
                <span>
                  <span className="sr-only">正しくは：</span>
                  <Rich text={m.right} />
                </span>
              </p>
              <p className="m-0 mt-2 border-t border-dashed border-[#C9C6B4] pt-2 text-[13px] leading-relaxed text-[#3A3D55]"><Rich text={m.why} /></p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="lec-chk" className="mt-10">
        <h2 id="lec-chk" className="m-0 text-[19px] font-black">
          <Rich text={L.check} />
        </h2>
        <ol className="m-0 mt-3 grid list-none gap-3 p-0">
          {lec.check.map((c, i) => (
            <li key={c.q} className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3.5">
              <p className="m-0 text-[14.5px] font-bold leading-relaxed">
                <span className="mr-1.5 font-black text-[#1533B8]">Q{i + 1}.</span>
                <Rich text={c.q} />
              </p>
              <details className="group mt-2">
                <summary className="inline-flex min-h-[40px] cursor-pointer list-none items-center rounded-full border-[1.5px] border-[#15172B] bg-[#FFE45C] px-4 text-[13px] font-black [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden"><Rich text={L.open} /></span>
                  <span className="hidden group-open:inline"><Rich text={L.close} /></span>
                </summary>
                <div className="mt-2 rounded-[10px] bg-[#FFFBE6] px-3 py-2">
                  <p className="m-0 text-[15px] font-black"><Rich text={L.answer} /><Rich text={c.a} /></p>
                  <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#3A3D55]"><Rich text={c.why} /></p>
                </div>
              </details>
            </li>
          ))}
        </ol>
      </section>

      <MoshiLink unit={lec.unit} className="mt-10" />

      <section aria-labelledby="lec-next" className="mt-10 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#15172B] p-4 text-white sm:p-5">
        <h2 id="lec-next" className="m-0 text-[15px] font-black text-[#FFE45C]">
          <Rich text={L.next} />
        </h2>
        <ul className="m-0 mt-3 grid list-none gap-2 p-0">
          {lec.next.map((x) => (
            <li key={x.href}>
              <Link href={x.href} className="flex min-h-[44px] items-center justify-between gap-2 rounded-[12px] bg-white px-3.5 py-2 text-[14px] font-black text-[#15172B] no-underline">
                <span><Rich text={x.label} /></span>
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
          <li>
            <Link href={`/learn/school#${lec.unit}`} className="flex min-h-[44px] items-center justify-between gap-2 rounded-[12px] border-[1.5px] border-white/40 px-3.5 py-2 text-[13px] font-bold text-white no-underline">
              <span><Rich text={L.back} /></span>
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        </ul>
      </section>
    </LearnShell>
  );
}
