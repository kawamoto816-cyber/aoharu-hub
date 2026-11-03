import { LearnShell } from "@/components/learn/LearnShell";
import { Rich } from "@/components/lecture/Rich";
import type { Den } from "@/lib/unizeb/types";
import { Checks, Kicker, NextLinks, SectionView, SkillLinks, Sources, UZ_HOME, uzCrumbs } from "./parts";

// 起業家列伝（/learn/unizeb/den/<id>）：年表 → 0→1の場面 → つまずきと立て直し → 使ったスキル → 持ち帰れること → 出典。

export function DenPage({ d }: { d: Den }) {
  const fig = { n: 0, p: 0 };
  return (
    <LearnShell narrow crumbs={uzCrumbs(d.name, { href: `${UZ_HOME}#den`, label: "起業家列伝" })}>
      <Kicker>起業家列伝　{d.era}・{d.country}・{d.field}</Kicker>
      <h1 className="m-0 mt-1 text-[26px] font-black leading-tight">{d.name}</h1>
      <p className="m-0 mt-0.5 text-[12px] font-bold text-[#5A5D73]">{d.yomi}　{d.years}　｜　{d.company}</p>
      <p className="m-0 mt-2 text-[16px] font-black leading-snug text-[#3A3D55]"><Rich text={d.title} /></p>
      <section className="mt-5 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-4 sm:p-5">
        <h2 className="m-0 text-[13px] font-black text-[#1533B8]">導入</h2>
        <p className="m-0 mt-2 text-[15px] leading-relaxed"><Rich text={d.hook} /></p>
        <ol className="m-0 mt-3 grid list-none gap-1 border-t border-dashed border-[#C9C6B4] p-0 pt-3 text-[13px] font-bold text-[#3A3D55]">
          {d.sections.map((s, i) => (
            <li key={s.heading}><a href={`#den-s${i + 1}`} className="text-[#3A3D55]">{i + 1}. <Rich text={s.heading} /></a></li>
          ))}
        </ol>
      </section>
      {d.sections.map((s, i) => (
        <SectionView key={s.heading} s={s} i={i} idp="den-s" fig={fig} last={i === d.sections.length - 1} />
      ))}
      <SkillLinks title="使ったスキル（ユニゼブのカード）" items={d.skills} />
      <section aria-label="持ち帰れること" className="mt-10 rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-4">
        <h2 className="m-0 text-[17px] font-black">今の高校生・大学生が持ち帰れること</h2>
        <ul className="m-0 mt-2 grid gap-1.5 pl-5 text-[14.5px] leading-relaxed">
          {d.takeaways.map((t) => <li key={t}><Rich text={t} /></li>)}
        </ul>
      </section>
      <Checks items={d.check} />
      <Sources items={d.sources} note={d.note} />
      <NextLinks items={[...d.skills.slice(0, 1).map((s) => ({ label: `図解レクチャーで学ぶ（${s.card.toUpperCase()}）`, href: `${UZ_HOME}/lec/${s.card}` })), { label: "ゼロワンOSユース版の目次", href: UZ_HOME }]} />
    </LearnShell>
  );
}
