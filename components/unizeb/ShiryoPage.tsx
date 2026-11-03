import { LearnShell } from "@/components/learn/LearnShell";
import { LectureFigure } from "@/components/lecture/Figure";
import { Rich } from "@/components/lecture/Rich";
import type { ShiryoChapter } from "@/lib/unizeb/types";
import { Kicker, NextLinks, Sources, UZ_HOME, uzCrumbs } from "./parts";

// 資料集（/learn/unizeb/shiryo）：章ごとの図表・早見表。18歳以上と未満で分かれる所には印。

export function ShiryoPage({ chapters }: { chapters: ShiryoChapter[] }) {
  let n = 0;
  return (
    <LearnShell narrow crumbs={uzCrumbs("資料集")}>
      <Kicker>資料集　図表・制度の早見表・用語集</Kicker>
      <h1 className="m-0 mt-1 text-[26px] font-black leading-tight">起業の資料集</h1>
      <p className="m-0 mt-2 text-[14px] leading-relaxed text-[#3A3D55]">
        制度や数字は、所管の公式の情報と法令で確かめて書いています。自分の場合に当てはまるか（年齢・事業の中身・住んでいる所）は、各項目の出典で確かめてください。
      </p>
      <nav aria-label="章" className="mt-4 rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3">
        <ol className="m-0 grid list-none gap-1 p-0 text-[13.5px] font-bold">
          {chapters.map((c) => <li key={c.ch}><a href={`#ch${c.ch}`} className="text-[#15172B]">第{c.ch}章　{c.title}</a></li>)}
        </ol>
      </nav>
      {chapters.map((c) => (
        <section key={c.ch} id={`ch${c.ch}`} className="mt-10 scroll-mt-4">
          <p className="m-0 text-[12px] font-black text-[#1533B8]">第{c.ch}章</p>
          <h2 className="m-0 text-[22px] font-black leading-snug">{c.title}</h2>
          <p className="m-0 mt-2 text-[15px] leading-relaxed"><Rich text={c.intro} /></p>
          {c.items.map((it, i) => (
            <article key={it.heading} id={`ch${c.ch}-${i + 1}`} className="mt-8 scroll-mt-4">
              <h3 className="m-0 flex flex-wrap items-center gap-2 text-[17px] font-black leading-snug">
                <span className="text-[#1533B8]">{c.ch}-{i + 1}</span>
                <Rich text={it.heading} />
                {it.ageSplit && <span className="rounded-full border-[1.5px] border-[#B42318] bg-[#FFF1EE] px-2 py-0.5 text-[11px] font-black text-[#B42318]">18歳以上と未満で分かれる</span>}
              </h3>
              <p className="m-0 mt-2 rounded-[12px] border-l-4 border-[#FFE45C] bg-[#FFFBE6] px-3 py-2 text-[14px] font-bold leading-[1.75]"><Rich text={it.body} /></p>
              {it.reading?.map((p, k) => <p key={k} className="m-0 mt-3 text-[15px] leading-[1.9] [text-indent:1em]"><Rich text={p} /></p>)}
              {it.figure && <LectureFigure fig={it.figure} no={++n} />}
              <Sources items={it.sources} compact />
            </article>
          ))}
        </section>
      ))}
      <NextLinks items={[{ label: "ゼロワンOSユース版の目次", href: UZ_HOME }]} />
    </LearnShell>
  );
}
