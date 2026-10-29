import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LearnShell } from "@/components/learn/LearnShell";
import { CardPlayer } from "@/components/learn/CardPlayer";
import { Diagram } from "@/components/learn/Diagram";
import { klee } from "@/components/landing/fonts";
import { SHORONBUN, findShoronbunCard } from "@/lib/learn/shoronbun";

// /learn/shoronbun/[no]: カード1枚。表・裏・図解・三択と、テンサクンで試す導線。
// 本文はサーバーで描くので、検索エンジンにもカードの中身が読める。

const BASE = "https://app.bluespring.co.jp/learn/shoronbun";

export function generateStaticParams() {
  return SHORONBUN.cards.map((c) => ({ no: String(c.no) }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ no: string }> }): Promise<Metadata> {
  const card = findShoronbunCard(Number((await params).no));
  if (!card) return {};
  const title = `${card.title}｜小論文のコツ No.${card.no}｜アオハルOS`;
  const description = `${card.front}。${card.back}`.slice(0, 120);
  return { title, description, alternates: { canonical: `${BASE}/${card.no}` }, openGraph: { title, description, url: `${BASE}/${card.no}` } };
}

export default async function CardPage({ params }: { params: Promise<{ no: string }> }) {
  const card = findShoronbunCard(Number((await params).no));
  if (!card) notFound();
  const total = SHORONBUN.cards.length;
  const prev = card.no > 1 ? card.no - 1 : null;
  const next = card.no < total ? card.no + 1 : null;
  const chapter = SHORONBUN.chapters.find((c) => c.no === card.chapter);

  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/shoronbun", label: "小論文" }, { label: `No.${card.no}` }]}>
      <p className="m-0 text-xs font-bold text-[#3A3D55]">
        第{card.chapter}章　{chapter?.title}
      </p>
      <h1 className="sr-only">
        {card.title}（小論文のコツ No.{card.no}）
      </h1>
      <div className="mt-3">
        <CardPlayer
          card={card}
          total={total}
          handFont={klee.className}
          regionPath="/learn/shoronbun"
          tryHref={`/tensaku?kind=shoronbun&learn=${card.id}`}
          diagram={<Diagram data={card.diagram} title={card.diagramTitle} />}
        />
      </div>

      {card.link && <p className="mb-0 mt-5 text-center text-[13px] font-bold text-[#3A3D55]">この先：{card.link.label}</p>}

      <nav aria-label="前後のカード" className="mt-8 grid grid-cols-2 gap-2.5">
        {prev ? (
          <Link href={`/learn/shoronbun/${prev}`} className="flex min-h-[48px] items-center justify-center rounded-xl border-[1.5px] border-[#15172B] bg-white text-sm font-bold text-[#15172B] no-underline">
            ← No.{prev}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/learn/shoronbun/${next}`} className="flex min-h-[48px] items-center justify-center rounded-xl border-[1.5px] border-[#15172B] bg-white text-sm font-bold text-[#15172B] no-underline">
            No.{next} →
          </Link>
        ) : (
          <Link href="/learn/shoronbun" className="flex min-h-[48px] items-center justify-center rounded-xl border-[1.5px] border-[#15172B] bg-[#FFE45C] text-sm font-black text-[#15172B] no-underline">
            仕上げのクエストへ
          </Link>
        )}
      </nav>
    </LearnShell>
  );
}
