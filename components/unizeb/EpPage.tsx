import { LearnShell } from "@/components/learn/LearnShell";
import { LectureFigure } from "@/components/lecture/Figure";
import { Rich } from "@/components/lecture/Rich";
import type { Episode, Scene } from "@/lib/unizeb/types";
import { UZ_SCENES } from "@/lib/unizeb/registry";
import { SceneView } from "./Scene";
import { Kicker, NextLinks, SkillLinks, Sources, UZ_HOME, uzCrumbs } from "./parts";

// ゼロイチ・エピソード（/learn/unizeb/ep/<id>）：場面 → 問い → 選ぶ前に考える → 実際の決断 → その後 → スキル → 考える問い → 出典。
// ケース（CasePage）と同じく、案を読んで自分で決めるまで、実際の決断とその後はたたんでおく（考える前に答えを見せない）。

function Para({ items }: { items?: string[] }) {
  return <>{items?.map((p, k) => <p key={k} className="m-0 mt-3 text-[15.5px] leading-[1.95] [text-indent:1em]"><Rich text={p} /></p>)}</>;
}
function Lead({ text, label }: { text: string; label: string }) {
  return (
    <p className="m-0 mt-2.5 rounded-[12px] border-l-4 border-[#FFE45C] bg-[#FFFBE6] px-3 py-2 text-[14px] font-bold leading-[1.75]" aria-label={label}>
      <Rich text={text} />
    </p>
  );
}
const scenesAt = (id: string, at: number): Scene[] => UZ_SCENES[`ep/${id}`]?.filter((x) => x.at === at) ?? [];

export function EpPage({ e }: { e: Episode }) {
  let sc = 0;
  return (
    <LearnShell narrow crumbs={uzCrumbs(e.title, { href: `${UZ_HOME}#ep`, label: "ゼロイチ・エピソード" })}>
      <Kicker>ゼロイチ・エピソード　No.{e.no}・{e.year}</Kicker>
      <h1 className="m-0 mt-1 text-[25px] font-black leading-tight">{e.title}</h1>
      <p className="m-0 mt-1.5 text-[13.5px] font-bold text-[#3A3D55]">{e.company}</p>

      <section className="mt-6">
        <h2 className="m-0 text-[19px] font-black">1. 場面</h2>
        <Lead text={e.situation.body} label="場面" />
        <Para items={e.situation.reading} />
        {scenesAt(e.id, 0).map((s, k) => <SceneView key={k} sc={s} no={++sc} />)}
        <LectureFigure fig={e.situation.figure} no={1} />
      </section>

      <section className="mt-9 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#15172B] p-4 text-white shadow-[4px_4px_0_#B42318]">
        <h2 className="m-0 text-[12px] font-black tracking-[0.15em] text-[#FFE45C]">2. 問い　あなたならどうする？</h2>
        <p className="m-0 mt-2 text-[17px] font-black leading-snug"><Rich text={e.question} /></p>
      </section>

      <section className="mt-6">
        <h2 className="m-0 text-[19px] font-black">3. 選ぶ前に考える</h2>
        <ul className="m-0 mt-3 grid list-none gap-3 p-0">
          {e.options.map((o, i) => (
            <li key={o.label} className="rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3.5">
              <p className="m-0 text-[15px] font-black">
                <span className="mr-1.5 rounded bg-[#1533B8] px-1.5 py-0.5 text-[12px] text-white">案{"ABC"[i]}</span>
                <Rich text={o.label} />
              </p>
              <p className="m-0 mt-2 text-[13.5px] leading-relaxed"><b className="text-[#1533B8]">利点　</b><Rich text={o.plus} /></p>
              <p className="m-0 mt-1 text-[13.5px] leading-relaxed"><b className="text-[#B42318]">危うさ　</b><Rich text={o.minus} /></p>
            </li>
          ))}
        </ul>
        <p className="m-0 mt-3 text-[13px] font-bold text-[#3A3D55]">どれを選ぶか、理由を1文で決めてから、次を開こう。</p>
      </section>

      <details className="group mt-6 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#FFF1EE]">
        <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-2 px-4 text-[15px] font-black [&::-webkit-details-marker]:hidden">
          <span>4. 実際の決断とその後を見る</span>
          <span aria-hidden="true" className="group-open:rotate-180">▼</span>
        </summary>
        <div className="px-4 pb-4">
          <h3 className="m-0 mt-1 text-[16px] font-black">実際の決断</h3>
          <Lead text={e.decision.body} label="実際の決断" />
          <Para items={e.decision.reading} />
          {scenesAt(e.id, 1).map((s, k) => <SceneView key={k} sc={s} no={++sc} />)}
          <h3 className="m-0 mt-6 text-[16px] font-black">5. その後</h3>
          <Lead text={e.after.body} label="その後" />
          <Para items={e.after.reading} />
          {e.after.figure && <LectureFigure fig={e.after.figure} no={2} />}
        </div>
      </details>

      <SkillLinks title="6. この場面で使われたスキル" items={e.skills} />
      <section className="mt-8 rounded-[14px] border-[1.5px] border-dashed border-[#15172B] bg-white p-3.5">
        <h2 className="m-0 text-[15px] font-black">考えてみよう</h2>
        <ul className="m-0 mt-2 grid gap-1 pl-5 text-[14px] leading-relaxed">{e.think.map((t) => <li key={t}><Rich text={t} /></li>)}</ul>
      </section>
      <Sources items={e.sources} note={e.note} />
      <NextLinks
        items={[
          { label: `図解レクチャーで学ぶ（${e.skills[0]?.card.toUpperCase()}）`, href: `${UZ_HOME}/lec/${e.skills[0]?.card}` },
          { label: "ほかのゼロイチ・エピソード", href: `${UZ_HOME}#ep` },
          { label: "ゼロワンOSユース版の目次", href: UZ_HOME },
        ]}
      />
    </LearnShell>
  );
}
