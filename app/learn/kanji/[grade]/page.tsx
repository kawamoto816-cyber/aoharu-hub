import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { kanjiOfGrade } from "@/lib/kanji";

// /learn/kanji/[grade]: 学年の漢字の一覧 (読み・言葉・例文)。ここから修行をはじめる。

const SITE = "https://app.bluespring.co.jp";

export function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6].map((g) => ({ grade: String(g) }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ grade: string }> }): Promise<Metadata> {
  const g = Number((await params).grade);
  const list = kanjiOfGrade(g);
  if (!list.length) return {};
  const url = `${SITE}/learn/kanji/${g}`;
  const title = `小学${g}年生の漢字${list.length}字 一覧｜読み方・言葉・例文｜アオハルOS`;
  const description = `小学${g}年で習う漢字${list.length}字（${list.slice(0, 8).map((e) => e.k).join("・")}…）の音読み・訓読み・言葉・例文。カードで覚えて4択で確かめる無料の漢字ドリル。`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export default async function KanjiGrade({ params }: { params: Promise<{ grade: string }> }) {
  const g = Number((await params).grade);
  const list = kanjiOfGrade(g);
  if (!list.length) notFound();
  return (
    <LearnShell crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/kanji", label: "小学校の漢字" }, { label: `${g}年生` }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">AOHARU KANJI　{g}年生</p>
      <h1 className="m-0 mt-1 text-[26px] font-black">
        {g}年生の漢字<span className="ml-2 text-[15px] font-bold text-[#3A3D55]">{list.length}字</span>
      </h1>
      <a href={`/learn/kanji/play?g=${g}`} className="mt-4 flex min-h-[56px] max-w-[420px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] text-[17px] font-black text-white no-underline shadow-[0_4px_0_#0B1F7A]">
        {g}年生の漢字を覚える
      </a>
      <p className="m-0 mt-2 text-[12.5px] text-[#3A3D55]">この学年の復習と、まだ見ていない字が出てきます。</p>
      <ol className="m-0 mt-6 grid list-none gap-2 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((e) => (
          <li key={e.k} className="flex gap-3 rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3">
            <span className="flex h-[64px] w-[64px] flex-none items-center justify-center rounded-[10px] bg-[#FFFBE6] font-serif text-[44px] leading-none">{e.k}</span>
            <div className="min-w-0 flex-1 text-[13px] leading-relaxed">
              {e.on.length > 0 && (
                <p className="m-0">
                  <span className="mr-1 rounded bg-[#15172B] px-1 text-[10.5px] font-black text-white">音</span>
                  {e.on.join("・")}
                </p>
              )}
              {e.kun.length > 0 && (
                <p className="m-0">
                  <span className="mr-1 rounded border border-[#15172B] px-1 text-[10.5px] font-black">訓</span>
                  {e.kun.join("・")}
                </p>
              )}
              <p className="m-0 mt-0.5 text-[#3A3D55]">{e.words.map((w) => `${w.w}（${w.y}）`).join("　")}</p>
            </div>
          </li>
        ))}
      </ol>
      <nav className="mt-6 flex justify-between gap-3 text-[14px] font-black">
        {g > 1 ? <Link href={`/learn/kanji/${g - 1}`}>← {g - 1}年生</Link> : <span />}
        {g < 6 ? <Link href={`/learn/kanji/${g + 1}`}>{g + 1}年生 →</Link> : <Link href="/learn/kanji">漢字のトップへ</Link>}
      </nav>
    </LearnShell>
  );
}
