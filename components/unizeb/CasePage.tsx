import { LearnShell } from "@/components/learn/LearnShell";
import { LectureFigure } from "@/components/lecture/Figure";
import { Rich } from "@/components/lecture/Rich";
import type { CaseStudy } from "@/lib/unizeb/types";
import { Kicker, NextLinks, SkillLinks, Sources, UZ_HOME, uzCrumbs } from "./parts";

// ケーススタディー（/learn/unizeb/case/<id>）：状況 → 問い → 選択肢3つ → 自分で決める → 実際（架空なら架空の結末） → 学び → 出典。
// 選択肢を選んで「決めた」を押すまで、実際の判断はたたんでおく（考える前に答えを見せない）。

function Block({ title, b, no }: { title: string; b: CaseStudy["situation"]; no: number }) {
  return (
    <>
      <p className="m-0 mt-2.5 rounded-[12px] border-l-4 border-[#FFE45C] bg-[#FFFBE6] px-3 py-2 text-[14px] font-bold leading-[1.75]" aria-label={title}>
        <Rich text={b.body} />
      </p>
      {b.reading?.map((p, k) => (
        <p key={k} className="m-0 mt-3 text-[15.5px] leading-[1.95] [text-indent:1em]"><Rich text={p} /></p>
      ))}
      {b.figure && <LectureFigure fig={b.figure} no={no} />}
    </>
  );
}

export function CasePage({ c }: { c: CaseStudy }) {
  return (
    <LearnShell narrow crumbs={uzCrumbs(c.title, { href: `${UZ_HOME}#case`, label: "ケーススタディー" })}>
      <Kicker>ケーススタディー　{c.real ? "実在の企業" : "架空のケース"}・Lv{c.lvBand}向け</Kicker>
      <h1 className="m-0 mt-1 text-[25px] font-black leading-tight">{c.title}</h1>
      <section className="mt-6">
        <h2 className="m-0 text-[19px] font-black">1. 状況</h2>
        <Block title="状況" b={c.situation} no={1} />
      </section>
      <section className="mt-9 rounded-[18px] border-[1.5px] border-[#15172B] bg-[#15172B] p-4 text-white shadow-[4px_4px_0_#B42318]">
        <h2 className="m-0 text-[12px] font-black tracking-[0.15em] text-[#FFE45C]">2. 問い　あなたならどうする？</h2>
        <p className="m-0 mt-2 text-[17px] font-black leading-snug"><Rich text={c.question} /></p>
      </section>
      <section className="mt-6">
        <h2 className="m-0 text-[19px] font-black">3. 選択肢</h2>
        <ul className="m-0 mt-3 grid list-none gap-3 p-0">
          {c.options.map((o, i) => (
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
          <span>4. {c.real ? "実際の判断と結果" : "架空の結末"}を見る</span>
          <span aria-hidden="true" className="group-open:rotate-180">▼</span>
        </summary>
        <div className="px-4 pb-4">
          <Block title="結果" b={c.outcome} no={c.situation.figure ? 2 : 1} />
        </div>
      </details>
      <SkillLinks title="5. 学び（スキルカードへ）" items={c.lessons} />
      {c.think?.length ? (
        <section className="mt-8 rounded-[14px] border-[1.5px] border-dashed border-[#15172B] bg-white p-3.5">
          <h2 className="m-0 text-[15px] font-black">考えてみよう</h2>
          <ul className="m-0 mt-2 grid gap-1 pl-5 text-[14px] leading-relaxed">{c.think.map((t) => <li key={t}><Rich text={t} /></li>)}</ul>
        </section>
      ) : null}
      <Sources items={c.sources} note={c.note} />
      <NextLinks items={[{ label: `図解レクチャーで学ぶ（${c.lessons[0]?.card.toUpperCase()}）`, href: `${UZ_HOME}/lec/${c.lessons[0]?.card}` }, { label: "ゼロワンOSユース版の目次", href: UZ_HOME }]} />
    </LearnShell>
  );
}
