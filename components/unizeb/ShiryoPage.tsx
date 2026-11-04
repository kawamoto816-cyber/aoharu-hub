import { LearnShell } from "@/components/learn/LearnShell";
import { LectureFigure } from "@/components/lecture/Figure";
import { Rich } from "@/components/lecture/Rich";
import { cardInfo } from "@/lib/unizeb";
import type { ShiryoChapter, ShiryoItem } from "@/lib/unizeb/types";
import { Kicker, NextLinks, Sources, UZ_HOME, uzCrumbs } from "./parts";

// 資料集（/learn/unizeb/shiryo）：章ごとの図表・早見表。18歳以上と未満で分かれる所には印。
// 長くならないように、章は「ひらく・とじる」（details）で見せる（渡された最初の章だけひらいておく）。
// 用語集（本文も図もない項目）は、カードにせず、部門ごとの小見出しをつけた1行ずつの一覧（dl）で見せる。

const LEC = "/learn/unizeb/lec/";

/** 用語集の1語か（本文の段落も図もなく、出典がレクチャーだけ） */
const isTerm = (it: ShiryoItem) => !it.reading?.length && !it.figure && it.sources.length > 0 && it.sources.every((s) => s.url.startsWith(LEC));
const lecId = (url: string) => url.slice(LEC.length);

/** 目次や #ch3-2 のリンクで飛んだとき、飛び先をふくむ「とじた章」をひらく（SSRのページで動く小さなスクリプト） */
const OPEN_ON_HASH = `(()=>{const f=()=>{const id=decodeURIComponent(location.hash.slice(1));if(!id)return;const t=document.getElementById(id);if(!t)return;let e=t;while(e){if(e.tagName==="DETAILS")e.open=true;e=e.parentElement}const d=t.querySelector(":scope>details");if(d)d.open=true;t.scrollIntoView()};addEventListener("hashchange",f);if(document.readyState==="loading")addEventListener("DOMContentLoaded",f);else f()})();`;

function Chevron({ group }: { group: "ch" | "dp" }) {
  return (
    <span aria-hidden="true" className={`inline-block text-[12px] transition-transform ${group === "ch" ? "group-open/ch:rotate-180" : "group-open/dp:rotate-180"}`}>
      ▼
    </span>
  );
}

function ItemView({ c, it, i, fig }: { c: ShiryoChapter; it: ShiryoItem; i: number; fig: { n: number } }) {
  return (
    <article id={`ch${c.ch}-${i + 1}`} className="mt-8 scroll-mt-4 first:mt-5">
      <h3 className="m-0 flex flex-wrap items-center gap-2 text-[17px] font-black leading-snug">
        <span className="text-[#1533B8]">{c.ch}-{i + 1}</span>
        <Rich text={it.heading} />
        {it.ageSplit && <span className="rounded-full border-[1.5px] border-[#B42318] bg-[#FFF1EE] px-2 py-0.5 text-[11px] font-black text-[#B42318]">18歳以上と未満で分かれる</span>}
      </h3>
      <p className="m-0 mt-2 rounded-[12px] border-l-4 border-[#FFE45C] bg-[#FFFBE6] px-3 py-2 text-[14px] font-bold leading-[1.75]"><Rich text={it.body} /></p>
      {it.reading?.map((p, k) => <p key={k} className="m-0 mt-3 text-[15px] leading-[1.9] [text-indent:1em]"><Rich text={p} /></p>)}
      {it.figure && <LectureFigure fig={it.figure} no={++fig.n} />}
      <Sources items={it.sources} compact />
    </article>
  );
}

/** 用語集：部門ごとに分け、1語を1行（語・短い説明・関係するレクチャー）で並べる */
function Glossary({ c, terms }: { c: ShiryoChapter; terms: { it: ShiryoItem; i: number }[] }) {
  const groups: { key: string; label: string; list: typeof terms }[] = [];
  for (const t of terms) {
    const first = lecId(t.it.sources[0].url);
    const key = first.split("-")[0];
    let g = groups.find((x) => x.key === key);
    if (!g) {
      g = { key, label: cardInfo(first)?.dept ?? key.toUpperCase(), list: [] };
      groups.push(g);
    }
    g.list.push(t);
  }
  return (
    <div className="mt-6">
      <h3 className="m-0 text-[17px] font-black leading-snug">用語の一覧（{terms.length}語）</h3>
      <p className="m-0 mt-1 text-[12.5px] leading-relaxed text-[#5A5D73]">部門をひらくと、その部門のレクチャーで説明した言葉が出ます。右の記号は、関係するレクチャーへのリンクです。</p>
      <nav aria-label="用語集の部門" className="mt-2 flex flex-wrap gap-1.5">
        {groups.map((g) => (
          <a key={g.key} href={`#ch${c.ch}-${g.key}`} className="rounded-full border-[1.5px] border-[#15172B] bg-white px-2.5 py-1 text-[12px] font-bold text-[#15172B] no-underline">
            {g.label}
          </a>
        ))}
      </nav>
      {groups.map((g) => (
        <section key={g.key} id={`ch${c.ch}-${g.key}`} className="mt-2 scroll-mt-4">
          <details suppressHydrationWarning className="group/dp rounded-[14px] border-[1.5px] border-[#15172B] bg-white">
            <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-2 px-3.5 text-[14.5px] font-black [&::-webkit-details-marker]:hidden">
              <span>{g.label}</span>
              <span className="whitespace-nowrap text-[12px] font-bold text-[#5A5D73]">{g.list.length}語　<Chevron group="dp" /></span>
            </summary>
            <dl className="m-0 border-t border-[#E4E2D8] px-3.5 pb-1">
              {g.list.map(({ it, i }) => (
                <div key={it.heading} id={`ch${c.ch}-${i + 1}`} className="scroll-mt-4 border-b border-dashed border-[#E4E2D8] py-2 last:border-0">
                  <dt className="text-[14px] font-black leading-snug"><Rich text={it.heading} /></dt>
                  <dd className="m-0 mt-0.5 text-[13px] leading-[1.7] text-[#3A3D55]">
                    <Rich text={it.body} />
                    {it.sources.map((s) => {
                      const id = lecId(s.url);
                      return (
                        <a key={s.url} href={s.url} title={s.title} aria-label={s.title} className="ml-1.5 inline-block whitespace-nowrap rounded bg-[#EEF1FF] px-1 align-[1px] font-mono text-[10.5px] font-bold text-[#1533B8] no-underline">
                          {id.toUpperCase()}
                        </a>
                      );
                    })}
                  </dd>
                </div>
              ))}
            </dl>
          </details>
        </section>
      ))}
      <p className="m-0 mt-2 text-[11.5px] text-[#5A5D73]">リンク先のレクチャーは確認日 {terms[0]?.it.sources[0]?.checked} の内容です。</p>
    </div>
  );
}

export function ShiryoPage({ chapters }: { chapters: ShiryoChapter[] }) {
  const fig = { n: 0 };
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
      {chapters.map((c, ci) => {
        const terms = c.items.map((it, i) => ({ it, i })).filter((x) => isTerm(x.it));
        const glossary = terms.length >= 10;
        const items = c.items.map((it, i) => ({ it, i })).filter((x) => !glossary || !isTerm(x.it));
        return (
          <section key={c.ch} id={`ch${c.ch}`} className="mt-5 scroll-mt-4">
            <details open={ci === 0} suppressHydrationWarning className="group/ch rounded-[16px] border-[1.5px] border-[#15172B] bg-white/60">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-3 px-3 py-3 sm:px-4 [&::-webkit-details-marker]:hidden">
                <span className="min-w-0">
                  <span className="block text-[12px] font-black text-[#1533B8]">第{c.ch}章</span>
                  <h2 className="m-0 text-[20px] font-black leading-snug">{c.title}</h2>
                  <span className="mt-0.5 block text-[12px] font-bold text-[#5A5D73]">{glossary ? `${terms.length}語` : `${c.items.length}項目`}</span>
                </span>
                <span className="mt-5 flex-none whitespace-nowrap text-[12px] font-bold text-[#5A5D73]">
                  <span className="group-open/ch:hidden">ひらく</span>
                  <span className="hidden group-open/ch:inline">とじる</span> <Chevron group="ch" />
                </span>
              </summary>
              <div className="border-t border-[#E4E2D8] px-3 pb-5 pt-3 sm:px-4">
                <p className="m-0 text-[15px] leading-relaxed"><Rich text={c.intro} /></p>
                {items.length > 1 && (
                  <ol className="m-0 mt-3 grid list-none gap-0.5 p-0 text-[13px] font-bold">
                    {items.map(({ it, i }) => (
                      <li key={it.heading}>
                        <a href={`#ch${c.ch}-${i + 1}`} className="text-[#1533B8]">{c.ch}-{i + 1}　<Rich text={it.heading} /></a>
                      </li>
                    ))}
                  </ol>
                )}
                {items.map(({ it, i }) => <ItemView key={it.heading} c={c} it={it} i={i} fig={fig} />)}
                {glossary && <Glossary c={c} terms={terms} />}
              </div>
            </details>
          </section>
        );
      })}
      <script dangerouslySetInnerHTML={{ __html: OPEN_ON_HASH }} />
      <NextLinks items={[{ label: "ゼロワンOSユース版の目次", href: UZ_HOME }]} />
    </LearnShell>
  );
}
