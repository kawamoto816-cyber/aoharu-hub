import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { KYOKA, LEVEL_NAME, findKyoka, type Level } from "@/lib/learn/kyoka";
import { bookOf } from "@/lib/lecture/book";
import { BookToc } from "@/components/lecture/BookToc";

// /learn/kyoka/<教科>: 教科ごとの入口。小・中・高それぞれ、まず「教科書（図解）」の目次 (図解レクチャーを章の順に読み進める)、
// その下に ①覚える・②鍛える の教材を並べる。

const SITE = "https://app.bluespring.co.jp";

export function generateStaticParams() {
  return KYOKA.map((k) => ({ subject: k.key }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ subject: string }> }): Promise<Metadata> {
  const k = findKyoka((await params).subject);
  if (!k) return {};
  const url = `${SITE}/learn/kyoka/${k.key}`;
  const title = `${k.name}｜小・中・高の${k.name}を無料で覚えて鍛える｜アオハルラーン｜アオハルOS`;
  const description = `${k.name}の教材の入口。${k.items.map((x) => x.label).slice(0, 5).join("・")}など、小学校から高校まで、カードで覚えてドリルで鍛える。登録なし・無料。`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

const LEVELS: Level[] = ["sho", "chu", "ko"];

export default async function KyokaPage({ params }: { params: Promise<{ subject: string }> }) {
  const k = findKyoka((await params).subject);
  if (!k) notFound();
  return (
    <LearnShell crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/school", label: "学校の教科" }, { label: k.name }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">SCHOOL　学校の教科</p>
      <h1 className="m-0 mt-1 text-[28px] font-black">{k.name}</h1>
      <nav aria-label="ほかの教科" className="mt-3 flex flex-wrap gap-2">
        {KYOKA.map((x) => (
          <Link key={x.key} href={`/learn/kyoka/${x.key}`} aria-current={x.key === k.key ? "page" : undefined} className={`inline-flex min-h-[44px] items-center rounded-full border-[1.5px] border-[#15172B] px-3 text-[13px] font-black no-underline ${x.key === k.key ? "bg-[#15172B] text-white" : "bg-white text-[#15172B]"}`}>
            {x.name}
          </Link>
        ))}
      </nav>
      <nav aria-label="学校段階" className="mt-4 flex flex-wrap gap-2">
        {LEVELS.filter((lv) => k.items.some((x) => x.level === lv) || bookOf(k.key, lv)).map((lv) => (
          <a key={lv} href={`#h-${lv}`} className="inline-flex min-h-[44px] items-center rounded-[12px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-4 text-[14px] font-black text-[#15172B] no-underline shadow-[2px_2px_0_#15172B]">
            {LEVEL_NAME[lv]}の{k.name} ↓
          </a>
        ))}
      </nav>
      {LEVELS.filter((lv) => k.items.some((x) => x.level === lv) || bookOf(k.key, lv)).map((lv) => (
        <section key={lv} aria-labelledby={`h-${lv}`} className="mt-8 scroll-mt-4">
          <div className="flex flex-wrap items-baseline gap-3">
            <h2 id={`h-${lv}`} className="m-0 text-[21px] font-black">
              {LEVEL_NAME[lv]}
            </h2>
            {k.map[lv] && (
              <Link href={`/learn/school#${k.map[lv]}`} className="text-[13px] font-bold">
                単元の地図で見る →
              </Link>
            )}
          </div>
          {(() => {
            const book = bookOf(k.key, lv);
            if (!book) return null;
            return (
              <div id={`book-${lv}`} className="mt-3 scroll-mt-4">
                <p className="m-0 mb-2 text-[12px] font-black text-[#1533B8]">教科書（図解）　読んで分かる</p>
                <BookToc chapters={book.chapters} label={`${LEVEL_NAME[lv]}の${k.name}`} kids={lv === "sho"} />
              </div>
            );
          })()}
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {/* 教材のない箱 (空の点線の箱) は出さない。①覚えるがない段階は、②鍛えるの箱に一言そえる */}
            {(["覚える", "鍛える"] as const).map((eng) => {
              const list = k.items.filter((x) => x.level === lv && x.engine === eng);
              if (list.length === 0) return null;
              const noMemo = eng === "鍛える" && !k.items.some((x) => x.level === lv && x.engine === "覚える");
              return (
                <div key={eng} className="rounded-[16px] border-[1.5px] border-[#15172B] bg-white p-3">
                  <p className="m-0 mb-2 text-[12px] font-black text-[#1533B8]">{eng === "覚える" ? "①覚える" : "②鍛える"}</p>
                  {noMemo && <p className="m-0 mb-2 text-[12.5px] text-[#3A3D55]">単元ごとのポイント（①覚える）は、各単元のページの上にあります。</p>}
                  <ul className="m-0 grid list-none gap-2 p-0">
                      {list.map((x) => (
                        <li key={x.href}>
                          <Link href={x.href} className="flex flex-col rounded-[12px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] px-3 py-2 text-[#15172B] no-underline shadow-[2px_2px_0_#15172B]">
                            <span className="text-[15px] font-black">{x.label}</span>
                            <span className="text-[12px] text-[#3A3D55]">{x.sub}</span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </LearnShell>
  );
}
