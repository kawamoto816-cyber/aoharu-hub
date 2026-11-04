import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { UZ_CARDS, UZ_CASES, UZ_DEN, UZ_ENSHU, UZ_EP, UZ_LECTURES, UZ_RANKS, UZ_SHIRYO, deptLabel, lectureUnit } from "@/lib/unizeb";
import { Kicker } from "./parts";

// /learn/unizeb の目次：起業の教科書（図解レクチャー120）・起業家列伝・ゼロイチ・エピソード・ケーススタディー・資料集。
// スキルカード本体（マイ事業ボード）はフェーズ2で、この上に入る。

export function UzHome() {
  const ready = new Set(UZ_LECTURES.map((l) => l.unit));
  const lvs = Array.from(new Set(UZ_CARDS.map((c) => c.lv))).sort((a, b) => a - b);
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/apply", label: "選ばれる力" }, { label: "ゼロワンOSユース版" }]}>
      <Kicker>APPLY 選ばれる力　起業の棚</Kicker>
      <h1 className="m-0 mt-1 text-[27px] font-black leading-tight">ゼロワンOSユース版</h1>
      <p className="m-0 mt-2 text-[16px] font-black leading-snug text-[#3A3D55]">AI時代のあたらしい起業の教科書。読んで分かり、自分の事業で手を動かして、できるようになる。</p>
      <p className="m-0 mt-3 text-[14.5px] leading-relaxed">
        120のスキルを、図解レクチャー（教科書）で学び、スキルカードで自分の事業に使います。起業家列伝・ケーススタディー・資料集で、本物の0→1にもふれます。
      </p>

      <nav aria-label="あなたの記録" className="mt-5 grid grid-cols-2 gap-2.5">
        <Link href="/learn/unizeb/board" className="flex min-h-[64px] flex-col justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-3.5 py-2 text-[#15172B] no-underline shadow-[3px_3px_0_#15172B]">
          <span className="text-[15px] font-black">マイ事業ボード</span>
          <span className="text-[11.5px] font-bold text-[#3A3D55]">スキルカードで事業を育てる</span>
        </Link>
        <Link href="/learn/unizeb/assets" className="flex min-h-[64px] flex-col justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-3.5 py-2 text-[#15172B] no-underline shadow-[3px_3px_0_#15172B]">
          <span className="text-[15px] font-black">スキルアセット</span>
          <span className="text-[11.5px] font-bold text-[#3A3D55]">合格した答案の記録</span>
        </Link>
      </nav>

      <section id="lec" className="mt-8 scroll-mt-4">
        <h2 className="m-0 text-[20px] font-black">図解レクチャー（起業の教科書）</h2>
        {UZ_RANKS.map((r) => (
          <div key={r.no} className="mt-4">
            <p className="m-0 text-[13px] font-black text-[#1533B8]">位階 {r.no}　{r.label}（Lv{r.from}〜{r.to}）</p>
            {lvs.filter((lv) => lv >= r.from && lv <= r.to).map((lv) => {
              const cards = UZ_CARDS.filter((c) => c.lv === lv);
              const n = cards.filter((c) => ready.has(lectureUnit(c.id))).length;
              return (
                <details key={lv} open={n > 0} className="group mt-2 rounded-[14px] border-[1.5px] border-[#15172B] bg-white">
                  <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between px-3.5 text-[14.5px] font-black [&::-webkit-details-marker]:hidden">
                    <span>Lv{lv}</span>
                    <span className="text-[12px] font-bold text-[#5A5D73]">{n > 0 ? `${n} / ${cards.length} 本` : "準備中"}　<span aria-hidden="true" className="inline-block group-open:rotate-180">▼</span></span>
                  </summary>
                  <ul className="m-0 grid list-none gap-0 border-t border-[#E4E2D8] p-0">
                    {cards.map((c) => {
                      const ok = ready.has(lectureUnit(c.id));
                      const inner = (
                        <>
                          <span className="w-[52px] flex-none font-mono text-[11px] font-bold text-[#5A5D73]">{c.id.toUpperCase()}</span>
                          <span className="flex-1 text-[14px] font-bold">{c.name}</span>
                          <span className="text-[11px] font-bold text-[#5A5D73]">{deptLabel(c.dept)}</span>
                        </>
                      );
                      return (
                        <li key={c.id} className="border-b border-dashed border-[#E4E2D8] last:border-0">
                          {ok ? (
                            <Link href={`/learn/unizeb/lec/${c.id}`} className="flex min-h-[44px] items-center gap-2 px-3.5 py-1.5 text-[#15172B] no-underline">{inner}<span aria-hidden="true">→</span></Link>
                          ) : (
                            <span className="flex min-h-[40px] items-center gap-2 px-3.5 py-1.5 text-[#8A8C9C]">{inner}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </details>
              );
            })}
          </div>
        ))}
      </section>

      <section id="enshu" className="mt-10 scroll-mt-4">
        <h2 className="m-0 text-[20px] font-black">演習（実務のワークブック）</h2>
        <p className="m-0 mt-1 text-[13.5px] text-[#3A3D55]">架空の事業の資料を読み、そのLvのスキルを組み合わせて課題に取り組む。合格した答案はスキルアセットとして残る。</p>
        <ul className="m-0 mt-3 grid list-none gap-2.5 p-0">
          {UZ_ENSHU.map((e) => (
            <li key={e.id}>
              <Link href={`/learn/unizeb/enshu/${e.id}`} className={`flex min-h-[52px] items-center gap-2 rounded-[14px] border-[1.5px] border-[#15172B] px-3.5 py-2 text-[#15172B] no-underline ${e.kind === "shuryo" ? "bg-[#15172B] text-white" : "bg-white"}`}>
                <span className={`flex-none rounded px-1.5 py-0.5 text-[11px] font-black ${e.kind === "shuryo" ? "bg-[#FFE45C] text-[#15172B]" : "bg-[#1533B8] text-white"}`}>{e.kind === "shuryo" ? "修了演習" : `Lv${e.lv}`}</span>
                <span className="flex-1 text-[14.5px] font-black">{e.title}</span>
                <span className="text-[11px] font-bold opacity-70">{e.time}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="den" className="mt-10 scroll-mt-4">
        <h2 className="m-0 text-[20px] font-black">起業家列伝</h2>
        <p className="m-0 mt-1 text-[13.5px] text-[#3A3D55]">起業家の0→1を、年表と因果の図、使ったスキルで。事実はすべて出典つき。</p>
        <ul className="m-0 mt-3 grid list-none gap-2.5 p-0">
          {UZ_DEN.map((d) => (
            <li key={d.id}>
              <Link href={`/learn/unizeb/den/${d.id}`} className="block rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3.5 text-[#15172B] no-underline shadow-[3px_3px_0_#15172B]">
                <span className="text-[11.5px] font-bold text-[#5A5D73]">{d.era}・{d.country}・{d.field}</span>
                <span className="block text-[16px] font-black">{d.name}</span>
                <span className="mt-0.5 block text-[13px] leading-snug text-[#3A3D55]">{d.company}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="ep" className="mt-10 scroll-mt-4">
        <h2 className="m-0 text-[20px] font-black">ゼロイチ・エピソード</h2>
        <p className="m-0 mt-1 text-[13.5px] text-[#3A3D55]">実在の会社が0→1で迫られた決断の場面を1つずつ。あなたならどうするかを決めてから、実際の決断とその後を読む。事実はすべて出典つき。</p>
        <ul className="m-0 mt-3 grid list-none gap-2.5 p-0">
          {UZ_EP.map((e) => (
            <li key={e.id}>
              <Link href={`/learn/unizeb/ep/${e.id}`} className="block rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3.5 text-[#15172B] no-underline shadow-[3px_3px_0_#15172B]">
                <span className="text-[11.5px] font-bold text-[#5A5D73]">No.{e.no}・{e.year}・{e.company}</span>
                <span className="block text-[16px] font-black">{e.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="case" className="mt-10 scroll-mt-4">
        <h2 className="m-0 text-[20px] font-black">ケーススタディー</h2>
        <p className="m-0 mt-1 text-[13.5px] text-[#3A3D55]">状況を読み、あなたならどうするかを決めてから、実際（または架空の結末）を見る。</p>
        <ul className="m-0 mt-3 grid list-none gap-2.5 p-0">
          {UZ_CASES.map((c) => (
            <li key={c.id}>
              <Link href={`/learn/unizeb/case/${c.id}`} className="flex min-h-[52px] items-center gap-2 rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-3.5 py-2 text-[#15172B] no-underline">
                <span className={`flex-none rounded px-1.5 py-0.5 text-[11px] font-black ${c.real ? "bg-[#1533B8] text-white" : "bg-[#FFE45C]"}`}>{c.real ? "実在" : "架空"}</span>
                <span className="flex-1 text-[14.5px] font-black">{c.title}</span>
                <span className="text-[11px] font-bold text-[#5A5D73]">Lv{c.lvBand}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="shiryo" className="mt-10 scroll-mt-4">
        <h2 className="m-0 text-[20px] font-black">資料集</h2>
        <ul className="m-0 mt-3 grid list-none gap-2 p-0">
          {UZ_SHIRYO.map((c) => (
            <li key={c.ch}>
              <Link href={`/learn/unizeb/shiryo#ch${c.ch}`} className="flex min-h-[44px] items-center justify-between rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-3.5 text-[14.5px] font-black text-[#15172B] no-underline">
                <span>第{c.ch}章　{c.title}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </LearnShell>
  );
}
